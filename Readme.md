# Api rest Clinica
### _Descripción:_
: Desarrollo de servicio web (API REST) que sirva endpoints para un sistema de 
gestión de historia clínica centralizada
### _Instalación:_
- Clonar el repositorio
- Instalar las dependencias con el comando `npm install`
- Crear un archivo `.env` en la raíz del proyecto y agregar las variables necesarias
- Iniciar el servidor con el comando `npm start`
### _Configuración:_
El archivo  `.env` debe contener las siguientes variables:
```
DB_CONNECTION_STRING=mongodb://localhost:27017/nombre_de_la_base_de_datos
JWT_SECRET=clave_secreta_para_generar_tokens
```
### _Dependencias:_
  body-parser
- dotenv
 - express
- jsonwebtoken
- mongoose: 
- morgan
 ### _Uso:_
El servidor se ejecuta en el puerto 3000. A continuación se muestra una lista de los endpoints disponibles:

- `/api/doctors`
- `GET /:` Obtiene la lista de todos los médicos
- `GET /:id:` Obtiene la información de un médico específico
- `POST /:` Crea un nuevo médico
- `PUT /:id:` Actualiza la información de un médico específico
- `DELETE /:id:` Elimina un médico específico
- `/api/patients`
- `GET /:` Obtiene la lista de todos los pacientes
- `GET /:id:` Obtiene la información de un paciente específico
- `POST /:` Crea un nuevo paciente
- `PUT /:id:` Actualiza la información de un paciente específico
- `DELETE /:id:` Elimina un paciente específico
- `/api/observations`
- `POST /: `Crea una nueva observación médica para un paciente

