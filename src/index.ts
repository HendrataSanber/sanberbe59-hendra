import express from "express";
import db from "./utils/database";
import routes from "./routes/api";
import docs from "./docs/route";
import bodyParser from "body-parser";
import {
  errorNotFoundMiddleware,
  errorServerMiddleware,
} from "./middlewares/error.middleware";

const app = express();
const PORT = process.env.PORT || 3000;

db();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);
docs(app);
app.use(errorNotFoundMiddleware);
app.use(errorServerMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
