const evn = require("./environment");
const path = require("path");
const fs = require("fs");

module.exports = (app) => {
  app.locals.assetPath = function (filepath) {
    // console.log(app.locals);
    if (evn.name === "development") {
      return "/" + filepath;
    }

    // console.log(filepath);
    return (
      "/" +
      JSON.parse(fs.readFileSync(path.join(__dirname, "../rev-manifest.json")))[
        filepath
      ]
    );
  };
};
