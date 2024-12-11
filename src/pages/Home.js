import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import photoYoga from "../assets/photo-yoga-footer.jpg";

const Home = () => {
    return (
        <div className="bg-beige text-green-900">
            <header className="w-full flex justify-center pt-4 bg-beige">
                <img
                    src={logo}
                    alt="Logo Bien-être"
                    className="h-36 w-auto"
                />
            </header>

            {/* Contenu principal */}
            <main className="flex flex-col justify-center items-center text-center h-[70vh]"> {/* Réduction de la hauteur */}
                <h1 className="text-5xl font-playfair mb-3">Bienvenue sur Respirer Son Bien-Être</h1>
                <p className="text-lg font-poppins mb-6 max-w-xl">
                    Améliorez votre sérénité et bien-être avec nos cours hebdomadaires en ligne, conçus pour s'adapter à
                    votre rythme.
                </p>
                <p className="text-md font-poppins mb-5 text-green-700 italic">
                    "Prenez une pause, inspirez et vivez pleinement l'instant présent."
                </p>
                <div className="space-x-4">
                    <Link
                        to="/signup"
                        className="bg-green-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 shadow-lg"
                    >
                        S'inscrire
                    </Link>
                    <Link
                        to="/login"
                        className="border border-green-900 text-green-900 px-8 py-3 rounded-lg font-bold hover:bg-green-900 hover:text-white shadow-lg"
                    >
                        Se connecter
                    </Link>
                </div>
            </main>

            {/* Section Points Forts */}
            <section className="py-16 px-6">
                <h2 className="text-4xl font-playfair text-center mb-12">Nos Points Forts</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="text-center bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-2xl font-poppins mb-4">Cours Accessibles</h3>
                        <p>Des cours hebdomadaires accessibles en ligne depuis n'importe quel appareil.</p>
                    </div>
                    <div className="text-center bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-2xl font-poppins mb-4">Flexibilité</h3>
                        <p>Pratiquez où vous voulez, quand vous voulez, selon votre emploi du temps.</p>
                    </div>
                    <div className="text-center bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-2xl font-poppins mb-4">Accompagnement</h3>
                        <p>Profitez d'un suivi personnalisé pour améliorer votre bien-être au quotidien.</p>
                    </div>
                </div>
            </section>

            {/* Section Explicative */}
            <section className="py-16 px-6 bg-green-900 text-white">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-playfair mb-6">Rejoignez Notre Communauté</h2>
                        <p className="text-lg font-poppins mb-4">
                            Inscrivez-vous en ligne, choisissez votre abonnement, et accédez à nos cours hebdomadaires
                            exclusifs.
                            Pratiquez selon votre emploi du temps et à votre rythme.
                        </p>
                        <Link
                            to="/subscribe"
                            className="bg-yellow-500 text-green-900 px-8 py-4 rounded-lg font-bold hover:bg-yellow-600 hover:text-white shadow-lg text-lg inline-block"
                        >
                            Découvrir les Abonnements
                        </Link>
                    </div>
                    <img
                        src={photoYoga}
                        alt="Yoga Session"
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </section>


            {/* Footer */}
            <footer className="bg-beige text-center py-2">
                <p className="text-sm font-poppins text-green-900">
                    © {new Date().getFullYear()} Respirer Son Bien-Être. Tous droits réservés.
                </p>
            </footer>
        </div>
    );
};

export default Home;
