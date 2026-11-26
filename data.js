/* ==========================================================================
   MEDIL — Données générées depuis le Studio
   Export du 26/11/2026 04:29:53
   Remplace data.js par ce fichier pour publier ces modifications.
   ========================================================================== */

window.MEDIL_EDITORIAL = {
  "version": 2,
  "savedAt": "2026-11-26T03:29:53.241Z",
  "courses": [
    {
      "id": "reduction-endomorphismes",
      "title": "Réduction des endomorphismes",
      "tag": "Algèbre",
      "subject": "Maths",
      "level": "MP",
      "color": "lime",
      "coverType": "matrix",
      "coverEq": "A = PDP^{-1}",
      "chaptersCount": 18,
      "duration": "6 h 20",
      "students": "2,4k",
      "rating": 4.9,
      "progress": 68,
      "featured": true,
      "description": "Polynômes d'endomorphismes, diagonalisation, trigonalisation et forme de Jordan : la réduction racontée sans trous.",
      "formula": "A = PDP^{-1}",
      "objectives": [
        "Manipuler les polynômes d’un endomorphisme avec assurance.",
        "Savoir quand diagonaliser — et quoi faire quand ce n’est pas possible.",
        "Construire une réduction de Jordan sans réciter un théorème."
      ],
      "toc": [
        "Polynômes d’endomorphismes",
        "Le lemme des noyaux",
        "Diagonalisation",
        "Trigonalisation",
        "Réduction de Jordan",
        "Applications aux suites et aux matrices"
      ],
      "sections": [
        {
          "id": "poly",
          "kicker": "01 · Le socle",
          "title": "Faire agir un polynôme sur un endomorphisme",
          "paragraphs": [
            "Soit <span class=\"inline-tex\" data-tex=\"u \\in \\mathcal{L}(E)\"></span>. Pour <span class=\"inline-tex\" data-tex=\"P = \\sum a_k X^k \\in \\mathbb{K}[X]\"></span>, on définit naturellement <span class=\"inline-tex\" data-tex=\"P(u) = \\sum a_k u^k\"></span>. Cette petite construction transforme un problème de géométrie en un problème d’algèbre commutative.",
            "L’objet central est l’idéal annulateur <span class=\"inline-tex\" data-tex=\"I_u = \\{P \\in \\mathbb{K}[X] \\mid P(u)=0\\}\"></span>. Comme <span class=\"inline-tex\" data-tex=\"\\mathbb{K}[X]\"></span> est principal, cet idéal admet un unique générateur unitaire : le polynôme minimal <span class=\"inline-tex\" data-tex=\"\\pi_u\"></span>."
          ],
          "formula": "\\chi_u(u)=0 \\quad \\text{et} \\quad \\pi_u \\mid \\chi_u",
          "note": "Cayley–Hamilton n’est pas une astuce de calcul : c’est l’énoncé qui relie spectre, trace et réduction. Garde toujours en tête que <strong>π<sub>u</sub></strong> divise <strong>χ<sub>u</sub></strong>, et qu’ils ont les mêmes racines."
        },
        {
          "id": "noyaux",
          "kicker": "02 · La mécanique",
          "title": "Le lemme des noyaux, votre meilleur ami",
          "paragraphs": [
            "Si <span class=\"inline-tex\" data-tex=\"P = P_1 \\cdots P_r\"></span> avec les <span class=\"inline-tex\" data-tex=\"P_i\"></span> deux à deux premiers entre eux, alors <span class=\"inline-tex\" data-tex=\"\\ker P(u) = \\bigoplus_{i=1}^{r} \\ker P_i(u)\"></span>. C’est ce résultat, bien plus que la formule de changement de base, qui fait vivre toute la réduction.",
            "En particulier, on récupère les sous-espaces caractéristiques et l’on décompose l’espace en morceaux stables sur lesquels l’endomorphisme est plus simple."
          ],
          "formula": "\\ker\\bigl((P_1P_2)(u)\\bigr) = \\ker P_1(u) \\oplus \\ker P_2(u)",
          "note": "Réflexe de rédaction : vérifie toujours l’hypothèse de coprimalité avant d’écrire une somme directe de noyaux. Sans elle, le lemme peut tomber en défaut."
        },
        {
          "id": "diagonalisation",
          "kicker": "03 · Le critère",
          "title": "Diagonaliser, vraiment",
          "paragraphs": [
            "Un endomorphisme est diagonalisable si et seulement si son polynôme minimal est scindé à racines simples. En pratique, on cherche le spectre, puis on teste si la somme des dimensions des espaces propres vaut <span class=\"inline-tex\" data-tex=\"\\dim E\"></span>.",
            "La matrice de passage n’est pas un détail : ses colonnes sont des vecteurs propres. Une réduction correctement rédigée se termine donc toujours par une phrase du type « après regroupement des colonnes en bases adaptées »."
          ],
          "formula": "E = \\bigoplus_{\\lambda \\in \\operatorname{Sp}(u)} \\ker(u-\\lambda \\mathrm{Id})",
          "note": "Astuce anti-erreur : diagonaliser <strong>u</strong> et diagonaliser sa matrice dans une base donnée sont deux énoncés différents. Le second nécessite la matrice de passage."
        }
      ],
      "exercise": {
        "prompt": "Soit <span class=\"inline-tex\" data-tex=\"A \\in \\mathrm{M}_n(\\mathbb{R})\"></span> telle que <span class=\"inline-tex\" data-tex=\"A^3 = 0\"></span>. Montrer que <span class=\"inline-tex\" data-tex=\"I_n + A\"></span> est inversible et exprimer son inverse comme un polynôme en <span class=\"inline-tex\" data-tex=\"A\"></span>.",
        "answer": "I_n - A + A^2"
      }
    },
    {
      "id": "suites-series-fonctions",
      "title": "Suites & séries de fonctions",
      "tag": "Analyse",
      "subject": "Maths",
      "level": "MP",
      "color": "sky",
      "coverType": "graph",
      "coverEq": "\\sum_{n\\ge 0} \\frac{x^n}{n!}",
      "chaptersCount": 14,
      "duration": "5 h 10",
      "students": "1,8k",
      "rating": 4.8,
      "featured": true,
      "description": "Convergence simple, uniforme, normale et interversion limite / intégrale : les bons réflexes pour rédiger sans se tromper.",
      "formula": "\\sum_{n \\ge 0} \\frac{x^n}{n!}",
      "objectives": [
        "Distinguer convergence simple et convergence uniforme sur un exemple.",
        "Utiliser le critère de Cauchy uniforme sans hésitation.",
        "Justifier une interversion par convergence normale en trois lignes."
      ],
      "toc": [
        "Convergence simple",
        "Convergence uniforme",
        "Convergence normale",
        "Continuité de la limite",
        "Dérivation et intégration",
        "Séries entières"
      ],
      "sections": [
        {
          "id": "simple",
          "kicker": "01 · Point de départ",
          "title": "Convergence simple : la définition qui ne pardonne pas",
          "paragraphs": [
            "La convergence simple est une propriété <em>ponctuelle</em>. Pour chaque <span class=\"inline-tex\" data-tex=\"x \\in I\"></span>, la suite numérique <span class=\"inline-tex\" data-tex=\"(f_n(x))\"></span> converge. Rien de plus. Rien qui autorise à échanger limite et intégrale.",
            "L’erreur classique consiste à fixer un <span class=\"inline-tex\" data-tex=\"\\varepsilon\"></span> qui dépend de <span class=\"inline-tex\" data-tex=\"x\"></span> puis à prétendre avoir montré l’uniformité. Le rang <span class=\"inline-tex\" data-tex=\"N\"></span> doit être commun à tous les points."
          ],
          "formula": "\\forall x\\in I,\\ \\forall \\varepsilon>0,\\ \\exists N_{x,\\varepsilon},\\quad n\\ge N_{x,\\varepsilon} \\Longrightarrow |f_n(x)-f(x)|\\le \\varepsilon",
          "note": "Pour réfuter l’uniformité, cherche une suite <strong>x<sub>n</sub></strong> telle que <strong>|f<sub>n</sub>(x<sub>n</sub>) − f(x<sub>n</sub>)|</strong> ne tende pas vers 0. C’est souvent plus rapide que de calculer un sup."
        },
        {
          "id": "uniforme",
          "kicker": "02 · Le saut de qualité",
          "title": "La norme uniforme comme boussole",
          "paragraphs": [
            "Sur un espace de fonctions bornées, la convergence uniforme n’est autre que la convergence au sens de <span class=\"inline-tex\" data-tex=\"\\lVert f \\rVert_\\infty = \\sup_{x\\in I}|f(x)|\"></span>. Cette lecture linéaire clarifie beaucoup de théorèmes d’échange.",
            "Le théorème d’interversion est alors une conséquence de l’inégalité triangulaire : on contrôle l’écart à la limite uniformément, puis on conclut intégrale par intégrale."
          ],
          "formula": "\\left|\\int_a^b f_n(t)\\,dt - \\int_a^b f(t)\\,dt\\right| \\le (b-a)\\,\\lVert f_n-f\\rVert_\\infty",
          "note": "Sur un segment, convergence uniforme + continuité donne continuité de la limite. Sur un intervalle non borné, il faut un argument supplémentaire."
        },
        {
          "id": "normale",
          "kicker": "03 · La boîte à outils",
          "title": "Convergence normale : l’arme fatale",
          "paragraphs": [
            "La convergence normale est plus forte que la convergence uniforme. Elle a un immense avantage : elle se teste avec des majorations de séries numériques, sans calcul de sup de reste.",
            "Dès que tu reconnais un terme d’une série entière, pense « convergence normale sur tout compact ». C’est presque toujours le bon cadre pour dériver terme à terme."
          ],
          "formula": "\\sum_{n\\ge 0} \\lVert f_n \\rVert_\\infty < +\\infty \\quad\\Longrightarrow\\quad \\sum f_n \\text{ converge normalement}",
          "note": "La réciproque est fausse. Une série peut converger uniformément sans converger normalement ; la série alternée de fonctions est le contre-exemple à garder en tête."
        }
      ],
      "exercise": {
        "prompt": "Étudier la convergence de <span class=\"inline-tex\" data-tex=\"\\sum_{n\\ge 1} f_n\"></span> avec <span class=\"inline-tex\" data-tex=\"f_n(x)=\\frac{x^n}{1+x^n}\"></span> sur <span class=\"inline-tex\" data-tex=\"[0,1[\"></span>.",
        "answer": "Convergence simple, mais pas uniforme."
      }
    },
    {
      "id": "probabilites-discretes",
      "title": "Probabilités & variables aléatoires",
      "tag": "Probabilités",
      "subject": "Maths",
      "level": "MPSI",
      "color": "rose",
      "coverType": "dots",
      "coverEq": "\\mathbb{P}(X=k) = \\binom{n}{k}p^k(1-p)^{n-k}",
      "chaptersCount": 12,
      "duration": "4 h 40",
      "students": "2,1k",
      "rating": 4.7,
      "featured": false,
      "description": "De l’espace probabilisé aux variables aléatoires finies : les bases solides, avec les pièges de rédaction classiques.",
      "formula": "\\mathbb{P}(X=k) = \\binom{n}{k}p^k(1-p)^{n-k}",
      "objectives": [
        "Modéliser proprement un espace probabilisé fini.",
        "Calculer loi, espérance et variance sans oublier les hypothèses.",
        "Utiliser la linéarité de l’espérance avec discernement."
      ],
      "toc": [
        "Espaces probabilisés finis",
        "Conditionnement",
        "Indépendance",
        "Variables aléatoires",
        "Espérance et variance",
        "Lois usuelles"
      ],
      "sections": [
        {
          "id": "modele",
          "kicker": "01 · Le modèle",
          "title": "Nommer l’univers avant de calculer",
          "paragraphs": [
            "Un calcul probabiliste commence par une phrase de modélisation. Quelle expérience ? Quel univers ? Quelle hypothèse d’équiprobabilité ? Sans ces mots, la formule la plus juste devient une réponse incomplète.",
            "Sur un univers fini, une probabilité est une masse totale égale à 1 répartie sur les issues. Le passage aux événements est ensuite entièrement additif."
          ],
          "formula": "\\mathbb{P}\\left(\\bigcup_{i\\in I} A_i\\right) = \\sum_{i\\in I} \\mathbb{P}(A_i) \\quad \\text{si les } A_i \\text{ sont deux à deux incompatibles}",
          "note": "Astuce de rédaction : note <strong>A</strong> l’événement en lettres, puis sa probabilité. Cela évite les phrases floues du type « il y a 2 chances sur 5 ici »."
        },
        {
          "id": "conditionnement",
          "kicker": "02 · L’information",
          "title": "Conditionner, ce n’est pas biaiser",
          "paragraphs": [
            "La probabilité conditionnelle <span class=\"inline-tex\" data-tex=\"\\mathbb{P}(A\\mid B)\"></span> est une probabilité sur le même univers, mais restreinte à l’événement <span class=\"inline-tex\" data-tex=\"B\"></span>. La formule des probabilités totales découpe naturellement un univers en scénarios incompatibles.",
            "Le piège fréquent : oublier que la probabilité conditionnelle change l’espace de référence. Un changement de conditionnement peut transformer un événement rare en événement presque certain."
          ],
          "formula": "\\mathbb{P}(A\\mid B) = \\frac{\\mathbb{P}(A\\cap B)}{\\mathbb{P}(B)}, \\qquad \\mathbb{P}(B)>0",
          "note": "La formule de Bayes se retrouve en trente secondes avec un arbre pondéré. Dessine l’arbre avant de manipuler les formules."
        },
        {
          "id": "variables",
          "kicker": "03 · La loi",
          "title": "Lire une variable aléatoire comme une fonction",
          "paragraphs": [
            "Une variable aléatoire finie est une application de l’univers vers <span class=\"inline-tex\" data-tex=\"\\mathbb{R}\"></span>. Sa loi est l’image de la probabilité : elle regroupe les issues qui donnent la même valeur.",
            "L’espérance est une moyenne pondérée. Sa linéarité ne demande aucune hypothèse d’indépendance, contrairement à la variance d’une somme."
          ],
          "formula": "\\mathbb{E}(X+Y)=\\mathbb{E}(X)+\\mathbb{E}(Y), \\qquad \\mathbb{V}(X+Y)=\\mathbb{V}(X)+\\mathbb{V}(Y)+2\\operatorname{Cov}(X,Y)",
          "note": "L’indépendance sert à factoriser les espérances de produits. Pour une somme, la linéarité suffit toujours."
        }
      ],
      "exercise": {
        "prompt": "Une urne contient <span class=\"inline-tex\" data-tex=\"n\"></span> boules numérotées. On tire sans remise jusqu’à obtenir la boule 1. Calculer l’espérance du rang d’arrêt.",
        "answer": "\\frac{n+1}{2}"
      }
    },
    {
      "id": "electromagnetisme",
      "title": "Électromagnétisme",
      "tag": "Physique",
      "subject": "Physique",
      "level": "MP",
      "color": "butter",
      "coverType": "field",
      "coverEq": "\\nabla\\cdot\\vec{E} = \\frac{\\rho}{\\varepsilon_0}",
      "chaptersCount": 16,
      "duration": "5 h 50",
      "students": "1,6k",
      "rating": 4.8,
      "featured": true,
      "description": "Maxwell, potentiels et induction : les équations prennent enfin du sens grâce aux schémas et aux cas d’école.",
      "formula": "\\nabla\\cdot\\vec{E} = \\frac{\\rho}{\\varepsilon_0}",
      "objectives": [
        "Passer d’une carte de champ à une description locale.",
        "Choisir entre potentiel scalaire et vecteur.",
        "Rédiger proprement un problème d’induction."
      ],
      "toc": [
        "Champ et potentiel",
        "Théorème de Gauss",
        "Équations de Maxwell",
        "Induction",
        "Ondes électromagnétiques",
        "Milieux diélectriques"
      ],
      "sections": [
        {
          "id": "gauss",
          "kicker": "01 · Symétries",
          "title": "Gauss commence par un dessin",
          "paragraphs": [
            "Les symétries et invariances déterminent la direction du champ avant tout calcul. Une surface de Gauss correcte épouse ces symétries : sphère pour une distribution sphérique, cylindre pour un fil infini.",
            "Le théorème de Gauss relie le flux à la charge enfermée. Mais la rédaction doit préciser la surface choisie, son orientation et le champ qui la traverse."
          ],
          "formula": "\\oiint_{\\Sigma}\\vec{E}\\cdot d\\vec{S} = \\frac{Q_{\\rm int}}{\\varepsilon_0}",
          "note": "Le champ électrique est toujours normal à la surface d’un conducteur en équilibre : c’est souvent le premier argument à poser."
        },
        {
          "id": "maxwell",
          "kicker": "02 · Le cœur",
          "title": "Quatre équations, une histoire",
          "paragraphs": [
            "Les équations de Maxwell disent comment les charges créent le champ et comment les champs s’auto-entretiennent. Le terme de courant de déplacement, souvent oublié, est précisément ce qui rend les ondes possibles.",
            "En régime stationnaire, les équations découplent électricité et magnétisme. Dès que le régime varie, les deux champs deviennent inséparables."
          ],
          "formula": "\\nabla\\times\\vec{B} = \\mu_0\\vec{j} + \\mu_0\\varepsilon_0\\frac{\\partial \\vec{E}}{\\partial t}",
          "note": "Pour un écran de concours, commence par indiquer le référentiel, le régime et les approximations. Une équation hors contexte ne vaut que la moitié des points."
        },
        {
          "id": "induction",
          "kicker": "03 · Le mouvement",
          "title": "L’induction, ou la variation comme moteur",
          "paragraphs": [
            "La force électromotrice induite mesure le flux qui varie. Le signe n’est jamais décoratif : il traduit la loi de Lenz, donc l’opposition à la cause qui a produit le courant.",
            "Un bon raisonnement caractérise d’abord le sens du champ inducteur, puis le sens du flux, enfin le sens du courant induit. Le calcul vient après."
          ],
          "formula": "e = -\\frac{d\\Phi}{dt}",
          "note": "Deux causes possibles de variation du flux : la surface ou le champ. Pense à traiter les deux, même si l’énoncé semble n’en désigner qu’une."
        }
      ],
      "exercise": {
        "prompt": "Une tige conductrice de longueur <span class=\"inline-tex\" data-tex=\"\\ell\"></span> tourne à vitesse angulaire <span class=\"inline-tex\" data-tex=\"\\omega\"></span> dans un champ uniforme <span class=\"inline-tex\" data-tex=\"\\vec B\"></span>. Calculer la fem induite aux bornes de la tige.",
        "answer": "\\frac{1}{2}B\\omega\\ell^2"
      }
    },
    {
      "id": "mecanique-quantique",
      "title": "Mécanique quantique",
      "tag": "Physique",
      "subject": "Physique",
      "level": "MP",
      "color": "lilac",
      "coverType": "wave",
      "coverEq": "i\\hbar\\,\\partial_t\\psi = \\hat H\\psi",
      "chaptersCount": 10,
      "duration": "4 h 15",
      "students": "980",
      "rating": 4.9,
      "featured": false,
      "description": "Fonction d’onde, superposition et puits de potentiel : une introduction rigoureuse, sans détour métaphysique.",
      "formula": "i\\hbar\\,\\partial_t\\psi = \\hat H\\psi",
      "objectives": [
        "Relier amplitude et probabilité de présence.",
        "Résoudre l’équation de Schrödinger dans les cas 1D usuels.",
        "Interpréter un spectre quantifié sans réciter."
      ],
      "toc": [
        "Fonction d’onde",
        "Équation de Schrödinger",
        "Marche et barrière",
        "Puits infini",
        "Oscillateur harmonique",
        "Effet tunnel"
      ],
      "sections": [
        {
          "id": "onde",
          "kicker": "01 · Le vocabulaire",
          "title": "Une amplitude, pas une trajectoire",
          "paragraphs": [
            "En mécanique quantique, l’état d’une particule est décrit par une fonction d’onde. Son module au carré donne une densité de probabilité de présence. Cette lecture probabiliste est au cœur de l’interprétation de Born.",
            "La fonction d’onde doit être normalisable et remplir les conditions de raccordement imposées par le potentiel. Les conditions aux limites sont donc les véritables guides de calcul."
          ],
          "formula": "\\int_{\\mathbb{R}} |\\psi(x,t)|^2\\,dx = 1, \\qquad dP = |\\psi(x,t)|^2\\,dx",
          "note": "Une fonction d’onde n’est pas une onde matérielle. Ce que l’on suit, c’est une amplitude de probabilité, pas une trajectoire déterministe."
        },
        {
          "id": "schrodinger",
          "kicker": "02 · Le moteur",
          "title": "Schrödinger, version stationnaire",
          "paragraphs": [
            "Pour un potentiel indépendant du temps, on cherche des solutions séparables. L’équation de Schrödinger stationnaire devient une équation différentielle en espace, avec l’énergie comme paramètre.",
            "Les solutions acceptables imposent des conditions de continuité. C’est précisément ce qui fait apparaître des niveaux d’énergie discrets dans un puits."
          ],
          "formula": "-\\frac{\\hbar^2}{2m}\\frac{d^2\\varphi}{dx^2} + V(x)\\varphi = E\\varphi",
          "note": "Pense toujours à vérifier la continuité de ψ et de ψ′ aux interfaces, sauf lorsque le potentiel présente un pic de Dirac."
        },
        {
          "id": "puits",
          "kicker": "03 · Le puits",
          "title": "Le puits infini, laboratoire minimal",
          "paragraphs": [
            "Le puits infini est le problème à connaître par cœur. Les modes propres sont des sinus, quantifiés par un entier. L’énergie minimale n’est jamais nulle : c’est le prix de la localisation.",
            "Ce modèle sert de base pour comprendre la quantification des niveaux dans les systèmes plus réalistes. Il ne faut pas le traiter comme une simple formule à réciter."
          ],
          "formula": "E_n = \\frac{n^2\\pi^2\\hbar^2}{2mL^2}, \\qquad \\varphi_n(x)=\\sqrt{\\frac{2}{L}}\\sin\\left(\\frac{n\\pi x}{L}\\right)",
          "note": "L’énergie de l’état fondamental pour n = 1 n’est pas une offset arbitraire : elle est conséquence des conditions aux limites."
        }
      ],
      "exercise": {
        "prompt": "Une particule traverse une barrière de potentiel de hauteur <span class=\"inline-tex\" data-tex=\"V_0 > E\"></span>. Sans résoudre l’équation, expliquer pourquoi le coefficient de transmission n’est pas strictement nul.",
        "answer": "La fonction d’onde décroît exponentiellement mais reste non nulle de l’autre côté : effet tunnel."
      }
    },
    {
      "id": "thermodynamique",
      "title": "Thermodynamique",
      "tag": "Physique",
      "subject": "Physique",
      "level": "MPSI",
      "color": "peach",
      "coverType": "thermo",
      "coverEq": "dU = \\delta Q + \\delta W",
      "chaptersCount": 13,
      "duration": "4 h 55",
      "students": "1,7k",
      "rating": 4.6,
      "featured": false,
      "description": "Premier et second principe, transformations et machines thermiques : les bilans sans les erreurs de signe.",
      "formula": "dU = \\delta Q + \\delta W",
      "objectives": [
        "Choisir un système et un bilan correctement.",
        "Distinguer une variable d’état d’une grandeur de transfert.",
        "Utiliser l’entropie pour caractériser une évolution."
      ],
      "toc": [
        "Le système thermodynamique",
        "Premier principe",
        "Second principe",
        "Transformations usuelles",
        "Machines thermiques",
        "Changements d’état"
      ],
      "sections": [
        {
          "id": "systeme",
          "kicker": "01 · Le cadre",
          "title": "Un bon bilan commence par un bon système",
          "paragraphs": [
            "Avant toute équation, délimite le système, précise le référentiel, et identifie les échanges. Une erreur de signe est presque toujours une erreur de système ou de convention.",
            "La thermodynamique manipulate des variables d’état et des grandeurs de transfert. Une variation de U s’écrit dU ; une quantité de chaleur reçue s’écrit δQ. Mélanger les deux notations, c’est mélanger deux natures."
          ],
          "formula": "dU = \\delta Q + \\delta W",
          "note": "Convention reçue : δQ et δW sont algébriques. Un transfert entrant est positif, un transfert sortant est négatif. Écris cette convention en tête de copie."
        },
        {
          "id": "entropie",
          "kicker": "02 · L’irréversibilité",
          "title": "L’entropie, juge des transformations",
          "paragraphs": [
            "L’entropie d’un système isolé ne diminue jamais. Pour un système non isolé, on distingue l’entropie échangée, réversible, et l’entropie créée, positive ou nulle.",
            "C’est cette entropie créée qui quantifie l’irréversibilité. Une transformation réversible est une limite idéale, jamais une hypothèse gratuite."
          ],
          "formula": "\\Delta S = S_{\\rm échangée} + S_{\\rm créée}, \\qquad S_{\\rm créée}\\ge 0",
          "note": "Pour un cycle, l’entropie d’un système revient à sa valeur initiale. Ce n’est pas le cas de l’entropie de l’univers, qui ne fait qu’augmenter."
        },
        {
          "id": "machines",
          "kicker": "03 · Les machines",
          "title": "Carnot : le rendement limite",
          "paragraphs": [
            "Une machine thermique convertit de la chaleur en travail. Le moteur de Carnot, entièrement réversible, donne le meilleur rendement possible entre deux sources de températures fixées.",
            "Aucune machine réelle ne peut dépasser ce rendement. Ce résultat n’est pas une recette technologique, mais une conséquence directe du second principe."
          ],
          "formula": "\\eta_{\\rm Carnot} = 1 - \\frac{T_{\\rm froid}}{T_{\\rm chaud}}",
          "note": "Attention aux températures : les rendements thermodynamiques utilisent toujours des kelvins, jamais des degrés Celsius."
        }
      ],
      "exercise": {
        "prompt": "Une mole de gaz parfait subit une détente isotherme réversible de <span class=\"inline-tex\" data-tex=\"V_1\"></span> à <span class=\"inline-tex\" data-tex=\"V_2\"></span>. Calculer le travail reçu par le gaz.",
        "answer": "W = -RT\\ln\\left(\\frac{V_2}{V_1}\\right)"
      }
    },
    {
      "id": "algorithmique-complexite",
      "title": "Algorithmique & complexité",
      "tag": "Informatique",
      "subject": "Informatique",
      "level": "MP",
      "color": "mint",
      "coverType": "code",
      "coverEq": "O(n\\log n)",
      "chaptersCount": 11,
      "duration": "3 h 40",
      "students": "1,2k",
      "rating": 4.8,
      "featured": true,
      "description": "Diviser pour régner, structures de données et preuves de correction : le bagage informatique de l’écrit et de l’oral.",
      "formula": "T(n)=2T(n/2)+O(n)",
      "objectives": [
        "Mesurer une complexité en fonction de la taille d’entrée.",
        "Prouver la correction d’un algorithme par invariant.",
        "Choisir la bonne structure de données selon la complexité visée."
      ],
      "toc": [
        "Complexité asymptotique",
        "Preuves par invariant",
        "Diviser pour régner",
        "Structures de données",
        "Graphes",
        "Algorithmes gloutons"
      ],
      "sections": [
        {
          "id": "complexite",
          "kicker": "01 · Mesurer",
          "title": "La complexité n’est pas un temps d’exécution",
          "paragraphs": [
            "La complexité décrit l’évolution du coût lorsque la taille de l’entrée grandit. Elle demande de choisir une unité : nombre de comparaisons, d’affectations, d’opérations élémentaires. Cette unité doit être annoncée.",
            "On distingue le pire cas, le cas moyen et le meilleur cas. Pour un concours, le pire cas est la convention par défaut, sauf indication contraire de l’énoncé."
          ],
          "formula": "T(n) = 3n^2 + 5n + 7 = O(n^2)",
          "note": "Les constantes disparaissent dans le O, mais elles peuvent compter dans la vraie vie. Ne confonds pas une amélioration asymptotique avec une optimisation pertinente sur toutes les tailles."
        },
        {
          "id": "invariant",
          "kicker": "02 · Prouver",
          "title": "Un invariant pour verrouiller la boucle",
          "paragraphs": [
            "Un invariant de boucle est une propriété vraie avant la boucle, préservée à chaque itération, et utile à la sortie. Il transforme une intuition en preuve.",
            "La terminaison se prouve séparément, avec une quantité positive qui décroît à chaque itération. Correction partielle et terminaison forment deux obligations distinctes."
          ],
          "formula": "\\text{Invariant} \\land \\text{condition d’arrêt} \\Longrightarrow \\text{propriété de sortie}",
          "note": "La majoration avec un variant est un classique de l’oral : décris-le explicitement, puis justifie qu’il est borné inférieurement."
        },
        {
          "id": "divide",
          "kicker": "03 · Découper",
          "title": "Diviser pour régner, sans récursion infinie",
          "paragraphs": [
            "Un algorithme diviser-pour-régner se reconnaît à trois étapes : diviser, résoudre récursivement, recombiner. La complexité émerge de l’équation de récurrence, pas du nombre de lignes de code.",
            "Le tri fusion en est l’exemple canonique : division en deux, tri des moitiés, fusion linéaire. Son coût total est en n log n."
          ],
          "formula": "T(n)=2T\\!\\left(\\frac{n}{2}\\right)+O(n)=\\Theta(n\\log n)",
          "note": "Pour appliquer le master theorem, identifie le coût de recombinaison. Une fusion en O(n) n’est pas la même chose qu’une fusion en O(n²)."
        }
      ],
      "exercise": {
        "prompt": "Soit un tableau trié. Écrire une recherche dichotomique itérative et justifier sa complexité en <span class=\"inline-tex\" data-tex=\"O(\\log n)\"></span>.",
        "answer": "Chaque itération divise par deux la taille de l’intervalle de recherche."
      }
    },
    {
      "id": "python-prepa",
      "title": "Python pour la prépa",
      "tag": "Python",
      "subject": "Informatique",
      "level": "MPSI",
      "color": "sky",
      "coverType": "terminal",
      "coverEq": "\\texttt{def f(x): return x ** 2}",
      "chaptersCount": 9,
      "duration": "3 h 00",
      "students": "1,5k",
      "rating": 4.7,
      "featured": false,
      "description": "Listes, dictionnaires, classes et complexité : écrire du code propre et lisible le jour du concours.",
      "formula": "\\texttt{def f(x): return x ** 2}",
      "objectives": [
        "Choisir la structure Python adaptée.",
        "Écrire une fonction documentée et testable.",
        "Comprendre le coût réel des opérations courantes."
      ],
      "toc": [
        "Syntaxe essentielle",
        "Listes et compréhensions",
        "Dictionnaires",
        "Classes et objets",
        "Récursivité",
        "Bonnes pratiques"
      ],
      "sections": [
        {
          "id": "structures",
          "kicker": "01 · Les bases",
          "title": "Penser en structures, pas en boucles",
          "paragraphs": [
            "Le choix d’une structure de données est souvent plus déterminant que la micro-optimisation d’une boucle. Une liste convient à un parcours ordonné, un dictionnaire à une recherche par clé, un ensemble à un test d’appartenance.",
            "Python ne rend pas impossible le calcul de complexité : il le déplace. Une recherche dans une liste est linéaire, une recherche dans un dictionnaire est en moyenne constante."
          ],
          "formula": "T_{liste}(n)=O(n) \\qquad T_{dict}(n)=O(1) \\text{ en moyenne}",
          "note": "Connais tes coûts : un `in` sur une liste est O(n), un `in` sur un set est O(1) en moyenne. Cette différence suffit souvent à passer un test de performance."
        },
        {
          "id": "propre",
          "kicker": "02 · Écrire",
          "title": "Un code lisible est un code qui rapporte",
          "paragraphs": [
            "Nommer les variables, découper les responsabilités, documenter les hypothèses : ces habitudes font gagner des points à l’oral. Le correcteur doit pouvoir suivre l’intention sans exécuter mentalement tout le programme.",
            "En prépa, on privilégie la clarté. Un code de vingt lignes compréhensible vaut mieux qu’un code de huit lignes illisible, surtout lorsqu’il faut le corriger au tableau."
          ],
          "formula": "\\texttt{def est\\_pair(n):\\n    return n \\% 2 == 0}",
          "note": "Évite les effets de bord dans une fonction de calcul. Une fonction qui modifie son argument doit le dire dans son nom ou sa documentation."
        },
        {
          "id": "recursivite",
          "kicker": "03 · La profondeur",
          "title": "Récursivité : élégante, mais bornée",
          "paragraphs": [
            "Une fonction récursive se lit souvent mieux qu’une boucle. Mais chaque appel consume de la pile d’exécution. Une récursion profonde peut dépasser les limites de Python.",
            "La version itérative n’est pas toujours meilleure, mais elle évite ce risque. À l’écrit, on privilégie la version la plus lisible qui respecte les contraintes de taille."
          ],
          "formula": "\\texttt{sys.getrecursionlimit()} \\approx 1000",
          "note": "Si une récursion peut dépasser la profondeur autorisée, transforme-la en boucle avec une pile explicite, ou utilise la mémoïsation si les sous-problèmes se répètent."
        }
      ],
      "exercise": {
        "prompt": "Écrire une fonction qui renvoie le plus long sous-tableau contigu dont la somme est nulle. Complexité attendue : <span class=\"inline-tex\" data-tex=\"O(n)\"></span>.",
        "answer": "Accumuler les sommes préfixes dans un dictionnaire."
      }
    },
    {
      "id": "topologie-evn",
      "title": "Topologie & espaces vectoriels normés",
      "tag": "Analyse",
      "subject": "Maths",
      "level": "MP",
      "color": "ink",
      "coverType": "norm",
      "coverEq": "\\lVert x+y\\rVert \\le \\lVert x\\rVert + \\lVert y\\rVert",
      "chaptersCount": 15,
      "duration": "6 h 50",
      "students": "840",
      "rating": 4.9,
      "featured": false,
      "description": "Normes, compacité et complétude : le langage qui rend l’analyse en dimension infinie contrôlable.",
      "formula": "\\lVert x+y\\rVert \\le \\lVert x\\rVert + \\lVert y\\rVert",
      "objectives": [
        "Manipuler les normes et les distances sans confusion.",
        "Identifier et utiliser la compacité.",
        "Comprendre la complétude comme une propriété de Cauchy."
      ],
      "toc": [
        "Normes et distances",
        "Ouverts et fermés",
        "Suites et adhérence",
        "Compacité",
        "Complétude",
        "Théorèmes de point fixe"
      ],
      "sections": [
        {
          "id": "normes",
          "kicker": "01 · Mesurer",
          "title": "Toutes les normes ne se valent pas",
          "paragraphs": [
            "En dimension finie, toutes les normes sont équivalentes. En dimension infinie, ce n’est plus vrai, et les phénomènes topologiques deviennent beaucoup plus riches. C’est là que la prépa bascule vers l’analyse fonctionnelle.",
            "Une norme doit satisfaire trois axiomes : positivité définie, homogénéité et inégalité triangulaire. Vérifier ces axiomes est un classique d’oral."
          ],
          "formula": "\\lVert \\lambda x \\rVert = |\\lambda|\\,\\lVert x\\rVert",
          "note": "L’équivalence des normes n’est pas l’égalité des normes. Elle dit seulement que les notions de convergence et de continuité sont les mêmes."
        },
        {
          "id": "compacite",
          "kicker": "02 · Contrôler",
          "title": "Être compact, c’est être borné et complet",
          "paragraphs": [
            "En dimension finie, compact équivaut à fermé borné (Bolzano–Weierstrass). En dimension infinie, cette équivalence tombe : la boule unité fermée d’un espace normé n’est jamais compacte sauf en dimension finie.",
            "La compacité est une arme d’existence : une fonction continue sur un compact atteint ses bornes, une suite d’un compact admet une sous-suite convergente. C’est souvent le chaînon manquant d’une preuve."
          ],
          "formula": "K \\text{ compact},\\ f \\in \\mathcal{C}(K,\\mathbb{R}) \\Longrightarrow f \\text{ est bornée et atteint ses bornes}",
          "note": "Garde en tête le théorème de Riesz : c’est lui qui explique pourquoi la dimension infinie change tout. Un énoncé de compacité doit toujours préciser l’espace ambiant."
        },
        {
          "id": "complete",
          "kicker": "03 · Converger",
          "title": "Complet, ou l’assurance de converger",
          "paragraphs": [
            "Un espace complet garantit que toute suite de Cauchy converge. On peut alors montrer l’existence d’une limite sans deviner sa valeur à l’avance. C’est le cœur des théorèmes de point fixe.",
            "L’incomplétude classique de <span class=\"inline-tex\" data-tex=\"\\mathbb{Q}\"></span> montre que la complétude n’est pas une évidence : elle dépend du corps et de la distance choisis."
          ],
          "formula": "\\text{Toute suite de Cauchy converge} \\iff (E,d) \\text{ est complet}",
          "note": "Pour appliquer Banach, il te faut une application contractante d’un espace complet dans lui-même. L’hypothèse de contraction stricte, avec un coefficient <strong>k &lt; 1</strong>, est indispensable."
        }
      ],
      "exercise": {
        "prompt": "Montrer que dans un espace normé, toute suite convergente est de Cauchy. La réciproque est-elle vraie ?",
        "answer": "Vrai : utiliser l’inégalité triangulaire. Non : Q n’est pas complet."
      }
    }
  ],
  "exercises": [
    {
      "id": "nilpotente-inversible",
      "title": "Quand nilpotence rime avec inverse",
      "subject": "Maths",
      "tag": "Algèbre",
      "source": "Oral X · 2023",
      "level": "MP*",
      "stars": 4,
      "minutes": 25,
      "equation": "A^3 = 0 \\Rightarrow (I+A)^{-1} = I-A+A^2",
      "teaser": "Un énoncé court, une preuve élégante et une leçon à garder pour la suite.",
      "statement": "Soit <span class=\"inline-tex\" data-tex=\"A \\in \\mathrm{M}_n(\\mathbb{R})\"></span> telle que <span class=\"inline-tex\" data-tex=\"A^3=0\"></span>. Montrer que <span class=\"inline-tex\" data-tex=\"I_n + A\"></span> est inversible et exprimer son inverse comme un polynôme en <span class=\"inline-tex\" data-tex=\"A\"></span>.",
      "hint": "Pense à l’identité remarquable <span class=\"inline-tex\" data-tex=\"(1+x)(1-x+x^2)=1+x^3\"></span>.",
      "solution": [
        {
          "title": "Faire apparaître la relation",
          "text": "On calcule le produit <span class=\"inline-tex\" data-tex=\"(I+A)(I-A+A^2)\"></span>. L’identité remarquable tronquée donne un reste cubique.",
          "equation": "(I+A)(I-A+A^2)=I+A^3=I"
        },
        {
          "title": "Conclure l’inversibilité",
          "text": "Comme <span class=\"inline-tex\" data-tex=\"A^3=0\"></span>, le produit vaut l’identité. De même, dans l’autre sens, le produit vaut l’identité. Ainsi <span class=\"inline-tex\" data-tex=\"I+A\"></span> admet un inverse à gauche et à droite, donc est inversible.",
          "equation": "(I-A+A^2)(I+A)=I+A^3=I"
        },
        {
          "title": "La morale du problème",
          "text": "Toute matrice nilpotente est « proche » d’une matrice invertible : <span class=\"inline-tex\" data-tex=\"I+A\"></span> est toujours inversible. La preuve est un exemple modèle de troncature polynomiale."
        }
      ],
      "answer": "I_n - A + A^2",
      "solves": 1284,
      "verified": true
    },
    {
      "id": "sinus-racine",
      "title": "Un sinus qui joue avec les racines",
      "subject": "Maths",
      "tag": "Analyse",
      "source": "Mines-Ponts · 2022",
      "level": "MP",
      "stars": 5,
      "minutes": 40,
      "equation": "\\sum \\sin\\!\\left(\\pi\\sqrt{n^2+1}\\right)",
      "teaser": "Une série aux allures inoffensives, un développement asymptotique décisif.",
      "statement": "Étudier la nature de la série <span class=\"inline-tex\" data-tex=\"\\sum_{n\\ge 1}\\sin\\!\\left(\\pi\\sqrt{n^2+1}\\right)\"></span>.",
      "hint": "Écris <span class=\"inline-tex\" data-tex=\"\\sqrt{n^2+1}=n+\\frac{1}{2n}+O(n^{-3})\"></span> puis regarde la parité de n.",
      "solution": [
        {
          "title": "Développer la racine",
          "text": "On factorise par n et on développe en puissances de 1/n². Le terme principal permet de comprendre le comportement de l’argument.",
          "equation": "\\sqrt{n^2+1}=n+\\frac1{2n}+O\\!\\left(\\frac1{n^3}\\right)"
        },
        {
          "title": "Séparer selon la parité",
          "text": "Pour n pair, le sinus est proche de π/(2n). Pour n impair, il est proche de −π/(2n). Dans les deux cas, le terme général est équivalent à ±π/(2n). En regroupant par paires, la série se comporte comme une série harmonique alternée.",
          "equation": "\\sin\\!\\left(\\pi\\sqrt{n^2+1}\\right)=(-1)^n\\frac{\\pi}{2n}+O(n^{-2})"
        },
        {
          "title": "Conclure avec précaution",
          "text": "La série brute ne converge pas absolument. Après regroupement par paires, on obtient une série convergente par le critère spécial des séries alternées. On en déduit que la série initiale converge."
        }
      ],
      "answer": "Convergente, mais pas absolument.",
      "solves": 846,
      "verified": true
    },
    {
      "id": "marche-aleatoire",
      "title": "Le retour du marcheur",
      "subject": "Maths",
      "tag": "Probabilités",
      "source": "Épreuve X · 2021",
      "level": "MP",
      "stars": 4,
      "minutes": 35,
      "equation": "\\mathbb{P}(S_{2n}=0)=\\binom{2n}{n}2^{-2n}",
      "teaser": "Une marche aléatoire, un coefficient binomial et un équivalent à retrouver.",
      "statement": "On lance une pièce équilibrée à chaque étape : <span class=\"inline-tex\" data-tex=\"S_n\"></span> est la différence entre le nombre de piles et de faces. Montrer que <span class=\"inline-tex\" data-tex=\"\\mathbb{P}(S_{2n}=0)\\sim \\frac{1}{\\sqrt{\\pi n}}\"></span>.",
      "hint": "Exprime l’événement en termes de coefficients binomiaux, puis utilise la formule de Stirling.",
      "solution": [
        {
          "title": "Compter les chemins",
          "text": "Revenir à zéro en 2n pas signifie avoir exactement n piles et n faces. Le nombre de trajectoires favorables est donc le coefficient binomial central.",
          "equation": "\\mathbb{P}(S_{2n}=0)=\\binom{2n}{n}\\,\\frac{1}{2^{2n}}"
        },
        {
          "title": "Appliquer Stirling",
          "text": "On remplace les factorielles par leur équivalent de Stirling, puis on simplifie les puissances de 2 et de n.",
          "equation": "\\binom{2n}{n}\\frac{1}{2^{2n}}\\sim \\frac{4^n}{\\sqrt{\\pi n}}\\cdot\\frac{1}{2^{2n}}"
        },
        {
          "title": "Conclure",
          "text": "Les puissances se compensent et on obtient l’équivalent attendu. La probabilité de retour tend vers zéro, mais assez lentement pour que la marche soit récurrente en dimension 1."
        }
      ],
      "answer": "\\sim \\frac{1}{\\sqrt{\\pi n}}",
      "solves": 1102,
      "verified": true
    },
    {
      "id": "lunette-astronomique",
      "title": "La lunette, sans faux foyer",
      "subject": "Physique",
      "tag": "Optique",
      "source": "CCINP · 2024",
      "level": "MP",
      "stars": 3,
      "minutes": 30,
      "equation": "\\alpha' = -\\frac{f'_{\\rm obj}}{f'_{\\rm occ}}\\,\\alpha",
      "teaser": "Grossissement, cercle oculaire et condition de vision confortable.",
      "statement": "On considère une lunette astronomique afocale constituée d’un objectif de focale <span class=\"inline-tex\" data-tex=\"f'_1\"></span> et d’un oculaire de focale <span class=\"inline-tex\" data-tex=\"f'_2\"></span>. Déterminer le grossissement et la position du cercle oculaire.",
      "hint": "Le foyer image de l’objectif coïncide avec le foyer objet de l’oculaire.",
      "solution": [
        {
          "title": "Schéma avant calcul",
          "text": "La lunette est afocale : le foyer image de l’objectif et le foyer objet de l’oculaire coïncident. Un rayon parallèle à l’axe émerge parallèle à l’axe."
        },
        {
          "title": "Relier les angles",
          "text": "Pour un objet à l’infini, le grossissement compare les angles sous lesquels on voit l’image et l’objet. La relation de conjugaison pour l’oculaire donne le facteur de rapport des focales.",
          "equation": "G = \\frac{\\alpha'}{\\alpha} = -\\frac{f'_1}{f'_2}"
        },
        {
          "title": "Placer le cercle oculaire",
          "text": "Le cercle oculaire est l’image de l’objectif à travers l’oculaire. Sa position s’obtient par la relation de conjugaison appliquée à l’objectif vu par l’oculaire.",
          "equation": "\\overline{O_2 A'} = \\frac{f'_2(f'_1+f'_2)}{f'_1}"
        }
      ],
      "answer": "G = -f′₁/f′₂ ; cercle oculaire derrière l’oculaire.",
      "solves": 634,
      "verified": true
    },
    {
      "id": "effet-tunnel",
      "title": "Traverser l’interdit",
      "subject": "Physique",
      "tag": "Quantique",
      "source": "Mines-Ponts · 2023",
      "level": "MP",
      "stars": 5,
      "minutes": 45,
      "equation": "T \\approx 16\\frac{E(V_0-E)}{V_0^2}e^{-2\\kappa a}",
      "teaser": "Une barrière, des exponentielles et une probabilité qui ne s’annule jamais.",
      "statement": "Une particule d’énergie <span class=\"inline-tex\" data-tex=\"E&lt;V_0\"></span> rencontre une barrière rectangulaire de hauteur <span class=\"inline-tex\" data-tex=\"V_0\"></span> et de largeur <span class=\"inline-tex\" data-tex=\"a\"></span>. Justifier qualitativement l’effet tunnel et donner l’expression du coefficient de transmission.",
      "hint": "Dans la barrière, la solution est une combinaison d’exponentielles réelles. La continuité impose un recouvrement non nul.",
      "solution": [
        {
          "title": "Écrire l’équation dans les trois zones",
          "text": "À gauche et à droite, les solutions sont des ondes planes. Dans la barrière, l’énergie cinétique est négative : les solutions sont exponentielles.",
          "equation": "\\psi_{\\rm II}(x)=Ae^{\\kappa x}+Be^{-\\kappa x},\\quad \\kappa=\\sqrt{\\frac{2m(V_0-E)}{\\hbar^2}}"
        },
        {
          "title": "Raccorder les solutions",
          "text": "Les conditions de continuité de ψ et de sa dérivée aux deux interfaces donnent quatre équations. Le coefficient de transmission est le rapport des courants de probabilité à droite et à gauche."
        },
        {
          "title": "Lire le résultat",
          "text": "Le coefficient décroît exponentiellement avec la largeur et la hauteur de la barrière. Il n’est jamais strictement nul pour une barrière de largeur finie : c’est l’effet tunnel.",
          "equation": "T\\sim e^{-2\\kappa a}"
        }
      ],
      "answer": "T ≠ 0, décroissance exponentielle avec la largeur.",
      "solves": 488,
      "verified": true
    },
    {
      "id": "sous-tableau-somme-nulle",
      "title": "Le sous-tableau qui s’annule",
      "subject": "Informatique",
      "tag": "Algorithmes",
      "source": "ENS Info · 2024",
      "level": "MP",
      "stars": 4,
      "minutes": 20,
      "equation": "\\text{sommes préfixes} + \\text{dictionnaire}",
      "teaser": "Un problème de tableau qui se résout en un seul passage.",
      "statement": "Étant donné un tableau d’entiers, déterminer s’il existe un sous-tableau contigu non vide dont la somme est nulle. Proposer un algorithme en <span class=\"inline-tex\" data-tex=\"O(n)\"></span> temps.",
      "hint": "Deux sommes préfixes égales signalent un sous-tableau de somme nulle.",
      "solution": [
        {
          "title": "Sommes préfixes",
          "text": "On note <span class=\"inline-tex\" data-tex=\"S_k=\\sum_{i=0}^{k-1}a_i\"></span>. Un sous-tableau de i à j a une somme nulle si et seulement si <span class=\"inline-tex\" data-tex=\"S_i=S_{j+1}\"></span>.",
          "equation": "\\sum_{k=i}^{j} a_k = 0 \\iff S_i = S_{j+1}"
        },
        {
          "title": "Un dictionnaire",
          "text": "On parcourt le tableau en maintenant la somme courante. À chaque étape, on vérifie si cette somme a déjà été rencontrée ; sinon on l’insère dans un ensemble. Initialement, la somme 0 correspond au sous-tableau vide.",
          "equation": "\\texttt{if s in seen: return True; seen.add(s)}"
        },
        {
          "title": "Complexité",
          "text": "Chaque élément est traité une fois et chaque opération de dictionnaire est en moyenne constante. Le temps total est linéaire, l’espace auxiliaire est au pire linéaire."
        }
      ],
      "answer": "Un dictionnaire de sommes préfixes donne O(n).",
      "solves": 972,
      "verified": true
    },
    {
      "id": "matrice-trace",
      "title": "La trace ne ment jamais",
      "subject": "Maths",
      "tag": "Algèbre",
      "source": "Centrale · 2023",
      "level": "MP",
      "stars": 3,
      "minutes": 18,
      "equation": "\\operatorname{tr}(AB)=\\operatorname{tr}(BA)",
      "teaser": "Une preuve courte et un critère d’impossibilité très utile.",
      "statement": "Montrer que si <span class=\"inline-tex\" data-tex=\"A,B\\in\\mathrm{M}_n(\\mathbb{R})\"></span>, alors <span class=\"inline-tex\" data-tex=\"AB-BA=I_n\"></span> est impossible.",
      "hint": "Prends la trace des deux côtés.",
      "solution": [
        {
          "title": "Une égalité de traces",
          "text": "La trace est linéaire et vérifie l’identité de cyclicité. On en déduit que la trace du commutateur <span class=\"inline-tex\" data-tex=\"[A,B]\"></span> est nulle.",
          "equation": "\\operatorname{tr}(AB-BA)=0"
        },
        {
          "title": "Contradiction",
          "text": "La trace de l’identité vaut n, qui est strictement positif. L’égalité demandée impliquerait donc 0 = n, ce qui est absurde.",
          "equation": "0 = \\operatorname{tr}(I_n)=n"
        },
        {
          "title": "Généralisation",
          "text": "Dans un corps de caractéristique non nulle, l’argument tombe. C’est un rappel utile : une preuve dépend toujours de son contexte."
        }
      ],
      "answer": "Impossible car tr([A,B]) = 0 ≠ n.",
      "solves": 1560,
      "verified": true
    },
    {
      "id": "suite-convergence-uniforme",
      "title": "Une limite qui n’aime pas le sup",
      "subject": "Maths",
      "tag": "Analyse",
      "source": "CCINP · 2025",
      "level": "MP",
      "stars": 4,
      "minutes": 30,
      "equation": "f_n(x)=x(1-x)^n",
      "teaser": "Trouver la limite, puis comprendre pourquoi la convergence n’est pas uniforme.",
      "statement": "Pour <span class=\"inline-tex\" data-tex=\"x\\in[0,1]\"></span>, on pose <span class=\"inline-tex\" data-tex=\"f_n(x)=x(1-x)^n\"></span>. Déterminer la limite simple et montrer que la convergence n’est pas uniforme.",
      "hint": "La limite simple est nulle partout. Pour l’uniformité, évalue en <span class=\"inline-tex\" data-tex=\"x=1/n\"></span>.",
      "solution": [
        {
          "title": "Limite simple",
          "text": "Pour x = 0 et x = 1, la suite est nulle. Pour x ∈ ]0,1[, (1−x)^n tend vers 0, donc f_n(x) tend vers 0."
        },
        {
          "title": "Un contretemps",
          "text": "On évalue la suite au point 1/n, dans [0,1]. La valeur ne tend pas vers zéro.",
          "equation": "f_n(1/n)=\\frac{1}{n}\\left(1-\\frac1n\\right)^n\\to \\frac1e \\neq 0"
        },
        {
          "title": "Conclusion",
          "text": "Une suite peut converger en tout point sans que la distance uniforme à sa limite tende vers zéro. C’est exactement le fossé entre convergence simple et uniforme."
        }
      ],
      "answer": "Limite nulle, mais convergence non uniforme.",
      "solves": 745,
      "verified": true
    },
    {
      "id": "gaz-parfait",
      "title": "Le détour par l’entropie",
      "subject": "Physique",
      "tag": "Thermodynamique",
      "source": "Oral Centrale · 2022",
      "level": "MP",
      "stars": 3,
      "minutes": 20,
      "equation": "\\Delta S = nR\\ln\\!\\frac{V_2}{V_1}",
      "teaser": "Un gaz parfait, une détente et un bilan qui repose sur une fonction d’état.",
      "statement": "Une mole de gaz parfait subit une détente isotherme réversible à température <span class=\"inline-tex\" data-tex=\"T\"></span> de <span class=\"inline-tex\" data-tex=\"V_1\"></span> à <span class=\"inline-tex\" data-tex=\"V_2\"></span>. Calculer le travail reçu, la chaleur reçue et la variation d’entropie.",
      "hint": "Pour un gaz parfait, U ne dépend que de T. Utilise l’identité thermodynamique.",
      "solution": [
        {
          "title": "Bilan d’énergie",
          "text": "La transformation est isotherme et le gaz est parfait : ΔU = 0. Le travail reçu vaut donc l’opposé du travail des forces de pression.",
          "equation": "W=-nRT\\ln\\frac{V_2}{V_1}"
        },
        {
          "title": "Chaleur",
          "text": "Par le premier principe, ΔU = Q + W, donc Q = −W. Le gaz reçoit de la chaleur pendant la détente."
        },
        {
          "title": "Entropie",
          "text": "L’entropie est une fonction d’état. Pour un gaz parfait à température constante, l’identité thermodynamique donne le résultat.",
          "equation": "\\Delta S = nR\\ln\\frac{V_2}{V_1}"
        }
      ],
      "answer": "W = −RT ln(V₂/V₁), Q = RT ln(V₂/V₁), ΔS = R ln(V₂/V₁).",
      "solves": 518,
      "verified": true
    },
    {
      "id": "dichotomie",
      "title": "Couper en deux, conquérir",
      "subject": "Informatique",
      "tag": "Algorithmes",
      "source": "Oral X · 2022",
      "level": "MP",
      "stars": 2,
      "minutes": 15,
      "equation": "T(n)=T(n/2)+O(1)",
      "teaser": "La dichotomie, ses invariants et le piège des bornes.",
      "statement": "Écrire une recherche dichotomique itérative qui renvoie l’indice d’une valeur dans un tableau trié, ou −1. Prouver la terminaison et la correction.",
      "hint": "Maintiens un invariant sur l’intervalle [g, d] et réduis strictement sa taille à chaque itération.",
      "solution": [
        {
          "title": "Invariant",
          "text": "On maintient que si la valeur est présente, alors son indice appartient à l’intervalle de recherche. La valeur médiane permet d’éliminer une moitié."
        },
        {
          "title": "Terminaison",
          "text": "La quantité d − g diminue strictement à chaque itération. Elle est minorée par −1, donc la boucle termine.",
          "equation": "T(n)=T(n/2)+O(1)=O(\\log n)"
        },
        {
          "title": "Pièges",
          "text": "Attention aux débordements arithmétiques dans le calcul du milieu et à la mise à jour des bornes. Utilise <span class=\"inline-tex\" data-tex=\"g + (d-g)//2\"></span> plutôt que <span class=\"inline-tex\" data-tex=\"(g+d)//2\"></span> dans les langages à entiers bornés."
        }
      ],
      "answer": "Recherche dichotomique en O(log n), avec invariant et terminaison.",
      "solves": 2034,
      "verified": true
    }
  ],
  "papers": [
    {
      "id": "x-ens-2026-d",
      "school": "X/ENS",
      "short": "X",
      "year": 2026,
      "subject": "Maths",
      "title": "d",
      "track": "MP",
      "duration": "4 h",
      "difficulty": 3,
      "parts": "2 problèmes",
      "hot": false,
      "correction": false,
      "color": "lime",
      "pdf": "data:application/pdf;base64,JVBERi0xLjQKJcfsj6IKNSAwIG9iago8PC9MZW5ndGggNiAwIFIvRmlsdGVyIC9GbGF0ZURlY29kZT4+CnN0cmVhbQp4nO09y64sV3WIzI7yET1Lt3CX9/uBBBLGTmKEwVzfJAScgbkYQ/AFbExiIAwyzgdkku9ASgbM8xdMb74ia+3nWrt2VXdfn8aKlCDltuvUfq33a6/66CAWeRD4v/Lvs+cPrz7xhw9++SAOHzx89CDTHw/ln2fPD689hRfCwS/OSu0OT3/0kAfKg46LlzEegtKLDIenzx++f/z6ySzOCRmPPz6dxeKEDdYdPz7ZxUYb4vEnp7NatFDRH395OvvFe6n08RMcZZxTx5/Dm95JoY6/OKlF+AC/ykxOWXt8H8ZHWM6b42s43lmnHTw1S5DSW7JSn/M9eCZVMOb4K3imo4b3PsQ5tdBSeXgzzan18d/hV3CLUO741kkvRngfy3DvTJnSG76lF23x56ezXqLw0q4G2aDb2aU/foQ/lQ6w976nfgoAjRYACOPJw5/BGB9g/kg29/bp7GAjJsbjOycPAPMAzjdPZ7toa2T8h6ffeNASZgiAsac/BAS9DmCNysZAZv4nGAm/ZAG/jXDCslntPcAUdhMWYeXxj7gHD+DXDILvlcdRVxgEX2AAIzWdLGPdRYBMxrVysh1NW7pCxqVzkQEBEBWCs8cfnmD5aB0Mzy/CVhp52Fj357QM6TFMapyv+7N2TTW40rOTW4ITyrJJ8b0gdV4zROUTIWshFhXCUTbAO1xeLBHIv1C3gtP38YmmgzCSUEX/a96alNEcf9BAMz2baiuK9kuRXZRfiP1XnwArA4N6YApk3rOSctHqcDZ2CUaoShUALBGNBsi0UTIuQrvM8sBpOjYiegOoDoYjS/0N/DTwXlDH757ORsEBYQvfhqcSkGg9vmBUBEaNx6dpmAyA5ifwE6CnBHsXCNfBBNo7oGYY5pcY3PEbaQkrga3Iu99M70rjAx1Wd6Z9nkGCNHL0hdfTC86G43/3V9koYGwXjXUIhzPwDgA8HAD0S/DR5/O/k+bTeCZy/ie4IEJV9s2p1Y7ymb6Vzh8tcAQ501tpmDXAR6+lYYCgQGE1P97baZgKwKDzd8m8c1iRYRwAKPrjYp1RiXikANIyiXg8vJyh8fTkBUoHU/kIJvw5EhSgLAgHrAJk7YVLcg35QwBzJ0ZGgit/liqCHAKm8DYxrCy/ivAGIZMFJY74NPOeEIUj4WEwmcnhFePo0774j1AqKum0Of45cpq0Etj8GT51wYAU6At8CIvCliJqprMBTtQK5TzuyVhTGEQRwEjReONV4HHYcJRr8AGj17fyCrgtCqkMFAs674MkC2AcPff7dQfkWRXOANIvw5xaxZj4/uziYoKQhzOqZlwSlJu1gG8J9AKLG4R4gX1UiBq5GPjNzvx+VoghWBBJfZ999wVRMCndZh4EcuzL+FMvyqE+hwWERRmfcRotFbxk0Y6yPnvfXhNPHa4xgi7t0knC+GCCVGsMhEWCceLqmx2gZXkZ/WR+CQcHnVBHqTR/NOvp4TBgELUXF8CNMiA6TQO+iAX6Qqg19EPSDDPoF7sG/l7oJenVDPOgGr04EENk1B74kaX6rCvw4646ePr+ZuDRBoQPh/4MOgPw/1i3MZnSI8D7q/oxIK5AwKazJSiVE4F5OoW4IrxYIC6sJrDpoCNjCLzJpGR8RhgYLcnodAFe1YWbdMMcWE9FgmmQKwULaDBl+Si13doScOdi4cALDEkclCSBBqWMGh90k0VdliD1bRgGiwFu0fgKNpnUXShTqVSOgtbI+4MMNAQV2jEufBtOoIQ3Qs8ogWGti5O/wEEWhxEV0HdFhFSnzeenpIpBGaxFFIrwZDeBMGw2Y9EWRLSgcWiNXuM8TTVfgFqn41Rg/xF+y28CBlebBuN0ym6duAiZLvkcoMAK8qxy2XJWYJxpqsmojOhnyuQDPlFhA3A6yJr9veoPmUCN7C41+pv1vKBSyepVEWs2vq/U90H3SekYKQZ8lMWYSiIfndDIst4QFqrsIlf6qIistDe2YcI3haotNTFGKZhARMawkxe8FE5wVHrBW+gYg94wujLcd9EhAAbRRS2BWgbPLYJUwyEClTW4u8ClMuvtNOgXKNY9+GuyMRwZpJcmIX+PO3dWy+nsYEjWF3+GGLFe+4l94tImwgE8BNFcgy5+CnTAfJ+cuepIdua/T1BS0YT5mQO8CTj+fM/skyhiZybS90U7fkK5FSI6QqtF70ovCXF0kK2ZCmz0qWxvUshSnie0lyUGuL7k10pBF3oEzwCM+ARXR7Fok7JTQSS1uJaGIGyriQ7SrIiw4CURdlQwkgm69dfNecJNhBlfTGyuqRhazY483zwIkyIFoGwNAG9UINJoN52TgPYWBbKt9KRN6OdKDz38/K7iRo1L7FXeffddFJkgxE2c8NNgLP3nCVkkTExay19E8yvb9q9QIyBxB7GYC6c3BimDJhsBn4m++l+bGwEnBNm5vjgV/Y3KN+yrjAoMhv2gP6SmFp0I6QDE90rT9jc9UHmf8qKm1UJhLI282DdZvEcLlPFiMnrUqLhyp9r1KoCf0f6lsJQGOENtoCdsY2fJqle4gEavwxCkZ/Y+QA220rgDJc+n8Cv/eWQJFDEFujDhykwFacFczoFwQPpEmAQ9UGAKqgQNYGsmsmElnYQxCq4UWqYKwUl7nUIgjgLTBwxSsumEo0g/ra1aKnC1BrohDLyF773x9OE7Dx8drE/ri8PZwXsAcvCEnAwR/332/OG1Nx9effOtwycf/+r9h1f/7iAfXv1r/H+vvf11+OfN1w9feHjjzcN3NuPunChK3F0GROzBgdsfXA67/wIwZwOIkiJ2FONLB4pNHzyGHkU5ylcwbmyM8xNGlimCGQ9VNW6f3dSTK6AQkG6PePLZwWGVtAg5uOKsMRw8Y5wd/EsooYMN1dHnUjGCne5vOjhYdDD9vQ+uYA8c4/qRD550yC0HN8lou/fBjVpwX+Tgdv/gICfifQ/uhMZ8yp0P7sCOZuf2dFcKGQEMZnbQVTQLLK+JXNbiFsfkkWQy+Hs3yWQ1mOyD9aKSpQE2uyJuw7YI9Om4zTQpws/HiUKNhRJIrG+L2gBq9bU9GguAiSGWtT2joPC4YdY9rnj5Wf1dZu0mavoFJsIqYgUedIpda6ACV70yFrLCoFbQ1EehngkLFJ01EEqMuyElMMJXPgz6E6vYlw0zivQSrfBGDp8iMBQ4AnLGUq6Qr87+bx7y69M5AFS8mNMv8B97/YL+TuGHMcg995KtElru74WNMNyL+TABKGBw9WfJn3HBTAXJQC+f4gGicTWAEibsyo9M7HyKamplA1WA36v9JPpK3iVo7/EblqdBbSv0FjaVmeja8u5Xd0TLgBeRiVh5uye56QRKpLhpneDXeAbvo5r4moP7qEZX00zEaXn3CQLMS6xzmIVLIp03x9tTFDtXfkhppqcZguyZI1kSv3tVJTunLPW/uk/WA3f9GYvRZdmgNE2ivZgEA2Z+XPeVekyh+3YsfHDWGvPsirz5Hq4NooCl8tYxRwRCL46Ypl4mB9KxBlk9yRn0ecjmyM8+ZQ6hBhVZCHWUDZTawhK5SJPRqmkoL6Vh5CDS9sJuploVbMQrmTJcjNPd/qRwjKEh3RzxAZqs0BfO8xBbIlHLmP5CcCjH0LBCApxXCdZeNTIKeVjcFeAfNmYp/n8Nv7KCKZjCGPqLpnUIzZR49pA2xb8CzqlSaqpogiHM3mNNwuUwwZBwmcUNkQ61DCB6NdkUEp+26ZgjyNyEdHnStiSkkpTQbgnHr50AE7AROZEMW2HAPfYYEhyvlHXEyJMaDFJj5jzZySvnJVievU+TfrmQ0n3axAWNlsfPK8xCQVhQdL1lkVx9nUp7NNPmVk3Y0BM27CPGmouSrxw0agL+EAEbk9kVWMptxgO18nAAGq7tAakefKJrEpqdJaU6AnaVPKbS1srUuWnimnHPriDtkrmIAKXmGaT9WcgZX8kw1DQqR0vrCNgzLCPVDoX4FYFlx9mL2Xqz7EVXPO2v2VAPDswKEJIscYKWYxKQBswFrTaKXap2jquCBMwzTNMItabUyZaVdT4RGVZbebMiIqwx6ZKprGitaYQJxmRGBNjSq0qbua2PNVBmix933B7ik8yro1AAg+lZsjBDNQ6KxxE6OIjkXaeCtCeaR+EKx0tLWgeWuZmY10ivhJdXFhgXZz86abUYnGnpYvgvT16BdwCqouN4Zsn1oDlSsUXzza6yOqjj+4slIA++GY3N/3yWNqiAVVwINTneBP9mZD9tl9ilNIEA+8W409SIJEDt8/ww57cxhrNWyNv4KrINBACywFo2cmVW9zXLt/M3CeufazifiJr/mSQFWNoSmBCFE0kPUOkOuAQThQgsgrcMUBMjBd5MyK0IDit48mGENcqORlzK0mYBZUCqu8GKI9xVwCA0YalehrijXrIjQ7KmOa0jc0pEC5viINLy+jswhyQA/5t42iC1bzarV+uCEllzLigFt42J7SrCmcmIKegYPrs5sRWoyE4+tycuBCvWZummiwFKeHczQ6TizlGKme20aVoLNNZZhnlmMjfvVREOpZUFzXW+p3N7i+Wa/QM/ilZ0uYwc7HDwKPHhLKFLX3wUs9mnXNFVdE6CYB2Ro/d6PZ1vBX+uo3Ok2t2NXBGNK57bLp2ra2jcTGl86W76G0g0uZIaSQFP6S11v6l7XsX51KsYiaJqFzBpvTRrsctJe0M3URu67PgKvZmCiOFiCeeueyHB7BZhK3oyhBBZrO7GEKKIi1e0kmhVpsUq+EEKY/bqLB1JAQ2RA7VTirsbSQzplkgzjr+VI4ngBkzuEgyJli8DMLF0wazrbRjhAm6wzORSpOlRAtabLMJkQa2a2w/QDy5EBv5WgFlM1Ex594spz+Kln5bV+iE4K8EOB01Df7GiILaSVDnZsrHSXgHRSr6yQhCdSxAOABHZ06z/gogwML0jeVYJyq+kWgFI4SBNSMXlwHv6kUoqWNViLalwArWFBWZSJd/627a942/yz5Cd3q2detDw4v47DQoNWrrT3zFArhK4WoA6FfpwruRxmWUcEkInpE+Qlq11KUIBqs8a09wrj1fqQDZ6gxdv8p8xW/bLFApVeqZUSn1JupdYbXKWNKgVinOfdFJXNaFQ8EbT7PPg6GcQcYzHvpdAo/q9FHOwi9fBZqTh9Szna04fPG0gfit9uy778SDreW1hqwVIpoyVYGeVcd/ay9F8zpL1Mxkf10vWuX6UWDVxqZjDNc51h3RdJLFtSNdk71SzBUYEVrNbsIB1RuGu0A/FImX1HV+8PsXeBL7kP28U/vO1svayN8LZWZEF+X3h7GwWj5tw5qoJ64uScJyppkHgG8cEvsZbMwaVBga+7ibwMXIFQkOoJjR+23a3oZnGjVqdQX/njTqfdWjf6e/Y9hLFMc1kc/0O10xfQP4OQaoNX41VGV9QY8xIWamxfr/au6LFlFV6pcXgBGsuUCFfeFASU+Kq8h0rY5E+BZ9QA7fKKRIGKiW6QW8UKdRy3ZYuwy2VV5Ux5tp6But3gz68nriBdq9+fJD8E1nGb2IIQBpXLOC6RERGvR7GPKKKZC74v7oTRhp0nsjXooSP3LDgdzx5mi1X1PF0UCuu2LjGuwejoTB/nHEFowvwEWwHcZI9L3ZLS/Tt2S1P9l2z9h6/UyxBnjiDIU1SCtgjN0M8RqVbNcZ7nBMv++D/FWERy+1kWB9UU5YW7x5hvLDCTF2mav8KgzfQcZw1GxJ+GsQ0SA0ubgYxN7cqwU4Fqcl2euI7ZVZL26kSdVzd6SWnMK4TklMKdJzaNzEwzr+ZRn4JEaA0s6+vK3m7hARWQxqooP9S1gpabASH/cBrfGZxSD6/LBMnglClLr6wG74AKmyCUIPXZoE0zszgGc3QEdb25nrAGXCsmvk2labPbMgjrHIzoBhFlAg9h9PdaUgplAhu/yw1hX8D0rOG20f6ntzA+0ngBt4s4VQE8e5uk3BXYHZnp5ibGHd6Wu2UrNhMPok3BQ8GVW0ZeImi0k5ViRNeTVFoLyELziiKoQ1bURHG2wW44VXh4IpK8FiC9xfsGYAjemcc3kVf+6kjq7CpEkoQNmQfxqYEJS5hdeIusyGfs5zKdtyunFpbQruQ5ZvSvCB1r9gJaGPcypVR85SD6Kp5Fc3fP0BxaEyYxufmqivUl0cMp2n3MczTEFfe5ZJSJbM2OesmyBR1NS7aO15kMyHd7jF4098RSbdZZlrpqcqFyxCrd24rN81ZwjHjt1wI1/XS4r8iaWgwq6YFdE1NmB6puRQMAfctYhDkzvC1cAav9uHrJmalEuRezb8Npx8x4lOgCtvZ9fOPKGFx2RSViM194C6zAaWZOgIIZIuCgOontwIWaYIfeiAFMHyd2qsdR/u4t0jBjCBeYo01vY4Tkdvj8ysG8yZIs0T+b3B+i8Wu885HmNr0fglRTwvQyE5oMS6tAwh+Ubxx07xpCa0ogjVBypn5Fedt2JWLzXlNb7eLHIJcZLBbzYZgdbA8pPvMZf9IKnhDLoRmOw41CR40q4xD+UFI9se0+GHWj4WWp7Wjk62XZjVebtdqILQVKzyn1ex18eFuRBm07ufCC0h7N6CuxXpCnDSmuFBV3UcvhSdyxzy1JB2NYX3EmzGr3HpuhtFq0jTN+0+3/AxfTcp8SoAXcvxkdoYkeLZ4PfTVSNKk0kirTy1c0ekySsL+nY/JtbJeIbbqeiYDJerZn5HLDVCJu41NhwI6vMvS97ZiWMkK4Da6p6V5YJfkYsLePvBXva4QWW1QL+joSEASwXwb77AxlH4kIUCqlqYF49MiJI5trFeNq1JO3Cit+GYV4x22vRvE+0WKSGC2JkUqvkxrQJHGj3WAnlX3k6sBE7GITAWLICkNxTJYNxVYBW+fsxGOnB+U7o4Vz1ZATjuE8asSWFRu19VYvNPYrBq8nxO1nBOpfPGPpdS8ifd1g5tMg36Cpasa3GTM6Er2VoSpouBL4hirNw39cyUAXiFa+V9HcuWH3MpZNSJDZv8NJq4Nti6ir9J4fS9qJ6XoI1xxqlVgf6vlGa0cXPXvmrfIea88NGFqwoyakNyCJTWvYcgmJiMXlISNqRsOWnvGavjhwKCU8fDxBw/agcNt7AHMHgD54Xl/AHJjAav+Q/IEk9EGXg1wJgn/DZSFqWnMhgTX/vvZg7EeWas9+fAB+GgRrr9jQgRTQLU5+3/nVWGO+sQDsViLc7QnCs3KQ5sTmGwx4LjUVct/P3toOytP4Cx17+VJP36es/93XvXZA8YJYgg+Hv4ZTPh/3APnk7/6f3BeAuePH955SI6MUOC5wxgAnUJYAkxFoshNZwqeYFUHOtjdm3IuJ/o0wNtmb0oCcwoBggNbcp9RUcea6sQ5wINUMvVPNvx+ODbohu3a1AfY6gUMktTb2NrFe5BWT9JPATrh+LWTldgxWGH3ZCuQlz0Z/+3UfjgYGA9TGdgadgx+PY03ziadY7D+yjtsSoy6U4Jy+1puyoztk96Bp+megG47AEn1FmYpcV7yC6dKDYN9W8Ck/sbWJxGDHYk1IEf7yQHBevzb9BAOaMigelTNdsImTd3gvM8ZKFNKyTDt2ppZ8vOutzOHcjtZxG7LeFFBGEthz+fyuSH72+khqLdA995f7fDqQNg6LjlZFqC7LfgnKffSgV8DDziVafKdHHvomeLkLM86GsyzoLS+dOwLZljkgxVN/aHEVPTlUs/WU2MsSGEtYHPzurMyPaQCOAGl9e4JYQii0OL1CZO6keFDUJNiVq6iIuO9t9Aq9eCl+vmliXVNcr+SUS78gIWGanzj5ljp4TqrXls3LEhTzUqNh1KA3dx1TGVCzYj9BA1KmCz08CSN8UiOC54zHjtH0QD59wFEACA1uSE5JOtEw/ArpfpIBR4UG3OmhnU2yCsZPwlouklxG7jmQu7moYcg8EZ2gJ+IrTNunpcPtte+MJRNDTWzY1Vl+taF1pNtDmFtpHmJ4SQQzWOnlaFxHMuo7a5hOXp351U65zxqvG86+xiYTzmPoUSBluuUyKg2tvdQUzGkhlpaKLyXeK/2SjH1NlBRtRzbXqcf1wsi/k/RDE8vcektaqesnkj4w25fpA0O35fh+NUNM7SeTr5rCvTJPbmNqp4Uyf/p5PZeU0MX81czMHFmeQetra6GtROraZ+PeOmGhi/Z4dYdsBCtbfdiG0MXUzM/hZ6Fu18bQy8w+6PQrg7TNoa8GlpiczfPS2L/sHezkFe0bhfJ8OxPaYFM8VvaGLuo5/ilbYxfGsmtQ9rVSB5yN6VYw+Qu7BczV3gptvSpvkJasVuRo8QaMsoCYeCo2L9EccrkfNidKU4ZjRVZexTHQaqTBsM6rnkujCd+3ZAFGwtZh/R+5LpiuG3IxKjIikWlKJVo6N3Fg1rcFUjobQ29Sr1LHw8FUwxgr3rDMDDoXd5IPfXhQlGRVQGRtjuN1IHpQviTcyOzlmSuKr8odrVpOXcVXbo/dG8eAIjsMMBgILIK1gvFNI2Wxym5+8FslD0K3uoaON0oa8I2Wj68uhH4x1iuRi7aMA4voWjSpF5Rd/QxLBji5PWydN4MoFkw85TxnTzP/SY6ntUP7WF+6MF5oViZeSZjV/WrOlvtV3sXMVpGYRaPfl1oINkw2fgtF2C3rmnNq6zH6xUWzZh4ZT1K1uqzOp/PptKR8C83yaUq3bl06QR0rrvjfR8UZRYcOWBOe5VGTyJlt8BlotTl9u2UW5Q6t2drCwGm0kcXbKi7dOXDIoq0Rf0YMIEZmZk5e66SEXg4dsf9hm+R9CDrT5PvCbKzh4rmKvQrN7T8FTtaNGAoA23xQEzaGd3F2OlOY4GPuzvd6YSCPbobT53cbFZ+PAJ0LMKv9aml6BVvceJ3Oql0H6pJaja9fmtj/6s5u35uNr2mn3PZ9IOqkfo5+0G5RPA2P+jRJaa6TVwarME2dydbo/EzNyuyxZzMXcWlCTNZcHdxaXPGjonLXeo5m+VWWYk+onNzWSmCv05W6v6xwmvao2+HxS/Kyu7xGbD6ktN9Z5LzLrl8neR+ilYR3gqdNQeoNLdtn58NlrWm1BBB6zdP2DPAKUVLJ3u9BfmYEOvHahQSIa1/mtYqzcqrSPXVhjmeJh8+UapBWQVpaB3WXr/k3Mwvj1Jbdj8p85p8w3OrayrAEb/0ul3NaYRLnzKc9eH7D3R6wFOhLUJbGz32bcQMYdYf6lc4d0xr92qTVdsnG2q/RzhSbaPLv+iz0SoqF3ZhA4LKOr1/5ewjQBUWrGXotFJz3mMZT4kyxpfGbooBdVoJSU+WT2G9YrWOADi3yFCLxnQgGxp67eXKz/TRrxgC+ung2uGdNdJqP7XyT632BX+WfvXGf70lf/9raL90+yu4vXURME2MiYsXdqtrM0JX2KEajNSPJkqzcTxXaVRxLrhsVZzTD5N1P7l3Bl3VQhYvGqtLgGhIeRTeI/MifTy4E9XlDxXmqYymNtmsJItw5ot5AdUYdagZUTg8+fC0fqws+DsNpWNtY/H580fgFJVTs/Zx5M/j55P55xjbp6c2vtY2q29dfXwZoUYq5zryx62xz7YhgaYvZ1pa3XplEol3qWtxk3jBtr7cuaZMNPtS7GaTtFliVqQr2aLZHVy1XhGCeblIxmD2lbAeS/b+WfoStp1lEzEnxS+vXwiBJKMG/u19FL6HNQJufqeqRix4PP5qB/ZLn8XHH76eo/KWz0oTG3rP85M+Mz52CXL8g5SoPCcksJEdnjnHVieTD4jePFInkKlzbB0aaJjgqz2qxsT18AGKXCrAbL7f77f5SR/rvOGzTdr7lN+499F9aq9Hj37J3F0f/Spfv37FOglqp6/8vAP1LtD9BPrsrvol16g0nZDlx22hJJVZ8vNyj1xyjdoXXi+4RlalINKdicVYjR/y2yWWQSjnYPcsB35N1Uazr/b6RAzVerd8fHLHnjESSySAePCrzhULL1cJUizifFEsf/66fVWXenhB7n2hNl8H7NZj/ki4dZ+lOiTI7JFi1Kwd8lJ1yN6Hn/9kJSIlenBTmUhIVyYO0uUuAHf72mVKh0qwdYO6XCZS7Zary0Tidi8VMMJBCXu3UzsyFM9ucc3LBhJf5vuE+C0E95homeZddNamBCsskV+vQ2+HcazMRt1Z6oCh9I2jfefhfwHozapTZW5kc3RyZWFtCmVuZG9iago2IDAgb2JqCjc1ODIKZW5kb2JqCjI5IDAgb2JqCjw8L0xlbmd0aCAzMCAwIFIvRmlsdGVyIC9GbGF0ZURlY29kZT4+CnN0cmVhbQp4nO09ya5tx1WWkBjcZIBgEhidjDhX8dmuvokUUOwYMErj5plGwCB+sR07z05sJyFTxnwAf4DED0Qig4zhLxjm/QBj1qp2rdq19znnvnsftmQi4XP321W7atXqu/rkIBZ5EPi/8t/HH9289KY/vP/ZjTi8f/PJjUz/eCj/efzR4eVH8EI4+MVZqd3h0Xs3eaA86Lh4GeMhKL3IcHj00c0/HF+5NYtzQsbjj29PYnHCBuuOn97axUYb4vGD25NatFDRHz+7PfnFe6n08ec4yjinjj+FN72TQh1/dqsW4QP8KjM5Ze3xXRgf4XPeHF/G8c467eCpWYKU3pIv9Tl/CM+kCsYcfwHPdNTw3hOcUwstlYc305xaH/8NfgW3COWO37vVixHexzLcO1Om9IYv6Wn7+Ee3J71E4aVdDbJBt71Lf/wEfyodYO19TX0XABotABDGk4cfwxgfYP5IFvf67cnBQkyMx7duPQDMAzhfuz3ZRVsj4z89+usbLWGGACf26EdwQN8BsEZlYyAz/xJGwi9ZwG8j7LAsVnsPMIXVhEVYefwfXIMH8GsGwR+Wx1FXGARfYAAjNZ0sn7qLAJl81srJtjVt6RfyWToXGRDgoEJw9vijW/h8tA6G5xdhKQ09bKzrc1qG9BgmNc7X9Vm7xhr80uNbtwQnlGWT4ntB6vzNEJVPiKyFWFQIR9kA7/DzYomA/gW7Fey+j084HYSRBCv6v+alSRnN8Z0GmuneVPuiaL8UWUX5haf/6qObN27EYmyMDgh3sc4Yq+GHi1HJePj0/RvtzAIPDz4EWPLho/4gyrAEc3hCnmggD3PQcFo6SvjbxCUGYAWwyuDa349vjAWc8v2NJzfG20W4/o4JcRFStTn73/mrMEd9AjxksRbnaE+A+QA3anMGZRcjD+2r5e/HN21l5Qnspa69POnbz3P2v/NXH9+8dwM0A8CJh38G5vfhHjjf/MsvwXkOnD++eesGKUeAGADIAZuKSiEsAaYiYeSWGII/JUyiXKRyyLkFBqZdgFBLYkjdnqQQcgnIK4H3BAUMB8khz6EXpWSSZUYuEscW7oicE5YLzOH78EsvVgOD/wH8BHL0Vh/fTD9FAMb87VsrAe4gXx7BQ9gGSAYyHgbBxoOB8TCV8RKkSgDui+MNiNLj27iuqI3UZV2B7U3AobZlfYycQYQQ2xYcSBd4B1+NiwFQBnjk8tv/BawHMVME3DzwPaeMPb6KTN7BB2dgkHBUKMpPbZK6f+Pa/kGAwnywa9gVSl+rFi9AglWg6AAfOcHmQNx4lEyAPSDZwvCCRUZMp+pA6//6ZhKwIBRUZ2K7+klEUlQz9QTODfaZ8eIHID5AwluTRE6wSZFIMiUaHUEiwVetlEE41ApM4cHv3srFeWML6GCy/jUgNqVjE6//eITJQBz70E61v2uWdqI/gyktMH3fXgPIAyUbfA9gZYTSB0AQ4PbeVyQA4QNT2ThZhknnpw5sxD/erhZDvqIB+Bd8RfAxPn2m7ALILC6gOMiKVIa+bBAHAb9EwyjAwKCUajMDgIOS+d2YJgaMyG//HohKUNqizC9TMALu50XAQqN3BWGfgKCMXjibtBFgBcYElMJyAQCAdM16Fp7yBwAVeBRVPWOtsmIJqh8wS4YFXTPI+obRwbAXMvJYUFP7r6cJX+B466ygsNDx77Z//ywrDCLQ4WV6YVElAL3JoXL4Tn9YdFxDELNNZAOgFuxZWFSmxjc96I59yg6HPk8fUWcEgH4THmoVo57gtAQiUoGjtaq8NnB0iAr0mAHfZMI3r72cYLVLJ+w5Vn8LVV5jfIxr1IgLSB0Qdg0/YYdGqnh8ERaWsGOyBQWchpDw9XtQ+3vI7PmKPTAa05fuwRM5dmYPaX6+B33mHBIl3/UcbNvDAsips4VVfwKDXYadCTLVSZsAa4UX8YzSdOYWeZcH+gYOB6IFzs+iEQJCBPgLPgSiF9Gv16UiE/ffg00rDyjsN2iaMAhqjXRqAfJWSERg0RlYoTGOMJrKU0Qk3Ik8XFGqj64uJNlNxMYZ2RdO1VdX4OboESS9QIKkBK2rQu7vEz8EHUPPJAJYjbagt8yysyATaB+wNGlnXF4vjcP/GtcDwjXO0M4mjS900uT4tpJNFH8+XiPntlD6BuJlCFrsIb+Yc58BHqAWAcTtAQSXmsNCbcHizwZYjBL+/2VvRG0pXAlsA40EMeca/X2Q3HVegpRdgvwS7VnPhGuRvcGsFCjOuXyHROES688PyPN1pBFEfKMmmG8Q4YFLoX6b3/8XPAwNi55pE6j0ZmBwmTFZK9AHhfCwYMYyPRr6fcXfQE4TbJgxpYCsu+tJcmcBJzivRNXAOqum9HxW4dirIlGnSlaczAP+dQfGIQlYk1bdCanyPqLvZC4HuNVYa2BMmDLH/u6KDzKle/O4BAMU01XVbeKFzsTG8jYh9f2EjBL9gjNB2N7rYgMdjkEsQVBZUg0SMH4IhT1t/76SBbjzTm1U1WuabBZKYPySIU3+hJVex8SHmEqOaKa2xAkZ2lRqqIoP56SGlupzIDVMcA8nNRoszkmNBot7lRp33RuVGlkPXEsN762ZkIpHSPQT+fXlaq9ZccEBEKawtik4uNWdTeMTG7GrchrgDSctCDYn80taZZXc0y+lYabEq0g0aVR2cSsMolBLsFuK5OFM1aPaJ9hlMblLzuicaxabtNsJj52wWPIqTltekNFP0EKKsChzGZs13D67fza7x9QksBMDeHuFTiwyT8nczTRpd61O7Ly7kqIlV78yDsPC0QCdqmvPifAEyH4kPth8vI74+ghGfCcl/BJBDVNAHg3AU0/dhg+mSEEVu2SVx8eIWy6A9cglb8XzjtGJZpxcgnTHD28VzBok9wV2661TZKVDMzfj+jc7EWUl2ZkuhGUNTioP78Ezs0ggx+yjsUKTfyZLL9FHdOwVDsIdO9NBXVUokPF66gFCcEe/eBXYd4iS1s3j91PEyrlA9Q/yZpofCCuF/TACZ7U5vn5r0XvtPdt75UlP8PPwOHmsE/eUyfhGTFEWNzOxQ/6XqIX1S0ahMxa4GxoDRZ1FxInNF9FUXOJjOVXuMR3Rf7n2C6QBfiQAj38RwKEMsJjCma03TFdL52urM0Cr45+iPm6ByTWfpXYVnVwgY4n3rw3uh9eVxIqUrp4oxlmbZunJltNWNKA/2bxqz3alI7BKdPmdFOhbjV7tfflk5jKzowrhAf1hgVkQDOX7vzOPTg72y7nHmLmEq3AuFGM8p708q9OEK+yJZFDImRO4uIbtbCFxikLM34vGNaBdXbENBCOondT2PjlL6ajk1ukMo2mnJVw+wSikJA8nek9IYrJO9GLem4PxmSs5LedrWnvYuF/708wOrAobAKl89LnZkxLDiuH+bUpH5fVK2eFhGNhx8nBUPZ9ETOxMxGNU78Re/iaASwW/CNkZyoAoYFJIOHB092Y1CP+vxNaMAo0ETA4DvKaE1krkywc3A1odp2HGNCzmUVf7fISLFyxPp+gpW97tsDwzW56xdVxZ328HxUlyzSnSA97Zi+sK4Ra45Y5Oto9l7bUXBvcOn/J6N9sZGwnj+iAFRHKKfWkmfU7NpBXnSG9XV8mFnIO8vBsMtNlknkehVkHu7BNUKP6l27CCDFtMC6X1EbsUKkt6h6O87xo6RaTaJ9TB5bR3qMwXewdiTWkQnxw0WDgmcayTOyiXstAO6AxHufT4o5uXX7t56bXvHX7+6S/evXnpbw/y5qW/wv/38uuvwH9e+87hhZtXXzu8cVUuhQI9Afk9mGi6Z9hoNOo0g9RJWuRdhrvRtSgZOpseGFAmBWYtofOsG4HFVADhPCc3zEzE6K0K5GFP5wAi14ABMd7VRkOYAt2tDBV8kaQWEGUM0wIVpnZS+3Nr8ZVXrXROXNKLefEO2E4HcDYYJJoJnemNiQc4ulhmRlErazBjk2FGvv20b5jqRcT2mC60f57pZRnydlNnxQTX4OVcAfwdHaQlGi+YApGMQJTRncdM7dL+q399qfCMxbeA+/w4Hxd6yAmGjHgRlGorjv4eVNqEtGDdz/3z27EyiWFwII7Kxaf+181Uoi0uW9iKktmLltiK0cYltoKfvBe2sqEPJqYFvAGI+KxGeL0WdTFzliolFXEO9cKtljAEVIgXbqW3mK2Hv0IAtVOxZ1ph6h7qqCDiI5gIbTUgETWgWvaFmXwWKce6J1zBGACA0W1ZbAyzIb4OaKKsMV1FJ+8STfAbSP6Aq8LOJyXufngRYCImMV+MNfroD2y53YNQGJQXplAEZjnRnG8SCNZgLyDldddT5mRAg9scgthgJ6MxARLEAya2V89tLTFwcs2i0Xm2tuVl8605T+x77h4A8eoDZas8N+QEIncR0c2TQ8aQOH6ys+qRF2PG/JI1Veni4PQsn5mvY0hdQ/el8JTtP50w6KeECVXGNBMP/UQ6r5sx/H1DOUrirbsHXZATrEm5KlwX/NpaFyRof/I1e8sWnfnzQ4Bupk5X+3JY7vPSXjfyP3gqkwdi89T9+3RGzdS/W0d3vxXzV2f/PZXc+BD9VHqQt4VC7DwjpY4yW56jbTEbSTjpnHS9AG/5EeWkWzagu2oTyKzg3GVGW4b5TJ9iLrkNcJi5sghT6jFNANRuY0xAsJzKNoAtAUWXoh3Q0JyFZ0+S7gNMJMdCylQfN3dwgmVcgHpzfU4ALcTsOhJCknXPJq1PYJIu1mi6vJ/CnrCuSuukRzUFHMwEIKJQt497TtuvlVV1U1mYGI+G+ElK4sD+OLvny3Zr+U0eGUUk2wV8A3DkPPUMTaw3I2+uVmaUbvyCxMZcNnVYco6XXk/YneOupiq2wwT2oMq095iNdUUpkNUBjjuS4hVrQGc1tHgFTgaEum7FK9ZYZPGteKX+3YtX6pNevFKf1EKUOmf/O3+1F69YDbglafGK1QbNy1a8YlHZEL14pf7di1fqk168Up/0/ec5+9/5q1gL9CWMzsHooQp8LCiBymUzQfcKn7dvEYVBflQZykpbdGCsEotxFOigIBa+C2QO9pTU8xIUfNNorM3jD2tZECn7IWVBpAKmzm/s8dvwFBeiwvEv8tPAC2tIuc0rqTDGYyitfkKHSWWRwSIlLDa0oRZ4AFMj4AOlHt1eded/gFwteDUDkjQsfbzv9xEuHKWTo9vp//4W/jvmO/m7VAwxeONUPhe9TmqH2Kt1Utfh4gOvHqqD3iqpV953FnjHQiKQy81KrZ6p5ioBkeO5ZyrFrZp/A4VJeVWZVoqMVkp3JE2zF7NdWg4mixPdinOYd5QkkSUtWE8CdUNgQVahN0mS2HBi80jf9V5sq2au3bkXG3DJbXqxrT3UEibixY6z7OXqwD6xAS1KaVcWHoYggC1shAaIYjuWhtE9AXtUhPiweEKGafqkrfmxk1KsjZIMwJ5ky/CCrxSDs8LM9KshKTCjEiDpZPLhVYzoK4OSIqyqPvhGahkK6CCGaFaDT5+mZJ1aSY0siYhpzN9hsZgCDjBNhBQpEOBDyhkS7UM/SXpbNHYjKbKh17eGpKy9lNMxIZLnNcuaD5nyytaZ08W3BmjWPfYoRwNYpgLkuHow15pCj4k5mAg82WSm9RPEYSMDoPYcC2Wp8nE93PNZOm9RR4SJTmoKna+znJkBw2hDpgLVhmF/jDa4dHaeg1fD3VeRx1gLeTVpgDnxjKQxpB6GmnrYUmevSD1szt4Hzzt03FzNmf4mV7mmEXvVFKj5iOSoa5n+cldEbAavhzCeMzmMl3jFNp2F5KdIdKZVDGBgPTSdaS1S6TyhszO+LllqGrepbChnKbmfPgfN04Cx2mKQjwOpvJATwKWSE353JgGclZ+oRaUsTjSdReN4+9liABiPC6Io5Gi22IVZArvFeiT43rtm9GI99MK2Yj19ebHeHUuJx3LxzUQVaRGlk1kWaRpN51NqlqcCfBotPuPdokvjnbMKxtkw0HZFeR/xcAoG3/QeyAIQl2Mgu10timy9wSyg9gnjdIPZxMH8ea11l5WbklTEefSRBrDX3n6SsVu9t9Y8v+S5UNS1DUG7a85ckLu+Zc7Uaqv9FEKi1qeGRmhbT2PmPSiyon8bdk0CX6IWG1YBo5Gh2PAhFRhtUZasFBiuPzcNhur2Y2kRJ6GVaDlJhFyriR0MgXCPRoAI/jIj4KK6s30jQCeHKhoBTcCdMwKMSuUkwI7iPaXtzOPrABqQEy7WtJ3LTYBuJ++bAEnLmJgA63BGCqxGmrjeudZ7eGpKgvQuASQc3tnWrFCBsidS+5jzTnKcQiAPXimgrEBW5XjyBQWyoH+tc8lm5yyj61qolS4+h4OGzyT/bj/pzANccw2Kbdayp3rvlQU7zA9wcS+ty8SQVL/YbJ7v4mEFJTDyfNIRNRhbj9/pWXMVVLRINtW6pkVF5lob85gpA7ayM4DCfZWdFpQp6rvaTGICZUQGPc/QGlPScj4S7BkjXXKzIYyOQKFa7cME5yKqAClm6skG81H4Be+5aOvdYer3raNKQX+zEx28CSwipXiRhfTobx/Tk7neIRrDrDdN/bqRNKbLgJ+hQ0TwqtjJhmctkMpqAqi/G6UXKQ3NetL3hmkbCSls5G5CeAoDJkkjpGRq0KRaT4WKNGqo6tGo0tpaEqOlCIR55uPDcCZTUjSaYw370hjGrxE3QjQkkafXI/Up+7+Ox5iXNqCo1/wjCXGCP1vLlHftkZnrgKEYUq3QlpD4jJYYXQH9wSDoCysqVqCuyTC2eXQx8bAjwSoTU7VMApKowB+OHmMsmTOzLk8y9JI0qqfTCXq93zvT3lPrhlGzPk88pbXPud3nCecmdm3LRGrhjbideMvDG9v2QKeCaTQBEyIqFfW4+TQCPppj91hN84w58dtOz2k2ellWSTOQer5decV2L6+UHhIJXsxGoHBhlVyTam7Vhm24au4CDHYWvhIsxeFV1CRhrnnwIEVBjB2cFJ8C9iLuz7R0xbX0F9GL7LGT7TQ2wV/+ORoX1tow6+qH/lG2il3fbrVCpahW+r8jJhPVggEFsKe/OfgKeWeI6ius1kga8RWMfIPW0d2v1LVQUkxl8UdQpU1PIIgmUHbYspziPXunk4vqNgJr5rXZ12tIUwH7zW7kB07goD2n0BEOkgOibEuWZkBTBiNHWGSgnSw1fwYE5FmIIuc51cYYacCHld/OPHiKtYv8yi2GA5yrDoAh7KEm2WV7R1OiHv3lFzeOhf00wC7H5nJ80VhNJ/zWosdgTc4v2qVizur4mgur09MODgNn/090Hgc7i/lWU7a8KUjeckl7O5+DVji0bjulS9Gck/6GLqUSbqfz/8gcwYowW2rxzvbX90vvMOPCDAXY/g4u9bcaUNbtFLpdgCrMzMs+gd9Qy31NuoLzUzNs5d/z2BY+rkXuZroCrUgb0hWGlhnMhfvb3WVttJnMx9ZInx8bOiExn/4kCye/pDoeTkwRCXoPHQu1AZwW81L1aX3RkzxGazrRr+AX7NjSlhhEleTp6drElFg5NXn7138Fb2Jum6Lu21ZkPzXVNjqXFt1khhBGXqRu+iJALtG/SLrwPaua1bNyV3WTEvujZlFPthuv0K73tsvrXWm/47MRBq3xXod5GQJRN/f7IvTBK7uD8m4bkp+Zi5Ew2cMgRSSXIhuqTe3IvcF02EK4UvobthB2QoH77P5kr3x0yK64QO1eqRkPpXY/wpetA740U1/iOuSIdXugrGBJQC6P8algB3iKX7BBRXcxFK+Pt60yT1hTuUUKebFCzXXkdgJJq5Jne4tlbJRI9Hqoma+7r2dWN4XcFrNy4+jswSCNo/E9Xm6JLFa5Tb9O8cNnZwlY3RiSZ/nvha4kC4kTD8aEs6/6jaxdjclZ4c1U2HyQ3SaYtn8muN5LqTZqtuqKdtWmWjJ0Yn0rv2xZcKZlgdvUhnltPvNX7FflE8EwSqUdJ/zQeYCbKJbZVZdnQ1yebjnpr/9gIVk+7VRtHlu6DVkPNndoZMHagafz8GuNCfEQ7H6Gmqzd3ZTMWcFpzAcommTYCCMP8uBZUjGHxRRuBlaRby7g0ctzyZ73w87VocD3/CHWJWlQy9V8z0yLuGbPYsfcT3SEju/Wf2UajpQkKQ4YLuqUB4ydPGTyaQywNG1Nu3njXE5cKXQkgh9lAgi1AJKMQxf5NaYBAgFXpWiKdyulVSpSPDzSj+JvMwPv85GnwabdmfVs8zZgYbnbIlqjNasI9HiP0fk9GahHtZLKQPQXx3sQgax38aYI3BMGQTLX4gW59yuv8yXJxc89LW5P4P56cFcM6MzmPZttnb2gzxUg9yAZpwDZom827xeLvpNTVygsfSOK4KwpeA08Kn8m9W3agXBavz3tHHNFxiuaMXjjmcGrZa5IedUao1xpXE2z/iIXDVyc7qqdTPKawuuifFftUJoe0KFWAXaXfFcVe8O8s/muprYRuXu+631nukpPE0h4chJIF7AEAEMsEYW162wIc6lGXKQlgyDKtTk187/WVIAUv/c0rWBcP+Y39Pg9i/5XM7kWr8lZ9u5DWYPYHcptCbI7OPeZkkWc+3vCXWnmEP98sO7NFNrNGqCL24+jMLbuTPvxkZLdnaj49ZSap8WsEqgWcwIKyNaB/My9KpfWAO32xRs82sm0O5uCSeuAlJep3k5Lj73lHszk8WjZHrTwwPgeqA4oFT9hHVArvbmkDqirZfdVB4TGVCoBavZvb7U9JS0WKf0RbVLUmmaUThqqdutID0vnj+AV7fyR4SqSI6xAmA76KHE2HZxgXTl6/47azqQ0Yi//ntulgNoU6GfJCklbD9JPhTVMyRwserrH1J7JpZQt0sikXJkcQYl7DxZmlLCW7rGv9vEtakxRGuKAowuYDZp6yPSysmiNmUbO7cDeahf1u7YTAajAi7RVhvKYiUtbZcAOsLS8tcrAuz+RkmpDivp3b5VRn/RWGfVJbXtR5+x/56/2VhnKwQ9NW2UokFWoOLU5nQ2L6q0y6t+9VUZ90ltl1Cdtb2XO/nf+Km0n8iWMtmD0UO1EkCprKZjp7UT++zZd7d502aGdiMuO1UIcb/S7gd8uTSvYNcB/c6vQwLIRW4BYh/2YFG08stVZxIR0RwK9MBg7i6iYmqrPO4u8BU8DdifT8wYc/RdOBRNgQnH9ACxr2tVjfSOywV3hw8R91k03NFsJm5R04gC1pF4/K0l1AN/vdpMRfi1z21lsXUZgl7wry0VdRq67oZhs95oeI7wDf0FKa3KiisJmp8VeC1+QKtl143iiBirWWWZUwXc08N2yndm9dr111hCN11T7GKNYg2bPNJWrIjHNxhljXZpkGoxf32jf90wmHc+sOHM5HuNmq4zkHf/aWJY5pJMw025Pp191NiP9RScW7jO5ue6zznU3rz1KVud6fdrZJdWuaqd5z0ZGEInmPmDt7d4VXGi+o6+lZs5eEHEjhZ4TG/j6CwYvboXB6+ByWA6sL+92W70Q0xPMerxoFZh6kA8YbTMqVVEoEZqP8EzbylrlSaJno+lpBs5kaCL1FfeJbV4vwv3xLGNqtE7OO3U27h2ZOnV6TeRZH22f9q7xNtBWc/sLR7p3xNt7uizpXALvmKzLdgzcIO6I5j0TvvcO3XNtPHO3iV1Hd2vqde4CiW0f92+f4cLqmQxjK9ko/6yXPl3TT2Tr/ihs32BooVgPuW6kROZ8LHZlQS+bnNVbr4tMW4sDXlM5ZuzCKtplW3ZL9JK8zunWe7SpVMNa3n5tya2v8WlWfAXufXonwGybfR+toE3fgwrhUbZprkIg0uDVBbYh36X3Tcl8v85zUSXUWdldr5R3l8ruDdf1cxLbKLlY46SZyAaLrl98YGK6+EBGiV06H0xkW3TapWY2Rs1F9lDQmIxlVml/hRBuqaAzUGLjDXY3Lsa1lPBmVlilk+t3sZTj8uoyCvws1U9M0dhsBs1L6nS9w1237Ka9cAN2Eju52ibtmS/ZqrlTVqZUxYwaMUZEiQdGDYvF0Rw1zorblrBxYaS72mc1w5JY0c98O3yVm+zo9m6Hz5Gi/u6+PuUCdsw6VeUljfgC5fCWGSdwcy5H1ibc1Qg7zfLct4wubhLY9J9nYbH7VhFlsZiygVaR9Ao5xEPRkXTIHeE/ajFuGpDjpZwug93Ti4q/tnbtDBdK5PzR2Y0uznXPyLkLJYC0G5U+4I0uleOx5fLru4xfpHfbzr3hio9lzj4vv1bwVPqynfBGyRYU701iahcI1g9hffGrl/QnNYZmzR3ww7UE6GwsWZmGuSGmu9YkdmS/l0jyDG8xxoJcSmrYZMbbyRHZZz+iIb6ffBv9KsdznOdcSsLnjemAfMEsgPs7uznT0Sqxtn52A88ZfMPJS8i0uukFxN2MwcByCIultx/ProIb7qSLuf3IrJCGtQJJnVl8TFwECFMwPz91hK7KLfFL241z5u0hpEgZGec5CPWf791AV6HTLvLTcZocNjpvuS9CowjwnfNyteg+7uXAu7PQnmS3yQ0HWu9NN0Ivgt1BvXeffbLOT9qpdGXeXboXZn4rDXdbpPZFXtNGbbTGbtaMbah4ax8SLt0k00ve+uBezNef4TRGCKmpLDhzZQ754qzGbq+GLXsNZr2VCBQ2uhChDZ0UcU0KzIruiPekdUIlzb3Iz6ckDLcOza07f0nZ/3mWMWRzacjUXo/2Kr5u1bTv6d35ujN2QiRX2+sS9N/E15USD2iU4a3fKPmxyEidVyZDUbCG6wR5lHKn1G0i8M0D62QnzDTGNubfRjoIwXp/PFVnEKWY/rDLkL40djtY7nm2vpy18hQPc+r5vaRnuRR2MAGS+XNcOMAnxuMryPGdlGbuANwVCO/TfK36zxdtv7lYXeAt9fIKVVqiEQZYqj1+B1OplA/r4taHW1c/FheYPk0+nLyT2pDrqXdkJbOasA94HfP7TVJWQQj27ySGIXKhXhlFTvBtBIoCKyBxYK+T/jHrIddXRyAwu3tyj1KsTVdPrEPzWEleGt2Rm9XmV4/9LucHahNr3qHD5G4Es8XN1EzAnIeeH0pMLcHmDLret5bGk1nJWqYXsg2BLOapsSz0zPoUnMAmQj8Za5hb1A4bW/M5vMpmbkIRP0jXVmjPunKtpSKeEM9EWM6od7b467UEGsa84xzF6vGs13KswgfayW5UeWvwH4MaQbGFrJrY5K4B9eur5pZ4Eye73DlN6izd8lR8fzU39pGK9cHs6yOUV4MNtemaoZ0oSYDjq617GEF0GmnJQaTWqfJ+q3oSL7DJd8K8x/2uxCEv3OBVPNLmd/8QPSYxZCuwBiROLHh8x4jBA955MbMs7aUaiFY+lejEGB5QAUk36KJvwCfV6LwCkn3CEwXkIgfvwziFRj9xcrRVzPkjijnraq4aSnBEtb5LsPeiquu9YO+pNtlDXtqW8vDVSkDTyS908p58V62w842b/wOCgtZ4ZW5kc3RyZWFtCmVuZG9iagozMCAwIG9iago4NTU3CmVuZG9iago0IDAgb2JqCjw8L1R5cGUvUGFnZS9NZWRpYUJveCBbMCAwIDU5NSA4NDJdCi9Sb3RhdGUgMC9QYXJlbnQgMyAwIFIKL1Jlc291cmNlczw8L1Byb2NTZXRbL1BERiAvSW1hZ2VCIC9UZXh0XQovRXh0R1N0YXRlIDI2IDAgUgovRm9udCAyNyAwIFIKPj4KL0NvbnRlbnRzIDUgMCBSCj4+CmVuZG9iagoyOCAwIG9iago8PC9UeXBlL1BhZ2UvTWVkaWFCb3ggWzAgMCA1OTUgODQyXQovUm90YXRlIDAvUGFyZW50IDMgMCBSCi9SZXNvdXJjZXM8PC9Qcm9jU2V0Wy9QREYgL0ltYWdlQiAvVGV4dF0KL0V4dEdTdGF0ZSAzMSAwIFIKL0ZvbnQgMzIgMCBSCj4+Ci9Db250ZW50cyAyOSAwIFIKPj4KZW5kb2JqCjMgMCBvYmoKPDwgL1R5cGUgL1BhZ2VzIC9LaWRzIFsKNCAwIFIKMjggMCBSCl0gL0NvdW50IDIKPj4KZW5kb2JqCjEgMCBvYmoKPDwvVHlwZSAvQ2F0YWxvZyAvUGFnZXMgMyAwIFIKL01ldGFkYXRhIDQ4IDAgUgo+PgplbmRvYmoKNyAwIG9iago8PC9UeXBlL0V4dEdTdGF0ZQovT1BNIDE+PmVuZG9iagoyNiAwIG9iago8PC9SNwo3IDAgUj4+CmVuZG9iagoyNyAwIG9iago8PC9SMTgKMTggMCBSL1IxNgoxNiAwIFIvUjE0CjE0IDAgUi9SMTIKMTIgMCBSL1IxMAoxMCAwIFIvUjgKOCAwIFIvUjI0CjI0IDAgUi9SMjIKMjIgMCBSL1IyMAoyMCAwIFI+PgplbmRvYmoKMzEgMCBvYmoKPDwvUjcKNyAwIFI+PgplbmRvYmoKMzIgMCBvYmoKPDwvUjE4CjE4IDAgUi9SMTYKMTYgMCBSL1IxNAoxNCAwIFIvUjEwCjEwIDAgUi9SOAo4IDAgUi9SMjQKMjQgMCBSL1IyMgoyMiAwIFIvUjIwCjIwIDAgUj4+CmVuZG9iagoxOCAwIG9iago8PC9CYXNlRm9udC9UT0tTTFgrQ2hhcnRlckJULUl0YWxpYy9Gb250RGVzY3JpcHRvciAxOSAwIFIvVHlwZS9Gb250Ci9GaXJzdENoYXIgNjkvTGFzdENoYXIgMjMzL1dpZHRoc1sgNTQ2IDAgMCAwIDAgMCAwIDAgODM5IDAgMAowIDAgMCAwIDU2NSAwIDAgMCAwIDAgMCAwIDAgMCAwIDAKMCA1MjUgMCAzOTQgNTIzIDQyNCAyOTIgMCA1NTEgMjg3IDI2OSA1MTQgMjc1IDgxNSA1NTYgNTAyCjUxNiA1MTIgMzk4IDM3MCAzMzMgNTUzIDQ1NCAwIDQ3NyA0NzUgMCAwIDAgMCAwIDAKMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMAowIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwCjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAKMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMAowIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwCjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAKNTI1IDAgMCAwIDAgMCAwIDAgNDI0IDQyNF0KL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZy9TdWJ0eXBlL1R5cGUxPj4KZW5kb2JqCjE2IDAgb2JqCjw8L0Jhc2VGb250L0tUSVhTWCtNYXRoRGVzaWduLUNILVJlZ3VsYXItRXh0ZW5zaW9uLTEwL0ZvbnREZXNjcmlwdG9yIDE3IDAgUi9UeXBlL0ZvbnQKL0ZpcnN0Q2hhciAxOC9MYXN0Q2hhciAxODYvV2lkdGhzWyA2NTggNjU4IDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwCjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAKMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMAowIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwCjAgMCAwIDAgMCAwIDAgMCAxMzk4IDE0NTQgNjU2IDAgMCAwIDAgMAowIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwCjAgMCAwIDAgMCAwIDAgMCAwIDAgNTEwIDUxMCA1MTAgNTEwIDAgMAowIDYyMyAwIDAgMCAwIDAgMCAwIDAgMCA2MjMgMCAwIDAgMAowIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwCjAgMCAwIDAgMCAwIDU3NCAwIDAgNTc0IDAgMCAwIDAgMCAwCjAgMCAwIDAgMCAwIDAgMCAwIDU0MSA1NDFdCi9FbmNvZGluZyA0MiAwIFIvU3VidHlwZS9UeXBlMT4+CmVuZG9iago0MiAwIG9iago8PC9UeXBlL0VuY29kaW5nL0Jhc2VFbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcvRGlmZmVyZW5jZXNbCjE4L3BhcmVubGVmdGJpZzUvcGFyZW5yaWdodGJpZzUKODgvc3VtbWF0aW9uZGlzcGxheS9wcm9kdWN0ZGlzcGxheS9pbnRlZ3JhbGRpc3BsYXkKMTIyL2JyYWNlaHRpcGRvd25sZWZ0L2JyYWNlaHRpcGRvd25yaWdodC9icmFjZWh0aXB1cGxlZnQvYnJhY2VodGlwdXByaWdodAoxMjkvcGFyZW5sZWZ0YmlnNAoxMzkvcGFyZW5yaWdodGJpZzQKMTY2L2JyYWNlbGVmdGJpZzIKMTY5L2JyYWNlcmlnaHRiaWcyCjE4NS9kYmxicmFja2V0bGVmdC9kYmxicmFja2V0cmlnaHRdPj4KZW5kb2JqCjE0IDAgb2JqCjw8L0Jhc2VGb250L1RXREJRRCtNYXRoRGVzaWduLUNILVJlZ3VsYXItTWF0aERlc2lnblN5bWJvbEEtMTAvRm9udERlc2NyaXB0b3IgMTUgMCBSL1R5cGUvRm9udAovRmlyc3RDaGFyIDc4L0xhc3RDaGFyIDE5MC9XaWR0aHNbIDcyNyAwCjYxNSAwIDcyNyAwIDAgMCAwIDAgMCAwIDY3MSAwIDAgMCAwIDAKMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMAowIDAgNzg0IDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAKMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMAowIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwCjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAKMCAwIDAgMCAwIDAgNzg0IDAgMCAwIDAgMCAwIDAgNzg0XQovRW5jb2RpbmcgNDMgMCBSL1N1YnR5cGUvVHlwZTE+PgplbmRvYmoKNDMgMCBvYmoKPDwvVHlwZS9FbmNvZGluZy9CYXNlRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nL0RpZmZlcmVuY2VzWwo3OC9OYmJiCjgwL1BiYmIKODIvUmJiYgo5MC9aYmJiCjExNC9pbnRlZ2VyZGl2aWRlCjE4Mi9sZXNzb3JlcXVhbHNsYW50CjE5MC9ncmVhdGVyb3JlcXVhbHNsYW50XT4+CmVuZG9iagoxMiAwIG9iago8PC9CYXNlRm9udC9MTVZGQUYrTWF0aERlc2lnbi1DSC1SZWd1bGFyLVQxLTEwL0ZvbnREZXNjcmlwdG9yIDEzIDAgUi9UeXBlL0ZvbnQKL0ZpcnN0Q2hhciA0Ny9MYXN0Q2hhciA0Ny9XaWR0aHNbIDUwNF0KL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZy9TdWJ0eXBlL1R5cGUxPj4KZW5kb2JqCjEwIDAgb2JqCjw8L0Jhc2VGb250L1VXUVFWUitDaGFydGVyQlQtQm9sZC9Gb250RGVzY3JpcHRvciAxMSAwIFIvVHlwZS9Gb250Ci9GaXJzdENoYXIgNDEvTGFzdENoYXIgMjAxL1dpZHRoc1sgNDI4IDAgMCAwIDAgMCAwCjAgNTgxIDU4MSA1ODEgNTgxIDU4MSA1ODEgNTgxIDU4MSA1ODEgMCAwIDAgMCAwIDAKMCA2NTEgNjI4IDYzOCA3MTYgNTk2IDU1MiAwIDAgMzU0IDQ2NSAwIDU0MyA4ODMgNzI3IDc1Mgo1ODcgNzUyIDY3MSA1NjggNjAzIDcwNSA2MzUgMCA2MzcgMCAwIDAgMCAwIDAgMAowIDU0NCA1NzcgNDc2IDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwCjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAKMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMAowIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwCjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAKMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMAowIDAgMCAwIDAgMCAwIDAgNTk2IDU5Nl0KL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZy9TdWJ0eXBlL1R5cGUxPj4KZW5kb2JqCjggMCBvYmoKPDwvQmFzZUZvbnQvUU9aVUlaK0NoYXJ0ZXJCVC1Sb21hbi9Gb250RGVzY3JpcHRvciA5IDAgUi9UeXBlL0ZvbnQKL0ZpcnN0Q2hhciAxMi9MYXN0Q2hhciAyNDYvV2lkdGhzWyA1NzQgMCAwIDAKMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMAowIDMzOCAwIDAgMCAwIDAgMjAxIDQxNyA0MTcgMCAwIDI3OCAzMTkgMjc4IDAKNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDMxOSAwIDAgMCAwIDQ4NgowIDYzOSA2MDQgNjMyIDY5MyA1NzYgNTM3IDAgMCAzMjQgMCAwIDUyMCA4NjYgMCA3MzEKNTU4IDAgMCA1NTYgNTk3IDY5NCAwIDAgMCAwIDAgMCAwIDAgMCAwCjAgNTA3IDUzOSA0NDYgNTY1IDQ5MSAzMjEgNTIzIDU2NCAyODAgMjY2IDAgMjgyIDg0MyA1NjggNTM5CjU1MSA1MzEgMzgyIDQwMCAzMzQgNTY5IDQ5NCAwIDUwMyA0OTUgNDY4IDAgMCAwIDAgMAowIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwCjAgMCAwIDAgMCAwIDAgMTAwMCAwIDAgMCAwIDgxNyAwIDAgMAowIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwCjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAKMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMAowIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwCjUwNyAwIDAgMCAwIDAgMCAwIDQ5MSA0OTEgNDkxIDAgMCAwIDAgMAowIDAgMCAwIDAgMCA1MzldCi9FbmNvZGluZyA0NCAwIFIvU3VidHlwZS9UeXBlMT4+CmVuZG9iago0NCAwIG9iago8PC9UeXBlL0VuY29kaW5nL0Jhc2VFbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcvRGlmZmVyZW5jZXNbCjEyL2ZpCjM5L3F1b3RlcmlnaHRdPj4KZW5kb2JqCjI0IDAgb2JqCjw8L0Jhc2VGb250L1dPRUVHWStNYXRoRGVzaWduLUNILVJlZ3VsYXItSXRhbGljLU1hdGhJdGFsaWMtMTAvRm9udERlc2NyaXB0b3IgMjUgMCBSL1R5cGUvRm9udAovRmlyc3RDaGFyIDExL0xhc3RDaGFyIDYyL1dpZHRoc1sgNjUzIDAgMCAwIDAKNTc1IDAgMCAwIDAgMCAwIDAgMCA3MDcgMCAwIDAgMCAwIDAKMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMAowIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgNzg0XQovRW5jb2RpbmcgNDUgMCBSL1N1YnR5cGUvVHlwZTE+PgplbmRvYmoKNDUgMCBvYmoKPDwvVHlwZS9FbmNvZGluZy9CYXNlRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nL0RpZmZlcmVuY2VzWwoxMS9hbHBoYQoxNi96ZXRhCjI1L3BpXT4+CmVuZG9iagoyMiAwIG9iago8PC9CYXNlRm9udC9ZU1haS1IrTWF0aERlc2lnbi1DSC1SZWd1bGFyLU9UMS0xMC9Gb250RGVzY3JpcHRvciAyMyAwIFIvVHlwZS9Gb250Ci9GaXJzdENoYXIgNDAvTGFzdENoYXIgOTEvV2lkdGhzWyAzOTIgMzkyIDAgNzI4IDAgMCAwIDAKMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCA3ODQgMCAwCjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAKMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDQwNV0KL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZy9TdWJ0eXBlL1R5cGUxPj4KZW5kb2JqCjQ2IDAgb2JqCjw8L0ZpbHRlci9GbGF0ZURlY29kZS9MZW5ndGggMjM0Pj5zdHJlYW0KeJxdkDFuwzAMRXedQjewRLeOAwRc0iVDi6LtBWSJDjREFhRn6O1L0klRdHgGniiS1u+Op5dTyavt3tsSP2m1cy6p0XW5tUh2onMuxoNNOa5302+8hGq642uoX9+VLF+gefO3cKHu42nQE7/1xCXRtYZILZQzmYNzeJhnNFTSvxKv0o5p/nNVAPCArIAbLu1Ee1S4qjrghps8qx9RAeijaEAFYJRR4PHOXrTnJQK4XpUrAk8mUd4pALiR9TmiAgB71oGnCs7tor7q8fvyQEnqEYyNt9aorBqnxiUx5UK/idelSpdlzA9kKna3CmVuZHN0cmVhbQplbmRvYmoKMjAgMCBvYmoKPDwvQmFzZUZvbnQvSFdNSVBBK01hdGhEZXNpZ24tQ0gtUmVndWxhci1TeW1ib2wtMTAvRm9udERlc2NyaXB0b3IgMjEgMCBSL1RvVW5pY29kZSA0NiAwIFIvVHlwZS9Gb250Ci9GaXJzdENoYXIgMC9MYXN0Q2hhciAxMDYvV2lkdGhzWwo3MjggMCA3MjggNTA0IDAgMCA3MjggMCAwIDAgMCAwIDAgMCAwIDAKMCAwIDAgMCAwIDAgMCAwIDc4NCAwIDcyOCAwIDAgMCAwIDAKMCAxMDA4IDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMAozMzEgMTMxNCA2NzIgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMAowIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwCjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDY3MiAwIDAgMAowIDAgMCAwIDAgMCAwIDAgMCAwIDI4MF0KL0VuY29kaW5nIDQ3IDAgUi9TdWJ0eXBlL1R5cGUxPj4KZW5kb2JqCjQ3IDAgb2JqCjw8L1R5cGUvRW5jb2RpbmcvQmFzZUVuY29kaW5nL1dpbkFuc2lFbmNvZGluZy9EaWZmZXJlbmNlc1sKMC9taW51cwoyL211bHRpcGx5L2FzdGVyaXNrbWF0aAo2L3BsdXNtaW51cwoyNC9zaW1pbGFyCjI2L3Byb3BlcnN1YnNldAozMy9hcnJvd3JpZ2h0CjQ4L3ByaW1lL2luZmluaXR5L2VsZW1lbnQKOTIvaW50ZXJzZWN0aW9uCjEwNi9iYXJdPj4KZW5kb2JqCjE5IDAgb2JqCjw8L1R5cGUvRm9udERlc2NyaXB0b3IvRm9udE5hbWUvVE9LU0xYK0NoYXJ0ZXJCVC1JdGFsaWMvRm9udEJCb3hbLTE1MSAtMjE4IDg2NyA3MzZdL0ZsYWdzIDQKL0FzY2VudCA3MzYKL0NhcEhlaWdodCA3MzYKL0Rlc2NlbnQgLTIxOAovSXRhbGlj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YCIJ4T8TJkAI/9cWrKJ70EQ3J9C9GwJMMm1qKuQ0HcytqC8SSCJG1yzBagDD/BuUDa2PCmVuZHN0cmVhbQplbmRvYmoKOSAwIG9iago8PC9UeXBlL0ZvbnREZXNjcmlwdG9yL0ZvbnROYW1lL1FPWlVJWitDaGFydGVyQlQtUm9tYW4vRm9udEJCb3hbLTc4IC0yMTggMTAwMCA3NDRdL0ZsYWdzIDQKL0FzY2VudCA3NDQKL0NhcEhlaWdodCA3NDQKL0Rlc2NlbnQgLTIxOAovSXRhbGljQW5nbGUgMAovU3RlbVYgMTUwCi9NaXNzaW5nV2lkdGggMjc4Ci9DaGFyU2V0KC9BL0IvQy9EL0UvRi9JL0wvTS9PL1AvUy9UL1UvYS9hY3V0ZS9hZ3JhdmUvYi9jL2NpcmN1bWZsZXgvY29sb24vY29tbWEvZC9kaWVyZXNpcy9lL2VhY3V0ZS9lY2lyY3VtZmxleC9lZ3JhdmUvZWlnaHQvZW1kYXNoL2V4Y2xhbS9mL2ZpL2ZpdmUvZm91ci9nL2dyYXZlL2gvaHlwaGVuL2kvai9sL20vbi9uaW5lL28vb2RpZXJlc2lzL29lL29uZS9wL3BhcmVubGVmdC9wYXJlbnJpZ2h0L3BlcmlvZC9xL3F1ZXN0aW9uL3F1b3RlcmlnaHQvci9zL3NldmVuL3NpeC90L3RocmVlL3R3by91L3YveC95L3ovemVybykvRm9udEZpbGUzIDM4IDAgUj4+CmVuZG9iagozOCAwIG9iago8PC9GaWx0ZXIvRmxhdGVEZWNvZGUKL1N1YnR5cGUvVHlwZTFDL0xlbmd0aCA1MTU0Pj5zdHJlYW0KeJxtVwdcVMf2vstyiw1llwuKZhfsiqJiiYXEjqCGKk2wINIEFimr0kQB0TgQQBGkSBOlCggIAoqAYkexozGIJSiWRE30XDIk7z+LJs/3/u+3/FiYmTv3zPm+851vRJS6GiUSiYYs9nQJCHILWLRqsrWfr4tCNTZWGC4SRqgJI8TfYMUfYT1hNBooRgPVM0foTJcIOpoQOxjMhlBqIpGTz2K/zcEBXh6eQXrT5syZqucSqOei0FMqNis3+HgFerpt1NvqF+CttyFYb5FXUGBQgJuLr56ZwtVQb6GPj17fc4F6AW6BbgFb3DYa6i32U7h7bXRTBHm5+Bj++4HPIVIU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MDJUMTg6Mzc6MTkrMDI6MDA8L3htcDpDcmVhdGVEYXRlPgo8eG1wOkNyZWF0b3JUb29sPmR2aXBzKGspIDIwMjIuMSAoTWlLVGVYMjIuOC4yOCkgIENvcHlyaWdodCAyMDIxIFJhZGljYWwgRXllIFNvZnR3YXJlPC94bXA6Q3JlYXRvclRvb2w+PC9yZGY6RGVzY3JpcHRpb24+CjxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSd1dWlkOjEwN2Y4NjE2LWE5NDgtMTFmMS0wMDAwLTU3NjY1YzRhNzIwNScgeG1sbnM6eGFwTU09J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8nIHhhcE1NOkRvY3VtZW50SUQ9J3V1aWQ6MTA3Zjg2MTYtYTk0OC0xMWYxLTAwMDAtNTc2NjVjNGE3MjA1Jy8+CjxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSd1dWlkOjEwN2Y4NjE2LWE5NDgtMTFmMS0wMDAwLTU3NjY1YzRhNzIwNScgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJyBkYzpmb3JtYXQ9J2FwcGxpY2F0aW9uL3BkZic+PGRjOnRpdGxlPjxyZGY6QWx0PjxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+RE0gLSBEZXV4IG91IHRyb2lzIGpvbGllcyBpZGVlcyBzdXIgbGVzIG5vbWJyZXMgcHJlbWllcnMuZHZpPC9yZGY6bGk+PC9yZGY6QWx0PjwvZGM6dGl0bGU+PC9yZGY6RGVzY3JpcHRpb24+CjwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0ndyc/PgplbmRzdHJlYW0KZW5kb2JqCjIgMCBvYmoKPDwvUHJvZHVjZXIoTWlLVGVYIEdQTCBHaG9zdHNjcmlwdCA5LjI1KQovQ3JlYXRpb25EYXRlKEQ6MjAyNjA5MDIxODM3MTkrMDInMDAnKQovTW9kRGF0ZShEOjIwMjYwOTAyMTgzNzE5KzAyJzAwJykKL0NyZWF0b3IoZHZpcHNcKGtcKSAyMDIyLjEgXChNaUtUZVgyMi44LjI4XCkgIENvcHlyaWdodCAyMDIxIFJhZGljYWwgRXllIFNvZnR3YXJlKQovVGl0bGUoRE0gLSBEZXV4IG91IHRyb2lzIGpvbGllcyBpZGVlcyBzdXIgbGVzIG5vbWJyZXMgcHJlbWllcnMuZHZpKT4+ZW5kb2JqCnhyZWYKMCA0OQowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMTY3NDEgMDAwMDAgbiAKMDAwMDA0NDA0NCAwMDAwMCBuIAowMDAwMDE2Njc1IDAwMDAwIG4gCjAwMDAwMTYzMzcgMDAwMDAgbiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDA3NjY3IDAwMDAwIG4gCjAwMDAwMTY4MDYgMDAwMDAgbiAKMDAwMDAxOTg4NSAwMDAwMCBuIAowMDAwMDMzMzY5IDAwMDAwIG4gCjAwMDAwMTkzMzMgMDAwMDAgbiAKMDAwMDAyOTgyNyAwMDAwMCBuIAowMDAwMDE5MTU3IDAwMDAwIG4gCjAwMDAwMjkyNjcgMDAwMDAgbiAKMDAwMDAxODU2NSAwMDAwMCBuIAowMDAwMDI3NTQzIDAwMDAwIG4gCjAwMDAwMTc2ODAgMDAwMDAgbiAKMDAwMDAyNTYxMiAwMDAwMCBuIAowMDAwMDE3MTMyIDAwMDAwIG4gCjAwMDAwMjIzNTEgMDAwMDAgbiAKMDAwMDAyMTcxNCAwMDAwMCBuIAowMDAwMDQxMDQ4IDAwMDAwIG4gCjAwMDAwMjExMjUgMDAwMDAgbiAKMDAwMDA0MDI2NiAwMDAwMCBuIAowMDAwMDIwNzM0IDAwMDAwIG4gCjAwMDAwMzkxMTcgMDAwMDAgbiAKMDAwMDAxNjg0NyAwMDAwMCBuIAowMDAwMDE2ODc3IDAwMDAwIG4gCjAwMDAwMTY1MDUgMDAwMDAgbiAKMDAwMDAwNzY4NyAwMDAwMCBuIAowMDAwMDE2MzE2IDAwMDAwIG4gCjAwMDAwMTY5OTUgMDAwMDAgbiAKMDAwMDAxNzAyNSAwMDAwMCBuIAowMDAwMDIyNjU3IDAwMDAwIG4gCjAwMDAwMjYwOTIgMDAwMDAgbiAKMDAwMDAyNzg1OSAwMDAwMCBuIAowMDAwMDI5NTA3IDAwMDAwIG4gCjAwMDAwMzAxNzUgMDAwMDAgbiAKMDAwMDAzMzg3OCAwMDAwMCBuIAowMDAwMDM5Mzg1IDAwMDAwIG4gCjAwMDAwNDA1NDYgMDAwMDAgbiAKMDAwMDA0MTM5NSAwMDAwMCBuIAowMDAwMDE4MjIxIDAwMDAwIG4gCjAwMDAwMTg5ODQgMDAwMDAgbiAKMDAwMDAyMDYzNiAwMDAwMCBuIAowMDAwMDIxMDI0IDAwMDAwIG4gCjAwMDAwMjE0MTIgMDAwMDAgbiAKMDAwMDAyMjEzOCAwMDAwMCBuIAowMDAwMDQyNTE0IDAwMDAwIG4gCnRyYWlsZXIKPDwgL1NpemUgNDkgL1Jvb3QgMSAwIFIgL0luZm8gMiAwIFIKL0lEIFs8OTVCMUI4NkY4N0JDNTc3RjM0Nzk5OEM3NDQxN0U2NjQ+PDk1QjFCODZGODdCQzU3N0YzNDc5OThDNzQ0MTdFNjY0Pl0KPj4Kc3RhcnR4cmVmCjQ0MzI2CiUlRU9GCg=="
    },
    {
      "id": "x-ens-2026-lx",
      "school": "X/ENS",
      "short": "X",
      "year": 2026,
      "subject": "Maths",
      "title": "LX",
      "track": "MP",
      "duration": "4 h",
      "difficulty": 3,
      "parts": "2 problèmes",
      "hot": false,
      "correction": false,
      "color": "lime",
      "pdf": "data:application/pdf;base64,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MbMs7aUaiFY+lejEGB5QAUk36KJvwCfV6LwCkn3CEwXkIgfvwziFRj9xcrRVzPkjijnraq4aSnBEtb5LsPeiquu9YO+pNtlDXtqW8vDVSkDTyS908p58V62w842b/wOCgtZ4ZW5kc3RyZWFtCmVuZG9iagozMCAwIG9iago4NTU3CmVuZG9iago0IDAgb2JqCjw8L1R5cGUvUGFnZS9NZWRpYUJveCBbMCAwIDU5NSA4NDJdCi9Sb3RhdGUgMC9QYXJlbnQgMyAwIFIKL1Jlc291cmNlczw8L1Byb2NTZXRbL1BERiAvSW1hZ2VCIC9UZXh0XQovRXh0R1N0YXRlIDI2IDAgUgovRm9udCAyNyAwIFIKPj4KL0NvbnRlbnRzIDUgMCBSCj4+CmVuZG9iagoyOCAwIG9iago8PC9UeXBlL1BhZ2UvTWVkaWFCb3ggWzAgMCA1OTUgODQyXQovUm90YXRlIDAvUGFyZW50IDMgMCBSCi9SZXNvdXJjZXM8PC9Qcm9jU2V0Wy9QREYgL0ltYWdlQiAvVGV4dF0KL0V4dEdTdGF0ZSAzMSAwIFIKL0ZvbnQgMzIgMCBSCj4+Ci9Db250ZW50cyAyOSAwIFIKPj4KZW5kb2JqCjMgMCBvYmoKPDwgL1R5cGUgL1BhZ2VzIC9LaWRzIFsKNCAwIFIKMjggMCBSCl0gL0NvdW50IDIKPj4KZW5kb2JqCjEgMCBvYmoKPDwvVHlwZSAvQ2F0YWxvZyAvUGFnZXMgMyAwIFIKL01ldGFkYXRhIDQ4IDAgUgo+PgplbmRvYmoKNyAwIG9iago8PC9UeXBlL0V4dEdTdGF0ZQovT1BNIDE+PmVuZG9iagoyNiAwIG9iago8PC9SNwo3IDAgUj4+CmVuZG9iagoyNyAwIG9iago8PC9SMTgKMTggMCBSL1IxNgoxNiAwIFIvUjE0CjE0IDAgUi9SMTIKMTIgMCBSL1IxMAoxMCAwIFIvUjgKOCAwIFIvUjI0CjI0IDAgUi9SMjIKMjIgMCBSL1IyMAoyMCAwIFI+PgplbmRvYmoKMzEgMCBvYmoKPDwvUjcKNyAwIFI+PgplbmRvYmoKMzIgMCBvYmoKPDwvUjE4CjE4IDAgUi9SMTYKMTYgMCBSL1IxNAoxNCAwIFIvUjEwCjEwIDAgUi9SOAo4IDAgUi9SMjQKMjQgMCBSL1IyMgoyMiAwIFIvUjIwCjIwIDAgUj4+CmVuZG9iagoxOCAwIG9iago8PC9CYXNlRm9udC9UT0tTTFgrQ2hhcnRlckJULUl0YWxpYy9Gb250RGVzY3JpcHRvciAxOSAwIFIvVHlwZS9Gb250Ci9GaXJzdENoYXIgNjkvTGFzdENoYXIgMjMzL1dpZHRoc1sgNTQ2IDAgMCAwIDAgMCAwIDAgODM5IDAgMAowIDAgMCAwIDU2NSAwIDAgMCAwIDAgMCAwIDAgMCAwIDAKMCA1MjUgMCAzOTQgNTIzIDQyNCAyOTIgMCA1NTEgMjg3IDI2OSA1MTQgMjc1IDgxNSA1NTYgNTAyCjUxNiA1MTIgMzk4IDM3MCAzMzMgNTUzIDQ1NCAwIDQ3NyA0NzUgMCAwIDAgMCAwIDAKMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMAowIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwCjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAKMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMAowIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwCjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAKNTI1IDAgMCAwIDAgMCAwIDAgNDI0IDQyNF0KL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZy9TdWJ0eXBlL1R5cGUxPj4KZW5kb2JqCjE2IDAgb2JqCjw8L0Jhc2VGb250L0tUSVhTWCtNYXRoRGVzaWduLUNILVJlZ3VsYXItRXh0ZW5zaW9uLTEwL0ZvbnREZXNjcmlwdG9yIDE3IDAgUi9UeXBlL0ZvbnQKL0ZpcnN0Q2hhciAxOC9MYXN0Q2hhciAxODYvV2lkdGhzWyA2NTggNjU4IDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwCjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAKMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMAowIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwCjAgMCAwIDAgMCAwIDAgMCAxMzk4IDE0NTQgNjU2IDAgMCAwIDAgMAowIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwCjAgMCAwIDAgMCAwIDAgMCAwIDAgNTEwIDUxMCA1MTAgNTEwIDAgMAowIDYyMyAwIDAgMCAwIDAgMCAwIDAgMCA2MjMgMCAwIDAgMAowIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwCjAgMCAwIDAgMCAwIDU3NCAwIDAgNTc0IDAgMCAwIDAgMCAwCjAgMCAwIDAgMCAwIDAgMCAwIDU0MSA1NDFdCi9FbmNvZGluZyA0MiAwIFIvU3VidHlwZS9UeXBlMT4+CmVuZG9iago0MiAwIG9iago8PC9UeXBlL0VuY29kaW5nL0Jhc2VFbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcvRGlmZmVyZW5jZXNbCjE4L3BhcmVubGVmdGJpZzUvcGFyZW5yaWdodGJpZzUKODgvc3VtbWF0aW9uZGlzcGxheS9wcm9kdWN0ZGlzcGxheS9pbnRlZ3JhbGRpc3BsYXkKMTIyL2JyYWNlaHRpcGRvd25sZWZ0L2JyYWNlaHRpcGRvd25yaWdodC9icmFjZWh0aXB1cGxlZnQvYnJhY2VodGlwdXByaWdodAoxMjkvcGFyZW5sZWZ0YmlnNAoxMzkvcGFyZW5yaWdodGJpZzQKMTY2L2JyYWNlbGVmdGJpZzIKMTY5L2JyYWNlcmlnaHRiaWcyCjE4NS9kYmxicmFja2V0bGVmdC9kYmxicmFja2V0cmlnaHRdPj4KZW5kb2JqCjE0IDAgb2JqCjw8L0Jhc2VGb250L1RXREJRRCtNYXRoRGVzaWduLUNILVJlZ3VsYXItTWF0aERlc2lnblN5bWJvbEEtMTAvRm9udERlc2NyaXB0b3IgMTUgMCBSL1R5cGUvRm9udAovRmlyc3RDaGFyIDc4L0xhc3RDaGFyIDE5MC9XaWR0aHNbIDcyNyAwCjYxNSAwIDcyNyAwIDAgMCAwIDAgMCAwIDY3MSAwIDAgMCAwIDAKMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMAowIDAgNzg0IDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAKMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMAowIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwCjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAKMCAwIDAgMCAwIDAgNzg0IDAgMCAwIDAgMCAwIDAgNzg0XQovRW5jb2RpbmcgNDMgMCBSL1N1YnR5cGUvVHlwZTE+PgplbmRvYmoKNDMgMCBvYmoKPDwvVHlwZS9FbmNvZGluZy9CYXNlRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nL0RpZmZlcmVuY2VzWwo3OC9OYmJiCjgwL1BiYmIKODIvUmJiYgo5MC9aYmJiCjExNC9pbnRlZ2VyZGl2aWRlCjE4Mi9sZXNzb3JlcXVhbHNsYW50CjE5MC9ncmVhdGVyb3JlcXVhbHNsYW50XT4+CmVuZG9iagoxMiAwIG9iago8PC9CYXNlRm9udC9MTVZGQUYrTWF0aERlc2lnbi1DSC1SZWd1bGFyLVQxLTEwL0ZvbnREZXNjcmlwdG9yIDEzIDAgUi9UeXBlL0ZvbnQKL0ZpcnN0Q2hhciA0Ny9MYXN0Q2hhciA0Ny9XaWR0aHNbIDUwNF0KL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZy9TdWJ0eXBlL1R5cGUxPj4KZW5kb2JqCjEwIDAgb2JqCjw8L0Jhc2VGb250L1VXUVFWUitDaGFydGVyQlQtQm9sZC9Gb250RGVzY3JpcHRvciAxMSAwIFIvVHlwZS9Gb250Ci9GaXJzdENoYXIgNDEvTGFzdENoYXIgMjAxL1dpZHRoc1sgNDI4IDAgMCAwIDAgMCAwCjAgNTgxIDU4MSA1ODEgNTgxIDU4MSA1ODEgNTgxIDU4MSA1ODEgMCAwIDAgMCAwIDAKMCA2NTEgNjI4IDYzOCA3MTYgNTk2IDU1MiAwIDAgMzU0IDQ2NSAwIDU0MyA4ODMgNzI3IDc1Mgo1ODcgNzUyIDY3MSA1NjggNjAzIDcwNSA2MzUgMCA2MzcgMCAwIDAgMCAwIDAgMAowIDU0NCA1NzcgNDc2IDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwCjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAKMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMAowIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwCjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAKMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMAowIDAgMCAwIDAgMCAwIDAgNTk2IDU5Nl0KL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZy9TdWJ0eXBlL1R5cGUxPj4KZW5kb2JqCjggMCBvYmoKPDwvQmFzZUZvbnQvUU9aVUlaK0NoYXJ0ZXJCVC1Sb21hbi9Gb250RGVzY3JpcHRvciA5IDAgUi9UeXBlL0ZvbnQKL0ZpcnN0Q2hhciAxMi9MYXN0Q2hhciAyNDYvV2lkdGhzWyA1NzQgMCAwIDAKMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMAowIDMzOCAwIDAgMCAwIDAgMjAxIDQxNyA0MTcgMCAwIDI3OCAzMTkgMjc4IDAKNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDMxOSAwIDAgMCAwIDQ4NgowIDYzOSA2MDQgNjMyIDY5MyA1NzYgNTM3IDAgMCAzMjQgMCAwIDUyMCA4NjYgMCA3MzEKNTU4IDAgMCA1NTYgNTk3IDY5NCAwIDAgMCAwIDAgMCAwIDAgMCAwCjAgNTA3IDUzOSA0NDYgNTY1IDQ5MSAzMjEgNTIzIDU2NCAyODAgMjY2IDAgMjgyIDg0MyA1NjggNTM5CjU1MSA1MzEgMzgyIDQwMCAzMzQgNTY5IDQ5NCAwIDUwMyA0OTUgNDY4IDAgMCAwIDAgMAowIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwCjAgMCAwIDAgMCAwIDAgMTAwMCAwIDAgMCAwIDgxNyAwIDAgMAowIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwCjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAKMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMAowIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwCjUwNyAwIDAgMCAwIDAgMCAwIDQ5MSA0OTEgNDkxIDAgMCAwIDAgMAowIDAgMCAwIDAgMCA1MzldCi9FbmNvZGluZyA0NCAwIFIvU3VidHlwZS9UeXBlMT4+CmVuZG9iago0NCAwIG9iago8PC9UeXBlL0VuY29kaW5nL0Jhc2VFbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcvRGlmZmVyZW5jZXNbCjEyL2ZpCjM5L3F1b3RlcmlnaHRdPj4KZW5kb2JqCjI0IDAgb2JqCjw8L0Jhc2VGb250L1dPRUVHWStNYXRoRGVzaWduLUNILVJlZ3VsYXItSXRhbGljLU1hdGhJdGFsaWMtMTAvRm9udERlc2NyaXB0b3IgMjUgMCBSL1R5cGUvRm9udAovRmlyc3RDaGFyIDExL0xhc3RDaGFyIDYyL1dpZHRoc1sgNjUzIDAgMCAwIDAKNTc1IDAgMCAwIDAgMCAwIDAgMCA3MDcgMCAwIDAgMCAwIDAKMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMAowIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgNzg0XQovRW5jb2RpbmcgNDUgMCBSL1N1YnR5cGUvVHlwZTE+PgplbmRvYmoKNDUgMCBvYmoKPDwvVHlwZS9FbmNvZGluZy9CYXNlRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nL0RpZmZlcmVuY2VzWwoxMS9hbHBoYQoxNi96ZXRhCjI1L3BpXT4+CmVuZG9iagoyMiAwIG9iago8PC9CYXNlRm9udC9ZU1haS1IrTWF0aERlc2lnbi1DSC1SZWd1bGFyLU9UMS0xMC9Gb250RGVzY3JpcHRvciAyMyAwIFIvVHlwZS9Gb250Ci9GaXJzdENoYXIgNDAvTGFzdENoYXIgOTEvV2lkdGhzWyAzOTIgMzkyIDAgNzI4IDAgMCAwIDAKMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCA3ODQgMCAwCjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAKMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDQwNV0KL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZy9TdWJ0eXBlL1R5cGUxPj4KZW5kb2JqCjQ2IDAgb2JqCjw8L0ZpbHRlci9GbGF0ZURlY29kZS9MZW5ndGggMjM0Pj5zdHJlYW0KeJxdkDFuwzAMRXedQjewRLeOAwRc0iVDi6LtBWSJDjREFhRn6O1L0klRdHgGniiS1u+Op5dTyavt3tsSP2m1cy6p0XW5tUh2onMuxoNNOa5302+8hGq642uoX9+VLF+gefO3cKHu42nQE7/1xCXRtYZILZQzmYNzeJhnNFTSvxKv0o5p/nNVAPCArIAbLu1Ee1S4qjrghps8qx9RAeijaEAFYJRR4PHOXrTnJQK4XpUrAk8mUd4pALiR9TmiAgB71oGnCs7tor7q8fvyQEnqEYyNt9aorBqnxiUx5UK/idelSpdlzA9kKna3CmVuZHN0cmVhbQplbmRvYmoKMjAgMCBvYmoKPDwvQmFzZUZvbnQvSFdNSVBBK01hdGhEZXNpZ24tQ0gtUmVndWxhci1TeW1ib2wtMTAvRm9udERlc2NyaXB0b3IgMjEgMCBSL1RvVW5pY29kZSA0NiAwIFIvVHlwZS9Gb250Ci9GaXJzdENoYXIgMC9MYXN0Q2hhciAxMDYvV2lkdGhzWwo3MjggMCA3MjggNTA0IDAgMCA3MjggMCAwIDAgMCAwIDAgMCAwIDAKMCAwIDAgMCAwIDAgMCAwIDc4NCAwIDcyOCAwIDAgMCAwIDAKMCAxMDA4IDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMAozMzEgMTMxNCA2NzIgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMAowIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwCjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDY3MiAwIDAgMAowIDAgMCAwIDAgMCAwIDAgMCAwIDI4MF0KL0VuY29kaW5nIDQ3IDAgUi9TdWJ0eXBlL1R5cGUxPj4KZW5kb2JqCjQ3IDAgb2JqCjw8L1R5cGUvRW5jb2RpbmcvQmFzZUVuY29kaW5nL1dpbkFuc2lFbmNvZGluZy9EaWZmZXJlbmNlc1sKMC9taW51cwoyL211bHRpcGx5L2FzdGVyaXNrbWF0aAo2L3BsdXNtaW51cwoyNC9zaW1pbGFyCjI2L3Byb3BlcnN1YnNldAozMy9hcnJvd3JpZ2h0CjQ4L3ByaW1lL2luZmluaXR5L2VsZW1lbnQKOTIvaW50ZXJzZWN0aW9uCjEwNi9iYXJdPj4KZW5kb2JqCjE5IDAgb2JqCjw8L1R5cGUvRm9udERlc2NyaXB0b3IvRm9udE5hbWUvVE9LU0xYK0NoYXJ0ZXJCVC1JdGFsaWMvRm9udEJCb3hbLTE1MSAtMjE4IDg2NyA3MzZdL0ZsYWdzIDQKL0FzY2VudCA3MzYKL0NhcEhlaWdodCA3MzYKL0Rlc2NlbnQgLTIxOAovSXRhbGlj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YCIJ4T8TJkAI/9cWrKJ70EQ3J9C9GwJMMm1qKuQ0HcytqC8SSCJG1yzBagDD/BuUDa2PCmVuZHN0cmVhbQplbmRvYmoKOSAwIG9iago8PC9UeXBlL0ZvbnREZXNjcmlwdG9yL0ZvbnROYW1lL1FPWlVJWitDaGFydGVyQlQtUm9tYW4vRm9udEJCb3hbLTc4IC0yMTggMTAwMCA3NDRdL0ZsYWdzIDQKL0FzY2VudCA3NDQKL0NhcEhlaWdodCA3NDQKL0Rlc2NlbnQgLTIxOAovSXRhbGljQW5nbGUgMAovU3RlbVYgMTUwCi9NaXNzaW5nV2lkdGggMjc4Ci9DaGFyU2V0KC9BL0IvQy9EL0UvRi9JL0wvTS9PL1AvUy9UL1UvYS9hY3V0ZS9hZ3JhdmUvYi9jL2NpcmN1bWZsZXgvY29sb24vY29tbWEvZC9kaWVyZXNpcy9lL2VhY3V0ZS9lY2lyY3VtZmxleC9lZ3JhdmUvZWlnaHQvZW1kYXNoL2V4Y2xhbS9mL2ZpL2ZpdmUvZm91ci9nL2dyYXZlL2gvaHlwaGVuL2kvai9sL20vbi9uaW5lL28vb2RpZXJlc2lzL29lL29uZS9wL3BhcmVubGVmdC9wYXJlbnJpZ2h0L3BlcmlvZC9xL3F1ZXN0aW9uL3F1b3RlcmlnaHQvci9zL3NldmVuL3NpeC90L3RocmVlL3R3by91L3YveC95L3ovemVybykvRm9udEZpbGUzIDM4IDAgUj4+CmVuZG9iagozOCAwIG9iago8PC9GaWx0ZXIvRmxhdGVEZWNvZGUKL1N1YnR5cGUvVHlwZTFDL0xlbmd0aCA1MTU0Pj5zdHJlYW0KeJxtVwdcVMf2vstyiw1llwuKZhfsiqJiiYXEjqCGKk2wINIEFimr0kQB0TgQQBGkSBOlCggIAoqAYkexozGIJSiWRE30XDIk7z+LJs/3/u+3/FiYmTv3zPm+851vRJS6GiUSiYYs9nQJCHILWLRqsrWfr4tCNTZWGC4SRqgJI8TfYMUfYT1hNBooRgPVM0foTJcIOpoQOxjMhlBqIpGTz2K/zcEBXh6eQXrT5syZqucSqOei0FMqNis3+HgFerpt1NvqF+CttyFYb5FXUGBQgJuLr56ZwtVQb6GPj17fc4F6AW6BbgFb3DYa6i32U7h7bXRTBHm5+Bj++4HPIVIU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MDJUMTg6Mzc6MTkrMDI6MDA8L3htcDpDcmVhdGVEYXRlPgo8eG1wOkNyZWF0b3JUb29sPmR2aXBzKGspIDIwMjIuMSAoTWlLVGVYMjIuOC4yOCkgIENvcHlyaWdodCAyMDIxIFJhZGljYWwgRXllIFNvZnR3YXJlPC94bXA6Q3JlYXRvclRvb2w+PC9yZGY6RGVzY3JpcHRpb24+CjxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSd1dWlkOjEwN2Y4NjE2LWE5NDgtMTFmMS0wMDAwLTU3NjY1YzRhNzIwNScgeG1sbnM6eGFwTU09J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8nIHhhcE1NOkRvY3VtZW50SUQ9J3V1aWQ6MTA3Zjg2MTYtYTk0OC0xMWYxLTAwMDAtNTc2NjVjNGE3MjA1Jy8+CjxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSd1dWlkOjEwN2Y4NjE2LWE5NDgtMTFmMS0wMDAwLTU3NjY1YzRhNzIwNScgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJyBkYzpmb3JtYXQ9J2FwcGxpY2F0aW9uL3BkZic+PGRjOnRpdGxlPjxyZGY6QWx0PjxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+RE0gLSBEZXV4IG91IHRyb2lzIGpvbGllcyBpZGVlcyBzdXIgbGVzIG5vbWJyZXMgcHJlbWllcnMuZHZpPC9yZGY6bGk+PC9yZGY6QWx0PjwvZGM6dGl0bGU+PC9yZGY6RGVzY3JpcHRpb24+CjwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0ndyc/PgplbmRzdHJlYW0KZW5kb2JqCjIgMCBvYmoKPDwvUHJvZHVjZXIoTWlLVGVYIEdQTCBHaG9zdHNjcmlwdCA5LjI1KQovQ3JlYXRpb25EYXRlKEQ6MjAyNjA5MDIxODM3MTkrMDInMDAnKQovTW9kRGF0ZShEOjIwMjYwOTAyMTgzNzE5KzAyJzAwJykKL0NyZWF0b3IoZHZpcHNcKGtcKSAyMDIyLjEgXChNaUtUZVgyMi44LjI4XCkgIENvcHlyaWdodCAyMDIxIFJhZGljYWwgRXllIFNvZnR3YXJlKQovVGl0bGUoRE0gLSBEZXV4IG91IHRyb2lzIGpvbGllcyBpZGVlcyBzdXIgbGVzIG5vbWJyZXMgcHJlbWllcnMuZHZpKT4+ZW5kb2JqCnhyZWYKMCA0OQowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMTY3NDEgMDAwMDAgbiAKMDAwMDA0NDA0NCAwMDAwMCBuIAowMDAwMDE2Njc1IDAwMDAwIG4gCjAwMDAwMTYzMzcgMDAwMDAgbiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDA3NjY3IDAwMDAwIG4gCjAwMDAwMTY4MDYgMDAwMDAgbiAKMDAwMDAxOTg4NSAwMDAwMCBuIAowMDAwMDMzMzY5IDAwMDAwIG4gCjAwMDAwMTkzMzMgMDAwMDAgbiAKMDAwMDAyOTgyNyAwMDAwMCBuIAowMDAwMDE5MTU3IDAwMDAwIG4gCjAwMDAwMjkyNjcgMDAwMDAgbiAKMDAwMDAxODU2NSAwMDAwMCBuIAowMDAwMDI3NTQzIDAwMDAwIG4gCjAwMDAwMTc2ODAgMDAwMDAgbiAKMDAwMDAyNTYxMiAwMDAwMCBuIAowMDAwMDE3MTMyIDAwMDAwIG4gCjAwMDAwMjIzNTEgMDAwMDAgbiAKMDAwMDAyMTcxNCAwMDAwMCBuIAowMDAwMDQxMDQ4IDAwMDAwIG4gCjAwMDAwMjExMjUgMDAwMDAgbiAKMDAwMDA0MDI2NiAwMDAwMCBuIAowMDAwMDIwNzM0IDAwMDAwIG4gCjAwMDAwMzkxMTcgMDAwMDAgbiAKMDAwMDAxNjg0NyAwMDAwMCBuIAowMDAwMDE2ODc3IDAwMDAwIG4gCjAwMDAwMTY1MDUgMDAwMDAgbiAKMDAwMDAwNzY4NyAwMDAwMCBuIAowMDAwMDE2MzE2IDAwMDAwIG4gCjAwMDAwMTY5OTUgMDAwMDAgbiAKMDAwMDAxNzAyNSAwMDAwMCBuIAowMDAwMDIyNjU3IDAwMDAwIG4gCjAwMDAwMjYwOTIgMDAwMDAgbiAKMDAwMDAyNzg1OSAwMDAwMCBuIAowMDAwMDI5NTA3IDAwMDAwIG4gCjAwMDAwMzAxNzUgMDAwMDAgbiAKMDAwMDAzMzg3OCAwMDAwMCBuIAowMDAwMDM5Mzg1IDAwMDAwIG4gCjAwMDAwNDA1NDYgMDAwMDAgbiAKMDAwMDA0MTM5NSAwMDAwMCBuIAowMDAwMDE4MjIxIDAwMDAwIG4gCjAwMDAwMTg5ODQgMDAwMDAgbiAKMDAwMDAyMDYzNiAwMDAwMCBuIAowMDAwMDIxMDI0IDAwMDAwIG4gCjAwMDAwMjE0MTIgMDAwMDAgbiAKMDAwMDAyMjEzOCAwMDAwMCBuIAowMDAwMDQyNTE0IDAwMDAwIG4gCnRyYWlsZXIKPDwgL1NpemUgNDkgL1Jvb3QgMSAwIFIgL0luZm8gMiAwIFIKL0lEIFs8OTVCMUI4NkY4N0JDNTc3RjM0Nzk5OEM3NDQxN0U2NjQ+PDk1QjFCODZGODdCQzU3N0YzNDc5OThDNzQ0MTdFNjY0Pl0KPj4Kc3RhcnR4cmVmCjQ0MzI2CiUlRU9GCg=="
    },
    {
      "id": "x-ens-2025-maths-a",
      "school": "X/ENS",
      "short": "X",
      "year": 2025,
      "subject": "Maths",
      "title": "Épreuve de mathématiques A",
      "track": "MP",
      "duration": "4 h",
      "difficulty": 5,
      "parts": "2 problèmes",
      "hot": true,
      "correction": true,
      "color": "lime"
    },
    {
      "id": "x-ens-2025-maths-b",
      "school": "X/ENS",
      "short": "X",
      "year": 2025,
      "subject": "Maths",
      "title": "Épreuve de mathématiques B",
      "track": "MP",
      "duration": "4 h",
      "difficulty": 5,
      "parts": "3 parties",
      "hot": true,
      "correction": true,
      "color": "lime"
    },
    {
      "id": "x-ens-2024-info-a",
      "school": "X/ENS",
      "short": "X",
      "year": 2024,
      "subject": "Informatique",
      "title": "Épreuve d’informatique A",
      "track": "MP",
      "duration": "4 h",
      "difficulty": 4,
      "parts": "2 problèmes",
      "hot": false,
      "correction": true,
      "color": "lilac"
    },
    {
      "id": "mines-2024-maths-2",
      "school": "Mines-Ponts",
      "short": "MP",
      "year": 2024,
      "subject": "Maths",
      "title": "Épreuve de mathématiques 2",
      "track": "MP",
      "duration": "4 h",
      "difficulty": 4,
      "parts": "2 problèmes",
      "hot": true,
      "correction": true,
      "color": "sky"
    },
    {
      "id": "mines-2024-physique-1",
      "school": "Mines-Ponts",
      "short": "MP",
      "year": 2024,
      "subject": "Physique",
      "title": "Épreuve de physique 1",
      "track": "MP",
      "duration": "4 h",
      "difficulty": 4,
      "parts": "3 parties",
      "hot": false,
      "correction": true,
      "color": "sky"
    },
    {
      "id": "centrale-2024-maths-1",
      "school": "Centrale",
      "short": "C",
      "year": 2024,
      "subject": "Maths",
      "title": "Épreuve de mathématiques 1",
      "track": "MP",
      "duration": "4 h",
      "difficulty": 4,
      "parts": "2 problèmes",
      "hot": true,
      "correction": true,
      "color": "peach"
    },
    {
      "id": "centrale-2023-physique-chimie",
      "school": "Centrale",
      "short": "C",
      "year": 2023,
      "subject": "Physique",
      "title": "Épreuve de physique-chimie",
      "track": "MP",
      "duration": "4 h",
      "difficulty": 3,
      "parts": "3 parties",
      "hot": false,
      "correction": true,
      "color": "peach"
    },
    {
      "id": "ccinp-2025-maths-1",
      "school": "CCINP",
      "short": "CC",
      "year": 2025,
      "subject": "Maths",
      "title": "Épreuve de mathématiques 1",
      "track": "MP",
      "duration": "4 h",
      "difficulty": 3,
      "parts": "3 problèmes",
      "hot": true,
      "correction": true,
      "color": "butter"
    },
    {
      "id": "ccinp-2025-physique",
      "school": "CCINP",
      "short": "CC",
      "year": 2025,
      "subject": "Physique",
      "title": "Épreuve de physique",
      "track": "MP",
      "duration": "4 h",
      "difficulty": 3,
      "parts": "2 parties",
      "hot": false,
      "correction": true,
      "color": "butter"
    },
    {
      "id": "ccinp-2024-info",
      "school": "CCINP",
      "short": "CC",
      "year": 2024,
      "subject": "Informatique",
      "title": "Épreuve d’informatique",
      "track": "MP",
      "duration": "4 h",
      "difficulty": 3,
      "parts": "2 problèmes",
      "hot": false,
      "correction": true,
      "color": "butter"
    },
    {
      "id": "e3a-2024-maths-a",
      "school": "e3a",
      "short": "e3a",
      "year": 2024,
      "subject": "Maths",
      "title": "Épreuve de mathématiques A",
      "track": "MP",
      "duration": "4 h",
      "difficulty": 2,
      "parts": "3 exercices",
      "hot": false,
      "correction": false,
      "color": "mint"
    },
    {
      "id": "e3a-2023-physique",
      "school": "e3a",
      "short": "e3a",
      "year": 2023,
      "subject": "Physique",
      "title": "Épreuve de physique",
      "track": "MP",
      "duration": "4 h",
      "difficulty": 2,
      "parts": "3 exercices",
      "hot": false,
      "correction": true,
      "color": "mint"
    },
    {
      "id": "x-ens-2024-maths-a",
      "school": "X/ENS",
      "short": "X",
      "year": 2024,
      "subject": "Maths",
      "title": "Épreuve de mathématiques A",
      "track": "MP",
      "duration": "4 h",
      "difficulty": 5,
      "parts": "2 problèmes",
      "hot": false,
      "correction": true,
      "color": "lime"
    },
    {
      "id": "mines-2023-info",
      "school": "Mines-Ponts",
      "short": "MP",
      "year": 2023,
      "subject": "Informatique",
      "title": "Épreuve d’informatique",
      "track": "MP",
      "duration": "4 h",
      "difficulty": 4,
      "parts": "2 problèmes",
      "hot": false,
      "correction": true,
      "color": "sky"
    },
    {
      "id": "centrale-2025-maths-2",
      "school": "Centrale",
      "short": "C",
      "year": 2025,
      "subject": "Maths",
      "title": "Épreuve de mathématiques 2",
      "track": "MP",
      "duration": "4 h",
      "difficulty": 4,
      "parts": "2 problèmes",
      "hot": true,
      "correction": true,
      "color": "peach"
    },
    {
      "id": "ccinp-2023-maths-2",
      "school": "CCINP",
      "short": "CC",
      "year": 2023,
      "subject": "Maths",
      "title": "Épreuve de mathématiques 2",
      "track": "MP",
      "duration": "4 h",
      "difficulty": 3,
      "parts": "3 problèmes",
      "hot": false,
      "correction": true,
      "color": "butter"
    }
  ],
  "dailyChallenge": {
    "id": "nilpotente-inversible",
    "eyebrow": "Défi du jour · MP · Algèbre",
    "title": "La nilpotence cache toujours un inverse.",
    "statement": "Soit <span class=\"inline-tex\" data-tex=\"A \\in \\mathrm{M}_n(\\mathbb{R})\"></span> telle que <span class=\"inline-tex\" data-tex=\"A^3 = 0\"></span>. Montrer que <span class=\"inline-tex\" data-tex=\"I_n + A\"></span> est inversible et exprimer son inverse.",
    "equation": "A^3 = 0",
    "participants": 184,
    "xp": 40,
    "steps": [
      "Calcule le produit <span class=\"inline-tex\" data-tex=\"(I+A)(I-A+A^2)\"></span>.",
      "La relation <span class=\"inline-tex\" data-tex=\"A^3=0\"></span> fait disparaître le reste cubique.",
      "Tu obtiens <span class=\"inline-tex\" data-tex=\"I\"></span> à gauche et à droite : l’inverse est <span class=\"inline-tex\" data-tex=\"I-A+A^2\"></span>."
    ]
  },
  "threads": [
    {
      "id": "colles-maths-mp",
      "category": "Méthode",
      "title": "Comment vous gérez vraiment les colles de maths en MP* ?",
      "excerpt": "Je sors de colle avec l’impression de comprendre en salle et de tout perdre au tableau. Vous avez des rituels de préparation qui marchent ?",
      "author": "Lina B.",
      "initials": "LB",
      "avatarColor": "lime",
      "grade": "MP* · Ginette",
      "time": "il y a 2 h",
      "replies": 34,
      "views": "1,2k",
      "upvotes": 86,
      "tags": [
        "khôlle",
        "méthode",
        "oral"
      ],
      "pinned": true,
      "content": "Je sors de colle avec l’impression de comprendre en salle et de tout perdre au tableau. Le prof me demande de rédiger une preuve au tableau et je me mets à sauter des étapes que j’avais pourtant comprises.\n\nVous avez des rituels de préparation qui marchent ? Je parle surtout de l’oral : est-ce que vous récitez le cours à voix haute, vous refaites les démos sans regarder, vous vous enregistrez ? J’aimerais sortir de la logique « je relis mon cours et ça ira ».\n\nMerci d’avance pour les retours concrets !",
      "answers": [
        {
          "id": "r1",
          "author": "Adam K.",
          "initials": "AK",
          "avatarColor": "lilac",
          "grade": "MP* · LLG",
          "time": "il y a 1 h",
          "text": "Ce qui a tout changé pour moi : refaire les démonstrations à voix haute, sans support, en 3 minutes chrono. Au début c’est humiliant, puis tu construis des automatismes. Je note les trous dans un carnet à part.",
          "upvotes": 41
        },
        {
          "id": "r2",
          "author": "Sofia M.",
          "initials": "SM",
          "avatarColor": "peach",
          "grade": "MP · Chaptal",
          "time": "il y a 48 min",
          "text": "Demande à ton colleur de te laisser 30 secondes de réflexion silencieuse avant d’écrire. Ça paraît bête, mais ça m’a évité de partir dans une mauvaise direction devant tout le monde.",
          "upvotes": 27
        },
        {
          "id": "r3",
          "author": "Yanis R.",
          "initials": "YR",
          "avatarColor": "mint",
          "grade": "MP* · Stan",
          "time": "il y a 20 min",
          "text": "Je prépare chaque colle en 2 temps : 20 min de cours actif (je ferme le livre et je résume), puis 20 min d’exercice au tableau. Le plus dur, c’est de tenir la régularité.",
          "upvotes": 18
        }
      ]
    },
    {
      "id": "endomorphismes-qui-commutent",
      "category": "Maths",
      "title": "Une CNS pour que f∘g = g∘f, sans diagonaliser",
      "excerpt": "Je bloque sur un exercice d’oral : on demande une condition nécessaire et suffisante sur les noyaux. Quelqu’un a une piste propre ?",
      "author": "Adam K.",
      "initials": "AK",
      "avatarColor": "lilac",
      "grade": "MP · Louis-le-Grand",
      "time": "il y a 4 h",
      "replies": 18,
      "views": "864",
      "upvotes": 52,
      "tags": [
        "algèbre",
        "oral",
        "endomorphismes"
      ],
      "pinned": false,
      "content": "Je bloque sur un exercice d’oral : on demande une CNS pour que deux endomorphismes diagonalisables commutent, sans passer par une diagonalisation simultanée. J’ai essayé de regarder ce qui se passe sur les noyaux de P(f) et P(g), mais je ne vois pas où utiliser la diagonalisabilité.\n\nUne piste ou un contre-exemple à me donner ?",
      "answers": [
        {
          "id": "r4",
          "author": "Lina B.",
          "initials": "LB",
          "avatarColor": "lime",
          "grade": "MP* · Ginette",
          "time": "il y a 3 h",
          "text": "Pense aux projecteurs spectraux. Si f est diagonalisable, les projecteurs sur ses espaces propres sont des polynômes en f. Commuter avec f revient à stabiliser ces espaces propres.",
          "upvotes": 33
        },
        {
          "id": "r5",
          "author": "Mehdi A.",
          "initials": "MA",
          "avatarColor": "sky",
          "grade": "MP · Hoche",
          "time": "il y a 2 h",
          "text": "Et si tu veux une CNS sans diagonaliser : f et g commutent ssi pour tout polynôme P, ker P(f) est stable par g (quand P(f) = 0 sur le spectre, il faut ajuster). C’est plus élégant à l’oral qu’on ne le pense.",
          "upvotes": 16
        }
      ]
    },
    {
      "id": "banque-ccinp-astuces",
      "category": "Concours",
      "title": "Vos meilleures astuces pour attaquer la banque CCINP",
      "excerpt": "Les sujets sont longs et la gestion du temps me tue. Vous commencez par quoi : les petites questions ou le problème principal ?",
      "author": "Sofia M.",
      "initials": "SM",
      "avatarColor": "peach",
      "grade": "MP · Chaptal",
      "time": "il y a 6 h",
      "replies": 42,
      "views": "2,1k",
      "upvotes": 117,
      "tags": [
        "CCINP",
        "stratégie",
        "annales"
      ],
      "pinned": false,
      "content": "Les sujets CCINP sont longs et la gestion du temps me tue. Vous commencez par quoi : les petites questions ou le problème principal ? Et vous faites vraiment les 3 problèmes dans l’ordre ?\n\nJe prends tous les conseils, même les plus basiques.",
      "answers": [
        {
          "id": "r6",
          "author": "Nour H.",
          "initials": "NH",
          "avatarColor": "butter",
          "grade": "MP* · Pasteur",
          "time": "il y a 5 h",
          "text": "Je survole 5 minutes pour repérer les questions accessibles. Ensuite, je fais les questions courtes de chaque problème avant d’attaquer les gros morceaux. L’objectif est de sécuriser des points tôt, pas de finir un problème entier.",
          "upvotes": 58
        },
        {
          "id": "r7",
          "author": "Yanis R.",
          "initials": "YR",
          "avatarColor": "mint",
          "grade": "MP* · Stan",
          "time": "il y a 4 h",
          "text": "Une règle simple : jamais plus de 10 minutes bloqué sur une question. Je note l’idée en une ligne et je passe. À la fin, je reviens avec un regard neuf. Ça m’a fait gagner au moins 2 points.",
          "upvotes": 36
        }
      ]
    },
    {
      "id": "fiches-electromagnetisme",
      "category": "Physique",
      "title": "Fiches d’électromagnétisme : on mutualise ?",
      "excerpt": "Je commence une fiche de synthèse sur Maxwell et l’induction. Je peux partager mon LaTeX ici, et on corrige à plusieurs ?",
      "author": "Nour H.",
      "initials": "NH",
      "avatarColor": "butter",
      "grade": "MP* · Pasteur",
      "time": "hier",
      "replies": 12,
      "views": "640",
      "upvotes": 73,
      "tags": [
        "LaTeX",
        "électromagnétisme",
        "fiches"
      ],
      "pinned": false,
      "content": "Je commence une fiche de synthèse sur Maxwell et l’induction. Je peux partager mon LaTeX ici, et on corrige à plusieurs ? L’idée serait d’avoir une fiche propre, avec les hypothèses, les pièges et les schémas minimaux.\n\nSi ça vous dit, je mets le fichier en commentaire ce soir et on relit ensemble.",
      "answers": [
        {
          "id": "r8",
          "author": "Lina B.",
          "initials": "LB",
          "avatarColor": "lime",
          "grade": "MP* · Ginette",
          "time": "hier",
          "text": "Partante pour la relecture ! Je peux ajouter la partie induction et les conventions de signe, c’est là que je fais toujours des erreurs.",
          "upvotes": 19
        }
      ]
    },
    {
      "id": "choisir-livre-info",
      "category": "Informatique",
      "title": "Quel livre pour progresser en informatique sans se noyer ?",
      "excerpt": "Le cours de mon lycée est très léger. Je cherche un livre accessible pour consolider les algos et Python avant les concours.",
      "author": "Mehdi A.",
      "initials": "MA",
      "avatarColor": "sky",
      "grade": "MP · Hoche",
      "time": "hier",
      "replies": 9,
      "views": "412",
      "upvotes": 24,
      "tags": [
        "Python",
        "livres",
        "algorithmes"
      ],
      "pinned": false,
      "content": "Le cours de mon lycée est très léger. Je cherche un livre accessible pour consolider les algos et Python avant les concours, sans tomber dans un traité de 900 pages.\n\nVous avez des références qui vous ont vraiment servi ?",
      "answers": [
        {
          "id": "r9",
          "author": "Adam K.",
          "initials": "AK",
          "avatarColor": "lilac",
          "grade": "MP · Louis-le-Grand",
          "time": "hier",
          "text": "Le cours d’info de la prépa + les annales suffisent largement. Si tu veux un supplément, regarde les ressources de France IOI pour les algos, c’est très progressif et gratuit.",
          "upvotes": 14
        }
      ]
    }
  ]
};
