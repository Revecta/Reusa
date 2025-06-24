export interface EmailTemplateData {
  name?: string;
  email: string;
  resetUrl?: string;
  loginUrl?: string;
}

export const getResetPasswordEmailTemplate = (data: EmailTemplateData): string => {
  return `
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reimposta la tua Password - Reusa</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #374151;
            background-color: #f9fafb;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #15a244 0%, #10b981 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
        }
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="boxes" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="none"/><rect x="2" y="2" width="16" height="16" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23boxes)"/></svg>') repeat;
            opacity: 0.3;
        }
        .logo {
            position: relative;
            z-index: 1;
        }
        .header h1 {
            color: white;
            margin: 20px 0 10px 0;
            font-size: 28px;
            font-weight: 700;
            position: relative;
            z-index: 1;
        }
        .header p {
            color: rgba(255, 255, 255, 0.9);
            margin: 0;
            font-size: 16px;
            position: relative;
            z-index: 1;
        }
        .content {
            padding: 40px 30px;
        }
        .icon-container {
            text-align: center;
            margin-bottom: 30px;
        }
        .icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%);
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 36px;
            margin-bottom: 20px;
        }
        .content h2 {
            color: #1f2937;
            font-size: 24px;
            font-weight: 700;
            margin: 0 0 20px 0;
            text-align: center;
        }
        .content p {
            color: #6b7280;
            font-size: 16px;
            margin: 0 0 20px 0;
            text-align: center;
        }
        .button-container {
            text-align: center;
            margin: 40px 0;
        }
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #15a244 0%, #10b981 100%);
            color: white;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 4px 12px rgba(21, 162, 68, 0.3);
            transition: all 0.3s ease;
        }
        .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(21, 162, 68, 0.4);
        }
        .info-box {
            background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
            border: 1px solid #a7f3d0;
            border-radius: 12px;
            padding: 20px;
            margin: 30px 0;
        }
        .info-box h3 {
            color: #047857;
            font-size: 16px;
            font-weight: 600;
            margin: 0 0 10px 0;
        }
        .info-box p {
            color: #065f46;
            font-size: 14px;
            margin: 0;
            text-align: left;
        }
        .footer {
            background-color: #f9fafb;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }
        .footer p {
            color: #9ca3af;
            font-size: 14px;
            margin: 0 0 10px 0;
        }
        .social-links {
            margin: 20px 0;
        }
        .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #15a244;
            text-decoration: none;
            font-size: 14px;
        }
        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent 0%, #e5e7eb 50%, transparent 100%);
            margin: 30px 0;
        }
        @media (max-width: 600px) {
            .container {
                margin: 10px;
                border-radius: 12px;
            }
            .header, .content, .footer {
                padding: 20px;
            }
            .header h1 {
                font-size: 24px;
            }
            .content h2 {
                font-size: 20px;
            }
        }
    </style>
</head>
<body>
    <div style="padding: 20px;">
        <div class="container">
            <!-- Header -->
            <div class="header">
                <div class="logo">
                    <h1 style="color: white; font-size: 32px; margin: 0;">REUSA</h1>
                </div>
                <h1>Reimposta la tua Password</h1>
                <p>Richiesta di reset password per il tuo account</p>
            </div>

            <!-- Content -->
            <div class="content">
                <div class="icon-container">
                    <div class="icon">🔐</div>
                </div>

                <h2>Ciao${data.name ? ` ${data.name}` : ''}!</h2>
                
                <p>Abbiamo ricevuto una richiesta per reimpostare la password del tuo account Reusa.</p>
                
                <p>Se hai fatto questa richiesta, clicca sul pulsante qui sotto per creare una nuova password:</p>

                <div class="button-container">
                    <a href="${data.resetUrl}" class="button">
                        🔑 Reimposta Password
                    </a>
                </div>

                <div class="info-box">
                    <h3>⚠️ Informazioni Importanti</h3>
                    <p><strong>• Questo link scadrà tra 1 ora</strong> per motivi di sicurezza</p>
                    <p>• Se non hai richiesto questo reset, puoi ignorare questa email</p>
                    <p>• La tua password attuale rimarrà invariata fino a quando non ne creerai una nuova</p>
                </div>

                <div class="divider"></div>

                <p style="font-size: 14px; color: #9ca3af;">
                    Se il pulsante non funziona, copia e incolla questo link nel tuo browser:<br>
                    <a href="${data.resetUrl}" style="color: #15a244; word-break: break-all;">${data.resetUrl}</a>
                </p>
            </div>

            <!-- Footer -->
            <div class="footer">
                <p><strong>Reusa</strong> - Reimmagina la spedizione. Rivivi ogni scatola.</p>
                <p>Trasformiamo i rifiuti di cartone in soluzioni di spedizione sostenibili</p>
                
                <div class="social-links">
                    <a href="https://reusa.eu">🌐 Visita il sito</a>
                    <a href="mailto:lazzari@ik.me">✉️ Contattaci</a>
                </div>
                
                <div class="divider"></div>
                
                <p style="font-size: 12px;">
                    Questa email è stata inviata a <strong>${data.email}</strong><br>
                    Se non vuoi più ricevere queste email, <a href="#" style="color: #15a244;">clicca qui</a>
                </p>
                
                <p style="font-size: 12px; margin-top: 20px;">
                    © 2024 Reusa. Tutti i diritti riservati.<br>
                    Bologna, Italia
                </p>
            </div>
        </div>
    </div>
</body>
</html>
  `;
};

export const getWelcomeEmailTemplate = (data: EmailTemplateData): string => {
  return `
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Benvenuto in Reusa! 🎉</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #374151;
            background-color: #f9fafb;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #15a244 0%, #10b981 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
        }
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="celebration" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="15" cy="15" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="5" cy="25" r="1.5" fill="rgba(255,255,255,0.08)"/><circle cx="25" cy="5" r="1" fill="rgba(255,255,255,0.06)"/></pattern></defs><rect width="100" height="100" fill="url(%23celebration)"/></svg>') repeat;
            opacity: 0.4;
        }
        .logo {
            position: relative;
            z-index: 1;
        }
        .header h1 {
            color: white;
            margin: 20px 0 10px 0;
            font-size: 32px;
            font-weight: 700;
            position: relative;
            z-index: 1;
        }
        .header p {
            color: rgba(255, 255, 255, 0.9);
            margin: 0;
            font-size: 18px;
            position: relative;
            z-index: 1;
        }
        .content {
            padding: 40px 30px;
        }
        .welcome-icon {
            text-align: center;
            margin-bottom: 30px;
        }
        .celebration-icon {
            width: 100px;
            height: 100px;
            background: linear-gradient(135deg, #fef3c7 0%, #f59e0b 100%);
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 48px;
            margin-bottom: 20px;
            animation: bounce 2s infinite;
        }
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }
        .content h2 {
            color: #1f2937;
            font-size: 28px;
            font-weight: 700;
            margin: 0 0 20px 0;
            text-align: center;
        }
        .content p {
            color: #6b7280;
            font-size: 16px;
            margin: 0 0 20px 0;
            text-align: center;
        }
        .button-container {
            text-align: center;
            margin: 40px 0;
        }
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #15a244 0%, #10b981 100%);
            color: white;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 4px 12px rgba(21, 162, 68, 0.3);
            transition: all 0.3s ease;
            margin: 0 10px 10px 0;
        }
        .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(21, 162, 68, 0.4);
        }
        .button-secondary {
            background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
            color: #374151;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 40px 0;
        }
        .feature-card {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            border: 1px solid #bbf7d0;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
        }
        .feature-icon {
            font-size: 32px;
            margin-bottom: 10px;
        }
        .feature-card h3 {
            color: #047857;
            font-size: 16px;
            font-weight: 600;
            margin: 0 0 10px 0;
        }
        .feature-card p {
            color: #065f46;
            font-size: 14px;
            margin: 0;
            text-align: center;
        }
        .stats-container {
            background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
            border-radius: 12px;
            padding: 30px;
            margin: 30px 0;
            text-align: center;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        .stat-item {
            text-align: center;
        }
        .stat-number {
            font-size: 24px;
            font-weight: 700;
            color: #047857;
            margin-bottom: 5px;
        }
        .stat-label {
            font-size: 12px;
            color: #065f46;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .footer {
            background-color: #f9fafb;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }
        .footer p {
            color: #9ca3af;
            font-size: 14px;
            margin: 0 0 10px 0;
        }
        .social-links {
            margin: 20px 0;
        }
        .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #15a244;
            text-decoration: none;
            font-size: 14px;
        }
        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent 0%, #e5e7eb 50%, transparent 100%);
            margin: 30px 0;
        }
        @media (max-width: 600px) {
            .container {
                margin: 10px;
                border-radius: 12px;
            }
            .header, .content, .footer {
                padding: 20px;
            }
            .header h1 {
                font-size: 28px;
            }
            .content h2 {
                font-size: 24px;
            }
            .features-grid {
                grid-template-columns: 1fr;
            }
            .button {
                display: block;
                margin: 10px 0;
            }
        }
    </style>
</head>
<body>
    <div style="padding: 20px;">
        <div class="container">
            <!-- Header -->
            <div class="header">
                <div class="logo">
                    <h1 style="color: white; font-size: 36px; margin: 0;">REUSA</h1>
                </div>
                <h1>Benvenuto nella Rivoluzione Verde! 🌱</h1>
                <p>Grazie per esserti unito alla comunità Reusa</p>
            </div>

            <!-- Content -->
            <div class="content">
                <div class="welcome-icon">
                    <div class="celebration-icon">🎉</div>
                </div>

                <h2>Ciao${data.name ? ` ${data.name}` : ''}!</h2>
                
                <p style="font-size: 18px; color: #374151;">
                    <strong>Congratulazioni!</strong> Hai appena fatto il primo passo verso un futuro più sostenibile. 
                    Con Reusa, ogni scatola che riusi fa la differenza per il nostro pianeta.
                </p>

                <div class="stats-container">
                    <h3 style="color: #047857; margin: 0 0 10px 0;">Il tuo impatto potenziale:</h3>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <div class="stat-number">65g</div>
                            <div class="stat-label">CO₂ risparmiata per scatola</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">100%</div>
                            <div class="stat-label">Riduzione sprechi</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">♻️</div>
                            <div class="stat-label">Economia circolare</div>
                        </div>
                    </div>
                </div>

                <div class="button-container">
                    <a href="${data.loginUrl || 'https://reusa.eu'}" class="button">
                        🚀 Inizia Subito
                    </a>
                    <a href="https://reusa.eu/#calculator" class="button button-secondary">
                        📊 Calcola il tuo Impatto
                    </a>
                </div>

                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">📦</div>
                        <h3>Salva le tue Scatole</h3>
                        <p>Registra le dimensioni delle tue scatole e calcola l'impatto ambientale del riutilizzo</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">🤝</div>
                        <h3>Connettiti con Altri</h3>
                        <p>Trova persone e aziende che hanno bisogno delle tue scatole o che possono fornirtene</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">📈</div>
                        <h3>Traccia i Progressi</h3>
                        <p>Monitora quanta CO₂ hai risparmiato e il tuo contributo alla sostenibilità</p>
                    </div>
                </div>

                <div style="background: linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%); border-radius: 12px; padding: 20px; margin: 30px 0; text-align: center;">
                    <h3 style="color: #92400e; margin: 0 0 10px 0;">💡 Suggerimento per iniziare</h3>
                    <p style="color: #b45309; margin: 0; font-size: 14px;">
                        Inizia aggiungendo le dimensioni di una scatola che hai a casa. 
                        Vedrai immediatamente quanto CO₂ potresti risparmiare riutilizzandola!
                    </p>
                </div>

                <div class="divider"></div>

                <p style="font-size: 14px; color: #6b7280; text-align: center;">
                    Hai domande? Siamo qui per aiutarti! Rispondi a questa email o visita la nostra 
                    <a href="https://reusa.eu/contact" style="color: #15a244;">pagina di contatto</a>.
                </p>
            </div>

            <!-- Footer -->
            <div class="footer">
                <p><strong>Reusa</strong> - Reimmagina la spedizione. Rivivi ogni scatola.</p>
                <p>Insieme stiamo costruendo un futuro più sostenibile, una scatola alla volta</p>
                
                <div class="social-links">
                    <a href="https://reusa.eu">🌐 Visita il sito</a>
                    <a href="https://reusa.eu/about">👥 Chi siamo</a>
                    <a href="https://reusa.eu/impact-data">📊 I nostri dati</a>
                    <a href="mailto:lazzari@ik.me">✉️ Contattaci</a>
                </div>
                
                <div class="divider"></div>
                
                <p style="font-size: 12px;">
                    Questa email è stata inviata a <strong>${data.email}</strong><br>
                    <a href="#" style="color: #15a244;">Gestisci le preferenze email</a> | 
                    <a href="#" style="color: #15a244;">Annulla iscrizione</a>
                </p>
                
                <p style="font-size: 12px; margin-top: 20px;">
                    © 2024 Reusa. Tutti i diritti riservati.<br>
                    Bologna, Italia
                </p>
            </div>
        </div>
    </div>
</body>
</html>
  `;
};

export const getContactEmailTemplate = (data: { firstName: string; lastName: string; email: string; message: string }): string => {
  return `
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuovo messaggio dal sito Reusa</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #374151;
            background-color: #f9fafb;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #15a244 0%, #10b981 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
        }
        .header h1 {
            color: white;
            margin: 0;
            font-size: 28px;
            font-weight: 700;
        }
        .content {
            padding: 40px 30px;
        }
        .contact-card {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            border: 1px solid #bbf7d0;
            border-radius: 12px;
            padding: 20px;
            margin: 20px 0;
        }
        .contact-card h3 {
            color: #047857;
            margin: 0 0 15px 0;
            font-size: 18px;
        }
        .contact-info {
            background: white;
            padding: 15px;
            border-radius: 8px;
            margin: 10px 0;
            border-left: 4px solid #15a244;
        }
        .message-box {
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .footer {
            background-color: #f9fafb;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
            font-size: 12px;
            color: #6b7280;
        }
    </style>
</head>
<body>
    <div style="padding: 20px;">
        <div class="container">
            <div class="header">
                <h1>📧 Nuovo messaggio da Reusa</h1>
            </div>
            
            <div class="content">
                <h2 style="color: #1f2937; margin-bottom: 20px;">Dettagli del contatto:</h2>
                
                <div class="contact-card">
                    <h3>👤 Informazioni del mittente</h3>
                    
                    <div class="contact-info">
                        <strong>Nome:</strong> ${data.firstName} ${data.lastName}
                    </div>
                    
                    <div class="contact-info">
                        <strong>Email:</strong> ${data.email}
                    </div>
                </div>
                
                <div class="contact-card">
                    <h3>💬 Messaggio</h3>
                    <div class="message-box">
                        ${data.message.replace(/\n/g, '<br>')}
                    </div>
                </div>
            </div>
            
            <div class="footer">
                Questo messaggio è stato inviato dal modulo di contatto del sito Reusa (reusa.eu)<br>
                © 2024 Reusa - Bologna, Italia
            </div>
        </div>
    </div>
</body>
</html>
  `;
};