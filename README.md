# Story App

## <a name="introduction"></a> Introduction
Story App adalah platform untuk menulis, mengelola, dan membaca cerita. Aplikasi ini memungkinkan pengguna untuk menambahkan cerita, mengedit informasi, menambahkan chapter, serta melihat detail cerita dengan mudah. Dirancang menggunakan stack MERN (MongoDB, ExpressJS, ReactJS, NodeJS), aplikasi ini memfokuskan pada pengalaman pengguna yang intuitif dan ringan.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Libraries](#libraries)
- [Project Structure](#project-structures)
- [Website URL](#apk-link)

## <a name="features"></a> Features
Berikut fitur utama dalam aplikasi ini:

- Story List — menampilkan daftar cerita yang telah dibuat
- Add Story — membuat cerita baru lengkap dengan cover, kategori, dan keyword
- Story Detail — menampilkan detail cerita dan chapter
- Edit Story — mengedit cerita termasuk informasi dasar, tag, dan cover
- Add Chapter — menambahkan chapter baru ke cerita
- List Chapter — melihat dan mengelola daftar chapter dari setiap cerita

## <a name="libraries"></a> Libraries
Berikut library/framework yang digunakan dalam project:

### Backend
- ExpressJS
- MongoDB & Mongoose
- CORS
- dotenv
- body-parser

### Frontend
- ReactJS
- React Router DOM
- TailwindCSS
- React Icons

## <a name="project-structures"></a> Project Structure
``
📁 client/
│ ├── assets/ # File statis seperti gambar
│ ├── components/ # Reusable UI components
│ ├── pages/ # Halaman seperti AddStory, EditStory, Detail
│ ├── services/ # File untuk handle API requests
│ ├── utils/ # Fungsi bantu (optional)
│ └── main.jsx # Entry point React
📁 server/
│ ├── routes/ # API route handler (storyRoutes.js, etc)
│ ├── models/ # Mongoose schemas
│ ├── controllers/ # Logic pemrosesan data
│ └── index.js # Entry point backend
``

## <a name="apk-link"></a> Website URL
Project ini dideploy secara online, bisa diakses melalui URL berikut:

[https://your-vercel-url.vercel.app](https://story-app-psi.vercel.app/)
