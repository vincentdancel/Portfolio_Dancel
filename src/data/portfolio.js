export const profile = {
  name: 'Vincent Ric H. Dancel',
  shortName: 'Vince Dancel',
  role: 'Web Developer & UI/UX Designer',
  location: 'Philippines',
  email: 'vincentdancel@g.cjc.edu.ph',
  github: 'https://github.com/vincentdancel',
  instagram: 'https://instagram.com/beanssss_d',
  intro:
    'I build focused digital experiences where clear interfaces and expressive motion work together.',
  about: [
    'I am Vince Dancel, a web developer and UI/UX designer based in the Philippines. I enjoy shaping useful ideas into interfaces that feel simple, deliberate, and easy to use.',
    'Right now, I am sharpening my skills in React, motion design, machine learning, database systems, and modern web development. I am especially interested in work that makes complex tools feel more human.',
  ],
}

export const projects = [
  {
    slug: 'art-classifier',
    number: '01',
    title: 'Art Classifier',
    category: 'Machine learning web app',
    description:
      'An image-classification project that explores artist prediction through upload and camera-based input.',
    longDescription:
      'This project turns an image-recognition workflow into a clearer web experience: choose an image, run a prediction, and review a confidence-led result.',
    tech: ['Python', 'Flask', 'TensorFlow'],
    repoUrl: 'https://github.com/vincentdancel/Art_Classifier',
    preview: '/previews/art-classifier.svg',
    accent: 'lime',
    outcome: 'Designed around an approachable image-to-insight flow.',
  },
  {
    slug: 'face-emotion-detection',
    number: '02',
    title: 'Face Emotion Detection',
    category: 'Computer vision experiment',
    description:
      'A computer-vision project for exploring facial-expression recognition and confidence-based emotion signals.',
    longDescription:
      'The study investigates how a detection interface can make a model’s output easier to scan: a live frame, clear labels, and confidence values with meaningful hierarchy.',
    tech: ['Python', 'Jupyter', 'OpenCV'],
    repoUrl: 'https://github.com/vincentdancel/Face-Emotion-Detection',
    preview: '/previews/emotion-detection.svg',
    accent: 'lilac',
    outcome: 'Translated model output into a readable visual summary.',
  },
  {
    slug: 'personal-website',
    number: '03',
    title: 'Personal Website',
    category: 'Personal web presence',
    description:
      'An earlier personal site built to introduce my work, interests, and approach to digital design.',
    longDescription:
      'A foundational portfolio project focused on personal identity, hierarchy, and a concise path from introduction to selected work.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    repoUrl: 'https://github.com/vincentdancel/Personal-Website',
    preview: '/previews/personal-website.svg',
    accent: 'pink',
    outcome: 'Created a compact personal platform for sharing work online.',
  },
]

export const findProject = (slug) =>
  projects.find((project) => project.slug === slug)
