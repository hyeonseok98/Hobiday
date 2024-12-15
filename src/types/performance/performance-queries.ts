import { PaginationProps } from "../commons/pagination";

export interface PerformancesByGenreParams extends PaginationProps {
  genre: string;
}

export interface PerformancesByGenreQueryProps {
  params: PerformancesByGenreParams;
  enabled: boolean;
}
