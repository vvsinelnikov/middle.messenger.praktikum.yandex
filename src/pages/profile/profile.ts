import Block from '../../utils/block';
import Heading from '../../components/heading/heading';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Link from '../../components/link/link';
import Form from '../../modules/form/form';
import templatePage from './profile.tmpl';
import template from './form.tmpl';
import render from '../../utils/render';
import '../index.css';
import './profile.css';
import connect from '../../utils/connect';

function profilePage() {
// Данные для инпутов
  const emailData = {
    className: 'profile__field',
    name: 'email',
    placeholder: 'pochta@yandex.ru',
    type: 'email',
    maxLength: 40,
    required: 'required',
    disabled: 'disabled',
  };

  const loginData = {
    className: 'profile__field',
    name: 'login',
    placeholder: 'ivanivanov',
    type: 'text',
    minLength: 2,
    maxLength: 40,
    required: 'required',
    disabled: 'disabled',
  };

  const nameData = {
    className: 'profile__field',
    name: 'name',
    placeholder: 'Иван',
    type: 'text',
    minLength: 2,
    maxLength: 40,
    required: 'required',
    disabled: 'disabled',
  };

  const surnameData = {
    className: 'profile__field',
    name: 'surname',
    placeholder: 'Иванов',
    type: 'text',
    minLength: 2,
    maxLength: 40,
    required: 'required',
    disabled: 'disabled',
  };

  const displayData = {
    className: 'profile__field',
    name: 'displayName',
    placeholder: 'Иван',
    type: 'text',
    minLength: 2,
    maxLength: 40,
    required: 'required',
    disabled: 'disabled',
  };

  const telData = {
    className: 'profile__field',
    name: 'tel',
    placeholder: '+7 (909) 967 30 30',
    type: 'tel',
    maxLength: 40,
    required: 'required',
    disabled: 'disabled',
  };

// Элемены формы
  const inputEmail = new Input(emailData);
  const inputLogin = new Input(loginData);
  const inputName = new Input(nameData);
  const inputSurname = new Input(surnameData);
  const inputDisplayName = new Input(displayData);
  const inputTel = new Input(telData);

  const heading = new Heading({
    headingText: 'Иван',
    className: 'heading',
  });

// Кнопка сохранения
  const button = new Button({
    buttonText: 'Сохранить',
    className: 'welcome__button',
    type: 'submit',
    events: {
      click: (evt: Event) => {
        evt.preventDefault();
        form.enableValidation();
        form.sendForm();
      },
    },
  });

// Кнопки-ссылки управления
  const linkEditProfile = new Link({
    className: 'link',
    linkText: 'Изменить данные',
    href: '#',
    events: {
      click: (evt: Event) => {
        evt.preventDefault();
        profile.editProfile();
      },
    },
  });

  const linkEditPassword = new Link({
    className: 'link',
    linkText: 'Изменить пароль',
    href: '#',
    // TODO Сделать попап
  });

  const linkLogout = new Link({
    className: 'link',
    linkText: 'Выйти',
    href: '/',
  });

// Форма с элементами
  const form = new Form({
    className: 'profile__form',
    template,
    inputEmail,
    inputLogin,
    inputName,
    inputSurname,
    inputDisplayName,
    inputTel,
  });

// Создание класса и рендеринг страницы
  class Profile extends Block {
    constructor(props: {
      className: string;
      heading: Heading
      form: Form
      linkEditProfile: Link
      linkEditPassword: Link
      linkLogout: Link
      button: Button
      editProfile: () => void
    }) {
      super('div', props);
      this.props = props;
      if (props.editProfile) {
        this.editProfile = props.editProfile;
      }
    }

    public render() {
      return this.compile(templatePage, this.props);
    }

    public editProfile(): void {
      return this.editProfile();
    }
  }

  const profile = new Profile({
    className: 'profile',
    heading,
    form,
    linkEditProfile,
    linkEditPassword,
    linkLogout,
    button,
    editProfile: (): void => {
      linkEditProfile.hide();
      linkEditPassword.hide();
      linkLogout.hide();
      button.show();
      inputEmail.setProps({ disabled: false });
      inputLogin.setProps({ disabled: false });
      inputName.setProps({ disabled: false });
      inputSurname.setProps({ disabled: false });
      inputDisplayName.setProps({ disabled: false });
      inputTel.setProps({ disabled: false });
    },
  });
  render('.page', profile.getContent());
  profile.dispatchComponentDidMount();
  button.hide();
}

export default profilePage;

// function mapUserToProps(state: any) {
//   return {
//     name: state.user.name,
//     avatar: state.user.avatar,
//   };
// }
//
// export default connect(profilePage.Profile, mapUserToProps);
