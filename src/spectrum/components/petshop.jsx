import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import MenuSystem from 'spectrum-lightsuite/src/components/common/menu_system';
import { parseBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';
import { getKeystores, getNetworks } from 'spectrum-lightsuite/src/selectors';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import getContract from '../helpers/contracts';

import PetList from './shop/pet_list';


const network = SpectrumConfig.defaultNetworks[0];// 'eth-kovan';

const shop = getContract('PetShop', network);


const initialState = { userRole: '0' };
class PetShop extends Component {
  static propTypes = {
    web3Redux: PropTypes.object.isRequired,
    // keystores: PropTypes.array.isRequired,
    // networks: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  // componentWillMount() {
  //   const { keystores } = this.props;
  //   if (keystores && keystores.length > 0) {
  //     this.getUserRoleId(keystores[0].addresses[0].address).then((role) => {
  //       this.setState({ userRole: role });
  //     });
  //   }
  // }

  getContract({ abi, address }) {
    return this.props.web3Redux.web3(network).eth.contract(abi).at(address);
  }
  // getUserRoleId(address) {
  //   const directoryServiceContract = this.getContract(directoryService);
  //   return directoryServiceContract.get_user_role_id.call(address)
  //     .then(result => parseBigNumber(result));
  // }

  render() {
    // const { networks, keystores } = this.props;
    const petShpContract = this.getContract(shop);
    // const productsContract = this.getContract(products);
    // const poaAdminContract = this.getContract(poaAdmin);
    // const assetsExplorerContract = this.getContract(assets);
    // const { userRole } = this.state;
    // const isRoot = userRole === '1';
    console.log('petShpContract', petShpContract);
    if (!petShpContract) { return null; }
    // TODO a menu system for different types
    const menu = [
      {
        name: 'Pet Shop',
        path: 'pet-list',
        render: () => <PetList />,
      },
    ];

    return (
      <div>
        <MenuSystem
          equalWidths
          usingRouter
          parentRoute="/petshop"
          tabs={menu}
        />
      </div>
    );
  }
}

export default withRouter(web3Connect(connect(state => ({
  keystores: getKeystores(state),
  networks: getNetworks(state),
}))(PetShop)));
