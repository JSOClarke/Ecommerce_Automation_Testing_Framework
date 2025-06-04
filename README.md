# 🧪 Personal Automation Framework

Welcome to my personal testing project! This repo demonstrates how I apply software testing best practices using an example eCommerce website.

## 🔍 Purpose

I'm using this repo to test a demo bookstore/eCommerce site using a modern test stack:

- ✅ **Manual testing techniques** based on real-world QA workflows
- 🤖 **Playwright for automated UI testing**
- 🧪 **API testing** (GET, POST, error handling, etc.)
- 🐳 **Docker-based environment setup**
- 📋 **Test planning**, edge case design, and issue reporting practices

---

## 🧰 Technologies used

| Area               | Stack                     |
|--------------------|---------------------------|
| Frontend testing   | Playwright + TypeScript   |
| Backend/API testing| REST calls via Playwright |
| Environment        | Docker + PHP + Laravel    |
| Project management | Manual planning + TODOs   |

---

## 🔧 Running the tests

```bash
# Start the environment
docker-compose up

# Run tests
npx playwright test
