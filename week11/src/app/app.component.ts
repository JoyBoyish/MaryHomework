import { Component } from '@angular/core';
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
export class AppComponent {
  messageText: string;
  // messages: Array<any> = [];
  pollObj: Object;
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
    this.pollObj = new Object();
    this.listen2Events();
  }
  listen2Events() {
    this.socket.on('getPollObj', (data) => {
      // this.messages.push(data);
      this.pollObj = data;
      console.log(this.pollObj);
      this.updateChart();
    });
  }

  updateChart() {
    this.pieChartLabels = [];
    this.pieChartData = [];

    this.pollObj['options'].forEach((element) => {
      this.pieChartLabels.push(element.text);
      this.pieChartData.push(element.count);
    });
  }

  sendMessage() {
    this.socket.emit('newMsg', this.messageText);
    this.messageText = '';
  }
}
