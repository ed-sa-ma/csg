const bcrypt = require('bcrypt-nodejs');
const { hashPassword, getRandomBytes } = require('./helpers');
const errors = require('./errors');

function excludeKeys(obj, keys) {
  const newObj = {};
  const objKeys = Object.keys(obj);
  objKeys.forEach((key) => {
    if (keys.indexOf(key) < 0) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
}

function AccountManager(Connector) {
  return {
    verifyAccount(hash) {
      return Connector.verifyRegistrationHash(hash).then((user) => {
        return Connector.confirmAccount(excludeKeys(user, ['_id'])).then(() => {
          return Connector.removeUnconfirmedById(user._id);
        });
      });
    },
    login(username, password) {
      return Connector.getByUsername(username).then((user) => {
        if (!user) {
          throw errors.LOGIN_INVALID_CREDENTIALS;
        }
        return new Promise((resolve, reject) => {
          bcrypt.compare(password, user.password, (err, res) => {
            if (err) {
              reject(errors.UNKNOWN);
            }
            if (!res) {
              reject(errors.LOGIN_INVALID_CREDENTIALS);
            }
            resolve({ success: true, user: { _id: user._id, username } });  // eslint-disable-line no-underscore-dangle, max-len
          });
        });
      });
    },
    deleteUser(id) {
      return Connector.deleteUser(id);
    },
    findById(id) {
      return Connector.getById(id);
    },
    requestResetLink(email) {
      return Connector.getByUsername(email).then((userData) => {
        if (!userData) {
          return true;  // false positive
        }
        return getRandomBytes().then(hash => Connector.setPasswordConfirmationHash(email, hash)
          .catch(() => Connector.getPasswordConfirmationHash(email)
            .then((user) => {
              if (!user) {
                throw errors.UNKNOWN;
              }
              return user;
            })).then(user => user.hash));
      });
    },
    resetPassword(email, newPassword, confirmationHash) {
      return Connector.getPasswordConfirmationHash(email).then((user) => {
        if (!user || user.hash !== confirmationHash) {
          throw errors.INVALID_DETAILS;
        }
        return hashPassword(newPassword)
        .then(newPasswordHash => Connector.setUserPassword(email, newPasswordHash).catch(() => {
          throw errors.UNKNOWN;
        }));
      });
    }
  };
}

module.exports = AccountManager;