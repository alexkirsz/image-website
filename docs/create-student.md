# Créer une page étudiant

Pour créer une page étudiant, crée un dossier au chemin `people/students/{promo}/{prenom-nom}`. Ce dossier doit contenir un fichier `about.md`, qui contient toutes les informations à afficher sur ta page étudiant.

[Voici un exemple de fichier `about.md`](people/students/2020/alexandre-kirszenberg/about.md), qui décrit la page utilisateur https://image-epita.netlify.com/students/2020/alexandre-kirszenberg.

Une fois tes modifications effectuées, crée une [Merge Request](https://gitlab.com/epita-image/website/website/merge_requests/new) pour les publier sur le site. Pas besoin d'attendre que ta MR soit acceptée : une version du site temporaire sera déployée instantanément et son lien publié sur ta MR pour que tu puisses visualiser tes changements.

🇬🇧 Si tu veux aussi apparaître sur la version du site en anglais, crée aussi un fichier `about.en.md` qui contiendra la description de ton profil en anglais.

## Format du fichier `about.{en.md,.md}`

La section démarquée par `---` est appelée *frontmatter* et répond au format [YAML](https://en.wikipedia.org/wiki/YAML). Certains champs sont obligatoires (⚠️) pour que l'affichage de la page fonctionne correctement. Les autres champs sont facultatifs, et ne seront pas affichés si non renseignés.

❗️Attention, les URLs des fichiers hébergés sur le site (CV, images, etc.) changent à chaque fois que le fichier-même change. Il est donc fortement déconseillé de les partager, au risque qu'elles disparaissent.

* ⚠️ `firstName` : Ton prénom.
* ⚠️ `lastName` : Ton nom.
* ⚠️ `picture` : Chemin relatif vers une photo de toi, de préférence carrée. Cette photo peut être au format JPG ou PNG. Le nom de fichier n'importe pas, mais le fichier pointé doit exister.
* ⚠️ `headline` : Un sous-titre à afficher en dessous de ton nom.
* ⚠️ `background` : Chemin relatif vers un fond d'écran, de haute résolution. Comme le champ `picture`, le format ou nom de fichier importe peu, mais il doit exister.
* `resume` : Chemin relatif vers ton CV.
* `website` : Lien vers ton site web.
* `github` : Lien vers ton profil GitHub.
* `twitter` : Lien vers ton profil Twitter.
* `linkedin` : Lien vers ton profil LinkedIn.
* `theme` :
  * `dark` (défaut) : À utiliser quand l'image de fond d'écran est sombre, pour que le texte en surimpression soit affiché en blanc.
  * `light` : Inversement, affiche le texte en noir.
* `contrast` : À définir comme `true` pour ajouter une ombre de contraste au texte. Inutile si le fond d'écran est uni ou comporte peu de détails.

### *À Propos*

La section sous la *frontmatter*, démarquée par le deuxième `---`, répond au format [Markdown](https://en.wikipedia.org/wiki/Markdown). Son contenu sera affiché formatté sur la page utilisateur. Il est possible d'y référencer des fichiers locaux (PDF, images, vidéos, etc.) en utilisant un chemin relatif.
