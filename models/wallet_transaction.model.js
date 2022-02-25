const { knex } = require("../db");
const { SCHEMAS } = require("../db/schema.constant");

class WalletTransaction {
  async create({ sourceWallet, destinationWallet, amount, type, userId }, trx) {
    const payload = {
      sourceWallet,
      destinationWallet,
      amount,
      type,
      userId,
    };

    if (trx) {
      await knex(SCHEMAS.WalletTransaction)
        .insert({ ...payload })
        .transacting(trx);
    } else {
      await knex(SCHEMAS.WalletTransaction).insert({ ...payload });
    }
  }
}

exports.walletTransactionModel = new WalletTransaction();
