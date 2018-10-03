export interface IPost {
  id: number;
  userId: number;
  title: string;
  body: string;
  commentsQnty: number;
}

export interface IComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}
