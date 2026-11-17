# Storage schemas

Initial v1 JSON record contracts using [JSON Schema Draft 2020-12](https://json-schema.org/draft/2020-12/schema). Each schema includes an example.

| Schema | Purpose |
|---|---|
| [AppData](app-data.schema.json) | Complete collection across all handbooks; its `id` is the children's `appDataId`. |
| [Handbook](handbook.schema.json) | One semester's academic context, institution and dates. |
| [Module](module.schema.json) | One course enrolment within a handbook. |
| [Timetable](timetable.schema.json) | A handbook's timetable, referencing its slots. |
| [Slot](slot.schema.json) | Recurring class pattern: module, day, time, venue, weeks and exceptions. |
| [Task](task.schema.json) | Completable work with an optional module and deadline. |
| [Deadline](deadline.schema.json) | Due instant with its original timezone and entered date/time; embedded in a task. |
| [Notebook](notebook.schema.json) | A module's note collection, or the general notebook. |
| [NoteFolder](note-folder.schema.json) | A named folder within a notebook, optionally nested. |
| [Note](note.schema.json) | Authored-note metadata: title, notebook, folder and document reference. |
| [NoteDocument](note-document.schema.json) | Reference to separately stored, mergeable note content; encoding remains open. |
| [Attachment](attachment.schema.json) | A logical uploaded file and its filename. |
| [AttachmentVersion](attachment-version.schema.json) | One immutable file version, including content reference, hash and size. |
| [ContentLink](content-link.schema.json) | An additional connection between modules, tasks, notes or attachments. |
| [Common](common.schema.json) | Reusable definitions for IDs, dates, times and timezones. |

- AppData uses `schemaVersion: 1` and `id`; child records also carry `appDataId`. Optional values are explicit `null`; empty lists use `[]`. Every AppData collection is required, including its single general notebook.
- `appDataId` refers to the enclosing `AppData.id`: the complete local/account data collection across all handbooks, not a handbook or Google account ID. See the [AppData overview](../diagrams/app-data.md).
- `Handbook` encapsulates one semester. Modules use `handbookId`; module notes inherit handbook scope through their notebook/module. Switching handbooks changes the view and preserves older notes. A future all-notes view can query across handbooks. The general notebook remains outside handbook filtering.
- Relationships use IDs. `Timetable.slotIds` represents its list of separately stored slots. Resolved query results are not stored.
- Register all schemas locally by `$id`; `modulo.example` identifiers are not download endpoints. Enable `date`/`date-time` format checking; [format checking is not enabled by default in every validator](https://json-schema.org/understanding-json-schema/reference/string#format).
- See [class diagrams](../diagrams/README.md) for relationships. Storage rules are below.

## Storage rules and remaining contracts

AppData groups current canonical records in flat typed collections; the individual schemas describe each record. Module tasks and the general inbox share `tasks`; module and general notebooks share `notebooks`. Grouping is resolved through IDs rather than duplicate nested records. The aggregate does not select database indexes or Drive publication units, and excludes separate body/binary content and sync/recovery history. Version 1 is the starting contract for the discussed classes; evolve it through explicit migrations before changing persisted meanings.

### Cross-record validation

- Every child record must have `appDataId === AppData.id`. Reject duplicate record IDs, including different objects with the same ID; JSON `uniqueItems` alone only rejects identical items. Resolve IDs within the same dataset. IDs must be globally unique; module codes/names are editable labels. Dataset/account association is managed outside these records.
- Each module belongs to one handbook (one semester); retaking a course creates another module record.
- Each handbook has one timetable. Each slot belongs to exactly one timetable, and its module belongs to that timetable's handbook. Slot membership changes must eventually use the validated sync protocol rather than whole-list LWW.
- `Task.moduleId: null` means intentionally unassigned. A non-null ID that is temporarily unresolved is a different state; partial sync must not silently clear it.
- Each module has one notebook; each dataset has one general notebook (`moduleId: null`). Folder parents and note folders belong to the same notebook. Reject folder cycles. Each note owns one distinct note document.
- Each attachment has at least one local version, which may still await upload. Verify byte size and SHA-256 hash against actual bytes. Versions are immutable. Explicitly re-importing an annotated PDF creates another version.
- Content-link endpoints must exist in the dataset (or remain visibly unresolved during partial sync). Reject self-links and duplicate directed endpoint pairs. Links confer no ownership or cascading deletion.

### Dates and timetable patterns

- Validate real dates, timezones and ordered date ranges. Do not impose one institution's calendar rules globally. Semester dates/context may remain unknown during manual setup.
- A deadline is one atomic value. Resolve omitted input time to `23:59` before persistence; stored times always have minute precision. Confirm that entered date/time in the originating IANA timezone matches the UTC instant, resolving ambiguous/nonexistent local times explicitly. Viewer-timezone changes do not edit it.
- Slots store local times and all seven weekdays. Validate the time range and calculate dated occurrences with the academic calendar; overnight-session semantics need a separate decision before supporting them.
- Week patterns support all, odd, even or explicit positive teaching-week numbers. `weekPattern: null` preserves an unknown pattern requiring review; it does not silently mean all weeks. Validate week numbers against the relevant calendar.
- A date exception cancels a class or overrides its time/location on that date. Overrides may explicitly schedule a class during a break. Require at most one exception per slot/date and validate any replacement time range. A location-only override keeps the ordinary times.
- Category, session type and colour strings do not select a final UI vocabulary or token system. Missing source venue/type/group details remain `null`.

### Content, sync and compatibility

- Note-document and attachment-version `contentRef` values identify separately persisted content. They are not inline base64, device paths or provider-specific IDs. Local and remote locator mappings are separate infrastructure data.
- Note-document schemas currently validate the descriptor only. Editor/CRDT body encoding, updates and recovery history require dedicated contracts after integration selection. Never apply whole-document LWW to those bodies.
- Sync operations, field edit ordering, conflicts, tombstones, reset generations, checkpoints, parsing drafts, academic-calendar records and device caches are outside these initial schemas. Their absence does not remove the agreed reliability requirements; define them before implementing those behaviours.
- AppData alone is not a complete backup: an export/restore package must additionally account for referenced content and its own versioned manifest.
- Save local record changes and their outbound operations atomically. Preserve structured conflict alternatives; keep delete/edit recovery and retention separate from ordinary current records.
- Schemas reject unknown properties and versions. Preserve unsupported incoming payloads separately and request a compatible app version; never strip fields and overwrite newer data.
- Schema validation does not fill defaults, verify references or persist edits. These checks belong at explicit domain/storage boundaries.
