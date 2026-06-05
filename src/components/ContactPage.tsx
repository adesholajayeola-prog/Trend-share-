import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, AlertCircle, RefreshCw } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Editorial Submission');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'FullName is required.';
    }
    if (!email.trim()) {
      newErrors.email = 'An email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please provide a valid email format.';
    }
    if (!message.trim()) {
      newErrors.message = 'Please input a detailed message.';
    } else if (message.trim().length < 15) {
      newErrors.message = 'Message must be at least 15 characters long.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate API Network Handshake
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset variables
      setName('');
      setEmail('');
      setMessage('');
    }, 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn text-left" id="contact-page-container">
      
      {/* Editorial head */}
      <div className="text-center space-y-3 mb-12">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-sky-500 bg-sky-500/10 px-2.5 py-1 rounded">
          Contact Desk
        </span>
        <h1 className="text-3xl font-sans font-bold text-gray-900 dark:text-white tracking-tight">
          Connect with the TrendSphere Newsroom
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Submit corrections, write-ups, or request details about programmatic Google AdSense configurations and custom sidebar placements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Information channel list (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-gray-950 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-6">
            <h3 className="text-sm font-bold font-sans text-gray-900 dark:text-white uppercase tracking-wider">
              Communication Channels
            </h3>

            <div className="space-y-4">
              
              {/* Box 1 */}
              <div className="flex gap-3">
                <div className="h-9 w-9 rounded-lg bg-sky-500/15 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white">Editorial & Corrections</h4>
                  <p className="text-[11px] text-gray-400 font-mono mt-0.5">newsroom@trendsphere-mock.com</p>
                </div>
              </div>

              {/* Box 2 */}
              <div className="flex gap-3">
                <div className="h-9 w-9 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white">Advertising Partnerships</h4>
                  <p className="text-[11px] text-gray-400 font-mono mt-0.5">sponsors@trendsphere-mock.com</p>
                </div>
              </div>

              {/* Box 3 */}
              <div className="flex gap-3">
                <div className="h-9 w-9 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white">Media Headquarters</h4>
                  <p className="text-[11px] text-gray-405 dark:text-gray-400 mt-0.5 leading-relaxed">
                    100 Sansome Street, Penthouse B<br />
                    San Francisco, CA 94104
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/60 p-5 rounded-2xl border border-gray-150 dark:border-gray-850/40 text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-sans">
            <span className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Response Policy</span>
            We strive to audit correction submissions and ad partner placements within 24 business hours. If you are suggesting a custom premium ad format rotation, please attach CPM history records.
          </div>
        </div>

        {/* Right validation Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-gray-950 p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
          
          {submitSuccess ? (
            <div className="text-center py-12 space-y-4">
              <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-2 animate-pulse">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Message Sent Successfully!
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
                Thank you for contacting TrendSphere. Your ticket (ID: TS-{Math.floor(Math.random() * 90000 + 10000)}) has been registered. An editor or programmatic ad relations lead will get back to you shortly.
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="mt-4 px-4 py-2 text-xs font-semibold text-sky-500 hover:text-sky-600 bg-sky-500/5 hover:bg-sky-500/10 rounded-lg transition-colors cursor-pointer focus:outline-none"
                id="contact-another-message"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-sans">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-[10px] font-mono tracking-wide uppercase font-bold text-gray-400 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="E.g. Jennifer Lane"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 focus:border-sky-500 focus:outline-none placeholder-gray-400"
                    id="contact-name-input"
                  />
                  {errors.name && (
                    <p className="text-[10px] text-rose-500 font-semibold mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-mono tracking-wide uppercase font-bold text-gray-400 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="E.g. jennifer@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 focus:border-sky-500 focus:outline-none placeholder-gray-400"
                    id="contact-email-input"
                  />
                  {errors.email && (
                    <p className="text-[10px] text-rose-500 font-semibold mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

              </div>

              <div>
                <label className="block text-[10px] font-mono tracking-wide uppercase font-bold text-gray-400 mb-1.5">
                  Subject Inquiry
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="block w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 focus:border-sky-500 focus:outline-none"
                  id="contact-subject-select"
                >
                  <option value="Editorial Submission">Editorial Submission & Pitches</option>
                  <option value="Ad Placement Inquiry">Premium Direct Ad Placement</option>
                  <option value="Google AdSense Alignment">AdSense Integration Audit</option>
                  <option value="Correction / General Report">Correction Submission</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono tracking-wide uppercase font-bold text-gray-400 mb-1.5">
                  Detailed Inquiry Message
                </label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Include context. If suggesting direct advertising placements, please include preferred CPM indices."
                  className="block w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 focus:border-sky-500 focus:outline-none placeholder-gray-400"
                  id="contact-message-textarea"
                ></textarea>
                {errors.message && (
                  <p className="text-[10px] text-rose-500 font-semibold mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 bg-sky-500 hover:bg-sky-600 disabled:bg-sky-500/60 text-white font-semibold text-xs rounded-xl shadow-md cursor-pointer transition-colors flex items-center justify-center gap-1.5 focus:outline-none"
                id="contact-submit-btn"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>Send Secure Message</span>
                  </>
                )}
              </button>

            </form>
          )}

        </div>

      </div>

    </div>
  );
}
