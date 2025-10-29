# Frontend - CFV6 BOX

Este frontend é uma aplicação web construída com **React** e **Vite**, utilizando **Styled-Components** para estilização e **Axios** para comunicação com o backend.

## Pré-requisitos

Certifique-se de ter instalado em sua máquina:

1.  **Node.js** (versão 18+)
2.  **npm** (gerenciador de pacotes do Node.js)

## Instalação e Configuração

1.  **Clone o repositório** (se ainda não o fez) e navegue até a pasta `frontend`:
    \`\`\`bash
    cd frontend
    \`\`\`

2.  **Instale as dependências:**
    \`\`\`bash
    npm install
    \`\`\`

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo chamado `.env` na raiz da pasta `frontend` e defina a URL base da API do backend.

    **Conteúdo do arquivo `.env` (exemplo):**
    \`\`\`env
    VITE_API_BASE_URL=http://localhost:3001/api
    \`\`\`
    **Nota:** Certifique-se de que o backend esteja rodando na porta correta (padrão é 3001).

## Executando a Aplicação

Para iniciar o servidor de desenvolvimento do frontend:

\`\`\`bash
npm run dev
\`\`\`

A aplicação estará acessível em `http://localhost:5173` (ou na porta indicada pelo Vite).

## Como Personalizar

### 1. Alterar Imagens do Site

Conforme solicitado, você pode alterar as imagens do site de forma simples:

*   **Imagens Principais (Hero, Treinos):** Substitua os arquivos na pasta `public/` com o mesmo nome:
    *   `public/hero-bg.jpg` (Imagem de fundo da página inicial)
    *   `public/crossfit.jpg`
    *   `public/hyrox.jpg`
    *   `public/personal.jpg`
    *   `public/default-avatar.png` (Avatar padrão para a comunidade)

*   **Galeria de Fotos:** Substitua os arquivos na pasta `public/assets/gallery/`. Mantenha o mesmo nome (`photo1.jpg`, `photo2.jpg`, etc.) ou edite o arquivo `src/pages/Gallery.jsx` para adicionar novos nomes de arquivos.

### 2. Alterar Textos e Valores

*   **Textos Institucionais (Home, Treinamentos):** Edite os arquivos nas pastas `src/pages/Home.jsx` e `src/pages/Training.jsx`.
*   **Valores e Planos:** Edite o array `plans` no arquivo `src/pages/Pricing.jsx` para atualizar os títulos, preços e funcionalidades dos planos.

### 3. Estilização

O projeto utiliza **Styled-Components**. As cores globais e estilos básicos podem ser alterados no arquivo `src/styles/GlobalStyle.js`.
\`\`\`javascript
// src/styles/GlobalStyle.js
:root {
  --color-primary: #FF4500; /* Cor principal (Laranja/Vermelho) */
  --color-secondary: #000000; /* Cor secundária (Preto) */
  /* ... outras cores */
}
\`\`\`
Altere o valor de `--color-primary` para mudar a cor de destaque do seu site.
