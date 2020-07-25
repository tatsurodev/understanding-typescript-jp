function autobind(
  _: any,
  _2: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    // propertyの変更可
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  }
  return adjDescriptor;
}

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  mandayInputElement: HTMLInputElement;

  // constructorは基本的に要素への参照
  constructor() {
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';

    // 各入力値への参照を取得
    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.mandayInputElement = this.element.querySelector('#manday') as HTMLInputElement;

    this.configure();
    this.attach();
  }

  // user inputのvalidationを行い、おｋなら取得
  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredManday = this.mandayInputElement.value;

    if (
      // validation
      enteredTitle.trim().length === 0 ||
      enteredDescription.trim().length === 0 ||
      enteredManday.trim().length === 0
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
      console.log(title, desc, manday);
      this.clearInputs();
    }
  }

  // event listenerの設定
  private configure() {
    // callbackのsubmitHandler内でのthisはelementであるformを指し示しており、classでないことからそのままではpropertyにaccessできないことに注意。bind、autobind系のdecoaratorを使用する必要あり
    this.element.addEventListener('submit', this.submitHandler);
  }

  // 要素の追加
  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const prjInput = new ProjectInput();
