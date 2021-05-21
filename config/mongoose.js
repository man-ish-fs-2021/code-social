const mongoose = require("mongoose");
const env = require("./environment");

mongoose.connect(`mongodb://localhost/${env.db}`,{ useNewUrlParser: true , useUnifiedTopology: true } );

const db = mongoose.connection;

db.on('error',console.error.bind(console,'Error connecting to MongoDB'));

db.on('open',function(){
console.log("MongoDB is running ");
});

module.exports=db;