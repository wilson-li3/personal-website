# Legacy site (Mac / Apple Notes design)

This folder is a snapshot of the previous version of the website — the macOS desktop
landing (Face ID unlock) that opened into an Apple Notes-style app where every page
was a note.

Preserved here:

- `src/` — all components (MacLanding, MacMenuBar, Sidebar, NoteList, Toolbar,
  CustomCursor, Layout) and pages (Home, About, Projects, Contact, QuotesHimym,
  Photos, GymRoutine, Doodle, Food) with their original copy and styles.
- `index.html`, `vite.config.js`, `package.json`, `package-lock.json`, `README.md`
  — the build setup as it was.

Static assets (photos, icons, videos, Lottie files) live in the repo-root `/public`
folder, which is shared with the current site and was left untouched — nothing was
deleted or overwritten. All images referenced by these legacy pages still resolve
against `/public/images/…`.

To run this snapshot standalone: copy this folder somewhere, symlink or copy the
repo's `/public` into it, then `npm install && npm run dev`.
