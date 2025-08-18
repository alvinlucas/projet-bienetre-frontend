
# 🛠️ Manuel de Mise à Jour – Frontend

Ce document explique comment maintenir à jour le frontend de l’application (React) en local et en production.

---

## 🔁 1. Mise à jour du code source

Avant toute manipulation, assure-toi d’être sur la bonne branche (`main` par défaut) :

```bash
git checkout main
git pull origin main
```

> 💡 Cela permet de récupérer les dernières modifications du projet.

---

## 📦 2. Mise à jour des dépendances

### 🔍 Vérification des paquets obsolètes

Pour identifier les dépendances obsolètes :

```bash
npm outdated
```

Cela affichera :
- La version actuelle installée.
- La version souhaitée (compatible).
- La dernière version disponible.

### ⬆️ Mise à jour automatique

Pour effectuer une mise à jour rapide des dépendances compatibles :

```bash
npm update
```

### 🧪 Recommandation (optionnel)

Pour tester manuellement chaque mise à jour :

```bash
npm install nom_du_package@latest
```

---

## 🧱 3. Vérification du bon fonctionnement

Avant tout commit, il est essentiel de tester :

```bash
npm start
```

> 🔍 Vérifie l'affichage général, l’accès aux pages (`/login`, `/dashboard`, `/subscribe`, etc.), et le bon fonctionnement des appels à l’API.

---

## 🛠️ 4. Build de production

Avant de pousser en production, fais un test de build :

```bash
npm run build
```

> ✅ Le dossier `build/` doit être généré sans erreur.

---

## 🚀 5. Déploiement via GitHub Actions + Render

### Étapes :

1. **Valider les changements :**

```bash
git add .
git commit -m "feat: mise à jour du frontend"
```

2. **Pousser vers GitHub :**

```bash
git push origin main
```

3. **Render déclenche automatiquement le déploiement.**

---

## ✅ Vérification post-déploiement

- Aller sur l’URL Render du frontend.
- Tester les pages principales.
- Vérifier que les appels API pointent bien vers l’URL du backend Render (`REACT_APP_API_URL` est correctement configurée en production).
