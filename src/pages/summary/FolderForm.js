import React from 'react';
import '../../css/summary.css';

const FolderForm = ({ createFolder }) => (
  <form onSubmit={createFolder}>
    <label htmlFor="name">new folder name </label>
    <input type="text" name="name" required />
    <input className="btn" type="submit" name="submit" value="submit" />
  </form>
);

export default FolderForm;
