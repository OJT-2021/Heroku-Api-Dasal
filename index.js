const express = require("express");
const app = express();

app.get("/", function(res, req){
    res.setEncoding("Hello");
});

app.listen(process.env.PORT || 200);
