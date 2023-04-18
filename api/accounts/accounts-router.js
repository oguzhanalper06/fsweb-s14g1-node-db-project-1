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

router.post(
  "/",
  mA.checkAccountPayload,
  mA.checkAccountNameUnique,
  async (req, res, next) => {
    try {
      let insertData = await Account.create(req.body);
      res.status(201).json(insertData);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  mA.checkAccountId,
  mA.checkAccountPayload,
  async (req, res, next) => {
    try {
      const updateAccount = await Account.updateById(req.params.id, req.body);
      res.json(updateAccount);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", mA.checkAccountId, async (req, res, next) => {
  try {
    await Account.deleteById(req.params.id);
    res.json(req.account);
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "Hata Oluştu",
    message: err.message,
  });
});

module.exports = router;
