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
{"lineNum":"   19","line":"const assert = std.debug.assert;"},
{"lineNum":"   20","line":"const Lexer = @import(\"lexer.zig\").Lexer;"},
{"lineNum":"   21","line":"const Token = @import(\"../common/token.zig\").Token;"},
{"lineNum":"   22","line":"const Cursor = @import(\"../common/cursor.zig\").Cursor;"},
{"lineNum":"   23","line":""},
{"lineNum":"   24","line":"// GRAMMAR:"},
{"lineNum":"   25","line":"//  [0-9][0-9]*         Decimal int literal"},
{"lineNum":"   26","line":"//  0[0-7]*             Octal int literal"},
{"lineNum":"   27","line":"//  0[bB][0-1]*         Binary int literal"},
{"lineNum":"   28","line":"//  0[oO][0-7]*         Octal int literal"},
{"lineNum":"   29","line":"//  0[xX][0-9a-fA-F]*   Hex int literal"},
{"lineNum":"   30","line":"//"},
{"lineNum":"   31","line":"//  Append \'n\' for BigInt literal"},
{"lineNum":"   32","line":"//  Append /\\.[0-9]*/ to a decimal literal for a float literal"},
{"lineNum":"   33","line":"//  Append /[eE][-+]?[0-9]*/ for exponentiation"},
{"lineNum":"   34","line":"//  Underscores can be used as separators, but:"},
{"lineNum":"   35","line":"//   - not more than one consecutive underscore"},
{"lineNum":"   36","line":"//   - not allowed as the last character in a literal"},
{"lineNum":"   37","line":"//   - not allowed after a leading 0"},
{"lineNum":"   38","line":""},
{"lineNum":"   39","line":"fn isBinary(c: u8) bool {","class":"lineCov","hits":"1","order":"5461","possible_hits":"1",},
{"lineNum":"   40","line":"    return c == \'0\' or c == \'1\';","class":"lineCov","hits":"1","order":"5462","possible_hits":"1",},
{"lineNum":"   41","line":"}"},
{"lineNum":"   42","line":""},
{"lineNum":"   43","line":"fn isOctal(c: u8) bool {","class":"lineCov","hits":"1","order":"5464","possible_hits":"1",},
{"lineNum":"   44","line":"    return c >= \'0\' and c <= \'7\';","class":"lineCov","hits":"1","order":"5465","possible_hits":"1",},
{"lineNum":"   45","line":"}"},
{"lineNum":"   46","line":""},
{"lineNum":"   47","line":"fn isDecimal(c: u8) bool {","class":"lineCov","hits":"1","order":"601","possible_hits":"1",},
{"lineNum":"   48","line":"    return c >= \'0\' and c <= \'9\';","class":"lineCov","hits":"1","order":"602","possible_hits":"1",},
{"lineNum":"   49","line":"}"},
{"lineNum":"   50","line":""},
{"lineNum":"   51","line":"fn isHex(c: u8) bool {","class":"lineCov","hits":"1","order":"5467","possible_hits":"1",},
{"lineNum":"   52","line":"    return (c >= \'0\' and c <= \'9\') or (c >= \'a\' and c <= \'f\') or (c >= \'A\' and c <= \'F\');","class":"lineCov","hits":"1","order":"5468","possible_hits":"1",},
{"lineNum":"   53","line":"}"},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"fn lexDigits(","class":"lineCov","hits":"4","order":"607","possible_hits":"4",},
{"lineNum":"   56","line":"    lexer: *Lexer,"},
{"lineNum":"   57","line":"    start: usize,"},
{"lineNum":"   58","line":"    csr: Cursor,"},
{"lineNum":"   59","line":"    comptime validator: fn (c: u8) bool,"},
{"lineNum":"   60","line":") void {","class":"lineCov","hits":"4","order":"616","possible_hits":"4",},
{"lineNum":"   61","line":"    lexer.index += 1;","class":"linePartCov","hits":"4","order":"608","possible_hits":"8",},
{"lineNum":"   62","line":""},
{"lineNum":"   63","line":"    while (lexer.index < lexer.code.len) {","class":"lineCov","hits":"12","order":"609","possible_hits":"12",},
{"lineNum":"   64","line":"        const c = lexer.code[lexer.index];","class":"linePartCov","hits":"4","order":"610","possible_hits":"8",},
{"lineNum":"   65","line":"        if (validator(c) or c == \'_\')","class":"lineCov","hits":"12","order":"611","possible_hits":"12",},
{"lineNum":"   66","line":"            lexer.index += 1","class":"linePartCov","hits":"4","order":"612","possible_hits":"8",},
{"lineNum":"   67","line":"        else"},
{"lineNum":"   68","line":"            break;","class":"lineCov","hits":"4","order":"613","possible_hits":"4",},
{"lineNum":"   69","line":"    }"},
{"lineNum":"   70","line":""},
{"lineNum":"   71","line":"    lexer.token = Token.newData(","class":"lineCov","hits":"8","order":"614","possible_hits":"8",},
{"lineNum":"   72","line":"        Token.Type.Int,"},
{"lineNum":"   73","line":"        csr,"},
{"lineNum":"   74","line":"        lexer.code[start..lexer.index],","class":"linePartCov","hits":"4","order":"615","possible_hits":"8",},
{"lineNum":"   75","line":"    );"},
{"lineNum":"   76","line":"}"},
{"lineNum":"   77","line":""},
{"lineNum":"   78","line":"fn eatDecimals(lexer: *Lexer) void {","class":"lineCov","hits":"2","order":"3699","possible_hits":"2",},
{"lineNum":"   79","line":"    while (lexer.index < lexer.code.len) {","class":"lineCov","hits":"2","order":"3700","possible_hits":"2",},
{"lineNum":"   80","line":"        const c = lexer.code[lexer.index];","class":"linePartCov","hits":"1","order":"3701","possible_hits":"2",},
{"lineNum":"   81","line":"        if (isDecimal(c) or c == \'_\') {","class":"lineCov","hits":"3","order":"3702","possible_hits":"3",},
{"lineNum":"   82","line":"            lexer.token.data.len += 1;","class":"linePartCov","hits":"1","order":"3703","possible_hits":"2",},
{"lineNum":"   83","line":"            lexer.index += 1;","class":"lineCov","hits":"1","order":"3704","possible_hits":"1",},
{"lineNum":"   84","line":"        } else {"},
{"lineNum":"   85","line":"            break;","class":"lineCov","hits":"1","order":"3705","possible_hits":"1",},
{"lineNum":"   86","line":"        }"},
{"lineNum":"   87","line":"    }"},
{"lineNum":"   88","line":"}"},
{"lineNum":"   89","line":""},
{"lineNum":"   90","line":"fn lexExponent(lexer: *Lexer) void {","class":"lineCov","hits":"2","order":"3708","possible_hits":"2",},
{"lineNum":"   91","line":"    assert(lexer.code[lexer.index] == \'e\' or lexer.code[lexer.index] == \'E\');","class":"linePartCov","hits":"1","order":"3709","possible_hits":"2",},
{"lineNum":"   92","line":""},
{"lineNum":"   93","line":"    lexer.index += 1;","class":"linePartCov","hits":"1","order":"3710","possible_hits":"2",},
{"lineNum":"   94","line":"    lexer.token.data.len += 1;","class":"lineCov","hits":"1","order":"3711","possible_hits":"1",},
{"lineNum":"   95","line":""},
{"lineNum":"   96","line":"    if (lexer.code[lexer.index] == \'-\' or lexer.code[lexer.index] == \'+\') {","class":"lineCov","hits":"4","order":"3712","possible_hits":"4",},
{"lineNum":"   97","line":"        lexer.index += 1;","class":"linePartCov","hits":"1","order":"3713","possible_hits":"2",},
{"lineNum":"   98","line":"        lexer.token.data.len += 1;","class":"lineCov","hits":"1","order":"3714","possible_hits":"1",},
{"lineNum":"   99","line":"    }"},
{"lineNum":"  100","line":""},
{"lineNum":"  101","line":"    eatDecimals(lexer);","class":"lineCov","hits":"1","order":"3715","possible_hits":"1",},
{"lineNum":"  102","line":"}"},
{"lineNum":"  103","line":""},
{"lineNum":"  104","line":"pub fn lexNumber(lexer: *Lexer) Token {","class":"lineCov","hits":"1","order":"599","possible_hits":"1",},
{"lineNum":"  105","line":"    assert(isDecimal(lexer.code[lexer.index]));","class":"linePartCov","hits":"1","order":"600","possible_hits":"2",},
{"lineNum":"  106","line":""},
{"lineNum":"  107","line":"    const start = lexer.index;","class":"lineCov","hits":"1","order":"603","possible_hits":"1",},
{"lineNum":"  108","line":"    const csr = lexer.csr;","class":"lineCov","hits":"1","order":"604","possible_hits":"1",},
{"lineNum":"  109","line":""},
{"lineNum":"  110","line":"    if (lexer.code[lexer.index] == \'0\') {","class":"lineCov","hits":"2","order":"605","possible_hits":"2",},
{"lineNum":"  111","line":"        lexer.index += 1;","class":"linePartCov","hits":"1","order":"3108","possible_hits":"2",},
{"lineNum":"  112","line":"        if (lexer.index >= lexer.code.len) {","class":"linePartCov","hits":"2","order":"3109","possible_hits":"3",},
{"lineNum":"  113","line":"            lexer.token = Token.newData(","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  114","line":"                .Int,"},
{"lineNum":"  115","line":"                csr,"},
{"lineNum":"  116","line":"                lexer.code[lexer.index - 1 .. lexer.index],","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  117","line":"            );"},
{"lineNum":"  118","line":"        } else {"},
{"lineNum":"  119","line":"            switch (lexer.code[lexer.index]) {","class":"linePartCov","hits":"6","order":"3110","possible_hits":"7",},
{"lineNum":"  120","line":"                \'b\', \'B\' => lexDigits(lexer, start, csr, isBinary),","class":"lineCov","hits":"1","order":"5460","possible_hits":"1",},
{"lineNum":"  121","line":"                \'o\', \'O\' => lexDigits(lexer, start, csr, isOctal),","class":"lineCov","hits":"1","order":"5463","possible_hits":"1",},
{"lineNum":"  122","line":"                \'x\', \'X\' => lexDigits(lexer, start, csr, isHex),","class":"lineCov","hits":"1","order":"5466","possible_hits":"1",},
{"lineNum":"  123","line":"                \'0\', \'1\', \'2\', \'3\', \'4\', \'5\', \'6\', \'7\', \'8\', \'9\' => {"},
{"lineNum":"  124","line":"                    lexDigits(lexer, start, csr, isDecimal);","class":"lineCov","hits":"1","order":"5459","possible_hits":"1",},
{"lineNum":"  125","line":"                },"},
{"lineNum":"  126","line":"                else => lexer.token = Token.newData(","class":"lineCov","hits":"2","order":"3111","possible_hits":"2",},
{"lineNum":"  127","line":"                    .Int,"},
{"lineNum":"  128","line":"                    csr,"},
{"lineNum":"  129","line":"                    lexer.code[lexer.index - 1 .. lexer.index],","class":"linePartCov","hits":"1","order":"3112","possible_hits":"2",},
{"lineNum":"  130","line":"                ),"},
{"lineNum":"  131","line":"            }"},
{"lineNum":"  132","line":"        }"},
{"lineNum":"  133","line":"    } else {"},
{"lineNum":"  134","line":"        lexDigits(lexer, start, csr, isDecimal);","class":"lineCov","hits":"1","order":"606","possible_hits":"1",},
{"lineNum":"  135","line":"    }"},
{"lineNum":"  136","line":""},
{"lineNum":"  137","line":"    if (lexer.token.ty == .Int and lexer.index < lexer.code.len) {","class":"lineCov","hits":"2","order":"617","possible_hits":"2",},
{"lineNum":"  138","line":"        switch (lexer.code[lexer.index]) {","class":"linePartCov","hits":"4","order":"618","possible_hits":"5",},
{"lineNum":"  139","line":"            \'.\' => {"},
{"lineNum":"  140","line":"                lexer.token.ty = .Float;","class":"lineCov","hits":"1","order":"3695","possible_hits":"1",},
{"lineNum":"  141","line":"                lexer.token.data.len += 1;","class":"linePartCov","hits":"1","order":"3696","possible_hits":"2",},
{"lineNum":"  142","line":"                lexer.index += 1;","class":"lineCov","hits":"1","order":"3697","possible_hits":"1",},
{"lineNum":"  143","line":"                eatDecimals(lexer);","class":"lineCov","hits":"1","order":"3698","possible_hits":"1",},
{"lineNum":"  144","line":"                if (lexer.code[lexer.index] == \'e\' or lexer.code[lexer.index] == \'E\')","class":"lineCov","hits":"3","order":"3706","possible_hits":"3",},
{"lineNum":"  145","line":"                    lexExponent(lexer);","class":"lineCov","hits":"1","order":"3707","possible_hits":"1",},
{"lineNum":"  146","line":"            },"},
{"lineNum":"  147","line":"            \'e\', \'E\' => {"},
{"lineNum":"  148","line":"                lexer.token.ty = .Float;","class":"lineCov","hits":"1","order":"5478","possible_hits":"1",},
{"lineNum":"  149","line":"                lexExponent(lexer);","class":"lineCov","hits":"1","order":"5479","possible_hits":"1",},
{"lineNum":"  150","line":"            },"},
{"lineNum":"  151","line":"            \'n\' => {"},
{"lineNum":"  152","line":"                lexer.token.ty = .BigInt;","class":"lineCov","hits":"1","order":"5472","possible_hits":"1",},
{"lineNum":"  153","line":"                lexer.token.data.len += 1;","class":"linePartCov","hits":"1","order":"5473","possible_hits":"2",},
{"lineNum":"  154","line":"                lexer.index += 1;","class":"lineCov","hits":"1","order":"5474","possible_hits":"1",},
{"lineNum":"  155","line":"            },"},
{"lineNum":"  156","line":"            else => {},"},
{"lineNum":"  157","line":"        }"},
{"lineNum":"  158","line":"    }"},
{"lineNum":"  159","line":""},
{"lineNum":"  160","line":"    lexer.csr.ch += @intCast(u32, lexer.index - start);","class":"linePartCov","hits":"1","order":"619","possible_hits":"2",},
{"lineNum":"  161","line":""},
{"lineNum":"  162","line":"    return lexer.token;","class":"lineCov","hits":"1","order":"620","possible_hits":"1",},
{"lineNum":"  163","line":"}"},
{"lineNum":"  164","line":""},
{"lineNum":"  165","line":"const TestCase = struct {"},
{"lineNum":"  166","line":"    code: []const u8,"},
{"lineNum":"  167","line":"    expectedType: Token.Type,"},
{"lineNum":"  168","line":""},
{"lineNum":"  169","line":"    pub fn run(self: @This()) !void {","class":"lineCov","hits":"2","order":"5450","possible_hits":"2",},
{"lineNum":"  170","line":"        var lexer = Lexer.new(self.code);","class":"lineCov","hits":"1","order":"5451","possible_hits":"1",},
{"lineNum":"  171","line":"        const token = lexer.next();","class":"lineCov","hits":"1","order":"5452","possible_hits":"1",},
{"lineNum":"  172","line":""},
{"lineNum":"  173","line":"        const expected = self.code[1 .. self.code.len - 1];","class":"linePartCov","hits":"1","order":"5453","possible_hits":"2",},
{"lineNum":"  174","line":""},
{"lineNum":"  175","line":"        try std.testing.expectEqual(self.expectedType, token.ty);","class":"linePartCov","hits":"1","order":"5454","possible_hits":"2",},
{"lineNum":"  176","line":"        try std.testing.expectEqualStrings(expected, token.data);","class":"lineCov","hits":"1","order":"5455","possible_hits":"1",},
{"lineNum":"  177","line":"        try std.testing.expectEqual(@intCast(u32, 1), token.csr.ln);","class":"lineCov","hits":"1","order":"5456","possible_hits":"1",},
{"lineNum":"  178","line":"        try std.testing.expectEqual(@intCast(u32, 2), token.csr.ch);","class":"lineCov","hits":"1","order":"5457","possible_hits":"1",},
{"lineNum":"  179","line":"        try std.testing.expectEqual(self.code.len - 1, lexer.index);","class":"linePartCov","hits":"1","order":"5458","possible_hits":"2",},
{"lineNum":"  180","line":"    }"},
{"lineNum":"  181","line":"};"},
{"lineNum":"  182","line":""},
{"lineNum":"  183","line":"test \"lexNumber can lex integers\" {","class":"lineCov","hits":"2","order":"5447","possible_hits":"2",},
{"lineNum":"  184","line":"    const testCases = [_]TestCase{"},
{"lineNum":"  185","line":"        TestCase{ .code = \" 0 \", .expectedType = .Int },"},
{"lineNum":"  186","line":"        TestCase{ .code = \" 123456 \", .expectedType = .Int },"},
{"lineNum":"  187","line":"        TestCase{ .code = \" 123_456 \", .expectedType = .Int },"},
{"lineNum":"  188","line":"        TestCase{ .code = \" 01234 \", .expectedType = .Int },"},
{"lineNum":"  189","line":"        TestCase{ .code = \" 01239 \", .expectedType = .Int },"},
{"lineNum":"  190","line":"        TestCase{ .code = \" 0b10_00101 \", .expectedType = .Int },"},
{"lineNum":"  191","line":"        TestCase{ .code = \" 0B1000101 \", .expectedType = .Int },"},
{"lineNum":"  192","line":"        TestCase{ .code = \" 0o163646 \", .expectedType = .Int },"},
{"lineNum":"  193","line":"        TestCase{ .code = \" 0O2364_26 \", .expectedType = .Int },"},
{"lineNum":"  194","line":"        TestCase{ .code = \" 0x301_afBC \", .expectedType = .Int },"},
{"lineNum":"  195","line":"        TestCase{ .code = \" 0X301abcD \", .expectedType = .Int },"},
{"lineNum":"  196","line":"    };"},
{"lineNum":"  197","line":""},
{"lineNum":"  198","line":"    for (testCases) |testCase|","class":"lineCov","hits":"2","order":"5448","possible_hits":"2",},
{"lineNum":"  199","line":"        try testCase.run();","class":"lineCov","hits":"1","order":"5449","possible_hits":"1",},
{"lineNum":"  200","line":"}"},
{"lineNum":"  201","line":""},
{"lineNum":"  202","line":"test \"lexNumber can lex BigInts\" {","class":"lineCov","hits":"2","order":"5469","possible_hits":"2",},
{"lineNum":"  203","line":"    const testCases = [_]TestCase{"},
{"lineNum":"  204","line":"        TestCase{ .code = \" 0n \", .expectedType = .BigInt },"},
{"lineNum":"  205","line":"        TestCase{ .code = \" 123456n \", .expectedType = .BigInt },"},
{"lineNum":"  206","line":"        TestCase{ .code = \" 123_456n \", .expectedType = .BigInt },"},
{"lineNum":"  207","line":"        TestCase{ .code = \" 01234n \", .expectedType = .BigInt },"},
{"lineNum":"  208","line":"        TestCase{ .code = \" 01239n \", .expectedType = .BigInt },"},
{"lineNum":"  209","line":"        TestCase{ .code = \" 0b10_00101n \", .expectedType = .BigInt },"},
{"lineNum":"  210","line":"        TestCase{ .code = \" 0B1000101n \", .expectedType = .BigInt },"},
{"lineNum":"  211","line":"        TestCase{ .code = \" 0o163646n \", .expectedType = .BigInt },"},
{"lineNum":"  212","line":"        TestCase{ .code = \" 0O2364_26n \", .expectedType = .BigInt },"},
{"lineNum":"  213","line":"        TestCase{ .code = \" 0x301_afBCn \", .expectedType = .BigInt },"},
{"lineNum":"  214","line":"        TestCase{ .code = \" 0X301abcDn \", .expectedType = .BigInt },"},
{"lineNum":"  215","line":"    };"},
{"lineNum":"  216","line":""},
{"lineNum":"  217","line":"    for (testCases) |testCase|","class":"lineCov","hits":"2","order":"5470","possible_hits":"2",},
{"lineNum":"  218","line":"        try testCase.run();","class":"lineCov","hits":"1","order":"5471","possible_hits":"1",},
{"lineNum":"  219","line":"}"},
{"lineNum":"  220","line":""},
{"lineNum":"  221","line":"test \"lexNumber can lex floats\" {","class":"lineCov","hits":"2","order":"5475","possible_hits":"2",},
{"lineNum":"  222","line":"    const testCases = [_]TestCase{"},
{"lineNum":"  223","line":"        TestCase{ .code = \" 1234.5678 \", .expectedType = .Float },"},
{"lineNum":"  224","line":"        TestCase{ .code = \" 1_234.567_8 \", .expectedType = .Float },"},
{"lineNum":"  225","line":"        TestCase{ .code = \" 1_234e10 \", .expectedType = .Float },"},
{"lineNum":"  226","line":"        TestCase{ .code = \" 1_234e+123 \", .expectedType = .Float },"},
{"lineNum":"  227","line":"        TestCase{ .code = \" 1_234e-12_3 \", .expectedType = .Float },"},
{"lineNum":"  228","line":"        TestCase{ .code = \" 1_234.567_8E10 \", .expectedType = .Float },"},
{"lineNum":"  229","line":"    };"},
{"lineNum":"  230","line":""},
{"lineNum":"  231","line":"    for (testCases) |testCase|","class":"lineCov","hits":"2","order":"5476","possible_hits":"2",},
{"lineNum":"  232","line":"        try testCase.run();","class":"lineCov","hits":"1","order":"5477","possible_hits":"1",},
{"lineNum":"  233","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-30 17:27:46", "instrumented" : 83, "covered" : 81,};
var merged_data = [];
