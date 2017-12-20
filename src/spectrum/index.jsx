import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';

import TransactionSigningOverlay from 'spectrum-lightsuite/src/components/transactions/transaction_signing_overlay';
// import registerReducers from 'spectrum-lightsuite/src/helpers/registerReducers';

import PetShop from './components/petshop';
import ScrollToTopRouter from './components/common/scroll_to_top_on_route';
// import Footer from './components/common/footer';
// import reducer from './reducer';

// import './dapplet.less';

// registerReducers({
//   digixPOA: { src: reducer },
// });

export default class PoA extends Component {
  static propTypes = {

  }
  render() {
    return (
      <div>
        <TransactionSigningOverlay />
        <HashRouter>
          <ScrollToTopRouter>
            <div
              className="pusher"
            >
              <PetShop />
              {/* <Footer /> */}
            </div>
          </ScrollToTopRouter>
        </HashRouter>
      </div>
    );
  }
}
