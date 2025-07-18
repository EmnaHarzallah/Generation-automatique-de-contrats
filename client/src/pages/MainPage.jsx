import React, { useState } from "react";
import ContratForm from "../components/ContratForm";
import PayementDetails from "../components/PaymentDetails";
import UploadContrat from "../components/UploadContrat";
import SignatureContrat from "../components/SignatureContrat";
import NewContrat from "../components/NewContrat";

export default function MainPage() {
  const [formData, setFormData] = useState({
    clientName: '',
    duree: '6',
    option: 'WeeFizz API'
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const goToPreviousStep = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const handleNext = (data) => {
  console.log("Données sélectionnées :", data); 
  setFormData((prev) => ({ ...prev, ...data }));
  setCurrentStep((prev) => prev + 1);
};

  return (
    <div className="onboarding" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '32px',
        paddingBottom: '20px',
        borderBottom: '1px solid #eaeff5',
        maxWidth: '700px',
        width: '100%'
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
          Remplissez le formulaire et payez en ligne pour obtenir votre document légal.
        </p>
      </div>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
        padding: '40px',
        maxWidth: '700px',
        width: '100%'
      }}>
        {currentStep === 0 && (
          <NewContrat
            formData={formData}
            setFormData={setFormData}
            setCurrentStep={setCurrentStep}
            onNext={handleNext} 
          />
        )}
        {currentStep === 1 && (
          <ContratForm
            formData={formData}
            setFormData={setFormData}
            setCurrentStep={setCurrentStep} 
            goToPreviousStep={goToPreviousStep}
            />
        )}

        {currentStep === 2 && (
          <SignatureContrat
            currentStep={currentStep}
            formData={formData}
            goToPreviousStep={goToPreviousStep}
            setCurrentStep={setCurrentStep}
            setLoading={setLoading}
          />
        )}
    {currentStep === 3 && (
          <PayementDetails
            currentStep={currentStep}
            formData={formData}
            goToPreviousStep={goToPreviousStep}
            setCurrentStep={setCurrentStep}
            setLoading={setLoading}
          />
        )}
        {currentStep === 4 && (
          <UploadContrat
            currentStep={currentStep}
            formData={formData}
            setCurrentStep={setCurrentStep}
          />
        )}
      </div>
    </div>
  );
}
