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
{"lineNum":"   31","line":"pub const Function = struct {"},
{"lineNum":"   32","line":"    pub const Arg = struct {"},
{"lineNum":"   33","line":"        csr: Cursor,"},
{"lineNum":"   34","line":"        name: []const u8,"},
{"lineNum":"   35","line":"        ty: ?Node,"},
{"lineNum":"   36","line":""},
{"lineNum":"   37","line":"        pub fn eql(a: Arg, b: Arg) bool {","class":"lineCov","hits":"1","order":"602","possible_hits":"1",},
{"lineNum":"   38","line":"            return genericEql.eql(a, b);","class":"lineCov","hits":"1","order":"603","possible_hits":"1",},
{"lineNum":"   39","line":"        }"},
{"lineNum":"   40","line":"    };"},
{"lineNum":"   41","line":""},
{"lineNum":"   42","line":"    pub const ArgList = std.ArrayListUnmanaged(Arg);"},
{"lineNum":"   43","line":""},
{"lineNum":"   44","line":"    isArrow: bool,"},
{"lineNum":"   45","line":"    name: ?[]const u8,"},
{"lineNum":"   46","line":"    retTy: ?Node,"},
{"lineNum":"   47","line":"    args: ArgList,"},
{"lineNum":"   48","line":"    body: Node,"},
{"lineNum":"   49","line":""},
{"lineNum":"   50","line":"    pub fn new(","class":"lineCov","hits":"1","order":"623","possible_hits":"1",},
{"lineNum":"   51","line":"        isArrow: bool,"},
{"lineNum":"   52","line":"        name: ?[]const u8,"},
{"lineNum":"   53","line":"        retTy: ?Node,"},
{"lineNum":"   54","line":"        args: ArgList,"},
{"lineNum":"   55","line":"        body: Node,"},
{"lineNum":"   56","line":"    ) Function {"},
{"lineNum":"   57","line":"        return Function{","class":"lineCov","hits":"1","order":"629","possible_hits":"1",},
{"lineNum":"   58","line":"            .isArrow = isArrow,","class":"lineCov","hits":"1","order":"624","possible_hits":"1",},
{"lineNum":"   59","line":"            .name = name,","class":"lineCov","hits":"1","order":"625","possible_hits":"1",},
{"lineNum":"   60","line":"            .retTy = retTy,","class":"lineCov","hits":"1","order":"626","possible_hits":"1",},
{"lineNum":"   61","line":"            .args = args,","class":"lineCov","hits":"1","order":"627","possible_hits":"1",},
{"lineNum":"   62","line":"            .body = body,","class":"lineCov","hits":"1","order":"628","possible_hits":"1",},
{"lineNum":"   63","line":"        };"},
{"lineNum":"   64","line":"    }"},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"    pub fn dump(","class":"linePartCov","hits":"1","order":"633","possible_hits":"2",},
{"lineNum":"   67","line":"        self: Function,"},
{"lineNum":"   68","line":"        writer: anytype,"},
{"lineNum":"   69","line":"        indent: usize,"},
{"lineNum":"   70","line":"    ) !void {","class":"linePartCov","hits":"1","order":"646","possible_hits":"2",},
{"lineNum":"   71","line":"        const arrow = if (self.isArrow) \"Arrow \" else \"\";","class":"linePartCov","hits":"1","order":"634","possible_hits":"2",},
{"lineNum":"   72","line":"        const name = if (self.name) |name| name else \"<anonymous>\";","class":"linePartCov","hits":"1","order":"635","possible_hits":"2",},
{"lineNum":"   73","line":""},
{"lineNum":"   74","line":"        try putInd(writer, indent, \"{s}Function: {s}\\n\", .{ arrow, name });","class":"linePartCov","hits":"1","order":"636","possible_hits":"2",},
{"lineNum":"   75","line":""},
{"lineNum":"   76","line":"        if (self.retTy) |retTy|","class":"linePartCov","hits":"2","order":"637","possible_hits":"4",},
{"lineNum":"   77","line":"            try retTy.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"638","possible_hits":"4",},
{"lineNum":"   78","line":""},
{"lineNum":"   79","line":"        try putInd(writer, indent, \"Arguments:\\n\", .{});","class":"linePartCov","hits":"1","order":"639","possible_hits":"2",},
{"lineNum":"   80","line":"        for (self.args.items) |arg| {","class":"linePartCov","hits":"2","order":"640","possible_hits":"4",},
{"lineNum":"   81","line":"            try putInd(writer, indent + 2, \"\'{s}\'\\n\", .{arg.name});","class":"linePartCov","hits":"1","order":"641","possible_hits":"4",},
{"lineNum":"   82","line":"            if (arg.ty) |ty|","class":"linePartCov","hits":"2","order":"642","possible_hits":"4",},
{"lineNum":"   83","line":"                try ty.dumpIndented(writer, indent + 4);","class":"linePartCov","hits":"1","order":"643","possible_hits":"4",},
{"lineNum":"   84","line":"        }"},
{"lineNum":"   85","line":""},
{"lineNum":"   86","line":"        try putInd(writer, indent, \"Body:\\n\", .{});","class":"linePartCov","hits":"1","order":"644","possible_hits":"2",},
{"lineNum":"   87","line":"        try self.body.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"645","possible_hits":"4",},
{"lineNum":"   88","line":"    }"},
{"lineNum":"   89","line":"};"},
{"lineNum":"   90","line":""},
{"lineNum":"   91","line":"test \"can check Function.Argument equality\" {","class":"lineCov","hits":"3","order":"595","possible_hits":"3",},
{"lineNum":"   92","line":"    const node = makeNode(","class":"lineCov","hits":"1","order":"597","possible_hits":"1",},
{"lineNum":"   93","line":"        std.testing.allocator,"},
{"lineNum":"   94","line":"        Cursor.new(1, 5),","class":"lineCov","hits":"1","order":"596","possible_hits":"1",},
{"lineNum":"   95","line":"        .TypeName,"},
{"lineNum":"   96","line":"        \"number\","},
{"lineNum":"   97","line":"    );"},
{"lineNum":"   98","line":"    defer std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"612","possible_hits":"10",},
{"lineNum":"   99","line":""},
{"lineNum":"  100","line":"    const a = Function.Arg{ .csr = Cursor.new(1, 1), .name = \"a\", .ty = node };","class":"lineCov","hits":"1","order":"598","possible_hits":"1",},
{"lineNum":"  101","line":"    const b = Function.Arg{ .csr = Cursor.new(1, 1), .name = \"a\", .ty = node };","class":"lineCov","hits":"1","order":"599","possible_hits":"1",},
{"lineNum":"  102","line":"    const c = Function.Arg{ .csr = Cursor.new(2, 1), .name = \"b\", .ty = null };","class":"lineCov","hits":"1","order":"600","possible_hits":"1",},
{"lineNum":"  103","line":""},
{"lineNum":"  104","line":"    try expect(a.eql(a));","class":"linePartCov","hits":"1","order":"601","possible_hits":"2",},
{"lineNum":"  105","line":"    try expect(a.eql(b));","class":"linePartCov","hits":"1","order":"604","possible_hits":"2",},
{"lineNum":"  106","line":"    try expect(!a.eql(c));","class":"linePartCov","hits":"1","order":"605","possible_hits":"2",},
{"lineNum":"  107","line":"    try expect(b.eql(a));","class":"linePartCov","hits":"1","order":"606","possible_hits":"2",},
{"lineNum":"  108","line":"    try expect(b.eql(b));","class":"linePartCov","hits":"1","order":"607","possible_hits":"2",},
{"lineNum":"  109","line":"    try expect(!b.eql(c));","class":"linePartCov","hits":"1","order":"608","possible_hits":"2",},
{"lineNum":"  110","line":"    try expect(!c.eql(a));","class":"linePartCov","hits":"1","order":"609","possible_hits":"2",},
{"lineNum":"  111","line":"    try expect(!c.eql(b));","class":"linePartCov","hits":"1","order":"610","possible_hits":"2",},
{"lineNum":"  112","line":"    try expect(c.eql(c));","class":"linePartCov","hits":"1","order":"611","possible_hits":"2",},
{"lineNum":"  113","line":"}"},
{"lineNum":"  114","line":""},
{"lineNum":"  115","line":"test \"can dump a Function\" {","class":"lineCov","hits":"3","order":"613","possible_hits":"3",},
{"lineNum":"  116","line":"    const nodes = [_]Node{"},
{"lineNum":"  117","line":"        makeNode(std.testing.allocator, Cursor.new(1, 1), .TypeName, \"number\"),","class":"lineCov","hits":"1","order":"614","possible_hits":"1",},
{"lineNum":"  118","line":"        makeNode(std.testing.allocator, Cursor.new(2, 1), .TypeName, \"number\"),","class":"lineCov","hits":"1","order":"615","possible_hits":"1",},
{"lineNum":"  119","line":"        makeNode(std.testing.allocator, Cursor.new(3, 1), .Int, \"1\"),","class":"lineCov","hits":"1","order":"616","possible_hits":"1",},
{"lineNum":"  120","line":"    };"},
{"lineNum":"  121","line":""},
{"lineNum":"  122","line":"    defer for (nodes) |node|","class":"linePartCov","hits":"2","order":"649","possible_hits":"6",},
{"lineNum":"  123","line":"        std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"650","possible_hits":"3",},
{"lineNum":"  124","line":""},
{"lineNum":"  125","line":"    var args = Function.ArgList{};","class":"lineCov","hits":"1","order":"617","possible_hits":"1",},
{"lineNum":"  126","line":"    defer args.deinit(std.testing.allocator);","class":"linePartCov","hits":"1","order":"648","possible_hits":"3",},
{"lineNum":"  127","line":""},
{"lineNum":"  128","line":"    try args.append(std.testing.allocator, Function.Arg{","class":"linePartCov","hits":"1","order":"621","possible_hits":"2",},
{"lineNum":"  129","line":"        .csr = Cursor.new(1, 2),","class":"lineCov","hits":"1","order":"618","possible_hits":"1",},
{"lineNum":"  130","line":"        .name = \"anArg\",","class":"lineCov","hits":"1","order":"620","possible_hits":"1",},
{"lineNum":"  131","line":"        .ty = nodes[0],","class":"lineCov","hits":"1","order":"619","possible_hits":"1",},
{"lineNum":"  132","line":"    });"},
{"lineNum":"  133","line":""},
{"lineNum":"  134","line":"    try (DumpTestCase(Function, .Function){","class":"linePartCov","hits":"1","order":"647","possible_hits":"2",},
{"lineNum":"  135","line":"        .value = Function.new(false, \"aFunction\", nodes[1], args, nodes[2]),","class":"lineCov","hits":"1","order":"622","possible_hits":"1",},
{"lineNum":"  136","line":"        .expected =","class":"lineCov","hits":"1","order":"630","possible_hits":"1",},
{"lineNum":"  137","line":"        \\\\Function: aFunction"},
{"lineNum":"  138","line":"        \\\\  TypeName Node (2:1)"},
{"lineNum":"  139","line":"        \\\\    TypeName: \"number\""},
{"lineNum":"  140","line":"        \\\\Arguments:"},
{"lineNum":"  141","line":"        \\\\  \'anArg\'"},
{"lineNum":"  142","line":"        \\\\    TypeName Node (1:1)"},
{"lineNum":"  143","line":"        \\\\      TypeName: \"number\""},
{"lineNum":"  144","line":"        \\\\Body:"},
{"lineNum":"  145","line":"        \\\\  Int Node (3:1)"},
{"lineNum":"  146","line":"        \\\\    Int: \"1\""},
{"lineNum":"  147","line":"        \\\\"},
{"lineNum":"  148","line":"        ,"},
{"lineNum":"  149","line":"    }).run();","class":"lineCov","hits":"1","order":"631","possible_hits":"1",},
{"lineNum":"  150","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-03 20:52:17", "instrumented" : 55, "covered" : 55,};
var merged_data = [];
