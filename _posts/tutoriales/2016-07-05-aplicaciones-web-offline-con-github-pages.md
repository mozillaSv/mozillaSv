---
layout: post
title: "Aplicaciones Web Offline Con GitHub Pages"
modified:  
categories: tutoriales
excerpt: Oghliner, simplifica tanto el offining y el despliegue de la web app.
tags: [Mozilla, Oghliner, Desarrollo, Programación, Web Apps, Offline]
author: agodin3z
comments: true
share: true
image:
  feature: http://res.cloudinary.com/djpqkjsmr/image/upload/v1467742817/MozSV/weboff.png
  external: true
date: 2016-07-05T12:13:36-06:00
---

*Post traducido del blog de [Mozilla Hacks](https://hacks.mozilla.org/), lee el original [aqui](https://hacks.mozilla.org/2015/11/offline-web-apps-on-github-pages/).*

[Service Workers][1] es una respuesta a los [problemas de la memoria caché de aplicaciones][2], y es una potente y elegante vía para su aplicación web offline. Pero también es más difícil de implementar y mantener.

Mientras tanto, [GitHub Pages][3] es un host estático grande y simple para [aplicaciones offline-first][4]. Pero el despliegue de aplicaciones en GitHub Pages requiere configuración manual, especialmente si se desarrollan con un equipo, utilizan alguna variante del [GitHub Flow][5] y establece un proceso continuo de implementación.

[Oghliner][6] es un paquete de [NPM][7] que simplifica tanto el offining de una aplicación con Service Workers y el despliegue de la aplicación a GitHub Pages (incluyendo el despliegue continuo usando [Travis CI][8]). El objetivo de Oghliner es que sea lo más simple posible para estar fuera de línea y desplegar una aplicación web.

Para comenzar a utilizar Oghliner, instálalo globalmente:

```bash
$ npm install --global oghliner
```

Si usted tiene una aplicación existente en un repositorio GitHub, escriba el comando **integrate** para configurarlo. Ese comando copia un script offline-manager.js (que registra el service worker) en su aplicación y recuerde que debe cargar ese script en las página(s)/plantilla(s) de su aplicación (uno de los pocos pasos que Oghliner todavía no automatiza).

```bash
$ oghliner integrate
Integrating Oghliner into the app in the current directory…

? Copying offline-manager.js to ./… done!

Oghliner has been integrated into the app!

The app needs to load the script offline-manager.js in order to register
the service worker that offlines the app. To load the script, add this line to 
the app's HTML page(s)/template(s):

<script src="offline-manager.js"></script>

And commit the changes and push the commit to the origin/master branch:

git commit -m"integrate Oghliner" --all
git push origin master

Then you can offline and deploy the app using the offline and deploy commands.

? For more information about offlining and deployment, see:
    https://mozilla.github.io/oghliner/
```

Si aún no dispone de una aplicación existente, cree una nueva aplicación mediante la [creación de un nuevo repositorio][9] en GitHub, clónelo a su máquina local, y escriba el comando **bootstrap** en su directorio de trabajo.

```bash
$ git clone git@github.com:mykmelez/offline-app.git
Cloning into 'offline-app'...
…
$ cd offline-app/
$ oghliner bootstrap
Bootstrapping current directory as Oghliner app…

Your app's configuration is:

Name: offline-app
Repository: git@github.com:mykmelez/offline-app.git
Description: A template app bootstrapped with oghliner.
License: Apache-2.0

Would you like to change its configuration (y/N)? 

Creating files…
? Creating README.md
? Creating .gitignore
? Creating gulpfile.js
? Creating package.json
? Creating app/favicon.ico
? Creating app/fonts
? Creating app/index.html
? Creating app/robots.txt
? Creating app/images/apple-touch-icon-114x114.png
? Creating app/images/apple-touch-icon-120x120.png
? Creating app/images/apple-touch-icon-144x144.png
? Creating app/images/apple-touch-icon-152x152.png
? Creating app/images/apple-touch-icon-57x57.png
? Creating app/images/apple-touch-icon-60x60.png
? Creating app/images/apple-touch-icon-72x72.png
? Creating app/images/apple-touch-icon-76x76.png
? Creating app/images/favicon-128x128.png
? Creating app/images/favicon-16x16.png
? Creating app/images/favicon-196x196.png
? Creating app/images/favicon-32x32.png
? Creating app/images/favicon-96x96.png
? Creating app/images/mstile-144x144.png
? Creating app/images/mstile-150x150.png
? Creating app/images/mstile-310x150.png
? Creating app/images/mstile-310x310.png
? Creating app/images/mstile-70x70.png
? Creating app/scripts/main.js
? Creating app/scripts/offline-manager.js
? Creating app/styles/stylesheet.css

? Creating files… done!
? Installing npm dependencies… done!

Your app has been bootstrapped! Just commit the changes and push the commit
to the origin/master branch:

git add --all && git commit -m"initial version of Oghliner app"
git push origin master

Then you can build, offline, and deploy the app using gulp commands.

? For more information about building, offlining and deployment, see:
    https://mozilla.github.io/oghliner/
```


Por último, confirme los cambios para completar la configuración.

```bash
$ git add --all && git commit -m"initial version of Oghliner app"
```

Ahora que su aplicación está configurada, puede compilarla, desconectarla y desplegarla. El arranque de aplicaciones incluye un script de compilación gulpfile.js. Para compilar, instale gulp globalmente:

```bash
$ npm install --global gulp
```

Entonces simplemente escriba gulp:

```bash
$ gulp
```

Para desconectar su aplicación, invoque el comando **offline** para generar el service worker que desconectará su aplicación, especificando el directorio que contiene los archivos sin conexión.

```bash
$ oghliner offline dist/
Offlining dist/ to dist/offline-worker.js…

? Caching "dist/favicon.ico" (384 B)
? Caching "dist/images/apple-touch-icon-114x114.png" (278 B)
? Caching "dist/images/apple-touch-icon-120x120.png" (285 B)
? Caching "dist/images/apple-touch-icon-144x144.png" (321 B)
? Caching "dist/images/apple-touch-icon-152x152.png" (320 B)
? Caching "dist/images/apple-touch-icon-57x57.png" (242 B)
? Caching "dist/images/apple-touch-icon-60x60.png" (242 B)
? Caching "dist/images/apple-touch-icon-72x72.png" (247 B)
? Caching "dist/images/apple-touch-icon-76x76.png" (247 B)
? Caching "dist/images/favicon-128x128.png" (298 B)
? Caching "dist/images/favicon-16x16.png" (216 B)
? Caching "dist/images/favicon-196x196.png" (380 B)
? Caching "dist/images/favicon-32x32.png" (232 B)
? Caching "dist/images/favicon-96x96.png" (269 B)
? Caching "dist/images/mstile-144x144.png" (323 B)
? Caching "dist/images/mstile-150x150.png" (316 B)
? Caching "dist/images/mstile-310x150.png" (411 B)
? Caching "dist/images/mstile-310x310.png" (610 B)
? Caching "dist/images/mstile-70x70.png" (246 B)
? Caching "dist/index.html" (3.08 kB)
? Caching "dist/robots.txt" (102 B)
? Caching "dist/scripts/main.js" (151 B)
? Caching "dist/scripts/offline-manager.js" (1.1 kB)
? Caching "dist/styles/stylesheet.css" (107 B)
Total precache size is about 10.41 kB for 24 resources.
```

Para desplegar la aplicación (incluyendo el service worker) a GitHub Pages, invocar el comando **deploy**, y otra vez especifique el directorio que contiene los archivos de la aplicación.

```bash
$ oghliner deploy dist/
Deploying "initial version of Oghliner app" to GitHub Pages…

? Cloning git@github.com:mykmelez/offline-app.git into .gh-pages-cache… done!
? Cleaning… done!
? Fetching origin… done!
? Checking out origin/gh-pages… done!
? Removing files… done!
? Copying files… done!
? Adding all… done!
? Committing… done!
? Pushing… done!
```

Todos los comandos de Oghliner están disponibles a través de un módulo de interfaz, así que usted puede integrarlas en sus scripts de compilación Node-based usando herramientas como Grunt y Gulp.  Si usted hizo su aplicación con Oghliner, su gulpfile.js ya ha **desconectado** y **desplegado** (que también se puede utilizar como una alternativa a los comandos anteriores).

Por último, invocar el comando **configure** para configurar una aplicación para desplegarla automáticamente a GitHub Pages utilizando Travis CI cuando se combine un cambio en la rama principal de la aplicación (siempre que la compilacion se realizó con éxito y pasó las pruebas, por supuesto!).

```bash
$ oghliner configure

Configuring Travis to auto-deploy to GitHub Pages…

Your repository has a single remote, origin.
Ok, I'll configure Travis to auto-deploy the origin remote (mykmelez/offline-app).

To check the status of your repository in Travis and authorize Travis to push
to it, I'll create GitHub personal access tokens, for which I need your GitHub
username and password (and two-factor authentication code, if appropriate).

? For more information about GitHub personal access tokens, see:
    https://github.com/settings/tokens

Username: mykmelez
Password: 

× Checking credentials… error!

You're using two-factor authentication with GitHub.
Please enter the code provided by your authentication software.

Auth Code: 123456

? Checking credentials… done!
? Creating temporary GitHub token for getting Travis token… done!
? Getting Travis token… done!
? Deleting temporary GitHub token for getting Travis token… done!
  Creating permanent GitHub token for Travis to push to the repository…
? Creating permanent GitHub token for Travis to push to the repository… done!

? You had an existing token for this app, so we deleted and recreated it.

? Checking the status of your repository in Travis… done!

Good news, your repository is active in Travis!

? Encrypting permanent GitHub token… done!
? Writing configuration to .travis.yml file… done!

? You didn't already have a .travis.yml file, so I created one for you.
  For more information about the file, see:
    http://docs.travis-ci.com/user/customizing-the-build/

You're ready to auto-deploy using Travis!  Just commit the changes
in .travis.yml and push the commit to the origin/master branch:

git add .travis.yml
git commit -m"configure Travis to auto-deploy to GitHub Pages" .travis.yml
git push origin master

Then visit https://travis-ci.org/mykmelez/offline-app/builds to see the build status.
```

Entonces Travis desplegará la compilación exitosa (en la rama master):

![figure01](https://hacks.mozilla.org/files/2015/11/Screen-Shot-2015-11-16-at-16.34.53-500x110.png)

Un par de advertencias a tener en cuenta:

- El despliegue a veces toma unos minutos en aparecer en las páginas de GitHub.
- Los Service Workers requieren que se cargue la aplicación a través de una conexión cifrada (HTTPS). Todas las páginas de GitHub se pueden cargar a través de una conexión de este tipo, a pesar de que GitHub no lo admite oficialmente.
- Los Service Workers están disponibles en Chrome, Opera, y la edición para desarrolladores de Firefox. Lo estarán en Firefox 44.

[La iniciativa desarrollador de aplicaciones web][10] de Mozilla del equipo de ingeniería construyó Oghliner porque pensamos que Service Workers es una gran vía para las aplicaciones web offline, y GitHub Pages es una gran cosa para implementarlas, así que queríamos ver cuánto mejor podría ser la combinación.

Hemos utilizado Oghliner en nuestros propios proyectos, al igual que esta [presentación][11] y [Platatus][12], y esperamos que le guste. Así que a [aprender más sobre él][13], pruébelo, y háganos saber cómo funciona para usted!


[1]: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
[2]: http://alistapart.com/article/application-cache-is-a-douchebag
[3]: https://pages.github.com/
[4]: http://offlinefirst.org/
[5]: https://guides.github.com/introduction/flow/
[6]: https://github.com/mozilla/oghliner
[7]: https://www.npmjs.com/
[8]: https://travis-ci.org/
[9]: https://github.com/new
[10]: https://wiki.mozilla.org/Apps#Web_App_Developer_Initiative
[11]: https://mykmelez.github.io/offline-web-apps-on-github-pages/
[12]: https://github.com/mozilla/platatus
[13]: https://www.npmjs.com/package/oghliner

