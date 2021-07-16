const express = require("express");
const app = express();

app.get("/", function(req, res){
    res.send("Hello");
});

app.listen(process.env.PORT || 200);
