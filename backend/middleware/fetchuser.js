var jwt = require('jsonwebtoken');
const JWT_SECRET = '$aadiisagoodboy$'


// function to fetch user from the authtoken
// here its a middleware and at the end we will call next() as to call the next middleware.
const fetchuser = (req,res,next) => {
    // Get the user from the jwt token and add it to req object.
    const token = req.header('auth-token')
    if(!token){ // if token doesnt exists then error
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
    try{ // if token exists then verify its valid aur not with the help of signature.( JWT_SECRET)
        const data = jwt.verify(token,JWT_SECRET)
        req.user = data.user;
        next();   // calls the next middleware (i.e the async functionn in the Route3 in this case.)
    }catch(error){// catch if any error occurs.
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
    
}



module.exports = fetchuser;