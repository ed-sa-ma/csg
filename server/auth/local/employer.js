const db = require('../../../shared/db/authConnectorEmployer');
const errors = require('./errors');
const getCompanyContact = require('../../services/nif/nif');
const CaptchaService = require('../../services/captcha/captcha');
const validateCredentials = require('./validateCredentialsEmployer');
const { hashPassword, getRandomBytes } = require('./helpers');
const mailer = require('../../services/mailer/mailer');

module.exports = {
  register(captcha, username, password, nif) {
    return CaptchaService.verify(captcha).then(() => {
      return validateCredentials(username, password, nif).then(() => {
        return db.getByUsername(username).then((company) => {
          if (company) {
            throw errors.COMPANY_ALREADY_EXISTS;
          }
          return db.getUnverifiedByUsername(username).then((unVCom) => {
            if (unVCom) {
              throw errors.UNV_COMPANY_ALREADY_EXISTS;
            }
            return getCompanyContact(nif).then((email) => {
              return hashPassword(password).then((passHash) => {
                return getRandomBytes().then((confHash) => {
                    // TODO: sanitize email
                  return db.register(username, email, passHash, nif, confHash).then(() => {
                    return mailer.sendConfirmationEmail(email, confHash).then(() => email);
                  });  // registerUnverified
                });  // getRandomBytes
              });  // hashPassword
            });  // getCompanyContact
          }); // getUnverifiedByUsername
        });  // getByUsername
      }); // validateCredentials
    }); // CaptchaService.verify
  }
};
