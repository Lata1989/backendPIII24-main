const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  domicilio: String,
  celular: String,
  documento: String,
  rol: String,
  area: String,
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]  // Relación uno a muchos
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
/*
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  firtname: String,
  lastname: String,
  email: String,
  domicilio:String,
  celular:String,
  documento:String,
  rol:String,
  area:String,
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
*/