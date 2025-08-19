import React, { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Signup = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    pseudo: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "confirmPassword") {
      setPasswordMismatch(formData.password !== e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordMismatch(true);
      return;
    }
    try {
      await registerUser(formData);
      navigate("/login"); // Redirection après succès
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue.");
    }
  };

  return (
    <div className="h-screen bg-beige flex flex-col items-center justify-center overflow-hidden">
      {/* Header avec le logo */}
      <header className="w-full flex justify-center pt-4 bg-beige">
        <img src={logo} alt="Logo Bien-être" className="h-36 w-auto" />
      </header>

      {/* Formulaire d'inscription */}
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-xl mt-4">
        <h2 className="text-3xl font-playfair text-green-900 mb-6 text-center">
          Créez votre compte
        </h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Champs dans deux colonnes */}
          <div>
            <label className="block text-lg font-semibold mb-2 text-green-900">
              Nom
            </label>
            <input
              type="text"
              name="nom"
              onChange={handleChange}
              required
              className="w-full border border-green-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2 text-green-900">
              Prénom
            </label>
            <input
              type="text"
              name="prenom"
              onChange={handleChange}
              required
              className="w-full border border-green-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2 text-green-900">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
              className="w-full border border-green-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2 text-green-900">
              Pseudo
            </label>
            <input
              type="text"
              name="pseudo"
              onChange={handleChange}
              required
              className="w-full border border-green-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2 text-green-900">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
              className="w-full border border-green-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2 text-green-900">
              Confirmez le mot de passe
            </label>
            <input
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              required
              className="w-full border border-green-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-green-500"
            />
            {passwordMismatch && (
              <p className="text-red-500 text-sm mt-2">
                Les mots de passe ne correspondent pas.
              </p>
            )}
          </div>

          {/* Boutons */}
          <div className="col-span-full flex justify-center gap-4 mt-4">
            <button
              type="button"
              className="bg-green-100 border border-green-900 text-green-900 px-6 py-3 rounded-lg font-bold hover:bg-green-200 transition"
              onClick={() => navigate("/login")}
            >
              Se connecter
            </button>
            <button
              type="submit"
              className="bg-green-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition"
            >
              S'inscrire
            </button>
          </div>
        </form>

        {/* Lien de retour à l'accueil */}
        <div className="text-center mt-4">
          <Link to="/" className="text-green-700 font-semibold hover:underline">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
