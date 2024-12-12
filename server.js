const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
const port = 3000;

// Twilio credentials
const apiKeySid = process.env.apiKeySid; // Your API Key SID
const apiKeySecret = process.env.apiKeySecret; // Your API Key Secret
const accountSid = process.env.accountSid; // Replace with your Twilio Account SID

// Initialize Twilio client
const client = twilio(apiKeySid, apiKeySecret, { accountSid });

app.use(cors());
app.use(bodyParser.json());

// Endpoint to send SMS
app.post("/send-sms", (req, res) => {
  const { to, body } = req.body;

  client.messages
    .create({
      body,
      from: "+17755873940", // Replace with a verified Twilio number
      to,
    })
    .then((message) =>
      res.status(200).send({ success: true, sid: message.sid })
    )
    .catch((err) =>
      res.status(500).send({ success: false, error: err.message })
    );
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});