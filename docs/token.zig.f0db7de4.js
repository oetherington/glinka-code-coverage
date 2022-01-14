var data = {lines:[
{"lineNum":"    1","line":"// glinka"},
{"lineNum":"    2","line":"// Copyright (C) 2021-2022 Ollie Etherington"},
{"lineNum":"    3","line":"// <www.etherington.io>"},
{"lineNum":"    4","line":"//"},
{"lineNum":"    5","line":"// This program is free software: you can redistribute it and/or modify"},
{"lineNum":"    6","line":"// it under the terms of the GNU Affero General Public License as published"},
{"lineNum":"    7","line":"// by the Free Software Foundation, either version 3 of the License, or"},
{"lineNum":"    8","line":"// (at your option) any later version."},
{"lineNum":"    9","line":"//"},
{"lineNum":"   10","line":"// This program is distributed in the hope that it will be useful,"},
{"lineNum":"   11","line":"// but WITHOUT ANY WARRANTY; without even the implied warranty of"},
{"lineNum":"   12","line":"// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the"},
{"lineNum":"   13","line":"// GNU Affero General Public License for more details."},
{"lineNum":"   14","line":"//"},
{"lineNum":"   15","line":"// You should have received a copy of the GNU Affero General Public License"},
{"lineNum":"   16","line":"// along with this program. If not, see <http://www.gnu.org/licenses/>."},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"const std = @import(\"std\");"},
{"lineNum":"   19","line":"const expectEqual = std.testing.expectEqual;"},
{"lineNum":"   20","line":"const Cursor = @import(\"cursor.zig\").Cursor;"},
{"lineNum":"   21","line":""},
{"lineNum":"   22","line":"pub const Token = struct {"},
{"lineNum":"   23","line":"    pub const Type = enum {"},
{"lineNum":"   24","line":"        // Special tokens"},
{"lineNum":"   25","line":"        EOF,"},
{"lineNum":"   26","line":"        Invalid,"},
{"lineNum":"   27","line":""},
{"lineNum":"   28","line":"        // Literal tokens"},
{"lineNum":"   29","line":"        Ident,"},
{"lineNum":"   30","line":"        Int,"},
{"lineNum":"   31","line":"        BigInt,"},
{"lineNum":"   32","line":"        Float,"},
{"lineNum":"   33","line":"        String,"},
{"lineNum":"   34","line":"        Template,"},
{"lineNum":"   35","line":""},
{"lineNum":"   36","line":"        // Simple tokens"},
{"lineNum":"   37","line":"        LBrace,"},
{"lineNum":"   38","line":"        RBrace,"},
{"lineNum":"   39","line":"        LBrack,"},
{"lineNum":"   40","line":"        RBrack,"},
{"lineNum":"   41","line":"        LParen,"},
{"lineNum":"   42","line":"        RParen,"},
{"lineNum":"   43","line":"        Comma,"},
{"lineNum":"   44","line":"        Colon,"},
{"lineNum":"   45","line":"        Semi,"},
{"lineNum":"   46","line":""},
{"lineNum":"   47","line":"        // Operators"},
{"lineNum":"   48","line":"        Dot,"},
{"lineNum":"   49","line":"        OptionChain,"},
{"lineNum":"   50","line":"        Ellipsis,"},
{"lineNum":"   51","line":"        Arrow,"},
{"lineNum":"   52","line":"        Add,"},
{"lineNum":"   53","line":"        Sub,"},
{"lineNum":"   54","line":"        Mul,"},
{"lineNum":"   55","line":"        Div,"},
{"lineNum":"   56","line":"        Mod,"},
{"lineNum":"   57","line":"        Pow,"},
{"lineNum":"   58","line":"        Assign,"},
{"lineNum":"   59","line":"        AddAssign,"},
{"lineNum":"   60","line":"        SubAssign,"},
{"lineNum":"   61","line":"        MulAssign,"},
{"lineNum":"   62","line":"        DivAssign,"},
{"lineNum":"   63","line":"        ModAssign,"},
{"lineNum":"   64","line":"        PowAssign,"},
{"lineNum":"   65","line":"        Inc,"},
{"lineNum":"   66","line":"        Dec,"},
{"lineNum":"   67","line":"        CmpEq,"},
{"lineNum":"   68","line":"        CmpStrictEq,"},
{"lineNum":"   69","line":"        CmpNotEq,"},
{"lineNum":"   70","line":"        CmpStrictNotEq,"},
{"lineNum":"   71","line":"        CmpGreater,"},
{"lineNum":"   72","line":"        CmpLess,"},
{"lineNum":"   73","line":"        CmpGreaterEq,"},
{"lineNum":"   74","line":"        CmpLessEq,"},
{"lineNum":"   75","line":"        LogicalAnd,"},
{"lineNum":"   76","line":"        LogicalOr,"},
{"lineNum":"   77","line":"        LogicalNot,"},
{"lineNum":"   78","line":"        LogicalAndAssign,"},
{"lineNum":"   79","line":"        LogicalOrAssign,"},
{"lineNum":"   80","line":"        BitAnd,"},
{"lineNum":"   81","line":"        BitOr,"},
{"lineNum":"   82","line":"        BitNot,"},
{"lineNum":"   83","line":"        BitXor,"},
{"lineNum":"   84","line":"        BitAndAssign,"},
{"lineNum":"   85","line":"        BitOrAssign,"},
{"lineNum":"   86","line":"        BitNotAssign,"},
{"lineNum":"   87","line":"        BitXorAssign,"},
{"lineNum":"   88","line":"        ShiftLeft,"},
{"lineNum":"   89","line":"        ShiftRight,"},
{"lineNum":"   90","line":"        ShiftRightUnsigned,"},
{"lineNum":"   91","line":"        ShiftLeftAssign,"},
{"lineNum":"   92","line":"        ShiftRightAssign,"},
{"lineNum":"   93","line":"        ShiftRightUnsignedAssign,"},
{"lineNum":"   94","line":"        Question,"},
{"lineNum":"   95","line":"        Nullish,"},
{"lineNum":"   96","line":"        NullishAssign,"},
{"lineNum":"   97","line":""},
{"lineNum":"   98","line":"        // Keywords"},
{"lineNum":"   99","line":"        Var,"},
{"lineNum":"  100","line":"        Let,"},
{"lineNum":"  101","line":"        Const,"},
{"lineNum":"  102","line":"        Function,"},
{"lineNum":"  103","line":"        Void,"},
{"lineNum":"  104","line":"        Async,"},
{"lineNum":"  105","line":"        Await,"},
{"lineNum":"  106","line":"        Yield,"},
{"lineNum":"  107","line":"        Declare,"},
{"lineNum":"  108","line":"        New,"},
{"lineNum":"  109","line":"        Delete,"},
{"lineNum":"  110","line":"        Class,"},
{"lineNum":"  111","line":"        Extends,"},
{"lineNum":"  112","line":"        Implements,"},
{"lineNum":"  113","line":"        Constructor,"},
{"lineNum":"  114","line":"        Super,"},
{"lineNum":"  115","line":"        Static,"},
{"lineNum":"  116","line":"        Public,"},
{"lineNum":"  117","line":"        Private,"},
{"lineNum":"  118","line":"        Enum,"},
{"lineNum":"  119","line":"        Interface,"},
{"lineNum":"  120","line":"        Import,"},
{"lineNum":"  121","line":"        Export,"},
{"lineNum":"  122","line":"        True,"},
{"lineNum":"  123","line":"        False,"},
{"lineNum":"  124","line":"        Null,"},
{"lineNum":"  125","line":"        Undefined,"},
{"lineNum":"  126","line":"        TypeOf,"},
{"lineNum":"  127","line":"        InstanceOf,"},
{"lineNum":"  128","line":"        If,"},
{"lineNum":"  129","line":"        Else,"},
{"lineNum":"  130","line":"        Do,"},
{"lineNum":"  131","line":"        While,"},
{"lineNum":"  132","line":"        For,"},
{"lineNum":"  133","line":"        In,"},
{"lineNum":"  134","line":"        Of,"},
{"lineNum":"  135","line":"        Break,"},
{"lineNum":"  136","line":"        Continue,"},
{"lineNum":"  137","line":"        Switch,"},
{"lineNum":"  138","line":"        Case,"},
{"lineNum":"  139","line":"        Default,"},
{"lineNum":"  140","line":"        Return,"},
{"lineNum":"  141","line":"        With,"},
{"lineNum":"  142","line":"        Throw,"},
{"lineNum":"  143","line":"        Try,"},
{"lineNum":"  144","line":"        Catch,"},
{"lineNum":"  145","line":"        Finally,"},
{"lineNum":"  146","line":"        Type,"},
{"lineNum":"  147","line":"    };"},
{"lineNum":"  148","line":""},
{"lineNum":"  149","line":"    ty: Type,"},
{"lineNum":"  150","line":"    csr: Cursor,"},
{"lineNum":"  151","line":"    data: []const u8,"},
{"lineNum":"  152","line":""},
{"lineNum":"  153","line":"    pub fn new(ty: Type, csr: Cursor) Token {","class":"lineCov","hits":"1","order":"17","possible_hits":"1",},
{"lineNum":"  154","line":"        return Token{","class":"lineCov","hits":"1","order":"21","possible_hits":"1",},
{"lineNum":"  155","line":"            .ty = ty,","class":"lineCov","hits":"1","order":"18","possible_hits":"1",},
{"lineNum":"  156","line":"            .csr = csr,","class":"lineCov","hits":"1","order":"19","possible_hits":"1",},
{"lineNum":"  157","line":"            .data = \"\",","class":"lineCov","hits":"1","order":"20","possible_hits":"1",},
{"lineNum":"  158","line":"        };"},
{"lineNum":"  159","line":"    }"},
{"lineNum":"  160","line":""},
{"lineNum":"  161","line":"    pub fn newData(ty: Type, csr: Cursor, data: []const u8) Token {","class":"lineCov","hits":"1","order":"44","possible_hits":"1",},
{"lineNum":"  162","line":"        return Token{","class":"lineCov","hits":"1","order":"48","possible_hits":"1",},
{"lineNum":"  163","line":"            .ty = ty,","class":"lineCov","hits":"1","order":"45","possible_hits":"1",},
{"lineNum":"  164","line":"            .csr = csr,","class":"lineCov","hits":"1","order":"46","possible_hits":"1",},
{"lineNum":"  165","line":"            .data = data,","class":"lineCov","hits":"1","order":"47","possible_hits":"1",},
{"lineNum":"  166","line":"        };"},
{"lineNum":"  167","line":"    }"},
{"lineNum":"  168","line":""},
{"lineNum":"  169","line":"    pub fn newInvalid() Token {","class":"lineCov","hits":"1","order":"15","possible_hits":"1",},
{"lineNum":"  170","line":"        return Token.new(Type.Invalid, Cursor.new(0, 0));","class":"lineCov","hits":"1","order":"16","possible_hits":"1",},
{"lineNum":"  171","line":"    }"},
{"lineNum":"  172","line":""},
{"lineNum":"  173","line":"    pub fn dump(self: Token) void {"},
{"lineNum":"  174","line":"        const writer = std.io.getStdOut().writer();"},
{"lineNum":"  175","line":"        writer.print(\"{?}\\n\", .{self}) catch unreachable;"},
{"lineNum":"  176","line":"    }"},
{"lineNum":"  177","line":"};"},
{"lineNum":"  178","line":""},
{"lineNum":"  179","line":"test \"token can be initialized with no data\" {","class":"lineCov","hits":"2","order":"717","possible_hits":"2",},
{"lineNum":"  180","line":"    const ty: Token.Type = .Int;"},
{"lineNum":"  181","line":"    const ln: u32 = 3;"},
{"lineNum":"  182","line":"    const ch: u32 = 4;"},
{"lineNum":"  183","line":"    const csr = Cursor.new(ln, ch);","class":"lineCov","hits":"1","order":"718","possible_hits":"1",},
{"lineNum":"  184","line":"    const expectedData: []const u8 = \"\";"},
{"lineNum":"  185","line":""},
{"lineNum":"  186","line":"    const token = Token.new(ty, csr);","class":"lineCov","hits":"1","order":"719","possible_hits":"1",},
{"lineNum":"  187","line":""},
{"lineNum":"  188","line":"    try expectEqual(ty, token.ty);","class":"lineCov","hits":"1","order":"720","possible_hits":"1",},
{"lineNum":"  189","line":"    try expectEqual(ln, token.csr.ln);","class":"lineCov","hits":"1","order":"721","possible_hits":"1",},
{"lineNum":"  190","line":"    try expectEqual(ch, token.csr.ch);","class":"lineCov","hits":"1","order":"722","possible_hits":"1",},
{"lineNum":"  191","line":"    try expectEqual(expectedData, token.data);","class":"lineCov","hits":"1","order":"723","possible_hits":"1",},
{"lineNum":"  192","line":"}"},
{"lineNum":"  193","line":""},
{"lineNum":"  194","line":"test \"token can be initialized with data\" {","class":"lineCov","hits":"2","order":"724","possible_hits":"2",},
{"lineNum":"  195","line":"    const ty: Token.Type = .Int;"},
{"lineNum":"  196","line":"    const ln: u32 = 3;"},
{"lineNum":"  197","line":"    const ch: u32 = 4;"},
{"lineNum":"  198","line":"    const csr = Cursor.new(ln, ch);","class":"lineCov","hits":"1","order":"725","possible_hits":"1",},
{"lineNum":"  199","line":"    const data: []const u8 = \"Some sample data\";"},
{"lineNum":"  200","line":""},
{"lineNum":"  201","line":"    const token = Token.newData(ty, csr, data);","class":"lineCov","hits":"1","order":"726","possible_hits":"1",},
{"lineNum":"  202","line":""},
{"lineNum":"  203","line":"    try expectEqual(ty, token.ty);","class":"lineCov","hits":"1","order":"727","possible_hits":"1",},
{"lineNum":"  204","line":"    try expectEqual(csr.ln, token.csr.ln);","class":"lineCov","hits":"1","order":"728","possible_hits":"1",},
{"lineNum":"  205","line":"    try expectEqual(csr.ch, token.csr.ch);","class":"lineCov","hits":"1","order":"729","possible_hits":"1",},
{"lineNum":"  206","line":"    try expectEqual(data, token.data);","class":"lineCov","hits":"1","order":"730","possible_hits":"1",},
{"lineNum":"  207","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-14 09:28:45", "instrumented" : 26, "covered" : 26,};
var merged_data = [];
