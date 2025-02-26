﻿function createElement(tag, attributes, children, callbacks) {
  const element = document.createElement(tag);

  if (attributes) {
    Object.keys(attributes).forEach((key) => {
      element.setAttribute(key, attributes[key]);
    });
  }

  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (typeof child === "string") {
        element.appendChild(document.createTextNode(child));
      } else if (child instanceof HTMLElement) {
        element.appendChild(child);
      }
    });
  } else if (typeof children === "string") {
    element.appendChild(document.createTextNode(children));
  } else if (children instanceof HTMLElement) {
    element.appendChild(children);
  }

  if (callbacks) {
    callbacks.forEach((callback) => {
      callback(element);
    })
  }

  return element;
}

class Component {
  constructor() {
    this.state = {
      task: ["Сделать домашку", "Сделать практику", "Пойти домой"],
      inputText: "",
      onclickPlus: false,
    };
  }

  getDomNode() {
    this._domNode = this.render();
    return this._domNode;
  }
}

class TodoList extends Component {
  onAddTask = (e) => {
    this.state.task.push(e);
  }
  onAddInputChange = () => {

  }
  createCheckBox = () => {
    return this.state.task.map(e => createElement("li", {}, [
      createElement("input", {type: "checkbox"}),
      createElement("label", {}, e),
      createElement("button", {}, "🗑️")
    ]));
  }
  render() {
    return createElement("div", { class: "todo-list" }, [
      createElement("h1", {}, "TODO List"),
      createElement("div", { class: "add-todo" }, [
        createElement("input", {
          id: "new-todo",
          type: "text",
          placeholder: "Задание",
        }),
        createElement("button", { id: "add-btn" }, "+"),
      ]),
      createElement("ul", { id: "todos" }, this.createCheckBox()),
    ]);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.appendChild(new TodoList().getDomNode());
});
