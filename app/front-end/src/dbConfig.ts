const sql = require("mssql");

// konfiguracja bazy danych
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

async function executeQuery(query: string) {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query(query);
    return result.recordset;
  } catch (error) {
    console.log(error);
  }
}

executeQuery("SELECT * FROM Brands").then((result) => {
  console.log(result);
});

export { dbConfig };
