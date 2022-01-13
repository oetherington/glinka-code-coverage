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
{"lineNum":"   23","line":"pub fn opToString(op: TokenType) error{InvalidOp}![]const u8 {","class":"lineCov","hits":"1","order":"5540","possible_hits":"1",},
{"lineNum":"   24","line":"    return switch (op) {","class":"lineCov","hits":"48","order":"5541","possible_hits":"48",},
{"lineNum":"   25","line":"        .OptionChain => \".?\",","class":"lineCov","hits":"1","order":"6111","possible_hits":"1",},
{"lineNum":"   26","line":"        .Ellipsis => \"...\",","class":"lineCov","hits":"1","order":"6114","possible_hits":"1",},
{"lineNum":"   27","line":"        .Add => \"+\",","class":"lineCov","hits":"1","order":"5576","possible_hits":"1",},
{"lineNum":"   28","line":"        .AddAssign => \"+=\",","class":"lineCov","hits":"1","order":"6117","possible_hits":"1",},
{"lineNum":"   29","line":"        .Inc => \"++\",","class":"lineCov","hits":"1","order":"5542","possible_hits":"1",},
{"lineNum":"   30","line":"        .Sub => \"-\",","class":"lineCov","hits":"1","order":"6120","possible_hits":"1",},
{"lineNum":"   31","line":"        .SubAssign => \"-=\",","class":"lineCov","hits":"1","order":"6122","possible_hits":"1",},
{"lineNum":"   32","line":"        .Dec => \"--\",","class":"lineCov","hits":"1","order":"5560","possible_hits":"1",},
{"lineNum":"   33","line":"        .Mul => \"*\",","class":"lineCov","hits":"1","order":"6125","possible_hits":"1",},
{"lineNum":"   34","line":"        .MulAssign => \"*=\",","class":"lineCov","hits":"1","order":"6127","possible_hits":"1",},
{"lineNum":"   35","line":"        .Pow => \"**\",","class":"lineCov","hits":"1","order":"6129","possible_hits":"1",},
{"lineNum":"   36","line":"        .PowAssign => \"**=\",","class":"lineCov","hits":"1","order":"6131","possible_hits":"1",},
{"lineNum":"   37","line":"        .Div => \"/\",","class":"lineCov","hits":"1","order":"6133","possible_hits":"1",},
{"lineNum":"   38","line":"        .DivAssign => \"/=\",","class":"lineCov","hits":"1","order":"6135","possible_hits":"1",},
{"lineNum":"   39","line":"        .Mod => \"%\",","class":"lineCov","hits":"1","order":"6137","possible_hits":"1",},
{"lineNum":"   40","line":"        .ModAssign => \"%=\",","class":"lineCov","hits":"1","order":"6139","possible_hits":"1",},
{"lineNum":"   41","line":"        .Assign => \"=\",","class":"lineCov","hits":"1","order":"6141","possible_hits":"1",},
{"lineNum":"   42","line":"        .CmpEq => \"==\",","class":"lineCov","hits":"1","order":"6143","possible_hits":"1",},
{"lineNum":"   43","line":"        .CmpStrictEq => \"===\",","class":"lineCov","hits":"1","order":"6145","possible_hits":"1",},
{"lineNum":"   44","line":"        .LogicalNot => \"!\",","class":"lineCov","hits":"1","order":"6147","possible_hits":"1",},
{"lineNum":"   45","line":"        .CmpNotEq => \"!=\",","class":"lineCov","hits":"1","order":"6149","possible_hits":"1",},
{"lineNum":"   46","line":"        .CmpStrictNotEq => \"!==\",","class":"lineCov","hits":"1","order":"6151","possible_hits":"1",},
{"lineNum":"   47","line":"        .CmpGreater => \">\",","class":"lineCov","hits":"1","order":"6153","possible_hits":"1",},
{"lineNum":"   48","line":"        .CmpGreaterEq => \">=\",","class":"lineCov","hits":"1","order":"6155","possible_hits":"1",},
{"lineNum":"   49","line":"        .CmpLess => \"<\",","class":"lineCov","hits":"1","order":"6157","possible_hits":"1",},
{"lineNum":"   50","line":"        .CmpLessEq => \"<=\",","class":"lineCov","hits":"1","order":"6159","possible_hits":"1",},
{"lineNum":"   51","line":"        .Nullish => \"??\",","class":"lineCov","hits":"1","order":"6161","possible_hits":"1",},
{"lineNum":"   52","line":"        .NullishAssign => \"??=\",","class":"lineCov","hits":"1","order":"6163","possible_hits":"1",},
{"lineNum":"   53","line":"        .BitAnd => \"&\",","class":"lineCov","hits":"1","order":"6165","possible_hits":"1",},
{"lineNum":"   54","line":"        .BitAndAssign => \"&=\",","class":"lineCov","hits":"1","order":"6167","possible_hits":"1",},
{"lineNum":"   55","line":"        .LogicalAnd => \"&&\",","class":"lineCov","hits":"1","order":"6169","possible_hits":"1",},
{"lineNum":"   56","line":"        .LogicalAndAssign => \"&&=\",","class":"lineCov","hits":"1","order":"6171","possible_hits":"1",},
{"lineNum":"   57","line":"        .BitOr => \"|\",","class":"lineCov","hits":"1","order":"6173","possible_hits":"1",},
{"lineNum":"   58","line":"        .BitOrAssign => \"|=\",","class":"lineCov","hits":"1","order":"6175","possible_hits":"1",},
{"lineNum":"   59","line":"        .LogicalOr => \"||\",","class":"lineCov","hits":"1","order":"6177","possible_hits":"1",},
{"lineNum":"   60","line":"        .LogicalOrAssign => \"||=\",","class":"lineCov","hits":"1","order":"6179","possible_hits":"1",},
{"lineNum":"   61","line":"        .BitNot => \"~\",","class":"lineCov","hits":"1","order":"6181","possible_hits":"1",},
{"lineNum":"   62","line":"        .BitNotAssign => \"~=\",","class":"lineCov","hits":"1","order":"6183","possible_hits":"1",},
{"lineNum":"   63","line":"        .BitXor => \"^\",","class":"lineCov","hits":"1","order":"6185","possible_hits":"1",},
{"lineNum":"   64","line":"        .BitXorAssign => \"^=\",","class":"lineCov","hits":"1","order":"6187","possible_hits":"1",},
{"lineNum":"   65","line":"        .ShiftRight => \">>\",","class":"lineCov","hits":"1","order":"6189","possible_hits":"1",},
{"lineNum":"   66","line":"        .ShiftRightAssign => \">>=\",","class":"lineCov","hits":"1","order":"6191","possible_hits":"1",},
{"lineNum":"   67","line":"        .ShiftRightUnsigned => \">>>\",","class":"lineCov","hits":"1","order":"6193","possible_hits":"1",},
{"lineNum":"   68","line":"        .ShiftRightUnsignedAssign => \">>>=\",","class":"lineCov","hits":"1","order":"6195","possible_hits":"1",},
{"lineNum":"   69","line":"        .ShiftLeft => \"<<\",","class":"lineCov","hits":"1","order":"6197","possible_hits":"1",},
{"lineNum":"   70","line":"        .ShiftLeftAssign => \"<<=\",","class":"lineCov","hits":"1","order":"6199","possible_hits":"1",},
{"lineNum":"   71","line":"        else => error.InvalidOp,","class":"lineCov","hits":"1","order":"6202","possible_hits":"1",},
{"lineNum":"   72","line":"    };"},
{"lineNum":"   73","line":"}"},
{"lineNum":"   74","line":""},
{"lineNum":"   75","line":"test \"JSBackend can convert operators to strings\" {","class":"lineCov","hits":"2","order":"6107","possible_hits":"2",},
{"lineNum":"   76","line":"    const TestCase = struct {"},
{"lineNum":"   77","line":"        pub fn run(ty: TokenType, expected: []const u8) !void {","class":"lineCov","hits":"2","order":"6109","possible_hits":"2",},
{"lineNum":"   78","line":"            const str = try opToString(ty);","class":"lineCov","hits":"1","order":"6110","possible_hits":"1",},
{"lineNum":"   79","line":"            try expectEqualStrings(expected, str);","class":"lineCov","hits":"1","order":"6112","possible_hits":"1",},
{"lineNum":"   80","line":"        }"},
{"lineNum":"   81","line":"    };"},
{"lineNum":"   82","line":""},
{"lineNum":"   83","line":"    try TestCase.run(.OptionChain, \".?\");","class":"lineCov","hits":"1","order":"6108","possible_hits":"1",},
{"lineNum":"   84","line":"    try TestCase.run(.Ellipsis, \"...\");","class":"lineCov","hits":"1","order":"6113","possible_hits":"1",},
{"lineNum":"   85","line":"    try TestCase.run(.Add, \"+\");","class":"lineCov","hits":"1","order":"6115","possible_hits":"1",},
{"lineNum":"   86","line":"    try TestCase.run(.AddAssign, \"+=\");","class":"lineCov","hits":"1","order":"6116","possible_hits":"1",},
{"lineNum":"   87","line":"    try TestCase.run(.Inc, \"++\");","class":"lineCov","hits":"1","order":"6118","possible_hits":"1",},
{"lineNum":"   88","line":"    try TestCase.run(.Sub, \"-\");","class":"lineCov","hits":"1","order":"6119","possible_hits":"1",},
{"lineNum":"   89","line":"    try TestCase.run(.SubAssign, \"-=\");","class":"lineCov","hits":"1","order":"6121","possible_hits":"1",},
{"lineNum":"   90","line":"    try TestCase.run(.Dec, \"--\");","class":"lineCov","hits":"1","order":"6123","possible_hits":"1",},
{"lineNum":"   91","line":"    try TestCase.run(.Mul, \"*\");","class":"lineCov","hits":"1","order":"6124","possible_hits":"1",},
{"lineNum":"   92","line":"    try TestCase.run(.MulAssign, \"*=\");","class":"lineCov","hits":"1","order":"6126","possible_hits":"1",},
{"lineNum":"   93","line":"    try TestCase.run(.Pow, \"**\");","class":"lineCov","hits":"1","order":"6128","possible_hits":"1",},
{"lineNum":"   94","line":"    try TestCase.run(.PowAssign, \"**=\");","class":"lineCov","hits":"1","order":"6130","possible_hits":"1",},
{"lineNum":"   95","line":"    try TestCase.run(.Div, \"/\");","class":"lineCov","hits":"1","order":"6132","possible_hits":"1",},
{"lineNum":"   96","line":"    try TestCase.run(.DivAssign, \"/=\");","class":"lineCov","hits":"1","order":"6134","possible_hits":"1",},
{"lineNum":"   97","line":"    try TestCase.run(.Mod, \"%\");","class":"lineCov","hits":"1","order":"6136","possible_hits":"1",},
{"lineNum":"   98","line":"    try TestCase.run(.ModAssign, \"%=\");","class":"lineCov","hits":"1","order":"6138","possible_hits":"1",},
{"lineNum":"   99","line":"    try TestCase.run(.Assign, \"=\");","class":"lineCov","hits":"1","order":"6140","possible_hits":"1",},
{"lineNum":"  100","line":"    try TestCase.run(.CmpEq, \"==\");","class":"lineCov","hits":"1","order":"6142","possible_hits":"1",},
{"lineNum":"  101","line":"    try TestCase.run(.CmpStrictEq, \"===\");","class":"lineCov","hits":"1","order":"6144","possible_hits":"1",},
{"lineNum":"  102","line":"    try TestCase.run(.LogicalNot, \"!\");","class":"lineCov","hits":"1","order":"6146","possible_hits":"1",},
{"lineNum":"  103","line":"    try TestCase.run(.CmpNotEq, \"!=\");","class":"lineCov","hits":"1","order":"6148","possible_hits":"1",},
{"lineNum":"  104","line":"    try TestCase.run(.CmpStrictNotEq, \"!==\");","class":"lineCov","hits":"1","order":"6150","possible_hits":"1",},
{"lineNum":"  105","line":"    try TestCase.run(.CmpGreater, \">\");","class":"lineCov","hits":"1","order":"6152","possible_hits":"1",},
{"lineNum":"  106","line":"    try TestCase.run(.CmpGreaterEq, \">=\");","class":"lineCov","hits":"1","order":"6154","possible_hits":"1",},
{"lineNum":"  107","line":"    try TestCase.run(.CmpLess, \"<\");","class":"lineCov","hits":"1","order":"6156","possible_hits":"1",},
{"lineNum":"  108","line":"    try TestCase.run(.CmpLessEq, \"<=\");","class":"lineCov","hits":"1","order":"6158","possible_hits":"1",},
{"lineNum":"  109","line":"    try TestCase.run(.Nullish, \"??\");","class":"lineCov","hits":"1","order":"6160","possible_hits":"1",},
{"lineNum":"  110","line":"    try TestCase.run(.NullishAssign, \"??=\");","class":"lineCov","hits":"1","order":"6162","possible_hits":"1",},
{"lineNum":"  111","line":"    try TestCase.run(.BitAnd, \"&\");","class":"lineCov","hits":"1","order":"6164","possible_hits":"1",},
{"lineNum":"  112","line":"    try TestCase.run(.BitAndAssign, \"&=\");","class":"lineCov","hits":"1","order":"6166","possible_hits":"1",},
{"lineNum":"  113","line":"    try TestCase.run(.LogicalAnd, \"&&\");","class":"lineCov","hits":"1","order":"6168","possible_hits":"1",},
{"lineNum":"  114","line":"    try TestCase.run(.LogicalAndAssign, \"&&=\");","class":"lineCov","hits":"1","order":"6170","possible_hits":"1",},
{"lineNum":"  115","line":"    try TestCase.run(.BitOr, \"|\");","class":"lineCov","hits":"1","order":"6172","possible_hits":"1",},
{"lineNum":"  116","line":"    try TestCase.run(.BitOrAssign, \"|=\");","class":"lineCov","hits":"1","order":"6174","possible_hits":"1",},
{"lineNum":"  117","line":"    try TestCase.run(.LogicalOr, \"||\");","class":"lineCov","hits":"1","order":"6176","possible_hits":"1",},
{"lineNum":"  118","line":"    try TestCase.run(.LogicalOrAssign, \"||=\");","class":"lineCov","hits":"1","order":"6178","possible_hits":"1",},
{"lineNum":"  119","line":"    try TestCase.run(.BitNot, \"~\");","class":"lineCov","hits":"1","order":"6180","possible_hits":"1",},
{"lineNum":"  120","line":"    try TestCase.run(.BitNotAssign, \"~=\");","class":"lineCov","hits":"1","order":"6182","possible_hits":"1",},
{"lineNum":"  121","line":"    try TestCase.run(.BitXor, \"^\");","class":"lineCov","hits":"1","order":"6184","possible_hits":"1",},
{"lineNum":"  122","line":"    try TestCase.run(.BitXorAssign, \"^=\");","class":"lineCov","hits":"1","order":"6186","possible_hits":"1",},
{"lineNum":"  123","line":"    try TestCase.run(.ShiftRight, \">>\");","class":"lineCov","hits":"1","order":"6188","possible_hits":"1",},
{"lineNum":"  124","line":"    try TestCase.run(.ShiftRightAssign, \">>=\");","class":"lineCov","hits":"1","order":"6190","possible_hits":"1",},
{"lineNum":"  125","line":"    try TestCase.run(.ShiftRightUnsigned, \">>>\");","class":"lineCov","hits":"1","order":"6192","possible_hits":"1",},
{"lineNum":"  126","line":"    try TestCase.run(.ShiftRightUnsignedAssign, \">>>=\");","class":"lineCov","hits":"1","order":"6194","possible_hits":"1",},
{"lineNum":"  127","line":"    try TestCase.run(.ShiftLeft, \"<<\");","class":"lineCov","hits":"1","order":"6196","possible_hits":"1",},
{"lineNum":"  128","line":"    try TestCase.run(.ShiftLeftAssign, \"<<=\");","class":"lineCov","hits":"1","order":"6198","possible_hits":"1",},
{"lineNum":"  129","line":"}"},
{"lineNum":"  130","line":""},
{"lineNum":"  131","line":"test \"JSBackend throws an error for invalid operators\" {","class":"lineCov","hits":"2","order":"6200","possible_hits":"2",},
{"lineNum":"  132","line":"    const ty = TokenType.LBrace;"},
{"lineNum":"  133","line":"    const result = opToString(ty);","class":"lineCov","hits":"1","order":"6201","possible_hits":"1",},
{"lineNum":"  134","line":"    try expectError(error.InvalidOp, result);","class":"lineCov","hits":"1","order":"6203","possible_hits":"1",},
{"lineNum":"  135","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-13 18:06:34", "instrumented" : 102, "covered" : 102,};
var merged_data = [];
