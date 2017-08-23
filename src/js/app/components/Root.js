import React from 'react';
import {
  RaisedButton,
} from 'material-ui';
import Tracker from '../../Tracker';
import PortraitCard from './PortraidCard';
import PicWei from '../../../img/dreamcwli.png';
import PicWen from '../../../img/wendell.jpg';
import PicAm from '../../../img/amdis.jpg';

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

class Root extends React.PureComponent {
  componentDidMount(){
    Tracker.logPageView();
  }

  render(){
    return (
      <div style={styles.root}>
        <div className="row">
          <img
            alt="banner"
            src={BANNER_URL}
            width="100%"
          />
        </div>
        <div
          style={styles.divider}
        />
        <div className="row">
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
            className="row"
            style={{
              textAlign: 'center',
            }}
          >
            {MOTIVATION_URLS.map(url => (
              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                <img alt="motivation" key={url} src={url} height={400} />
              </div>
            ))}
          </div>
        </div>
        <div
          style={styles.divider}
        />
        <h2>開發者</h2>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <PortraitCard
              src={PicAm}
              name={'Amdis'}
            />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <PortraitCard
              src={PicWei}
              name={'Chia-Wei'}
            />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <PortraitCard
              src={PicWen}
              name={'Wendell'}
            />
          </div>
        </div>
        <div
          style={styles.divider}
        />
        <h2>貢獻者</h2>
        <div>
          <h3>賽程小幫手 - 林明</h3>
          <h3>賽程小幫手 - 王草莓</h3>
          <h3>賽程小幫手 - 劉加加</h3>
          <h3>製圖小幫手 - Wen</h3>
        </div>
      </div>
    );
  }
}

export default Root;
