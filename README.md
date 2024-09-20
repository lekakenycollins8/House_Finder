# House_Finder
# House Finder

House Finder is a comprehensive platform designed to help users find their dream homes. It offers a range of features for both home seekers and landlords, including search listings, contact landlords, and manage listings.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Search Listings**: Find houses based on your preferences. Use filters to narrow down your search and find the perfect home that meets your needs.
- **Contact Landlords**: Get in touch with landlords directly. Our messaging system ensures secure and efficient communication between you and the property owners.
- **Manage Listings**: Landlords can manage their house listings easily. Update property details, availability, and pricing with our user-friendly interface.

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/lekakenycollins8/House_Finder.git
    cd House_Finder
    ```

2. Install server dependencies:

    ```sh
    npm install
    ```

3. Install frontend dependencies:

    ```sh
    cd frontend/housefinder
    npm install
    ```

## Usage

1. Start the server:

    ```sh
    npm start
    ```

2. Start the frontend:

    ```sh
    cd frontend/housefinder
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000`.

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
REACT_APP_API_URL=http://localhost:5000/

# Folder Structure
House_Finder/
├── config/
│   ├── db.js
│   ├── uploads.js
├── frontend/
│   ├── housefinder/
│   │   ├── public/
│   │   │   ├── images/
│   │   │   ├── index.html
│   │   ├── src/
│   │   │   ├── actions/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── reducers/
│   │   │   ├── App.css
│   │   │   ├── App.js
│   │   │   ├── index.css
│   │   │   ├── index.js
│   │   ├── .env
│   │   ├── .gitignore
│   │   ├── package.json
│   │   ├── postcss.config.js
│   │   ├── tailwind.config.js
│   │   ├── README.md
├── google-auth/
│   ├── auth.js
│   ├── passport.js
├── middleware/
│   ├── check-auth.js
├── models/
│   ├── House.js
│   ├── Message.js
│   ├── User.js
├── routes/
│   ├── house.js
│   ├── message.js
│   ├── role.js
├── uploads/
├── .env
├── .gitignore
├── package.json
├── README.md
├── server.js

Sure! Here is a Markdown README for your project:

```md
# House Finder

House Finder is a comprehensive platform designed to help users find their dream homes. It offers a range of features for both home seekers and landlords, including search listings, contact landlords, and manage listings.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Search Listings**: Find houses based on your preferences. Use filters to narrow down your search and find the perfect home that meets your needs.
- **Contact Landlords**: Get in touch with landlords directly. Our messaging system ensures secure and efficient communication between you and the property owners.
- **Manage Listings**: Landlords can manage their house listings easily. Update property details, availability, and pricing with our user-friendly interface.

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/lekakenycollins8/House_Finder.git
    cd House_Finder
    ```

2. Install server dependencies:

    ```sh
    npm install
    ```

3. Install frontend dependencies:

    ```sh
    cd frontend/housefinder
    npm install
    ```

## Usage

1. Start the server:

    ```sh
    npm start
    ```

2. Start the frontend:

    ```sh
    cd frontend/housefinder
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000`.

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
REACT_APP_API_URL=http://localhost:5000/
```

## Folder Structure

```
House_Finder/
├── config/
│   ├── db.js
│   ├── uploads.js
├── frontend/
│   ├── housefinder/
│   │   ├── public/
│   │   │   ├── images/
│   │   │   ├── index.html
│   │   ├── src/
│   │   │   ├── actions/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── reducers/
│   │   │   ├── App.css
│   │   │   ├── App.js
│   │   │   ├── index.css
│   │   │   ├── index.js
│   │   ├── .env
│   │   ├── .gitignore
│   │   ├── package.json
│   │   ├── postcss.config.js
│   │   ├── tailwind.config.js
│   │   ├── README.md
├── google-auth/
│   ├── auth.js
│   ├── passport.js
├── middleware/
│   ├── check-auth.js
├── models/
│   ├── House.js
│   ├── Message.js
│   ├── User.js
├── routes/
│   ├── house.js
│   ├── message.js
│   ├── role.js
├── uploads/
├── .env
├── .gitignore
├── package.json
├── README.md
├── server.js
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.