# ZENQOR API — Backend Service

RESTful API built with NestJS powering the ZENQOR sales platform. Handles authentication, product management, order processing, and analytics.

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

## ✨ Key Features

### 🔐 Authentication
- JWT-based authentication
- Password hashing with bcrypt
- Role-based guards (ADMIN / USER)
- Token expiration and validation

### 📦 Modules
- **Auth** — Register, login, JWT validation
- **Users** — Profile management, password update
- **Products** — Full CRUD with category relations
- **Orders** — Order creation, status management
- **Categories** — Product categorization
- **Analytics** — Revenue, monthly trends, order stats

### 🗄️ Database
- PostgreSQL hosted on Railway
- Prisma ORM with migrations
- Relational schema (users, products, orders, payments)
- Decimal precision for financial data

## 🛠 Tech Stack

- **Framework:** NestJS (latest)
- **Language:** TypeScript (strict mode)
- **ORM:** Prisma v7
- **Database:** PostgreSQL
- **Auth:** JWT + bcrypt
- **Validation:** class-validator + class-transformer
- **Database Host:** Railway

## 🚀 Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/zenqor.git
cd zenqor/apps/api
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://user:password@host:port/database"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
PORT=3001
```

### 4️⃣ Run database migrations

```bash
npx prisma migrate dev
npx prisma generate
```

### 5️⃣ Seed the database

```bash
npx ts-node src/seed.ts
```

### 6️⃣ Run in development

```bash
npm run start:dev
```

API running at: 👉 [http://localhost:3001/api](http://localhost:3001/api)

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Sign in, get JWT |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List all products |
| GET | `/api/products/:id` | Get product |
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | List orders |
| GET | `/api/orders/stats` | Order statistics |
| POST | `/api/orders` | Create order |
| PUT | `/api/orders/:id/status` | Update status |

### Analytics
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/analytics/overview` | Platform overview |
| GET | `/api/analytics/monthly` | Monthly revenue |
| GET | `/api/analytics/by-status` | Orders by status |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | List users |
| GET | `/api/users/stats` | User statistics |
| PATCH | `/api/users/profile` | Update profile |
| PATCH | `/api/users/password` | Change password |

## 🗄️ Database Schema

```
users ──────── orders ──────── order_items ──── products
                  │                                 │
               payments                         categories
```
3. Set Root Directory to `apps/api`
4. Add environment variables
5. Set Start Command: `npm run start:prod`
