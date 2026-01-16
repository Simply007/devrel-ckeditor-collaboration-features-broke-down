import { ClassicEditor, Essentials, Mention, Paragraph, Plugin } from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

ClassicEditor
  .create(document.querySelector('#editor') as HTMLElement, {
    licenseKey: import.meta.env.VITE_CKEDITOR_LICENSE_KEY || 'GPL',
    plugins: [Essentials, Paragraph, Mention],
    toolbar: ['undo', 'redo'],
    
  })
