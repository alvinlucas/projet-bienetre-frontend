import React, { useState, useContext } from "react";
import { loginUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // Importez le contexte utilisateur
import logo from "../assets/logo.png"; // Assurez-vous que le chemin est correct

const Login = () => {
    const [formData, setFormData] = useState({
        identifiant: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useContext(UserContext); // Récupérer la fonction login depuis le contexte

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(formData);
            // Stocker l'utilisateur et le token via le contexte
            login(response.data.user, response.data.token);

            // Redirection vers le tableau de bord
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Une erreur est survenue.");
        }
    };

    return (
        <div className="h-screen bg-beige flex flex-col items-center">
            {/* Header */}
            <header className="w-full flex justify-center pt-4 bg-beige">
                <img
                    src={logo}
                    alt="Logo Bien-être"
                    className="h-36 w-auto"
                />
            </header>

            {/* Login Form */}
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg mt-16">
                <h2 className="text-3xl font-playfair text-green-900 mb-6 text-center">Connexion</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block font-semibold mb-1">Email / Pseudo</label>
                        <input
                            type="text"
                            name="identifiant"
                            onChange={handleChange}
                            required
                            className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold mb-1">Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            required
                            className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-500"
                        />
                    </div>
                    <div className="flex justify-between items-center mt-6">
                        <button
                            type="button"
                            className="bg-green-100 border border-green-900 text-green-900 px-4 py-2 rounded-lg font-bold hover:bg-green-200 transition"
                            onClick={() => navigate("/signup")}
                        >
                            S'inscrire
                        </button>
                        <button
                            type="submit"
                            className="bg-green-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition"
                        >
                            Se connecter
                        </button>
                    </div>
                </form>
                <div className="text-center mt-6">
                    <Link
                        to="/"
                        className="text-green-700 font-semibold hover:underline"
                    >
                        Retour à l'accueil
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
