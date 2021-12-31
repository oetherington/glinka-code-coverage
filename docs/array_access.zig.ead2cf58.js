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
{"lineNum":"   29","line":"pub const ArrayAccess = struct {"},
{"lineNum":"   30","line":"    expr: Node,"},
{"lineNum":"   31","line":"    index: Node,"},
{"lineNum":"   32","line":""},
{"lineNum":"   33","line":"    pub fn new(expr: Node, index: Node) ArrayAccess {","class":"lineCov","hits":"1","order":"1390","possible_hits":"1",},
{"lineNum":"   34","line":"        return ArrayAccess{","class":"lineCov","hits":"1","order":"1393","possible_hits":"1",},
{"lineNum":"   35","line":"            .expr = expr,","class":"lineCov","hits":"1","order":"1391","possible_hits":"1",},
{"lineNum":"   36","line":"            .index = index,","class":"lineCov","hits":"1","order":"1392","possible_hits":"1",},
{"lineNum":"   37","line":"        };"},
{"lineNum":"   38","line":"    }"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"    pub fn dump(","class":"linePartCov","hits":"1","order":"1397","possible_hits":"2",},
{"lineNum":"   41","line":"        self: ArrayAccess,"},
{"lineNum":"   42","line":"        writer: anytype,"},
{"lineNum":"   43","line":"        indent: usize,"},
{"lineNum":"   44","line":"    ) !void {","class":"linePartCov","hits":"1","order":"1401","possible_hits":"2",},
{"lineNum":"   45","line":"        try putInd(writer, indent, \"Array Access:\\n\", .{});","class":"linePartCov","hits":"1","order":"1398","possible_hits":"2",},
{"lineNum":"   46","line":"        try self.expr.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"1399","possible_hits":"4",},
{"lineNum":"   47","line":"        try self.index.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"1400","possible_hits":"4",},
{"lineNum":"   48","line":"    }"},
{"lineNum":"   49","line":"};"},
{"lineNum":"   50","line":""},
{"lineNum":"   51","line":"test \"can dump an ArrayAccess\" {","class":"lineCov","hits":"3","order":"1386","possible_hits":"3",},
{"lineNum":"   52","line":"    const nodes = [_]Node{"},
{"lineNum":"   53","line":"        makeNode(std.testing.allocator, Cursor.new(1, 1), .Int, \"1\"),","class":"lineCov","hits":"1","order":"1387","possible_hits":"1",},
{"lineNum":"   54","line":"        makeNode(std.testing.allocator, Cursor.new(2, 1), .Int, \"2\"),","class":"lineCov","hits":"1","order":"1388","possible_hits":"1",},
{"lineNum":"   55","line":"    };"},
{"lineNum":"   56","line":""},
{"lineNum":"   57","line":"    defer for (nodes) |node|","class":"linePartCov","hits":"2","order":"1403","possible_hits":"4",},
{"lineNum":"   58","line":"        std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"1404","possible_hits":"2",},
{"lineNum":"   59","line":""},
{"lineNum":"   60","line":"    try (DumpTestCase(ArrayAccess, .ArrayAccess){","class":"linePartCov","hits":"1","order":"1402","possible_hits":"2",},
{"lineNum":"   61","line":"        .value = ArrayAccess.new(nodes[0], nodes[1]),","class":"lineCov","hits":"1","order":"1389","possible_hits":"1",},
{"lineNum":"   62","line":"        .expected =","class":"lineCov","hits":"1","order":"1394","possible_hits":"1",},
{"lineNum":"   63","line":"        \\\\Array Access:"},
{"lineNum":"   64","line":"        \\\\  Int Node (1:1)"},
{"lineNum":"   65","line":"        \\\\    Int: \"1\""},
{"lineNum":"   66","line":"        \\\\  Int Node (2:1)"},
{"lineNum":"   67","line":"        \\\\    Int: \"2\""},
{"lineNum":"   68","line":"        \\\\"},
{"lineNum":"   69","line":"        ,"},
{"lineNum":"   70","line":"    }).run();","class":"lineCov","hits":"1","order":"1395","possible_hits":"1",},
{"lineNum":"   71","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2021-12-31 18:19:35", "instrumented" : 18, "covered" : 18,};
var merged_data = [];
