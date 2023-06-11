const express = require("express");
const { v4: uuidv4 } = require("uuid");
const sql = require("mssql");
const port = 3001;
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
//app.use(express.json);
app.use(cors());
app.use(bodyParser.urlencoded());

const roleSecrets = {
  admin: "5ba48771c61dfb0c8e6c7df6db9e7d097b93b1940ab5aeeb4d8d5a630e2557f9",
  sa: "e086da84c7904d285d65c6479a94274e5e0f6e6e4f8a6a2c05b234736d57a419",
  user: "54a9e03ff9a76476905f45e37e10a4064641f2e073748e4f462c4e6f9ea8fcf0",
};

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
  const mail = req.body.username;
  const password = req.body.password;
  dbConfig.then((pool) =>
    pool
      .request()
      .input("mail", sql.VarChar, mail)
      .input("password", sql.VarChar, password)
      .query(
        `SELECT name, role FROM Employees WHERE mail = @mail AND employees_password = @password`,
        (err, result) => {
          if (err) {
            res.send({ err: err });
          }

          if (result.recordset[0] && !err) {
            const name = result.recordset[0].name;
            const role = result.recordset[0].role;

            // Sprawdź, czy rola istnieje w obiekcie roles
            if (roleSecrets.hasOwnProperty(role)) {
              const roleCode = roleSecrets[role];

              res.redirect(
                "http://localhost:3000/home?name=" + name + "&role=" + roleCode
              );
            }
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
              res.redirect("http://localhost:3000/added");
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

app.get("/applications/:appId", (req, res) => {
  dbConfig
    .then((connection) => {
      const { appId } = req.params;
      return connection
        .request()
        .query(`SELECT * FROM Holidays WHERE id=${appId}`);
    })
    .then((response) => {
      if (response.recordset.length === 0) {
        res.json([{ employeeId: -1 }]);
      } else {
        res.json(response.recordset);
      }
    });
});

app.get("/applications/brand/:brandId", (req, res) => {
  dbConfig
    .then((connection) => {
      const { brandId } = req.params;
      return connection
        .request()
        .query(`SELECT * FROM Holidays WHERE brand_id=${brandId}`);
    })
    .then((response) => {
      res.json(response.recordset);
    });
});

app.get("/employees/brand/:brandId", (req, res) => {
  dbConfig
    .then((connection) => {
      const { brandId } = req.params;
      return connection
        .request()
        .query(`SELECT * FROM Employees WHERE brand_id=${brandId}`);
    })
    .then((response) => {
      res.json(response.recordset);
    });
});

app.get("/information/brand/:brandId", (req, res) => {
  dbConfig
    .then((connection) => {
      const { brandId } = req.params;
      return connection
        .request()
        .query(`SELECT * FROM Brands WHERE brand_id=${brandId}`);
    })
    .then((response) => {
      res.json(response.recordset);
    });
});

app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
  console.log("http://localhost:3001");
});
