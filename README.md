# ITechAcademyV2
Migration of my Symfony/Twig/Doctrine project
to a React + Express + Prisma + PostgreSQL stack.

## Stack
- Frontend: React + Vite + TypeScript, react-router, axios
- Backend: Node 22, Express 5 (REST API), zod validation
- Auth: JWT access token, bcryptjs
- Database: PostgreSQL 15, Prisma 5.22.0 (versioned migrations)

## Features
- [x] Register / login with JWT
- [x] Course catalog 
- [x] Enroll in a course / my courses
- [ ] Not included: [admin CRUD, Refresh token]

## Getting started
Prerequisites: Node 22, PostgreSQL 15, prisma(v5.22.0).

1. Create the database and user 
2. Backend: copy .env.example to .env, then
   [npm install, npx prisma migrate dev, npx prisma db seed, npm run dev]
3. Frontend: [npm install, npm run dev]
## paths
http://localhost:5173/register 
http://localhost:5173/login
and others navigate using navbar

## Project structure
backend/
├── prisma/
│   ├── schema.prisma          # data model (User, Trainer, Course, Enrollment)
│   ├── migrations/            # versioned SQL migrations
│   └── seed.ts                # sample data (students, trainers, courses)
├── src/
│   ├── config/
│   │   └── auth.config.ts     # JWT secrets and expiry, read from .env
│   ├── controllers/           # request handlers: parse input, call Prisma, send response
│   │   ├── auth.controller.ts      #   register
│   │   ├── login.controller.ts     #   login
        └── course.controller.ts    # gestion course
│   ├── lib/
│   │   ├── prisma.ts          # single shared PrismaClient instance
|   |   └── jwt.ts             # Centralizing token creation
│   ├── middleware/            # Express middleware (JWT authentication)
        └── auth.middleware.ts # verify the jwtoken sent by the frontend
│   ├── routes/
│   │   └── auth.routes.ts     # /api/auth/* routes
|   |   └── course.routes.ts   # /api/courses/* routes
│   ├── schemas/               # zod validation schemas (register, login)
│   ├── types/                 # TypeScript declarations ( req.user on Express Request)
│   └── server.ts              # app setup: middleware, routes, listen
├── .env.example               # required environment variables (fake values)
├── package.json
└── tsconfig.json

### Frontend structure


frontend/
├── src/
│   ├── component/               # reusable UI pieces
│   │   ├── layout.tsx           #   page shell shared by all routes (navbar + content)
│   │   ├── navbar.tsx           #   navigation, shows the user or login/register links
│   │   └── protectedRoute.tsx   #   redirects to /login when no user is logged in
│   ├── context/
│   │   └── AuthContext.tsx      # global auth state: user, login(), logout()
│   ├── lib/
│   │   └── api.ts               # axios instance, adds the JWT to every request
│   ├── pages/                   # one component per route
│   │   ├── Home.tsx             #   test page
│   │   ├── courses.tsx          #   course catalog
│   │   ├── CourseShow.tsx       #   single course detail + enroll
│   │   ├── myCourses.tsx        #   courses the user is enrolled in
│   │   ├── LoginPage.tsx        #   login form
│   │   └── Register.tsx         #   registration form
│   ├── App.tsx                  # route definitions
│   ├── App.css
│   ├── index.css
│   └── main.tsx                 # entry point, mounts <AuthProvider> and <App>
├── vite.config.ts               # dev server + /api proxy to the backend
└── package.json
```








## Coming from Symfony
| Symfony | This project |
|---|---|
|statefull |stateless|
| Entities + Doctrine | schema.prisma + Prisma Client |
| make:migration / migrate | prisma migrate dev |
| Fixtures | prisma/seed.ts |
| Security / firewall | JWT + requireAuth middleware |
| Form + Validator | zod schemas |
| Twig templates | React components |

