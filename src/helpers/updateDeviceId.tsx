import OneSignal from 'react-native-onesignal';
// import store from '../store';
// import {authAddDevice} from '../store/auth';

/**
 * Sometimes device id can be undefined.
 * The function controls that deviceid is defined or not,
 * If device id is not defined, update device id and return it.
 * @returns device id
 */
async function update() {
  return OneSignal.getDeviceState().then((state: any) => {
    // store.dispatch(authAddDevice(state.userId)); // Update deviceId from reducer
    return state.userId;
  });
}

export default update;
