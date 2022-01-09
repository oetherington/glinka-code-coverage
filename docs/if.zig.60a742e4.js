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
{"lineNum":"   31","line":"pub const If = struct {"},
{"lineNum":"   32","line":"    pub const Branch = struct {"},
{"lineNum":"   33","line":"        cond: Node,"},
{"lineNum":"   34","line":"        ifTrue: Node,"},
{"lineNum":"   35","line":""},
{"lineNum":"   36","line":"        pub fn eql(a: Branch, b: Branch) bool {","class":"lineCov","hits":"1","order":"1118","possible_hits":"1",},
{"lineNum":"   37","line":"            return genericEql.eql(a, b);","class":"lineCov","hits":"1","order":"1119","possible_hits":"1",},
{"lineNum":"   38","line":"        }"},
{"lineNum":"   39","line":"    };"},
{"lineNum":"   40","line":""},
{"lineNum":"   41","line":"    pub const BranchList = std.ArrayListUnmanaged(Branch);"},
{"lineNum":"   42","line":""},
{"lineNum":"   43","line":"    branches: BranchList,"},
{"lineNum":"   44","line":"    elseBranch: ?Node,"},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"    pub fn new(branches: BranchList, elseBranch: ?Node) If {","class":"lineCov","hits":"1","order":"1139","possible_hits":"1",},
{"lineNum":"   47","line":"        return If{","class":"lineCov","hits":"1","order":"1142","possible_hits":"1",},
{"lineNum":"   48","line":"            .branches = branches,","class":"lineCov","hits":"1","order":"1140","possible_hits":"1",},
{"lineNum":"   49","line":"            .elseBranch = elseBranch,","class":"lineCov","hits":"1","order":"1141","possible_hits":"1",},
{"lineNum":"   50","line":"        };"},
{"lineNum":"   51","line":"    }"},
{"lineNum":"   52","line":""},
{"lineNum":"   53","line":"    pub fn dump(","class":"linePartCov","hits":"1","order":"1146","possible_hits":"2",},
{"lineNum":"   54","line":"        self: If,"},
{"lineNum":"   55","line":"        writer: anytype,"},
{"lineNum":"   56","line":"        indent: usize,"},
{"lineNum":"   57","line":"    ) !void {","class":"linePartCov","hits":"1","order":"1156","possible_hits":"2",},
{"lineNum":"   58","line":"        try putInd(writer, indent, \"If:\\n\", .{});","class":"linePartCov","hits":"1","order":"1147","possible_hits":"2",},
{"lineNum":"   59","line":""},
{"lineNum":"   60","line":"        for (self.branches.items) |item| {","class":"linePartCov","hits":"2","order":"1148","possible_hits":"4",},
{"lineNum":"   61","line":"            try putInd(writer, indent + 2, \"Cond:\\n\", .{});","class":"linePartCov","hits":"1","order":"1149","possible_hits":"4",},
{"lineNum":"   62","line":"            try item.cond.dumpIndented(writer, indent + 4);","class":"linePartCov","hits":"1","order":"1150","possible_hits":"4",},
{"lineNum":"   63","line":"            try putInd(writer, indent + 2, \"Branch:\\n\", .{});","class":"linePartCov","hits":"1","order":"1151","possible_hits":"4",},
{"lineNum":"   64","line":"            try item.ifTrue.dumpIndented(writer, indent + 4);","class":"linePartCov","hits":"1","order":"1152","possible_hits":"4",},
{"lineNum":"   65","line":"        }"},
{"lineNum":"   66","line":""},
{"lineNum":"   67","line":"        if (self.elseBranch) |branch| {","class":"linePartCov","hits":"2","order":"1153","possible_hits":"4",},
{"lineNum":"   68","line":"            try putInd(writer, indent + 2, \"Else:\\n\", .{});","class":"linePartCov","hits":"1","order":"1154","possible_hits":"4",},
{"lineNum":"   69","line":"            try branch.dumpIndented(writer, indent + 4);","class":"linePartCov","hits":"1","order":"1155","possible_hits":"4",},
{"lineNum":"   70","line":"        }"},
{"lineNum":"   71","line":"    }"},
{"lineNum":"   72","line":"};"},
{"lineNum":"   73","line":""},
{"lineNum":"   74","line":"test \"can check If.Branch equality\" {","class":"lineCov","hits":"3","order":"1109","possible_hits":"3",},
{"lineNum":"   75","line":"    const nodes = [_]Node{"},
{"lineNum":"   76","line":"        makeNode(std.testing.allocator, Cursor.new(1, 1), .Int, \"1\"),","class":"lineCov","hits":"1","order":"1110","possible_hits":"1",},
{"lineNum":"   77","line":"        makeNode(std.testing.allocator, Cursor.new(2, 1), .Int, \"2\"),","class":"lineCov","hits":"1","order":"1111","possible_hits":"1",},
{"lineNum":"   78","line":"        makeNode(std.testing.allocator, Cursor.new(3, 1), .Int, \"3\"),","class":"lineCov","hits":"1","order":"1112","possible_hits":"1",},
{"lineNum":"   79","line":"        makeNode(std.testing.allocator, Cursor.new(4, 1), .Int, \"4\"),","class":"lineCov","hits":"1","order":"1113","possible_hits":"1",},
{"lineNum":"   80","line":"    };"},
{"lineNum":"   81","line":""},
{"lineNum":"   82","line":"    defer for (nodes) |node|","class":"linePartCov","hits":"2","order":"1128","possible_hits":"20",},
{"lineNum":"   83","line":"        std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"1129","possible_hits":"10",},
{"lineNum":"   84","line":""},
{"lineNum":"   85","line":"    const a = If.Branch{ .cond = nodes[0], .ifTrue = nodes[1] };","class":"lineCov","hits":"1","order":"1114","possible_hits":"1",},
{"lineNum":"   86","line":"    const b = If.Branch{ .cond = nodes[0], .ifTrue = nodes[1] };","class":"lineCov","hits":"1","order":"1115","possible_hits":"1",},
{"lineNum":"   87","line":"    const c = If.Branch{ .cond = nodes[2], .ifTrue = nodes[3] };","class":"lineCov","hits":"1","order":"1116","possible_hits":"1",},
{"lineNum":"   88","line":""},
{"lineNum":"   89","line":"    try expect(a.eql(a));","class":"linePartCov","hits":"1","order":"1117","possible_hits":"2",},
{"lineNum":"   90","line":"    try expect(a.eql(b));","class":"linePartCov","hits":"1","order":"1120","possible_hits":"2",},
{"lineNum":"   91","line":"    try expect(!a.eql(c));","class":"linePartCov","hits":"1","order":"1121","possible_hits":"2",},
{"lineNum":"   92","line":"    try expect(b.eql(a));","class":"linePartCov","hits":"1","order":"1122","possible_hits":"2",},
{"lineNum":"   93","line":"    try expect(b.eql(b));","class":"linePartCov","hits":"1","order":"1123","possible_hits":"2",},
{"lineNum":"   94","line":"    try expect(!b.eql(c));","class":"linePartCov","hits":"1","order":"1124","possible_hits":"2",},
{"lineNum":"   95","line":"    try expect(!c.eql(a));","class":"linePartCov","hits":"1","order":"1125","possible_hits":"2",},
{"lineNum":"   96","line":"    try expect(!c.eql(b));","class":"linePartCov","hits":"1","order":"1126","possible_hits":"2",},
{"lineNum":"   97","line":"    try expect(c.eql(c));","class":"linePartCov","hits":"1","order":"1127","possible_hits":"2",},
{"lineNum":"   98","line":"}"},
{"lineNum":"   99","line":""},
{"lineNum":"  100","line":"test \"can dump an If\" {","class":"lineCov","hits":"3","order":"1130","possible_hits":"3",},
{"lineNum":"  101","line":"    const nodes = [_]Node{"},
{"lineNum":"  102","line":"        makeNode(std.testing.allocator, Cursor.new(1, 1), .Int, \"1\"),","class":"lineCov","hits":"1","order":"1131","possible_hits":"1",},
{"lineNum":"  103","line":"        makeNode(std.testing.allocator, Cursor.new(1, 1), .Int, \"2\"),","class":"lineCov","hits":"1","order":"1132","possible_hits":"1",},
{"lineNum":"  104","line":"        makeNode(std.testing.allocator, Cursor.new(1, 1), .Int, \"3\"),","class":"lineCov","hits":"1","order":"1133","possible_hits":"1",},
{"lineNum":"  105","line":"    };"},
{"lineNum":"  106","line":""},
{"lineNum":"  107","line":"    defer for (nodes) |node|","class":"linePartCov","hits":"2","order":"1159","possible_hits":"6",},
{"lineNum":"  108","line":"        std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"1160","possible_hits":"3",},
{"lineNum":"  109","line":""},
{"lineNum":"  110","line":"    var branches = If.BranchList{};","class":"lineCov","hits":"1","order":"1134","possible_hits":"1",},
{"lineNum":"  111","line":"    defer branches.deinit(std.testing.allocator);","class":"linePartCov","hits":"1","order":"1158","possible_hits":"3",},
{"lineNum":"  112","line":""},
{"lineNum":"  113","line":"    try branches.append(std.testing.allocator, If.Branch{","class":"linePartCov","hits":"1","order":"1137","possible_hits":"2",},
{"lineNum":"  114","line":"        .cond = nodes[0],","class":"lineCov","hits":"1","order":"1135","possible_hits":"1",},
{"lineNum":"  115","line":"        .ifTrue = nodes[1],","class":"lineCov","hits":"1","order":"1136","possible_hits":"1",},
{"lineNum":"  116","line":"    });"},
{"lineNum":"  117","line":""},
{"lineNum":"  118","line":"    try (DumpTestCase(If, .If){","class":"linePartCov","hits":"1","order":"1157","possible_hits":"2",},
{"lineNum":"  119","line":"        .value = If.new(branches, nodes[2]),","class":"lineCov","hits":"1","order":"1138","possible_hits":"1",},
{"lineNum":"  120","line":"        .expected =","class":"lineCov","hits":"1","order":"1143","possible_hits":"1",},
{"lineNum":"  121","line":"        \\\\If:"},
{"lineNum":"  122","line":"        \\\\  Cond:"},
{"lineNum":"  123","line":"        \\\\    Int Node (1:1)"},
{"lineNum":"  124","line":"        \\\\      Int: \"1\""},
{"lineNum":"  125","line":"        \\\\  Branch:"},
{"lineNum":"  126","line":"        \\\\    Int Node (1:1)"},
{"lineNum":"  127","line":"        \\\\      Int: \"2\""},
{"lineNum":"  128","line":"        \\\\  Else:"},
{"lineNum":"  129","line":"        \\\\    Int Node (1:1)"},
{"lineNum":"  130","line":"        \\\\      Int: \"3\""},
{"lineNum":"  131","line":"        \\\\"},
{"lineNum":"  132","line":"        ,"},
{"lineNum":"  133","line":"    }).run();","class":"lineCov","hits":"1","order":"1144","possible_hits":"1",},
{"lineNum":"  134","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-09 12:39:00", "instrumented" : 51, "covered" : 51,};
var merged_data = [];
