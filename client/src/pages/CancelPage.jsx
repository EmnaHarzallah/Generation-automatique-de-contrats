import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function CancelPage() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>❌</div>
        <h1 style={styles.title}>Paiement annulé</h1>
        <p style={styles.text}>
          Votre paiement a été annulé. Vous pouvez réessayer à tout moment.
        </p>
        <button
          style={styles.button}
          onClick={() => navigate('/')}
        >
          Retour au formulaire
        </button>
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
    background: '#fef2f2',
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
    color: '#ef4444',
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
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#ef4444',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
  },
};
