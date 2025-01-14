const mongooes = require("mongoose");

const connectionDb = async () => {
  try {
    const connect = await mongooes.connect(process.env.CONNECTION_STRING);
    console.log(
      "database connected succsfully ::",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log("error:::", error);
    process.exit(1);
  }
};

module.exports = connectionDb;
