import Block from './block';
import StoreEvents from '../store/store';
import store from '../store/store';

export default function connect(Component: typeof Block, mapStateToProps: (state: Indexed) => Indexed) {
    return class extends Component {
        constructor(props: any) {
            super({...props, ...mapStateToProps(store.getState())});
            // store.on(StoreEvents.Updated, () => {
            //     this.setProps({...mapStateToProps(store.getState())});
            // });
        }
    }
}

// export const withUser = connect(state => ({ user: state.user }));
