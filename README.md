How to build and run this project:
1. install node.js  
2. run "npm install" in both the root directly and ./frontend/ directory  
3. run "npm run dev" in root directory for backend server
4. run "npm run dev" in ./frontend/ for frontend server
5. Please make an .env file in the root directory and refer to the .env.example file to see what variables are needed for full functionality.
   -   sites to refer to:
      -    https://developer.spotify.com/documentation/web-api
      -    https://www.mongodb.com/
      -    https://console.cloud.google.com/  
Note: You should be able to access all of this, except for our specific MongoDB database, which we did not disclose in .env.example due to security reasons. Please reach out to one of us if you would like to access it.
7. to enable AI chatbot feature:
   - create ".env" file in the "./frontend/" directory
   - create OpenAI API key: https://platform.openai.com/account/api-keys
   - add your OpenAI API key in ".env": VITE_OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

Libraries/Packages (can get these from the instructions above):

Backend
- MongoDB
- Mongoose
- Express 
- Node.js  
- dotenv  
- cors
- BcryptJS
- Nodemon

Frontend
- React
- Material UI  
- React Full Calendar  
- React Router DOM
- React Draggable
- dnd kit
- JSON Web Token
- axios

Authentication/OAuth
- Google Auth Library
