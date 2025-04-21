import AgoraRTC from 'agora-rtc-sdk-ng';
import { AGORA_APP_ID, AGORA_TOKEN, CHANNEL_NAME } from './Agora_Configure.js'; // Ensure these are defined in your environment or config

let isJoined = false; // 🔒 Prevent multiple joins

export const useAgoraVoice = () => {
  const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

  const joinChannel = async () => {
    try {
      if (isJoined || client.connectionState === 'CONNECTED' || client.connectionState === 'CONNECTING') {
        console.warn("Already connected or connecting. Ignoring duplicate join...");
        return;
      }

      await client.join(AGORA_APP_ID, CHANNEL_NAME, AGORA_TOKEN, null);
      const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      await client.publish([localAudioTrack]);
      isJoined = true;
      console.log("✅ Joined and published to the channel!");
    } catch (err) {
      console.error("❌ Failed to join:", err);
    }
  };

  return { joinChannel };
};
