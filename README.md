# Reusa - Sustainable Box Reuse Platform

Reusa è una piattaforma innovativa che trasforma i rifiuti di cartone in soluzioni di spedizione sostenibili, permettendo alle persone e alle aziende di riutilizzare le scatole invece di crearne di nuove.

## 🌱 Missione

Eliminare gli sprechi di cartone creando una piattaforma che connette chi ha scatole inutilizzate con chi ne ha bisogno, riducendo l'impatto ambientale e risparmiando sui costi.

## ✨ Caratteristiche Principali

- **Calcolatore CO₂**: Calcola l'impatto ambientale del riutilizzo delle scatole
- **Gestione Scatole**: Salva e gestisci le dimensioni delle tue scatole
- **Dashboard Personale**: Traccia il tuo impatto ambientale
- **Autenticazione Sicura**: Sistema di login con Supabase
- **Design Responsive**: Ottimizzato per tutti i dispositivi
- **Email Personalizzate**: Template email con branding Reusa

## 🚀 Tecnologie Utilizzate

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (Database, Auth, Email)
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Email**: Nodemailer + Custom HTML Templates

## 📧 Sistema Email

Il progetto include template email personalizzati con il branding Reusa:

### Template Disponibili

1. **Email di Benvenuto** (`getWelcomeEmailTemplate`)
   - Inviata automaticamente alla registrazione
   - Design responsive con colori del brand
   - Statistiche di impatto e call-to-action

2. **Reset Password** (`getResetPasswordEmailTemplate`)
   - Email per il recupero password
   - Link sicuro con scadenza
   - Istruzioni chiare in italiano

3. **Contatto** (`getContactEmailTemplate`)
   - Template per messaggi dal form di contatto
   - Formattazione professionale
   - Informazioni del mittente organizzate

### Configurazione Email Supabase

Per configurare le email personalizzate in Supabase:

1. Vai su **Authentication > Email Templates** nel dashboard Supabase
2. Configura i template usando l'HTML da `src/utils/emailTemplates.ts`
3. Imposta le variabili:
   - `{{ .Email }}` - Email dell'utente
   - `{{ .ConfirmationURL }}` - URL di conferma
   - `{{ .SiteURL }}` - URL del sito (https://reusa.eu)

### Configurazione SMTP

Aggiungi queste variabili d'ambiente:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=noreply@reusa.eu
```

## 🛠️ Setup del Progetto

### Prerequisiti

- Node.js 18+
- Account Supabase
- Account Gmail per SMTP (opzionale)

### Installazione

1. **Clona il repository**
   ```bash
   git clone https://github.com/your-username/reusa.git
   cd reusa
   ```

2. **Installa le dipendenze**
   ```bash
   npm install
   ```

3. **Configura le variabili d'ambiente**
   ```bash
   cp .env.example .env
   ```
   
   Modifica `.env` con i tuoi valori:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Avvia il server di sviluppo**
   ```bash
   npm run dev
   ```

### Setup Database Supabase

1. Crea un nuovo progetto su [Supabase](https://supabase.com)
2. Esegui le migrazioni dal folder `supabase/migrations/`
3. Configura le email templates nel dashboard
4. Imposta le variabili d'ambiente

## 📊 Schema Database

Il progetto utilizza le seguenti tabelle principali:

- `boxes` - Dimensioni e volumi delle scatole salvate
- `profiles` - Profili utente estesi
- `categories` - Categorie per warehouse management
- `locations` - Posizioni nel magazzino
- `products` - Prodotti del sistema warehouse
- `movements` - Movimenti di stock
- `notifications` - Notifiche utente

## 🎨 Design System

### Colori Principali

- **Emerald 600** (`#15a244`) - Colore primario del brand
- **Emerald 700** (`#047857`) - Hover states
- **Green 50-100** - Backgrounds e accenti
- **Gray 50-900** - Testi e backgrounds neutri

### Componenti

- Layout responsive con breakpoints Tailwind
- Componenti modulari e riutilizzabili
- Animazioni e micro-interazioni
- Form validation con feedback visivo

## 🌍 Impatto Ambientale

### Calcoli CO₂

Il sistema calcola l'impatto ambientale basandosi su:

- **Superficie scatola**: Lunghezza × Larghezza × Altezza
- **Peso stimato**: Superficie × GSM (grammatura cartone)
- **Emissioni CO₂**: Peso × 0.7g CO₂/g cartone

### Dati di Riferimento

- Cartone singola parete: 140 GSM
- Cartone doppia parete: 250 GSM
- Emissioni medie: 0.7-0.8 kg CO₂ per kg di cartone

## 🚀 Deployment

### Build di Produzione

```bash
npm run build
```

### Deploy su Netlify

1. Connetti il repository GitHub a Netlify
2. Configura le variabili d'ambiente
3. Deploy automatico ad ogni push

### Configurazione Domini

- Produzione: `https://reusa.eu`
- Staging: `https://staging.reusa.eu`

## 📝 Contribuire

1. Fork del progetto
2. Crea un branch per la feature (`git checkout -b feature/AmazingFeature`)
3. Commit delle modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📄 Licenza

Questo progetto è sotto licenza MIT. Vedi il file `LICENSE` per i dettagli.

## 👥 Team

- **Michele Lazzari** - Founder & CEO - [lazzari@ik.me](mailto:lazzari@ik.me)

## 🔗 Links

- **Website**: [https://reusa.eu](https://reusa.eu)
- **Email**: [lazzari@ik.me](mailto:lazzari@ik.me)
- **Location**: Bologna, Italia

---

**Reusa** - Reimmagina la spedizione. Rivivi ogni scatola. 📦♻️