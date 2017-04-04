/* eslint no-confusing-arrow: 0 */
import React from 'react';
import CandidateHome from './candidate/containers/home';
import EmployerHome from './employer/containers/home';

const Home = (props) => {
  if (props.isEmployer) {
    return <EmployerHome />;
  } else if (props.isCandidate) {
    return <CandidateHome />;
  }
  return null;
};

Home.propTypes = {
  isEmployer: React.PropTypes.bool,
  isCandidate: React.PropTypes.bool,
};

export default Home;
