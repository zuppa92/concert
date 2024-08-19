# Concert Explorer App

The Concert Explorer App is a web application designed to provide users with a seamless experience for discovering detailed artist information. By integrating both the last.fm and Spotify APIs, users can explore artist profiles, view artist details, and manage their own profiles through secure registration and login functionalities. The app also allows users to like and follow their favorite artists.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [File Structure](#file-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Registration and Authentication:**
  - Secure sign-up and login functionalities to protect user data.
  - Profile management allowing users to update personal information.

- **Artist Information and Interaction:**
  - Access comprehensive artist profiles, including biographies, discographies, and images.
  - View the top 5 tracks and top 5 albums of your favorite artists.
  - Ability to like and follow artist pages for a personalized user experience.

## Installation

### Prerequisites

- Node.js
- npm (Node Package Manager)
- PostgreSQL

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/concert-explorer-app.git
    cd concert-explorer-app/backend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `backend` directory and configure your environment variables:
    ```plaintext
    DATABASE_URL=postgres://user:password@localhost:5432/concert_explorer
    JWT_SECRET=your_jwt_secret
    LASTFM_API_KEY=your_lastfm_api_key
    SPOTIFY_CLIENT_ID=your_spotify_client_id
    SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
    ```

4. Run the database migrations and seed the database:
    ```bash
    psql -d concert_explorer -f concert-schema.sql
    psql -d concert_explorer -f concert-seed.sql
    ```

5. Start the backend server:
    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the `frontend` directory:
    ```bash
    cd ../frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `frontend` directory and configure your environment variables:
    ```plaintext
    REACT_APP_BASE_URL=http://localhost:3001
    ```

4. Start the frontend development server:
    ```bash
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Register for an account or log in if you already have one.
3. Search for your favorite artists using the search bar.
4. View detailed artist profiles, including top tracks, top albums, and more.
5. Like and follow your favorite artists to keep track of their updates.

## API Integration

### Last.fm API

The Last.fm API is used to fetch detailed artist information, including biographies, top tracks, and top albums.

### Setlistfm API

The Setlistfm API is used to fetch historical concert information and ability to search by location, venue, and tour.

### Spotify API

The Spotify API is used to retrieve artist images, album covers, and additional artist-related media.

## File Structure

concert-explorer-app/
│
├── backend/
│   ├── controllers/
│   │   ├── artistController.js
│   │   ├── authController.js
│   │   ├── userController.js
│   ├── helpers/
│   │   ├── lastfmApi.js
│   │   ├── spotifyApi.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── user.js
│   ├── routes/
│   │   ├── artists.js
│   │   ├── auth.js
│   │   └── users.js
│   ├── schemas/
│   │   ├── userAuth.json
│   │   ├── userNew.json
│   │   ├── userRegister.json
│   │   └── userUpdate.json
│   ├── test/
│   ├── .env
│   ├── app.js
│   ├── config.js
│   ├── db.js
│   ├── server.js
│   └── webpack.config.js
│
└── frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Artists/
│   │   │   └── ArtistList.js
│   │   ├── Auth/
│   │   │   ├── LoginForm.js
│   │   │   ├── Logout.js
│   │   │   └── SignupForm.js
│   │   ├── NavBar.js
│   │   └── SearchForm.js
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   │   ├── Artists.js
│   │   ├── Home.js
│   │   └── Profile.js
│   ├── services/
│   │   ├── api.js


## Technologies Used

- **Frontend:** React, Redux
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)
- **APIs:** Last.fm API, Spotify API
- **Build Tools:** Webpack, Babel

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

