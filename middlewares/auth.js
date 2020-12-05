const jwt = require ("jsonwebtoken")

const auth = (req, res, next) => {
//obtener token del headr
try {
const token = req.header("x-auth-token");
if (!token)
return res.status(401).json({msg: "no existe el token"});

const verified = jwt.verify(token, process.env.JWT_SECRET)

if (!verified)
return res.status(401).json({msg: "verificacion fallo"});

req.user = verified.id; //obtenemos el id del req
next();
} catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;