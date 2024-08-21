# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Ethereum React.js DApp

This is a decentralized application (DApp) built with React.js that interacts with the Ethereum blockchain using `ethers.js`. The project is hosted on Netlify, and it connects to the Ethereum network using a private key.

## Project Overview

- **Hosted URL**: [Live Demo](https://stupendous-centaur-b90375.netlify.app/)
- **Technology Stack**:
  - React.js
  - ethers.js
  - Netlify (for deployment)
  - Ethereum network

## Features

- Interacts with the Ethereum network to send transactions.
- Utilizes a Web3Provider from `ethers.js` to manage user accounts and sign transactions.
- Simple UI to input recipient address and amount for sending ETH.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/YourUsername/your-repo-name.git
    cd your-repo-name
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up your environment variables:

    Create a `.env` file in the root of your project and add your private key.

    ```bash
    VITE_APP_PRIVATE_KEY=your-private-key
    ```

4. Run the development server:

    ```bash
    npm run dev
    ```

## Usage

1. Open your browser and navigate to the local development server (usually `http://localhost:3000`).

2. Use the provided form to input the recipient's Ethereum address and the amount of ETH you want to send.

3. The app will interact with the Ethereum network, and you'll receive a transaction hash once the transaction is initiated.

## Deployment

This project is hosted on Netlify. You can access the live demo [here](https://stupendous-centaur-b90375.netlify.app/).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
