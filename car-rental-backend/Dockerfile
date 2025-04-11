# Backend Dockerfile
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy all files
COPY . .

# Expose backend port
EXPOSE 5000

# Start server
CMD ["npm", "start"]
