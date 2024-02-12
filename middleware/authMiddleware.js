// const jwt = require('jsonwebtoken');


// function verifyToken(req, res, next) {
//     const tokena = 'Rg5y$98h4@pX!qL0aP2s#4dS6fG8hJk1';

//     fetch('/login', {
//         headers: {
//             'Authorization': `Bearer ${tokena}`
//         }
//     })
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error('Error:', error));
//     const token = req.header('Authorization');

//     // Check if Authorization header is missing
//     if (!token) {
//         return res.status(401).json({ error: 'Access denied: Missing Authorization header' });
//     }

//     // Check if token is properly formatted
//     if (!token.startsWith('Bearer ')) {
//         return res.status(401).json({ error: 'Access denied: Malformed token' });
//     }

//     // Extract the token (remove 'Bearer ' prefix)
//     const jwtToken = token.slice(7); // Remove 'Bearer ' prefix
//     try {
//         const decoded = jwt.verify(jwtToken, "Rg5y$98h4@pX!qL0aP2s#4dS6fG8hJk1");
//         req.userId = decoded.userId;
//         next();
//     } catch (error) {
//         res.status(401).json({ error: 'Invalid token' });
//     }
// }

// module.exports = verifyToken;
