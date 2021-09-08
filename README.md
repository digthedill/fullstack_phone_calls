## Fullstack Outbound Calls

#### Frontend

I choose to use Material UI and styled components. While I like Material UI's features like buttons, I also like to just write css (SCSS) code to speed things up. Sorry if it is confusing with all the Container elements.

#### DB/Auth

To streamline this process, I choose Firebase Auth and Firestore. It's an easy way to get things authenticated and stored. DB has rules that only auth'd users can write documents.

#### API/SERVER

Setup some pretty basic express endpoints connecting to the 3rd party APIs. Not much happening back here.

#### Other

Sorry for the lengthy PayAndCall component. I split the lengthy api calls into seperate files so it might be easier to read.

One of the shortcomings I can think of is sorting the contact list from Firestore. I tried to query by a firestore timestamp and by the name query. The issue was that it wasn't working in real time with firestore's onSnapshot function.

Would have liked to authenticate user with firbase in the backend using the admin sdk.
