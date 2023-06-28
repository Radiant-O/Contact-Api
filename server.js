const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
require("dotenv").config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
    if(!connectDb){
        console.log(`Unable to connect Database`)
    } else {
        console.log(`server running on port ${port}`);
    }
}); 