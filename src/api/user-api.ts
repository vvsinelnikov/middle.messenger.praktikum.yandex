import HTTPTransport from '../utils/http-transport';
import { BaseAPI } from './base-api';

const userAPIInstance = new HTTPTransport('api/v1/chats');

export default class UserAPI extends BaseAPI {
    create() {
        return userAPIInstance.post('/', {})
            // И то, только в случае, если уверены в результате,
            // иначе контроллер проверит все сам дальше
            .then({user: {info}} => info);
    }
    getUser() {
        return userAPIInstance.get('/', {})
            .then({user: {info}} => info);
    }
}
