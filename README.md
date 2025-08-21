# Animal Guessing App

**Animal Guessing App** is a mobile application developed in **React Native**.  
The app provides information about different animals and includes an interactive game where users must guess the animal from a **partial image**.  

> ⚠️ **Important Note:** This repository contains **only the frontend** (React Native).  
> The backend (.NET API) is **not included** for security reasons. Features like login, animal database access **will not work** without a properly configured backend.

---

## Features

- **Animal database:** Detailed information about various species (requires backend).  
- **Guessing game:** Identify the animal from a partial image.  
- **Login system:** User registration and authentication (requires backend).  
- **Game modes and hints:** Different difficulty levels and optional hints.  
- **User-friendly interface:** Intuitive design suitable for all ages.  
- **Cross-platform compatibility:** Works on both iOS and Android via React Native.

---

## Dependencies

### Frontend (React Native / Expo)
- `react` / `react-native` – Core libraries for building the app.
- `expo` – Expo framework for development and building.
- `expo-router` – Handles navigation and routing.
- `@react-navigation/*` – Navigation libraries (drawer, bottom-tabs, elements).
- `axios` – HTTP client to communicate with backend (configure your own backend).  
- `react-hook-form` – Form handling.
- `@expo/vector-icons` – Icons library.

### Dev Dependencies
- `typescript`, `@babel/core`, `@types/react`, `eslint`, `eslint-config-expo`  

---

## Scripts

- `npm start` → `expo start` (launch app in Expo)
- `npm run android` → Run on Android emulator/device
- `npm run ios` → Run on iOS simulator/device
- `npm run web` → Run app in web browser
- `npm run lint` → Run ESLint checks
- `npm run reset-project` → Custom script to reset project (`./scripts/reset-project.js`)

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/LuisPerezRodriguez/Animal-Guessing-App.git
cd Animal-Guessing-App
