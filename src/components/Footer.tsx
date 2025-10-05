import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGithub, 
  faInstagram, 
  faLinkedin, 
  faXTwitter 
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet';
import './footer.css';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    ['Home', '/'],
    ['Services', '/services'],
    ['GitHub', '/github'],
    ['About', '/about'],
    ['Contact', '/contact'],
  ];

  const socialLinks = [
    {
      icon: faGithub,
      url: 'https://github.com/tadstech',
      label: 'GitHub'
    },
    {
      icon: faLinkedin,
      url: 'https://linkedin.com/in/tadstech',
      label: 'LinkedIn'
    },
    {
      icon: faXTwitter,
      url: 'https://X.com/tads_tech',
      label: 'X'
    },
    {
      icon: faInstagram,
      url: 'https://instagram.com/tadstech',
      label: 'Instagram'
    },
    {
      icon: faEnvelope,
      url: 'mailto:motrenewed@gmail.com',
      label: 'Email'
    }
  ];

  const handleLinkClick = (path: string) => {
    if (path.startsWith('http')) {
      window.open(path, '_blank');
    } else {
      navigate(path);
    }
  };

  return (
    <footer className="footer">
      <Helmet>
        <title>TADS - The Average Data Scientist | Michael Tunwashe</title>
        <meta
          name="description"
          content="Connect with Michael Tunwashe (TADS), a data scientist and full-stack developer specializing in machine learning, analytics, and cross-platform applications."
        />
        <meta
          name="keywords"
          content="TADS, Michael Tunwashe, data scientist, full-stack developer, React, Next.js, machine learning, Nigeria, cross-platform apps"
        />
        <meta name="author" content="Michael Tunwashe" />
        <meta property="og:title" content="TADS - Innovative Data Solutions" />
        <meta
          property="og:description"
          content="Explore TADS services in data science, development, and creative projects. Contact us for collaborations."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://tadstech.web.app" />
      </Helmet>

      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <h3 className="footer-logo-title">TADSTech</h3>
            <p className="footer-logo-subtitle">The Average Data Scientist</p>
          </div>
          
          <div className="footer-links">
            <h4 className="footer-links-title">Quick Links</h4>
            <div className="footer-links-list">
              {quickLinks.map(([label, path], index) => (
                <button
                  key={index}
                  className="footer-link"
                  onClick={() => handleLinkClick(path)}
                  aria-label={`Navigate to ${label}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="footer-social">
            <h4 className="footer-social-title">Connect</h4>
            <div className="footer-social-icons">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  aria-label={social.label}
                >
                  <FontAwesomeIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="footer-copyright">
          <p>© {currentYear} TADSTech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;