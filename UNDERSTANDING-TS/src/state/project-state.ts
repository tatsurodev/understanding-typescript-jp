import { Project, ProjectStatus } from '../models/project.js';

// listnerの型
type Listener<T> = (items: T[]) => void;

// stateはuserに関するもの、projectに関するもの等様々なstate毎に管理する必要がある可能性があるのでbaseのstateを作成すると便利
class State<T> {
  // event listenderを管理, 状態変化がある度この配列に格納された関数が実行される
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

// project state management
// 状態管理は1箇所のみで管理したいのでsingleton
export class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, manday: number) {
    // 新規のproject
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      manday,
      ProjectStatus.Active
    );
    // 新規のprojectを格納
    this.projects.push(newProject);
    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find(prj => prj.id === projectId);
    // statusが更新された場合のみ実行
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      // projectsのcopyを引数に与えることで、listener関数によって元のprojectsが変更されないようにする
      listenerFn(this.projects.slice());
    }
  }
}

// このfileが複数のfileからimportされたとしても、最初にimportされた時に一度だけ実行される。importされる度に実行されるのではない
// console.log('実行中・・・');

// stateをglobalに使用できるように取得
export const projectState = ProjectState.getInstance();
