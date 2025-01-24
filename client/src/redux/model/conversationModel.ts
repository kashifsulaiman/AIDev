import { Action, action } from 'easy-peasy';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ConversationModel {
  conversationId: string | null;
  messages: Message[];
  setConversationId: Action<ConversationModel, string | null>;
  addMessage: Action<ConversationModel, Message>;
  setMessages: Action<ConversationModel, Message[]>;
}

const conversationModel: ConversationModel = {
  conversationId: null, 
  messages: [], 

  setConversationId: action((state, payload) => {
    state.conversationId = payload;
  }),
  addMessage: action((state, payload) => {
    state.messages.push({
      role: payload.role,
      content: payload.content,
    });
  }),
  setMessages: action((state, payload) => {
    state.messages = payload.map((message) => ({
      role: message.role,
      content: message.content,
    }));
  }),
};

export default conversationModel;
