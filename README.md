# Over Network FE quest - Auth part 1

This is the starter template for Overmind's *Over Network Auth part 1* quest. The original *Over Network* quest can be view [here](https://overmind.xyz/quests/over-network). 

# Table of Contents
- [Over Network FE quest - Auth part 1](#over-network-fe-quest---auth-part-1)
- [Table of Contents](#table-of-contents)
- [Tech Stack](#tech-stack)
  - [React and Next.js](#react-and-nextjs)
- [Developer Cheat Sheet](#developer-cheat-sheet)
  - [Provided types](#provided-types)
    - [User](#user)
  - [Provided API](#provided-api)
    - [storeUser](#storeuser)
    - [dropUser](#dropuser)
    - [createProfile](#createprofile)
    - [login](#login)
    - [logout](#logout)
- [Completing the Quest](#completing-the-quest)
  - [Deploying the app locally](#deploying-the-app-locally)
  - [Completing the quest](#completing-the-quest-1)

# Tech Stack
- [Yarn](https://yarnpkg.com/) package manager
- [React](https://react.dev/) library for building user interfaces
- [Next.js](https://nextjs.org/) framework for React
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) for UI components using Radix UI and Tailwind CSS

## React and Next.js
This app is built using React and Next.js. React is a JavaScript library for building user interfaces. Next.js is a React framework that provides a number of features including server-side rendering, file-based routing, and automatic code splitting.

# Developer Cheat Sheet

## Provided types

### User
This type is used to represent a user. In this quest, the important attributes are `username`, `name`, and `privateKey`.

```typescript
export type User = {
  username: string; // the user's username
  name: string; // the user's name
  imgSrc?: string;
  followers: number;
  following: number;
  privateKey: string; // the user's private key belonging to their on-chain account. Use to execute transactions on the Over Network system
};
```

## Provided API

### storeUser
This function is used to store the user's information in the browser's local storage. It takes in a User object and stores it in the app's local storage [`./app/storage/auth.json`](./app/storage/auth.json). 
Only the user's username, name, and private key are stored in this quest.

This function can be found in [`./app/lib/storage.ts`](./app/lib/storage.ts).

### dropUser
This function is used to drop the user's information from the apps's local storage. It takes in a User object and removes the user's information from the app's local storage [`./app/storage/auth.json`](./app/storage/auth.json).

This function can be found in [`./app/lib/storage.ts`](./app/lib/storage.ts).

### createProfile
This function is used to create a profile for the user on the blockchain. It takes in a user object and creates a profile for the user on the blockchain. This blockchain account is used to store the user's profile data and execute transactions on the Over Network system.

This function can be found in [`./app/lib/contract.ts`](./app/lib/contract.ts).

### login
This function is used to log the user in. It takes in a user object and stores the user's information in the browser's cookie storage which will trigger a re-render of the app.

This function can be found in [`./app/lib/actions.ts`](./app/lib/actions.ts).

### logout 
This function is used to log the user out. It clears the user's information from the browser's cookie storage which will trigger a re-render of the app.

This function can be found in [`./app/lib/actions.ts`](./app/lib/actions.ts).

# Completing the Quest
## Deploying the app locally
  1. Navigate to [`./app/`](./app/). This is the app's root directory. All commands in the following steps should be run from this directory.
  2. Run `yarn install` to install dependencies
  3. Run `yarn dev` to start the development server
  4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result

## Completing the quest
  1. Read through the [Developer Cheat Sheet](#developer-cheat-sheet) above to understand the app and the supporting dependencies. Look back to that section for reference as you complete the quest.
  2. Deploy and open the app locally as described [above](#deploying-the-app-locally). 
  3. Complete the quests by following the TODO comments in the following files (recommended order): 
       - [`app/app/layout.tsx`](./app/app/layout.tsx)
       - [`app/app/loginWindow.tsx`](./app/app/loginWindow.tsx)
