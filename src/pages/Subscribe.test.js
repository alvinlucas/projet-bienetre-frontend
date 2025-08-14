import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Subscribe from "./Subscribe";
import * as stripeJs from "@stripe/react-stripe-js";
import * as stripeLoader from "@stripe/stripe-js";

// Mock de PaymentForm
jest.mock("./PaymentForm", () => ({ user, onSuccess }) => (
    <div data-testid="payment-form">Formulaire de paiement</div>
));

// Mock de Navbar
jest.mock("../components/Navbar", () => () => <div data-testid="navbar">Navbar</div>);

// Mock de Elements de Stripe
jest.mock("@stripe/react-stripe-js", () => {
    const original = jest.requireActual("@stripe/react-stripe-js");
    return {
        ...original,
        Elements: ({ children }) => <div data-testid="stripe-elements">{children}</div>,
    };
});

// Mock de loadStripe
jest.mock("@stripe/stripe-js", () => ({
    loadStripe: jest.fn(() => Promise.resolve("mock-stripe")),
}));

describe("Subscribe", () => {
    test("affiche correctement le contenu initial", () => {
        render(<Subscribe user={{ email: "test@example.com" }} />);

        expect(screen.getByTestId("navbar")).toBeInTheDocument();
        expect(
            screen.getByText(/Abonnez-vous dès maintenant/i)
        ).toBeInTheDocument();
        expect(screen.getByText(/S'abonner maintenant/i)).toBeInTheDocument();
    });

    test("ouvre la modale au clic sur 'S'abonner maintenant'", async () => {
        render(<Subscribe user={{ email: "test@example.com" }} />);

        fireEvent.click(screen.getByText(/S'abonner maintenant/i));

        expect(screen.getByTestId("payment-form")).toBeInTheDocument();
        expect(screen.getByText(/Annuler/i)).toBeInTheDocument();
    });

    test("ferme la modale au clic sur le bouton 'Annuler'", () => {
        render(<Subscribe user={{ email: "test@example.com" }} />);

        fireEvent.click(screen.getByText(/S'abonner maintenant/i));

        const cancelButton = screen.getByText(/Annuler/i);
        fireEvent.click(cancelButton);

        expect(screen.queryByTestId("payment-form")).not.toBeInTheDocument();
    });
});
