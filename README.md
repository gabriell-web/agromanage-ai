# AgroManage AI

Protótipo de registro e consulta de despesas agrícolas do Lab-IA Sertão Twin, na UNIVASF em Salgueiro–PE. A demonstração usa a atividade fictícia **Plantio de milho**.

## Experimentar

Baixe ou clone o repositório, abra a pasta no VS Code e abra o arquivo [index.html](index.html) no navegador. Para testar o armazenamento com uma origem HTTP local, execute na pasta do projeto:

~~~sh
python3 -m http.server 8000
~~~

No Windows, use `py -m http.server 8000` caso o Python esteja disponível pelo comando `py`. Abra [localhost:8000](http://localhost:8000). A demonstração roda em HTML, CSS e JavaScript e usa o logo incluído no repositório.

1. Clique em **Entrar com conta de teste**. A entrada é simulada.
2. Em **Minhas roças**, clique em **Cadastrar roça**. Informe um nome fictício. Cultura e município são opcionais.
3. Abra a roça cadastrada e registre uma despesa. Cada roça tem seus próprios lançamentos.
4. Abra **Plantio de milho** para repetir o cenário da demonstração. Some R$ 80,00 de adubo aos R$ 20,00 de transporte. Depois, corrija o adubo para R$ 65,00 e confira o total de R$ 85,00.
5. Recarregue a página para conferir a persistência. Use **Sair da demonstração** para voltar à entrada.

Os dados ficam no navegador em que foram registrados. Para repetir a demonstração desde o começo, abra a página em uma sessão privada nova.

## Estrutura

| Arquivo | Finalidade |
| --- | --- |
| `index.html` | Estrutura da tela e do formulário |
| `styles.css` | Identidade visual e adaptação para celular |
| `app.js` | Validação, cálculo em centavos e armazenamento local |
| [assets/](assets/) | Logo e identidade visual |
| [docs/requisitos.md](docs/requisitos.md) | Escopo e roteiro da primeira demonstração |
| [docs/design.md](docs/design.md) | Decisões de interface, referências de IHC e roteiro de avaliação |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Como colaborar |

## Continuidade

O objetivo é evoluir para um aplicativo instalável com autenticação de verdade. A equipe ainda precisa validar se algum uso futuro exige comprovação de vínculo com uma roça. O banco de dados remoto, a sincronização entre celulares e a integração com a API a ser definida pela TwinCore são etapas futuras. A utilidade do acesso compartilhado também será investigada em campo.
