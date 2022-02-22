import HTTPTransport from '../utils/http-transport';
import { BaseAPI } from './base-api';

const chatMessagesAPIInstance = new HTTPTransport('api/v1/messages');

export default class ChatMessagesAPI extends BaseAPI {
    request({id}: any) {
        return chatMessagesAPIInstance.get(`/${id}`);
    }
}
