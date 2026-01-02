# 🧠 AI Food Co-Pilot

### ENCODE 2026 Hackathon Submission

**Team Name:** Cypher Chasers
**Category:** AI-Native Consumer Health Experience

---

## 📌 Overview

Food labels are written for regulatory compliance, not for human understanding.
Consumers are expected to interpret long ingredient lists, unfamiliar chemical names, and conflicting health guidance at the exact moment they make food decisions.

**AI Food Co-Pilot** reimagines this experience using an **AI-native approach**, where the AI acts as an intelligent co-pilot instead of a lookup tool.

The system explains what actually matters in a product, communicates trade-offs and uncertainty, and reduces cognitive load at decision time.

---

## ❓ Problem Statement

Existing food label and nutrition apps fall short because they:

* Surface raw data instead of insight
* Require high-friction manual input and filters
* Treat AI as an add-on rather than the interface
* Increase cognitive effort when decisions should be easy

As a result, users are left confused at the exact moment they need clarity.

---

## 💡 Our Solution

AI Food Co-Pilot is an **AI-native web experience** that allows users to scan a food label and instantly receive:

* Human-level explanations of ingredients
* Context-aware reasoning instead of raw facts
* Clear communication of uncertainty
* Follow-up answers within the same product context

The AI infers intent through conversation rather than forcing configuration through forms or checkboxes.

---

## ✨ Key Features

* 📷 **Label Scanning via Browser**
  Uses the Web Media API to access the device camera on Android and iOS browsers.

* 🧠 **AI-Native Reasoning**
  The AI explains *why* something matters, not just *what* it is.

* 🔄 **Session-Based Understanding**
  Follow-up questions stay grounded in the same product context.

* 🗣️ **Voice + Text Interaction**
  Users can ask questions naturally after scanning.

* 🎯 **Minimal Cognitive Load**
  No onboarding forms, no filters, no database browsing.

---

## 🚫 What This Project Is Not

* Not a food database browser
* Not a calorie tracker
* Not a recommendation engine
* Not a medical diagnostic tool

The focus is on **experience design and reasoning quality**, not data scale.

---

## 🏗️ System Architecture

```
Frontend (React, Browser)
        ↓
Backend API (Node.js + Express)
        ↓
OpenAI API (LLM)
```

### Frontend

* React (JavaScript)
* Mobile-first web design
* Camera access using `navigator.mediaDevices.getUserMedia`
* Hosted on GitHub Pages

### Backend

* Node.js + Express
* Session-based memory per product scan
* Hosted on Railway

### AI Layer

* OpenAI API
* Reasoning-driven responses
* Explicit uncertainty handling
* Stateless model with backend-managed context

---

## 📂 Project Structure

```
encode-2026-project/
│
├── landing/        # Static landing, about, team pages
├── app/            # React AI application
├── backend/        # Node.js + Express API
└── README.md
```

---

## 🚀 Deployment

* **Frontend (Landing + App):** GitHub Pages
* **Backend API:** Railway
* **Camera Access:** Browser Web Media API (HTTPS required)

---

## 🧪 How to Run Locally

### Frontend

```bash
cd app
npm install
npm run build
```

### Backend

```bash
cd backend
npm install
node src/server.js
```

---

## 👥 Team Cypher Chasers

* **Member 1:** *(Add Name)* – Role
* **Member 2:** *(Add Name)* – Role
* **Member 3:** *(Add Name)* – Role
* **Member 4:** *(Add Name)* – Role

---

## 🏆 Hackathon Alignment

This project directly aligns with the ENCODE 2026 challenge by:

* Designing an **AI-native experience**
* Prioritizing reasoning and explainability
* Reducing cognitive effort at decision time
* Treating AI as the interface, not a feature

---

## 📄 License

This project is built as a hackathon prototype for educational and demonstration purposes.

---
