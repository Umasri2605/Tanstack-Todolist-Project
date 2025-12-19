const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const todoRoutes=require("./todos/todoRoutes")
const cors=require("cors")


const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Tanstack Todolist Is Running");
});
dotenv.config();
connectDB();

app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
