import { DEFAULT_NETWORKS } from 'spectrum-lightsuite/src/helpers/constants';

import Petshop from '../../../build/contracts/Adoption.json';

const contracts = {
  Petshop,
};

export default function getContract(name, network) {
  const contract = contracts[name];
  let latestNetwork = Math.max(...Object.keys(contract.networks));
  const selectedNetwork = DEFAULT_NETWORKS.find(n => n.id.toLowerCase() === network.toLowerCase());
  if (selectedNetwork.id.toLowerCase() !== 'testrpc') {
    latestNetwork = selectedNetwork.chainId;
  }
  // const networkId = DEFAULT_NETWORKS[network].id === 'testrpc' ? latestNetwork : DEFAULT_NETWORKS[network];
  return {
    abi: contract.abi,
    address: contract.networks[latestNetwork].address,
  };
}
