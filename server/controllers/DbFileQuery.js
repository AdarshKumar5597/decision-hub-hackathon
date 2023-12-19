const sqlite3 = require('sqlite3').verbose();
const { OpenAI } = require('openai');
const fs = require('fs');
const path = require('path');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API
});

const getTableNamesAndSchemas = async (db) => {
  return new Promise((resolve, reject) => {

    // Initialize an object to store table schemas
    const tableSchemas = {};

    // Extract table names
    db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
      if (err) {
        reject(err);
        return;
      }

      // Process each table
      const processTable = (index) => {
        if (index === tables.length) {
          // All tables processed, resolve the promise
          resolve(tableSchemas);
          return;
        }

        const tableName = tables[index].name;

        // Get column information for the table
        db.all(`PRAGMA table_info(${tableName})`, (err, rows) => {
          if (err) {
            reject(err);
            return;
          }

          // Store the schema information
          tableSchemas[tableName] = rows.map((column) => ({
            name: column.name,
            type: column.type,
          }));

          // Process the next table
          processTable(index + 1);
        });
      };

      // Start processing tables
      processTable(0);
    });
  });
};


function getAllFilesInFolder(folderPath) {
  try {
    const files = fs.readdirSync(folderPath);
    return files;
  } catch (error) {
    console.error('Error reading folder:', error.message);
    return [];
  }
}

exports.dbFileQuery = async (req, res) => {
  try {
    const ruleDescription = req.body.ruleDescription;
    if (!ruleDescription) {
      return res.status(400).json({
        success: false,
        message: "Rule description cannot be empty.",
      });
    }

    let folderPath = path.join(__dirname, 'database');
    let filesInFolder = getAllFilesInFolder(folderPath);

    if (!filesInFolder || filesInFolder.length === 0) {
      folderPath = path.join(__dirname, "files");
      filesInFolder = getAllFilesInFolder(folderPath);
    }

    console.log(filesInFolder);

    // Now execute the SQL query on the database
    const dbFilePath = path.join(folderPath, filesInFolder[0]); // Assuming you want to use the first database file
    const db = new sqlite3.Database(dbFilePath);
    await getTableNamesAndSchemas(db)
    .then(async (tableSchemas) => {
      const prompt = `generate a sqlite3 query for the given rule description in a single line based on appropriate table schemas if provided else just generate the sqlite3 query:
        rule description = ${ruleDescription} and table schemas = ${JSON.stringify(tableSchemas)} 
        your response should be only a sql query not any kind of explanation`;

    console.log('prompt:', prompt);

    const sqlQueryResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: 'user',
          content: `${prompt}`,
        },
      ],
      max_tokens: 100,
    });

    const generatedSqlQuery = sqlQueryResponse.choices[0].message.content;
    console.log('\nGenerated SQL Query:', generatedSqlQuery);

    db.all(generatedSqlQuery, (err, result) => {
      if (err) {
        console.error('Error executing SQL query:', err.message);
        return res.status(500).json({
          success: false,
          message: 'Error executing SQL query',
        });
      }

      // Close the database connection
      db.close();

      if (result.length === 0) {
        result = "Query Executed Successfully"
      }

      return res.json({
        success: true,
        message: result,
      });
    });
    })
    .catch((err) => {
        return res.status(500).json({
          success: false,
          message: err,
        });
    });

    
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error In Executing Query From SQL File',
    });
  }
}
