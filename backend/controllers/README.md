## 🎮 Controllers Folder

**What is this?**
This folder contains the "brains" or "business logic" of your application. 

**What goes here?**
When a user hits a route (like `/api/auth/register`), the route sends the request here. The controller will:
1. Read the data the user sent (`req.body`).
2. Talk to the database (using files from the `models` folder).
3. Send a response back to the user (`res.json()`).