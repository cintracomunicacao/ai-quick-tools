type Fields = Record<string, string>

const DIRECT = 'Seja direto. Sem introduções como "Claro!", "Com base nos dados fornecidos" ou "Ótimo!". Vá direto ao ponto.'

export function buildMessages(
  slug: string,
  fields: Fields
): { role: 'system' | 'user'; content: string }[] {
  switch (slug) {
    case 'preco-freelancer': {
      const { horas_mes, despesas, margem, area } = fields
      return [
        { role: 'system', content: `Você é especialista em finanças para freelancers brasileiros. ${DIRECT}

Calcule e mostre:
1. Custo por hora (despesas ÷ horas)
2. Preço mínimo por hora (com margem)
3. Preço recomendado por hora (com margem + buffer)
4. Estimativa por projeto: pequeno (20h), médio (40h), grande (80h)
5. Uma dica prática para a área informada

Use R$ como moeda. Mostre as contas de forma limpa.` },
        { role: 'user', content: `Horas/mês: ${horas_mes}\nDespesas mensais: R$ ${despesas}\nMargem: ${margem}%\nÁrea: ${area || 'não informada'}` },
      ]
    }

    case 'cobranca': {
      const { cliente, valor, vencimento, tom, descricao } = fields
      const instrucao = tom === 'gentil'
        ? 'Tom gentil e amigável. Primeiro contato. Mencione que pode ter sido esquecimento.'
        : tom === 'firme'
        ? 'Tom firme e profissional. Segundo aviso. Deixe claro que precisa de retorno.'
        : 'Tom urgente e sério. Último aviso. Mencione possíveis consequências (protesto, jurídico) sem ameaçar.'
      return [
        { role: 'system', content: `Você escreve mensagens de cobrança para WhatsApp no mercado brasileiro. ${DIRECT} ${instrucao} Máximo 5 linhas. Sem emojis excessivos. Pronta para copiar e enviar.` },
        { role: 'user', content: `Cliente: ${cliente}\nValor: R$ ${valor}\nVencimento: ${vencimento}\nReferente a: ${descricao || 'serviço prestado'}` },
      ]
    }

    case 'divisor-conta': {
      const { total, pessoas, gorjeta, detalhes } = fields
      return [
        { role: 'system', content: `Você faz divisão de contas de forma clara e sem confusão. ${DIRECT}

Se não houver detalhes de quem pediu o quê: mostre divisão igualitária.
Se houver detalhes: calcule quanto cada pessoa deve individualmente.
Sempre mostre: total da conta, gorjeta (se aplicável), total final, e valor por pessoa.
Seja preciso com os números. Use R$.` },
        { role: 'user', content: `Total: R$ ${total}\nPessoas: ${pessoas}\nGorjeta: ${gorjeta || '0'}%\nDetalhes: ${detalhes || 'divisão igualitária'}` },
      ]
    }

    case 'desconto': {
      const { preco_original, desconto, tipo_desconto, custo } = fields
      return [
        { role: 'system', content: `Você faz cálculos de desconto com clareza. ${DIRECT}

Mostre:
1. Preço original
2. Valor do desconto (em R$ e %)
3. Preço final
4. Economia do comprador
${custo ? '5. Margem de lucro restante após o desconto' : ''}

Use R$. Seja preciso.` },
        { role: 'user', content: `Preço original: R$ ${preco_original}\nDesconto: ${desconto} ${tipo_desconto === 'percentual' ? '%' : 'R$'}\nCusto: ${custo ? 'R$ ' + custo : 'não informado'}` },
      ]
    }

    case 'resposta-avaliacao': {
      const { avaliacao, nota, plataforma, nome_empresa } = fields
      const positiva = parseInt(nota) >= 4
      const instrucao = positiva
        ? 'Resposta agradecida, calorosa e que reforça os pontos positivos mencionados.'
        : 'Resposta empática, que reconhece o problema, pede desculpas genuinamente e oferece solução ou contato.'
      return [
        { role: 'system', content: `Você escreve respostas a avaliações de negócios brasileiros no ${plataforma || 'Google'}. ${DIRECT} ${instrucao} Máximo 4 linhas. Tom humano, não corporativo. Pronta para copiar e colar.` },
        { role: 'user', content: `Negócio: ${nome_empresa || 'nosso negócio'}\nNota: ${nota} estrelas\nAvaliação: ${avaliacao}` },
      ]
    }

    case 'juros': {
      const { valor, taxa, periodo, unidade, tipo_taxa } = fields
      return [
        { role: 'system', content: `Você é especialista em matemática financeira. ${DIRECT}

Calcule e apresente em tabela limpa:
1. Juros simples: valor dos juros + montante final
2. Juros compostos: valor dos juros + montante final
3. Diferença entre os dois métodos
4. Evolução por período (mostre pelo menos 3 pontos: início, meio, fim)

Use R$. Mostre as fórmulas usadas de forma resumida.` },
        { role: 'user', content: `Valor inicial: R$ ${valor}\nTaxa: ${taxa}% ${tipo_taxa || 'mensal'}\nPeríodo: ${periodo} ${unidade || 'meses'}` },
      ]
    }

    case 'update-projeto': {
      const { projeto, feito, falta, prazo, canal } = fields
      const formato = canal === 'email'
        ? 'Formato e-mail: assunto + corpo com saudação e assinatura [Seu Nome].'
        : 'Formato WhatsApp: direto, sem saudações longas, use listas com emoji ✅ e 🔜.'
      return [
        { role: 'system', content: `Você transforma anotações brutas em updates profissionais para clientes brasileiros. ${DIRECT} ${formato} Seja claro e transmita controle da situação.` },
        { role: 'user', content: `Projeto: ${projeto}\nFeito:\n${feito}\nFalta:\n${falta || 'não informado'}\nPrazo: ${prazo || 'não informado'}` },
      ]
    }

    case 'desculpa': {
      const { erro, destinatario, canal, gravidade } = fields
      const instrucao = gravidade === 'grave'
        ? 'Reconheça completamente, assuma responsabilidade total, proponha solução concreta e compensação.'
        : gravidade === 'moderada'
        ? 'Reconheça o problema, assuma responsabilidade, explique brevemente e proponha solução.'
        : 'Reconheça, peça desculpas de forma genuína e confirme que não vai se repetir.'
      const formato = canal === 'email' ? 'Formato e-mail com assunto.' : 'Formato WhatsApp, conciso.'
      return [
        { role: 'system', content: `Você escreve mensagens de desculpa profissional no contexto brasileiro. ${DIRECT} ${instrucao} ${formato} Tom humano e sincero — sem exageros, sem se humilhar demais.` },
        { role: 'user', content: `Situação: ${erro}\nDestinatário: ${destinatario || 'cliente'}\nGravidade: ${gravidade || 'moderada'}` },
      ]
    }

    case 'margem': {
      const { custo, margem, impostos, tipo } = fields
      return [
        { role: 'system', content: `Você é especialista em precificação para o mercado brasileiro. ${DIRECT}

Calcule e mostre:
1. Preço de venda recomendado
2. Markup aplicado
3. Margem real após impostos (se informado)
4. Preço mínimo (ponto de equilíbrio)
5. Tabela com 3 cenários: margem conservadora, recomendada e agressiva

Use R$. Seja preciso.` },
        { role: 'user', content: `Custo: R$ ${custo}\nMargem desejada: ${margem}%\nImpostos: ${impostos || '0'}%\nTipo: ${tipo || 'produto'}` },
      ]
    }

    case 'hashtags': {
      const { nicho, assunto, rede, volume } = fields
      const qtd = volume === 'poucos' ? '5 a 8' : volume === 'muitos' ? '20 a 30' : '10 a 15'
      return [
        { role: 'system', content: `Você é especialista em social media brasileiro. ${DIRECT}

Gere ${qtd} hashtags para ${rede || 'Instagram'}, organizadas em 3 grupos:
- 🔥 Alto volume (populares, grande alcance)
- 🎯 Médio volume (nicho, mais engajamento)
- 💎 Cauda longa (específicas, alta conversão)

Ao final: uma dica de estratégia em 1 linha.` },
        { role: 'user', content: `Nicho: ${nicho}\nAssunto: ${assunto}\nRede: ${rede}` },
      ]
    }

    case 'moeda': {
      const { valor, moeda, contexto } = fields
      return [
        { role: 'system', content: `Você é especialista em câmbio e finanças internacionais com foco no mercado brasileiro. ${DIRECT}

Mostre:
1. Conversão usando a taxa de câmbio atual aproximada (use seu conhecimento mais recente)
2. Faixa realista (câmbio comercial vs turismo/cartão — tipicamente 3-8% maior)
3. Dica prática para o contexto de uso informado (ex: como pagar mais barato, quando converter, etc.)

Deixe claro que as taxas são aproximadas e podem variar. Use R$ e o símbolo da moeda destino.` },
        { role: 'user', content: `Valor: R$ ${valor}\nMoeda destino: ${moeda}\nContexto: ${contexto || 'geral'}` },
      ]
    }

    case 'legenda': {
      const { nicho, tema, rede, tom } = fields
      const instrucaoRede = rede === 'linkedin'
        ? 'LinkedIn: profissional mas humano, foco em insight, máximo 3 hashtags no final.'
        : 'Instagram: engajante, use quebras de linha, CTA no final, 8-12 hashtags relevantes.'
      return [
        { role: 'system', content: `Você é social media especializado no mercado brasileiro. ${DIRECT} ${instrucaoRede} Tom: ${tom || 'descontraído'}. Pronta para copiar e postar.` },
        { role: 'user', content: `Nicho: ${nicho}\nTema do post: ${tema}` },
      ]
    }

    default:
      return [
        { role: 'system', content: `Você é um assistente útil. ${DIRECT} Responda em português brasileiro.` },
        { role: 'user', content: JSON.stringify(fields) },
      ]
  }
}
