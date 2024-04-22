FROM --platform=linux/amd64 nikolaik/python-nodejs:python3.10-nodejs20

WORKDIR /app
COPY . .
RUN yarn && yarn build
CMD ["yarn", "start:prod"]