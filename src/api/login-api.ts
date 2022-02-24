import HTTPTransport from '../api/http-transport';
import { BaseAPI } from './base-api';

const authAPIInstance = new HTTPTransport('api/v1/chats');

export default class LoginAPI extends BaseAPI {
    public request(user: LoginRequest) {
        return authAPIInstance.post<LoginRequest, LoginResponse>('/login', user)
            .then(({user_id}) => user_id); // Обрабатываем получение данных из сервиса далее
    }
}
