export class LimitedQueue<T> {
  private readonly queue: T[] = [];
  private readonly maxSize: number;
  private readonly removeStartIndex: number;

  public constructor(maxSize: number = 11, removeStartIndex: number = 0) {
    this.maxSize = maxSize;
    this.removeStartIndex = removeStartIndex;
  }

  public add(element: T): void {
    this.queue.push(element);
    this.ensureLimit();
  }

  public addMany(elements: T[]): void {
    this.queue.push(...elements);
    this.ensureLimit();
  }

  public getQueue(): T[] {
    return [...this.queue]; // Return a copy to prevent direct modification
  }

  public clear(): void {
    this.queue.length = 0; // Empty the queue
  }

  private ensureLimit(): void {
    while (this.queue.length > this.maxSize) {
      this.removeOldest();
    }
  }

  private removeOldest(): void {
    if (this.queue.length > this.removeStartIndex) {
      this.queue.splice(this.removeStartIndex, 1); // Remove from removeStartIndex
    }
  }
}
