import express from "express";
import cors from "cors";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const PORT = 3000;
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.post("/", (req, res) => {
    res.json({ message: "Data received", data: req.body });
    console.log(req.body);
});

app.get("/analytics/v1/:key/analytics.min.js", (req, res) => {
    if (req.params.key !== "123") {
        res.status(404).json({ msg: "Invalid API key" });
        return;
    }
    res.status(200).sendFile(__dirname + "/public/analytics.min.js");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
