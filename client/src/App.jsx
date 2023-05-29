// import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

// Components Import
import ScrollToTop from './components/ScrollToTop';
import ScrollButton from './components/ScrollButton';
import Navbar from './components/Navbar/Navbar';

// Pages Import
import Home from './Pages/Home/Home';
import About from './Pages/About';
import NotFound from './Pages/NotFound';
import Footer from './components/Footer';
import Packages from './Pages/Packages';
import FAQ from './Pages/FAQ';
import Terms from './Pages/Terms';
import Login from './Pages/Login';
import Register from './Pages/Home/Register';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path='/'
            exact
            element={<Home />}
          />
          <Route
            path='/about'
            element={<About />}
          />
          <Route
            path='/packages'
            element={<Packages />}
          />
          <Route
            path='/faq'
            element={<FAQ />}
          />
          <Route
            path='/terms'
            element={<Terms />}
          />
          <Route
            path='/login'
            element={<Login />}
          />
          <Route
            path='/register'
            element={<Register />}
          />
          <Route
            path='*'
            element={<NotFound />}
          />
        </Routes>
        <Footer />
        <ScrollToTop />
        <ScrollButton />
      </Router>
    </>
  );
};

export default App;
