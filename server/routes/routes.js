const session = require('./session/routes');
const register = require('./register/routes');
const password = require('./password/routes');
const opportunity = require('./opportunity/routes');
const confirmEmail = require('./confirmEmail/routes');
const applications = require('./applications/routes');

function setup(app, passport) {
  session(app, passport);
  register(app);
  password(app);
  opportunity(app);
  confirmEmail(app);
  applications(app);
}

module.exports = setup;