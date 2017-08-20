import React from 'react';
import {
  RaisedButton,
} from 'material-ui';

const BANNER_URL = require('../../../img/banner.png');

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
  button: {
    width: '300px',
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
      src={BANNER_URL}
      width="100%"
    />
    <div
      style={styles.divider}
    />
    <div
      style={styles.contentContainer}
    >
      <div
        style={styles.content}
      >
      文案你在哪～～
      </div>
    </div>
    <div>
      <RaisedButton
        href="/#/schedule"
        label={'找賽程買票去'}
        primary
        style={styles.button}
        labelStyle={{
          fontSize: '20px',
        }}
      />
    </div>
  </div>
);

export default Root;
