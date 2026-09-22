module.exports = {
  source: ["tokens/**/*.json"],
  usesDtcg: true,
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "dist/css/",
      prefix: "ds",
      files: [
        {
          destination: "variables.css",
          format: "css/variables",
          options: {
            outputReferences: true
          }
        }
      ]
    }
  }
};
