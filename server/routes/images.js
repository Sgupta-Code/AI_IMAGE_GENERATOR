// routes/images.js
const express = require("express");
const router = express.Router();
const axios = require("axios");
const auth = require("../middleware/auth");
const Image = require("../models/Image");


// Generate image
router.post("/generate",auth,async(req,res) => {
  try{
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ msg: "Prompt is required" });
    }

    // call freepik API to generate image
    const freepikResponse = await axios.post(
      "https://api.freepik.com/v1/ai/mystic",
      {
        prompt,
        hdr: 50,
        resolution: "2k",
        aspect_ratio: "square_1_1",
        model: "realism",
        creative_detailing: 33,
        engine: "automatic",
        filter_nsfw: true,
      },
      {
        headers: {
          "x-freepik-api-key": process.env.FREEPIK_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const {task_id, status} = freepikResponse.data.data;

    // Save to DB
    const newImage = new Image({
      userId: req.user.id,
      prompt,
      taskId: task_id,
      status,
      imageUrl: "" // Initially empty, will be updated later
    });
    await newImage.save();

    res.json({
      msg: "Image generation started. Use /api/images/status/:taskId to check status.",
      image: newImage
    });
  } catch (err) {
    console.error("Error generating image:", err);
    let errorMessage = "Server error";
    if (err.response && err.response.data) {
      errorMessage = err.response.data.error || err.response.data.message || errorMessage;
    }
    res.status(500).json({ msg: errorMessage });
  }
});

// Get all images for current user
router.get("/", auth, async (req, res) => {
  try {
    const images = await Image.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(images);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete an image
router.delete("/:id", auth, async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    // Check if image exists
    if (!image) {
      return res.status(404).json({ msg: "Image not found" });
    }

    // Check if user owns the image
    if (image.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Use deleteOne instead of remove (which is deprecated)
    await Image.deleteOne({ _id: req.params.id });

    res.json({ msg: "Image removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/status/:taskId", auth, async (req, res) => {
  try {
    const { taskId } = req.params;
    const statusResponse = await axios.get(
      `https://api.freepik.com/v1/ai/mystic/${taskId}`,
      {
        headers: {
          "x-freepik-api-key": process.env.FREEPIK_API_KEY,
        },
      }
    );
    // console.log('Freepik status response:', statusResponse.data.data);
    const { status, generated } = statusResponse.data.data;

    if (generated && generated.length > 0) {
      const imageUrl = generated[0];
      // Update DB
      await Image.findOneAndUpdate(
        { taskId },
        { imageUrl, status: "COMPLETED" }
      );
      return res.json({ status: "COMPLETED", imageUrl });
    }
    res.json({ status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to fetch status" });
  }
});

module.exports = router;
