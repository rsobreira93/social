export interface IFindManyDTO {
  titleContains?: string;
  descriptionContains?: string;
  page: number;
  perPage: number;
}
