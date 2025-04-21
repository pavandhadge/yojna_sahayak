// VoiceChat.js
import React from 'react';
import { useAgoraVoice } from './AgoraVoice.js'; // Adjust the import path as necessary

const VoiceChat = () => {
  const { joinChannel } = useAgoraVoice();

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Talk to Niti</h2>
      <button
        onClick={joinChannel}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Start Voice Chat
      </button>
    </div>
  );
};

export default VoiceChat;
