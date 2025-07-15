import React from 'react';
import Stepper from './Stepper';

export default function ContratForm({ formData, setFormData, setCurrentStep }) {
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
            >
              <option value="6">6 mois</option>
              <option value="12">12 mois</option>
              <option value="24">24 mois</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Option choisie <span style={{ color: 'red' }}>*</span>
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['WeeFizz API', 'WeeFizz Fashion'].map((opt) => (
                <label key={opt} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <input
                    type="radio"
                    name="option"
                    value={opt}
                    checked={formData.option === opt}
                    onChange={handleChange}
                  />
                  <div>
                    <div style={{ fontWeight: '600' }}>{opt}</div>
                    <div style={{ fontSize: '14px', color: '#6b7280' }}>
                      {opt === 'WeeFizz API'
                        ? 'Solution complète pour intégration API'
                        : "Plateforme spécialisée pour l'industrie de la mode"}
                    </div>
                  </div>
                </label>
              ))}
            </div>
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
          Continuer vers le paiement
        </button>
      </form>
    </>
  );
}
