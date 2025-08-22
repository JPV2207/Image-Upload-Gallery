// Import required modules
const express = require("express"); // Express.js framework for building web applications
const multer = require("multer"); // Multer middleware for handling multipart/form-data (file uploads)
const path = require("path"); // Node.js path module for working with file and directory paths

// Initialize Express application
const app = express();
// Define the port number for the server to listen on
const PORT = 3000;

/**
 * Configure Multer storage settings
 * Multer gives us control over storing uploaded files
 */
const storage = multer.diskStorage({
  // Define destination directory for uploaded files
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Files will be stored in the 'uploads' directory
  },
  // Define how uploaded files should be named
  filename: function (req, file, cb) {
    // Generate unique filename using current timestamp and original file extension
    // This prevents filename conflicts when multiple files with the same name are uploaded
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Initialize Multer with the configured storage settings
const upload = multer({ storage: storage });

/**
 * Serve static files from the 'uploads' directory
 * This allows clients to access uploaded files via URLs like:
 * http://localhost:3000/uploads/filename.jpg
 */
app.use("/uploads", express.static("uploads"));

/**
 * Route to serve the HTML forms for file uploads
 * This is the root route that users visit to access the upload forms
 */
app.get("/", (req, res) => {
  // Send HTML with two forms: one for single image upload, one for multiple images
  res.send(`
    <h1>Image Upload</h1>
    <form action="/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="image" />
      <button type="submit">Upload Image</button>
    </form>
    <h2>Gallery Upload</h2>
    <form action="/gallery" method="post" enctype="multipart/form-data">
      <input type="file" name="gallery" multiple />
      <button type="submit">Upload Gallery</button>
    </form>
  `);
});

/**
 * Route for handling single image uploads
 * Uses Multer's single() method to process one file with the field name 'image'
 */
app.post("/upload", upload.single("image"), (req, res) => {
  // Check if a file was actually uploaded
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  // If file was uploaded successfully, send success message with link to view the file
  res.send(
    `File uploaded successfully: <a href="/uploads/${req.file.filename}">View File</a>`
  );
});

/**
 * Route for handling multiple image uploads (gallery)
 * Uses Multer's array() method to process multiple files with the field name 'gallery'
 * The second parameter (10) specifies the maximum number of files allowed
 */
app.post("/gallery", upload.array("gallery", 10), (req, res) => {
  // Check if any files were uploaded
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files uploaded.");
  }
  // Create an array of HTML links to each uploaded file
  let files = req.files.map(
    (file) => `<a href="/uploads/${file.filename}">${file.originalname}</a>`
  );
  // Send success message with links to all uploaded files
  res.send(`Files uploaded successfully: ${files.join(", ")}`);
});

/**
 * Start the server and listen on the specified PORT
 */
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
