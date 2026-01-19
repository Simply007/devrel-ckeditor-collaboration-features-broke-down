import { ClassicEditor, Essentials, Mention, Paragraph } from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

import './editor.css'


ClassicEditor
  .create(document.querySelector('#editor') as HTMLElement, {
    licenseKey: import.meta.env.VITE_CKEDITOR_LICENSE_KEY,
    plugins: [Essentials, Paragraph, Mention],
    toolbar: ['undo', 'redo'],
    mention: {
      feeds: [
        {
          marker: '@',
          feed: [
            '@allice', '@bob', '@charlie', '@david', '@eve'
          ]
        }
      ]
    },
    placeholder: 'Type @ to mention someone...',
  })
