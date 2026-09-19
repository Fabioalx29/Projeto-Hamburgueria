 DevBurger

Site responsivo para uma hamburgueria fictícia, com cardápio e carrinho de compras funcional que finaliza o pedido direto no WhatsApp.

🔗 **Site publicado:** https://fabioalx29.github.io/Projeto-Hamburgueria/

## Sobre o projeto

O DevBurger é um projeto front-end feito com HTML, CSS e JavaScript puro (sem frameworks ou bibliotecas externas). O objetivo é apresentar o cardápio de uma hamburgueria e permitir que o cliente monte um pedido, veja o total e envie tudo pronto para o WhatsApp da loja.

## Funcionalidades

- 📱 **Layout responsivo** — se adapta de telas grandes a celulares, com menu hambúrguer na navegação
- 🛒 **Carrinho de compras**
  - Adicionar itens do cardápio com um clique
  - Aumentar, diminuir ou remover quantidades
  - Total calculado automaticamente
  - Contador de itens no ícone do carrinho
  - Carrinho salvo no navegador (`localStorage`), então não se perde ao recarregar a página
- 📲 **Finalizar pedido pelo WhatsApp** — gera uma mensagem com todos os itens e o total, pronta para enviar
- 🎨 Ícone/logo próprio em SVG, usado como favicon e no cabeçalho

## Tecnologias utilizadas

- HTML5
- CSS3 (variáveis CSS, Grid e Flexbox, media queries)
- JavaScript (Vanilla JS, sem dependências)

## Estrutura do projeto


Projeto-Hamburgueria/
├── index.html      # Estrutura da página
├── style.css       # Estilos e responsividade
├── script.js       # Lógica do carrinho e do menu mobile
├── logo.svg        # Ícone/logo do site (favicon + cabeçalho)
└── README.md


## Como rodar localmente

Por ser um projeto estático (sem back-end), basta abrir o arquivo diretamente:

1. Clone o repositório
   
   git clone https://github.com/fabioalx29/Projeto-Hamburgueria.git
  
2. Abra a pasta e dê duplo clique em `index.html`, ou use a extensão **Live Server** do VS Code para abrir com recarregamento automático.

## Personalização

- **Número do WhatsApp:** troque o valor de `WHATSAPP_NUMBER` no início do `script.js`.
- **Itens do cardápio:** cada item fica em um `<li>` dentro de `.menu-grid` no `index.html`. O botão de compra usa `data-name` e `data-price` — é só ajustar esses valores (e a imagem/descrição) para adicionar ou editar produtos.
- **Cores:** as cores principais estão centralizadas em variáveis no topo do `style.css` (`:root`), em `--primary`, `--dark`, `--gray` e `--light`.

## Publicado com GitHub Pages

O site é publicado automaticamente a partir da branch `main` (pasta raiz) usando o GitHub Pages, em **Settings → Pages** do repositório.

> ⚠️ Atenção: o GitHub Pages diferencia maiúsculas de minúsculas nos nomes de arquivo. Os nomes referenciados no `index.html` (`style.css`, `script.js`, `logo.svg`) precisam bater exatamente com os nomes dos arquivos no repositório.

## Autor

Feito por [Fabio Alx](https://github.com/fabioalx29).
