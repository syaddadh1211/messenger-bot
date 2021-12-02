const Restify = require("restify");
const methods = require("./methods");

let port = process.env.PORT || 8001;

const app = Restify.createServer({
  name: "Syaddad Bot Engine",
});

const token = "abc12345";
const bot = new methods(
  "EABmBIcqu3isBAIZAaYpYSROqJZBZBrrZCmzOgRqDcCOLZBf9ZBl6ZAszJtBhDZBKNe8T4wmD4lR2ZAK7mZC5lZA6yykeAHxyewk9feiLGEga5y12AVORZCEzqJXVK13yN70NQzaRKroWDBZA8EEq1yYOlu9hFGVYA6mh99htiUCp2qTcbQbRZCPUSaShTt"
);

app.use(Restify.plugins.bodyParser({ limit: "50mb" }));
app.use(Restify.plugins.jsonp());

app.get("/", (req, res, next) => {
  if (
    req.query["hub.mode"] == "subscribe" &&
    req.query["hub.verify_token"] == token
  ) {
    res.end(req.query["hub.challenge"]);
  } else {
    next();
  }
});

app.post("/", (req, res, next) => {
  const response = req.body;
  const index = Math.floor(Math.random() * (3 - 1) + 1);
  const index2 = Math.floor(Math.random() * (6 - 1) + 1);

  const WelcomeMessage = [
    "Hi, welcome to Our page, please provide your First Name: ",
  ];
  if (response.object === "page") {
    let messageObj = bot.getMessageObject(response);
    bot.sendText("Provide your Birth Date: ");
    messageObj = bot.getMessageObject(response);
    bot.sendText("Do want to know how many day till your next Birthday? ");
    messageObj = bot.getMessageObject(response);
    if (
      messageObj.message.includes("yes") ||
      messageObj.message.includes("yeah") ||
      messageObj.message.includes("yup")
    ) {
      //epoch
      const day = 10;
      bot.sendText("There are ${day} days left until your next birthday");
    } else if (
      messageObj.message.includes("no") ||
      messageObj.message.includes("nope")
    ) {
      bot.sendText("Goodbye");
    }
  }
  res.send(200);
  // }
  //   }
});

app.listen(port, () => console.log("Server on port : " + port));
