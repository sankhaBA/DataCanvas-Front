import mqtt from 'mqtt';

const client = mqtt.connect('wss://broker.emqx.io:8084/mqtt', {
  clientId: 'mqttx_790fvffdfd0c455',
  username: 'emqx'
});

const subscribe = (topic) => {
  return new Promise((resolve, reject) => {
    client.subscribe(topic, (err) => {
      if (err) {
        console.error('Failed to subscribe to topic:', err);
        reject(err); // Reject the promise if there's an error
      } else {
        console.log(`Subscribed to topic: ${topic}`);
        resolve(`Subscribed to topic: ${topic}`); // Resolve the promise on success
      }
    });
  });
};

export { client, subscribe };