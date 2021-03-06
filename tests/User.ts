import { boolean, callable, dateInPast, email, string, uuid } from '../packages/configs/src/';
import { entity } from '../packages/core/src/';
import type { AttrName } from '../packages/core/src/';
import { isLength } from '../packages/validators/src/';

export type UserAttrConfigSet = typeof USER_ATTR_CONFIG_SET;

export const USER_ATTR_CONFIG_SET = {
  date_of_birth: dateInPast(),
  email: email(),
  email_domain: callable(function(this: User): string | null { return this.email.split('@', 2)[1] || null }),
  uuid: uuid(true, true, true),
  username: {
    ...string(),
    validator: (value: string, name: AttrName): boolean => isLength(value, name, { min: 5 }),
  },
  verified: boolean(false, false, true),
};

export class User extends entity(USER_ATTR_CONFIG_SET) {}
