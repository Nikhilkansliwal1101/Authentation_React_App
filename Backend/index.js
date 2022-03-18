const express = require("express");
const bodyparser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const bcrypt = require("bcrypt");
var MongoClient = require("mongodb").MongoClient;
const path = require("path");

app = express();
const http = require('http').Server(app);

// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(bodyparser.text());
var corsOptions = {
  origin: true, //frontend url
  credentials: true,
};
app.use(cors(corsOptions));
app.use(
  session({
    secret: "this is secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/Authentication",
    }),
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    },
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

port = 80;
db_url = "mongodb://localhost:27017/";

app.get("/", (req, res) => {
  // res.send("hello");
  if (!req.session.count) {
    req.session.count = 1;
    req.session.IP = req.ip;
  } else {
    req.session.count += 1;
  }
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use(express.static("build"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/Logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
  });
  res.send(`Logged Out<br><a href="http://localhost">Home</a>`);
});

app.post("/isLogined", (req, res) => {
  if (!req.session.count) {
    req.session.count = 1;
    req.session.IP = req.ip;
  } else {
    req.session.count += 1;
  }
  if (req.session.status) {
    res.json({ userData: req.session.userData, status: req.session.status });
  } else {
    res.json({ status: false });
  }
});

app.post("/Logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.json({ status: false });
    } else {
      res.json({ status: true });
    }
  });
});

app.post("/Signin", (req, res) => {
  data = req.body;
  try {
    MongoClient.connect(db_url, function (err, client) {
      if (err) throw err;
      var db = client.db("Authentication");
      var userData = db.collection("UserData");
      userData.find({ MailId: data["MailId"] }).toArray((err, items) => {
        if (err) throw err;
        if (items.length) {
          res.json({ err: "User already exist", status: false });
          client.close();
        } else {
          userData.insertOne(
            {
              FName: data["FName"],
              LName: data["LName"],
              MailId: data["MailId"],
              Password: bcrypt.hashSync(data["Password"], 10),
            },
            (err, result) => {
              if (err) throw err;
              res.json({
                userData: {
                  FName: data["FName"],
                  LName: data["LName"],
                  MailId: data["MailId"],
                },
                status: true,
              });
              req.session.userData = {
                FName: data["FName"],
                LName: data["LName"],
                MailId: data["MailId"],
              };
              req.session.status = true;
              req.session.save((err) => {
                if (err) {
                  console.log(err);
                }
              });
              client.close();
            }
          );
        }
      });
    });
  } catch (err) {
    console.log(err);
    res.json({ err: "Can't load database" });
  }
});

app.post("/Login", (req, res) => {
  data = req.body;
  try {
    MongoClient.connect(db_url, function (err, client) {
      if (err) throw err;
      var db = client.db("Authentication");
      var userData = db.collection("UserData");
      userData.findOne({ MailId: data["MailId"] }, (err, item) => {
        if (err) throw err;
        if (item) {
          bcrypt.compare(data["Password"], item["Password"]).then((result) => {
            if (result) {
              res.json({
                userData: {
                  FName: item["FName"],
                  LName: item["LName"],
                  MailId: item["MailId"],
                },
                status: true,
              });
              req.session.userData = {
                FName: item["FName"],
                LName: item["LName"],
                MailId: item["MailId"],
              };
              req.session.status = true;
              req.session.save((err) => {
                if (err) {
                  console.log(err);
                }
              });
              client.close();
            } else {
              res.json({ err: "Wrong password", status: false });
              client.close();
            }
          });
        } else {
          res.json({ err: "User Not exist", status: false });
          client.close();
        }
      });
    });
  } catch (err) {
    console.log(err);
    res.json({ err: "Can't load database" });
  }
});


http.listen(port, () => {
  console.log("Server started");
});