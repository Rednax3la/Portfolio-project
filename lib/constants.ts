export const SITE = {
  name: 'Alexander Wambugu',
  role: 'Builder. Data Scientist. African Innovator.',
  tagline: 'He builds real products for real people.',
  location: 'Nairobi, Kenya',
  coordinates: '1°17\'S, 36°49\'E',
  github: 'https://github.com/Rednax3la',
  email: 'wambugualexander09@gmail.com',
  instagram: 'https://instagram.com/art_.is_me',
  phone: '+254110697638',
}

export const PROJECTS = [
  {
    id: 'vernaculearn',
    codename: 'MISSION-01',
    name: 'Vernaculearn',
    status: 'ACTIVE',
    tagline: 'Preserving African voices, one lesson at a time.',
    description:
      'Over 72% of African languages face extinction. Vernaculearn is a Duolingo-style language learning platform built specifically for African indigenous languages — because your grandmother\'s language deserves a comeback. Gamified lessons, cultural context, and community-driven content for Africa\'s linguistic future.',
    problem: 'Loss of African linguistic heritage across generations.',
    tech: ['React Native', 'Python', 'FastAPI', 'PostgreSQL', 'NLP'],
    github: 'https://github.com/Rednax3la/Afrihub',
    live: null,
    color: '#38BDF8',
    accent: '#0EA5E9',
  },
  {
    id: 'wrapsite',
    codename: 'MISSION-02',
    name: 'Wrapsite',
    status: 'ACTIVE',
    tagline: 'An AI-powered gift, wrapped in a website.',
    description:
      'Gifting in Kenya is a deeply cultural act. But personalized digital experiences are expensive. Wrapsite lets any Kenyan gifter create a beautiful, AI-powered mini-website for their gift — affordable, memorable, and shareable. From birthday dedications to wedding gifts, wrapped in a URL.',
    problem: 'Personalized digital gifting is inaccessible and expensive in Kenya.',
    tech: ['Next.js', 'TypeScript', 'OpenAI API', 'Vercel', 'Tailwind'],
    github: 'https://github.com/Rednax3la/itsquicksite',
    live: null,
    color: '#1E90FF',
    accent: '#1D4ED8',
  },
  {
    id: 'nairobi-housing',
    codename: 'MISSION-03',
    name: 'Nairobi Price Engine',
    status: 'COMPLETED',
    tagline: 'Machine learning meets African real estate.',
    description:
      'A machine learning model trained on Nairobi housing data to predict real estate prices with high accuracy. Built during the Lux Tech program — the project explored feature engineering, model selection, and the unique socioeconomic factors that influence property values in East African markets.',
    problem: 'Opaque and inconsistent real estate pricing in Nairobi.',
    tech: ['Python', 'scikit-learn', 'Pandas', 'Matplotlib', 'Jupyter'],
    github: 'https://github.com/Rednax3la/Nairobi-House-Price-Prediction',
    live: null,
    color: '#60A5FA',
    accent: '#3B82F6',
  },
]

export const SKILLS = {
  'Data & AI': [
    { name: 'Python', level: 'Expert', used: 'Nairobi Price Engine, Vernaculearn NLP' },
    { name: 'Machine Learning', level: 'Advanced', used: 'Nairobi Housing, ALX projects' },
    { name: 'SQL', level: 'Advanced', used: 'Multiple data pipelines' },
    { name: 'Power BI', level: 'Proficient', used: 'Business analytics dashboards' },
    { name: 'Tableau', level: 'Proficient', used: 'Data visualization projects' },
    { name: 'Pandas', level: 'Expert', used: 'All data science work' },
    { name: 'scikit-learn', level: 'Advanced', used: 'Nairobi Price Engine' },
  ],
  'Engineering': [
    { name: 'JavaScript', level: 'Advanced', used: 'Wrapsite, portfolio' },
    { name: 'TypeScript', level: 'Proficient', used: 'Wrapsite frontend' },
    { name: 'React / Next.js', level: 'Advanced', used: 'Wrapsite, Vernaculearn web' },
    { name: 'Java', level: 'Intermediate', used: 'Academic projects' },
    { name: 'HTML / CSS', level: 'Expert', used: 'All web projects' },
    { name: 'Node.js', level: 'Proficient', used: 'Backend APIs' },
  ],
  'Tools & Platforms': [
    { name: 'Jupyter', level: 'Expert', used: 'All DS work' },
    { name: 'Git / GitHub', level: 'Advanced', used: 'All projects' },
    { name: 'VSCode', level: 'Expert', used: 'Primary editor' },
    { name: 'Vercel', level: 'Proficient', used: 'Wrapsite deployment' },
    { name: 'Jamovi', level: 'Proficient', used: 'Statistical analysis' },
  ],
  'Languages': [
    { name: 'English', level: 'Fluent', used: 'Professional' },
    { name: 'Swahili', level: 'Fluent', used: 'Native' },
    { name: 'Spanish', level: 'Intermediate', used: 'Learning' },
  ],
}

export const TIMELINE = [
  {
    year: '2022',
    title: 'The Decision',
    body: 'Enrolled at JKUAT for Data Science & Analytics. Not out of passion — out of calculated purpose. Data was the most powerful language for understanding the world.',
  },
  {
    year: '2023',
    title: 'First Sparks',
    body: 'First real Python notebook. First broken model. First dataset that made sense. Somewhere between debugging and discovery, this became more than a degree.',
  },
  {
    year: '2024',
    title: 'Shipping Begins',
    body: 'PLP Academy. ALX. Lux Tech. Vernaculearn ships — a real product for a real problem. Wrapsite follows. The shift from student to builder becomes irreversible.',
  },
  {
    year: '2025',
    title: 'Graduate',
    body: 'Degree in hand. But the real education is in the repos, the failures, the 2am deployments, and the conviction that African problems deserve world-class solutions.',
  },
  {
    year: '→ Now',
    title: 'Founding',
    body: 'Building toward a company. Exploring the intersection of AI and African markets. The portfolio is just chapter one.',
  },
]

export const NAV_CHAPTERS = [
  { id: 'hero', label: 'Entry' },
  { id: 'about', label: 'Origin' },
  { id: 'projects', label: 'Builds' },
  { id: 'skills', label: 'Intelligence' },
  { id: 'contact', label: 'Signal' },
]
