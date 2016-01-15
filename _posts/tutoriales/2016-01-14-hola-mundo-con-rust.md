---
layout: post
title: Hola Mundo Con Rust
modified:
categories: tutoriales
excerpt: Un lenguaje seguro, concurrente y práctico.
tags: [Mozilla, Rust, Desarrollo, Programación]
author: eduardo_valencia
comments: true
share: true
image:
  feature: http://res.cloudinary.com/djpqkjsmr/image/upload/v1452786574/MozSV/rust-banner.png
  external: true
  credit: Andrés Godínez
  creditlink: http://andresgodinez.me/  
date: 2016-01-14T09:57:37-06:00
---

Rust es el nuevo lenguaje de programación que se centra en el rendimiento, la paralelización, y la seguridad de la memoria.

Con la construcción de un lenguaje a partir de cero más la integración de elementos de lenguaje de programación moderno, Rust es capaz de fusionar la sintaxis expresiva y flexibilidad de lenguajes de alto nivel con el control sin precedentes y el rendimiento de un lenguaje de bajo nivel.

Rust es desarrollado por Mozilla de una forma totalmente libre por lo cual podemos contribuir u opinar acerca de este lenguaje en su [Repositorio en Github](https://github.com/rust-lang/rust).

Rust nos permite crear aplicaciones desde la parte del cliente y también en el servidor, en cuanto a sintaxis podemos encontrar similitudes a otros lenguajes, con bloques de código delimitados por `{ }`, más estructuras de control como `if, for, do, while`.

En este post te mostramos como puedes instalar Rust en tu computadora y dar los primeros pasos para programar en este grandioso lenguaje, asi que ¡manos a la obra y veamos un poco de lo que debemos hacer!

## Instalemos Rust:
Puedes instalar Ruts en una computadora con GNU/Linux, Mac o Windows con los siguientes comandos:

```bash
$ curl -f -L https://static.rust-lang.org/rustup.sh -O
```

> **Nota:** Este comando nos descarga rust en el directorio en que nos encontremos

Luego para su instalación ejecutamos:

```bash
$ sh rustup.sh
```

Listo! Para asegurarnos que la instalación fue exitosa podemos comprobar con el siguiente comando, el cual nos mostrará la version de Rust instalada en nuestra computadora:

```bash
$ rustc --version
```

> **Nota:** Si lo instalas en windows puedes descargar el instalador apropiado en [aquí][1].  
> Ten en cuenta que el instalador en windows no toma por defecto el PATH para que puedas utilizar Rust desde línea de comandos, para ello en la instalación debes hacer lo siguiente:  
> -- En el diálogo de la Instalación, haz clic en opciones avanzadas  
> -- Luego en “características del producto”  
> -- Seguido, la opción “añadir a PATH” e instalarlo en tu disco local.

## "Hola Mundo!"
Ahora que ya tenemos Rust en nuestra computadora, creemos nuestro primer “Hola mundo” con Rust. Veamos la sintaxis y cómo ejecutaremos nuestro código:

* Creamos un directorio nuevo donde se guardará nuestro script de Rust y entramos a él:

  ```bash
  $ mkdir hello_MozSV
  $ cd hello_mozSV
  ```

* Ahora creamos nuestro archivo fuente el cual contendrá el código, al que llamaremos `hello_mozSV.rs`

```bash
$ touch hello_MozSV.rs
```

> Se crea el archivo con extensión .rs ya que hace referencia a que es un archivo de Rust.

Luego en el archivo que hemos creado escribiremos el siguiente código:

```rust
fn main() {
  println!("Hola, Mozilleros de EL Salvador!");
}
```

Guardamos nuestro archivo y dentro del directorio ejecutamos:


![figure01](http://res.cloudinary.com/djpqkjsmr/image/upload/v1452792886/MozSV/tuto.png)

Esto nos creará un archivo compilado que podremos ejecutar de la siguiente manera:

![figure02](http://res.cloudinary.com/djpqkjsmr/image/upload/v1452792886/MozSV/tuto2.png)

>Es importante que tengamos en cuenta que por cada cambios que hagamos en nuestro script, primero debemos ejecutar el comando:  
> `$ rustc nombre_del_archivo.rs`  
> Para que luego podamos ver los cambios con solo ejecutar  
> `$ ./archivo`

Ahora veamos un poco de detalles de lo que acabamos de hacer.

Con el siguiente trozo de código se define una función con Rust, la función principal de todo programa en Rust:

```rust
fn main(){
  //content
}
```

Las líneas de codigo que hacen todo el trabajo en un programa con Rust van dentro de esa función, en nuestro caso sería:

```rust
println!("Hola, Mozilleros de EL salvador!!");
```

Pero existen detalles muy importantes que debemos tomar en cuenta como lo es el primero, a la hora de escribir codigo dentro de funciones **debes usar sangría con cuatro espacios, no tabs**, puedes ver como configurar algunos  editores [aquí][2].

Lo segundo es la parte `println!( //content )`, esto se llama **macro** en Rust, que es como [metaprogramación][3], en esta parte no es necesario preocuparnos por esto, ya que iremos aprendiendolo poco a poco.

Lo tercero se trata del comando `$ rustc archivo.rs` que sirve para compilar nuestro programa como se mencionó anteriormente, **debemos ejecutarlo cada vez que hagamos cambios en el archivo**.

Con esto encontraremos dos archivos en nuestro directorio, uno con el código fuente de nuestro programa (source) y otro como un ejecutable (binario).

>El ejecutable podemos compartirlo con otras personas para que lo ejecuten sin la necesidad que tenga instalado Rust para poder usarlo.

Listo! hemos creado nuestro primer programa con Rust, si quieres probar el codigo puedes copiarlo desde [aqui][4] además también puedes ejecutarlo en [Rust Playground][5]

¡Hasta la próxima!


[1]: https://www.rust-lang.org/install.html
[2]: https://github.com/rust-lang/rust/blob/master/src/etc/CONFIGS.md
[3]: https://es.wikipedia.org/wiki/Metaprogramaci%C3%B3n
[4]: https://gist.github.com/EnriqueV/653a5dc6a2060d27b4d8
[5]: https://play.rust-lang.org/
