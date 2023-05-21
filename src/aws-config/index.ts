import aws from "aws-sdk";

const AWS_ACCESS_KEY = "";
const AWS_SECRET_ACCESS_KEY = "";
export const QUEUE_URL = "";

aws.config.update({
  region: "us-east-1",
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

export const sqs = new aws.SQS();
