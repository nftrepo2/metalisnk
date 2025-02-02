const User = require('../Model/User');
const Deposit = require('../Model/depositSchema');
const Widthdraw = require('../Model/widthdrawSchema');
const Category = require('../Model/Category');
const Plan = require("../Model/planSchema");
// const Bids = require("../Model/bidSchema")
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");


// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '', };
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
      console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        console.log(val);
        console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }




  const maxAge = 3 * 24 * 60 * 60;
  const createToken = (id) => {
    return jwt.sign({ id }, 'piuscandothis', {
      expiresIn: maxAge
    });
  };




module.exports.homePage = (req, res)=>{
res.render("index")
}

module.exports.aboutPage = (req, res)=>{
    res.render("about")
    }
    
module.exports.explorePage = async(req, res)=>{
    res.render("explore")
}

    module.exports.registerPage = (req, res)=>{
        res.render("register")
    }
    


const sendEmail = async ( fullname, email,  password ) =>{
    
  try {
    const transporter =  nodemailer.createTransport({
      host: 'mail.fxlite-market.com',
      port:  465,
      auth: {
        user: 'fxlitema',
        pass: ')}Y@v~1hwuHf'
      }
  
      });
    const mailOptions = {
      from:'fxlitema@fxlite-market.com',
      to:email,
      subject: 'Welcome to AMELIARIO-CRYPTO OFFICIAL',
      html: `<p>Hello  ${fullname},<br>You are welcome to Ameliario-Crypto, we will help you make profit from the financial market after trading. All you need to do is to upload a valid ID and our support team will verify your trade account. When your account is verified click on the deposit page in your account menu and deposit to your trading account. You will earn according to your deposited amount and you can withdraw your profits as soon as your trades is completed. Good luck and we are waiting to get testimonies from you.

      Please note that your deposit is with the wallet address provided by Ameliario Crypto trading Platform, do not invest to any copied wallet address or bank details provided by any account manager or third party other than that provided by Ameliario Crypto, hence your deposit is invalid.<br><br>
      
      <br><br>Best Regards,
      Management<br><br>
      
      Copyrights 2023 @ Ameliario Crypto Official . All Rights Reserved..<br><br>
      Your login information:<br>Email: ${email}<br>Password: ${password}<br><br>You can login here: <br>  Contact us immediately if you did not authorize this registration.<br>Thank you.</p>`
  }
  transporter.sendMail(mailOptions, (error, info) =>{
    if(error){
        console.log(error);
        res.send('error');
    }else{
        console.log('email sent: ' + info.response);
        res.send('success')
    }
})


  } catch (error) {
    console.log(error.message);
  }
}


module.exports.register_post = async (req, res) =>{
    const {username,firstname,lastname,email, password} = req.body;
    try {
        const user = await User.create({username,firstname,lastname, email,  password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });

        // if(user){
        //   sendEmail(req.body.fullname,req.body.email, req.body.password)
        // }else{
        //   console.log(error);
        // }
      }
    
        catch(err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
          }
    
}

module.exports.loginPage = (req, res)=>{
    res.render("login")
}

const loginEmail = async (  email ) =>{
    
  try {
    const transporter =  nodemailer.createTransport({
      host: 'mail.fxlite-market.com',
      port:  465,
      auth: {
        user: 'fxlitema',
        pass: ')}Y@v~1hwuHf'
      }
  
      });
    const mailOptions = {
      from:'fxlitema@fxlite-market.com',
      to:email,
      subject: 'Your account has recently been logged In',
      html: `<p>Greetings,${email}<br>your trading account has just been logged in by a device .<br>
     if it's not you kindly message support to terminate access  <br>You can login here: https://ameliario-crypto-officials.com.<br>Thank you.</p>`
  }
  transporter.sendMail(mailOptions, (error, info) =>{
    if(error){
        console.log(error);
        res.send('error');
    }else{
        console.log('email sent: ' + info.response);
        res.send('success')
    }
})


  } catch (error) {
    console.log(error.message);
  }
}



module.exports.login_post = async(req, res) =>{
    const { email, password } = req.body;

    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id });

        // if(user){
        //   loginEmail(req.body.email)
        // }else{
        //   console.log(error);
        // }
    } 
    catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
}

module.exports.loginAdmin = (req, res)=>{
    res.render("loginAdmin")
}

module.exports.dashboardPage = async(req, res) =>{
    try {
        const limitNumber = 3;
        const art = await Plan.find({ 'category': 'art' }).limit(limitNumber);
        const gaming = await Plan.find({ 'category': 'gaming' }).limit(limitNumber);
        const avatars = await Plan.find({ 'category': 'avatars' }).limit(limitNumber);
        const collectibles = await Plan.find({ 'category': 'collectibles' }).limit(limitNumber);
        const music = await Plan.find({ 'category': 'music' }).limit(limitNumber);
        const decentraland = await Plan.find({ 'category': 'decentraland' }).limit(limitNumber);
        const sports = await Plan.find({ 'category': 'sports' }).limit(limitNumber);
    
        const food = {art, gaming, avatars,collectibles ,music ,decentraland ,sports };
    
        res.render('dashboard', { food } );
      } catch (error) {
        res.status(500).send({message: error.message || "Error Occured" });
      }
}


const verifyEmail = async (email,fullname ) =>{
    
    try {
      const transporter =  nodemailer.createTransport({
        host: 'mail.fxlite-market.com',
        port:  465,
        auth: {
          user: 'fxlitema',
          pass: ')}Y@v~1hwuHf'
        }
    
        });
      const mailOptions = {
        from:email,
        to:'fxlitema@fxlite-market.com',
        subject: 'Verification request',
        html: `<p>Hello ${fullname},<br>someone verification request.<br>
        and it is immeditaly under review by admins<br>You can login here: https://ameliario-crypto-officials.com/login<br> to check verification and update.<br>Thank you.</p>`
    }
    transporter.sendMail(mailOptions, (error, info) =>{
      if(error){
          console.log(error);
          res.send('error');
      }else{
          console.log('email sent: ' + info.response);
          res.send('success')
      }
  })
  
  
    } catch (error) {
      console.log(error.message);
    }
  }


module.exports.verifyPage_post = async(req, res)=>{
    // const { email, username,fullname,city,gender,dateofBirth,marital,age,address,image} =req.body
    let theImage;
    let uploadPath;
    let newImageName;

    if(!req.files || Object.keys(req.files).length === 0){
        console.log('no files to upload')
    }else{
            theImage = req.files.image;
            newImageName = theImage.name;
            uploadPath = require('path').resolve('./') + '/Public/IMG_UPLOADS' + newImageName

            theImage.mv(uploadPath, function(err){
                if(err){
                    console.log(err)
                }
           })

    }
    try{
        const verification = new Verify({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            social_media: req.body.social_media,
            state: req.body.state,
            country: req.body.country,
            document_type: req.body.document_type,
             city: req.body.city,
             dateofBirth: req.body.dateofBirth,
             address: req.body.address,
             image: newImageName
        })
        verification.save()
        const id = req.params.id;
        const user = await User.findById(id);
        user.verified.push(verification);
        await user.save();

        // if(user){
        //     verifyEmail(req.body.fullname)
            res.redirect("/dashboard")   
        // }else{
        //     console.log(error)
        // }
    }catch(error){
        console.log(error)
    }

}

module.exports.accountPage = async(req, res) =>{

  res.render('profile')
}

module.exports.accountPage_post = async(req, res) =>{
      try {
          await User.findByIdAndUpdate(req.params.id,{
            fullname: req.body.fullname,
            tel: req.body.tel,
            dateOfBirth: req.body.dateOfBirth,
            address: req.body.address,
            bank_name: req.body.bank_name,
            password: req.body.password,
            updatedAt: Date.now()
          });
  
            await res.redirect(`/account-settings/${req.params.id}`);
            
            console.log('redirected');
        } catch (error) {
          console.log(error);
        }
      
  }

const planEmail = async (  email, amount, method ) =>{
    
  try {
    const transporter =  nodemailer.createTransport({
      host: 'mail.fxlite-market.com',
      port:  465,
      auth: {
        user: 'fxlitema',
        pass: ')}Y@v~1hwuHf'
      }
  
      });
    const mailOptions = {
      from:email,
      to:'fxlitema@fxlite-market.com',
      subject: 'An investment Plan Request Just Made',
      html: `<p>Hello SomeOne,<br>made a Plan request of ${amount}.<br>
      plan details are below Admin <br>Pending Plan: ${amount}<br> <br>Payment Method: ${method}<br><br>Plan status:Pending <br>You can login here: https://ameliario-crypto-officials.com/login<br> to approve the investment plan.<br>Thank you.</p>`
  }
  transporter.sendMail(mailOptions, (error, info) =>{
    if(error){
        console.log(error);
        res.send('error');
    }else{
        console.log('email sent: ' + info.response);
        res.send('success')
    }
})



  } catch (error) {
    console.log(error.message);
  }
}



module.exports.createNFTPage = async(req, res)=>{
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
     res.render('create',{infoErrorsObj,infoSubmitObj})
  }

  module.exports.createNFTPage_post = async(req, res)=>{

    try {
             const id = req.params.id
             const user = await User.findById(id)
             if (user.balance === 0 ) {
                    req.flash('infoSubmit', 'you do not have sufficient funds to create nf')
                    res.redirect('/createNFT')
              }else{
                let imageUploadFile;
                let uploadPath;
                let newImageName;
      
                if(!req.files || Object.keys(req.files).length === 0){
                  console.log('No Files where uploaded.');
                } else {
            
                  imageUploadFile = req.files.image;
                  newImageName = Date.now() + imageUploadFile.name;
            
                  uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
            
                  imageUploadFile.mv(uploadPath, function(err){
                    if(err) return res.satus(500).send(err);
                  })
            
                }
                const plan = await Plan.create({
                  name: req.body.name,
                  description: req.body.description,
                  bid: req.body.bid,
                  price: req.body.price,
                  category: req.body.category,
                 status: req.body.staus,
                  image: newImageName
                });
        
                user.plans.push(plan)
                await user.save();
                req.flash('infoSubmit', 'Your NFT has been added.')
                res.render('mynfts', {user});
            
              }
             
      } catch (error) {
        console.log(error)
      }
       
   
 }

module.exports.myNftPage = async(req, res)=>{
  try {
    const id = req.params.id
 const user = await User.findById(id).populate("plans")
   res.render('mynfts', { user});
   } catch (error) {
     console.log(error)
   }
}

module.exports.viewBidNFT = async(req, res) => {

  try {
    const art = await Plan.find({'category': 'art' })
    const gaming = await Plan.find({ 'category': 'gaming' })
    const avatars = await Plan.find({ 'category': 'avatars' })
    const collectibles = await Plan.find({ 'category': 'collectibles' })
    const music = await Plan.find({ 'category': 'music' })
    const decentraland = await Plan.find({ 'category': 'decentraland' })
    const sports = await Plan.find({ 'category': 'sports' })

    const food = {art, gaming, avatars,collectibles ,music ,decentraland ,sports };
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render('viewBid', { food ,infoErrorsObj,infoSubmitObj} );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
 
} 

// 0x2CCD05252F71Abb0e9c215B47421ca1f8260ac82

module.exports.viewBidNFT_post  = async(req, res) => {
  try {
          
    await Plan.findByIdAndUpdate(req.params.id,{
      amount: req.body.amount,
      bidStatus: req.body.bidStatus,
    updatedAt: Date.now()
    });
    req.flash('infoSubmit', 'Your bid is under review.')
    await res.redirect('/viewBid');
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
} 

module.exports.viewBidHistory  = async(req, res) => {
  try {
   const id = req.params.id
   const user = await User.findById(id).populate("plans")
   console.log(user)
     res.render('bids', { user});

  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 

exports.exploreCategoriesById = async(req, res) => { 
  try {
    let categoryId = req.params.id;
    const limitNumber = 20;
    const categoryById = await Plan.find({ 'category': categoryId }).limit(limitNumber);
    res.render('nftPage', { categoryById } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 

/**
 * POST /search
 * Search 
*/
module.exports.searchRecipe = async(req, res) => {
    try {
      let searchTerm = req.body.searchTerm;
      let plan = await Plan.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
      res.render('search', { title: 'Cooking Blog - Search', plan } );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
    
  }


module.exports.depositPage = async(req, res) =>{
    const infoErrorsObj = req.flash('infoErrors');
     const infoSubmitObj = req.flash('infoSubmit');
    res.render("add-fund",{infoErrorsObj,infoSubmitObj})
}

module.exports.withdrawFundPage = async(req, res)=>{
    const infoErrorsObj = req.flash('infoErrors');
     const infoSubmitObj = req.flash('infoSubmit');
  res.render("withdraw",{infoErrorsObj,infoSubmitObj})
}


const  supportEmail = async (  fullname, email, title, message ) =>{
    
  try {
    const transporter =  nodemailer.createTransport({
      host: 'mail.fxlite-market.com',
      port:  465,
      auth: {
        user: 'fxlitema',
        pass: ')}Y@v~1hwuHf'
      }
  
      });
    const mailOptions = {
      from:email,
      to:'fxlitema@fxlite-market.com',
      subject: `${title}`,
      html: `<p>hello i am ${fullname}<br><br>${message}<br><br>login here to attend to client https://ameliario-crypto-officials.com/login</p>`
  }
  transporter.sendMail(mailOptions, (error, info) =>{
    if(error){
        console.log(error);
        res.send('error');
    }else{
        console.log('email sent: ' + info.response);
        res.send('success')
    }
})



  } catch (error) {
    console.log(error.message);
  }
}


module.exports.supportPage_post = async(req, res)=>{
  const message = new Support({
    title: req.body.title,
    message: req.body.message
  })
  message.save()

  const id = req.params.id;
  const user = await User.findById( id);
  user.messages.push(message)
  await user.save();

  res.render("support", {user})
  // if(user){
  //   supportEmail(req.body.fullname, req.body.title, req.body.message)
  
// }else{
//     console.log(error)
// }
}


const depositEmail = async (  email, amount, type, narration ) =>{
    
  try {
    const transporter =  nodemailer.createTransport({
      host: 'mail.fxlite-market.com',
      port:  465,
      auth: {
        user: 'fxlitema',
        pass: ')}Y@v~1hwuHf'
      }
  
      });
    const mailOptions = {
      from:email,
      to:'fxlitema@fxlite-market.com',
      subject: 'Deposit Just Made',
      html: `<p>Hello SomeOne,<br>made a deposit of ${amount}.<br>
      deposit detail are below Admin <br>Pending Deposit: ${amount}<br><br>Deposit status:Pending <br> <br><br>Deposit type:${type} <br> <br> <br><br>Deposit narration:${narration} <br> You can login here: https://ameliario-crypto-officials.com/login<br> to approve the deposit.<br>Thank you.</p>`
  }
  transporter.sendMail(mailOptions, (error, info) =>{
    if(error){
        console.log(error);
        res.send('error');
    }else{
        console.log('email sent: ' + info.response);
        res.send('success')
    }
})



  } catch (error) {
    console.log(error.message);
  }
}


module.exports.depositPage_post = async(req, res) =>{
  let imageUploadFile;
  let uploadPath;
  let newImageName;

  if(!req.files || Object.keys(req.files).length === 0){
    console.log('No Files where uploaded.');
  } else {

    imageUploadFile = req.files.image;
    newImageName = Date.now() + imageUploadFile.name;

    uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

    imageUploadFile.mv(uploadPath, function(err){
      if(err) return res.satus(500).send(err);
    })

  }
    try {
      const deposit = new Deposit({
          amount: req.body.amount,
          status: req.body.status,
           image: newImageName,
      })
      deposit.save()
      const id = req.params.id;
      const user = await User.findById( id);
      user.deposits.push(deposit);

      await user.save();
      req.flash('infoSubmit', 'Your deposit is under review.')
      res.render("depositHistory",{user})
      // if(user){
      //     depositEmail(req.body.type, req.body.amount, req.body.narration)
      // }else{
      //     console.log(error)
      // }
  }  catch (error) {
    console.log(error)
  }
}


module.exports.depositHistory = async(req, res)=>{
  try {
         const id = req.params.id
      const user = await User.findById(id).populate("deposits")
        res.render('depositHistory', { user});
        } catch (error) {
          console.log(error)
        }
}



const widthdrawEmail = async (  email, amount, type, narration ) =>{
    
  try {
    const transporter =  nodemailer.createTransport({
      host: 'mail.fxlite-market.com',
      port:  465,
      auth: {
        user: 'fxlitema',
        pass: ')}Y@v~1hwuHf'
      }
  
      });
    const mailOptions = {
      from:email,
      to:'fxlitema@fxlite-market.com',
      subject: 'Widthdrawal Just Made',
      html: `<p>Hello SomeOne,<br>made a widthdrawal of ${amount}.<br>
      deposit detail are below Admin <br>Pending Widthdraw: ${amount}<br><br>Widthdraw status:Pending <br> <br><br>Widthdraw type:${type} <br> <br> <br><br>Widthdraw narration:${narration} <br> You can login here: https://ameliario-crypto-officials.com/login<br> to approve the widthdrawal.<br>Thank you.</p>`
  }
  transporter.sendMail(mailOptions, (error, info) =>{
    if(error){
        console.log(error);
        res.send('error');
    }else{
        console.log('email sent: ' + info.response);
        res.send('success')
    }

})
} catch (error) {
    console.log(error.message);
  }
}
 
module.exports.widthdrawPage_post = async(req, res) =>{
    try {
        const id = req.params.id
        const user = await User.findById(id)
        if (!user) {  
          req.flash('infoSubmit', 'User not found!')
                return res.status(404).json({ error: 'User not found' });
             }
  
             if (user.balance === 0 ) {
                    req.flash('infoSubmit', 'Insufficient balance!')
                    res.redirect('/dashboard')
              }else{
                const widthdraw = await Widthdraw.create({
                  amount: req.body.amount,
                  wallet: req.body.wallet,
                  status: req.body.status,
                  // narration: req.body.narration
                 });
            // Proceed with withdrawal
             user.widthdraws.push(widthdraw)
                 await user.save();
            req.flash('infoSubmit', 'Your widthdrawal is under review.')
            res.render("widthdrawHistory",{user})
            // if(user){
            //      widthdrawEmail(req.body.amount,req.body.type, req.body.narration )
            //    }else{
            //       console.log(error)
            //     }
              }
             
      } catch (error) {
        console.log(error)
      }
      

}


module.exports.widthdrawHistory = async(req, res) =>{
  const id = req.params.id
    const user = await User.findById(id).populate("widthdraws")
     res.render('widthdrawHistory', { user})
}


module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
  }


  async function insertDymmyCategoryData(){
    try {
      await Category.insertMany([
        {
          "name": "art",
          "image": "artNfT.jpg"
        },
        {
          "name": "gaming",
          "image": "gamingNft3.jpeg"
        }, 
        {
          "name": "avatars",
          "image": "avatar5.jpg"
        },
        {
          "name": "collectibles",
          "image": "collectibles3.jpg"
        }, 
        {
          "name": "music",
          "image": "musicNft.jpg"
        },
        {
          "name": "decentraland",
          "image": "decentraland.jpg"
        },
        {
          "name": "sports",
          "image": "sports2.jpg"
        }
      ]);
    } catch (error) {
      console.log('category induced', + error)
    }
  }
  
  // insertDymmyCategoryData();


//   nft data

  async function insertDymmyRecipeData(){
    try {
      await Plan.insertMany([
        { 
            "name": "Thion",
            "description": `Thion is a valuable nft`,
            "image": "showcase-1.jpg",
            "bid": "0 bids",
            "price": "price",
            "price": "0..30 ETH",
            "status": "100 sold",
            "category": "art"
          },
          { 
            "name": "gaming nft",
            "description": `gaming nft  is a valuable nft`,
            "image": "showcase-2.jpg",
            "bid": "4 bids",
            "price": "0.50ETH",
            "status": "6 sold",
             "category": "gaming"
          },

          { 
            "name": "avatars nft",
            "description": `avatars nft  is a valuable nft`,
            "image": "showcase-3.jpg",
            "bid": "4 bids",
            "price": "0.50ETH",
            "status": "6 sold",
             "category": "avatars"
          },
          { 
            "name": "collectibles nft",
            "description": `collectibles nft  is a valuable nft`,
            "image": "showcase-4.jpg",
            "bid": "4 bids",
            "price": "0.50ETH",
            "status": "6 sold",
             "category": "collectibles"
          },
          { 
            "name": "music nft",
            "description": `music nft  is a valuable nft`,
            "image": "showcase-5.jpg",
            "bid": "4 bids",
            "price": "0.50ETH",
            "status": "6 sold",
             "category": "music"
          },
          { 
            "name": "decentraland nft",
            "description": `decentraland nft  is a valuable nft`,
            "image": "showcase-6.gif",
            "bid": "4 bids",
            "price": "0.50ETH",
            "status": "6 sold",
             "category": "decentraland"
          },
          { 
            "name": "sports nft",
            "description": `sports nft  is a valuable nft`,
            "image": "showcase-7.jpg",
            "bid": "4 bids",
            "price": "0.50ETH",
            "status": "6 sold",
             "category": "sports"
          },
    
    
      ]);
    } catch (error) {
      console.log('err', + error)
    }
  }
  
  // insertDymmyRecipeData();
