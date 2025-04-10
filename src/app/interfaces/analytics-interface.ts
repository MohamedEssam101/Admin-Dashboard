export interface analyticsResponse {
  totalRevenue: number;
  todayRevenue: number;
  itemsSold: number;
  usersActive: number;
}
export interface SalesData {
  date: string;
  revenue: number;
  itemsSold: number;
  visits: number;
}

export interface salesApiResponse {
  data: SalesData[];
}

export interface filteredSalesData {
  revenue: number;
  itemsSold: number;
  todayRevenue: number; // Newly added property
  visits: number;
}
