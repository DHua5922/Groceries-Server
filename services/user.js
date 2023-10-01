const {
  findUserByLoginDal,
  getUserDal,
  upsertUserDal,
  deleteUserDal,
} = require("../dal/user");
const { hashPassword } = require("../utilities/password");

async function findUserByLoginService(emailOrUsername) {
  const users = await findUserByLoginDal({ value: emailOrUsername });
  const lastIndex = users[0].length - 1;
  return {
    ...users.slice(0, lastIndex),
    ...users[lastIndex],
  };
}

function getUserService(id) {
  return getUserDal({ id });
}

async function upsertUserService({ password, ...params }) {
  const users = await upsertUserDal({
    ...params,
    password: await hashPassword(password),
  });
  const lastIndex = users[0].length - 1;
  return {
    ...users[0].slice(0, lastIndex),
    ...users[0][lastIndex],
  };
}

async function deleteUserService(id) {
  const users = await deleteUserDal({ id });
  return users[0];
}

module.exports = {
  findUserByLoginService,
  getUserService,
  upsertUserService,
  deleteUserService,
};
