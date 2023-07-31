import { tokenize, Token, TokenType } from "./lexer.ts";
import { Stat, Program, Expr, BinaryExpr, NumericLiteral, Identifier } from "./ast.ts";

export default class Parser {
    private tokens: Token[] = [];

    /*
   * Determines if the parsing is complete and the END OF FILE Is reached.
   */
    private not_eof(): boolean {
        return this.tokens[0].type != TokenType.EOF;
    }

    /**
 * Returns the currently available token
 */
    private at() {
        return this.tokens[0] as Token;
    }

    /**
  * Returns the previous token and then advances the tokens array to the next value.
  */
    private eat() {
        const prev = this.tokens.shift() as Token;
        return prev;
    }

    /**
  * Returns the previous token and then advances the tokens array to the next value.
  *  Also checks the type of expected token and throws if the values don't match.
  */
    private expect(type: TokenType, err: any) {
        const prev = this.tokens.shift() as Token;
        if (!prev || prev.type != type) {
            console.error("Parser Error:\n", err, prev, " -Expecting: ", type);
            Deno.exit(1);
        }

        return prev;
    }

    public produceAST(sourceCode: string): Program {
        this.tokens = tokenize(sourceCode);
        const program: Program = {
            kind: "Program",
            body: []
        };

        //parse until end of the file
        while (this.not_eof) {
            program.body.push(this.parseStat());
        }
        return program;
    }

    //entry point for the parser
    private parseStat(): Stat {
        //skip to parse expr
        return this.parse_expr();
    }

    private parse_expr(): Expr {
        //parse binary expression
        return this.parse_primary_expr();

    }

    private parse_primary_expr(): Expr {
        const tk = this.at().type;

        switch (tk) {
            case TokenType.Identifier:
                return { kind: "Identifier", symbol: this.eat().value } as Identifier;

            case TokenType.Number:
                return {
                    kind: "NumericLiteral",
                    value: parseFloat(this.eat().value),
                } as NumericLiteral;
            default:
                console.error("Unexpected error found during parsing", this.at());
                Deno.exit(1);
        }
    }
}