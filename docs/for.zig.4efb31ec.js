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
{"lineNum":"   21","line":"const Cursor = @import(\"../cursor.zig\").Cursor;"},
{"lineNum":"   22","line":"const Token = @import(\"../token.zig\").Token;"},
{"lineNum":"   23","line":"const putInd = @import(\"indenter.zig\").putInd;"},
{"lineNum":"   24","line":"const DumpTestCase = @import(\"dump_test_case.zig\").DumpTestCase;"},
{"lineNum":"   25","line":"const Decl = @import(\"decl.zig\").Decl;"},
{"lineNum":"   26","line":"const nodeImp = @import(\"../node.zig\");"},
{"lineNum":"   27","line":"const Node = nodeImp.Node;"},
{"lineNum":"   28","line":"const makeNode = nodeImp.makeNode;"},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"pub const For = struct {"},
{"lineNum":"   31","line":"    pub const Clause = union(Clause.Type) {"},
{"lineNum":"   32","line":"        pub const Type = enum {"},
{"lineNum":"   33","line":"            CStyle,"},
{"lineNum":"   34","line":"            Each,"},
{"lineNum":"   35","line":"        };"},
{"lineNum":"   36","line":""},
{"lineNum":"   37","line":"        pub const CStyleClause = struct {"},
{"lineNum":"   38","line":"            pre: Node,"},
{"lineNum":"   39","line":"            cond: Node,"},
{"lineNum":"   40","line":"            post: Node,"},
{"lineNum":"   41","line":"        };"},
{"lineNum":"   42","line":""},
{"lineNum":"   43","line":"        pub const EachClause = struct {"},
{"lineNum":"   44","line":"            pub const Variant = enum {"},
{"lineNum":"   45","line":"                Of,"},
{"lineNum":"   46","line":"                In,"},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"                pub fn toString(self: Variant) []const u8 {","class":"lineCov","hits":"1","order":"766","possible_hits":"1",},
{"lineNum":"   49","line":"                    return switch (self) {","class":"lineCov","hits":"3","order":"767","possible_hits":"3",},
{"lineNum":"   50","line":"                        .Of => \"of\",","class":"lineCov","hits":"1","order":"768","possible_hits":"1",},
{"lineNum":"   51","line":"                        .In => \"in\",","class":"lineCov","hits":"1","order":"770","possible_hits":"1",},
{"lineNum":"   52","line":"                    };"},
{"lineNum":"   53","line":"                }"},
{"lineNum":"   54","line":"            };"},
{"lineNum":"   55","line":""},
{"lineNum":"   56","line":"            scoping: Decl.Scoping,"},
{"lineNum":"   57","line":"            variant: Variant,"},
{"lineNum":"   58","line":"            name: []const u8,"},
{"lineNum":"   59","line":"            expr: Node,"},
{"lineNum":"   60","line":"        };"},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"        CStyle: CStyleClause,"},
{"lineNum":"   63","line":"        Each: EachClause,"},
{"lineNum":"   64","line":""},
{"lineNum":"   65","line":"        pub fn getType(self: Clause) Clause.Type {","class":"lineCov","hits":"1","order":"4586","possible_hits":"1",},
{"lineNum":"   66","line":"            return @as(Clause.Type, self);","class":"lineCov","hits":"1","order":"4587","possible_hits":"1",},
{"lineNum":"   67","line":"        }"},
{"lineNum":"   68","line":""},
{"lineNum":"   69","line":"        pub fn dump(","class":"linePartCov","hits":"1","order":"792","possible_hits":"2",},
{"lineNum":"   70","line":"            self: Clause,"},
{"lineNum":"   71","line":"            writer: anytype,"},
{"lineNum":"   72","line":"            indent: usize,"},
{"lineNum":"   73","line":"        ) !void {","class":"linePartCov","hits":"1","order":"799","possible_hits":"2",},
{"lineNum":"   74","line":"            try putInd(writer, indent, \"{s}:\\n\", .{@tagName(self)});","class":"linePartCov","hits":"1","order":"793","possible_hits":"2",},
{"lineNum":"   75","line":""},
{"lineNum":"   76","line":"            switch (self) {","class":"linePartCov","hits":"1","order":"794","possible_hits":"4",},
{"lineNum":"   77","line":"                .CStyle => |cs| {","class":"linePartCov","hits":"1","order":"795","possible_hits":"2",},
{"lineNum":"   78","line":"                    try cs.pre.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"796","possible_hits":"4",},
{"lineNum":"   79","line":"                    try cs.cond.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"797","possible_hits":"4",},
{"lineNum":"   80","line":"                    try cs.post.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"798","possible_hits":"4",},
{"lineNum":"   81","line":"                },"},
{"lineNum":"   82","line":"                .Each => |each| {","class":"linePartCov","hits":"1","order":"818","possible_hits":"2",},
{"lineNum":"   83","line":"                    try putInd(writer, indent + 2, \"{s}\\n\", .{","class":"linePartCov","hits":"2","order":"819","possible_hits":"6",},
{"lineNum":"   84","line":"                        @tagName(each.scoping),","class":"linePartCov","hits":"1","order":"820","possible_hits":"2",},
{"lineNum":"   85","line":"                    });"},
{"lineNum":"   86","line":"                    try putInd(writer, indent + 2, \"{s}\\n\", .{each.name});","class":"linePartCov","hits":"1","order":"821","possible_hits":"4",},
{"lineNum":"   87","line":"                    try putInd(writer, indent + 2, \"{s}\\n\", .{","class":"linePartCov","hits":"2","order":"822","possible_hits":"6",},
{"lineNum":"   88","line":"                        @tagName(each.variant),","class":"linePartCov","hits":"1","order":"823","possible_hits":"2",},
{"lineNum":"   89","line":"                    });"},
{"lineNum":"   90","line":"                    try each.expr.dumpIndented(writer, indent + 2);","class":"linePartCov","hits":"1","order":"824","possible_hits":"4",},
{"lineNum":"   91","line":"                },"},
{"lineNum":"   92","line":"            }"},
{"lineNum":"   93","line":"        }"},
{"lineNum":"   94","line":"    };"},
{"lineNum":"   95","line":""},
{"lineNum":"   96","line":"    clause: Clause,"},
{"lineNum":"   97","line":"    body: Node,"},
{"lineNum":"   98","line":""},
{"lineNum":"   99","line":"    pub fn new(clause: Clause, body: Node) For {","class":"lineCov","hits":"1","order":"782","possible_hits":"1",},
{"lineNum":"  100","line":"        return For{","class":"lineCov","hits":"1","order":"785","possible_hits":"1",},
{"lineNum":"  101","line":"            .clause = clause,","class":"lineCov","hits":"1","order":"783","possible_hits":"1",},
{"lineNum":"  102","line":"            .body = body,","class":"lineCov","hits":"1","order":"784","possible_hits":"1",},
{"lineNum":"  103","line":"        };"},
{"lineNum":"  104","line":"    }"},
{"lineNum":"  105","line":""},
{"lineNum":"  106","line":"    pub fn getType(self: For) Clause.Type {","class":"lineCov","hits":"1","order":"4584","possible_hits":"1",},
{"lineNum":"  107","line":"        return self.clause.getType();","class":"lineCov","hits":"1","order":"4585","possible_hits":"1",},
{"lineNum":"  108","line":"    }"},
{"lineNum":"  109","line":""},
{"lineNum":"  110","line":"    pub fn dump(","class":"linePartCov","hits":"1","order":"789","possible_hits":"2",},
{"lineNum":"  111","line":"        self: For,"},
{"lineNum":"  112","line":"        writer: anytype,"},
{"lineNum":"  113","line":"        indent: usize,"},
{"lineNum":"  114","line":"    ) !void {","class":"linePartCov","hits":"1","order":"802","possible_hits":"2",},
{"lineNum":"  115","line":"        try putInd(writer, indent, \"For:\\n\", .{});","class":"linePartCov","hits":"1","order":"790","possible_hits":"2",},
{"lineNum":"  116","line":"        try self.clause.dump(writer, indent + 2);","class":"linePartCov","hits":"1","order":"791","possible_hits":"4",},
{"lineNum":"  117","line":"        try putInd(writer, indent + 2, \"Body:\\n\", .{});","class":"linePartCov","hits":"1","order":"800","possible_hits":"4",},
{"lineNum":"  118","line":"        try self.body.dumpIndented(writer, indent + 4);","class":"linePartCov","hits":"1","order":"801","possible_hits":"4",},
{"lineNum":"  119","line":"    }"},
{"lineNum":"  120","line":"};"},
{"lineNum":"  121","line":""},
{"lineNum":"  122","line":"test \"can convert For.Clause.EachClause.Variant to string\" {","class":"lineCov","hits":"2","order":"764","possible_hits":"2",},
{"lineNum":"  123","line":"    try expectEqualStrings(\"of\", For.Clause.EachClause.Variant.Of.toString());","class":"lineCov","hits":"1","order":"765","possible_hits":"1",},
{"lineNum":"  124","line":"    try expectEqualStrings(\"in\", For.Clause.EachClause.Variant.In.toString());","class":"lineCov","hits":"1","order":"769","possible_hits":"1",},
{"lineNum":"  125","line":"}"},
{"lineNum":"  126","line":""},
{"lineNum":"  127","line":"test \"can dump a CStyle For\" {","class":"lineCov","hits":"3","order":"771","possible_hits":"3",},
{"lineNum":"  128","line":"    const nodes = [_]Node{"},
{"lineNum":"  129","line":"        makeNode(std.testing.allocator, Cursor.new(4, 1), .Int, \"4\"),","class":"lineCov","hits":"1","order":"772","possible_hits":"1",},
{"lineNum":"  130","line":"        makeNode(std.testing.allocator, Cursor.new(1, 1), .Int, \"1\"),","class":"lineCov","hits":"1","order":"773","possible_hits":"1",},
{"lineNum":"  131","line":"        makeNode(std.testing.allocator, Cursor.new(2, 1), .Int, \"2\"),","class":"lineCov","hits":"1","order":"774","possible_hits":"1",},
{"lineNum":"  132","line":"        makeNode(std.testing.allocator, Cursor.new(3, 1), .Int, \"3\"),","class":"lineCov","hits":"1","order":"775","possible_hits":"1",},
{"lineNum":"  133","line":"    };"},
{"lineNum":"  134","line":""},
{"lineNum":"  135","line":"    defer for (nodes) |node|","class":"linePartCov","hits":"2","order":"804","possible_hits":"4",},
{"lineNum":"  136","line":"        std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"805","possible_hits":"2",},
{"lineNum":"  137","line":""},
{"lineNum":"  138","line":"    try (DumpTestCase(For, .For){","class":"linePartCov","hits":"1","order":"803","possible_hits":"2",},
{"lineNum":"  139","line":"        .value = For.new(For.Clause{","class":"lineCov","hits":"2","order":"776","possible_hits":"2",},
{"lineNum":"  140","line":"            .CStyle = .{","class":"lineCov","hits":"1","order":"777","possible_hits":"1",},
{"lineNum":"  141","line":"                .pre = nodes[1],","class":"lineCov","hits":"1","order":"778","possible_hits":"1",},
{"lineNum":"  142","line":"                .cond = nodes[2],","class":"lineCov","hits":"1","order":"779","possible_hits":"1",},
{"lineNum":"  143","line":"                .post = nodes[3],","class":"lineCov","hits":"1","order":"780","possible_hits":"1",},
{"lineNum":"  144","line":"            },"},
{"lineNum":"  145","line":"        }, nodes[0]),","class":"lineCov","hits":"1","order":"781","possible_hits":"1",},
{"lineNum":"  146","line":"        .expected =","class":"lineCov","hits":"1","order":"786","possible_hits":"1",},
{"lineNum":"  147","line":"        \\\\For:"},
{"lineNum":"  148","line":"        \\\\  CStyle:"},
{"lineNum":"  149","line":"        \\\\    Int Node (1:1)"},
{"lineNum":"  150","line":"        \\\\      Int: \"1\""},
{"lineNum":"  151","line":"        \\\\    Int Node (2:1)"},
{"lineNum":"  152","line":"        \\\\      Int: \"2\""},
{"lineNum":"  153","line":"        \\\\    Int Node (3:1)"},
{"lineNum":"  154","line":"        \\\\      Int: \"3\""},
{"lineNum":"  155","line":"        \\\\  Body:"},
{"lineNum":"  156","line":"        \\\\    Int Node (4:1)"},
{"lineNum":"  157","line":"        \\\\      Int: \"4\""},
{"lineNum":"  158","line":"        \\\\"},
{"lineNum":"  159","line":"        ,"},
{"lineNum":"  160","line":"    }).run();","class":"lineCov","hits":"1","order":"787","possible_hits":"1",},
{"lineNum":"  161","line":"}"},
{"lineNum":"  162","line":""},
{"lineNum":"  163","line":"test \"can dump a For Each\" {","class":"lineCov","hits":"3","order":"806","possible_hits":"3",},
{"lineNum":"  164","line":"    const nodes = [_]Node{"},
{"lineNum":"  165","line":"        makeNode(std.testing.allocator, Cursor.new(4, 1), .Int, \"4\"),","class":"lineCov","hits":"1","order":"807","possible_hits":"1",},
{"lineNum":"  166","line":"        makeNode(std.testing.allocator, Cursor.new(1, 1), .Ident, \"anArray\"),","class":"lineCov","hits":"1","order":"808","possible_hits":"1",},
{"lineNum":"  167","line":"    };"},
{"lineNum":"  168","line":""},
{"lineNum":"  169","line":"    defer for (nodes) |node|","class":"linePartCov","hits":"2","order":"826","possible_hits":"4",},
{"lineNum":"  170","line":"        std.testing.allocator.destroy(node);","class":"linePartCov","hits":"1","order":"827","possible_hits":"2",},
{"lineNum":"  171","line":""},
{"lineNum":"  172","line":"    try (DumpTestCase(For, .For){","class":"linePartCov","hits":"1","order":"825","possible_hits":"2",},
{"lineNum":"  173","line":"        .value = For.new(For.Clause{","class":"lineCov","hits":"1","order":"815","possible_hits":"1",},
{"lineNum":"  174","line":"            .Each = .{","class":"lineCov","hits":"1","order":"809","possible_hits":"1",},
{"lineNum":"  175","line":"                .scoping = .Const,","class":"lineCov","hits":"1","order":"811","possible_hits":"1",},
{"lineNum":"  176","line":"                .variant = .Of,","class":"lineCov","hits":"1","order":"812","possible_hits":"1",},
{"lineNum":"  177","line":"                .name = \"i\",","class":"lineCov","hits":"1","order":"813","possible_hits":"1",},
{"lineNum":"  178","line":"                .expr = nodes[1],","class":"lineCov","hits":"1","order":"810","possible_hits":"1",},
{"lineNum":"  179","line":"            },"},
{"lineNum":"  180","line":"        }, nodes[0]),","class":"lineCov","hits":"1","order":"814","possible_hits":"1",},
{"lineNum":"  181","line":"        .expected =","class":"lineCov","hits":"1","order":"816","possible_hits":"1",},
{"lineNum":"  182","line":"        \\\\For:"},
{"lineNum":"  183","line":"        \\\\  Each:"},
{"lineNum":"  184","line":"        \\\\    Const"},
{"lineNum":"  185","line":"        \\\\    i"},
{"lineNum":"  186","line":"        \\\\    Of"},
{"lineNum":"  187","line":"        \\\\    Ident Node (1:1)"},
{"lineNum":"  188","line":"        \\\\      Ident: \"anArray\""},
{"lineNum":"  189","line":"        \\\\  Body:"},
{"lineNum":"  190","line":"        \\\\    Int Node (4:1)"},
{"lineNum":"  191","line":"        \\\\      Int: \"4\""},
{"lineNum":"  192","line":"        \\\\"},
{"lineNum":"  193","line":"        ,"},
{"lineNum":"  194","line":"    }).run();","class":"lineCov","hits":"1","order":"817","possible_hits":"1",},
{"lineNum":"  195","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-03 21:04:56", "instrumented" : 67, "covered" : 67,};
var merged_data = [];
