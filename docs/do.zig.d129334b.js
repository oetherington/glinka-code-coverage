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
{"lineNum":"   29","line":"pub const Do = struct {"},
{"lineNum":"   30","line":"    body: Node,"},
{"lineNum":"   31","line":"    cond: Node,"},
{"lineNum":"   32","line":""},
{"lineNum":"   33","line":"    pub fn new(body: Node, cond: Node) Do {","class":"lineCov","hits":"1","order":"853","possible_hits":"1",},
{"lineNum":"   34","line":"        return Do{","class":"lineCov","hits":"1","order":"856","possible_hits":"1",},
{"lineNum":"   35","line":"            .body = body,","class":"lineCov","hits":"1","order":"854","possible_hits":"1",},
{"lineNum":"   36","line":"            .cond = cond,","class":"lineCov","hits":"1","order":"855","possible_hits":"1",},
{"lineNum":"   37","line":"        };"},
{"lineNum":"   38","line":"    }"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"    pub fn dump(","class":"linePartCov","hits":"1","order":"860","possible_hits":"2",},
{"lineNum":"   41","line":"        self: Do,"},
{"lineNum":"   42","line":"        writer: anytype,"},
{"lineNum":"   43","line":"        indent: usize,"},
{"lineNum":"   44","line":"    ) !void {","class":"linePartCov","hits":"1","order":"866","possible_hits":"2",},
{"lineNum":"   45","line":"        try putInd(writer, indent, \"Do:\\n\", .{});","class":"linePartCov","hits":"1","order":"861","possible_hits":"2",},
{"lineNum":"   46","line":"        try putInd(writer, indent + 2, \"Body:\\n\", .{});","class":"linePartCov","hits":"1","order":"862","possible_hits":"4",},
{"lineNum":"   47","line":"        try self.body.dumpIndented(writer, indent + 4);","class":"linePartCov","hits":"1","order":"863","possible_hits":"4",},
{"lineNum":"   48","line":"        try putInd(writer, indent + 2, \"Condition:\\n\", .{});","class":"linePartCov","hits":"1","order":"864","possible_hits":"4",},
{"lineNum":"   49","line":"        try self.cond.dumpIndented(writer, indent + 4);","class":"linePartCov","hits":"1","order":"865","possible_hits":"4",},
{"lineNum":"   50","line":"    }"},
{"lineNum":"   51","line":"};"},
{"lineNum":"   52","line":""},
{"lineNum":"   53","line":"test \"can dump a Do\" {","class":"lineCov","hits":"3","order":"849","possible_hits":"3",},
{"lineNum":"   54","line":"    const nodes = [_]Node{"},
{"lineNum":"   55","line":"        makeNode(std.testing.allocator, Cursor.new(1, 1), .Int, \"1\"),","class":"lineCov","hits":"1","order":"850","possible_hits":"1",},
{"lineNum":"   56","line":"        makeNode(std.testing.allocator, Cursor.new(2, 1), .Int, \"2\"),","class":"lineCov","hits":"1","order":"851","possible_hits":"1",},
{"lineNum":"   57","line":"    };"},
{"lineNum":"   58","line":""},
{"lineNum":"   59","line":"    defer for (nodes) |node|","class":"linePartCov","hits":"2","order":"868","possible_hits":"4",},
{"lineNum":"   60","line":"        std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"869","possible_hits":"2",},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"    try (DumpTestCase(Do, .Do){","class":"linePartCov","hits":"1","order":"867","possible_hits":"2",},
{"lineNum":"   63","line":"        .value = Do.new(nodes[0], nodes[1]),","class":"lineCov","hits":"1","order":"852","possible_hits":"1",},
{"lineNum":"   64","line":"        .expected =","class":"lineCov","hits":"1","order":"857","possible_hits":"1",},
{"lineNum":"   65","line":"        \\\\Do:"},
{"lineNum":"   66","line":"        \\\\  Body:"},
{"lineNum":"   67","line":"        \\\\    Int Node (1:1)"},
{"lineNum":"   68","line":"        \\\\      Int: \"1\""},
{"lineNum":"   69","line":"        \\\\  Condition:"},
{"lineNum":"   70","line":"        \\\\    Int Node (2:1)"},
{"lineNum":"   71","line":"        \\\\      Int: \"2\""},
{"lineNum":"   72","line":"        \\\\"},
{"lineNum":"   73","line":"        ,"},
{"lineNum":"   74","line":"    }).run();","class":"lineCov","hits":"1","order":"858","possible_hits":"1",},
{"lineNum":"   75","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-03 18:52:14", "instrumented" : 20, "covered" : 20,};
var merged_data = [];
