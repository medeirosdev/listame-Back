/* eslint-disable camelcase */
interface Data {
  height: number;
  is_silhouette: boolean;
  url: string;
  width: number;
}

interface Picture {
  data: Data;
}

export interface IFacebookUser {
  email: string;
  name: string;
  picture: Picture;
  id: string;
}
