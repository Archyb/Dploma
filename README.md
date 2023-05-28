# DPLOMA: smart contract validation for certification

## Introduction

This open-source project aims to create a blockchain-based certification validation system for diplomas. By leveraging the power of the Ethereum network and the solidity programming language, this project provides a secure and transparent way to verify and validate educational certifications.

The system involves two main actors: the Certifier and the Certifying authority. The Certifying authority is responsible for issuing and managing certifications, while the Certifier is authorized to modify or delete certifications. Additionally, the Certifier has the ability to control the visibility of their personal information.

To ensure ease of access and readability, the project incorporates a QR code system during the registration process. This allows for convenient scanning and interpretation of certification details.

## Features

- Creation and management of educational certifications on the blockchain.
- Validation of certifications using the Ethereum network and smart contracts.
- QR code integration for easy scanning and access to certification information.
- Role-based access control: Certifier can modify or delete certifications, Certifying authority manages certification issuance.
- Privacy control: Certifier can alter the visibility of their personal information.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- Solidity: A smart contract programming language for Ethereum.
- Ethereum: A decentralized, blockchain-based platform.
- Hardhat: A development environment for compiling, deploying, and testing smart contracts.
- QR Code Library: A library for generating and scanning QR codes. https://www.npmjs.com/package/qrcode.react

## Getting Started

## Prerequisites

Before running this project, make sure you have the following:

1. Metamask Wallet: Install the Metamask extension in your browser and create an Ethereum wallet. This will be used to interact with the blockchain and deploy the smart contract.

2. Alchemy Account: Sign up for an account on Alchemy (https://alchemy.com/) and create a new application. This will provide you with an Alchemy API URL and a private key.


### 1. Général
To get started with this project, follow the steps below:

1. Clone the repository: `git clone [repository-url]`
2. Install the required dependencies: `npm install`
3. Set up the environment variables by creating a `.env` file in the project root directory and filling it with the following variables:

```
REACT_APP_CONTRACT_ADDRESS=smartcontract adress provided by hardhat logs once the smart contract is deployed
REACT_APP_DOMAIN=the domain to access the online website in order to use the QRCode
REACT_APP_ALCHEMY_URL=URL provided by your Alchemy application
PRIVATE_KEY="your Metamask private key"
API_URL="URL provided by your Alchemy application"
METAMASK_ACCOUNT="your Metamask public key used for the test"

```

### 2. Smart contract

#### Hardhat configuation

- Access the configuration file : 
Open a terminal from the project root and enter the following command

```
cd smartContract

```

- Modify the hardhat.config.ts to define on wich Ethereum networks you want to deploy your smart contract 
Learn more about the configuration here : https://hardhat.org/hardhat-runner/docs/config

### Smart contract


- Install all depenencies:
 
 ````
 npm i
 
 ````

- Compile the smart contract: 

````
npx hardhat compile

````

- Deploy the smart contract

````
npx hardhat run --network <your-network> scripts/deploy.js

````

Once deployement is finished please copy/paste the smartcontract adress provided in the log to .env file 

Please notice that if any changes have been made to the original smart contract, you will have copy/past the content "artifacts/contracts/Dploma.sol/Dploma.json to ../src/ABI/ABI.json

### Front end
##### - localhost

```
npm start

```

##### - Build and export the project


```
npm run build

```

To export the user interface on a server please copy/paste build folder content on your server

## Project Achitecture

````
.env
.gitignore
.idea
   |-- .gitignore
   |-- dbnavigator.xml
   |-- dploma_ts.iml
   |-- inspectionProfiles
   |   |-- Project_Default.xml
   |-- modules.xml
   |-- vcs.xml
README.md
package-lock.json
package.json
public
   |-- favicon.ico
   |-- index.html
   |-- logo192.png
   |-- logo512.png
   |-- manifest.json
   |-- robots.txt
sequence.md
smartContract
   |-- .gitignore
   |-- .idea
   |   |-- .gitignore
   |   |-- dbnavigator.xml
   |   |-- modules.xml
   |   |-- script_deploy.iml
   |   |-- vcs.xml
   |-- README.md
   |-- contracts
   |   |-- Dploma.sol
   |-- hardhat.config.ts
   |-- package-lock.json
   |-- package.json
   |-- scripts
   |   |-- deploy.ts
   |-- test
   |   |-- Dploma.ts
   |-- tsconfig.json
src
   |-- ABI
   |   |-- ABI.json
   |-- App.css
   |-- App.test.tsx
   |-- App.tsx                                          -> Modify the theming here in the material ui configuration
   |-- Components
   |   |-- ButtonModal.tsx
   |   |-- DisplayDiploma.tsx
   |   |-- Footer.tsx
   |   |-- Form
   |   |   |-- FormInsertWithTemplate.tsx
   |   |   |-- FormInsertWithoutTemplate.tsx
   |   |   |-- FormLayout.tsx
   |   |   |-- FormTemplate.tsx
   |   |   |-- FormVisbility.tsx
   |   |   |-- FromModalInsertWithTemplate.tsx
   |   |-- LinearBuffer.tsx
   |   |-- Modal
   |   |   |-- FormModalDelete.tsx
   |   |   |-- FormModalInsertWithouTemplate.tsx
   |   |   |-- FormModalModification.tsx
   |   |   |-- FormModalTemplate.tsx
   |   |-- QRcode.tsx
   |   |-- Tablink.tsx
   |-- Layout
   |   |-- Layout.tsx                                 -> define the routing to direct access specifique Tab of the app: end point: yourDomainName/?id=hashCertification
   |   |-- TabsLayout.tsx
   |-- Pages
   |   |-- AuthentifiedModification.tsx
   |   |-- FindAndExplore.tsx
   |   |-- InstallMetamask.tsx
   |   |-- Modification.tsx
   |   |-- Register.tsx
   |-- Services
   |   |-- SecurityHelper.ts                          -> check USER right and Key
   |   |-- Web3APi.ts                                 -> Define all methods to interact with the smart contract
   |-- Type
   |   |-- type.ts
   |-- hooks
   |   |-- Hooks.ts                                  ->define accounts specs and connexion status for metamask
   |   |-- useSmc.ts                                 -> facilitate the reading of the certification
   |-- index.css
   |-- index.tsx
   |-- logo.svg
   |-- react-app-env.d.ts
   |-- reportWebVitals.ts
   |-- setupTests.ts
tsconfig.json

````

## Test

In order to test the smart contract please make the following step:

- ``` cd smartcContract ```
- ``` npx hardhat test ```

