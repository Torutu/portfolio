import React from 'react';
import './styles/app.css';
import './styles/content.css';
import { Header } from './pages/content/header';
import { Main } from './pages/content/main';
import { Footer } from './pages/content/footer';
import { PageProvider } from './utils/pageContext';

function App() {
  return (
    <PageProvider>
      <Header />
      <Main />
      <Footer />
    </PageProvider>
  );
}

export default App;
