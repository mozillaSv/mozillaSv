Sitio web Mozilla El Salvador
=====================================
[![Build Status](https://travis-ci.org/mozillaSv/mozillaSv.github.io.svg?branch=master)](https://travis-ci.org/mozillaSv/mozillaSv.github.io)
##Prerrequisitos para el desarrollo de la web
Antes que nada debemos tener instalado lo siguiente:

* [ruby](https://www.ruby-lang.org/en/documentation/installation/)
* [Bundler](http://bundler.io/)
* [Jekyll](http://jekyllrb.com/docs/installation/)

##Instalar dependencias:

```shell
$ bundle install
```

##Configuración:
Antes que nada para una mejor compresión de como esta formado la estructura de archivos y directorios de este proyecto y jekyll en general,
dirigirse a la [documentación oficial de jekyll](http://jekyllrb.com/docs/structure/).

Este proyecto esta formado por la siguiente estructura de archivos:


    ├── _data/
    |    ├── authors.yml   			# Lista de autores para el blog, quien quiera escribir deberá agregar sus datos en este archivo
    |    └── navigation.yml         # los links de navegación del sitio
    ├── _includes/
    |    ├── browser-upgrade.html   # Mensaje al usuario para que instale un navegador moderno, en caso de < IE9
    |    ├── disqus-comments.html   # Script para comentarios en Disqus
    |    ├── feed-footer.html       # pie de pagina de post en feed
    |    ├── footer.html            # Footer del sitio
    |    ├── head.html              # Head del sitio
    |    ├── navigation.html        # menú de navegación
    |    ├── open-graph.html        # meta tags para Open Graph y Twitter cards
    |    └── scripts.html           # Scripts
    ├── _layouts/
    |    ├── page.html               # Plantilla para paginas
    |    └── post.html               # Plantilla para post
    ├── _posts/                      # Post en formato MarkDown, ver http://bit.ly/1U2L6Em
    ├── _sass/                       # Sass stylesheets
    ├── _templates/                  # Usado por Octopress para definir variables YAML para nuevos posts/pages
    ├── nosotros/                    # Pagina Nosotros
    ├── eventos/                     # Pagina que lista los post de la categoría: eventos
    ├── tutoriales/                  # Pagina que lista los post de la categoría: tutoriales
    ├── assets/
    |    ├── css/                    # stylesheets compilados
    |    ├── fonts/                  # webfonts
    |    └── js/
    |        ├── _main.js            # Archivo JavaScript principal, configuración de plugin, etc
    |        ├── plugins/            # Scripts and jQuery plugins para combinar en _main.js
    |        ├── scripts.min.js      # _main.js + plugin scripts concatenados y minificado
    |        └── vendor/             # vendor scripts
    ├── blog/                        # Lista los posts
    ├── images/                      # Imágenes para post y paginas
    ├── 404.md                       # Pagina de error 404
    ├── feed.xml                     # Atom feed template
    ├── index.md                     # Index, lista los ultimos post
    ├── Gemfile                      # Archivo de dependencia, bundler usara este archivo para instalar las dependencias
    ├── Gruntfile.js                 # Tareas Grunt
    ├── _config.yml                  # Configuración global del sitio
    ├── _octopress.yml               # Configuración de octopress, ver http://bit.ly/1LPEgAO
    ├── package.json                 # Dependencias a instalar via npm
    └── search.json/                 # Script de búsqueda dentro del sitio


##Probar el sitio web localmente:

Primero compilamos el proyecto:

```shell
$ bundle exec jekyll build
```

Luego

```shell
$ bundle exec jekyll serve
```

Listo, ahora para ver el sitio web vamos a [http://localhost:4000](http://localhost:4000).

**Nota:** para que los links funcionen bien localmente, hay que sustituir la url en ```_config.yml``` por la url local, en este caso: http://localhost:4000

## Formato para crear post

Para crear post jekyll usa el lenguaje de marcado [Markdown](http://es.wikipedia.org/wiki/Markdown). Los post y paginas se deben escribir en este formato (ver el directorio **_post** para ejemplo).

## Desarrollo

### Crear posts

Para crear post vamos a usar un par de comandos que crearan una estructura base para comenzar a redactar contenido:

```
$ octopress new post "Titulo del post" --dir blog
```

Si lo anterior da error, tratar con:

```
$ bundle exec octopress new post "Titulo del post" --dir blog
```

Esto creará un archivo con un nombre formado por la fecha de creación y el titulo del post, ejemplo: 2015-07-27-hello-world.md. El archivo estara dentro de: ```_posts/blog/```.
La ruta del archivo puede cambiar, en este caso hemos especificado con ```--dir blog``` que se cree en el directorio **blog** dentro de ```_posts/```.
Octopress asociara ```--dir``` con una categoría por lo que hay que tomar en cuenta que en este sitio web se manejan 3 categorías:

* eventos: para postear eventos
* blog: acá estarán las entradas al blog
* tutotiales: entradas a la sección tutoriales

De ser necesario se pueden crear más categorías y no olvidar actualizar el archivo index.html para que incluya la nueva categoría.

El archivo generado por el comando anterior sera similar al siguiente:

```
---
layout: post
title: "Titulo del post"
modified:
categories: blog
excerpt:
tags: []
image:
  feature:
  external:
date: 2015-07-27T15:32:23-06:00
---
```

Acá unos ejemplos de como escribir entradas en la pagina:

* Ejemplo de post en blog: http://bit.ly/1HW6xkM
* Ejemplo de post en categoría eventos: http://bit.ly/1VJPYzO
* Ejemplo de post en categoría tutoriales: http://bit.ly/1ghjInF

Prestar especial atención a los siguientes parámetros dentro de cada post:

```
categories: tutoriales
author: carlos_carcamo
image:
  feature: so-simple-sample-image-5.jpg
  external: false
  credit: WeGraphics
  creditlink: http://wegraphics.net/downloads/free-ultimate-blurred-background-pack/
```

- **categories:** Especificar a que categoría pertenece el post
- **author:** El autor del post según este configurado en ```_data/authors.yml```
- **image:** Si se quiere agregar una imagen en el header para cada post, acá debemos especificar un par de parámetros:
  * **feature:** nombre de la imagen o url de la imagen
  * **external:** escribir **true** si la imagen es externa (usar url en **feature**) y **false** si la imagen es local (en **feature** usar el nombre de la imagen dentro de la carpeta **images**).
  * **credit:** Si es necesario dar créditos a alguien por la imagen.
  * **creditlink:** Url de quien se da créditos por la imagen

### Crear una nueva pagina

Para crear una nueva pagina usar el siguiente comando:

```
$ octopress new page <nombre-pagina>/
```

Esto creara una pagina en ```<nombre-pagina>/index.md``` con el formato siguiente:

```
---
layout: page
title: ""
date:
modified:
excerpt:
image:
  feature:
---
```

Podemos acceder a esta pagina por medio de la url, por ejemplo: ```http://localhost:4000/<nombre-pagina>/```

La pagina no aparecerá en el menú, pero podemos agregarla facilmente editando el archivo: ```_data/navigation.yml``` agregando lo siguiente:

```
- title: Titulo que aparecerá en el menú
  url: /<nombre-pagina>/
```


**Nota:**
Si por ejemplo en algun post o pagina queremos poner código fuente de ejemplo, podemos usar la siguiente sintaxis:

```
{% highlight python %}
import os
if os.path.isdir("/tmp"):
  print "/tmp is a directory"
else:
  print "/tmp is not a directory"
{% endhighlight %}
```

Jekyll aplicará un estilo especial al código para que se muestre resaltado como código fuente según el lenguaje que especifiquemos en:
```{% highlight <lenguaje> %}```


## Contribuir y enviar actualizaciones del sitio

Usamos git para mantener registro del código y el sitio web esta alojado en github como una [github page](https://pages.github.com/).

Este repositorio solo tiene una rama, la **rama master**, quiere decir que cada commit enviado a esta rama automáticamente actualiza la web, por eso la necesidad de organizar un flujo de trabajo para enviar actualizaciones al sitio web.

Acá una propuesta para trabajar con este repositorio:

* Hacer un [fork](https://guides.github.com/activities/forking/) al repositorio y trabajar sobre tu copia
* Una creado y probado el nuevo contenido, hacer un [pull request](https://help.github.com/articles/using-pull-requests/) a esta repo.
* Verificar que no haya conflictos entre el nuevo código y el código base, de haber conflictos, resolverlos y actualizar el pull request.
* Una vez enviado el pull request, el administrador del repositorio verificará que todo este bien y hara un [merge](https://help.github.com/articles/merging-a-pull-request/) del pull request.
* Una vez el merge este hecho, el sitio web debera mostrar el contenido actualizado.


**Nota Final:** Este sitio web esta basado en un tema jekyll llamado [So Simple Theme](https://github.com/mmistakes/so-simple-theme) el cual ha sido adaptado a las necesidades de la organización.
El tema esta bajo [licencia MIT](https://github.com/mmistakes/so-simple-theme/blob/master/LICENSE).
