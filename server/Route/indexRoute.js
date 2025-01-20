const express = require("express");

const router = express.Router();

const { homePage, aboutPage, explorePage, registerPage,register_post, loginPage,login_post, loginAdmin,logout_get } = require("../controllers/userController");
// const { loginAdmin_post } = require("../controllers/adminController");

router.get("/", homePage);

router.get("/about", aboutPage);

router.get("/explore", explorePage);


router.get("/register", registerPage);
router.post('/register',register_post);

router.get("/login", loginPage);
router.post('/login',login_post);

router.get('/loginAdmin', loginAdmin);
// router.post('/loginAdmin', loginAdmin_post)

router.get('/logout', logout_get)









module.exports = router;