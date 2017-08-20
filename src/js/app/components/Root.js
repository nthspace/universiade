import React from 'react';
import {
  RaisedButton,
} from 'material-ui';

const BANNER_URL = require('../../../img/banner.png');
const MOTIVATION_URLS = [
  require('../../../img/motivation-01.png'),
  require('../../../img/motivation-02.png'),
  require('../../../img/motivation-03.png'),
];

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '33vh',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'space-between',
  },
  button: {
    width: '300px',
    marginTop: '50px',
    marginBottom: '50px',
  },
  divider: {
    margin: '16px 0',
    display: 'block',
    width: '95%',
    height: '5px',
    background: 'rgba(201, 201, 216, 0.68)',
  },
};

const Root = () => (
  <div style={styles.root}>
    <img
      alt="banner"
      src={BANNER_URL}
      width="100%"
    />
    <div
      style={styles.divider}
    />
    <div>
      <RaisedButton
        href="./#/schedule"
        label={'找賽程買票去'}
        primary
        style={styles.button}
        labelStyle={{
          fontSize: '20px',
        }}
      />
    </div>
    <div
      style={styles.contentContainer}
    >
      <h3>因為種種原因，我們希望這一切可以更好</h3>
      <div
        style={styles.content}
      >
        {MOTIVATION_URLS.map(url => (
          <img alt="motivation" key={url} src={url} height="400px" />
        ))}
      </div>
    </div>
  </div>
);

export default Root;
