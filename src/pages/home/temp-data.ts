// Ответ на GET /auth/user и /user/{id}
export interface IUser {
  // user: IUser;
  id?: number; // User id
  first_name: string; // First name
  second_name: string; // Second name
  display_name?: string // Display name
  login: string; // User login - unique
  email: string; // Email
  phone: string; // Phone
  avatar: string; // Avatar
  role?: string; // для ChatUsers
}
export type IUsers = Array<IUser>;
export const myUser: IUser = {
  id: 256,
  first_name: 'Вова',
  second_name: 'Синельников',
  display_name: 'Это я, Синельников',
  login: 'vvsin',
  email: 'sinelnikov@gmail.com',
  phone: '8(995)-211-37-89',
  avatar: '/path/to/avatar.jpg',
};
export const users: IUsers = [
  {
    id: 123,
    first_name: 'Petya',
    second_name: 'Pupkin',
    display_name: 'Petya Pupkin',
    login: 'userLogin',
    email: 'my@email.com',
    phone: '89223332211',
    avatar: '/path/to/avatar.jpg',
  },
  {
    id: 124,
    first_name: 'Вася',
    second_name: 'Иванов',
    display_name: 'Вася',
    login: 'userLogin',
    email: 'my@email.com',
    phone: '89223332211',
    avatar: '/path/to/avatar2.jpg',
  },
];

export const chatUsers: IUsers = [
  {
    id: 256,
    first_name: 'Вова',
    second_name: 'Синельников',
    display_name: 'Это я, Синельников',
    login: 'vvsin',
    email: 'sinelnikov@gmail.com',
    phone: '8(995)-211-37-89',
    avatar: '/path/to/avatar.jpg',
    role: 'admin',
  },
  {
    id: 123,
    first_name: 'petya',
    second_name: 'petrov',
    display_name: 'petya petrov',
    login: 'my-login',
    email: 'my@email.com',
    phone: '89223332211',
    avatar: '/path/to/my-file.jpg',
    role: 'admin',
  },
];

// Ответ на GET /chats
export interface IChatResponse {
  user?: IUser;
  id: number; // Chat id
  title: string; // Chat title
  avatar: string; // Chat avatar
  unread_count: number; // Number of unread messages in chat for current user
  last_message: {
    user: IUser;
    time: string; // Message timestamp
    content: string | number; // Message content
  };
}
export type IChatResponses = Array<IChatResponse>;
export const chatResponses: IChatResponses = [
  {
    id: 256,
    title: 'my-chat',
    avatar: '/123/avatar1.jpg',
    unread_count: 18,
    last_message: {
      user: {
        first_name: 'Вова',
        second_name: 'Синельников',
        avatar: '/path/to/avatar.jpg',
        email: 'my@email.com',
        login: 'vvsin',
        phone: '8(911)-222-33-22',
      },
      time: '2020-01-02T14:22:22.000Z',
      content: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n \nХассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
    },
  },
  {
    id: 251,
    title: 'my-chat',
    avatar: '/123/avatar1.jpg',
    unread_count: 2,
    last_message: {
      user: {
        first_name: 'Петя',
        second_name: 'Иванов',
        avatar: '/path/to/avatar.jpg',
        email: 'my@email.com',
        login: 'ivanov',
        phone: '8(911)-222-33-22',
      },
      time: '2020-01-02T14:22:22.000Z',
      content: 'НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n \nХассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
    },
  },
  {
    id: 123,
    title: 'my-chat',
    avatar: '/123/avatar1.jpg',
    unread_count: 0,
    last_message: {
      user: {
        first_name: 'Petya',
        second_name: 'Pupkin',
        avatar: '/path/to/avatar.jpg',
        email: 'my@email.com',
        login: 'userLogin',
        phone: '8(911)-222-33-22',
      },
      time: '2020-01-02T14:22:22.000Z',
      content: 132,
    },
  },
];

export interface IChatMessage {
  id: number; // Message id
  user_id: number; // User id
  chat_id: number; // Chat id
  time: string; // Message sent time
  type: string; // Message type ([ message, file ])
  content: string | number; // Message content (message text for messages and resourceId for files)
  file?: object;
}
export type IChatMessages = Array<IChatMessage>;
export const chatMessages: IChatMessages = [
  {
    id: 123,
    user_id: 2561,
    chat_id: 312,
    time: '2020-01-02T14:22:22.000Z',
    type: 'message',
    content: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n \nХассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
  },
  {
    id: 124,
    user_id: 256,
    chat_id: 312,
    time: '2020-01-02T14:22:22.000Z',
    type: 'file',
    content: 132,
    file: {
      id: 132,
      user_id: 231,
      path: '/32543654dsf/434534r3rsddfs_my-file.jpg',
      filename: 'my-file.jpg',
      content_type: 'image/jpeg',
      content_size: 543672,
      upload_date: '2020-01-02T14:22:22.000Z',
    },
  },
  {
    id: 123,
    user_id: 256,
    chat_id: 3112,
    time: '2020-01-02T14:22:22.000Z',
    type: 'message',
    content: 'НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n \nХассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
  },
];

export interface IChatFile {
  id: number; // Message id
  user_id: number; // User id
  chat_id: number; // Chat id
  time: string; // Message sent time
  type: string; // Message type ([ message, file ])
  content: string | number; // Message content (message text for messages and resourceId for files)
  file?: object;
}
export type IChatFiles = Array<IChatFile>;
export const chatFiles: IChatFiles = [
  {
    id: 124,
    user_id: 256,
    chat_id: 312,
    time: '2020-01-02T14:22:22.000Z',
    type: 'file',
    content: 132,
    file: {
      id: 132,
      user_id: 231,
      path: '/32543654dsf/434534r3rsddfs_my-file.jpg',
      filename: 'my-file.jpg',
      content_type: 'image/jpeg',
      content_size: 543672,
      upload_date: '2020-01-02T14:22:22.000Z',
    },
  },
];
