import { toString } from "@typescript-entity/sanitizers";
import validator from "validator";

export type IsAfterOptions = {
  now?: Date;
};

export const isAfter = (value: Date, options: IsAfterOptions = {}): boolean => (
  validator.isAfter(toString(value), options.now && toString(options.now))
);