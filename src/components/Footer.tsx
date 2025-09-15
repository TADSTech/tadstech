import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGithub, 
  faLinkedin, 
  faTwitter 
} from '@fortawesome/free-brands-svg-icons';
import './footer.css';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

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
      url: 'https://linkedin.com/company/tadstech',
      label: 'LinkedIn'
    },
    {
      icon: faTwitter,
      url: 'https://twitter.com/tadstech',
      label: 'Twitter'
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
      <div className="footer-container">
        {/* Mobile View */}
        <div className="footer-mobile">
          <div className="footer-logo">
            <h3 className="footer-logo-title">TADSTech</h3>
            <p className="footer-logo-subtitle">The Average Data Scientist</p>
          </div>
          
          <div className="footer-links-column">
            <h4 className="footer-links-title">Quick Links</h4>
            <div className="footer-links-list">
              {quickLinks.map(([label, path], index) => (
                <button
                  key={index}
                  className="footer-link"
                  onClick={() => handleLinkClick(path)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="footer-social">
            <h4 className="footer-social-title">Connect With Us</h4>
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
          
          <div className="footer-copyright">
            <p>© {currentYear} TADSTech. All rights reserved.</p>
          </div>
        </div>

        {/* Desktop View */}
        <div className="footer-desktop">
          <div className="footer-desktop-content">
            <div className="footer-logo">
              <h3 className="footer-logo-title">TADSTech</h3>
              <p className="footer-logo-subtitle">The Average Data Scientist</p>
            </div>
            
            <div className="footer-links-column">
              <h4 className="footer-links-title">Quick Links</h4>
              <div className="footer-links-list">
                {quickLinks.map(([label, path], index) => (
                  <button
                    key={index}
                    className="footer-link"
                    onClick={() => handleLinkClick(path)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="footer-social">
              <h4 className="footer-social-title">Connect With Us</h4>
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
      </div>
    </footer>
  );
};

export default Footer;