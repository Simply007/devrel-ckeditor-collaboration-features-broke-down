# Breaking Down Collaboration Features in CKEditor Rich Text Editor

- "Collaboration features" means different things to different people
- In document editing context, it's a family of features, not a single capability
- Goal: Break down to the atomic features so you know exactly what you're getting and see their relations and then showcase the possibilities and how they all work together.

![][image1]

- The article is split into 2 main sections Asynchronous and Real-time called usually RTC.
  https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/collaboration.html#real-time-vs-asynchronous-collaboration.

Quote - you should not combine the approaches.

The samples contains part of the premium features \- the license is required.
CTA for trial

## CKEditor Asynchronous Collaboration Features

I will focus on specific features. What they require, what they offer and what they bring you in your workflow.

The main idea behind every feature to show what it does. The common is that you can represent the data in JSON. This should help you to imagine what you need to store in the database when you start using the feature.

Lastly all of the following features offers similar 2 options of store their data:

- A simple “load and save” integration - loads all the data altogether and stores them altogether as well when i.e. user sends the form
- Adapter integration - hook to the entity live cycle that you can react to and store the information about the actions and data - more granular

All of the samples in [Link to the Repository]() are using s simple “load and save” integration and just fo load the data - no save of the data is being implemented.

### Comments

https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/comments/comments.html
https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/comments/comments-integration.html

Basics \- commenting bound to specific content section (incl. images). Comments have replies.

Gotchas:

- Comment block styling
- Require User identification \- mocked in the sample.
- Once the content is gone the comment is in the archive
- `comments.editorConfig` for comments editor config - if not set, warning is in console, and default config is being used

[Show screenshot]

```html
<p>
  Hello
  <comment-start name="ed5f0080a67ce5873dd66a09504e180ed:2dfbc">
  </comment-start>
  world!
  <comment-end name="ed5f0080a67ce5873dd66a09504e180ed:2dfbc"> </comment-end>
</p>
```

```json
[
  {
    "threadId": "ed5f0080a67ce5873dd66a09504e180ed",
    "context": {
      "type": "text",
      "value": "world!"
    },
    "unlinkedAt": null,
    "resolvedAt": null,
    "resolvedBy": null,
    "archivedAt": null,
    "comments": [
      {
        "commentId": "e3d9c9e56f083b1485eb3456e8dd488a7",
        "content": "<p>use CKEditor!</p>",
        "createdAt": "2026-01-19T12:02:19.773Z",
        "authorId": "user-1",
        "attributes": {}
      }
    ],
    "attributes": {}
  }
]
```

### Track Changes

https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/track-changes/track-changes-integration.html
https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/track-changes/track-changes.html

- The functionality can be turned on and off - when off everything works like an editor
- When on the change is being showcased as a diff (these red and green highlights by default). The changes are being tracked as a suggestions
- Track changes needs comment since it is using it's infrastructure for building sa suggestions
  - Track changes as Comments require user Identification
  - I would say if you use Track changes you should allow users to comment on the content, so that they don!t need to do "dummy" changes, just to kick off the conversation
- Very nice feature is previewing
- Suggestion can have comment - if you are wondering how the data among the comments and suggestions are being connected - the suggestion `id` is a comment's thread `threadId`.

```html
<p>Hello
    <suggestion-start name="insertion:e684c7669b45e2da28fefe820b5f03b09:user-1">
    </suggestion-start>
    CKEditor
    <suggestion-end name="insertion:e684c7669b45e2da28fefe820b5f03b09:user-1">
    <suggestion-end>
    <suggestion-start name="deletion:ec8c751661ca38b067e705d0119c1eca9:user-1">
    </suggestion-start>
    world!
    <suggestion-end name="deletion:ec8c751661ca38b067e705d0119c1eca9:user-1">
    </suggestion-end>
</p>
```

```json
  {
    "id": "ec8c751661ca38b067e705d0119c1eca9",
    "type": "deletion",
    "authorId": "user-1",
    "createdAt": "2026-01-19T12:34:28.345Z",
    "hasComments": false,
    "data": null,
    "attributes": {}
  },
  {
    "id": "e684c7669b45e2da28fefe820b5f03b09",
    "type": "insertion",
    "authorId": "user-1",
    "createdAt": "2026-01-19T12:34:28.347Z",
    "hasComments": false,
    "data": null,
    "attributes": {}
  }
```

### Revision History

https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/revision-history/revision-history.html
https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/revision-history/revision-history-integration.html

- Allows to create versions (and name them)
- Offers completely new UI for browsing the versions and highlighting the changes
- Very handy for governance
- Build on the top of track changes which is mainly visible in version changes visualizations.
- In this case I can imagine using versioning without comments and tracking changes only for versioning purposes and have control over the versions - similarly as commits in GIT.
- it does not have any representation in the editor Data - only contains the revisions

Focus on the `diffData` in the second revision
```json
[
  {
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
    "createdAt": "2026-01-19T13:08:42.824Z",
    "attributes": {},
    "fromVersion": 1,
    "toVersion": 1
  },
  {
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
      "createdAt": "2026-01-19T13:13:44.870Z",
      "attributes": {},
      "fromVersion": 1,
      "toVersion": 11
    }
]
```

## CKEditor Real time collaboration features

TBD
Do not combine
Always use wither real-tim collaboration (RTE), or just Asynchronous.
It is possible to [mighrate to RTE](https://ckeditor.com/docs/cs/latest/guides/collaboration/migrating-to-rtc.html#migrating-your-data-to-the-real-time-collaboration).

### Real time collaborative editing

- Minimal step to real time collaboration - allow to edit the same document from 2 and more places.
- By default require CloudServices to handle more ppl working on one document. The document has is's defined ID (`collaboration.channelID`)
- Here you need to decide, how you want to work with the data itself, you can [use Cloud Services only for the collaboration data](https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/real-time-collaboration/real-time-collaboration-integration.html#handling-document-data), or You can use [document storage from CKEditor to take case of everything](https://ckeditor.com/docs/cs/latest/guides/collaboration/document-storage.html). The second option is recommended, I would say it is more convenient and future proved. The only drawback is that you need to send you editor bundle to cloud services, so it might require some time investment for this "chore".
- Can, but does not need to be combined with Presence list, but I would very much recommend it to indicate what ppl are currently working on the document.


### CKEditor Real-time comments, track changes and revision history

And now you can combine.
If you want to see how these can be used together \- try out Builder with interactive preview.
For advanced configuration \- fork the repo and start configuring and customizing yourself\!

In real life you need to finish up with a few decisions/steps. You need to decide what form of Collaboration your workflow needs for what use case (async, or real time) and you need to define how you want to store your data (and collaboration data).

## Checklist for asynchronous features

* [ ] Do you want Asynchronous, or RTE collaboration
  * [ ] Asynchronous - Simple vs. adapter base storage
  * [ ] Real time - Cloud Services document storage vs. Temporary storage
* [ ] Decide the [visual style of the annotations](https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/annotations/annotations.html)

If you are not sure - State ofr RTE report: https://ckeditor.com/insights/collaboration-survey-report-2025/ CTA
