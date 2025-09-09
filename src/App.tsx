import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation'
import Main from './components/Main'
import BoardView from './components/BoardView';

import { Analytics } from "@vercel/analytics/react"
import { useState, useEffect } from 'react';
import Footer from './components/Footer'

function App() {
  const [islightOn, setlightOn] = useState(false);

  const handleThemeButton: React.MouseEventHandler<HTMLButtonElement> = () => {
    setlightOn(prev => !prev);
  }

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      islightOn ? "light" : "dark"
    );
    console.log("Theme applied:", islightOn ? "light" : "dark");
  }, [ islightOn]);

  return (

    <div className="app-wrapper" data-theme={islightOn ? 'light' : 'dark'}>
      <Router>
        <Navigation handleThemeButton={handleThemeButton} islightOn={islightOn} />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="board/:boardId" element={<BoardView />} />
        </Routes>
        <Analytics />
        <Footer />
      </Router>
    </div>
  );
}
export default App;
