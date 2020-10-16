import React, { useState } from 'react';

import { Route, Link } from 'react-router-dom';

import './app.scss';

export const App = () => {
  const [summoner, setSummoner] = useState({});
  const [summonerName, setSummonerName] = useState('');

  function getSummoner(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    fetch(`/api/summoner/${summonerName}`)
      .then((_) => _.json())
      .then((value) => {
        setSummoner(value);
      });
  }

  return (
    <div id="wrapper">
      <div>
        <h1>Welcome to crow-storm!</h1>
        <img
          width="450"
          src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png"
          alt=""
        />
      </div>
      <form onSubmit={getSummoner}>
        <input
          type="text"
          onChange={(event) => setSummonerName(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <pre>Summoner: {JSON.stringify(summoner, null, 4)}</pre>
      <pre>Config: </pre>

      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <br />
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Route
        path="/"
        exact
        render={() => (
          <div>
            This is the generated root route.{' '}
            <Link to="/page-2">Click here for page 2.</Link>
          </div>
        )}
      />
      <Route
        path="/page-2"
        exact
        render={() => (
          <div>
            <Link to="/">Click here to go back to root page.</Link>
          </div>
        )}
      />
      {/* END: routes */}
    </div>
  );
};

export default App;
