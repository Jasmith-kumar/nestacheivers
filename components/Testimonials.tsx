
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: "Mrs. Sharma",
      role: "Parent",
      text: "The individual attention my son receives at Nest Achievers is unmatched. His math scores improved from a C to an A within just one term!",
      rating: 5,
      image: "https://ui-avatars.com/api/?name=Mrs+Sharma&background=8c52ff&color=fff&size=100&bold=true"
    },
    {
      name: "Rahul Verma",
      role: "Student",
      text: "Nest Achievers makes complex science topics so easy to understand. The teachers are friendly and always ready to help with doubts.",
      rating: 5,
      image: "https://ui-avatars.com/api/?name=Rahul+Verma&background=8c52ff&color=fff&size=100&bold=true"
    },
    {
      name: "Mr. Kapoor",
      role: "Parent",
      text: "My daughter loves coming here. The environment is so encouraging. It's not just about studies, they teach values too.",
      rating: 5,
      image: "https://ui-avatars.com/api/?name=Mr+Kapoor&background=8c52ff&color=fff&size=100&bold=true"
    }
  ];

  return (
    <div className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 px-4 break-words"
          >
            Voices of Success <span className="text-primary">Survey</span>
          </motion.h2>
          <div className="h-1.5 w-24 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4 break-words">
            Hear from our community of happy people and thriving students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 p-8 rounded-3xl relative overflow-hidden group hover:bg-primary transition-colors duration-500"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote size={80} className="text-gray-900" />
              </div>
              
              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={18} className="text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-gray-700 italic mb-8 relative z-10 text-base sm:text-lg leading-relaxed group-hover:text-white transition-colors duration-500 break-words">
                "{review.text}"
              </p>

              <div className="flex items-center space-x-4">
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="h-14 w-14 rounded-full border-4 border-white shadow-md"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=8c52ff&color=fff&size=100&bold=true`;
                  }}
                />
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-white transition-colors duration-500">{review.name}</h4>
                  <p className="text-sm text-gray-500 group-hover:text-white/80 transition-colors duration-500">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
