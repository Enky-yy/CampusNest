export interface Property {
  id: number;
  owner_id: number;

  title: string;
  description: string;

  rent: number;
  address: string;

  wifi: boolean;
  food: boolean;
  ac: boolean;
  laundry: boolean;
  image_url:string;

}