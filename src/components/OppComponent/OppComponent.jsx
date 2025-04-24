import { useState, useEffect } from 'react';

import { io } from 'socket.io-client';

const socket = io("http://localhost:3000", {
  withCredentials: true
});

const OppComponent = () => {

  const [ opponentData, setOpponentData ] = useState('Slaven je majstor')

  useEffect(() => {
    socket.on('opponentData', (data) => {
      setOpponentData(data);
    });

    return () => {
      socket.off('opponentData');
    }
  }, [])

  const sendData = () => {
    socket.emit('opponentData', opponentData);
  }
  
  return (
    <div>
      <h5>Opponent Component</h5>

      <button onClick={() => sendData()}>Send</button>
    </div>
  )
}

export default OppComponent