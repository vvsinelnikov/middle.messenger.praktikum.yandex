import HTTPTransport from '../api/http-transport';
import { BaseAPI } from './base-api';

const userAPIInstance = new HTTPTransport('api/v1/chats');

export default new class UserAPI extends BaseAPI {
    create(): any {
        return userAPIInstance.post('/', {})
            // И то, только в случае, если уверены в результате,
            // иначе контроллер проверит все сам дальше
            // .then({user: {info}} => info);
    }
    getUser(): any {
        return Promise.resolve({name: 'New Name', avatar: 'New Avatar'})
        // return userAPIInstance.get('/', {})
            // .then({user: {info}} => info);
    }
}
