import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as io from 'socket.io-client';

import { ChartType, ChartOptions } from 'chart.js';

import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from 'ng2-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // messages: Array<any> = [];
  postValue: number;
  pollObj: any;
  socket: SocketIOClient.Socket;

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {
    this.socket = io.connect();
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }
  ngOnInit() {
    this.listen2Events();
  }
  listen2Events() {
    this.socket.on('getPollObj', (data) => {
      this.pollObj = data;
      this.updateChart();
    });
  }

  updateChart() {
    this.pieChartLabels = [];
    this.pieChartData = [];

    this.pollObj.options.forEach((element) => {
      this.pieChartLabels.push(element.text);
      this.pieChartData.push(element.count);
    });
  }

  onSubmit(form: NgForm) {
    this.postValue = form.controls['voteRadios'].value;
    console.log('emit: ' + this.postValue);
    this.socket.emit('postPoll', this.postValue);
  }
}
