const express=require('express');
const router=express.Router();
const workshopController=require("../controllers/workshop");
const auth=require("../middlewares/auth");

//rutas
router.post("/register",auth.auth,workshopController.register);
router.put("/update/:_id",auth.auth,workshopController.Update);
router.get("/intelligentfind/:text/:page?",workshopController.FindForText);
router.get("/list/:page?",workshopController.workshops);
router.get("/:_id",workshopController.WorkshopFindById);
router.get("/my/workshops",auth.auth,workshopController.MisWorkshops);

//exportar router
module.exports=router;