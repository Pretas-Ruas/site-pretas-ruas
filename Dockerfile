FROM wejs/wejs:v1.1.6

RUN apt-get update && \
  apt-get install -y build-essential python poppler-utils git && \
  apt-get clean

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN echo ${NODE_ENV}

RUN npm set audit false

COPY package.json /usr/src/app/package.json
RUN npm install

COPY . /usr/src/app

CMD ["npm", "start"]