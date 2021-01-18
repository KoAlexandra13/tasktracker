FROM node:12
WORKDIR /frontend
ENV PATH /frontend/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install serve react-scripts@3.4.1 -g --silent

# add app
COPY . ./
CMD ["npm", "start"]