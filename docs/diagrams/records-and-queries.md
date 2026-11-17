# Records and shared queries

Records store IDs; shared queries assemble related records for components. `TaskDetails` is a derived read model, not a stored/synced entity or an automatically persisted object graph. Query refresh/subscription APIs remain open. See the schemas for complete current storage fields.

```mermaid
classDiagram
    class TaskRecord {
        schemaVersion
        id
        appDataId
        moduleId optional
        title
        category
        completed
        deadline optional
    }
    class ModuleRecord {
        schemaVersion
        id
        appDataId
        handbookId
        code
        name
        colour
    }
    class TaskDetails {
        task TaskRecord
        module ModuleRecord optional
    }
    class TaskQueries {
        getDetails(taskId) TaskDetails
    }
    TaskRecord ..> ModuleRecord : references by moduleId
    TaskDetails --> TaskRecord : task
    TaskDetails --> ModuleRecord : resolved module
    TaskQueries ..> TaskDetails : assembles
```
