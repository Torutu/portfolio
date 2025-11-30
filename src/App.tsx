import React from 'react';
import './App.css';
import './pages/content/styles.css';
import { LeftSide } from './pages/content/leftSide';
import { RightSide } from './pages/content/rightSide';
import { Footer } from './pages/content/footer';
function App() {
  return (
    <div className="App">
      <div className="layout">
        <LeftSide />
        <RightSide />
        <Footer />
      </div>
    </div>
  );
}

export default App;
