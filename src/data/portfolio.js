export const profile = {
  name: 'Vincent Ric H. Dancel',
  shortName: 'Vince Dancel',
  role: 'Web Developer & UI/UX Designer',
  location: 'Philippines',
  email: 'vincentdancel692@gmail.com',
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
    slug: 'intravision-ai',
    number: '01',
    title: 'IntraVision-AI',
    category: 'AI intramurals management',
    description:
      'An AI-powered intramurals management and scoring system for Cor Jesu College.',
    longDescription:
      'IntraVision-AI is an intelligent intramurals management and scoring system for Cor Jesu College. It combines React, HTML, CSS, JavaScript, Python, and API integrations with Supabase services and IndexedDB for local browser storage.',
    tech: ['HTML', 'CSS', 'JavaScript', 'IndexedDB', 'React', 'Python', 'APIs', 'Supabase'],
    links: [
      { label: 'Live demo', href: 'https://intra-vision-ai.vercel.app/' },
      { label: 'GitHub repo', href: 'https://github.com/romerJohn/IntraVision-AI', icon: 'github' },
    ],
    preview: '/Projects/IntraVision.png',
    accent: 'lime',
    outcome: 'Intramurals management and scoring.',
  },
  {
    slug: 'cinerealm',
    number: '02',
    title: 'CineRealm',
    category: 'UI/UX design & prototype',
    description:
      'A UI/UX design project presented through Figma screens and an interactive prototype.',
    longDescription:
      'CineRealm explores interface design and prototyping in Figma. Browse the design file to inspect the screens, or open the interactive prototype to explore the experience.',
    tech: ['Figma'],
    links: [
      {
        label: 'View prototype',
        href: 'https://www.figma.com/proto/ioyvI4rKvWujkNaj9IZz2D/CineRealm?node-id=0-1&t=6jb025m5nvCdm11k-1',
      },
      {
        label: 'Figma design',
        href: 'https://www.figma.com/design/ioyvI4rKvWujkNaj9IZz2D/CineRealm?node-id=0-1&t=6jb025m5nvCdm11k-1',
      },
    ],
    preview: '/Projects/CineRealm.png',
    accent: 'lilac',
    outcome: 'Interface design and interactive prototyping.',
  },
  {
    slug: 'data-analytics-excel',
    number: '03',
    title: 'Data Analytics - Excel',
    category: 'Data analysis & dashboard',
    description:
      'An Excel data analysis project that presents information through a dashboard and clear visual summaries.',
    longDescription:
      'This Microsoft Excel project brings data analysis and dashboard presentation together in a workbook. Open the linked repository to browse the project and access its downloadable files.',
    tech: ['Microsoft Excel'],
    links: [
      { label: 'Workbook files', href: 'https://github.com/vincentdancel/Excel-Dashboard-Data-Analysis-', icon: 'github' },
    ],
    preview: '/Projects/dataAnalytics.jpg',
    accent: 'pink',
    outcome: 'Data analysis and visual reporting in Excel.',
  },
  {
    slug: 'qr-bus-transportation-system',
    number: '04',
    title: 'QR Bus Transportation System',
    category: 'Mobile & web application',
    description:
      'A QR-based bus transportation system with a Flutter mobile app, a React web interface, and a Supabase backend.',
    longDescription:
      'The QR Bus Transportation System combines Flutter, React, and Supabase for a QR-based transportation experience across mobile and web. Visit the repository for the source code and Android APK resources.',
    tech: ['Flutter', 'React', 'Supabase'],
    links: [
      { label: 'Download APK', href: 'https://media.githubusercontent.com/media/vincentdancel/QR_Bus_Transportation_System/main/QR%20Bus%20Smart.apk' },
      { label: 'GitHub repo', href: 'https://github.com/vincentdancel/QR_Bus_Transportation_System', icon: 'github' },
    ],
    preview: '/Projects/QRBUS.jpg',
    accent: 'teal',
    outcome: 'QR-based transportation across mobile and web.',
  },
]

export const findProject = (slug) =>
  projects.find((project) => project.slug === slug)
