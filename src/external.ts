const internalTypes: string[] = ["string", "number", "boolean"];

export abstract class DapperAny {
  parse: () => string;
}

export type DapperRawShape<T extends DapperAny = DapperAny> = {
  [k: string]: T;
};

export type DapperTypeParams<T extends DapperRawShape> = {
  name: string;
  fields: T;
};

export class DapperType<T extends DapperRawShape> extends DapperAny {
  name: string;
  fields: T;

  constructor(params: DapperTypeParams<T>) {
    super();
    this.name = params.name;
    this.fields = params.fields;
  }

  parse = () => "";

  static create = <T extends DapperRawShape>(params: DapperTypeParams<T>) => {
    return new DapperType(params);
  };
}

export class DapperObject extends DapperAny {
  private _optional: boolean = false;

  constructor(private shape: DapperRawShape) {
    super();
  }

  parse = () => "";

  optional = () => {
    this._optional = true;
    return this;
  };

  static create = (shape: DapperRawShape) => {
    return new DapperObject(shape);
  };
}

export class DapperInteger extends DapperAny {
  private _optional: boolean = false;

  parse = () => "";

  optional = () => {
    this._optional = true;
    return this;
  };

  static create = () => {
    return new DapperInteger();
  };
}

export const type = DapperType.create;
export const object = DapperObject.create;
export const integer = DapperInteger.create;
