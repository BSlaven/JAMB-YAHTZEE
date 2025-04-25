import { useState, useEffect } from 'react';

import { io } from 'socket.io-client';

const socket = io("http://localhost:3000", {
  withCredentials: true
});

const OppComponent = () => {

  const [ opponentData, setOpponentData ] = useState('')

  useEffect(() => {
    socket.on('opponentData', (data) => {
      setOpponentData(data);
    });

    return () => {
      socket.off('opponentData');
    }
  }, [])

  const sendData = data => {
    socket.emit('opponentData', data);
  }
  
  return (
    <div>
      <h5>Opponent Component</h5>
      {opponentData && <p>Opponent: {opponentData}</p>}

      
      <button onClick={() => sendData('Slaven je živa legenda')}>Send</button>
    </div>
  )
}

export default OppComponent