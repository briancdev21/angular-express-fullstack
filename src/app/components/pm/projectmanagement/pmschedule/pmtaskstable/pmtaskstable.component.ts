import { Component, OnInit, Input } from '@angular/core';
import { CommonComponent } from '../../../../common/common.component';
import { PmService } from '../../pm.service';
import { DragulaService } from 'ng2-dragula';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MapToKeysPipe} from './map-to-keys.pipe';
import * as _ from 'lodash';
import * as moment from 'moment';
@Component({
  selector: 'app-pmtaskstable',
  templateUrl: './pmtaskstable.component.html',
  styleUrls: [
    './pmtaskstable.component.css',
    '../../../../../../../node_modules/dragula/dist/dragula.css'
  ],
  entryComponents: [
    CommonComponent
  ],
})
export class PmTasksTableComponent implements OnInit {
  @Input() milestones;

  menuCollapsed = true;
  newMilestoneTitle = '';
  addMilestoneClicked = false;
  ownerModalCollapsed = [[]];
  dependencyModalCollapsed = [[]];
  selectedOwner: any;
  customForm: any;
  heroForm: FormGroup;
  tasksTotalCount = 0;
  allTasks: any;
  inputChanged: any;
  selectedItem: any;

  config2: any = {'placeholder': 'Type here', 'sourceField': ''};
  colors = ['#F0D7BD', '#DFE5B0', '#F0C9C9', '#CBE0ED', '#E0BBCC', '#C4BBE0', '#BBC0E0', '#BBE0CC', '#E0BBBB', '#E8E3A7'];

  defaultTaskOwner = {
    name: '',
    imgUrl: ''
  };
  taskOwners = [
    {
      name: 'John Moss',
      imgUrl: 'assets/users/user1.png',
      userId: 1
    },
    {
      name: 'Michael',
      imgUrl: 'assets/users/user3.png',
      userId: 2
    },
    {
      name: 'Joseph',
      imgUrl: 'assets/users/user2.png',
      userId: 3
    },
  ];

  constructor( private dragulaService: DragulaService, private pmService: PmService, private fb: FormBuilder ) {
    dragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1));
    });

    // set draggable class
    const bag: any = this.dragulaService.find('dragMilestone');
    if (bag !== undefined ) {
      this.dragulaService.destroy('dragMilestone');
    }
    dragulaService.setOptions('dragMilestone', {
      moves: function (el, container, handle) {
        return handle.className.includes('milestone-title');
      }
    });
  }


  ngOnInit() {

    // this.milestones.map(m => m.tasks.map(t => t.ownerModalCollapsed = false));

    for (let i = 0; i < this.milestones.length; i++) {
       this.ownerModalCollapsed[i] = new Array();
        //  color selection
        const pickColorId = i % 10;
        this.milestones[i].color = this.colors[pickColorId];

        // count total tasks
        this.tasksTotalCount += this.milestones[i].tasks.length;

        this.dependencyModalCollapsed[i] = new Array();

      for (let j = 0; j < this.milestones[i].tasks.length; j++) {
        this.ownerModalCollapsed[i][j] = false;
        this.dependencyModalCollapsed[i][j] = false;
        const date = new Date (this.milestones[i].tasks[j].dueDate);
        this.milestones[i].tasks[j].dueDate = moment(this.milestones[i].tasks[j].dueDate).format('MMMM DD, YYYY');
      }
    }
    this.selectedOwner = 0;
    this.allTasks = _.range(1, this.tasksTotalCount + 1).map(t => t.toString());
  }

  getTaskId (milestone, task) {
    let foreTaskCount;
    if (milestone !== 0 ) {
      for (let i = 0; i <= milestone - 1; i++) {
        if (i !== 0 ) {
          foreTaskCount = foreTaskCount + this.milestones[i].tasks.length;
        } else {
          foreTaskCount = this.milestones[0].tasks.length;
        }
      }
    } else {
      foreTaskCount = 0;
    }
    return foreTaskCount + this.milestones[milestone].tasks[task].id;
  }

  selectDueDate(event, i, j) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dDate = new Intl.DateTimeFormat('en-US', options).format(event.value);
    // Add dDate field to panel info and update it with formatted date.
    this.milestones[i].tasks[j].dueDate = dDate;
  }

  private onDropModel(args) {
    const [el, target, source] = args;
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

  addTask(milestone) {
    const newTask = {
      id: 1 + milestone.tasks.length,
      taskTitle: '',
      profile: {
        name: '',
        imgUrl: '',
        userId: undefined
      },
      progress: 0,
      dueDate: '',
      duration: 0,
      dependency: [],
      like: false,
      attachment: false,
      attachmentImg: '',
    };
    this.milestones.filter(m => m.title === milestone.title)[0].tasks.push(newTask);
  }

  addNewMilestone() {
    if (!this.addMilestoneClicked) {
      this.addMilestoneClicked = !this.addMilestoneClicked;
    }
  }

  handleKeyDown(event) {
    const newMilestone = {
      title: this.newMilestoneTitle,
      color: this.colors[this.milestones.length],
      tasks: []
    };
    if (event.key === 'Enter' && this.newMilestoneTitle ) {
      this.milestones.push(newMilestone);
      this.newMilestoneTitle = '';
      this.addMilestoneClicked = !this.addMilestoneClicked;
    }
  }

  clickOutside() {
    this.addMilestoneClicked = false;
  }

  closeOwnerModal(i, j) {
    this.ownerModalCollapsed[i][j] = false;
  }

  onOwnerSelect(event, milestone, task ) {
    this.milestones[milestone].tasks[task].profile = this.taskOwners[this.selectedOwner - 1];
  }

  openOwnerModal(i, j) {
    this.ownerModalCollapsed = this.ownerModalCollapsed.map(m => m.map(t => t = false));
    this.ownerModalCollapsed[i][j] = true;
    this.selectedOwner = this.milestones[i].tasks[j].profile.userId;
  }

  openDependencyModal(i, j) {
    this.dependencyModalCollapsed = this.ownerModalCollapsed.map(m => m.map(t => t = false));
    this.dependencyModalCollapsed[i][j] = true;
  }

  closeDependencyModal(i, j) {
    this.dependencyModalCollapsed[i][j] = false;
  }

  removeDependency(i, j, k) {
    const item = this.milestones[i].tasks[j].dependency[k];
    this.allTasks.push(item);
    this.milestones[i].tasks[j].dependency.splice(k, 1);
  }

  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  onSelect(i, j, item) {
    this.selectedItem = item;
    this.allTasks = this.allTasks.filter(function( obj ) {
      return obj !== item;
    });
    const dependency = this.milestones[i].tasks[j].dependency as any[];
    if (this.milestones[i].tasks[j].dependency.length < 3) {
      dependency.push(item);
    }
  }

  uploadAttachment() {
    window.alert('Upload Files');
  }

  openDetailedModal(task, i, j) {
    this.pmService.sendTaskData(
      {
        'task': task,
        'milestone': [i, j],
        'openModal': true
      }
    );
  }
}
