FROM node:12
WORKDIR /frontend
#ENV PATH /frontend/node_modules/.bin:$PATH
RUN npm install serve react-scripts -g

# install app dependencies
COPY package*.json ./
RUN npm install

# add app
COPY . ./
EXPOSE 5000
