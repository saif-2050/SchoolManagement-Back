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

const Class = require("../models/class") ;
const ClassModel = require("./class.model");

const Subject = require("../models/subject") ;
const SubjectModel = require("./subject.model");

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
  .connect("mongodb://0.0.0.0:27017/test", {
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
  
      const isAdmin     =  await Admins.findOne({ "$or": [ { Email: req.body.Email } ] });
      const isTeacher   =  await Teachers.findOne({ "$or": [ { Email: req.body.Email } ] });

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

app.post('/add_admin', (req , res , next)=>{
  AdminsModel.register(req.body.Email,req.body.Password,req.body.Name)
  .then((msg)=>res.status(200).json({Succ:msg}))
  .catch((err)=>res.json({error:err}))
})

////********Teacher Management****** 
app.get('/teachers', async (req , res) =>{
  try {
    await Teachers.find({}) // all collection of etudiants
    .then(result=>{
      res.send(result)
    }) 
  }catch(e){
    console .log(e)
  }
})
app.put('/update_teacher/:id', async (req , res) =>{
  TeachersModel.update(req.params.id,req.body)
  .then((donne)=>res.status(200).json({Succ:donne}))  
  .catch((err)=>res.json({error:err}))
})


app.delete('/delete_teacher/:id', async (req , res) =>{
  const isfound =  await Teachers.findById({'_id' : req.params.id}) 
  if (isfound){

    TeachersModel.remove(req.params.id)
    .then((donne)=>res.status(200).json({Succ:donne}))  
    .catch((err)=>res.json({error:err}))
  }else{
    res.json({error:"Teacher does not exist !"})
  }
})

app.get('/getteacher/:id', async (req , res) =>{
TeachersModel.getteacher(req.params.id)
.then((donne)=>res.status(200).json({Succ:donne}))  
.catch((err)=>res.json({error:err}))

})


app.post('/add_teacher', (req , res , next)=>{
  TeachersModel.register(req.body.Email,req.body.cin,req.body.Name,req.body.Phone,req.body.Birthday,req.body.Class)
  .then((msg)=>res.status(200).json({Succ:msg}))
  .catch((err)=>res.json({error:err}))
})

////********Class Management****** 

/// get all class
app.get('/allclass', async (req , res) =>{
  try {
    await Class.find({}) // all collection of class
    .then(result=>{
      res.send(result)
    }) 
  }catch(e){
    console .log(e)
  }
})

/// add class
app.post('/add_class', (req , res , next)=>{
  ClassModel.add(req.body.ClassName)
  .then((msg)=>res.status(200).json({Succ:msg}))
  .catch((err)=>res.json({error:err}))
})

/// update class

app.put('/update_class/:id', async (req , res) =>{
  ClassModel.update(req.params.id,req.body)
  .then((donne)=>res.status(200).json({Succ:donne}))  
  .catch((err)=>res.json({error:err}))
})

/// delete class 

app.delete('/delete_class/:id', async (req , res) =>{
  
    ClassModel.remove(req.params.id)
    .then((donne)=>res.status(200).json({Succ:donne}))  
    .catch((err)=>res.json({error:err}))
})

/// get class by id 

app.get('/getclass/:id', async (req , res) =>{
  ClassModel.get(req.params.id)
  .then((donne)=>res.status(200).json({Succ:donne}))  
  .catch((err)=>res.json({error:err}))

})

////********End Class Management*****




////********Subject Management****** 

/// get all Subject
app.get('/allsubject', async (req , res) =>{
  try {
    await Subject.find({}) // all collection of Subject
    .then(result=>{
      res.send(result)
    }) 
  }catch(e){
    console .log(e)
  }
})

/// add Subject
app.post('/add_subject', (req , res , next)=>{
  SubjectModel.add(req.body.SubjectName)
  .then((msg)=>res.status(200).json({Succ:msg}))
  .catch((err)=>res.json({error:err}))
})

/// update Subject

app.put('/update_subject/:id', async (req , res) =>{
  SubjectModel.update(req.params.id,req.body)
  .then((donne)=>res.status(200).json({Succ:donne}))  
  .catch((err)=>res.json({error:err}))
})

/// delete Subject 

app.delete('/delete_subject/:id', async (req , res) =>{
  
    SubjectModel.remove(req.params.id)
    .then((donne)=>res.status(200).json({Succ:donne}))  
    .catch((err)=>res.json({error:err}))
})

/// get Subject by id 

app.get('/getsubject/:id', async (req , res) =>{
  SubjectModel.get(req.params.id)
  .then((donne)=>res.status(200).json({Succ:donne}))  
  .catch((err)=>res.json({error:err}))

})

////********End Subject Management*****




// set port, listen for requests
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
