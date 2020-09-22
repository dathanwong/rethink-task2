# Rethink Task 2
## How To Use
1. Make sure to npm install from the client folder and the top level folder
2. Navigate to the server folder and run node server.js to start the server
3. Navigate to the client folder and run npm start to start the frontend
## Backend Limitations
Currently the backend only supports data with a name property but this can be easily scaled out to include more data or different kinds of data. To add data to the database, send a POST request to localhost:8000/api/data with a body that has a "name" key. Forgetting to add data with the name key will break the frontend.
## Notes
Server uses a Trie data structure to store the data to make the autocomplete feature more performant instead of having to query all of the data from the database on each typed character. Trie data structure implemented using the trie-search library https://www.npmjs.com/package/trie-search. Results are served up on the home page using pagination so that millions of rows of data are not loaded onto the page all at once.
