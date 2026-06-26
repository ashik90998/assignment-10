SaveBlood - Blood Donation Application

Purpose

SaveBlood is a MERN-stack blood donation platform that connects donors with people in urgent need of blood. The application supports donor registration, blood donation requests, donor search, role-based dashboards, funding via Stripe, and JWT-secured APIs.

Live URL


## ⚠️ Note for Evaluator

**Dear Instructor,**

I apologize for missing around 20 commits. My original GitHub account was suddenly suspended during development, forcing me to move everything to this new repository, which lost my commit history. 

Please consider this technical issue with empathy and evaluate my project based on the final code. 

Thank you for your understanding! 🙏


Client: Add your Vercel/Netlify deployment URL here



Server: Add your Render/Railway deployment URL here

Key Features





User registration & login (default role: donor)



Role-based access: Admin, Donor, Volunteer



Public donation request listing (pending only)



Private donation request details with donate confirmation modal



Donor search by blood group, district & upazila (with PDF export)



Dashboard with sidebar layout (responsive)



Admin: user management, all requests, charts (daily/weekly/monthly)



Volunteer: all requests + total funds overview



Stripe-powered organization funding



JWT authentication for protected routes & APIs



Framer Motion animations throughout



Dark/light theme support

Tech Stack







Layer



Technology





Frontend



Next.js 16, React 19, Tailwind CSS 4, HeroUI, Framer Motion





Backend



Node.js, Express 5, MongoDB





Auth



JSON Web Tokens (JWT)





Payments



Stripe

NPM Packages Used

Client (blood-donation)





next, react, react-dom



@heroui/react, @heroui/styles, @heroui/avatar, @heroui/button, @heroui/dropdown, @heroui/navbar, @heroui/system



framer-motion — page & component animations



next-themes — dark/light mode



@stripe/stripe-js — Stripe payments



recharts — admin dashboard charts



jspdf — PDF download on search page



react-icons, @gravity-ui/icons

Server (donation-server)





express — REST API



mongodb — database driver



jsonwebtoken — JWT auth



bcryptjs — password hashing



cors — cross-origin requests



dotenv — environment variables



stripe — payment processing



nodemon — dev server (dev dependency)

Environment Variables

Client (.env)

NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_IMAGE_UPLOAD_API=your_imgbb_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

Server (.env)

MONGO_DB_URI=your_mongodb_uri
DB_NAME=donate_blood
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
PORT=8000
CLIENT_URL=http://localhost:3000
STRIPE_SECRET_KEY=your_stripe_secret_key

Getting Started

Server

cd donation-server
npm install
cp .env.example .env   # fill in your values
npm run dev

Client

cd blood-donation
npm install
cp .env.example .env   # fill in your values
npm run dev

Make a User Admin

Edit the user document in MongoDB and set role to "admin".

Project Structure

assignment-10/
├── blood-donation/     # Next.js React frontend
└── donation-server/    # Express.js backend API