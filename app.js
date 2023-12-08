let express=require('express');
require("./db");


let Employee=require('./model/Employee');
let sturouting=require('./routings/student')
let cors = require("cors");
let app=express();
app.use(express.json());
app.use(cors());

app.use('/student',sturouting);

//employee api

app.get("/employee", async (req, res)=>{
  let user = await Employee.find();
    if(user.length > 0){
      res.send(user);
    }else{
      res.send("no data found");
    }
  });
    
 app.post("/employee", async(req,res)=>{
  let user = await new Employee(req.body);
  let result = await user.save();
  res.send(result);
 });

app.delete("/employee/:id",async (req,res)=>{
  let user = await Employee.deleteOne({_id:req.params.id});
  res.send(user);
});




app.get("/student", async (req, res)=>{
let user = await Users.find();
  if(user.length > 0){
    res.send(user);
  }else{
    res.send("no data found");
  }
});
   
app.post("/student", async (req, res)=>{
  let user = new Users(req.body);
  let result = await user.save();
  res.send(result);
});

app.delete("/student/:_id",async(req, res)=>{
  let user = await Users.deleteOne(req.params);
  res.send(user);
});


app.get("/student/:id", async (req, res) => {
  let user = await Users.findOne({_id: req.params.id});
  res.send(user);
});

app.put("/student/:id", async (req,res) => {
  let user = await Users.updateOne({_id:req.params.id},{$set: req.body});
    res.send(user);
})

app.get('/search/:key', async (req,res)=>{
  let user = await Users.find({
    $or:[
      {name:{$regex:req.params.key}},
      {email:{$regex:req.params.key}},
      {address:{$regex:req.params.key}},
    ],
  });
  res.send(user);
});

app.listen(4000);