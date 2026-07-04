# 🩸 Wisal Backend

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-4.x-000000?logo=express"/>
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white"/>
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma"/>
</p>
Backend API for **Wisal**, the national blood donation platform.

------------------------------------------------------------------------
# 📖 Project Overview

**Wisal** is a national digital platform developed as an official submission for the **Crown Prince Award** in Jordan. The platform aims to modernize and improve the blood donation ecosystem by connecting blood donors, hospitals, and the Ministry of Health through one centralized system.

Wisal provides an intelligent and secure solution for managing blood donation campaigns, hospital blood inventory, donor eligibility, appointment scheduling, and emergency blood requests. Using smart matching based on blood type, geographic location, and medical eligibility, the platform significantly reduces the time required to find suitable donors and helps save lives.

The project consists of three integrated systems:

- 📱 **Mobile Application** for blood donors.
- 🏥 **Hospital Management Dashboard** for blood inventory, campaigns, and donor management.
- 🏛️ **Ministry of Health Dashboard** for monitoring hospitals, approving campaigns, and viewing nationwide statistics.

The backend is developed using **Node.js**, **Express.js**, **TypeScript**, **PostgreSQL**, and **Prisma ORM**, following modern RESTful API principles with JWT authentication, Zod validation, Swagger documentation, and scalable architecture.

# ✨ Features

-   JWT Authentication
-   Refresh Tokens
-   PostgreSQL + Prisma ORM
-   Zod Validation
-   Swagger API Docs
-   Pino Logger
-   Helmet Security
-   CORS
-   TypeScript
-   REST API

------------------------------------------------------------------------

# 🏗 Tech Stack

  Layer        Technology
  ------------ --------------
  Runtime      Node.js
  Framework    Express.js
  Language     TypeScript
  Database     PostgreSQL
  ORM          Prisma
  Auth         JWT + bcrypt
  Validation   Zod
  Docs         Swagger UI
  Logging      Pino

------------------------------------------------------------------------

# 📁 Folder Structure

``` text
src/
 controllers/
 routes/
 middleware/
 services/
 prisma/
 docs/
 config/
 utils/
```

# 🚀 Installation

``` bash
git clone <repository-url>

cd wisal-backend

npm install
```

------------------------------------------------------------------------

# 🔐 Environment Variables

Create a `.env`

``` env
PORT=5000
NODE_ENV=development

DATABASE_URL="postgresql://username:password@localhost:5432/wisal"

JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
JWT_ACCESS_EXPIRES_IN=
JWT_REFRESH_EXPIRES_IN=

LOG_LEVEL=info
APP_NAME=Wisal Backend
API_PREFIX=/api/v1
```

------------------------------------------------------------------------

# ▶ Running

Development

``` bash
npm run dev
```

Production

``` bash
npm run build
npm run start
```

------------------------------------------------------------------------

# 🗄 Prisma

Generate Client

``` bash
npm run prisma:generate
```

Migration

``` bash
npm run prisma:migrate
```

Deploy

``` bash
npm run prisma:deploy
```

Push Schema

``` bash
npm run prisma:push
```

Studio

``` bash
npm run prisma:studio
```

Seed

``` bash
npm run prisma:seed
```

------------------------------------------------------------------------

# 📜 Scripts

``` bash
npm run dev
npm run build
npm run start

npm run prisma:generate
npm run prisma:migrate
npm run prisma:deploy
npm run prisma:push
npm run prisma:studio
npm run prisma:seed

npm run lint
npm run format
```

------------------------------------------------------------------------

# 📚 Swagger

Visit:

``` text
http://localhost:5000/docs
```

------------------------------------------------------------------------

# 🔒 Authentication

-   Access Token
-   Refresh Token
-   Bearer Authentication
-   Protected Routes

------------------------------------------------------------------------

# 📦 Main Modules

-   Authentication
-   Users
-   Hospitals
-   Blood Campaigns
-   Donations
-   Notifications
-   Dashboard
-   Ministry Management

------------------------------------------------------------------------

# 🛡 Security

-   Helmet
-   CORS
-   Password Hashing (bcrypt)
-   JWT
-   Input Validation
-   Secure Environment Variables

------------------------------------------------------------------------

# 📊 Logging

Pino Logger

    LOG_LEVEL=info

------------------------------------------------------------------------

# 🏛 Architecture

``` text
Client
   │
 REST API
   │
Express.js
   │
Controllers
   │
Services
   │
Prisma ORM
   │
PostgreSQL
```

------------------------------------------------------------------------

# 👨‍💻 Team

**Algorithm A**

-   Abdullah AlQrinawi --- Backend, Integration, Admin Dashboard
-   Ahmed Homam --- Flutter, UI/UX

------------------------------------------------------------------------

# 📄 License

MIT

------------------------------------------------------------------------

Made with ❤️ using Node.js, Express, Prisma and PostgreSQL.
