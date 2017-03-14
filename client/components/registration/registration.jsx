import React from 'react';
import Button from 'components/button/button';
import Logo from 'components/header/logo';
import SideImageLayout from 'components/layouts/sideImageLayout';
import ErrorMessage from 'components/errorMessage/errorMessage';

class Registration extends React.Component {
    constructor() {
        super();
        this.onTapRegister = this.onTapRegister.bind(this);
        this.getEmailRef = (ref) => { this.email = ref; };
        this.getPwdRef = (ref) => { this.pwd = ref; };
        this.getPwdConfRef = (ref) => { this.pwdConf = ref; };
    }

    onTapRegister() {
        this.props.register(this.email.value, this.pwd.value);
    }

    render() {
        const { error } = this.props;
        return (
          <SideImageLayout className="register">
            <div className="flex flex--col">
              <div><Logo /></div>
              <h2>Register with</h2>
              <div className="options">
                <Button>Facebook</Button>
                <Button>Google+</Button>
                <Button>LinkdIn</Button>
              </div>
              <br />
              <p>Or</p>
              <div className="form">
                <div><input ref={this.getEmailRef} type="email" placeholder="Email" /></div>
                <div><input ref={this.getPwdRef} type="password" placeholder="Password" /></div>
                <div><input ref={this.getPwdConfRef} type="password" placeholder="Confirm Password" /></div>
                <div>
                  <Button onTap={this.onTapRegister}>Create Account</Button>
                </div>
                { error && <ErrorMessage msg={error} />}
              </div>
            </div>
          </SideImageLayout>
        );
    }
}

Registration.propTypes = {
    register: React.PropTypes.func.isRequired,
    error: React.PropTypes.string,
};

export default Registration;
