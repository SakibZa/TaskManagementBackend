const client = require("../schema/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

module.exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const checkUser = await client.query("SELECT * FROM users WHERE email = $1", [email]);
    if (checkUser.rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
    const values = [name, email, hashedPassword];

    const result = await client.query(query, values);
    const user = result.rows[0];

    
    const accessToken = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "7d" });

    
    await client.query("UPDATE users SET refresh_token = $1 WHERE id = $2", [refreshToken, user.id]);

    res.status(201).json({ message: "User registered successfully!", accessToken, refreshToken });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userResult = await client.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate access token and refresh token
    const accessToken = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "7d" });

    // Store refresh token in the database
    await client.query("UPDATE users SET refresh_token = $1 WHERE id = $2", [refreshToken, user.id]);

    res.json({ message: "Login successful!", accessToken, refreshToken });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: "Refresh token is required" });
    }
    const decoded = jwt.verify(refreshToken, SECRET_KEY);

   
    const userResult = await client.query("SELECT * FROM users WHERE id = $1 AND refresh_token = $2", [decoded.id, refreshToken]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: "Invalid refresh token" });
    }


    const accessToken = jwt.sign({ id: decoded.id, email: decoded.email }, SECRET_KEY, { expiresIn: "15m" });

    res.json({ message: "Access token refreshed successfully!", accessToken });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};