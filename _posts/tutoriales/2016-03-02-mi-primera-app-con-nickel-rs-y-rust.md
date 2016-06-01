---
layout: post
title: Nickel.rs y Rust
modified:
categories: tutoriales
excerpt: Nickel, un web framework inspirado en ExpressJS para Rust
tags: [Mozilla, Rust, Desarrollo, Programación]
author: eduardo_valencia
comments: true
share: true
image:
  feature: http://res.cloudinary.com/djpqkjsmr/image/upload/v1456935246/MozSV/nickel_rust.png
  external: true
  credit: Andrés Godínez
  creditlink: http://andresgodinez.com/  
date: 2016-03-02T09:37:21-06:00
---

Mi primera app con Nickel y Rust
===================


Nickel.rs es un framework web para utilizar [Rust](https://www.rust-lang.org/) y crear aplicaciones que podamos visualizar y correr en nuestro navegador web, en este tutorial veremos un ejemplo sencillo en el que crearemos un clásico “hello world” con rust y podremos correrlo en nuestro navegador Firefox, en un [tutorial pasado](http://mozillasv.github.io/tutoriales/hola-mundo-con-rust/) vimos algunos detalles sobre rust, su instalación y también conceptos que pueden servir para dar tus primeros pasos en este grandioso lenguaje desarrollado por Mozilla.

----------


Iniciemos
-------------

Primero vamos a crear un proyecto con [Cargo](http://doc.crates.io/index.html), que es un administrador de paquetes para Rust, vamos a instalar lo necesario para que nuestra app funcione.

```bash
$ cargo new nickel-demo --bin && cd nickel-demo
```

> <b>Nota:</b>  
> - Con este comando hemos creado un directorio y también la estructura inicial de nuestro proyecto.


#### <i class="icon-file"></i> Cargo.toml

El archivo Cargo.toml es el manifiesto que describe todas las dependencias de la aplicación y también le dice a Cargo cómo construir el proyecto.

```toml
[dependencies]
nickel = "*"
```

Nuestro archivo Cargo.toml debe tener la siguiente estructura:

```toml    
[package]
name = "my-demo"
version = "0.0.1"
authors = ["Your Name <your.name@somewhere.com>"]
[dependencies]
nickel = "*"
```

> Puedes editar el archivo y agregarle un nombre, una versión y el nombre del desarrollador.

#### <i class="icon-file"></i> main.rs

```rust
fn main() {
	println!("Hello World!");
}
```

Inicialmente nuestro archivo main.rs trae la sintaxis básica de un hola mundo, pero vamos a modificarlo con el siguiente código para poder ejecutarlo desde la web.

```rust
#[macro_use] extern crate nickel;
use nickel::Nickel;

fn main() {
	let mut server = Nickel::new();

	server.utilize(router! {
	    get "**" => |_req, _res| {
	        "Hola Mozilleros!"
	    }
	});

	server.listen("127.0.0.1:6767");
	}
```

#### <i class="icon-pencil"></i> El código

Con este sencillo ejemplo hemos creado una pequeña aplicación que podemos ejecutarla en nuestro navegador web, hemos creado la sintaxis que servirá para que Nickel pueda ejecutar un servidor local y poder mostrar nuestro hola mundo, genial no?  
Pero falta lo más interesante y es como vamos a ejecutar nuestra aplicación y utilizaremos los siguientes comandos:
(<i>recuerda que esto debes ejecutarlo dentro del directorio de tu aplicación</i>)

```bash
$ cargo build
```

----------

**Cargo Build:**
Se encargará de descargar todas las dependencias necesarias para que nuestro proyecto funcione correctamente.

----------

**Cargo run:**
Este comando se encargará de poner en marcha nuestra aplicación en el servidor y puerto que le especificamos en el nuestro archivo Cargo.toml

----------


Ahora tenemos nuestra app lista, solo debes abrir la siguiente dirección en tu navegador y listo!

```
http://localhost:6767
```

Genial! esto a sido todo, pero pronto habrá mucho más sobre Rust y veremos ejemplos un poco más complejos a medida de crear aplicaciones mucho más grandes.  
Puedes descargar este ejemplo [aquí](https://github.com/mozillaSv/RustEjemploWeb).


Documentación y enlaces que pueden interesarte:  
- [Rust](https://www.rust-lang.org/)  
- [Ejemplos con Rust](http://rustbyexample.com/)  
- [Nickel.rs](http://nickel.rs/)
