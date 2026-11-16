# Production image for the Elisha Bay landing page.
#
# Two stages: build the static site with Vite, then serve `dist/` with nginx.
# Railway (and any Docker host) runs this; the container listens on $PORT,
# which Railway injects, falling back to 8080 locally.

FROM node:22-alpine AS build
WORKDIR /app

# Install from the lockfile only, so the dependency layer caches across builds.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS runtime

# Railway routes traffic to $PORT; 8080 is the local default.
ENV PORT=8080

COPY deploy/nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

# nginx:alpine ships a busybox wget; no extra packages needed.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- "http://127.0.0.1:${PORT}/healthz" > /dev/null || exit 1
