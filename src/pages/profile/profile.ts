import Block from '../../services/block';
import Heading from '../../components/heading/heading';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Link from '../../components/link/link';
import Form from '../../modules/form/form';
import templatePage from './profile.tmpl';
import template from './form.tmpl';
import '../index.css';
import './profile.css';
import connect from '../../services/store/connect';
import userController from './user-controller'
import store, { StoreEvents } from '../../services/store/store';

// Создание класса и рендеринг страницы
class Profile extends Block {
  // static heading = new Heading({
  //   headingText: store.getState().user.name,
  //   // headingText: 'Иван',
  //   className: 'heading',
  // });

  // Элементы форм
  static inputEmail = new Input({
    className: 'profile__field',
    name: 'email',
    placeholder: 'pochta@yandex.ru',
    type: 'email',
    maxLength: 40,
    required: 'required',
    disabled: 'disabled',
  });
  static inputLogin = new Input({
    className: 'profile__field',
    name: 'login',
    placeholder: 'ivanivanov',
    type: 'text',
    minLength: 2,
    maxLength: 40,
    required: 'required',
    disabled: 'disabled',
  });
  static inputName = new Input({
    className: 'profile__field',
    name: 'name',
    placeholder: 'Иван',
    type: 'text',
    minLength: 2,
    maxLength: 40,
    required: 'required',
    disabled: 'disabled',
  });
  static inputSurname = new Input({
    className: 'profile__field',
    name: 'surname',
    placeholder: 'Иванов',
    type: 'text',
    minLength: 2,
    maxLength: 40,
    required: 'required',
    disabled: 'disabled',
  });
  static inputDisplayName = new Input({
    className: 'profile__field',
    name: 'displayName',
    placeholder: 'Иван',
    type: 'text',
    minLength: 2,
    maxLength: 40,
    required: 'required',
    disabled: 'disabled',
  });
  static inputTel = new Input({
    className: 'profile__field',
    name: 'tel',
    placeholder: '+7 (909) 967 30 30',
    type: 'tel',
    maxLength: 40,
    required: 'required',
    disabled: 'disabled',
  });

  // Форма
  static form = new Form({
    className: 'profile__form',
    template,
    inputEmail: Profile.inputEmail,
    inputLogin: Profile.inputLogin,
    inputName: Profile.inputName,
    inputSurname: Profile.inputSurname,
    inputDisplayName: Profile.inputDisplayName,
    inputTel: Profile.inputTel,
  })

  // Кнопка сохранения
  static button = new Button({
    buttonText: 'Сохранить',
    className: 'welcome__button',
    type: 'submit',
    events: {
      click: (evt: Event) => {
        evt.preventDefault();
        Profile.form.enableValidation();
        Profile.form.sendForm();
      },
    },
  });
  // Кнопки-ссылки управления
  static linkEditProfile = new Link({
    className: 'link',
    linkText: 'Изменить данные',
    href: '/',
    events: {
      click: (evt: Event) => {
        evt.preventDefault();
        Profile.editProfile();
      },
    },
  });
  static linkEditPassword = new Link({
    className: 'link',
    linkText: 'Изменить пароль',
    href: '/',
    // TODO Сделать попап
  });
  static linkLogout = new Link({
    className: 'link',
    linkText: 'Выйти',
    href: '/',
  });

  static editProfile = (): void => {
    Profile.linkEditProfile.hide();
    Profile.linkEditPassword.hide();
    Profile.linkLogout.hide();
    Profile.button.show();
    Profile.inputEmail.setProps({ disabled: false });
    Profile.inputLogin.setProps({ disabled: false });
    Profile.inputName.setProps({ disabled: false });
    Profile.inputSurname.setProps({ disabled: false });
    Profile.inputDisplayName.setProps({ disabled: false });
    Profile.inputTel.setProps({ disabled: false });
  };

  static __instance: Profile;
  userController: any;

  constructor(props) {
    if (Profile.__instance) {
      return Profile.__instance;
    }

    super('div', {
      className: 'profile',
      // heading: Profile.heading,
      form: Profile.form,
      button: Profile.button,
      linkEditProfile: Profile.linkEditProfile,
      linkEditPassword: Profile.linkEditPassword,
      linkLogout: Profile.linkLogout,
    });

    // Уже есть в connect, здесь больше не нужно
    // store.on(StoreEvents.Updated, () => {
    //   this.setProps({...store.getState()});
    // });

    this.props = props
    this.heading = new Heading({
      headingText: this.props.user.name,
      className: 'heading',
    })

    this.setProps({
      heading: this.heading,
    })

    userController.getUser();

    Profile.button.hide();

    Profile.__instance = this;
  }

  public render() {
    return this.compile(templatePage, {});
  }

  public editProfile(): void {
    return this.editProfile();
  }
};

function mapUserToProps(state: any) {
  return {
    user: {
      name: state.user.name,
      avatar: state.user.avatar,
    }
  };
};

export default connect(Profile, mapUserToProps);
