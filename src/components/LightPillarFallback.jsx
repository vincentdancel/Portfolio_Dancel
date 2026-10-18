import { useEffect, useRef } from 'react';

// Animate the shader's still frame with Canvas 2D when WebGL cannot run.
export default function LightPillarFallback({ color, paused, rotationSpeed, flow }) {
  const canvasRef = useRef(null);
  const settingsRef = useRef(null);
  const wakeRef = useRef(null);
  settingsRef.current = { color, paused, rotationSpeed, flow };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: false });
    if (!canvas || !context) return undefined;

    const image = new Image();
    image.decoding = 'async';
    let width = 1;
    let height = 1;
    let clock = 0;
    let raf = 0;
    let last = 0;
    let lastDraw = 0;
    let visible = true;

    const draw = () => {
      if (!image.naturalWidth) return;
      // The extra crop keeps the moving sample inside the image at every size.
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight) * 1.14;
      const sourceWidth = width / scale;
      const sourceHeight = height / scale;
      const sourceX = (image.naturalWidth - sourceWidth) / 2;
      const sourceY = (image.naturalHeight - sourceHeight) / 2;
      const phase = clock * settingsRef.current.flow;
      const stripCount = 256;
      const stripHeight = height / stripCount;

      for (let index = 0; index < stripCount; index++) {
        const y = index * stripHeight;
        const fraction = (y + stripHeight / 2) / height;
        const driftX = (
          (Math.sin(fraction * 7 + phase * 0.65) - Math.sin(fraction * 7)) * 0.012 +
          (Math.sin(fraction * 3 - clock * 0.45) - Math.sin(fraction * 3)) * 0.008
        ) * sourceWidth;
        const driftY = (
          Math.sin(fraction * 6 - phase * 0.55) - Math.sin(fraction * 6)
        ) * sourceHeight * 0.012;
        const bandHeight = Math.min(stripHeight + 1, height - y);
        context.drawImage(
          image,
          sourceX + driftX,
          sourceY + y / scale + driftY,
          sourceWidth,
          bandHeight / scale,
          0,
          y,
          width,
          bandHeight,
        );
      }

      context.globalCompositeOperation = 'color';
      context.fillStyle = settingsRef.current.color;
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = 'source-over';
    };

    const frame = now => {
      raf = 0;
      if (!visible || document.hidden) return;
      const settings = settingsRef.current;
      if (!settings.paused && last) {
        clock += Math.min(0.05, (now - last) / 1000) * settings.rotationSpeed / 0.3;
      }
      last = now;
      if (!lastDraw || now - lastDraw >= 1000 / 30 || settings.paused) {
        draw();
        lastDraw = now;
      }
      if (!settings.paused) raf = requestAnimationFrame(frame);
      else last = 0;
    };

    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
    };

    const wake = () => {
      if (!raf && visible && !document.hidden && image.naturalWidth) {
        raf = requestAnimationFrame(frame);
      }
    };

    const resize = () => {
      width = Math.max(1, canvas.clientWidth);
      height = Math.max(1, canvas.clientHeight);
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.imageSmoothingEnabled = true;
      draw();
      wake();
    };

    const onVisibility = () => {
      stop();
      if (!document.hidden) wake();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersection = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      if (visible) wake();
      else stop();
    });
    intersection.observe(canvas);
    document.addEventListener('visibilitychange', onVisibility);
    image.onload = resize;
    image.src = '/light-pillar-fallback.webp';
    resize();
    wakeRef.current = wake;

    return () => {
      stop();
      wakeRef.current = null;
      image.onload = null;
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  useEffect(() => {
    wakeRef.current?.();
  }, [color, paused, rotationSpeed, flow]);

  return (
    <canvas
      ref={canvasRef}
      className="light-pillar-fallback-canvas"
      data-motion={paused ? 'paused' : 'animated'}
      aria-hidden="true"
    />
  );
}
