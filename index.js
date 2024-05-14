let express = require("express");
let Customer = require("./models/Customer");
let Wash = require("./models/Wash");
let feedback = require("./models/Feedback");
let cors = require("cors")
let server = express();
let {main,sendOtpFn} = require("./utils/Sendmail")

//importing db file
require("./config/db")
const corsOptions = {
  origin: '*', // Allow requests from any origin
  credentials: true,
  optionSuccessStatus: 200
}

//middleware
server.use(cors())
// server.options('*', cors(corsOptions)); // Handle preflight OPTIONS requests for all routes

server.use(express.json())

const path = require("path");
server.get("/", (req, res) => {
  server.use(express.static(path.resolve(__dirname, "frontend", "build")));
res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});




// signup form

server.post("/signup", async (req, res) => {
  console.log(req.body);
  let { email, password, confirmpassword } = req.body

  let userObj = await Customer.findOne({ email: email });
  console.log(userObj);

  if (userObj !== null) {
    return res.status(400).send("Already  Exists ")
  }
  else if (password !== confirmpassword) {
    return res.status(400).send("Passwords do not match")
  }
  else {
    let newUser = Customer.create(req.body);
    return res.status(200).send("Account created successfully")
  }

})


//login form
server.post('/login', async (req, res) => {
  const { email, password } = req.body;
  let oldUser = await Customer.findOne({ email: email });
  if (oldUser === null) {
    return res.status(400).send("Account not found")
  }
  else if (oldUser.password !== password) {
    return res.status(400).send("password is incorrect")
  }
  else {
    return res.status(200).send(oldUser)
  }
})


server.post("/createWash", async (req, res) => {
  console.log(req.body);
  let washed = await Wash.create(req.body)
  return res.send(washed)
})
server.get("/yourwashes/:id", async (req, res) => {
  const url = req.params; // Access the id parameter directly
  let yourwashes = await Wash.find({ customerId: url.id }).populate('customerId');
  return res.send(yourwashes);
})

server.post("/feedback", async (req, res) => {

  await main(req.body.email)
  return res.status(200).send("feedback sent successfully")
})

server.post('/verifyEmail', async (req, res) => {
  let user = await Customer.findOne({ email: req.body.email });
  if (user === null) {
    return res.status(400).send("Account not found")
  }
  else {

   
    return res.status(200).send("Account found")
  }
});

server.post("/sendOtp", async (req, res) => {
  let digits = '0123456789';
  let OTP = '';
  let len = digits.length
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * len)];
  };

  let customer = await Customer.findOne({ email: req.body.email });

customer.otp = OTP;
await customer.save();
  await sendOtpFn(req.body.email,OTP)
})

server.post("/verifyOtp", async (req, res) => {
  let user = await Customer.findOne({ email: req.body.email });

  if (user === null) {
    return res.status(400).send("Account not found")
  }

  else if (user.otp!== req.body.otp) {
    return res.status(400).send("OTP is incorrect")
  }
  else {
    return res.status(200).send(user)
  }
})


server.post("/updatePassword", async (req, res) => {
  const { password, confirm, email } = req.body;
  let student = await Customer.findOne({ email: req.body.email });
  if (confirm !== password) {
    return res.status(400).send("Passwords do not match");
  } else {
    student.password = password;
    student.confirmpassword = confirm;
    await student.save();
    return res.status(200).send("Password Updated successfully");
  }
  

})


let port = 8000;
server.listen(port, () => {
  console.log("server running...")
})

