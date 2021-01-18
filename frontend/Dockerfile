FROM node:12
RUN npm install -g serve react-scripts
WORKDIR /frontend
COPY package.json /frontend
RUN npm install
COPY . /frontend
