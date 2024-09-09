import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
          <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/pets/dashboard" element={<Dashboard />}/>
            <Route path="/pets/add" element={<AddPet />} />
            <Route path="/pets/edit/:id" element={<EditPet />}/>
            <Route path="/pets/adoptions" element={<MyAdoptions/>}/>
            <Route path="/pets/:id" element={<PetDetails/>} />
            <Route path="/" element={<Home/>}/>
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
