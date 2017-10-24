import React from 'react';
import '../../css/footer.css';
import edit_icon_white from '../../assets/pencil-icon.svg';
import { withCookies } from 'react-cookie';

const Footer = ({ cookies }) => {
  const isAuthenticated = cookies.get('isAuthenticated');
  if (isAuthenticated === "true") {
    return (
      <div className="footer">
        <button className="button"><img src={edit_icon_white} alt="edit_icon_white"/></button>
        <button className="button">?</button>
      </div>
    );
  } else {
    return null;
  }
};

export default withCookies(Footer);
