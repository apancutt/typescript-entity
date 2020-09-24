import Entity from './Entity';
import { AttrConfigs } from './Type';

export abstract class AttrError<C extends AttrConfigs> extends Error {

  public entity: Entity<C>;
  public attrName: keyof C;
  public attrValue: unknown;

  constructor(message: string, entity: Entity<C>, attrName: keyof C, attrValue: unknown) {
    super(message);
    this.entity = entity;
    this.attrName = attrName;
    this.attrValue = attrValue;
  }

}

export class AttrValueInvalidError<C extends AttrConfigs> extends AttrError<C> {
  constructor(entity: Entity<C>, attrName: keyof C, attrValue: unknown, message?: string) {
    super(message || `Invalid value provided for ${entity.constructor.name}.${attrName}: ${attrValue}`, entity, attrName, attrValue);
  }
}

export class AttrNonWritableError<C extends AttrConfigs> extends AttrError<C> {
  constructor(entity: Entity<C>, attrName: keyof C, attrValue: unknown, message?: string) {
    super(message || `Cannot set value for non-writable attribute ${entity.constructor.name}.${attrName}: ${attrValue}`, entity, attrName, attrValue);
  }
}

export class AttrReadonlyError<C extends AttrConfigs> extends AttrNonWritableError<C> {}

export class AttrUnregisteredError<C extends AttrConfigs> extends AttrNonWritableError<C> {}

export class AttrValueFnError<C extends AttrConfigs> extends AttrNonWritableError<C> {}
