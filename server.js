const multer = require("multer");
const cors = require("cors");
const path = require("path");
const methodOverride = require("method-override");
const express = require("express");
const app = express();

//settings
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

//middleware 
app.use(cors());
app.use(methodOverride());



//listen port
app.listen(3000, ()=>{
    console.log("start server");
});

