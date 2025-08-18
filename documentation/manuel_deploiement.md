# Manuel de Déploiement – Frontend

## Prérequis
- Node.js ≥ 18
- Compte Render.com
- GitHub (avec dépôt connecté)

---

## Lancer en local

```bash
git clone https://github.com/alvinlucas/projet-bienetre-frontend.git
cd projet-bienetre-frontend
npm install
```

Créer un fichier `.env` :
```
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_key
PORT=4000
```

Puis lancer :
```bash
npm start
```

---

## Déploiement sur Render

1. Connecter le dépôt GitHub à Render.
2. Configurer :
   - Build command : `npm install && npm run build`
   - Start command : `serve -s build`
   - Node version : `18`
   - Port : `4000`
3. Ajouter les variables d’environnement :
   - `REACT_APP_API_URL=https://ton-backend.onrender.com/api`
   - `REACT_APP_STRIPE_PUBLIC_KEY=...`
   - `PORT=4000`

4. Cliquer sur "Deploy".

