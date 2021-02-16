const express = require("express");
const app = express();
const port = 8000;
const expressLayouts= require("express-ejs-layouts");


app.use(expressLayouts);        
app.use(express.static("./assets"));
// extracting style and script and placing it over the layouts, in case of indivisual pages
app.use("layout extractStyles",true);
app.use("layout extractScripts",true);
// using the router
app.use("/",require("./routes"));

// using views engine
app.set('view engine','ejs');
app.set('views','./views');



app.listen(port, (err) => {
    if (err) {
        console.log("Error:",err);
    }
    console.log('Server is running on :',port);
});
