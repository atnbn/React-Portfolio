import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavbarComponent } from './components/navbar_component';
import { Banner } from './components/banner_component';
import './App.css';
import { Skills } from './components/skills_component';
import { Projects } from './components/project_component';
import { Contact } from './components/contact_component';
import { Footer } from './components/footer_component';
function App() {
  return (
    <div>
      <NavbarComponent />
      <Banner />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
