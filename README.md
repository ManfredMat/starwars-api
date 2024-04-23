# Star Wars API

## Deploy
### URL
La url a consumir para el deploy es : `https://starwars-api-kubh.onrender.com` para las reques seguir los ejemplos detallados abajo.

## Ejecutar en local
Para ejecutar este codigo en local necesitaremos contar con  git , nodejs 20.12.2 (Recomendado) y mongodb.

### 1. Clonar el repositorio
desde una consola nos ubicaremos en la carpeta donde queramos clonar nuestro proyecto y escribiremos `git clone git@github.com:ManfredMat/starwars-api.git`

### 2. Crear archivo .env

para el correcto funcionamiento de nuestra API deberemos declara las siguientes variables de entorno:
-`PORT= Puerto (Es opcional ya que por defecto ira al 3000)`

-`MONGO_STRING_CONNECTION= String de coneccion a nuestra mongodb`

-`JWT_SECRET= Aqui escribiremos un secret que usaremos para el encodeo del jwt , se recomienda usar alguna herramienta que genere algun secret aleatorio`

-`JWT_TIME= esta variable es opcional ya que el token tendra una hora por defecto pero si se desea podemos modificar su vencimiento declarando cuando queremos que lo hagaeg: 1s, 1m ,  1h , 1d`

-`STARWARS_API=http://swapi.dev/api/films/`

este archivo lo crearemos en la carpeta root del proyecto donde se encuentra tambien un archivo .env.example a modo de ejemplo.

### 3. Instalamos dependencias

para instalar las dependencias usaremos en nuestra consola el comando `yarn`.

### 4. Correr en local

para inicializar ya el proyecto y comenzar a probar los endpoints debemos ejecutar por consola el comando `yarn start`

## Endpoints

### GET (/) http://localhost:{$port}/
es un health check que en caso de estar levantado el servicio nos respondera con un PONG.

### POST (/) http://localhost:{$port}/auth/login

usaremos este endpoint para loguearnos en la api. este nos devolvera un JSON de la siguiente manera :
`{token:${jwt token}}`

body :
`{
    "username":"USUARIO",
    "password":"PASSWORD"
}`

### POST (/) http://localhost:{$port}/users/register

Este endpoint esta destinado a la creacion de usuarios. 
este nos devolvera un JSON de la siguiente manera :
`{status:'OK' , message : 'User created succesfully'}`

body :
`{
    "username":"USUARIO",
    "password":"PASSWORD",
    "role":["REGULAR"] o ["ADMIN"]
}`

el campo role es opcional, de no incluirlo el usuario se generara como uno regular.

### GET (/) http://localhost:{$port}/movies/all
nos devolvera un listado de peliculas.
este request precisa autorizacion por ende debemos enviar por headers el token de seguridad obtenido del login.

### GET (/) http://localhost:{$port}/movies/:id
nos devolvera una pelicula especifica segun su numero de episodio.
este request precisa autorizacion por ende debemos enviar por headers el token de seguridad obtenido del login.

### POST (/) http://localhost:{$port}/movies/new

Este endpoint esta destinado a la creacion de peliculas. 
en caso de que se cree de manera correcta nos devolvera un json con la informacion de la pelicula.

body :
`{
    "title": "la siesta de la fuerza",
    "episode_id": 8,
    "director": "jorgito lucas",
    "producer": "warner sister",
    "release_date": "1980-05-17T00:00:00.000Z"
}`

este request precisa autorizacion por ende debemos enviar por headers el token de seguridad obtenido del login y solo podran consumirlo usuarios que sean ADMIN.

### POST (/) http://localhost:{$port}/movies/update

Este endpoint esta destinado a la modificacion de peliculas. 
en caso de que se  modifique de manera correcta nos devolvera un json:
`{status:'OK' , message:'Movie updated succesfully'}`

body :
`{
    "episode_id":Number;
    "update":{
        title?:string;
        episode_id?:Number;
        director?:string;
        producer?:string;
        release_date?:Date;
        }
}`

este request precisa autorizacion por ende debemos enviar por headers el token de seguridad obtenido del login y solo podran consumirlo usuarios que sean ADMIN.

### DELETE (/) http://localhost:{$port}/movies/delete

Este endpoint esta destinado a la eliminacion de peliculas. 
en caso de que se borre de manera correcta nos devolvera un json:
`{status:'OK' , message:'Movie deleted succesfully'}`

body :
`{
    episode_id:Number;
}`

este request precisa autorizacion por ende debemos enviar por headers el token de seguridad obtenido del login y solo podran consumirlo usuarios que sean ADMIN.
