import { faker } from "@faker-js/faker";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { stateType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getName = (val: options, state: stateType["state"]): string => {
  const providerUser =
    val === "msgSender"
      ? state.receivedMessageArray?.[0]?.sender.fullName
      : val === "fileSender"
      ? state.receivedFileArray[0]?.sender.fullName
      : "";
  return providerUser;
};
export const getRandomName = (): string => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  return `${firstName} ${lastName}`;
};

export const getFixedSize = (size: number): string => {
  if (size >= 1024) {
    const kb = size / 1020;
    if (kb >= 1024) return `${(kb / 1024).toFixed(0)} MB`;
    return `${kb.toFixed(0)} KB`;
  }
  return `${size.toFixed(0)} Bytes`;
};
export const handleFileArr = (setState: stateType["setState"]) => {
  setState((prev) => {
    if (prev.receivedFileArray.length > 0) {
      return {
        ...prev,
        receivedFileArray: prev.receivedFileArray.slice(1),
      };
    }
    return prev;
  });
};

export const handleMsgArr = (
  state: stateType["state"],
  setState: stateType["setState"]
) => {
  if (state.receivedMessageArray.length > 0) {
    const arr = state.receivedMessageArray.slice(1);
    setState((prev) => ({
      ...prev,
      receivedMessageArray: arr,
    }));
  }
};
export const updateFilesArray = (
  files: FileType[],
  data: { name: string; sender: User; size: number }
) => {
  if (data.name && data.size) {
    // Find the current receiver user in the latest state
    let arr: FileType[] = [];
    if (files.length > 0) {
      arr = [
        ...files,
        { sender: data.sender, name: data.name, size: data.size },
      ];
    } else {
      arr.push({ sender: data.sender, name: data.name, size: data.size });
    }
    return arr;
  }
};
export const updateReceivedMessageArray = (
  messagesArray: MsgType[],
  msg: string,
  sender: User
) => {
  // Find the current receiver user in the latest state
  let arr: MsgType[] = [];
  if (messagesArray.length > 0) {
    arr = [...messagesArray, { text: msg, sender }];
  } else {
    arr.push({ text: msg, sender });
  }
  // Return the updated state array with the new message added for this user
  return arr;
};
