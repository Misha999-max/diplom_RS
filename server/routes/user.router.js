const express = require("express");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });

// router.get("/", async (req, res) => {
//   try {
//     const allUser = await User.find();
//     console.log(allUser);
//     res.status(200).send({ list: allUser });
//   } catch (error) {
//     res.status(500).json({
//       message: "на сервере произошла ошибка попробуйте позже",
//     });
//   }
// });

module.exports = router;
