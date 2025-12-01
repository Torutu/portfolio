import React from 'react';
import './App.css';
import './pages/content/styles.css';
import { LeftSide } from './pages/content/leftSide';
import { RightSide } from './pages/content/rightSide';
import { Footer } from './pages/content/footer';
import { PageProvider } from './pages/utils/pageContext';
function App() {
  return (
    <PageProvider>
        <LeftSide />
        <RightSide />
        <Footer />
    </PageProvider>
  );
}

export default App;
