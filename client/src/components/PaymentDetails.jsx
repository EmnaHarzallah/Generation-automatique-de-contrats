import React from 'react';
import Stepper from './Stepper';
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51RkmsnPvLhG1p0N1La3gb2PeB7FHxYc6VvJLDZPDtKurlAeiEcNlNQrh3uA7YZG2mW0tK57Or0K46K0DQcaCIzG3005QAqqf7o");

export default function PayementDetails({
  currentStep,
  formData,
  goToPreviousStep,
  setCurrentStep,
  setLoading
}) {
    const handleStripePayment = async () => {
  const stripe = await stripePromise;

  const response = await fetch("http://localhost:5000/stripe/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ option: formData.option }),
  });

  const session = await response.json();

  const result = await stripe.redirectToCheckout({
    sessionId: session.id,
  });

  if (result.error) {
    console.error(result.error.message);
  }
};
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f7ff',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
        padding: '40px',
        maxWidth: '700px',
        width: '100%'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '32px',
          paddingBottom: '20px',
          borderBottom: '1px solid #eaeff5'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1a3a5f',
            marginBottom: '12px',
            background: 'linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Générez votre contrat en 2 minutes
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#4b5563',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Choisissez un modèle, remplissez le formulaire et payez en ligne pour obtenir votre document légal.
          </p>
        </div>

        <Stepper currentStep={currentStep} />

        {currentStep === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600' }}>Paiement sécurisé</h2>
            <p style={{ fontSize: '16px', color: '#4b5563' }}>
              Montant à payer: {formData.option === 'WeeFizz API' ? '199€' : '249€'}
            </p>

            <div style={{
              padding: '20px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              backgroundColor: '#f9fafb'
            }}>
              <div style={{ fontWeight: '600', marginBottom: '16px' }}>Informations de paiement</div>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  marginBottom: '12px'
                }}
              />
              <div style={{ display: 'flex', gap: '12px' }}>
                <input
                  type="text"
                  placeholder="MM/AA"
                  style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db' }}
                />
                <input
                  type="text"
                  placeholder="123"
                  style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
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
              <button
  onClick={handleStripePayment}
  style={{
    padding: '12px 20px',
    backgroundColor: '#10b981',
    color: 'white',
    borderRadius: '8px',
    border: 'none',
    fontWeight: '600',
    cursor: 'pointer'
  }}
>
  Payer et générer le contrat
</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
