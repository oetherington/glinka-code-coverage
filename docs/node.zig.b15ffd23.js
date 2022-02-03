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
{"lineNum":"   44","line":"pub const Visibility = @import(\"visibility.zig\").Visibility;"},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"const class = @import(\"node_data/class.zig\");"},
{"lineNum":"   47","line":"pub const ClassTypeMember = class.ClassTypeMember;"},
{"lineNum":"   48","line":"pub const ClassType = class.ClassType;"},
{"lineNum":"   49","line":""},
{"lineNum":"   50","line":"pub const Decl = @import(\"node_data/decl.zig\").Decl;"},
{"lineNum":"   51","line":""},
{"lineNum":"   52","line":"pub const UnaryOp = @import(\"node_data/unary_op.zig\").UnaryOp;"},
{"lineNum":"   53","line":""},
{"lineNum":"   54","line":"pub const BinaryOp = @import(\"node_data/binary_op.zig\").BinaryOp;"},
{"lineNum":"   55","line":""},
{"lineNum":"   56","line":"pub const Ternary = @import(\"node_data/ternary.zig\").Ternary;"},
{"lineNum":"   57","line":""},
{"lineNum":"   58","line":"pub const Alias = @import(\"node_data/alias.zig\").Alias;"},
{"lineNum":"   59","line":""},
{"lineNum":"   60","line":"pub const Function = @import(\"node_data/function.zig\").Function;"},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"pub const If = @import(\"node_data/if.zig\").If;"},
{"lineNum":"   63","line":""},
{"lineNum":"   64","line":"pub const For = @import(\"node_data/for.zig\").For;"},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"pub const While = @import(\"node_data/while.zig\").While;"},
{"lineNum":"   67","line":""},
{"lineNum":"   68","line":"pub const Do = @import(\"node_data/do.zig\").Do;"},
{"lineNum":"   69","line":""},
{"lineNum":"   70","line":"pub const Labelled = @import(\"node_data/labelled.zig\").Labelled;"},
{"lineNum":"   71","line":""},
{"lineNum":"   72","line":"pub const Try = @import(\"node_data/try.zig\").Try;"},
{"lineNum":"   73","line":""},
{"lineNum":"   74","line":"pub const Switch = @import(\"node_data/switch.zig\").Switch;"},
{"lineNum":"   75","line":""},
{"lineNum":"   76","line":"pub const Dot = @import(\"node_data/dot.zig\").Dot;"},
{"lineNum":"   77","line":""},
{"lineNum":"   78","line":"pub const ArrayAccess = @import(\"node_data/array_access.zig\").ArrayAccess;"},
{"lineNum":"   79","line":""},
{"lineNum":"   80","line":"pub const Call = @import(\"node_data/call.zig\").Call;"},
{"lineNum":"   81","line":""},
{"lineNum":"   82","line":"pub const NodeType = enum {"},
{"lineNum":"   83","line":"    EOF,"},
{"lineNum":"   84","line":"    Program,"},
{"lineNum":"   85","line":"    Decl,"},
{"lineNum":"   86","line":"    Int,"},
{"lineNum":"   87","line":"    Float,"},
{"lineNum":"   88","line":"    Ident,"},
{"lineNum":"   89","line":"    String,"},
{"lineNum":"   90","line":"    Template,"},
{"lineNum":"   91","line":"    Comma,"},
{"lineNum":"   92","line":"    Array,"},
{"lineNum":"   93","line":"    Object,"},
{"lineNum":"   94","line":"    True,"},
{"lineNum":"   95","line":"    False,"},
{"lineNum":"   96","line":"    Null,"},
{"lineNum":"   97","line":"    Undefined,"},
{"lineNum":"   98","line":"    PostfixOp,"},
{"lineNum":"   99","line":"    PrefixOp,"},
{"lineNum":"  100","line":"    BinaryOp,"},
{"lineNum":"  101","line":"    Ternary,"},
{"lineNum":"  102","line":"    TypeName,"},
{"lineNum":"  103","line":"    UnionType,"},
{"lineNum":"  104","line":"    ArrayType,"},
{"lineNum":"  105","line":"    InterfaceType,"},
{"lineNum":"  106","line":"    ClassType,"},
{"lineNum":"  107","line":"    ClassTypeMember,"},
{"lineNum":"  108","line":"    Alias,"},
{"lineNum":"  109","line":"    Function,"},
{"lineNum":"  110","line":"    Block,"},
{"lineNum":"  111","line":"    If,"},
{"lineNum":"  112","line":"    Switch,"},
{"lineNum":"  113","line":"    For,"},
{"lineNum":"  114","line":"    While,"},
{"lineNum":"  115","line":"    Do,"},
{"lineNum":"  116","line":"    Return,"},
{"lineNum":"  117","line":"    Break,"},
{"lineNum":"  118","line":"    Continue,"},
{"lineNum":"  119","line":"    Throw,"},
{"lineNum":"  120","line":"    Labelled,"},
{"lineNum":"  121","line":"    Try,"},
{"lineNum":"  122","line":"    Dot,"},
{"lineNum":"  123","line":"    ArrayAccess,"},
{"lineNum":"  124","line":"    Call,"},
{"lineNum":"  125","line":"    New,"},
{"lineNum":"  126","line":"    TypeOf,"},
{"lineNum":"  127","line":"};"},
{"lineNum":"  128","line":""},
{"lineNum":"  129","line":"pub const NodeData = union(NodeType) {"},
{"lineNum":"  130","line":"    EOF: void,"},
{"lineNum":"  131","line":"    Program: NodeList,"},
{"lineNum":"  132","line":"    Decl: Decl,"},
{"lineNum":"  133","line":"    Int: []const u8,"},
{"lineNum":"  134","line":"    Float: []const u8,"},
{"lineNum":"  135","line":"    Ident: []const u8,"},
{"lineNum":"  136","line":"    String: []const u8,"},
{"lineNum":"  137","line":"    Template: []const u8,"},
{"lineNum":"  138","line":"    Comma: NodeList,"},
{"lineNum":"  139","line":"    Array: NodeList,"},
{"lineNum":"  140","line":"    Object: Object,"},
{"lineNum":"  141","line":"    True: void,"},
{"lineNum":"  142","line":"    False: void,"},
{"lineNum":"  143","line":"    Null: void,"},
{"lineNum":"  144","line":"    Undefined: void,"},
{"lineNum":"  145","line":"    PostfixOp: UnaryOp,"},
{"lineNum":"  146","line":"    PrefixOp: UnaryOp,"},
{"lineNum":"  147","line":"    BinaryOp: BinaryOp,"},
{"lineNum":"  148","line":"    Ternary: Ternary,"},
{"lineNum":"  149","line":"    TypeName: []const u8,"},
{"lineNum":"  150","line":"    UnionType: NodeList,"},
{"lineNum":"  151","line":"    ArrayType: Node,"},
{"lineNum":"  152","line":"    InterfaceType: InterfaceType,"},
{"lineNum":"  153","line":"    ClassType: ClassType,"},
{"lineNum":"  154","line":"    ClassTypeMember: ClassTypeMember,"},
{"lineNum":"  155","line":"    Alias: Alias,"},
{"lineNum":"  156","line":"    Function: Function,"},
{"lineNum":"  157","line":"    Block: NodeList,"},
{"lineNum":"  158","line":"    If: If,"},
{"lineNum":"  159","line":"    Switch: Switch,"},
{"lineNum":"  160","line":"    For: For,"},
{"lineNum":"  161","line":"    While: While,"},
{"lineNum":"  162","line":"    Do: Do,"},
{"lineNum":"  163","line":"    Return: ?Node,"},
{"lineNum":"  164","line":"    Break: ?[]const u8,"},
{"lineNum":"  165","line":"    Continue: ?[]const u8,"},
{"lineNum":"  166","line":"    Throw: Node,"},
{"lineNum":"  167","line":"    Labelled: Labelled,"},
{"lineNum":"  168","line":"    Try: Try,"},
{"lineNum":"  169","line":"    Dot: Dot,"},
{"lineNum":"  170","line":"    ArrayAccess: ArrayAccess,"},
{"lineNum":"  171","line":"    Call: Call,"},
{"lineNum":"  172","line":"    New: Node,"},
{"lineNum":"  173","line":"    TypeOf: Node,"},
{"lineNum":"  174","line":""},
{"lineNum":"  175","line":"    pub fn dump(","class":"linePartCov","hits":"1","order":"160","possible_hits":"2",},
{"lineNum":"  176","line":"        self: NodeData,"},
{"lineNum":"  177","line":"        writer: anytype,"},
{"lineNum":"  178","line":"        indent: usize,"},
{"lineNum":"  179","line":"    ) anyerror!void {","class":"linePartCov","hits":"1","order":"182","possible_hits":"2",},
{"lineNum":"  180","line":"        switch (self) {","class":"linePartCov","hits":"1","order":"161","possible_hits":"4",},
{"lineNum":"  181","line":"            .Decl => |decl| try decl.dump(writer, indent),","class":"linePartCov","hits":"1","order":"324","possible_hits":"2",},
{"lineNum":"  182","line":"            .Int,"},
{"lineNum":"  183","line":"            .Float,"},
{"lineNum":"  184","line":"            .TypeName,"},
{"lineNum":"  185","line":"            .Ident,"},
{"lineNum":"  186","line":"            .String,"},
{"lineNum":"  187","line":"            .Template,"},
{"lineNum":"  188","line":"            => |s| try putInd(","class":"linePartCov","hits":"2","order":"178","possible_hits":"4",},
{"lineNum":"  189","line":"                writer,","class":"linePartCov","hits":"1","order":"179","possible_hits":"2",},
{"lineNum":"  190","line":"                indent,","class":"linePartCov","hits":"1","order":"180","possible_hits":"2",},
{"lineNum":"  191","line":"                \"{s}: \\\"{s}\\\"\\n\","},
{"lineNum":"  192","line":"                .{ @tagName(self), s },","class":"linePartCov","hits":"1","order":"181","possible_hits":"2",},
{"lineNum":"  193","line":"            ),"},
{"lineNum":"  194","line":"            .Program, .Comma, .UnionType, .Array, .Block => |list| {","class":"linePartCov","hits":"1","order":"162","possible_hits":"2",},
{"lineNum":"  195","line":"                try putInd(writer, indent, \"{s}\\n\", .{@tagName(self)});","class":"linePartCov","hits":"1","order":"163","possible_hits":"2",},
{"lineNum":"  196","line":"                for (list.items) |item|","class":"linePartCov","hits":"2","order":"169","possible_hits":"4",},
{"lineNum":"  197","line":"                    try item.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"170","possible_hits":"4",},
{"lineNum":"  198","line":"            },"},
{"lineNum":"  199","line":"            .Object => |object| {","class":"linePartCov","hits":"1","order":"383","possible_hits":"2",},
{"lineNum":"  200","line":"                try putInd(writer, indent, \"Object\\n\", .{});","class":"linePartCov","hits":"1","order":"384","possible_hits":"2",},
{"lineNum":"  201","line":"                for (object.items) |item|","class":"linePartCov","hits":"2","order":"385","possible_hits":"4",},
{"lineNum":"  202","line":"                    try item.dump(writer, indent + 2);","class":"linePartCov","hits":"1","order":"386","possible_hits":"4",},
{"lineNum":"  203","line":"            },"},
{"lineNum":"  204","line":"            .EOF, .True, .False, .Null, .Undefined => try putInd(","class":"linePartCov","hits":"1","order":"195","possible_hits":"2",},
{"lineNum":"  205","line":"                writer,","class":"linePartCov","hits":"1","order":"192","possible_hits":"2",},
{"lineNum":"  206","line":"                indent,","class":"linePartCov","hits":"1","order":"193","possible_hits":"2",},
{"lineNum":"  207","line":"                \"{s}\\n\","},
{"lineNum":"  208","line":"                .{@tagName(self)},","class":"linePartCov","hits":"1","order":"194","possible_hits":"2",},
{"lineNum":"  209","line":"            ),"},
{"lineNum":"  210","line":"            .PostfixOp, .PrefixOp => |unaryOp| {","class":"linePartCov","hits":"1","order":"404","possible_hits":"2",},
{"lineNum":"  211","line":"                try putInd(writer, indent, \"{s}\\n\", .{@tagName(self)});","class":"linePartCov","hits":"1","order":"405","possible_hits":"2",},
{"lineNum":"  212","line":"                try unaryOp.dump(writer, indent + 2);","class":"linePartCov","hits":"1","order":"406","possible_hits":"4",},
{"lineNum":"  213","line":"            },"},
{"lineNum":"  214","line":"            .Return => |ret| {","class":"linePartCov","hits":"1","order":"202","possible_hits":"2",},
{"lineNum":"  215","line":"                try putInd(writer, indent, \"Return\\n\", .{});","class":"linePartCov","hits":"1","order":"203","possible_hits":"2",},
{"lineNum":"  216","line":"                if (ret) |expr|","class":"linePartCov","hits":"2","order":"204","possible_hits":"4",},
{"lineNum":"  217","line":"                    try expr.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"205","possible_hits":"4",},
{"lineNum":"  218","line":"            },"},
{"lineNum":"  219","line":"            .Break, .Continue => |label| try putInd(","class":"linePartCov","hits":"2","order":"210","possible_hits":"4",},
{"lineNum":"  220","line":"                writer,","class":"linePartCov","hits":"1","order":"211","possible_hits":"2",},
{"lineNum":"  221","line":"                indent,","class":"linePartCov","hits":"1","order":"212","possible_hits":"2",},
{"lineNum":"  222","line":"                \"{s} \\\"{s}\\\"\\n\","},
{"lineNum":"  223","line":"                .{ @tagName(self), if (label) |l| l else \"\" },","class":"linePartCov","hits":"1","order":"213","possible_hits":"2",},
{"lineNum":"  224","line":"            ),"},
{"lineNum":"  225","line":"            .ArrayType, .Throw, .New, .TypeOf => |nd| {","class":"linePartCov","hits":"1","order":"220","possible_hits":"2",},
{"lineNum":"  226","line":"                try putInd(writer, indent, \"{s}\\n\", .{@tagName(self)});","class":"linePartCov","hits":"1","order":"221","possible_hits":"2",},
{"lineNum":"  227","line":"                try nd.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"222","possible_hits":"4",},
{"lineNum":"  228","line":"            },"},
{"lineNum":"  229","line":"            .InterfaceType => |objTy| {","class":"linePartCov","hits":"1","order":"510","possible_hits":"2",},
{"lineNum":"  230","line":"                try putInd(","class":"linePartCov","hits":"1","order":"514","possible_hits":"2",},
{"lineNum":"  231","line":"                    writer,","class":"linePartCov","hits":"1","order":"511","possible_hits":"2",},
{"lineNum":"  232","line":"                    indent,","class":"linePartCov","hits":"1","order":"512","possible_hits":"2",},
{"lineNum":"  233","line":"                    \"InterfaceType {s}\\n\","},
{"lineNum":"  234","line":"                    .{if (objTy.name) |name| name else \"\"},","class":"linePartCov","hits":"1","order":"513","possible_hits":"2",},
{"lineNum":"  235","line":"                );"},
{"lineNum":"  236","line":"                for (objTy.members.items) |member|","class":"linePartCov","hits":"2","order":"515","possible_hits":"4",},
{"lineNum":"  237","line":"                    try member.dump(writer, indent + 2);","class":"linePartCov","hits":"1","order":"516","possible_hits":"4",},
{"lineNum":"  238","line":"            },"},
{"lineNum":"  239","line":"            .ClassType => |clsTy| try clsTy.dump(writer, indent),","class":"linePartCov","hits":"1","order":"560","possible_hits":"2",},
{"lineNum":"  240","line":"            .ClassTypeMember => |clsTyM| try clsTyM.dump(writer, indent),","class":"linePartCov","hits":"1","order":"536","possible_hits":"2",},
{"lineNum":"  241","line":"            .BinaryOp => |binaryOp| try binaryOp.dump(writer, indent),","class":"linePartCov","hits":"1","order":"445","possible_hits":"2",},
{"lineNum":"  242","line":"            .Ternary => |ternary| try ternary.dump(writer, indent),","class":"linePartCov","hits":"1","order":"466","possible_hits":"2",},
{"lineNum":"  243","line":"            .Alias => |alias| try alias.dump(writer, indent),","class":"linePartCov","hits":"1","order":"588","possible_hits":"2",},
{"lineNum":"  244","line":"            .Function => |func| try func.dump(writer, indent),","class":"linePartCov","hits":"1","order":"632","possible_hits":"2",},
{"lineNum":"  245","line":"            .If => |stmt| try stmt.dump(writer, indent),","class":"linePartCov","hits":"1","order":"687","possible_hits":"2",},
{"lineNum":"  246","line":"            .Switch => |stmt| try stmt.dump(writer, indent),","class":"linePartCov","hits":"1","order":"747","possible_hits":"2",},
{"lineNum":"  247","line":"            .For => |loop| try loop.dump(writer, indent),","class":"linePartCov","hits":"1","order":"788","possible_hits":"2",},
{"lineNum":"  248","line":"            .While => |loop| try loop.dump(writer, indent),","class":"linePartCov","hits":"1","order":"838","possible_hits":"2",},
{"lineNum":"  249","line":"            .Do => |loop| try loop.dump(writer, indent),","class":"linePartCov","hits":"1","order":"859","possible_hits":"2",},
{"lineNum":"  250","line":"            .Try => |t| try t.dump(writer, indent),","class":"linePartCov","hits":"1","order":"921","possible_hits":"2",},
{"lineNum":"  251","line":"            .ArrayAccess => |aa| try aa.dump(writer, indent),","class":"linePartCov","hits":"1","order":"961","possible_hits":"2",},
{"lineNum":"  252","line":"            .Dot => |dot| try dot.dump(writer, indent),","class":"linePartCov","hits":"1","order":"944","possible_hits":"2",},
{"lineNum":"  253","line":"            .Call => |call| try call.dump(writer, indent),","class":"linePartCov","hits":"1","order":"980","possible_hits":"2",},
{"lineNum":"  254","line":"            .Labelled => |labelled| try labelled.dump(writer, indent),","class":"linePartCov","hits":"1","order":"879","possible_hits":"2",},
{"lineNum":"  255","line":"        }"},
{"lineNum":"  256","line":"    }"},
{"lineNum":"  257","line":""},
{"lineNum":"  258","line":"    pub fn getType(self: NodeData) NodeType {","class":"lineCov","hits":"1","order":"4064","possible_hits":"1",},
{"lineNum":"  259","line":"        return @as(NodeType, self);","class":"lineCov","hits":"1","order":"4065","possible_hits":"1",},
{"lineNum":"  260","line":"    }"},
{"lineNum":"  261","line":"};"},
{"lineNum":"  262","line":""},
{"lineNum":"  263","line":"test \"can dump Nodes with NodeList data\" {","class":"lineCov","hits":"3","order":"144","possible_hits":"3",},
{"lineNum":"  264","line":"    const node = makeNode(std.testing.allocator, Cursor.new(1, 1), .Int, \"1\");","class":"lineCov","hits":"1","order":"145","possible_hits":"1",},
{"lineNum":"  265","line":"    defer std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"189","possible_hits":"2",},
{"lineNum":"  266","line":""},
{"lineNum":"  267","line":"    try (DumpTestCase(NodeList, .Program){","class":"linePartCov","hits":"1","order":"188","possible_hits":"2",},
{"lineNum":"  268","line":"        .value = NodeList{ .items = &[_]Node{node} },","class":"lineCov","hits":"1","order":"153","possible_hits":"1",},
{"lineNum":"  269","line":"        .expected =","class":"lineCov","hits":"1","order":"154","possible_hits":"1",},
{"lineNum":"  270","line":"        \\\\Program"},
{"lineNum":"  271","line":"        \\\\  Int Node (1:1)"},
{"lineNum":"  272","line":"        \\\\    Int: \"1\""},
{"lineNum":"  273","line":"        \\\\"},
{"lineNum":"  274","line":"        ,"},
{"lineNum":"  275","line":"    }).run();","class":"lineCov","hits":"1","order":"155","possible_hits":"1",},
{"lineNum":"  276","line":"}"},
{"lineNum":"  277","line":""},
{"lineNum":"  278","line":"test \"can dump Nodes with void data\" {","class":"lineCov","hits":"2","order":"190","possible_hits":"2",},
{"lineNum":"  279","line":"    try (DumpTestCase(void, .True){","class":"lineCov","hits":"1","order":"196","possible_hits":"1",},
{"lineNum":"  280","line":"        .value = {},"},
{"lineNum":"  281","line":"        .expected = \"True\\n\","},
{"lineNum":"  282","line":"    }).run();","class":"lineCov","hits":"1","order":"191","possible_hits":"1",},
{"lineNum":"  283","line":"}"},
{"lineNum":"  284","line":""},
{"lineNum":"  285","line":"test \"can dump Nodes with ?Node data\" {","class":"lineCov","hits":"3","order":"197","possible_hits":"3",},
{"lineNum":"  286","line":"    const node = makeNode(std.testing.allocator, Cursor.new(1, 1), .Int, \"1\");","class":"lineCov","hits":"1","order":"198","possible_hits":"1",},
{"lineNum":"  287","line":"    defer std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"207","possible_hits":"2",},
{"lineNum":"  288","line":""},
{"lineNum":"  289","line":"    try (DumpTestCase(?Node, .Return){","class":"linePartCov","hits":"1","order":"206","possible_hits":"2",},
{"lineNum":"  290","line":"        .value = node,","class":"lineCov","hits":"1","order":"199","possible_hits":"1",},
{"lineNum":"  291","line":"        .expected =","class":"lineCov","hits":"1","order":"200","possible_hits":"1",},
{"lineNum":"  292","line":"        \\\\Return"},
{"lineNum":"  293","line":"        \\\\  Int Node (1:1)"},
{"lineNum":"  294","line":"        \\\\    Int: \"1\""},
{"lineNum":"  295","line":"        \\\\"},
{"lineNum":"  296","line":"        ,"},
{"lineNum":"  297","line":"    }).run();","class":"lineCov","hits":"1","order":"201","possible_hits":"1",},
{"lineNum":"  298","line":"}"},
{"lineNum":"  299","line":""},
{"lineNum":"  300","line":"test \"can dump Nodes with ?[]const u8 data\" {","class":"lineCov","hits":"2","order":"208","possible_hits":"2",},
{"lineNum":"  301","line":"    try (DumpTestCase(?[]const u8, .Break){","class":"lineCov","hits":"1","order":"214","possible_hits":"1",},
{"lineNum":"  302","line":"        .value = \"aLabel\","},
{"lineNum":"  303","line":"        .expected = \"Break \\\"aLabel\\\"\\n\","},
{"lineNum":"  304","line":"    }).run();","class":"lineCov","hits":"1","order":"209","possible_hits":"1",},
{"lineNum":"  305","line":"}"},
{"lineNum":"  306","line":""},
{"lineNum":"  307","line":"test \"can dump Nodes with Node data\" {","class":"lineCov","hits":"3","order":"215","possible_hits":"3",},
{"lineNum":"  308","line":"    const node = makeNode(std.testing.allocator, Cursor.new(1, 1), .Int, \"1\");","class":"lineCov","hits":"1","order":"216","possible_hits":"1",},
{"lineNum":"  309","line":"    defer std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"224","possible_hits":"2",},
{"lineNum":"  310","line":""},
{"lineNum":"  311","line":"    try (DumpTestCase(Node, .ArrayType){","class":"linePartCov","hits":"1","order":"223","possible_hits":"2",},
{"lineNum":"  312","line":"        .value = node,","class":"lineCov","hits":"1","order":"217","possible_hits":"1",},
{"lineNum":"  313","line":"        .expected =","class":"lineCov","hits":"1","order":"218","possible_hits":"1",},
{"lineNum":"  314","line":"        \\\\ArrayType"},
{"lineNum":"  315","line":"        \\\\  Int Node (1:1)"},
{"lineNum":"  316","line":"        \\\\    Int: \"1\""},
{"lineNum":"  317","line":"        \\\\"},
{"lineNum":"  318","line":"        ,"},
{"lineNum":"  319","line":"    }).run();","class":"lineCov","hits":"1","order":"219","possible_hits":"1",},
{"lineNum":"  320","line":"}"},
{"lineNum":"  321","line":""},
{"lineNum":"  322","line":"pub const NodeImpl = struct {"},
{"lineNum":"  323","line":"    csr: Cursor,"},
{"lineNum":"  324","line":"    data: NodeData,"},
{"lineNum":"  325","line":"    ty: ?Type.Ptr = null,"},
{"lineNum":"  326","line":""},
{"lineNum":"  327","line":"    pub fn getType(self: Node) NodeType {","class":"lineCov","hits":"1","order":"236","possible_hits":"1",},
{"lineNum":"  328","line":"        return @as(NodeType, self.data);","class":"lineCov","hits":"1","order":"237","possible_hits":"1",},
{"lineNum":"  329","line":"    }"},
{"lineNum":"  330","line":""},
{"lineNum":"  331","line":"    pub fn eql(self: Node, other: ?Node) bool {","class":"lineCov","hits":"1","order":"252","possible_hits":"1",},
{"lineNum":"  332","line":"        if (other) |n|","class":"lineCov","hits":"2","order":"253","possible_hits":"2",},
{"lineNum":"  333","line":"            return genericEql.eql(self.*, n.*);","class":"lineCov","hits":"1","order":"254","possible_hits":"1",},
{"lineNum":"  334","line":"        return false;","class":"lineCov","hits":"1","order":"278","possible_hits":"1",},
{"lineNum":"  335","line":"    }"},
{"lineNum":"  336","line":""},
{"lineNum":"  337","line":"    pub fn dump(self: Node) void {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  338","line":"        const writer = std.io.getStdOut().writer();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  339","line":"        self.dumpIndented(writer, 0) catch unreachable;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  340","line":"    }"},
{"lineNum":"  341","line":""},
{"lineNum":"  342","line":"    pub fn dumpIndented(","class":"linePartCov","hits":"1","order":"171","possible_hits":"2",},
{"lineNum":"  343","line":"        self: Node,"},
{"lineNum":"  344","line":"        writer: anytype,"},
{"lineNum":"  345","line":"        indent: usize,"},
{"lineNum":"  346","line":"    ) !void {","class":"linePartCov","hits":"1","order":"183","possible_hits":"2",},
{"lineNum":"  347","line":"        try putInd(writer, indent, \"{s} Node ({d}:{d})\\n\", .{","class":"linePartCov","hits":"2","order":"172","possible_hits":"4",},
{"lineNum":"  348","line":"            @tagName(self.data),","class":"linePartCov","hits":"1","order":"173","possible_hits":"2",},
{"lineNum":"  349","line":"            self.csr.ln,","class":"linePartCov","hits":"1","order":"174","possible_hits":"2",},
{"lineNum":"  350","line":"            self.csr.ch,","class":"linePartCov","hits":"1","order":"175","possible_hits":"2",},
{"lineNum":"  351","line":"        });"},
{"lineNum":"  352","line":""},
{"lineNum":"  353","line":"        try self.data.dump(writer, indent + 2);","class":"linePartCov","hits":"1","order":"177","possible_hits":"4",},
{"lineNum":"  354","line":"    }"},
{"lineNum":"  355","line":"};"},
{"lineNum":"  356","line":""},
{"lineNum":"  357","line":"pub const Node = *NodeImpl;"},
{"lineNum":"  358","line":""},
{"lineNum":"  359","line":"pub fn makeNode(","class":"lineCov","hits":"82","order":"146","possible_hits":"82",},
{"lineNum":"  360","line":"    alloc: Allocator,"},
{"lineNum":"  361","line":"    csr: Cursor,"},
{"lineNum":"  362","line":"    comptime ty: NodeType,"},
{"lineNum":"  363","line":"    data: anytype,"},
{"lineNum":"  364","line":") Node {"},
{"lineNum":"  365","line":"    var n = allocate.create(alloc, NodeImpl);","class":"lineCov","hits":"82","order":"147","possible_hits":"82",},
{"lineNum":"  366","line":"    n.csr = csr;","class":"lineCov","hits":"82","order":"150","possible_hits":"82",},
{"lineNum":"  367","line":"    n.data = @unionInit(NodeData, @tagName(ty), data);","class":"lineCov","hits":"82","order":"151","possible_hits":"82",},
{"lineNum":"  368","line":"    return n;","class":"lineCov","hits":"82","order":"152","possible_hits":"82",},
{"lineNum":"  369","line":"}"},
{"lineNum":"  370","line":""},
{"lineNum":"  371","line":"test \"can generically initialize Nodes with makeNode\" {","class":"lineCov","hits":"3","order":"225","possible_hits":"3",},
{"lineNum":"  372","line":"    const name = \"aVariableName\";"},
{"lineNum":"  373","line":"    const node = makeNode(","class":"lineCov","hits":"1","order":"234","possible_hits":"1",},
{"lineNum":"  374","line":"        std.testing.allocator,"},
{"lineNum":"  375","line":"        Cursor.new(0, 0),","class":"lineCov","hits":"1","order":"226","possible_hits":"1",},
{"lineNum":"  376","line":"        NodeType.Decl,"},
{"lineNum":"  377","line":"        Decl.new(.Var, name, null, null),","class":"lineCov","hits":"1","order":"227","possible_hits":"1",},
{"lineNum":"  378","line":"    );"},
{"lineNum":"  379","line":"    defer std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"240","possible_hits":"4",},
{"lineNum":"  380","line":"    try expectEqual(node.getType(), NodeType.Decl);","class":"linePartCov","hits":"1","order":"235","possible_hits":"2",},
{"lineNum":"  381","line":"    try expectEqual(node.data.Decl.scoping, .Var);","class":"linePartCov","hits":"2","order":"238","possible_hits":"3",},
{"lineNum":"  382","line":"    try expectEqualStrings(name, node.data.Decl.name);","class":"linePartCov","hits":"2","order":"239","possible_hits":"3",},
{"lineNum":"  383","line":"}"},
{"lineNum":"  384","line":""},
{"lineNum":"  385","line":"test \"can compare Nodes for equality\" {","class":"lineCov","hits":"3","order":"241","possible_hits":"3",},
{"lineNum":"  386","line":"    const name = \"aVarName\";"},
{"lineNum":"  387","line":""},
{"lineNum":"  388","line":"    const a = makeNode(","class":"lineCov","hits":"1","order":"244","possible_hits":"1",},
{"lineNum":"  389","line":"        std.testing.allocator,"},
{"lineNum":"  390","line":"        Cursor.new(0, 0),","class":"lineCov","hits":"1","order":"242","possible_hits":"1",},
{"lineNum":"  391","line":"        NodeType.Decl,"},
{"lineNum":"  392","line":"        Decl.new(.Var, name, null, null),","class":"lineCov","hits":"1","order":"243","possible_hits":"1",},
{"lineNum":"  393","line":"    );"},
{"lineNum":"  394","line":""},
{"lineNum":"  395","line":"    const b = makeNode(","class":"lineCov","hits":"1","order":"247","possible_hits":"1",},
{"lineNum":"  396","line":"        std.testing.allocator,"},
{"lineNum":"  397","line":"        Cursor.new(0, 0),","class":"lineCov","hits":"1","order":"245","possible_hits":"1",},
{"lineNum":"  398","line":"        NodeType.Decl,"},
{"lineNum":"  399","line":"        Decl.new(.Var, name, null, null),","class":"lineCov","hits":"1","order":"246","possible_hits":"1",},
{"lineNum":"  400","line":"    );"},
{"lineNum":"  401","line":""},
{"lineNum":"  402","line":"    const c = makeNode(","class":"lineCov","hits":"1","order":"250","possible_hits":"1",},
{"lineNum":"  403","line":"        std.testing.allocator,"},
{"lineNum":"  404","line":"        Cursor.new(1, 1),","class":"lineCov","hits":"1","order":"248","possible_hits":"1",},
{"lineNum":"  405","line":"        NodeType.Decl,"},
{"lineNum":"  406","line":"        Decl.new(.Var, name, null, null),","class":"lineCov","hits":"1","order":"249","possible_hits":"1",},
{"lineNum":"  407","line":"    );"},
{"lineNum":"  408","line":""},
{"lineNum":"  409","line":"    defer std.testing.allocator.destroy(a);","class":"linePartCov","hits":"1","order":"281","possible_hits":"6",},
{"lineNum":"  410","line":"    defer std.testing.allocator.destroy(b);","class":"linePartCov","hits":"1","order":"280","possible_hits":"6",},
{"lineNum":"  411","line":"    defer std.testing.allocator.destroy(c);","class":"linePartCov","hits":"1","order":"279","possible_hits":"6",},
{"lineNum":"  412","line":""},
{"lineNum":"  413","line":"    try expect(a.eql(b));","class":"linePartCov","hits":"1","order":"251","possible_hits":"2",},
{"lineNum":"  414","line":"    try expect(b.eql(a));","class":"linePartCov","hits":"1","order":"274","possible_hits":"2",},
{"lineNum":"  415","line":"    try expect(!a.eql(c));","class":"linePartCov","hits":"1","order":"275","possible_hits":"2",},
{"lineNum":"  416","line":"    try expect(!b.eql(c));","class":"linePartCov","hits":"1","order":"276","possible_hits":"2",},
{"lineNum":"  417","line":"    try expect(!a.eql(null));","class":"linePartCov","hits":"1","order":"277","possible_hits":"2",},
{"lineNum":"  418","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-03 20:24:12", "instrumented" : 133, "covered" : 130,};
var merged_data = [];
