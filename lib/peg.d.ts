declare module "pegjs" {

    const VERSION:string;

    interface Location {
        start: Position;
        end: Position;
    }

    interface Position {
        offset: number;
        line: number;
        column: number;
    }

    class GrammarError {
        name: "GrammarError";
        message: string;
        location: Location;

        constructor(message: string, location: Location);
    }

    interface CompilerOptions {
        allowedStartRules?: string[];
        cache?: boolean;
        dependencies?: {[key: string]: string};
        exportVar?: string;
        format?: "amd" | "bare" | "commonjs" | "es" | "globals" | "umd";
        optimize?: "speed" | "size";
        output?: "parser" | "source";
        plugins?: any[];
        trace?: boolean;
    }

    interface ParserOptions {
        startRule?: string;
        tracer: any; 
    }

    interface Parser<T> {
        parse(expression: string, options?: ParserOptions): T;
    }

    namespace parser {
        function parse(grammar: string): any;

        // peg.d.ts
        interface AstNode {
            readonly type: string;
            location?: Location
        }


        interface ExpressionNode extends AstNode {
            expression: Expression;
        }

        interface CodeNode extends AstNode {
            code: string;
        }

        interface Grammar extends AstNode {
            type: 'grammar';
            initializer?: Initializer;
            rules: Rule[];
        }

        interface Initializer extends CodeNode {
            type: 'initializer';
        }

        interface Rule extends AstNode {
            type: 'rule';
            name: string;
            expression: Expression | Named;
        }

        interface Named extends ExpressionNode {
            type: 'named';
            name: string;
        }

        interface Choice extends AstNode {
            type: 'choice';
            alternatives: Expression[];
        }

        interface Action extends ExpressionNode, CodeNode {
            type: 'action';
        }

        interface Sequence extends AstNode {
            type: 'sequence';
            elements: Expression[];
        }

        interface Labeled extends ExpressionNode {
            type: 'labeled';
            label: string;
        }

        interface Text extends ExpressionNode {
            type: 'text';
        }

        interface SimpleAnd extends ExpressionNode {
            type: 'simple_and';
        }

        interface SimpleNot extends ExpressionNode {
            type: 'simple_not';
        }

        interface Optional extends ExpressionNode {
            type: 'optional';
        }

        interface ZeroOrMore extends ExpressionNode {
            type: 'zero_or_more';
        } 

        interface OneOrMore extends ExpressionNode {
            type: 'one_or_more';
        }

        interface Group extends ExpressionNode {
            type: 'group';
        }

        interface SemanticAnd extends CodeNode {
            type: 'semantic_and';
        }

        interface SemanticNot extends CodeNode {
            type: 'semantic_not';
        }

        interface RuleRef extends AstNode {
            type: 'rule_ref';
            name: string;
        }

        interface Literal extends AstNode {
            type: 'literal';
            value: string;
            ignoreCase?: boolean;
            rawText?: string;
        }

        type Length1 = {
            readonly length: 1;
        }

        type Char = string & Length1;

        interface Class extends AstNode {
            readonly type: 'class';
            parts: (Char | Char[])[];
            inverted?: boolean;
            rawText?: string;
        }

        interface Any extends AstNode {
            type: 'any';
        }

        type Expression = 
            Choice
            | Action
            | Sequence
            | Labeled
            | Text
            | SimpleAnd
            | SimpleNot
            | Optional
            | ZeroOrMore
            | OneOrMore
            | Group
            | SemanticAnd
            | SemanticNot
            | RuleRef
            | Literal
            | Class
            | Any
            ;  

        class SyntaxError extends Error {
            readonly name: 'SyntaxError';
            message: string;
            expected: any;
            found: any;
            location: Location;
            
            constructor(message: string, expected: any, found: any, location: Location);
        }

        function parse(grammar: string): Grammar;

    }

    namespace compiler {
        const VERSION: string;
        
        var passes: any;

        function compile(ast: parser.Grammar, passes: any, options: CompilerOptions): any;
    }

    function generate<T>(grammar: string, options?: CompilerOptions): Parser<T>;

}