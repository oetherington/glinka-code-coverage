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
{"lineNum":"   19","line":"const expectEqual = std.testing.expectEqual;"},
{"lineNum":"   20","line":"const expectEqualStrings = std.testing.expectEqualStrings;"},
{"lineNum":"   21","line":"const expectError = std.testing.expectError;"},
{"lineNum":"   22","line":"const Cursor = @import(\"../cursor.zig\").Cursor;"},
{"lineNum":"   23","line":"const Token = @import(\"../token.zig\").Token;"},
{"lineNum":"   24","line":"const putInd = @import(\"indenter.zig\").putInd;"},
{"lineNum":"   25","line":"const DumpTestCase = @import(\"dump_test_case.zig\").DumpTestCase;"},
{"lineNum":"   26","line":"const nodeImp = @import(\"../node.zig\");"},
{"lineNum":"   27","line":"const Node = nodeImp.Node;"},
{"lineNum":"   28","line":"const makeNode = nodeImp.makeNode;"},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"pub const Decl = struct {"},
{"lineNum":"   31","line":"    pub const Scoping = enum {"},
{"lineNum":"   32","line":"        Var,"},
{"lineNum":"   33","line":"        Let,"},
{"lineNum":"   34","line":"        Const,"},
{"lineNum":"   35","line":""},
{"lineNum":"   36","line":"        pub fn fromTokenType(tkn: Token.Type) !Scoping {","class":"lineCov","hits":"1","order":"300","possible_hits":"1",},
{"lineNum":"   37","line":"            return switch (tkn) {","class":"lineCov","hits":"5","order":"301","possible_hits":"5",},
{"lineNum":"   38","line":"                .Var => .Var,","class":"lineCov","hits":"1","order":"302","possible_hits":"1",},
{"lineNum":"   39","line":"                .Let => .Let,","class":"lineCov","hits":"1","order":"304","possible_hits":"1",},
{"lineNum":"   40","line":"                .Const => .Const,","class":"lineCov","hits":"1","order":"306","possible_hits":"1",},
{"lineNum":"   41","line":"                else => error.InvalidScoping,","class":"lineCov","hits":"1","order":"308","possible_hits":"1",},
{"lineNum":"   42","line":"            };"},
{"lineNum":"   43","line":"        }"},
{"lineNum":"   44","line":""},
{"lineNum":"   45","line":"        pub fn toString(self: Scoping) []const u8 {","class":"lineCov","hits":"1","order":"311","possible_hits":"1",},
{"lineNum":"   46","line":"            return switch (self) {","class":"lineCov","hits":"4","order":"312","possible_hits":"4",},
{"lineNum":"   47","line":"                .Var => \"var\",","class":"lineCov","hits":"1","order":"313","possible_hits":"1",},
{"lineNum":"   48","line":"                .Let => \"let\",","class":"lineCov","hits":"1","order":"315","possible_hits":"1",},
{"lineNum":"   49","line":"                .Const => \"const\",","class":"lineCov","hits":"1","order":"317","possible_hits":"1",},
{"lineNum":"   50","line":"            };"},
{"lineNum":"   51","line":"        }"},
{"lineNum":"   52","line":"    };"},
{"lineNum":"   53","line":""},
{"lineNum":"   54","line":"    scoping: Scoping,"},
{"lineNum":"   55","line":"    name: []const u8,"},
{"lineNum":"   56","line":"    ty: ?Node,"},
{"lineNum":"   57","line":"    value: ?Node,"},
{"lineNum":"   58","line":""},
{"lineNum":"   59","line":"    pub fn new(","class":"lineCov","hits":"1","order":"228","possible_hits":"1",},
{"lineNum":"   60","line":"        scoping: Scoping,"},
{"lineNum":"   61","line":"        name: []const u8,"},
{"lineNum":"   62","line":"        ty: ?Node,"},
{"lineNum":"   63","line":"        value: ?Node,"},
{"lineNum":"   64","line":"    ) Decl {"},
{"lineNum":"   65","line":"        return Decl{","class":"lineCov","hits":"1","order":"233","possible_hits":"1",},
{"lineNum":"   66","line":"            .scoping = scoping,","class":"lineCov","hits":"1","order":"229","possible_hits":"1",},
{"lineNum":"   67","line":"            .name = name,","class":"lineCov","hits":"1","order":"230","possible_hits":"1",},
{"lineNum":"   68","line":"            .ty = ty,","class":"lineCov","hits":"1","order":"231","possible_hits":"1",},
{"lineNum":"   69","line":"            .value = value,","class":"lineCov","hits":"1","order":"232","possible_hits":"1",},
{"lineNum":"   70","line":"        };"},
{"lineNum":"   71","line":"    }"},
{"lineNum":"   72","line":""},
{"lineNum":"   73","line":"    pub fn dump(","class":"lineCov","hits":"1","order":"325","possible_hits":"1",},
{"lineNum":"   74","line":"        self: Decl,"},
{"lineNum":"   75","line":"        writer: anytype,"},
{"lineNum":"   76","line":"        indent: usize,"},
{"lineNum":"   77","line":"    ) !void {","class":"lineCov","hits":"1","order":"333","possible_hits":"1",},
{"lineNum":"   78","line":"        try putInd(writer, indent, \"{s} Decl \\\"{s}\\\"\\n\", .{","class":"lineCov","hits":"2","order":"326","possible_hits":"2",},
{"lineNum":"   79","line":"            @tagName(self.scoping),","class":"lineCov","hits":"1","order":"327","possible_hits":"1",},
{"lineNum":"   80","line":"            self.name,","class":"lineCov","hits":"1","order":"328","possible_hits":"1",},
{"lineNum":"   81","line":"        });"},
{"lineNum":"   82","line":""},
{"lineNum":"   83","line":"        if (self.ty) |ty|","class":"lineCov","hits":"2","order":"329","possible_hits":"2",},
{"lineNum":"   84","line":"            try ty.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"330","possible_hits":"2",},
{"lineNum":"   85","line":""},
{"lineNum":"   86","line":"        if (self.value) |value|","class":"lineCov","hits":"2","order":"331","possible_hits":"2",},
{"lineNum":"   87","line":"            try value.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"332","possible_hits":"2",},
{"lineNum":"   88","line":"    }"},
{"lineNum":"   89","line":"};"},
{"lineNum":"   90","line":""},
{"lineNum":"   91","line":"test \"can create Decl.Scoping from Token.Type\" {","class":"lineCov","hits":"2","order":"298","possible_hits":"2",},
{"lineNum":"   92","line":"    try expectEqual(Decl.Scoping.Var, try Decl.Scoping.fromTokenType(.Var));","class":"lineCov","hits":"1","order":"299","possible_hits":"1",},
{"lineNum":"   93","line":"    try expectEqual(Decl.Scoping.Let, try Decl.Scoping.fromTokenType(.Let));","class":"lineCov","hits":"1","order":"303","possible_hits":"1",},
{"lineNum":"   94","line":"    try expectEqual(Decl.Scoping.Const, try Decl.Scoping.fromTokenType(.Const));","class":"lineCov","hits":"1","order":"305","possible_hits":"1",},
{"lineNum":"   95","line":"    try expectError(error.InvalidScoping, Decl.Scoping.fromTokenType(.Dot));","class":"lineCov","hits":"1","order":"307","possible_hits":"1",},
{"lineNum":"   96","line":"}"},
{"lineNum":"   97","line":""},
{"lineNum":"   98","line":"test \"can convert Decl.Scoping to string\" {","class":"lineCov","hits":"2","order":"309","possible_hits":"2",},
{"lineNum":"   99","line":"    try expectEqualStrings(\"var\", Decl.Scoping.Var.toString());","class":"lineCov","hits":"1","order":"310","possible_hits":"1",},
{"lineNum":"  100","line":"    try expectEqualStrings(\"let\", Decl.Scoping.Let.toString());","class":"lineCov","hits":"1","order":"314","possible_hits":"1",},
{"lineNum":"  101","line":"    try expectEqualStrings(\"const\", Decl.Scoping.Const.toString());","class":"lineCov","hits":"1","order":"316","possible_hits":"1",},
{"lineNum":"  102","line":"}"},
{"lineNum":"  103","line":""},
{"lineNum":"  104","line":"test \"can dump a Decl\" {","class":"lineCov","hits":"3","order":"318","possible_hits":"3",},
{"lineNum":"  105","line":"    const nodes = [_]Node{"},
{"lineNum":"  106","line":"        makeNode(std.testing.allocator, Cursor.new(1, 1), .TypeName, \"number\"),","class":"lineCov","hits":"1","order":"319","possible_hits":"1",},
{"lineNum":"  107","line":"        makeNode(std.testing.allocator, Cursor.new(2, 1), .Int, \"1\"),","class":"lineCov","hits":"1","order":"320","possible_hits":"1",},
{"lineNum":"  108","line":"    };"},
{"lineNum":"  109","line":""},
{"lineNum":"  110","line":"    defer for (nodes) |node|","class":"linePartCov","hits":"2","order":"335","possible_hits":"4",},
{"lineNum":"  111","line":"        std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"336","possible_hits":"2",},
{"lineNum":"  112","line":""},
{"lineNum":"  113","line":"    try (DumpTestCase(Decl, .Decl){","class":"linePartCov","hits":"1","order":"334","possible_hits":"2",},
{"lineNum":"  114","line":"        .value = Decl.new(.Const, \"aDeclaration\", nodes[0], nodes[1]),","class":"lineCov","hits":"1","order":"321","possible_hits":"1",},
{"lineNum":"  115","line":"        .expected =","class":"lineCov","hits":"1","order":"322","possible_hits":"1",},
{"lineNum":"  116","line":"        \\\\Const Decl \"aDeclaration\""},
{"lineNum":"  117","line":"        \\\\  TypeName Node (1:1)"},
{"lineNum":"  118","line":"        \\\\    TypeName: \"number\""},
{"lineNum":"  119","line":"        \\\\  Int Node (2:1)"},
{"lineNum":"  120","line":"        \\\\    Int: \"1\""},
{"lineNum":"  121","line":"        \\\\"},
{"lineNum":"  122","line":"        ,"},
{"lineNum":"  123","line":"    }).run();","class":"lineCov","hits":"1","order":"323","possible_hits":"1",},
{"lineNum":"  124","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-13 12:34:35", "instrumented" : 44, "covered" : 44,};
var merged_data = [];
