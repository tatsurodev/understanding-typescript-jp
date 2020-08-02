/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../models/drag-drop.ts" />

namespace App {
  // project item class, project listで表示する各projectの項目
  export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable {
    private project: Project;
    // getterで取得する項目に柔軟性をもたせる
    get manday() {
      if (this.project.manday < 20) {
        return this.project.manday.toString() + '人日';
      } else {
        return (this.project.manday / 20).toString() + '人月';
      }
    }

    constructor(hostId: string, project: Project) {
      super('single-project', hostId, false, project.id);
      this.project = project;

      this.configure();
      this.renderContent();
    }

    @autobind
    dragStartHandler(event: DragEvent) {
      // drag eventに存在するdataTransferでdrag時にdataを保存、dropした時に利用可能なdataを渡す。setData(format, data)
      event.dataTransfer!.setData('text/plain', this.project.id);
      // drag中のcursorの形
      event.dataTransfer!.effectAllowed = 'move';
    }

    dragEndHandler(_: DragEvent) {
      console.log('Drag終了');
    }

    configure() {
      // dragstartは標準のdom event
      this.element.addEventListener('dragstart', this.dragStartHandler);
      this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent() {
      this.element.querySelector('h2')!.textContent = this.project.title;
      this.element.querySelector('h3')!.textContent = this.manday;
      this.element.querySelector('p')!.textContent = this.project.description.toString();
    }
  }
}