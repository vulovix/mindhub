import React from 'react';
import magicIcon from 'App/assets/icons/magic.svg';
import messageIcon from 'App/assets/icons/message.svg';

import { ConversationWrapper, Icon, Row, SystemMessage, UserMessage } from './Styles';

export default function Conversation({ messages }) {
  return (
    <ConversationWrapper>
      {messages.map(message => {
        const MessageComponent = message.role === 'user' ? UserMessage : SystemMessage;
        return (
          <Row key={message.id || Math.random()}>
            <Icon size={20} avatarUrl={message.role === 'user' ? messageIcon : magicIcon} />
            <MessageComponent>{message.content}</MessageComponent>
          </Row>
        );
      })}
    </ConversationWrapper>
  );
}
