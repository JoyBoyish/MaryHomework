import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  text: string;
  result: string;
  audioPath: string;
  socket: SocketIOClient.Socket;

  broadcastMsg: string;

  constructor() {
    this.socket = io.connect();
  }
  ngOnInit() {
    this.listen2Events();
  }

  listen2Events() {
    this.socket.on('getTranslate', (result) => {
      this.result = result;
    });

    this.socket.on('getAudio', (result) => {
      this.audioPath = result;
      let ap = <HTMLAudioElement>document.getElementById('ap');
      ap.load();
    });

    this.socket.on('getBroadcast', (data) => {
      this.broadcastMsg = data.id + ': ' + data.result;
    });
  }

  onSubmit(form: NgForm) {
    let lang = form.controls['langRadios'].value;
    this.socket.emit('postInput', { text: this.text, lang: lang });
  }
}
