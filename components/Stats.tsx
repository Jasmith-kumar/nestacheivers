
import React from 'react';
import { motion } from 'framer-motion';

const Stats: React.FC = () => {
  const stats = [
    { value: "500+", label: "Happy Students" },
    { value: "15+", label: "Expert Tutors" },
    { value: "10+", label: "Years of Experience in Coaching" },
    { value: "98%", label: "Result Rate" }
  ];

  return (
    <div className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 break-words">{stat.value}</div>
              <div className="text-white/80 font-medium text-xs sm:text-sm md:text-base break-words px-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
