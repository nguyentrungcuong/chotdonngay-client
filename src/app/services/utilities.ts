import { Service } from '@angular/core';

@Service()
export class Utilities {

    timePastSeconds(date_gmt: Date) {
        let timeNow = new Date();
        let diff = timeNow.getTimezoneOffset() * 60;
        let seconds = Math.floor((+timeNow - +new Date(date_gmt)) / 1000);
        seconds = seconds + diff;
        return seconds;
      }
      
}
