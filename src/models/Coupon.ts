
import mongoose from 'mongoose';

const CouponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  discountPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  maxDiscount: {
    type: Number,
    required: true,
    min: 0
  },
  minPurchase: {
    type: Number,
    required: true,
    min: 0
  },
  validFrom: {
    type: Date,
    required: true
  },
  validUntil: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Fix: More robust check to prevent errors during hot module reloading
const Coupon = mongoose.models && mongoose.models.Coupon 
  ? mongoose.models.Coupon 
  : mongoose.model('Coupon', CouponSchema);

export default Coupon;
