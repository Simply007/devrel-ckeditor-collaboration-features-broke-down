import { ClassicEditor, CloudServices, Essentials, Paragraph, } from 'ckeditor5';
import { Comments, RealTimeCollaborativeComments, RealTimeCollaborativeEditing, RealTimeCollaborativeRevisionHistory, RealTimeCollaborativeTrackChanges, TrackChanges, RevisionHistory, PresenceList } from 'ckeditor5-premium-features';
import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

ClassicEditor
    .create(document.querySelector('#editor') as HTMLElement, {
        licenseKey: import.meta.env.VITE_CKEDITOR_LICENSE_KEY || 'GPL',
        plugins: [Essentials, Paragraph, Comments, CloudServices, TrackChanges, RevisionHistory, RealTimeCollaborativeComments, RealTimeCollaborativeEditing, RealTimeCollaborativeRevisionHistory, RealTimeCollaborativeTrackChanges, PresenceList],
        toolbar: ['undo', 'redo', 'trackChanges', 'revisionHistory', 'comment', 'commentsArchive'],
        cloudServices: {
            tokenUrl: import.meta.env.VITE_CKEDITOR_CLOUD_SERVICES_TOKEN_URL || '',
            webSocketUrl: import.meta.env.VITE_CKEDITOR_CLOUD_SERVICES_WEBSOCKET_URL || ''
        },
        collaboration: {
            channelId: 'hardcoded-single-channel-id' // see https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/context-and-collaboration-features.html#channel-id
        },
        sidebar: { container: document.querySelector('#sidebar') as HTMLElement },
        revisionHistory: {
            editorContainer: document.querySelector('#editor-container') as HTMLElement,
            viewerContainer: document.querySelector('#editor-revision-history') as HTMLElement,
            viewerEditorElement: document.querySelector('#editor-revision-history-editor') as HTMLElement,
            viewerSidebarContainer: document.querySelector('#editor-revision-history-sidebar') as HTMLElement,
            resumeUnsavedRevision: true
        },
        presenceList: { container: document.querySelector('#editor-presence') as HTMLElement },
    })
