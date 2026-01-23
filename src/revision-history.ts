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
class RevisionHistoryIntegration extends Plugin {

  static get requires() {
    return [RevisionHistory];
  }

  init() {
    const revisionHistory = this.editor.plugins.get(RevisionHistory);

    revisionHistory.addRevisionData({
      "id": "initial",
      "name": "Initial revision",
      "creatorId": "user-1",
      "authorsIds": [],
      "diffData": {
        "main": {
          "insertions": "[{\"type\":\"c\",\"name\":\"p\",\"attributes\":[],\"children\":[\"Hello world!\"]}]",
          "deletions": "[{\"type\":\"c\",\"name\":\"p\",\"attributes\":[],\"children\":[\"Hello world!\"]}]",
          "attachChange": null,
          "attributesBefore": {},
          "attributesAfter": {}
        }
      },
      "createdAt": new Date("2026-01-19T13:08:42.824Z"),
      "attributes": {},
      "fromVersion": 1,
      "toVersion": 1
    });

    revisionHistory.addRevisionData({
      "id": "e98f14da2fc3745c54eb39ef3086bfc73",
      "name": "",
      "creatorId": null,
      "authorsIds": [
        "user-1"
      ],
      "diffData": {
        "main": {
          "insertions": "[{\"type\":\"c\",\"name\":\"p\",\"attributes\":[],\"children\":[\"Hello \",{\"type\":\"u\",\"name\":\"revision-start\",\"attributes\":[[\"name\",\"insertion:user-1:0\"]],\"children\":[\"<revision-start name=\\\"insertion:user-1:0\\\"></revision-start>\"]},\"CKEditor!\",{\"type\":\"u\",\"name\":\"revision-end\",\"attributes\":[[\"name\",\"insertion:user-1:0\"]],\"children\":[\"<revision-end name=\\\"insertion:user-1:0\\\"></revision-end>\"]}]}]",
          "deletions": "[{\"type\":\"c\",\"name\":\"p\",\"attributes\":[],\"children\":[\"Hello \",{\"type\":\"u\",\"name\":\"revision-start\",\"attributes\":[[\"name\",\"deletion:user-1:0\"]],\"children\":[\"<revision-start name=\\\"deletion:user-1:0\\\"></revision-start>\"]},\"world!\",{\"type\":\"u\",\"name\":\"revision-end\",\"attributes\":[[\"name\",\"deletion:user-1:0\"]],\"children\":[\"<revision-end name=\\\"deletion:user-1:0\\\"></revision-end>\"]}]}]",
          "attachChange": null,
          "attributesBefore": {},
          "attributesAfter": {}
        }
      },
      "createdAt": new Date("2026-01-19T13:13:44.870Z"),
      "attributes": {},
      "fromVersion": 1,
      "toVersion": 11
    });
  }
}

ClassicEditor
  .create(document.querySelector('#editor') as HTMLElement, {
    licenseKey: import.meta.env.VITE_CKEDITOR_LICENSE_KEY,
    plugins: [Essentials, Paragraph, UsersIntegration, RevisionHistory, RevisionHistoryIntegration],
    toolbar: ['undo', 'redo', 'revisionHistory'],
    revisionHistory: {
      editorContainer: document.querySelector('#editor-container') as HTMLElement,
      viewerContainer: document.querySelector('#revision-history') as HTMLElement,
      viewerEditorElement: document.querySelector('#revision-history-editor') as HTMLElement,
      viewerSidebarContainer: document.querySelector('#revision-history-sidebar') as HTMLElement,
      resumeUnsavedRevision: true

    },
    initialData: `<p>Hello world!</p>`,
  })
