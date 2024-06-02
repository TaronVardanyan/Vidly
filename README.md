<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <h1>Vidly</h1>

  <p>Vidly is an Express application for managing a video rental service. It includes functionalities such as user authentication, video rental management, and more.</p>

  <h2>Features</h2>
  <ul>
    <li><strong>User Authentication</strong>: Secure authentication using JSON Web Tokens and bcrypt for password hashing.</li>
    <li><strong>Data Validation</strong>: Validate data using Joi.</li>
    <li><strong>Database</strong>: Use MongoDB and Mongoose for data storage and manipulation.</li>
    <li><strong>Security</strong>: Enhance security with Helmet.</li>
    <li><strong>Logging</strong>: Log requests and errors using Morgan and debug.</li>
    <li><strong>Views</strong>: Render views using Pug template engine.</li>
  </ul>

  <h2>Getting Started</h2>
  <ol>
    <li><strong>Installation</strong>: Clone the repository and install dependencies.</li>
    <pre><code>git clone https://github.com/TaronVardanyan/vidly.git
cd vidly
bun install
</code></pre>
    <li><strong>Environment Variables</strong>: Set up environment variables. Create a <code>.env</code> file in the root directory and add the necessary configurations (e.g., database URL, JWT secret).</li>
    <li><strong>Development</strong>: Start the development server.</li>
    <pre><code>bun dev
</code></pre>
  </ol>

  <h2>Dependencies</h2>
  <ul>
    <li><code>bcrypt</code>: Password hashing.</li>
    <li><code>config</code>: Application configuration.</li>
    <li><code>debug</code>: Debugging utility.</li>
    <li><code>express</code>: Web framework for Node.js.</li>
    <li><code>fawn</code>: Transactions in MongoDB.</li>
    <li><code>helmet</code>: Security middleware.</li>
    <li><code>joi</code>: Data validation library.</li>
    <li><code>jsonwebtoken</code>: JSON Web Token implementation.</li>
    <li><code>mongodb</code>: MongoDB driver for Node.js.</li>
    <li><code>mongoose</code>: MongoDB object modeling tool.</li>
    <li><code>morgan</code>: HTTP request logger middleware.</li>
    <li><code>nodemon</code>: Utility that monitors for changes and automatically restarts the server.</li>
    <li><code>pug</code>: Template engine.</li>
  </ul>

  <h2>Scripts</h2>
  <ul>
    <li><code>test</code>: Placeholder for running tests (currently not specified).</li>
  </ul>

  <h2>Contributing</h2>
  <p>We welcome contributions to Vidly! To contribute:</p>
  <ol>
    <li>Fork the repository.</li>
    <li>Create a new branch (<code>git checkout -b feature/my-feature</code>).</li>
    <li>Commit your changes (<code>git commit -am 'Add new feature'</code>).</li>
    <li>Push to the branch (<code>git push origin feature/my-feature</code>).</li>
    <li>Create a new Pull Request.</li>
  </ol>

  <h2>License</h2>
  <p>This project is licensed under the <a href="LICENSE">ISC License</a>.</p>
</body>
</html>
