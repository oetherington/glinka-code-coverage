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
{"lineNum":"   29","line":"const NodeList = nodeImp.NodeList;"},
{"lineNum":"   30","line":"const makeNode = nodeImp.makeNode;"},
{"lineNum":"   31","line":""},
{"lineNum":"   32","line":"pub const Switch = struct {"},
{"lineNum":"   33","line":"    pub const Case = struct {"},
{"lineNum":"   34","line":"        value: Node,"},
{"lineNum":"   35","line":"        stmts: NodeList,"},
{"lineNum":"   36","line":""},
{"lineNum":"   37","line":"        pub fn eql(a: Case, b: Case) bool {","class":"lineCov","hits":"1","order":"719","possible_hits":"1",},
{"lineNum":"   38","line":"            return genericEql.eql(a, b);","class":"lineCov","hits":"1","order":"720","possible_hits":"1",},
{"lineNum":"   39","line":"        }"},
{"lineNum":"   40","line":"    };"},
{"lineNum":"   41","line":""},
{"lineNum":"   42","line":"    pub const CaseList = std.ArrayListUnmanaged(Case);"},
{"lineNum":"   43","line":""},
{"lineNum":"   44","line":"    expr: Node,"},
{"lineNum":"   45","line":"    cases: CaseList,"},
{"lineNum":"   46","line":"    default: ?NodeList,"},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"    pub fn new(expr: Node, cases: CaseList, default: ?NodeList) Switch {","class":"lineCov","hits":"1","order":"744","possible_hits":"1",},
{"lineNum":"   49","line":"        return Switch{","class":"lineCov","hits":"1","order":"748","possible_hits":"1",},
{"lineNum":"   50","line":"            .expr = expr,","class":"lineCov","hits":"1","order":"745","possible_hits":"1",},
{"lineNum":"   51","line":"            .cases = cases,","class":"lineCov","hits":"1","order":"746","possible_hits":"1",},
{"lineNum":"   52","line":"            .default = default,","class":"lineCov","hits":"1","order":"747","possible_hits":"1",},
{"lineNum":"   53","line":"        };"},
{"lineNum":"   54","line":"    }"},
{"lineNum":"   55","line":""},
{"lineNum":"   56","line":"    pub fn dump(","class":"lineCov","hits":"1","order":"752","possible_hits":"1",},
{"lineNum":"   57","line":"        self: Switch,"},
{"lineNum":"   58","line":"        writer: anytype,"},
{"lineNum":"   59","line":"        indent: usize,"},
{"lineNum":"   60","line":"    ) !void {","class":"lineCov","hits":"1","order":"764","possible_hits":"1",},
{"lineNum":"   61","line":"        try putInd(writer, indent, \"Switch:\\n\", .{});","class":"lineCov","hits":"1","order":"753","possible_hits":"1",},
{"lineNum":"   62","line":"        try self.expr.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"754","possible_hits":"2",},
{"lineNum":"   63","line":""},
{"lineNum":"   64","line":"        for (self.cases.items) |item| {","class":"lineCov","hits":"2","order":"755","possible_hits":"2",},
{"lineNum":"   65","line":"            try putInd(writer, indent + 2, \"Case:\\n\", .{});","class":"linePartCov","hits":"1","order":"756","possible_hits":"2",},
{"lineNum":"   66","line":"            try item.value.dumpIndented(writer, indent + 4);","class":"linePartCov","hits":"1","order":"757","possible_hits":"2",},
{"lineNum":"   67","line":"            for (item.stmts.items) |stmt|","class":"lineCov","hits":"2","order":"758","possible_hits":"2",},
{"lineNum":"   68","line":"                try stmt.dumpIndented(writer, indent + 4);","class":"linePartCov","hits":"1","order":"759","possible_hits":"2",},
{"lineNum":"   69","line":"        }"},
{"lineNum":"   70","line":""},
{"lineNum":"   71","line":"        if (self.default) |default| {","class":"lineCov","hits":"2","order":"760","possible_hits":"2",},
{"lineNum":"   72","line":"            try putInd(writer, indent + 2, \"Default:\\n\", .{});","class":"linePartCov","hits":"1","order":"761","possible_hits":"2",},
{"lineNum":"   73","line":"            for (default.items) |stmt|","class":"lineCov","hits":"2","order":"762","possible_hits":"2",},
{"lineNum":"   74","line":"                try stmt.dumpIndented(writer, indent + 4);","class":"linePartCov","hits":"1","order":"763","possible_hits":"2",},
{"lineNum":"   75","line":"        }"},
{"lineNum":"   76","line":"    }"},
{"lineNum":"   77","line":"};"},
{"lineNum":"   78","line":""},
{"lineNum":"   79","line":"test \"can compare Switch.Case equality\" {","class":"lineCov","hits":"3","order":"707","possible_hits":"3",},
{"lineNum":"   80","line":"    const nodes = [_]Node{"},
{"lineNum":"   81","line":"        makeNode(std.testing.allocator, Cursor.new(1, 1), .Int, \"1\"),","class":"lineCov","hits":"1","order":"708","possible_hits":"1",},
{"lineNum":"   82","line":"        makeNode(std.testing.allocator, Cursor.new(2, 1), .Int, \"2\"),","class":"lineCov","hits":"1","order":"709","possible_hits":"1",},
{"lineNum":"   83","line":"        makeNode(std.testing.allocator, Cursor.new(3, 1), .Int, \"3\"),","class":"lineCov","hits":"1","order":"710","possible_hits":"1",},
{"lineNum":"   84","line":"        makeNode(std.testing.allocator, Cursor.new(4, 1), .Int, \"4\"),","class":"lineCov","hits":"1","order":"711","possible_hits":"1",},
{"lineNum":"   85","line":"    };"},
{"lineNum":"   86","line":""},
{"lineNum":"   87","line":"    defer for (nodes) |node|","class":"linePartCov","hits":"2","order":"730","possible_hits":"20",},
{"lineNum":"   88","line":"        std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"731","possible_hits":"10",},
{"lineNum":"   89","line":""},
{"lineNum":"   90","line":"    const a = Switch.Case{"},
{"lineNum":"   91","line":"        .value = nodes[0],","class":"lineCov","hits":"1","order":"712","possible_hits":"1",},
{"lineNum":"   92","line":"        .stmts = NodeList{ .items = &[_]Node{nodes[1]} },","class":"lineCov","hits":"1","order":"713","possible_hits":"1",},
{"lineNum":"   93","line":"    };"},
{"lineNum":"   94","line":"    const b = Switch.Case{"},
{"lineNum":"   95","line":"        .value = nodes[0],","class":"lineCov","hits":"1","order":"714","possible_hits":"1",},
{"lineNum":"   96","line":"        .stmts = NodeList{ .items = &[_]Node{nodes[1]} },","class":"lineCov","hits":"1","order":"715","possible_hits":"1",},
{"lineNum":"   97","line":"    };"},
{"lineNum":"   98","line":"    const c = Switch.Case{"},
{"lineNum":"   99","line":"        .value = nodes[2],","class":"lineCov","hits":"1","order":"716","possible_hits":"1",},
{"lineNum":"  100","line":"        .stmts = NodeList{ .items = &[_]Node{nodes[3]} },","class":"lineCov","hits":"1","order":"717","possible_hits":"1",},
{"lineNum":"  101","line":"    };"},
{"lineNum":"  102","line":""},
{"lineNum":"  103","line":"    try expect(a.eql(a));","class":"linePartCov","hits":"1","order":"718","possible_hits":"2",},
{"lineNum":"  104","line":"    try expect(a.eql(b));","class":"linePartCov","hits":"1","order":"721","possible_hits":"2",},
{"lineNum":"  105","line":"    try expect(!a.eql(c));","class":"linePartCov","hits":"1","order":"723","possible_hits":"2",},
{"lineNum":"  106","line":"    try expect(b.eql(a));","class":"linePartCov","hits":"1","order":"724","possible_hits":"2",},
{"lineNum":"  107","line":"    try expect(b.eql(b));","class":"linePartCov","hits":"1","order":"725","possible_hits":"2",},
{"lineNum":"  108","line":"    try expect(!b.eql(c));","class":"linePartCov","hits":"1","order":"726","possible_hits":"2",},
{"lineNum":"  109","line":"    try expect(!c.eql(a));","class":"linePartCov","hits":"1","order":"727","possible_hits":"2",},
{"lineNum":"  110","line":"    try expect(!c.eql(b));","class":"linePartCov","hits":"1","order":"728","possible_hits":"2",},
{"lineNum":"  111","line":"    try expect(c.eql(c));","class":"linePartCov","hits":"1","order":"729","possible_hits":"2",},
{"lineNum":"  112","line":"}"},
{"lineNum":"  113","line":""},
{"lineNum":"  114","line":"test \"can dump a Switch\" {","class":"lineCov","hits":"3","order":"732","possible_hits":"3",},
{"lineNum":"  115","line":"    const nodes = [_]Node{"},
{"lineNum":"  116","line":"        makeNode(std.testing.allocator, Cursor.new(1, 1), .Int, \"1\"),","class":"lineCov","hits":"1","order":"733","possible_hits":"1",},
{"lineNum":"  117","line":"        makeNode(std.testing.allocator, Cursor.new(2, 1), .Int, \"2\"),","class":"lineCov","hits":"1","order":"734","possible_hits":"1",},
{"lineNum":"  118","line":"        makeNode(std.testing.allocator, Cursor.new(3, 1), .Int, \"3\"),","class":"lineCov","hits":"1","order":"735","possible_hits":"1",},
{"lineNum":"  119","line":"        makeNode(std.testing.allocator, Cursor.new(4, 1), .Int, \"4\"),","class":"lineCov","hits":"1","order":"736","possible_hits":"1",},
{"lineNum":"  120","line":"    };"},
{"lineNum":"  121","line":""},
{"lineNum":"  122","line":"    defer for (nodes) |node|","class":"linePartCov","hits":"2","order":"766","possible_hits":"4",},
{"lineNum":"  123","line":"        std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"767","possible_hits":"2",},
{"lineNum":"  124","line":""},
{"lineNum":"  125","line":"    try (DumpTestCase(Switch, .Switch){","class":"linePartCov","hits":"1","order":"765","possible_hits":"2",},
{"lineNum":"  126","line":"        .value = Switch.new(","class":"lineCov","hits":"2","order":"737","possible_hits":"2",},
{"lineNum":"  127","line":"            nodes[0],","class":"lineCov","hits":"1","order":"738","possible_hits":"1",},
{"lineNum":"  128","line":"            Switch.CaseList{","class":"lineCov","hits":"1","order":"742","possible_hits":"1",},
{"lineNum":"  129","line":"                .items = &[_]Switch.Case{Switch.Case{","class":"lineCov","hits":"1","order":"741","possible_hits":"1",},
{"lineNum":"  130","line":"                    .value = nodes[1],","class":"lineCov","hits":"1","order":"739","possible_hits":"1",},
{"lineNum":"  131","line":"                    .stmts = NodeList{ .items = &[_]Node{nodes[2]} },","class":"lineCov","hits":"1","order":"740","possible_hits":"1",},
{"lineNum":"  132","line":"                }},"},
{"lineNum":"  133","line":"            },"},
{"lineNum":"  134","line":"            NodeList{ .items = &[_]Node{nodes[3]} },","class":"lineCov","hits":"1","order":"743","possible_hits":"1",},
{"lineNum":"  135","line":"        ),"},
{"lineNum":"  136","line":"        .expected =","class":"lineCov","hits":"1","order":"749","possible_hits":"1",},
{"lineNum":"  137","line":"        \\\\Switch:"},
{"lineNum":"  138","line":"        \\\\  Int Node (1:1)"},
{"lineNum":"  139","line":"        \\\\    Int: \"1\""},
{"lineNum":"  140","line":"        \\\\  Case:"},
{"lineNum":"  141","line":"        \\\\    Int Node (2:1)"},
{"lineNum":"  142","line":"        \\\\      Int: \"2\""},
{"lineNum":"  143","line":"        \\\\    Int Node (3:1)"},
{"lineNum":"  144","line":"        \\\\      Int: \"3\""},
{"lineNum":"  145","line":"        \\\\  Default:"},
{"lineNum":"  146","line":"        \\\\    Int Node (4:1)"},
{"lineNum":"  147","line":"        \\\\      Int: \"4\""},
{"lineNum":"  148","line":"        \\\\"},
{"lineNum":"  149","line":"        ,"},
{"lineNum":"  150","line":"    }).run();","class":"lineCov","hits":"1","order":"750","possible_hits":"1",},
{"lineNum":"  151","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-13 15:43:06", "instrumented" : 59, "covered" : 59,};
var merged_data = [];
