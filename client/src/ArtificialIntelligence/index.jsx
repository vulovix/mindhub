import React, { useEffect, useMemo, useRef, useState } from 'react';
import api, { defaults } from 'shared/utils/api';
import { ArtificialIntelligencePage, Prompt } from './Styles';
import Conversation from './Conversation';

const deviceId = 'xxxxxx';

export default function ArtificialIntelligence() {
  const $textareaRef = useRef();
  const [messages, setMessages] = useState([
    {
      role: 'system',
      content: 'Hello! My name is Wisdom. How can I assist you today?',
    },
  ]);

  const [body, setBody] = useState();

  const aiStream = useMemo(() => new EventSource(`${defaults.baseURL}/stream`), []);
  const messagesTemp = useRef(messages);
  useEffect(() => {
    aiStream.addEventListener(deviceId, e => {
      const data = JSON.parse(e.data);
      const existingMessage = messagesTemp.current.find(x => x.id === data.id);
      if (existingMessage) {
        setMessages(msgs => {
          const result = msgs.map(x =>
            x.id === data.id
              ? {
                  id: data.id,
                  role: data.role,
                  content: `${x.content}${data.content}`,
                }
              : x,
          );
          messagesTemp.current = result;
          return result;
        });
      } else {
        setMessages(msgs => {
          const result = [...msgs, data];
          messagesTemp.current = result;
          return result;
        });
      }
    });
    return () => {
      aiStream.close();
    };
  }, [aiStream]);

  const onSubmit = async () => {
    const payload = messages
      .map(({ role, content }) => ({ role, content }))
      .concat({
        role: 'user',
        content: body,
      });
    setMessages(payload);
    setBody(''.trim());

    api.post('/prompts', { deviceId, messages: payload });
  };

  const handleSubmit = () => {
    if ($textareaRef.current.value.trim()) {
      onSubmit();
    }
  };

  const onKeyDown = e => {
    if (e.key === 'Enter') {
      if (!e.shiftKey) {
        handleSubmit();
        return false;
      }
    }
  };

  const onChange = () => {
    setBody($textareaRef.current.value.trimStart());
  };

  return (
    <ArtificialIntelligencePage>
      <Conversation messages={messages} />
      <Prompt
        autoFocus
        value={body}
        placeholder="Ask anything..."
        onKeyDown={onKeyDown}
        onChange={onChange}
        ref={$textareaRef}
      />
    </ArtificialIntelligencePage>
  );
}
