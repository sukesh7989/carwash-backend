let express = require("express");
let Customer = require("./models/Customer");
let Wash = require("./models/Wash");
let feedback = require("./models/Feedback");
let cors = require("cors")
let server = express();
let main = require("./utils/Sendmail")

//importing db file
require("./config/db")
const corsOptions = {
  origin: ['http://localhost:5173/','http://localhost:3001/'],
  credentials: true,
  optionSuccessStatus: 200
}


//middleware
server.use(cors(corsOptions))
server.use(express.json())


    
// signup form

server.post("/signup", async(req , res)=>{
   console.log(req.body);
let { email , password , confirmpassword}=req.body

let userObj = await Customer.findOne({email : email});
console.log(userObj);

if(userObj !== null){
    return res.status(400).send("Already  Exists ")
}
else if(password !== confirmpassword){
    return res.status(400).send("Passwords do not match")
}
else{
   let newUser = Customer.create(req.body);
    return res.status(200).send("Account created successfully")
}

})


//login form
server.post('/login', async (req, res) => {
    const { email, password } = req.body;
    let oldUser = await Customer.findOne({email : email});
    if(oldUser === null){
        return res.status(400).send("Account not found")
    }
    else if(oldUser.password !== password){
        return res.status(400).send("password is incorrect")
    }
    else{
        return res.status(200).send(oldUser)
    }
})


  server.post("/createWash",async(req,res)=>{
    console.log(req.body);
    let washed = await Wash.create(req.body)
    return res.send(washed)
  })
  server.get("/yourwashes/:id", async (req, res) => {
    const url = req.params; // Access the id parameter directly
    let yourwashes = await Wash.find({ customerId: url.id }).populate('customerId');
    return res.send(yourwashes);
})

  server.post("/feedback", async(req,res)=>{
    // let feed = await feedback.create(req.body)
    // return res.send(feed)
    // console.log(req.body);
    await main(req.body.email)
    return res.status(200).send("feedback sent successfully")
  })
let port = 8000;
server.listen(port,()=>{
    console.log("server running...")
})

