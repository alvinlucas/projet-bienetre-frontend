import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home";
import "@testing-library/jest-dom";

jest.mock("../assets/logo.png", () => "logo.png");
jest.mock("../assets/photo-yoga-footer.jpg", () => "photo-yoga-footer.jpg");

describe("Home", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
  });

  test("affiche le titre principal", () => {
    expect(
      screen.getByRole("heading", {
        name: /Bienvenue sur Respirer Son Bien-Être/i,
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  test("affiche le slogan", () => {
    expect(
      screen.getByText(
        /Prenez une pause, inspirez et vivez pleinement l'instant présent/i,
      ),
    ).toBeInTheDocument();
  });

  test("affiche le bouton 'S'inscrire'", () => {
    const signupLink = screen.getByRole("link", { name: /S'inscrire/i });
    expect(signupLink).toBeInTheDocument();
    expect(signupLink).toHaveAttribute("href", "/signup");
  });

  test("affiche le bouton 'Se connecter'", () => {
    const loginLink = screen.getByRole("link", { name: /Se connecter/i });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute("href", "/login");
  });

  test("affiche la section 'Nos Points Forts'", () => {
    expect(
      screen.getByRole("heading", { name: /Nos Points Forts/i }),
    ).toBeInTheDocument();

    expect(screen.getByText(/Cours Accessibles/i)).toBeInTheDocument();
    expect(screen.getByText(/Flexibilité/i)).toBeInTheDocument();
    expect(screen.getByText(/Accompagnement/i)).toBeInTheDocument();
  });

  test("affiche la section 'Rejoignez Notre Communauté'", () => {
    expect(
      screen.getByRole("heading", { name: /Rejoignez Notre Communauté/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Inscrivez-vous en ligne/i)).toBeInTheDocument();
  });

  test("affiche le lien vers les abonnements", () => {
    const subscribeLink = screen.getByRole("link", {
      name: /Découvrir les Abonnements/i,
    });
    expect(subscribeLink).toBeInTheDocument();
    expect(subscribeLink).toHaveAttribute("href", "/subscribe");
  });

  test("affiche le footer avec l'année actuelle", () => {
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(
        new RegExp(`© ${currentYear} Respirer Son Bien-Être`, "i"),
      ),
    ).toBeInTheDocument();
  });
});
