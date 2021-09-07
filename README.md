### Fullstack Outbound Calls

#### Frontend

I choose to use Material UI and styled components. While I like Material UI's features like buttons, I also like to just write css (SCSS) code to speed things up. Sorry if it is confusing with all the Container elements.

#### DB/Auth

To streamline this process, I choose Firebase Auth and Firestore. It's an easy way to get things authenticated and stored. DB has rules that only auth'd users can write documents.

#### API/SERVER

Setup some pretty basic express endpoints connecting to the 3rd party APIs. Not much happening back here.

#### Other

Sorry for the lengthy PayAndCall compoenent. I'd normally split something with that much logic up, but I don't have time. I tried to annotate throughout with commenets.

One of the shortcomings I can think of is sorting the contact list from Firestore. I know there is a way to track the index and sort, but I haven't gotten around to that yet. Maybe I'll have a chance later.
