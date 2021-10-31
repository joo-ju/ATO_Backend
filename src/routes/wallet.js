const express = require("express");
const User = require("../model/user");
const Wallet = require("../model/wallet");
const WalletHistory = require("../model/walletHistory");
const router = express.Router();
const axios = require("axios");

const blockchain_url = "http://localhost:3001/api";

router.get("/", async (req, res) => {
  try {
    const wallet = await Wallet.find();
    res.json(wallet);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const wallet = await Wallet.findById({ _id: req.params.id });
    res.json(wallet);
    
    console.log(wallet);

    // execute blockchain chaincode getWallet()
    // get Wallet on blockchain
    await axios.get(blockchain_url + "/getWallet?&walletid=" + wallet._id)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/history", async (req, res) => {
  try {
    const walletHistory = await WalletHistory.find();
    res.json(walletHistory);

  } catch (err) {
    res.json({ message: err });
  }
});

// post wallet and wallet history
router.post("/", async (req, res) => {
  const wallet = new Wallet({
    userId: req.body.userId,
  });

  await wallet
    .save()
    .then((data) => {
      // res.json(data);
      console.log(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });

  const walletHistory = new WalletHistory({
    userId: wallet.userId,
    walletId: wallet._id,
    content: {
      cost: wallet.balance,
      balance: wallet.balance,
      type: "charge"
    }
  });

  await walletHistory
    .save()
    .then((data) => {
      res.json(data);
      console.log(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });

  const user = await User.findOne({ _id: wallet.userId });
  
  // execute blockchain chaincode setWallet()
  // post new Wallet on blockchain
  await axios.get(
      blockchain_url + 
        "/setWallet?name=" + user.username +
        "&id=" + wallet._id + 
        "&coin=" + wallet.balance
    ).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    });
});

// update wallet and wallet history
router.put("/updateWallet", async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.body.userId });
    const balance = wallet.balance + req.body.cost;

    const updatedWalletHistory = await WalletHistory.updateOne(
      { userId: req.body.userId },
      {
        $push: {
          content: {
            cost: req.body.cost,
            balance: balance,
            type: req.body.type,
          },
        },
      }
    ).exec();
    
    // res.json(updatedWalletHistory);
    console.log(updatedWalletHistory);

    const updatedWallet = await Wallet.updateOne(
      { userId: req.body.userId },
      {
        $set: {
          balance: balance,
          updatedTime: Date.now(),
        },
      }
    ).exec();
    
    res.json(updatedWallet);
    console.log(updatedWallet);
    
    const user = await User.findOne({ userId: wallet.userId });

    // execute blockchain chaincode setWallet()
    // update Wallet on blockchain
    await axios.get(
      blockchain_url + 
        "/setWallet?name=" + user.username +
        "&id=" + wallet._id + 
        "&coin=" + balance
    ).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    });

  } catch (err) {
    res.json({ message: err });
  }

});

router.delete("/:id", async (req, res) => {
  try {
    const removedWallet = await Wallet.remove({ _id: req.params.id });
    res.json(removedWallet);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
