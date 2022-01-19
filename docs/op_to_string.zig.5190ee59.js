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
{"lineNum":"   23","line":"pub fn opToString(op: TokenType) error{InvalidOp}![]const u8 {","class":"lineCov","hits":"1","order":"5882","possible_hits":"1",},
{"lineNum":"   24","line":"    return switch (op) {","class":"lineCov","hits":"50","order":"5883","possible_hits":"50",},
{"lineNum":"   25","line":"        .OptionChain => \".?\",","class":"lineCov","hits":"1","order":"6478","possible_hits":"1",},
{"lineNum":"   26","line":"        .Ellipsis => \"...\",","class":"lineCov","hits":"1","order":"6481","possible_hits":"1",},
{"lineNum":"   27","line":"        .Add => \"+\",","class":"lineCov","hits":"1","order":"5918","possible_hits":"1",},
{"lineNum":"   28","line":"        .AddAssign => \"+=\",","class":"lineCov","hits":"1","order":"6484","possible_hits":"1",},
{"lineNum":"   29","line":"        .Inc => \"++\",","class":"lineCov","hits":"1","order":"5884","possible_hits":"1",},
{"lineNum":"   30","line":"        .Sub => \"-\",","class":"lineCov","hits":"1","order":"6487","possible_hits":"1",},
{"lineNum":"   31","line":"        .SubAssign => \"-=\",","class":"lineCov","hits":"1","order":"6489","possible_hits":"1",},
{"lineNum":"   32","line":"        .Dec => \"--\",","class":"lineCov","hits":"1","order":"5902","possible_hits":"1",},
{"lineNum":"   33","line":"        .Mul => \"*\",","class":"lineCov","hits":"1","order":"6492","possible_hits":"1",},
{"lineNum":"   34","line":"        .MulAssign => \"*=\",","class":"lineCov","hits":"1","order":"6494","possible_hits":"1",},
{"lineNum":"   35","line":"        .Pow => \"**\",","class":"lineCov","hits":"1","order":"6496","possible_hits":"1",},
{"lineNum":"   36","line":"        .PowAssign => \"**=\",","class":"lineCov","hits":"1","order":"6498","possible_hits":"1",},
{"lineNum":"   37","line":"        .Div => \"/\",","class":"lineCov","hits":"1","order":"6500","possible_hits":"1",},
{"lineNum":"   38","line":"        .DivAssign => \"/=\",","class":"lineCov","hits":"1","order":"6502","possible_hits":"1",},
{"lineNum":"   39","line":"        .Mod => \"%\",","class":"lineCov","hits":"1","order":"6504","possible_hits":"1",},
{"lineNum":"   40","line":"        .ModAssign => \"%=\",","class":"lineCov","hits":"1","order":"6506","possible_hits":"1",},
{"lineNum":"   41","line":"        .Assign => \"=\",","class":"lineCov","hits":"1","order":"6508","possible_hits":"1",},
{"lineNum":"   42","line":"        .CmpEq => \"==\",","class":"lineCov","hits":"1","order":"6510","possible_hits":"1",},
{"lineNum":"   43","line":"        .CmpStrictEq => \"===\",","class":"lineCov","hits":"1","order":"6512","possible_hits":"1",},
{"lineNum":"   44","line":"        .LogicalNot => \"!\",","class":"lineCov","hits":"1","order":"6514","possible_hits":"1",},
{"lineNum":"   45","line":"        .CmpNotEq => \"!=\",","class":"lineCov","hits":"1","order":"6516","possible_hits":"1",},
{"lineNum":"   46","line":"        .CmpStrictNotEq => \"!==\",","class":"lineCov","hits":"1","order":"6518","possible_hits":"1",},
{"lineNum":"   47","line":"        .CmpGreater => \">\",","class":"lineCov","hits":"1","order":"6520","possible_hits":"1",},
{"lineNum":"   48","line":"        .CmpGreaterEq => \">=\",","class":"lineCov","hits":"1","order":"6522","possible_hits":"1",},
{"lineNum":"   49","line":"        .CmpLess => \"<\",","class":"lineCov","hits":"1","order":"6524","possible_hits":"1",},
{"lineNum":"   50","line":"        .CmpLessEq => \"<=\",","class":"lineCov","hits":"1","order":"6526","possible_hits":"1",},
{"lineNum":"   51","line":"        .Nullish => \"??\",","class":"lineCov","hits":"1","order":"6528","possible_hits":"1",},
{"lineNum":"   52","line":"        .NullishAssign => \"??=\",","class":"lineCov","hits":"1","order":"6530","possible_hits":"1",},
{"lineNum":"   53","line":"        .BitAnd => \"&\",","class":"lineCov","hits":"1","order":"6532","possible_hits":"1",},
{"lineNum":"   54","line":"        .BitAndAssign => \"&=\",","class":"lineCov","hits":"1","order":"6534","possible_hits":"1",},
{"lineNum":"   55","line":"        .LogicalAnd => \"&&\",","class":"lineCov","hits":"1","order":"6536","possible_hits":"1",},
{"lineNum":"   56","line":"        .LogicalAndAssign => \"&&=\",","class":"lineCov","hits":"1","order":"6538","possible_hits":"1",},
{"lineNum":"   57","line":"        .BitOr => \"|\",","class":"lineCov","hits":"1","order":"6540","possible_hits":"1",},
{"lineNum":"   58","line":"        .BitOrAssign => \"|=\",","class":"lineCov","hits":"1","order":"6542","possible_hits":"1",},
{"lineNum":"   59","line":"        .LogicalOr => \"||\",","class":"lineCov","hits":"1","order":"6544","possible_hits":"1",},
{"lineNum":"   60","line":"        .LogicalOrAssign => \"||=\",","class":"lineCov","hits":"1","order":"6546","possible_hits":"1",},
{"lineNum":"   61","line":"        .BitNot => \"~\",","class":"lineCov","hits":"1","order":"6548","possible_hits":"1",},
{"lineNum":"   62","line":"        .BitNotAssign => \"~=\",","class":"lineCov","hits":"1","order":"6550","possible_hits":"1",},
{"lineNum":"   63","line":"        .BitXor => \"^\",","class":"lineCov","hits":"1","order":"6552","possible_hits":"1",},
{"lineNum":"   64","line":"        .BitXorAssign => \"^=\",","class":"lineCov","hits":"1","order":"6554","possible_hits":"1",},
{"lineNum":"   65","line":"        .ShiftRight => \">>\",","class":"lineCov","hits":"1","order":"6556","possible_hits":"1",},
{"lineNum":"   66","line":"        .ShiftRightAssign => \">>=\",","class":"lineCov","hits":"1","order":"6558","possible_hits":"1",},
{"lineNum":"   67","line":"        .ShiftRightUnsigned => \">>>\",","class":"lineCov","hits":"1","order":"6560","possible_hits":"1",},
{"lineNum":"   68","line":"        .ShiftRightUnsignedAssign => \">>>=\",","class":"lineCov","hits":"1","order":"6562","possible_hits":"1",},
{"lineNum":"   69","line":"        .ShiftLeft => \"<<\",","class":"lineCov","hits":"1","order":"6564","possible_hits":"1",},
{"lineNum":"   70","line":"        .ShiftLeftAssign => \"<<=\",","class":"lineCov","hits":"1","order":"6566","possible_hits":"1",},
{"lineNum":"   71","line":"        .Delete => \"delete \",","class":"lineCov","hits":"1","order":"6568","possible_hits":"1",},
{"lineNum":"   72","line":"        .TypeOf => \"typeof \",","class":"lineCov","hits":"1","order":"6570","possible_hits":"1",},
{"lineNum":"   73","line":"        else => error.InvalidOp,","class":"lineCov","hits":"1","order":"6573","possible_hits":"1",},
{"lineNum":"   74","line":"    };"},
{"lineNum":"   75","line":"}"},
{"lineNum":"   76","line":""},
{"lineNum":"   77","line":"test \"JSBackend can convert operators to strings\" {","class":"lineCov","hits":"2","order":"6474","possible_hits":"2",},
{"lineNum":"   78","line":"    const TestCase = struct {"},
{"lineNum":"   79","line":"        pub fn run(ty: TokenType, expected: []const u8) !void {","class":"lineCov","hits":"2","order":"6476","possible_hits":"2",},
{"lineNum":"   80","line":"            const str = try opToString(ty);","class":"lineCov","hits":"1","order":"6477","possible_hits":"1",},
{"lineNum":"   81","line":"            try expectEqualStrings(expected, str);","class":"lineCov","hits":"1","order":"6479","possible_hits":"1",},
{"lineNum":"   82","line":"        }"},
{"lineNum":"   83","line":"    };"},
{"lineNum":"   84","line":""},
{"lineNum":"   85","line":"    try TestCase.run(.OptionChain, \".?\");","class":"lineCov","hits":"1","order":"6475","possible_hits":"1",},
{"lineNum":"   86","line":"    try TestCase.run(.Ellipsis, \"...\");","class":"lineCov","hits":"1","order":"6480","possible_hits":"1",},
{"lineNum":"   87","line":"    try TestCase.run(.Add, \"+\");","class":"lineCov","hits":"1","order":"6482","possible_hits":"1",},
{"lineNum":"   88","line":"    try TestCase.run(.AddAssign, \"+=\");","class":"lineCov","hits":"1","order":"6483","possible_hits":"1",},
{"lineNum":"   89","line":"    try TestCase.run(.Inc, \"++\");","class":"lineCov","hits":"1","order":"6485","possible_hits":"1",},
{"lineNum":"   90","line":"    try TestCase.run(.Sub, \"-\");","class":"lineCov","hits":"1","order":"6486","possible_hits":"1",},
{"lineNum":"   91","line":"    try TestCase.run(.SubAssign, \"-=\");","class":"lineCov","hits":"1","order":"6488","possible_hits":"1",},
{"lineNum":"   92","line":"    try TestCase.run(.Dec, \"--\");","class":"lineCov","hits":"1","order":"6490","possible_hits":"1",},
{"lineNum":"   93","line":"    try TestCase.run(.Mul, \"*\");","class":"lineCov","hits":"1","order":"6491","possible_hits":"1",},
{"lineNum":"   94","line":"    try TestCase.run(.MulAssign, \"*=\");","class":"lineCov","hits":"1","order":"6493","possible_hits":"1",},
{"lineNum":"   95","line":"    try TestCase.run(.Pow, \"**\");","class":"lineCov","hits":"1","order":"6495","possible_hits":"1",},
{"lineNum":"   96","line":"    try TestCase.run(.PowAssign, \"**=\");","class":"lineCov","hits":"1","order":"6497","possible_hits":"1",},
{"lineNum":"   97","line":"    try TestCase.run(.Div, \"/\");","class":"lineCov","hits":"1","order":"6499","possible_hits":"1",},
{"lineNum":"   98","line":"    try TestCase.run(.DivAssign, \"/=\");","class":"lineCov","hits":"1","order":"6501","possible_hits":"1",},
{"lineNum":"   99","line":"    try TestCase.run(.Mod, \"%\");","class":"lineCov","hits":"1","order":"6503","possible_hits":"1",},
{"lineNum":"  100","line":"    try TestCase.run(.ModAssign, \"%=\");","class":"lineCov","hits":"1","order":"6505","possible_hits":"1",},
{"lineNum":"  101","line":"    try TestCase.run(.Assign, \"=\");","class":"lineCov","hits":"1","order":"6507","possible_hits":"1",},
{"lineNum":"  102","line":"    try TestCase.run(.CmpEq, \"==\");","class":"lineCov","hits":"1","order":"6509","possible_hits":"1",},
{"lineNum":"  103","line":"    try TestCase.run(.CmpStrictEq, \"===\");","class":"lineCov","hits":"1","order":"6511","possible_hits":"1",},
{"lineNum":"  104","line":"    try TestCase.run(.LogicalNot, \"!\");","class":"lineCov","hits":"1","order":"6513","possible_hits":"1",},
{"lineNum":"  105","line":"    try TestCase.run(.CmpNotEq, \"!=\");","class":"lineCov","hits":"1","order":"6515","possible_hits":"1",},
{"lineNum":"  106","line":"    try TestCase.run(.CmpStrictNotEq, \"!==\");","class":"lineCov","hits":"1","order":"6517","possible_hits":"1",},
{"lineNum":"  107","line":"    try TestCase.run(.CmpGreater, \">\");","class":"lineCov","hits":"1","order":"6519","possible_hits":"1",},
{"lineNum":"  108","line":"    try TestCase.run(.CmpGreaterEq, \">=\");","class":"lineCov","hits":"1","order":"6521","possible_hits":"1",},
{"lineNum":"  109","line":"    try TestCase.run(.CmpLess, \"<\");","class":"lineCov","hits":"1","order":"6523","possible_hits":"1",},
{"lineNum":"  110","line":"    try TestCase.run(.CmpLessEq, \"<=\");","class":"lineCov","hits":"1","order":"6525","possible_hits":"1",},
{"lineNum":"  111","line":"    try TestCase.run(.Nullish, \"??\");","class":"lineCov","hits":"1","order":"6527","possible_hits":"1",},
{"lineNum":"  112","line":"    try TestCase.run(.NullishAssign, \"??=\");","class":"lineCov","hits":"1","order":"6529","possible_hits":"1",},
{"lineNum":"  113","line":"    try TestCase.run(.BitAnd, \"&\");","class":"lineCov","hits":"1","order":"6531","possible_hits":"1",},
{"lineNum":"  114","line":"    try TestCase.run(.BitAndAssign, \"&=\");","class":"lineCov","hits":"1","order":"6533","possible_hits":"1",},
{"lineNum":"  115","line":"    try TestCase.run(.LogicalAnd, \"&&\");","class":"lineCov","hits":"1","order":"6535","possible_hits":"1",},
{"lineNum":"  116","line":"    try TestCase.run(.LogicalAndAssign, \"&&=\");","class":"lineCov","hits":"1","order":"6537","possible_hits":"1",},
{"lineNum":"  117","line":"    try TestCase.run(.BitOr, \"|\");","class":"lineCov","hits":"1","order":"6539","possible_hits":"1",},
{"lineNum":"  118","line":"    try TestCase.run(.BitOrAssign, \"|=\");","class":"lineCov","hits":"1","order":"6541","possible_hits":"1",},
{"lineNum":"  119","line":"    try TestCase.run(.LogicalOr, \"||\");","class":"lineCov","hits":"1","order":"6543","possible_hits":"1",},
{"lineNum":"  120","line":"    try TestCase.run(.LogicalOrAssign, \"||=\");","class":"lineCov","hits":"1","order":"6545","possible_hits":"1",},
{"lineNum":"  121","line":"    try TestCase.run(.BitNot, \"~\");","class":"lineCov","hits":"1","order":"6547","possible_hits":"1",},
{"lineNum":"  122","line":"    try TestCase.run(.BitNotAssign, \"~=\");","class":"lineCov","hits":"1","order":"6549","possible_hits":"1",},
{"lineNum":"  123","line":"    try TestCase.run(.BitXor, \"^\");","class":"lineCov","hits":"1","order":"6551","possible_hits":"1",},
{"lineNum":"  124","line":"    try TestCase.run(.BitXorAssign, \"^=\");","class":"lineCov","hits":"1","order":"6553","possible_hits":"1",},
{"lineNum":"  125","line":"    try TestCase.run(.ShiftRight, \">>\");","class":"lineCov","hits":"1","order":"6555","possible_hits":"1",},
{"lineNum":"  126","line":"    try TestCase.run(.ShiftRightAssign, \">>=\");","class":"lineCov","hits":"1","order":"6557","possible_hits":"1",},
{"lineNum":"  127","line":"    try TestCase.run(.ShiftRightUnsigned, \">>>\");","class":"lineCov","hits":"1","order":"6559","possible_hits":"1",},
{"lineNum":"  128","line":"    try TestCase.run(.ShiftRightUnsignedAssign, \">>>=\");","class":"lineCov","hits":"1","order":"6561","possible_hits":"1",},
{"lineNum":"  129","line":"    try TestCase.run(.ShiftLeft, \"<<\");","class":"lineCov","hits":"1","order":"6563","possible_hits":"1",},
{"lineNum":"  130","line":"    try TestCase.run(.ShiftLeftAssign, \"<<=\");","class":"lineCov","hits":"1","order":"6565","possible_hits":"1",},
{"lineNum":"  131","line":"    try TestCase.run(.Delete, \"delete \");","class":"lineCov","hits":"1","order":"6567","possible_hits":"1",},
{"lineNum":"  132","line":"    try TestCase.run(.TypeOf, \"typeof \");","class":"lineCov","hits":"1","order":"6569","possible_hits":"1",},
{"lineNum":"  133","line":"}"},
{"lineNum":"  134","line":""},
{"lineNum":"  135","line":"test \"JSBackend throws an error for invalid operators\" {","class":"lineCov","hits":"2","order":"6571","possible_hits":"2",},
{"lineNum":"  136","line":"    const ty = TokenType.LBrace;"},
{"lineNum":"  137","line":"    const result = opToString(ty);","class":"lineCov","hits":"1","order":"6572","possible_hits":"1",},
{"lineNum":"  138","line":"    try expectError(error.InvalidOp, result);","class":"lineCov","hits":"1","order":"6574","possible_hits":"1",},
{"lineNum":"  139","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-19 21:06:17", "instrumented" : 106, "covered" : 106,};
var merged_data = [];
