function authorize(allowedDomain) {
    return (req, res, next) => {
        const user = req.body;

        let allowed = false;

        let userEmail = user.emailId;

        userEmail = userEmail.split('@');

        if(userEmail[1] === allowedDomain) {
            allowed = true;
        }

        if(!allowed) {
            return res.status(400).json({message: 'Invalid User Email and Password!'});
        }

        next();
    }
}


module.exports = authorize;