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
{"lineNum":"   27","line":"const NodeList = nodeImp.NodeList;"},
{"lineNum":"   28","line":"const makeNode = nodeImp.makeNode;"},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"pub const Call = struct {"},
{"lineNum":"   31","line":"    expr: Node,"},
{"lineNum":"   32","line":"    args: NodeList,"},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"    pub fn new(expr: Node, args: NodeList) Call {","class":"lineCov","hits":"1","order":"1585","possible_hits":"1",},
{"lineNum":"   35","line":"        return Call{","class":"lineCov","hits":"1","order":"1588","possible_hits":"1",},
{"lineNum":"   36","line":"            .expr = expr,","class":"lineCov","hits":"1","order":"1586","possible_hits":"1",},
{"lineNum":"   37","line":"            .args = args,","class":"lineCov","hits":"1","order":"1587","possible_hits":"1",},
{"lineNum":"   38","line":"        };"},
{"lineNum":"   39","line":"    }"},
{"lineNum":"   40","line":""},
{"lineNum":"   41","line":"    pub fn dump(","class":"linePartCov","hits":"1","order":"1592","possible_hits":"2",},
{"lineNum":"   42","line":"        self: Call,"},
{"lineNum":"   43","line":"        writer: anytype,"},
{"lineNum":"   44","line":"        indent: usize,"},
{"lineNum":"   45","line":"    ) !void {","class":"linePartCov","hits":"1","order":"1599","possible_hits":"2",},
{"lineNum":"   46","line":"        try putInd(writer, indent, \"Call:\\n\", .{});","class":"linePartCov","hits":"1","order":"1593","possible_hits":"2",},
{"lineNum":"   47","line":"        try putInd(writer, indent + 2, \"Function:\\n\", .{});","class":"linePartCov","hits":"1","order":"1594","possible_hits":"4",},
{"lineNum":"   48","line":"        try self.expr.dumpIndented(writer, indent + 4);","class":"linePartCov","hits":"1","order":"1595","possible_hits":"4",},
{"lineNum":"   49","line":"        try putInd(writer, indent + 2, \"Args:\\n\", .{});","class":"linePartCov","hits":"1","order":"1596","possible_hits":"4",},
{"lineNum":"   50","line":"        for (self.args.items) |arg|","class":"linePartCov","hits":"2","order":"1597","possible_hits":"4",},
{"lineNum":"   51","line":"            try arg.dumpIndented(writer, indent + 4);","class":"linePartCov","hits":"1","order":"1598","possible_hits":"4",},
{"lineNum":"   52","line":"    }"},
{"lineNum":"   53","line":"};"},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"test \"can dump a Call\" {","class":"lineCov","hits":"3","order":"1581","possible_hits":"3",},
{"lineNum":"   56","line":"    const nodes = [_]Node{"},
{"lineNum":"   57","line":"        makeNode(std.testing.allocator, Cursor.new(1, 1), .Int, \"1\"),","class":"lineCov","hits":"1","order":"1582","possible_hits":"1",},
{"lineNum":"   58","line":"        makeNode(std.testing.allocator, Cursor.new(2, 1), .Int, \"2\"),","class":"lineCov","hits":"1","order":"1583","possible_hits":"1",},
{"lineNum":"   59","line":"    };"},
{"lineNum":"   60","line":""},
{"lineNum":"   61","line":"    defer for (nodes) |node|","class":"linePartCov","hits":"2","order":"1601","possible_hits":"4",},
{"lineNum":"   62","line":"        std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"1602","possible_hits":"2",},
{"lineNum":"   63","line":""},
{"lineNum":"   64","line":"    try (DumpTestCase(Call, .Call){","class":"linePartCov","hits":"1","order":"1600","possible_hits":"2",},
{"lineNum":"   65","line":"        .value = Call.new(nodes[0], NodeList{ .items = &[_]Node{nodes[1]} }),","class":"lineCov","hits":"1","order":"1584","possible_hits":"1",},
{"lineNum":"   66","line":"        .expected =","class":"lineCov","hits":"1","order":"1589","possible_hits":"1",},
{"lineNum":"   67","line":"        \\\\Call:"},
{"lineNum":"   68","line":"        \\\\  Function:"},
{"lineNum":"   69","line":"        \\\\    Int Node (1:1)"},
{"lineNum":"   70","line":"        \\\\      Int: \"1\""},
{"lineNum":"   71","line":"        \\\\  Args:"},
{"lineNum":"   72","line":"        \\\\    Int Node (2:1)"},
{"lineNum":"   73","line":"        \\\\      Int: \"2\""},
{"lineNum":"   74","line":"        \\\\"},
{"lineNum":"   75","line":"        ,"},
{"lineNum":"   76","line":"    }).run();","class":"lineCov","hits":"1","order":"1590","possible_hits":"1",},
{"lineNum":"   77","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-24 08:01:28", "instrumented" : 21, "covered" : 21,};
var merged_data = [];
