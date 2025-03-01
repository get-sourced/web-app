import { useState, useRef, type RefObject } from "react";
type stateType = {
  users: User[] | [];
  currentUser: { name: string; id: string } | null;
  selectedUser: User | null;
  senderUser: FileType | null;
  file: File | null;
  progress: number;
  isFileAccepted: boolean | null;
  messageBox: boolean;
  text: string;
  receivedMsg: string;
  initial: boolean;
  receivedMessageArray: MsgType[];
  receivedFileArray: FileType[];
  receivedFile: FileType | null;
  fileInputRef: RefObject<HTMLInputElement | null>;
};
export const useAppState = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isNotificationEnabled, setIsNotificationEnabled] =
    useState<boolean>(false);
  const [state, setState] = useState<stateType>({
    users: [],
    currentUser: null,
    selectedUser: null,
    senderUser: null,
    file: null,
    progress: 0,
    isFileAccepted: false,
    messageBox: false,
    text: "",
    receivedMsg: "",
    initial: true,
    receivedMessageArray: [],
    receivedFileArray: [],
    receivedFile: null,
    fileInputRef,
  });

  return {
    state,
    setState,
    isNotificationEnabled,
    setIsNotificationEnabled,
  };
};
