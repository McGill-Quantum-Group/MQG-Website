/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./KeynoteSpeaker.css";

function getInitials(name) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// eslint-disable-next-line no-unused-vars
function KeynoteSpeaker({ speaker }) {
  // const [imgError, setImgError] = useState(false);
  // const [imgLoaded, setImgLoaded] = useState(false);

  if (!speaker) return null;

  const { name, role, affiliation, bio } = speaker;
  // const initials = getInitials(name);
  // const hasImage = Boolean(image && image.trim() && !imgError);

  // Split bio by double newlines into clean paragraphs
  const paragraphs = (bio || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="keynote-speaker-card">
      <div className="speaker-card-header">
        {/* Speaker image / avatar commented out for now
        <div className="speaker-avatar-wrapper">
          {hasImage ? (
            <>
              {!imgLoaded && (
                <div className="speaker-avatar-placeholder">
                  <span className="speaker-initials-text">{initials}</span>
                </div>
              )}
              <img
                src={image}
                alt={name}
                className={`speaker-avatar-img ${imgLoaded ? "loaded" : "loading"}`}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
              />
            </>
          ) : (
            <div className="speaker-avatar-fallback">
              <span className="speaker-initials-text">{initials}</span>
            </div>
          )}
        </div>
        */}

        <div className="speaker-meta">
          <h3 className="speaker-name">{name}</h3>
          {affiliation && <div className="speaker-company">{affiliation}</div>}
          {role && <div className="speaker-role">{role}</div>}
        </div>
      </div>

      <div className="speaker-bio">
        {paragraphs.length > 0 ? (
          paragraphs.map((para, idx) => (
            <p key={idx} className="speaker-bio-paragraph">
              {para}
            </p>
          ))
        ) : (
          <p className="speaker-bio-paragraph">{bio}</p>
        )}
      </div>
    </div>
  );
}

export default KeynoteSpeaker;
