import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet';
import SocialMedia from '../helpers/socialMedia/SocialMedia';
import './styles/contact.css';
import Footer from '../components/Footer';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface AddressItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  title: string;
  description: string;
}

const addressData: AddressItem[] = [
  {
    icon: faMapMarkerAlt,
    title: 'Location',
    description: 'Lagos, Nigeria',
  },
  {
    icon: faEnvelope,
    title: 'Email',
    description: 'motrenewed@gmail.com',
  },
  {
    icon: faPhone,
    title: 'Phone',
    description: '+234-704-102-9093',
  },
];

const ContactPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    try {
      const { name, email, subject, message } = data;
      const mailtoLink = `mailto:motrenewed@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
      window.location.href = mailtoLink;
      reset();
    } catch (error) {
      console.error('Error sending message:', error);
      alert('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-page" id="contact">
      <Helmet>
        <title>Contact TADS | Michael Tunwashe - Data Scientist</title>
        <meta
          name="description"
          content="Contact Michael Tunwashe (TADS) for data science, full-stack development, or creative project collaborations. Reach out via email, phone, or social media."
        />
        <meta
          name="keywords"
          content="TADS, Michael Tunwashe, contact, data scientist, full-stack developer, Nigeria, React, Next.js, machine learning, Supabase, #tadsography"
        />
        <meta name="author" content="Michael Tunwashe" />
        <meta property="og:title" content="Contact TADS — Data Scientist & Developer" />
        <meta
          property="og:description"
          content="Get in touch with TADS for data-driven projects, web development, or creative collaborations in Lagos, Nigeria."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="contact-page-container">
        <header className="contact-page-header">
          <h1 className="contact-page-title">
            Connect with <span className="bg-highlight">TADS</span>
          </h1>
          <p className="contact-page-description">
            I’m Michael Tunwashe, ready to discuss data science, full-stack development, or creative projects like #tadsography. Let’s create something impactful together.
          </p>
        </header>

        <div className="contact-page-content">
          <div className="contact-page-form-container">
            <form onSubmit={handleSubmit(onSubmit)} className="contact-page-form">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your Name *"
                  {...register('name', { required: 'Name is required' })}
                  className={`contact-input ${errors.name ? 'error' : ''}`}
                  aria-label="Your Name"
                />
                {errors.name && <span className="error-message">{errors.name.message}</span>}
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Your Email *"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className={`contact-input ${errors.email ? 'error' : ''}`}
                  aria-label="Your Email"
                />
                {errors.email && <span className="error-message">{errors.email.message}</span>}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Subject *"
                  {...register('subject', { required: 'Subject is required' })}
                  className={`contact-input ${errors.subject ? 'error' : ''}`}
                  aria-label="Subject"
                />
                {errors.subject && <span className="error-message">{errors.subject.message}</span>}
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Your Message *"
                  rows={5}
                  {...register('message', { required: 'Message is required' })}
                  className={`contact-input textarea ${errors.message ? 'error' : ''}`}
                  aria-label="Your Message"
                />
                {errors.message && <span className="error-message">{errors.message.message}</span>}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="contact-submit-button"
                aria-label="Submit Contact Form"
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    Send Message
                    <svg
                      className="telegram-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.34 9.32L6.34 2.32C5.78749 2.04514 5.16362 1.94724 4.55344 2.03978C3.94326 2.13232 3.37646 2.4108 2.93033 2.83724C2.48421 3.26369 2.18046 3.81735 2.0605 4.42274C1.94054 5.02813 2.0102 5.65578 2.26 6.22L4.66 11.59C4.71446 11.72 4.74251 11.8593 4.74251 12C4.74251 12.1409 4.71446 12.2803 4.66 12.41L2.26 17.78C2.0567 18.2368 1.97076 18.7371 2.00998 19.2355C2.0492 19.7339 2.21235 20.2145 2.48459 20.6338C2.75682 21.0531 3.12953 21.3977 3.56883 21.6363C4.00812 21.875 4.50009 22 5 22C5.46823 21.9955 5.92949 21.8861 6.35 21.68L20.35 14.68C20.8466 14.4303 21.264 14.0474 21.5557 13.5742C21.8474 13.101 22.0018 12.556 22.0018 12C22.0018 11.4442 21.8474 10.8993 21.5557 10.4261C21.264 9.95282 20.8466 9.56994 20.35 9.32H20.34Z"
                        fill="currentColor"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
          <div className="contact-page-info">
            <h2 className="contact-page-info-title">Reach TADS Directly</h2>
            <div className="contact-addresses">
              {addressData.map((item, index) => (
                <article key={index} className="contact-address-card">
                  <div
                    className="address-icon-container"
                    aria-hidden="true"
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="address-icon"
                    />
                  </div>
                  <div className="address-content">
                    <p className="address-title">{item.title}</p>
                    <p className="address-description">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="contact-social">
              <h3 className="contact-social-title">Follow TADS</h3>
              <SocialMedia />
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <Footer />
    </section>
  );
};

export default ContactPage;