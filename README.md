# Reusa - Sustainable Box Reuse Platform

Reusa è una piattaforma innovativa che trasforma i rifiuti di cartone in soluzioni di spedizione sostenibili, permettendo alle persone e alle aziende di riutilizzare le scatole invece di crearne di nuove.

## 🌱 Missione

Eliminare gli sprechi di cartone creando una piattaforma che connette chi ha scatole inutilizzate con chi ne ha bisogno, riducendo l'impatto ambientale e risparmiando sui costi.

## ✨ Caratteristiche Principali

### 📦 **App Principale Reusa**
- **Calcolatore CO₂**: Calcola l'impatto ambientale del riutilizzo delle scatole
- **Gestione Scatole**: Salva e gestisci le dimensioni delle tue scatole
- **Tracciamento Riutilizzo**: Marca le scatole come riutilizzate e traccia l'impatto
- **Dashboard Personale**: Statistiche dettagliate del tuo impatto ambientale
- **Autenticazione Sicura**: Sistema di login con Google Sign-In
- **Cache Locale**: Dati persistenti anche offline per demo sicure

### 🏢 **Sistema Inventario Reusa**
- **Gestione Prodotti**: Catalogo completo con dimensioni e ubicazioni
- **Movimenti Stock**: Tracciamento IN/OUT/TRANSFER/ADJUSTMENT
- **Categorie e Ubicazioni**: Organizzazione strutturata del magazzino
- **Dashboard Analytics**: Statistiche e KPI del magazzino
- **Sistema Ruoli**: ADMIN/MANAGER/OPERATOR/VIEWER
- **Notifiche**: Avvisi per stock basso e movimenti

## 🚀 Tecnologie Utilizzate

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (Database, Auth, Real-time)
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Cache**: localStorage per persistenza offline

## 📧 Sistema Email Personalizzato

Template email professionali con branding Reusa:

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

## 🛠️ Setup del Progetto

### Prerequisiti

- Node.js 18+
- Account Supabase (opzionale per demo)
- Account Google per OAuth (opzionale)

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

### Setup Supabase (Opzionale)

1. Crea un nuovo progetto su [Supabase](https://supabase.com)
2. Esegui le migrazioni dal folder `supabase/migrations/`
3. Configura le email templates nel dashboard
4. Imposta le variabili d'ambiente

**Nota**: L'app funziona completamente anche senza Supabase usando la cache locale!

## 📊 Schema Database

### Tabelle Principali

#### App Reusa
- `boxes` - Dimensioni e volumi delle scatole salvate

#### Sistema Inventario
- `profiles` - Profili utente estesi con ruoli
- `categories` - Categorie prodotti
- `locations` - Ubicazioni magazzino
- `products` - Prodotti del sistema
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

## 📱 Come Usare

### App Principale (`/`)
1. **Registrazione/Login**: Crea account o accedi
2. **Aggiungi Scatole**: Inserisci dimensioni delle tue scatole
3. **Traccia Riutilizzo**: Marca le scatole come riutilizzate
4. **Monitora Impatto**: Visualizza statistiche CO₂ risparmiata

### Sistema Inventario (`/auth` → `/warehouse`)
1. **Accesso**: Login al sistema inventario
2. **Gestione Prodotti**: Aggiungi e modifica prodotti
3. **Movimenti**: Registra entrate/uscite
4. **Analytics**: Monitora KPI del magazzino

## 🔧 Funzionalità Avanzate

### Cache Locale
- **Persistenza**: Dati salvati in localStorage
- **Offline**: Funziona senza connessione internet
- **Sincronizzazione**: Compatibile con backend Supabase

### Autenticazione
- **Google OAuth**: Login rapido con Google
- **Email/Password**: Registrazione tradizionale
- **Demo Mode**: Funziona anche senza backend

### Sicurezza
- **RLS**: Row Level Security su Supabase
- **Ruoli**: Sistema di permessi granulare
- **Validazione**: Input validation con Zod

## 📈 Metriche e Analytics

### KPI Tracciati
- Numero totale scatole salvate
- Percentuale di riutilizzo
- CO₂ totale risparmiata
- Volume totale gestito
- Crescita mensile

### Dashboard
- Grafici interattivi
- Statistiche in tempo reale
- Confronti temporali
- Export dati

## 🤝 Contribuire

1. Fork del progetto
2. Crea un branch per la feature (`git checkout -b feature/AmazingFeature`)
3. Commit delle modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📄 Licenza

Questo progetto è sotto licenza MIT. Vedi il file `LICENSE` per i dettagli.

## 👥 Team

- **Michele Lazzari** - Founder & CEO - [lazzari@ik.me](mailto:lazzari@ik.me)
- **Federico Collepardo** - Chief Technology Officer

## 🔗 Links

- **Website**: [https://reusa.eu](https://reusa.eu)
- **Email**: [lazzari@ik.me](mailto:lazzari@ik.me)
- **Location**: Bologna, Italia

---

**Reusa** - Reimmagina la spedizione. Rivivi ogni scatola. 📦♻️

### 🎯 Per la Startup

Questa piattaforma è pronta per:
- **Demo ai clienti**: Funziona offline con dati realistici
- **Presentazioni**: Design professionale e UX fluida
- **Scalabilità**: Facile passaggio a backend reale
- **Vendite**: Due prodotti in uno (B2C + B2B)
- **Investitori**: Metriche e analytics integrate