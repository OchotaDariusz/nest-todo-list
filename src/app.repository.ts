import { Injectable } from '@nestjs/common';

@Injectable()
export class AppRepository {
  private readonly data: string[];
  constructor() {
    this.data = [];
  }
  public getAllData(): string[] {
    return this.data;
  }
  public getItem(index: number): string {
    return this.data[index];
  }
  public getFirstItem(): string {
    return this.data[0];
  }
  public getLastItem(): string {
    return this.data[this.data.length - 1];
  }
  public addItem(item: string): void {
    this.data.push(item);
  }
}
