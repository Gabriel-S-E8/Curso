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
import Dashboard from './components/pages/pets/Dashboard';
import AddPet from './components/pages/pets/add';
import EditPet from './components/pages/pets/EditPet';
import PetDetails from './components/pages/pets/PetDetails';
import MyAdoptions from './components/pages/pets/MyAdoptions';

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
            <Route path="/pets/dashboard">
              <Dashboard/>
            </Route>
            <Route path="/pets/add">
              <AddPet/>
            </Route>
            <Route path="/pets/edit/:id">
              <EditPet/>
            </Route>
            <Route path="/pets/adoptions">
              <MyAdoptions/>
            </Route>
            <Route path="/pets/:id">
              <PetDetails/>
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
