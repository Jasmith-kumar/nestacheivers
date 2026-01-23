
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, BookOpen, Users, Trophy, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-[95vh] flex items-center bg-white overflow-hidden pt-10">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 py-8 sm:py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold mb-6 flex-wrap">
              <Sparkles size={14} className="sm:w-4 sm:h-4" />
              <span className="break-words">Admissions Opening for 2026-27</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-4 break-words">
              Academic Coaching <span className="text-primary italic">Nagpur</span>
            </h1>

            <div className="space-y-4 mb-8">
              <div className="bg-primary/5 border-l-4 border-primary p-3 sm:p-4 rounded-r-xl">
                <p className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 break-words">🎓 Classes 8th to 12th</p>
              </div>
              
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <span className="bg-gray-100 text-gray-800 px-3 sm:px-4 py-2 rounded-lg font-bold text-xs sm:text-sm shadow-sm border border-gray-200 break-words">🏆 IIT-JEE (Mains and Advance)</span>
                <span className="bg-gray-100 text-gray-800 px-3 sm:px-4 py-2 rounded-lg font-bold text-xs sm:text-sm shadow-sm border border-gray-200 break-words">💉 NEET Preparation</span>
                <span className="bg-gray-100 text-gray-800 px-3 sm:px-4 py-2 rounded-lg font-bold text-xs sm:text-sm shadow-sm border border-gray-200 break-words">📚 8th -10th (ICSE, CBSE, State Board)</span>
                <span className="bg-gray-100 text-gray-800 px-3 sm:px-4 py-2 rounded-lg font-bold text-xs sm:text-sm shadow-sm border border-gray-200 break-words">🎯 11th and 12th (CET)</span>
                <span className="bg-gray-100 text-gray-800 px-3 sm:px-4 py-2 rounded-lg font-bold text-xs sm:text-sm shadow-sm border border-gray-200 break-words">🌟 Foundation Courses</span>
              </div>
            </div>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 max-w-lg leading-relaxed break-words">
              Nest Achievers provides specialized coaching for high school students to crack competitive exams and excel in board examinations with personalized mentorship.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-10">
              <Link 
                to="/contact" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-bold flex items-center justify-center hover:bg-opacity-90 transition-all shadow-xl hover:-translate-y-1 w-full sm:w-auto"
              >
                Enroll Today <ArrowRight className="ml-2" />
              </Link>
              <button 
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-gray-800 border-2 border-gray-200 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-bold hover:border-primary hover:text-primary transition-all shadow-sm w-full sm:w-auto"
              >
                Our Courses
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-[12px] border-white aspect-[4/5] md:aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop" 
                alt="Students in professional coaching classroom" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>
            
            {/* Floating Achievement Card */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-4 sm:-bottom-8 -left-2 sm:-left-8 bg-white p-3 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl flex items-center space-x-2 sm:space-x-4 max-w-[200px] sm:max-w-[280px] border border-gray-100"
            >
              <div className="h-10 w-10 sm:h-14 sm:w-14 bg-green-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg rotate-3 flex-shrink-0">
                <Trophy size={20} className="sm:w-7 sm:h-7" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-widest">Nagpur Pride</p>
                <p className="text-sm sm:text-lg font-black text-gray-900 break-words">Top JEE & NEET Results</p>
              </div>
            </motion.div>

            {/* Floating Experience Card */}
            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-white p-5 rounded-3xl shadow-2xl flex items-center space-x-3 border border-gray-100 hidden md:flex"
            >
              <div className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-md -rotate-3">
                <GraduationCap size={24} />
              </div>
              <p className="font-bold text-gray-800">Expert Faculty</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
