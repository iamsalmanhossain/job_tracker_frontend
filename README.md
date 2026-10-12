<div align="center">

  <img src="./public/images/logo-dark-text-cropped.png" alt="Next Job Track Logo" width="120" height="120" />

  # 🎯 Next Job Track (Frontend)
  **Enterprise-Grade Modern Job Search, Interview Pipeline & Career Management Platform**

  [![Next.js](https://img.shields.io/badge/Next.js-16.3.8-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Turbopack](https://img.shields.io/badge/Turbopack-Enabled-orange?style=for-the-badge&logo=vercel)](https://turbo.build/)
  [![React Query](https://img.shields.io/badge/TanStack_Query-v5-ff4154?style=for-the-badge&logo=react-query)](https://tanstack.com/query)
  [![Zustand](https://img.shields.io/badge/State-Zustand-443e38?style=for-the-badge)](https://zustand-demo.pmnd.rs/)

  <p align="center">
    A high-performance, responsive web application engineered to empower job seekers and technical recruiters with end-to-end recruitment tracking, interactive Kanban analytics, resume vaults, automated reminders, and administrative control.
  </p>

  [Live Demo](https://next-job-track.vercel.app) • [Backend Repository](https://github.com/iamsalmanhossain/job_tracker_backend) • [Report Bug](https://github.com/iamsalmanhossain/job_tracker_frontend/issues)

</div>

---

## 📸 Key Highlights & Previews

- **High-Impact Landing Page**: Infinity recruitment streamer animation, conversion funnel visualizer, real-time platform preview switcher, and recruiter spotlight.
- **Unified Analytics Dashboard**: Live metrics for Total Applications, Interviews, Offers, and Conversion Rates with responsive funnel breakdowns.
- **Application Workflow Grid**: Advanced client-side search, multi-stage filtering (`Applied`, `Screening`, `Interview`, `Offer`, `Rejected`), and inline candidate notes.
- **Interview Tracking Hub**: Round categorization (`Technical`, `HR / Fit`, `Video Call`, `System Design`, `Final Round`), calendar timestamps, and meeting links.
- **Follow-up Reminders**: Smart deadline manager with automated overdue indicators and 1-click completion toggles.
- **Multi-Resume Library**: Cloud PDF storage with drag-and-drop uploader and dynamic "Default Resume" assignment.
- **Enterprise Admin Suite**: User moderation, account suspension actions, broadcast communications composer, support queue resolution, and security audit logs.
- **1-Click Instant Demo Access**: Direct demo credentials for both **Candidate User** and **Platform Administrator** without manual entry.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies & Tools |
| :--- | :--- |
| **Core Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack, Server & Client Components) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (Strict typing, Zero `any` policy for domain types) |
| **Styling & Design** | [Tailwind CSS v4](https://tailwindcss.com/), Custom HSL Theme Tokens, Glassmorphism, CSS Variables |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) (Micro-interactions, dual sliding auth forms, modal transitions) |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand) (Persistent auth tokens, session hydration, user credentials) |
| **Data Fetching & Cache** | [TanStack React Query v5](https://tanstack.com/query) (Automatic cache invalidation, background polling) |
| **Form Management** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) Schema Validation |
| **Icons & Visuals** | [Lucide React](https://lucide.dev/), Custom Vector Artwork, High-Contrast Light/Dark adaptive Brand Logo |
| **Feedback & Notifications** | [Sonner Toast](https://sonner.emilkowal.ski/), Custom Accessible `ConfirmModal` Suite |

---

## 📱 Mobile-First & Responsive Excellence

- **Universal Viewport Support**: Handcrafted responsiveness across Ultra-wide monitors (1920px+), laptops, tablets (768px - 1024px), and compact phones (320px - 390px).
- **Form-First Mobile Auth**: Login & registration forms load immediately at the top on mobile devices without heavy marketing illustrations pushing inputs down.
- **Zero Horizontal Bounce**: Strict boundary constraints (`overflow-x-hidden`) prevent unintended viewport shaking.
- **Adaptive Notification Drawer**: Fullscreen-safe floating modal on mobile (`max-w-[calc(100vw-24px)]`) that transitions cleanly to a right-aligned dropdown on desktop.
- **Unified Compact Dashboard Topbar**: Clean 56px header uniting the mobile hamburger drawer, brand mark, unread alerts, and theme toggle in a single row.

---

## ⚡ Quick Demo Access (1-Click)

The platform provides built-in demo credentials for immediate exploration directly from the `/login` screen:

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Demo User** | `demoUser@jobtracker.com` | `DemoUser123!` | Full candidate features: pipeline, applications, notes, resumes, interviews |
| **Demo Admin** | `demoAdmin@jobtracker.com` | `DemoAdmin123!` | Management suite: user moderation, support ticket queue, system audit logs |

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: `v20.x` or higher (`v24.x` recommended)
- **pnpm**: `v9.x` or higher (or `npm` / `yarn`)
- **Backend API**: Running instance of [Job Tracker Backend](https://github.com/iamsalmanhossain/job_tracker_backend)

### 1. Clone the repository
```bash
git clone https://github.com/iamsalmanhossain/job_tracker_frontend.git
cd job_tracker_frontend
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Setup environment variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

### 4. Run the development server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 5. Build for production
```bash
pnpm build
pnpm start
```

---

## 📁 Project Structure

```text
job_tracker_frontend/
├── public/
│   ├── favicon.ico                   # Multi-resolution favicon (16x16, 32x32, 48x48)
│   ├── apple-touch-icon.png          # iOS home screen icon
│   └── images/
│       ├── logo-cropped.png          # Dark mode optimized brand logo
│       ├── logo-dark-text-cropped.png# Light mode optimized brand logo
│       ├── salman.jpg                # Engineer profile avatar
│       └── auth/                     # Desktop illustration showcases
├── src/
│   ├── app/                          # Next.js App Router (Layouts, routes, pages)
│   │   ├── (auth)/                   # Login, register, verify-email, reset-password
│   │   ├── dashboard/                # Analytics, applications, interviews, resumes, admin
│   │   ├── globals.css               # Design tokens, typography & base utility layers
│   │   └── layout.tsx                # Root layout with ThemeProvider & QueryProvider
│   ├── components/
│   │   ├── admin/                    # Admin moderation, audits & broadcast modals
│   │   ├── auth/                     # Dual-sliding auth container & 1-click demo actions
│   │   ├── landing/                  # Modular landing sections (Hero, Stats, Architecture)
│   │   ├── ui/                       # Reusable primitives (BrandLogo, ConfirmModal, Buttons)
│   │   └── userDashboard/            # Applications table, notes timeline, interview scheduler
│   ├── lib/
│   │   ├── api.ts                    # Resilient fetch wrapper with silent refresh rotation
│   │   └── auth-utils.ts             # Session expiry handlers & toast notifications
│   ├── services/                     # Typed REST API service integration clients
│   ├── store/                        # Zustand persistent client state stores
│   ├── types/                        # Enterprise TypeScript domain interfaces
│   └── validations/                  # Zod validation schemas
```

---

## 🔒 Security & Reliability Features

- **Dual-Token Silent Refresh Rotation**: Requests encountering `401 Unauthorized` automatically trigger background token rotation via `/auth/refresh-token` before retrying the failed request seamlessly.
- **Custom Application Modals**: Browser-native `alert()` and `confirm()` prompts are eliminated in favor of branded, accessible Framer Motion confirmation dialogs.
- **Route Protections**: Sensitive dashboard routes and administrative tools are secured via client-side authentication guards and role validation.

---

## 👨‍💻 Engineer & Author

**Salman Hossain**  
Full-Stack Software Engineer  
- 🌐 Portfolio: [Explore Platform](https://iamsalmanhossain.vercel.app)  
- 💼 GitHub: [@iamsalmanhossain](https://github.com/iamsalmanhossain)  
- 📧 Contact: [mds619820@gmail.com](mailto:mds619820@gmail.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
