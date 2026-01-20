# Debt Tracker - Landing Page

A modern, responsive landing page for the Telegram Debt Tracker Bot, built with Next.js 14, Tailwind CSS, and Radix UI. This project serves as the public face for the bot, showcasing features, commands, and how-to guides.

## Features

- **Modern UI/UX**: Sleek design with a dark mode toggle.
- **Responsive Layout**: Fully optimized for mobile, tablet, and desktop.
- **Interactive Elements**: Smooth animations and interactive components using Framer Motion (implied by typical usage, though using `tailwindcss-animate` here).
- **Sections**:
  - **Hero**: Engaging introduction.
  - **Features**: Highlighted capabilities of the bot.
  - **How it Works**: Step-by-step guide.
  - **Commands**: Comprehensive list of bot commands.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theming**: `next-themes` for dark/light mode support.

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js 18+ installed on your machine.

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm start`: Runs the built application in production mode.
- `npm run lint`: Runs ESLint to check for code quality issues.

## Project Structure

```
├── app/                  # Next.js App Router directories
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page entry
├── components/           # Reusable UI components
├── lib/                  # Utility libraries
├── public/               # Static assets
└── ...config files
```

## License

This project is open source and available under the [MIT License](LICENSE).
