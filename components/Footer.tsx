
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const logoUrl = "https://storage.googleapis.com/new_client_files/nest%20acheivers/nest%20Logo%20file%20(1).png";

  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <img src={logoUrl} alt="Nest Achievers Nagpur" className="h-28 md:h-36 w-auto object-contain" />
            <p className="text-gray-500 leading-relaxed font-medium text-sm sm:text-base break-words">
              Academic Coaching Nagpur - Nurturing students from Class 8th to 12th for IIT-JEE, NEET, and Board success.
            </p>
            <div className="flex space-x-3">
              <a href="https://www.instagram.com/nestachievers/" className="bg-gray-100 p-2 rounded-lg text-gray-500 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.youtube.com/@NestAchievers" className="bg-gray-100 p-2 rounded-lg text-gray-500 hover:text-primary transition-colors">
                <Youtube size={20} />
              </a>
              <a href="https://www.facebook.com/share/1Be5pgVP1D/" className="bg-gray-100 p-2 rounded-lg text-gray-500 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-black text-gray-900 mb-6 uppercase tracking-widest text-xs">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Gallery', 'Testimonials', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Contact Us' ? '/contact' : '/'} 
                    onClick={() => { if(item !== 'Contact Us') document.getElementById(item.toLowerCase().replace(' ', ''))?.scrollIntoView({behavior: 'smooth'}) }}
                    className="text-gray-500 font-bold hover:text-primary transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-black text-gray-900 mb-6 uppercase tracking-widest text-xs">Nagpur Center</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-500">
                <Phone size={18} className="text-primary mt-1 flex-shrink-0" />
                <div className="text-sm font-bold">
                  <span>+91 9767113503</span><br />
                  <span>+91 9049969555</span>
                </div>
              </li>
              <li className="flex items-center space-x-3 text-gray-500">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <span className="text-sm font-bold">nestachievers@gmail.com</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-500">
                <MapPin size={18} className="text-primary mt-1 flex-shrink-0" />
                <span className="text-xs font-bold leading-tight break-words">
                  PLOT NO. L-230, HOUSE NO 1288/D/230, <br />
                  UTTAM KRUPA, MHADA LIG. COLONY, <br />
                  NANDANVAN, NAGPUR, MAHARASTRA – 440009
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-black text-gray-900 mb-6 uppercase tracking-widest text-xs">Admissions</h4>
            <p className="text-sm text-gray-500 mb-4 font-medium">Join Nagpur's achievers today.</p>
            <Link 
              to="/contact" 
              className="inline-block w-full text-center bg-primary text-white py-3 rounded-xl font-black hover:bg-opacity-90 transition-all shadow-md text-sm"
            >
              Apply Online
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-gray-400 text-[10px] md:text-xs font-black uppercase tracking-widest px-4">
          <p className="text-center md:text-left break-words">© 2026 Nest Achievers Academic Coaching Nagpur.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
