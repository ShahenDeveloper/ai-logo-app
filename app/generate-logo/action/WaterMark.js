"use server"
import axios from 'axios';

async function addWatermarkWithPicnie(baseImageUrl, watermarkImageUrl) {
  const picnieApiKey = process.env.PICNIE_API_KEY;

  const payload = {
    base_image_url: baseImageUrl,
    watermark_image_url: watermarkImageUrl,
    position: 'bottom-right', // Options: 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'center'
    opacity: 0.5, // Adjust opacity as needed (0 to 1)
    scale: 0.3 // Scale of the watermark relative to the base image
  };

  try {
    const response = await axios.post('https://api.picnie.com/v1/add-watermark', payload, {
      headers: {
        'Authorization': `Bearer ${picnieApiKey}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.watermarked_image_url; // URL of the watermarked image
  } catch (error) {
    console.error('Error adding watermark:', error);
    throw error;
  }
}

export default addWatermarkWithPicnie