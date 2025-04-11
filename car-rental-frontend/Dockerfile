# Phase 1: Build React App
FROM node:18 AS builder

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

# Phase 2: Serve with Nginx
FROM nginx:alpine

# Copy built React app to Nginx's public folder
COPY --from=builder /app/dist /usr/share/nginx/html


# Expose port 80
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
