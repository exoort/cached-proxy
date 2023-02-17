FROM node:19-alpine

ARG SERVER_PORT=3000
ENV SERVER_PORT=$SERVER_PORT

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install production dependencies.
RUN npm i --production

# Copy local code to the container image.
COPY . .

EXPOSE ${SERVER_PORT}

# Run the web service on container startup.
CMD [ "node", "src/index.mjs" ]

HEALTHCHECK CMD curl --location --request POST 'http://localhost:3000' --header 'Content-Type: application/json' --data-raw '{"url": "https://api.rapidmock.com/mocks/89mEw","method": "GET","id": "test","group": "testGroup"}' || exit 1
