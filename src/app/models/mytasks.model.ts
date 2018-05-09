// src/app/components/mytasks/mytasks.model.ts

export class MyTasksModel {
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
  dependency: string[];
  like: boolean;
  attachment: boolean;
  attachmentImg: string;
  starred: boolean;
  taskPath: string;
  maxHeight: number;
}
