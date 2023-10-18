export type User = {
  username: string;
  name: string;
  imgSrc?: string;
  followers: number;
  following: number;
  privateKey: string;
};

export type AuthType = {
  [key: string]: User;
};
