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
{"lineNum":"   19","line":"const expect = std.testing.expect;"},
{"lineNum":"   20","line":"const expectEqual = std.testing.expectEqual;"},
{"lineNum":"   21","line":"const expectEqualStrings = std.testing.expectEqualStrings;"},
{"lineNum":"   22","line":"const genericEql = @import(\"../generic_eql.zig\");"},
{"lineNum":"   23","line":"const Cursor = @import(\"../cursor.zig\").Cursor;"},
{"lineNum":"   24","line":"const Token = @import(\"../token.zig\").Token;"},
{"lineNum":"   25","line":"const putInd = @import(\"indenter.zig\").putInd;"},
{"lineNum":"   26","line":"const DumpTestCase = @import(\"dump_test_case.zig\").DumpTestCase;"},
{"lineNum":"   27","line":"const nodeImp = @import(\"../node.zig\");"},
{"lineNum":"   28","line":"const Node = nodeImp.Node;"},
{"lineNum":"   29","line":"const makeNode = nodeImp.makeNode;"},
{"lineNum":"   30","line":""},
{"lineNum":"   31","line":"pub const Try = struct {"},
{"lineNum":"   32","line":"    pub const Catch = struct {"},
{"lineNum":"   33","line":"        name: []const u8,"},
{"lineNum":"   34","line":"        block: Node,"},
{"lineNum":"   35","line":""},
{"lineNum":"   36","line":"        pub fn eql(a: Catch, b: Catch) bool {","class":"lineCov","hits":"1","order":"1458","possible_hits":"1",},
{"lineNum":"   37","line":"            return genericEql.eql(a, b);","class":"lineCov","hits":"1","order":"1459","possible_hits":"1",},
{"lineNum":"   38","line":"        }"},
{"lineNum":"   39","line":"    };"},
{"lineNum":"   40","line":""},
{"lineNum":"   41","line":"    pub const CatchList = std.ArrayListUnmanaged(Catch);"},
{"lineNum":"   42","line":""},
{"lineNum":"   43","line":"    tryBlock: Node,"},
{"lineNum":"   44","line":"    catchBlocks: CatchList,"},
{"lineNum":"   45","line":"    finallyBlock: ?Node,"},
{"lineNum":"   46","line":""},
{"lineNum":"   47","line":"    pub fn new(","class":"lineCov","hits":"1","order":"1479","possible_hits":"1",},
{"lineNum":"   48","line":"        tryBlock: Node,"},
{"lineNum":"   49","line":"        catchBlocks: CatchList,"},
{"lineNum":"   50","line":"        finallyBlock: ?Node,"},
{"lineNum":"   51","line":"    ) Try {"},
{"lineNum":"   52","line":"        return Try{","class":"lineCov","hits":"1","order":"1483","possible_hits":"1",},
{"lineNum":"   53","line":"            .tryBlock = tryBlock,","class":"lineCov","hits":"1","order":"1480","possible_hits":"1",},
{"lineNum":"   54","line":"            .catchBlocks = catchBlocks,","class":"lineCov","hits":"1","order":"1481","possible_hits":"1",},
{"lineNum":"   55","line":"            .finallyBlock = finallyBlock,","class":"lineCov","hits":"1","order":"1482","possible_hits":"1",},
{"lineNum":"   56","line":"        };"},
{"lineNum":"   57","line":"    }"},
{"lineNum":"   58","line":""},
{"lineNum":"   59","line":"    pub fn dump(","class":"linePartCov","hits":"1","order":"1487","possible_hits":"2",},
{"lineNum":"   60","line":"        self: Try,"},
{"lineNum":"   61","line":"        writer: anytype,"},
{"lineNum":"   62","line":"        indent: usize,"},
{"lineNum":"   63","line":"    ) !void {","class":"linePartCov","hits":"1","order":"1496","possible_hits":"2",},
{"lineNum":"   64","line":"        try putInd(writer, indent, \"Try:\\n\", .{});","class":"linePartCov","hits":"1","order":"1488","possible_hits":"2",},
{"lineNum":"   65","line":"        try self.tryBlock.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"1489","possible_hits":"4",},
{"lineNum":"   66","line":""},
{"lineNum":"   67","line":"        for (self.catchBlocks.items) |item| {","class":"linePartCov","hits":"2","order":"1490","possible_hits":"4",},
{"lineNum":"   68","line":"            try putInd(writer, indent, \"Catch \\\"{s}\\\":\\n\", .{item.name});","class":"linePartCov","hits":"1","order":"1491","possible_hits":"2",},
{"lineNum":"   69","line":"            try item.block.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"1492","possible_hits":"4",},
{"lineNum":"   70","line":"        }"},
{"lineNum":"   71","line":""},
{"lineNum":"   72","line":"        if (self.finallyBlock) |finally| {","class":"linePartCov","hits":"2","order":"1493","possible_hits":"4",},
{"lineNum":"   73","line":"            try putInd(writer, indent, \"Finally:\\n\", .{});","class":"linePartCov","hits":"1","order":"1494","possible_hits":"2",},
{"lineNum":"   74","line":"            try finally.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"1495","possible_hits":"4",},
{"lineNum":"   75","line":"        }"},
{"lineNum":"   76","line":"    }"},
{"lineNum":"   77","line":"};"},
{"lineNum":"   78","line":""},
{"lineNum":"   79","line":"test \"can compare Try.Catch equality\" {","class":"lineCov","hits":"3","order":"1451","possible_hits":"3",},
{"lineNum":"   80","line":"    const nodes = [_]Node{"},
{"lineNum":"   81","line":"        makeNode(std.testing.allocator, Cursor.new(1, 1), .Int, \"1\"),","class":"lineCov","hits":"1","order":"1452","possible_hits":"1",},
{"lineNum":"   82","line":"        makeNode(std.testing.allocator, Cursor.new(2, 1), .Int, \"2\"),","class":"lineCov","hits":"1","order":"1453","possible_hits":"1",},
{"lineNum":"   83","line":"    };"},
{"lineNum":"   84","line":""},
{"lineNum":"   85","line":"    defer for (nodes) |node|","class":"linePartCov","hits":"2","order":"1468","possible_hits":"20",},
{"lineNum":"   86","line":"        std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"1469","possible_hits":"10",},
{"lineNum":"   87","line":""},
{"lineNum":"   88","line":"    const a = Try.Catch{ .name = \"a\", .block = nodes[0] };","class":"lineCov","hits":"1","order":"1454","possible_hits":"1",},
{"lineNum":"   89","line":"    const b = Try.Catch{ .name = \"a\", .block = nodes[0] };","class":"lineCov","hits":"1","order":"1455","possible_hits":"1",},
{"lineNum":"   90","line":"    const c = Try.Catch{ .name = \"b\", .block = nodes[1] };","class":"lineCov","hits":"1","order":"1456","possible_hits":"1",},
{"lineNum":"   91","line":""},
{"lineNum":"   92","line":"    try expect(a.eql(a));","class":"linePartCov","hits":"1","order":"1457","possible_hits":"2",},
{"lineNum":"   93","line":"    try expect(a.eql(b));","class":"linePartCov","hits":"1","order":"1460","possible_hits":"2",},
{"lineNum":"   94","line":"    try expect(!a.eql(c));","class":"linePartCov","hits":"1","order":"1461","possible_hits":"2",},
{"lineNum":"   95","line":"    try expect(b.eql(a));","class":"linePartCov","hits":"1","order":"1462","possible_hits":"2",},
{"lineNum":"   96","line":"    try expect(b.eql(b));","class":"linePartCov","hits":"1","order":"1463","possible_hits":"2",},
{"lineNum":"   97","line":"    try expect(!b.eql(c));","class":"linePartCov","hits":"1","order":"1464","possible_hits":"2",},
{"lineNum":"   98","line":"    try expect(!c.eql(a));","class":"linePartCov","hits":"1","order":"1465","possible_hits":"2",},
{"lineNum":"   99","line":"    try expect(!c.eql(b));","class":"linePartCov","hits":"1","order":"1466","possible_hits":"2",},
{"lineNum":"  100","line":"    try expect(c.eql(c));","class":"linePartCov","hits":"1","order":"1467","possible_hits":"2",},
{"lineNum":"  101","line":"}"},
{"lineNum":"  102","line":""},
{"lineNum":"  103","line":"test \"can dump a Try\" {","class":"lineCov","hits":"3","order":"1470","possible_hits":"3",},
{"lineNum":"  104","line":"    const nodes = [_]Node{"},
{"lineNum":"  105","line":"        makeNode(std.testing.allocator, Cursor.new(1, 1), .Int, \"1\"),","class":"lineCov","hits":"1","order":"1471","possible_hits":"1",},
{"lineNum":"  106","line":"        makeNode(std.testing.allocator, Cursor.new(2, 1), .Int, \"2\"),","class":"lineCov","hits":"1","order":"1472","possible_hits":"1",},
{"lineNum":"  107","line":"        makeNode(std.testing.allocator, Cursor.new(3, 1), .Int, \"3\"),","class":"lineCov","hits":"1","order":"1473","possible_hits":"1",},
{"lineNum":"  108","line":"    };"},
{"lineNum":"  109","line":""},
{"lineNum":"  110","line":"    defer for (nodes) |node|","class":"linePartCov","hits":"2","order":"1498","possible_hits":"4",},
{"lineNum":"  111","line":"        std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"1499","possible_hits":"2",},
{"lineNum":"  112","line":""},
{"lineNum":"  113","line":"    try (DumpTestCase(Try, .Try){","class":"linePartCov","hits":"1","order":"1497","possible_hits":"2",},
{"lineNum":"  114","line":"        .value = Try.new(nodes[0], Try.CatchList{","class":"lineCov","hits":"3","order":"1474","possible_hits":"3",},
{"lineNum":"  115","line":"            .items = &[_]Try.Catch{Try.Catch{","class":"lineCov","hits":"1","order":"1477","possible_hits":"1",},
{"lineNum":"  116","line":"                .name = \"anException\",","class":"lineCov","hits":"1","order":"1476","possible_hits":"1",},
{"lineNum":"  117","line":"                .block = nodes[1],","class":"lineCov","hits":"1","order":"1475","possible_hits":"1",},
{"lineNum":"  118","line":"            }},"},
{"lineNum":"  119","line":"        }, nodes[2]),","class":"lineCov","hits":"1","order":"1478","possible_hits":"1",},
{"lineNum":"  120","line":"        .expected =","class":"lineCov","hits":"1","order":"1484","possible_hits":"1",},
{"lineNum":"  121","line":"        \\\\Try:"},
{"lineNum":"  122","line":"        \\\\  Int Node (1:1)"},
{"lineNum":"  123","line":"        \\\\    Int: \"1\""},
{"lineNum":"  124","line":"        \\\\Catch \"anException\":"},
{"lineNum":"  125","line":"        \\\\  Int Node (2:1)"},
{"lineNum":"  126","line":"        \\\\    Int: \"2\""},
{"lineNum":"  127","line":"        \\\\Finally:"},
{"lineNum":"  128","line":"        \\\\  Int Node (3:1)"},
{"lineNum":"  129","line":"        \\\\    Int: \"3\""},
{"lineNum":"  130","line":"        \\\\"},
{"lineNum":"  131","line":"        ,"},
{"lineNum":"  132","line":"    }).run();","class":"lineCov","hits":"1","order":"1485","possible_hits":"1",},
{"lineNum":"  133","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-13 17:15:16", "instrumented" : 48, "covered" : 48,};
var merged_data = [];
