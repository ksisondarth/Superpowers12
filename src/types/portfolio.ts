export interface SiteSettings {
  name: string
  title: string
  location: string
  phone: string
  whatsapp: string
  email: string
  website: string
  company: string
  cvPdf: string
  profilePhoto: string
  logo: string
  favicon: string
  availabilityBadge: string
  heroDescription: string
}

export interface ThemeColors {
  accent: string
  accentHover: string
  accentBg: string
  accentBorder: string
  background: string
  cardBackground: string
  textPrimary: string
  textSecondary: string
  borderColor: string
}

export interface NavSection { label: string; id: string }
export interface Stat { label: string; value: string }

export interface SkillCategory {
  title: string
  icon: string
  pills: string[]
}

export interface Proficiency { label: string; pct: number }

export interface ExperienceItem {
  title: string
  company: string
  period: string
  highlights: string[]
}

export interface Project {
  id: number
  title: string
  category: string
  date: string
  description: string
  demo?: string
  image?: string
  tags: string[]
}

export interface Education {
  degree: string
  institution: string
  year: string
  note: string
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}

export interface PortfolioData {
  siteSettings: SiteSettings
  theme: { light: ThemeColors; dark: ThemeColors }
  navSections: NavSection[]
  stats: Stat[]
  skills: SkillCategory[]
  proficiencies: Proficiency[]
  experience: ExperienceItem[]
  projects: Project[]
  education: Education
  socialLinks: SocialLink[]
  generatedAt?: string
}
