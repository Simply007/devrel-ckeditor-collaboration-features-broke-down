# CKEditor Collaboration Features Decomposed

A bare-bone Typescript demonstration project showcasing CKEditor's premium collaboration features in its **minimal setup**:

- [Comments ↗](https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/comments/comments.html)
- [Track changes ↗](https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/track-changes/track-changes.html)
- [Revision history ↗](https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/revision-history/revision-history.html)
- [Real-time collaboration ↗](https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/real-time-collaboration/real-time-collaboration.html)

![CKEditor Collaboration Features Showcase](./assets/screenshot.png)

## Prerequisites

- Node.js (LTS version recommended)
- npm

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create environment file:

   ```bash
   cp .env.template .env
   ```

   > This project uses CKEditor premium features. A **14-day free trial** is available for evaluation:
   >
   > 👉 [Get your free trial license](https://portal.ckeditor.com/signup/) and fill the keys to `.env` file

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser to [http://localhost:5173](http://localhost:5173)

## What's Included

This demo includes four separate editor examples, each in its own page under `/features/`:

### Comments

Inline commenting and discussion threads

![Comments](./assets/async-comments.png)

### Track Changes

Suggestion tracking with accept/reject functionality

![Track Changes](./assets/async-track-changes.png)

### Revision History

Document version management with side-by-side comparison

![Revision History](./assets/async-revision-history.png)

### Real-Time Collaboration

Live collaborative editing with all features combined

![Real-Time Collaboration](./assets/real-time-collaborative-editing.png)

Each example is self-contained in its own TypeScript file under `src/`.

## Additional Commands

```bash
npm run build    # Build for production
npm run preview  # Preview production build
```
