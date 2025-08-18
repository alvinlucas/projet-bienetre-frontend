
# Accessibilité – Frontend

L’interface a été développée en tenant compte des bonnes pratiques d’accessibilité numérique, afin de permettre une navigation fluide et inclusive, notamment pour les utilisateurs ayant recours à des lecteurs d’écran ou à la navigation clavier.

---

## 1. Polices et couleurs

- **Polices utilisées** :
  - `Poppins` pour les textes (bonne lisibilité à l’écran).
  - `Playfair Display` pour les titres (clarté et hiérarchie visuelle).

- **Contrastes** :
  - Les couleurs principales (vert foncé #025939, beige clair #FAF0E6) ont été testées via l’audit Lighthouse.
  - Aucun texte ou élément interactif n’est en dessous du ratio de contraste recommandé (4.5:1 pour le texte normal).

- **Taille de police** :
  - Textes principaux à partir de 16px, ajustables selon le zoom navigateur.

---

## 2. Navigation et structure

- Tous les **inputs** et **boutons** sont associés à des balises `<label>` ou des attributs `aria-label`.
- Les **titres de page** sont structurés avec des `<h1>`, `<h2>`, etc., pour une hiérarchie sémantique claire.
- Les **routes** sont bien identifiées (`/login`, `/signup`, `/dashboard`, etc.), ce qui facilite la navigation assistée.
- Les formulaires de paiement ou d’inscription sont **accessibles au clavier** (test réalisé manuellement).

---

## 3. Composants interactifs

- Les **modales** (abonnement Stripe, ajout de vidéo) :
  - Fermeture possible via `Échap` ou clic extérieur.
  - Attributs `aria-modal="true"` et `role="dialog"` ajoutés.
  - Mise au focus automatique du premier champ.

- **Boutons** et **liens** :
  - Tous les boutons sont navigables au clavier (via `tab`).
  - Le focus est visible (style par défaut du navigateur non supprimé).

---

## 4. Tests effectués

- **Audit Lighthouse** :
  - Score > 90/100 sur l’onglet Accessibilité (Chrome DevTools).
  - Aucune erreur bloquante détectée (niveau AA atteint).

- **Navigation clavier** :
  - Parcours complet possible (connexion, abonnement, lecture des vidéos).

- **Lecture par synthèse vocale** :
  - Tests réalisés avec VoiceOver (macOS) et NVDA (Windows) sur les pages critiques.
