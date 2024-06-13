Para poder construir el frontend de la aplicación se necesita tener instalado Node.js con el gestor de paquetes npm, que podemos descargar desde su web oficial. Una vez instalado, ejecutamos el comando npm install en la carpeta raíz del proyecto. De esta forma descargamos todas las dependencias del proyecto.
Para el despliegue en producción es necesario crear el archivo _redirects en la raiz del proyecto con el siguiente contenido:
/* /index.html 200

Este archivo se utiliza para el manejo de las rutas en aplicaciones de una sola página para el despliegue en producción, como es el caso de nuestro proyecto Angular.

A continuación se ejecuta la instrucción ng build, generando los archivos dentro del proyecto en la carpeta dist, siendo estos archivos los desplegados en la plataforma netlify para dicho despliegue.

Para ejecutar el proyecto en local habría que hacer npm install en la raíz del proyecto, y luego ejecutar la sentencia ng serve –o para arrancar el servidor.