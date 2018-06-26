# DBPedia Query Bot

This project contains a telegram bot to query DBPedia. You can query by natural language or SPARQL. To translate your Question into an SPARQL Query we are using a neural network
## Getting Started

pull the whole repository.

### Prerequisites

You need to have Docker installed an running.
You need to have Docker compose installed.
You need a telegram account and a telegram client running on mobile or desktop.


### Installing

First you will need get a BOT-TOKEN therefore you need to talk to the Botfather, wich is another Telegram Bot. There are many Tutorials on how to create a new Bot and get an TOKEN
```
https://telegram.me/BotFather //adds @botfather to your chats
```

If you got the Token you need to add it to the project. There is an enviroment variable in the docker-compose.yml file.
```
environment:
      - BOT_TOKEN= [INSERT TOKEN HERE]
 ```

Now you can start the project

 ```
 sudo docker-compose up
 ```
 To talk to your bot you need to add him to your chatlist
 
 ```
https://telegram.me/[YOUR BOT NAME]
 ```
## Used Frameworks and Tools
* NSpM https://github.com/AKSW/NSpM
* Telegraf.js https://github.com/telegraf/telegraf
* Express.js http://expressjs.com/
* Telegraf middleware https://github.com/telegraf/telegraf-command-parts
 
 
## Authors

* **Carolin Gümpel**
* **Ronny Zingler**

## License

This project is licensed under the MIT License

