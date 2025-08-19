# Manuel d’Utilisation – Frontend

## Accès Utilisateur

### 1. Création de Compte

- Accéder à `/signup`
- Remplir le formulaire (email, mot de passe)
- Soumettre pour créer le compte
- Redirection vers `/dashboard` ou `/login`

### 2. Connexion

- Accéder à `/login`
- Entrer les identifiants
- Redirection vers le tableau de bord (`/dashboard`) en cas de succès

### 3. Abonnement via Stripe

- Accéder à `/subscribe`
- Cliquer sur “S’abonner maintenant”
- Entrer les informations de carte dans la modale Stripe
- En cas de succès : paiement validé + fermeture de la modale
- En cas d’échec : message d’erreur affiché

### 4. Accès aux Vidéos

- Depuis `/dashboard`, l’utilisateur voit ses vidéos actives
- Les vidéos sont affichées sous forme de cartes avec titre, description et date d’expiration

## Accès Administrateur

### 1. Ajout de Vidéo

- Un admin voit un bouton “Ajouter une vidéo” dans `/dashboard`
- Formulaire de création (titre, description, URL, date de publication)
- Vidéo ajoutée automatiquement après validation

### 2. Gestion des vidéos expirées

- Les vidéos expirées sont soit masquées, soit marquées comme “expirées”

## Navigation – Routes principales

| Route        | Description                         |
| ------------ | ----------------------------------- |
| `/`          | Page d’accueil                      |
| `/login`     | Page de connexion                   |
| `/signup`    | Page d’inscription                  |
| `/dashboard` | Tableau de bord avec vidéos actives |
| `/subscribe` | Abonnement avec paiement Stripe     |
