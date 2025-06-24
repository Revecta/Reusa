import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { getContactEmailTemplate } from '../src/utils/emailTemplates';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, email, message } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ error: 'Tutti i campi sono obbligatori' });
  }

  try {
    // Create transporter using environment variables
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Use the custom email template
    const htmlContent = getContactEmailTemplate({
      firstName,
      lastName,
      email,
      message,
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: 'lazzari@ik.me',
      subject: 'Nuovo messaggio dal sito Reusa',
      html: htmlContent,
      text: `
Nuovo messaggio dal sito Reusa

Nome: ${firstName} ${lastName}
Email: ${email}

Messaggio:
${message}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Email inviata con successo' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Errore nell\'invio dell\'email' });
  }
}