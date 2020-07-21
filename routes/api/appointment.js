const router = require("express").Router();
const AppointmentController = require("../../controllers/AppointmentController");


router.route("/")
  .get(AppointmentController.findAll)
  .post(AppointmentController.create);


router
  .route("/:id")
  .get(AppointmentController.findById)
  .put(AppointmentController.update)

router.route("/doc/:id")
.get(AppointmentController.findDocApp)

router.route("/pat/:id")
.get(AppointmentController.findPatApp)

module.exports = router;