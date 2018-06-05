FROM node:8.10.0

WORKDIR /usr/app

COPY package.json .
RUN npm install --quiet
RUN apt-get update
RUN apt-get install python2.7

RUN curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
RUN python get-pip.py
RUN pip install numpy
RUN pip install tensorflow==1.3.0


COPY . .