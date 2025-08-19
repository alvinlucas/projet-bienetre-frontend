
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Abonnement from "../pages/Abonnement";
import { UserContext } from "../context/UserContext";
import * as api from "../services/api";
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom';


jest.mock("../components/Navbar", () => () => <div data-testid="navbar" />);
jest.mock("../pages/Subscribe", () => () => <div data-testid="subscribe" />);

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe("Abonnement", () => {
    const email = "test@example.com";
    const user = { email };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("redirige vers /login si user est undefined", () => {
        render(
            <UserContext.Provider value={{ user: undefined }}>
                <MemoryRouter>
                    <Abonnement />
                </MemoryRouter>
            </UserContext.Provider>
        );
        expect(mockNavigate).toHaveBeenCalledWith("/login");
    });

    test("affiche 'Chargement...' si user est null", () => {
        render(
            <UserContext.Provider value={{ user: null }}>
                <MemoryRouter>
                    <Abonnement />
                </MemoryRouter>
            </UserContext.Provider>
        );
        expect(screen.getByText("Chargement...")).toBeInTheDocument();
    });

    test("affiche la page Subscribe si aucun statut", async () => {
        jest.spyOn(api, "checkSubscriptionStatus").mockResolvedValueOnce({ data: null });

        render(
            <UserContext.Provider value={{ user }}>
                <MemoryRouter>
                    <Abonnement />
                </MemoryRouter>
            </UserContext.Provider>
        );

        await waitFor(() => {
            expect(screen.getByTestId("subscribe")).toBeInTheDocument();
        });
    });

    test("affiche une erreur si l'API échoue", async () => {
        jest.spyOn(api, "checkSubscriptionStatus").mockRejectedValueOnce(new Error("Erreur API"));

        render(
            <UserContext.Provider value={{ user }}>
                <MemoryRouter>
                    <Abonnement />
                </MemoryRouter>
            </UserContext.Provider>
        );

        await waitFor(() => {
            expect(screen.queryByTestId("subscribe")).not.toBeInTheDocument();
        });

    });


    test("affiche les informations de l'abonnement", async () => {
        jest.spyOn(api, "checkSubscriptionStatus").mockResolvedValueOnce({
            data: {
                type: "trimestriel",
                dateDebut: new Date("2025-01-01").toISOString(),
                dateFin: new Date("2025-03-31").toISOString(),
                autoRenew: true,
                status: "Actif",
            },
        });

        render(
            <UserContext.Provider value={{ user }}>
                <MemoryRouter>
                    <Abonnement />
                </MemoryRouter>
            </UserContext.Provider>
        );

        await waitFor(() => {
            expect(screen.getByText(/Type/i)).toBeInTheDocument();
            expect(screen.getByText(/trimestriel/i)).toBeInTheDocument();
            expect(screen.getByText(/Renouveler pour 3 mois/i)).toBeInTheDocument();
        });
    });
});
