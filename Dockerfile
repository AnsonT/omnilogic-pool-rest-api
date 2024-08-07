FROM node:20-alpine as builder

WORKDIR /app

RUN npm install -g pnpm
COPY . .
RUN pnpm install
RUN pnpm build
RUN pnpm prune --prod

FROM node:20-alpine AS runner
RUN npm i -g pnpm
WORKDIR /app

ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 api

COPY --from=builder /app .

USER api

CMD ["node", "dist/src/main.js"]

