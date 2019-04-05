import { Injectable, Inject } from '@angular/core';
import {AppknobsConfigService} from './appknobs-config.service';

interface Payload {
  [key: string]: any
}

@Injectable()
export class AppknobsService {
  private client

  constructor(@Inject(AppknobsConfigService) private config) {
    this.client = config.client
  }

  public subscribe(subscriber: (result: any) => void): () => void {
    return this.client.subscribe(subscriber)
  }

  public evaluate(payload: Payload) {
    this.client.evaluate(payload)
  }
}
