const Restify = require("restify");
const methods = require("./methods");

let port = process.env.PORT || 8001;

const app = Restify.createServer({
  name: "Syaddad Bot Engine",
});

let VERIFY_TOKEN = "abc12345";
const bot = new methods(
  "EABmBIcqu3isBAIZAaYpYSROqJZBZBrrZCmzOgRqDcCOLZBf9ZBl6ZAszJtBhDZBKNe8T4wmD4lR2ZAK7mZC5lZA6yykeAHxyewk9feiLGEga5y12AVORZCEzqJXVK13yN70NQzaRKroWDBZA8EEq1yYOlu9hFGVYA6mh99htiUCp2qTcbQbRZCPUSaShTt"
);

app.use(Restify.plugins.bodyParser({ limit: "50mb" }));
app.use(Restify.plugins.jsonp());

app.get("/", (req, res) => {
  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.end(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.send(403);
    }
  }
});

// app.post("/", (req, res, next) => {
//   const response = req.body;
//   const index = Math.floor(Math.random() * (3 - 1) + 1);
//   const index2 = Math.floor(Math.random() * (6 - 1) + 1);

//   const WelcomeMessage = [
//     "Hi, welcome to Our page, please provide your First Name: ",
//   ];
//   if (response.object === "page") {
//     let messageObj = bot.getMessageObject(response);
//     bot.sendText("Provide your Birth Date: ");
//     messageObj = bot.getMessageObject(response);
//     let birthdate = messageObj;
//     bot.sendText("Do want to know how many day till your next Birthday? ");
//     messageObj = bot.getMessageObject(response);
//     if (
//       messageObj.message.includes("yes") ||
//       messageObj.message.includes("yeah") ||
//       messageObj.message.includes("yup")
//     ) {
//       //epoch
//       let oneDay = 24 * 60 * 60 * 1000;
//       let birthdate = new Date(birthdate);

//       bot.sendText("There are ${oneDay} days left until your next birthday");
//     } else if (
//       messageObj.message.includes("no") ||
//       messageObj.message.includes("nope")
//     ) {
//       bot.sendText("Goodbye");
//     }
//   }
//   res.send(200);
//   // }
//   //   }
// });

// Adds support for GET requests to our webhook
app.get("/webhook", (req, res) => {
  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = "<YOUR_VERIFY_TOKEN>";

  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

// Creates the endpoint for our webhook
app.post("/webhook", (req, res) => {
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === "page") {
    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function (entry) {
      // Gets the message. entry.messaging is an array, but
      // will only ever contain one message, so we get index 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
});

app.listen(port, () => console.log("Server on port : " + port));
