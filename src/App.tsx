import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation'
import Main from './components/Main'
import BoardView from './components/BoardView';

import { Analytics } from "@vercel/analytics/react"
import { useState, useEffect } from 'react';
import Footer from './components/Footer'

function App() {
  const [islightOn, setlightOn] = useState(() => {


    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === 'light' : false;

  });

  const handleThemeButton: React.MouseEventHandler<HTMLButtonElement> = () => {
    setlightOn(prev => !prev);
  }

  useEffect(() => {
    const theme = islightOn ? "light" : "dark";

    document.documentElement.setAttribute(
      "data-theme", theme,
    );

    localStorage.setItem("theme", theme);
    console.log("Theme applied:", theme);


  }, [islightOn, setlightOn]);

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
