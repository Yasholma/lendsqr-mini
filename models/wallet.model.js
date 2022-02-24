const { knex } = require("../db");
const moment = require("moment");
const { SCHEMAS } = require("../db/schema.constant");

class Wallet {
  async updateWallet(id, balance) {
    return knex(SCHEMAS.Wallet)
      .where({ id })
      .update({ balance, updated_at: moment().toDate() });
  }

  async findUserWallet(userId) {
    return knex(SCHEMAS.Wallet)
      .where({ userId })
      .select("id", "balance", "updated_at")
      .first();
  }

  async transferFund(from, to, amount) {
    try {
      await knex.transaction(async (trx) => {
        const newUserBalance = from.balance - amount;
        await knex(SCHEMAS.Wallet)
          .where({ id: from.id })
          .update({ balance: newUserBalance })
          .transacting(trx);

        const receiverBalance = to.balance + amount;
        await knex(SCHEMAS.Wallet)
          .where({ id: to.id })
          .update({ balance: receiverBalance })
          .transacting(trx);
      });
    } catch (error) {
      throw error;
    }
  }
}

exports.walletModel = new Wallet();
