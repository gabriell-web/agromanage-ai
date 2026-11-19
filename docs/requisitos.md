# Requisitos do primeiro protótipo

A demonstração usa uma atividade fictícia, **Plantio de milho**, e mostra o resumo e a lista de gastos em uma tela. O formulário abre ao adicionar ou editar uma despesa.

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

O protótipo funciona em uma página web em HTML, CSS e JavaScript, ajustada para telas de celular. Os valores são somados em centavos e os registros são salvos no próprio navegador. Para a avaliação de usabilidade, consulte o [roteiro de avaliação](design.md#avaliação-com-participantes).

## Proposta a validar

Duas ou mais pessoas poderiam usar seus celulares para registrar e consultar despesas da mesma parceria. A distribuição de responsabilidades e a utilidade desse acesso serão discutidas com os agricultores em campo.
