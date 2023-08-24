import { makeSize } from "./helpers/tabUtils";

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

  parse = () => "Parsed";

  static create = <T extends DapperRawShape>(params: DapperTypeParams<T>) => {
    return new DapperType(params);
  };
}

export class DapperObject extends DapperAny {
  private typedString = "";
  private _optional: boolean = false;
  private _key: string;

  constructor(private shape: DapperRawShape, key?: string) {
    super();
    this._key = key || "random";
  }

  parse = (tabSize: number = 0) => {
    this.typedString = makeSize(tabSize) + this._key + ": {\n";
    Object.keys(this.shape).forEach((key) => {
      const value = this.shape[key];
      this.typedString += `${makeSize(tabSize + 2)}${key}: ${value.parse()};\n`;
    });
    this.typedString += makeSize(tabSize) + "};";
    return this.typedString;
  };

  optional = () => {
    this._optional = true;
    return this;
  };

  static create = (shape: DapperRawShape, key?: string) => {
    return new DapperObject(shape, key);
  };
}

export class DapperInteger extends DapperAny {
  private typedString = "";
  private _optional: boolean = false;
  private _key: string;

  constructor(key?: string) {
    super();
    this._key = key || "random";
  }

  parse = () => {
    return this.typedString;
  };

  optional = () => {
    this._optional = true;
    return this;
  };

  static create = (key?: string) => {
    return new DapperInteger(key);
  };
}

export class DapperString extends DapperAny {
  private _optional: boolean = false;
  private _key: string;

  constructor(key?: string) {
    super();
    this._key = key || "random";
  }

  parse = () => "dapper";

  optional = () => {
    this._optional = true;
    return this;
  };

  static create = (key?: string) => {
    return new DapperString(key);
  };
}

export const type = DapperType.create;
export const object = DapperObject.create;
export const integer = DapperInteger.create;
export const string = DapperString.create;
