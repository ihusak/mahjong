import { Injectable } from '@angular/core';

const numbers: number = 16;

@Injectable({providedIn: 'root'})
export class AppService {
  arrOfNumbers: number[] = [];
  constructor() {}
  /**
   * generate numbers
   */
  public generateNumbers(): number[] {

    for (let i = 0; i < numbers; i++) {
      const random = Math.round(Math.random() * 99);
      this.arrOfNumbers.push(random);
    }
    // uniq values
    const uniq = this.getUniq(this.arrOfNumbers);
    // shuffle copy arr
    const shuffle = this.shuffleArr([...uniq]);
    // concat original and shuffled arr
    this.arrOfNumbers = uniq.concat(shuffle);

    return this.arrOfNumbers;
  }
  /**
   * Shuffle array
   * @param: number[] arr
   */
  private shuffleArr(arr): number[] {
    let j;
    let temp;
    for (let i = arr.length - 1; i > 0; i--) {
      j = Math.round(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }
  /**
   * Filter uniq value
   * @param: number[] arr
   */
  private getUniq(arr) {
    return arr.filter((vl, i, fullArr) => {
      return fullArr.indexOf(vl) === i;
    });
  }
}