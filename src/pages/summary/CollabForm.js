import React from 'react';

const CollabForm = ({ addCollaborator }) => (
  <form onSubmit={addCollaborator}>
    <label htmlFor="collabEmail">Collaborator email </label>
    <input type="text" name="collabEmail" required />
    <label htmlFor="fileId">File ID </label>
    <input type="text" name="fileId" required />
    <input className="btn" type="submit" name="submit" value="submit" />
  </form>
);

export default CollabForm;
