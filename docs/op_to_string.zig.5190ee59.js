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
{"lineNum":"   19","line":"const expectEqualStrings = std.testing.expectEqualStrings;"},
{"lineNum":"   20","line":"const expectError = std.testing.expectError;"},
{"lineNum":"   21","line":"const TokenType = @import(\"../../common/token.zig\").Token.Type;"},
{"lineNum":"   22","line":""},
{"lineNum":"   23","line":"pub fn opToString(op: TokenType) error{InvalidOp}![]const u8 {","class":"lineCov","hits":"1","order":"6204","possible_hits":"1",},
{"lineNum":"   24","line":"    return switch (op) {","class":"lineCov","hits":"50","order":"6205","possible_hits":"50",},
{"lineNum":"   25","line":"        .OptionChain => \".?\",","class":"lineCov","hits":"1","order":"6781","possible_hits":"1",},
{"lineNum":"   26","line":"        .Ellipsis => \"...\",","class":"lineCov","hits":"1","order":"6784","possible_hits":"1",},
{"lineNum":"   27","line":"        .Add => \"+\",","class":"lineCov","hits":"1","order":"6239","possible_hits":"1",},
{"lineNum":"   28","line":"        .AddAssign => \"+=\",","class":"lineCov","hits":"1","order":"6787","possible_hits":"1",},
{"lineNum":"   29","line":"        .Inc => \"++\",","class":"lineCov","hits":"1","order":"6206","possible_hits":"1",},
{"lineNum":"   30","line":"        .Sub => \"-\",","class":"lineCov","hits":"1","order":"6790","possible_hits":"1",},
{"lineNum":"   31","line":"        .SubAssign => \"-=\",","class":"lineCov","hits":"1","order":"6792","possible_hits":"1",},
{"lineNum":"   32","line":"        .Dec => \"--\",","class":"lineCov","hits":"1","order":"6223","possible_hits":"1",},
{"lineNum":"   33","line":"        .Mul => \"*\",","class":"lineCov","hits":"1","order":"6795","possible_hits":"1",},
{"lineNum":"   34","line":"        .MulAssign => \"*=\",","class":"lineCov","hits":"1","order":"6797","possible_hits":"1",},
{"lineNum":"   35","line":"        .Pow => \"**\",","class":"lineCov","hits":"1","order":"6799","possible_hits":"1",},
{"lineNum":"   36","line":"        .PowAssign => \"**=\",","class":"lineCov","hits":"1","order":"6801","possible_hits":"1",},
{"lineNum":"   37","line":"        .Div => \"/\",","class":"lineCov","hits":"1","order":"6803","possible_hits":"1",},
{"lineNum":"   38","line":"        .DivAssign => \"/=\",","class":"lineCov","hits":"1","order":"6805","possible_hits":"1",},
{"lineNum":"   39","line":"        .Mod => \"%\",","class":"lineCov","hits":"1","order":"6807","possible_hits":"1",},
{"lineNum":"   40","line":"        .ModAssign => \"%=\",","class":"lineCov","hits":"1","order":"6809","possible_hits":"1",},
{"lineNum":"   41","line":"        .Assign => \"=\",","class":"lineCov","hits":"1","order":"6811","possible_hits":"1",},
{"lineNum":"   42","line":"        .CmpEq => \"==\",","class":"lineCov","hits":"1","order":"6813","possible_hits":"1",},
{"lineNum":"   43","line":"        .CmpStrictEq => \"===\",","class":"lineCov","hits":"1","order":"6815","possible_hits":"1",},
{"lineNum":"   44","line":"        .LogicalNot => \"!\",","class":"lineCov","hits":"1","order":"6817","possible_hits":"1",},
{"lineNum":"   45","line":"        .CmpNotEq => \"!=\",","class":"lineCov","hits":"1","order":"6819","possible_hits":"1",},
{"lineNum":"   46","line":"        .CmpStrictNotEq => \"!==\",","class":"lineCov","hits":"1","order":"6821","possible_hits":"1",},
{"lineNum":"   47","line":"        .CmpGreater => \">\",","class":"lineCov","hits":"1","order":"6823","possible_hits":"1",},
{"lineNum":"   48","line":"        .CmpGreaterEq => \">=\",","class":"lineCov","hits":"1","order":"6825","possible_hits":"1",},
{"lineNum":"   49","line":"        .CmpLess => \"<\",","class":"lineCov","hits":"1","order":"6827","possible_hits":"1",},
{"lineNum":"   50","line":"        .CmpLessEq => \"<=\",","class":"lineCov","hits":"1","order":"6829","possible_hits":"1",},
{"lineNum":"   51","line":"        .Nullish => \"??\",","class":"lineCov","hits":"1","order":"6831","possible_hits":"1",},
{"lineNum":"   52","line":"        .NullishAssign => \"??=\",","class":"lineCov","hits":"1","order":"6833","possible_hits":"1",},
{"lineNum":"   53","line":"        .BitAnd => \"&\",","class":"lineCov","hits":"1","order":"6835","possible_hits":"1",},
{"lineNum":"   54","line":"        .BitAndAssign => \"&=\",","class":"lineCov","hits":"1","order":"6837","possible_hits":"1",},
{"lineNum":"   55","line":"        .LogicalAnd => \"&&\",","class":"lineCov","hits":"1","order":"6839","possible_hits":"1",},
{"lineNum":"   56","line":"        .LogicalAndAssign => \"&&=\",","class":"lineCov","hits":"1","order":"6841","possible_hits":"1",},
{"lineNum":"   57","line":"        .BitOr => \"|\",","class":"lineCov","hits":"1","order":"6843","possible_hits":"1",},
{"lineNum":"   58","line":"        .BitOrAssign => \"|=\",","class":"lineCov","hits":"1","order":"6845","possible_hits":"1",},
{"lineNum":"   59","line":"        .LogicalOr => \"||\",","class":"lineCov","hits":"1","order":"6847","possible_hits":"1",},
{"lineNum":"   60","line":"        .LogicalOrAssign => \"||=\",","class":"lineCov","hits":"1","order":"6849","possible_hits":"1",},
{"lineNum":"   61","line":"        .BitNot => \"~\",","class":"lineCov","hits":"1","order":"6851","possible_hits":"1",},
{"lineNum":"   62","line":"        .BitNotAssign => \"~=\",","class":"lineCov","hits":"1","order":"6853","possible_hits":"1",},
{"lineNum":"   63","line":"        .BitXor => \"^\",","class":"lineCov","hits":"1","order":"6855","possible_hits":"1",},
{"lineNum":"   64","line":"        .BitXorAssign => \"^=\",","class":"lineCov","hits":"1","order":"6857","possible_hits":"1",},
{"lineNum":"   65","line":"        .ShiftRight => \">>\",","class":"lineCov","hits":"1","order":"6859","possible_hits":"1",},
{"lineNum":"   66","line":"        .ShiftRightAssign => \">>=\",","class":"lineCov","hits":"1","order":"6861","possible_hits":"1",},
{"lineNum":"   67","line":"        .ShiftRightUnsigned => \">>>\",","class":"lineCov","hits":"1","order":"6863","possible_hits":"1",},
{"lineNum":"   68","line":"        .ShiftRightUnsignedAssign => \">>>=\",","class":"lineCov","hits":"1","order":"6865","possible_hits":"1",},
{"lineNum":"   69","line":"        .ShiftLeft => \"<<\",","class":"lineCov","hits":"1","order":"6867","possible_hits":"1",},
{"lineNum":"   70","line":"        .ShiftLeftAssign => \"<<=\",","class":"lineCov","hits":"1","order":"6869","possible_hits":"1",},
{"lineNum":"   71","line":"        .Delete => \"delete \",","class":"lineCov","hits":"1","order":"6871","possible_hits":"1",},
{"lineNum":"   72","line":"        .TypeOf => \"typeof \",","class":"lineCov","hits":"1","order":"6873","possible_hits":"1",},
{"lineNum":"   73","line":"        else => error.InvalidOp,","class":"lineCov","hits":"1","order":"6876","possible_hits":"1",},
{"lineNum":"   74","line":"    };"},
{"lineNum":"   75","line":"}"},
{"lineNum":"   76","line":""},
{"lineNum":"   77","line":"test \"JSBackend can convert operators to strings\" {","class":"lineCov","hits":"2","order":"6777","possible_hits":"2",},
{"lineNum":"   78","line":"    const TestCase = struct {"},
{"lineNum":"   79","line":"        pub fn run(ty: TokenType, expected: []const u8) !void {","class":"lineCov","hits":"2","order":"6779","possible_hits":"2",},
{"lineNum":"   80","line":"            const str = try opToString(ty);","class":"lineCov","hits":"1","order":"6780","possible_hits":"1",},
{"lineNum":"   81","line":"            try expectEqualStrings(expected, str);","class":"lineCov","hits":"1","order":"6782","possible_hits":"1",},
{"lineNum":"   82","line":"        }"},
{"lineNum":"   83","line":"    };"},
{"lineNum":"   84","line":""},
{"lineNum":"   85","line":"    try TestCase.run(.OptionChain, \".?\");","class":"lineCov","hits":"1","order":"6778","possible_hits":"1",},
{"lineNum":"   86","line":"    try TestCase.run(.Ellipsis, \"...\");","class":"lineCov","hits":"1","order":"6783","possible_hits":"1",},
{"lineNum":"   87","line":"    try TestCase.run(.Add, \"+\");","class":"lineCov","hits":"1","order":"6785","possible_hits":"1",},
{"lineNum":"   88","line":"    try TestCase.run(.AddAssign, \"+=\");","class":"lineCov","hits":"1","order":"6786","possible_hits":"1",},
{"lineNum":"   89","line":"    try TestCase.run(.Inc, \"++\");","class":"lineCov","hits":"1","order":"6788","possible_hits":"1",},
{"lineNum":"   90","line":"    try TestCase.run(.Sub, \"-\");","class":"lineCov","hits":"1","order":"6789","possible_hits":"1",},
{"lineNum":"   91","line":"    try TestCase.run(.SubAssign, \"-=\");","class":"lineCov","hits":"1","order":"6791","possible_hits":"1",},
{"lineNum":"   92","line":"    try TestCase.run(.Dec, \"--\");","class":"lineCov","hits":"1","order":"6793","possible_hits":"1",},
{"lineNum":"   93","line":"    try TestCase.run(.Mul, \"*\");","class":"lineCov","hits":"1","order":"6794","possible_hits":"1",},
{"lineNum":"   94","line":"    try TestCase.run(.MulAssign, \"*=\");","class":"lineCov","hits":"1","order":"6796","possible_hits":"1",},
{"lineNum":"   95","line":"    try TestCase.run(.Pow, \"**\");","class":"lineCov","hits":"1","order":"6798","possible_hits":"1",},
{"lineNum":"   96","line":"    try TestCase.run(.PowAssign, \"**=\");","class":"lineCov","hits":"1","order":"6800","possible_hits":"1",},
{"lineNum":"   97","line":"    try TestCase.run(.Div, \"/\");","class":"lineCov","hits":"1","order":"6802","possible_hits":"1",},
{"lineNum":"   98","line":"    try TestCase.run(.DivAssign, \"/=\");","class":"lineCov","hits":"1","order":"6804","possible_hits":"1",},
{"lineNum":"   99","line":"    try TestCase.run(.Mod, \"%\");","class":"lineCov","hits":"1","order":"6806","possible_hits":"1",},
{"lineNum":"  100","line":"    try TestCase.run(.ModAssign, \"%=\");","class":"lineCov","hits":"1","order":"6808","possible_hits":"1",},
{"lineNum":"  101","line":"    try TestCase.run(.Assign, \"=\");","class":"lineCov","hits":"1","order":"6810","possible_hits":"1",},
{"lineNum":"  102","line":"    try TestCase.run(.CmpEq, \"==\");","class":"lineCov","hits":"1","order":"6812","possible_hits":"1",},
{"lineNum":"  103","line":"    try TestCase.run(.CmpStrictEq, \"===\");","class":"lineCov","hits":"1","order":"6814","possible_hits":"1",},
{"lineNum":"  104","line":"    try TestCase.run(.LogicalNot, \"!\");","class":"lineCov","hits":"1","order":"6816","possible_hits":"1",},
{"lineNum":"  105","line":"    try TestCase.run(.CmpNotEq, \"!=\");","class":"lineCov","hits":"1","order":"6818","possible_hits":"1",},
{"lineNum":"  106","line":"    try TestCase.run(.CmpStrictNotEq, \"!==\");","class":"lineCov","hits":"1","order":"6820","possible_hits":"1",},
{"lineNum":"  107","line":"    try TestCase.run(.CmpGreater, \">\");","class":"lineCov","hits":"1","order":"6822","possible_hits":"1",},
{"lineNum":"  108","line":"    try TestCase.run(.CmpGreaterEq, \">=\");","class":"lineCov","hits":"1","order":"6824","possible_hits":"1",},
{"lineNum":"  109","line":"    try TestCase.run(.CmpLess, \"<\");","class":"lineCov","hits":"1","order":"6826","possible_hits":"1",},
{"lineNum":"  110","line":"    try TestCase.run(.CmpLessEq, \"<=\");","class":"lineCov","hits":"1","order":"6828","possible_hits":"1",},
{"lineNum":"  111","line":"    try TestCase.run(.Nullish, \"??\");","class":"lineCov","hits":"1","order":"6830","possible_hits":"1",},
{"lineNum":"  112","line":"    try TestCase.run(.NullishAssign, \"??=\");","class":"lineCov","hits":"1","order":"6832","possible_hits":"1",},
{"lineNum":"  113","line":"    try TestCase.run(.BitAnd, \"&\");","class":"lineCov","hits":"1","order":"6834","possible_hits":"1",},
{"lineNum":"  114","line":"    try TestCase.run(.BitAndAssign, \"&=\");","class":"lineCov","hits":"1","order":"6836","possible_hits":"1",},
{"lineNum":"  115","line":"    try TestCase.run(.LogicalAnd, \"&&\");","class":"lineCov","hits":"1","order":"6838","possible_hits":"1",},
{"lineNum":"  116","line":"    try TestCase.run(.LogicalAndAssign, \"&&=\");","class":"lineCov","hits":"1","order":"6840","possible_hits":"1",},
{"lineNum":"  117","line":"    try TestCase.run(.BitOr, \"|\");","class":"lineCov","hits":"1","order":"6842","possible_hits":"1",},
{"lineNum":"  118","line":"    try TestCase.run(.BitOrAssign, \"|=\");","class":"lineCov","hits":"1","order":"6844","possible_hits":"1",},
{"lineNum":"  119","line":"    try TestCase.run(.LogicalOr, \"||\");","class":"lineCov","hits":"1","order":"6846","possible_hits":"1",},
{"lineNum":"  120","line":"    try TestCase.run(.LogicalOrAssign, \"||=\");","class":"lineCov","hits":"1","order":"6848","possible_hits":"1",},
{"lineNum":"  121","line":"    try TestCase.run(.BitNot, \"~\");","class":"lineCov","hits":"1","order":"6850","possible_hits":"1",},
{"lineNum":"  122","line":"    try TestCase.run(.BitNotAssign, \"~=\");","class":"lineCov","hits":"1","order":"6852","possible_hits":"1",},
{"lineNum":"  123","line":"    try TestCase.run(.BitXor, \"^\");","class":"lineCov","hits":"1","order":"6854","possible_hits":"1",},
{"lineNum":"  124","line":"    try TestCase.run(.BitXorAssign, \"^=\");","class":"lineCov","hits":"1","order":"6856","possible_hits":"1",},
{"lineNum":"  125","line":"    try TestCase.run(.ShiftRight, \">>\");","class":"lineCov","hits":"1","order":"6858","possible_hits":"1",},
{"lineNum":"  126","line":"    try TestCase.run(.ShiftRightAssign, \">>=\");","class":"lineCov","hits":"1","order":"6860","possible_hits":"1",},
{"lineNum":"  127","line":"    try TestCase.run(.ShiftRightUnsigned, \">>>\");","class":"lineCov","hits":"1","order":"6862","possible_hits":"1",},
{"lineNum":"  128","line":"    try TestCase.run(.ShiftRightUnsignedAssign, \">>>=\");","class":"lineCov","hits":"1","order":"6864","possible_hits":"1",},
{"lineNum":"  129","line":"    try TestCase.run(.ShiftLeft, \"<<\");","class":"lineCov","hits":"1","order":"6866","possible_hits":"1",},
{"lineNum":"  130","line":"    try TestCase.run(.ShiftLeftAssign, \"<<=\");","class":"lineCov","hits":"1","order":"6868","possible_hits":"1",},
{"lineNum":"  131","line":"    try TestCase.run(.Delete, \"delete \");","class":"lineCov","hits":"1","order":"6870","possible_hits":"1",},
{"lineNum":"  132","line":"    try TestCase.run(.TypeOf, \"typeof \");","class":"lineCov","hits":"1","order":"6872","possible_hits":"1",},
{"lineNum":"  133","line":"}"},
{"lineNum":"  134","line":""},
{"lineNum":"  135","line":"test \"JSBackend throws an error for invalid operators\" {","class":"lineCov","hits":"2","order":"6874","possible_hits":"2",},
{"lineNum":"  136","line":"    const ty = TokenType.LBrace;"},
{"lineNum":"  137","line":"    const result = opToString(ty);","class":"lineCov","hits":"1","order":"6875","possible_hits":"1",},
{"lineNum":"  138","line":"    try expectError(error.InvalidOp, result);","class":"lineCov","hits":"1","order":"6877","possible_hits":"1",},
{"lineNum":"  139","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-30 17:27:46", "instrumented" : 106, "covered" : 106,};
var merged_data = [];
