# 🧾 Journal de Versions – Frontend

## ✅ v0.1.0 – Base du projet

- Initialisation du projet React
- Intégration de TailwindCSS
- Mise en place du routing avec React Router
- Page d’accueil (`/`) affichée

---

## ✅ v0.2.0 – Authentification utilisateur

- Ajout des pages `Login` (`/login`) et `Signup` (`/signup`)
- Formulaires de connexion/inscription fonctionnels
- Intégration du `UserContext` pour stocker les données utilisateur
- Redirection vers `/dashboard` après connexion
- Gestion de l'état connecté/déconnecté

---

## ✅ v0.3.0 – Tableau de bord & vidéos utilisateur

- Création du composant `Dashboard`
- Affichage des vidéos actives d’un utilisateur connecté
- Intégration du service `getActiveVideos` depuis l’API backend
- Mise en place de l’iframe YouTube avec calcul de l’expiration
- Ajout de styles responsive et cohérents avec la charte graphique

---

## ✅ v0.4.0 – Paiement avec Stripe

- Intégration de Stripe avec `@stripe/react-stripe-js`
- Création du composant `Subscribe` avec modal de paiement
- Validation du paiement + fermeture modale
- Route `/subscribe` ajoutée dans le routing
- Gestion des erreurs ou du succès

---

## ✅ v0.5.0 – Gestion admin des vidéos

- Affichage conditionnel d’un bouton “Ajouter une vidéo” si `user.isAdmin === true`
- Formulaire modal pour ajouter une nouvelle vidéo
- Envoi sécurisé (token JWT dans les headers)
- Mise à jour en temps réel de la liste après ajout

---

## ✅ v1.0.0 – Version stable déployée

- Déploiement via GitHub Actions + Render
- Configuration des variables d’environnement (`REACT_APP_API_URL`, `REACT_APP_STRIPE_PUBLIC_KEY`)
- Tests manuels sur navigation, sécurité, accessibilité
- Optimisation légère du design mobile
- Logiciel fonctionnel et manipulable par un utilisateur autonome