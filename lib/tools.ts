export interface ToolOption {
  name: string
  label: string
  values: { value: string; label: string }[]
}

export interface Tool {
  slug: string
  name: string
  description: string
  icon: string
  inputLabel: string
  inputPlaceholder: string
  outputMode: 'prose' | 'code'
  submitLabel?: string
  options?: ToolOption[]
}

export const tools: Tool[] = [
  {
    slug: 'juridiques',
    name: 'Simplificador de Juridiquês',
    description: 'Cole um contrato ou cláusula, receba em português claro.',
    icon: '⚖️',
    inputLabel: 'Texto jurídico',
    inputPlaceholder: 'Cole aqui o contrato, cláusula ou texto jurídico...',
    outputMode: 'prose',
    submitLabel: 'Simplificar',
  },
  {
    slug: 'contrato',
    name: 'Gerador de Contrato Simples',
    description: 'Descreva o acordo, receba um contrato básico pronto.',
    icon: '📝',
    inputLabel: 'Descreva o acordo',
    inputPlaceholder: 'Ex: Contrato de prestação de serviços de design entre mim (freelancer) e uma empresa. Prazo de 30 dias, valor de R$3.000, pagamento em duas parcelas...',
    outputMode: 'prose',
    submitLabel: 'Gerar Contrato',
  },
  {
    slug: 'reclamacao',
    name: 'Resposta a Reclamação',
    description: 'Reclamação de cliente → resposta profissional e empática.',
    icon: '💬',
    inputLabel: 'Reclamação do cliente',
    inputPlaceholder: 'Cole aqui a reclamação do cliente...',
    outputMode: 'prose',
    submitLabel: 'Gerar Resposta',
    options: [
      {
        name: 'tom',
        label: 'Tom',
        values: [
          { value: 'empatico', label: 'Empático' },
          { value: 'firme', label: 'Firme' },
          { value: 'neutro', label: 'Neutro' },
        ],
      },
    ],
  },
  {
    slug: 'descricao-produto',
    name: 'Descrição de Produto',
    description: 'Descreva seu produto → listing otimizado para venda.',
    icon: '🛒',
    inputLabel: 'Descreva seu produto',
    inputPlaceholder: 'Ex: Tênis masculino, couro legítimo, solado de borracha, disponível nos tamanhos 38 a 44, cores preto e marrom...',
    outputMode: 'prose',
    submitLabel: 'Gerar Descrição',
    options: [
      {
        name: 'plataforma',
        label: 'Plataforma',
        values: [
          { value: 'mercadolivre', label: 'Mercado Livre' },
          { value: 'shopee', label: 'Shopee' },
          { value: 'geral', label: 'Geral' },
        ],
      },
    ],
  },
  {
    slug: 'ata-reuniao',
    name: 'Gerador de Ata de Reunião',
    description: 'Anotações brutas → ata formal e organizada.',
    icon: '📋',
    inputLabel: 'Anotações da reunião',
    inputPlaceholder: 'Cole aqui suas anotações brutas, tópicos discutidos, decisões tomadas e responsáveis...',
    outputMode: 'prose',
    submitLabel: 'Gerar Ata',
  },
  {
    slug: 'whatsapp',
    name: 'Adaptador para WhatsApp',
    description: 'Texto longo → mensagem direta e no tom certo para WhatsApp.',
    icon: '📱',
    inputLabel: 'Texto original',
    inputPlaceholder: 'Cole aqui o texto que você quer adaptar para WhatsApp...',
    outputMode: 'prose',
    submitLabel: 'Adaptar',
    options: [
      {
        name: 'tom',
        label: 'Tom',
        values: [
          { value: 'casual', label: 'Casual' },
          { value: 'formal', label: 'Formal' },
        ],
      },
    ],
  },
  {
    slug: 'mensagem',
    name: 'Corretor de Mensagem',
    description: 'Cole a mensagem antes de enviar, receba uma versão melhorada.',
    icon: '✉️',
    inputLabel: 'Mensagem que você quer enviar',
    inputPlaceholder: 'Cole aqui a mensagem antes de enviar...',
    outputMode: 'prose',
    submitLabel: 'Corrigir',
  },
  {
    slug: 'proposta',
    name: 'Gerador de Proposta Comercial',
    description: 'Bullet points → proposta completa e profissional.',
    icon: '💼',
    inputLabel: 'Pontos da proposta',
    inputPlaceholder: 'Ex:\n- Cliente: Restaurante Sabor & Arte\n- Serviço: Gestão de redes sociais\n- Entregáveis: 20 posts/mês, stories diários, relatório mensal\n- Valor: R$1.500/mês\n- Prazo de contrato: 3 meses',
    outputMode: 'prose',
    submitLabel: 'Gerar Proposta',
  },
  {
    slug: 'bio',
    name: 'Gerador de Bio Profissional',
    description: 'Conte quem você é → bio pronta para qualquer canal.',
    icon: '👤',
    inputLabel: 'Sobre você',
    inputPlaceholder: 'Ex: Sou designer gráfico com 8 anos de experiência, especializado em identidade visual para pequenas empresas. Já atendi mais de 200 clientes. Gosto de café e música brasileira.',
    outputMode: 'prose',
    submitLabel: 'Gerar Bio',
    options: [
      {
        name: 'canal',
        label: 'Canal',
        values: [
          { value: 'linkedin', label: 'LinkedIn' },
          { value: 'instagram', label: 'Instagram' },
          { value: 'site', label: 'Site' },
        ],
      },
    ],
  },
  {
    slug: 'script-vendas',
    name: 'Script de Vendas',
    description: 'Descrição do produto → script de vendas persuasivo.',
    icon: '🎯',
    inputLabel: 'Descreva seu produto ou serviço',
    inputPlaceholder: 'Ex: Curso online de Excel para iniciantes, 12 horas de conteúdo, certificado incluso, R$197...',
    outputMode: 'prose',
    submitLabel: 'Gerar Script',
  },
  {
    slug: 'legenda',
    name: 'Legenda para Redes Sociais',
    description: 'Ideia ou texto → legenda com hashtags.',
    icon: '📸',
    inputLabel: 'Ideia ou texto base',
    inputPlaceholder: 'Ex: Foto do novo produto, uma bolsa artesanal feita à mão em couro, cores terrosas, lançamento verão...',
    outputMode: 'prose',
    submitLabel: 'Gerar Legenda',
    options: [
      {
        name: 'rede',
        label: 'Rede',
        values: [
          { value: 'instagram', label: 'Instagram' },
          { value: 'linkedin', label: 'LinkedIn' },
        ],
      },
    ],
  },
  {
    slug: 'presentes',
    name: 'Ideias para Presentes',
    description: 'Descreva a pessoa e o contexto → sugestões personalizadas.',
    icon: '🎁',
    inputLabel: 'Conte sobre a pessoa e a ocasião',
    inputPlaceholder: 'Ex: Minha mãe, 58 anos, aposentada, adora jardinagem e culinária, aniversário de 60 anos, quero gastar até R$200...',
    outputMode: 'prose',
    submitLabel: 'Sugerir Presentes',
  },
]

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug)
}
