interface Wrap {
  _id: string;
  title: string;
  image: string;
  author: string;
  description?: string;
  official?: boolean;
  sha?: number;
  profilePicture?: string;
  anonymous?: boolean;
  isAuthor?: boolean;
}

export default Wrap;
