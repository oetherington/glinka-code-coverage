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
{"lineNum":"   29","line":"pub const While = struct {"},
{"lineNum":"   30","line":"    cond: Node,"},
{"lineNum":"   31","line":"    body: Node,"},
{"lineNum":"   32","line":""},
{"lineNum":"   33","line":"    pub fn new(cond: Node, body: Node) While {","class":"lineCov","hits":"1","order":"832","possible_hits":"1",},
{"lineNum":"   34","line":"        return While{","class":"lineCov","hits":"1","order":"835","possible_hits":"1",},
{"lineNum":"   35","line":"            .cond = cond,","class":"lineCov","hits":"1","order":"833","possible_hits":"1",},
{"lineNum":"   36","line":"            .body = body,","class":"lineCov","hits":"1","order":"834","possible_hits":"1",},
{"lineNum":"   37","line":"        };"},
{"lineNum":"   38","line":"    }"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"    pub fn dump(","class":"linePartCov","hits":"1","order":"839","possible_hits":"2",},
{"lineNum":"   41","line":"        self: While,"},
{"lineNum":"   42","line":"        writer: anytype,"},
{"lineNum":"   43","line":"        indent: usize,"},
{"lineNum":"   44","line":"    ) !void {","class":"linePartCov","hits":"1","order":"845","possible_hits":"2",},
{"lineNum":"   45","line":"        try putInd(writer, indent, \"While:\\n\", .{});","class":"linePartCov","hits":"1","order":"840","possible_hits":"2",},
{"lineNum":"   46","line":"        try putInd(writer, indent + 2, \"Condition:\\n\", .{});","class":"linePartCov","hits":"1","order":"841","possible_hits":"4",},
{"lineNum":"   47","line":"        try self.cond.dumpIndented(writer, indent + 4);","class":"linePartCov","hits":"1","order":"842","possible_hits":"4",},
{"lineNum":"   48","line":"        try putInd(writer, indent + 2, \"Body:\\n\", .{});","class":"linePartCov","hits":"1","order":"843","possible_hits":"4",},
{"lineNum":"   49","line":"        try self.body.dumpIndented(writer, indent + 4);","class":"linePartCov","hits":"1","order":"844","possible_hits":"4",},
{"lineNum":"   50","line":"    }"},
{"lineNum":"   51","line":"};"},
{"lineNum":"   52","line":""},
{"lineNum":"   53","line":"test \"can dump a While\" {","class":"lineCov","hits":"3","order":"828","possible_hits":"3",},
{"lineNum":"   54","line":"    const nodes = [_]Node{"},
{"lineNum":"   55","line":"        makeNode(std.testing.allocator, Cursor.new(1, 1), .Int, \"1\"),","class":"lineCov","hits":"1","order":"829","possible_hits":"1",},
{"lineNum":"   56","line":"        makeNode(std.testing.allocator, Cursor.new(2, 1), .Int, \"2\"),","class":"lineCov","hits":"1","order":"830","possible_hits":"1",},
{"lineNum":"   57","line":"    };"},
{"lineNum":"   58","line":""},
{"lineNum":"   59","line":"    defer for (nodes) |node|","class":"linePartCov","hits":"2","order":"847","possible_hits":"4",},
{"lineNum":"   60","line":"        std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"848","possible_hits":"2",},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"    try (DumpTestCase(While, .While){","class":"linePartCov","hits":"1","order":"846","possible_hits":"2",},
{"lineNum":"   63","line":"        .value = While.new(nodes[0], nodes[1]),","class":"lineCov","hits":"1","order":"831","possible_hits":"1",},
{"lineNum":"   64","line":"        .expected =","class":"lineCov","hits":"1","order":"836","possible_hits":"1",},
{"lineNum":"   65","line":"        \\\\While:"},
{"lineNum":"   66","line":"        \\\\  Condition:"},
{"lineNum":"   67","line":"        \\\\    Int Node (1:1)"},
{"lineNum":"   68","line":"        \\\\      Int: \"1\""},
{"lineNum":"   69","line":"        \\\\  Body:"},
{"lineNum":"   70","line":"        \\\\    Int Node (2:1)"},
{"lineNum":"   71","line":"        \\\\      Int: \"2\""},
{"lineNum":"   72","line":"        \\\\"},
{"lineNum":"   73","line":"        ,"},
{"lineNum":"   74","line":"    }).run();","class":"lineCov","hits":"1","order":"837","possible_hits":"1",},
{"lineNum":"   75","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-03 21:04:56", "instrumented" : 20, "covered" : 20,};
var merged_data = [];
