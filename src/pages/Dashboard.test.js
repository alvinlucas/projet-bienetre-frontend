import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import { UserContext } from "../context/UserContext";
import "@testing-library/jest-dom";

jest.mock("../components/Navbar", () => () => <div data-testid="navbar" />);

describe("Dashboard", () => {
  const utilisateurMock = {
    prenom: "Alice",
  };

  const renderDashboard = (user = utilisateurMock) => {
    return render(
      <UserContext.Provider value={{ user }}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </UserContext.Provider>,
    );
  };

  test("affiche le prénom de l'utilisateur", () => {
    renderDashboard();

    expect(screen.getByText(/Bienvenue/i)).toHaveTextContent("Bienvenue Alice");
  });

  test("affiche la navbar", () => {
    renderDashboard();

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });

  test("affiche les 3 liens du tableau de bord", () => {
    renderDashboard();

    expect(
      screen.getByRole("link", { name: /Mes vidéos/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Mon abonnement/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Mes infos/i }),
    ).toBeInTheDocument();
  });

  test("chaque lien pointe vers la bonne route", () => {
    renderDashboard();

    expect(screen.getByRole("link", { name: /Mes vidéos/i })).toHaveAttribute(
      "href",
      "/videos",
    );
    expect(
      screen.getByRole("link", { name: /Mon abonnement/i }),
    ).toHaveAttribute("href", "/abonnement");
    expect(screen.getByRole("link", { name: /Mes infos/i })).toHaveAttribute(
      "href",
      "/infos",
    );
  });

  test("affiche le texte d'introduction", () => {
    renderDashboard();

    expect(
      screen.getByText(/vous pouvez gérer vos vidéos/i),
    ).toBeInTheDocument();
  });
});
