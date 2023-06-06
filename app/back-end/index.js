const express = require("express");
const sql = require("mssql");
const port = 3001;
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const dbConfig = {
  user: "sa",
  password: "yourStrong()Password",
  database: "ERP",
  server: "143.42.56.91",
  port: 1433,
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

app.post("/login", (req, res) => {
  const mail = req.body.mail;
  const password = req.body.password;

  sql
    .connect(dbConfig)
    .then((pool) =>
      pool
        .request()
        .input("mail", sql.VarChar, mail)
        .input("password", sql.VarChar, password)
        .query(
          `SELECT * FROM Employees WHERE mail = @mail AND employees_password = @password`,
          (err, result) => {
            if (err) {
              res.status(500).send({ err: err });
            } else if (result.recordset.length > 0) {
              res.status(200).send({ message: "Login successful" });
            } else {
              res
                .status(401)
                .send({ message: "Wrong username/password combination" });
            }
          }
        )
    )
    .catch((error) => {
      res.status(500).send({ err: error });
    });
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
        `INSERT INTO Brands (brand_mail, name, brand_password, subscription_type, hq_address) VALUES (@brand_mail, @name, @password, @subscription_type, @hq_address)`,
        (err, result) => {
          if (err) {
            res.send({ err: err });
          }
          if (result.rowsAffected[0] && !err) {
            console.log(result.rowsAffected);
            res.redirect("http://localhost:3000/home");
          } else {
            res.send({ message: "Wrong username/password combination" });
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

app.get("/applications/:applicationId/application.json", (req, res) => {
  dbConfig
    .then((connection) => {
      const { applicationId } = req.params;
      return connection
        .request()
        .query(`SELECT * FROM Holidays WHERE id=${applicationId}`);
    })
    .then((response) => {
      res.json(response.recordset);
    });
});

app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
  console.log("http://localhost:3001");
});
