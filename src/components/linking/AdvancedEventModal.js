import React from 'react';
import { X, ExternalLink, MapPin, Mail } from 'lucide-react';
import './AdvancedEventModal.css';
import EventImage from './EventImage';

function AdvancedEventModal({ isOpen, onClose, eventData }) {
  if (!isOpen || !eventData) return null;

  const { hero, about, schedule, access, contact, organizers, resources, pastImages } = eventData;

  return (
    <div className="adv-modal-overlay" onClick={onClose}>
      <div className="adv-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="adv-modal-scroll">
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ margin: 0 }}>{hero ? hero.title : 'Event Details'}</h1>
            <div style={{ cursor: 'pointer' }} onClick={onClose}>
              <X size={48} color="black" />
            </div>
          </div>
          {/* Subtitle & Registration */}
          {hero && (
            <>
              {hero.subtitle && <p style={{ color: '#555', margin: '0 0 3px 0' }}>{hero.subtitle}</p>}
              {hero.registrationLink && (
                <a href={hero.registrationLink} target="_blank" rel="noopener noreferrer" className="adv-register-btn">
                  Register here <ExternalLink size={16} />
                </a>
              )}
            </>
          )}

          {/* About Section */}
          {about && (
            <section className="adv-section">
              <h3>About</h3>
              <p>{about}</p>
            </section>
          )}

          {/* Schedule Section */}
          {schedule && schedule.length > 0 && (
            <section className="adv-section">
              <h3>Schedule</h3>
              <div className="adv-schedule-grid">
                {schedule.map((day, idx) => (
                  <div key={idx} className="adv-schedule-day">
                    <h4>{day.dayTitle}</h4>
                    <span className="adv-schedule-date">{day.date}</span>
                    <ul className="adv-schedule-list">
                      {day.items.map((item, i) => (
                        <li key={i}>
                          <span className="adv-time">{item.time}</span>
                          <span className="adv-desc">{item.description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Access — its own line */}
          {access && (
            <section className="adv-section">
              <h3>Access</h3>
              <div className="adv-info-line">
                <MapPin size={20} color="black" style={{ marginTop: '2px', flexShrink: 0 }} />
                <p style={{ whiteSpace: 'pre-wrap' }}>{access}</p>
              </div>
            </section>
          )}

          {/* Contact — its own line */}
          {contact && (
            <section className="adv-section">
              <h3>Contact</h3>
              <div className="adv-info-line">
                <Mail size={20} color="black" style={{ marginTop: '2px', flexShrink: 0 }} />
                <p>{contact}</p>
              </div>
            </section>
          )}

          {/* Organizers */}
          {organizers && organizers.length > 0 && (
            <section className="adv-section">
              <h3>Organizers</h3>
              <div className="adv-organizers-grid">
                {organizers.map((org, idx) => (
                  <div key={idx} className="adv-organizer-card">
                    <div className="adv-org-name">{org.name}</div>
                    <div className="adv-org-title">{org.title}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Resources */}
          {resources && resources.length > 0 && (
            <section className="adv-section">
              <h3>Resources</h3>
              {resources.map((res, idx) => (
                <div key={idx} className="adv-resource-row">
                  <h4 className="adv-resource-title">{res.title}</h4>
                  <a href={res.link} target="_blank" rel="noopener noreferrer" className="adv-resource-link">{res.link}</a>
                  <p className="adv-resource-desc">{res.description}</p>
                </div>
              ))}
            </section>
          )}

          {/* Past Qiskit Images */}
          {pastImages && pastImages.length > 0 && (
            <section className="adv-section">
              <h3>Past Qiskit Images</h3>
              <div className="adv-past-images-container">
                {pastImages.map((imgSrc, idx) => (
                  <EventImage key={idx} src={imgSrc} className="adv-past-image" />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdvancedEventModal;
