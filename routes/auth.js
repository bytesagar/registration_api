const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../database/models/User");
const { registerValidation, loginValidation } = require("../validation");



router.post("/signup", async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExists = await User.findOne({ email: req.body.email })
    if (emailExists) res.status(400).send("Email already exists");

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const savedUser = await user.save()
        res.send({ user: user._id })
    } catch (error) {
        res.send(error)
    }
})

router.post("/login", async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send("Login Error!")

    const user = await User.findOne({ email: req.body.email });
    if (!user) res.status(400).send("Email or password is wrong");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) res.status(400).send("Invalid password")

    //create token and assign
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_CONFIG);
    res.header('auth-token', token).send(token)

    res.send("Logged in")
})


module.exports = router
