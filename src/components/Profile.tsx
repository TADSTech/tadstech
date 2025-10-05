import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import SocialMedia from '../helpers/socialMedia/SocialMedia.tsx';
import profileImage from '../assets/images/tads_picture.jpg';
import './profile.css'

const Profile: React.FC = () => {
  return (
    <div className="profile-section" id="profile">
      <div className="profile-container">
        <div className="profile-content">
          {/* Profile Image */}
          <div className="profile-image-container">
            <div className="profile-image-wrapper">
              <img
                src={profileImage}
                alt="Michael Tunwashe - TADS"
                className="profile-image"
              />
            </div>
            <div className="social-media-wrapper">
              <SocialMedia />
            </div>
          </div>

          {/* Profile Text */}
          <div className="profile-text-content">
            <h2 className="profile-title">
              <span className="bg-highlight">TADS</span> — The Average Data Scientist
            </h2>
            <p className="profile-description">
              I'm Michael Tunwashe, a data scientist and full-stack developer with a foundation in pure mathematics. I specialize in transforming raw data into actionable insights and building practical solutions with code. From data pipelines to full-stack apps, my focus is on delivering real-world impact with consistency and curiosity.
            </p>
            <p className="profile-description">
              I’ve built projects like <strong>FocusForge</strong> (Next.js, Supabase) and explored datasets on Kaggle, blending analytical rigor with creative problem-solving. My photography under <strong>#tadsography</strong> captures life’s perspectives, reminding me clarity matters in both data and design.
            </p>
            <div className="profile-buttons">
              <a href="/work" className="profile-primary-button">
                Explore My Work
              </a>
              <a href="/cv" className="profile-secondary-button">
                <FontAwesomeIcon icon={faDownload} className="mr-2" />
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;