import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import Buyers from "./routes/Buyers.js";
import Agents from "./routes/Agent.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);
app.use("/Buyers", Buyers);
app.use("/Agents", Agents);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
