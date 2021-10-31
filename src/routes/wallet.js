const express = require("express");
const Wallet = require("../model/wallet");
const router = express.Router();

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
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const wallet = new Wallet({
    userId: req.body.userId,
    // balance: req.body.balance,
  });

  wallet
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

router.put("/updateWallet", async (req, res) => {
  const updatedWallet = Wallet.updateOne(
    { _id: req.body.id },
    {
      $set: {
        userId: req.body.userId,
        balance: req.body.balance,
        updateTime: Date.now(),
      },
    },
    {
      upsert: true,
      new: true,
    }
  ).exec();

  updatedWallet
    .then((data) => {
      res.json(data);
      console.log(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
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
