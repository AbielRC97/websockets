# Usar una imagen base de Node.js
FROM node:23-alpine3.21

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de definición de dependencias
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto 3000 para acceder a la app
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "start"]
