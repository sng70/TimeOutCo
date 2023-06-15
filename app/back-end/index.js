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
app.use(bodyParser.json());

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
        `SELECT name, role, id, brand_id FROM Employees WHERE mail = @mail AND employees_password = @password`,
        (err, result) => {
          if (err) {
            res.send({ err: err });
          }

          if (result.recordset[0] && !err) {
            const name = result.recordset[0].name;
            const role = result.recordset[0].role;
            const id = result.recordset[0].id;
            const brandId = result.recordset[0].brand_id;

            // Sprawdź, czy rola istnieje w obiekcie roles
            if (roleSecrets.hasOwnProperty(role)) {
              const roleCode = roleSecrets[role];

              res.redirect(
                "http://localhost:3000/home?name=" +
                  name +
                  "&role=" +
                  roleCode +
                  "&id=" +
                  id +
                  "&brandId=" +
                  brandId
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

app.post("/deleteEmployee", (req, res) => {
  const employeeId = req.body.id;
  dbConfig.then((connection) => {
    return (
      connection
        .request()
        .input("id", sql.Int, employeeId)
        .query(`DELETE FROM Employees WHERE id=@id`),
      (err) => {
        if (err) {
          res.send({ err: err });
        }
      }
    );
  });
});

app.post("/addEmployee", (req, res) => {
  const name = req.body.name;
  const surname = req.body.surname;
  const mail = req.body.mail;
  const phoneNumber = req.body.phoneNumber;
  const position = req.body.position;
  const password = req.body.password;
  const admin = req.body.admin === "true" ? "admin" : "user";
  const holidaysAmmount = Number(req.body.holidaysAmmount);
  const brandId = req.body.brandId;
  console.log(req.body);
  dbConfig.then((connection) => {
    return connection
      .request()
      .input("name", sql.VarChar, name)
      .input("surname", sql.VarChar, surname)
      .input("mail", sql.VarChar, mail)
      .input("phoneNumber", sql.VarChar, phoneNumber)
      .input("position", sql.VarChar, position)
      .input("admin", sql.VarChar, admin)
      .input("holidaysAmmount", sql.Int, holidaysAmmount)
      .input("brandId", sql.Int, brandId)
      .input("password", sql.VarChar, password)
      .query(
        `INSERT INTO Employees (brand_id, name, surname, mail, phone_number, position, employees_password, role, holidays_days_ammount) VALUES (@brandId, @name, @surname, @mail, @phoneNumber, @position, @password, @admin, @holidaysAmmount)`,
        (err) => {
          if (err) {
            res.send({ err: err });
          }
        }
      );
  });
});

app.post("/addApplication", (req, res) => {
  const employeeId = req.body.employeeId;
  const cause = req.body.cause;
  const beginDate = req.body.beginDate;
  const endDate = req.body.endDate;
  dbConfig.then((connection) => {
    connection
      .request()
      .input("employeeId", sql.Int, employeeId)
      .input("cause", sql.VarChar, cause)
      .input("beginDate", sql.Date, beginDate)
      .input("endDate", sql.Date, endDate)
      .input("state", sql.VarChar, "pending")
      .query(
        "INSERT INTO Holidays (employee_id, cause, application_state, begin_date, end_date) VALUES (@employeeId, @cause, @state, @beginDate, @endDate)",
        (err) => {
          if (err) {
            res.send({ err: err });
          }
        }
      );
  });
});

app.post("/application/accept", (req, res) => {
  const appId = req.body.id;
  dbConfig.then((connection) => {
    connection
      .request()
      .input("appId", sql.Int, appId)
      .input("state", sql.VarChar, "accepted")
      .query(
        "UPDATE Holidays SET application_state=@state where id=@appId",
        (err) => {
          if (err) {
            res.send({ err: err });
          }
        }
      );
  });
});

app.post("/application/deny", (req, res) => {
  const appId = req.body.id;
  dbConfig.then((connection) => {
    connection
      .request()
      .input("appId", sql.Int, appId)
      .input("state", sql.VarChar, "denied")
      .query(
        "UPDATE Holidays SET application_state=@state where id=@appId",
        (err) => {
          if (err) {
            res.send({ err: err });
          }
        }
      );
  });
});

app.post("/brand/:brandId/addBrandHolidays", (req, res) => {
  const employees = req.body.employees;
  const cause = req.body.cause;
  const beginDate = req.body.beginDate;
  const endDate = req.body.endDate;
  dbConfig.then((connection) => {
    for (const employee of employees) {
      connection
        .request()
        .input("employeeId", sql.Int, employee)
        .input("cause", sql.VarChar, cause)
        .input("beginDate", sql.Date, beginDate)
        .input("endDate", sql.Date, endDate)
        .input("state", sql.VarChar, "accepted")
        .query(
          "INSERT INTO Holidays (employee_id, cause, application_state, begin_date, end_date) VALUES (@employeeId, @cause, @state, @beginDate, @endDate)"
        );
    }
  });
});

app.get("/:employeeId/applications.json", (req, res) => {
  dbConfig
    .then((connection) => {
      const { employeeId } = req.params;
      return connection
        .request()
        .input("employeeId", sql.Int, employeeId)
        .query(`SELECT * FROM Holidays WHERE employee_id=@employeeId`);
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
        .input("appId", sql.Int, appId)
        .query(
          `SELECT h.*, e.brand_id FROM Holidays h JOIN Employees e on h.employee_id=e.id WHERE h.id=@appId`
        );
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
        .input("brandId", sql.Int, brandId)
        .query(
          `SELECT h.*, e.name, e.surname FROM Holidays h JOIN Employees e ON h.employee_id=e.id WHERE e.brand_id=@brandId`
        );
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
        .input("brandId", sql.Int, brandId)
        .query(
          `SELECT id, name, surname, mail, brand_id, phone_number, position, role, holidays_days_ammount FROM Employees WHERE brand_id=@brandId`
        );
    })
    .then((response) => {
      res.json(response.recordset);
    });
});

app.get("/brand/:brandId/information", (req, res) => {
  dbConfig
    .then((connection) => {
      const { brandId } = req.params;
      return connection
        .request()
        .input("brandId", sql.Int, brandId)
        .query(`SELECT * FROM Brands WHERE id=@brandId`);
    })
    .then((response) => {
      res.json(response.recordset);
    });
});

app.get("/employeeId/:employeeId/information", (req, res) => {
  dbConfig
    .then((connection) => {
      const { employeeId } = req.params;
      return connection
        .request()
        .input("employeeId", sql.Int, employeeId)
        .query(
          `SELECT id, name, surname, mail, brand_id, phone_number, position, role, holidays_days_ammount FROM Employees WHERE id=@employeeId`
        );
    })
    .then((response) => {
      res.json(response.recordset);
    });
});

app.get("/Users", (req, res) => {
  dbConfig.then((pool) => {
    pool
      .request()
      .query("SELECT * FROM Employees")
      .then((result) => {
        const data = result.recordset;
        res.json(data);
      })
      .catch((error) => {
        console.error("Błąd podczas zapytania do bazy danych:", error);
        res
          .status(500)
          .json({ error: "Błąd podczas zapytania do bazy danych" });
      });
  });
});

app.post("/editUsers/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  dbConfig.then((pool) => {
    const {
      brand_id,
      name,
      surname,
      mail,
      phone_number,
      position,
      employees_password,
      role,
      holidays_days_ammount,
    } = updatedUser;

    pool
      .request()
      .input("brand_id", sql.Int, brand_id)
      .input("name", sql.VarChar(20), name)
      .input("surname", sql.VarChar(20), surname)
      .input("mail", sql.VarChar(50), mail)
      .input("phone_number", sql.Char(9), phone_number)
      .input("position", sql.VarChar(40), position)
      .input("employees_password", sql.VarChar(50), employees_password)
      .input("role", sql.VarChar(10), role)
      .input("holidays_days_ammount", sql.Int, holidays_days_ammount)
      .input("id", sql.Int, id)
      .query(
        `UPDATE Employees SET brand_id = @brand_id, name = @name, surname = @surname,
        mail = @mail, phone_number = @phone_number, position = @position, employees_password = @employees_password,
        role = @role, holidays_days_ammount = @holidays_days_ammount WHERE id = @id`
      )
      .then(() => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.error(
          "Błąd podczas aktualizacji danych w bazie danych:",
          error
        );
        res
          .status(500)
          .json({ error: "Błąd podczas aktualizacji danych w bazie danych" });
      });
  });
});

app.delete("/deleteUser/:id", (req, res) => {
  const { id } = req.params;

  sql
    .connect(dbConfig)
    .then((pool) => {
      pool
        .request()
        .input("id", sql.Int, id)
        .query("DELETE FROM Employees WHERE id = @id")
        .then(() => {
          res.sendStatus(200);
        })
        .catch((error) => {
          console.error(
            "Błąd podczas usuwania użytkownika z bazy danych:",
            error
          );
          res
            .status(500)
            .json({ error: "Błąd podczas usuwania użytkownika z bazy danych" });
        });
    })
    .catch((error) => {
      console.error(
        "Błąd podczas nawiązywania połączenia z bazą danych:",
        error
      );
      res
        .status(500)
        .json({ error: "Błąd podczas nawiązywania połączenia z bazą danych" });
    });
});

app.get("/Brands", (req, res) => {
  dbConfig.then((pool) => {
    pool
      .request()
      .query("SELECT * FROM Brands")
      .then((result) => {
        const data = result.recordset;
        res.json(data);
      })
      .catch((error) => {
        console.error("Błąd podczas zapytania do bazy danych:", error);
        res
          .status(500)
          .json({ error: "Błąd podczas zapytania do bazy danych" });
      });
  });
});

app.post("/editBrands/:id", (req, res) => {
  const { id } = req.params;
  const { name, subscription_type, hq_address, brands_password, brand_mail } =
    req.body;

  dbConfig
    .then((pool) => {
      return pool
        .request()
        .input("id", sql.Int, id)
        .input("name", sql.VarChar(50), name)
        .input("subscription_type", sql.VarChar(10), subscription_type)
        .input("hq_address", sql.VarChar(50), hq_address)
        .input("brands_password", sql.VarChar(50), brands_password)
        .input("brand_mail", sql.VarChar(50), brand_mail)
        .query(
          "UPDATE Brands SET name = @name, subscription_type = @subscription_type, hq_address = @hq_address, brands_password = @brands_password, brand_mail = @brand_mail WHERE id = @id"
        );
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error("Błąd podczas zapisywania zmienionych danych:", error);
      res.status(500).json({
        error: "Błąd podczas zapisywania zmienionych danych",
        errorMessage: error.message,
      });
    });
});

app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
  console.log("http://localhost:3001");
});
