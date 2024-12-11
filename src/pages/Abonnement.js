import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import {
    checkSubscriptionStatus,
    renewSubscription,
    toggleAutoRenew,
    cancelSubscription,
} from "../services/api";
import Navbar from "../components/Navbar";
import Subscribe from "./Subscribe";
import { useNavigate } from "react-router-dom";

const Abonnement = () => {
    const { user } = useContext(UserContext); // Récupérer l'utilisateur depuis le contexte
    const [status, setStatus] = useState(null);
    const [autoRenew, setAutoRenew] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [renewLoading, setRenewLoading] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false); // Pour afficher/masquer le modal
    const navigate = useNavigate();

    useEffect(() => {
        if (user === null) {
            return; // Attendez que le contexte soit complètement chargé
        }

        if (!user) {
            navigate("/login"); // Redirigez seulement si `user` est explicitement "falsey" (non connecté)
            return;
        }

        const fetchStatus = async () => {
            try {
                const response = await checkSubscriptionStatus(user.email);
                setStatus(response.data);
                setAutoRenew(response.data.autoRenew || false);
            } catch (err) {
                setError("Erreur lors de la récupération des informations d'abonnement.");
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
    }, [user, navigate]);

    const handleToggleAutoRenew = async () => {
        try {
            await toggleAutoRenew({ email: user.email, autoRenew: !autoRenew });
            setAutoRenew(!autoRenew);
        } catch (err) {
            setError("Erreur lors de la mise à jour du renouvellement automatique.");
        }
    };

    const handleRenewSubscription = async () => {
        setRenewLoading(true);
        try {
            // Appeler l'API pour renouveler l'abonnement
            await renewSubscription({ email: user.email });

            // Recharger les informations d'abonnement
            const updatedStatus = await checkSubscriptionStatus(user.email);
            setStatus(updatedStatus.data); // Mettre à jour le statut avec les nouvelles données
        } catch (err) {
            setError("Erreur lors du renouvellement de l'abonnement.");
        } finally {
            setRenewLoading(false);
        }
    };

    const handleCancelSubscription = async () => {
        try {
            await cancelSubscription(user.email);
            const updatedStatus = await checkSubscriptionStatus(user.email);
            setStatus(updatedStatus.data);
        } catch (err) {
            setError("Erreur lors de l'annulation de l'abonnement.");
        } finally {
            setShowCancelModal(false); // Fermer le modal
        }
    };

    if (user === null || loading) {
        return (
            <div className="bg-beige min-h-screen">
                <Navbar />
                <p className="text-center text-green-900 mt-8">Chargement...</p>
            </div>
        );
    }
    if (!status) {
        // Si l'utilisateur n'a pas d'abonnement, afficher la page Subscribe
        return <Subscribe user={user} />;
    }

    if (error) {
        return (
            <div className="bg-beige min-h-screen">
                <Navbar />
                <p className="text-center text-red-500 mt-8">{error}</p>
            </div>
        );
    }

    return (
        <div className="bg-beige min-h-screen">
            <Navbar />
            <div className="p-8">
                <h1 className="text-3xl font-playfair text-green-900 mb-6 text-center">
                    Mon abonnement
                </h1>
                {status && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Informations sur l'abonnement */}
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h2 className="text-xl font-playfair text-green-900 mb-4">
                                Informations générales
                            </h2>
                            <p className="text-green-700 mb-2">
                                Type : <strong>{status.type}</strong>
                            </p>
                            <p className="text-green-700 mb-2">
                                Début :{" "}
                                <strong>{new Date(status.dateDebut).toLocaleDateString()}</strong>
                            </p>
                            <p className="text-green-700 mb-2">
                                Fin : <strong>{new Date(status.dateFin).toLocaleDateString()}</strong>
                            </p>
                        </div>

                        {/* Renouvellement automatique */}
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h2 className="text-xl font-playfair text-green-900 mb-4">
                                Renouvellement automatique
                            </h2>
                            <p className="text-green-700 mb-4">
                                Statut :{" "}
                                <span
                                    className={`font-bold ${
                                        autoRenew ? "text-green-500" : "text-red-500"
                                    }`}
                                >
                                    {autoRenew ? "Activé" : "Désactivé"}
                                </span>
                            </p>
                            <button
                                onClick={handleToggleAutoRenew}
                                className="bg-green-900 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition w-full"
                            >
                                {autoRenew ? "Désactiver" : "Activer"} le renouvellement
                            </button>
                        </div>

                        {/* Renouvellement manuel */}
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h2 className="text-xl font-playfair text-green-900 mb-4">
                                Renouveler l'abonnement
                            </h2>
                            <button
                                onClick={handleRenewSubscription}
                                disabled={renewLoading}
                                className="bg-green-900 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition w-full"
                            >
                                {renewLoading
                                    ? "Renouvellement en cours..."
                                    : "Renouveler pour 3 mois"}
                            </button>
                        </div>

                        {/* Annulation de l'abonnement */}
                        <div className="bg-white shadow-md rounded-lg p-6 col-span-full lg:col-span-1">
                            <h2 className="text-xl font-playfair text-green-900 mb-4">
                                Annulation de l'abonnement
                            </h2>
                            {status.status === "Annulation planifiée" ? (
                                <p className="text-red-500 font-bold">
                                    Annulation prévue pour le{" "}
                                    {new Date(status.dateFin).toLocaleDateString()}.
                                </p>
                            ) : (
                                <button
                                    onClick={() => setShowCancelModal(true)}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition w-full"
                                >
                                    Annuler l'abonnement
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal de confirmation */}
            {showCancelModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                        <h2 className="text-2xl font-semibold mb-4 text-green-900">Confirmation</h2>
                        <p className="text-lg mb-6">
                            Êtes-vous sûr de vouloir annuler votre abonnement ?
                        </p>
                        <div className="flex justify-around">
                            <button
                                onClick={handleCancelSubscription}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-500 transition"
                            >
                                Oui, annuler
                            </button>
                            <button
                                onClick={() => setShowCancelModal(false)}
                                className="bg-gray-200 text-green-900 px-4 py-2 rounded-lg font-bold hover:bg-gray-300 transition"
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Abonnement;
