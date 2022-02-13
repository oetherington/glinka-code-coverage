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
{"lineNum":"   20","line":"const expectEqualStrings = std.testing.expectEqualStrings;"},
{"lineNum":"   21","line":"const Cursor = @import(\"../cursor.zig\").Cursor;"},
{"lineNum":"   22","line":"const Token = @import(\"../token.zig\").Token;"},
{"lineNum":"   23","line":"const putInd = @import(\"indenter.zig\").putInd;"},
{"lineNum":"   24","line":"const DumpTestCase = @import(\"dump_test_case.zig\").DumpTestCase;"},
{"lineNum":"   25","line":"const nodeImp = @import(\"../node.zig\");"},
{"lineNum":"   26","line":"const Node = nodeImp.Node;"},
{"lineNum":"   27","line":"const makeNode = nodeImp.makeNode;"},
{"lineNum":"   28","line":""},
{"lineNum":"   29","line":"pub const UnaryOp = struct {"},
{"lineNum":"   30","line":"    op: Token.Type,"},
{"lineNum":"   31","line":"    expr: Node,"},
{"lineNum":"   32","line":""},
{"lineNum":"   33","line":"    pub fn new(op: Token.Type, expr: Node) UnaryOp {","class":"lineCov","hits":"1","order":"398","possible_hits":"1",},
{"lineNum":"   34","line":"        return UnaryOp{","class":"lineCov","hits":"1","order":"401","possible_hits":"1",},
{"lineNum":"   35","line":"            .op = op,","class":"lineCov","hits":"1","order":"399","possible_hits":"1",},
{"lineNum":"   36","line":"            .expr = expr,","class":"lineCov","hits":"1","order":"400","possible_hits":"1",},
{"lineNum":"   37","line":"        };"},
{"lineNum":"   38","line":"    }"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"    pub fn dump(","class":"lineCov","hits":"1","order":"407","possible_hits":"1",},
{"lineNum":"   41","line":"        self: UnaryOp,"},
{"lineNum":"   42","line":"        writer: anytype,"},
{"lineNum":"   43","line":"        indent: usize,"},
{"lineNum":"   44","line":"    ) !void {","class":"lineCov","hits":"1","order":"410","possible_hits":"1",},
{"lineNum":"   45","line":"        try putInd(writer, indent, \"{s} Unary Op\\n\", .{@tagName(self.op)});","class":"lineCov","hits":"1","order":"408","possible_hits":"1",},
{"lineNum":"   46","line":"        try self.expr.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"409","possible_hits":"2",},
{"lineNum":"   47","line":"    }"},
{"lineNum":"   48","line":"};"},
{"lineNum":"   49","line":""},
{"lineNum":"   50","line":"test \"can dump a prefix UnaryOp\" {","class":"lineCov","hits":"3","order":"395","possible_hits":"3",},
{"lineNum":"   51","line":"    const node = makeNode(std.testing.allocator, Cursor.new(1, 5), .Int, \"1\");","class":"lineCov","hits":"1","order":"396","possible_hits":"1",},
{"lineNum":"   52","line":"    defer std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"412","possible_hits":"2",},
{"lineNum":"   53","line":""},
{"lineNum":"   54","line":"    try (DumpTestCase(UnaryOp, .PrefixOp){","class":"linePartCov","hits":"1","order":"411","possible_hits":"2",},
{"lineNum":"   55","line":"        .value = UnaryOp.new(.Sub, node),","class":"lineCov","hits":"1","order":"397","possible_hits":"1",},
{"lineNum":"   56","line":"        .expected =","class":"lineCov","hits":"1","order":"402","possible_hits":"1",},
{"lineNum":"   57","line":"        \\\\PrefixOp"},
{"lineNum":"   58","line":"        \\\\  Sub Unary Op"},
{"lineNum":"   59","line":"        \\\\    Int Node (1:5)"},
{"lineNum":"   60","line":"        \\\\      Int: \"1\""},
{"lineNum":"   61","line":"        \\\\"},
{"lineNum":"   62","line":"        ,"},
{"lineNum":"   63","line":"    }).run();","class":"lineCov","hits":"1","order":"403","possible_hits":"1",},
{"lineNum":"   64","line":"}"},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"test \"can dump a postfix UnaryOp\" {","class":"lineCov","hits":"3","order":"413","possible_hits":"3",},
{"lineNum":"   67","line":"    const node = makeNode(std.testing.allocator, Cursor.new(1, 5), .Int, \"1\");","class":"lineCov","hits":"1","order":"414","possible_hits":"1",},
{"lineNum":"   68","line":"    defer std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"419","possible_hits":"2",},
{"lineNum":"   69","line":""},
{"lineNum":"   70","line":"    try (DumpTestCase(UnaryOp, .PostfixOp){","class":"linePartCov","hits":"1","order":"418","possible_hits":"2",},
{"lineNum":"   71","line":"        .value = UnaryOp.new(.Sub, node),","class":"lineCov","hits":"1","order":"415","possible_hits":"1",},
{"lineNum":"   72","line":"        .expected =","class":"lineCov","hits":"1","order":"416","possible_hits":"1",},
{"lineNum":"   73","line":"        \\\\PostfixOp"},
{"lineNum":"   74","line":"        \\\\  Sub Unary Op"},
{"lineNum":"   75","line":"        \\\\    Int Node (1:5)"},
{"lineNum":"   76","line":"        \\\\      Int: \"1\""},
{"lineNum":"   77","line":"        \\\\"},
{"lineNum":"   78","line":"        ,"},
{"lineNum":"   79","line":"    }).run();","class":"lineCov","hits":"1","order":"417","possible_hits":"1",},
{"lineNum":"   80","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-13 15:43:06", "instrumented" : 22, "covered" : 22,};
var merged_data = [];
