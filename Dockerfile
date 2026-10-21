# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package info and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy application source code
COPY app.js ./

# Expose port aplikasi
EXPOSE 3000

# Run application
CMD ["node", "app.js"]