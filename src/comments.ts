import { ClassicEditor, Essentials, Paragraph, Plugin } from 'ckeditor5';
import { Comments } from 'ckeditor5-premium-features';
import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

import './editor.css'

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
class CommentsIntegration extends Plugin {
  static get requires() {
    return ['CommentsRepository', UsersIntegration];
  }

  init() {
    const commentsRepositoryPlugin = this.editor.plugins.get('CommentsRepository');

    // Load the comment threads data.
    commentsRepositoryPlugin.addCommentThread({
      "threadId": "ed5f0080a67ce5873dd66a09504e180ed",
      "context": {
        "type": "text",
        "value": "world!"
      },
      "unlinkedAt": null,
      "resolvedAt": null,
      "resolvedBy": null,
      "comments": [
        {
          "commentId": "e3d9c9e56f083b1485eb3456e8dd488a7",
          "content": "<p>use CKEditor!</p>",
          "createdAt": new Date("2026-01-19T12:02:19.773Z"),
          "authorId": "user-1",
          "attributes": {}
        }
      ],
      "attributes": {}
    });
  }
}

ClassicEditor
  .create(document.querySelector('#editor') as HTMLElement, {
    licenseKey: import.meta.env.VITE_CKEDITOR_LICENSE_KEY,
    plugins: [Essentials, Paragraph, Comments, UsersIntegration, CommentsIntegration],
    toolbar: ['undo', 'redo', 'comment', 'commentsArchive'],
    sidebar: {
      container: document.querySelector('#sidebar') as HTMLElement
    },
    initialData:
      `<p>
      Hello <comment-start name="ed5f0080a67ce5873dd66a09504e180ed:2dfbc"></comment-start>world!<comment-end name="ed5f0080a67ce5873dd66a09504e180ed:2dfbc"></comment-end>
      </p>`,
    comments: {
      // By using this property, you can customize the editor instance used in the comments reply field (e.g. by adding plugins or changing features configuration).
      editorConfig: {
      }
    }
  })
