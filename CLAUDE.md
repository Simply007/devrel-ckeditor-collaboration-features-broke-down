# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CKEditor 5 demonstration project showcasing premium collaboration features: comments, track changes, revision history, and real-time collaboration. Built with Vite and TypeScript.

## Development Commands

```bash
npm install              # Install dependencies
npm run dev             # Start dev server (localhost:5173)
npm run build           # Build for production (tsc + vite build)
npm run preview         # Preview production build
```

## Architecture

### Page Structure

- `index.html` - Overview page displaying all features in iframes with cards layout
- `features/*.html` - Individual feature demo pages:
  - `comments.html` → `src/comments.ts`
  - `track-changes.html` → `src/track-changes.ts`
  - `revision-history.html` → `src/revision-history.ts`
  - `real-time-collaboration.html` → `src/real-time-collaborations.ts`

### Integration Plugin Pattern

All examples follow this pattern:

1. **UsersIntegration** plugin: Manages user data (hard-coded dummy user "John Doe")
2. **Empty integration plugins**: CommentsIntegration, TrackChangesIntegration, RevisionHistoryIntegration are placeholder classes for backend synchronization
3. **ClassicEditor.create()**: Instantiates editor with DOM containers and plugin configuration

### DOM Element IDs

All feature pages use unified IDs (no numbering):
- Basic editors: `#editor`, `#sidebar`
- Revision history/real-time: `#editor-container`, `#editor-outline`, `#editor-annotations`, `#editor-revision-history`, `#editor-revision-history-editor`, `#editor-revision-history-sidebar`
- Real-time only: `#editor-presence`

### Environment Variables

`.env` file (template: `.env.template`):
- `VITE_CKEDITOR_LICENSE_KEY`: Defaults to 'GPL' for development
- `VITE_CKEDITOR_CLOUD_SERVICES_TOKEN_URL`: Required only for real-time collaboration
- `VITE_CKEDITOR_CLOUD_SERVICES_WEBSOCKET_URL`: Required only for real-time collaboration

Real-time collaboration uses hardcoded `channelId: 'hardcoded-single-channel-id'` for synchronization.
