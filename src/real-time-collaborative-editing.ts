import { ClassicEditor, CloudServices, Essentials, Paragraph} from 'ckeditor5';
import { Comments, PresenceList, RealTimeCollaborativeComments, RealTimeCollaborativeEditing } from 'ckeditor5-premium-features';
import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

import './editor.css'


ClassicEditor
    .create(document.querySelector('#editor') as HTMLElement, {
        licenseKey: import.meta.env.VITE_CKEDITOR_LICENSE_KEY,
        plugins: [
            Essentials, Paragraph, 
            CloudServices, Comments, RealTimeCollaborativeEditing, 
            PresenceList, RealTimeCollaborativeComments
        ],
        toolbar: ['undo', 'redo'],
        cloudServices: {
            tokenUrl: import.meta.env.VITE_CKEDITOR_CLOUD_SERVICES_TOKEN_URL || '',
            webSocketUrl: import.meta.env.VITE_CKEDITOR_CLOUD_SERVICES_WEBSOCKET_URL || ''
        },
        collaboration: {
            channelId: 'hardcoded-real-time-collaborative-editing-single-channel-id' // see https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/context-and-collaboration-features.html#channel-id
        },
        presenceList: { container: document.querySelector('#presence') as HTMLElement },
    })
