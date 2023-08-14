const express=require('express');
const router=express.Router();
const userController=require("../controllers/user");
const auth=require("../middlewares/auth");

//definir rutas
router.post("/register",userController.register);
router.post("/login",userController.login);
router.get("/find/:_id",auth.auth,userController.userFindById);
router.put("/update",auth.auth,userController.userUpdate);
router.get("/list",userController.users)

//exportar router
module.exports=router;