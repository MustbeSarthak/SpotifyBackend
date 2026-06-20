# Spotify Backend

A Spotify-inspired backend application built with Node.js, Express, and MongoDB. This project was created to gain hands-on experience with backend development concepts such as authentication, authorization, file uploads, database design, and REST API development.

## Features

### Authentication & Authorization

* User Registration
* User Login
* JWT-based Authentication
* Cookie-based Token Storage
* Password Hashing using bcrypt
* Role-Based Authorization (User / Artist)

### Music Management

* Upload Songs
* Store Music Files using ImageKit
* Artist-specific Music Uploads
* Fetch Uploaded Songs

### Album Management

* Create Albums
* Associate Songs with Albums
* Fetch Albums
* Search Albums

### Search Functionality

* Search Users
* Search Songs
* Search Albums
* Case-insensitive Search using MongoDB Regex

### Security

* Protected Routes
* JWT Verification Middleware
* Password Encryption
* Sensitive Field Exclusion from Responses

## Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JSON Web Token (JWT)
* bcrypt

### File Storage

* ImageKit

### Middleware & Utilities

* Multer
* Cookie Parser
* dotenv

## Project Structure

```text
src/
├── controller/
├── middlewares/
├── model/
├── routes/
├── services/
└── app.js
```

## API Modules

* Authentication APIs
* User APIs
* Music APIs
* Album APIs
* Search APIs

## Learning Objectives

This project was built to strengthen understanding of:

* REST API Development
* Authentication & Authorization
* Database Relationships
* File Upload Handling
* Backend Architecture
* MongoDB Querying
* Express Middleware
* Git & GitHub Workflow

## Project Status

Core backend functionality has been implemented, including authentication, role-based authorization, music uploads, album management, and search features.

Future enhancements may include playlists, favorites, recommendations, and streaming-related functionality.


