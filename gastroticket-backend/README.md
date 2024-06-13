# TFM-Gastro-Ticket
Para construir el backend, primero es necesario crear en la raíz del proyecto un archivo .env y crear las siguientes variables con los datos que correspondan a la máquina en la que vayamos a ejecutar la aplicación:

* BASE_URL: url del frontend
* DB_PASSWORD: contraseña de nuestra base de datos en local
* DB_URL: host de la base de datos
* DB_USERNAME: usuario de la base de datos
* MAIL_PASSWORD: contraseña de nuestra aplicación creada en nuestra cuenta de email para el envío de correos electrónicos
* MAIL_USERNAME: dirección de correo electrónico desde el que se enviarán correos

Además, necesitamos también tener instalado maven en el equipo. Lo podemos hacer descargándolo directamente desde la web oficial y siguiendo las instrucciones que nos indican.
Para la generación del jar de la aplicación necesitamos ejecutar la instrucción mvn clean package. Este archivo jar se ha subido al repositorio para poder ser ejecutado en la plataforma render y realizar el despliegue en producción. A la vez, también se ha creado el archivo Dockerfile para construir una imagen de la aplicación. A continuación explico el significado de las líneas de dicho archivo:

* FROM amazoncorretto:17-alpine-jdk: Amazon Corretto es una distribución sin costo, multiplataforma y lista para producción de Open Java Development Kit (OpenJDK)
* COPY target/gastroticket-0.0.1-SNAPSHOT.jar app.jar: copia el archivo jar generado por el proyecto desde el directorio target en la máquina al directorio raíz de la imagen Docker y lo nombra app.jar. El archivo gastroticket-0.0.1-SNAPSHOT.jar es el artefacto generado por la compilación del proyecto.
* ENTRYPOINT ["java", "-jar", "/app.jar"]: comando que se ejecutará cuando se inicie un contenedor creado a partir de esta imagen Docker. En este caso inicia la aplicación java.