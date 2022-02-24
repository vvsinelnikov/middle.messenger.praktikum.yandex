import Block from '../block';
import store, { StoreEvents } from '../store/store';

export default function connect(Component: typeof Block, mapStateToProps: (state: any) => any) {
    return class extends Component {
        constructor(className: string, props: any) {
            super(className, {...props, ...mapStateToProps(store.getState())});
            store.on(StoreEvents.Updated, () => {
                this.setProps({...mapStateToProps(store.getState())});
            });
        }
    }
}

// export const withUser = connect(state => ({ user: state.user }));
