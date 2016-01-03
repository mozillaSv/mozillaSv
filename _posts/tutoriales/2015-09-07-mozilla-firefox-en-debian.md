---
layout: post
title: "Instalar Mozilla Firefox en Debian"
modified:
categories: tutoriales
excerpt: Como instalar Mozilla Firefox en Debian GNU/Linux
tags: [Mozilla, Firefox, Debian]
author: carlos_carcamo
comments: true
share: true
image:
  feature: http://res.cloudinary.com/djpqkjsmr/image/upload/v1451781090/MozSV/moz-debian.png
  external: true
  credit: Mozilla El Salvador
date: 2015-09-08T15:08:34-06:00
---

Como ya muchos sabemos, debian por defecto no trae Firefox sino un fork llamado Iceweasel, que no esta mal, pero como Mozilleros queremos en nuestro sistema el navegador Firefox así que vamos a instalarlo en Debian :)


Antes que nada mencionar que esta no es la única forma de instalar Mozilla Firefox en debian pero, esta es una de las formas más fáciles y rápidas de hacerlo.

**Nota:** *en este tutorial estoy usando debian wheezy (old stable), pueda que este tutorial no funcione en debian Jessie (debian stable). Favor comentar abajo si funciona con Jessie.*

Vamos a usar los repositorios de Linux Mint, procedamos de la siguiente manera:

Editamos el **sources.list**

```bash
$ sudo nano /etc/apt/sources.list
```

Agregamos la siguiente linea:

```bash
deb http://packages.linuxmint.com debian import
```

Guardamos y actualizamos los repositorios

```bash
$ sudo apt-get update
```

Si da un error como:

```bash
W: GPG error: http://packages.linuxmint.com debian Release: The following signatures couldnt be verified because the public key is not available: NO_PUBKEY 3EE67F3D0FF405B2
```

Vamos a importar el PUBKEY 3EE67F3D0FF405B2 como sigue:

```bash
$ sudo gpg --keyserver pgp.mit.edu --recv-keys 3EE67F3D0FF405B2
$ sudo gpg --export 3EE67F3D0FF405B2 > 3EE67F3D0FF405B2.gpg
$ sudo apt-key add ./3EE67F3D0FF405B2.gpg
$ sudo rm ./3EE67F3D0FF405B2.gpg
```

ahora volvemos a ejecutar

```bash
$ sudo apt-get update
```

Listo! ya puedes instalar Mozilla Firefox en tu sistema

```bash
$ sudo apt-get install firefox
```

Ahora tendrás instalado tanto Firefox como Iceweasel y podrás usarlos sin problemas, pero no trates de usarlos al mismo tiempo porque te dirá que ya estas ejecutando una instancia de Firefox. Si únicamente quieres tener Firefox en tu sistema, puedes remover Iceweasel

```bash
$ sudo apt-get remove iceweasel
```

Por ultimo, si no vas a usar los repositorios de Linux Mint, recuerda quitar o comentar la linea en el **sources.list** y actualizar de nuevo tus repositorios con ```sudo apt-get update``` para tener todo como antes.

**Nota final:** Con lo anterior también podemos instalar [thunderbird](https://www.mozilla.org/en-US/thunderbird/) igual como instalamos Firefox:

```bash
$ sudo apt-get install thunderbird
```
