const Restify = require("restify");
const methods = require("./methods");

let port = process.env.PORT || 8001;

const app = Restify.createServer({
  name: "Syaddad Bot Engine",
});

let VERIFY_TOKEN = "abc123456";
const bot = new methods(
  "EABmBIcqu3isBAAspeSp5Ec0sqDTk5Ry9kDzSONaqA6j5PY8hhaBFHMDKPZAuq049SwNS43lj7SMo36ZCZBs8maZArzO7UCfOfmYNS3w23kDa373Vkv49IWStUVu7mVGapkg0B5zyNCnIPhkJjI6LaeC8hZCa2ZB60RfNUuT58UuJTUyzgNScoo"
);

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
  // const index = Math.floor(Math.random() * (3 - 1) + 1);
  // const index2 = Math.floor(Math.random() * (6 - 1) + 1);

  const WelcomeMessage = [
    "Hi, welcome to Our page, please provide your First Name [Format : *F your_first_name]: ",
  ];

  if (response.object === "page") {
    const messageObj = bot.getMessageObject(response);
    if (messageObj.message.includes("Hi, welcome")) {
      bot.sendText(`${WelcomeMessage}`, messageObj.id);
    }

    if (messageObj.message.includes("*F")) {
      let firstName = messageObj.message;
      bot.sendText(
        "Provide your Birth Date [Format : *B YYY/MM/DD]: ",
        messageObj.id
      );
    }

    if (messageObj.message.includes("*B")) {
      let birthDate = messageObj.message;
      bot.sendText(
        "Do want to know how many day till your next Birthday? [Yes/No] ? ",
        messageObj.id
      );
    }

    // if (
    //   messageObj.message.includes("Yes") ||
    //   messageObj.message.includes("yeah") ||
    //   messageObj.message.includes("yup")
    // ) {
    //   bot.sendText("Prepare the Calculation...", messageObj.id);
    // }
    //       //epoch
    //       // let today = date();
    //       // let birthdate = new Date(birthdate);
    //       //Jika today.month = birthdate.month dan today.hari >= birtdate.hari
    //       // or today.month > birthdate.month maka nextbirthday = today.year+1
    //       // else nextbirthday = today.year
    //       //nextbirthday = datetime.date(nextbirthday.year, birth.month, birth.day)
    //       // diff = nextbirthday - today
    //       // print(day left for next birthday = diff.days)

    //       // bot.sendText(
    //       //   "There are ${oneDay} days left until your next birthday",
    //       //   messageObj.id
    // );
    // } else if (
    //       messageObj.message.includes("No") ||
    //       messageObj.message.includes("nope")
    //     ) {
    //       bot.sendText("Goodbye", messageObj.id);
    //     }
    //   }
    //
  }
  res.send(200);
  // }
  //   }
});

app.listen(port, () => console.log("Server on port : " + port));
