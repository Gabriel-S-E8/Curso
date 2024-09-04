import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

// component
import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'
import Container from './components/layouts/Container'

// Pages
import Login from "./components/pages/Auth/Login"
import Register from './components/pages/Auth/Register'
import Home from './components/pages/Home'



function App() {
  return (
    <Router>
      <Navbar />
        <Container>
          <Switch>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/register'>
              <Register />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </Container>
      <Footer />
    </Router>
  );
}

export default App;
