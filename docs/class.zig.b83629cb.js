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
{"lineNum":"   25","line":"const Function = @import(\"function.zig\").Function;"},
{"lineNum":"   26","line":"const nodeImp = @import(\"../node.zig\");"},
{"lineNum":"   27","line":"const Node = nodeImp.Node;"},
{"lineNum":"   28","line":"const NodeList = nodeImp.NodeList;"},
{"lineNum":"   29","line":"const makeNode = nodeImp.makeNode;"},
{"lineNum":"   30","line":""},
{"lineNum":"   31","line":"pub const ClassTypeMember = struct {"},
{"lineNum":"   32","line":"    pub const Variant = enum {"},
{"lineNum":"   33","line":"        Var,"},
{"lineNum":"   34","line":"        Func,"},
{"lineNum":"   35","line":"    };"},
{"lineNum":"   36","line":""},
{"lineNum":"   37","line":"    pub const Var = struct {"},
{"lineNum":"   38","line":"        isReadOnly: bool,"},
{"lineNum":"   39","line":"        name: []const u8,"},
{"lineNum":"   40","line":"        ty: ?Node,"},
{"lineNum":"   41","line":"        value: ?Node,"},
{"lineNum":"   42","line":"    };"},
{"lineNum":"   43","line":""},
{"lineNum":"   44","line":"    pub const Data = union(Variant) {"},
{"lineNum":"   45","line":"        Var: Var,"},
{"lineNum":"   46","line":"        Func: Function,"},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"        pub fn getType(self: Data) Variant {","class":"lineCov","hits":"1","order":"5054","possible_hits":"1",},
{"lineNum":"   49","line":"            return @as(Variant, self);","class":"lineCov","hits":"1","order":"5055","possible_hits":"1",},
{"lineNum":"   50","line":"        }"},
{"lineNum":"   51","line":"    };"},
{"lineNum":"   52","line":""},
{"lineNum":"   53","line":"    isStatic: bool,"},
{"lineNum":"   54","line":"    visibility: Visibility,"},
{"lineNum":"   55","line":"    data: Data,"},
{"lineNum":"   56","line":""},
{"lineNum":"   57","line":"    pub fn getType(self: ClassTypeMember) Variant {","class":"lineCov","hits":"1","order":"5052","possible_hits":"1",},
{"lineNum":"   58","line":"        return self.data.getType();","class":"lineCov","hits":"1","order":"5053","possible_hits":"1",},
{"lineNum":"   59","line":"    }"},
{"lineNum":"   60","line":""},
{"lineNum":"   61","line":"    pub fn dump(self: ClassTypeMember, writer: anytype, indent: usize) !void {","class":"lineCov","hits":"2","order":"538","possible_hits":"2",},
{"lineNum":"   62","line":"        try putInd(writer, indent, \"ClassTypeMember (\", .{});","class":"lineCov","hits":"1","order":"539","possible_hits":"1",},
{"lineNum":"   63","line":"        if (self.isStatic)","class":"lineCov","hits":"2","order":"540","possible_hits":"2",},
{"lineNum":"   64","line":"            try writer.print(\"Static \", .{});","class":"lineCov","hits":"1","order":"541","possible_hits":"1",},
{"lineNum":"   65","line":"        try writer.print(\"{s})\\n\", .{@tagName(self.visibility)});","class":"lineCov","hits":"1","order":"542","possible_hits":"1",},
{"lineNum":"   66","line":""},
{"lineNum":"   67","line":"        switch (self.data) {","class":"linePartCov","hits":"1","order":"543","possible_hits":"2",},
{"lineNum":"   68","line":"            .Var => |v| {","class":"lineCov","hits":"1","order":"544","possible_hits":"1",},
{"lineNum":"   69","line":"                try putInd(writer, indent + 2, \"\'{s}\\n\", .{v.name});","class":"linePartCov","hits":"1","order":"545","possible_hits":"2",},
{"lineNum":"   70","line":"                if (v.isReadOnly)","class":"lineCov","hits":"2","order":"546","possible_hits":"2",},
{"lineNum":"   71","line":"                    try putInd(writer, indent + 2, \"ReadOnly\\n\", .{});","class":"linePartCov","hits":"1","order":"547","possible_hits":"2",},
{"lineNum":"   72","line":"                if (v.ty) |ty|","class":"lineCov","hits":"2","order":"548","possible_hits":"2",},
{"lineNum":"   73","line":"                    try ty.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"549","possible_hits":"2",},
{"lineNum":"   74","line":"                if (v.value) |value|","class":"lineCov","hits":"2","order":"550","possible_hits":"2",},
{"lineNum":"   75","line":"                    try value.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"551","possible_hits":"2",},
{"lineNum":"   76","line":"            },"},
{"lineNum":"   77","line":"            .Func => |func| try func.dump(writer, indent + 2),","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   78","line":"        }"},
{"lineNum":"   79","line":"    }"},
{"lineNum":"   80","line":"};"},
{"lineNum":"   81","line":""},
{"lineNum":"   82","line":"test \"can dump a ClassTypeMember\" {","class":"lineCov","hits":"3","order":"523","possible_hits":"3",},
{"lineNum":"   83","line":"    const nodes = [_]Node{"},
{"lineNum":"   84","line":"        makeNode(","class":"lineCov","hits":"1","order":"525","possible_hits":"1",},
{"lineNum":"   85","line":"            std.testing.allocator,"},
{"lineNum":"   86","line":"            Cursor.new(1, 1),","class":"lineCov","hits":"1","order":"524","possible_hits":"1",},
{"lineNum":"   87","line":"            .TypeName,"},
{"lineNum":"   88","line":"            \"number\","},
{"lineNum":"   89","line":"        ),"},
{"lineNum":"   90","line":"        makeNode(","class":"lineCov","hits":"1","order":"527","possible_hits":"1",},
{"lineNum":"   91","line":"            std.testing.allocator,"},
{"lineNum":"   92","line":"            Cursor.new(1, 1),","class":"lineCov","hits":"1","order":"526","possible_hits":"1",},
{"lineNum":"   93","line":"            .Int,"},
{"lineNum":"   94","line":"            \"3\","},
{"lineNum":"   95","line":"        ),"},
{"lineNum":"   96","line":"    };"},
{"lineNum":"   97","line":""},
{"lineNum":"   98","line":"    defer for (nodes) |node|","class":"linePartCov","hits":"2","order":"553","possible_hits":"4",},
{"lineNum":"   99","line":"        std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"554","possible_hits":"2",},
{"lineNum":"  100","line":""},
{"lineNum":"  101","line":"    try (DumpTestCase(ClassTypeMember, .ClassTypeMember){","class":"linePartCov","hits":"1","order":"552","possible_hits":"2",},
{"lineNum":"  102","line":"        .value = ClassTypeMember{"},
{"lineNum":"  103","line":"            .isStatic = true,","class":"lineCov","hits":"1","order":"533","possible_hits":"1",},
{"lineNum":"  104","line":"            .visibility = .Public,","class":"lineCov","hits":"1","order":"534","possible_hits":"1",},
{"lineNum":"  105","line":"            .data = .{"},
{"lineNum":"  106","line":"                .Var = .{","class":"lineCov","hits":"1","order":"528","possible_hits":"1",},
{"lineNum":"  107","line":"                    .isReadOnly = true,","class":"lineCov","hits":"1","order":"531","possible_hits":"1",},
{"lineNum":"  108","line":"                    .name = \"SomeClassTypeMember\",","class":"lineCov","hits":"1","order":"532","possible_hits":"1",},
{"lineNum":"  109","line":"                    .ty = nodes[0],","class":"lineCov","hits":"1","order":"529","possible_hits":"1",},
{"lineNum":"  110","line":"                    .value = nodes[1],","class":"lineCov","hits":"1","order":"530","possible_hits":"1",},
{"lineNum":"  111","line":"                },"},
{"lineNum":"  112","line":"            },"},
{"lineNum":"  113","line":"        },"},
{"lineNum":"  114","line":"        .expected =","class":"lineCov","hits":"1","order":"535","possible_hits":"1",},
{"lineNum":"  115","line":"        \\\\ClassTypeMember (Static Public)"},
{"lineNum":"  116","line":"        \\\\  \'SomeClassTypeMember"},
{"lineNum":"  117","line":"        \\\\  ReadOnly"},
{"lineNum":"  118","line":"        \\\\  TypeName Node (1:1)"},
{"lineNum":"  119","line":"        \\\\    TypeName: \"number\""},
{"lineNum":"  120","line":"        \\\\  Int Node (1:1)"},
{"lineNum":"  121","line":"        \\\\    Int: \"3\""},
{"lineNum":"  122","line":"        \\\\"},
{"lineNum":"  123","line":"        ,"},
{"lineNum":"  124","line":"    }).run();","class":"lineCov","hits":"1","order":"536","possible_hits":"1",},
{"lineNum":"  125","line":"}"},
{"lineNum":"  126","line":""},
{"lineNum":"  127","line":"pub const ClassType = struct {"},
{"lineNum":"  128","line":"    name: []const u8,"},
{"lineNum":"  129","line":"    extends: ?[]const u8,"},
{"lineNum":"  130","line":"    members: NodeList,"},
{"lineNum":"  131","line":""},
{"lineNum":"  132","line":"    pub fn new(name: []const u8, extends: ?[]const u8) ClassType {","class":"lineCov","hits":"1","order":"557","possible_hits":"1",},
{"lineNum":"  133","line":"        return ClassType{","class":"lineCov","hits":"1","order":"561","possible_hits":"1",},
{"lineNum":"  134","line":"            .name = name,","class":"lineCov","hits":"1","order":"558","possible_hits":"1",},
{"lineNum":"  135","line":"            .extends = extends,","class":"lineCov","hits":"1","order":"559","possible_hits":"1",},
{"lineNum":"  136","line":"            .members = NodeList{},","class":"lineCov","hits":"1","order":"560","possible_hits":"1",},
{"lineNum":"  137","line":"        };"},
{"lineNum":"  138","line":"    }"},
{"lineNum":"  139","line":""},
{"lineNum":"  140","line":"    pub fn dump(self: ClassType, writer: anytype, indent: usize) !void {","class":"lineCov","hits":"2","order":"565","possible_hits":"2",},
{"lineNum":"  141","line":"        try putInd(writer, indent, \"ClassType \'{s}\'\\n\", .{self.name});","class":"lineCov","hits":"1","order":"566","possible_hits":"1",},
{"lineNum":"  142","line":"        if (self.extends) |extends|","class":"lineCov","hits":"2","order":"567","possible_hits":"2",},
{"lineNum":"  143","line":"            try putInd(writer, indent + 2, \"Extends \'{s}\'\\n\", .{extends});","class":"linePartCov","hits":"1","order":"568","possible_hits":"2",},
{"lineNum":"  144","line":"    }"},
{"lineNum":"  145","line":"};"},
{"lineNum":"  146","line":""},
{"lineNum":"  147","line":"test \"can dump a ClassType\" {","class":"lineCov","hits":"2","order":"555","possible_hits":"2",},
{"lineNum":"  148","line":"    try (DumpTestCase(ClassType, .ClassType){","class":"lineCov","hits":"1","order":"569","possible_hits":"1",},
{"lineNum":"  149","line":"        .value = ClassType.new(\"MyClass\", \"SomeOtherClass\"),","class":"lineCov","hits":"1","order":"556","possible_hits":"1",},
{"lineNum":"  150","line":"        .expected =","class":"lineCov","hits":"1","order":"562","possible_hits":"1",},
{"lineNum":"  151","line":"        \\\\ClassType \'MyClass\'"},
{"lineNum":"  152","line":"        \\\\  Extends \'SomeOtherClass\'"},
{"lineNum":"  153","line":"        \\\\"},
{"lineNum":"  154","line":"        ,"},
{"lineNum":"  155","line":"    }).run();","class":"lineCov","hits":"1","order":"563","possible_hits":"1",},
{"lineNum":"  156","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-13 14:13:43", "instrumented" : 50, "covered" : 49,};
var merged_data = [];
