# Car Models Challenge (Next.js 14)

## Tech

- Next.js 14 (app router)
- TypeScript
- Zod for validation
- Server Components + Server Actions
- Service → Repository pattern

## Setup

1. Install
   npm install

2. Development
   npm run dev

3. Build
   npm run build
   npm run start

# Project layout

app/ - route components (Server Components)
app/components/ - UI components (client or server as needed)
src/services/ - business logic
src/lib/ - HTTP & repository
src/schemas/ - Zod schemas
src/types/ - domain types
src/actions/ - Server Actions controllers

# API endpoints

List: GET https://challenge.egodesign.dev/api/models/
Detail: GET https://challenge.egodesign.dev/api/models/<id>/
All external responses are validated with Zod in the repository layer.
