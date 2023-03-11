import { Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';

@Injectable()
export class AppService {
  constructor(private readonly appRepository: AppRepository) {}
  getAllItems(): string[] {
    return this.appRepository.getAllData();
  }
  getItemAtIndex(index: number): string {
    return this.appRepository.getItem(index);
  }
  getFirstItem(): string {
    return this.appRepository.getFirstItem();
  }
  getLastItem(): string {
    return this.appRepository.getLastItem();
  }
  addNewItem(item: string): void {
    this.appRepository.addItem(item);
  }
}
