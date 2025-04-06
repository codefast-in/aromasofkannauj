const express = require("express")
const { loginMemberCtrl, registerMemberCtrl, getAllUsersCtrl } = require("../controllers/userCtrl")
const { auth } = require("../middlewares/auth")
const router = express.Router()


router.post("/login", loginMemberCtrl)
router.post("/register", registerMemberCtrl)
router.get("/userAll",auth,  getAllUsersCtrl)




module.exports = router