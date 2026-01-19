import { ClassicEditor, Essentials, Paragraph, Plugin } from 'ckeditor5';
import { Comments, TrackChanges, TrackChangesPreview } from 'ckeditor5-premium-features';
import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

import './editor.css'

// based on https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/track-changes/track-changes-integration.html

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
 * The `TrackChangesIntegration` lets you synchronize suggestions added to the document with your data source (e.g. a database).
 *
 * To read more about it, visit the CKEditor 5 documentation: https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/track-changes/track-changes-integration.html.
 */
class TrackChangesIntegration extends Plugin {
  static get requires() {
    return [TrackChanges, UsersIntegration];
  }

  init() {
    const trackChangesPlugin = this.editor.plugins.get('TrackChanges');

    trackChangesPlugin.addSuggestion({
      "id": "ec8c751661ca38b067e705d0119c1eca9",
      "type": "deletion",
      "authorId": "user-1",
      "createdAt": new Date("2026-01-19T12:34:28.345Z"),
      "hasComments": false,
      "data": null,
      "attributes": {}
    });

    trackChangesPlugin.addSuggestion({
      "id": "e684c7669b45e2da28fefe820b5f03b09",
      "type": "insertion",
      "authorId": "user-1",
      "createdAt": new Date("2026-01-19T12:34:28.347Z"),
      "hasComments": false,
      "data": null,
      "attributes": {}
    });
  }
}

ClassicEditor
  .create(document.querySelector('#editor') as HTMLElement, {
    licenseKey: import.meta.env.VITE_CKEDITOR_LICENSE_KEY,
    plugins: [
      Essentials, Paragraph,
      Comments, TrackChanges, UsersIntegration, TrackChangesPreview, TrackChangesIntegration
    ],
    toolbar: ['undo', 'redo', 'trackChanges'],
    sidebar: {
      container: document.querySelector('#sidebar') as HTMLElement
    },
    comments: {
      // By using this property, you can customize the editor instance used in the comments reply field (e.g. by adding plugins or changing features configuration).
      editorConfig: {
      }
    },
    initialData:
      `<p>Hello
      <suggestion-start name="insertion:e684c7669b45e2da28fefe820b5f03b09:user-1">
      </suggestion-start>
      CKEditor!
      <suggestion-end name="insertion:e684c7669b45e2da28fefe820b5f03b09:user-1">
      <suggestion-end>
      <suggestion-start name="deletion:ec8c751661ca38b067e705d0119c1eca9:user-1">
      </suggestion-start>
      world!
      <suggestion-end name="deletion:ec8c751661ca38b067e705d0119c1eca9:user-1">
      </suggestion-end>
    </p>`
  })
