import './App.css';
import React, { useReducer } from 'react';

import { useWeb3Network } from '@openzeppelin/network/react';

import { DispatchContext, Web3Context } from './contexts';
import { Action } from './actions';
import { Network, networks } from './networks';

import NavBar from './components/NavBar';
import NetworkSelector from './components/NetworkSelector';
import AddressSelector from './components/AddressSelector';
import ProxyInspector from './components/ProxyInspector';
import Footer from './components/Footer';

const INFURA_PROJECT_ID = 'c3422181d0594697a38defe7706a1e5b';
const ZEP_TOKEN_ADDRESS = '0x00fdae9174357424a78afaad98da36fd66dd9e03';

type AppState = { targetAddress: string | null, network: Network };
const INITIAL_STATE: AppState = { targetAddress: ZEP_TOKEN_ADDRESS, network: networks['mainnet'] };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'changeTargetAddress':
      return { ...state, targetAddress: action.value };
    case 'changeNetwork':
      return { ...state, network: action.value };
  }
}

function App() {
  const [ state, dispatch ] = useReducer(reducer, INITIAL_STATE);
  const { targetAddress, network } = state;

  const { lib: web3 } = useWeb3Network(network.query);

  return (
    <DispatchContext.Provider value={ dispatch }>
      <Web3Context.Provider value={ web3 }>
        <div className='Wrapper'>
          <NavBar />
          <div className='Container'>
            <h1>OpenZeppelin Proxy Explorer</h1>
            <div className='Form'>
              <NetworkSelector defaultNetwork={ 'mainnet' }/>
              <AddressSelector defaultAddress={ INITIAL_STATE.targetAddress! } />
            </div>
            { targetAddress !== null && <ProxyInspector proxyAddress={ targetAddress } network= { network } /> }
          </div>
          <hr/>
          <Footer />
        </div>
      </Web3Context.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
