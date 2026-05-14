import { useContext } from 'react';
import { NeoContext } from '../provider/context';

export const useNeo = () => {
  return useContext(NeoContext);
};
