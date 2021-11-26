const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const users = require("../data/database");
let salt = 10;


const guardarCtrl = (req, res) => {
  const error = validationResult(req);

  if (error.isEmpty()) {
    bcrypt.hash(req.body.clave, salt, (err, hash) => {
      if (!err) {
        users.push({
          correo: req.body.correo,
          alias: req.body.alias,
          edad: req.body.edad,
          clave: hash
        });
      }
    });
    res.redirect("/");
  } else {
    res.render("error", {
      mensaje: "fallo el registro"
    });
  }
};


const loginCtrl = (req, res) => {
  const error = validationResult(req);
  let user;

  if (error.isEmpty()) {
    user = users.find((user) => req.body.correo == user.correo);
    res.render("panel", {
      usuario: user.alias
    });
  } else {
    res.render("error", {
      mensaje: "fallo el registro"
    });
  }
};


module.exports = {
  guardarCtrl,
  loginCtrl
}