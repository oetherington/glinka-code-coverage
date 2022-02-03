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
{"lineNum":"   29","line":"pub const BinaryOp = struct {"},
{"lineNum":"   30","line":"    op: Token.Type,"},
{"lineNum":"   31","line":"    left: Node,"},
{"lineNum":"   32","line":"    right: Node,"},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"    pub fn new(op: Token.Type, left: Node, right: Node) BinaryOp {","class":"lineCov","hits":"1","order":"438","possible_hits":"1",},
{"lineNum":"   35","line":"        return BinaryOp{","class":"lineCov","hits":"1","order":"442","possible_hits":"1",},
{"lineNum":"   36","line":"            .op = op,","class":"lineCov","hits":"1","order":"439","possible_hits":"1",},
{"lineNum":"   37","line":"            .left = left,","class":"lineCov","hits":"1","order":"440","possible_hits":"1",},
{"lineNum":"   38","line":"            .right = right,","class":"lineCov","hits":"1","order":"441","possible_hits":"1",},
{"lineNum":"   39","line":"        };"},
{"lineNum":"   40","line":"    }"},
{"lineNum":"   41","line":""},
{"lineNum":"   42","line":"    pub fn dump(","class":"linePartCov","hits":"1","order":"446","possible_hits":"2",},
{"lineNum":"   43","line":"        self: BinaryOp,"},
{"lineNum":"   44","line":"        writer: anytype,"},
{"lineNum":"   45","line":"        indent: usize,"},
{"lineNum":"   46","line":"    ) !void {","class":"linePartCov","hits":"1","order":"450","possible_hits":"2",},
{"lineNum":"   47","line":"        try putInd(writer, indent, \"{s} Binary Op\\n\", .{@tagName(self.op)});","class":"linePartCov","hits":"1","order":"447","possible_hits":"2",},
{"lineNum":"   48","line":"        try self.left.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"448","possible_hits":"4",},
{"lineNum":"   49","line":"        try self.right.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"449","possible_hits":"4",},
{"lineNum":"   50","line":"    }"},
{"lineNum":"   51","line":"};"},
{"lineNum":"   52","line":""},
{"lineNum":"   53","line":"test \"can dump a BinaryOp\" {","class":"lineCov","hits":"3","order":"434","possible_hits":"3",},
{"lineNum":"   54","line":"    const nodes = [_]Node{"},
{"lineNum":"   55","line":"        makeNode(std.testing.allocator, Cursor.new(1, 1), .Int, \"1\"),","class":"lineCov","hits":"1","order":"435","possible_hits":"1",},
{"lineNum":"   56","line":"        makeNode(std.testing.allocator, Cursor.new(2, 1), .Int, \"2\"),","class":"lineCov","hits":"1","order":"436","possible_hits":"1",},
{"lineNum":"   57","line":"    };"},
{"lineNum":"   58","line":""},
{"lineNum":"   59","line":"    defer for (nodes) |node|","class":"linePartCov","hits":"2","order":"452","possible_hits":"4",},
{"lineNum":"   60","line":"        std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"453","possible_hits":"2",},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"    try (DumpTestCase(BinaryOp, .BinaryOp){","class":"linePartCov","hits":"1","order":"451","possible_hits":"2",},
{"lineNum":"   63","line":"        .value = BinaryOp.new(.Add, nodes[0], nodes[1]),","class":"lineCov","hits":"1","order":"437","possible_hits":"1",},
{"lineNum":"   64","line":"        .expected =","class":"lineCov","hits":"1","order":"443","possible_hits":"1",},
{"lineNum":"   65","line":"        \\\\Add Binary Op"},
{"lineNum":"   66","line":"        \\\\  Int Node (1:1)"},
{"lineNum":"   67","line":"        \\\\    Int: \"1\""},
{"lineNum":"   68","line":"        \\\\  Int Node (2:1)"},
{"lineNum":"   69","line":"        \\\\    Int: \"2\""},
{"lineNum":"   70","line":"        \\\\"},
{"lineNum":"   71","line":"        ,"},
{"lineNum":"   72","line":"    }).run();","class":"lineCov","hits":"1","order":"444","possible_hits":"1",},
{"lineNum":"   73","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-03 18:52:14", "instrumented" : 19, "covered" : 19,};
var merged_data = [];
