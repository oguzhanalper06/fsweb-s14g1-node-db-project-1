const router = require("express").Router();
const Account = require("./accounts-model");
const mA = require("./accounts-middleware");

router.get("/", (req, res, next) => {
  Account.getAll()
    .then((account) => {
      res.json(account);
    })
    .catch((err) => {
      res.json([]);
    });
});

router.get("/:id", mA.checkAccountId, async (req, res, next) => {
  try {
    res.json(req.account);
  } catch (error) {
    next(error);
  }
});

router.post("/", (req, res, next) => {
  // KODLAR BURAYA
});

router.put("/:id", (req, res, next) => {
  // KODLAR BURAYA
});

router.delete("/:id", (req, res, next) => {
  // KODLAR BURAYA
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // KODLAR BURAYA
});

module.exports = router;
