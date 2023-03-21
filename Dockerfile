# Stage 1: Compile and Build Bot codebase
# Use official node image as the base image
FROM node:latest as build
# Set the working directory
WORKDIR /usr/src
# Add the source code to app directory
COPY package*.json ./
# Install all the dependencies
RUN npm install --force
# Build the source code
RUN npm run build
# Add the source code to app directory
COPY . .
EXPOSE 6060
CMD ["node", "./dist/app.js"]

