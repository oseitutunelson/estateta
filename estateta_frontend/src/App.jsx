// src/App.jsx
import './styles/style.css';
import Header from './components/Header';
import Features from './components/Features';
import Blog from './components/Blog';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Property from './components/Property';
import Service from './components/Service';
import Home from './components/Home';


const App = () => {
   
  return (
    <div>
      <Header/>

      <main>
        <article>
          <Home/>
          <Service/>

          <Property/>

          <Features/>
          <Blog/>
          <CTA/>
        </article>
      </main>

      <Footer/>

      {/* Include Ionicons */}
      <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
      <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
    </div>
  );
};

export default App;
