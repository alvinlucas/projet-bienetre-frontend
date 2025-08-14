import React from "react";
import { render, screen, act } from "@testing-library/react";
import { UserContext, UserProvider } from "./UserContext";
import '@testing-library/jest-dom';


const TestComponent = () => {
    const { user, token, login, logout } = React.useContext(UserContext);
    return (
        <div>
            <p data-testid="user">{user ? user.email : "no-user"}</p>
            <p data-testid="token">{token || "no-token"}</p>
            <button onClick={() => login({ email: "test@example.com" }, "jwt123")}>
                Login
            </button>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

describe("UserContext", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test("valeurs initiales : user et token null", () => {
        render(
            <UserProvider>
                <TestComponent />
            </UserProvider>
        );
        expect(screen.getByTestId("user")).toHaveTextContent("no-user");
        expect(screen.getByTestId("token")).toHaveTextContent("no-token");
    });

    test("login met à jour user, token et localStorage", () => {
        render(
            <UserProvider>
                <TestComponent />
            </UserProvider>
        );
        act(() => {
            screen.getByText("Login").click();
        });
        expect(screen.getByTestId("user")).toHaveTextContent("test@example.com");
        expect(screen.getByTestId("token")).toHaveTextContent("jwt123");
        expect(localStorage.getItem("token")).toBe("jwt123");
        expect(JSON.parse(localStorage.getItem("user")).email).toBe("test@example.com");
    });

    test("logout réinitialise user, token et localStorage", () => {
        localStorage.setItem("token", "jwt123");
        localStorage.setItem("user", JSON.stringify({ email: "test@example.com" }));

        render(
            <UserProvider>
                <TestComponent />
            </UserProvider>
        );

        act(() => {
            screen.getByText("Logout").click();
        });

        expect(screen.getByTestId("user")).toHaveTextContent("no-user");
        expect(screen.getByTestId("token")).toHaveTextContent("no-token");
        expect(localStorage.getItem("token")).toBe(null);
        expect(localStorage.getItem("user")).toBe(null);
    });

    test("lecture correcte du localStorage au démarrage", () => {
        localStorage.setItem("token", "savedToken");
        localStorage.setItem("user", JSON.stringify({ email: "saved@example.com" }));

        render(
            <UserProvider>
                <TestComponent />
            </UserProvider>
        );

        expect(screen.getByTestId("user")).toHaveTextContent("saved@example.com");
        expect(screen.getByTestId("token")).toHaveTextContent("savedToken");
    });

    test("gestion d'une erreur JSON.parse dans useEffect", () => {
        localStorage.setItem("user", "INVALID_JSON");
        localStorage.setItem("token", "token123");

        render(
            <UserProvider>
                <TestComponent />
            </UserProvider>
        );

        expect(screen.getByTestId("user")).toHaveTextContent("no-user");
        expect(screen.getByTestId("token")).toHaveTextContent("no-token");
    });
});
