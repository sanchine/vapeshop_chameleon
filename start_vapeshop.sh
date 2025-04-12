#!/bin/bash

cd ~/src/vapeshop/
sudo docker-compose up -d
cd ./server/
gnome-terminal --tab --title="client" --command="bash -c 'cd ~/src/vapeshop/client && npm start'"
npm start
