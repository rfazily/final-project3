const router = require("express").Router();
const userRoutes = require("./user");
const loginRoute = require("./login");
const doctorRoute = require("./doctor");
const appRoute = require("./appointment");


router.use("/user", userRoutes);
router.use("/login", loginRoute);
router.use("/doctor", doctorRoute);
router.use("/app", appRoute);

module.exports = router;