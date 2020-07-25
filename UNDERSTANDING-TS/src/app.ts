class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInptElement: HTMLInputElement;
  descriptionInptElement: HTMLInputElement;
  mandayInptElement: HTMLInputElement;

  // constructorは基本的に要素への参照
  constructor() {
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';

    this.titleInptElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInptElement = this.element.querySelector('#description') as HTMLInputElement;
    this.mandayInptElement = this.element.querySelector('#manday') as HTMLInputElement;

    this.configure();
    this.attach();
  }

  // event handler
  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInptElement.value);

  }

  // event listenerの設定
  private configure() {
    // callbackのsubmitHandler内でのthisはelementであるformを指し示しており、classでないことからそのままではpropertyにaccessできないことに注意。bind、autobind系のdecoaratorを使用する必要あり
    this.element.addEventListener('submit', this.submitHandler.bind(this));
  }

  // 要素の追加
  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const prjInput = new ProjectInput();
