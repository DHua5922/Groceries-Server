const {
  findUserByLoginDal,
  getUserDal,
  upsertUserDal,
  deleteUserDal,
} = require("../dal/user");
const { hashPassword } = require("../utilities/password");

async function findUserByLoginService(emailOrUsername) {
  const result = await findUserByLoginDal({ value: emailOrUsername });
  const lastIndex = result.length - 1;
  return {
    ...result.slice(0, lastIndex),
    ...result[lastIndex],
  };
}

async function getUserService(id) {
  const idNum = Number(id);
  const result = await getUserDal({ id: idNum });
  return idNum ? result[0] : result;
}

async function upsertUserService({ password, ...params }) {
  const result = await upsertUserDal({
    ...params,
    password: await hashPassword(password),
  });
  const lastIndex = result[0].length - 1;
  return {
    ...result[0].slice(0, lastIndex),
    ...result[0][lastIndex],
  };
}

async function deleteUserService(id) {
  const result = await deleteUserDal({ id: Number(id) });
  return result[0][0];
}

module.exports = {
  findUserByLoginService,
  getUserService,
  upsertUserService,
  deleteUserService,
};
