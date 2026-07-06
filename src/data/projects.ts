import type { Locale } from '../i18n/ui';

export type ProjectSlug = 'anunciecompre' | 'collectapp';

export interface ProjectContent {
  slug: ProjectSlug;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  patterns: string[];
  highlights: string[];
  showsAboutMe: string[];
  github?: string;
  isPrivate?: boolean;
  images: { src: string; alt: string }[];
  roadmap?: { done: string[]; planned: string[] };
  codeSections?: { title: string; caption: string; code: string }[];
}

const anunciecompre: Record<Locale, ProjectContent> = {
  pt: {
    slug: 'anunciecompre',
    title: 'AnuncieCompre',
    tagline: 'Chatbot de pedidos via WhatsApp',
    description:
      'Backend para coleta estruturada de pedidos via WhatsApp (Twilio). O sistema guia o usuário por um fluxo conversacional baseado em estados, valida dados e gera pedidos automaticamente, com processamento assíncrono via Redis Streams.',
    stack: [
      '.NET',
      'PostgreSQL',
      'EF Core',
      'Redis',
      'Redis Streams',
      'Twilio',
    ],
    patterns: [
      'Clean Architecture',
      'DDD',
      'State Machine',
      'Domain Events',
      'Value Objects',
      'Strategy Pattern',
      'Producer/Consumer',
    ],
    highlights: [
      'Atendimento automatizado via WhatsApp',
      'Fluxo conversacional com validação por estado',
      'Registro de usuários (cliente/fornecedor)',
      'Criação automática de pedidos',
      'Estado da conversa por usuário no Redis',
      'Processamento assíncrono com Redis Streams',
    ],
    showsAboutMe: [
      'Modelagem de domínio com Aggregates, Value Objects e Domain Events',
      'Integração com APIs externas via webhooks (Twilio)',
      'Mensageria e desacoplamento com Producer/Consumer',
      'Gerenciamento de estado distribuído no Redis',
      'Idempotência no processamento de eventos',
    ],
    isPrivate: true,
    images: [
      {
        src: '/projects/anunciecompre/cadastro-whatsapp.png',
        alt: 'Fluxo de registro de usuário via WhatsApp',
      },
      {
        src: '/projects/anunciecompre/pedido-whatsapp.png',
        alt: 'Fluxo de criação de pedido via WhatsApp',
      },
    ],
    roadmap: {
      done: ['Redis Streams', 'Event-Driven', 'DDD', 'State Machine'],
      planned: [
        'Outbox Pattern',
        'RabbitMQ',
        'CQRS completo',
        'Kubernetes',
        'CI/CD',
        'OpenTelemetry',
      ],
    },
    codeSections: [
      {
        title: 'State Machine — HandleMessage',
        caption:
          'Cada mensagem passa pelo nó atual do fluxo. Se válida, avança o estado e pode disparar Domain Events.',
        code: `public (ReadOnlyCollection<string> response, string nextStepId) HandleMessage(
    IConversationNode awaitingResponseNode,
    string message,
    User user,
    bool isSessionJustCreated)
{
    if (isSessionJustCreated)
        return ([awaitingResponseNode.Message], awaitingResponseNode.Id);

    if (awaitingResponseNode is FinalNode)
        return ([awaitingResponseNode.Transitions["next"].Message],
                awaitingResponseNode.Transitions["next"].Id);

    NodeResult result = awaitingResponseNode.NodeValidator
        .Validate(awaitingResponseNode, message);

    if (result.IsSuccess && result.ProcDomainEvent)
    {
        foreach (var factory in awaitingResponseNode.DomainEventFactory)
            AddDomainEvent(factory.Handle(user, result.Value));
    }

    return ([result.Message], result.NextStepId);
}`,
      },
      {
        title: 'Strategy — ValidationNodeValidator',
        caption:
          'Cada tipo de resposta delega validação a um IValueObjectValidator — Strategy Pattern sem switch gigante.',
        code: `public class ValidationNodeValidator(IValueObjectValidator valueObjectValidator)
    : INodeValidator
{
    public NodeResult Validate(IConversationNode conversationNode, string message)
    {
        IResultValueObject result = valueObjectValidator.Validate(message);

        if (!result.IsSuccess)
            return NodeResult.Failure(result.Message, conversationNode.Id);

        return NodeResult.Success(
            result.Value!,
            conversationNode.Transitions["next"].Message,
            conversationNode.Transitions["next"].Id);
    }
}`,
      },
      {
        title: 'Consumer — Redis Streams',
        caption:
          'Processamento assíncrono desacoplado do webhook Twilio — Consumer Group, idempotência e ACK.',
        code: `var messages = await db.StreamReadGroupAsync(
    "events:customer-sent-product", "workers",
    "customer-sent-product", ">", count: 5);

foreach (var message in messages)
{
    var eventId = (string?)message["eventId"];
    var eventKey = $"processed-events:{eventId}";

    if (await db.KeyExistsAsync(eventKey))
    {
        await db.StreamAcknowledgeAsync(
            "events:customer-sent-product", "workers", message.Id);
        continue;
    }

    var domainEvent = JsonSerializer
        .Deserialize<CustomerSentProductDomainEvent>((string?)message["event"]);

    await db.HashSetAsync($"session:{domainEvent.Phone}",
        new HashEntry("product", domainEvent.Product));
    await db.StringSetAsync(eventKey, "1", TimeSpan.FromDays(7));
    await db.StreamAcknowledgeAsync(
        "events:customer-sent-product", "workers", message.Id);
}`,
      },
    ],
  },
  en: {
    slug: 'anunciecompre',
    title: 'AnuncieCompre',
    tagline: 'WhatsApp order chatbot',
    description:
      'Backend for structured order collection via WhatsApp (Twilio). Guides users through a state-based conversational flow, validates input, and creates orders automatically with async processing via Redis Streams.',
    stack: [
      '.NET',
      'PostgreSQL',
      'EF Core',
      'Redis',
      'Redis Streams',
      'Twilio',
    ],
    patterns: [
      'Clean Architecture',
      'DDD',
      'State Machine',
      'Domain Events',
      'Value Objects',
      'Strategy Pattern',
      'Producer/Consumer',
    ],
    highlights: [
      'Automated WhatsApp customer service',
      'State-based conversational flow with validation',
      'User registration (client/supplier)',
      'Automatic order creation',
      'Per-user conversation state in Redis',
      'Async processing with Redis Streams',
    ],
    showsAboutMe: [
      'Domain modeling with Aggregates, Value Objects, and Domain Events',
      'External API integration via webhooks (Twilio)',
      'Messaging and decoupling with Producer/Consumer',
      'Distributed state management in Redis',
      'Idempotent event processing',
    ],
    isPrivate: true,
    images: [
      {
        src: '/projects/anunciecompre/cadastro-whatsapp.png',
        alt: 'WhatsApp user registration flow',
      },
      {
        src: '/projects/anunciecompre/pedido-whatsapp.png',
        alt: 'WhatsApp order creation flow',
      },
    ],
    roadmap: {
      done: ['Redis Streams', 'Event-Driven', 'DDD', 'State Machine'],
      planned: [
        'Outbox Pattern',
        'RabbitMQ',
        'Full CQRS',
        'Kubernetes',
        'CI/CD',
        'OpenTelemetry',
      ],
    },
    codeSections: [
      {
        title: 'State Machine — HandleMessage',
        caption:
          'Each message goes through the current flow node. If valid, it advances state and may raise Domain Events.',
        code: `public (ReadOnlyCollection<string> response, string nextStepId) HandleMessage(
    IConversationNode awaitingResponseNode,
    string message,
    User user,
    bool isSessionJustCreated)
{
    if (isSessionJustCreated)
        return ([awaitingResponseNode.Message], awaitingResponseNode.Id);

    if (awaitingResponseNode is FinalNode)
        return ([awaitingResponseNode.Transitions["next"].Message],
                awaitingResponseNode.Transitions["next"].Id);

    NodeResult result = awaitingResponseNode.NodeValidator
        .Validate(awaitingResponseNode, message);

    if (result.IsSuccess && result.ProcDomainEvent)
    {
        foreach (var factory in awaitingResponseNode.DomainEventFactory)
            AddDomainEvent(factory.Handle(user, result.Value));
    }

    return ([result.Message], result.NextStepId);
}`,
      },
      {
        title: 'Strategy — ValidationNodeValidator',
        caption:
          'Each response type delegates validation to an IValueObjectValidator — Strategy Pattern without a giant switch.',
        code: `public class ValidationNodeValidator(IValueObjectValidator valueObjectValidator)
    : INodeValidator
{
    public NodeResult Validate(IConversationNode conversationNode, string message)
    {
        IResultValueObject result = valueObjectValidator.Validate(message);

        if (!result.IsSuccess)
            return NodeResult.Failure(result.Message, conversationNode.Id);

        return NodeResult.Success(
            result.Value!,
            conversationNode.Transitions["next"].Message,
            conversationNode.Transitions["next"].Id);
    }
}`,
      },
      {
        title: 'Consumer — Redis Streams',
        caption:
          'Async processing decoupled from the Twilio webhook — Consumer Group, idempotency, and ACK.',
        code: `var messages = await db.StreamReadGroupAsync(
    "events:customer-sent-product", "workers",
    "customer-sent-product", ">", count: 5);

foreach (var message in messages)
{
    var eventId = (string?)message["eventId"];
    var eventKey = $"processed-events:{eventId}";

    if (await db.KeyExistsAsync(eventKey))
    {
        await db.StreamAcknowledgeAsync(
            "events:customer-sent-product", "workers", message.Id);
        continue;
    }

    var domainEvent = JsonSerializer
        .Deserialize<CustomerSentProductDomainEvent>((string?)message["event"]);

    await db.HashSetAsync($"session:{domainEvent.Phone}",
        new HashEntry("product", domainEvent.Product));
    await db.StringSetAsync(eventKey, "1", TimeSpan.FromDays(7));
    await db.StreamAcknowledgeAsync(
        "events:customer-sent-product", "workers", message.Id);
}`,
      },
    ],
  },
};

const collectapp: Record<Locale, ProjectContent> = {
  pt: {
    slug: 'collectapp',
    title: 'CollectApp',
    tagline: 'Sistema de gerenciamento de coletas',
    description:
      'Aplicação web em ASP.NET Core MVC para gerenciamento de processos de coleta, com autenticação, controle de permissões, fluxo de aprovação e dashboard analítico.',
    stack: [
      'ASP.NET Core MVC',
      'Razor',
      'Identity',
      'EF Core',
      'SQL Server',
    ],
    patterns: [
      'MVC tradicional',
      'Role-based access',
      'Regras de negócio na camada de aplicação',
    ],
    highlights: [
      'Cadastro e gestão de coletas',
      'Autenticação e autorização com Identity',
      'Fluxo de aprovação por hierarquia de usuários',
      'Dashboard com KPIs e gráficos',
      'Exportação de relatórios Excel',
      'Testes unitários',
    ],
    showsAboutMe: [
      'Autenticação e controle de permissões por roles',
      'Entrega de produto funcional e completo',
      'Regras de negócio com workflow de aprovação',
      'Dashboard com visualização de dados',
      'Base que levou à evolução para DDD e Clean Architecture',
    ],
    github: 'https://github.com/GustavoFMarcial/CollectApp',
    images: [
      {
        src: '/projects/collectapp/dashboard-coletas.png',
        alt: 'Dashboard de coletas com KPIs e gráficos',
      },
      {
        src: '/projects/collectapp/lista-coletas.png',
        alt: 'Lista de coletas com filtros e exportação',
      },
    ],
  },
  en: {
    slug: 'collectapp',
    title: 'CollectApp',
    tagline: 'Collection management system',
    description:
      'ASP.NET Core MVC web application for collection process management, with authentication, permission control, approval workflow, and analytics dashboard.',
    stack: [
      'ASP.NET Core MVC',
      'Razor',
      'Identity',
      'EF Core',
      'SQL Server',
    ],
    patterns: [
      'Traditional MVC',
      'Role-based access',
      'Business rules in application layer',
    ],
    highlights: [
      'Collection registration and management',
      'Authentication and authorization with Identity',
      'Approval workflow by user hierarchy',
      'Dashboard with KPIs and charts',
      'Excel report export',
      'Unit tests',
    ],
    showsAboutMe: [
      'Authentication and role-based permission control',
      'Delivery of a complete, functional product',
      'Business rules with approval workflow',
      'Dashboard with data visualization',
      'Foundation that led to DDD and Clean Architecture evolution',
    ],
    github: 'https://github.com/GustavoFMarcial/CollectApp',
    images: [
      {
        src: '/projects/collectapp/dashboard-coletas.png',
        alt: 'Collection dashboard with KPIs and charts',
      },
      {
        src: '/projects/collectapp/lista-coletas.png',
        alt: 'Collection list with filters and export',
      },
    ],
  },
};

export function getProject(slug: ProjectSlug, locale: Locale): ProjectContent {
  if (slug === 'anunciecompre') return anunciecompre[locale];
  return collectapp[locale];
}

export function getAllProjects(locale: Locale): ProjectContent[] {
  return [anunciecompre[locale], collectapp[locale]];
}
