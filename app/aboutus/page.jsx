import React from 'react';

function About() {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1>About Us</h1>
      </header>
      <main className="about-content">
        <section>
          <h2>Our Mission</h2>
          <p>At [Your Company Name], our mission is to [briefly describe your mission].</p>
        </section>
        <section>
          <h2>Our Team</h2>
          <p>We have a dedicated team of professionals who are passionate about [your field/industry].</p>
        </section>
        <section>
          <h2>Contact Us</h2>
          <p>For more information, please reach out to us at [your contact information].</p>
        </section>
      </main>
      <footer className="about-footer">
        <p>&copy; 2024 [Your Company Name]. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default About;
