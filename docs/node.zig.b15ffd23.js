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
{"lineNum":"   22","line":"const expectError = std.testing.expectError;"},
{"lineNum":"   23","line":"const Allocator = std.mem.Allocator;"},
{"lineNum":"   24","line":"const Token = @import(\"token.zig\").Token;"},
{"lineNum":"   25","line":"const Cursor = @import(\"cursor.zig\").Cursor;"},
{"lineNum":"   26","line":"const genericEql = @import(\"generic_eql.zig\");"},
{"lineNum":"   27","line":"const WriteContext = @import(\"writer.zig\").WriteContext;"},
{"lineNum":"   28","line":"const Type = @import(\"types/type.zig\").Type;"},
{"lineNum":"   29","line":"const allocate = @import(\"allocate.zig\");"},
{"lineNum":"   30","line":""},
{"lineNum":"   31","line":"const putInd = @import(\"node_data/indenter.zig\").putInd;"},
{"lineNum":"   32","line":"const DumpTestCase = @import(\"node_data/dump_test_case.zig\").DumpTestCase;"},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"pub const NodeList = std.ArrayListUnmanaged(Node);"},
{"lineNum":"   35","line":""},
{"lineNum":"   36","line":"const objectImp = @import(\"node_data/object.zig\");"},
{"lineNum":"   37","line":"pub const Object = objectImp.Object;"},
{"lineNum":"   38","line":"pub const ObjectProperty = objectImp.ObjectProperty;"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"pub const Decl = @import(\"node_data/decl.zig\").Decl;"},
{"lineNum":"   41","line":""},
{"lineNum":"   42","line":"pub const UnaryOp = @import(\"node_data/unary_op.zig\").UnaryOp;"},
{"lineNum":"   43","line":""},
{"lineNum":"   44","line":"pub const BinaryOp = @import(\"node_data/binary_op.zig\").BinaryOp;"},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"pub const Ternary = @import(\"node_data/ternary.zig\").Ternary;"},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"pub const Alias = @import(\"node_data/alias.zig\").Alias;"},
{"lineNum":"   49","line":""},
{"lineNum":"   50","line":"pub const Function = @import(\"node_data/function.zig\").Function;"},
{"lineNum":"   51","line":""},
{"lineNum":"   52","line":"pub const If = @import(\"node_data/if.zig\").If;"},
{"lineNum":"   53","line":""},
{"lineNum":"   54","line":"pub const For = @import(\"node_data/for.zig\").For;"},
{"lineNum":"   55","line":""},
{"lineNum":"   56","line":"pub const While = @import(\"node_data/while.zig\").While;"},
{"lineNum":"   57","line":""},
{"lineNum":"   58","line":"pub const Do = @import(\"node_data/do.zig\").Do;"},
{"lineNum":"   59","line":""},
{"lineNum":"   60","line":"pub const Labelled = @import(\"node_data/labelled.zig\").Labelled;"},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"pub const Try = @import(\"node_data/try.zig\").Try;"},
{"lineNum":"   63","line":""},
{"lineNum":"   64","line":"pub const Switch = @import(\"node_data/switch.zig\").Switch;"},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"pub const Dot = @import(\"node_data/dot.zig\").Dot;"},
{"lineNum":"   67","line":""},
{"lineNum":"   68","line":"pub const ArrayAccess = @import(\"node_data/array_access.zig\").ArrayAccess;"},
{"lineNum":"   69","line":""},
{"lineNum":"   70","line":"pub const Call = @import(\"node_data/call.zig\").Call;"},
{"lineNum":"   71","line":""},
{"lineNum":"   72","line":"pub const NodeType = enum {"},
{"lineNum":"   73","line":"    EOF,"},
{"lineNum":"   74","line":"    Program,"},
{"lineNum":"   75","line":"    Decl,"},
{"lineNum":"   76","line":"    Int,"},
{"lineNum":"   77","line":"    Ident,"},
{"lineNum":"   78","line":"    String,"},
{"lineNum":"   79","line":"    Template,"},
{"lineNum":"   80","line":"    Comma,"},
{"lineNum":"   81","line":"    Array,"},
{"lineNum":"   82","line":"    Object,"},
{"lineNum":"   83","line":"    True,"},
{"lineNum":"   84","line":"    False,"},
{"lineNum":"   85","line":"    Null,"},
{"lineNum":"   86","line":"    Undefined,"},
{"lineNum":"   87","line":"    This,"},
{"lineNum":"   88","line":"    PostfixOp,"},
{"lineNum":"   89","line":"    PrefixOp,"},
{"lineNum":"   90","line":"    BinaryOp,"},
{"lineNum":"   91","line":"    Ternary,"},
{"lineNum":"   92","line":"    TypeName,"},
{"lineNum":"   93","line":"    UnionType,"},
{"lineNum":"   94","line":"    ArrayType,"},
{"lineNum":"   95","line":"    Alias,"},
{"lineNum":"   96","line":"    Function,"},
{"lineNum":"   97","line":"    Block,"},
{"lineNum":"   98","line":"    If,"},
{"lineNum":"   99","line":"    Switch,"},
{"lineNum":"  100","line":"    For,"},
{"lineNum":"  101","line":"    While,"},
{"lineNum":"  102","line":"    Do,"},
{"lineNum":"  103","line":"    Return,"},
{"lineNum":"  104","line":"    Break,"},
{"lineNum":"  105","line":"    Continue,"},
{"lineNum":"  106","line":"    Throw,"},
{"lineNum":"  107","line":"    Labelled,"},
{"lineNum":"  108","line":"    Try,"},
{"lineNum":"  109","line":"    Dot,"},
{"lineNum":"  110","line":"    ArrayAccess,"},
{"lineNum":"  111","line":"    Call,"},
{"lineNum":"  112","line":"};"},
{"lineNum":"  113","line":""},
{"lineNum":"  114","line":"pub const NodeData = union(NodeType) {"},
{"lineNum":"  115","line":"    EOF: void,"},
{"lineNum":"  116","line":"    Program: NodeList,"},
{"lineNum":"  117","line":"    Decl: Decl,"},
{"lineNum":"  118","line":"    Int: []const u8,"},
{"lineNum":"  119","line":"    Ident: []const u8,"},
{"lineNum":"  120","line":"    String: []const u8,"},
{"lineNum":"  121","line":"    Template: []const u8,"},
{"lineNum":"  122","line":"    Comma: NodeList,"},
{"lineNum":"  123","line":"    Array: NodeList,"},
{"lineNum":"  124","line":"    Object: Object,"},
{"lineNum":"  125","line":"    True: void,"},
{"lineNum":"  126","line":"    False: void,"},
{"lineNum":"  127","line":"    Null: void,"},
{"lineNum":"  128","line":"    Undefined: void,"},
{"lineNum":"  129","line":"    This: void,"},
{"lineNum":"  130","line":"    PostfixOp: UnaryOp,"},
{"lineNum":"  131","line":"    PrefixOp: UnaryOp,"},
{"lineNum":"  132","line":"    BinaryOp: BinaryOp,"},
{"lineNum":"  133","line":"    Ternary: Ternary,"},
{"lineNum":"  134","line":"    TypeName: []const u8,"},
{"lineNum":"  135","line":"    UnionType: NodeList,"},
{"lineNum":"  136","line":"    ArrayType: Node,"},
{"lineNum":"  137","line":"    Alias: Alias,"},
{"lineNum":"  138","line":"    Function: Function,"},
{"lineNum":"  139","line":"    Block: NodeList,"},
{"lineNum":"  140","line":"    If: If,"},
{"lineNum":"  141","line":"    Switch: Switch,"},
{"lineNum":"  142","line":"    For: For,"},
{"lineNum":"  143","line":"    While: While,"},
{"lineNum":"  144","line":"    Do: Do,"},
{"lineNum":"  145","line":"    Return: ?Node,"},
{"lineNum":"  146","line":"    Break: ?[]const u8,"},
{"lineNum":"  147","line":"    Continue: ?[]const u8,"},
{"lineNum":"  148","line":"    Throw: Node,"},
{"lineNum":"  149","line":"    Labelled: Labelled,"},
{"lineNum":"  150","line":"    Try: Try,"},
{"lineNum":"  151","line":"    Dot: Dot,"},
{"lineNum":"  152","line":"    ArrayAccess: ArrayAccess,"},
{"lineNum":"  153","line":"    Call: Call,"},
{"lineNum":"  154","line":""},
{"lineNum":"  155","line":"    pub fn dump(","class":"linePartCov","hits":"1","order":"745","possible_hits":"2",},
{"lineNum":"  156","line":"        self: NodeData,"},
{"lineNum":"  157","line":"        writer: anytype,"},
{"lineNum":"  158","line":"        indent: usize,"},
{"lineNum":"  159","line":"    ) anyerror!void {","class":"linePartCov","hits":"1","order":"767","possible_hits":"2",},
{"lineNum":"  160","line":"        switch (self) {","class":"linePartCov","hits":"1","order":"746","possible_hits":"4",},
{"lineNum":"  161","line":"            .Decl => |decl| try decl.dump(writer, indent),","class":"linePartCov","hits":"1","order":"887","possible_hits":"2",},
{"lineNum":"  162","line":"            .Int, .TypeName, .Ident, .String, .Template => |s| try putInd(","class":"linePartCov","hits":"2","order":"763","possible_hits":"4",},
{"lineNum":"  163","line":"                writer,","class":"linePartCov","hits":"1","order":"764","possible_hits":"2",},
{"lineNum":"  164","line":"                indent,","class":"linePartCov","hits":"1","order":"765","possible_hits":"2",},
{"lineNum":"  165","line":"                \"{s}: \\\"{s}\\\"\\n\","},
{"lineNum":"  166","line":"                .{ @tagName(self), s },","class":"linePartCov","hits":"1","order":"766","possible_hits":"2",},
{"lineNum":"  167","line":"            ),"},
{"lineNum":"  168","line":"            .Program, .Comma, .UnionType, .Array, .Block => |list| {","class":"linePartCov","hits":"1","order":"747","possible_hits":"2",},
{"lineNum":"  169","line":"                try putInd(writer, indent, \"{s}\\n\", .{@tagName(self)});","class":"linePartCov","hits":"1","order":"748","possible_hits":"2",},
{"lineNum":"  170","line":"                for (list.items) |item|","class":"linePartCov","hits":"2","order":"754","possible_hits":"4",},
{"lineNum":"  171","line":"                    try item.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"755","possible_hits":"4",},
{"lineNum":"  172","line":"            },"},
{"lineNum":"  173","line":"            .Object => |object| {","class":"linePartCov","hits":"1","order":"911","possible_hits":"2",},
{"lineNum":"  174","line":"                try putInd(writer, indent, \"Object\\n\", .{});","class":"linePartCov","hits":"1","order":"912","possible_hits":"2",},
{"lineNum":"  175","line":"                for (object.items) |item|","class":"linePartCov","hits":"2","order":"913","possible_hits":"4",},
{"lineNum":"  176","line":"                    try item.dump(writer, indent + 2);","class":"linePartCov","hits":"1","order":"914","possible_hits":"4",},
{"lineNum":"  177","line":"            },"},
{"lineNum":"  178","line":"            .EOF, .True, .False, .Null, .Undefined, .This => try putInd(","class":"linePartCov","hits":"1","order":"780","possible_hits":"2",},
{"lineNum":"  179","line":"                writer,","class":"linePartCov","hits":"1","order":"777","possible_hits":"2",},
{"lineNum":"  180","line":"                indent,","class":"linePartCov","hits":"1","order":"778","possible_hits":"2",},
{"lineNum":"  181","line":"                \"{s}\\n\","},
{"lineNum":"  182","line":"                .{@tagName(self)},","class":"linePartCov","hits":"1","order":"779","possible_hits":"2",},
{"lineNum":"  183","line":"            ),"},
{"lineNum":"  184","line":"            .PostfixOp, .PrefixOp => |unaryOp| {","class":"linePartCov","hits":"1","order":"953","possible_hits":"2",},
{"lineNum":"  185","line":"                try putInd(writer, indent, \"{s}\\n\", .{@tagName(self)});","class":"linePartCov","hits":"1","order":"954","possible_hits":"2",},
{"lineNum":"  186","line":"                try unaryOp.dump(writer, indent + 2);","class":"linePartCov","hits":"1","order":"955","possible_hits":"4",},
{"lineNum":"  187","line":"            },"},
{"lineNum":"  188","line":"            .Return => |ret| {","class":"linePartCov","hits":"1","order":"787","possible_hits":"2",},
{"lineNum":"  189","line":"                try putInd(writer, indent, \"Return\\n\", .{});","class":"linePartCov","hits":"1","order":"788","possible_hits":"2",},
{"lineNum":"  190","line":"                if (ret) |expr|","class":"linePartCov","hits":"2","order":"789","possible_hits":"4",},
{"lineNum":"  191","line":"                    try expr.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"790","possible_hits":"4",},
{"lineNum":"  192","line":"            },"},
{"lineNum":"  193","line":"            .Break, .Continue => |label| try putInd(","class":"linePartCov","hits":"2","order":"795","possible_hits":"4",},
{"lineNum":"  194","line":"                writer,","class":"linePartCov","hits":"1","order":"796","possible_hits":"2",},
{"lineNum":"  195","line":"                indent,","class":"linePartCov","hits":"1","order":"797","possible_hits":"2",},
{"lineNum":"  196","line":"                \"{s} \\\"{s}\\\"\\n\","},
{"lineNum":"  197","line":"                .{ @tagName(self), if (label) |l| l else \"\" },","class":"linePartCov","hits":"1","order":"798","possible_hits":"2",},
{"lineNum":"  198","line":"            ),"},
{"lineNum":"  199","line":"            .ArrayType, .Throw => |nd| {","class":"linePartCov","hits":"1","order":"805","possible_hits":"2",},
{"lineNum":"  200","line":"                try putInd(writer, indent, \"{s}\\n\", .{@tagName(self)});","class":"linePartCov","hits":"1","order":"806","possible_hits":"2",},
{"lineNum":"  201","line":"                try nd.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"807","possible_hits":"4",},
{"lineNum":"  202","line":"            },"},
{"lineNum":"  203","line":"            .BinaryOp => |binaryOp| try binaryOp.dump(writer, indent),","class":"linePartCov","hits":"1","order":"980","possible_hits":"2",},
{"lineNum":"  204","line":"            .Ternary => |ternary| try ternary.dump(writer, indent),","class":"linePartCov","hits":"1","order":"1001","possible_hits":"2",},
{"lineNum":"  205","line":"            .Alias => |alias| try alias.dump(writer, indent),","class":"linePartCov","hits":"1","order":"1021","possible_hits":"2",},
{"lineNum":"  206","line":"            .Function => |func| try func.dump(writer, indent),","class":"linePartCov","hits":"1","order":"1065","possible_hits":"2",},
{"lineNum":"  207","line":"            .If => |stmt| try stmt.dump(writer, indent),","class":"linePartCov","hits":"1","order":"1120","possible_hits":"2",},
{"lineNum":"  208","line":"            .Switch => |stmt| try stmt.dump(writer, indent),","class":"linePartCov","hits":"1","order":"1182","possible_hits":"2",},
{"lineNum":"  209","line":"            .For => |loop| try loop.dump(writer, indent),","class":"linePartCov","hits":"1","order":"1223","possible_hits":"2",},
{"lineNum":"  210","line":"            .While => |loop| try loop.dump(writer, indent),","class":"linePartCov","hits":"1","order":"1273","possible_hits":"2",},
{"lineNum":"  211","line":"            .Do => |loop| try loop.dump(writer, indent),","class":"linePartCov","hits":"1","order":"1294","possible_hits":"2",},
{"lineNum":"  212","line":"            .Try => |t| try t.dump(writer, indent),","class":"linePartCov","hits":"1","order":"1356","possible_hits":"2",},
{"lineNum":"  213","line":"            .ArrayAccess => |aa| try aa.dump(writer, indent),","class":"linePartCov","hits":"1","order":"1396","possible_hits":"2",},
{"lineNum":"  214","line":"            .Dot => |dot| try dot.dump(writer, indent),","class":"linePartCov","hits":"1","order":"1379","possible_hits":"2",},
{"lineNum":"  215","line":"            .Call => |call| try call.dump(writer, indent),","class":"linePartCov","hits":"1","order":"1415","possible_hits":"2",},
{"lineNum":"  216","line":"            .Labelled => |labelled| try labelled.dump(writer, indent),","class":"linePartCov","hits":"1","order":"1314","possible_hits":"2",},
{"lineNum":"  217","line":"        }"},
{"lineNum":"  218","line":"    }"},
{"lineNum":"  219","line":""},
{"lineNum":"  220","line":"    pub fn getType(self: NodeData) NodeType {","class":"lineCov","hits":"1","order":"3040","possible_hits":"1",},
{"lineNum":"  221","line":"        return @as(NodeType, self);","class":"lineCov","hits":"1","order":"3041","possible_hits":"1",},
{"lineNum":"  222","line":"    }"},
{"lineNum":"  223","line":"};"},
{"lineNum":"  224","line":""},
{"lineNum":"  225","line":"test \"can dump Nodes with NodeList data\" {","class":"lineCov","hits":"3","order":"736","possible_hits":"3",},
{"lineNum":"  226","line":"    const node = makeNode(std.testing.allocator, Cursor.new(1, 1), .Int, \"1\");","class":"lineCov","hits":"1","order":"737","possible_hits":"1",},
{"lineNum":"  227","line":"    defer std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"774","possible_hits":"2",},
{"lineNum":"  228","line":""},
{"lineNum":"  229","line":"    try (DumpTestCase(NodeList, .Program){","class":"linePartCov","hits":"1","order":"773","possible_hits":"2",},
{"lineNum":"  230","line":"        .value = NodeList{ .items = &[_]Node{node} },","class":"lineCov","hits":"1","order":"738","possible_hits":"1",},
{"lineNum":"  231","line":"        .expected =","class":"lineCov","hits":"1","order":"739","possible_hits":"1",},
{"lineNum":"  232","line":"        \\\\Program"},
{"lineNum":"  233","line":"        \\\\  Int Node (1:1)"},
{"lineNum":"  234","line":"        \\\\    Int: \"1\""},
{"lineNum":"  235","line":"        \\\\"},
{"lineNum":"  236","line":"        ,"},
{"lineNum":"  237","line":"    }).run();","class":"lineCov","hits":"1","order":"740","possible_hits":"1",},
{"lineNum":"  238","line":"}"},
{"lineNum":"  239","line":""},
{"lineNum":"  240","line":"test \"can dump Nodes with void data\" {","class":"lineCov","hits":"2","order":"775","possible_hits":"2",},
{"lineNum":"  241","line":"    try (DumpTestCase(void, .True){","class":"lineCov","hits":"1","order":"781","possible_hits":"1",},
{"lineNum":"  242","line":"        .value = {},"},
{"lineNum":"  243","line":"        .expected = \"True\\n\","},
{"lineNum":"  244","line":"    }).run();","class":"lineCov","hits":"1","order":"776","possible_hits":"1",},
{"lineNum":"  245","line":"}"},
{"lineNum":"  246","line":""},
{"lineNum":"  247","line":"test \"can dump Nodes with ?Node data\" {","class":"lineCov","hits":"3","order":"782","possible_hits":"3",},
{"lineNum":"  248","line":"    const node = makeNode(std.testing.allocator, Cursor.new(1, 1), .Int, \"1\");","class":"lineCov","hits":"1","order":"783","possible_hits":"1",},
{"lineNum":"  249","line":"    defer std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"792","possible_hits":"2",},
{"lineNum":"  250","line":""},
{"lineNum":"  251","line":"    try (DumpTestCase(?Node, .Return){","class":"linePartCov","hits":"1","order":"791","possible_hits":"2",},
{"lineNum":"  252","line":"        .value = node,","class":"lineCov","hits":"1","order":"784","possible_hits":"1",},
{"lineNum":"  253","line":"        .expected =","class":"lineCov","hits":"1","order":"785","possible_hits":"1",},
{"lineNum":"  254","line":"        \\\\Return"},
{"lineNum":"  255","line":"        \\\\  Int Node (1:1)"},
{"lineNum":"  256","line":"        \\\\    Int: \"1\""},
{"lineNum":"  257","line":"        \\\\"},
{"lineNum":"  258","line":"        ,"},
{"lineNum":"  259","line":"    }).run();","class":"lineCov","hits":"1","order":"786","possible_hits":"1",},
{"lineNum":"  260","line":"}"},
{"lineNum":"  261","line":""},
{"lineNum":"  262","line":"test \"can dump Nodes with ?[]const u8 data\" {","class":"lineCov","hits":"2","order":"793","possible_hits":"2",},
{"lineNum":"  263","line":"    try (DumpTestCase(?[]const u8, .Break){","class":"lineCov","hits":"1","order":"799","possible_hits":"1",},
{"lineNum":"  264","line":"        .value = \"aLabel\","},
{"lineNum":"  265","line":"        .expected = \"Break \\\"aLabel\\\"\\n\","},
{"lineNum":"  266","line":"    }).run();","class":"lineCov","hits":"1","order":"794","possible_hits":"1",},
{"lineNum":"  267","line":"}"},
{"lineNum":"  268","line":""},
{"lineNum":"  269","line":"test \"can dump Nodes with Node data\" {","class":"lineCov","hits":"3","order":"800","possible_hits":"3",},
{"lineNum":"  270","line":"    const node = makeNode(std.testing.allocator, Cursor.new(1, 1), .Int, \"1\");","class":"lineCov","hits":"1","order":"801","possible_hits":"1",},
{"lineNum":"  271","line":"    defer std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"809","possible_hits":"2",},
{"lineNum":"  272","line":""},
{"lineNum":"  273","line":"    try (DumpTestCase(Node, .ArrayType){","class":"linePartCov","hits":"1","order":"808","possible_hits":"2",},
{"lineNum":"  274","line":"        .value = node,","class":"lineCov","hits":"1","order":"802","possible_hits":"1",},
{"lineNum":"  275","line":"        .expected =","class":"lineCov","hits":"1","order":"803","possible_hits":"1",},
{"lineNum":"  276","line":"        \\\\ArrayType"},
{"lineNum":"  277","line":"        \\\\  Int Node (1:1)"},
{"lineNum":"  278","line":"        \\\\    Int: \"1\""},
{"lineNum":"  279","line":"        \\\\"},
{"lineNum":"  280","line":"        ,"},
{"lineNum":"  281","line":"    }).run();","class":"lineCov","hits":"1","order":"804","possible_hits":"1",},
{"lineNum":"  282","line":"}"},
{"lineNum":"  283","line":""},
{"lineNum":"  284","line":"pub const NodeImpl = struct {"},
{"lineNum":"  285","line":"    csr: Cursor,"},
{"lineNum":"  286","line":"    data: NodeData,"},
{"lineNum":"  287","line":"    ty: ?Type.Ptr = null,"},
{"lineNum":"  288","line":""},
{"lineNum":"  289","line":"    pub fn getType(self: Node) NodeType {","class":"lineCov","hits":"1","order":"815","possible_hits":"1",},
{"lineNum":"  290","line":"        return @as(NodeType, self.data);","class":"lineCov","hits":"1","order":"816","possible_hits":"1",},
{"lineNum":"  291","line":"    }"},
{"lineNum":"  292","line":""},
{"lineNum":"  293","line":"    pub fn eql(self: Node, other: ?Node) bool {","class":"lineCov","hits":"1","order":"831","possible_hits":"1",},
{"lineNum":"  294","line":"        if (other) |n|","class":"lineCov","hits":"2","order":"832","possible_hits":"2",},
{"lineNum":"  295","line":"            return genericEql.eql(self.*, n.*);","class":"lineCov","hits":"1","order":"833","possible_hits":"1",},
{"lineNum":"  296","line":"        return false;","class":"lineCov","hits":"1","order":"857","possible_hits":"1",},
{"lineNum":"  297","line":"    }"},
{"lineNum":"  298","line":""},
{"lineNum":"  299","line":"    pub fn dump(self: Node) void {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  300","line":"        const writer = std.io.getStdOut().writer();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  301","line":"        self.dumpIndented(writer, 0) catch unreachable;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  302","line":"    }"},
{"lineNum":"  303","line":""},
{"lineNum":"  304","line":"    pub fn dumpIndented(","class":"linePartCov","hits":"1","order":"756","possible_hits":"2",},
{"lineNum":"  305","line":"        self: Node,"},
{"lineNum":"  306","line":"        writer: anytype,"},
{"lineNum":"  307","line":"        indent: usize,"},
{"lineNum":"  308","line":"    ) !void {","class":"linePartCov","hits":"1","order":"768","possible_hits":"2",},
{"lineNum":"  309","line":"        try putInd(writer, indent, \"{s} Node ({d}:{d})\\n\", .{","class":"linePartCov","hits":"2","order":"757","possible_hits":"4",},
{"lineNum":"  310","line":"            @tagName(self.data),","class":"linePartCov","hits":"1","order":"758","possible_hits":"2",},
{"lineNum":"  311","line":"            self.csr.ln,","class":"linePartCov","hits":"1","order":"759","possible_hits":"2",},
{"lineNum":"  312","line":"            self.csr.ch,","class":"linePartCov","hits":"1","order":"760","possible_hits":"2",},
{"lineNum":"  313","line":"        });"},
{"lineNum":"  314","line":""},
{"lineNum":"  315","line":"        try self.data.dump(writer, indent + 2);","class":"linePartCov","hits":"1","order":"762","possible_hits":"4",},
{"lineNum":"  316","line":"    }"},
{"lineNum":"  317","line":"};"},
{"lineNum":"  318","line":""},
{"lineNum":"  319","line":"pub const Node = *NodeImpl;"},
{"lineNum":"  320","line":""},
{"lineNum":"  321","line":"pub fn makeNode(","class":"lineCov","hits":"69","order":"653","possible_hits":"69",},
{"lineNum":"  322","line":"    alloc: Allocator,"},
{"lineNum":"  323","line":"    csr: Cursor,"},
{"lineNum":"  324","line":"    comptime ty: NodeType,"},
{"lineNum":"  325","line":"    data: anytype,"},
{"lineNum":"  326","line":") Node {"},
{"lineNum":"  327","line":"    var n = allocate.create(alloc, NodeImpl);","class":"lineCov","hits":"69","order":"654","possible_hits":"69",},
{"lineNum":"  328","line":"    n.csr = csr;","class":"lineCov","hits":"69","order":"655","possible_hits":"69",},
{"lineNum":"  329","line":"    n.data = @unionInit(NodeData, @tagName(ty), data);","class":"lineCov","hits":"69","order":"656","possible_hits":"69",},
{"lineNum":"  330","line":"    return n;","class":"lineCov","hits":"69","order":"657","possible_hits":"69",},
{"lineNum":"  331","line":"}"},
{"lineNum":"  332","line":""},
{"lineNum":"  333","line":"test \"can generically initialize Nodes with makeNode\" {","class":"lineCov","hits":"3","order":"810","possible_hits":"3",},
{"lineNum":"  334","line":"    const name = \"aVariableName\";"},
{"lineNum":"  335","line":"    const node = makeNode(","class":"lineCov","hits":"1","order":"813","possible_hits":"1",},
{"lineNum":"  336","line":"        std.testing.allocator,"},
{"lineNum":"  337","line":"        Cursor.new(0, 0),","class":"lineCov","hits":"1","order":"811","possible_hits":"1",},
{"lineNum":"  338","line":"        NodeType.Decl,"},
{"lineNum":"  339","line":"        Decl.new(.Var, name, null, null),","class":"lineCov","hits":"1","order":"812","possible_hits":"1",},
{"lineNum":"  340","line":"    );"},
{"lineNum":"  341","line":"    defer std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"819","possible_hits":"4",},
{"lineNum":"  342","line":"    try expectEqual(node.getType(), NodeType.Decl);","class":"linePartCov","hits":"1","order":"814","possible_hits":"2",},
{"lineNum":"  343","line":"    try expectEqual(node.data.Decl.scoping, .Var);","class":"linePartCov","hits":"2","order":"817","possible_hits":"3",},
{"lineNum":"  344","line":"    try expectEqualStrings(name, node.data.Decl.name);","class":"linePartCov","hits":"2","order":"818","possible_hits":"3",},
{"lineNum":"  345","line":"}"},
{"lineNum":"  346","line":""},
{"lineNum":"  347","line":"test \"can compare Nodes for equality\" {","class":"lineCov","hits":"3","order":"820","possible_hits":"3",},
{"lineNum":"  348","line":"    const name = \"aVarName\";"},
{"lineNum":"  349","line":""},
{"lineNum":"  350","line":"    const a = makeNode(","class":"lineCov","hits":"1","order":"823","possible_hits":"1",},
{"lineNum":"  351","line":"        std.testing.allocator,"},
{"lineNum":"  352","line":"        Cursor.new(0, 0),","class":"lineCov","hits":"1","order":"821","possible_hits":"1",},
{"lineNum":"  353","line":"        NodeType.Decl,"},
{"lineNum":"  354","line":"        Decl.new(.Var, name, null, null),","class":"lineCov","hits":"1","order":"822","possible_hits":"1",},
{"lineNum":"  355","line":"    );"},
{"lineNum":"  356","line":""},
{"lineNum":"  357","line":"    const b = makeNode(","class":"lineCov","hits":"1","order":"826","possible_hits":"1",},
{"lineNum":"  358","line":"        std.testing.allocator,"},
{"lineNum":"  359","line":"        Cursor.new(0, 0),","class":"lineCov","hits":"1","order":"824","possible_hits":"1",},
{"lineNum":"  360","line":"        NodeType.Decl,"},
{"lineNum":"  361","line":"        Decl.new(.Var, name, null, null),","class":"lineCov","hits":"1","order":"825","possible_hits":"1",},
{"lineNum":"  362","line":"    );"},
{"lineNum":"  363","line":""},
{"lineNum":"  364","line":"    const c = makeNode(","class":"lineCov","hits":"1","order":"829","possible_hits":"1",},
{"lineNum":"  365","line":"        std.testing.allocator,"},
{"lineNum":"  366","line":"        Cursor.new(1, 1),","class":"lineCov","hits":"1","order":"827","possible_hits":"1",},
{"lineNum":"  367","line":"        NodeType.Decl,"},
{"lineNum":"  368","line":"        Decl.new(.Var, name, null, null),","class":"lineCov","hits":"1","order":"828","possible_hits":"1",},
{"lineNum":"  369","line":"    );"},
{"lineNum":"  370","line":""},
{"lineNum":"  371","line":"    defer std.testing.allocator.destroy(a);","class":"linePartCov","hits":"1","order":"860","possible_hits":"6",},
{"lineNum":"  372","line":"    defer std.testing.allocator.destroy(b);","class":"linePartCov","hits":"1","order":"859","possible_hits":"6",},
{"lineNum":"  373","line":"    defer std.testing.allocator.destroy(c);","class":"linePartCov","hits":"1","order":"858","possible_hits":"6",},
{"lineNum":"  374","line":""},
{"lineNum":"  375","line":"    try expect(a.eql(b));","class":"linePartCov","hits":"1","order":"830","possible_hits":"2",},
{"lineNum":"  376","line":"    try expect(b.eql(a));","class":"linePartCov","hits":"1","order":"853","possible_hits":"2",},
{"lineNum":"  377","line":"    try expect(!a.eql(c));","class":"linePartCov","hits":"1","order":"854","possible_hits":"2",},
{"lineNum":"  378","line":"    try expect(!b.eql(c));","class":"linePartCov","hits":"1","order":"855","possible_hits":"2",},
{"lineNum":"  379","line":"    try expect(!a.eql(null));","class":"linePartCov","hits":"1","order":"856","possible_hits":"2",},
{"lineNum":"  380","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2021-12-31 18:19:35", "instrumented" : 124, "covered" : 121,};
var merged_data = [];
