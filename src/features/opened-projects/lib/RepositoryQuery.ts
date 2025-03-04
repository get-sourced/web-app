import type { Dispatch, SetStateAction } from "react";
import type { DataFromGithub } from "./types";

export class RepositoryQuery {
  private _setStateListener: Dispatch<SetStateAction<DataFromGithub>>[];
  private _state: DataFromGithub;
  constructor() {
    this._state = { items: [], total_count: 0 };
    this._setStateListener = [];
  }
  subscribe(setState: Dispatch<SetStateAction<DataFromGithub>>) {
    this._setStateListener.push(setState);
    return () => {
      this._setStateListener = this._setStateListener.filter(
        (listener) => listener !== setState
      );
    };
  }
  changeState(repos: DataFromGithub) {
    this._state = repos;
    this.notifyStateListeners();
  }
  notifyStateListeners() {
    for (const listener of this._setStateListener) {
      listener(this._state);
    }
  }
}
