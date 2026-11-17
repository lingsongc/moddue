# Class diagrams

- [AppData overview](app-data.md): collection and handbook hierarchy.
- [Academic structure and tasks](academic.md): handbooks, modules, timetable slots and deadlines.
- [Notes and attachments](notes.md): notebooks, folders, authored documents and file versions.
- [Records and shared queries](records-and-queries.md): stored IDs and resolved read models.

The AppData, academic and notes diagrams show domain associations, not object pointers or database fields. The records/query diagram shows the selected ID-based representation. Storage fields are defined in [schemas](../schemas/README.md).

`0..1` means optional; `0..*` means any number. Composition (`*--`) expresses ownership, not immediate physical deletion of recovery data. Fields shown are intentionally partial.
