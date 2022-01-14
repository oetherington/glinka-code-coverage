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
{"lineNum":"   20","line":"const genericEql = @import(\"../generic_eql.zig\");"},
{"lineNum":"   21","line":"const Cursor = @import(\"../cursor.zig\").Cursor;"},
{"lineNum":"   22","line":"const putInd = @import(\"indenter.zig\").putInd;"},
{"lineNum":"   23","line":"const DumpTestCase = @import(\"dump_test_case.zig\").DumpTestCase;"},
{"lineNum":"   24","line":"const nodeImp = @import(\"../node.zig\");"},
{"lineNum":"   25","line":"const Node = nodeImp.Node;"},
{"lineNum":"   26","line":"const makeNode = nodeImp.makeNode;"},
{"lineNum":"   27","line":""},
{"lineNum":"   28","line":"pub const InterfaceTypeMember = struct {"},
{"lineNum":"   29","line":"    name: []const u8,"},
{"lineNum":"   30","line":"    ty: Node,"},
{"lineNum":"   31","line":""},
{"lineNum":"   32","line":"    pub fn new(name: []const u8, ty: Node) InterfaceTypeMember {","class":"lineCov","hits":"1","order":"1104","possible_hits":"1",},
{"lineNum":"   33","line":"        return InterfaceTypeMember{","class":"lineCov","hits":"1","order":"1107","possible_hits":"1",},
{"lineNum":"   34","line":"            .name = name,","class":"lineCov","hits":"1","order":"1105","possible_hits":"1",},
{"lineNum":"   35","line":"            .ty = ty,","class":"lineCov","hits":"1","order":"1106","possible_hits":"1",},
{"lineNum":"   36","line":"        };"},
{"lineNum":"   37","line":"    }"},
{"lineNum":"   38","line":""},
{"lineNum":"   39","line":"    pub fn eql(self: InterfaceTypeMember, other: InterfaceTypeMember) bool {","class":"lineCov","hits":"1","order":"1111","possible_hits":"1",},
{"lineNum":"   40","line":"        return genericEql.eql(self, other);","class":"lineCov","hits":"1","order":"1112","possible_hits":"1",},
{"lineNum":"   41","line":"    }"},
{"lineNum":"   42","line":""},
{"lineNum":"   43","line":"    pub fn dump(","class":"linePartCov","hits":"1","order":"1139","possible_hits":"2",},
{"lineNum":"   44","line":"        self: InterfaceTypeMember,"},
{"lineNum":"   45","line":"        writer: anytype,"},
{"lineNum":"   46","line":"        indent: usize,"},
{"lineNum":"   47","line":"    ) !void {","class":"linePartCov","hits":"1","order":"1142","possible_hits":"2",},
{"lineNum":"   48","line":"        try putInd(writer, indent, \"Member: {s}\\n\", .{self.name});","class":"linePartCov","hits":"1","order":"1140","possible_hits":"2",},
{"lineNum":"   49","line":"        try self.ty.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"1141","possible_hits":"4",},
{"lineNum":"   50","line":"    }"},
{"lineNum":"   51","line":"};"},
{"lineNum":"   52","line":""},
{"lineNum":"   53","line":"test \"can compare InterfaceTypeMembers for equality\" {","class":"lineCov","hits":"3","order":"1100","possible_hits":"3",},
{"lineNum":"   54","line":"    const node = makeNode(","class":"lineCov","hits":"1","order":"1102","possible_hits":"1",},
{"lineNum":"   55","line":"        std.testing.allocator,"},
{"lineNum":"   56","line":"        Cursor.new(1, 1),","class":"lineCov","hits":"1","order":"1101","possible_hits":"1",},
{"lineNum":"   57","line":"        .TypeName,"},
{"lineNum":"   58","line":"        \"int\","},
{"lineNum":"   59","line":"    );"},
{"lineNum":"   60","line":"    defer std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"1121","possible_hits":"10",},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"    const a = InterfaceTypeMember.new(\"a\", node);","class":"lineCov","hits":"1","order":"1103","possible_hits":"1",},
{"lineNum":"   63","line":"    const b = InterfaceTypeMember.new(\"a\", node);","class":"lineCov","hits":"1","order":"1108","possible_hits":"1",},
{"lineNum":"   64","line":"    const c = InterfaceTypeMember.new(\"b\", node);","class":"lineCov","hits":"1","order":"1109","possible_hits":"1",},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"    try expect(a.eql(a));","class":"linePartCov","hits":"1","order":"1110","possible_hits":"2",},
{"lineNum":"   67","line":"    try expect(a.eql(b));","class":"linePartCov","hits":"1","order":"1113","possible_hits":"2",},
{"lineNum":"   68","line":"    try expect(!a.eql(c));","class":"linePartCov","hits":"1","order":"1114","possible_hits":"2",},
{"lineNum":"   69","line":"    try expect(b.eql(a));","class":"linePartCov","hits":"1","order":"1115","possible_hits":"2",},
{"lineNum":"   70","line":"    try expect(b.eql(b));","class":"linePartCov","hits":"1","order":"1116","possible_hits":"2",},
{"lineNum":"   71","line":"    try expect(!b.eql(c));","class":"linePartCov","hits":"1","order":"1117","possible_hits":"2",},
{"lineNum":"   72","line":"    try expect(!c.eql(a));","class":"linePartCov","hits":"1","order":"1118","possible_hits":"2",},
{"lineNum":"   73","line":"    try expect(!c.eql(b));","class":"linePartCov","hits":"1","order":"1119","possible_hits":"2",},
{"lineNum":"   74","line":"    try expect(c.eql(c));","class":"linePartCov","hits":"1","order":"1120","possible_hits":"2",},
{"lineNum":"   75","line":"}"},
{"lineNum":"   76","line":""},
{"lineNum":"   77","line":"pub const InterfaceTypeMemberList = std.ArrayListUnmanaged(InterfaceTypeMember);"},
{"lineNum":"   78","line":""},
{"lineNum":"   79","line":"pub const InterfaceType = struct {"},
{"lineNum":"   80","line":"    name: ?[]const u8,"},
{"lineNum":"   81","line":"    members: InterfaceTypeMemberList,"},
{"lineNum":"   82","line":"};"},
{"lineNum":"   83","line":""},
{"lineNum":"   84","line":"test \"can dump an InterfaceType\" {","class":"lineCov","hits":"3","order":"1122","possible_hits":"3",},
{"lineNum":"   85","line":"    const node = makeNode(","class":"lineCov","hits":"1","order":"1124","possible_hits":"1",},
{"lineNum":"   86","line":"        std.testing.allocator,"},
{"lineNum":"   87","line":"        Cursor.new(1, 1),","class":"lineCov","hits":"1","order":"1123","possible_hits":"1",},
{"lineNum":"   88","line":"        .TypeName,"},
{"lineNum":"   89","line":"        \"string\","},
{"lineNum":"   90","line":"    );"},
{"lineNum":"   91","line":"    defer std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"1144","possible_hits":"2",},
{"lineNum":"   92","line":""},
{"lineNum":"   93","line":"    try (DumpTestCase(InterfaceType, .InterfaceType){","class":"linePartCov","hits":"1","order":"1143","possible_hits":"2",},
{"lineNum":"   94","line":"        .value = InterfaceType{"},
{"lineNum":"   95","line":"            .name = \"anInterface\",","class":"lineCov","hits":"1","order":"1129","possible_hits":"1",},
{"lineNum":"   96","line":"            .members = .{","class":"lineCov","hits":"1","order":"1128","possible_hits":"1",},
{"lineNum":"   97","line":"                .items = &[_]InterfaceTypeMember{","class":"lineCov","hits":"1","order":"1127","possible_hits":"1",},
{"lineNum":"   98","line":"                    InterfaceTypeMember.new(\"a\", node),","class":"lineCov","hits":"1","order":"1125","possible_hits":"1",},
{"lineNum":"   99","line":"                    InterfaceTypeMember.new(\"b\", node),","class":"lineCov","hits":"1","order":"1126","possible_hits":"1",},
{"lineNum":"  100","line":"                },"},
{"lineNum":"  101","line":"            },"},
{"lineNum":"  102","line":"        },"},
{"lineNum":"  103","line":"        .expected =","class":"lineCov","hits":"1","order":"1130","possible_hits":"1",},
{"lineNum":"  104","line":"        \\\\InterfaceType anInterface"},
{"lineNum":"  105","line":"        \\\\  Member: a"},
{"lineNum":"  106","line":"        \\\\    TypeName Node (1:1)"},
{"lineNum":"  107","line":"        \\\\      TypeName: \"string\""},
{"lineNum":"  108","line":"        \\\\  Member: b"},
{"lineNum":"  109","line":"        \\\\    TypeName Node (1:1)"},
{"lineNum":"  110","line":"        \\\\      TypeName: \"string\""},
{"lineNum":"  111","line":"        \\\\"},
{"lineNum":"  112","line":"        ,"},
{"lineNum":"  113","line":"    }).run();","class":"lineCov","hits":"1","order":"1131","possible_hits":"1",},
{"lineNum":"  114","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-14 09:28:45", "instrumented" : 38, "covered" : 38,};
var merged_data = [];
