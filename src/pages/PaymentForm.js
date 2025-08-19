import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createSubscription } from "../services/api";

const PaymentForm = ({ user, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe n'est pas encore prêt. Veuillez réessayer.");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      setLoading(true);
      setError(null);

      const { paymentMethod, error: stripeError } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }

      const response = await createSubscription({
        email: user.email,
        paymentMethodId: paymentMethod.id,
      });

      if (response.status === 200) {
        onSuccess(); // Informer le parent que le paiement est réussi
      } else {
        setError("Erreur lors de la création de l'abonnement.");
      }
    } catch (err) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto"
    >
      <h2 className="text-xl font-playfair text-green-900 mb-4">
        Détails de paiement
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Carte bancaire</label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
          className="p-2 border rounded-md"
        />
      </div>
      <button
        type="submit"
        disabled={loading || !stripe}
        className="bg-green-900 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition w-full"
      >
        {loading ? "Paiement en cours..." : "Payer et s'abonner"}
      </button>
    </form>
  );
};

export default PaymentForm;
