const cors = require("cors");
const path = require("path");
const methodOverride = require("method-override");
const express = require("express");
const { check } = require("express-validator");
const app = express();
//controllers
const {guardarCtrl, loginCtrl} = require("./controllers/users_ctrl");
//database
const users = require("./data/database");
const multer = require("multer");

//settings
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

//middleware
app.use(cors());
app.use(methodOverride());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/guardar", [
    check("correo").notEmpty().isLength({ min: 5 }).trim(),
    check("alias").notEmpty().isString().isLength({ min: 3, max: 30 }).trim(),
    check("edad").notEmpty().isNumeric().trim(),
    check("clave").notEmpty().isLength({ min: 5, max: 30 }).trim()
], 
  guardarCtrl
  ); 


app.post("/login", [
    check("correo").notEmpty().isLength({ min: 5 }).trim(),
    check("clave").notEmpty().isLength({ min: 1, max: 30 }).trim()
],
 loginCtrl
);


app.get("/login", (req, res)=>{
  res.render("login");
});


app.get("/users", (req, res) => {
    res.send(users);
});


app.get("/", (req, res) => {
  res.render("home");
});

app.get("/error", (req, res) => {
  res.render("error");
});

//listen port
app.listen(3000, () => {
  console.log("start server");
});
