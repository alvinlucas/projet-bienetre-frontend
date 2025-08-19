import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import Navbar from "../components/Navbar";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Subscribe = ({ user }) => {
  const [showModal, setShowModal] = useState(false);

  const handlePaymentSuccess = () => {
    alert("Paiement réussi !");
    setShowModal(false);
  };

  return (
    <div className="bg-beige min-h-screen">
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-playfair text-green-900 mb-6 text-center">
          Abonnez-vous dès maintenant
        </h1>
        <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-playfair text-green-900 mb-4">
            Offre Trimestrielle
          </h2>
          <p className="text-lg text-green-700 mb-4">
            Profitez de <strong>3 mois</strong> d'accès à nos vidéos exclusives
            pour seulement <strong>29,99€</strong>.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-900 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition w-full"
          >
            S'abonner maintenant
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-playfair text-green-900 mb-4">
              Paiement sécurisé
            </h2>
            <Elements stripe={stripePromise}>
              <PaymentForm user={user} onSuccess={handlePaymentSuccess} />
            </Elements>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-gray-200 text-green-900 px-4 py-2 rounded-lg hover:bg-gray-300 transition w-full"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscribe;
