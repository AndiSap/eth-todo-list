# To-do based on smart contracts

To-do list - to-do list which is based on a Ethereum smart contract

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Developed and tested on:
 * node v8.6.0
 * truffle v5.0.2
 * solidity v0.5.0
 * ganache v2.0.1

Install Node on MAC:
```
brew install node@8
brew link node@8
```

Install Truffle on MAC:
```
npm install truffle -g
```

Install Ganache on MAC:
```
https://www.trufflesuite.com/ganache
```

Install solidity compiler on MAC:
```
npm install -g solc
```

### Installing

Download repository with

```
git clone https://github.com/AndiSap/eth-todo-list.git
```

And then install dependencies with

```
npm install
```

## Deploying and running the election

1) Start Ganache in quick start mode 

2) Deploy a copy of the smart contract to the running blockchain VM:
```
truffle migrate
```

3) Start the election web service with
```
npm run dev
```

## Running tests

Run unit tests with

```
truffle test
```

## Built With

* [Node.js](https://nodejs.org) - The framework used
* [Ganache](https://www.trufflesuite.com/ganache) - Blockchain virtual machine
* [Truffle Suite](https://www.trufflesuite.com) - Development and testing environment for smart contracts
* [Solidity](https://solidity.readthedocs.io/en/v0.5.0/) - Programming language for developing smart contracts


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details