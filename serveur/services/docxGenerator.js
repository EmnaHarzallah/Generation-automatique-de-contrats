const fs = require("fs").promises;
const { compile } = require("docx-templates");
const path = require("path");

module.exports = {
  generateContract: async (templatePath, outputPath, data) => {
    try {
      const templateBuffer = await fs.readFile(templatePath);

      await compile({
        template: templateBuffer,
        output: outputPath,
        data: data,
        cmdDelimiter: ["{{", "}}"],
      });

      return outputPath;
    } catch (err) {
      throw new Error(`Erreur génération contrat: ${err.message}`);
    }
  },
};
