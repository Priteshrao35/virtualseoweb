"use client";
import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
  return (
    <motion.a 
      href="https://wa.me/919450977593"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ y: 0 }}
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      style={{
        position: 'fixed',
        bottom: '10px',
        left: '5%',
        width: '50px',
        height: '50px',
        backgroundColor: '#25D366',
        color: 'white',
        borderRadius: '50%',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
      }}
      className="whatsapp-button"
    >
      <i className="fab fa-whatsapp" style={{ fontSize: '30px' }}></i>
    </motion.a>
  );
};

export default WhatsAppButton;