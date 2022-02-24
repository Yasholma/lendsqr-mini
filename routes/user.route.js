const { userController } = require("../controllers/user.controller");
const { validationMiddleware } = require("../middlewares");
const { authMiddleware } = require("../middlewares/auth.middleware");
const {
  fundAccountValidationRules,
  transferFundValidationRules,
  withdrawFundValidationRules,
} = require("../middlewares/user_validation.middleware");

const router = require("express").Router();

router.get("/", authMiddleware, userController.getAllUsers);
router.get("/me", authMiddleware, userController.me);

router.post(
  "/fund-account",
  authMiddleware,
  fundAccountValidationRules(),
  validationMiddleware,
  userController.fundAccount
);

router.post(
  "/transfer-fund",
  authMiddleware,
  transferFundValidationRules(),
  validationMiddleware,
  userController.transferFund
);

router.post(
  "/withdraw-fund",
  authMiddleware,
  withdrawFundValidationRules(),
  validationMiddleware,
  userController.withdrawFund
);

router.get("/logout", authMiddleware, userController.logout);

exports.userRoutes = router;
