# Voting Dapp
https://voting-decentralized-nsxy.vercel.app/

Hey! Welcome to the Voting Dapp project. This is a decentralized voting application built on the Solana blockchain. Ideally, you can create polls, let people vote, and see it all happen on-chain.

## What's Inside?

It's a full-stack dApp:
- **Smart Contract**: Written in Rust using the Anchor framework.
- **Frontend**: A Next.js app to interact with the contract.

## Quick Start

If you want to run this locally, here is what you need to do:

1.  **Install Dependencies**
    Just run the standard install command:
    ```bash
    npm install
    ```

2.  **Build Everything**
    You need to build both the web app and the Solana program:
    ```bash
    npm run build
    npm run anchor-build
    ```

3.  **Run Tests**
    Make sure everything is working correctly:
    ```bash
    npm run anchor-test
    ```

4.  **Start the App**
    Launch the frontend:
    ```bash
    npm run dev
    ```

## Functionality

Here is a quick look at what the app does (or will do once fully polished!):

### Creating a Poll
You can initialize a new poll with a description and timeframe.

![Create Poll Screenshot](/screenshots/create-poll.png)
*(Screenshot coming soon)*

### Voting
Users can select a candidate and cast their vote directly on the blockchain.

![Voting Screenshot](/screenshots/voting.png)
*(Screenshot coming soon)*

## Tech Stack

- **Solana** & **Anchor** for the blockchain magic.
- **Next.js** & **Tailwind CSS** for the UI.
- **TypeScript** for type safety.

---
*Note: The frontend is currently under active development. Some UI components might be placeholders.*
