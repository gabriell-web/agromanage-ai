# Requisitos do primeiro protótipo

A demonstração usa uma atividade fictícia, **Plantio de milho**, e mostra o resumo e a lista de gastos em uma tela. O formulário abre ao adicionar ou editar uma despesa.

| Requisito | Critério para a demonstração |
| --- | --- |
| Entrar na demonstração | Acessar a conta de teste e visualizar as roças |
| Cadastrar roça | Salvar um nome obrigatório, com cultura e município opcionais |
| Abrir roça | Mostrar apenas as despesas vinculadas à roça selecionada |
| Registrar despesa | Salvar descrição, valor positivo e data na atividade |
| Consultar despesas | Encontrar o lançamento na lista da atividade |
| Corrigir lançamento | Atualizar a própria despesa sem criar uma duplicata |
| Conferir o total | Recalcular o total após adicionar ou corrigir um lançamento |

## Cenário de demonstração

1. Entrar com a conta de teste, abrir **Plantio de milho** e conferir os R$ 20,00 de transporte.
2. Registrar R$ 80,00 de adubo. O total esperado é R$ 100,00.
3. Corrigir o adubo para R$ 65,00. O total esperado é R$ 85,00.

## Decisões técnicas iniciais

O protótipo funciona em uma página web em HTML, CSS e JavaScript, ajustada para telas de celular. Os valores são somados em centavos e os registros são salvos no próprio navegador. Para a avaliação de usabilidade, consulte o [roteiro de avaliação](design.md#avaliação-com-participantes).

## Conta e vínculo com a roça

A entrada simula uma conta de teste. O protótipo salva os dados no navegador, sem autenticação ou verificação de vínculo. Na versão futura, a conta identifica quem entrou. Se houver compartilhamento, o sistema verificará a permissão de acesso a cada roça. A necessidade de comprovação documental depende do caso de uso.

## Proposta a validar

Duas ou mais pessoas poderiam usar seus celulares para registrar e consultar despesas da mesma parceria. A distribuição de responsabilidades e a utilidade desse acesso serão discutidas com os agricultores em campo.
