FROM node:16.20.1

WORKDIR C:\Users\gniko\OneDrive\Desktop\Bachelorarbeit\planner-server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "server.js" ]