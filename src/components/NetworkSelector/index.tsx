import React, { useContext } from 'react';
import { DispatchContext } from '../../contexts';
import '../styles/Selector.css';

type NetworkSelectorProps = { defaultNetwork: string };
export default function ({ defaultNetwork }: NetworkSelectorProps) {
  const dispatch = useContext(DispatchContext)!;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const input = event.target.value;
    dispatch({ type: 'changeNetwork', value: input });
  };

  return (
    <div className='FormField'>
      <label>Network:</label>
      <div className='FormInput'>
        <select defaultValue={defaultNetwork} onChange={handleChange}>
          <option value='mainnet'>Mainnet</option>
          <option value='rinkeby'>Rinkeby</option>
        </select>
      </div>
    </div>
  );
}
