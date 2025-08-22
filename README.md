# Image-Upload-Gallery

A simple **Node.js Express + Multer** project that allows users to upload single images or multiple images (gallery) and access them via a browser.

---

## 📌 Features
- Upload **single images**.
- Upload **multiple images (gallery)**.
- Automatically stores uploaded files inside an `uploads/` folder.
- Serves uploaded files at `http://localhost:3000/uploads/filename`.
- Lightweight and easy to use.

---

## 📂 Project Structure
```

.
├── server.js          # Main Express server code
├── package.json       # Project metadata
├── package-lock.json  # Dependency lock file
└── uploads/           # Folder where uploaded images are stored (must be created manually)

````

⚠️ **Important:** You must create an empty `uploads/` folder inside the project directory (`image-upload-gallery/`) before running the project.

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/image-upload-gallery.git
cd image-upload-gallery
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create the `uploads` Folder

```bash
mkdir uploads
```

### 4️⃣ Run the Server

```bash
node server.js
```

The server will start at:

```
http://localhost:3000
```

---

## 🛠 How It Works

* **`/` (GET)** – Serves an HTML form to upload single or multiple images.
* **`/upload` (POST)** – Handles single image uploads (`image` field).
* **`/gallery` (POST)** – Handles multiple image uploads (`gallery` field, max 10 files).
* Uploaded files can be accessed at `http://localhost:3000/uploads/<filename>`.

---

## 📖 Example Usage

1. Open `http://localhost:3000` in your browser.
2. Choose a file and upload.
3. You’ll see a success message with a link to view the file.

For multiple uploads, all uploaded files will have clickable links.

---

## 📄 License

MIT – free to use, share, or modify.

---

## ✨ Author

Made with ❤️ by [Jay Prakash Valecha](https://github.com/JPV2207)

