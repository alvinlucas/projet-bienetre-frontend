import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import '@testing-library/jest-dom';


const renderWithProviders = (ui) => {
    return render(
        <UserContext.Provider value={{ logout: jest.fn() }}>
            <BrowserRouter>{ui}</BrowserRouter>
        </UserContext.Provider>
    );
};

describe('Navbar', () => {
    test('affiche le logo et les liens principaux', () => {
        renderWithProviders(<Navbar />);

        expect(screen.getByAltText('Logo Bien-être')).toBeInTheDocument();
        expect(screen.getByText('Mes vidéos')).toBeInTheDocument();
        expect(screen.getByText('Mon abonnement')).toBeInTheDocument();
        expect(screen.getByText('Mes infos')).toBeInTheDocument();
        expect(screen.getByText('Déconnexion')).toBeInTheDocument();
    });

    test('ouvre la modale de déconnexion au clic', () => {
        renderWithProviders(<Navbar />);

        fireEvent.click(screen.getByText('Déconnexion'));

        expect(
            screen.getByText('Êtes-vous sûr de vouloir vous déconnecter ?')
        ).toBeInTheDocument();
    });

    test('ferme la modale quand on clique sur "Annuler"', () => {
        renderWithProviders(<Navbar />);

        fireEvent.click(screen.getByText('Déconnexion'));
        const boutonAnnuler = screen.getByText('Annuler');

        fireEvent.click(boutonAnnuler);

        expect(
            screen.queryByText('Êtes-vous sûr de vouloir vous déconnecter ?')
        ).not.toBeInTheDocument();
    });
});
