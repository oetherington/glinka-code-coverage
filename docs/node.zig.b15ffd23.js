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
{"lineNum":"   27","line":"const Type = @import(\"types/type.zig\").Type;"},
{"lineNum":"   28","line":"const allocate = @import(\"allocate.zig\");"},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"const putInd = @import(\"node_data/indenter.zig\").putInd;"},
{"lineNum":"   31","line":"const DumpTestCase = @import(\"node_data/dump_test_case.zig\").DumpTestCase;"},
{"lineNum":"   32","line":""},
{"lineNum":"   33","line":"pub const NodeList = std.ArrayListUnmanaged(Node);"},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"const objectImp = @import(\"node_data/object.zig\");"},
{"lineNum":"   36","line":"pub const Object = objectImp.Object;"},
{"lineNum":"   37","line":"pub const ObjectProperty = objectImp.ObjectProperty;"},
{"lineNum":"   38","line":""},
{"lineNum":"   39","line":"const interface = @import(\"node_data/interface.zig\");"},
{"lineNum":"   40","line":"pub const InterfaceTypeMember = interface.InterfaceTypeMember;"},
{"lineNum":"   41","line":"pub const InterfaceTypeMemberList = interface.InterfaceTypeMemberList;"},
{"lineNum":"   42","line":"pub const InterfaceType = interface.InterfaceType;"},
{"lineNum":"   43","line":""},
{"lineNum":"   44","line":"pub const Decl = @import(\"node_data/decl.zig\").Decl;"},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"pub const UnaryOp = @import(\"node_data/unary_op.zig\").UnaryOp;"},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"pub const BinaryOp = @import(\"node_data/binary_op.zig\").BinaryOp;"},
{"lineNum":"   49","line":""},
{"lineNum":"   50","line":"pub const Ternary = @import(\"node_data/ternary.zig\").Ternary;"},
{"lineNum":"   51","line":""},
{"lineNum":"   52","line":"pub const Alias = @import(\"node_data/alias.zig\").Alias;"},
{"lineNum":"   53","line":""},
{"lineNum":"   54","line":"pub const Function = @import(\"node_data/function.zig\").Function;"},
{"lineNum":"   55","line":""},
{"lineNum":"   56","line":"pub const If = @import(\"node_data/if.zig\").If;"},
{"lineNum":"   57","line":""},
{"lineNum":"   58","line":"pub const For = @import(\"node_data/for.zig\").For;"},
{"lineNum":"   59","line":""},
{"lineNum":"   60","line":"pub const While = @import(\"node_data/while.zig\").While;"},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"pub const Do = @import(\"node_data/do.zig\").Do;"},
{"lineNum":"   63","line":""},
{"lineNum":"   64","line":"pub const Labelled = @import(\"node_data/labelled.zig\").Labelled;"},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"pub const Try = @import(\"node_data/try.zig\").Try;"},
{"lineNum":"   67","line":""},
{"lineNum":"   68","line":"pub const Switch = @import(\"node_data/switch.zig\").Switch;"},
{"lineNum":"   69","line":""},
{"lineNum":"   70","line":"pub const Dot = @import(\"node_data/dot.zig\").Dot;"},
{"lineNum":"   71","line":""},
{"lineNum":"   72","line":"pub const ArrayAccess = @import(\"node_data/array_access.zig\").ArrayAccess;"},
{"lineNum":"   73","line":""},
{"lineNum":"   74","line":"pub const Call = @import(\"node_data/call.zig\").Call;"},
{"lineNum":"   75","line":""},
{"lineNum":"   76","line":"pub const NodeType = enum {"},
{"lineNum":"   77","line":"    EOF,"},
{"lineNum":"   78","line":"    Program,"},
{"lineNum":"   79","line":"    Decl,"},
{"lineNum":"   80","line":"    Int,"},
{"lineNum":"   81","line":"    Float,"},
{"lineNum":"   82","line":"    Ident,"},
{"lineNum":"   83","line":"    String,"},
{"lineNum":"   84","line":"    Template,"},
{"lineNum":"   85","line":"    Comma,"},
{"lineNum":"   86","line":"    Array,"},
{"lineNum":"   87","line":"    Object,"},
{"lineNum":"   88","line":"    True,"},
{"lineNum":"   89","line":"    False,"},
{"lineNum":"   90","line":"    Null,"},
{"lineNum":"   91","line":"    Undefined,"},
{"lineNum":"   92","line":"    PostfixOp,"},
{"lineNum":"   93","line":"    PrefixOp,"},
{"lineNum":"   94","line":"    BinaryOp,"},
{"lineNum":"   95","line":"    Ternary,"},
{"lineNum":"   96","line":"    TypeName,"},
{"lineNum":"   97","line":"    UnionType,"},
{"lineNum":"   98","line":"    ArrayType,"},
{"lineNum":"   99","line":"    InterfaceType,"},
{"lineNum":"  100","line":"    Alias,"},
{"lineNum":"  101","line":"    Function,"},
{"lineNum":"  102","line":"    Block,"},
{"lineNum":"  103","line":"    If,"},
{"lineNum":"  104","line":"    Switch,"},
{"lineNum":"  105","line":"    For,"},
{"lineNum":"  106","line":"    While,"},
{"lineNum":"  107","line":"    Do,"},
{"lineNum":"  108","line":"    Return,"},
{"lineNum":"  109","line":"    Break,"},
{"lineNum":"  110","line":"    Continue,"},
{"lineNum":"  111","line":"    Throw,"},
{"lineNum":"  112","line":"    Labelled,"},
{"lineNum":"  113","line":"    Try,"},
{"lineNum":"  114","line":"    Dot,"},
{"lineNum":"  115","line":"    ArrayAccess,"},
{"lineNum":"  116","line":"    Call,"},
{"lineNum":"  117","line":"};"},
{"lineNum":"  118","line":""},
{"lineNum":"  119","line":"pub const NodeData = union(NodeType) {"},
{"lineNum":"  120","line":"    EOF: void,"},
{"lineNum":"  121","line":"    Program: NodeList,"},
{"lineNum":"  122","line":"    Decl: Decl,"},
{"lineNum":"  123","line":"    Int: []const u8,"},
{"lineNum":"  124","line":"    Float: []const u8,"},
{"lineNum":"  125","line":"    Ident: []const u8,"},
{"lineNum":"  126","line":"    String: []const u8,"},
{"lineNum":"  127","line":"    Template: []const u8,"},
{"lineNum":"  128","line":"    Comma: NodeList,"},
{"lineNum":"  129","line":"    Array: NodeList,"},
{"lineNum":"  130","line":"    Object: Object,"},
{"lineNum":"  131","line":"    True: void,"},
{"lineNum":"  132","line":"    False: void,"},
{"lineNum":"  133","line":"    Null: void,"},
{"lineNum":"  134","line":"    Undefined: void,"},
{"lineNum":"  135","line":"    PostfixOp: UnaryOp,"},
{"lineNum":"  136","line":"    PrefixOp: UnaryOp,"},
{"lineNum":"  137","line":"    BinaryOp: BinaryOp,"},
{"lineNum":"  138","line":"    Ternary: Ternary,"},
{"lineNum":"  139","line":"    TypeName: []const u8,"},
{"lineNum":"  140","line":"    UnionType: NodeList,"},
{"lineNum":"  141","line":"    ArrayType: Node,"},
{"lineNum":"  142","line":"    InterfaceType: InterfaceType,"},
{"lineNum":"  143","line":"    Alias: Alias,"},
{"lineNum":"  144","line":"    Function: Function,"},
{"lineNum":"  145","line":"    Block: NodeList,"},
{"lineNum":"  146","line":"    If: If,"},
{"lineNum":"  147","line":"    Switch: Switch,"},
{"lineNum":"  148","line":"    For: For,"},
{"lineNum":"  149","line":"    While: While,"},
{"lineNum":"  150","line":"    Do: Do,"},
{"lineNum":"  151","line":"    Return: ?Node,"},
{"lineNum":"  152","line":"    Break: ?[]const u8,"},
{"lineNum":"  153","line":"    Continue: ?[]const u8,"},
{"lineNum":"  154","line":"    Throw: Node,"},
{"lineNum":"  155","line":"    Labelled: Labelled,"},
{"lineNum":"  156","line":"    Try: Try,"},
{"lineNum":"  157","line":"    Dot: Dot,"},
{"lineNum":"  158","line":"    ArrayAccess: ArrayAccess,"},
{"lineNum":"  159","line":"    Call: Call,"},
{"lineNum":"  160","line":""},
{"lineNum":"  161","line":"    pub fn dump(","class":"linePartCov","hits":"1","order":"832","possible_hits":"2",},
{"lineNum":"  162","line":"        self: NodeData,"},
{"lineNum":"  163","line":"        writer: anytype,"},
{"lineNum":"  164","line":"        indent: usize,"},
{"lineNum":"  165","line":"    ) anyerror!void {","class":"linePartCov","hits":"1","order":"854","possible_hits":"2",},
{"lineNum":"  166","line":"        switch (self) {","class":"linePartCov","hits":"1","order":"833","possible_hits":"4",},
{"lineNum":"  167","line":"            .Decl => |decl| try decl.dump(writer, indent),","class":"linePartCov","hits":"1","order":"961","possible_hits":"2",},
{"lineNum":"  168","line":"            .Int,"},
{"lineNum":"  169","line":"            .Float,"},
{"lineNum":"  170","line":"            .TypeName,"},
{"lineNum":"  171","line":"            .Ident,"},
{"lineNum":"  172","line":"            .String,"},
{"lineNum":"  173","line":"            .Template,"},
{"lineNum":"  174","line":"            => |s| try putInd(","class":"linePartCov","hits":"2","order":"850","possible_hits":"4",},
{"lineNum":"  175","line":"                writer,","class":"linePartCov","hits":"1","order":"851","possible_hits":"2",},
{"lineNum":"  176","line":"                indent,","class":"linePartCov","hits":"1","order":"852","possible_hits":"2",},
{"lineNum":"  177","line":"                \"{s}: \\\"{s}\\\"\\n\","},
{"lineNum":"  178","line":"                .{ @tagName(self), s },","class":"linePartCov","hits":"1","order":"853","possible_hits":"2",},
{"lineNum":"  179","line":"            ),"},
{"lineNum":"  180","line":"            .Program, .Comma, .UnionType, .Array, .Block => |list| {","class":"linePartCov","hits":"1","order":"834","possible_hits":"2",},
{"lineNum":"  181","line":"                try putInd(writer, indent, \"{s}\\n\", .{@tagName(self)});","class":"linePartCov","hits":"1","order":"835","possible_hits":"2",},
{"lineNum":"  182","line":"                for (list.items) |item|","class":"linePartCov","hits":"2","order":"841","possible_hits":"4",},
{"lineNum":"  183","line":"                    try item.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"842","possible_hits":"4",},
{"lineNum":"  184","line":"            },"},
{"lineNum":"  185","line":"            .Object => |object| {","class":"linePartCov","hits":"1","order":"1020","possible_hits":"2",},
{"lineNum":"  186","line":"                try putInd(writer, indent, \"Object\\n\", .{});","class":"linePartCov","hits":"1","order":"1021","possible_hits":"2",},
{"lineNum":"  187","line":"                for (object.items) |item|","class":"linePartCov","hits":"2","order":"1022","possible_hits":"4",},
{"lineNum":"  188","line":"                    try item.dump(writer, indent + 2);","class":"linePartCov","hits":"1","order":"1023","possible_hits":"4",},
{"lineNum":"  189","line":"            },"},
{"lineNum":"  190","line":"            .EOF, .True, .False, .Null, .Undefined => try putInd(","class":"linePartCov","hits":"1","order":"867","possible_hits":"2",},
{"lineNum":"  191","line":"                writer,","class":"linePartCov","hits":"1","order":"864","possible_hits":"2",},
{"lineNum":"  192","line":"                indent,","class":"linePartCov","hits":"1","order":"865","possible_hits":"2",},
{"lineNum":"  193","line":"                \"{s}\\n\","},
{"lineNum":"  194","line":"                .{@tagName(self)},","class":"linePartCov","hits":"1","order":"866","possible_hits":"2",},
{"lineNum":"  195","line":"            ),"},
{"lineNum":"  196","line":"            .PostfixOp, .PrefixOp => |unaryOp| {","class":"linePartCov","hits":"1","order":"1041","possible_hits":"2",},
{"lineNum":"  197","line":"                try putInd(writer, indent, \"{s}\\n\", .{@tagName(self)});","class":"linePartCov","hits":"1","order":"1042","possible_hits":"2",},
{"lineNum":"  198","line":"                try unaryOp.dump(writer, indent + 2);","class":"linePartCov","hits":"1","order":"1043","possible_hits":"4",},
{"lineNum":"  199","line":"            },"},
{"lineNum":"  200","line":"            .Return => |ret| {","class":"linePartCov","hits":"1","order":"874","possible_hits":"2",},
{"lineNum":"  201","line":"                try putInd(writer, indent, \"Return\\n\", .{});","class":"linePartCov","hits":"1","order":"875","possible_hits":"2",},
{"lineNum":"  202","line":"                if (ret) |expr|","class":"linePartCov","hits":"2","order":"876","possible_hits":"4",},
{"lineNum":"  203","line":"                    try expr.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"877","possible_hits":"4",},
{"lineNum":"  204","line":"            },"},
{"lineNum":"  205","line":"            .Break, .Continue => |label| try putInd(","class":"linePartCov","hits":"2","order":"882","possible_hits":"4",},
{"lineNum":"  206","line":"                writer,","class":"linePartCov","hits":"1","order":"883","possible_hits":"2",},
{"lineNum":"  207","line":"                indent,","class":"linePartCov","hits":"1","order":"884","possible_hits":"2",},
{"lineNum":"  208","line":"                \"{s} \\\"{s}\\\"\\n\","},
{"lineNum":"  209","line":"                .{ @tagName(self), if (label) |l| l else \"\" },","class":"linePartCov","hits":"1","order":"885","possible_hits":"2",},
{"lineNum":"  210","line":"            ),"},
{"lineNum":"  211","line":"            .ArrayType, .Throw => |nd| {","class":"linePartCov","hits":"1","order":"892","possible_hits":"2",},
{"lineNum":"  212","line":"                try putInd(writer, indent, \"{s}\\n\", .{@tagName(self)});","class":"linePartCov","hits":"1","order":"893","possible_hits":"2",},
{"lineNum":"  213","line":"                try nd.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"894","possible_hits":"4",},
{"lineNum":"  214","line":"            },"},
{"lineNum":"  215","line":"            .InterfaceType => |objTy| {","class":"linePartCov","hits":"1","order":"1131","possible_hits":"2",},
{"lineNum":"  216","line":"                try putInd(","class":"linePartCov","hits":"1","order":"1135","possible_hits":"2",},
{"lineNum":"  217","line":"                    writer,","class":"linePartCov","hits":"1","order":"1132","possible_hits":"2",},
{"lineNum":"  218","line":"                    indent,","class":"linePartCov","hits":"1","order":"1133","possible_hits":"2",},
{"lineNum":"  219","line":"                    \"InterfaceType {s}\\n\","},
{"lineNum":"  220","line":"                    .{if (objTy.name) |name| name else \"\"},","class":"linePartCov","hits":"1","order":"1134","possible_hits":"2",},
{"lineNum":"  221","line":"                );"},
{"lineNum":"  222","line":"                for (objTy.members.items) |member|","class":"linePartCov","hits":"2","order":"1136","possible_hits":"4",},
{"lineNum":"  223","line":"                    try member.dump(writer, indent + 2);","class":"linePartCov","hits":"1","order":"1137","possible_hits":"4",},
{"lineNum":"  224","line":"            },"},
{"lineNum":"  225","line":"            .BinaryOp => |binaryOp| try binaryOp.dump(writer, indent),","class":"linePartCov","hits":"1","order":"1068","possible_hits":"2",},
{"lineNum":"  226","line":"            .Ternary => |ternary| try ternary.dump(writer, indent),","class":"linePartCov","hits":"1","order":"1089","possible_hits":"2",},
{"lineNum":"  227","line":"            .Alias => |alias| try alias.dump(writer, indent),","class":"linePartCov","hits":"1","order":"1154","possible_hits":"2",},
{"lineNum":"  228","line":"            .Function => |func| try func.dump(writer, indent),","class":"linePartCov","hits":"1","order":"1198","possible_hits":"2",},
{"lineNum":"  229","line":"            .If => |stmt| try stmt.dump(writer, indent),","class":"linePartCov","hits":"1","order":"1253","possible_hits":"2",},
{"lineNum":"  230","line":"            .Switch => |stmt| try stmt.dump(writer, indent),","class":"linePartCov","hits":"1","order":"1312","possible_hits":"2",},
{"lineNum":"  231","line":"            .For => |loop| try loop.dump(writer, indent),","class":"linePartCov","hits":"1","order":"1353","possible_hits":"2",},
{"lineNum":"  232","line":"            .While => |loop| try loop.dump(writer, indent),","class":"linePartCov","hits":"1","order":"1403","possible_hits":"2",},
{"lineNum":"  233","line":"            .Do => |loop| try loop.dump(writer, indent),","class":"linePartCov","hits":"1","order":"1424","possible_hits":"2",},
{"lineNum":"  234","line":"            .Try => |t| try t.dump(writer, indent),","class":"linePartCov","hits":"1","order":"1486","possible_hits":"2",},
{"lineNum":"  235","line":"            .ArrayAccess => |aa| try aa.dump(writer, indent),","class":"linePartCov","hits":"1","order":"1526","possible_hits":"2",},
{"lineNum":"  236","line":"            .Dot => |dot| try dot.dump(writer, indent),","class":"linePartCov","hits":"1","order":"1509","possible_hits":"2",},
{"lineNum":"  237","line":"            .Call => |call| try call.dump(writer, indent),","class":"linePartCov","hits":"1","order":"1545","possible_hits":"2",},
{"lineNum":"  238","line":"            .Labelled => |labelled| try labelled.dump(writer, indent),","class":"linePartCov","hits":"1","order":"1444","possible_hits":"2",},
{"lineNum":"  239","line":"        }"},
{"lineNum":"  240","line":"    }"},
{"lineNum":"  241","line":""},
{"lineNum":"  242","line":"    pub fn getType(self: NodeData) NodeType {","class":"lineCov","hits":"1","order":"3419","possible_hits":"1",},
{"lineNum":"  243","line":"        return @as(NodeType, self);","class":"lineCov","hits":"1","order":"3420","possible_hits":"1",},
{"lineNum":"  244","line":"    }"},
{"lineNum":"  245","line":"};"},
{"lineNum":"  246","line":""},
{"lineNum":"  247","line":"test \"can dump Nodes with NodeList data\" {","class":"lineCov","hits":"3","order":"823","possible_hits":"3",},
{"lineNum":"  248","line":"    const node = makeNode(std.testing.allocator, Cursor.new(1, 1), .Int, \"1\");","class":"lineCov","hits":"1","order":"824","possible_hits":"1",},
{"lineNum":"  249","line":"    defer std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"861","possible_hits":"2",},
{"lineNum":"  250","line":""},
{"lineNum":"  251","line":"    try (DumpTestCase(NodeList, .Program){","class":"linePartCov","hits":"1","order":"860","possible_hits":"2",},
{"lineNum":"  252","line":"        .value = NodeList{ .items = &[_]Node{node} },","class":"lineCov","hits":"1","order":"825","possible_hits":"1",},
{"lineNum":"  253","line":"        .expected =","class":"lineCov","hits":"1","order":"826","possible_hits":"1",},
{"lineNum":"  254","line":"        \\\\Program"},
{"lineNum":"  255","line":"        \\\\  Int Node (1:1)"},
{"lineNum":"  256","line":"        \\\\    Int: \"1\""},
{"lineNum":"  257","line":"        \\\\"},
{"lineNum":"  258","line":"        ,"},
{"lineNum":"  259","line":"    }).run();","class":"lineCov","hits":"1","order":"827","possible_hits":"1",},
{"lineNum":"  260","line":"}"},
{"lineNum":"  261","line":""},
{"lineNum":"  262","line":"test \"can dump Nodes with void data\" {","class":"lineCov","hits":"2","order":"862","possible_hits":"2",},
{"lineNum":"  263","line":"    try (DumpTestCase(void, .True){","class":"lineCov","hits":"1","order":"868","possible_hits":"1",},
{"lineNum":"  264","line":"        .value = {},"},
{"lineNum":"  265","line":"        .expected = \"True\\n\","},
{"lineNum":"  266","line":"    }).run();","class":"lineCov","hits":"1","order":"863","possible_hits":"1",},
{"lineNum":"  267","line":"}"},
{"lineNum":"  268","line":""},
{"lineNum":"  269","line":"test \"can dump Nodes with ?Node data\" {","class":"lineCov","hits":"3","order":"869","possible_hits":"3",},
{"lineNum":"  270","line":"    const node = makeNode(std.testing.allocator, Cursor.new(1, 1), .Int, \"1\");","class":"lineCov","hits":"1","order":"870","possible_hits":"1",},
{"lineNum":"  271","line":"    defer std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"879","possible_hits":"2",},
{"lineNum":"  272","line":""},
{"lineNum":"  273","line":"    try (DumpTestCase(?Node, .Return){","class":"linePartCov","hits":"1","order":"878","possible_hits":"2",},
{"lineNum":"  274","line":"        .value = node,","class":"lineCov","hits":"1","order":"871","possible_hits":"1",},
{"lineNum":"  275","line":"        .expected =","class":"lineCov","hits":"1","order":"872","possible_hits":"1",},
{"lineNum":"  276","line":"        \\\\Return"},
{"lineNum":"  277","line":"        \\\\  Int Node (1:1)"},
{"lineNum":"  278","line":"        \\\\    Int: \"1\""},
{"lineNum":"  279","line":"        \\\\"},
{"lineNum":"  280","line":"        ,"},
{"lineNum":"  281","line":"    }).run();","class":"lineCov","hits":"1","order":"873","possible_hits":"1",},
{"lineNum":"  282","line":"}"},
{"lineNum":"  283","line":""},
{"lineNum":"  284","line":"test \"can dump Nodes with ?[]const u8 data\" {","class":"lineCov","hits":"2","order":"880","possible_hits":"2",},
{"lineNum":"  285","line":"    try (DumpTestCase(?[]const u8, .Break){","class":"lineCov","hits":"1","order":"886","possible_hits":"1",},
{"lineNum":"  286","line":"        .value = \"aLabel\","},
{"lineNum":"  287","line":"        .expected = \"Break \\\"aLabel\\\"\\n\","},
{"lineNum":"  288","line":"    }).run();","class":"lineCov","hits":"1","order":"881","possible_hits":"1",},
{"lineNum":"  289","line":"}"},
{"lineNum":"  290","line":""},
{"lineNum":"  291","line":"test \"can dump Nodes with Node data\" {","class":"lineCov","hits":"3","order":"887","possible_hits":"3",},
{"lineNum":"  292","line":"    const node = makeNode(std.testing.allocator, Cursor.new(1, 1), .Int, \"1\");","class":"lineCov","hits":"1","order":"888","possible_hits":"1",},
{"lineNum":"  293","line":"    defer std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"896","possible_hits":"2",},
{"lineNum":"  294","line":""},
{"lineNum":"  295","line":"    try (DumpTestCase(Node, .ArrayType){","class":"linePartCov","hits":"1","order":"895","possible_hits":"2",},
{"lineNum":"  296","line":"        .value = node,","class":"lineCov","hits":"1","order":"889","possible_hits":"1",},
{"lineNum":"  297","line":"        .expected =","class":"lineCov","hits":"1","order":"890","possible_hits":"1",},
{"lineNum":"  298","line":"        \\\\ArrayType"},
{"lineNum":"  299","line":"        \\\\  Int Node (1:1)"},
{"lineNum":"  300","line":"        \\\\    Int: \"1\""},
{"lineNum":"  301","line":"        \\\\"},
{"lineNum":"  302","line":"        ,"},
{"lineNum":"  303","line":"    }).run();","class":"lineCov","hits":"1","order":"891","possible_hits":"1",},
{"lineNum":"  304","line":"}"},
{"lineNum":"  305","line":""},
{"lineNum":"  306","line":"pub const NodeImpl = struct {"},
{"lineNum":"  307","line":"    csr: Cursor,"},
{"lineNum":"  308","line":"    data: NodeData,"},
{"lineNum":"  309","line":"    ty: ?Type.Ptr = null,"},
{"lineNum":"  310","line":""},
{"lineNum":"  311","line":"    pub fn getType(self: Node) NodeType {","class":"lineCov","hits":"1","order":"902","possible_hits":"1",},
{"lineNum":"  312","line":"        return @as(NodeType, self.data);","class":"lineCov","hits":"1","order":"903","possible_hits":"1",},
{"lineNum":"  313","line":"    }"},
{"lineNum":"  314","line":""},
{"lineNum":"  315","line":"    pub fn eql(self: Node, other: ?Node) bool {","class":"lineCov","hits":"1","order":"918","possible_hits":"1",},
{"lineNum":"  316","line":"        if (other) |n|","class":"lineCov","hits":"2","order":"919","possible_hits":"2",},
{"lineNum":"  317","line":"            return genericEql.eql(self.*, n.*);","class":"lineCov","hits":"1","order":"920","possible_hits":"1",},
{"lineNum":"  318","line":"        return false;","class":"lineCov","hits":"1","order":"931","possible_hits":"1",},
{"lineNum":"  319","line":"    }"},
{"lineNum":"  320","line":""},
{"lineNum":"  321","line":"    pub fn dump(self: Node) void {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  322","line":"        const writer = std.io.getStdOut().writer();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  323","line":"        self.dumpIndented(writer, 0) catch unreachable;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  324","line":"    }"},
{"lineNum":"  325","line":""},
{"lineNum":"  326","line":"    pub fn dumpIndented(","class":"linePartCov","hits":"1","order":"843","possible_hits":"2",},
{"lineNum":"  327","line":"        self: Node,"},
{"lineNum":"  328","line":"        writer: anytype,"},
{"lineNum":"  329","line":"        indent: usize,"},
{"lineNum":"  330","line":"    ) !void {","class":"linePartCov","hits":"1","order":"855","possible_hits":"2",},
{"lineNum":"  331","line":"        try putInd(writer, indent, \"{s} Node ({d}:{d})\\n\", .{","class":"linePartCov","hits":"2","order":"844","possible_hits":"4",},
{"lineNum":"  332","line":"            @tagName(self.data),","class":"linePartCov","hits":"1","order":"845","possible_hits":"2",},
{"lineNum":"  333","line":"            self.csr.ln,","class":"linePartCov","hits":"1","order":"846","possible_hits":"2",},
{"lineNum":"  334","line":"            self.csr.ch,","class":"linePartCov","hits":"1","order":"847","possible_hits":"2",},
{"lineNum":"  335","line":"        });"},
{"lineNum":"  336","line":""},
{"lineNum":"  337","line":"        try self.data.dump(writer, indent + 2);","class":"linePartCov","hits":"1","order":"849","possible_hits":"4",},
{"lineNum":"  338","line":"    }"},
{"lineNum":"  339","line":"};"},
{"lineNum":"  340","line":""},
{"lineNum":"  341","line":"pub const Node = *NodeImpl;"},
{"lineNum":"  342","line":""},
{"lineNum":"  343","line":"pub fn makeNode(","class":"lineCov","hits":"76","order":"740","possible_hits":"76",},
{"lineNum":"  344","line":"    alloc: Allocator,"},
{"lineNum":"  345","line":"    csr: Cursor,"},
{"lineNum":"  346","line":"    comptime ty: NodeType,"},
{"lineNum":"  347","line":"    data: anytype,"},
{"lineNum":"  348","line":") Node {"},
{"lineNum":"  349","line":"    var n = allocate.create(alloc, NodeImpl);","class":"lineCov","hits":"76","order":"741","possible_hits":"76",},
{"lineNum":"  350","line":"    n.csr = csr;","class":"lineCov","hits":"76","order":"742","possible_hits":"76",},
{"lineNum":"  351","line":"    n.data = @unionInit(NodeData, @tagName(ty), data);","class":"lineCov","hits":"76","order":"743","possible_hits":"76",},
{"lineNum":"  352","line":"    return n;","class":"lineCov","hits":"76","order":"744","possible_hits":"76",},
{"lineNum":"  353","line":"}"},
{"lineNum":"  354","line":""},
{"lineNum":"  355","line":"test \"can generically initialize Nodes with makeNode\" {","class":"lineCov","hits":"3","order":"897","possible_hits":"3",},
{"lineNum":"  356","line":"    const name = \"aVariableName\";"},
{"lineNum":"  357","line":"    const node = makeNode(","class":"lineCov","hits":"1","order":"900","possible_hits":"1",},
{"lineNum":"  358","line":"        std.testing.allocator,"},
{"lineNum":"  359","line":"        Cursor.new(0, 0),","class":"lineCov","hits":"1","order":"898","possible_hits":"1",},
{"lineNum":"  360","line":"        NodeType.Decl,"},
{"lineNum":"  361","line":"        Decl.new(.Var, name, null, null),","class":"lineCov","hits":"1","order":"899","possible_hits":"1",},
{"lineNum":"  362","line":"    );"},
{"lineNum":"  363","line":"    defer std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"906","possible_hits":"4",},
{"lineNum":"  364","line":"    try expectEqual(node.getType(), NodeType.Decl);","class":"linePartCov","hits":"1","order":"901","possible_hits":"2",},
{"lineNum":"  365","line":"    try expectEqual(node.data.Decl.scoping, .Var);","class":"linePartCov","hits":"2","order":"904","possible_hits":"3",},
{"lineNum":"  366","line":"    try expectEqualStrings(name, node.data.Decl.name);","class":"linePartCov","hits":"2","order":"905","possible_hits":"3",},
{"lineNum":"  367","line":"}"},
{"lineNum":"  368","line":""},
{"lineNum":"  369","line":"test \"can compare Nodes for equality\" {","class":"lineCov","hits":"3","order":"907","possible_hits":"3",},
{"lineNum":"  370","line":"    const name = \"aVarName\";"},
{"lineNum":"  371","line":""},
{"lineNum":"  372","line":"    const a = makeNode(","class":"lineCov","hits":"1","order":"910","possible_hits":"1",},
{"lineNum":"  373","line":"        std.testing.allocator,"},
{"lineNum":"  374","line":"        Cursor.new(0, 0),","class":"lineCov","hits":"1","order":"908","possible_hits":"1",},
{"lineNum":"  375","line":"        NodeType.Decl,"},
{"lineNum":"  376","line":"        Decl.new(.Var, name, null, null),","class":"lineCov","hits":"1","order":"909","possible_hits":"1",},
{"lineNum":"  377","line":"    );"},
{"lineNum":"  378","line":""},
{"lineNum":"  379","line":"    const b = makeNode(","class":"lineCov","hits":"1","order":"913","possible_hits":"1",},
{"lineNum":"  380","line":"        std.testing.allocator,"},
{"lineNum":"  381","line":"        Cursor.new(0, 0),","class":"lineCov","hits":"1","order":"911","possible_hits":"1",},
{"lineNum":"  382","line":"        NodeType.Decl,"},
{"lineNum":"  383","line":"        Decl.new(.Var, name, null, null),","class":"lineCov","hits":"1","order":"912","possible_hits":"1",},
{"lineNum":"  384","line":"    );"},
{"lineNum":"  385","line":""},
{"lineNum":"  386","line":"    const c = makeNode(","class":"lineCov","hits":"1","order":"916","possible_hits":"1",},
{"lineNum":"  387","line":"        std.testing.allocator,"},
{"lineNum":"  388","line":"        Cursor.new(1, 1),","class":"lineCov","hits":"1","order":"914","possible_hits":"1",},
{"lineNum":"  389","line":"        NodeType.Decl,"},
{"lineNum":"  390","line":"        Decl.new(.Var, name, null, null),","class":"lineCov","hits":"1","order":"915","possible_hits":"1",},
{"lineNum":"  391","line":"    );"},
{"lineNum":"  392","line":""},
{"lineNum":"  393","line":"    defer std.testing.allocator.destroy(a);","class":"linePartCov","hits":"1","order":"934","possible_hits":"6",},
{"lineNum":"  394","line":"    defer std.testing.allocator.destroy(b);","class":"linePartCov","hits":"1","order":"933","possible_hits":"6",},
{"lineNum":"  395","line":"    defer std.testing.allocator.destroy(c);","class":"linePartCov","hits":"1","order":"932","possible_hits":"6",},
{"lineNum":"  396","line":""},
{"lineNum":"  397","line":"    try expect(a.eql(b));","class":"linePartCov","hits":"1","order":"917","possible_hits":"2",},
{"lineNum":"  398","line":"    try expect(b.eql(a));","class":"linePartCov","hits":"1","order":"927","possible_hits":"2",},
{"lineNum":"  399","line":"    try expect(!a.eql(c));","class":"linePartCov","hits":"1","order":"928","possible_hits":"2",},
{"lineNum":"  400","line":"    try expect(!b.eql(c));","class":"linePartCov","hits":"1","order":"929","possible_hits":"2",},
{"lineNum":"  401","line":"    try expect(!a.eql(null));","class":"linePartCov","hits":"1","order":"930","possible_hits":"2",},
{"lineNum":"  402","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-13 17:55:07", "instrumented" : 131, "covered" : 128,};
var merged_data = [];
