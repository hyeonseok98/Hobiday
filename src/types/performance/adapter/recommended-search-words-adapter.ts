import { ClientRecommendedSearchWords } from "../client";
import { ServerRecommendedSearchWords } from "../server";

export function RecommendedSearchWordsAdapter(data: ServerRecommendedSearchWords[]): ClientRecommendedSearchWords[] {
  return data.map((item) => ({
    performanceId: item.performId,
    performanceName: item.performName,
    genreName: item.genreName,
  }));
}
