const Restify = require("restify");
const methods = require("./methods");

let port = process.env.PORT || 8001;

//saving messages object array in run time memory (temporary)
const botMessages = [
  {
    message_id: 1,
    created_date: "06/12/2021",
    conversations: "fsdfsf asdfs sadf",
  },
  {
    message_id: 2,
    created_date: "06/12/2021",
    conversations: "aaaaaaaaaaaaaaaaa",
  },
];

//create server
const app = Restify.createServer({
  name: "Syaddad Bot Engine",
});
var firstName = "";
var birthDate = "";
var conversations = "";

//token to fb pages
let VERIFY_TOKEN = "abc123456";
const bot = new methods(
  "EABmBIcqu3isBAAspeSp5Ec0sqDTk5Ry9kDzSONaqA6j5PY8hhaBFHMDKPZAuq049SwNS43lj7SMo36ZCZBs8maZArzO7UCfOfmYNS3w23kDa373Vkv49IWStUVu7mVGapkg0B5zyNCnIPhkJjI6LaeC8hZCa2ZB60RfNUuT58UuJTUyzgNScoo"
);

function DateDiff(date1, date2) {
  var datediff = date1.getTime() - date2.getTime();
  return datediff / (24 * 60 * 60 * 1000);
}

app.use(Restify.plugins.bodyParser({ limit: "50mb" }));
app.use(Restify.plugins.jsonp());

app.get("/", (req, res, next) => {
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
      // res.send(403);
      next();
    }
  }
});

app.post("/", (req, res, next) => {
  const response = req.body;
  const WelcomeMessage = [
    "Hi, welcome to Our page, please provide your First Name [Format : *F your_first_name]:",
  ];
  const bodyMessage = [
    "Provide your Birth Date [Format : *B YYYY-MM-DD]:",
    "Do want to know how many day till your next Birthday? [Yes/No] ?",
    `days left until your next birthday`,
    "Goodbye",
  ];

  if (response.object === "page") {
    const messageObj = bot.getMessageObject(response);
    messageObj.id;
    if (messageObj.message.includes("*F")) {
      firstName = messageObj.message.slice(3);
      findMessage(messageObj.id, firstName);

      bot.sendText(bodyMessage[0], messageObj.id);
      findMessage(messageObj.id, bodyMessage[0]);
    } else if (
      messageObj.message.includes("*B") ||
      messageObj.message.includes("Yes") ||
      messageObj.message.includes("yeah") ||
      messageObj.message.includes("yup") ||
      messageObj.message.includes("No") ||
      messageObj.message.includes("Nope")
    ) {
      console.log("");
    } else {
      bot.sendText(`${WelcomeMessage}`, messageObj.id);
      findMessage(messageObj.id, WelcomeMessage);
    }

    if (messageObj.message.includes("*B")) {
      birthDate = messageObj.message.slice(3);
      findMessage(messageObj.id, birthDate);

      bot.sendText(bodyMessage[1], messageObj.id);
      findMessage(messageObj.id, bodyMessage[1]);
    } else if (
      messageObj.message.includes("*F") ||
      messageObj.message.includes("Yes") ||
      messageObj.message.includes("yeah") ||
      messageObj.message.includes("yup") ||
      messageObj.message.includes("No") ||
      messageObj.message.includes("Nope")
    ) {
      console.log("");
    }

    if (
      messageObj.message.includes("Yes") ||
      messageObj.message.includes("yeah") ||
      messageObj.message.includes("yup")
    ) {
      answer = messageObj.message;
      findMessage(messageObj.id, answer);

      // today
      let today = new Date();
      let dd = parseInt(String(today.getDate()).padStart(2, "0"));
      let MM = parseInt(String(today.getMonth() + 1).padStart(2, "0")); //January is 0!
      let yyyy = parseInt(today.getFullYear());
      //birthdate;
      let birthdate = new Date(birthDate);
      let dd_birth = parseInt(String(birthdate.getDate()).padStart(2, "0"));
      let mm_birth = parseInt(
        String(birthdate.getMonth() + 1).padStart(2, "0")
      ); //January is 0!
      let yyyy_birth = parseInt(birthdate.getFullYear());
      let nextyear = 0;

      if ((MM == mm_birth && dd >= dd_birth) || MM > mm_birth) {
        nextyear = yyyy + 1;
      } else {
        nextyear = yyyy;
      }

      nextbirthday = new Date(
        nextyear.toString() +
          "-" +
          mm_birth.toString() +
          "-" +
          dd_birth.toString()
      );
      //get days left
      let diff = DateDiff(nextbirthday, today);
      bot.sendText(
        `Hi ${firstName}, there are ${diff.toFixed()} ` + bodyMessage[2],
        messageObj.id
      );
      dayLeft =
        `Hi ${firstName}, there are ${diff.toFixed()} ` + bodyMessage[2];
      findMessage(messageObj.id, dayLeft);
    } else if (
      messageObj.message.includes("*F") ||
      messageObj.message.includes("*B") ||
      messageObj.message.includes("No") ||
      messageObj.message.includes("Nope")
    ) {
      console.log("");
    }

    if (
      messageObj.message.includes("No") ||
      messageObj.message.includes("nope")
    ) {
      answer = messageObj.message;
      findMessage(messageObj.id, answer);

      bot.sendText(bodyMessage[3], messageObj.id);
      findMessage(messageObj.id, bodyMessage[3]);
    } else if (
      messageObj.message.includes("*F") ||
      messageObj.message.includes("*B") ||
      messageObj.message.includes("Yes") ||
      messageObj.message.includes("yeah") ||
      messageObj.message.includes("yup")
    ) {
      console.log("");
    }
  }
  res.send(200, { message: conversations });
  // }
  //   }
});

//get one message
app.get("/messages/:message_id", (req, res) => {
  const oneMessage = botMessages.filter(
    (message) => message.message_id === req.params.message_id
  )[0];
  res.send(200, oneMessage);
});

//get all message
app.get("/messages", (req, res) => {
  res.send(200, botMessages);
});

//delete single message
app.del("/messages/:message_id", (req, res) => {
  const message_id = +req.params.message_id;
  const indexOfmessage = botMessages.findIndex(
    (message) => message.message_id === message_id
  );
  botMessages.splice(indexOfmessage, 1);
  res.send(200, { message: "Successfully deleted one message" });
});

function findMessage(message_id, conversation) {
  const indexOfUser = botMessages.findIndex(
    (message) => message.message_id == message_id
  );
  if (indexOfUser == -1) {
    // insert new message
    const oneMessage = {
      message_id: message_id,
      created_date: new Date(),
      conversations: conversation,
    };
    botMessages.push(oneMessage);
  } else {
    // update message
    botMessages[indexOfUser].created_date = new Date();
    botMessages[indexOfUser].conversations += conversation + ";";
  }
}

app.listen(port, () => console.log("Server on port : " + port));
