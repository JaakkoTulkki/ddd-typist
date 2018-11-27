# base image
FROM node:8.12.0

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
#ENV PATH /opts/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY . /usr/src/app
RUN npm install --silent

# start app
CMD ["npm", "run", "dev"]
