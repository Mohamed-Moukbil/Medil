# MEDIL — la prépa, sans angles morts

Plateforme de ressources pour les prépas **MPSI / MP** : cours détaillés, exercices durs corrigés, banque de concours et forum d’entraide.

Le projet est un site statique sans build step : HTML, CSS et JavaScript natifs.

## Lancer le site

Depuis le dossier du projet :

```bash
npm run serve
```

Puis ouvrir <http://127.0.0.1:8000>. Le serveur de dev gère le repli SPA (URL propres sans `#`), ce que `python3 -m http.server` ne fait pas.

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

- URL : <http://127.0.0.1:8000/admin> (ou lien **Studio admin** dans le pied de page)
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

Le studio d’administration et le forum éditorial restent enregistrés dans le `localStorage` du navigateur (clés `medil.content.v1` et `medil.threads`). Ces contenus éditoriaux sont donc :

- visibles immédiatement dans le site ;
- conservés après rechargement et fermeture du navigateur sur le même profil ;
- limités à ce navigateur et à cet appareil ;
- non partagés entre plusieurs visiteurs.

En revanche, **l’authentification et les données personnelles ne sont plus stockées localement** : profil, favoris (cours et exercices), cours terminés, likes du forum et série du défi du jour sont lus et écrits directement dans Supabase, puis gardés en mémoire pendant la session. Les anciennes clés `medil.user`, `medil.saved.courses`, `medil.saved.exercises`, `medil.completed`, `medil.liked.threads` et `medil.liked.replies` sont supprimées au démarrage.

Un visiteur non connecté peut consulter le site, mais doit se connecter pour enregistrer un favori, marquer un cours comme terminé, réagir à une discussion ou valider le défi du jour.

La session Supabase (jeton d’authentification) est conservée par la bibliothèque Supabase dans le stockage du navigateur afin de garder l’utilisateur connecté après un rechargement. Ce n’est pas une donnée personnelle applicative : elle est gérée et révoquée par Supabase à la déconnexion.

Le studio d’administration reste un outil local **sans backend** : son mot de passe protège l’interface locale, mais ne constitue pas une authentification serveur. Pour un site public avec plusieurs administrateurs, il faut ajouter un vrai backend et une authentification côté serveur.

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
- Filtres, favoris, cours terminés et profil synchronisés avec Supabase (aucune donnée personnelle en `localStorage`).
- Inscription / connexion Supabase (e-mail, Google, GitHub), newsletter et notifications toast.
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

Le site utilise **Supabase Authentication** pour les connexions Google, GitHub et e-mail/mot de passe. `config.js` doit contenir l’URL du projet et la clé publique `anon` / `publishable`. Il n’y a plus de compte de démonstration local : si Supabase est indisponible, la connexion affiche une erreur explicite.

Le flux OAuth utilise **PKCE** (compatible avec le routage par hash) et revient sur l’URL du site sans query ni hash : `origine + chemin`. En local, la redirection est donc exactement `http://127.0.0.1:8000/`.

### 1. Créer le projet Supabase

1. Va sur <https://supabase.com> et crée un projet.
2. Dans **Authentication → Providers**, active **Email**, **Google** et **GitHub**.
3. Dans **Project Settings → API**, récupère l’URL du projet et la clé `anon` (publique).
4. Colle ces valeurs dans `config.js` (remplace les `YOUR_...`).
5. Dans **Authentication → URL Configuration**, renseigne :
   - **Site URL** : `https://medil.io`
   - **Redirect URLs** : `https://medil.io/**` et `http://127.0.0.1:8000/**`
   - Si tu ouvres le site via `http://localhost:8000`, ajoute aussi `http://localhost:8000/**` : Supabase compare les URLs au caractère près (`localhost` ≠ `127.0.0.1`).

### 2. Configurer Google

- Crée un client OAuth dans Google Cloud Console, puis colle le client id/secret dans Supabase.
- Ajoute le redirect `https://<project>.supabase.co/auth/v1/callback` et ton origine de site.
- Si l’écran de consentement Google est en mode « test », ajoute ton compte dans les testeurs.

### 3. Configurer GitHub

- Crée une OAuth App GitHub (Settings → Developer settings → OAuth Apps).
- *Authorization callback URL* : `https://<project>.supabase.co/auth/v1/callback`.
- Colle le client id/secret dans Supabase (Authentication → Providers → GitHub).

### 4. Déployer

- Héberge le site en HTTPS (GitHub Pages convient, le `CNAME` est déjà présent).
- L’URL de retour doit correspondre à l’adresse réellement ouverte : `https://medil.io/**` pour le domaine, et l’URL exacte en local.
- Sur un site GitHub Pages de type `https://<user>.github.io/<repo>/`, ajoute aussi cette origine complète dans **Redirect URLs**.

### Dépannage

Les erreurs OAuth sont maintenant affichées dans un toast (avant, elles étaient silencieuses et pouvaient afficher une page 404).

| Symptôme | Cause probable | Correction |
| --- | --- | --- |
| `access_denied` | Consentement annulé, ou compte non autorisé (écran Google en mode test) | Réessaie, ou ajoute le compte aux testeurs Google |
| `bad_oauth_state` / « session expirée » | Lien de retour ouvert trop tard ou dans un autre navigateur | Relance la connexion depuis le navigateur d’origine |
| « code verifier » / « connexion expirée » | Retour sur une autre origine que celle du départ (`localhost` vs `127.0.0.1`, http vs https) | Utilise la même URL et ajoute-la dans **Redirect URLs** |
| « URL de redirection non autorisée » | URL absente de **Redirect URLs** | Ajoute l’URL exacte (avec `/**`) |
| « fournisseur non activé » | Provider désactivé dans Supabase | Active Google/GitHub dans **Authentication → Providers** |
| Connexion e-mail impossible après inscription | Confirmation e-mail activée (par défaut) | Clique sur le lien reçu, puis connecte-toi |

### Remarques

- Les boutons « Continuer avec Google / GitHub » sont dans la modale d’authentification. Si Supabase n’est pas configuré ou si le script ne se charge pas, un message d’erreur explicite s’affiche.
- Avec la confirmation e-mail activée, l’inscription ne connecte pas immédiatement : un message demande de cliquer sur le lien reçu. L’utilisateur n’est marqué connecté qu’une fois la session réellement créée.
- La déconnexion passe par Supabase et efface les données personnelles gardées en mémoire (favoris, progression, likes, série). Si le serveur est injoignable, la session locale est quand même supprimée.
- Les données personnelles ne sont jamais écrites dans `localStorage` ; seuls les contenus éditoriaux du studio et du forum y restent.
- Ne commite jamais la clé `service_role` : seule la clé `anon` doit figurer dans `config.js`.
