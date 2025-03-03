import { catchErrorWithOutToast, catchErrorWithToast } from "@/utils/error";
import { ErrorClass } from "@/utils/errorClass";

class FetchClass<T> {
  private _data: T | undefined = undefined;
  private async search<U>(query: string): Promise<U> {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${query}`
    );
    if (!response.ok) throw new ErrorClass("Unable to find what you want");
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
}

export const fetchQuery = <T>() => {
  const fetch = new FetchClass<T>();
  return fetch;
};
