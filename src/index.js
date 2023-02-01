const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const uploadController = require("./controllers/upload");


const port = 3000;

const app = express();

app.use(cors());
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
);
app.use(express.static("uploads/"));


app.use("/api", uploadController);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})