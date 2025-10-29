import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap');

  :root {
    --color-primary: #FF4500; /* Laranja/Vermelho forte, cor típica de CrossFit */
    --color-secondary: #000000; /* Preto */
    --color-background: #F4F4F4; /* Cinza claro */
    --color-text: #333333;
    --color-white: #FFFFFF;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Montserrat', sans-serif;
    background-color: var(--color-background);
    color: var(--color-text);
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--color-secondary);
    font-weight: 700;
  }

  a {
    text-decoration: none;
    color: var(--color-primary);
    transition: color 0.3s ease;

    &:hover {
      color: darken(var(--color-primary), 10%);
    }
  }

  button {
    cursor: pointer;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-weight: 600;
    transition: background-color 0.3s ease;
  }
`;

export default GlobalStyle;
