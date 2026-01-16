import { ClassicEditor, Essentials, Paragraph, Plugin } from 'ckeditor5';
import { Comments } from 'ckeditor5-premium-features';
import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

// based on https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/comments/comments-integration.html

class UsersIntegration extends Plugin {
  static get requires() {
    return ['Users'];
  }

  init() {
    const users = this.editor.plugins.get('Users');
    users.addUser({ id: 'user-1', name: 'John Doe' });
    users.defineMe('user-1');
  }
}

/**
 * The `CommentsIntegration` lets you synchronize comments in the document with your data source (e.g. a database).
 *
 * To read more about it, visit the CKEditor 5 documentation: https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/comments/comments-integration.html.
 */
class CommentsIntegration extends Plugin { }

ClassicEditor
  .create(document.querySelector('#editor') as HTMLElement, {
    licenseKey: import.meta.env.VITE_CKEDITOR_LICENSE_KEY || 'GPL',
    plugins: [Essentials, Paragraph, Comments, UsersIntegration],
    toolbar: ['undo', 'redo', 'comment', 'commentsArchive'],
    sidebar: {
      container: document.querySelector('#sidebar') as HTMLElement
    },
  })
