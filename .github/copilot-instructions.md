# Copilot Instructions for ACTComMóvil React Native Project

## Project Overview
- This is an Expo-based React Native app using TypeScript and [expo-router](https://docs.expo.dev/router/introduction/) for file-based routing.
- The main app code lives in the `app/` directory. Each file in `app/` represents a route or screen.
- Shared logic/components are in `components/`, hooks in `hooks/`, and constants (e.g., colors) in `constants/`.
- Assets (images, fonts) are in `assets/`.

## Architecture & Patterns
- **Routing:** Uses `expo-router` for navigation. Route files in `app/` are auto-registered.
- **Theming:** Color schemes for light/dark mode are defined in `constants/Colors.ts`.
- **TypeScript:** Strict mode is enabled. Path alias `@/*` maps to project root.
- **Linting:** Uses Expo's ESLint config (`eslint.config.js`). Lint with `npm run lint`.
- **Splash/Icon:** App icons and splash screens are configured in `app.json` and stored in `assets/images/`.

## Developer Workflow
- **Install dependencies:** `npm install`
- **Start development server:** `npm start` or `npx expo start`
- **Platform-specific launch:**
  - Android: `npm run android`
  - iOS: `npm run ios`
  - Web: `npm run web`
- **Reset project:** `npm run reset-project` (moves starter code to `app-example/` and creates a blank `app/`)
- **Lint:** `npm run lint`

## Conventions & Tips
- **File-based routing:** Place new screens in `app/` to auto-register routes.
- **Component organization:** Reusable UI in `components/`, hooks in `hooks/`, constants in `constants/`.
- **Assets:** Reference images/fonts from `assets/` using relative paths.
- **TypeScript paths:** Use `@/` for imports from project root (see `tsconfig.json`).
- **Code actions on save:** VSCode is configured to auto-fix, organize imports, and sort members on save (`.vscode/settings.json`).

## External Dependencies
- Major libraries: `expo`, `react-native`, `expo-router`, `@react-navigation/*`, `expo-*` modules.
- See `package.json` for full list and versions.

## Example Patterns
- **Color usage:**
  ```ts
  import { Colors } from '@/constants/Colors';
  // Use Colors.light.text or Colors.dark.background
  ```
- **Route creation:**
  - Add `app/Profile.tsx` to create `/Profile` route.
- **Asset usage:**
  ```js
  <Image source={require('@/assets/images/icon.png')} />
  ```

## References
- [Expo Docs](https://docs.expo.dev/)
- [Expo Router Docs](https://expo.github.io/router/docs)

---
_If any conventions or workflows are unclear, please ask for clarification or provide feedback to improve these instructions._
