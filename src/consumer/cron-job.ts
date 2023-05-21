import { SQS } from "aws-sdk";
import cron from "node-cron";

import { QUEUE_URL, sqs } from "../aws-config";

const receiveMessage = async () => {
  console.log("Starting pulling messages");

  const { $response, Messages } = await sqs
    .receiveMessage({ QueueUrl: QUEUE_URL, MaxNumberOfMessages: 5 })
    .promise();

  if ($response.error) {
    console.log("Error on pulling messages:", $response.error);
  }

  if (Messages) {
    for (let i = 0; i < Messages.length; i++) {
      await proccessMessage(Messages[i]);
    }
  }

  console.log("Ending pulling messages");
};

const proccessMessage = async (message: SQS.Message) => {
  console.log(`[${message.MessageId}] Processing message...`);

  await new Promise((resolve) => {
    setTimeout(() => resolve(true), 500);
  });

  await removeMessage(message);
};

const removeMessage = async (message: SQS.Message) => {
  const { $response } = await sqs
    .deleteMessage({
      QueueUrl: QUEUE_URL,
      ReceiptHandle: message.ReceiptHandle as string,
    })
    .promise();

  if ($response.error) {
    console.log(`[${message.MessageId}] Delete Error:`, $response.error);
  } else {
    console.log(`[${message.MessageId}] Message processed and removed.`);
  }
};

const every15Seconds = "*/15 * * * * *";
cron.schedule(every15Seconds, receiveMessage);
