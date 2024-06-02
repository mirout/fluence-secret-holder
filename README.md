# Secret Holder

This is a secret holder for Fluence Network. It is a simple application that allows you to store and retrieve secrets. It is built using the Fluence.

## Usage

### Prerequisites

First of all, you need to install [Fluence](https://github.com/fluencelabs/cli) and [Node.js](https://nodejs.org/en/).

Then, you need to install the dependencies:

```bash
cd src/client
npm install
```

### Running

If you want to use on the local network, you need to start the local network:

```bash
fluence local start
```

Then, you need to deploy the service:

```bash
fluence deal deploy --priv-key "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80" 
```

There are three prepared services:
- `integrationTestDeployment` - the services for integration tests
- `secretHolderDeployment` - the service this holder and user service
- `alchemyRpcDeployment` - the example service that uses the Alchemy RPC

If after the deployment you get an aqua error, you need to go to the `.fluence/services.aqua` and remove duplicate data from the file. After that, you need to regenerate the service:

```bash
fluence aqua
```

Then, you can start the client:

```bash
cd src/client
npm run start
```

### Usage

You can use the client library or a simple CLI to interact with the service.

But firstly after the deployment, you need to initialize the service you can do it with CLI:

```bash
npm run start -- initialize-service --dealId 0xCe85503De9399D4dECa3c0b2bb3e9e7CFCBf9C6B
```


#### Client

The client is a set of functions that allow you to interact with the service. You can find the client in the `src/client` folder.

#### CLI

The CLI is a simple command-line interface that allows you to interact with the service. You can find the CLI in the `src/cli` folder.

For example, you can store a secret:

```bash
npm run start -- secret save --dealId 0xCe85503De9399D4dECa3c0b2bb3e9e7CFCBf9C6B 
```
