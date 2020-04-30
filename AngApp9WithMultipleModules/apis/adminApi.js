//create a router to deal with admin requests
const exp=require("express");
const adminRouter=exp.Router();









//write req handlers of admin
//	http://localhost:port/admin/profile (GET)
adminRouter.get('/profile',(req,res,next)=>{
   
    res.send({message:"admin get working"});
})

//export adminRouter obj
module.exports=adminRouter;