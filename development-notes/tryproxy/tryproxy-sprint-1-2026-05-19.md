# Sprint 1: Project Setup & Component Basics — 2026-05-19

- **What was done:** Set up the initial project structure using the Nx platform, set up the backend and frontend, added CI, configured linters, formatters, unit tests, and e2e tests. Deploy to a custom rented VPS is half done. Also did a cross-review for my teammate.

- **Problems:** I had never seen or touched an Nx repo before, and I’m still new to Angular in general. There were also a lot of simultaneous tasks and deadlines outside the course, and of course they all landed rigth the first week of Checkpoint. I spent way too much time creating the Nx starter and initializing the project. Also, this week the news broke about a new supply-chain attack that can affect all of us using the npm infrastructure, so that also got added to the already-burning pile of tasks. I had to tweak the repo configuration again, set a minimum age for newly installed dependencies, and pin all dependencies to older versions so the team could update the repo without conflicts.

- **Summary:** Countless hours were spent with ChatGPT: “What does this mean?”, “What does that mean?”, “How come you just said A, but before you said B?” I learned that my team is the best <3. I also learned that Nx can be really annoying to work with, and that even simple solutions can accidentally block other team members from making progress.

- **Plans:** Next, I plan to finish the deploy, set up Docker scripts, add CD to the project, and add Swagger. Sketch the DB, sign off on the API contract with the team, add an API client to our backend with at least 5 endpoints, and implement authorization. Keep learning Angular, attend new lectures, and watch the skipped ones. Cheers.
