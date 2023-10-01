const bcrypt = require("bcrypt");

async function hashPassword(passwordToBeHashed) {
  const salt = await bcrypt.genSalt(10);
  const hashedValue = await bcrypt.hash(passwordToBeHashed, salt);
  return hashedValue;
}

function isMatchingPassword(hashedPassword, unhashedPassword) {
  return bcrypt.compare(unhashedPassword, hashedPassword);
}

module.exports = { hashPassword, isMatchingPassword };
