const Coupon = require("../models/couponModle");

exports.createCoupon = async (req, res) => {
    try {
        const { code, discountPercentage, maxDiscount, minPurchase, validFrom, validUntil } = req.body;

        const existingCoupon = await Coupon.findOne({ code });
        if (existingCoupon) {
            return res.status(400).json({ message: "Coupon code already exists" });
        }

        const newCoupon = new Coupon({
            code: code.toUpperCase(),
            discountPercentage,
            maxDiscount,
            minPurchase,
            validFrom,
            validUntil,
            isActive: true,
        });

        await newCoupon.save();
        res.status(201).json({ message: "Coupon created successfully", coupon: newCoupon });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getAllCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.status(200).json({ coupons });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.matchCoupon = async (req, res) => {
    try {
        const { code, totalAmount } = req.body;

        const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
        if (!coupon) {
            return res.status(404).json({ message: "Invalid or expired coupon" });
        }

        const currentDate = new Date();
        if (currentDate < coupon.validFrom || currentDate > coupon.validUntil) {
            return res.status(400).json({ message: "Coupon is not valid at this time" });
        }

        if (totalAmount < coupon.minPurchase) {
            return res.status(400).json({ message: `Minimum purchase of ${coupon.minPurchase} required` });
        }

        let discount = (totalAmount * coupon.discountPercentage) / 100;
        if (discount > coupon.maxDiscount) {
            discount = coupon.maxDiscount;
        }

        res.status(200).json({ message: "Coupon applied successfully", discount });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
