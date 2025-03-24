import { Project } from '@stackblitz/sdk';
import { Action, action } from 'easy-peasy';

export interface MessageInterface {
  userPrompt: string;
  aiResponse: string;
  code: Project;
  _id: string;
  textResponse: string;
  isQuestion: boolean;
  isSuggestion: boolean;
}
interface ChatList {
  _id: string;
  title: string;
  userId: string;
}

interface Conversation {
  title: string | null;
  conversationId: string | null;
  messages: MessageInterface[];
  chatList: ChatList[];
  questionStatus: 'pending' | 'completed' | 'saved';
  unansweredQuestions: MessageInterface[];
  unansweredQuestionIndex: number;
  refinementRequired: boolean;
}
export interface ConversationModel {
  conversation: Conversation;
  setConversation: Action<ConversationModel, Conversation>;
  addMessage: Action<ConversationModel, MessageInterface>;
  setMessages: Action<ConversationModel, MessageInterface[]>;
  clearConversation: Action<ConversationModel>;
  setChatList: Action<ConversationModel, ChatList[]>;
  setUnansweredQuestions: Action<ConversationModel, MessageInterface[]>;
  setUnansweredQuestionIndex: Action<ConversationModel, number>;
}
export interface ConversationIdApiResponse {
  _id: string;
  messages: MessageInterface[];
  questionStatus: true;
}
const initialState: Conversation = {
  title: '',
  conversationId: null,
  messages: [],
  chatList: [],
  unansweredQuestions: [],
  unansweredQuestionIndex: 0,
  questionStatus: 'pending',
  refinementRequired: true,
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
    state.conversation = {
      ...initialState,
      chatList: state.conversation.chatList,
    };
  }),
  addMessage: action((state, payload) => {
    state.conversation.messages.push({
      userPrompt: payload.userPrompt,
      aiResponse: payload.aiResponse,
      code: payload.code,
      _id: payload._id,
      textResponse: payload.textResponse,
      isQuestion: false,
      isSuggestion: false,
    });
  }),
  setMessages: action((state, payload) => {
    state.conversation.messages = payload.map((message) => ({
      userPrompt: message.userPrompt,
      aiResponse: message.aiResponse,
      code: message.code,
      _id: message._id,
      textResponse: message.textResponse,
      isQuestion: false,
      isSuggestion: false,
    }));
  }),
  setUnansweredQuestions: action((state, payload) => {
    state.conversation.unansweredQuestions = payload;
  }),
  setUnansweredQuestionIndex: action((state, payload) => {
    state.conversation.unansweredQuestionIndex = payload;
  }),
};

export default conversationModel;
