export type Locale = 'pt' | 'en';

export const defaultLocale: Locale = 'pt';

export const ui = {
  pt: {
    siteTitle: 'Gustavo Felipe Marcial',
    siteDescription:
      'Desenvolvedor Backend .NET — portfólio e engineering notebook.',
    nav: {
      home: 'Início',
      projects: 'Projetos',
      stack: 'Stack',
      contact: 'Contato',
    },
    hero: {
      name: 'Gustavo Felipe Marcial',
      headline: 'Desenvolvedor Backend .NET',
      viewProjects: 'Ver Projetos',
      resume: 'Currículo PDF',
    },
    intro: {
      title: 'Sobre mim',
      p1: 'Sou desenvolvedor focado em backend utilizando .NET, PostgreSQL, Redis e Docker. Construo sistemas com separação clara de responsabilidades e decisões técnicas conscientes.',
      p2: 'Atualmente desenvolvo projetos pessoais aplicando conceitos de produção: Clean Architecture, DDD, mensageria com Redis Streams e eventos de domínio.',
      p3: 'Este site funciona como um engineering notebook — documento como penso, aprendo e resolvo problemas, não apenas o que usei na stack.',
    },
    featured: {
      title: 'Projeto em destaque',
      badge: 'Arquitetura',
    },
    stack: {
      title: 'Stack',
      subtitle: 'Honesta — sem porcentagens inventadas.',
      principal: 'Principal',
      solid: 'Já usei em projetos',
      learning: 'Estudando',
      viewAll: 'Ver stack completa',
    },
    projects: {
      title: 'Projetos',
      subtitle: 'O que cada projeto mostra sobre mim.',
      whatItShows: 'O que esse projeto mostra sobre mim',
      viewProject: 'Ver projeto',
      sourceCode: 'Ver no GitHub',
      privateCode: 'Código privado — disponível para revisão em entrevista',
      openSource: 'Código aberto',
      inDevelopment: 'Em desenvolvimento',
      completed: 'Concluído',
      clickToEnlarge: 'Clique para ampliar',
      methodology: 'Como estou desenvolvendo',
    },
    contact: {
      title: 'Contato',
      subtitle: 'Vamos conversar.',
      email: 'E-mail',
      links: 'Links',
    },
    footer: {
      builtWith: 'Feito com Astro',
    },
  },
  en: {
    siteTitle: 'Gustavo Felipe Marcial',
    siteDescription:
      '.NET Backend Developer — portfolio and engineering notebook.',
    nav: {
      home: 'Home',
      projects: 'Projects',
      stack: 'Stack',
      contact: 'Contact',
    },
    hero: {
      name: 'Gustavo Felipe Marcial',
      headline: '.NET Backend Developer',
      viewProjects: 'View Projects',
      resume: 'Resume PDF',
    },
    intro: {
      title: 'About me',
      p1: 'I focus on backend development with .NET, PostgreSQL, Redis, and Docker. I build systems with clear separation of concerns and deliberate technical decisions.',
      p2: 'I work on personal projects applying production concepts: Clean Architecture, DDD, Redis Streams messaging, and domain events.',
      p3: 'This site is an engineering notebook — it documents how I think, learn, and solve problems, not just a technology list.',
    },
    featured: {
      title: 'Featured project',
      badge: 'Architecture',
    },
    stack: {
      title: 'Stack',
      subtitle: 'Honest — no made-up percentages.',
      principal: 'Core',
      solid: 'Used in projects',
      learning: 'Learning',
      viewAll: 'View full stack',
    },
    projects: {
      title: 'Projects',
      subtitle: 'What each project says about me.',
      whatItShows: 'What this project shows about me',
      viewProject: 'View project',
      sourceCode: 'View on GitHub',
      privateCode: 'Private code — available for review in interviews',
      openSource: 'Open source',
      inDevelopment: 'In development',
      completed: 'Completed',
      clickToEnlarge: 'Click to enlarge',
      methodology: "How I'm building it",
    },
    contact: {
      title: 'Contact',
      subtitle: "Let's talk.",
      email: 'Email',
      links: 'Links',
    },
    footer: {
      builtWith: 'Built with Astro',
    },
  },
} as const;

export function useTranslations(locale: Locale) {
  return ui[locale];
}

export function localizedPath(path: string, locale: Locale): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (locale === defaultLocale) return normalized === '/' ? '/' : normalized;
  return normalized === '/' ? '/en/' : `/en${normalized}`;
}

export function switchLocalePath(currentPath: string, target: Locale): string {
  const withoutEn = currentPath.replace(/^\/en(?=\/|$)/, '') || '/';
  return localizedPath(withoutEn, target);
}
