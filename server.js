const path = require("path");
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json({ limit: "200kb" }));
app.use(express.static(path.join(__dirname)));

app.get("/api/health", (_req, res) => {
	res.json({ ok: true });
});

app.post("/api/contact", async (req, res) => {
	const { name, email, message } = req.body || {};

	if (!name || !email || !message) {
		return res.status(400).json({ error: "Name, email, and message are required." });
	}

	const user = (process.env.EMAIL_USER || "").trim();
	const pass = (process.env.EMAIL_PASS || "").replace(/\s+/g, "").trim();
	const to = (process.env.EMAIL_TO || user || "").trim();

	if (!user || !pass || !to) {
		return res.status(500).json({ error: "Email service is not configured." });
	}

	if (pass.length !== 16) {
		return res.status(500).json({
			error: "Invalid EMAIL_PASS format.",
			details: "Gmail App Password must be exactly 16 characters.",
		});
	}

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user,
			pass,
		},
	});

	try {
		await transporter.sendMail({
			from: `Portfolio Contact <${user}>`,
			to,
			replyTo: email,
			subject: `New message from ${name}`,
			text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
		});

		return res.json({ ok: true });
	} catch (error) {
		console.error("Email send failed:", error);
		if (error?.responseCode === 535) {
			return res.status(500).json({
				error: "Gmail rejected login.",
				details: "Use a valid Gmail App Password (16 chars), ensure 2-Step Verification is ON, and restart server after updating .env.",
			});
		}
		return res.status(500).json({
			error: "Failed to send message.",
			details: error?.message || "Unknown error",
		});
	}
});

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
