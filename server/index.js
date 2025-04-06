const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const PORT = process.env.PORT || 8000;
connectDB();

// Use body parser with larger limits
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Cookie parser
app.use(cookieParser());

// CORS
app.use(cors({
    origin: "*",
    credentials: true,
}));

// File upload middleware
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp"
}));

// Cloudinary config
cloudinaryConnect();

// Routes
app.use("/api/v1/image", require("./routes/imageRoute"));
app.use("/api/v1/auth", require("./routes/userRoute"));
app.use("/api/v1/product", require("./routes/productRoute"));
app.use("/api/v1/coupon", require("./routes/couponCtrl"));

// Root route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running ..."
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at port no ${PORT}`);
});
