import mongoose from "mongoose";
import { DB_PASS } from "../secret";


export const db = mongoose.connect(DB_PASS)