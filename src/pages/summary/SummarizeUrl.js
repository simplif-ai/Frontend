import React from 'react';

const SummarizeUrl = ({ summarizeFromUrl }) => (
  <form onSubmit={summarizeFromUrl}>
    <label htmlFor="url">Summarize from URL</label>
    <input id="input-url" type="text" name="url" required />
    <input className="btn" type="submit" name="submit" value="submit" />
  </form>
);

export default SummarizeUrl;
