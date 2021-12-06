
const { verify } = require('jsonwebtoken');

const validateToken = ( req, res, next ) => {
    const accessToken = req.header("accessToken"); // obtendo através dos headers

    if(!accessToken){
        return res.json({ error: "User not logged in." })
    }

    try {
        const validToken = verify(accessToken, "importantsecret")
        req.user = validToken; // o validToken é composto pelo username logado e seu id
        if(validToken){
            return next(); 
        }
    } catch (err) {
        return res.json({ error: err });
    }

}

module.exports = { validateToken }