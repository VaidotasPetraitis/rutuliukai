 # Rutuliukai

 A small web + .NET backend project (game) with a separate database service and a static frontend.

 ## Project Overview

 - **What it is:** Multicomponent project with a DB service (`backend-db`), a web API/server (`backend-web-server`), and a browser frontend (`frontend`).
 - **Language / tech:** C# / .NET 8 for backends; plain HTML/CSS/JS for frontend.

 ## Repo Structure

 - `backend-db` : database service and data models.
 - `backend-web-server` : web server, API endpoints, and frontend-serving logic.
 - `frontend` : static site (`index.html`, assets, JS/CSS).
 - `data` : runtime data used by the app.

 ## Prerequisites

 - .NET SDK 8.0 (install from https://dotnet.microsoft.com/)
 - Optional: `node`/`npm` or Python to serve the frontend during development.

 ## Build & Run

 - Run the database service:

 ```bash
 cd backend-db
 dotnet build
 dotnet run
 ```

 - Run the web server:

 ```bash
 cd backend-web-server
 dotnet build
 dotnet run
 ```

 The web server reads configuration from `appsettings.json` / `appsettings.Development.json` in `backend-web-server`.

 - Serve the frontend (one of the options below):

 Open `frontend/index.html` directly in a browser, or serve it with a small HTTP server:

 ```bash
 # Python
 cd frontend
 python -m http.server 8080

 # or with npm http-server
 npx http-server -p 8080
 ```

 ## Development notes

 - Run the DB service and the web server concurrently in separate terminals.
 - If you change C# code, rebuild with `dotnet build` or `dotnet watch run` (install the watch tool if desired).
 - Static frontend files live under `frontend/` — changes are reflected on refresh when served by a static server.

 ## Configuration

 - Backend configuration files: `backend-web-server/appsettings.json` and `backend-web-server/appsettings.Development.json`.
 - Place any persistent data or seeds in the `data/` directory as needed by the services.

 ## Contributing

 - Open issues for bugs or feature requests.
 - Fork, branch, and send PRs. Keep changes focused and include build/run notes.