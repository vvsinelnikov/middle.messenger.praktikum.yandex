import userAPI from '../../api/user-api';
import store from '../../services/store/store';

export default new class UserController {
    public getUser() {
        userAPI.getUser()
            .then((data: any) => {
                store.set('user', data);
            })
    };
};
