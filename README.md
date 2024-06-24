# card-fetch
 Template Literals

[Babel](https://babeljs.io)
[WebPack](https://github.com/webpack/webpack.js.org)

```javascript
npm install
```

# Comprender la paginación en el código
Este documento explica el concepto de paginación en código, ilustrado a través de la analogía de buscar productos en una tienda.

> Imagina una larga lista de productos en una tienda.  Tradicionalmente, es posible que tengas que navegar manualmente a través de las páginas de un catálogo u hojear muchas páginas físicas para ver todos los productos. Afortunadamente, en el mundo digital podemos implementar la paginación para navegar de forma eficiente por grandes conjuntos de datos.
---

Esta Prueba Técnica se centra en implementar 2 características que trabajan juntas para lograr la paginación:

## Característica 1
### Obtiene los datos de los productos de la API basándose en el desplazamiento y el límite.
## Característica 2
### Establece la posición inicial de paginación en 5 en localStorage.
Así es como estas características trabajan juntas:

### Punto de partida
La caracterísitica 2 establece el punto de partida inicial para navegar por la lista de productos (como el producto número 5 en nuestra analogía de la tienda). Este valor se almacena normalmente en localStorage, un mecanismo para que las aplicaciones web almacenen datos localmente en el dispositivo del usuario.

### Recuperación dinámica de datos
La caracterísitica 1 recupera un número específico de productos (definido por el límite) de la API. Esto es similar a ver un número limitado de productos por página en un catálogo. La llamada a la API utiliza el valor de desplazamiento (inicialmente fijado en 5) para determinar el punto de partida de la obtención de datos.

### Navegación y ajustes.
    
    Al pasar a la siguiente página de productos, el código responsable de la obtención de datos recupera el valor de desplazamiento actual de **localStorage**. A continuación, este valor se incrementa en el límite definido (número de productos por página) para obtener el siguiente conjunto de productos. El desplazamiento actualizado se utiliza en la siguiente llamada a la API.

> En esencia, la caracterísitica 2 proporciona el punto de referencia inicial para la obtención de datos, y la caracterísitica 1 aprovecha este valor junto con el límite para realizar llamadas dinámicas a la API para la recuperación paginada de productos. Este enfoque permite navegar de forma eficiente por grandes conjuntos de datos sin abrumar al usuario con una lista masiva de una sola vez.


# Package Integration with Vite

!["Fake Store API Vite Integration"](FakeStoreViteInt1.jpg)
Webpack Technical Test with Infinite Scroll and more functionalities

1. Añadir ciertos fragmentos de código a mi carpeta y luego instalar Vite para empezar a probar cada uno de ellos
```javascript
npm install vite --save-dev
```
Add Vite Specifications
```javascript
{
  "name": "Infinite Analysis",
  "version": "1.0.0",  
  "description": "A brief description of your project",  
  "scripts": {
  "dev": "vite",
  "build": "vite build"  
},
  "repository": {
    "type": "git",
    "url": "git+https://github.com/saorionline/laboratorio-fakestore"
  },
  "keywords": [],
  "author": "Saori Tovar <saoribogart@gmail.com>",
  "license": "MIT",
  "dependencies": {
    "cypress": "10.2.0"
  },
  "devDependencies": {
    "vite": "^5.3.1"
  }
}
  ```
  Add my Interface Library

  ```javascript
npm install -D tailwindcss postcss autoprefixer