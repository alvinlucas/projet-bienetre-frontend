import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import PaymentForm from "../pages/PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { createSubscription } from "../services/api";
import { loadStripe } from "@stripe/stripe-js";

jest.mock("../services/api", () => ({
    createSubscription: jest.fn(),
}));

const mockStripe = {
    createPaymentMethod: jest.fn(),
};

const mockElements = {
    getElement: jest.fn(),
};

jest.mock("@stripe/react-stripe-js", () => ({
    ...jest.requireActual("@stripe/react-stripe-js"),
    useStripe: () => mockStripe,
    useElements: () => mockElements,
    CardElement: (props) => (
        <input
            data-testid="card-element"
            onChange={props.onChange}
            placeholder="Numéro de carte"
        />
    ),
}));

const user = { email: "test@example.com" };

const renderComponent = (onSuccess = jest.fn()) => {
    return render(
        <Elements stripe={loadStripe("pk_test_12345")}>
            <PaymentForm user={user} onSuccess={onSuccess} />
        </Elements>
    );
};

describe("PaymentForm", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockElements.getElement.mockReturnValue({});
    });


    test("affiche une erreur si stripe.createPaymentMethod échoue", async () => {
        mockStripe.createPaymentMethod.mockResolvedValueOnce({
            error: { message: "Carte invalide" },
        });

        renderComponent();

        fireEvent.submit(screen.getByRole("button"));

        await waitFor(() => {
            expect(screen.getByText(/Carte invalide/i)).toBeInTheDocument();
        });
    });

    test("affiche une erreur si createSubscription échoue", async () => {
        mockStripe.createPaymentMethod.mockResolvedValueOnce({
            paymentMethod: { id: "pm_test_123" },
        });
        createSubscription.mockResolvedValueOnce({ status: 400 });

        renderComponent();

        fireEvent.submit(screen.getByRole("button"));

        await waitFor(() => {
            expect(screen.getByText(/Erreur lors de la création/i)).toBeInTheDocument();
        });
    });

    test("appelle onSuccess si tout est OK", async () => {
        mockStripe.createPaymentMethod.mockResolvedValueOnce({
            paymentMethod: { id: "pm_test_123" },
        });
        createSubscription.mockResolvedValueOnce({ status: 200 });

        const onSuccess = jest.fn();
        renderComponent(onSuccess);

        fireEvent.submit(screen.getByRole("button"));

        await waitFor(() => {
            expect(onSuccess).toHaveBeenCalled();
        });
    });
});
