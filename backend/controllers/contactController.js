const nodemailer = require("nodemailer");
const fs = require("fs").promises;
const path = require("path");

/**
 * Handle contact form submissions
 */
exports.handleContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    const validation = validateContactForm({ name, email, subject, message });
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.errors.join(", "),
      });
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: email.trim().toLowerCase(),
      subject: sanitizeInput(subject),
      message: sanitizeInput(message),
    };

    // Log submission (optional - for analytics)
    await logContactSubmission(sanitizedData);

    // Send email if configured
    if (process.env.EMAIL_HOST && process.env.EMAIL_USER) {
      await sendContactEmail(sanitizedData);
    }

    res.json({
      success: true,
      message:
        "Thank you for your message! I'll get back to you within 24 hours.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({
      success: false,
      message:
        "Sorry, there was an error sending your message. Please try again later.",
    });
  }
};

/**
 * Validate contact form data
 */
function validateContactForm({ name, email, subject, message }) {
  const errors = [];

  // Name validation
  if (!name || name.trim().length < 2) {
    errors.push("Name must be at least 2 characters");
  }
  if (name && name.trim().length > 50) {
    errors.push("Name must be less than 50 characters");
  }

  // Email validation
  if (!email || !isValidEmail(email)) {
    errors.push("Please provide a valid email address");
  }

  // Subject validation
  if (!subject || subject.trim().length < 3) {
    errors.push("Subject must be at least 3 characters");
  }
  if (subject && subject.trim().length > 100) {
    errors.push("Subject must be less than 100 characters");
  }

  // Message validation
  if (!message || message.trim().length < 10) {
    errors.push("Message must be at least 10 characters");
  }
  if (message && message.trim().length > 1000) {
    errors.push("Message must be less than 1000 characters");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitize input to prevent XSS
 */
function sanitizeInput(input) {
  if (!input) return "";
  return input.trim().replace(/[<>]/g, "");
}

/**
 * Send contact email via nodemailer
 */
async function sendContactEmail(data) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"${process.env.FROM_NAME || 'Portfolio Contact'}" <${process.env.FROM_EMAIL || process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: data.email,
    subject: `Portfolio Contact: ${data.subject}`,
    text: `
Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}
    `,
    html: `
      <h2>New Portfolio Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <h3>Message:</h3>
      <p>${data.message.replace(/\n/g, "<br>")}</p>
      <hr>
      <p><small>Sent from portfolio website at ${new Date().toISOString()}</small></p>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log(`📧 Contact email sent from ${data.name} (${data.email})`);
}

/**
 * Log contact submission to file (optional analytics)
 */
async function logContactSubmission(data) {
  try {
    const logEntry = {
      timestamp: new Date().toISOString(),
      name: data.name,
      email: data.email,
      subject: data.subject,
      messageLength: data.message.length,
      ip: "hidden-for-privacy",
    };

    const logPath = path.join(__dirname, "../logs/contacts.json");

    // Ensure logs directory exists
    await fs.mkdir(path.dirname(logPath), { recursive: true });

    // Read existing logs or create empty array
    let logs = [];
    try {
      const existingLogs = await fs.readFile(logPath, "utf8");
      logs = JSON.parse(existingLogs);
    } catch (error) {
      // File doesn't exist or is invalid, start fresh
    }

    // Add new entry
    logs.push(logEntry);

    // Keep only last 100 entries
    if (logs.length > 100) {
      logs = logs.slice(-100);
    }

    // Write back to file
    await fs.writeFile(logPath, JSON.stringify(logs, null, 2));
  } catch (error) {
    console.error("Error logging contact submission:", error);
    // Don't throw - logging failure shouldn't break the contact form
  }
}
