const db = require("../../data/db-config");

const getAll = () => {
  return db("accounts");
  //? select * from accounts
};

const getById = (id) => {
  return db("accounts").where("id", id).first();
  //? select * from accounts where id=id

  //* return db("accounts").where({id}).first()
};

const create = (account) => {
  const insertedAccount = db("accounts")
    .insert(account)
    .then((id) => {
      return getById(id[0]);
    });
  return insertedAccount;

  //? insert into account values (id,name,budget)
};

const updateById = (id, account) => {
  return db("accounts")
    .where("id", id)
    .update(account)
    .then((rows) => {
      return getById(id);
      //* return db("accounts").where({id}).update(account).then((rows)=> return getById(id))
    });
  //? update accounts name=account.name, budget=account.budget where id=id
};

const deleteById = (id) => {
  return db("accounts".where({ id }).del());

  //? delete from accounts where id=id
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
