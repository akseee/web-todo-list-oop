import { IEvent } from "./../components/EventEmitter";
export interface IItem {
  id: string;
  name: string;
}

export interface IToDoModel extends IEvent {
  items: IItem[];
  addItem: (data: string) => IItem;
  removeItem: (id: string) => void;
  getItem: (id: string) => IItem;
  editItem: (id: string, name: string) => void;
}
