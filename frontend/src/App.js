import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import ContactState from './context/contact/ContactState';
import Home from './components/pages/Home';
import About from './components/pages/About';
import { Container } from '@mui/material';

function App() {
  return (

    <ContactState>
    <Router>
    <>
      <Navbar/>

      <div className="page-content">

        <br/><br/>

        <Container>

        <Switch>

          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />

        </Switch>

        </Container>

      </div>
    </>
    </Router>
    </ContactState>
  );
}

export default App;
