import express from "express";
const router = express.Router();

let verificationCode = null;

router.post("/register", (req, res) => {
  const { email } = req.body;
  verificationCode = Math.floor(10000 + Math.random() * 90000);

  console.log("=====================");
  console.log("Fake Email yuborildi");
  console.log(`To: ${email}`);
  console.log(`your verification code: ${verificationCode}`);
  console.log("=====================");

  res.json({ message: "Kod yuborildi (Fake)", preview: verificationCode });
});

router.post("/verify", (req, res) => {
  const { code } = req.body;
  if (parseInt(code) === verificationCode) {
    return res.json({ message: "Tasdiqlandi" });
  }
  res.status(400).json({ message: "Notogri kod" });
});

export default router;
