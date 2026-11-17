# Academic structure and tasks

One timetable spans the selected handbook (one semester). Each slot references a module in that semester. Dated occurrences use academic-calendar rules, whose detailed class model remains open. Foreign-key fields are omitted from this domain view.

```mermaid
classDiagram
    class Handbook {
        id
        name
        academicYear
        institution
        programmeOrLevel
        startDate
        endDate
    }
    class Module {
        id
        code
        name
        colour
    }
    class Timetable {
        id
        slots List~Slot~
    }
    class Slot {
        id
        weekday
        startTime
        endTime
        timezone
        location
        sessionType
        classNumber
        weekPattern
        dateExceptions
    }
    class Task {
        id
        title
        category
        completed
    }
    class Deadline {
        instant
        originalTimezone
        enteredDate
        enteredTime
    }
    Handbook "1" -- "0..*" Module : contains
    Handbook "1" -- "1" Timetable : has
    Timetable "1" *-- "0..*" Slot : contains
    Module "1" -- "0..*" Slot : schedules
    Module "0..1" -- "0..*" Task : contextualises
    Task "1" *-- "0..1" Deadline : has
```
