# Step 1: Use a Node.js base image to build the application
FROM node:16 as build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application into the container
COPY . .

# Build the React microfrontend
RUN npm run build

# Step 2: Use Nginx to serve the microfrontend files
FROM nginx:alpine as production-stage

# Set Nginx configuration to serve files dynamically
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output to Nginx's serving directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
