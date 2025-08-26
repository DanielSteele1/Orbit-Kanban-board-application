import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation'
import Main from './components/Main'
import BoardView from './components/BoardView';

import { Analytics } from "@vercel/analytics/react"
// import Footer from './components/Footer'

function App() {

  return (
    <Router>
      <Navigation />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="board/:boardId" element={<BoardView />} />
        {/* <Footer /> */}

      </Routes>
      <Analytics />
    </Router>
  )
}

export default App;
