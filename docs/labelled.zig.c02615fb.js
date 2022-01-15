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
{"lineNum":"   29","line":"pub const Labelled = struct {"},
{"lineNum":"   30","line":"    label: []const u8,"},
{"lineNum":"   31","line":"    stmt: Node,"},
{"lineNum":"   32","line":""},
{"lineNum":"   33","line":"    pub fn new(label: []const u8, stmt: Node) Labelled {","class":"lineCov","hits":"1","order":"1458","possible_hits":"1",},
{"lineNum":"   34","line":"        return Labelled{","class":"lineCov","hits":"1","order":"1461","possible_hits":"1",},
{"lineNum":"   35","line":"            .label = label,","class":"lineCov","hits":"1","order":"1459","possible_hits":"1",},
{"lineNum":"   36","line":"            .stmt = stmt,","class":"lineCov","hits":"1","order":"1460","possible_hits":"1",},
{"lineNum":"   37","line":"        };"},
{"lineNum":"   38","line":"    }"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"    pub fn dump(","class":"linePartCov","hits":"1","order":"1465","possible_hits":"2",},
{"lineNum":"   41","line":"        self: Labelled,"},
{"lineNum":"   42","line":"        writer: anytype,"},
{"lineNum":"   43","line":"        indent: usize,"},
{"lineNum":"   44","line":"    ) !void {","class":"linePartCov","hits":"1","order":"1468","possible_hits":"2",},
{"lineNum":"   45","line":"        try putInd(writer, indent, \"Labelled \\\"{s}\\\":\\n\", .{self.label});","class":"linePartCov","hits":"1","order":"1466","possible_hits":"2",},
{"lineNum":"   46","line":"        try self.stmt.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"1467","possible_hits":"4",},
{"lineNum":"   47","line":"    }"},
{"lineNum":"   48","line":"};"},
{"lineNum":"   49","line":""},
{"lineNum":"   50","line":"test \"can dump a Labelled\" {","class":"lineCov","hits":"3","order":"1455","possible_hits":"3",},
{"lineNum":"   51","line":"    const node = makeNode(std.testing.allocator, Cursor.new(1, 1), .Int, \"1\");","class":"lineCov","hits":"1","order":"1456","possible_hits":"1",},
{"lineNum":"   52","line":"    defer std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"1470","possible_hits":"2",},
{"lineNum":"   53","line":""},
{"lineNum":"   54","line":"    try (DumpTestCase(Labelled, .Labelled){","class":"linePartCov","hits":"1","order":"1469","possible_hits":"2",},
{"lineNum":"   55","line":"        .value = Labelled.new(\"aLabel\", node),","class":"lineCov","hits":"1","order":"1457","possible_hits":"1",},
{"lineNum":"   56","line":"        .expected =","class":"lineCov","hits":"1","order":"1462","possible_hits":"1",},
{"lineNum":"   57","line":"        \\\\Labelled \"aLabel\":"},
{"lineNum":"   58","line":"        \\\\  Int Node (1:1)"},
{"lineNum":"   59","line":"        \\\\    Int: \"1\""},
{"lineNum":"   60","line":"        \\\\"},
{"lineNum":"   61","line":"        ,"},
{"lineNum":"   62","line":"    }).run();","class":"lineCov","hits":"1","order":"1463","possible_hits":"1",},
{"lineNum":"   63","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-15 21:43:22", "instrumented" : 15, "covered" : 15,};
var merged_data = [];
