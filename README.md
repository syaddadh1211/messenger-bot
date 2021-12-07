## Facebook Messenger-bot with NodeJS

We use NodeJS and restify framewok to build RESTful API. Before you can use this code, make sure you already has FB App, create FB Page and config Webhook.
In this case we create bot that can ask the first name of user, his/her birtdate and finally make calculation to show how many days left until his/her next birthday. This conversation is saving to array object and user can try via postman to get all/one message also delete it.

## Installation

npm init

npm install restify request --save

after that you can just copy this code to your local environment.

```
git clone https://github.com/syaddadh1211/messenger-bot.git
```
## RESTFull API example

I use Heroku cloud platform to deploy my nodejs with restify framework, and its also connected to my GitHub repo so anytime I make a push to my repo it will automatically deploy to my heroku as well. 
you can try to via postman to :
- Get all message : https://messengerbot-app.herokuapp.com/messages
- Get one message: https://messengerbot-app.herokuapp.com/messages/4864871003525182
- Delete message: https://messengerbot-app.herokuapp.com/messages/4864871003525182


if you have any questions, don't hesitate to contact me at : bahalwan@gmail.com
