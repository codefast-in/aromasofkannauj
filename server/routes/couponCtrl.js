const express = require("express");
const router = express.Router();
const { createCoupon, getAllCoupons, matchCoupon } = require("../controllers/coupanCtrl");

router.post("/create", createCoupon);

router.get("/getAll", getAllCoupons);

router.post("/match", matchCoupon);

module.exports = router;
