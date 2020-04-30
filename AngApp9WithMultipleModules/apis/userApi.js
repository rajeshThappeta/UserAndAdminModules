//create a router to deal with user requests
const exp = require("express");
const userRouter = exp.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//cloudinary configuration
//install "cloudinary","multer-storage-cloudinary","multer" modules

const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");
//credentials
cloudinary.config({
  cloud_name: "djqbwmvjg",
  api_key: "492171555336437",
  api_secret: "OO5HtI8g0gpuIZyjR3m1jXa9-KE",
});

//set storage

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "user-profiles",
  allowedFormats: ["jpg", "png"],
  filename: function (req, file, cb) {
    cb(undefined, file.fieldname + "-" + Date.now());
  },
});

//Configure multer middleware
var upload = multer({ storage: storage });


//import verify tokem middleware
const verifyAndValidateToken=require('./middlewares/verifyToken');



//req handlers of user
//	http://localhost:port/user/profile/<username>  (GET)
userRouter.get("/profile/:username" ,verifyAndValidateToken,(req, res, next) => {
  //check the argument
  console.log(req.params); //{ username: "ravi"}
  //get "userCOllectionObj" from req.app.locals object
  let userCollectionObj = req.app.locals.userCollectionObj;

  //find the user in usercollection
  userCollectionObj.findOne(
    { username: req.params.username },
    (err, userObj) => {
      if (err) {
        next(err);
      } else if (userObj == null) {
        //if user not existed
        res.send({ message: `${req.params.username} not existed` });
      } else {
        res.send({ userObj: userObj });
      }
    }
  );
});

//use body parser middleware
userRouter.use(exp.json());

//req handler for user registration
userRouter.post("/register", upload.single("photo"), (req, res, next) => {


  console.log("req body is ",req.body)
  console.log("url is ", req.file.secure_url);
  console.log("user data is ", JSON.parse(req.body.userObj));

  req.body=JSON.parse(req.body.userObj);  
  req.body.profileImage = req.file.secure_url;

  delete req.body.photo;

  console.log("obj received from clinet is ", req.body);
  //get usercollection object from "req.app.locals" object
  let userCollectionObj = req.app.locals.userCollectionObj;

  //check for a user in user collection with the "username" received from client
  userCollectionObj.findOne({ username: req.body.username }, (err, userObj) => {
    if (err) {
      next(err);
    }

    //if user is existed
    if (userObj != null) {
      res.send({
        message: "user existed",
      });
    }
    //if user is not existed
    else {
      //insert "req.body" into usercollection
      //hash the password
      bcrypt.hash(req.body.password, 7, (err, hashedPassword) => {
        if (err) {
          next(err);
        }
        //replace paint text password with hashedpassword
        req.body.password = hashedPassword;
        //insert req.body to user collection
        userCollectionObj.insertOne(req.body, (err, success) => {
          if (err) {
            next(err);
          }
          res.send({ message: "user created" });
        });
      });
    }
  });
});

//PUT req handling
//http://localhost:port/user/update
userRouter.put("/update", (req, res, next) => {
  console.log("object to update ", req.body);

  //get usercollection object from "req.app.locals" object
  let userCollectionObj = req.app.locals.userCollectionObj;

  //perform update operation
  userCollectionObj.update(
    { username: req.body.username },
    { $set: { name: req.body.name, email: req.body.email } },
    (err, successInUpdate) => {
      if (err) {
        next(err);
      }

      res.send({ message: "update success" });
    }
  );
});







//user login(Authentication) process
//http://loaclhost:3000/user/login
userRouter.post("/login", (req, res, next) => {
  //get usercollection object from "req.app.locals" object
  let userCollectionObj = req.app.locals.userCollectionObj;

  //compare username
  userCollectionObj.findOne({ username: req.body.username }, (err, userObj) => {
    if (err) {
      next(err);
    }
    //if user obj is null,then send "invalid username" to client
    if (userObj == null) {
      res.send({ message: "invalid username" });
    }
    //if user obj is not null,compare passwords
    else {
      bcrypt.compare(req.body.password, userObj.password, (err, isMatched) => {
        if (err) {
          next(err);
        }
        //if passwords are not matched
        if (isMatched == false) {
          res.send({ message: "invalid password" });
        }
        //if passwords are matched
        else {
          //create a JWT token and send it as response to client
          jwt.sign(
            { username: userObj.username },
            "abcdef",
            { expiresIn: 20 },
            (err, signedToken) => {
              if (err) {
                next(err);
              }
              res.send({
                message: "success",
                token: signedToken,
                username:userObj.username
              });
            }
          );
        }
      });
    }
  });
});

//error handling
userRouter.use((err, req, res, next) => {
  console.log("err is ", err.message);
  console.log("err stack is ", err.stack);
  res.send({ message: "Opps...something went wrong!!!!!!" });
});

//export userRouter obj
module.exports = userRouter;
