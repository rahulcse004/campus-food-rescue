# Campus Food Rescue — Run Instructions

## What's inside
- `backend/`  → Spring Boot (Java) API, port **8080**
- `frontend/` → React + TypeScript + Vite app, port **5173**

You need 2 terminals open at the same time: one for backend, one for frontend.

---

## STEP 1 — MySQL

Make sure MySQL is running. You do NOT need to manually create the database —
the backend will auto-create a database called `campus_food_rescue` on first run.

Open `backend/src/main/resources/application.properties` and check these two lines
match YOUR MySQL login:

```
spring.datasource.username=root
spring.datasource.password=root
```

If your MySQL root password is different, change it here. Save the file.

---

## STEP 2 — Run the backend

You need Maven support in VS Code. Easiest way:

1. In VS Code, go to Extensions (`Ctrl+Shift+X`)
2. Install **"Extension Pack for Java"** (by Microsoft)
3. Restart VS Code
4. Open the `backend` folder in VS Code (File → Open Folder → select `backend`)
5. Wait a few seconds for VS Code to detect it's a Maven project (bottom right will show progress)
6. Open `src/main/java/com/campusfoodrescue/backend/BackendApplication.java`
7. Click the **▶ Run** button that appears just above `public static void main(...)`

Wait until the terminal/output panel shows something like:
```
Tomcat started on port 8080
Started BackendApplication
```

Leave this running. Backend is now live at `http://localhost:8080`.

**Alternative (if you'd rather use a terminal and have Maven installed):**
```bash
cd backend
mvn spring-boot:run
```

If it fails immediately, it's almost always a MySQL connection issue — check
username/password in `application.properties`, and make sure MySQL is actually running.

---

## STEP 3 — Run the frontend

Open a SECOND terminal (keep the backend one running):

```bash
cd frontend
npm install
npm run dev
```

It will print a local URL, usually:
```
Local: http://localhost:5173/
```

Open that URL in your browser.

---

## STEP 4 — Use the app

1. Go to **Register**, create one account with role `DONOR`, one with role `RECEIVER`,
   and optionally one with role `ADMIN`.
2. Login as Donor → add a donation.
3. Login as Receiver (different browser tab or logout/login) → see the donation, request pickup.
4. Login as Admin → see all users and all donations, delete any entry.

---

## Common issues

- **"Failed to fetch" / network error in browser** → backend isn't running, or it's not
  on port 8080. Check terminal 1.
- **CORS error in browser console** → make sure frontend is running on port 5173 exactly
  (that's the only origin allowed in `backend/.../config/WebConfig.java`).
- **Backend won't start / database error** → check MySQL is running and credentials in
  `application.properties` are correct.
- **404 on an API call** → double check both servers are running; restart both if you
  changed backend code (frontend doesn't need a restart for most changes, backend does).
