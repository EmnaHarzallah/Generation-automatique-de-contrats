import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import Stepper from './Stepper';

export default function SignatureContrat({
  currentStep,
  formData,
  goToPreviousStep,
  setCurrentStep,
  setLoading
}) {
  const sigCanvasRef = useRef(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    if (!sigCanvasRef.current || sigCanvasRef.current.isEmpty()) {
      setError("Veuillez signer le contrat avant de continuer.");
      return;
    }

      if (!formData.contratId || !formData.userId) {
    setError("Données utilisateur ou contrat manquantes.");
    return;
  }

    try {
      setLoading(true);
      setError(null);

      const signatureImage = sigCanvasRef.current
        .getTrimmedCanvas()
        .toDataURL("image/png");

      const response = await fetch("http://localhost:5000/signature", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contratId: formData.contratId,
          signature: signatureImage,
          userId: formData.userId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la sauvegarde de la signature");
      }

      // Une fois la signature enregistrée, on passe à l’étape suivante (ex: paiement)
      setCurrentStep(3);
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue lors de l'enregistrement de la signature.");
    } finally {
      setLoading(false);
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
            Choisissez un modèle, signez-le et poursuivez vers le paiement sécurisé.
          </p>
        </div>

        <Stepper currentStep={currentStep} />

        {currentStep === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600' }}>Signez le contrat</h2>

            <p style={{ color: '#374151' }}>Veuillez signer ci-dessous pour valider votre engagement :</p>

            <SignatureCanvas
              penColor="black"
              canvasProps={{
                width: 600,
                height: 200,
                className: 'sigCanvas',
                style: {
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  backgroundColor: '#f9fafb'
                }
              }}
              ref={sigCanvasRef}
              backgroundColor="#f9fafb"
            />

            <button
              onClick={() => sigCanvasRef.current.clear()}
              style={{
                alignSelf: 'flex-start',
                backgroundColor: '#d73917',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500',
                marginTop: '10px'
              }}
            >
              Effacer la signature
            </button>

            {error && (
              <div style={{ color: 'red', marginTop: '10px' }}>
                <strong>Erreur :</strong> {error}
              </div>
            )}

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
                onClick={handleSubmit}
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
                Continuer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
