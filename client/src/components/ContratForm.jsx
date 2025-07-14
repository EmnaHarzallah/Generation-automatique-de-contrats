import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = process.env.REACT_APP_STRIPE_PUBLIC_KEY 
  ? loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
  : null;

export default function ContractForm({ template }) {
  // États initiaux avec vérification
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isTemplateValid, setIsTemplateValid] = useState(false);

  // Vérification du template au montage
  useEffect(() => {
    if (template && template._id && template.name && template.fields) {
      setIsTemplateValid(true);
      // Initialiser formData avec les champs du template
      const initialData = {};
      template.fields.forEach(field => {
        initialData[field.name] = '';
      });
      setFormData(initialData);
    } else {
      setError('Template invalide ou incomplet');
    }
  }, [template]);

  const handleChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isTemplateValid) {
      setError('Veuillez sélectionner un template valide');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Validation des champs requis
      const missingFields = template.fields
        .filter(field => field.required && !formData[field.name])
        .map(field => field.label);

      if (missingFields.length > 0) {
        throw new Error(`Champs requis manquants: ${missingFields.join(', ')}`);
      }

      // Envoi au serveur
      const response = await fetch('/api/contracts/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: template._id,
          formData
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
      }

      const { clientSecret, contractId } = await response.json();

      // Paiement Stripe
      const stripe = await stripePromise;
      const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        receipt_email: formData.email,
      });

      if (stripeError) throw stripeError;

      // Téléchargement
      window.location.href = `/api/contracts/${contractId}/download`;

    } catch (err) {
      console.error('Erreur:', err);
      setError(err.message || 'Une erreur est survenue lors de la génération');
    } finally {
      setLoading(false);
    }
  };

  if (!isTemplateValid) {
    return (
      <div className="template-error">
        <h3>Erreur de Template</h3>
        <p>{error || 'Le template fourni est invalide ou incomplet'}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contract-form">
      <h2>{template.name}</h2>
      <p className="price">Prix: {template.price}€</p>
      
      {template.fields.map(field => (
        <div key={field.name} className="form-group">
          <label htmlFor={field.name}>
            {field.label}
            {field.required && <span className="required">*</span>}
          </label>
          {field.type === 'textarea' ? (
            <textarea
              id={field.name}
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              required={field.required}
              placeholder={field.placeholder || ''}
            />
          ) : (
            <input
              id={field.name}
              type={field.type || 'text'}
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              required={field.required}
              placeholder={field.placeholder || ''}
            />
          )}
        </div>
      ))}

      {error && (
        <div className="error-message">
          <strong>Erreur :</strong> {error}
        </div>
      )}

      <button 
        type="submit" 
        disabled={loading}
        className={`submit-button ${loading ? 'loading' : ''}`}
        aria-busy={loading}
      >
        {loading ? (
          <>
            <span className="spinner" aria-hidden="true"></span>
            Génération en cours...
          </>
        ) : (
          `Payer ${template.price}€ et Générer`
        )}
      </button>
    </form>
  );
}