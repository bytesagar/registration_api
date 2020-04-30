const router = require("express").Router();
const verify = require("./verifyToken")

router.get("/", verify, (req, res) => {
    res.send("Hey You got access to the resourses")
})



module.exports = router