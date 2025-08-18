🌿 Frontend – Projet Bien-Être  
Ce dépôt contient le frontend du projet Bien-Être, une plateforme de cours de yoga en ligne. Les utilisateurs peuvent s’inscrire, s’abonner via Stripe et visionner des vidéos. Les administrateurs peuvent ajouter du contenu.

---

📁 Sommaire  
📦 Installation locale  
⚙️ Configuration (.env)  
🚀 Lancement du projet  
📚 Documentation  
🛠 Technologies  
📜 Licence  

---

📦 Installation locale  
Clone ce dépôt :

```bash
git clone https://github.com/alvinlucas/projet-bienetre-frontend.git
cd projet-bienetre-frontend
npm install
```

---

⚙️ Configuration (.env)  
Crée un fichier `.env` à la racine du projet avec les variables suivantes :

```
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxxxxxxx
PORT=4000
```

> Ne versionne jamais ce fichier : il contient des données sensibles.

---

🚀 Lancement du projet  
```bash
npm start
```

L’application sera accessible sur `http://localhost:4000`.

---

📚 Documentation  
📄 Tous les fichiers de documentation se trouvent dans le dossier [`/documentation`](./documentation) :

- [`📘 cahier_recettes.md`](./documentation/cahier_recettes.md) — Scénarios de tests + résultats attendus.
- [`📘 manuel_deploiement.md`](./documentation/manuel_deploiement.md) — Instructions d'installation & déploiement.
- [`📘 manuel_utilisation.md`](./documentation/manuel_utilisation.md) — Pages, rôles, navigation.
- [`📘 manuel_mise_a_jour.md`](./documentation/manuel_mise_a_jour.md) — Mise à jour et redéploiement.
- [`📘 accessibilite.md`](./documentation/accessibilite.md) — Bonnes pratiques d’accessibilité.
- [`📘 version.md`](./documentation/version.md) — Historique des versions.

---

🛠 Technologies  
- React 18  
- TailwindCSS  
- Stripe.js  
- Axios  
- React Router  
- GitHub Actions + Render (déploiement)

---

📜 Licence  
Projet réalisé dans le cadre de la certification RNCP39583 – Bloc 2 : Développement d’applications frontend.
