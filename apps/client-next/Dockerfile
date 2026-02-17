# Dockerfile pour Next.js 15.x en dev

# 1️⃣ Base image Node 18
FROM node:18

# 2️⃣ Définir le répertoire de travail
WORKDIR /app

# 3️⃣ Copier package.json et package-lock.json pour le cache Docker
COPY package.json package-lock.json ./

# 4️⃣ Installer les dépendances
RUN npm install --frozen-lockfile

# 5️⃣ Copier tout le code source
COPY . .

# 6️⃣ Définir la variable d'environnement pour le backend
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV PORT 3000

# 7️⃣ Exposer le port Next.js (dev)
EXPOSE 3000

# 8️⃣ Définir l'adresse d'écoute sur 0.0.0.0 pour que Docker soit accessible depuis l'extérieur
ENV HOST 0.0.0.0

# 9️⃣ Lancer le serveur Next.js en mode développement
CMD ["npm", "run", "dev"]

