import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { FilterService } from './filter.service';
import { DragulaService } from 'ng2-dragula';
@Component({
  selector: 'app-dealspipeline',
  templateUrl: './dealspipeline.component.html',
  styleUrls: [
    './dealspipeline.component.css',
    '../../../../node_modules/dragula/dist/dragula.css'
  ],
  entryComponents: [
    CommonComponent
  ],
  providers: [FilterService]
})
export class DealsPipelineComponent implements OnInit {

  menuCollapsed = true;
  filterOptions = ['This Week', 'This Month', 'This Quarter', '90 Days', 'Last Quarter', 'This Year', 'Last Year', 'All time'];
  filterOption = 'All time';
  newDeals = [];
  followUpDeals = [];
  seenDeals = [];
  demoDeals = [];
  negotiationDeals = [];
  wonDeals = [];
  lostDeals = [];
  current = new Date();
  todayTime: number;
  weekStartTime: number;
  weekEndTime: number;
  monthStartTime: number;
  monthEndTime: number;
  quarterStartTime: number;
  quarterEndTime: number;
  lastQuartertartTime: number;
  lastQuarterEndTime: number;
  lastYearStartTime: number;
  lastYearEndTime: number;
  thisYearStartTime: number;
  thisYearEndTime: number;
  filteredDealsInfo = [];

  public dealsInfo = [
    {
      name: 'Diana Ilic',
      title: 'Living your Nu Life',
      total: 24202.37,
      id: 123465,
      created: 'Jan 19, 2018',
      status: 'new',
    },
    {
      name: 'John Moss',
      title: 'Home Theater Expansion',
      total: 9579.38,
      id: 123459,
      created: 'Feb 26, 2018',
      status: 'followUp',
    },
    {
      name: 'John Smith',
      title: 'The Smith Residence',
      total: 37552.37,
      id: 123463,
      created: 'Dec 15, 2017',
      status: 'followUp',
    },
    {
      name: 'Greg Johnson',
      title: 'Living your Nu Life',
      total: 56230.37,
      id: 123464,
      created: 'Jan 17, 2017',
      status: 'seen',
    },
    {
      name: 'Hayati Homes',
      title: 'Project Show Home',
      total: 24683.21,
      id: 123415,
      created: 'Jan 19, 2017',
      status: 'demo',
    },
    {
      name: 'Tyler Petak',
      title: 'Living your Nu Life',
      total: 42323.37,
      id: 123462,
      created: 'Jan 11, 2017',
      status: 'demo',
    },
    {
      name: 'John Moss',
      title: 'Upgrade Security',
      total: 12552.37,
      id: 123460,
      created: 'Jan 19, 2017',
      status: 'negotiation',
    },
    {
      name: 'John Moss',
      title: 'Control System Upgrade',
      total: 3110.33,
      id: 123457,
      created: 'Dec 23, 2016',
      status: 'won',
    },
    {
      name: 'John Moss',
      title: 'Remodel with a Nu Life',
      total: 22323.67,
      id: 123456,
      created: 'Dec 15, 2016',
      status: 'won',
    },
    {
      name: 'Rockwood Homes',
      title: 'Wood\'s residence',
      total: 123110.33,
      id: 123412,
      created: 'Dec 12, 2016',
      status: 'won',
    },
  ];

  constructor( private dragulaService: DragulaService, private filterService: FilterService ) {
    dragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1));
    });
  }

  private onDropModel(args) {
    const [el, target, source] = args;
    this.newDeals.map(t => t.status = 'new');
    this.followUpDeals.map(t => t.status = 'followUp');
    this.seenDeals.map(t => t.status = 'seen');
    this.demoDeals.map(t => t.status = 'demo');
    this.negotiationDeals.map(t => t.status = 'negotiation');
    this.wonDeals.map(t => t.status = 'won');
    this.lostDeals.map(t => t.status = 'lost');
  }

  ngOnInit() {
    this.newDeals = this.dealsInfo.filter(d => d.status === 'new');
    this.followUpDeals = this.dealsInfo.filter(d => d.status === 'followUp');
    this.seenDeals = this.dealsInfo.filter(d => d.status === 'seen');
    this.demoDeals = this.dealsInfo.filter(d => d.status === 'demo');
    this.negotiationDeals = this.dealsInfo.filter(d => d.status === 'negotiation');
    this.wonDeals = this.dealsInfo.filter(d => d.status === 'won');
    this.lostDeals = this.dealsInfo.filter(d => d.status === 'lost');

    this.todayTime = this.current.getTime();
    this.weekStartTime = new Date(this.current.setDate(this.current.getDate() - this.current.getDay())).getTime();
    this.weekEndTime = new Date(this.current.setDate(this.current.getDate() - this.current.getDay() + 6)).getTime();
    this.monthStartTime = new Date(this.current.getFullYear(), this.current.getMonth() - 1, 1).getTime();
    this.monthEndTime = new Date(this.current.getFullYear(), this.current.getMonth(), 0).getTime();
    const quarter = Math.floor((this.current.getMonth() / 3));
    this.quarterStartTime = new Date(this.current.getFullYear(), quarter * 3, 1).getTime();
    this.quarterEndTime = new Date(this.current.getFullYear(), quarter * 3 + 3, 0).getTime();
    this.lastQuartertartTime = new Date(this.current.getFullYear(), quarter * 3 - 3, 1).getTime();
    this.lastQuarterEndTime = new Date(this.current.getFullYear(), quarter * 3, 1).getTime();
    this.thisYearStartTime = new Date(this.current.getFullYear(), 0, 1).getTime();
    this.thisYearEndTime = new Date(this.current.getFullYear() + 1, 0, 1).getTime();
    this.lastYearStartTime = new Date(this.current.getFullYear() - 1, 0, 1).getTime();
    this.lastYearEndTime = new Date(this.current.getFullYear(), 0, 1).getTime();

  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

  total(arr) {
    let total = 0;
    for (let i = 0; i < arr.length ; i ++) {
      total = total + arr[i].total;
    }
    return total;
  }

  onChangeFilter(filter) {
    console.log('filter: ', filter);
    this.filteredDealsInfo = this.dealsInfo;

    switch (filter) {
      case 'This Week': {
        this.filteredDealsInfo = this.filteredDealsInfo.filter(
          d => Date.parse(d.created) > this.weekStartTime && Date.parse(d.created) < this.weekEndTime
        );
        break;
      }
      case 'This Month':
        this.filteredDealsInfo = this.filteredDealsInfo.filter(
          d => Date.parse(d.created) > this.monthStartTime && Date.parse(d.created) < this.monthEndTime
        );
        break;
      case 'This Quarter':
        this.filteredDealsInfo = this.filteredDealsInfo.filter(
          d => Date.parse(d.created) > this.quarterStartTime && Date.parse(d.created) < this.quarterEndTime
        );
        break;
      case '90 Days':
        this.filteredDealsInfo = this.filteredDealsInfo.filter(
          d => Date.parse(d.created) > (this.todayTime - 90 * 86400000) && Date.parse(d.created) < this.todayTime
        );
        break;
      case 'Last Quarter':
        this.filteredDealsInfo = this.filteredDealsInfo.filter(
          d => Date.parse(d.created) > this.lastQuartertartTime && Date.parse(d.created) < this.lastQuarterEndTime
        );
        break;
      case 'This Year':
        this.filteredDealsInfo = this.filteredDealsInfo.filter(
          d => Date.parse(d.created) > this.thisYearStartTime && Date.parse(d.created) < this.thisYearEndTime
        );
        break;
      case 'Last Year':
        this.filteredDealsInfo = this.filteredDealsInfo.filter(
          d => Date.parse(d.created) > this.lastYearStartTime && Date.parse(d.created) < this.lastYearEndTime
        );
        break;
      case 'All time':
        break;
      default:
        console.log('default');
    }
    this.newDeals = this.filteredDealsInfo.filter(d => d.status === 'new');
    this.followUpDeals = this.filteredDealsInfo.filter(d => d.status === 'followUp');
    this.seenDeals = this.filteredDealsInfo.filter(d => d.status === 'seen');
    this.demoDeals = this.filteredDealsInfo.filter(d => d.status === 'demo');
    this.negotiationDeals = this.filteredDealsInfo.filter(d => d.status === 'negotiation');
    this.wonDeals = this.filteredDealsInfo.filter(d => d.status === 'won');
    this.lostDeals = this.filteredDealsInfo.filter(d => d.status === 'lost');
  }

}
