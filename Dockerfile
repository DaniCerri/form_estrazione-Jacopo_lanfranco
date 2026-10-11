# Stage 1: Build the Vite React application
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies using clean install
COPY package*.json ./
RUN npm ci

# Copy source code and build production bundle
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx Alpine
FROM nginx:alpine

# Copy compiled static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy Nginx template for automatic Railway $PORT substitution via envsubst
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Normalizza BACKEND_URL (i file .envsh vengono letti dall'entrypoint prima dell'envsubst)
COPY docker-entrypoint-backend.envsh /docker-entrypoint.d/15-backend-url.envsh

# Default port fallback (Railway will inject PORT dynamically)
ENV PORT=80
# Back-end sulla rete privata Railway e resolver DNS interno (fd12::10)
ENV BACKEND_URL=http://back-end.railway.internal:8000
ENV NGINX_RESOLVER=[fd12::10]

EXPOSE ${PORT}

CMD ["nginx", "-g", "daemon off;"]
