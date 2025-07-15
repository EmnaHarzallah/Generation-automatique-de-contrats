import React, { useEffect, useState } from "react";

export default function NewContrat({ userId, onNext }) {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const res = await fetch("http://localhost:5000/contrat-templates");
        if (!res.ok) throw new Error("Erreur lors du chargement des templates");
        const data = await res.json();
        setTemplates(data);
      } catch (e) {
        setError("Impossible de charger les modèles de contrat");
      } finally {
        setLoading(false);
      }
    }
    fetchTemplates();
  }, []);

  const handleSelect = (id) => {
    setSelectedTemplateId(id);
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTemplateId) {
      setError("Veuillez sélectionner un modèle de contrat.");
      return;
    }
    onNext({ userId, templateId: selectedTemplateId });
  };

  if (loading) return <p>Chargement des modèles...</p>;

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
          Choisissez votre modèle de contrat
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {templates.map((template) => (
              <div
                key={template._id}
                onClick={() => handleSelect(template._id)}
                className={`group relative cursor-pointer border rounded-md p-4 ${
                  selectedTemplateId === template._id
                    ? "border-blue-600 ring-2 ring-blue-500"
                    : "border-gray-200 hover:ring-1 hover:ring-gray-400"
                }`}
              >
                <h3 className="text-lg font-semibold text-gray-800">{template.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                <p className="text-sm font-medium text-gray-900">Prix : {template.price} €</p>
              </div>
            ))}
          </div>

          {error && (
            <p className="mt-4 text-red-600 font-medium">
              {error}
            </p>
          )}

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700"
            >
              Continuer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
