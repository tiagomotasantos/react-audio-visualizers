import { AudioVisualizerEventListener, AudioVisualizerEvents } from './types';

export class EventEmitter {
  private listener: AudioVisualizerEventListener;

  constructor() {
    this.listener = () => {};
  }

  subscribe(listener?: AudioVisualizerEventListener) {
    if (listener) {
      this.listener = listener;
    }
  }

  emit(event: AudioVisualizerEvents, payload?: any) {
    this.listener(event, payload);
  }
}

export const emitter = new EventEmitter();
