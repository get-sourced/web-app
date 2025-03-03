import type { Dispatch, SetStateAction } from "react";
import type { RepositoryTypes } from "./types";

export class RepositoryQuery {
  private _setStateListener: Dispatch<SetStateAction<RepositoryTypes[]>>[];
  private _state: RepositoryTypes[];
  constructor() {
    this._state = [];
    this._setStateListener = [];
  }
  subscribe(setState: Dispatch<SetStateAction<RepositoryTypes[]>>) {
    this._setStateListener.push(setState);
    return () => {
      this._setStateListener = this._setStateListener.filter(
        (listener) => listener !== setState
      );
    };
  }
  changeState(repos: RepositoryTypes[]) {
    this._state = repos;
    this.notifyStateListeners();
  }
  notifyStateListeners() {
    for (const listener of this._setStateListener) {
      listener(this._state);
    }
  }
}
