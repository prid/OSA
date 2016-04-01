# What the project is
The project consists of a page that displays outside events and promotions for Juilliard's students, faculties and staffs. 

The project aims to provide a single place for event/promotion information to be displayed, therefore people can focus on the content of event/promotion information rather than nagivation of finding the information. Meanwhile, a single place for event/promotion information facilitates office assistants to manage ievent/promotion information including but not limited to creating, modifying and deleting.

# Basic Model
The page consists of 2 components:

1. Display of events
2. Display of promotions

Because events and promotions are different to the point that they are not interchangeable, we designate 2 different platforms of storing event and promotion information:
  - Google Calendar for event information
  - Google Spreadsheet for promotion information

## Why we choose the platform we choose
In general, we want to choose a cloud platform that is 

1. Stable to users (Accessible to users 24/7)
2. Scalable to users(to prevent potential attacks or increase of users.)
3. Easily accessible to office assistants (i.e. rich APIs)
4. Highly customizable to office assitants (so the best solution only handles data, not UIs, because UI is up to customization)
  
###Calendar for event information
Google Calendar has the advantage that events stored on Google Calendar naturally inherits the structure that events should have: start time, end time, etc. The advantage is that, the API will naturally fetch events in order we desire: chronological order. Additionally, it's intuitive to manage events: suppose we want to move the time of an event or delete it, we can navigate to it using Google Calendar's native UI and modify it using its natice UI.

###Spreadsheet for promotion information
Because promotion information is static, i.e. each promotion is just like an item in a list. Additionally, we need to sort promotion based on priority, not chronology. Therefore, we choose Google Spreadsheet as the data platform: it is analogous to a giant bulletin. It's relatively intuitive because each row is a promotion. The ordering of promotions inherits the natural ordering of rows.

#Data structure
We encode each event/promotion into a **JSON** object.
##Event
  - Title (Plain text)
  - Date (ISO 8601)
  - Time (ISO 8601)
  - Location (Plain text)
  - Categories (Array of plain text)
  - Description (HTML)
  - Image (optional) (Link)
  - Attachment (optional) (Link)

##Promotion
  - Title (Plain text)
  - Start Date (ISO 8601)
  - End Date (optional) (ISO 8601)
  - Categories (Array of plain text)
  - Description (HTML)
  - Image (optional) (Link)
  - Attachment (optional) (Link)

Since neither Google Calendar nor Google Sheets can store JSON format as it is, we have to store the information differently. 

##Data structure of event on Google Calendar
A Google Calendar event includes the following fields:
  - Title
  - (Start) Date
  - (Start) Time
  - Location
  - Description/notes

Therefore, we **JSON Stringify** the following 
  - Categories (Array of plain text)
  - Description (HTML)
  - Image (optional) (Link)
  - Attachment (optional) (Link)
into the Description/notes field in a Google Calendar event.

For optional fields, we use null to denote lack of corresponding information. This is due to consideration of extendability.

##Data structure of promotion on Google Sheets
Each row is a promotion, and each column designate a field. So the first row (header row) looks like this:

```Title | Start Date | End Date | Categories | Description | Image | Attachment```

#Inner mechanism when the page is opened
Two scripts are running:
  1. Script designated to fetch calendar
  2. Script designated to fetch spreadsheets

Then scripts dealing with transforming raw return into strict JSON format are running, we then have arrays of event objects and promotion objects.

Because Angularjs binds data with view, the view is automatically updated once arrays of event objects and promotion objects are ready.

#Publishing Workflow
