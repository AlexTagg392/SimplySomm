const db = require("../models");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/whiskey", (req, res) => {
  db.Aroma.findAll({}).then(aromaData => {
    db.Taste.findAll({}).then(tasteData => {
      const aromas = JSON.parse(JSON.stringify(aromaData));
      const tastes = JSON.parse(JSON.stringify(tasteData));
      res.render("whiskey", { aromas, tastes });
    });
  });
});

router.get("/wine", (req, res) => {
  db.Aroma.findAll({}).then(aromaData => {
    db.Taste.findAll({}).then(tasteData => {
      const aromas = JSON.parse(JSON.stringify(aromaData));
      const tastes = JSON.parse(JSON.stringify(tasteData));
      res.render("wine", { aromas, tastes });
    });
  });
});

router.get("/api/whiskey", (req, res) => {
  db.Drink.findAll({
    where: {
      type: "whiskey"
    },
    include: [db.Taste, db.Aroma]
  }).then(results => {
    res.json(results);
  });
});

router.get("/api/wine", (req, res) => {
  db.Drink.findAll({
    where: {
      type: "wine"
    },
    include: [db.Taste, db.Aroma]
  }).then(results => {
    res.json(results);
  });
});

router.get("/api/whiskey/:aroma", (req, res) => {
  db.Aroma.findOne({
    where: {
      name: req.params.aroma
    },
    include: [db.Drink]
  }).then(result => {
    console.log(result);
    console.log(result.getDrinks);
    result.getDrinks().then(data => {
      const drinks = JSON.parse(JSON.stringify(data));
      res.json(drinks);
    });
  });
});

router.get("/api/wine/:aroma", (req, res) => {
  db.Aroma.findOne({
    where: {
      name: req.params.aroma
    },
    include: [db.Drink]
  }).then(result => {
    console.log(result);
    console.log(result.getDrinks);
    result.getDrinks().then(data => {
      const drinks = JSON.parse(JSON.stringify(data));
      res.json(drinks);
    });
  });
});

router.get("/api/whiskey/:taste", (req, res) => {
  db.Taste.findOne({
    where: {
      name: req.params.aroma
    },
    include: [db.Drink]
  }).then(result => {
    console.log(result);
    console.log(result.getDrinks);
    result.getDrinks().then(data => {
      const drinks = JSON.parse(JSON.stringify(data));
      res.json(drinks);
    });
  });
});

router.get("/api/wine/:taste", (req, res) => {
  db.Taste.findOne({
    where: {
      name: req.params.aroma
    },
    include: [db.Drink]
  }).then(result => {
    console.log(result);
    console.log(result.getDrinks);
    result.getDrinks().then(data => {
      const drinks = JSON.parse(JSON.stringify(data));
      res.json(drinks);
    });
  });
});

router.post("/api/drink", (req, res) => {
  db.Drink.create(req.body).then(results => {
    res.json(results);
  });
});
router.post("/api/aroma", (req, res) => {
  db.Aroma.create(req.body).then(results => {
    res.json(results);
  });
});
router.post("/api/taste", (req, res) => {
  db.Taste.create(req.body).then(results => {
    res.json(results);
  });
});
router.put("/api/drink/:id/taste", (req, res) => {
  db.Drink.findOne({
    where: { id: req.params.id }
  }).then(result => {
    result.setTastes(req.body);
    res.json(req.body);
  });
});

router.put("/api/drink/:id/aroma", (req, res) => {
  db.Drink.findOne({
    where: { id: req.params.id }
  }).then(result => {
    result.setAromas(req.body);
    res.json(req.body);
  });
});

module.exports = router;
