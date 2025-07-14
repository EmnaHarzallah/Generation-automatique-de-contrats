import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function SuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>✅</div>
        <h1 style={styles.title}>Paiement réussi !</h1>
        <p style={styles.text}>
          Merci pour votre paiement. Votre contrat est en cours de génération.
        </p>
        <p style={styles.textSmall}>Vous allez être redirigé...</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f0f7ff',
  },
  card: {
    background: '#fff',
    padding: '40px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  },
  icon: {
    fontSize: '48px',
    color: '#10b981',
    marginBottom: '16px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '12px',
  },
  text: {
    fontSize: '16px',
    color: '#4b5563',
    marginBottom: '8px',
  },
  textSmall: {
    fontSize: '14px',
    color: '#6b7280',
  },
};
