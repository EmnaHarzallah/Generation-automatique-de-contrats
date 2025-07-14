// Stepper.jsx
import React from 'react';

export default function Stepper({ currentStep }) {
  const isActive = (step) => currentStep >= step;

  return (
    <div style={styles.stepperContainer}>
      <div style={styles.stepper}>
        {[1, 2, 3].map((step, index) => (
          <React.Fragment key={step}>
            <div style={isActive(step) ? styles.stepActive : styles.step}>
              <div style={styles.stepNumber}>{step}</div>
              <div style={styles.stepLabel}>
                {step === 1 ? 'Formulaire' : step === 2 ? 'Paiement' : 'Téléchargement'}
              </div>
            </div>
            {step < 3 && <div style={styles.stepLine}></div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

const styles = {
  stepperContainer: {
    marginBottom: '32px',
  },
  stepper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  step: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 2,
    color: '#6b7280',
  },
  stepActive: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 2,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  stepNumber: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: '#e5e7eb',
    color: '#6b7280',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '8px',
    fontSize: '16px',
    fontWeight: '600',
  },
  stepLabel: {
    fontSize: '14px',
  },
  stepLine: {
    flex: 1,
    height: '2px',
    backgroundColor: '#d1d5db',
    margin: '0 12px',
  },
};
