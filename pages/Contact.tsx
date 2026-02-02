
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Youtube } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [currentClass, setCurrentClass] = useState<string>('');
  const [studentName, setStudentName] = useState('');
  const [phone, setPhone] = useState('');
  const [board, setBoard] = useState('');
  const [interestedExam, setInterestedExam] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const payload = {
      studentName: studentName.trim(),
      currentClass,
      phone: phone.trim(),
      board: (currentClass === '8th' || currentClass === '9th' || currentClass === '10th') ? board : '',
      interestedExam: (currentClass === '11th' || currentClass === '12th' || currentClass === 'repeat') ? interestedExam : '',
      message: message.trim(),
    };
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitError(data.error || 'Failed to submit. Please try again.');
        return;
      }
      setSubmitted(true);
      setStudentName('');
      setCurrentClass('');
      setPhone('');
      setBoard('');
      setInterestedExam('');
      setMessage('');
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setSubmitError('Network error. Please try again.');
    }
  };

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/nestachievers/' },
    { name: 'YouTube', icon: Youtube, url: 'https://www.youtube.com/@NestAchievers' },
    { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/share/1Be5pgVP1D/' },
  ];

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-primary/10 text-primary px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest mb-4">
            Nagpur Location
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 px-4 break-words">Start Your <span className="text-primary">Success Story</span></h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium px-4 break-words">Connect with Nagpur's premier coaching institute for IIT-JEE, NEET, and Board exams.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-gray-50 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-[2.5rem] shadow-xl border border-gray-100 h-full">
              <h3 className="text-2xl font-black mb-8 text-gray-900">Reach Us</h3>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-4 rounded-2xl text-primary shadow-sm">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-black uppercase tracking-widest mb-1">Admissions Hotlines</p>
                    <div className="space-y-1">
                      <p className="text-lg font-black text-gray-900">+91 9767113503</p>
                      <p className="text-lg font-black text-gray-900">+91 9049969555</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-4 rounded-2xl text-primary shadow-sm">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-black uppercase tracking-widest mb-1">Inquiry Email</p>
                    <p className="text-sm sm:text-base md:text-lg font-black text-gray-900 break-all">nestachievers@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-4 rounded-2xl text-primary shadow-sm">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-black uppercase tracking-widest mb-1">Nagpur Center</p>
                    <p className="text-sm sm:text-md font-bold text-gray-900 leading-relaxed break-words">
                      PLOT NO. L-230, HOUSE NO 1288/D/230, <br />
                      UTTAM KRUPA, MHADA LIG. COLONY, <br />
                      NANDANVAN, NAGPUR, MAHARASTRA – 440009
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-xs text-gray-400 font-black uppercase tracking-widest mb-4">Social Presence</p>
                <div className="flex space-x-3">
                  {socialLinks.map((item, i) => (
                    <a 
                      key={i} 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-white p-4 rounded-2xl text-gray-600 hover:bg-primary hover:text-white transition-all transform hover:-translate-y-2 shadow-sm border border-gray-100"
                      title={item.name}
                    >
                      <item.icon size={22} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="bg-white p-4 sm:p-6 md:p-10 rounded-2xl sm:rounded-[2.5rem] shadow-2xl border border-gray-50 h-full">
              <h3 className="text-2xl font-black mb-8 text-gray-900">Course Inquiry Form</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Student's Name</label>
                    <input 
                      type="text" 
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="e.g. Amit Kumar"
                      className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Current Class</label>
                    <select 
                      value={currentClass}
                      onChange={(e) => setCurrentClass(e.target.value)}
                      className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none font-bold text-gray-700"
                    >
                      <option value="">Select Class</option>
                      <option value="8th">Class 8th</option>
                      <option value="9th">Class 9th</option>
                      <option value="10th">Class 10th</option>
                      <option value="11th">Class 11th</option>
                      <option value="12th">Class 12th</option>
                      <option value="repeat">Repeat / Drop Year</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91"
                      className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none font-medium"
                    />
                  </div>
                  {/* Board Selection - Show for classes 8th, 9th, 10th */}
                  {(currentClass === '8th' || currentClass === '9th' || currentClass === '10th') && (
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Board</label>
                      <select value={board} onChange={(e) => setBoard(e.target.value)} className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none font-bold text-gray-700">
                        <option value="">Select Board</option>
                        <option value="ICSE">ICSE</option>
                        <option value="CBSE">CBSE</option>
                        <option value="State">State</option>
                      </select>
                    </div>
                  )}
                  {/* Interested Exam - Show for classes 11th, 12th */}
                  {(currentClass === '11th' || currentClass === '12th') && (
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Interested Exam</label>
                      <select value={interestedExam} onChange={(e) => setInterestedExam(e.target.value)} className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none font-bold text-gray-700">
                        <option value="">Select Exam</option>
                        <option value="IIT-JEE Mains and Advance">IIT-JEE Mains and Advance</option>
                        <option value="NEET">NEET</option>
                        <option value="CET">CET</option>
                        <option value="Foundation">Foundation</option>
                        <option value="CBSE">CBSE</option>
                        <option value="State">State</option>
                      </select>
                    </div>
                  )}
                  {/* Show Interested Exam for Repeat/Drop Year */}
                  {currentClass === 'repeat' && (
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Interested Exam</label>
                      <select value={interestedExam} onChange={(e) => setInterestedExam(e.target.value)} className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none font-bold text-gray-700">
                        <option value="">Select Exam</option>
                        <option value="IIT-JEE Mains and Advance">IIT-JEE Mains and Advance</option>
                        <option value="NEET">NEET</option>
                        <option value="CET">CET</option>
                        <option value="Foundation">Foundation</option>
                        <option value="CBSE">CBSE</option>
                        <option value="State">State</option>
                      </select>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Your Message / Specific Query</label>
                  <textarea 
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your academic goals..."
                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none font-medium"
                  />
                </div>

                {submitError && (
                  <p className="text-red-600 text-sm font-medium" role="alert">{submitError}</p>
                )}
                <button 
                  type="submit"
                  disabled={submitted}
                  className={`w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center space-x-2 transition-all shadow-xl ${submitted ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-opacity-90 hover:-translate-y-1'}`}
                >
                  {submitted ? (
                    <span className="text-sm sm:text-base">Inquiry Sent! We will call you back.</span>
                  ) : (
                    <>
                      <span className="text-sm sm:text-base">Submit Admission Inquiry</span>
                      <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
