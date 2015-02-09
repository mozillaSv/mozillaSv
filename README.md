Sitio web Mozilla El Salvador
=====================================
[![Build Status](https://travis-ci.org/mozillaSv/mozillaSv.svg)](https://travis-ci.org/mozillaSv/mozillaSv)
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
dirigirse a la [documentación oficial de jekyll](http://jekyllrb.com/docs/home/).

A continuación una lista de los archivos de configuración más importantes en este proyecto:

* _config.yml, contiene la configuración general del proyecto.
* _data/navigation.yml, los links de navegación van en este archivo.
* _data/authors.yml, la lista de autores de articulos, post, tutos, etc.

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

##Crear posts
Para crear post jekyll usa el lenguaje de marcado [Markdown](http://es.wikipedia.org/wiki/Markdown), los post, articulos, etc, se deben escribir en este formato, ver el directorio **_post** para ejemplo.

##Desarrollo
Pendiente...


**Nota:** El tema del sitio web que estamos usando se llama [So Simple Theme](https://github.com/mmistakes/so-simple-theme) y esta bajo [licencia MIT](https://github.com/mmistakes/so-simple-theme/blob/master/LICENSE).
