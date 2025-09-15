import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faEnvelope, 
  faPaperPlane,
  faComment,
  faCode,
} from '@fortawesome/free-solid-svg-icons';
import { 
  faGithub, 
  faLinkedin, 
  faTwitter 
} from '@fortawesome/free-brands-svg-icons';
import './styles/ContactPage.css';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  captcha: string;
}

const ContactPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<ContactForm>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaText, setCaptchaText] = useState(generateCaptcha());
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const captchaInputRef = useRef<HTMLInputElement>(null);

  // Generate random CAPTCHA text
  function generateCaptcha(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  }

  const refreshCaptcha = () => {
    setCaptchaText(generateCaptcha());
    setIsCaptchaVerified(false);
    if (captchaInputRef.current) {
      captchaInputRef.current.value = '';
    }
  };

  const verifyCaptcha = () => {
    const enteredCaptcha = watch('captcha');
    setIsCaptchaVerified(enteredCaptcha === captchaText);
  };

  const onSubmit = async (data: ContactForm) => {
    if (!isCaptchaVerified) {
      alert('Please verify the CAPTCHA correctly');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { name, email, subject, message } = data;
      const mailtoLink = `mailto:motrenewed@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
      
      window.location.href = mailtoLink;
      
      // Reset form after successful submission
      reset();
      refreshCaptcha();
      
      alert('Thank you for your message! We will get back to you soon.');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      icon: faGithub,
      url: 'https://github.com/tadstech',
      label: 'GitHub'
    },
    {
      icon: faLinkedin,
      url: 'https://linkedin.com/company/tadstech',
      label: 'LinkedIn'
    },
    {
      icon: faTwitter,
      url: 'https://twitter.com/tadstech',
      label: 'Twitter'
    }
  ];

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1>Get in Touch</h1>
          <p>
            Have questions about our services or want to discuss a project? 
            Fill out the form below and we'll get back to you soon.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-form-container">
            <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
              <div className="form-group">
                <div className="input-with-icon">
                  <FontAwesomeIcon icon={faUser} className="input-icon" />
                  <input
                    type="text"
                    placeholder="Your Name"
                    {...register('name', { required: 'Name is required' })}
                    className={errors.name ? 'error' : ''}
                  />
                </div>
                {errors.name && <span className="error-message">{errors.name.message}</span>}
              </div>

              <div className="form-group">
                <div className="input-with-icon">
                  <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className={errors.email ? 'error' : ''}
                  />
                </div>
                {errors.email && <span className="error-message">{errors.email.message}</span>}
              </div>

              <div className="form-group">
                <div className="input-with-icon">
                  <FontAwesomeIcon icon={faPaperPlane} className="input-icon" />
                  <input
                    type="text"
                    placeholder="Subject"
                    {...register('subject', { required: 'Subject is required' })}
                    className={errors.subject ? 'error' : ''}
                  />
                </div>
                {errors.subject && <span className="error-message">{errors.subject.message}</span>}
              </div>

              <div className="form-group">
                <div className="input-with-icon">
                  <FontAwesomeIcon icon={faComment} className="input-icon textarea-icon" />
                  <textarea
                    placeholder="Message"
                    rows={5}
                    {...register('message', { required: 'Message is required' })}
                    className={errors.message ? 'error' : ''}
                  />
                </div>
                {errors.message && <span className="error-message">{errors.message.message}</span>}
              </div>

              {/* CAPTCHA Section */}
              <div className="form-group">
                <div className="captcha-container">
                  <div className="captcha-display">
                    <span className="captcha-text">{captchaText}</span>
                    <button 
                      type="button" 
                      onClick={refreshCaptcha}
                      className="captcha-refresh"
                      title="Refresh CAPTCHA"
                    >
                      ↻
                    </button>
                  </div>
                  <div className="input-with-icon">
                    <FontAwesomeIcon icon={faCode} className="input-icon" />
                    <input
                      type="text"
                      placeholder="Enter CAPTCHA text"
                      {...register('captcha', { 
                        required: 'CAPTCHA is required',
                        onChange: verifyCaptcha
                      })}
                      ref={el => {
                        captchaInputRef.current = el;
                        
                        register('captcha').ref(el);
                      }}
                      className={errors.captcha ? 'error' : ''}
                    />
                  </div>
                  {isCaptchaVerified && (
                    <span className="captcha-success">✓ CAPTCHA verified</span>
                  )}
                  {errors.captcha && <span className="error-message">{errors.captcha.message}</span>}
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || !isCaptchaVerified}
                className="submit-button"
              >
                {isSubmitting ? (
                  <div className="loading-spinner"></div>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPaperPlane} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="contact-info">
            <div className="contact-methods">
              <h2>Or reach out directly</h2>
              
              <div className="contact-method">
                <FontAwesomeIcon icon={faEnvelope} className="method-icon" />
                <div>
                  <h3>Email Us</h3>
                  <p>motrenewed@gmail.com</p>
                </div>
              </div>

              <div className="social-section">
                <h2>Follow Us</h2>
                <div className="social-links">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      aria-label={social.label}
                    >
                      <FontAwesomeIcon icon={social.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;