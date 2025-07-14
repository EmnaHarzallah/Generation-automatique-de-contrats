import React from 'react';

export default function UploadContrat({ currentStep, formData, setCurrentStep }) {
  if (currentStep !== 3) return null;

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <div style={{
        fontSize: '48px',
        color: '#10b981',
        marginBottom: '16px'
      }}>✓</div>

      <h2 style={{ fontSize: '24px', fontWeight: '700' }}>Votre contrat est prêt !</h2>
      <p style={{ fontSize: '16px', color: '#4b5563', marginTop: '8px', marginBottom: '24px' }}>
        Félicitations ! Votre contrat a été généré avec succès.
      </p>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        backgroundColor: '#f3f4f6',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '16px'
      }}>
        <div style={{ fontSize: '24px' }}>📄</div>
        <div>
          <div style={{ fontWeight: '600' }}>Contrat_{formData.clientName || 'WeeFizz'}.pdf</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Taille : 1.2 MB</div>
        </div>
      </div>

      <button style={{
        padding: '12px 24px',
        backgroundColor: '#3b82f6',
        color: 'white',
        fontWeight: '600',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        marginBottom: '12px'
      }}>
        Télécharger le contrat
      </button>

      <button
        onClick={() => setCurrentStep(1)}
        style={{
          display: 'block',
          margin: '0 auto',
          backgroundColor: 'transparent',
          color: '#2563eb',
          border: 'none',
          fontWeight: '500',
          cursor: 'pointer',
          textDecoration: 'underline'
        }}
      >
        Créer un nouveau contrat
      </button>
    </div>
  );
}
