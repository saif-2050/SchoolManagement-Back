const express = require("express");


const app = express();

app.set('port',process.env.port || 9000);

app.get('/', (req , res)=>{
    res.send("hello")
})

app.listen(app.get('port'),function(err,response){
    console.log("server is running on port",app.get('port'));
})