import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head';
import db from '../db.json';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;

    color: ${({ theme }) => theme.colors.contrastText};
  }

  html, body {
    min-height: 100vh;
  }

  #__next{
    flex: 1;
    display: flex;
    flex-direction: column;

  }
`;

const { theme } = db;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
        
          <title>Quiz de Finanças Pessoais</title>
          <meta name="title" content="Quiz de Finanças Pessoais" />
          <meta name="description" content="Aprenda sobre finanças totalmente grátis, e muito fácil. Entenda sobre com economizar e também como sair das dívidas de uma forma bem intuitíva" />

      
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://metatags.io/" />
          <meta property="og:title" content="Quiz de Finanças Pessoais" />
          <meta property="og:description" content="Aprenda sobre finanças totalmente grátis, e muito fácil. Entenda sobre com economizar e também como sair das dívidas de uma forma bem intuitíva" />
          <meta property="og:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png" />

      
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://metatags.io/" />
          <meta meta property="twitter:title" content="Quiz de Finanças Pessoais" />  
          <meta property="twitter:description" content="Aprenda sobre finanças totalmente grátis, e muito fácil. Entenda sobre com economizar e também como sair das dívidas de uma forma bem intuitíva" />
          <meta property="twitter:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
