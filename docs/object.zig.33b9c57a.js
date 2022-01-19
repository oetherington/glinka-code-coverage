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
{"lineNum":"   20","line":"const expectEqualStrings = std.testing.expectEqualStrings;"},
{"lineNum":"   21","line":"const genericEql = @import(\"../generic_eql.zig\");"},
{"lineNum":"   22","line":"const Cursor = @import(\"../cursor.zig\").Cursor;"},
{"lineNum":"   23","line":"const putInd = @import(\"indenter.zig\").putInd;"},
{"lineNum":"   24","line":"const DumpTestCase = @import(\"dump_test_case.zig\").DumpTestCase;"},
{"lineNum":"   25","line":"const nodeImp = @import(\"../node.zig\");"},
{"lineNum":"   26","line":"const Node = nodeImp.Node;"},
{"lineNum":"   27","line":"const makeNode = nodeImp.makeNode;"},
{"lineNum":"   28","line":""},
{"lineNum":"   29","line":"pub const ObjectProperty = struct {"},
{"lineNum":"   30","line":"    key: Node,"},
{"lineNum":"   31","line":"    value: Node,"},
{"lineNum":"   32","line":""},
{"lineNum":"   33","line":"    pub fn new(key: Node, value: Node) ObjectProperty {","class":"lineCov","hits":"1","order":"982","possible_hits":"1",},
{"lineNum":"   34","line":"        return ObjectProperty{","class":"lineCov","hits":"1","order":"985","possible_hits":"1",},
{"lineNum":"   35","line":"            .key = key,","class":"lineCov","hits":"1","order":"983","possible_hits":"1",},
{"lineNum":"   36","line":"            .value = value,","class":"lineCov","hits":"1","order":"984","possible_hits":"1",},
{"lineNum":"   37","line":"        };"},
{"lineNum":"   38","line":"    }"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"    pub fn getName(self: ObjectProperty) []const u8 {","class":"lineCov","hits":"1","order":"988","possible_hits":"1",},
{"lineNum":"   41","line":"        return switch (self.key.data) {","class":"lineCov","hits":"4","order":"989","possible_hits":"4",},
{"lineNum":"   42","line":"            .Ident => |id| id,","class":"lineCov","hits":"1","order":"990","possible_hits":"1",},
{"lineNum":"   43","line":"            .String => |str| str[1 .. str.len - 1],","class":"linePartCov","hits":"1","order":"992","possible_hits":"2",},
{"lineNum":"   44","line":"            else => std.debug.panic(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   45","line":"                \"Invalid ObjectProperty key type: {s}\","},
{"lineNum":"   46","line":"                .{self.key.getType()},","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   47","line":"            ),"},
{"lineNum":"   48","line":"        };"},
{"lineNum":"   49","line":"    }"},
{"lineNum":"   50","line":""},
{"lineNum":"   51","line":"    pub fn dump(","class":"linePartCov","hits":"1","order":"1027","possible_hits":"2",},
{"lineNum":"   52","line":"        self: ObjectProperty,"},
{"lineNum":"   53","line":"        writer: anytype,"},
{"lineNum":"   54","line":"        indent: usize,"},
{"lineNum":"   55","line":"    ) !void {","class":"linePartCov","hits":"1","order":"1031","possible_hits":"2",},
{"lineNum":"   56","line":"        try putInd(writer, indent, \"Property\\n\", .{});","class":"linePartCov","hits":"1","order":"1028","possible_hits":"2",},
{"lineNum":"   57","line":"        try self.key.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"1029","possible_hits":"4",},
{"lineNum":"   58","line":"        try self.value.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"1030","possible_hits":"4",},
{"lineNum":"   59","line":"    }"},
{"lineNum":"   60","line":""},
{"lineNum":"   61","line":"    pub fn eql(self: ObjectProperty, other: ObjectProperty) bool {","class":"lineCov","hits":"1","order":"1004","possible_hits":"1",},
{"lineNum":"   62","line":"        return genericEql.eql(self, other);","class":"lineCov","hits":"1","order":"1005","possible_hits":"1",},
{"lineNum":"   63","line":"    }"},
{"lineNum":"   64","line":"};"},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"test \"can retrieve ObjectProperty name\" {","class":"lineCov","hits":"3","order":"977","possible_hits":"3",},
{"lineNum":"   67","line":"    const nodes = [_]Node{"},
{"lineNum":"   68","line":"        makeNode(std.testing.allocator, Cursor.new(1, 1), .Ident, \"anIdent\"),","class":"lineCov","hits":"1","order":"978","possible_hits":"1",},
{"lineNum":"   69","line":"        makeNode(std.testing.allocator, Cursor.new(2, 1), .String, \"\'aString\'\"),","class":"lineCov","hits":"1","order":"979","possible_hits":"1",},
{"lineNum":"   70","line":"        makeNode(std.testing.allocator, Cursor.new(3, 1), .Int, \"0\"),","class":"lineCov","hits":"1","order":"980","possible_hits":"1",},
{"lineNum":"   71","line":"    };"},
{"lineNum":"   72","line":""},
{"lineNum":"   73","line":"    defer for (nodes) |node|","class":"linePartCov","hits":"2","order":"993","possible_hits":"6",},
{"lineNum":"   74","line":"        std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"994","possible_hits":"3",},
{"lineNum":"   75","line":""},
{"lineNum":"   76","line":"    const anIdentKeyProp = ObjectProperty.new(nodes[0], nodes[2]);","class":"lineCov","hits":"1","order":"981","possible_hits":"1",},
{"lineNum":"   77","line":"    const aStringKeyProp = ObjectProperty.new(nodes[1], nodes[2]);","class":"lineCov","hits":"1","order":"986","possible_hits":"1",},
{"lineNum":"   78","line":""},
{"lineNum":"   79","line":"    try expectEqualStrings(\"anIdent\", anIdentKeyProp.getName());","class":"linePartCov","hits":"1","order":"987","possible_hits":"2",},
{"lineNum":"   80","line":"    try expectEqualStrings(\"aString\", aStringKeyProp.getName());","class":"linePartCov","hits":"1","order":"991","possible_hits":"2",},
{"lineNum":"   81","line":"}"},
{"lineNum":"   82","line":""},
{"lineNum":"   83","line":"test \"can compare ObjectProperties for equality\" {","class":"lineCov","hits":"3","order":"995","possible_hits":"3",},
{"lineNum":"   84","line":"    const nodes = [_]Node{"},
{"lineNum":"   85","line":"        makeNode(std.testing.allocator, Cursor.new(1, 1), .String, \"\'a\'\"),","class":"lineCov","hits":"1","order":"996","possible_hits":"1",},
{"lineNum":"   86","line":"        makeNode(std.testing.allocator, Cursor.new(2, 1), .String, \"\'1\'\"),","class":"lineCov","hits":"1","order":"997","possible_hits":"1",},
{"lineNum":"   87","line":"        makeNode(std.testing.allocator, Cursor.new(3, 1), .String, \"\'b\'\"),","class":"lineCov","hits":"1","order":"998","possible_hits":"1",},
{"lineNum":"   88","line":"        makeNode(std.testing.allocator, Cursor.new(4, 1), .String, \"\'2\'\"),","class":"lineCov","hits":"1","order":"999","possible_hits":"1",},
{"lineNum":"   89","line":"    };"},
{"lineNum":"   90","line":""},
{"lineNum":"   91","line":"    defer for (nodes) |node|","class":"linePartCov","hits":"2","order":"1014","possible_hits":"20",},
{"lineNum":"   92","line":"        std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"1015","possible_hits":"10",},
{"lineNum":"   93","line":""},
{"lineNum":"   94","line":"    const a = ObjectProperty.new(nodes[0], nodes[1]);","class":"lineCov","hits":"1","order":"1000","possible_hits":"1",},
{"lineNum":"   95","line":"    const b = ObjectProperty.new(nodes[0], nodes[1]);","class":"lineCov","hits":"1","order":"1001","possible_hits":"1",},
{"lineNum":"   96","line":"    const c = ObjectProperty.new(nodes[2], nodes[3]);","class":"lineCov","hits":"1","order":"1002","possible_hits":"1",},
{"lineNum":"   97","line":""},
{"lineNum":"   98","line":"    try expect(a.eql(a));","class":"linePartCov","hits":"1","order":"1003","possible_hits":"2",},
{"lineNum":"   99","line":"    try expect(a.eql(b));","class":"linePartCov","hits":"1","order":"1006","possible_hits":"2",},
{"lineNum":"  100","line":"    try expect(!a.eql(c));","class":"linePartCov","hits":"1","order":"1007","possible_hits":"2",},
{"lineNum":"  101","line":"    try expect(b.eql(a));","class":"linePartCov","hits":"1","order":"1008","possible_hits":"2",},
{"lineNum":"  102","line":"    try expect(b.eql(b));","class":"linePartCov","hits":"1","order":"1009","possible_hits":"2",},
{"lineNum":"  103","line":"    try expect(!b.eql(c));","class":"linePartCov","hits":"1","order":"1010","possible_hits":"2",},
{"lineNum":"  104","line":"    try expect(!c.eql(a));","class":"linePartCov","hits":"1","order":"1011","possible_hits":"2",},
{"lineNum":"  105","line":"    try expect(!c.eql(b));","class":"linePartCov","hits":"1","order":"1012","possible_hits":"2",},
{"lineNum":"  106","line":"    try expect(c.eql(c));","class":"linePartCov","hits":"1","order":"1013","possible_hits":"2",},
{"lineNum":"  107","line":"}"},
{"lineNum":"  108","line":""},
{"lineNum":"  109","line":"pub const Object = std.ArrayListUnmanaged(ObjectProperty);"},
{"lineNum":"  110","line":""},
{"lineNum":"  111","line":"test \"can dump an Object\" {","class":"lineCov","hits":"3","order":"1016","possible_hits":"3",},
{"lineNum":"  112","line":"    const nodes = [_]Node{"},
{"lineNum":"  113","line":"        makeNode(std.testing.allocator, Cursor.new(1, 1), .String, \"\'a\'\"),","class":"lineCov","hits":"1","order":"1017","possible_hits":"1",},
{"lineNum":"  114","line":"        makeNode(std.testing.allocator, Cursor.new(2, 1), .String, \"1\"),","class":"lineCov","hits":"1","order":"1018","possible_hits":"1",},
{"lineNum":"  115","line":"    };"},
{"lineNum":"  116","line":""},
{"lineNum":"  117","line":"    defer for (nodes) |node|","class":"linePartCov","hits":"2","order":"1033","possible_hits":"4",},
{"lineNum":"  118","line":"        std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"1034","possible_hits":"2",},
{"lineNum":"  119","line":""},
{"lineNum":"  120","line":"    try (DumpTestCase(Object, .Object){","class":"linePartCov","hits":"1","order":"1032","possible_hits":"2",},
{"lineNum":"  121","line":"        .value = Object{ .items = &[_]ObjectProperty{","class":"lineCov","hits":"1","order":"1020","possible_hits":"1",},
{"lineNum":"  122","line":"            ObjectProperty.new(nodes[0], nodes[1]),","class":"lineCov","hits":"1","order":"1019","possible_hits":"1",},
{"lineNum":"  123","line":"        } },"},
{"lineNum":"  124","line":"        .expected =","class":"lineCov","hits":"1","order":"1021","possible_hits":"1",},
{"lineNum":"  125","line":"        \\\\Object"},
{"lineNum":"  126","line":"        \\\\  Property"},
{"lineNum":"  127","line":"        \\\\    String Node (1:1)"},
{"lineNum":"  128","line":"        \\\\      String: \"\'a\'\""},
{"lineNum":"  129","line":"        \\\\    String Node (2:1)"},
{"lineNum":"  130","line":"        \\\\      String: \"1\""},
{"lineNum":"  131","line":"        \\\\"},
{"lineNum":"  132","line":"        ,"},
{"lineNum":"  133","line":"    }).run();","class":"lineCov","hits":"1","order":"1022","possible_hits":"1",},
{"lineNum":"  134","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-19 21:33:16", "instrumented" : 56, "covered" : 54,};
var merged_data = [];
