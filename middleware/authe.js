const jwt  = require('jsonwebtoken');


function auth(req, res, next) { 
    const token  = req.cookies.token  ; 


    if (!token) {
        return res.redirect('/user/login'); // Changed to redirect instead of JSON response
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the user information to the request object
        next(); // Call the next middleware or route handler
    }
    catch (error) {
        res.redirect('/user/login'); // Changed to redirect instead of JSON response
    }
}

module.exports = auth; // Export the auth middleware function