import fs from "fs";
import path from "path";
import { validationResult } from "express-validator";

import User from "../models/user";
import Post from "../models/post"