const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const jwt = require("jsonwebtoken");
const app = express();
const atob = require('atob');

const secretKey = "pfmsfs2544ds!"
const Etudiants = require("../models/etudiant") ;
const EtudiantsModel = require("../routes/etudiant.model");

const Admins = require("../models/admin") ;
const AdminsModel = require("../routes/admin.model");

const Teachers = require("../models/teacher") ;
const TeachersModel = require("./teacher.model");

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));



// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));




app.use(
  cookieSession({
    name: "bezkoder-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);

const db = require("../models");
const Role = db.role;


db.mongoose
  .connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
   // initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });



  app.get('/etudiants', async (req , res) =>{


    try {
      await Etudiants.find({}) // all collection of etudiants
      .then(result=>{
        res.send(result)
      }) 
  
    }catch(e){
      console .log(e)
    }
    
  })


  app.delete('/delete_etudiant/:id', async (req , res) =>{


    try {
      const isfound =  await Etudiants.findById({'_id' : req.params.id}) 
      console.log(isfound)
      res.send("Deleted Succ")
/*
      if (isfound != null){
        await Etudiants.findOneAndDelete({id : req.params.id}) 
        .then(result=>{
        res.send("Deleted Succ")
      }) 

      }else{
        res.send("Eleve not Found") ;
      }
    
  */
    }catch(e){
      console .log(e)
    }
    
  })

 

  
app.put('/update_student/:id', async (req , res) =>{
    EtudiantsModel.update(req.params.id,req.body)
    .then((donne)=>res.status(200).json({Succ:donne}))  
    .catch((err)=>res.json({error:err}))
})


app.delete('/delete_student/:id', async (req , res) =>{
    const isfound =  await Etudiants.findById({'_id' : req.params.id}) 
    if (isfound){

      EtudiantsModel.remove(req.params.id)
      .then((donne)=>res.status(200).json({Succ:donne}))  
      .catch((err)=>res.json({error:err}))
    }else{
      res.json({error:"Student does not exist !"})
    }
  })

app.get('/getstudent/:id', async (req , res) =>{
  EtudiantsModel.getstudent(req.params.id)
  .then((donne)=>res.status(200).json({Succ:donne}))  
  .catch((err)=>res.json({error:err}))

})
app.post('/login',  async (req, res, next) =>{
  
      const isStudent   = await Etudiants.findOne({ "$or": [ { Email: req.body.Email } ] });
      const isAdmin     = await Admins.findOne({ "$or": [ { Email: req.body.Email } ] });
      const isTeacher   = await Teachers.findOne({ "$or": [ { Email: req.body.Email } ] });

     if (isStudent){
          EtudiantsModel.login(req.body.Email,req.body.Password)
           .then((donne)=>res.status(200).json({Succ:donne}))  
           .catch((err)=>res.json({error:err}))

      }else if (isTeacher){
          TeachersModel.login(req.body.Email,req.body.Password)
          .then((token)=>res.status(200).json({Succ:token}))
          .catch((err)=>res.json({error:err}))
      }else if(isAdmin){
          AdminsModel.login(req.body.Email,req.body.Password)
          .then((token)=>res.status(200).json({Succ:token}))
          .catch((err)=>res.json({error:err}))
      }else{
        res.json({error:"Email does not exist !"})
      }
      

})
const DecodeJWT= (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};


app.post('/SetPassword',  async (req, res, next) =>{
  let token = req.body.token ;

   const newtk = DecodeJWT(token) ;
   //console.log(newtk);
   if (newtk != null){
    try {
      const isStudent   = await Etudiants.findById({'_id' : newtk.id}) 
      const isTeacher   = await Teachers.findById({'_id' : newtk.id}) 

      if (isStudent){
        EtudiantsModel.setPassword(newtk.id,newtk.Email,req.body.data.Password)
          .then((msg)=>res.status(200).json({Succ:msg}))
          .catch((err)=>res.json({error:err}))

    }else if (isTeacher){
      //Stil not tested yet
      TeachersModel.setPassword(newtk.id,newtk.Email,req.body.data.Password)
          .then((msg)=>res.status(200).json({Succ:msg}))
          .catch((err)=>res.json({error:err}))
    }else{
      res.json({error:"Error !"})
    }
    }catch(e){
      console .log(e)
    }
   }else{
    res.json({error:"Token Not Valid !"})
   }
  

})



app.post('/add_etudiant', (req , res , next)=>{
  EtudiantsModel.register(req.body.Email,req.body.cin,req.body.Name,req.body.Phone,req.body.Class,req.body.Birthday)
  .then((msg)=>res.status(200).json({Succ:msg}))
  .catch((err)=>res.json({error:err}))
})

app.post('/add_teacher', (req , res , next)=>{
  TeachersModel.register(req.body.Email,req.body.cin,req.body.Name)
  .then((msg)=>res.status(200).json({Succ:msg}))
  .catch((err)=>res.json({error:err}))
})

app.post('/add_admin', (req , res , next)=>{
  AdminsModel.register(req.body.Email,req.body.Password,req.body.Name)
  .then((msg)=>res.status(200).json({Succ:msg}))
  .catch((err)=>res.json({error:err}))
})



// simple route
app.get("/home", (req, res) => {
  res.json({ message: "Welcome to bezkoder ." });
});

app.get("/:id", (req, res) => {
  res.json({ message: "Welcome to bezkoder nombre "+`${req.params.id}` });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});