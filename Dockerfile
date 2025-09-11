# Use an official Node.js runtime as a parent image for building the app
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Vue.js application
RUN npm run build

# Use nginx to serve the built application
FROM nginx:alpine

# Copy the build output from the previous stage to the nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the nginx server
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
