import React from 'react';
import { X, ExternalLink, MapPin, Mail } from 'lucide-react';
import './AdvancedEventModal.css';
import EventImage from './EventImage';

function formatContactText(text) {
  if (!text) return null;

  // Regex matches:
  // 1. Markdown link: [label](url)
  // 2. Email address: name@domain.com
  // 3. Raw URL: https?://...
  // 4. Standalone "Discord" word
  const regex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|(https?:\/\/[^\s]+)|\b(Discord)\b/g;

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    if (match[1] && match[2]) {
      // Markdown link [label](url)
      parts.push(
        <a key={match.index} href={match[2]} target="_blank" rel="noopener noreferrer">
          {match[1]}
        </a>
      );
    } else if (match[3]) {
      // Email link
      parts.push(
        <a key={match.index} href={`mailto:${match[3]}`}>
          {match[3]}
        </a>
      );
    } else if (match[4]) {
      // Raw URL
      parts.push(
        <a key={match.index} href={match[4]} target="_blank" rel="noopener noreferrer">
          {match[4]}
        </a>
      );
    } else if (match[5]) {
      // Automatic Discord link
      parts.push(
        <a key={match.index} href="https://discord.gg/RcYtVGygDb" target="_blank" rel="noopener noreferrer">
          Discord
        </a>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
}

function AdvancedEventModal({ isOpen, onClose, eventData }) {
  if (!isOpen || !eventData) return null;

  const { hero, about, schedule, access, contact, organizers, resources, pastImages, speakers } = eventData;

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
                        <li key={i} className={!item.time ? "adv-schedule-note-item" : undefined}>
                          {item.time ? <span className="adv-time">{item.time}</span> : null}
                          <span className="adv-desc">{item.description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Keynote Speakers Section */}
          {speakers && speakers.length > 0 && (
            <section className="adv-section">
              <h3>Keynote & Featured Speakers</h3>
              <p className="adv-speakers-hint">
                Find more information on our main page for each speaker.
              </p>
              <div className="adv-schedule-grid">
                {speakers.map((spk, idx) => (
                  <div key={idx} className="adv-speaker-row">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {/* Speaker avatar commented out for now
                      {spk.image ? (
                        <img src={spk.image} alt={spk.name} className="adv-speaker-img" />
                      ) : (
                        <div className="adv-speaker-fallback-avatar">
                          {spk.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      */}
                      <div>
                        <h4 className="adv-speaker-name">{spk.name}</h4>
                        {spk.affiliation && (
                          <div className="adv-speaker-affiliation">{spk.affiliation}</div>
                        )}
                        {spk.role && (
                          <div className="adv-speaker-role">{spk.role}</div>
                        )}
                      </div>
                    </div>
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
                <p style={{ whiteSpace: 'pre-wrap' }}>{formatContactText(contact)}</p>
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
