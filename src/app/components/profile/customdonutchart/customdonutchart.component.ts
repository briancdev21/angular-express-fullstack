import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customdonutchart',
  templateUrl: './customdonutchart.component.html',
  styleUrls: [
    './customdonutchart.component.css'
  ]
})

export class CustomDonutChartComponent implements OnInit {

  @Input() title;
  @Input() percentage;
  @Input() number;
  percentageInt: number;
  isFullPercent = false;
  notFullPercentPath: String;
  fullPercentPath: String;
  gradientColor: any;
  gradientTransform: String;
  gradientColorSet: any = {
    default: {
      startColor: '#ff1410',
      endColor: '#f92e92'
    },
    M60: {
      startColor: '#ffac58',
      endColor: '#f1da36'
    },
    M80: {
      startColor: '#c5d92d',
      endColor: '#e8f45d',
      stopColor: '#f3fc8f'
    },
  };

  constructor() {
    this.gradientColor = this.gradientColorSet.default;
  }

  ngOnInit() {
    console.log('percentage: ', this.percentage);
    this.gradientTransform = 'rotate(0)';

    this.percentageInt = parseInt(this.percentage, 10);
    if (this.percentageInt > 60) {
      this.gradientColor = this.gradientColorSet.M60;
    }
    if (this.percentageInt > 80) {
      this.gradientColor = this.gradientColorSet.M80;
    }

    if (this.percentageInt > 50 && this.percentageInt < 100 ) {
      this.gradientTransform = `rotate(${30 * this.percentageInt / 100})`;
    }
    if (this.percentageInt >= 100) {
      this.isFullPercent = true;
    }
    if (!this.isFullPercent) {
      this.notFullPercentPath = this.describeArc(60, 60, 45, 0, this.percentageInt / 100 * 360 );
    } else {
      this.notFullPercentPath = this.describeArc(60, 60, 45, 180, this.percentageInt / 100 * 360);
      this.fullPercentPath = this.describeArc(60, 60, 45, 70 / 100 * 360, 80 / 100 * 360);
    }

  }

  polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  describeArc(x, y, radius, startAngle, endAngle) {

      const start = this.polarToCartesian(x, y, radius, endAngle);
      const end = this.polarToCartesian(x, y, radius, startAngle);

      const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
      if (this.percentageInt === 100) {
        start.x = 58;
      }
      const d = [
        'M', start.x, start.y,
        'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
      ].join(' ');

      return d;
  }

}
