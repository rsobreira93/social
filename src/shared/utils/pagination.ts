export interface IPagination<T> {
  from: number;
  to: number;
  perPage: number;
  total: number;
  currentPage: number;
  prevPage?: number;
  nextPage?: number;
  lastPage: number;
  data: Partial<T>[];
}
