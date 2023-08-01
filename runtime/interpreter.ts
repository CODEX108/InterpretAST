import { NullVal, NumberVal, RuntimeVal, ValueTypes } from './values.ts';
import { NodeType, NumericLiteral, Stat, BinaryExpr, Program } from '../frontend/ast.ts';

function evalate_program(program: Program): RuntimeVal {
    let lastEvaluated: RuntimeVal = { type: "null", value: "null" } as NullVal;
    for (const statement of program.body) {
        lastEvaluated = evalate(statement);
    }
    return lastEvaluated;
}

/**
 * Evaulate pure numeric operations with binary operators.
 */
function eval_numberic_binary_expr(lhs: NumberVal, rhs: NumberVal, operator: string): NumberVal {
    let result:number;
    if (operator == "+") {
        result = lhs.value + rhs.value;
    }
    else if (operator == '-') {
        result = lhs.value - rhs.value;
    }
    else if (operator == '*') {
        result = lhs.value * rhs.value;
    }
    else if (operator == '/') {
        result = lhs.value / rhs.value;
        //TODO : Division bu zero checks
    }
    else (operator == "%")
    result = lhs.value % rhs.value;

    return { type: "number", value: result };
}

function evalate_binary_expr(binop: BinaryExpr): RuntimeVal {
    const lhs = evalate(binop.left);
    const rhs = evalate(binop.right);

    if (lhs.type == "number" && rhs.type == "number") {
        return eval_numberic_binary_expr(lhs as NumberVal, rhs as NumberVal, binop.operator);
    }

    //One or both are null
    return { type: "null", value: "null" } as NullVal;
}


export function evalate(astNode: Stat): RuntimeVal {
    switch (astNode.kind) {
        case "NumericLiteral":
            return {
                value: ((astNode as NumericLiteral).value),
                type: "number"
            } as NumberVal;

        case "NullLiteral":
            return { value: "null", type: "null" } as NullVal;

        case "BinaryExpr":
            return evalate_binary_expr(astNode as BinaryExpr);
        case "Program":
            return evalate_program(astNode as Program);
        default:
            console.error(
                "This AST Node has not yet been setup for interpretation.",
                astNode,
              );
         Deno.exit(0);
    }
}