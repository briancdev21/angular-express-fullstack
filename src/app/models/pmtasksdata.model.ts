// src/app/shared/models/pmtasksdata.model.ts

export class PmTasksData {
  title: string;
  color: string;
  tasks: TaskModel[];
}


export class TaskModel {
  id: number;
  taskTitle: string;
  profile: {
    name: string,
    imgUrl: string,
    userId: number
  };
  progress: number;
  dueDate: string;
  duration: number;
  dependency: number[];
  like: boolean;
  attachment: boolean;
  attachmentImg: string;
  starred: boolean;
  taskPath: string;
  maxHeight: number;
  subTasks: SubTaskModel[];
  start: string;
  projectTags: any[];
  mainContent: string;
  internalNotes: string;
  mainTitle: string;
}

export class SubTaskModel {
  id: number;
  complete: boolean;
  title: string;
  editable: boolean;
}
