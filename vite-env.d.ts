/// <reference types="vite/client" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
interface Id {
  id: string;
}

interface User extends Id {
  userAgent: string;
  fullName: string;
}

interface HoverUser extends Id {
  isHover: boolean;
}

interface FileType {
  senderId: string;
  name: string;
  size: number;
}

interface ReceivedFileType {
  files: FileType[];
}

interface MsgType {
  senderId: string;
  text: string;
}

interface ReceivedMsgType {
  msg: MsgType[];
}

type options = "fileSender" | "selected" | "msgSender";
