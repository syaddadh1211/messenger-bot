const Restify = require("restify");
let port = process.env.PORT || 8001;

const app = Restify.createServer({
  name: "Syaddad Bot Engine",
});

app.use(Restify.plugins.bodyParser({ limit: "50mb" }));
app.use(Restify.plugins.jsonp());

app.get("/", (req, res) => res.send("Hello, its working!"));

app.listen(port, () => console.log("Server on port : " + port));
