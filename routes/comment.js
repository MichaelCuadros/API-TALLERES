const express=require("express");
const router=express.Router();
const commentController=require("../controllers/comment");
const auth=require("../middlewares/auth");

//rutas
router.post("/register/:_id",auth.auth,commentController.register);
router.get("/workshop/:_id",commentController.findByIdWorkshop);
router.get("/workshop/calification/:_id",commentController.calification);

//exportar router
module.exports=router;