export type NodeType =
  | "Program"
  | "NullLiteral"
  | "NumericLiteral"
  | "Identifier"
  | "BinaryExpr";

/**
 * Statements do not result in a value at runtime.
 They contain one or more expressions internally */
export interface Stat {
  kind: NodeType;
}

/**
 * Defines a block which contains many statements.
 * -  Only one program will be contained in a file.
 */
export interface Program extends Stat {
  kind: "Program";
  body: Stat[];
}

/**  Expressions will result in a value at runtime unlike Statements */
export interface Expr extends Stat {}

/**
 * A operation with two sides seperated by a operator.
 * Both sides can be ANY Complex Expression.
 * - Supported Operators -> + | - | / | * | %
 */
export interface BinaryExpr extends Expr {
  kind: "BinaryExpr";
  left: Expr;
  right: Expr;
  operator: string; // needs to be of type BinaryOperator
}

// LITERAL / PRIMARY EXPRESSION TYPES
/**
 * Represents a user-defined variable or symbol in source.
 */
export interface Identifier extends Expr {
  kind: "Identifier";
  symbol: string;
}

/**
 * Represents a numeric constant inside the soure code.
 */
export interface NumericLiteral extends Expr {
  kind: "NumericLiteral";
  value: number;
}

export interface NullLiteral extends Expr{
    kind: "NullLiteral";
    value: "null";
}