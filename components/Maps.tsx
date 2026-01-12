import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const Maps: React.FC = () => {
  const mapUrl = "https://maps.app.goo.gl/jaoXb6LxjupYcN7M8";

  return (
    <section id="location" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-primary/10 text-primary px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest mb-4">
            Visit Us
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 px-4 break-words">
            Find Us on <span className="text-primary">Google Maps</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium px-4 break-words">
            Visit our Nagpur center for personalized counseling and admissions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100 relative"
        >
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.5301633822482!2d79.10192013635184!3d21.131289684097688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c76b7dc70035%3A0xb8e03d495b750908!2sLIG%20Colony%2C%20Uday%20Nagar%2C%20Padole%20Nagar%2C%20Nagpur%2C%20Maharashtra%20440024!5e0!3m2!1sen!2sin!4v1768204894082!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
              title="Nest Achievers Location"
            ></iframe>
            <div className="absolute top-4 right-4 z-10">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary px-3 sm:px-4 py-2 rounded-lg font-bold shadow-lg hover:bg-primary hover:text-white transition-all flex items-center space-x-2 text-xs sm:text-sm"
              >
                <MapPin size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden sm:inline">Open in Maps</span>
                <span className="sm:hidden">Maps</span>
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-center"
        >
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg hover:-translate-y-1 text-sm sm:text-base"
          >
            <MapPin size={18} className="sm:w-5 sm:h-5" />
            <span className="break-words">Open in Google Maps</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Maps;
