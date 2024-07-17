# AADL3 Registration App

AADL3 is an cross-platform application designed to automate the registration process for the AADL3 website. The app continuously monitors the registration page and retries the request until successful, notifying the user with a sound upon successful registration.

![](front.png)
## Features

- Automates form submission to AADL3 registration page.
- Retries requests upon timeout or failure.
- Notifies user with a sound upon successful registration.

## Download

See the [release](./releases) page to download windows installer or linux AppImage


## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later recommended)
- [Yarn](https://yarnpkg.com/) (v1.x or later)

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/aadl3.git
cd aadl3
```

2. Install the dependencies
```bash

yarn install
```

## Usage

### Development

To start the application in development mode:

```bash
yarn start
```

### Build

To build the application for production:

```bash
yarn build
```


## Configuration

Ensure you have the following files in the project root:

- `main.js`
- `index.html`
- `notification.wav`
- `aadl3.js`
- `package.json`

## Project Structure

```

aadl3/
    ├── main.js
    ├── index.html
    ├── notification.wav
    ├── aadl3.js
    ├── package.json
    └── README.md

```

## Scripts

- `yarn start`: Starts the Electron application.
- `yarn build`: Builds the Electron application using `electron-builder`.

## Dependencies

- [play-sound](https://www.npmjs.com/package/play-sound) - A simple library to play sounds.

## Dev Dependencies

- [electron](https://www.electronjs.org/) - Build cross-platform desktop apps with JavaScript, HTML, and CSS.
- [electron-builder](https://www.electron.build/) - A complete solution to package and build a ready-for-distribution Electron app.


