import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {authAddDevice} from '../store/auth';
// import store from '../store';

async function setOneSignal() {
  //OneSignal Init Code
  OneSignal.setLogLevel(6, 0);
  console.log('ID:');

  OneSignal.setAppId('cbeb50d3-1f72-4dc8-a111-6fa09ef071af');
  //END OneSignal Init Code

  OneSignal.getDeviceState()
    .then(state => {
      console.log(state);
      console.log('OneSignal Device ID:', state?.userId);

      if (state?.userId) {
        return AsyncStorage.setItem('deviceID', state.userId);
      }
    })
    .then(() => {
      // store.dispatch(authAddDevice(state.userId)); // Update deviceId from reducer
    })
    .catch(error => {
      console.error('Error:', error);
    });

  //Prompt for push on iOS
  OneSignal.promptForPushNotificationsWithUserResponse(response => {
    console.log('Prompt response:', response);
  });
  //Method for handling notifications received while app in foreground
  OneSignal.setNotificationWillShowInForegroundHandler(
    notificationReceivedEvent => {
      console.log(
        'OneSignal: notification will show in foreground:',
        notificationReceivedEvent,
      );
      let notification = notificationReceivedEvent.getNotification();
      console.log('notification: ', notification);
      const data = notification.additionalData;
      console.log('additionalData: ', data);
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    },
  );
}

export default setOneSignal;
