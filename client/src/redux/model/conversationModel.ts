import { Action, action } from 'easy-peasy';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}
interface ChatList {
  _id: string;
  title: string;
  userId: string;
}

interface Conversation {
  title: string | null;
  conversationId: string | null;
  messages: Message[];
  chatList: ChatList[];
}
export interface ConversationModel {
  conversation: Conversation;
  setConversation: Action<ConversationModel, Conversation>;
  addMessage: Action<ConversationModel, Message>;
  setMessages: Action<ConversationModel, Message[]>;
  clearConversation: Action<ConversationModel, Message[]>;
  setChatList: Action<ConversationModel, ChatList[]>;
}
export interface ConversationIdApiResponse {
  _id: string;
  code: string;
  messages: Message[];
}
const initialState = {
  title: '',
  conversationId: null,
  messages: [],
  chatList: [],
};
const conversationModel: ConversationModel = {
  conversation: initialState,
  setConversation: action((state, payload) => {
    state.conversation = { ...state.conversation, ...payload };
  }),
  setChatList: action((state, payload) => {
    state.conversation.chatList = [...payload];
  }),
  clearConversation: action((state) => {
    state.conversation = initialState;
  }),
  addMessage: action((state, payload) => {
    state.conversation.messages.push({
      role: payload.role,
      content: payload.content,
    });
  }),
  setMessages: action((state, payload) => {
    state.conversation.messages = payload.map((message) => ({
      role: message.role,
      content: message.content,
    }));
  }),
};

export default conversationModel;
