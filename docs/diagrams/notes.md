# Notes and attachments

Module notebooks and their notes belong to the module's handbook; selecting another handbook changes which module notes are shown. Older notes remain stored for a future all-notes view. The general notebook has no module and remains outside handbook filtering. Root notes/folders and nested folders are supported; all parent relationships stay within one notebook and folder cycles are invalid. Files can also link to modules/tasks. Document content is conceptual; storage currently uses a separate content reference pending editor selection.

```mermaid
classDiagram
    class Handbook
    class Module
    class Notebook {
        id
        name
    }
    class NoteFolder {
        id
        name
    }
    class Note {
        id
        title
    }
    class NoteDocument {
        id
        content
    }
    class Attachment {
        id
        filename
    }
    class AttachmentVersion {
        id
        mimeType
        byteSize
        contentHash
        createdAt
    }
    Handbook "1" -- "0..*" Module : contains
    Module "0..1" -- "1" Notebook : has
    Notebook "1" -- "0..*" NoteFolder : contains
    Notebook "1" -- "0..*" Note : contains
    NoteFolder "0..1" -- "0..*" NoteFolder : parent of
    NoteFolder "0..1" -- "0..*" Note : organises
    Note "1" *-- "1" NoteDocument : has
    Note "0..*" -- "0..*" Attachment : references
    Attachment "1" *-- "1..*" AttachmentVersion : has
```
