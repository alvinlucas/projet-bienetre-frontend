import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const { user } = useContext(UserContext);

    return (
        <div className="bg-beige min-h-screen">
            {/* Navbar */}
            <Navbar />

            {/* Contenu principal */}
            <main className="py-12 px-6">
                <h2 className="text-4xl font-playfair text-center text-green-900 mb-8">
                    Bienvenue <b>{user?.prenom || ""}</b> sur votre tableau de bord
                </h2>
                <p className="text-center text-lg font-poppins text-green-900 max-w-3xl mx-auto mb-12">
                    Ici, vous pouvez gérer vos vidéos, consulter vos abonnements et mettre à jour vos informations personnelles.
                </p>

                {/* Sections fonctionnelles */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <Link
                        to="/videos"
                        className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl hover:bg-green-50 transition transform hover:-translate-y-1"
                    >
                        <h3 className="text-2xl font-playfair text-green-900 mb-4">
                            Mes vidéos
                        </h3>
                        <p className="text-green-700 font-poppins">
                            Consultez et regardez vos vidéos exclusives.
                        </p>
                    </Link>
                    <Link
                        to="/abonnement"
                        className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl hover:bg-green-50 transition transform hover:-translate-y-1"
                    >
                        <h3 className="text-2xl font-playfair text-green-900 mb-4">
                            Mon abonnement
                        </h3>
                        <p className="text-green-700 font-poppins">
                            Gérez votre abonnement et consultez votre statut.
                        </p>
                    </Link>
                    <Link
                        to="/infos"
                        className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl hover:bg-green-50 transition transform hover:-translate-y-1"
                    >
                        <h3 className="text-2xl font-playfair text-green-900 mb-4">
                            Mes infos
                        </h3>
                        <p className="text-green-700 font-poppins">
                            Mettez à jour vos informations personnelles.
                        </p>
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
