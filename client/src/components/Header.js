import React, { Component } from "react";
import { connect } from 'react-redux';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <li><a href="/auth/google">Login With Google</a></li>
      default:  // must be logged in
        return <li><a href="/auth/logout">Logout</a></li>
    }
  }

  render() {
    return(
      <nav>
        <div className="nav-wrapper">
          <a className="left brand-logo">Emaily</a>
          <ul className="right">
            <li>{this.renderContent()}</li>
          </ul>
        </div>
      </nav>
    );
 } 
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);