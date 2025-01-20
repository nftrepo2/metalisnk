const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');



router.get('/dashboard',userController.dashboardPage);



router.get('/profile',userController.accountPage);
router.put('/account-settings/:id',userController.accountPage_post);
// router.get('/editProfile',userController.editProfilePage);


router.get("/createNFT", userController.createNFTPage);
router.post("/createNFT/:id", userController.createNFTPage_post);
router.get('/mynfts/:id',userController.myNftPage);

router.get('/viewBid', userController.viewBidNFT );
router.post('/viewBid/:id',userController.viewBidNFT_post )

router.get('/bids/:id', userController.viewBidHistory );


router.get('/categories/:id', userController.exploreCategoriesById);

router.post('/search', userController.searchRecipe);

router.get('/add-fund', userController.depositPage);
router.post('/deposit/:id', userController.depositPage_post);
router.get('/depositHistory/:id',userController.depositHistory);

router.get('/widthdraw',userController.withdrawFundPage);
router.post('/widthdraw/:id',userController.widthdrawPage_post);
router.get('/withdrawals/:id',userController.widthdrawHistory);



module.exports = router;