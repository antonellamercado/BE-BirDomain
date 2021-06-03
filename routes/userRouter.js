const router = require ("express").Router();
const User = require("../models/userModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
// router.get("/test", (req,res)=> {
//     res.send("Working")
// });


router.post("/register", async (req, res) => {
    try {
    let {email, password, passwordCheck, displayName} = req.body;

    //validation display name not req

    if (!email || !password || !passwordCheck)
    return res.status(400).json({ msg: "Falta ingresar campos" });
  if (password.length < 8)
    return res
      .status(400)
      .json({ msg: "La contrasena debe tener al menos 8 caracteres" });
  if (password !== passwordCheck)
    return res
      .status(400)
      .json({ msg: "Ambas contrasenas deben coincidir" });

  const existingUser = await User.findOne({ email: email });
  if (existingUser)
    return res
      .status(400)
      .json({ msg: "Este email ya esta siendo utilizado" });

  if (!displayName) displayName = email;

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = new User({
    email,
    password: passwordHash,
    displayName,
  });
  const savedUser = await newUser.save();
  res.json(savedUser); //usado por el frontend 
} catch (err) {
  res.status(500).json({ error: err.message });
}
});

router.post ("/login", async (req,res) => {
    try{
        const {email,password} = req.body;
        //validate
        if (!email || !password)
        return res
        .status(400)
        .json({ msg: "Deben ingresarse todos los campos" });
      const user = await User.findOne({ email: email });
      if (!user)
        return res
          .status(400)
          .json({ msg: "No existe una cuenta con este email" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "El usuario o contraseña provistos no coinciden" });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); //jwt es encoded para recuperar id del usuario logueado
      res.json({
        token,
        user: {
          id: user._id,
          displayName: user.displayName,
          favs: user.favs,
          buys:user.buys,
        },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  ////////////////
  router.post ("/getTokenNP", async (req,res) => {
    try{
        const {email} = req.body;
        if (!email)
        return res
        .status(400)
        .json({ msg: "Deben ingresarse todos los campos" });
      const user = await User.findOne({ email: email });
      if (!user)
        return res
          .status(400)
          .json({ msg: "No existe una cuenta con este email" });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); //jwt es encoded para recuperar id del usuario logueado
      res.json({
        token,
        user: {
          id: user._id,
          displayName: user.displayName,
          favs: user.favs,
          buys:user.buys,
        },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  //solo corra cundo el usuario esta login y validado por jwt pasa por auth 

 router.delete("/delete", auth, async (req, res) => {
    try {
       const deletedUser = await User.findByIdAndDelete(req.user);
       res.json(deletedUser);
     } catch (err) {
      res.status(500).json({ error: err.message });
     }
   });
  
   //no es una ruta privada solo nos dice si esta logueado o no 
  // lo usamos en el frontend para verificar si esta logueado o no

   router.post("/tokenIsValid", async (req, res) => {
     try {
       const token = req.header("x-auth-token");
      if (!token) return res.json(false);
  
       const verified = jwt.verify(token, process.env.JWT_SECRET);
       if (!verified) return res.json(false);
  
       const user = await User.findById(verified.id);
      if (!user) return res.json(false);
  
      return res.json(true);
     } catch (err) {
       res.status(500).json({ error: err.message });
     }
   });
  
   //cuando el usuario esta logueado recibimos el usuario
   router.get("/", auth, async (req, res) => {
     const user = await User.findById(req.user);
   //no devolvemos la app solo lo que necesitamo
     res.json({
       displayName: user.displayName,
       id: user._id,
       img:user.img,
       favs:user.favs,
       buys:user.buys,
     });
   });

  router.put("/:id", async (req, res, next) => {
    try {
        const buy = await User.findOneAndUpdate({_id: req.params.id}, req.body, {
            new: true
        })
        res.json(buy);
    } catch (error) {
        console.log(error);
        next();
    }
  });
////////////
router.post("/changePass", async (req, res) => {
  try {
    let {password, passwordCheck} = req.body;
    if (!password || !passwordCheck)
      return res.status(400).json({ msg: "Falta ingresar campos" });
    if (password.length < 8)
    return res
      .status(400)
      .json({ msg: "La contrasena debe tener al menos 8 caracteres" });
    if (password !== passwordCheck)
    return res
      .status(400)
      .json({ msg: "Ambas contrasenas deben coincidir" });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newPass =({password: passwordHash});
    res.json(newPass); //usado por el frontend 
  } catch (err) {
      res.status(500).json({ error: err.message });
    }
});
module.exports = router;