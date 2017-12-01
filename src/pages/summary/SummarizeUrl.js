import React from 'react';

const SummarizeUrl = ({ summarize, name, label, type, handleChange }) => (
  <form onSubmit={summarize}>
    <label htmlFor={name}>{label}</label>
    {type === 'file' ?
      <input
        className='fileInput'
        id="input-url"
        onChange={handleChange}
        type={type}
        name={name}
        required
      /> :
      <input
        type={type}
        name={name}
        required
      />
    }
    <input className="btn" type="submit" name="submit" value={label} />
  </form>
);

export default SummarizeUrl;
