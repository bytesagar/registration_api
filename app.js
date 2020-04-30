const express = require("express");
const dotenv = require("dotenv");
const databaseConnection = require("./database/config");


dotenv.config()
const app = express();
databaseConnection();

const authRoute = require("./routes/auth")
const postsRouter = require("./routes/post")


app.use(express.json());


app.use("/api", authRoute);
app.use("/api/posts", postsRouter)















app.listen(3000, () => {
    console.log("Server listening on port 3000");
})