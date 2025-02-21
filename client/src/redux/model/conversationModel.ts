import { Project } from '@stackblitz/sdk';
import { Action, action } from 'easy-peasy';

export interface Message {
  userPrompt: string;
  aiResponse: string;
  code: Project;
  _id: string;
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
  clearConversation: Action<ConversationModel>;
  setChatList: Action<ConversationModel, ChatList[]>;
}
export interface ConversationIdApiResponse {
  _id: string;
  messages: Message[];
}
const initialState: Conversation = {
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
      userPrompt: payload.userPrompt,
      aiResponse: payload.aiResponse,
      code: payload.code,
      _id: payload._id,
    });
  }),
  setMessages: action((state, payload) => {
    state.conversation.messages = payload.map((message) => ({
      userPrompt: message.userPrompt,
      aiResponse: message.aiResponse,
      code: message.code,
      _id: message._id,
    }));
  }),
};

export default conversationModel;
