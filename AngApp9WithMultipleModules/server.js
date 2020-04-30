//load express function
const exp=require("express");
//create express obj
const app=exp();

const path=require("path");

//connecting ANgular app with this server
app.use(exp.static(path.join(__dirname,'./dist/AngApp9WithMultipleModules')));



//import MongoClient
const mc=require("mongodb").MongoClient;

//import admin and user routers
const adminApiObj=require('./apis/adminApi')
const userApiObj=require("./apis/userApi");


//if path contains '/user'
app.use('/user',userApiObj);
//if path contains '/admin'
app.use('/admin',adminApiObj);

//middleware to handle unavailable paths
app.use((req,res,next)=>{
    res.send({message:`path ${req.url} is not available`});
});



//get db url from mongo atlas
var dbUrl = "mongodb+srv://b26:b26@cluster0-z3col.mongodb.net/test?retryWrites=true&w=majority";

mc.connect(dbUrl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
    if(err)
    {
        console.log("Err in db connect ",err);
    }
    else{
        //get db connection object
        let b26DatabaseObject=client.db("b26db");

        //get collection objects
        let userCollectionObj=b26DatabaseObject.collection("usercollection");
        let adminCollectionObj=b26DatabaseObject.collection("admincollection");

        console.log("db connected..");


        //assign collection objects to "locals" object of "app"
        app.locals.userCollectionObj=userCollectionObj;
        app.locals.adminCollectionObj=adminCollectionObj;


        const port=4000;
        app.listen(port,()=>{ console.log(`server listening on port ${port}`)});

    }
});










