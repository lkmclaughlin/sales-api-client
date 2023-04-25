import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(arr: any[], column: string= "id", asc: boolean= true): any[] {
    //arr.sort()
    const sortFn= (a: any, b: any): number=> {    //a & b are rows!
      let x= typeof a[column] === "number" ? a[column] : a[column].toString().toUpperCase();
      let y= typeof b[column] === "number" ? b[column] : b[column].toString().toUpperCase();
      if(x === y) return 0;
      if(asc)
        return (x > y) ? 1 : -1;      
      else
        return (x > y) ? -1 : 1;
      }
    return arr.sort(sortFn);
  }
}
