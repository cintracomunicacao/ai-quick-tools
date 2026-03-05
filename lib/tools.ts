export type FieldType = 'text' | 'number' | 'select' | 'date' | 'textarea'

export interface ToolField {
  name: string
  label: string
  type: FieldType
  placeholder?: string
  options?: { value: string; label: string }[]
  required?: boolean
  hint?: string
}

export interface Tool {
  slug: string
  name: string
  description: string
  icon: string
  submitLabel: string
  outputMode: 'prose' | 'code'
  fields: ToolField[]
}

export const tools: Tool[] = [
  {
    slug: 'preco-freelancer',
    name: 'Calculadora de Preço Freelancer',
    description: 'Descubra o preço justo para cobrar pelo seu trabalho.',
    icon: '💰',
    submitLabel: 'Calcular',
    outputMode: 'prose',
    fields: [
      { name: 'horas_mes', label: 'Horas trabalhadas por mês', type: 'number', placeholder: '160', required: true },
      { name: 'despesas', label: 'Despesas mensais (R$)', type: 'number', placeholder: '3000', required: true, hint: 'Aluguel, internet, softwares, alimentação...' },
      { name: 'margem', label: 'Margem de lucro desejada (%)', type: 'number', placeholder: '30', required: true },
      { name: 'area', label: 'Área de atuação', type: 'text', placeholder: 'Ex: Design, Desenvolvimento, Redação' },
    ],
  },
  {
    slug: 'cobranca',
    name: 'Gerador de Cobrança',
    description: 'Mensagem de cobrança pronta para mandar no WhatsApp.',
    icon: '📲',
    submitLabel: 'Gerar Mensagem',
    outputMode: 'prose',
    fields: [
      { name: 'cliente', label: 'Nome do cliente', type: 'text', placeholder: 'João', required: true },
      { name: 'valor', label: 'Valor em aberto (R$)', type: 'number', placeholder: '500', required: true },
      { name: 'vencimento', label: 'Data de vencimento', type: 'date', required: true },
      { name: 'tom', label: 'Tom da mensagem', type: 'select', required: true, options: [
        { value: 'gentil', label: 'Gentil (primeiro aviso)' },
        { value: 'firme', label: 'Firme (segundo aviso)' },
        { value: 'urgente', label: 'Urgente (último aviso)' },
      ]},
      { name: 'descricao', label: 'O que está sendo cobrado', type: 'text', placeholder: 'Ex: Serviço de design do logo' },
    ],
  },
  {
    slug: 'divisor-conta',
    name: 'Divisor de Conta',
    description: 'Quanto cada pessoa paga? Resolva sem discussão.',
    icon: '🍕',
    submitLabel: 'Dividir',
    outputMode: 'prose',
    fields: [
      { name: 'total', label: 'Valor total da conta (R$)', type: 'number', placeholder: '320', required: true },
      { name: 'pessoas', label: 'Número de pessoas', type: 'number', placeholder: '4', required: true },
      { name: 'gorjeta', label: 'Incluir gorjeta (%)', type: 'select', options: [
        { value: '0', label: 'Sem gorjeta' },
        { value: '10', label: '10%' },
        { value: '15', label: '15%' },
      ]},
      { name: 'detalhes', label: 'Quem pediu o quê (opcional)', type: 'textarea', placeholder: 'Ex:\nAna: prato principal R$45, bebida R$15\nCarlos: prato principal R$55\nMarcos: só bebidas R$30' },
    ],
  },
  {
    slug: 'desconto',
    name: 'Calculadora de Desconto',
    description: 'Preço final, economia real e margem em segundos.',
    icon: '🏷️',
    submitLabel: 'Calcular',
    outputMode: 'prose',
    fields: [
      { name: 'preco_original', label: 'Preço original (R$)', type: 'number', placeholder: '199', required: true },
      { name: 'desconto', label: 'Desconto', type: 'number', placeholder: '20', required: true },
      { name: 'tipo_desconto', label: 'Tipo de desconto', type: 'select', required: true, options: [
        { value: 'percentual', label: 'Porcentagem (%)' },
        { value: 'valor', label: 'Valor fixo (R$)' },
      ]},
      { name: 'custo', label: 'Custo do produto (R$)', type: 'number', placeholder: '80', hint: 'Opcional — para calcular margem restante' },
    ],
  },
  {
    slug: 'resposta-avaliacao',
    name: 'Resposta a Avaliação',
    description: 'Cole a avaliação do cliente e receba a resposta pronta.',
    icon: '⭐',
    submitLabel: 'Gerar Resposta',
    outputMode: 'prose',
    fields: [
      { name: 'avaliacao', label: 'Texto da avaliação', type: 'textarea', placeholder: 'Cole aqui a avaliação do cliente...', required: true },
      { name: 'nota', label: 'Nota dada', type: 'select', required: true, options: [
        { value: '5', label: '⭐⭐⭐⭐⭐ (5 estrelas)' },
        { value: '4', label: '⭐⭐⭐⭐ (4 estrelas)' },
        { value: '3', label: '⭐⭐⭐ (3 estrelas)' },
        { value: '2', label: '⭐⭐ (2 estrelas)' },
        { value: '1', label: '⭐ (1 estrela)' },
      ]},
      { name: 'plataforma', label: 'Plataforma', type: 'select', options: [
        { value: 'google', label: 'Google' },
        { value: 'ifood', label: 'iFood' },
        { value: 'reclame_aqui', label: 'Reclame Aqui' },
        { value: 'outro', label: 'Outro' },
      ]},
      { name: 'nome_empresa', label: 'Nome do seu negócio', type: 'text', placeholder: 'Ex: Restaurante Sabor & Arte' },
    ],
  },
  {
    slug: 'juros',
    name: 'Calculadora de Juros',
    description: 'Juros simples e compostos lado a lado, explicados.',
    icon: '📈',
    submitLabel: 'Calcular',
    outputMode: 'prose',
    fields: [
      { name: 'valor', label: 'Valor inicial (R$)', type: 'number', placeholder: '1000', required: true },
      { name: 'taxa', label: 'Taxa de juros (%)', type: 'number', placeholder: '2', required: true },
      { name: 'periodo', label: 'Período', type: 'number', placeholder: '12', required: true },
      { name: 'unidade', label: 'Unidade do período', type: 'select', required: true, options: [
        { value: 'meses', label: 'Meses' },
        { value: 'anos', label: 'Anos' },
        { value: 'dias', label: 'Dias' },
      ]},
      { name: 'tipo_taxa', label: 'A taxa é', type: 'select', options: [
        { value: 'mensal', label: 'Mensal' },
        { value: 'anual', label: 'Anual' },
      ]},
    ],
  },
  {
    slug: 'update-projeto',
    name: 'Update de Projeto para Cliente',
    description: 'Transforme suas anotações num status profissional.',
    icon: '📋',
    submitLabel: 'Gerar Update',
    outputMode: 'prose',
    fields: [
      { name: 'projeto', label: 'Nome do projeto', type: 'text', placeholder: 'Ex: Site novo da loja', required: true },
      { name: 'feito', label: 'O que foi feito', type: 'textarea', placeholder: 'Ex:\n- Criação das telas mobile\n- Integração com pagamento\n- Testes de velocidade', required: true },
      { name: 'falta', label: 'O que ainda falta', type: 'textarea', placeholder: 'Ex:\n- Aprovação do cliente nas telas\n- Deploy em produção' },
      { name: 'prazo', label: 'Previsão de entrega', type: 'text', placeholder: 'Ex: Sexta-feira, 20/06' },
      { name: 'canal', label: 'Será enviado por', type: 'select', options: [
        { value: 'whatsapp', label: 'WhatsApp' },
        { value: 'email', label: 'E-mail' },
      ]},
    ],
  },
  {
    slug: 'desculpa',
    name: 'Gerador de Desculpa Profissional',
    description: 'Desculpa sincera e profissional para qualquer situação.',
    icon: '🤝',
    submitLabel: 'Gerar Mensagem',
    outputMode: 'prose',
    fields: [
      { name: 'erro', label: 'O que aconteceu', type: 'textarea', placeholder: 'Ex: Entrei atraso na entrega do projeto prometido para ontem', required: true },
      { name: 'destinatario', label: 'Para quem é a mensagem', type: 'text', placeholder: 'Ex: cliente, chefe, parceiro' },
      { name: 'canal', label: 'Canal de envio', type: 'select', options: [
        { value: 'whatsapp', label: 'WhatsApp' },
        { value: 'email', label: 'E-mail' },
      ]},
      { name: 'gravidade', label: 'Gravidade da situação', type: 'select', options: [
        { value: 'leve', label: 'Leve (pequeno inconveniente)' },
        { value: 'moderada', label: 'Moderada (causou problema real)' },
        { value: 'grave', label: 'Grave (prejuízo significativo)' },
      ]},
    ],
  },
  {
    slug: 'margem',
    name: 'Simulador de Preço com Margem',
    description: 'Quanto cobrar para ter a margem que você quer.',
    icon: '📊',
    submitLabel: 'Simular',
    outputMode: 'prose',
    fields: [
      { name: 'custo', label: 'Custo do produto/serviço (R$)', type: 'number', placeholder: '80', required: true },
      { name: 'margem', label: 'Margem de lucro desejada (%)', type: 'number', placeholder: '40', required: true },
      { name: 'impostos', label: 'Impostos estimados (%)', type: 'number', placeholder: '6', hint: 'Simples Nacional, ISS, etc.' },
      { name: 'tipo', label: 'Tipo', type: 'select', options: [
        { value: 'produto', label: 'Produto' },
        { value: 'servico', label: 'Serviço' },
      ]},
    ],
  },
  {
    slug: 'hashtags',
    name: 'Gerador de Hashtags',
    description: 'Hashtags otimizadas para seu nicho e rede social.',
    icon: '#️⃣',
    submitLabel: 'Gerar',
    outputMode: 'prose',
    fields: [
      { name: 'nicho', label: 'Nicho ou segmento', type: 'text', placeholder: 'Ex: Fitness feminino, Culinária vegana', required: true },
      { name: 'assunto', label: 'Assunto do post', type: 'text', placeholder: 'Ex: Receita de bolo sem glúten', required: true },
      { name: 'rede', label: 'Rede social', type: 'select', required: true, options: [
        { value: 'instagram', label: 'Instagram' },
        { value: 'linkedin', label: 'LinkedIn' },
        { value: 'tiktok', label: 'TikTok' },
      ]},
      { name: 'volume', label: 'Quantidade', type: 'select', options: [
        { value: 'poucos', label: '5 a 8' },
        { value: 'medio', label: '10 a 15' },
        { value: 'muitos', label: '20 a 30' },
      ]},
    ],
  },
  {
    slug: 'moeda',
    name: 'Conversor de Moeda com Contexto',
    description: 'Converta reais e entenda o câmbio na prática.',
    icon: '💱',
    submitLabel: 'Converter',
    outputMode: 'prose',
    fields: [
      { name: 'valor', label: 'Valor em R$', type: 'number', placeholder: '1000', required: true },
      { name: 'moeda', label: 'Moeda destino', type: 'select', required: true, options: [
        { value: 'USD', label: 'Dólar americano (USD)' },
        { value: 'EUR', label: 'Euro (EUR)' },
        { value: 'GBP', label: 'Libra esterlina (GBP)' },
        { value: 'ARS', label: 'Peso argentino (ARS)' },
        { value: 'PYG', label: 'Guarani paraguaio (PYG)' },
        { value: 'JPY', label: 'Iene japonês (JPY)' },
      ]},
      { name: 'contexto', label: 'Para que vai usar?', type: 'select', options: [
        { value: 'compra_online', label: 'Compra em site internacional' },
        { value: 'viagem', label: 'Viagem ao exterior' },
        { value: 'fornecedor', label: 'Pagamento de fornecedor' },
        { value: 'investimento', label: 'Investimento' },
        { value: 'outro', label: 'Outro' },
      ]},
    ],
  },
  {
    slug: 'legenda',
    name: 'Gerador de Legenda Rápida',
    description: 'Nicho + tema = legenda com hashtags, em segundos.',
    icon: '📸',
    submitLabel: 'Gerar',
    outputMode: 'prose',
    fields: [
      { name: 'nicho', label: 'Seu nicho', type: 'text', placeholder: 'Ex: Confeitaria, Academia, Advocacia', required: true },
      { name: 'tema', label: 'Tema do post', type: 'text', placeholder: 'Ex: Foto do novo bolo de red velvet', required: true },
      { name: 'rede', label: 'Rede social', type: 'select', required: true, options: [
        { value: 'instagram', label: 'Instagram' },
        { value: 'linkedin', label: 'LinkedIn' },
      ]},
      { name: 'tom', label: 'Tom', type: 'select', options: [
        { value: 'descontraido', label: 'Descontraído' },
        { value: 'profissional', label: 'Profissional' },
        { value: 'vendas', label: 'Foco em vendas' },
      ]},
    ],
  },
]

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug)
}
