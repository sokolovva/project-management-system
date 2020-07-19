export class Project {
  id?: string;
  key: string;
  title: string;

  constructor(project: any) {
    if (project) {
      this.id = project.id;
      this.key = project.key;
      this.title = project.title;
    }
  }
}
