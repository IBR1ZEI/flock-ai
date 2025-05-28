# Flock-AI 🚀

Flock-AI is a bot that integrates with the Flock messaging platform and leverages AI capabilities via the Letta AI API. It enables users and teams to interact with AI directly from Flock chats, automating responses, handling slash commands, and providing asynchronous AI-powered message processing.

---

## ✨ Features
- **Flock Integration:** Listens to Flock events, slash commands, and webhooks.
- **AI Messaging:** Sends user and system messages to Letta AI and returns responses to Flock chats.
- **Async Processing:** Uses Redis and a worker to handle delayed or queued AI responses.
- **User Management:** Adds, deletes, and manages users in a MongoDB database.
- **Admin Controls:** Restricts certain commands to admin users.

---

## ⚡️ Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/IBR1ZEI/flock-ai.git
   cd flock-ai
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
   > **Note:** FlockOS (for Flock API) is outdated in the NPM Registry. See [this issue](https://github.com/flockchat/flockos-node-sdk/issues/6).<br>
   The workaround is to install it manually from [official GitHub](https://github.com/flockchat/flockos-node-sdk):
   1. Install FlockOS to create the dependency.
   2. Download files from GitHub and **replace** them in the corresponding folder under **node_modules**.

3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in required values (MongoDB, Redis, Flock, Letta AI credentials, etc).

---

## ▶️ Usage
- **Start the main server:**
  ```sh
  npm run start
  ```
- **Start the worker (for async AI message processing):**
  ```sh
  npm run worker
  ```
- **Run tests:**
  ```sh
  npm test
  ```

---

## 💡 Tips
1. Create a Flock app at [Flock Developer Portal](https://dev.flock.com/).
2. You can host/test your app from a local machine without external hosting. Flock will require a domain name for Webhook integration. Use [NGROK](https://ngrok.com/) to get a free domain and connect it with your personal IP.
3. Specify your route in Flock App settings as follows:
   - **Event listener:** `https://yoursubdomain.ngrok-free.app/events`
4. To monitor messages in a specific channel, create a webhook at [Flock Webhooks](https://dev.flock.com/webhooks):
   - **Webhook URL:** `https://yoursubdomain.ngrok-free.app/webhook`
5. You can use any AI solution you want, but I used LettaAI. For self-hosted LettaAI:
   - Run LettaAI locally with Docker:
     ```sh
     docker run -p 8080:8080 lettaai/letta:latest
     ```
   - Set `LETTA_BASE_URL` in your `.env` to `http://localhost:8080`.

---

## 📁 Project Structure
```
src/         # Main source code
  ai/       # AI integration, async workers, and message handling
  database/ # MongoDB operations for user management
  flock/    # Flock event handlers, chat methods, and user methods
  utils/    # Utility functions
tests/       # Jest test suites (Created for education purposes, not all functionality is covered)
```

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License
[MIT](LICENSE)
