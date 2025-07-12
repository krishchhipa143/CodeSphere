import { set, get, del } from "idb-keyval";

export const saveFsHandle = async (handle) => {
  await set("fs-dir-handle", handle);
};

export const getFsHandle = async () => {
  const handle = await get("fs-dir-handle");
  if (!handle) return null;

  const permission = await handle.queryPermission({ mode: "readwrite" });
  if (permission === "granted") return handle;

  const request = await handle.requestPermission({ mode: "readwrite" });
  return request === "granted" ? handle : null;
};

export const clearFsHandle = async () => {
  await del("fs-dir-handle");
};
