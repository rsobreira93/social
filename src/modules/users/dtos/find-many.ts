export interface IFindManyDTO {
  nameContains?: string;
  emailContains?: string;
  page: number;
  perPage: number;
}
