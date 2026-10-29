import { NetworkStateType, useNetworkState } from 'expo-network';

export function useNetworkInfo() {
  const { isConnected, isInternetReachable, type } = useNetworkState();

  const isOffline = isConnected === false || type === NetworkStateType.NONE;
  const isPoorNetwork = isConnected === true && isInternetReachable === false;

  return {
    isConnected: isConnected ?? false,
    isInternetReachable: isInternetReachable ?? false,
    isOffline,
    isPoorNetwork,
    type,
  };
}
