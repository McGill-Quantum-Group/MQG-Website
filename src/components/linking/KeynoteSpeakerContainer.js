import React from "react";
import KeynoteSpeaker from "./KeynoteSpeaker";
import advancedEvents from "./advancedEvents.json";
import "./KeynoteSpeaker.css";

const defaultSpeakers = [
  {
    id: "matthieu-fortin-deschenes",
    name: "Matthieu Fortin-Deschênes",
    affiliation: "PINQ²",
    role: "Head of Quantum Solutions / Product Owner",
    bio: "Matthieu Fortin-Deschênes holds a PhD in engineering physics from Polytechnique Montréal and completed a postdoctoral fellowship in electrical engineering at Yale University. His research experience spans the development of new materials, both experimentally and computationally. He joined PINQ2 in 2023 as a product owner, where he develops and integrates quantum algorithms and hybrid algorithms for chemistry, materials science and computer-assisted materials discovery.",
    image: ""
  },
  {
    id: "brian-ingmanson",
    name: "Brian Ingmanson",
    affiliation: "IBM Quantum",
    role: "Engagement Lead, Quantum Innovation Centers in America",
    bio: "Brian Ingmanson is the Engagement Lead for Quantum Innovation Centers in America. He works with partners, educators, and students around the world to discover novel research and build skills in the field of quantum computing. He joined IBM in 2019 and helped to create global programs like the Qiskit Global Summer School and Qiskit Fall Fest. His accomplishments have earned him the IBM Outstanding Technical Achievement Award.\n\nPreviously Brian was a middle school science teacher, working at The Gilbert School in Winsted, CT for 6 years. He holds a B.S. and M.A. in Education from the University of Connecticut. Brian frequently presents on stage, and sometimes, plays the drums. Occasionally he’s known to do both at the same time.",
    image: "https://github.com/BrianIngmanson.png"
  },
  {
    id: "mohammad-el-mir",
    name: "Mohammad El Mir",
    affiliation: "École de Technologie Supérieure (ÉTS)",
    role: "Master's Student & Quantum Researcher",
    bio: "Mohammad El Mir is a Master’s student in École de Technologie Supérieure (ÉTS) under the supervision of Claude Crépeau. His thesis work is about quantum identification in the context of a satellite: With only a small, re-usable key, how is Alice capable of identifying Bob and vice-versa?",
    image: ""
  },
  {
    id: "denise-koch",
    name: "Denise Koch",
    affiliation: "Calcul Québec / Concordia University",
    role: "ARC Analyst & Quantum Computing Specialist",
    bio: "Denise Koch has over 20 years experience in the field of Advanced Research Computing (ARC) and joined the team of ARC Analysts at Concordia University in 2021, and has been specializing in quantum computing since 2023. Previously, Denise worked for 13 years as a Research Professional at the Centre for Research in Molecular Modeling (CERMM). She obtained a PhD in computational and theoretical chemistry from Concordia University in 2006, and then pursued a postdoctoral fellowship with James T. Hynes in molecular modeling at l’École normale supérieure, France.",
    image: ""
  }
];

function KeynoteSpeakerContainer({
  speakers = advancedEvents["Qiskit Fall Fest 2026"]?.speakers || defaultSpeakers,
  title = "Keynote & Featured Speakers",
  subtitle = "Meet the industry experts, academic researchers, and quantum leaders sharing their insights at McGill Qiskit Fall Fest 2026."
}) {
  return (
    <section className="keynote-speakers-section" id="speakers">
      <div className="keynote-speakers-container">
        {/* Section Header */}
        <div className="keynote-section-header">
          <h2 className="keynote-section-title">{title}</h2>
          {subtitle && <p className="keynote-section-subtitle">{subtitle}</p>}
        </div>

        {/* Speakers List — one per row */}
        <div className="keynote-speakers-list">
          {speakers && speakers.length > 0 ? (
            speakers.map((speaker, index) => (
              <KeynoteSpeaker key={speaker.id || speaker.name || index} speaker={speaker} />
            ))
          ) : (
            <p className="no-speakers-text">No speakers listed yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default KeynoteSpeakerContainer;
export { defaultSpeakers };
