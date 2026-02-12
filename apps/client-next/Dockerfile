# Use official Node.js image as base (Debian-based)
FROM node:18

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Définir un ARG pour Next.js
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Copy the rest of the application code
COPY . .

# Build the Next.js app
# RUN npm run build

# Expose the Next.js default port
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "run", "dev"]
