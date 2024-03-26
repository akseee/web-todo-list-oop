import { ItemPresenter } from "./components/ToDoPresenter";
import "./styles/styles.css";
import { todos } from "./utils/constants";
import { Item } from "./components/Item";
import { Form } from "./components/Form";
import { ToDoModel } from "./components/ToDoModel";
import { Page } from "./components/Page";

const contentElement = document.querySelector(".content") as HTMLElement;

// const popupElement = document.querySelector(".popup") as HTMLElement;

const pageContainer = new Page(contentElement);

const todoArray = new ToDoModel();
todoArray.items = todos;

const itemPresenter = new ItemPresenter(todoArray, Form, pageContainer, Item);

itemPresenter.init();
itemPresenter.renderView();
