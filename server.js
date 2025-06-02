const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let allowedEmails = [];

try {
  allowedEmails = JSON.parse(fs.readFileSync('emails.json'));
} catch (err) {
  console.error("Failed to read email list:", err);
}

app.post('/validate', (req, res) => {
  const email = (req.body.email || "").toLowerCase().trim();
  if (!email) {
    return res.status(400).json({ success: false, message: "Email required" });
  }

  if (allowedEmails.includes(email)) {
    return res.json({ success: true });
  } else {
    return res.status(403).json({ success: false, message: "Unauthorized email" });
  }
});

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});