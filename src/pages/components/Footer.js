import React from 'react';
import '../../css/footer.css';
import edit_icon_white from '../../assets/pencil-icon.svg';

const Footer = () => (
  <div className="footer">
    <button className="button"><img src={edit_icon_white} alt="edit_icon_white"/></button>
    <button className="button">?</button>
  </div>
);

export default Footer;
