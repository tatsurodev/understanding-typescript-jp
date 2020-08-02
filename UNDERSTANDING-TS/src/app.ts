// triple slash directive, 3つのslashと1つのxlm tagから成る。typescriptの機能でpathで指定するfileにこのfileが依存していることを示す。tsconfig.jsonでoutFileを指定することで参照fileがbundleされる
/// <reference path="models/drag-drop.ts" />
/// <reference path="models/project.ts" />
/// <reference path="state/project-state.ts" />
/// <reference path="util/validation.ts" />
/// <reference path="decorators/autobind.ts" />
/// <reference path="components/project-inputs.ts" />
/// <reference path="components/project-list.ts" />

// 同じnamespaceに入れることでnamespace.exportedNameでaccessする必要がなくなる
namespace App {
  new ProjectInput();
  new ProjectList('active');
  new ProjectList('finished');
}