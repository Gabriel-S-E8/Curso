import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// component
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Container from './components/layouts/Container';
import Message from './components/layouts/Message';

// Pages
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import Home from './components/pages/Home';
import Profile from './components/pages/User/Profile';

// context
import { UserProvider } from './context/UserContext';


function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/user/profile">
              <Profile />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
