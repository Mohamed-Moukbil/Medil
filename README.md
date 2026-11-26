# MEDIL — la prépa, sans angles morts

Plateforme de ressources pour les prépas **MPSI / MP** : cours détaillés, exercices durs corrigés, banque de concours et forum d’entraide.

Le projet est un site statique sans build step : HTML, CSS et JavaScript natifs.

## Lancer le site

Depuis le dossier du projet :

```bash
python3 -m http.server 8000
```

Puis ouvrir <http://127.0.0.1:8000>.

## Outils de développement

Le projet reste sans build step, mais fournit quelques vérifications légères :

```bash
npm run check              # vérification syntaxique (node --check)
npm run validate:content   # validation du contenu JSON et du manifeste
npm run lint               # check + validation du contenu
npm test                   # alias de lint
```

Ces scripts utilisent uniquement Node.js (>= 18) et ne nécessitent aucune dépendance.

## Studio d’administration

Le site possède un studio local pour gérer tout le contenu éditorial.

- URL : <http://127.0.0.1:8000/#/admin> (ou lien **Studio admin** dans le pied de page)
- Mot de passe par défaut : défini dans `admin.js` (à changer dès le premier accès)

Le studio permet de :

- ajouter, modifier et supprimer des cours, avec leurs sections, objectifs, sommaire et exercice d’application ;
- ajouter, modifier et supprimer des exercices, leurs indices, étapes de correction et réponses ;
- gérer la banque de concours et les métadonnées des sujets ;
- créer, éditer et supprimer des discussions et des réponses du forum ;
- modifier le défi du jour ;
- changer le mot de passe d’accès au studio ;
- exporter/importer une sauvegarde JSON ;
- télécharger un fichier `data.generated.js` pour figer les changements dans le code ;
- restaurer les ressources ou le forum d’origine.

### Persistance

Les modifications sont enregistrées dans le `localStorage` du navigateur (clé `medil.content.v1`, et `medil.threads` pour le forum). Elles sont donc :

- visibles immédiatement dans le site ;
- conservées après rechargement et fermeture du navigateur sur le même profil ;
- limitées à ce navigateur et à cet appareil ;
- non partagées entre plusieurs visiteurs.

Le studio est un outil de démonstration **sans backend**. Son mot de passe protège l’interface locale, mais ne constitue pas une authentification serveur : pour un site public avec plusieurs administrateurs, il faut ajouter un vrai backend et une authentification côté serveur.

### Sauvegarder et publier

1. Dans **Réglages**, clique sur **Sauvegarde JSON** pour télécharger une copie complète.
2. Pour conserver les modifications sur le long terme, clique sur **Exporter data.js**.
3. Renomme le fichier téléchargé `data.generated.js` en `data.js` et remplace l’ancien fichier du projet.
4. Dans le studio, utilise **Réinitialiser les ressources** (et **Réinitialiser le forum** si nécessaire) pour retirer les surcharges locales et recharger les données du nouveau `data.js`.

Le fichier JSON peut être réimporté depuis **Réglages → Importer une sauvegarde**.

### Mot de passe oublié

Supprime la clé `medil.admin.hash` du `localStorage` du site via les outils de développement du navigateur, puis recharge la page : le mot de passe par défaut redevient actif. Cette opération ne supprime pas le contenu enregistré.

## Contenu de démonstration

- 9 cours complets (maths, physique, informatique) avec sommaire, formules KaTeX et exercice d’application.
- 10 exercices classés par matière et difficulté, avec indice, correction guidée et réponse finale.
- 16 sujets de concours (X/ENS, Mines-Ponts, Centrale, CCINP, e3a) filtrables par école, matière et année.
- 5 discussions de forum pré-remplies, création de sujets et réponses fonctionnelles.
- Défi du jour avec correction progressive.

## Fonctionnalités

- Routage par hash (`#/cours`, `#/cours/:id`, `#/exercices`, `#/concours`, `#/forum`, `#/forum/:id`, `#/admin`).
- Recherche globale avec navigation clavier (`Ctrl/⌘ + K`, flèches, Entrée).
- Filtres, favoris, cours terminés et profil persistés dans `localStorage`.
- Inscription / connexion de démonstration, newsletter et notifications toast.
- Modales accessibles au clavier (fermeture par `Échap` ou clic sur le fond).
- Version imprimable / PDF des cours et des sujets via l’impression du navigateur.
- Design responsive desktop, tablette et mobile, polices et KaTeX servis localement.
- Studio d’administration local responsive avec éditeurs, recherche et sauvegardes.

## Organisation du projet

- `data.js` — données éditoriales de démonstration.
- `app.js` — routage, rendu des pages et interactions publiques.
- `admin.js` — studio d’administration, persistance locale et export/import.
- `styles.css` — design system public et styles du studio.
- `index.html` — point d’entrée statique.
- `assets/` — polices et KaTeX.

## Authentification (Supabase)

Le site utilise **Supabase Authentication** pour les connexions Google et GitHub (et e-mail/mot de passe). Tant que `config.js` contient les valeurs `YOUR_...`, le site reste en **mode démo local** (compte stocké dans le navigateur), comme avant.

### 1. Créer le projet Supabase

1. Va sur <https://supabase.com> et crée un projet.
2. Dans **Authentication → Providers**, active **Email**, **Google** et **GitHub**.
3. Dans **Project Settings → API**, récupère l’URL du projet et la clé `anon` (publique).
4. Colle ces valeurs dans `config.js` (remplace les `YOUR_...`).

### 2. Configurer Google

- Crée un client OAuth dans Google Cloud Console, puis colle le client id/secret dans Supabase.
- Ajoute le redirect `https://<project>.supabase.co/auth/v1/callback` et ton origine de site.

### 3. Configurer GitHub

- Crée une OAuth App GitHub (Settings → Developer settings → OAuth Apps).
- *Authorization callback URL* : `https://<project>.supabase.co/auth/v1/callback`.
- Colle le client id/secret dans Supabase (Authentication → Providers → GitHub).

### 4. Déployer

- Héberge le site en HTTPS (GitHub Pages convient, le `CNAME` est déjà présent).
- Google et GitHub fonctionnent en local une fois le domaine `localhost` autorisé dans Supabase (URL Configuration).

### Remarques

- Les boutons « Continuer avec Google / GitHub » sont dans la modale d’authentification. Sans config Supabase, ils affichent un message et le mode démo reste actif.
- La déconnexion passe par Supabase si l’utilisateur est connecté via un provider, sinon elle efface simplement le compte démo local.
- Ne commite jamais la clé `service_role` : seule la clé `anon` doit figurer dans `config.js`.
