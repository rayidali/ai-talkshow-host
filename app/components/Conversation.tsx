'use client';

import { useConversation } from '@11labs/react';
import { useCallback, useState, useRef, useEffect } from 'react';

interface TranscriptMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
}

interface Message {
  source: 'ai' | 'user';
  message: string;
}

export function Conversation() {
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const transcriptCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll transcript container to bottom when new messages arrive
    if (transcriptEndRef.current) {
      transcriptEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [transcript]);

  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to Celestia Fierce');
      setErrorMessage('');
    },
    onDisconnect: () => {
      console.log('Disconnected from Celestia');
    },
    onMessage: (msg: Message) => {
      console.log('onMessage:', msg);
      const { source, message } = msg;
      if (!message) return;

      let role: 'user' | 'ai' = 'user';
      if (source === 'ai') role = 'ai';

      setTranscript((prev) => [
        ...prev,
        {
          id: `${role}_${Date.now()}_${Math.random().toString(36).slice(2)}`,
          role,
          text: message,
        },
      ]);
    },
    onError: (error: Error | string) => {
      console.error('Conversation error:', error);
      setErrorMessage(typeof error === 'string' ? error : error.message || 'An error occurred.');
    },
  });

  // If private agent, you fetch a signed URL here
  const getSignedUrl = async (): Promise<string> => {
    const res = await fetch('/api/get-signed-url');
    if (!res.ok) {
      throw new Error(`Failed to get signed URL: ${res.statusText}`);
    }
    const data = await res.json();
    return data.signedUrl;
  };

  // Start conversation (fresh transcript each time)
  const startConversation = useCallback(async () => {
    try {
      setTranscript([]);
      await navigator.mediaDevices.getUserMedia({ audio: true });
      const signedUrl = await getSignedUrl();
      await conversation.startSession({ signedUrl });
      setTranscript((prev) => [
        ...prev,
        {
          id: `start_${Date.now()}`,
          role: 'user',
          text: '--- Conversation Started ---',
        },
      ]);
    } catch (err: unknown) {
      console.error('Failed to start conversation:', err);
      setErrorMessage(err instanceof Error ? err.message : 'Could not start conversation.');
    }
  }, [conversation]);

  // Stop conversation
  const stopConversation = useCallback(async () => {
    await conversation.endSession();
    setTranscript((prev) => [
      ...prev,
      {
        id: `stop_${Date.now()}`,
        role: 'user',
        text: '--- Conversation Stopped ---',
      },
    ]);
  }, [conversation]);

  // Single button toggle
  const toggleConversation = async () => {
    if (conversation.status === 'connected') {
      await stopConversation();
    } else {
      await startConversation();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <button
        onClick={toggleConversation}
        className="retro-button"
        aria-label={conversation.status === 'connected' ? 'Stop Chat' : 'Start Chat'}
      >
        {conversation.status === 'connected' ? 'Stop Chat' : 'Start Chat'}
      </button>

      {errorMessage && (
        <p
          style={{
            color: '#d7263d',
            marginBottom: '1rem',
            fontFamily: 'var(--font-body)',
          }}
        >
          {errorMessage}
        </p>
      )}

      {conversation.status === 'connected' && (
        <div
          ref={transcriptCardRef}
          className="retro-card"
          style={{
            width: '100%',
            maxWidth: '480px',
            margin: '0 auto',
            marginTop: '0.5rem',
            minHeight: '60px',
            padding: '1.5rem 2rem',
            boxShadow: '0 4px 24px rgba(44, 24, 8, 0.10)',
          }}
        >
          <h2
            className="main-heading"
            style={{
              fontSize: '1.3rem',
              marginBottom: '0.9rem',
              color: '#a85b2a',
              textAlign: 'center',
              letterSpacing: '1px',
            }}
          >
            Transcript
          </h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              maxHeight: '180px',
              overflowY: 'auto',
            }}
          >
            {transcript.map((msg) => (
              <div
                key={msg.id}
                className="transcript-bubble"
                style={{
                  background: msg.role === 'ai' ? '#f6e7c1' : '#fffbe9',
                  color: '#2d1c0b',
                  borderRadius: '10px',
                  padding: '0.6rem 0.9rem',
                  fontFamily: 'var(--font-body)',
                  boxShadow: '0 1px 4px rgba(44,24,8,0.06)',
                  alignSelf: msg.role === 'ai' ? 'flex-start' : 'flex-end',
                  maxWidth: '90%',
                  fontSize: '1rem',
                }}
              >
                <strong
                  style={{
                    marginRight: '0.4rem',
                    fontFamily: 'var(--font-body)',
                    color: '#a85b2a',
                    fontSize: '1.05em',
                  }}
                >
                  {msg.role === 'ai' ? 'AI' : 'You'}:
                </strong>
                {msg.text}
              </div>
            ))}
            <div ref={transcriptEndRef} />
          </div>
        </div>
      )}
    </div>
  );
}
