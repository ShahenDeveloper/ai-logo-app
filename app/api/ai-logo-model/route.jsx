import { AILogoPrompt } from "../../../configs/AiModel";
import { db } from "../../../configs/FirebaseConfig";
import axios from "axios";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import sharp from "sharp";

export const maxDuration = 300;

export async function POST(req) {
  const { prompt, email, title, desc, } = await req.json();

  try {
    console.log("Inside API CALL");

    // Generate AI Text Prompt for Logo
    const AiPromptResult = await AILogoPrompt.sendMessage(prompt);
    const AIPrompt = JSON.parse(AiPromptResult.response.text()).prompt;

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    // Generate logo image from Replicate
    const output = await replicate.run(
      "bytedance/hyper-flux-8step:81946b1e09b256c543b35f37333a30d0d02ee2cd8c4f77cd915873a1ca622bad",
      {
        input: {
          prompt: AIPrompt,
          num_outputs: 1,
          aspect_ratio: "1:1",
          output_format: "png",
          guidance_scale: 3.5,
          output_quality: 80,
          num_inference_steps: 8,
        },
      }
    );

    const imageUrl = output[0];

    // Convert image to base64 with and without watermark
    const imageWithWatermark = await ConvertImageToBase64(imageUrl, true);
    const imageWithoutWatermark = await ConvertImageToBase64(imageUrl, false);

    const docId = Date.now().toString();
    const docRef = doc(db, "users", email);

    await setDoc(doc(db, "users", email, "logos", docId), {
      image: imageWithWatermark,
      imageOriginal: imageWithoutWatermark,
      title: title,
      desc: desc,
      prompt: AIPrompt,
      id: docId,
    });

    return NextResponse.json({
      image: imageWithWatermark,
      imageOriginal: imageWithoutWatermark,
      logoId: docId,
    });
  } catch (e) {
    console.error("API Error:", e);
    return NextResponse.json({ error: e });
  }
}

async function ConvertImageToBase64(imageUrl, isWaterMark = true) {
  const watermarkImagePath = "public/images/watermark.png"; // Ensure this path is correct

  try {
    let imageData;

    // Get the image from the provided URL
    imageData = await axios.get(imageUrl, { responseType: "arraybuffer" });

    // Load the watermark image
    const watermark = sharp(watermarkImagePath).resize(400, 100); // Resize watermark to 400x100

    if (isWaterMark) {
      // Add watermark to the original image
      const watermarkedImage = await sharp(imageData.data)
        .composite([
          {
            input: await watermark.toBuffer(), // The watermark as buffer
            gravity: "southeast", // Position the watermark at the bottom-right corner
          },
        ])
        .toBuffer();

      // Compress the watermarked image and return as base64
      const compressedImageBuffer = await sharp(watermarkedImage)
        .resize({ width: 700 })
        .jpeg({ quality: 80 })
        .toBuffer();

      return `data:image/jpeg;base64,${compressedImageBuffer.toString("base64")}`;
    } else {
      // If no watermark, just compress the original image
      const compressedImageBuffer = await sharp(imageData.data)
        .resize({ width: 700 })
        .jpeg({ quality: 80 })
        .toBuffer();

      return `data:image/jpeg;base64,${compressedImageBuffer.toString("base64")}`;
    }
  } catch (error) {
    console.error("Error converting image:", error);
    throw error;
  }
}
