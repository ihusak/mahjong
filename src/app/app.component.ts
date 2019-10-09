import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'lanars';
  data: number[];
  variableSelect: number;
  clickArr = [];
  successFlag: boolean = false;

  constructor(private service: AppService) {}

  ngOnInit() {
    this.data = this.service.generateNumbers();
  }
  /**
   * Handle user click
   * @param numberItem
   * @param event
   */
  public numberClick(numberItem: number, event: MouseEvent) {
    this.clickArr.push(event);
    this.variableSelect = numberItem;
    (<Element>event.target).className = 'blue';
    this.matchEvents(this.clickArr);
    setTimeout(() => {
        if (!this.successFlag) {
          (<Element>event.target).className = 'hidden';
        }
        this.clickArr = [];
    }, 1000);
    this.successFlag = false;
  }
  /**
   * match selected events
   * @param events
   */
  matchEvents(events): any {
    if (events.length >= 2) {
      setTimeout(() => {
        events.sort((a, b) => {
          if (a.target.textContent == b.target.textContent) {
            console.log('Match!!!');
            a.target.className = 'red';
            b.target.className = 'red';
            this.successFlag = true;
          } else {
            this.successFlag = false;
          }
          this.clickArr = [];
        });
      }, 0);
    }
  }
}
