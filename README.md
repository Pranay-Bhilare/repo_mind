# RepoMind

RepoMind is an AI-powered codebase assistant that helps you ask questions about your projects, explore code, and manage project knowledge efficiently. Built with the T3 Stack (Next.js, tRPC, Prisma, Tailwind CSS), it leverages modern AI and collaborative tools for a seamless developer experience.

## Features
- **AI Q&A:** Ask questions about your codebase and get AI-generated answers with code references.
- **Project Management:** Create, view, and switch between multiple projects.
- **Code Reference Tracking:** Answers include referenced files and summaries.
- **User Authentication:** Secure login and user management with Clerk.
- **Modern UI:** Responsive, accessible, and visually appealing interface using Tailwind CSS and Radix UI components.
- **Database Integration:** Uses PostgreSQL with Prisma ORM and vector extensions for embeddings.

## Tech Stack
- [Next.js](https://nextjs.org) (App Router, SSR)
- [tRPC](https://trpc.io) (API layer)
- [Prisma](https://prisma.io) (ORM)
- [Tailwind CSS](https://tailwindcss.com) (Styling)
- [Clerk](https://clerk.dev) (Authentication)
- [AI SDKs](https://www.npmjs.com/package/ai) (AI features)
- [Radix UI](https://www.radix-ui.com/) (UI components)
- [Framer Motion](https://www.framer.com/motion/) (Animations)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+)
- PostgreSQL database

### Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/repo_mind.git
   cd repo_mind
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in the required values (e.g., `DATABASE_URL`, Clerk keys, AI provider keys).
4. **Set up the database:**
   ```sh
   npx prisma migrate dev
   npx prisma generate
   ```
5. **Run the development server:**
   ```sh
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

## Usage
- **Sign in** with your Clerk account.
- **Create a new project** or select an existing one from the sidebar.
- **Ask questions** about your codebase from the dashboard.
- **Save answers** and view referenced files for future reference.

## Project Structure
- `src/app/` — Main application routes and layouts
- `src/components/` — Shared and UI components
- `src/hooks/` — Custom React hooks
- `src/lib/` — Utility libraries (AI, GitHub integration, etc.)
- `src/server/` — API and database logic
- `prisma/` — Prisma schema and migrations
- `public/` — Static assets

## Scripts
- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm run preview` — Preview the production build
- `npm run lint` — Lint the codebase
- `npm run format:write` — Format code with Prettier
- `npm run db:generate` — Run Prisma migrations

## Contributing
Pull requests and issues are welcome! Please open an issue to discuss your ideas or report bugs.

---

This project was bootstrapped with [create-t3-app](https://create.t3.gg/).
