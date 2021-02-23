const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/code-social_development',{ useNewUrlParser: true , useUnifiedTopology: true } );

const db = mongoose.connection;

db.on('error',console.error.bind(console,'Error connecting to MongoDB'));

db.on('open',function(){
console.log("MongoDB is running ");
});

module.exports=db;