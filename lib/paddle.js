import { Environment, Paddle } from "@paddle/paddle-node-sdk";

export const paddle = new Paddle(process.env.PADDLE_API_KEY, {
  environment: Environment.sandbox,
});
