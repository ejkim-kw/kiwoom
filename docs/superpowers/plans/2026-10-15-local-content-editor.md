# Local Content Editor Implementation Plan

> **For agentic workers:** Execute this plan inline with superpowers:executing-plans. Preserve the user's current checkout and uncommitted work; this is the exact local index.html they are editing.

**Goal:** Make the local root index.html an editor for Ver 4.8 menu order and fixed text throughout the phone previews, with reusable changes for a later requested commit/deployment.

**Architecture:** A validated content-data module is the single source for published overrides. A read-only runtime applies menu order/names and page-scoped copy overrides; a separate local-only editor provides drag/drop, keyboard order controls, double-click text editing, undo/redo, local drafts, and JSON export/import. The demo builder excludes editor code/styles and includes only validated presentation data/runtime.

**Tech Stack:** Existing plain JavaScript/CSS, Node.js tests, Cheerio, esbuild; no new dependencies.

**Spec:** User request in this chat, 2026-10-15: local editor only; reorder the nine main categories and accordion entries; synchronize all-menu; edit fixed text, never actual input values; later apply all changes and request commit/deployment.

## Global Constraints

- Work in the existing root checkout; index.html may now receive editor integration hooks.
- Preserve menu IDs, routes, authentication and input behavior.
- Do not commit, push or deploy until the user requests it after editing.
- Editor is available only on file/loopback root pages, never in demo or remote pages.
- Drafts are not deployment data until exported and explicitly applied.
- No arbitrary HTML, JavaScript or user-input value changes in content files.

## Review Focus

- Reordered categories retain their icons and routes; home and drawer share order.
- Duplicate text on another screen is unaffected by a page-scoped copy change.
- Buttons remain clickable in preview; text mode blocks accidental navigation.
- Reload, undo, import and reset preserve a recoverable draft.
- Malformed/unknown IDs, selectors and prototype keys are rejected; public builds omit editor controls and storage access.

### Task 1: Shared content model and import pipeline
- [x] Add tests for validation, stable ID reordering, immutable originals and safe serialization.
- [x] Implement content-data.js, content-model.js and scripts/apply-content.cjs.
- [x] Verify invalid imports do not write files; valid imports round-trip.

### Task 2: Read-only presentation runtime
- [x] Apply catalog overrides before render; bind icons to category IDs, not array positions.
- [x] Implement scoped, original-text-guarded copy replacements that preserve controls.
- [x] Add shared menu label keys and route-safe title lookup.
- [x] Verify home/drawer order and unchanged input values.

### Task 3: Local editor UI
- [x] Add local-editor.js/.css via explicit local-only asset markers in root index.html.
- [x] Add preview/order/text modes, grid/accordion drag/drop and keyboard move controls.
- [x] Add plain-text dialog, local autosave, undo/redo, reset, export and validated import.
- [x] Provide a clear saved-file handoff for later code import and deployment.

### Task 4: Build boundary and end-to-end verification
- [x] Exclude local-only assets from build; allow them in loopback preview server.
- [x] Test public package has no editor UI/code; verify real browser editing and reload.
- [x] Verify 9-grid and accordion order match whole-menu, copy persists across rerender, preview remains functional.
- [x] Restore test draft, save screenshot, document workflow, final review.

## Execution record

- Ruling: Keep browser edits as a local draft until the user saves/export a change file. Browsers cannot silently rewrite project source; a validated import command writes the shared content module for the later commit.
- Ruling: Fixed-copy changes target a specific screen and element; menu labels use shared stable menu keys to stay synchronized. Do not perform global string replacement.
- Ruling: No new checkout or automatic commit: the user explicitly wants to edit this local index.html, with commit/deployment after their edits are finished.

## Completed verification (2026-10-16)

- 189 Node tests passed, including real menu rendering, stable routes/icons, import validation, public-build exclusion and escaping in method/consultation/voice/app screens.
- Real embedded-browser checks: pointer drag of category across grid and item inside accordion; matching whole-menu order; renamed menu searchable; renamed result preserves description/badge; normal routing and original input values preserved.
- Fixed copy persisted across reload and navigation. Undo/redo, reset, downloaded JSON and file import were exercised. Digital Form identity-task copy remained distinct from ISA-task copy.
- Local editor test draft was reset to the published baseline (zero changes). No user menu/copy changes were applied to content-data.js, committed or deployed.
- Read-only reviewer findings were addressed: escape menu names at downstream HTML sinks, scope Digital Form by stable task/view, distinguish input tag names from class names, and edit only search-result titles as shared labels.
- Ruling: embedded-browser HTML5 drag was inconsistent; pointer capture dragging was implemented and verified with real mouse drags, keeping keyboard/button ordering as alternatives.
- Export deliberately uses a standard JSON download, avoiding dependence on native File System Access dialogs. Browser download event inspection timed out, but the resulting file was read and successfully imported through the actual file chooser.