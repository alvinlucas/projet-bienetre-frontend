import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Inscription
export const registerUser = async (data) => {
  return api.post("/users/inscription", data);
};

// Connexion
export const loginUser = async (data) => {
  return api.post("/users/connexion", data);
};

// Récupérer toutes les vidéos actives
export const getActiveVideos = async () => {
  return api.get("/videos/active");
};

// Ajouter une nouvelle vidéo (Admin uniquement)
export const addVideo = async (data, token) => {
  return api.post("/videos/add", data, {
    headers: {
      Authorization: `Bearer ${token}`, // Envoi du token admin
    },
  });
};

// Récupérer une vidéo spécifique par ID
export const getVideo = async (id) => {
  return api.get(`/videos/${id}`);
};

// Récupérer le statut d'un abonnement
export const checkSubscriptionStatus = async (email) => {
  return api.get(`/subscriptions/status/${email}`);
};

// Créer un abonnement
export const createSubscription = async (data) => {
  return api.post("/subscriptions/create", data);
};

// Annuler un abonnement
export const cancelSubscription = async (email) => {
  return api.post("/subscriptions/cancel", { email });
};

// Renouveler un abonnement
export const renewSubscription = async (data) => {
  return api.post("/subscriptions/renew", data);
};

// Activer/désactiver le renouvellement automatique
export const toggleAutoRenew = async (data) => {
  return api.post("/subscriptions/autoRenew", data);
};
