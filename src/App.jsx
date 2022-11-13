import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Home from './pages/Home';
import Company from './pages/Company';
import Contact from './pages/Contact';
import NewProject from './pages/NewProject';

import Container from './layout/Container';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Projects from './pages/Projects';

function App() {
  return (
    <Router>
      <Navbar />

      <Container customClass='min-height'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/company' element={<Company />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/newproject' element={<NewProject />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  )
}

export default App
