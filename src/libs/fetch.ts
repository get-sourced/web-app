import { catchErrorWithOutToast, catchErrorWithToast } from "@/utils/error";
import { ErrorClass } from "@/utils/errorClass";

class FetchClass<T> {
  private _data: T | undefined = undefined;
  private async search<U>(query: string): Promise<U> {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${query}`
    );
    if (!response.ok)
      throw new ErrorClass("You've reach max usage. Wait a for a while");
    const query_data = await response.json();
    return query_data as U;
  }
  async query(query: string, INITIAL_VALUE: T): Promise<T> {
    this._data = INITIAL_VALUE;
    const query_ = await catchErrorWithToast<string, T>(this.search)(query);
    if (query_) {
      this._data = query_;
    }
    return this._data;
  }
  async queryWithoutToast(query: string, INITIAL_VALUE: T): Promise<T> {
    this._data = INITIAL_VALUE;
    const query_ = await catchErrorWithOutToast<string, T>(this.search)(query);
    if (query_) {
      this._data = query_;
    }
    return this._data;
  }
  async subQueryArray<K extends keyof T, B extends T[K]>(
    key: K,
    query: B extends Array<infer U> ? keyof U : keyof B,
    saveAs: string
  ) {
    if (!this._data) throw new ErrorClass("Data is undefined");
    const value: B = this._data[key] as B;
    if (!Array.isArray(value)) {
      throw new ErrorClass("The query is not an array");
    }
    const promise_all = await Promise.all(
      value.map(async (array_value) => {
        let data = null;
        const url = array_value?.[query] as string | undefined;
        if (!url) {
          return { [saveAs]: data, ...array_value };
        }
        try {
          const response = await catchErrorWithOutToast(fetch)(url);
          if (!response?.ok) {
            return { [saveAs]: data, ...array_value };
          }
          data = await response.json();
          return { [saveAs]: data, ...array_value };
        } catch (error) {
          console.error("Fetch failed:", error);
          return { [saveAs]: data, ...array_value };
        }
      })
    );
    return promise_all;
  }
}

export const fetchQuery = <T>() => {
  const fetch = new FetchClass<T>();
  return fetch;
};
