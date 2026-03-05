type Fields = Record<string, string>

export function buildMessages(
  slug: string,
  fields: Fields
): { role: 'system' | 'user'; content: string }[] {
  switch (slug) {
    case 'preco-freelancer': {
      const { horas_mes, despesas, margem, tipo_projeto, area } = fields
      return [
        { role: 'system', content: `Você é um especialista em finanças para freelancers brasileiros. Calcule o preço justo com base nos dados fornecidos. Mostre o raciocínio passo a passo, o preço por hora, por projeto (estimativa para projetos de 20h, 40h e 80h) e dicas práticas para essa área. Use R$ como moeda. Seja direto e prático.` },
        { role: 'user', content: `Horas trabalhadas por mês: ${horas_mes}\nDespesas mensais: R$ ${despesas}\nMargem de lucro desejada: ${margem}%\nTipo de cobrança: ${tipo_projeto}\nÁrea: ${area || 'não informada'}` },
      ]
    }

    case 'rescisao': {
      const { salario, admissao, demissao, tipo, fgts } = fields
      return [
        { role: 'system', content: `Você é um especialista em direito trabalhista brasileiro. Calcule os valores de rescisão com base nos dados fornecidos. Liste cada verba separadamente (saldo de salário, aviso prévio, férias proporcionais + 1/3, 13º proporcional, FGTS + multa se aplicável). Informe o total líquido estimado. Adicione observações importantes sobre esse tipo de rescisão. Use R$ como moeda. Avise que é uma estimativa e recomende confirmar com o RH ou advogado.` },
        { role: 'user', content: `Salário bruto: R$ ${salario}\nData de admissão: ${admissao}\nData de demissão: ${demissao}\nTipo de rescisão: ${tipo}\nSaldo do FGTS: ${fgts ? 'R$ ' + fgts : 'não informado'}` },
      ]
    }

    case 'recibo': {
      const { pagador, recebedor, valor, descricao, data, forma } = fields
      return [
        { role: 'system', content: `Gere um recibo formal e completo em português brasileiro. Inclua: título "RECIBO", número de recibo fictício, todos os dados fornecidos formatados corretamente, o valor por extenso, campo para assinatura. Formate como um documento real, pronto para imprimir ou enviar.` },
        { role: 'user', content: `Pagador: ${pagador}\nRecebedor: ${recebedor}\nValor: R$ ${valor}\nDescrição: ${descricao}\nData: ${data}\nForma de pagamento: ${forma || 'não informada'}` },
      ]
    }

    case 'termos-de-uso': {
      const { empresa, tipo_servico, site, email_contato } = fields
      return [
        { role: 'system', content: `Você é um advogado especializado em direito digital brasileiro. Gere Termos de Uso completos, compatíveis com a legislação brasileira (LGPD, CDC, Marco Civil da Internet). Inclua: aceitação dos termos, descrição do serviço, obrigações do usuário, limitações de responsabilidade, propriedade intelectual, cancelamento, foro. Linguagem clara mas formal.` },
        { role: 'user', content: `Empresa/produto: ${empresa}\nTipo de serviço: ${tipo_servico}\nSite: ${site || 'não informado'}\nE-mail de contato: ${email_contato}` },
      ]
    }

    case 'politica-privacidade': {
      const { empresa, dados_coletados, email_dpo, usa_cookies } = fields
      return [
        { role: 'system', content: `Você é um especialista em LGPD (Lei Geral de Proteção de Dados). Gere uma Política de Privacidade completa e compatível com a LGPD brasileira. Inclua: dados coletados e finalidade, base legal, compartilhamento, direitos do titular, segurança, cookies (se aplicável), contato do DPO, vigência. Linguagem acessível mas jurídica.` },
        { role: 'user', content: `Empresa: ${empresa}\nDados coletados: ${dados_coletados}\nE-mail do DPO: ${email_dpo}\nUsa cookies: ${usa_cookies || 'sim'}` },
      ]
    }

    case 'nome-de-marca': {
      const { segmento, publico, tom, quantidade, evitar } = fields
      const qtd = quantidade || '5'
      return [
        { role: 'system', content: `Você é um especialista em branding e naming para o mercado brasileiro. Gere ${qtd} sugestões de nomes de marca criativos, memoráveis e adequados ao contexto. Para cada nome: apresente o nome, explique o conceito por trás dele (1-2 frases) e avalie a disponibilidade provável como domínio .com.br. Evite nomes genéricos ou clichês.` },
        { role: 'user', content: `Segmento: ${segmento}\nPúblico-alvo: ${publico}\nTom da marca: ${tom}\nA evitar: ${evitar || 'nada especificado'}` },
      ]
    }

    case 'calorias': {
      const { ingredientes, porcoes, nome_receita } = fields
      return [
        { role: 'system', content: `Você é um nutricionista brasileiro. Calcule as calorias estimadas da receita com base nos ingredientes. Liste cada ingrediente com sua caloria estimada, o total da receita inteira e o total por porção. Adicione o breakdown de macronutrientes (proteínas, carboidratos, gorduras) estimado. Avise que são estimativas baseadas em tabelas nutricionais padrão.` },
        { role: 'user', content: `Receita: ${nome_receita || 'sem nome'}\nIngredientes:\n${ingredientes}\nNúmero de porções: ${porcoes}` },
      ]
    }

    case 'contrato-aluguel': {
      const { locador, locatario, endereco, valor, prazo, inicio, garantia } = fields
      return [
        { role: 'system', content: `Você é um advogado especializado em direito imobiliário brasileiro. Gere um contrato de locação residencial completo, compatível com a Lei do Inquilinato (Lei 8.245/91). Inclua: qualificação das partes, objeto, valor e reajuste (IGPM), prazo, garantia, obrigações do locador e locatário, rescisão, multa, foro. Formate como documento oficial com campos [A PREENCHER] onde necessário.` },
        { role: 'user', content: `Locador: ${locador}\nLocatário: ${locatario}\nEndereço: ${endereco}\nValor: R$ ${valor}/mês\nPrazo: ${prazo} meses\nInício: ${inicio}\nGarantia: ${garantia || 'caução'}` },
      ]
    }

    case 'plano-treino': {
      const { objetivo, dias, nivel, equipamento, restricoes } = fields
      return [
        { role: 'system', content: `Você é um educador físico brasileiro certificado. Crie um plano de treino semanal detalhado e seguro. Para cada dia: nome do treino (ex: Peito e Tríceps), lista de exercícios com séries, repetições e descanso. Inclua aquecimento e dica de progressão. Adapte ao nível e equipamento disponível. Se houver restrições, contorne-as com segurança. Adicione recomendações gerais ao final.` },
        { role: 'user', content: `Objetivo: ${objetivo}\nDias por semana: ${dias}\nNível: ${nivel}\nEquipamento: ${equipamento}\nRestrições: ${restricoes || 'nenhuma'}` },
      ]
    }

    case 'curriculo': {
      const { nome, cargo, contato, experiencias, formacao, habilidades } = fields
      return [
        { role: 'system', content: `Você é um especialista em RH e recrutamento brasileiro. Crie um currículo profissional completo e bem formatado em texto. Use seções claras: Dados Pessoais, Objetivo Profissional, Experiência Profissional, Formação Acadêmica, Habilidades. Melhore a linguagem das experiências para soar mais profissional e orientado a resultados. Formate de maneira limpa e legível.` },
        { role: 'user', content: `Nome: ${nome}\nCargo desejado: ${cargo}\nContato: ${contato || 'não informado'}\nExperiências:\n${experiencias}\nFormação:\n${formacao || 'não informada'}\nHabilidades: ${habilidades || 'não informadas'}` },
      ]
    }

    case 'viagem': {
      const { destino, ida, volta, pessoas, orcamento, estilo } = fields
      return [
        { role: 'system', content: `Você é um consultor de viagens experiente com foco no mercado brasileiro. Crie um roteiro de viagem completo e prático. Inclua: resumo da viagem, roteiro dia a dia (com sugestões de atrações, restaurantes e deslocamentos), estimativa de custos dividida por categoria (hospedagem, alimentação, transporte, passeios), dicas práticas (melhor época, moeda, transporte local, segurança). Seja específico e realista com o orçamento em reais.` },
        { role: 'user', content: `Destino: ${destino}\nData de ida: ${ida}\nData de volta: ${volta}\nNúmero de pessoas: ${pessoas}\nOrçamento total: R$ ${orcamento}\nEstilo: ${estilo}` },
      ]
    }

    case 'hashtags': {
      const { nicho, assunto, rede, volume } = fields
      const qtd = volume === 'poucos' ? '5 a 8' : volume === 'muitos' ? '20 a 30' : '10 a 15'
      return [
        { role: 'system', content: `Você é um especialista em social media brasileiro. Gere ${qtd} hashtags otimizadas para ${rede || 'Instagram'}. Misture hashtags de alto volume (populares), médio volume (nicho) e baixo volume (cauda longa) para maximizar alcance e engajamento. Organize em grupos: Alta concorrência / Média concorrência / Nicho específico. Ao final, dê uma dica rápida sobre estratégia de hashtags para essa rede.` },
        { role: 'user', content: `Nicho: ${nicho}\nAssunto do post: ${assunto}\nRede social: ${rede}\nVolume desejado: ${volume || 'medio'}` },
      ]
    }

    default:
      return [
        { role: 'system', content: 'Você é um assistente útil. Responda em português brasileiro.' },
        { role: 'user', content: JSON.stringify(fields) },
      ]
  }
}
