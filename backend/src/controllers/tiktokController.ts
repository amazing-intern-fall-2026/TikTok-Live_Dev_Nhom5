import type { Request, Response } from "express";
import { tiktokManager } from "../managers/tiktokManager";


const connectTiktok = async (req: Request, res: Response) => {
  const username = req.params.id as string;
  try {
    await tiktokManager.connect(username);
    res.status(200).json({ message: `connect to live of ${username} successfully` });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', err });
  }
};

const disconnectTiktok = async (req: Request, res: Response) => {
  try {
    const username = req.params.id as string;
    await tiktokManager.disconnect(username);
    res.status(200).json({ message: "disconnect successfully" });
  } catch (err: any) {
    res.status(400).json({ error: "Disconnect failed", message: String(err?.message || err) });
  }
}

export {
  connectTiktok,
  disconnectTiktok
}
