const paths = require("../paths");

const clean = async () => {
  const { deleteAsync } = await import("del");
  return await deleteAsync(paths.clean);
};

module.exports = clean;
