import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Company from './pages/Company';
import Contact from './pages/Contact';
import NewProject from './pages/NewProject';

import Container from './components/Container';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Projects from './pages/Projects';
import Project from './pages/Project';

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
          <Route path='/projects/:id' element={<Project />} />
        </Routes>
      </Container>
      
      <Footer />
    </Router>
  )
}

export default App
