const router = require("express").Router();
const passport = require("../../passport");

router.get("/login", passport.authenticate("kakao"));

router.get(
  "/login/oauth",
  passport.authenticate("kakao", {
    session: false,
  }),
  (req, res) => res.json({ ...req.user })
);

module.exports = router;
