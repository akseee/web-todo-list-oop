import { IPopup } from "./Popup";
import { IViewConstructor, IViewItem } from "./Item";
import { IPage } from "./Page";
import { IToDoModel } from "./../types/index";
import { IForm, IFormConstructor } from "./Form";

export class ItemPresenter {
  protected itemTemplate: HTMLTemplateElement;
  protected formTemplate: HTMLTemplateElement;
  protected todoForm: IForm;
  protected todoEditForm: IForm;

  constructor(
    protected model: IToDoModel,
    protected formConstructor: IFormConstructor,
    protected viewPageContainer: IPage,
    protected viewItemConstructor: IViewConstructor,
    protected modal: IPopup
  ) {
    this.itemTemplate = document.querySelector(
      "#todo-item-template"
    ) as HTMLTemplateElement;
    this.formTemplate = document.querySelector(
      "#todo-form-template"
    ) as HTMLTemplateElement;
  }

  init() {
    this.todoForm = new this.formConstructor(this.formTemplate);
    this.todoForm.setHandler(this.handleSubmitForm.bind(this));
    // this.todoForm.buttonText = "Добавить";
    this.todoForm.placeholder = "Следующее дело";

    this.viewPageContainer.formContainer = this.todoForm.render();

    this.todoEditForm = new this.formConstructor(this.formTemplate);
    // this.todoEditForm.buttonText = "Изменить";
    this.todoEditForm.placeholder = "Новое название";
  }

  handleSubmitForm(data: string) {
    this.model.addItem(data);
    this.todoForm.clearValue();
    this.renderView();
  }

  handleSubmiteEditForm(data: string, id: string) {
    this.model.editItem(id, data);
    this.renderView();
    this.todoEditForm.clearValue();
    this.modal.close();
  }

  handleCopyItem(item: IViewItem) {
    const copiedItem = this.model.getItem(item.id);
    this.model.addItem(copiedItem.name);
    this.renderView();
  }

  handleDeleteItem(item: IViewItem) {
    this.model.removeItem(item.id);
    this.renderView();
  }

  handleEditItem(item: IViewItem) {
    const editedItem = this.model.getItem(item.id);
    this.todoEditForm.setValue(editedItem.name);
    this.modal.content = this.todoEditForm.render();
    this.todoEditForm.setHandler((data: string) =>
      this.handleSubmiteEditForm(data, item.id)
    );
    this.modal.open();
  }

  renderView() {
    const itemList = this.model.items
      .map((item) => {
        const todoItem = new this.viewItemConstructor(this.itemTemplate);
        todoItem.setCopyHandler(this.handleCopyItem.bind(this));
        todoItem.setDeletedHandler(this.handleDeleteItem.bind(this));
        todoItem.setEditHandler(this.handleEditItem.bind(this));
        const itemElement = todoItem.render(item);
        return itemElement;
      })
      .reverse();
    this.viewPageContainer.todoContainer = itemList;
  }
}
