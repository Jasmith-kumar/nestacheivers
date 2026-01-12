
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Detect which section is currently in view
      if (location.pathname === '/') {
        const sections = ['home', 'about', 'gallery', 'testimonials', 'location'];
        const scrollPosition = window.scrollY + 200; // Offset for navbar height
        
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = document.getElementById(sections[i]);
          if (section) {
            const sectionTop = section.offsetTop;
            if (scrollPosition >= sectionTop) {
              setActiveSection(sections[i]);
              break;
            }
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const menuItems = [
    { name: 'Home', path: '/', isSection: true, sectionId: 'home' },
    { name: 'About', path: '/', isSection: true, sectionId: 'about' },
    { name: 'Gallery', path: '/', isSection: true, sectionId: 'gallery' },
    { name: 'Testimonials', path: '/', isSection: true, sectionId: 'testimonials' },
    { name: 'Contact Us', path: '/contact', isSection: false },
  ];

  const handleNavClick = (item: typeof menuItems[0]) => {
    if (item.isSection) {
      if (location.pathname !== '/') {
        navigate('/');
        // Wait for navigation before scrolling
        setTimeout(() => {
          document.getElementById(item.sectionId!)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById(item.sectionId!)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const logoUrl = "https://storage.googleapis.com/new_client_files/nest%20acheivers/nest%20Logo%20file%20(1).png";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-lg py-1' : 'bg-white/80 backdrop-blur-sm py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center max-w-[120px] sm:max-w-none">
            <img src={logoUrl} alt="Nest Achievers Logo" className="h-12 sm:h-16 md:h-24 w-auto object-contain transition-all" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              item.isSection ? (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className={`text-sm font-semibold transition-colors duration-200 ${
                    location.pathname === '/' && activeSection === item.sectionId ? 'text-primary' : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-semibold transition-colors duration-200 ${
                    location.pathname === item.path ? 'text-primary' : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
            <Link
              to="/contact"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-primary text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-md"
            >
              Enroll Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-xl transition-all duration-300 transform ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 border-t border-gray-100">
          {menuItems.map((item) => (
            item.isSection ? (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className={`block w-full text-left px-3 py-4 text-base font-medium rounded-lg transition-colors ${
                  location.pathname === '/' && activeSection === item.sectionId 
                    ? 'text-primary bg-primary/10' 
                    : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                }`}
              >
                {item.name}
              </button>
            ) : (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block w-full text-left px-3 py-4 text-base font-medium rounded-lg transition-colors ${
                  location.pathname === item.path 
                    ? 'text-primary bg-primary/10' 
                    : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            )
          ))}
          <Link
            to="/contact"
            onClick={() => {
              setIsOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="block w-full text-center bg-primary text-white px-3 py-4 rounded-lg font-bold shadow-lg"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
