const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 4000;
const urlRoutes = require('./routes/urlRoutes');


const app = express();
dotenv.config();

app.use(express.json());           
app.use(express.urlencoded({ extended: true })); 

app.use(urlRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch((error) => console.error("MongoDB failed to connect")
)

// app.listen(PORT, () => {
//     console.log(`Server listening at ${PORT}`);
    
// })


module.exports = app; // Export app for testing

if (require.main === module) {
  // Only start server if this file is run directly
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

