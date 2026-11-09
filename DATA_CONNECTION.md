# UniRide data connection

The Arabic and English Excel workbooks are the source datasets. `data.js` is the browser-ready normalized data layer generated from the same record IDs, so the static website can run without a server.

The application uses localStorage for live browser actions such as seat reservations, complaints, route assignment requests, announcements, driver availability, delays, incidents, settings, and activity. Transport Staff can export the current browser records as CSV.

For a deployed production system, replace `data.js`/localStorage reads and writes with API calls to a database. The UI and record IDs can stay the same.
