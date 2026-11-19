# Requisitos do primeiro protótipo

A demonstração usa uma atividade fictícia, **Plantio de milho**, e reúne o formulário, a lista e o resumo de gastos em uma tela.

| Requisito | Critério para a demonstração |
| --- | --- |
| Registrar despesa | Salvar descrição, valor positivo e data na atividade |
| Consultar despesas | Encontrar o lançamento na lista da atividade |
| Corrigir lançamento | Atualizar a própria despesa sem criar uma duplicata |
| Conferir o total | Recalcular o total após adicionar ou corrigir um lançamento |

## Cenário de demonstração

1. Começar com R$ 20,00 de transporte.
2. Registrar R$ 80,00 de adubo. O total esperado é R$ 100,00.
3. Corrigir o adubo para R$ 65,00. O total esperado é R$ 85,00.

## Decisões técnicas iniciais

A primeira versão será uma página web em HTML, CSS e JavaScript, ajustada para telas de celular. A persistência local pode ser acrescentada após o fluxo básico funcionar.

## Proposta a validar

Duas ou mais pessoas poderiam usar seus celulares para registrar e consultar despesas da mesma parceria. A distribuição de responsabilidades e a utilidade desse acesso serão discutidas com os agricultores em campo.
