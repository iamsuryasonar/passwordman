## PASSWORDvault
A secure and user-friendly password manager built with React, Node.js, Express and MongoDB. This application helps users store and manage their passwords safely by encrypting sensitive data using AES encryption.

#### Features
**User Authentication:** Secure sign-up and login with hashed passwords.
**AES Encryption:** Passwords are encrypted using the Node.js crypto module for data security.
**Responsive Design:** Fully responsive interface for seamless usage across devices.
**Data Encryption Key (DEK) Storage:** The Data Encryption Key (DEK) is generated once, encrypted, and stored securely for data encryption and decryption.
Tech Stack
**Frontend:** TypeScript, React, Tailwind CSS
**Backend:** Node.js, Express, MongoDB
**Encryption:** AES encryption using Node.js crypto module
**Password Generation:** Generate strong, random passwords to enhance security.(coming soon)

#### Installation
Clone the Repository

```bash
git clone https://github.com/iamsuryasonar/passwordman.git
```

**Change directory to `server` for backend and `client` for frontend.**
#### Install Dependencies

```bash
npm install
```

#### Environment Variables(backend):
Create a .env file in the root directory and add the following environment variables:

```env
PORT=your_server_port
DB_CONNECT=mongodb+srv://username:password@clustername.xsbtfy9.mongodb.net/?retryWrites=true&w=majority
TOKEN_SECRET=your_jwt_secret
```

#### Run the Application

```bash
npm run start
```

#### Project Structure
Backend
```plaintext
├── server
│   ├── middleware        # Middleware functions
│   ├── models            # Database schemas
│   ├── routes            # Routes and Request handlers
│   ├── utilities         # Utility functions
│   ├── validation        # Validation functions
│   ├── index.js          # Entry point
├── .env                  # Environment variables
└── ...
```

Frontend

```plaintext
├── src
│   ├── assets        # Project assets
│   ├── components    # Common components
│   ├── constants     # Project constants
│   ├── pages         # Pages
|	   ├── page_folder        # Page folder
|		   ├── components          # Components
|		   ├── Pagename.tsx        # Page component
│   ├── stores        # Central state (Zustand)
└── ...
```
#### Contributing
Contributions are welcome! Please submit a pull request for any features or fixes.
#### License
MIT License

