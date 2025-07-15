import React from 'react';
import Stepper from './Stepper';

export default function ContratForm({ formData, setFormData, setCurrentStep, goToPreviousStep }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(2); // Passe directement à l'étape Paiement
  };

  return (
    <>
      <Stepper currentStep={1} />

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h2 style={{ fontSize: '20px', marginBottom: '12px', fontWeight: '600', color: '#111827' }}>
            Détails du contrat
          </h2>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Nom du client <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              required
              placeholder="Entrez le nom du client"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #d1d5db'
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Durée (mois) <span style={{ color: 'red' }}>*</span>
            </label>
            <select
              name="duree"
              value={formData.duree}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #d1d5db'
              }}

            ><option value="1">1 mois</option>
              <option value="3">3 mois</option>
              <option value="6">6 mois</option>
              <option value="12">12 mois</option>
              <option value="24">24 mois</option>
            </select>
          </div>

          
        </div>

        <button
          type="submit"
          style={{
            padding: '12px 24px',
            backgroundColor: '#2563eb',
            color: 'white',
            fontWeight: '600',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Signer le contrat 
        </button>
         
      </form>
      <button
                onClick={goToPreviousStep}
                style={{
                  padding: '12px 20px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Retour
              </button>
    </>
  );
}
