import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* Barre de navigation */}
      <nav className="bg-green-900 shadow-lg flex justify-between items-center px-8 py-4 text-white sticky top-0 z-50">
        {/* Logo et titre */}
        <div className="flex items-center space-x-4">
          <img
            src={logo}
            alt="Logo Bien-être"
            className="h-12 w-auto transition transform hover:scale-110 duration-300"
          />
          <h1 className="text-2xl font-playfair text-white hidden sm:block tracking-widest">
            Bien-être
          </h1>
        </div>

        {/* Liens de navigation */}
        <ul className="flex space-x-8 font-semibold text-lg">
          <li>
            <Link
              to="/videos"
              className="hover:text-beige transition duration-300 hover:underline underline-offset-4"
            >
              Mes vidéos
            </Link>
          </li>
          <li>
            <Link
              to="/abonnement"
              className="hover:text-beige transition duration-300 hover:underline underline-offset-4"
            >
              Mon abonnement
            </Link>
          </li>
          <li>
            <Link
              to="/infos"
              className="hover:text-beige transition duration-300 hover:underline underline-offset-4"
            >
              Mes infos
            </Link>
          </li>
        </ul>

        {/* Bouton déconnexion */}
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 shadow-md transition duration-300"
        >
          <FaSignOutAlt className="mr-2 text-xl" />
          Déconnexion
        </button>
      </nav>

      {/* Modal de confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center animate-fadeIn">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-96 text-center animate-fadeIn">
            <h2 className="text-2xl font-semibold mb-4 text-green-900">
              Confirmation
            </h2>
            <p className="text-lg mb-6 text-gray-800">
              Êtes-vous sûr de vouloir vous déconnecter ?
            </p>
            <div className="flex justify-between items-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-500 shadow-md transition duration-300 w-full"
              >
                Oui, se déconnecter
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-200 text-green-900 px-6 py-2 rounded-lg font-bold hover:bg-gray-300 shadow-md transition duration-300 w-full"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
