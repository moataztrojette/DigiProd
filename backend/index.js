const express = require("express");
const app = express();
const cors = require("cors");
const env = require("dotenv");
const cookieSession = require("cookie-session");
const expressfileupload = require("express-fileupload");

const user = require("./routes/user.route");
const categorieArticle = require("./routes/categorieArticle.route");
const article = require("./routes/article.route");
const { use } = require("./routes/categorieArticle.route");
env.config();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());

app.use(
  cookieSession({
    name: "DGC",
    keys: ["DGC_key"],
    //maxAge
  })
);
app.use(expressfileupload({}));
require("./DB/setup")();

app.use("/api/user", user);
app.use("/api/categorie", categorieArticle);
app.use("/api/article", article);

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
