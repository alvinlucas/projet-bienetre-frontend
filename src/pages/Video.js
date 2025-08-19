import React, { useState, useEffect, useContext } from "react";
import { getActiveVideos, addVideo } from "../services/api";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/UserContext";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newVideo, setNewVideo] = useState({
    titre: "",
    description: "",
    url: "",
    datePublication: "",
  });
  const { user, token } = useContext(UserContext);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await getActiveVideos();
        setVideos(response.data.videos);
      } catch (err) {
        setError("Erreur lors de la récupération des vidéos.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleAddVideo = async () => {
    if (
      !newVideo.titre ||
      !newVideo.description ||
      !newVideo.url ||
      !newVideo.datePublication
    ) {
      setError("Tous les champs sont obligatoires !");
      return;
    }

    try {
      await addVideo(
        {
          titre: newVideo.titre,
          description: newVideo.description,
          url: newVideo.url,
          datePublication: newVideo.datePublication,
        },
        token,
      );
      setShowModal(false);
      setNewVideo({ titre: "", description: "", url: "", datePublication: "" });
      setVideos((prev) => [...prev, newVideo]); // Mettez à jour localement les vidéos
    } catch (err) {
      setError(
        err.response?.data?.message || "Erreur lors de l'ajout de la vidéo.",
      );
    }
  };

  const getYouTubeEmbedURL = (url) => {
    const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
    return `https://www.youtube.com/embed/${videoId}`;
  };

  if (loading) {
    return (
      <div className="bg-beige min-h-screen">
        <Navbar />
        <p className="text-center mt-8 text-green-900">
          Chargement des vidéos...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-beige min-h-screen">
        <Navbar />
        <p className="text-center mt-8 text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-beige min-h-screen">
      <Navbar />
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-playfair text-green-900 mx-auto">
            Mes Vidéos
          </h1>
          {user?.isAdmin && (
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-900 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition absolute right-8"
            >
              Ajouter une vidéo
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:scale-105"
            >
              <div className="relative">
                <iframe
                  width="100%"
                  height="200"
                  src={getYouTubeEmbedURL(video.url)}
                  title={video.titre}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-t-lg"
                ></iframe>
                <div className="absolute top-0 left-0 right-0 bg-green-900 bg-opacity-70 text-white text-lg font-semibold py-2 text-center">
                  {video.titre}
                </div>
              </div>
              <div className="p-6">
                <p className="text-green-700 font-poppins mb-4">
                  {video.description}
                </p>
                <p className="text-sm text-green-500">
                  {(() => {
                    const now = new Date();
                    const expirationDate = new Date(video.dateExpiration);
                    const diffTime = Math.ceil(
                      (expirationDate - now) / (1000 * 60 * 60 * 24),
                    );

                    return (
                      <>
                        Expire dans :{" "}
                        <span className="font-semibold">
                          {diffTime} jour{diffTime > 1 ? "s" : ""}
                        </span>
                      </>
                    );
                  })()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal d'ajout de vidéo */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4 text-green-900">
              Ajouter une Vidéo
            </h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form>
              <div className="mb-4">
                <label className="block text-lg font-semibold text-green-900">
                  Titre
                </label>
                <input
                  type="text"
                  value={newVideo.titre}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, titre: e.target.value })
                  }
                  className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-semibold text-green-900">
                  Description
                </label>
                <textarea
                  value={newVideo.description}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, description: e.target.value })
                  }
                  className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-semibold text-green-900">
                  URL
                </label>
                <input
                  type="text"
                  value={newVideo.url}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, url: e.target.value })
                  }
                  className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-semibold text-green-900">
                  Date de Publication
                </label>
                <input
                  type="date"
                  value={newVideo.datePublication}
                  onChange={(e) =>
                    setNewVideo({
                      ...newVideo,
                      datePublication: e.target.value,
                    })
                  }
                  className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-500"
                />
              </div>
            </form>
            <div className="flex justify-between mt-6">
              <button
                onClick={handleAddVideo}
                className="bg-green-900 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition w-1/2 mr-2"
              >
                Ajouter
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition w-1/2"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videos;
