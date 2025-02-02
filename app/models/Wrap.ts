interface Wrap {
  _id: string;
  title: string;
  image: string;
  filename: string;
  author: string;
  createdAt: Date;
  description?: string;
  official: boolean;
  profilePicture: string;
  anonymous: boolean;
  isAuthor?: boolean;
}

export default Wrap;
