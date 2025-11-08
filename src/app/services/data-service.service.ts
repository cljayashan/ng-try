import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor() { }

  async getData(searchKey:string):Promise<{ id: string, name: string }[]> {
    console.log('data service called');
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredData = this.dataSource.filter(item =>
          item.name.toLowerCase().includes(searchKey.toLowerCase())
        );
        resolve(filteredData);
      }, 1000);
    });
  }

  dataSource: { id: string, name: string }[] = [
  { id: '01', name: 'Alpha' },
  { id: '02', name: 'Bravo' },
  { id: '03', name: 'Chase' },
  { id: '04', name: 'Delta' },
  { id: '05', name: 'Eagle' },
  { id: '06', name: 'Frost' },
  { id: '07', name: 'Globe' },
  { id: '08', name: 'Hazel' },
  { id: '09', name: 'Ivory' },
  { id: '10', name: 'Jolly' }
];
}
