import Replicate from "replicate";

const client = process.env.REPLICATE_API_TOKEN
  ? new Replicate({ auth: process.env.REPLICATE_API_TOKEN })
  : null;

export async function generateVideo(prompt: string) {
  if (!client) {
    return { mock: true, output: [`/media/mock-${Date.now()}.mp4`], prompt };
  }
  const output = await client.run("anotherjesse/zeroscope-v2-xl:9f747673945d52c6c7f93bc7f4f17fd51f1db6f8f9b95f73f53f63741e7f4e7f", {
    input: { prompt }
  });
  return { output, prompt };
}

export const generateScene = generateVideo;

export async function generateImage(prompt: string) {
  if (!client) {
    return { mock: true, output: `/media/mock-${Date.now()}.png`, prompt };
  }
  const output = await client.run("stability-ai/stable-diffusion:db21e45d3f7f4a2738c5cfbc6f4869eb1fca9f5d4da6638f9a56b0d9f2e6fb56", {
    input: { prompt }
  });
  return { output, prompt };
}
