# Car Models Challenge 🚗

A responsive car catalog application featuring filtering, sorting, and detailed model views, strictly following design specifications (Pixel Perfect).

**🔗 Live Demo:** https://ego-code-chall-nextjs.vercel.app/

## 🚀 Getting Started

To run the project locally, follow these steps:

1. Install dependencies
   npm install

2. Run development server
   npm run dev

   Open http://localhost:3000 with your browser.

3. Build for production
   npm run build
   npm run start

## 🛠 Tech Stack

- Framework: Next.js 16 (App Router)
- Library: React 19
- Language: TypeScript
- Styling: Tailwind CSS
- Validation: Zod (Defensive programming on API responses)

## 📂 Architecture

The project implements the Service-Repository Pattern to ensure separation of concerns:

- app/: UI Layer (Server Components & Client Components).
- src/services/: Business logic layer.
- src/lib/: Repository layer (Data access & HTTP adapter).
- src/schemas/: Zod schemas for runtime validation.
- src/types/: Shared domain TypeScript definitions.

## 📡 API Integration

- List: GET /api/models/
- Detail: GET /api/models/<id>/
