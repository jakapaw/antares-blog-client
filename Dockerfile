FROM bitnami/git
RUN git clone https://github.com/jakapaw/antares-blog-client.git ./app

FROM node:22-alpine AS base
ENV NEXT_TELEMETRY_DISABLED=1
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
COPY --from=0 --chown=node:node ./app /home/node/app
USER node
WORKDIR /home/node/app
RUN npm install
COPY ./.env .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]