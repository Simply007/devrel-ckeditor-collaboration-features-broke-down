import { ClassicEditor, Essentials, Paragraph, Plugin } from 'ckeditor5';
import { RevisionHistory } from 'ckeditor5-premium-features';
import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

import './editor.css'

// Based on https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/revision-history/revision-history-integration.html

class UsersIntegration extends Plugin {
  static get requires() {
    return ['Users'];
  }

  init() {
    const users = this.editor.plugins.get('Users');

    // minimal dummy user
    users.addUser({ id: 'user-1', name: 'John Doe' });
    users.defineMe('user-1');
  }
}

/**
 * The `RevisionHistoryIntegration` lets you synchronize named revisions in the document with your data source (e.g. a database).
 *
 * To read more about it, visit the CKEditor 5 documentation: https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/revision-history/revision-history-integration.html.
 */
class RevisionHistoryIntegration extends Plugin { }

ClassicEditor
  .create(document.querySelector('#editor') as HTMLElement, {
    licenseKey: import.meta.env.VITE_CKEDITOR_LICENSE_KEY,
    plugins: [Essentials, Paragraph, UsersIntegration, RevisionHistory],
    toolbar: ['undo', 'redo', 'revisionHistory'],
    revisionHistory: {
      editorContainer: document.querySelector('#editor-container') as HTMLElement,
      viewerContainer: document.querySelector('#revision-history') as HTMLElement,
      viewerEditorElement: document.querySelector('#revision-history-editor') as HTMLElement,
      viewerSidebarContainer: document.querySelector('#revision-history-sidebar') as HTMLElement,
      resumeUnsavedRevision: true
    },

  })
