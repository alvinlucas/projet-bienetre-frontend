# 📋 Cahier de Recettes – Frontend

Ce document présente les scénarios testés sur l’interface utilisateur du projet “Bien-Être”. Les tests ont été réalisés manuellement au fil du développement.

---

## ✅ Fonctionnalités Utilisateur

### 1. Inscription

- Accès à la page `/signup` depuis la barre de navigation.
- Saisie des informations requises (email, mot de passe).
- Envoi du formulaire → création du compte.
- Redirection automatique vers le dashboard après inscription.
- 🔎 Vérification : les champs sont bien obligatoires.

### 2. Connexion

- Accès à `/login`.
- Test d'une combinaison valide → accès au dashboard.
- Test d'une combinaison invalide → message d'erreur affiché.
- Le token d’authentification est bien stocké temporairement pour la session.

### 3. Abonnement (via Stripe)

- Depuis la page `/subscribe`, ouverture d'une modale de paiement.
- Entrée des infos de carte bancaire via Stripe.
- Test d’un paiement réussi → message de confirmation affiché.
- Test d’un paiement invalide → message d’erreur explicite.
- Vérification de la redirection et du retour au dashboard.

### 4. Accès aux vidéos

- Depuis `/dashboard`, affichage des vidéos actives (cartes).
- Affichage du titre, description et date d’expiration.
- Test sur la logique d’expiration automatique (vidéo masquée après 30 jours ou 3 vues).

### 5. Ajout de vidéo (admin uniquement)

- Une fois connecté avec un compte administrateur :
  - Le bouton “Ajouter une vidéo” est bien visible.
  - Saisie des champs : titre, description, lien YouTube, date.
  - Après validation → vidéo ajoutée à la liste active.
  - Vérification du bon affichage et de l’intégration du lien (iframe YouTube).

---

## 🧱 Tests Structurels

- L’interface est découpée en composants logiques : `Navbar`, `PaymentForm`, `Video`, `Abonnement`.
- Les pages sont bien séparées : `/login`, `/signup`, `/dashboard`, `/subscribe`.
- L’état global de l’utilisateur est géré via le contexte React (`UserContext`).
- Utilisation de React Router pour la navigation entre les vues.

---

## 🔐 Tests Sécurité

- ✅ Aucune clé API ou donnée sensible n’est visible dans le code source (tout passe par `.env`).
- ✅ L’URL du backend est injectée via une variable d’environnement (`REACT_APP_API_URL`).
- ✅ Les appels API protégés utilisent le header `Authorization` avec un `Bearer token`.
- ✅ L'utilisateur ne peut pas accéder aux fonctionnalités admin sans authentification valide.

---

## ♿ Tests Accessibilité

- Tous les champs de formulaire comportent des `label` associés.
- Contraste texte/fond respecté, validé avec l’outil Lighthouse.
- Comportement responsive validé sur desktop et mobile.
- Navigation clavier possible sur tous les boutons et formulaires.

---

## 🚀 Déploiement

- L'application frontend est déployée via **GitHub Actions** et **Render**.
- Test d'une mise à jour : push Git → déploiement automatique validé.
- Les variables d’environnement sont bien définies côté Render (`REACT_APP_API_URL`, `REACT_APP_STRIPE_PUBLIC_KEY`).
