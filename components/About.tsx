
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Target, GraduationCap, BookOpen, Milestone, Trophy } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: <GraduationCap className="text-primary" size={32} />,
      title: "IIT-JEE & NEET Focus",
      description: "Rigorous training programs specifically designed for engineering and medical aspirants in Nagpur."
    },
    {
      icon: <Milestone className="text-primary" size={32} />,
      title: "Classes 8th - 12th",
      description: "Foundation building from class 8th to advanced 12th grade coaching across all boards."
    },
    {
      icon: <BookOpen className="text-primary" size={32} />,
      title: "Multi-Board Coaching",
      description: "Comprehensive support for ICSE, CBSE, State, and CET entrance examinations."
    },
    {
      icon: <Trophy className="text-primary" size={32} />,
      title: "Proven Result Rate",
      description: "Our students consistently secure top ranks in local and national level competitive exams."
    }
  ];

  return (
    <div className="py-12 sm:py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 px-4 break-words"
          >
            Leading Academic Hub in <span className="text-primary">Nagpur</span>
          </motion.h2>
          <div className="h-1.5 w-24 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium px-4 break-words">
            At Nest Achievers, we specialize in bridging the gap between standard schooling and competitive exam success for classes 8th to 12th.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 bg-gray-50 border border-transparent rounded-[2rem] hover:border-primary/20 transition-all hover:shadow-xl group hover:bg-white"
            >
              <div className="mb-6 transform transition-transform group-hover:scale-110 group-hover:rotate-3">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-primary/5 absolute -inset-6 rounded-[3rem] -rotate-1" />
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop" 
              alt="Senior students group study session" 
              className="relative rounded-[2rem] shadow-2xl w-full h-auto object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop";
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 italic break-words">"Building Foundations for Future Engineers & Doctors"</h3>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed break-words">
              Nagpur's trusted destination for academic excellence. We provide a rigorous yet supportive environment where students from Class 8 onwards begin their journey toward JEE and NEET success.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "IIT-JEE Main & Advanced",
                "NEET Preparation",
                "CBSE Boards",
                "State & CET",
                "Class 8th-10th Foundation",
                "11th-12th Science Focus"
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-2 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                  <CheckCircle2 size={18} className="text-primary flex-shrink-0" />
                  <span className="text-gray-700 font-bold text-xs sm:text-sm break-words">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
