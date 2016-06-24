---
layout: post
title: "Construye La Realidad Virtual en La Web Con A-Frame"
modified:  
categories: tutoriales
excerpt: ¿Qué aspecto tendría la Realidad Virtual (VR) en la Web?
tags: [Mozilla, VR, Desarrollo, Programación]
author: agodin3z
comments: true
share: true
image:
  feature: http://res.cloudinary.com/djpqkjsmr/image/upload/v1460681372/MozSV/a-frame.png
  external: true
date: 2016-04-14T18:50:03-06:00
---

*Post traducido del blog de [Mozilla Hacks](https://hacks.mozilla.org/), lee el original [aquí](https://hacks.mozilla.org/2016/03/build-the-virtual-reality-web-with-a-frame/)*


El [equipo de WebVR de Mozilla (MozVR)][1] estableció hace más de un año la pregunta: *"¿Qué aspecto tendría la Realidad Virtual (VR) en la Web?"* Hoy hacemos clic en los enlaces para saltar de página en página, un día caminaremos a través de portales para saltar de mundo en mundo. Lamentablemente, hay sólo un puñado de desarrolladores de WebGL en el mundo que sabe cómo crear experiencias 3D interactivos. Pero hay potencialmente millones de desarrolladores web, diseñadores y artistas 3D con deseo de una herramienta para crear contenido de Realidad Virtual fácilmente como construir una página web.

Recientemente hemos publicado un framework de código abierto llamado [A-Frame][2] para crear fácilmente experiencias 3D y realidad virtual en la web. A-Frame pone la creación de contenidos de VR en nuestras manos por lo que nos permite crear escenas con **declarativa HTML** que simplemente funciona en desktop, Oculus Rift y smartphones. Podemos manipular escenas con JavaScript básico tal como lo haría con los elementos HTML ordinarios, y podemos continuar usando nuestras bibliotecas y frameworks JavaScript favoritos (por ejemplo, [d3][3], [React][4]). Una escena básica en A-Frame se ve algo como:


<iframe height='266' scrolling='no' src='//codepen.io/team/mozvr/embed/jqERjQ/?height=266&theme-id=0&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/team/mozvr/pen/jqERjQ/'>Hello A-Frame - 2</a> by Mozilla VR (<a href='http://codepen.io/mozvr'>@mozvr</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>


En esta escena:

- Tenemos algunas geometrías básicas con `<a-cube>`, `<a-cylinder>`, `<a-sphere>`.
- Tenemos una imagen de la Web, usando`<a-image>`.
- Tenemos una foto de 360 grados usando `<a-sky>` para el fondo.
- Podemos movernos alrededor con las teclas WASD y mirar alrededor con arrastrar el ratón.

Para entrar en la realidad virtual, pulsamos el icono de las Gafas. Esta escena se puede ver en un Oculus Rift en una desktop o en un smartphone usando un soporte de Google Cardboard. O también puede funcionar como una escena 3D normal. Más información sobre la [introducción de VR][5]. La sintaxis anterior debe parecer familiar a casi todos; cada elemento debajo de `<a-scene>` representa un objeto 3D, y podemos modificar estos objetos usando atributos HTML. Bajo este marcado simple, sin embargo, se encuentra un framework 3D flexible y extensible.

### three.js + Sistema de Entidades y Componentes

Bajo la cubierta, A-Frame es un framework three.js que trae el modelo [sistema de entidades y componentes (ECS)][6] para el DOM. A-Frame esta construido como una capa de abstracción sobre [three.js][7] y es lo suficientemente extensible como para hacer casi cualquier cosa que three.js puede hacer.

El modelo ECS es un patrón de uso general en el desarrollo de juegos que favorece dimensionabilidad sobre herencia. Desde que A-Frame pretende acercar experiencias 3D altamente interactivas para la Web, éste adopta los patrones existentes de la industria de los videojuegos. En ECS, cada objeto en la escena es una [entidad][8], que es un contenedor general que por sí mismo no hace nada. [Los componentes][9] son módulos reusables que están conectados a una entidad con el fin de conectar la apariencia, comportamiento, y/o funcionalidad.

Para dar un simple ejemplo abstracto, podríamos tener los componentes color, neumáticos y motor. Podemos componer entidades configurando, mezclando y conectando los componentes reutilizables:

- Una entidad auto azul se compone por el componente color a azul, el componente neumático con el número establecido a cuatro, y asociando el componente motor.
- Una entidad bicicleta roja se compone por el componente color a rojo, el componente neumático con el número establecido a dos, y no asociando el componente motor.
- Una entidad barco amarillo se compone por el componente color a amarillo, el componente neumático con el número fijado a cero, y asociando el componente motor.

![figure01](http://thevrjump.com/assets/img/articles/aframe-system/aframe-example.jpg)

*Representación abstracta del patrón del sistema de entidades y componentes por Ruben Mueller de [The VR Jump][10].*

En A-Frame:

- Una entidad está representada por `<a-entity>`. Es el bloque de construcción básico que comprende todo dentro de una escena.
- Un componente está representado por un atributo HTML (por ejemplo `<a-entity engine>`).
- las propiedades de un componente se pasan a través de una cadena en un atributo HTML donde se analiza más adelante.
- Si un componente tiene una única propiedad para definir, entonces se parece a un atributo HTML normal (e.g. `<a-entity visible="false">`).
- Si un componente tiene más de una propiedad para definir, entonces las propiedades pasan a través de una sintaxis similar a los estilos CSS en línea (por ejemplo, `<a-entity engine="cylinders: 4; horsepower: 158; mass: 200">`).

Tomando `<a-cube>` por ejemplo, nosotros podemos descomponerlo en los componentes geometría (forma) y material (aspecto):

```html
<!-- Forma actual de <a-cube> -->
<a-entity 
	geometry="primitive: box; depth: 2; height: 10; width: 4"
	material="color: #FFF; src: url(texture.png)">
```

Los desarrolladores pueden escribir componentes para hacer casi cualquier cosa y compartir con otros desarrolladores de plug-and-play. Vamos a configurar y asociar más componentes para formar una entidad más compleja:

![figure02](http://imgur.com/ARrDX4m.gif)

En un patrón de ECS, casi toda la lógica y el comportamiento deben ser encapsulados dentro de los componentes para fomentar la modularidad y la reutilización.

### Construyendo una Escena Interactiva

Veamos un ejemplo de construcción de una escena donde el flujo de trabajo gira en torno a los componentes de la escritura. Construiremos una escena interactiva en la que podemos disparar rayos láser a los enemigos que nos rodean. Podemos utilizar los componentes estándar que se suministran con A-Frame, o usar componentes que los desarrolladores de A-Frame han publicado para el ecosistema. Mejor aún, podemos escribir nuestros propios componentes para hacer lo que queramos!

Si quieres seguir, hay varias formas de codificar con A-Frame:

- Jugando en [CodePen][11].
- Tomando el [Boilerplate][12].
- Incluyendo el [JS compilado][13].
- [Instalando desde npm][14].
- Juega con el [ejemplo terminado en CodePen][15].

Vamos a comenzar añadiendo un objetivo enemigo:


<iframe height='266' scrolling='no' src='//codepen.io/team/mozvr/embed/wGBLeB/?height=266&theme-id=dark&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/team/mozvr/pen/wGBLeB/'>Laser Shooter - Step 1</a> by Mozilla VR (<a href='http://codepen.io/mozvr'>@mozvr</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>


Esto crea una escena estática básica donde el enemigo te mira fijamente incluso a medida que se mueve alrededor. Podemos utilizar los componentes A-Frame del ecosistema para hacer algunas cosas interesantes.

### Uso de componentes

El [repositorio awesome-aframe][16] es un lugar excelente para encontrar componentes que la comunidad ha creado para habilitar nuevas características. Muchos de estos componentes se inician desde el [Component Boilerplate][17] y debe proporcionar estructuras en la carpeta `dist/` de sus repositorios. Tomemos el [diseño del componente][18], por ejemplo. Podemos agarrar la construcción, colocarlo en nuestra escena e inmediatamente podrá utilizarse un sistema de diseño 3D para colocar automáticamente las entidades. En lugar de tener un enemigo, vamos a tener diez enemigos colocados en un círculo alrededor del jugador:


<iframe height='266' scrolling='no' src='//codepen.io/team/mozvr/embed/bpNPjp/?height=266&theme-id=dark&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/team/mozvr/pen/bpNPjp/'>Laser Shooter - Step 2</a> by Mozilla VR (<a href='http://codepen.io/mozvr'>@mozvr</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>


Es desordenado en el marcado tener la entidad enemiga duplicada diez veces. Podemos colocarlo en la [plantilla del componente][19] para limpiar eso. También podemos utilizar el [sistema de animación][20] de A-Frame para tener enemigos de marchando en un círculo alrededor de nosotros.


<iframe height='266' scrolling='no' src='//codepen.io/team/mozvr/embed/JXoQBm/?height=266&theme-id=dark&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/team/mozvr/pen/JXoQBm/'>Laser Shooter - Step 3</a> by Mozilla VR (<a href='http://codepen.io/mozvr'>@mozvr</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>


Mezclando y combinando los componentes de diseño y plantilla, ahora tenemos diez enemigos que nos rodea en un círculo. Vamos a activar el juego escribiendo nuestros propios componentes.

### Escribiendo componentes


Los desarrolladores confortables con JavaScript y three.js puede escribir componentes para añadir apariencia, comportamiento y funcionalidad a las entidades. Como hemos visto, estos componentes pueden ser reutilizados y se comparten con la comunidad. No todos los componentes tienen que ser compartidos; pueden ser ad-hoc o one-off.

Los componentes consisten en datos que son definidos por el esquema y se pueden pasar a través de HTML, y los métodos del ciclo de vida, que definen cómo se utilizan los datos para modificar la entidad a la que está asociado. Los métodos de ciclo de vida por lo general interactúan con three.js, el DOM y las APIs de A-Frame. Mi anterior post del blog sobre [Cómo escribir un componente de VR][21] entra en más detalle sobre el uso de la API del componente para registrar un componente.

Para la escena, queremos ser capaces de disparar rayos láser a los enemigos para hacerlos desaparecer. Vamos a necesitar componentes para crear láseres al hacer clic, para generar clics, para impulsar los láseres, y para verificar si un láser golpea a un enemigo.

#### Componente spawner 

Vamos a empezar por ser capaces de crear láseres. Queremos ser capaces de generar una entidad láser que comienza en la posición actual del jugador. Vamos a crear un componente spawner que escuchará un evento en la entidad, y cuando se emite este caso, vamos a generar una entidad con un [mixin][22] predefinido de componentes:

```js
AFRAME.registerComponent('spawner', {
  schema: {
    on: { default: 'click' },
    mixin: { default: '' }
  },

  /**
   * Add event listener to entity that when emitted, spawns the entity.
   */
  update: function (oldData) {
    this.el.addEventListener(this.data.on, this.spawn.bind(this));
  },

  /**
   * Spawn new entity with a mixin of componnets at the entity's current position.
   */
  spawn: function () {
    var el = this.el;
    var entity = document.createElement('a-entity');
    var matrixWorld = el.object3D.matrixWorld;
    var position = new THREE.Vector3();
    var rotation = el.getAttribute('rotation');
    var entityRotation;

    position.setFromMatrixPosition(matrixWorld);
    entity.setAttribute('position', position);

    // Have the spawned entity face the same direction as the entity.
    // Allow the entity to further modify the inherited rotation.
    position.setFromMatrixPosition(matrixWorld);
    entity.setAttribute('position', position);
    entity.setAttribute('mixin', this.data.mixin);
    entity.addEventListener('loaded', function () {
      entityRotation = entity.getComputedAttribute('rotation');
      entity.setAttribute('rotation', {
        x: entityRotation.x + rotation.x,
        y: entityRotation.y + rotation.y,
        z: entityRotation.z + rotation.z
      });
    });
    el.sceneEl.appendChild(entity);
  }
});
```

#### Componente click-listener

Ahora necesitamos una manera de generar un evento de clic sobre la entidad del jugador con el fin de generar el láser. Sólo podríamos escribir un controlador de eventos JavaScript en una secuencia de contenidos, pero es más reutilizable el escribir un componente que puede permitir a cualquier entidad escuchar clics:

```js
AFRAME.registerComponent('click-listener', {
  // When the window is clicked, emit a click event from the entity.
  init: function () {
    var el = this.el;
    window.addEventListener('click', function () {
      el.emit('click', null, false);
    });
  }
});
```

Desde el HTML, podemos definir el mixin del láser y fijar los componentes spawner y click-listener al jugador. Cuando hagamos clic, el componente spawner generará un laser de partida frente a la cámara:


<iframe height='266' scrolling='no' src='//codepen.io/team/mozvr/embed/jqEjvB/?height=266&theme-id=dark&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/team/mozvr/pen/jqEjvB/'>Laser Shooter - Step 4</a> by Mozilla VR (<a href='http://codepen.io/mozvr'>@mozvr</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>


#### Componente projectile

Ahora los láseres se generan en frente de nosotros cuando hacemos clic, pero necesitamos disparar y viajar.  En el componente spawner,  tuvimos el punto láser en la rotación de la cámara, y hemos rotado 90 grados alrededor del eje X para alinearlo correctamente. Podemos añadir un componente projectile para que el láser viaje directamente en la dirección de enfrente (su eje Y local en este caso):

```js
AFRAME.registerComponent('projectile', {
  schema: {
    speed: { default: -0.4 }
  },

  tick: function () {
    this.el.object3D.translateY(this.data.speed);
  }
});
```

Luego conecte el componente projectile al mixin del láser:

```html
<a-assets>
  <!-- Attach projectile behavior. -->
  <a-mixin id="laser" geometry="primitive: cylinder; radius: 0.05; translate: 0 -2 0"
	material="color: green; metalness: 0.2; opacity: 0.4; roughness: 0.3"
	projectile="speed: -0.5"></a-mixin>
</a-assets>
```

El laser ahora se disparará como un proyectil al hacer clic:


<iframe height='266' scrolling='no' src='//codepen.io/team/mozvr/embed/YqPmzK/?height=266&theme-id=dark&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/team/mozvr/pen/YqPmzK/'>Laser Shooter - Step 5</a> by Mozilla VR (<a href='http://codepen.io/mozvr'>@mozvr</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>


#### Componente collider 

El último paso es añadir un componente collider, así podemos detectar cuando el láser golpea una entidad. Esto lo podemos hacer usando [ Raycaster de three.js][23], dibujando una raya (línea) de un extremo del láser al otro, luego comprobar continuamente si uno de los enemigos están intersectando el rayo. Si un enemigo se intersecta con nuestra línea, entonces se está en contacto con el láser, y usamos un evento para decirle al enemigo que fue golpeado:

```js
AFRAME.registerComponent('collider', {
  schema: {
    target: { default: '' }
  },

  /**
   * Calculate targets.
   */
  init: function () {
    var targetEls = this.el.sceneEl.querySelectorAll(this.data.target);
    this.targets = [];
    for (var i = 0; i < targetEls.length; i++) {
      this.targets.push(targetEls[i].object3D);
    }
    this.el.object3D.updateMatrixWorld();
  },

  /**
   * Check for collisions (for cylinder).
   */
  tick: function (t) {
    var collisionResults;
    var directionVector;
    var el = this.el;
    var sceneEl = el.sceneEl;
    var mesh = el.getObject3D('mesh');
    var object3D = el.object3D;
    var raycaster;
    var vertices = mesh.geometry.vertices;
    var bottomVertex = vertices[0].clone();
    var topVertex = vertices[vertices.length - 1].clone();

    // Calculate absolute positions of start and end of entity.
    bottomVertex.applyMatrix4(object3D.matrixWorld);
    topVertex.applyMatrix4(object3D.matrixWorld);

    // Direction vector from start to end of entity.
    directionVector = topVertex.clone().sub(bottomVertex).normalize();

    // Raycast for collision.
    raycaster = new THREE.Raycaster(bottomVertex, directionVector, 1);
    collisionResults = raycaster.intersectObjects(this.targets, true);
    collisionResults.forEach(function (target) {
      // Tell collided entity about the collision.
      target.object.el.emit('collider-hit', {target: el});
    });
  }
});
```

A continuación, asignamos una clase a los enemigos para designarlos como blancos, asociando animaciones que se activan al colisionar para hacerlas desaparecer, y finalmente asociar el componente collider al láser que se dirige a los enemigos:

```html
<a-assets>
  <img id="enemy-sprite" src="img/enemy.png">

  <script id="enemies" type="text/x-nunjucks-template">
    <a-entity layout="type: circle; radius: 5">
      <a-animation attribute="rotation" dur="8000" easing="linear" repeat="indefinite" 
      			   to="0 360 0"></a-animation>

      { % for x in range(num) %}
        <!-- Attach enemy class. -->
        <a-image class="enemy" look-at="#player" src="#enemy-sprite" transparent="true">
          <!-- Attach collision handler animations. -->
          <a-animation attribute="opacity" begin="collider-hit" dur="400" ease="linear" 
          			   from="1" to="0"></a-animation>
          <a-animation attribute="scale" begin="collider-hit" dur="400" ease="linear" 
          			   to="0 0 0"></a-animation>
        </a-image>
      { % endfor %}

    </a-entity>
  </script>

  <!-- Attach collider that targets enemies. -->
  <a-mixin id="laser" geometry="primitive: cylinder; radius: 0.05; translate: 0 -2 0"
           material="color: green; metalness: 0.2; opacity: 0.4; roughness: 0.3"
           projectile="speed: -0.5" collider="target: .enemy"></a-mixin>
</a-assets>
```

Y ahí tenemos una escena interactiva básica completa en A-Frame que puede verse en VR. Empaquetamos potencia en componentes que nos permiten construir de forma declarativa escenas sin perder el control o la flexibilidad. El resultado: un rudimentario juego FPS que soporta la RV en última instancia, con **sólo 30 líneas de código HTML**:


<iframe height='266' scrolling='no' src='//codepen.io/team/mozvr/embed/reaXNr/?height=266&theme-id=dark&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/team/mozvr/pen/reaXNr/'>Laser Shooter - Final</a> by Mozilla VR (<a href='http://codepen.io/mozvr'>@mozvr</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>


### Comunidad

La comunidad ha construido algunas grandes cosas con sólo la versión inicial de A-Frame. Echa un vistazo a lo que se ha compartido en [Made With A-Frame][24] y [Awesome A-Frame][25].

Estamos todo el rato en el [Slack de A-Frame][26], que actualmente cuenta con casi 350 personas. Juega con [A-Frame][2] y ven a decirnos lo que piensas! La realidad virtual está llegando, y no te la querrás perder.

[1]: https://mozvr.com/
[2]: https://aframe.io/
[3]: https://www.youtube.com/watch?v=Tb2b5nFmmsM
[4]: https://github.com/ngokevin/aframe-react
[5]: https://mozvr.com/#start
[6]: https://en.wikipedia.org/wiki/Entity_component_system
[7]: http://threejs.org/
[8]: https://aframe.io/docs/core/entity.html
[9]: https://aframe.io/docs/core/component.html
[10]: http://thevrjump.com/
[11]: http://codepen.io/team/mozvr/pen/BjygdO?editors=100
[12]: https://github.com/aframevr/aframe-boilerplate
[13]: https://aframe.io/releases/0.1.2/aframe.min.js
[14]: https://www.npmjs.com/package/aframe
[15]: http://codepen.io/team/mozvr/pen/PNoWEz/?editors=1000
[16]: https://github.com/aframevr/awesome-aframe#components
[17]: https://github.com/ngokevin/aframe-component-boilerplate
[18]: https://github.com/ngokevin/aframe-layout-component
[19]: https://github.com/ngokevin/aframe-template-component
[20]: https://aframe.io/docs/core/animation.html
[21]: http://ngokevin.com/blog/aframe-component
[22]: https://aframe.io/docs/core/mixin.html
[23]: http://threejs.org/docs/index.html#Reference/Core/Raycaster
[24]: http://aframevr.tumblr.com/
[25]: https://github.com/aframevr/awesome-aframe
[26]: https://aframevr-slack.herokuapp.com/
