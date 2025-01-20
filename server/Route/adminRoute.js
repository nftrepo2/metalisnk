
const express = require('express');

const router = express.Router();

const adminController = require('../controllers/adminController');

//************************************* */  Admin Dashboard  routes**********************//

router.get('/adminRoute',adminController.adminPage );

// router.get("/adminnavbarPage", adminController.adminNavbarPage)

router.get('/viewUser/:id',adminController.viewUser );

router.get('/editUser/:id',adminController.editUser );

router.put('/editUser/:id', adminController.editUser_post);

// //************************************* */ All Deposits  routes**********************//

router.get('/allFunding',adminController.allDeposit );

router.get('/viewDeposit/:id',adminController.viewDeposit );

router.get('/editDeposit/:id',adminController.editDeposit);

router.put('/editDeposit/:id',adminController.editDeposit_post );

// //************************************* */ All Widthdrawals  routes**********************//

router.get('/allWidthdrawals',adminController.allWidthdrawal );

router.get('/viewWidthdrawals/:id',adminController.viewWidthdrawal );

router.get('/editWidthdrawals/:id',adminController.editWidthdrawal );
router.put('/editWidthdrawals/:id',adminController.editWidthdrawal_post );

// //************************************* */ All Verification routes**********************//
// router.get('/allUserNft',adminController.allVerification );
// router.get('/viewVerify/:id',adminController.viewVerify);
// router.get('/editVerification/:id',adminController.editVerify);
// router.put('/editVerification/:id',adminController.editVerify_post );

// //************************************* */ All live trades routes**********************//
router.get("/allPlans", adminController.allPlanPage)
router.get("/view-plan/:id", adminController.viewPlanPage)
router.get("/edit-plan/:id", adminController.editPlanPage)
router.put('/edit-plan/:id',adminController.editPlanPage_post);

// //************************************* */ All Nft Search routes**********************//
router.post("/Adminsearch", adminController.allSearchPage)
// router.get("/viewUpgrade/:id", adminController.viewUprgadesPage)
// router.get("/editUpgrade/:id", adminController.editUpgradesPage);
// router.put('/editUpgrade/:id',adminController.editUpgrade_post );

// //************************************* */ All Delete routes**********************//
router.delete('/deleteUser/:id', adminController.deletePage);
router.delete('/deleteDeposit/:id', adminController.deleteDeposit);
router.delete('/deleteWidthdrawal/:id', adminController.deleteWidthdraw)
// router.delete('/deleteVerification/:id', adminController.deleteVerification)
router.delete("/deletePlan/:id", adminController.deletePlan)
// router.delete("/deleteUpgrade/:id", adminController.deleteUpgrade)

module.exports = router;