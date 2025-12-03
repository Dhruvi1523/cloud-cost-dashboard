import axios from "axios";
import { create } from "zustand";
const useDataStore = create((set, get) => ({
  // All backend data together in one object
  data: {
    rows: [],
    page: 1,
    limit: 25,
    total_pages: 1,
    total_rows: 0,
  },

  summary: {},

  // Filters stored in Zustand
  filters: {
    cloud_provider: ["all"],
    team: ["all"],
    env: ["all"],
    page: 1,
    limit: 25,
  },

  loading: false,
  error: false,
  empty: false,

  applyFilters: (updates) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...updates,
        page: 1, // reset page whenever filters change
      },
    })),

  updatePage : (update) => {
    set((state) => ({ filters :  {...state.filters , page : update}}))
  },
  // Fetch data & summary from backend
  fetchData: async () => {
    const { filters } = get();

    set({ loading: true, error: false });

    const queryParams = new URLSearchParams();

    // Build query string from filters
    for (const key in filters) {
      const val = filters[key];
      if (Array.isArray(val)) {
        val.forEach((v) => queryParams.append(key, v));
      } else {
        queryParams.append(key, val);
      }
    }

    try {
      const dataRes = await axios.get(
        `https://cloud-cost-dashboard-xfg1.onrender.com/data?${queryParams.toString()}`
      );


      const d = dataRes.data;

      set({
        data: {
          rows: d.data || [],
          page: d.page,
          limit: d.limit,
          total_pages: d.total_pages,
          total_rows: d.total_rows,
        },
        summary: d.summary  || {},
        empty: (d.data || []).length === 0,
      });
    } catch (err) {
      console.error("API Error:", err);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useDataStore;
