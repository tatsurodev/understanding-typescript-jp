// ここでのinterfaceは特定の機能を実装するための契約として使用する、チーム開発でもわかりやすくなる
// drag & drop
// drag可能な対象
export interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

// drop可能な対象
export interface DragTarget {
  // drag中にその場所が有効なdrop場所かどうかをcheck
  dragOverHandler(event: DragEvent): void;
  // drop時の処理
  dropHandler(event: DragEvent): void;
  // drop時のvisual feedbackを行う
  dragLeaveHandler(event: DragEvent): void;
}
