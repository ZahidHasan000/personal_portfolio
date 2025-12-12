import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Project from './components/Project';
import ProjectDetails from './components/ProjectDetails';
import Contact from './components/Contact';
import Map from './components/Map';
import UploadProject from './components/UploadProject';
import Profile from './components/Profile';



function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/home" element={<Home2 />} /> */}
        {/* <Route path="/" element={<NavBar />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/project" element={<Project />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/map" element={<Map />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/upload-project" element={<UploadProject />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;




