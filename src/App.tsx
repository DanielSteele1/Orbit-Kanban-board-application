import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation'
import Main from './components/Main'
import Footer from './components/Footer'

function App() {

  return (
    <Router>
      <Navigation />

      <Routes>
        <Route path="/" element={<Main />} />
        {/* <Footer /> */}

      </Routes>
    </Router>
  )
}

export default App;
