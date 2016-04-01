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
  
##Calendar for event information
Google Calendar has the advantage that events stored on Google Calendar naturally inherits the structure that events should have: start time, end time, etc. The advantage is that, the API will naturally fetch events in order we desire: chronological order. Additionally, it's intuitive to manage events: suppose we want to move the time of an event or delete it, we can navigate to it using Google Calendar's native UI and modify it using its natice UI.
