import React from 'react';

const CollabForm = ({ addCollaborator }) => (
  <form onSubmit={addCollaborator}>
    <label htmlFor="collabEmail">Collaborator email</label>
    <input type="email" name="collabEmail" required />
    <input className="btn" type="submit" name="submit" value="submit" />
  </form>
);

export default CollabForm;
