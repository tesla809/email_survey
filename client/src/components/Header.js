import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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

  logoRouting() {
    return this.props.auth ? '/surveys' : '/';
  }

  render() {
    return(
      <nav>
        <div className="nav-wrapper">
          <Link 
            to={this.logoRouting()} 
            className="left brand-logo">
            Emaily
          </Link>
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