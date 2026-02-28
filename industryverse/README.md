# IndustryVerse 🚀

> **Understand the Industry Before You Enter It**

A production-ready, full-stack SaaS corporate simulation learning platform. Students explore professional roles, complete real-world corporate projects, and get AI-powered career guidance.

---

## 🗂️ Project Structure

```
industryverse/
├── frontend/          # Next.js 14 App Router frontend
│   ├── app/
│   │   ├── page.tsx               # Landing page
│   │   ├── dashboard/             # Student dashboard
│   │   ├── roles/                 # Role explorer + detail pages
│   │   ├── projects/              # Project listing + detail + submission
│   │   ├── assistant/             # AI chat interface
│   │   ├── admin/                 # Admin panel
│   │   └── auth/                  # Login + Register
│   ├── components/                # Reusable UI components
│   ├── lib/                       # API client, Zustand store, utils
│   └── styles/                    # Global CSS
│
└── backend/           # Node.js + Express REST API
    └── src/
        ├── controllers/           # Request handlers
        ├── routes/                # API route definitions
        ├── middlewares/           # Auth, error, rate limiting
        ├── services/              # Business logic
        └── prisma/
            ├── schema.prisma      # Database schema
            └── seed.ts            # Database seeder
```

---

## ⚙️ Tech Stack

### Frontend
| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS + custom design system |
| UI Components | shadcn/ui + Radix UI primitives |
| Animations | Framer Motion |
| State Management | Zustand (persisted auth store) |
| Data Fetching | SWR |
| Theme | Dark-first, glass morphism |

### Backend
| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 20+ |
| Framework | Express.js |
| Language | TypeScript |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | JWT (jsonwebtoken) + bcrypt |
| Security | Helmet, CORS, rate limiting |
| Logging | Morgan |

### AI Integration
| Feature | Implementation |
|---------|---------------|
| Streaming responses | SSE (Server-Sent Events) |
| LLM provider | OpenAI GPT-4 / configurable |
| Context awareness | System prompt injection per role |
| History storage | PostgreSQL via Prisma |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL 15+
- npm or pnpm

### 1. Clone and install

```bash
git clone https://github.com/your-org/industryverse
cd industryverse

# Install frontend deps
cd frontend && npm install

# Install backend deps
cd ../backend && npm install
```

### 2. Configure environment variables

```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your PostgreSQL URL and JWT secret

# Frontend  
cp frontend/.env.example frontend/.env.local
# Edit with your API URL
```

### 3. Setup database

```bash
cd backend

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with initial data
npm run db:seed
```

### 4. Run development servers

```bash
# Terminal 1 - Backend (port 5000)
cd backend && npm run dev

# Terminal 2 - Frontend (port 3000)
cd frontend && npm run dev
```

**Frontend**: http://localhost:3000  
**Backend API**: http://localhost:5000  
**API Health**: http://localhost:5000/health

### Demo Credentials (after seeding)
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@industryverse.io | admin123! |
| Student | demo@industryverse.io | student123! |

---

## 📱 Pages & Features

### Landing Page (`/`)
- Premium hero with animated gradient
- Domain preview cards (Technology, Business, Finance, Corporate Skills)
- Feature highlights and social proof
- CTA to register

### Role Explorer (`/roles`)
- Browse all 36 professional roles
- Filter by domain and search by title
- Each role card shows skills, modules, and project count

### Role Detail (`/roles/[slug]`)
**Tabbed interface with:**
- Overview — What the role is and its purpose
- Daily Life — Realistic day-in-the-life breakdown
- Tools — Software and platforms used daily
- Workflow — Step-by-step corporate workflow
- Skills — Technical and soft skill requirements
- Career — Full progression from entry to senior
- Projects — Available simulation projects

### Corporate Projects (`/projects`)
- Filter by status, difficulty, domain
- Progress tracking with visual indicators
- Quick status overview (Not Started / In Progress / Submitted / Completed)

### Project Detail (`/projects/[id]`)
**Tabbed interface:**
- Overview — Project brief and skills covered
- Requirements — Full requirement document
- Implementation — Step-by-step plan
- Deliverables — Interactive checklist
- Submit — Submission with notes

### AI Assistant (`/assistant`)
- Real-time streaming chat interface
- Context selector (role-aware prompting)
- Quick question suggestions
- Conversation history
- Typing animation during streaming

### Dashboard (`/dashboard`)
- Stats: Completed modules, active projects, badges, hours
- Ongoing projects with progress bars
- Badge collection display
- Recent activity log

### Admin Panel (`/admin`)
- Platform analytics (users, projects, submissions)
- User management with role assignment
- Submission review queue
- Quick action shortcuts

---

## 🔌 API Reference

### Auth
```
POST   /api/auth/register     Register new user
POST   /api/auth/login        Login + get JWT
GET    /api/auth/me           Get current user (authenticated)
PUT    /api/auth/profile      Update profile
PUT    /api/auth/password     Change password
```

### Domains & Roles
```
GET    /api/domains           List all domains
GET    /api/domains/:slug     Get domain with roles
GET    /api/roles             List roles (filter: ?domain=tech&search=engineer)
GET    /api/roles/:slug       Get full role detail
POST   /api/roles             Create role (admin)
PUT    /api/roles/:id         Update role (admin)
DELETE /api/roles/:id         Delete role (admin)
```

### Projects
```
GET    /api/projects          List all projects
GET    /api/projects/:id      Get project detail
PUT    /api/projects/:id/progress   Update progress
POST   /api/projects/:id/submit     Submit project
```

### AI Assistant
```
POST   /api/assistant/chat    Stream chat response (SSE)
GET    /api/assistant/history Get conversation history
DELETE /api/assistant/session/:id   Clear session
```

### Admin
```
GET    /api/admin/analytics   Platform analytics
GET    /api/admin/users       All users
PATCH  /api/admin/users/:id/role    Update user role
GET    /api/admin/submissions All submissions
PUT    /api/admin/submissions/:id/review   Review submission
```

---

## 🌍 Deployment

### Frontend → Vercel

```bash
cd frontend
npm run build   # Verify build passes

# Deploy
vercel --prod
```

**Required environment variables on Vercel:**
```
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
```

### Backend → Railway

1. Connect GitHub repo to Railway
2. Set root directory to `/backend`
3. Set environment variables:
   ```
   DATABASE_URL=postgresql://...
   JWT_SECRET=your-production-secret
   FRONTEND_URL=https://your-frontend.vercel.app
   NODE_ENV=production
   OPENAI_API_KEY=sk-...
   ```
4. Railway auto-detects Node.js and runs `npm start`

### Database → Railway PostgreSQL or Supabase

After provisioning:
```bash
DATABASE_URL=your-production-url npm run db:migrate
DATABASE_URL=your-production-url npm run db:seed
```

---

## 🤖 AI Configuration

IndustryVerse AI uses a context-aware prompting system. To enable real AI responses:

1. Add `OPENAI_API_KEY` to backend `.env`
2. The system auto-builds context prompts per role
3. Responses stream via SSE to the frontend

To use Anthropic Claude instead, modify `backend/src/controllers/assistant.controller.ts`:
- Replace the OpenAI API call with the Anthropic SDK
- The streaming architecture is identical

---

## 📊 Database Schema

| Model | Description |
|-------|-------------|
| User | Students and admins with hashed passwords |
| Domain | Top-level industry categories (Technology, Finance, etc.) |
| IndustryRole | Professional roles with full detail JSON fields |
| Module | Learning modules within roles |
| Project | Simulation projects with requirements and deliverables |
| ProjectSubmission | User-project submission with status tracking |
| UserProgress | Module and role completion tracking |
| AssistantLog | AI conversation history per user |
| Badge / UserBadge | Achievement system |
| ActivityLog | Audit trail of user actions |

---

## 🛡️ Security Features

- JWT authentication with configurable expiry
- bcrypt password hashing (12 rounds)
- Role-based access control (STUDENT / ADMIN)
- Helmet.js security headers
- CORS configured for production origins
- Rate limiting (100 req/15min per IP)
- Input validation on all API routes

---

## 📄 License

MIT — Built for educational purposes.

---

*IndustryVerse — Bridging the gap between academic learning and corporate reality.*
