const express = require("express");
const app = express();
const quots = require("./quots");

//middlewares
app.use(express.json());

//routs
app.get("/quots/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * 61);
  const response = { text: quots[randomIndex].text };

  res.send(response);
});

app.get("/quots/", (req, res) => {
  let quentaty = req.query.quentaty;
  let randomnum;
  let r = [];
  if (typeof quentaty !== Number) {
    quentaty = parseInt(quentaty, 10);
    for (i = 0; i < quentaty; i++) {
      for (j = 0; j < quentaty; j++) {
        let anotherRandomnum = Math.floor(Math.random() * 40);
        randomnum = Math.floor(Math.random(i) * anotherRandomnum);

        r[j] = { text: quots[randomnum].text };
        // console.log(r);
      }
    }
  }
  //   console.log(r);
  res.json([r]);
});

//listen
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is listing on port ${port}`));
