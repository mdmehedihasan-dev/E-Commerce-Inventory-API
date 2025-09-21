<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# E-Commerce Inventory API

A RESTful API built with [NestJS](https://nestjs.com/) and TypeORM for managing products, categories, and user authentication in an e-commerce inventory system.

## Features

- **User Authentication**: Register, login, JWT-based authentication, and refresh tokens.
- **Product Management**: CRUD operations for products, including image upload and filtering.
- **Category Management**: CRUD operations for product categories, with ownership checks.
- **Role-based Access**: Restricts access to resources based on user roles.
- **API Documentation**: Swagger UI available for easy API exploration.
- **PostgreSQL Database**: Uses PostgreSQL for data persistence.
- **File Uploads**: Supports product image uploads.

## Project Structure

```
src/
  ├── app.controller.ts
  ├── app.module.ts
  ├── app.service.ts
  ├── jwt-auth.guard.ts
  ├── main.ts
  ├── auth/
  ├── category/
  ├── entity/
  └── product/
uploads/
test/
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- PostgreSQL database

### Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd E-Commerce-Inventory-API
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**

   Edit the `.env` file with your PostgreSQL credentials:
   ```
   DB_HOST=your-db-host
   DB_PORT=your-db-port
   DB_USER=your-db-user
   DB_PASS=your-db-password
   DB_NAME=your-db-name
   ```

### Running the Application

- **Development:**
  ```sh
  npm run start:dev
  ```

- **Production:**
  ```sh
  npm run build
  npm run start:prod
  ```

### Running Tests

- **Unit tests:**
  ```sh
  npm run test
  ```

- **E2E tests:**
  ```sh
  npm run test:e2e
  ```

- **Test coverage:**
  ```sh
  npm run test:cov
  ```

## API Documentation

After starting the server, access the Swagger UI at:

- **Local:** `http://localhost:3000/api`
- **Live (Deployed):** [https://e-commerce-inventory-api.onrender.com/api](https://e-commerce-inventory-api.onrender.com/api)

## Endpoints Overview

- **Auth:** `/api/auth`
  - `POST /register` — Register a new user
  - `POST /login` — Login and receive JWT tokens
  - `POST /refresh` — Refresh access token
  - `GET /profile` — Get current user profile (JWT required)

- **Products:** `/api/products`
  - `POST /` — Create product (JWT required, supports image upload)
  - `GET /` — List products (JWT required, supports filtering & pagination)
  - `GET /:id` — Get product by ID (JWT required)
  - `PUT /:id` — Update product (JWT required, supports image upload)
  - `DELETE /:id` — Delete product (JWT required)

- **Categories:** `/api/categories`
  - `POST /` — Create category (JWT required)
  - `GET /` — List categories (JWT required)
  - `GET /:id` — Get category by ID (JWT required)
  - `PUT /:id` — Update category (JWT required)
  - `DELETE /:id` — Delete category (JWT required)

## File Uploads

Product images are uploaded to the `/uploads` directory and served statically at `/uploads/<filename>`.

## License

MIT

---

**Author:** Md Mehedi Hasan

For questions or support, please open an issue or contact the maintainer.
