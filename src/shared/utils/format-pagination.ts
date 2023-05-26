interface IRequest<T> {
  page: number;
  perPage: number;
  skip: number;
  count: number;
  data: T[];
}

interface IResponse<T> {
  from: number;
  to: number;
  perPage: number;
  total: number;
  currentPage: number;
  prevPage: number;
  nextPage: number;
  data: T[];
  lastPage: number;
}

export const formatPagination = <T>({
  page,
  perPage,
  skip,
  count,
  data,
}: IRequest<T>): IResponse<T> => {
  return {
    from: skip <= count ? skip + 1 : null,
    to: count > skip + perPage ? skip + perPage : count,
    perPage,
    total: count,
    currentPage: page,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: count > skip + perPage ? page + 1 : null,
    lastPage: Math.ceil(count / perPage),
    data,
  };
};
