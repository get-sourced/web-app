import type { Dispatch, SetStateAction } from "react";

export interface Toast {
  message: string;
  id: string;
  state: "error" | "success" | "warning";
}

type ActionType = "add" | "remove";

export class ToastClass {
  private _store: Toast[] = [];
  private _listeners: Dispatch<SetStateAction<Toast[]>>[] = [];

  private notifyListeners() {
    for (const listener of this._listeners) {
      listener([...this._store]); // Ensure reactivity
    }
  }

  subscribe(listener: Dispatch<SetStateAction<Toast[]>>) {
    this._listeners.push(listener);
    return () => {
      this._listeners = this._listeners.filter((l) => l !== listener);
    };
  }

  success(msg: string) {
    this._addToast(msg, "success");
  }

  error(msg: string) {
    this._addToast(msg, "error");
  }

  warning(msg: string) {
    this._addToast(msg, "warning");
  }

  private _addToast(msg: string, state: Toast["state"]) {
    this._store = [
      ...this._store,
      { id: Math.random().toString(36), message: msg, state },
    ];
    this.notifyListeners();
  }

  reducer(ACTION: ActionType, payload: string) {
    if (ACTION === "add") {
      this._addToast(payload, "success");
    } else if (ACTION === "remove") {
      this._store = this._store.filter((toast) => toast.id !== payload);
      this.notifyListeners();
    }
  }
}

