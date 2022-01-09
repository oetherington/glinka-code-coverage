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
{"lineNum":"   20","line":"const Cursor = @import(\"../common/cursor.zig\").Cursor;"},
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
{"lineNum":"   31","line":"        String,"},
{"lineNum":"   32","line":"        Template,"},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"        // Simple tokens"},
{"lineNum":"   35","line":"        LBrace,"},
{"lineNum":"   36","line":"        RBrace,"},
{"lineNum":"   37","line":"        LBrack,"},
{"lineNum":"   38","line":"        RBrack,"},
{"lineNum":"   39","line":"        LParen,"},
{"lineNum":"   40","line":"        RParen,"},
{"lineNum":"   41","line":"        Comma,"},
{"lineNum":"   42","line":"        Colon,"},
{"lineNum":"   43","line":"        Semi,"},
{"lineNum":"   44","line":""},
{"lineNum":"   45","line":"        // Operators"},
{"lineNum":"   46","line":"        Dot,"},
{"lineNum":"   47","line":"        OptionChain,"},
{"lineNum":"   48","line":"        Ellipsis,"},
{"lineNum":"   49","line":"        Arrow,"},
{"lineNum":"   50","line":"        Add,"},
{"lineNum":"   51","line":"        Sub,"},
{"lineNum":"   52","line":"        Mul,"},
{"lineNum":"   53","line":"        Div,"},
{"lineNum":"   54","line":"        Mod,"},
{"lineNum":"   55","line":"        Pow,"},
{"lineNum":"   56","line":"        Assign,"},
{"lineNum":"   57","line":"        AddAssign,"},
{"lineNum":"   58","line":"        SubAssign,"},
{"lineNum":"   59","line":"        MulAssign,"},
{"lineNum":"   60","line":"        DivAssign,"},
{"lineNum":"   61","line":"        ModAssign,"},
{"lineNum":"   62","line":"        PowAssign,"},
{"lineNum":"   63","line":"        Inc,"},
{"lineNum":"   64","line":"        Dec,"},
{"lineNum":"   65","line":"        CmpEq,"},
{"lineNum":"   66","line":"        CmpStrictEq,"},
{"lineNum":"   67","line":"        CmpNotEq,"},
{"lineNum":"   68","line":"        CmpStrictNotEq,"},
{"lineNum":"   69","line":"        CmpGreater,"},
{"lineNum":"   70","line":"        CmpLess,"},
{"lineNum":"   71","line":"        CmpGreaterEq,"},
{"lineNum":"   72","line":"        CmpLessEq,"},
{"lineNum":"   73","line":"        LogicalAnd,"},
{"lineNum":"   74","line":"        LogicalOr,"},
{"lineNum":"   75","line":"        LogicalNot,"},
{"lineNum":"   76","line":"        LogicalAndAssign,"},
{"lineNum":"   77","line":"        LogicalOrAssign,"},
{"lineNum":"   78","line":"        BitAnd,"},
{"lineNum":"   79","line":"        BitOr,"},
{"lineNum":"   80","line":"        BitNot,"},
{"lineNum":"   81","line":"        BitXor,"},
{"lineNum":"   82","line":"        BitAndAssign,"},
{"lineNum":"   83","line":"        BitOrAssign,"},
{"lineNum":"   84","line":"        BitNotAssign,"},
{"lineNum":"   85","line":"        BitXorAssign,"},
{"lineNum":"   86","line":"        ShiftLeft,"},
{"lineNum":"   87","line":"        ShiftRight,"},
{"lineNum":"   88","line":"        ShiftRightUnsigned,"},
{"lineNum":"   89","line":"        ShiftLeftAssign,"},
{"lineNum":"   90","line":"        ShiftRightAssign,"},
{"lineNum":"   91","line":"        ShiftRightUnsignedAssign,"},
{"lineNum":"   92","line":"        Question,"},
{"lineNum":"   93","line":"        Nullish,"},
{"lineNum":"   94","line":"        NullishAssign,"},
{"lineNum":"   95","line":""},
{"lineNum":"   96","line":"        // Keywords"},
{"lineNum":"   97","line":"        Var,"},
{"lineNum":"   98","line":"        Let,"},
{"lineNum":"   99","line":"        Const,"},
{"lineNum":"  100","line":"        Function,"},
{"lineNum":"  101","line":"        Void,"},
{"lineNum":"  102","line":"        Async,"},
{"lineNum":"  103","line":"        Await,"},
{"lineNum":"  104","line":"        Yield,"},
{"lineNum":"  105","line":"        Declare,"},
{"lineNum":"  106","line":"        New,"},
{"lineNum":"  107","line":"        Delete,"},
{"lineNum":"  108","line":"        This,"},
{"lineNum":"  109","line":"        Class,"},
{"lineNum":"  110","line":"        Extends,"},
{"lineNum":"  111","line":"        Implements,"},
{"lineNum":"  112","line":"        Constructor,"},
{"lineNum":"  113","line":"        Super,"},
{"lineNum":"  114","line":"        Static,"},
{"lineNum":"  115","line":"        Public,"},
{"lineNum":"  116","line":"        Private,"},
{"lineNum":"  117","line":"        Enum,"},
{"lineNum":"  118","line":"        Interface,"},
{"lineNum":"  119","line":"        Import,"},
{"lineNum":"  120","line":"        Export,"},
{"lineNum":"  121","line":"        True,"},
{"lineNum":"  122","line":"        False,"},
{"lineNum":"  123","line":"        Null,"},
{"lineNum":"  124","line":"        Undefined,"},
{"lineNum":"  125","line":"        TypeOf,"},
{"lineNum":"  126","line":"        InstanceOf,"},
{"lineNum":"  127","line":"        If,"},
{"lineNum":"  128","line":"        Else,"},
{"lineNum":"  129","line":"        Do,"},
{"lineNum":"  130","line":"        While,"},
{"lineNum":"  131","line":"        For,"},
{"lineNum":"  132","line":"        In,"},
{"lineNum":"  133","line":"        Of,"},
{"lineNum":"  134","line":"        Break,"},
{"lineNum":"  135","line":"        Continue,"},
{"lineNum":"  136","line":"        Switch,"},
{"lineNum":"  137","line":"        Case,"},
{"lineNum":"  138","line":"        Default,"},
{"lineNum":"  139","line":"        Return,"},
{"lineNum":"  140","line":"        With,"},
{"lineNum":"  141","line":"        Throw,"},
{"lineNum":"  142","line":"        Try,"},
{"lineNum":"  143","line":"        Catch,"},
{"lineNum":"  144","line":"        Finally,"},
{"lineNum":"  145","line":"        Type,"},
{"lineNum":"  146","line":"    };"},
{"lineNum":"  147","line":""},
{"lineNum":"  148","line":"    ty: Type,"},
{"lineNum":"  149","line":"    csr: Cursor,"},
{"lineNum":"  150","line":"    data: []const u8,"},
{"lineNum":"  151","line":""},
{"lineNum":"  152","line":"    pub fn new(ty: Type, csr: Cursor) Token {","class":"lineCov","hits":"1","order":"17","possible_hits":"1",},
{"lineNum":"  153","line":"        return Token{","class":"lineCov","hits":"1","order":"21","possible_hits":"1",},
{"lineNum":"  154","line":"            .ty = ty,","class":"lineCov","hits":"1","order":"18","possible_hits":"1",},
{"lineNum":"  155","line":"            .csr = csr,","class":"lineCov","hits":"1","order":"19","possible_hits":"1",},
{"lineNum":"  156","line":"            .data = \"\",","class":"lineCov","hits":"1","order":"20","possible_hits":"1",},
{"lineNum":"  157","line":"        };"},
{"lineNum":"  158","line":"    }"},
{"lineNum":"  159","line":""},
{"lineNum":"  160","line":"    pub fn newData(ty: Type, csr: Cursor, data: []const u8) Token {","class":"lineCov","hits":"1","order":"44","possible_hits":"1",},
{"lineNum":"  161","line":"        return Token{","class":"lineCov","hits":"1","order":"48","possible_hits":"1",},
{"lineNum":"  162","line":"            .ty = ty,","class":"lineCov","hits":"1","order":"45","possible_hits":"1",},
{"lineNum":"  163","line":"            .csr = csr,","class":"lineCov","hits":"1","order":"46","possible_hits":"1",},
{"lineNum":"  164","line":"            .data = data,","class":"lineCov","hits":"1","order":"47","possible_hits":"1",},
{"lineNum":"  165","line":"        };"},
{"lineNum":"  166","line":"    }"},
{"lineNum":"  167","line":""},
{"lineNum":"  168","line":"    pub fn newInvalid() Token {","class":"lineCov","hits":"1","order":"15","possible_hits":"1",},
{"lineNum":"  169","line":"        return Token.new(Type.Invalid, Cursor.new(0, 0));","class":"lineCov","hits":"1","order":"16","possible_hits":"1",},
{"lineNum":"  170","line":"    }"},
{"lineNum":"  171","line":""},
{"lineNum":"  172","line":"    pub fn dump(self: Token) void {"},
{"lineNum":"  173","line":"        const writer = std.io.getStdOut().writer();"},
{"lineNum":"  174","line":"        writer.print(\"{?}\\n\", .{self}) catch unreachable;"},
{"lineNum":"  175","line":"    }"},
{"lineNum":"  176","line":"};"},
{"lineNum":"  177","line":""},
{"lineNum":"  178","line":"test \"token can be initialized with no data\" {","class":"lineCov","hits":"2","order":"612","possible_hits":"2",},
{"lineNum":"  179","line":"    const ty: Token.Type = .Int;"},
{"lineNum":"  180","line":"    const ln: u32 = 3;"},
{"lineNum":"  181","line":"    const ch: u32 = 4;"},
{"lineNum":"  182","line":"    const csr = Cursor.new(ln, ch);","class":"lineCov","hits":"1","order":"613","possible_hits":"1",},
{"lineNum":"  183","line":"    const expectedData: []const u8 = \"\";"},
{"lineNum":"  184","line":""},
{"lineNum":"  185","line":"    const token = Token.new(ty, csr);","class":"lineCov","hits":"1","order":"614","possible_hits":"1",},
{"lineNum":"  186","line":""},
{"lineNum":"  187","line":"    try expectEqual(ty, token.ty);","class":"lineCov","hits":"1","order":"615","possible_hits":"1",},
{"lineNum":"  188","line":"    try expectEqual(ln, token.csr.ln);","class":"lineCov","hits":"1","order":"616","possible_hits":"1",},
{"lineNum":"  189","line":"    try expectEqual(ch, token.csr.ch);","class":"lineCov","hits":"1","order":"617","possible_hits":"1",},
{"lineNum":"  190","line":"    try expectEqual(expectedData, token.data);","class":"lineCov","hits":"1","order":"618","possible_hits":"1",},
{"lineNum":"  191","line":"}"},
{"lineNum":"  192","line":""},
{"lineNum":"  193","line":"test \"token can be initialized with data\" {","class":"lineCov","hits":"2","order":"619","possible_hits":"2",},
{"lineNum":"  194","line":"    const ty: Token.Type = .Int;"},
{"lineNum":"  195","line":"    const ln: u32 = 3;"},
{"lineNum":"  196","line":"    const ch: u32 = 4;"},
{"lineNum":"  197","line":"    const csr = Cursor.new(ln, ch);","class":"lineCov","hits":"1","order":"620","possible_hits":"1",},
{"lineNum":"  198","line":"    const data: []const u8 = \"Some sample data\";"},
{"lineNum":"  199","line":""},
{"lineNum":"  200","line":"    const token = Token.newData(ty, csr, data);","class":"lineCov","hits":"1","order":"621","possible_hits":"1",},
{"lineNum":"  201","line":""},
{"lineNum":"  202","line":"    try expectEqual(ty, token.ty);","class":"lineCov","hits":"1","order":"622","possible_hits":"1",},
{"lineNum":"  203","line":"    try expectEqual(csr.ln, token.csr.ln);","class":"lineCov","hits":"1","order":"623","possible_hits":"1",},
{"lineNum":"  204","line":"    try expectEqual(csr.ch, token.csr.ch);","class":"lineCov","hits":"1","order":"624","possible_hits":"1",},
{"lineNum":"  205","line":"    try expectEqual(data, token.data);","class":"lineCov","hits":"1","order":"625","possible_hits":"1",},
{"lineNum":"  206","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-09 12:42:29", "instrumented" : 26, "covered" : 26,};
var merged_data = [];
