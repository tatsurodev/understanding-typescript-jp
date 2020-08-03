// build toolを使用すれば拡張子無しでimportも可だが、不使用時は拡張子が必要
import Cmp from './base-component.js';
import * as Validation from '../util/validation.js';
import { autobind as Autobind } from '../decorators/autobind.js';
import { projectState } from '../state/project-state.js';

// formの表示と入力値の取得を行うclass
export class ProjectInput extends Cmp<HTMLDivElement, HTMLFormElement> {
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

    const titleValidatable: Validation.Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validation.Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const mandayValidatable: Validation.Validatable = {
      value: +enteredManday,
      required: true,
      min: 1,
      max: 1000,
    };

    if (
      // validation, 1つでもvalidatieがfalseを返せばerror
      !Validation.validate(titleValidatable) ||
      !Validation.validate(descriptionValidatable) ||
      !Validation.validate(mandayValidatable)
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
  @Autobind
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
