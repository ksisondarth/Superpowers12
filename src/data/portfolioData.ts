import type { PortfolioData } from '../types/portfolio'

const BASE = import.meta.env.BASE_URL

export const FALLBACK_DATA: PortfolioData = {
  siteSettings: {
    name: 'Keanu Niccolo Sison',
    title: 'AppSheet Developer & Process Automation Specialist',
    location: 'Marikina City, Philippines',
    phone: '0926-626-7336',
    whatsapp: '+639266267336',
    email: 'ksison001@gmail.com',
    website: 'https://keansison.com',
    company: 'Kytus Data Solutions',
    cvPdf: `${BASE}documents/Keanu_Niccolo_Sison_CV.pdf`,
    profilePhoto: `${BASE}images/Keanu-Photo.jpg`,
    logo: `${BASE}logo.svg`,
    favicon: `${BASE}favicon.svg`,
    availabilityBadge: 'Available — open to AppSheet & Automation opportunities',
    heroDescription: 'Results-driven AppSheet Developer with deep expertise in no-code/low-code systems, SVG UI/UX design, workflow automation via Make.com & N8N, and business intelligence through Data Studio. Building scalable solutions for academic institutions, international clients, and Google-partnered companies.',
  },
  theme: {
    light: {
      accent: '#5e17eb', accentHover: '#4c12c0',
      accentBg: 'rgba(94,23,235,0.08)', accentBorder: 'rgba(94,23,235,0.30)',
      background: '#ffffff', cardBackground: '#f9fafb',
      textPrimary: '#111827', textSecondary: '#4b5563', borderColor: '#e5e7eb',
    },
    dark: {
      accent: '#2dd4bf', accentHover: '#25b8a8',
      accentBg: 'rgba(45,212,191,0.08)', accentBorder: 'rgba(45,212,191,0.30)',
      background: '#0a0e14', cardBackground: '#0d1117',
      textPrimary: '#ffffff', textSecondary: '#9ca3af', borderColor: '#1f2937',
    },
  },
  navSections: [
    { label: 'Home', id: 'home' },
    { label: 'Projects', id: 'projects' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Contact', id: 'contact' },
  ],
  stats: [
    { label: 'Years of Experience', value: '6+' },
    { label: 'Systems Delivered', value: '20+' },
    { label: 'Clients Served', value: '15+' },
    { label: 'Hiring Time Reduced', value: '35%' },
  ],
  skills: [
    { title: 'No-Code / Low-Code Platforms', icon: 'Zap', pills: ['AppSheet', 'Google Workspace', 'Google Sites', 'Beaver Builder', 'Elementor', 'WordPress', 'Squarespace'] },
    { title: 'Automation & Integration', icon: 'Settings', pills: ['Make.com', 'N8N', 'Google Apps Script', 'AI Agent Development', 'REST APIs', 'Webhooks', 'Aircall'] },
    { title: 'Analytics & Data', icon: 'BarChart2', pills: ['Data Studio', 'Google Sheets (Advanced)', 'Data Modeling', 'KPI Frameworks', 'ETL'] },
    { title: 'UI/UX & Design', icon: 'Palette', pills: ['AppSheet SVG Design', 'LongText HTML', 'Data URI Encoding', 'CONCATENATE Formula SVGs', 'Photoshop', 'Adobe Illustrator'] },
    { title: 'Database & Backend Concepts', icon: 'Database', pills: ['Supabase', 'Firebase', 'Database Design', 'Data Cleaning & Validation', 'Quality Assurance', 'Document Generation'] },
    { title: 'Languages & Misc Tools', icon: 'Code2', pills: ['HTML', 'CSS', 'JavaScript (Intermediate)', 'Gmail API', 'Google Calendar API'] },
  ],
  proficiencies: [
    { label: 'AppSheet Development', pct: 95 },
    { label: 'SVG / UI-UX Design', pct: 90 },
    { label: 'Automation (Make.com / N8N)', pct: 85 },
    { label: 'Google Sheets & Data', pct: 90 },
    { label: 'Data Studio', pct: 80 },
    { label: 'Apps Script / JavaScript', pct: 70 },
  ],
  experience: [
    {
      title: 'Technology Solutions Consultant',
      company: 'Google Partner Company',
      period: '2026 — Present',
      highlights: [
        'Developed multiple production-ready AppSheet applications for diverse client requirements',
        'Built and maintained polished demo applications showcasing AppSheet capabilities with custom SVG UI components and dynamic dashboard visualizations',
        'Designed document generation systems featuring HTML-to-PDF output and automated revision tracking logic',
        'Led process improvement and automation initiatives integrating AppSheet with Google Workspace, Make.com, and N8N for end-to-end operational workflows',
        'Collaborated directly with clients to assess requirements, scope solutions, and deliver scalable business systems',
      ],
    },
    {
      title: 'Database & Process Automation Specialist',
      company: 'Ateneo de Manila University — Office of Student Affairs & Services',
      period: '2021 — Present',
      highlights: [
        'Built a comprehensive management system encompassing multiple student-facing workflows across departments and offices',
        'Designed custom UI/UX and automated email notification templates for university-wide operational reporting',
        'Led end-to-end system development, maintenance, and continuous process improvement initiatives',
        'Drove data analytics and Looker Studio reporting to support evidence-based strategic institutional decisions',
      ],
    },
    {
      title: 'Tech Lead',
      company: 'Front Row Furniture — UK-based Client',
      period: 'Nov 2024 — Feb 2026',
      highlights: [
        'Led end-to-end development of CRM system, Inventory management, and Project management tool',
        'Developed an enterprise ticketing system integrated with team communication platforms via webhooks',
        'Designed interactive Data Studio dashboards and a logistics delivery planning system providing full operational oversight',
        'Implemented an AI-powered sales chatbot, improving lead response times and pipeline visibility',
        'Oversaw technical direction, system architecture decisions, and platform integrations across all business systems',
      ],
    },
    {
      title: 'Website & AppSheet Developer',
      company: 'Elite IP — Consultant',
      period: '2023 — 2024',
      highlights: [
        'Developed a complete business website with optimized user process flows and structured content architecture',
        'Built a lead management system with vendor tracking integration and automated follow-up workflows',
        'Created a CRM solution with advanced analytics dashboard for real-time sales pipeline visibility',
      ],
    },
    {
      title: 'HR Data Analytics Specialist',
      company: 'ReadyMan Inc',
      period: '2017 — 2019',
      highlights: [
        'Transformed HR operations through advanced data analytics, reporting automation, and process documentation',
        'Built comprehensive KPI dashboards tracking headcount, turnover rates, and end-to-end recruitment metrics',
        'Reduced hiring time by 35% through targeted process optimization and data-driven workflow redesign',
      ],
    },
  ],
  projects: [
    { id: 1, title: 'Project Management System', category: 'Project Management', date: '2024 - Present', description: 'End-to-end project tracking with task assignment, milestone monitoring, deadline management, and custom SVG dashboard visualizations for a UK-based furniture client.', demo: 'https://www.appsheet.com/start/c334d061-def1-4787-bdab-5d088b5d28fd', tags: ['AppSheet', 'SVG UI', 'Data Studio', 'Make.com'] },
    { id: 2, title: 'CRM & Lead Management System', category: 'CRM', date: '2023 - 2024', description: 'Advanced CRM for lead tracking and pipeline management with lead scoring, automated Make.com follow-up workflows, conversion tracking, and real-time analytics dashboards.', demo: 'https://www.appsheet.com/start/c1b48401-ad92-478b-98de-5adb9daa7317', tags: ['AppSheet', 'Make.com', 'Analytics', 'Google Sheets'] },
    { id: 3, title: 'Order Management & POS System', category: 'Inventory', date: '2024', description: 'Complete point-of-sale and order management with item selection, quantity management, automatic total calculation, and streamlined order processing workflows.', demo: 'https://www.appsheet.com/start/d62f57ca-62b0-417b-a39d-e794f7e474b7', tags: ['AppSheet', 'Google Sheets', 'Automation', 'SVG UI'] },
    { id: 4, title: 'University Student Affairs System', category: 'AppSheet', date: '2021 - Present', description: 'Multi-department management system for Ateneo de Manila University covering student-facing workflows, automated email notifications, and Data Studio reporting.', tags: ['AppSheet', 'Google Apps Script', 'Data Studio', 'SVG UI'] },
    { id: 5, title: 'Enterprise Ticketing System', category: 'Automation', date: '2024 - 2025', description: 'Team-integrated ticketing system with webhook-driven notifications, priority escalation, SLA tracking, and real-time status dashboards for full operational oversight.', tags: ['AppSheet', 'N8N', 'Webhooks', 'Make.com'] },
    { id: 6, title: 'Logistics Delivery Planning System', category: 'Inventory', date: '2024', description: 'Route planning and delivery tracking system providing full operational oversight for a UK furniture retailer, with integrated Data Studio dashboards and vendor management.', tags: ['AppSheet', 'Data Studio', 'Google Sheets', 'Automation'] },
  ],
  education: {
    degree: 'Bachelor of Science in Psychology',
    institution: 'Trinity University of Asia',
    year: '2017',
    note: 'Transitioned into no-code/low-code systems development through self-directed learning, beginning with advanced Google Sheets and progressing to AppSheet, automation platforms, and data visualization tools.',
  },
  socialLinks: [
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/keanu-sison', icon: 'Linkedin' },
    { platform: 'GitHub', url: 'https://github.com/keansison', icon: 'Github' },
  ],
}
