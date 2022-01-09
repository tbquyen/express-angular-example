/**
 * Required External Modules and Interfaces
 */
import { Request, Response } from "express";

export const home = async (req: Request, res: Response): Promise<void> => {
  res.json({ msg: "home" });
};
