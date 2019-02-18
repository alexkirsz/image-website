# Développement

## Installation locale

Ce site utilise le générateur de site statique [Gatsby](https://www.gatsbyjs.org/). Pour développer en local, il est nécessaire d'avoir [Node.js](https://nodejs.org/en/) et [Yarn](https://yarnpkg.com/en/) d'installés.

```sh
# Récupère les sources du site web
git clone https://gitlab.com/epita-image/website/website.git
cd website

# Installe toutes les dépendances dans le dossier node_modules
yarn

# Lance une version du site en local
yarn start

# Génère la version statique du site et la sert en local
yarn build
yarn serve
```

## Déploiement

Le site est automatiquement déployé sur [Netlify](https://www.netlify.com/) à l'adresse https://image-epita.netlify.com/ lorsque la branche `master` est mise à jour.

Toutes les branches et MR sont aussi déployées à des URLs temporaires pour permettre de visualiser des changements sans avoir à installer le site en local.