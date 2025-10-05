import React, { useState } from 'react';
import './servicescard.css'

interface Service {
  id: number;
  title: string;
  description: string;
}

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="service-card"
      aria-label={`Service: ${service.title}`}
    >
      <div
        className={`service-card-border ${isHovered ? 'active' : ''}`}
      />
      <div className="service-card-content">
        <h3 className="service-card-title">{service.title}</h3>
        <p className="service-card-description">{service.description}</p>
      </div>
    </article>
  );
};

export default ServiceCard;