export class PaginationDto<T> {
  items: T[];
  pageSize: number;
  totalPage: number;
  totalCount: number;

  constructor(items: T[], totalCount: number, pageSize: number) {
    this.items = items;
    this.pageSize = pageSize;
    this.totalPage = Math.ceil(totalCount / pageSize);
    this.totalCount = totalCount;
  }
}
