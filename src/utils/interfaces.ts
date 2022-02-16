export interface IBlock {
  className?: string;
  template?: string;
  events?: { [index: string] : (evt: Event) => void }
  settings?: { withInternalID: boolean };
  headingText?: string; // Heading
  errorText?: string; // 404
  errorNumber?: number; // 404
  buttonText?: string; // Button
  type?: string; // Input, Button
  name?: string; // Input
  placeholder?: string; // Input
  minLength?: number; // Input
  maxLength?: number; // Input
  required?: string; // Input
  disabled?: string; // Input
  href?: string; // Link
  linkText?: string; // Link

  heading?: IBlock;
  input?: IBlock;
  link?: IBlock;
  button?: IBlock;
  greeting? : IBlock;
  snippetList?: IBlock;
  snippet?: IBlock;
  chatList?: IBlock;
  chat?: IBlock;

  firstName?: string; // Home
  secondName?: string; // Home
  avatar?: string; // Home

  children?: { [index: string] : IBlock } // Block
  __id?: string; // Block

  // user?: IUser;

  snippetData?: IChatResponse // Snippet
  displayName?: string; // Snippet
  time?: string; // Snippet
  text?: string; // Snippet
  isMineClass?: string; // Snippet
  chatId?: number; // Snippet
  unreadCount?: number; // Snippet

  timeStamp?: string,
  message?: string,
  direction? : string;
  image?: string;
}

export interface ISnippetList {

}

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
