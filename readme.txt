Getting started: 

To use this demo API, run npm start and use the following routes assuming default port is not overriden: 

(POST) localhost:3000/user 
{
    "email": "example@example.com",
    "password": "examplepass",
    "phone": "123-123-1234"
}

(POST) localhost:3000/event
{
    "userEmail": "exampl@example.com",
    "type": "LOGIN"
}

(GET) localhost:3000/event
    This will return all events.

(GET) localhost:3000/event/today
    This will return all events for today.

(GET) localhost:3000/event/user/example@example.com
    This will return all events for the user identified by the email passed in the URL. 


Future/Further Thoughts: 

In a production environment this would not be secure with out an authentication/authorization scheme and 
storing the users password could be a potential liabillity. Also, I took a bit of artistic liscense with the 
requirments pertainint to the expected JSON payload for creating an event as there was no way to relate a user
to an event without the users email address. On a non-demo project I would have reached out for clarification 
to ensure that I fully understood the intent. 