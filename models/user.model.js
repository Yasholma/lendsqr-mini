const { knex } = require("../db");
const { SCHEMAS } = require("../db/schema.constant");
const { walletModel } = require("./wallet.model");

class User {
  async getUsers() {
    return knex(SCHEMAS.User).join(SCHEMAS.Wallet, {
      "users.id": "wallet.userId",
    });
  }

  async findUserById(id, populate = {}, populateWallet = false) {
    const user = await knex(SCHEMAS.User)
      .select({
        id: "id",
        name: "name",
        email: "email",
        role: "role",
        ...populate,
      })
      .where({ id })
      .first();

    if (user && populateWallet) {
      const wallet = await walletModel.findUserWallet(id);
      user.wallet = wallet;
    }

    return user;
  }

  async findUserByEmail(email) {
    return knex(SCHEMAS.User).where({ email }).first();
  }

  async updateUser(id, payload) {
    return knex(SCHEMAS.User)
      .where({ id })
      .update({ ...payload });
  }

  async createUser(payload) {
    try {
      const isExist = await this.findUserByEmail(payload.email);

      if (isExist) {
        throw {
          status: 409,
          message: "User with this email already exist",
        };
      }

      await knex.transaction(async (trx) => {
        const [id] = await knex(SCHEMAS.User)
          .insert({ ...payload })
          .transacting(trx);

        const walletPayload = { userId: id };

        await knex(SCHEMAS.Wallet)
          .insert({ ...walletPayload })
          .transacting(trx);
      });
    } catch (error) {
      throw error;
    }
  }

  async fundAccount(user, amount) {
    if (+amount <= 0) {
      throw {
        status: 400,
        message: "Amount must be greater than 0",
      };
    }

    const newBalance = user.wallet.balance + amount;
    return walletModel.updateWallet(user.wallet.id, newBalance);
  }

  async transferFund(user, recipient, amount) {
    if (+amount <= 0) {
      throw {
        status: 400,
        message: "Amount must be greater than 0",
      };
    }

    if (+user.id === +recipient) {
      throw {
        status: 400,
        message: "Recipient can not be yourself",
      };
    }

    if (user.wallet.balance < amount) {
      throw {
        status: 400,
        message: "Your account balance is not sufficient",
      };
    }

    const recipientRecord = await this.findUserById(recipient, {}, true);

    if (!recipientRecord) {
      throw {
        status: 404,
        message: "Recipient not found",
      };
    }

    await walletModel.transferFund(user.wallet, recipientRecord.wallet, amount);

    return recipientRecord;
  }

  /**
   * @param {number} user
   * @param {number} requestedAmount
   * @returns {walletDocument}
   */
  async withdrawAmount(user, requestedAmount) {
    if (+requestedAmount <= 0) {
      throw {
        status: 400,
        message: "Amount must be greater than 0",
      };
    }

    if (user.wallet.balance < requestedAmount) {
      throw {
        status: 400,
        message: "Your account balance is not sufficient",
      };
    }

    const newBalance = user.wallet.balance - requestedAmount;
    return walletModel.updateWallet(user.wallet.id, newBalance);
  }
}

exports.userModel = new User();
