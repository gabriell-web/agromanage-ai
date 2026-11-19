# Design do protótipo

O [logo do AgroManage AI](../assets/logo-agromanage-ai.png) combina sulcos de plantio com um símbolo de conferência.

| Cor | Código | Uso |
| --- | --- | --- |
| Verde-floresta | `#18332A` | Títulos e fundo do resumo de despesas |
| Verde médio | `#236547` | Ações, incluindo o botão de salvar |
| Creme | `#F7F5ED` | Fundo da página |
| Branco | `#FFFFFF` | Campos, lista e ação de adicionar no resumo |
| Verde claro | `#EBF0E7` | Ação de editar e confirmação após salvar |

A fonte de referência é Inter. A página usa a fonte do sistema quando Inter está indisponível no dispositivo.

## Decisões de IHC

O Mercado Livre é uma referência de familiaridade no celular para o projeto, especialmente para dar destaque à ação principal e localizar uma ação junto de cada item. Um [TCC da UFRN sobre o app Android do Mercado Livre](https://repositorio.ufrn.br/bitstream/123456789/54203/4/ExperienciaUsuarioUsabilidade_Silva_2023.pdf) analisou comentários de usuários e encontrou relatos de dificuldades em tarefas como a busca. Isso reforça a importância de observar pessoas usando o AgroManage AI nas tarefas do próprio projeto.

| Princípio | Decisão na tela |
| --- | --- |
| Visibilidade do estado | Total e quantidade de despesas aparecem no topo. Depois de salvar, a tela confirma a ação e recalcula o total. |
| Reconhecimento | **Adicionar despesa** está no resumo. **Editar** aparece junto do lançamento. Os campos têm rótulos visíveis. |
| Controle e liberdade | Adição e edição usam o mesmo formulário. **Cancelar** e **Esc** fecham o formulário e devolvem o foco à ação anterior. |
| Prevenção e recuperação de erros | O formulário preserva o que foi digitado, explica o erro no campo correspondente e leva o foco ao primeiro campo inválido. O valor aceita vírgula decimal. |
| Acesso por toque e teclado | Os botões principais têm pelo menos 44 px de altura e largura. A navegação por teclado tem foco visível. |

## Avaliação com participantes

Em uma próxima atividade de campo, convide o participante a registrar uma compra de adubo, localizar o lançamento, corrigir o valor e dizer quanto ficou o total. Observe se conclui cada tarefa, se precisa de ajuda e onde hesita ou comete erros. Ao final, pergunte o que ele mudaria na tela. A avaliação deve seguir as condições autorizadas para o projeto.

## Referências

- NIELSEN, Jakob. *Enhancing the explanatory power of usability heuristics*. CHI, 1994. [Artigo](https://doi.org/10.1145/191666.191729) e [síntese das heurísticas](https://www.nngroup.com/articles/ten-usability-heuristics/).
- SILVA, Gabriel da. *Experiência do usuário e usabilidade: uma análise do aplicativo Mercado Livre*. TCC, UFRN, 2023. [Texto integral](https://repositorio.ufrn.br/bitstream/123456789/54203/4/ExperienciaUsuarioUsabilidade_Silva_2023.pdf).
- PARHI, Pekka; KARLSON, Amy K.; BEDERSON, Benjamin B. *Target size study for one-handed thumb use on small touchscreen devices*. MobileHCI, 2006. [Estudo](https://www.microsoft.com/en-us/research/publication/target-size-study-for-one-handed-thumb-use-on-small-touchscreen-devices/).
- W3C. *Web Content Accessibility Guidelines (WCAG) 2.2*. [Diretrizes](https://www.w3.org/TR/WCAG22/). A referência de 44 × 44 px vem do [critério 2.5.5](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced).
