import { IItem } from "../types";

export interface IViewItem {
  id: string;
  name: string;
  render(item: IItem): HTMLElement;
  setCopyHandler(handleCopyItem: Function): void;
  setDeletedHandler(handleDeleteitem: Function): void;
}

export interface IViewConstructor {
  new (template: HTMLTemplateElement): IViewItem;
}

export class Item implements IViewItem {
  protected itemElement: HTMLElement;
  protected title: HTMLElement;
  protected _id: string;
  protected copyButton: HTMLButtonElement;
  protected handleCopyItem: Function;
  protected deleteButton: HTMLButtonElement;
  protected handleDeleteitem: Function;

  constructor(template: HTMLTemplateElement) {
    this.itemElement = template.content
      .querySelector(".todo-item")
      .cloneNode(true) as HTMLElement;
    this.title = this.itemElement.querySelector(".todo-item__text");
    this.copyButton = this.itemElement.querySelector(".todo-item__copy");
    this.deleteButton = this.itemElement.querySelector(".todo-item__del");
  }

  set id(value: string) {
    this._id = value;
  }

  get id(): string {
    return this._id || "";
  }

  set name(value: string) {
    this.title.textContent = value;
  }

  get name(): string {
    return this.title.textContent || "";
  }

  setCopyHandler(handleCopyItem: Function) {
    this.handleCopyItem = handleCopyItem;
    this.copyButton.addEventListener("click", (evt) => {
      this.handleCopyItem(this);
    });
  }

  setDeletedHandler(handleDeleteitem: Function) {
    this.handleDeleteitem = handleDeleteitem;
    this.deleteButton.addEventListener("click", (evt) => {
      this.handleDeleteitem(this);
    });
  }

  render(item: IItem) {
    this.name = item.name;
    this.id = item.id;
    return this.itemElement;
  }
}
