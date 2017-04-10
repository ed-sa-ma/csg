const ProfileConnector = require('../../../shared/db/connectors/profile');

module.exports = {
  getProfile: ProfileConnector.getCandidateProfile,
  setPersonal(candidateId, body) {
    // TODO: validate names
    console.warn('TODO: SANITIZE');
    return ProfileConnector.setPersonal(candidateId, body.name, body.surname);
  },
  setProfessional(candidateId, body) {
    console.warn('TODO: SANITIZE');
    return ProfileConnector.setProfessional(candidateId, body.yearsXp);
  }
};