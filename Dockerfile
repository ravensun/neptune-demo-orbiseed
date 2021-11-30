FROM node:12.16.3

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package* ./
COPY yarn.lock ./

RUN yarn

# Bundle app source
COPY . .

EXPOSE 4000
CMD [ "yarn", "start" ]
