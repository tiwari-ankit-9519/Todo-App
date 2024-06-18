import express from "express";
import cors from "cors";
import router from "./routes";

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

const port = 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
