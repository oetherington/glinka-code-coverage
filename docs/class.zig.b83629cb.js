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
{"lineNum":"   24","line":"const Visibility = @import(\"../visibility.zig\").Visibility;"},
{"lineNum":"   25","line":"const nodeImp = @import(\"../node.zig\");"},
{"lineNum":"   26","line":"const Node = nodeImp.Node;"},
{"lineNum":"   27","line":"const NodeList = nodeImp.NodeList;"},
{"lineNum":"   28","line":"const makeNode = nodeImp.makeNode;"},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"pub const ClassTypeMember = struct {"},
{"lineNum":"   31","line":"    isStatic: bool,"},
{"lineNum":"   32","line":"    isReadOnly: bool,"},
{"lineNum":"   33","line":"    visibility: Visibility,"},
{"lineNum":"   34","line":"    name: []const u8,"},
{"lineNum":"   35","line":"    ty: ?Node,"},
{"lineNum":"   36","line":"    value: ?Node,"},
{"lineNum":"   37","line":""},
{"lineNum":"   38","line":"    pub fn dump(self: ClassTypeMember, writer: anytype, indent: usize) !void {","class":"linePartCov","hits":"2","order":"537","possible_hits":"4",},
{"lineNum":"   39","line":"        try putInd(writer, indent, \"ClassTypeMember \'{s}\' (\", .{self.name});","class":"linePartCov","hits":"1","order":"538","possible_hits":"2",},
{"lineNum":"   40","line":"        if (self.isStatic)","class":"linePartCov","hits":"2","order":"539","possible_hits":"4",},
{"lineNum":"   41","line":"            try writer.print(\"Static \", .{});","class":"linePartCov","hits":"1","order":"540","possible_hits":"2",},
{"lineNum":"   42","line":"        if (self.isReadOnly)","class":"linePartCov","hits":"2","order":"541","possible_hits":"4",},
{"lineNum":"   43","line":"            try writer.print(\"ReadOnly \", .{});","class":"linePartCov","hits":"1","order":"542","possible_hits":"2",},
{"lineNum":"   44","line":"        try writer.print(\"{s})\\n\", .{@tagName(self.visibility)});","class":"linePartCov","hits":"1","order":"543","possible_hits":"2",},
{"lineNum":"   45","line":"        if (self.ty) |ty|","class":"linePartCov","hits":"2","order":"544","possible_hits":"4",},
{"lineNum":"   46","line":"            try ty.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"545","possible_hits":"4",},
{"lineNum":"   47","line":"        if (self.value) |value|","class":"linePartCov","hits":"2","order":"546","possible_hits":"4",},
{"lineNum":"   48","line":"            try value.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"547","possible_hits":"4",},
{"lineNum":"   49","line":"    }"},
{"lineNum":"   50","line":"};"},
{"lineNum":"   51","line":""},
{"lineNum":"   52","line":"test \"can dump a ClassTypeMember\" {","class":"lineCov","hits":"3","order":"523","possible_hits":"3",},
{"lineNum":"   53","line":"    const nodes = [_]Node{"},
{"lineNum":"   54","line":"        makeNode(","class":"lineCov","hits":"1","order":"525","possible_hits":"1",},
{"lineNum":"   55","line":"            std.testing.allocator,"},
{"lineNum":"   56","line":"            Cursor.new(1, 1),","class":"lineCov","hits":"1","order":"524","possible_hits":"1",},
{"lineNum":"   57","line":"            .TypeName,"},
{"lineNum":"   58","line":"            \"number\","},
{"lineNum":"   59","line":"        ),"},
{"lineNum":"   60","line":"        makeNode(","class":"lineCov","hits":"1","order":"527","possible_hits":"1",},
{"lineNum":"   61","line":"            std.testing.allocator,"},
{"lineNum":"   62","line":"            Cursor.new(1, 1),","class":"lineCov","hits":"1","order":"526","possible_hits":"1",},
{"lineNum":"   63","line":"            .Int,"},
{"lineNum":"   64","line":"            \"3\","},
{"lineNum":"   65","line":"        ),"},
{"lineNum":"   66","line":"    };"},
{"lineNum":"   67","line":""},
{"lineNum":"   68","line":"    defer for (nodes) |node|","class":"linePartCov","hits":"2","order":"549","possible_hits":"4",},
{"lineNum":"   69","line":"        std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"550","possible_hits":"2",},
{"lineNum":"   70","line":""},
{"lineNum":"   71","line":"    try (DumpTestCase(ClassTypeMember, .ClassTypeMember){","class":"linePartCov","hits":"1","order":"548","possible_hits":"2",},
{"lineNum":"   72","line":"        .value = ClassTypeMember{"},
{"lineNum":"   73","line":"            .isStatic = true,","class":"lineCov","hits":"1","order":"530","possible_hits":"1",},
{"lineNum":"   74","line":"            .isReadOnly = true,","class":"lineCov","hits":"1","order":"531","possible_hits":"1",},
{"lineNum":"   75","line":"            .visibility = .Public,","class":"lineCov","hits":"1","order":"532","possible_hits":"1",},
{"lineNum":"   76","line":"            .name = \"SomeClassTypeMember\",","class":"lineCov","hits":"1","order":"533","possible_hits":"1",},
{"lineNum":"   77","line":"            .ty = nodes[0],","class":"lineCov","hits":"1","order":"528","possible_hits":"1",},
{"lineNum":"   78","line":"            .value = nodes[1],","class":"lineCov","hits":"1","order":"529","possible_hits":"1",},
{"lineNum":"   79","line":"        },"},
{"lineNum":"   80","line":"        .expected =","class":"lineCov","hits":"1","order":"534","possible_hits":"1",},
{"lineNum":"   81","line":"        \\\\ClassTypeMember \'SomeClassTypeMember\' (Static ReadOnly Public)"},
{"lineNum":"   82","line":"        \\\\  TypeName Node (1:1)"},
{"lineNum":"   83","line":"        \\\\    TypeName: \"number\""},
{"lineNum":"   84","line":"        \\\\  Int Node (1:1)"},
{"lineNum":"   85","line":"        \\\\    Int: \"3\""},
{"lineNum":"   86","line":"        \\\\"},
{"lineNum":"   87","line":"        ,"},
{"lineNum":"   88","line":"    }).run();","class":"lineCov","hits":"1","order":"535","possible_hits":"1",},
{"lineNum":"   89","line":"}"},
{"lineNum":"   90","line":""},
{"lineNum":"   91","line":"pub const ClassType = struct {"},
{"lineNum":"   92","line":"    name: []const u8,"},
{"lineNum":"   93","line":"    extends: ?[]const u8,"},
{"lineNum":"   94","line":"    members: NodeList,"},
{"lineNum":"   95","line":""},
{"lineNum":"   96","line":"    pub fn new(name: []const u8, extends: ?[]const u8) ClassType {","class":"lineCov","hits":"1","order":"553","possible_hits":"1",},
{"lineNum":"   97","line":"        return ClassType{","class":"lineCov","hits":"1","order":"557","possible_hits":"1",},
{"lineNum":"   98","line":"            .name = name,","class":"lineCov","hits":"1","order":"554","possible_hits":"1",},
{"lineNum":"   99","line":"            .extends = extends,","class":"lineCov","hits":"1","order":"555","possible_hits":"1",},
{"lineNum":"  100","line":"            .members = NodeList{},","class":"lineCov","hits":"1","order":"556","possible_hits":"1",},
{"lineNum":"  101","line":"        };"},
{"lineNum":"  102","line":"    }"},
{"lineNum":"  103","line":""},
{"lineNum":"  104","line":"    pub fn dump(self: ClassType, writer: anytype, indent: usize) !void {","class":"linePartCov","hits":"2","order":"561","possible_hits":"4",},
{"lineNum":"  105","line":"        try putInd(writer, indent, \"ClassType \'{s}\'\\n\", .{self.name});","class":"linePartCov","hits":"1","order":"562","possible_hits":"2",},
{"lineNum":"  106","line":"        if (self.extends) |extends|","class":"linePartCov","hits":"2","order":"563","possible_hits":"4",},
{"lineNum":"  107","line":"            try putInd(writer, indent + 2, \"Extends \'{s}\'\\n\", .{extends});","class":"linePartCov","hits":"1","order":"564","possible_hits":"4",},
{"lineNum":"  108","line":"    }"},
{"lineNum":"  109","line":"};"},
{"lineNum":"  110","line":""},
{"lineNum":"  111","line":"test \"can dump a ClassType\" {","class":"lineCov","hits":"2","order":"551","possible_hits":"2",},
{"lineNum":"  112","line":"    try (DumpTestCase(ClassType, .ClassType){","class":"lineCov","hits":"1","order":"565","possible_hits":"1",},
{"lineNum":"  113","line":"        .value = ClassType.new(\"MyClass\", \"SomeOtherClass\"),","class":"lineCov","hits":"1","order":"552","possible_hits":"1",},
{"lineNum":"  114","line":"        .expected =","class":"lineCov","hits":"1","order":"558","possible_hits":"1",},
{"lineNum":"  115","line":"        \\\\ClassType \'MyClass\'"},
{"lineNum":"  116","line":"        \\\\  Extends \'SomeOtherClass\'"},
{"lineNum":"  117","line":"        \\\\"},
{"lineNum":"  118","line":"        ,"},
{"lineNum":"  119","line":"    }).run();","class":"lineCov","hits":"1","order":"559","possible_hits":"1",},
{"lineNum":"  120","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-03 20:31:51", "instrumented" : 41, "covered" : 41,};
var merged_data = [];
