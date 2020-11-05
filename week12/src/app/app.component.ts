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
    });
  }

  // loadSpeech() {
  //   let ap = <HTMLAudioElement>document.getElementById('ap');

  //   ap.src = '1.mp3?time=' + new Date().getTime();
  //   ap.load();
  // }

  onSubmit(form: NgForm) {
    let lang = form.controls['langRadios'].value;
    this.socket.emit('postInput', { text: this.text, lang: lang });
  }
}
