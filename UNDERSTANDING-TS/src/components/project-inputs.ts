// build toolを使用すれば拡張子無しでimportも可だが、不使用時は拡張子が必要
import { Component } from './base-component.js';
import { Validatable, validate } from '../util/validation.js';
import { autobind } from '../decorators/autobind.js';
import { projectState } from '../state/project-state.js';

// formの表示と入力値の取得を行うclass
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  mandayInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');
    // 各入力値への参照を取得
    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.mandayInputElement = this.element.querySelector('#manday') as HTMLInputElement;

    this.configure();
  }

  // event listenerの設定
  configure() {
    // callbackのsubmitHandler内でのthisはelementであるformを指し示しており、classでないことからそのままではpropertyにaccessできないことに注意。bind、autobind系のdecoaratorを使用する必要あり
    this.element.addEventListener('submit', this.submitHandler);
  }

  renderContent() { }

  // user inputのvalidationを行い、おｋなら取得
  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredManday = this.mandayInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const mandayValidatable: Validatable = {
      value: +enteredManday,
      required: true,
      min: 1,
      max: 1000,
    };

    if (
      // validation, 1つでもvalidatieがfalseを返せばerror
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(mandayValidatable)
    ) {
      alert('入力値が正しくありません。再度お試しください。');
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredManday];
    }
  }

  // 入力値のclear
  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.mandayInputElement.value = '';
  }

  // event handler
  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    // tupleかvoidかのcheck、tupleはjavascript上では只のarray
    if (Array.isArray(userInput)) {
      const [title, desc, manday] = userInput;
      // 入力値を使ってやりたい操作
      projectState.addProject(title, desc, manday);
      this.clearInputs();
    }
  }
}
