# Micro Frontends Demo (React + Vite + Module Federation)

This project demonstrates a micro frontend architecture using React, TypeScript, and Vite Module Federation.

It showcases how independently developed frontend applications can be composed together at runtime.

---

## 🚀 Overview

The system consists of:

* **Host (Shell)** — responsible for layout, routing, and orchestration
* **Catalog (Remote)** — product listing domain
* **Cart (Remote)** — shopping cart domain

Each part is built and deployed independently and integrated at runtime via Module Federation.

---

## 🧱 Architecture

* Runtime integration using Module Federation
* Host loads remotes dynamically via `remoteEntry.js`
* Clear separation of concerns between shell and domain applications
* Cross-app communication via host-managed state and explicit contracts

---

## 📦 Project Structure

```
microfrontends-demo/
  apps/
    host/
    catalog/
    cart/
```

---

## 🛠 Tech Stack

* React
* TypeScript
* Vite
* Module Federation (vite-plugin-federation)
* React Router

---

## ⚙️ How It Works

1. The **host** application is the main entry point.
2. When navigating to `/catalog` or `/cart`, the host dynamically loads the corresponding remote.
3. Remotes expose modules via `remoteEntry.js`.
4. The host integrates them at runtime.

---

## 🔄 Communication Pattern

The demo uses **host-mediated communication**:

* `catalog` emits events via props (`onAddToCart`)
* `host` manages shared state (`cartItems`)
* `cart` receives data via props

```
catalog → host → cart
```

This approach keeps micro frontends loosely coupled and easy to evolve.

---

## 🧪 Local Development

Due to limitations of the Vite federation plugin:

* Remotes must be built and served separately

### Start remotes

```
npm run build -w catalog
npm run preview -w catalog

npm run build -w cart
npm run preview -w cart
```

### Start host

```
npm run dev -w host
```

---

## 🌍 Deployment Model

Each application is deployed independently:

* Host → main application (e.g. app.company.com)
* Catalog → remote bundle (e.g. catalog.company.com)
* Cart → remote bundle (e.g. cart.company.com)

The host dynamically loads remotes at runtime via URLs.

---

## ⚠️ Trade-offs

Micro frontends introduce:

* Increased complexity in build and deployment
* Runtime integration challenges
* Dependency version management
* Need for clear contracts between applications

---

## 🎯 Key Takeaways

* Micro frontends are about **team ownership and independent deployment**
* The shell acts as a **composition layer**
* Communication should be **explicit and controlled**
* Tooling and deployment strategy are critical

---

## 📌 Future Improvements

* Runtime remote configuration
* Error boundaries for remote failures
* Shared UI library
* Versioned remote deployments (CDN)
* Observability and logging

---

## 🧠 Author Notes

This project was built as part of senior-level system design preparation, focusing on:

* frontend architecture
* distributed systems thinking
* runtime composition patterns
