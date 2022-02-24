import EventBus from '../event-bus';
import set from '../../utils/set';

export enum StoreEvents {
    Updated = 'updated',
}

class Store extends EventBus {
    static __instance: Store;

    private state: any = {
        user: {name: 'Default Name', avatar: 'Default Avatar'},
    };

    constructor() {
        super();
        if (Store.__instance) {
            return Store.__instance;
        }
        Store.__instance = this;
    };

    public getState(): any {
        return this.state;
    };

    public set(path: string, value: unknown) {
        set(this.state, path, value);
        this.emit(StoreEvents.Updated);
    };
}

export default new Store();
