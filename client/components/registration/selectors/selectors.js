export const getRegistrationErrors = state => state.registration.registrationErrors;
export const getRegistrationSuccess = state => state.registration.registrationSuccess;
export const getCaptchaError = state => state.registration.captcha;
export const getIsHashValid = state => state.registration.hash && state.registration.hash.isValid;
export const getIsHashLoading = state => state.registration.hash &&
  state.registration.hash.isLoading;
