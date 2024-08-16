const router = require("express").Router();
const { User, Note, Team } = require("../models/index");

router.get("/", async (_, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Note,
          attributes: { exclude: ["userId"] },
        },
        {
          model: Note,
          as: "marked_notes",
          attributes: { exclude: ["userId"] },
          through: {
            attributes: [],
          },
        },
        {
          model: Team,
          attributes: ["name", "id"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    res.json(users);
  } catch (error) {
    console.error(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404).end();
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
