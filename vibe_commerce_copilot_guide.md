# Vibe Commerce — Copilot Task Guide

> A single-file Copilot-friendly guide that describes the full-stack mock E‑Com Cart project. Use this to generate code, tests, and design assets.

---

## Project Overview

Build a basic full-stack shopping cart app for **Vibe Commerce** screening. The app should allow users to browse products, add/update/remove items in a cart, view totals, and perform a mock checkout (no real payments).

**Primary goals for Copilot:**
- Produce working backend (Express) with REST API and DB persistence (MongoDB or SQLite).
- Produce React frontend (create-react-app or Vite) with responsive UI and cart flow.
- Wire up API calls, error handling, and seed data.
- Add tests (basic) and scripts to run the app locally.
- Produce a `README.md` with setup instructions and demo guidance.

---

## Tech Stack

- Frontend: React (functional components + hooks), Tailwind CSS (optional), react-router
- Backend: Node.js, Express
- DB: MongoDB (primary) — include an optional SQLite implementation for local-only runs
- Testing: Jest + Supertest for backend, React Testing Library for frontend
- Tools: Nodemon for dev, concurrently for running both servers, dotenv for env variables
- Optional: Fake Store API integration as a bonus

---

## Repo layout

```
/vibe-commerce
  /backend
    /src
      /controllers
      /models
      /routes
      /middlewares
      /utils
      index.js
    package.json
    .env.example
  /frontend
    /src
      /components
      /pages
      /services
      /styles
      App.jsx
      main.jsx
    package.json
  README.md  <- root overview
  .gitignore
```

---

## High-level MVP Acceptance Criteria

1. Backend exposes required endpoints (see API Spec).
2. Frontend shows product grid (5–10 mock items) and a cart view.
3. Add to Cart increases item quantity (or adds new item).
4. Cart supports update quantity and remove item.
5. Checkout page collects name + email and returns a mock receipt (total + timestamp).
6. App persists cart to DB (mock user) between server restarts.
7. Responsive design for mobile/tablet/desktop.

---

## API Spec (backend)

### Base path
`/api`

### Endpoints

- `GET /api/products`
  - Response: `[{ id, name, price, image?, description? }, ...]` (5–10 items)

- `GET /api/cart`
  - Response: `{ items: [{ _id, productId, name, price, qty }], total: number }`

- `POST /api/cart`
  - Body: `{ productId: string, qty: number }`
  - Behavior: If item exists, increment qty; else insert item.
  - Response: updated cart (same shape as GET /api/cart)

- `DELETE /api/cart/:id`
  - Behavior: remove cart item by DB id
  - Response: updated cart

- `PUT /api/cart/:id`
  - Body: `{ qty: number }` - update quantity
  - Response: updated cart

- `POST /api/checkout`
  - Body: `{ cartItems: [{ productId, qty }], name: string, email: string }`
  - Behavior: Calculate total, create mock receipt `{receiptId, total, timestamp, items}`
  - Response: receipt object


### Error codes
- `400` — invalid request body
- `404` — resource not found
- `500` — server error

Include consistent JSON error shape: `{ error: true, message: '...' }`.

---

## Backend Implementation Notes

### Models (MongoDB)

**Product** (seeded)
```js
{
  _id: ObjectId,
  name: String,
  price: Number,
  description?: String,
  image?: String
}
```

**CartItem** (single mock user)
```js
{
  _id: ObjectId,
  productId: ObjectId,
  name: String,
  price: Number,
  qty: Number,
  userId: String // optional, default 'demo-user'
}
```

**Receipt**
```js
{
  _id: ObjectId,
  items: [{ productId, name, price, qty }],
  total: Number,
  name: String,
  email: String,
  timestamp: Date
}
```

### Sample seed data
Provide a `seed.js` script that inserts 6–8 mock products into `products` collection. Each product should have a realistic price and an image URL (or local placeholder).

### Middleware
- Error handler
- Request validation (express-validator or simple checks)
- CORS

### Dev scripts (backend/package.json)
```json
"scripts": {
  "dev": "nodemon src/index.js",
  "start": "node src/index.js",
  "seed": "node src/seed.js",
  "test": "jest"
}
```

---

## Frontend Implementation Notes

### Pages / Components

- `ProductsPage` — grid of product cards. Each card: image, name, price, "Add to Cart" button.
- `CartPage` — list of cart items (name, price, qty, subtotal) + total + update qty + remove.
- `CheckoutPage` — form: name, email, review items, confirm button.
- `ReceiptModal` — shows mock receipt after checkout.
- `Header` — site title, cart icon with badge (count of items), responsive nav.
- `ProductCard` — reusable.

### Services
`/services/api.js` — functions: `getProducts()`, `getCart()`, `addToCart(productId, qty)`, `updateCartItem(id, qty)`, `removeCartItem(id)`, `checkout(payload)`.

### State management
- Use local React state + context for cart in frontend OR rely solely on backend `GET /api/cart` for source-of-truth.
- Recommended: short-lived cart UI state with sync to backend on actions.

### Styling
- Use Tailwind CSS (recommended) or plain CSS. Keep UI minimal and responsive.

### Dev scripts (frontend/package.json)
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest"
}
```

---

## SQLite option (local-only)

Provide an alternate DB layer (for dev only). Keep the same models but map to tables:
- products(id, name, price, description, image)
- cart_items(id, product_id, name, price, qty, user_id)
- receipts(id, total, name, email, timestamp)

Add an environment variable `DB_CLIENT=mongo|sqlite` and implement a thin persistence adapter that switches by client.

---

## Tests

### Backend
- Tests for products endpoint returns seeded items
- Tests for adding to cart, updating qty, deleting, and checkout (use Supertest)

### Frontend
- Unit test: ProductCard renders props
- Integration test: Add to cart button calls API and updates badge

---

## Bonus Features (optional)

- Persist cart per mock user (store `userId = 'demo-user'` in DB).
- Integrate with Fake Store API (`https://fakestoreapi.com`) as alternate product source with a feature flag.
- Add optimistic UI updates in frontend for a snappier feel.
- Add basic input validation on checkout form.

---

## Git / CI / PR Workflow (for Copilot to follow)

- Make a `dev` branch for initial work. Use feature branches like `feature/backend-products`, `feature/frontend-products`.
- Commit message style: `feat(api): add GET /api/products` or `fix(ui): correct cart total calculation`.
- Add a GitHub Actions workflow that runs backend tests and frontend build on push to `main`.

---

## Deliverables Checklist (what to include on GitHub)

- `/backend` and `/frontend` folders with code
- `README.md` at repo root with setup instructions and screenshots
- `.env.example` files for both backend and frontend
- `seed.js` for seeding product data
- Tests and `package.json` scripts
- `demo` folder (optional) containing 1–2 minute demo recording link and short script for the video
- `SCREENS` folder placeholder for screenshots

---

## `README.md` (content to generate)

Root `README.md` should include:
1. Project title & short description
2. Tech stack
3. How to run (backend + frontend concurrently)
4. Environment variables required
5. Seed DB instructions
6. How to run tests
7. How to build
8. Demo video link & screenshots
9. Notes on architecture & design decisions

### Example run commands to include
```
# from repo root
cd backend && npm install && npm run seed && npm run dev
cd ../frontend && npm install && npm run dev
# or one-liner using concurrently
npm run dev:all # configure in root package.json
```

---

## Demo video script (1–2 minutes)

1. 0:00–0:10 — Project title screen (Vibe Commerce)
2. 0:10–0:35 — Show product grid, add multiple items, update qty
3. 0:35–0:55 — Open cart, remove an item, show totals update
4. 0:55–1:20 — Checkout flow: fill name & email, click confirm
5. 1:20–1:40 — Show receipt modal with timestamp and total
6. 1:40–2:00 — Show quick explanation of backend routes and seed script

---

## Design & UX notes (create design assets)

- Keep layout simple: 3-column grid on desktop, 1-column on mobile.
- Product card: image (square), name (two-line max), price, add button.
- Cart panel: item list + sticky footer with total + checkout button.
- Colors: neutral background, a single accent color for CTA.

You can add small icons for cart and remove actions. Provide accessible alt text for images.

---

## Example API snippet (Express)

```js
// src/routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) { next(err); }
});

module.exports = router;
```

---

## Acceptance tests / Manual QA checklist

- [ ] Products load on page load
- [ ] Add to cart increases count and total
- [ ] Update quantity reflects subtotal and total
- [ ] Remove works and updates totals
- [ ] Checkout validates name/email and returns receipt
- [ ] Cart persists after server restart (DB-backed)

---

## Helpful hints for Copilot

- Create small, focused commits for each feature.
- Prioritize a working end-to-end flow before polishing style.
- Keep API responses compact and consistent.
- If using MongoDB locally, mention `mongodb://localhost:27017/vibe-commerce` as a default in `.env.example`.

---

## Final notes

This document is intentionally prescriptive so Copilot can follow step-by-step. If any part requires less detail (for example, choice of CSS framework), pick a simple, widely-known option (Tailwind or plain CSS). Aim to complete the MVP first, then layer bonus features.


---

*Generated to help GitHub Copilot (or a developer) scaffold and complete the entire Vibe Commerce mock e-com cart project.*

