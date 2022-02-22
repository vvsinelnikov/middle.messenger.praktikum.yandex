import EventBus from '../utils/event-bus';
import set from '../utils/set';

export enum StoreEvents {
    Updated = 'updated',
}

class Store extends EventBus {
    private state: any = {};

    public getState(): any {
        return this.state;
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);
        this.emit(StoreEvents.Updated);
    };
}

export default new Store();
