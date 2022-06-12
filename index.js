const express = require("express");
const multer = require("multer");
const Image = require("./model/image");
const cors = require('cors');
require("./db/mongoose");

const upload = multer({
  limits: {
    fileSize: 5000000,
  },

  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(
        new Error("Please upload an image with extension jpg or jpeg or png")
      );
    }

    cb(undefined, true);
  },
});

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.post(
  "/upload-image",
  upload.single("image"),
  async (req, res) => {
    try {
      const buffer = req.file.buffer;
      const image = new Image({
        image: buffer,
      });
      await image.save();
      res.send({message: "Image is uploaded", id: image._id});
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

app.get("/get-image/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const image = await Image.findById(id);
    if (!image) {
      throw new Error("Image not found");
    }
    res.set("Content-Type", "Image/jpg");
    res.send(image.image);
  } catch (e) {
    res.status(404).send({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
