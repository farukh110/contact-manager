import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import ContactState from './context/contact/ContactState';
import Home from './components/pages/Home';
import About from './components/pages/About';
import { Container } from '@mui/material';
import AuthState from './context/auth/AuthState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AlertState from './context/alert/AlertState';
import Alerts from './components/layouts/Alerts';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  
  setAuthToken(localStorage.token);

}

function App() {
  return (

    <AuthState>
    <ContactState>
      <AlertState>
    <Router>
    <>
      <Navbar/>

      <div className="page-content">

        <br/><br/>

        <Container>

        <Alerts />

        <Switch>

          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />

        </Switch>

        </Container>

      </div>
    </>
    </Router>
    </AlertState>
    </ContactState>
    </AuthState>
  );
}

export default App;
