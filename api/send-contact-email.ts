import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, email, message } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
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

    // Email content
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: 'lazzari@ik.me',
      subject: 'Nuovo messaggio dal sito Reusa',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #15a244; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Nuovo messaggio da Reusa</h1>
          </div>
          
          <div style="padding: 20px; background-color: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">Dettagli del contatto:</h2>
            
            <div style="background-color: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
              <strong>Nome:</strong> ${firstName} ${lastName}
            </div>
            
            <div style="background-color: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
              <strong>Email:</strong> ${email}
            </div>
            
            <div style="background-color: white; padding: 15px; border-radius: 8px;">
              <strong>Messaggio:</strong><br>
              <div style="margin-top: 10px; line-height: 1.6;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
          
          <div style="padding: 20px; text-align: center; color: #666; font-size: 12px;">
            Questo messaggio è stato inviato dal modulo di contatto del sito Reusa.
          </div>
        </div>
      `,
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