import bodyParser from "body-parser";
import express from "express";

import { QUEUE_URL, sqs } from "../aws-config";

const app = express();
app.use(bodyParser.json());

app.post("/send-message", async (req, res) => {
  sqs.sendMessage(
    {
      QueueUrl: QUEUE_URL,
      MessageBody: req.body.message,
    },
    (err, data) => {
      if (err) {
        console.log("Error on send message:", err);
        return res.status(400).send({ ok: false });
      } else {
        console.log("Message sended with success:", data);
        return res.status(200).send({ ok: true, messageId: data.MessageId });
      }
    }
  );
});

app.listen(3000, () => {
  console.log("[Server] listening on port 3000");
  console.log(
    "[Server] You can send an message in [POST] http://localhost:3000/send-message"
  );
  console.log('[Server] with body: { "message": "string" }');
  console.log();
});
