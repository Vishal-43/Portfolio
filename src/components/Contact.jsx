import { useState, useRef } from 'react';
import { validateEmail } from '../utils/helpers';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { getIcon } from '../utils/iconMap';
import SectionBackground from './layout/SectionBackground';

/**
 * Contact Section with SMTP email functionality
 */
const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const data = usePortfolioData();
  const contactData = data.contact;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const apiUrl = (
        import.meta.env.VITE_API_URL
        || (import.meta.env.DEV ? 'http://localhost:5000' : window.location.origin)
      ).replace(/\/$/, '');

      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message || 'Email sent successfully! I will get back to you soon.',
        });
        // Reset form
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message || 'Failed to send email. Please try again.',
        });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionBackground id="contact" showStars>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              {contactData.title}
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            {contactData.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {contactData.heading}
              </h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                {contactData.description}
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              {contactData.contactInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-dark-100 rounded-lg border border-primary-600/20 hover:border-primary-600/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center text-primary-400">
                    {getIcon(info.icon, { size: 24 })}
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">{info.label}</div>
                    {info.link ? (
                      <a href={info.link} className="text-white hover:text-primary-400 transition-colors">
                        {info.value}
                      </a>
                    ) : (
                      <div className="text-white">{info.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Connect with me</h4>
              <div className="flex gap-4">
                {contactData.socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-dark-100 rounded-lg flex items-center justify-center border border-primary-600/20 hover:border-primary-600 hover:bg-primary-600/20 hover:scale-110 transition-all duration-300"
                    title={social.name}
                  >
                    {getIcon(social.icon, { size: 24 })}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Contact Form */}
          <div className="relative bg-dark-100 p-8 rounded-xl border border-primary-600/20 hover:border-primary-600/30 transition-all duration-300 group">
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary-500/30 rounded-tl-xl group-hover:border-primary-500/50 transition-colors duration-300" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary-500/30 rounded-br-xl group-hover:border-primary-500/50 transition-colors duration-300" />
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {/* Name */}
              <div className="group/input">
                <label htmlFor="name" className="block text-white font-medium tracking-wide mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-dark-200 text-white rounded-lg border ${
                      errors.name ? 'border-red-500' : 'border-primary-600/20'
                    } focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/20 transition-all duration-300`}
                    placeholder="Your name"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-500/0 to-primary-600/0 group-focus-within/input:from-primary-500/5 group-focus-within/input:to-primary-600/5 pointer-events-none transition-all duration-300" />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <span>⚠</span> {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="group/input">
                <label htmlFor="email" className="block text-white font-medium tracking-wide mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  Email *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-dark-200 text-white rounded-lg border ${
                      errors.email ? 'border-red-500' : 'border-primary-600/20'
                    } focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/20 transition-all duration-300`}
                    placeholder="your.email@example.com"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-500/0 to-primary-600/0 group-focus-within/input:from-primary-500/5 group-focus-within/input:to-primary-600/5 pointer-events-none transition-all duration-300" />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <span>⚠</span> {errors.email}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div className="group/input">
                <label htmlFor="subject" className="block text-white font-medium tracking-wide mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  Subject *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-dark-200 text-white rounded-lg border ${
                      errors.subject ? 'border-red-500' : 'border-primary-600/20'
                    } focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/20 transition-all duration-300`}
                    placeholder="What's this about?"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-500/0 to-primary-600/0 group-focus-within/input:from-primary-500/5 group-focus-within/input:to-primary-600/5 pointer-events-none transition-all duration-300" />
                </div>
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <span>⚠</span> {errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="group/input">
                <label htmlFor="message" className="block text-white font-medium tracking-wide mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  Message *
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 bg-dark-200 text-white rounded-lg border ${
                      errors.message ? 'border-red-500' : 'border-primary-600/20'
                    } focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/20 transition-all duration-300 resize-none`}
                    placeholder="Tell me about your project..."
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-500/0 to-primary-600/0 group-focus-within/input:from-primary-500/5 group-focus-within/input:to-primary-600/5 pointer-events-none transition-all duration-300" />
                </div>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <span>⚠</span> {errors.message}
                  </p>
                )}
              </div>

              {/* Enhanced Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`relative w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 overflow-hidden group/btn ${
                  isSubmitting
                    ? 'bg-primary-600/50 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary-600/30'
                } text-white flex items-center justify-center gap-3`}
              >
                {/* Animated background on hover */}
                {!isSubmitting && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-400/0 via-white/10 to-primary-400/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
                )}
                
                <span className="relative z-10 flex items-center gap-3">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </span>
              </button>

              {/* Enhanced Success/Error Messages */}
              {submitStatus && (
                <div className={`p-4 rounded-lg text-center border backdrop-blur-sm animate-in fade-in slide-in-from-top-2 ${
                  submitStatus.type === 'success'
                    ? 'bg-green-600/20 border-green-500 text-green-300 shadow-lg shadow-green-600/20'
                    : 'bg-red-600/20 border-red-500 text-red-300 shadow-lg shadow-red-600/20'
                }`}>
                  <span className="text-xl mr-2">{submitStatus.type === 'success' ? '✓' : '✗'}</span>
                  {submitStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </SectionBackground>
  );
};

export default Contact;
