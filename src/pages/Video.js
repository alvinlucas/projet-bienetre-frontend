import React, { useState, useEffect, useContext } from "react";
import { getActiveVideos } from "../services/api";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/UserContext";

const Videos = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(UserContext); // Récupérer les infos utilisateur depuis le contexte

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

    const getYouTubeEmbedURL = (url) => {
        const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
        return `https://www.youtube.com/embed/${videoId}`;
    };

    const isVideoVisible = (video) => {
        const now = new Date();
        const dateExpiration = new Date(video.dateExpiration);
        const dateFinAbonnement = user?.dateFinAbonnement ? new Date(user.dateFinAbonnement) : null;

        return (
            dateExpiration > now ||
            (dateFinAbonnement && dateExpiration <= dateFinAbonnement)
        );
    };

    if (loading) {
        return (
            <div className="bg-beige min-h-screen">
                <Navbar />
                <p className="text-center mt-8 text-green-900">Chargement des vidéos...</p>
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

    if (videos.length === 0) {
        return (
            <div className="bg-beige min-h-screen">
                <Navbar />
                <p className="text-center mt-8 text-green-900">Aucune vidéo disponible pour le moment.</p>
            </div>
        );
    }

    return (
        <div className="bg-beige min-h-screen">
            <Navbar />
            <div className="p-8">
                <h1 className="text-3xl font-playfair text-green-900 mb-6 text-center">Mes Vidéos</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {videos
                        .filter(isVideoVisible) // Filtrer les vidéos visibles uniquement
                        .map((video) => (
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
                                    <p className="text-green-700 font-poppins mb-4">{video.description}</p>
                                    <p className="text-sm text-green-500">
                                        Expire le :{" "}
                                        <span className="font-semibold">{video.dateExpiration}</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Videos;
