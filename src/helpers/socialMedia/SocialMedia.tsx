import {
  faXTwitter,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './socialmedia.css'

const socialIcons = [
  { icon: faXTwitter, link: 'https://twitter.com/tads_tech' },
  { icon: faInstagram, link: 'https://instagram.com/tadstech' },
  { icon: faLinkedin, link: 'https://linkedin.com/in/tadstech' },
];

const SocialMedia: React.FC = () => {
  return (
    <div className="social-media-container">
      {socialIcons.map((item, index) => (
        <a
          href={item.link}
          className="social-icon"
          key={index}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={item.icon}
            className="social-icon-element"
          />
        </a>
      ))}
    </div>
  );
};

export default SocialMedia;