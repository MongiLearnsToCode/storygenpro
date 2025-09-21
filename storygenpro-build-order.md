# storygenpro-build-order.md

## Build Order & Task Checklist  
This build order reflects the updated stack: **Next.js + Clerk + Convex + Gemini API**.  

---

## 1. Project Setup
- [x] 1.1 Initialize Next.js project with TypeScript and TailwindCSS  
- [x] 1.2 Configure shadcn/ui component library  
- [x] 1.3 Setup environment variables structure (.env.local)  

---

## 2. Authentication (Clerk)
- [x] 2.1 Install and configure Clerk in Next.js  
- [x] 2.2 Implement sign-up/sign-in pages (Email, Google, GitHub)  
- [x] 2.3 Protect app routes using Clerk middleware  
- [x] 2.4 Display user profile & sign-out options in UI  

---

## 3. Backend & Database (Convex)
- [x] 3.1 Initialize Convex project in repo  
- [x] 3.2 Integrate Clerk with Convex for auth and identity mapping  
- [x] 3.3 Define Convex schema for core entities:
  - [x] 3.3.1 Users  
  - [x] 3.3.2 Projects (stories)  
  - [x] 3.3.3 Scenes  
  - [x] 3.3.4 Characters  
  - [x] 3.3.5 Relationships  
  - [x] 3.3.6 Achievements / streaks
- [x] 3.4 Implement Convex functions for CRUD operations:
  - [x] 3.4.1 Create/read/update/delete scenes  
  - [x] 3.4.2 Manage timeline ordering  
  - [x] 3.4.3 Manage character data  
  - [x] 3.4.4 Track user achievements & streaks
- [x] 3.5 Enforce row-level access using Clerk user IDs  
- [x] 3.5 Enforce row-level access using Clerk user IDs  

---

## 4. Core Modules

### 4.1 Scene Planner
- [x] 4.1.1 UI for creating/editing scene cards  
- [x] 4.1.2 Drag-and-drop scene ordering (persist order in Convex)  
- [x] 4.1.3 Scene tags & summaries  
- [x] 4.1.4 Progress tracker (X of Y scenes defined)  
- [x] 4.1.5 Daily streaks integration  

### 4.2 Timeline / Flow Visualization
- [x] 4.2.1 Integrate d3.js or React Flow  
- [x] 4.2.2 Auto-generate timeline from scenes  
- [x] 4.2.3 Zoom levels: scene → act → arc  
- [x] 4.2.4 Smooth animation on reorder  

### 4.3 Conflict & Arc Analyzer
- [x] 4.3.1 Connect Gemini API  
- [x] 4.3.2 Analyze scenes/timeline for pacing and arcs  
- [x] 4.3.3 Return flagged issues as *questions*  
- [x] 4.3.4 Display suggestions in non-intrusive UI panel  

### 4.4 Character Designer
- [x] 4.4.1 Character cards (name, role, goals, quirks)  
- [x] 4.4.2 Relationship map visualization (React Flow)  
- [x] 4.4.3 Achievements for character groups (e.g. trio, rival pair)  

---

## 5. Gamification Layer
- [x] 5.1 Daily streak tracking in Convex  
- [x] 5.2 Progress bars for stories and arcs  
- [ ] 5.3 Achievement badges stored per user  
- [ ] 5.4 Display achievements in user dashboard  

---

## 6. Export
- [ ] 6.1 Implement simple outline export to TXT/PDF  
- [ ] 6.2 Ensure character and scene metadata is included  

---

## 7. Testing & Verification
- [ ] 7.1 Unit tests for Convex functions  
- [ ] 7.2 Integration tests for Clerk + Convex auth flows  
- [ ] 7.3 E2E tests for scene/character workflows  
- [ ] 7.4 Verify Gemini analyzer outputs valid suggestions  

---

## 8. Deployment
- [ ] 8.1 Setup Vercel deployment for Next.js frontend  
- [ ] 8.2 Deploy Convex backend  
- [ ] 8.3 Configure Clerk production environment  
- [ ] 8.4 Configure Gemini API keys in production  
- [ ] 8.5 Verify production build, auth, and data flow  

---

