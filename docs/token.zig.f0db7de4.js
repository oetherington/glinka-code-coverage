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
{"lineNum":"  110","line":"        This,"},
{"lineNum":"  111","line":"        Class,"},
{"lineNum":"  112","line":"        Extends,"},
{"lineNum":"  113","line":"        Implements,"},
{"lineNum":"  114","line":"        Constructor,"},
{"lineNum":"  115","line":"        Super,"},
{"lineNum":"  116","line":"        Static,"},
{"lineNum":"  117","line":"        Public,"},
{"lineNum":"  118","line":"        Private,"},
{"lineNum":"  119","line":"        Enum,"},
{"lineNum":"  120","line":"        Interface,"},
{"lineNum":"  121","line":"        Import,"},
{"lineNum":"  122","line":"        Export,"},
{"lineNum":"  123","line":"        True,"},
{"lineNum":"  124","line":"        False,"},
{"lineNum":"  125","line":"        Null,"},
{"lineNum":"  126","line":"        Undefined,"},
{"lineNum":"  127","line":"        TypeOf,"},
{"lineNum":"  128","line":"        InstanceOf,"},
{"lineNum":"  129","line":"        If,"},
{"lineNum":"  130","line":"        Else,"},
{"lineNum":"  131","line":"        Do,"},
{"lineNum":"  132","line":"        While,"},
{"lineNum":"  133","line":"        For,"},
{"lineNum":"  134","line":"        In,"},
{"lineNum":"  135","line":"        Of,"},
{"lineNum":"  136","line":"        Break,"},
{"lineNum":"  137","line":"        Continue,"},
{"lineNum":"  138","line":"        Switch,"},
{"lineNum":"  139","line":"        Case,"},
{"lineNum":"  140","line":"        Default,"},
{"lineNum":"  141","line":"        Return,"},
{"lineNum":"  142","line":"        With,"},
{"lineNum":"  143","line":"        Throw,"},
{"lineNum":"  144","line":"        Try,"},
{"lineNum":"  145","line":"        Catch,"},
{"lineNum":"  146","line":"        Finally,"},
{"lineNum":"  147","line":"        Type,"},
{"lineNum":"  148","line":"    };"},
{"lineNum":"  149","line":""},
{"lineNum":"  150","line":"    ty: Type,"},
{"lineNum":"  151","line":"    csr: Cursor,"},
{"lineNum":"  152","line":"    data: []const u8,"},
{"lineNum":"  153","line":""},
{"lineNum":"  154","line":"    pub fn new(ty: Type, csr: Cursor) Token {","class":"lineCov","hits":"1","order":"17","possible_hits":"1",},
{"lineNum":"  155","line":"        return Token{","class":"lineCov","hits":"1","order":"21","possible_hits":"1",},
{"lineNum":"  156","line":"            .ty = ty,","class":"lineCov","hits":"1","order":"18","possible_hits":"1",},
{"lineNum":"  157","line":"            .csr = csr,","class":"lineCov","hits":"1","order":"19","possible_hits":"1",},
{"lineNum":"  158","line":"            .data = \"\",","class":"lineCov","hits":"1","order":"20","possible_hits":"1",},
{"lineNum":"  159","line":"        };"},
{"lineNum":"  160","line":"    }"},
{"lineNum":"  161","line":""},
{"lineNum":"  162","line":"    pub fn newData(ty: Type, csr: Cursor, data: []const u8) Token {","class":"lineCov","hits":"1","order":"44","possible_hits":"1",},
{"lineNum":"  163","line":"        return Token{","class":"lineCov","hits":"1","order":"48","possible_hits":"1",},
{"lineNum":"  164","line":"            .ty = ty,","class":"lineCov","hits":"1","order":"45","possible_hits":"1",},
{"lineNum":"  165","line":"            .csr = csr,","class":"lineCov","hits":"1","order":"46","possible_hits":"1",},
{"lineNum":"  166","line":"            .data = data,","class":"lineCov","hits":"1","order":"47","possible_hits":"1",},
{"lineNum":"  167","line":"        };"},
{"lineNum":"  168","line":"    }"},
{"lineNum":"  169","line":""},
{"lineNum":"  170","line":"    pub fn newInvalid() Token {","class":"lineCov","hits":"1","order":"15","possible_hits":"1",},
{"lineNum":"  171","line":"        return Token.new(Type.Invalid, Cursor.new(0, 0));","class":"lineCov","hits":"1","order":"16","possible_hits":"1",},
{"lineNum":"  172","line":"    }"},
{"lineNum":"  173","line":""},
{"lineNum":"  174","line":"    pub fn dump(self: Token) void {"},
{"lineNum":"  175","line":"        const writer = std.io.getStdOut().writer();"},
{"lineNum":"  176","line":"        writer.print(\"{?}\\n\", .{self}) catch unreachable;"},
{"lineNum":"  177","line":"    }"},
{"lineNum":"  178","line":"};"},
{"lineNum":"  179","line":""},
{"lineNum":"  180","line":"test \"token can be initialized with no data\" {","class":"lineCov","hits":"2","order":"623","possible_hits":"2",},
{"lineNum":"  181","line":"    const ty: Token.Type = .Int;"},
{"lineNum":"  182","line":"    const ln: u32 = 3;"},
{"lineNum":"  183","line":"    const ch: u32 = 4;"},
{"lineNum":"  184","line":"    const csr = Cursor.new(ln, ch);","class":"lineCov","hits":"1","order":"624","possible_hits":"1",},
{"lineNum":"  185","line":"    const expectedData: []const u8 = \"\";"},
{"lineNum":"  186","line":""},
{"lineNum":"  187","line":"    const token = Token.new(ty, csr);","class":"lineCov","hits":"1","order":"625","possible_hits":"1",},
{"lineNum":"  188","line":""},
{"lineNum":"  189","line":"    try expectEqual(ty, token.ty);","class":"lineCov","hits":"1","order":"626","possible_hits":"1",},
{"lineNum":"  190","line":"    try expectEqual(ln, token.csr.ln);","class":"lineCov","hits":"1","order":"627","possible_hits":"1",},
{"lineNum":"  191","line":"    try expectEqual(ch, token.csr.ch);","class":"lineCov","hits":"1","order":"628","possible_hits":"1",},
{"lineNum":"  192","line":"    try expectEqual(expectedData, token.data);","class":"lineCov","hits":"1","order":"629","possible_hits":"1",},
{"lineNum":"  193","line":"}"},
{"lineNum":"  194","line":""},
{"lineNum":"  195","line":"test \"token can be initialized with data\" {","class":"lineCov","hits":"2","order":"630","possible_hits":"2",},
{"lineNum":"  196","line":"    const ty: Token.Type = .Int;"},
{"lineNum":"  197","line":"    const ln: u32 = 3;"},
{"lineNum":"  198","line":"    const ch: u32 = 4;"},
{"lineNum":"  199","line":"    const csr = Cursor.new(ln, ch);","class":"lineCov","hits":"1","order":"631","possible_hits":"1",},
{"lineNum":"  200","line":"    const data: []const u8 = \"Some sample data\";"},
{"lineNum":"  201","line":""},
{"lineNum":"  202","line":"    const token = Token.newData(ty, csr, data);","class":"lineCov","hits":"1","order":"632","possible_hits":"1",},
{"lineNum":"  203","line":""},
{"lineNum":"  204","line":"    try expectEqual(ty, token.ty);","class":"lineCov","hits":"1","order":"633","possible_hits":"1",},
{"lineNum":"  205","line":"    try expectEqual(csr.ln, token.csr.ln);","class":"lineCov","hits":"1","order":"634","possible_hits":"1",},
{"lineNum":"  206","line":"    try expectEqual(csr.ch, token.csr.ch);","class":"lineCov","hits":"1","order":"635","possible_hits":"1",},
{"lineNum":"  207","line":"    try expectEqual(data, token.data);","class":"lineCov","hits":"1","order":"636","possible_hits":"1",},
{"lineNum":"  208","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-11 07:31:37", "instrumented" : 26, "covered" : 26,};
var merged_data = [];
