# DoneToday

A full-stack application for tracking daily accomplishments.

## Project Structure

```
DoneToday/
├── frontend/          # Next.js frontend with Tailwind CSS
├── backend/           # Node.js/Express backend
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## Frontend (Next.js + Tailwind CSS)

### Features
- Next.js 16 with App Router
- Tailwind CSS for styling
- TypeScript support
- ESLint configuration
- Responsive design

### Getting Started
```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Backend (Node.js + Express)

### Features
- Express.js server
- CORS enabled
- Environment variables support
- API routes structure
- Development with nodemon

### Getting Started
```bash
cd backend
npm run dev
```

The backend will be available at `http://localhost:5000`

### Available Scripts
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### API Endpoints
- `GET /` - Server status
- `GET /health` - Health check
- `GET /api/test` - Test API endpoint

## Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
```

## Development

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Technologies Used

### Frontend
- Next.js 16
- React 19
- Tailwind CSS
- TypeScript
- ESLint

### Backend
- Node.js
- Express.js
- CORS
- dotenv
- nodemon (development)

## Git

The project includes a comprehensive `.gitignore` file that excludes:
- Node modules
- Environment variables
- Build outputs
- IDE files
- OS generated files
- Logs and temporary files