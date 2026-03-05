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
    description: 'Calcule o preço justo para seu trabalho freelancer.',
    icon: '💰',
    submitLabel: 'Calcular Preço',
    outputMode: 'prose',
    fields: [
      { name: 'horas_mes', label: 'Horas trabalhadas por mês', type: 'number', placeholder: '160', required: true },
      { name: 'despesas', label: 'Despesas mensais (R$)', type: 'number', placeholder: '3000', required: true, hint: 'Aluguel, internet, softwares, alimentação...' },
      { name: 'margem', label: 'Margem de lucro desejada (%)', type: 'number', placeholder: '30', required: true },
      { name: 'tipo_projeto', label: 'Tipo de projeto', type: 'select', required: true, options: [
        { value: 'hora', label: 'Cobrar por hora' },
        { value: 'projeto', label: 'Cobrar por projeto' },
        { value: 'ambos', label: 'Ambos' },
      ]},
      { name: 'area', label: 'Área de atuação', type: 'text', placeholder: 'Ex: Design gráfico, Desenvolvimento web...' },
    ],
  },
  {
    slug: 'rescisao',
    name: 'Simulador de Rescisão',
    description: 'Calcule os valores a receber na rescisão do contrato.',
    icon: '📊',
    submitLabel: 'Simular Rescisão',
    outputMode: 'prose',
    fields: [
      { name: 'salario', label: 'Salário bruto (R$)', type: 'number', placeholder: '3000', required: true },
      { name: 'admissao', label: 'Data de admissão', type: 'date', required: true },
      { name: 'demissao', label: 'Data de demissão', type: 'date', required: true },
      { name: 'tipo', label: 'Tipo de rescisão', type: 'select', required: true, options: [
        { value: 'sem_justa_causa', label: 'Demissão sem justa causa' },
        { value: 'pedido_demissao', label: 'Pedido de demissão' },
        { value: 'justa_causa', label: 'Demissão por justa causa' },
        { value: 'acordo', label: 'Acordo entre as partes' },
      ]},
      { name: 'fgts', label: 'Saldo do FGTS (R$)', type: 'number', placeholder: '5000', hint: 'Opcional — para cálculo mais preciso' },
    ],
  },
  {
    slug: 'recibo',
    name: 'Gerador de Recibo',
    description: 'Preencha os campos e receba um recibo formatado.',
    icon: '🧾',
    submitLabel: 'Gerar Recibo',
    outputMode: 'prose',
    fields: [
      { name: 'pagador', label: 'Nome do pagador', type: 'text', placeholder: 'João da Silva ou Empresa XYZ Ltda', required: true },
      { name: 'recebedor', label: 'Nome do recebedor', type: 'text', placeholder: 'Maria Souza', required: true },
      { name: 'valor', label: 'Valor (R$)', type: 'number', placeholder: '1500', required: true },
      { name: 'descricao', label: 'Descrição do pagamento', type: 'text', placeholder: 'Ex: Prestação de serviços de design — junho/2025', required: true },
      { name: 'data', label: 'Data do pagamento', type: 'date', required: true },
      { name: 'forma', label: 'Forma de pagamento', type: 'select', options: [
        { value: 'pix', label: 'PIX' },
        { value: 'transferencia', label: 'Transferência bancária' },
        { value: 'dinheiro', label: 'Dinheiro' },
        { value: 'cheque', label: 'Cheque' },
      ]},
    ],
  },
  {
    slug: 'termos-de-uso',
    name: 'Gerador de Termos de Uso',
    description: 'Gere termos de uso completos para seu site ou app.',
    icon: '📜',
    submitLabel: 'Gerar Termos',
    outputMode: 'prose',
    fields: [
      { name: 'empresa', label: 'Nome da empresa ou produto', type: 'text', placeholder: 'Ex: Loja da Ana', required: true },
      { name: 'tipo_servico', label: 'Tipo de serviço', type: 'select', required: true, options: [
        { value: 'ecommerce', label: 'E-commerce' },
        { value: 'saas', label: 'SaaS / Aplicativo' },
        { value: 'blog', label: 'Blog / Portal de conteúdo' },
        { value: 'marketplace', label: 'Marketplace' },
        { value: 'servicos', label: 'Prestação de serviços' },
      ]},
      { name: 'site', label: 'URL do site', type: 'text', placeholder: 'www.exemplo.com.br' },
      { name: 'email_contato', label: 'E-mail de contato', type: 'text', placeholder: 'contato@empresa.com.br', required: true },
    ],
  },
  {
    slug: 'politica-privacidade',
    name: 'Gerador de Política de Privacidade',
    description: 'Gere uma política de privacidade compatível com a LGPD.',
    icon: '🔒',
    submitLabel: 'Gerar Política',
    outputMode: 'prose',
    fields: [
      { name: 'empresa', label: 'Nome da empresa', type: 'text', placeholder: 'Ex: Loja da Ana', required: true },
      { name: 'dados_coletados', label: 'Dados coletados dos usuários', type: 'select', required: true, options: [
        { value: 'basico', label: 'Básicos (nome, e-mail)' },
        { value: 'pagamento', label: 'Inclui dados de pagamento' },
        { value: 'localizacao', label: 'Inclui localização' },
        { value: 'completo', label: 'Completo (todos os anteriores)' },
      ]},
      { name: 'email_dpo', label: 'E-mail do responsável (DPO)', type: 'text', placeholder: 'privacidade@empresa.com.br', required: true },
      { name: 'usa_cookies', label: 'Usa cookies?', type: 'select', options: [
        { value: 'sim', label: 'Sim' },
        { value: 'nao', label: 'Não' },
      ]},
    ],
  },
  {
    slug: 'nome-de-marca',
    name: 'Gerador de Nome de Marca',
    description: 'Gere sugestões de nomes criativos para seu negócio.',
    icon: '✨',
    submitLabel: 'Gerar Nomes',
    outputMode: 'prose',
    fields: [
      { name: 'segmento', label: 'Segmento do negócio', type: 'text', placeholder: 'Ex: Confeitaria, Consultoria de RH, App de finanças', required: true },
      { name: 'publico', label: 'Público-alvo', type: 'text', placeholder: 'Ex: Mães de 30-45 anos, jovens universitários', required: true },
      { name: 'tom', label: 'Tom da marca', type: 'select', required: true, options: [
        { value: 'serio', label: 'Sério e profissional' },
        { value: 'divertido', label: 'Divertido e descontraído' },
        { value: 'premium', label: 'Premium e sofisticado' },
        { value: 'acessivel', label: 'Acessível e acolhedor' },
      ]},
      { name: 'quantidade', label: 'Número de sugestões', type: 'select', options: [
        { value: '5', label: '5 nomes' },
        { value: '10', label: '10 nomes' },
        { value: '15', label: '15 nomes' },
      ]},
      { name: 'evitar', label: 'Palavras ou estilos a evitar', type: 'text', placeholder: 'Ex: Nada em inglês, sem nomes próprios' },
    ],
  },
  {
    slug: 'calorias',
    name: 'Contador de Calorias de Receita',
    description: 'Liste os ingredientes e descubra o total calórico.',
    icon: '🥗',
    submitLabel: 'Calcular Calorias',
    outputMode: 'prose',
    fields: [
      { name: 'ingredientes', label: 'Ingredientes com quantidades', type: 'textarea', placeholder: 'Ex:\n2 ovos\n100g de farinha de trigo\n50ml de azeite\n200g de frango grelhado', required: true },
      { name: 'porcoes', label: 'Número de porções', type: 'number', placeholder: '4', required: true },
      { name: 'nome_receita', label: 'Nome da receita (opcional)', type: 'text', placeholder: 'Ex: Frango grelhado com legumes' },
    ],
  },
  {
    slug: 'contrato-aluguel',
    name: 'Gerador de Contrato de Aluguel',
    description: 'Preencha os dados e gere um contrato de aluguel completo.',
    icon: '🏠',
    submitLabel: 'Gerar Contrato',
    outputMode: 'prose',
    fields: [
      { name: 'locador', label: 'Nome do locador (proprietário)', type: 'text', placeholder: 'Carlos Alberto Souza', required: true },
      { name: 'locatario', label: 'Nome do locatário (inquilino)', type: 'text', placeholder: 'Ana Paula Lima', required: true },
      { name: 'endereco', label: 'Endereço do imóvel', type: 'text', placeholder: 'Rua das Flores, 123, Apto 45 — São Paulo/SP', required: true },
      { name: 'valor', label: 'Valor do aluguel (R$)', type: 'number', placeholder: '1800', required: true },
      { name: 'prazo', label: 'Prazo do contrato', type: 'select', required: true, options: [
        { value: '12', label: '12 meses' },
        { value: '24', label: '24 meses' },
        { value: '30', label: '30 meses' },
        { value: 'indeterminado', label: 'Prazo indeterminado' },
      ]},
      { name: 'inicio', label: 'Data de início', type: 'date', required: true },
      { name: 'garantia', label: 'Tipo de garantia', type: 'select', options: [
        { value: 'caucao', label: 'Caução (3 meses)' },
        { value: 'fiador', label: 'Fiador' },
        { value: 'seguro', label: 'Seguro fiança' },
        { value: 'nenhuma', label: 'Sem garantia' },
      ]},
    ],
  },
  {
    slug: 'plano-treino',
    name: 'Plano de Treino',
    description: 'Receba um plano de treino personalizado para seus objetivos.',
    icon: '💪',
    submitLabel: 'Gerar Plano',
    outputMode: 'prose',
    fields: [
      { name: 'objetivo', label: 'Objetivo principal', type: 'select', required: true, options: [
        { value: 'emagrecimento', label: 'Emagrecimento' },
        { value: 'hipertrofia', label: 'Ganho de massa muscular' },
        { value: 'condicionamento', label: 'Condicionamento físico' },
        { value: 'forca', label: 'Ganho de força' },
        { value: 'saude', label: 'Saúde e bem-estar geral' },
      ]},
      { name: 'dias', label: 'Dias disponíveis por semana', type: 'select', required: true, options: [
        { value: '2', label: '2 dias' },
        { value: '3', label: '3 dias' },
        { value: '4', label: '4 dias' },
        { value: '5', label: '5 dias' },
      ]},
      { name: 'nivel', label: 'Nível atual', type: 'select', required: true, options: [
        { value: 'iniciante', label: 'Iniciante (menos de 6 meses)' },
        { value: 'intermediario', label: 'Intermediário (6 meses a 2 anos)' },
        { value: 'avancado', label: 'Avançado (mais de 2 anos)' },
      ]},
      { name: 'equipamento', label: 'Equipamento disponível', type: 'select', required: true, options: [
        { value: 'academia', label: 'Academia completa' },
        { value: 'casa_basico', label: 'Em casa com equipamentos básicos' },
        { value: 'sem_equipamento', label: 'Sem equipamentos (peso corporal)' },
      ]},
      { name: 'restricoes', label: 'Lesões ou restrições', type: 'text', placeholder: 'Ex: Dor no joelho direito, hérnia de disco' },
    ],
  },
  {
    slug: 'curriculo',
    name: 'Gerador de Currículo',
    description: 'Preencha seus dados e receba um currículo profissional.',
    icon: '📄',
    submitLabel: 'Gerar Currículo',
    outputMode: 'prose',
    fields: [
      { name: 'nome', label: 'Nome completo', type: 'text', placeholder: 'Ana Paula Rodrigues', required: true },
      { name: 'cargo', label: 'Cargo desejado', type: 'text', placeholder: 'Analista de Marketing Digital', required: true },
      { name: 'contato', label: 'E-mail e telefone', type: 'text', placeholder: 'ana@email.com | (11) 99999-0000' },
      { name: 'experiencias', label: 'Experiências profissionais', type: 'textarea', placeholder: 'Ex:\nAnalista Jr — Empresa ABC (2022–2024): gestão de redes sociais, criação de conteúdo, relatórios mensais\nEstagiária — Agência XYZ (2021–2022): apoio em campanhas pagas', required: true },
      { name: 'formacao', label: 'Formação acadêmica', type: 'textarea', placeholder: 'Ex:\nBacharelado em Comunicação — USP (2018–2022)\nMBA em Marketing Digital — FGV (2023–2024)' },
      { name: 'habilidades', label: 'Habilidades e ferramentas', type: 'text', placeholder: 'Ex: Google Ads, Meta Ads, Excel, Canva, Inglês avançado' },
    ],
  },
  {
    slug: 'viagem',
    name: 'Planejador de Viagem',
    description: 'Receba um roteiro completo para sua próxima viagem.',
    icon: '✈️',
    submitLabel: 'Planejar Viagem',
    outputMode: 'prose',
    fields: [
      { name: 'destino', label: 'Destino', type: 'text', placeholder: 'Ex: Lisboa, Portugal', required: true },
      { name: 'ida', label: 'Data de ida', type: 'date', required: true },
      { name: 'volta', label: 'Data de volta', type: 'date', required: true },
      { name: 'pessoas', label: 'Número de pessoas', type: 'select', required: true, options: [
        { value: '1', label: '1 pessoa' },
        { value: '2', label: '2 pessoas' },
        { value: '3_4', label: '3 a 4 pessoas' },
        { value: '5_mais', label: '5 ou mais' },
      ]},
      { name: 'orcamento', label: 'Orçamento total (R$)', type: 'number', placeholder: '10000', required: true },
      { name: 'estilo', label: 'Estilo da viagem', type: 'select', required: true, options: [
        { value: 'cultura', label: 'Cultura e história' },
        { value: 'aventura', label: 'Aventura e natureza' },
        { value: 'relaxamento', label: 'Relaxamento e descanso' },
        { value: 'gastronomia', label: 'Gastronomia' },
        { value: 'balada', label: 'Vida noturna' },
      ]},
    ],
  },
  {
    slug: 'hashtags',
    name: 'Gerador de Hashtags',
    description: 'Gere hashtags otimizadas para seu nicho e rede social.',
    icon: '#️⃣',
    submitLabel: 'Gerar Hashtags',
    outputMode: 'prose',
    fields: [
      { name: 'nicho', label: 'Nicho ou segmento', type: 'text', placeholder: 'Ex: Fitness feminino, Culinária vegana, Moda plus size', required: true },
      { name: 'assunto', label: 'Assunto do post', type: 'text', placeholder: 'Ex: Receita de bolo de chocolate sem glúten', required: true },
      { name: 'rede', label: 'Rede social', type: 'select', required: true, options: [
        { value: 'instagram', label: 'Instagram' },
        { value: 'linkedin', label: 'LinkedIn' },
        { value: 'tiktok', label: 'TikTok' },
      ]},
      { name: 'volume', label: 'Volume de hashtags', type: 'select', options: [
        { value: 'poucos', label: 'Poucos (5–8)' },
        { value: 'medio', label: 'Médio (10–15)' },
        { value: 'muitos', label: 'Muitos (20–30)' },
      ]},
    ],
  },
]

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug)
}
