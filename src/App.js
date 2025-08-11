import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file
import SealCloud from './SealCloud.js'; // Import the new SealCloud component
import './SealCloud.css'; // Import SealCloud CSS
import Login from './Login.js';
import SignUp from './SignUp.js';
import './Auth.css';
import Subscriptions from './Subscriptions.js';
import Cloud from './Cloud.js';
import Api from './Api.js';
import VectorStorage from './VectorStorage.js'
import GeneralDataGenerator from './GeneralDataGenerator.js'
import TextToImageGenerator from './TextToImageGenerator.js'
import ImageStorage from './ImageStorage.js'
import {
  Sparkles,
  Zap,
  Shield,
  MessageCircle,
  Menu,
  X,
  Code,
  DollarSign,
  Phone,
  Home,
  Feather,
  Mail,
} from 'lucide-react';

// Main content component for the homepage
const HomePageContent = ({ handleScrollToSection, displayedTitle, isLoggedIn }) => (
  <main className="main-content">
    {/* Hero Section */}
    <section id="home" className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          {displayedTitle}
          <span className="cursor">|</span>
        </h1>
        <p className="hero-subtitle">
          Your trusted partner for secure, intelligent, and scalable AI solutions.
        </p>
        <div className="hero-buttons">
          {/* Existing buttons can go here */}
          {/* New Go to Seal Cloud Button */}
          <button
            className="cta-button"
            disabled={!isLoggedIn}
            onClick={() => {
              if (isLoggedIn) {
                window.history.pushState(null, '', '/seal-cloud');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }
            }}
          >
            Go to Seal Cloud
          </button>
        </div>
      </div>
    </section>

    {/* About Section */}
    <section id="about" className="about-section">
      <div className="about-container">
        <h2 className="section-title">About Sealing</h2>
        <p className="section-subtitle">
          Building the future of AI, one solution at a time.
        </p>
        <p className="about-text">
          Founded in 2025, Sealing is dedicated to delivering cutting-edge AI technology that empowers businesses to thrive. We believe that secure, scalable, and intelligent solutions should be accessible to everyone. Our team of experts works tirelessly to build a platform that is not only powerful but also intuitive and reliable.
        </p>
        <p className="about-text">
          From automated workflows to advanced data analytics, Sealing provides the tools you need to stay ahead of the curve.
        </p>
      </div>
    </section>

    {/* Contact Section */}
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2 className="section-title">Get in Touch</h2>
        <p className="section-subtitle">
          We're here to help you get started with Sealing.
        </p>
        <div className="contact-info">
          <div className="contact-item">
            <Mail size={24} className="contact-icon" />
            <a href="techscope2025il@gmail.com" className="contact-link">
              techscope2025il@gmail.com
            </a>
          </div>
          <div className="contact-item">
            <Phone size={24} className="contact-icon" />
            <a href="tel:+9720584493025" className="contact-link">
              +972 (058) 4493025
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
);


const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(window.location.pathname);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state to track login status
  const fullTitle = 'Unlock the Power of AI with Sealing';
  const [displayedTitle, setDisplayedTitle] = useState('');

  // Function to handle smooth scrolling
  const handleScrollToSection = (event, id) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false); // Close the mobile menu after clicking a link
    }
  };

  // Typing effect for the hero title
  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex < fullTitle.length) {
        setDisplayedTitle(fullTitle.substring(0, currentIndex + 1));
        currentIndex += 1;
      } else {
        clearInterval(intervalId);
      }
    }, 100); // Adjust the speed of the typing effect here

    return () => clearInterval(intervalId);
  }, []);

  // Check for login status on component mount
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
  }, []);

  // Update page state on URL change
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/'; // Redirect to home page
  };

  // Reusable NavLink component for cleaner code
  const NavLink = ({ href, children, onClick }) => (
    <a href={href} className="nav-link" onClick={onClick}>
      {children}
    </a>
  );

  // Conditionally render the correct component
  if (currentPage === '/seal-cloud') {
    return <SealCloud isLoggedIn={isLoggedIn} handleLogout={handleLogout} />;
  }

  // Render Login or Sign Up page
  if (currentPage === '/login') {
    return <Login />;
  }
  if (currentPage === '/signup') {
    return <SignUp />;
  }
  if (currentPage === '/subscriptions') {
    return <Subscriptions />;
  }
  if(currentPage === '/cloud'){
    return <Cloud />;
  }
  if(currentPage === '/api'){
    return <Api />
  }
  if(currentPage === '/vector-storage'){
    return <VectorStorage />
  }
  if(currentPage === '/data-synthesizer'){
    return <GeneralDataGenerator />
  }
  if(currentPage === '/text-to-image-generator'){
    return <TextToImageGenerator />
  }
  if(currentPage == '/image-dataset-storage'){
    return <ImageStorage />
  }


  return (
    <div className="app-container">
      {/* Header and Navigation */}
      <header className="header">
        <nav className="nav-container">
          {/* Logo and Brand Name */}
          <div className="logo-brand">
            <img
              src={`${process.env.PUBLIC_URL}/sealing.png`}
              alt="Sealing AI Logo"
              className="logo"
            />
            <span className="brand-name">Sealing</span>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-desktop">
            <NavLink href="#home" onClick={(e) => handleScrollToSection(e, 'home')}>Home</NavLink>
            <NavLink href="#about" onClick={(e) => handleScrollToSection(e, 'about')}>About</NavLink>
            <NavLink href="#contact" onClick={(e) => handleScrollToSection(e, 'contact')}>Contact</NavLink>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="cta-button secondary">
                Logout
              </button>
            ) : (
              <>
                <a href="/login" className="cta-button secondary">
                  Login
                </a>
                <a href="/signup" className="cta-button">
                  Sign Up
                </a>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="nav-mobile-button">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="nav-mobile-menu">
            <NavLink href="#home" onClick={(e) => handleScrollToSection(e, 'home')}>
              Home
            </NavLink>
            <NavLink href="#about" onClick={(e) => handleScrollToSection(e, 'about')}>
              About
            </NavLink>
            <NavLink href="#contact" onClick={(e) => handleScrollToSection(e, 'contact')}>
              Contact</NavLink>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="cta-button-mobile secondary">
                Logout
              </button>
            ) : (
              <>
                <a href="/login" className="cta-button-mobile secondary">
                  Login
                </a>
                <a href="/signup" className="cta-button-mobile">
                  Sign Up
                </a>
              </>
            )}
          </div>
        )}
      </header>

      {/* Main content will be the homepage */}
      <HomePageContent
        handleScrollToSection={handleScrollToSection}
        displayedTitle={displayedTitle}
      />
      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="logo-brand-footer">
            <img
              src={`${process.env.PUBLIC_URL}/sealing.png`}
              alt="Sealing AI Logo"
              className="logo-footer"
            />
            <span className="brand-name-footer">
              Sealing
            </span>
          </div>
          <p className="copyright">&copy; {new Date().getFullYear()} Sealing Inc. All rights reserved.</p>
          <div className="footer-links">
            <a href="#" className="footer-link">
              Privacy Policy
            </a>
            <a href="#" className="footer-link">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
