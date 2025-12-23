<div align="center">
  
# 💸 Track My Debt

### A Telegram bot for tracking debts between friends in group chats

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5.1-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](https://mongoosejs.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel&logoColor=white)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

**Never forget who owes who!** Track debts effortlessly in your Telegram group chats with automatic calculations, settlement confirmations, and beautiful formatted messages.

[Features](#-features) • [Commands](#-commands) • [Setup](#-setup) • [Architecture](#-architecture) • [Contributing](#-contributing)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 💰 Smart Debt Tracking

- Add debts to multiple users at once
- Automatic balance calculations
- Positive/negative amount indicators
- Per-group debt isolation

</td>
<td width="50%">

### 🤝 Settlement Flow

- Request settlement with inline buttons
- Partner confirmation required
- Group-specific settlements
- Atomic transaction safety

</td>
</tr>
<tr>
<td width="50%">

### 📊 Rich Summaries

- View debt summaries per group
- Transaction history with dates
- Visual debt indicators (🟢/🔴)
- Formatted HTML messages

</td>
<td width="50%">

### 🔒 Secure & Reliable

- MongoDB transactions for data integrity
- Cached database connections
- Error handling with user feedback
- TypeScript for type safety

</td>
</tr>
</table>

---

## 📖 User Guide

Using the bot is simple! Just follow these steps:

1. **Add to Group**: Add the bot to your Telegram group chat.
2. **Register**: Type `/register` in the group. This creates your profile so you can track debts.
3. **Add a Debt**: Someone paid for you? Add a debt record!

   > Usage: `/add @User Amount Description`

   _Example:_ if **Alice** paid **$50** for **Bob**'s lunch:
   Alice types: `/add @Bob 50 Lunch`
   (This means Bob now owes Alice $50)

4. **Check Balances**: Type `/get` anytime to see who owes who.
5. **Settle Up**: Paid your friend back? clear the debt!

   > Usage: `/settle @User`

   _Example:_ Bob pays Alice back the $50.
   Bob types: `/settle @Alice`
   Alice clicks **"Accept"** on the confirmation message.

---

## 📱 Commands

| Command     | Description                      | Example                       |
| ----------- | -------------------------------- | ----------------------------- |
| `/register` | Register yourself to use the bot | `/register`                   |
| `/add`      | Add debt to mentioned user(s)    | `/add @john @jane 500 dinner` |
| `/get`      | View your debt summary           | `/get`                        |
| `/history`  | View debt transaction history    | `/history`                    |
| `/settle`   | Settle debts with a user         | `/settle @john`               |
| `/help`     | Show all commands                | `/help`                       |

### How It Works

```
📝 Alice adds a debt:
   /add @bob 100 lunch yesterday

📊 The bot records:
   • Alice is owed +100 by Bob
   • Bob owes -100 to Alice

💵 Later, Bob settles up:
   /settle @alice

✅ Alice confirms with inline button
   → Both balances reset to 0
```

---

## 🚀 Setup

### Prerequisites

- Node.js 18+
- MongoDB database
- Telegram Bot Token (from [@BotFather](https://t.me/BotFather))

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/track-my-debt.git
cd track-my-debt

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

### Configuration

Edit `.env.local` with your credentials:

```env
BOT_TOKEN=your_telegram_bot_token
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/
```

### Set Webhook

Configure your bot to receive updates via webhook:

```bash
curl -X POST "https://api.telegram.org/bot<BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://your-domain.com/webhook"}'
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

---

## 🏗 Architecture

```
src/
├── index.ts              # Express app entry point
├── controllers/
│   ├── webhook.controller.ts   # Main webhook handler
│   ├── debt.controller.ts      # Debt operations
│   ├── register.controller.ts  # User registration
│   └── help.controller.ts      # Help command
├── services/
│   ├── debt.service.ts    # Debt CRUD & aggregations
│   └── user.service.ts    # User operations
├── models/
│   ├── user.model.ts      # User schema
│   └── debt.model.ts      # Debt schema
├── lib/
│   ├── bot.ts             # Telegram API wrapper
│   ├── axios.ts           # HTTP client config
│   └── mongodb.ts         # Database connection
└── utils/
    ├── format.ts          # Message formatting
    ├── validation.ts      # Input validation
    └── AppError.ts        # Custom error class
```

### Data Models

```typescript
// User - stores Telegram user info and running balances
interface IUser {
  _id: number // Telegram user ID
  username?: string
  firstName?: string
  totalDebt: [
    {
      // Running balance per partner
      partner: number
      amount: number // +ve = owed to you, -ve = you owe
    }
  ]
}

// Debt - individual transaction records
interface IDebt {
  group: number // Telegram chat ID
  author: number // Who created the debt
  partner: number // Who the debt is with
  amount: number
  description: string
  createdAt: Date
}
```

---

## 🛠 Tech Stack

| Technology             | Purpose                      |
| ---------------------- | ---------------------------- |
| **TypeScript**         | Type-safe development        |
| **Express.js 5**       | Web framework                |
| **MongoDB + Mongoose** | Database & ODM               |
| **Axios**              | HTTP client for Telegram API |
| **Vercel**             | Serverless deployment        |

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ for friends who forget debts

**⭐ Star this repo if you find it useful!**

</div>
