export interface userI {
  email: string;
  password: string;
  phoneNumber: string;
  userName: string;
  __v: number;
  _id: string;
  imageUrl: string;
}

export interface BookI {
  author: string;
  category: string;
  currency: string;
  image: string;
  language: string;
  name: string;
  pagesNumber: number;
  price: number;
  rating: number;
  description: string;
  __v?: number;
  _id: string;
}
