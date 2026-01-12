
import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import Stats from '../components/Stats';
import Maps from '../components/Maps';

const Home: React.FC = () => {
  return (
    <div className="overflow-hidden">
      <section id="home">
        <Hero />
      </section>
      
      <section className="bg-gray-50">
        <Stats />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="gallery" className="bg-gray-50">
        <Gallery />
      </section>

      <section id="testimonials">
        <Testimonials />
      </section>

      <section id="location" className="bg-gray-50">
        <Maps />
      </section>
    </div>
  );
};

export default Home;
