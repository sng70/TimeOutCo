const express = require("express");
const sql = require("mssql");
const port = 3001;
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
//app.use(express.json);
app.use(cors());
app.use(bodyParser.urlencoded());

const dbConfig = sql.connect({
  user: "sa",
  password: "yourStrong()Password",
  database: "ERP",
  server: "143.42.56.91",
  port: 1433,
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
});

app.post("/login", (req, res) => {
  console.log("test");
  const mail = req.body.username;
  const password = req.body.password;
  let x;
  dbConfig.then((pool) =>
    pool
      .request()
      .input("mail", sql.VarChar, mail)
      .input("password", sql.VarChar, password)
      .query(
        `Select * from Employees where mail = @mail AND employees_password = @password `,
        (err, result) => {
          if (err) {
            res.send({ err: err });
          }
          console.log(result.recordset[0]?.id, result.recordsets);
          console.log(!err);
          if (result.recordset[0] && !err) {
            console.log(result.recordset);
            // res.send(result);
            res.redirect("http://localhost:3000/home");
          } else {
            res.redirect("http://localhost:3000/wrongPassword");
          }
        }
      )
  );
});

app.post("/register-brand", (req, res) => {
  const brand = req.body.brandName;
  const mail = req.body.mail;
  const password = req.body.password;
  const subscription = req.body.subscription;
  const hqAddress = req.body.hqAddress;
  dbConfig.then((pool) =>
    pool
      .request()
      .input("brand_mail", sql.VarChar, mail)
      .input("name", sql.VarChar, brand)
      .input("password", sql.VarChar, password)
      .input("subscription_type", sql.VarChar, subscription)
      .input("hq_address", sql.VarChar(50), hqAddress)
      .query(
        `INSERT INTO Brands (brand_mail, name, brands_password, subscription_type, hq_address) VALUES (@brand_mail, @name, @password, @subscription_type, @hq_address)`,
        (err, result) => {
          if (err) {
            res.send({ err: err });
          } else {
            if (result && result.rowsAffected && result.rowsAffected[0] > 0) {
              console.log(result.rowsAffected);
              res.redirect("http://localhost:3000/home");
            } else {
              res.send({ message: "Wrong username/password combination" });
            }
          }
        }
      )
  );
});

app.get("/:employeeId/applications.json", (req, res) => {
  dbConfig
    .then((connection) => {
      const { employeeId } = req.params;
      return connection
        .request()
        .query(`SELECT * FROM Holidays WHERE employee_id=${employeeId}`);
    })
    .then((response) => {
      res.json(response.recordset);
    });
});

app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
  console.log("http://localhost:3001");
});
