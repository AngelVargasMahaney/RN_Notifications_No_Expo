
import { Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
// import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const App = () => {

  const [socketUrl, setSocketUrl] = useState('ws://20.122.144.190:6002/app/devSalares?protocol=7&client=js&version=7.0.6&flash=false');
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);



  const handleClickSendMessage = useCallback(() => sendMessage(JSON.stringify({
    "event": "pusher:subscribe",
    "data": {
      "auth": "",
      "activityTimeout": 10000,
      "channel": "notification-user-8"
    }
  })), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];
useEffect(() => {
  alert('Other message received')
}, [lastMessage])

  return (
    <ScrollView>

      <Button
        onPress={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
        title='  Click Me to send: Hello'
      />
      <Text>The WebSocket is currently {connectionStatus}</Text>
      {lastMessage ? <Text>Last message: {lastMessage.data}</Text> : null}
      <View>
        {messageHistory.map((message, idx) => (
          <Text key={idx}>{message ? message.data : null}</Text>
        ))}
      </View>
    </ScrollView>
  );

}

export default App
