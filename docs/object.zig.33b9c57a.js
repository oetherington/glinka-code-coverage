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
{"lineNum":"   28","line":"pub const ObjectProperty = struct {"},
{"lineNum":"   29","line":"    key: Node,"},
{"lineNum":"   30","line":"    value: Node,"},
{"lineNum":"   31","line":""},
{"lineNum":"   32","line":"    pub fn new(key: Node, value: Node) ObjectProperty {","class":"lineCov","hits":"1","order":"906","possible_hits":"1",},
{"lineNum":"   33","line":"        return ObjectProperty{","class":"lineCov","hits":"1","order":"909","possible_hits":"1",},
{"lineNum":"   34","line":"            .key = key,","class":"lineCov","hits":"1","order":"907","possible_hits":"1",},
{"lineNum":"   35","line":"            .value = value,","class":"lineCov","hits":"1","order":"908","possible_hits":"1",},
{"lineNum":"   36","line":"        };"},
{"lineNum":"   37","line":"    }"},
{"lineNum":"   38","line":""},
{"lineNum":"   39","line":"    pub fn dump(","class":"linePartCov","hits":"1","order":"936","possible_hits":"2",},
{"lineNum":"   40","line":"        self: ObjectProperty,"},
{"lineNum":"   41","line":"        writer: anytype,"},
{"lineNum":"   42","line":"        indent: usize,"},
{"lineNum":"   43","line":"    ) !void {","class":"linePartCov","hits":"1","order":"940","possible_hits":"2",},
{"lineNum":"   44","line":"        try putInd(writer, indent, \"Property\\n\", .{});","class":"linePartCov","hits":"1","order":"937","possible_hits":"2",},
{"lineNum":"   45","line":"        try self.key.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"938","possible_hits":"4",},
{"lineNum":"   46","line":"        try self.value.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"939","possible_hits":"4",},
{"lineNum":"   47","line":"    }"},
{"lineNum":"   48","line":""},
{"lineNum":"   49","line":"    pub fn eql(self: ObjectProperty, other: ObjectProperty) bool {","class":"lineCov","hits":"1","order":"913","possible_hits":"1",},
{"lineNum":"   50","line":"        return genericEql.eql(self, other);","class":"lineCov","hits":"1","order":"914","possible_hits":"1",},
{"lineNum":"   51","line":"    }"},
{"lineNum":"   52","line":"};"},
{"lineNum":"   53","line":""},
{"lineNum":"   54","line":"test \"can compare ObjectProperties for equality\" {","class":"lineCov","hits":"3","order":"900","possible_hits":"3",},
{"lineNum":"   55","line":"    const nodes = [_]Node{"},
{"lineNum":"   56","line":"        makeNode(std.testing.allocator, Cursor.new(1, 1), .String, \"a\"),","class":"lineCov","hits":"1","order":"901","possible_hits":"1",},
{"lineNum":"   57","line":"        makeNode(std.testing.allocator, Cursor.new(2, 1), .String, \"1\"),","class":"lineCov","hits":"1","order":"902","possible_hits":"1",},
{"lineNum":"   58","line":"        makeNode(std.testing.allocator, Cursor.new(3, 1), .String, \"b\"),","class":"lineCov","hits":"1","order":"903","possible_hits":"1",},
{"lineNum":"   59","line":"        makeNode(std.testing.allocator, Cursor.new(4, 1), .String, \"2\"),","class":"lineCov","hits":"1","order":"904","possible_hits":"1",},
{"lineNum":"   60","line":"    };"},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"    defer for (nodes) |node|","class":"linePartCov","hits":"2","order":"923","possible_hits":"20",},
{"lineNum":"   63","line":"        std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"924","possible_hits":"10",},
{"lineNum":"   64","line":""},
{"lineNum":"   65","line":"    const a = ObjectProperty.new(nodes[0], nodes[1]);","class":"lineCov","hits":"1","order":"905","possible_hits":"1",},
{"lineNum":"   66","line":"    const b = ObjectProperty.new(nodes[0], nodes[1]);","class":"lineCov","hits":"1","order":"910","possible_hits":"1",},
{"lineNum":"   67","line":"    const c = ObjectProperty.new(nodes[2], nodes[3]);","class":"lineCov","hits":"1","order":"911","possible_hits":"1",},
{"lineNum":"   68","line":""},
{"lineNum":"   69","line":"    try expect(a.eql(a));","class":"linePartCov","hits":"1","order":"912","possible_hits":"2",},
{"lineNum":"   70","line":"    try expect(a.eql(b));","class":"linePartCov","hits":"1","order":"915","possible_hits":"2",},
{"lineNum":"   71","line":"    try expect(!a.eql(c));","class":"linePartCov","hits":"1","order":"916","possible_hits":"2",},
{"lineNum":"   72","line":"    try expect(b.eql(a));","class":"linePartCov","hits":"1","order":"917","possible_hits":"2",},
{"lineNum":"   73","line":"    try expect(b.eql(b));","class":"linePartCov","hits":"1","order":"918","possible_hits":"2",},
{"lineNum":"   74","line":"    try expect(!b.eql(c));","class":"linePartCov","hits":"1","order":"919","possible_hits":"2",},
{"lineNum":"   75","line":"    try expect(!c.eql(a));","class":"linePartCov","hits":"1","order":"920","possible_hits":"2",},
{"lineNum":"   76","line":"    try expect(!c.eql(b));","class":"linePartCov","hits":"1","order":"921","possible_hits":"2",},
{"lineNum":"   77","line":"    try expect(c.eql(c));","class":"linePartCov","hits":"1","order":"922","possible_hits":"2",},
{"lineNum":"   78","line":"}"},
{"lineNum":"   79","line":""},
{"lineNum":"   80","line":"pub const Object = std.ArrayListUnmanaged(ObjectProperty);"},
{"lineNum":"   81","line":""},
{"lineNum":"   82","line":"test \"can dump an Object\" {","class":"lineCov","hits":"3","order":"925","possible_hits":"3",},
{"lineNum":"   83","line":"    const nodes = [_]Node{"},
{"lineNum":"   84","line":"        makeNode(std.testing.allocator, Cursor.new(1, 1), .String, \"a\"),","class":"lineCov","hits":"1","order":"926","possible_hits":"1",},
{"lineNum":"   85","line":"        makeNode(std.testing.allocator, Cursor.new(2, 1), .String, \"1\"),","class":"lineCov","hits":"1","order":"927","possible_hits":"1",},
{"lineNum":"   86","line":"    };"},
{"lineNum":"   87","line":""},
{"lineNum":"   88","line":"    defer for (nodes) |node|","class":"linePartCov","hits":"2","order":"942","possible_hits":"4",},
{"lineNum":"   89","line":"        std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"943","possible_hits":"2",},
{"lineNum":"   90","line":""},
{"lineNum":"   91","line":"    try (DumpTestCase(Object, .Object){","class":"linePartCov","hits":"1","order":"941","possible_hits":"2",},
{"lineNum":"   92","line":"        .value = Object{ .items = &[_]ObjectProperty{","class":"lineCov","hits":"1","order":"929","possible_hits":"1",},
{"lineNum":"   93","line":"            ObjectProperty.new(nodes[0], nodes[1]),","class":"lineCov","hits":"1","order":"928","possible_hits":"1",},
{"lineNum":"   94","line":"        } },"},
{"lineNum":"   95","line":"        .expected =","class":"lineCov","hits":"1","order":"930","possible_hits":"1",},
{"lineNum":"   96","line":"        \\\\Object"},
{"lineNum":"   97","line":"        \\\\  Property"},
{"lineNum":"   98","line":"        \\\\    String Node (1:1)"},
{"lineNum":"   99","line":"        \\\\      String: \"a\""},
{"lineNum":"  100","line":"        \\\\    String Node (2:1)"},
{"lineNum":"  101","line":"        \\\\      String: \"1\""},
{"lineNum":"  102","line":"        \\\\"},
{"lineNum":"  103","line":"        ,"},
{"lineNum":"  104","line":"    }).run();","class":"lineCov","hits":"1","order":"931","possible_hits":"1",},
{"lineNum":"  105","line":"}"},
{"lineNum":"  106","line":""},
{"lineNum":"  107","line":"pub const ObjectTypeMember = struct {"},
{"lineNum":"  108","line":"    name: []const u8,"},
{"lineNum":"  109","line":"    ty: ?Node,"},
{"lineNum":"  110","line":""},
{"lineNum":"  111","line":"    pub fn new(name: []const u8, ty: ?Node) ObjectTypeMember {","class":"lineCov","hits":"1","order":"948","possible_hits":"1",},
{"lineNum":"  112","line":"        return ObjectTypeMember{","class":"lineCov","hits":"1","order":"951","possible_hits":"1",},
{"lineNum":"  113","line":"            .name = name,","class":"lineCov","hits":"1","order":"949","possible_hits":"1",},
{"lineNum":"  114","line":"            .ty = ty,","class":"lineCov","hits":"1","order":"950","possible_hits":"1",},
{"lineNum":"  115","line":"        };"},
{"lineNum":"  116","line":"    }"},
{"lineNum":"  117","line":""},
{"lineNum":"  118","line":"    pub fn eql(self: ObjectTypeMember, other: ObjectTypeMember) bool {","class":"lineCov","hits":"1","order":"955","possible_hits":"1",},
{"lineNum":"  119","line":"        return genericEql.eql(self, other);","class":"lineCov","hits":"1","order":"956","possible_hits":"1",},
{"lineNum":"  120","line":"    }"},
{"lineNum":"  121","line":""},
{"lineNum":"  122","line":"    pub fn dump(","class":"linePartCov","hits":"1","order":"980","possible_hits":"2",},
{"lineNum":"  123","line":"        self: ObjectTypeMember,"},
{"lineNum":"  124","line":"        writer: anytype,"},
{"lineNum":"  125","line":"        indent: usize,"},
{"lineNum":"  126","line":"    ) !void {","class":"linePartCov","hits":"1","order":"984","possible_hits":"2",},
{"lineNum":"  127","line":"        try putInd(writer, indent, \"Member: {s}\\n\", .{self.name});","class":"linePartCov","hits":"1","order":"981","possible_hits":"2",},
{"lineNum":"  128","line":"        if (self.ty) |ty|","class":"linePartCov","hits":"2","order":"982","possible_hits":"4",},
{"lineNum":"  129","line":"            try ty.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"983","possible_hits":"4",},
{"lineNum":"  130","line":"    }"},
{"lineNum":"  131","line":"};"},
{"lineNum":"  132","line":""},
{"lineNum":"  133","line":"test \"can compare ObjectTypeMembers for equality\" {","class":"lineCov","hits":"3","order":"944","possible_hits":"3",},
{"lineNum":"  134","line":"    const node = makeNode(","class":"lineCov","hits":"1","order":"946","possible_hits":"1",},
{"lineNum":"  135","line":"        std.testing.allocator,"},
{"lineNum":"  136","line":"        Cursor.new(1, 1),","class":"lineCov","hits":"1","order":"945","possible_hits":"1",},
{"lineNum":"  137","line":"        .TypeName,"},
{"lineNum":"  138","line":"        \"int\","},
{"lineNum":"  139","line":"    );"},
{"lineNum":"  140","line":"    defer std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"967","possible_hits":"10",},
{"lineNum":"  141","line":""},
{"lineNum":"  142","line":"    const a = ObjectTypeMember.new(\"a\", node);","class":"lineCov","hits":"1","order":"947","possible_hits":"1",},
{"lineNum":"  143","line":"    const b = ObjectTypeMember.new(\"a\", node);","class":"lineCov","hits":"1","order":"952","possible_hits":"1",},
{"lineNum":"  144","line":"    const c = ObjectTypeMember.new(\"b\", null);","class":"lineCov","hits":"1","order":"953","possible_hits":"1",},
{"lineNum":"  145","line":""},
{"lineNum":"  146","line":"    try expect(a.eql(a));","class":"linePartCov","hits":"1","order":"954","possible_hits":"2",},
{"lineNum":"  147","line":"    try expect(a.eql(b));","class":"linePartCov","hits":"1","order":"957","possible_hits":"2",},
{"lineNum":"  148","line":"    try expect(!a.eql(c));","class":"linePartCov","hits":"1","order":"958","possible_hits":"2",},
{"lineNum":"  149","line":"    try expect(b.eql(a));","class":"linePartCov","hits":"1","order":"961","possible_hits":"2",},
{"lineNum":"  150","line":"    try expect(b.eql(b));","class":"linePartCov","hits":"1","order":"962","possible_hits":"2",},
{"lineNum":"  151","line":"    try expect(!b.eql(c));","class":"linePartCov","hits":"1","order":"963","possible_hits":"2",},
{"lineNum":"  152","line":"    try expect(!c.eql(a));","class":"linePartCov","hits":"1","order":"964","possible_hits":"2",},
{"lineNum":"  153","line":"    try expect(!c.eql(b));","class":"linePartCov","hits":"1","order":"965","possible_hits":"2",},
{"lineNum":"  154","line":"    try expect(c.eql(c));","class":"linePartCov","hits":"1","order":"966","possible_hits":"2",},
{"lineNum":"  155","line":"}"},
{"lineNum":"  156","line":""},
{"lineNum":"  157","line":"pub const ObjectType = std.ArrayListUnmanaged(ObjectTypeMember);"},
{"lineNum":"  158","line":""},
{"lineNum":"  159","line":"test \"can dump an ObjectType\" {","class":"lineCov","hits":"3","order":"968","possible_hits":"3",},
{"lineNum":"  160","line":"    const node = makeNode(","class":"lineCov","hits":"1","order":"970","possible_hits":"1",},
{"lineNum":"  161","line":"        std.testing.allocator,"},
{"lineNum":"  162","line":"        Cursor.new(1, 1),","class":"lineCov","hits":"1","order":"969","possible_hits":"1",},
{"lineNum":"  163","line":"        .TypeName,"},
{"lineNum":"  164","line":"        \"int\","},
{"lineNum":"  165","line":"    );"},
{"lineNum":"  166","line":"    defer std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"986","possible_hits":"2",},
{"lineNum":"  167","line":""},
{"lineNum":"  168","line":"    try (DumpTestCase(ObjectType, .ObjectType){","class":"linePartCov","hits":"1","order":"985","possible_hits":"2",},
{"lineNum":"  169","line":"        .value = ObjectType{ .items = &[_]ObjectTypeMember{","class":"lineCov","hits":"1","order":"973","possible_hits":"1",},
{"lineNum":"  170","line":"            ObjectTypeMember.new(\"a\", node),","class":"lineCov","hits":"1","order":"971","possible_hits":"1",},
{"lineNum":"  171","line":"            ObjectTypeMember.new(\"b\", null),","class":"lineCov","hits":"1","order":"972","possible_hits":"1",},
{"lineNum":"  172","line":"        } },"},
{"lineNum":"  173","line":"        .expected =","class":"lineCov","hits":"1","order":"974","possible_hits":"1",},
{"lineNum":"  174","line":"        \\\\ObjectType"},
{"lineNum":"  175","line":"        \\\\  Member: a"},
{"lineNum":"  176","line":"        \\\\    TypeName Node (1:1)"},
{"lineNum":"  177","line":"        \\\\      TypeName: \"int\""},
{"lineNum":"  178","line":"        \\\\  Member: b"},
{"lineNum":"  179","line":"        \\\\"},
{"lineNum":"  180","line":"        ,"},
{"lineNum":"  181","line":"    }).run();","class":"lineCov","hits":"1","order":"975","possible_hits":"1",},
{"lineNum":"  182","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-02 21:08:39", "instrumented" : 77, "covered" : 77,};
var merged_data = [];
