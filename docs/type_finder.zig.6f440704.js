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
{"lineNum":"   21","line":"const Cursor = @import(\"../common/cursor.zig\").Cursor;"},
{"lineNum":"   22","line":"const node = @import(\"../common/node.zig\");"},
{"lineNum":"   23","line":"const Node = node.Node;"},
{"lineNum":"   24","line":"const NodeType = node.NodeType;"},
{"lineNum":"   25","line":"const makeNode = node.makeNode;"},
{"lineNum":"   26","line":"const Compiler = @import(\"compiler.zig\").Compiler;"},
{"lineNum":"   27","line":"const NopBackend = @import(\"compiler_test_case.zig\").NopBackend;"},
{"lineNum":"   28","line":"const Config = @import(\"../common/config.zig\").Config;"},
{"lineNum":"   29","line":"const Scope = @import(\"scope.zig\").Scope;"},
{"lineNum":"   30","line":"const TypeBook = @import(\"typebook.zig\").TypeBook;"},
{"lineNum":"   31","line":"const Type = @import(\"../common/types/type.zig\").Type;"},
{"lineNum":"   32","line":"const allocate = @import(\"../common/allocate.zig\");"},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"const builtinMap = std.ComptimeStringMap("},
{"lineNum":"   35","line":"    fn (self: *TypeBook) Type.Ptr,"},
{"lineNum":"   36","line":"    .{"},
{"lineNum":"   37","line":"        .{ \"number\", TypeBook.getNumber },"},
{"lineNum":"   38","line":"        .{ \"string\", TypeBook.getString },"},
{"lineNum":"   39","line":"        .{ \"boolean\", TypeBook.getBoolean },"},
{"lineNum":"   40","line":"        .{ \"void\", TypeBook.getVoid },"},
{"lineNum":"   41","line":"        .{ \"null\", TypeBook.getNull },"},
{"lineNum":"   42","line":"        .{ \"undefined\", TypeBook.getUndefined },"},
{"lineNum":"   43","line":"        .{ \"any\", TypeBook.getAny },"},
{"lineNum":"   44","line":"    },"},
{"lineNum":"   45","line":");"},
{"lineNum":"   46","line":""},
{"lineNum":"   47","line":"pub fn findType(cmp: *Compiler, nd: Node) ?Type.Ptr {","class":"lineCov","hits":"1","order":"3082","possible_hits":"1",},
{"lineNum":"   48","line":"    switch (nd.data) {","class":"lineCov","hits":"1","order":"3083","possible_hits":"1",},
{"lineNum":"   49","line":"        .TypeName => |name| {","class":"lineCov","hits":"1","order":"3089","possible_hits":"1",},
{"lineNum":"   50","line":"            return if (builtinMap.get(name)) |func|","class":"lineCov","hits":"3","order":"3090","possible_hits":"3",},
{"lineNum":"   51","line":"                func(cmp.typebook)","class":"lineCov","hits":"1","order":"3091","possible_hits":"1",},
{"lineNum":"   52","line":"            else"},
{"lineNum":"   53","line":"                cmp.scope.getType(name);","class":"lineCov","hits":"1","order":"3426","possible_hits":"1",},
{"lineNum":"   54","line":"        },"},
{"lineNum":"   55","line":"        .ArrayType => |arr| {","class":"lineCov","hits":"1","order":"6088","possible_hits":"1",},
{"lineNum":"   56","line":"            const subtype = findType(cmp, arr);","class":"lineCov","hits":"1","order":"6089","possible_hits":"1",},
{"lineNum":"   57","line":"            return if (subtype) |st|","class":"lineCov","hits":"3","order":"6090","possible_hits":"3",},
{"lineNum":"   58","line":"                cmp.typebook.getArray(st)","class":"lineCov","hits":"1","order":"6091","possible_hits":"1",},
{"lineNum":"   59","line":"            else"},
{"lineNum":"   60","line":"                null;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   61","line":"        },"},
{"lineNum":"   62","line":"        // TODO: Process function type literals"},
{"lineNum":"   63","line":"        .UnionType => |un| {","class":"lineCov","hits":"1","order":"3084","possible_hits":"1",},
{"lineNum":"   64","line":"            // TODO: Refactor this to avoid allocation"},
{"lineNum":"   65","line":"            const alloc = cmp.alloc;","class":"lineCov","hits":"1","order":"3085","possible_hits":"1",},
{"lineNum":"   66","line":"            const tys = allocate.alloc(alloc, Type.Ptr, un.items.len);","class":"lineCov","hits":"1","order":"3086","possible_hits":"1",},
{"lineNum":"   67","line":"            defer alloc.free(tys);","class":"linePartCov","hits":"1","order":"3094","possible_hits":"2",},
{"lineNum":"   68","line":""},
{"lineNum":"   69","line":"            for (un.items) |item, index| {","class":"lineCov","hits":"2","order":"3087","possible_hits":"2",},
{"lineNum":"   70","line":"                if (findType(cmp, item)) |ty|","class":"lineCov","hits":"3","order":"3088","possible_hits":"3",},
{"lineNum":"   71","line":"                    tys[index] = ty","class":"linePartCov","hits":"1","order":"3092","possible_hits":"2",},
{"lineNum":"   72","line":"                else"},
{"lineNum":"   73","line":"                    return null;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   74","line":"            }"},
{"lineNum":"   75","line":""},
{"lineNum":"   76","line":"            return cmp.typebook.getUnion(tys);","class":"lineCov","hits":"2","order":"3093","possible_hits":"2",},
{"lineNum":"   77","line":"        },"},
{"lineNum":"   78","line":"        .InterfaceType => |obj| {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   79","line":"            // TODO: Refactor this to avoid allocation"},
{"lineNum":"   80","line":"            const alloc = cmp.alloc;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   81","line":"            const members = allocate.alloc(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   82","line":"                alloc,"},
{"lineNum":"   83","line":"                Type.InterfaceType.Member,"},
{"lineNum":"   84","line":"                obj.members.items.len,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   85","line":"            );"},
{"lineNum":"   86","line":"            defer alloc.free(members);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   87","line":""},
{"lineNum":"   88","line":"            for (obj.members.items) |member, index| {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   89","line":"                if (findType(cmp, member.ty)) |ty|","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   90","line":"                    members[index] = Type.InterfaceType.Member{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   91","line":"                        .name = member.name,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   92","line":"                        .ty = ty,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   93","line":"                    }"},
{"lineNum":"   94","line":"                else"},
{"lineNum":"   95","line":"                    return null;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   96","line":"            }"},
{"lineNum":"   97","line":""},
{"lineNum":"   98","line":"            return cmp.typebook.getInterface(members);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   99","line":"        },"},
{"lineNum":"  100","line":"        .TypeOf => |expr| return cmp.inferExprType(expr),","class":"lineCov","hits":"1","order":"6132","possible_hits":"1",},
{"lineNum":"  101","line":"        else => return null,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  102","line":"    }"},
{"lineNum":"  103","line":"}"},
{"lineNum":"  104","line":""},
{"lineNum":"  105","line":"const FindTypeTestCase = struct {"},
{"lineNum":"  106","line":"    inputNode: Node,"},
{"lineNum":"  107","line":"    setup: ?fn (scope: *Scope, typebook: *TypeBook) anyerror!void,"},
{"lineNum":"  108","line":"    check: fn (ty: ?Type.Ptr) anyerror!void,"},
{"lineNum":"  109","line":"    cleanup: ?fn (cmp: *Compiler, nd: Node) anyerror!void,"},
{"lineNum":"  110","line":""},
{"lineNum":"  111","line":"    pub fn run(self: FindTypeTestCase) !void {","class":"lineCov","hits":"3","order":"6053","possible_hits":"3",},
{"lineNum":"  112","line":"        const cfg = Config{};"},
{"lineNum":"  113","line":"        var backend = NopBackend.new();","class":"lineCov","hits":"1","order":"6054","possible_hits":"1",},
{"lineNum":"  114","line":"        var cmp = Compiler.new(std.testing.allocator, &cfg, &backend.backend);","class":"lineCov","hits":"1","order":"6055","possible_hits":"1",},
{"lineNum":"  115","line":"        defer cmp.deinit();","class":"linePartCov","hits":"1","order":"6064","possible_hits":"4",},
{"lineNum":"  116","line":""},
{"lineNum":"  117","line":"        defer std.testing.allocator.destroy(self.inputNode);","class":"linePartCov","hits":"1","order":"6063","possible_hits":"4",},
{"lineNum":"  118","line":""},
{"lineNum":"  119","line":"        if (self.setup) |setup|","class":"lineCov","hits":"2","order":"6056","possible_hits":"2",},
{"lineNum":"  120","line":"            try setup(cmp.scope, cmp.typebook);","class":"linePartCov","hits":"1","order":"6073","possible_hits":"2",},
{"lineNum":"  121","line":""},
{"lineNum":"  122","line":"        const ty = findType(&cmp, self.inputNode);","class":"lineCov","hits":"1","order":"6057","possible_hits":"1",},
{"lineNum":"  123","line":"        try self.check(ty);","class":"linePartCov","hits":"1","order":"6058","possible_hits":"2",},
{"lineNum":"  124","line":""},
{"lineNum":"  125","line":"        if (self.cleanup) |cleanup|","class":"lineCov","hits":"2","order":"6062","possible_hits":"2",},
{"lineNum":"  126","line":"            try cleanup(&cmp, self.inputNode);","class":"linePartCov","hits":"1","order":"6136","possible_hits":"2",},
{"lineNum":"  127","line":"    }"},
{"lineNum":"  128","line":"};"},
{"lineNum":"  129","line":""},
{"lineNum":"  130","line":"test \"can lookup builtin types\" {","class":"lineCov","hits":"2","order":"6046","possible_hits":"2",},
{"lineNum":"  131","line":"    try (FindTypeTestCase{","class":"lineCov","hits":"1","order":"6065","possible_hits":"1",},
{"lineNum":"  132","line":"        .inputNode = makeNode(","class":"lineCov","hits":"1","order":"6048","possible_hits":"1",},
{"lineNum":"  133","line":"            std.testing.allocator,"},
{"lineNum":"  134","line":"            Cursor.new(11, 4),","class":"lineCov","hits":"1","order":"6047","possible_hits":"1",},
{"lineNum":"  135","line":"            .TypeName,"},
{"lineNum":"  136","line":"            \"number\","},
{"lineNum":"  137","line":"        ),"},
{"lineNum":"  138","line":"        .setup = null,","class":"lineCov","hits":"1","order":"6049","possible_hits":"1",},
{"lineNum":"  139","line":"        .check = (struct {","class":"lineCov","hits":"1","order":"6050","possible_hits":"1",},
{"lineNum":"  140","line":"            fn check(ty: ?Type.Ptr) anyerror!void {","class":"lineCov","hits":"2","order":"6059","possible_hits":"2",},
{"lineNum":"  141","line":"                try expect(ty != null);","class":"lineCov","hits":"1","order":"6060","possible_hits":"1",},
{"lineNum":"  142","line":"                try expectEqual(Type.Type.Number, ty.?.getType());","class":"linePartCov","hits":"1","order":"6061","possible_hits":"2",},
{"lineNum":"  143","line":"            }"},
{"lineNum":"  144","line":"        }).check,"},
{"lineNum":"  145","line":"        .cleanup = null,","class":"lineCov","hits":"1","order":"6051","possible_hits":"1",},
{"lineNum":"  146","line":"    }).run();","class":"lineCov","hits":"1","order":"6052","possible_hits":"1",},
{"lineNum":"  147","line":"}"},
{"lineNum":"  148","line":""},
{"lineNum":"  149","line":"test \"can lookup custom named types\" {","class":"lineCov","hits":"2","order":"6066","possible_hits":"2",},
{"lineNum":"  150","line":"    try (FindTypeTestCase{","class":"lineCov","hits":"1","order":"6079","possible_hits":"1",},
{"lineNum":"  151","line":"        .inputNode = makeNode(","class":"lineCov","hits":"1","order":"6068","possible_hits":"1",},
{"lineNum":"  152","line":"            std.testing.allocator,"},
{"lineNum":"  153","line":"            Cursor.new(11, 4),","class":"lineCov","hits":"1","order":"6067","possible_hits":"1",},
{"lineNum":"  154","line":"            .TypeName,"},
{"lineNum":"  155","line":"            \"AnAlias\","},
{"lineNum":"  156","line":"        ),"},
{"lineNum":"  157","line":"        .setup = (struct {","class":"lineCov","hits":"1","order":"6069","possible_hits":"1",},
{"lineNum":"  158","line":"            pub fn setup(scope: *Scope, typebook: *TypeBook) anyerror!void {","class":"lineCov","hits":"2","order":"6074","possible_hits":"2",},
{"lineNum":"  159","line":"                scope.putType(\"AnAlias\", typebook.getBoolean());","class":"lineCov","hits":"1","order":"6075","possible_hits":"1",},
{"lineNum":"  160","line":"            }"},
{"lineNum":"  161","line":"        }).setup,"},
{"lineNum":"  162","line":"        .check = (struct {","class":"lineCov","hits":"1","order":"6070","possible_hits":"1",},
{"lineNum":"  163","line":"            fn check(ty: ?Type.Ptr) anyerror!void {","class":"lineCov","hits":"2","order":"6076","possible_hits":"2",},
{"lineNum":"  164","line":"                try expect(ty != null);","class":"lineCov","hits":"1","order":"6077","possible_hits":"1",},
{"lineNum":"  165","line":"                try expectEqual(Type.Type.Boolean, ty.?.getType());","class":"linePartCov","hits":"1","order":"6078","possible_hits":"2",},
{"lineNum":"  166","line":"            }"},
{"lineNum":"  167","line":"        }).check,"},
{"lineNum":"  168","line":"        .cleanup = null,","class":"lineCov","hits":"1","order":"6071","possible_hits":"1",},
{"lineNum":"  169","line":"    }).run();","class":"lineCov","hits":"1","order":"6072","possible_hits":"1",},
{"lineNum":"  170","line":"}"},
{"lineNum":"  171","line":""},
{"lineNum":"  172","line":"test \"can lookup array types\" {","class":"lineCov","hits":"3","order":"6080","possible_hits":"3",},
{"lineNum":"  173","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"  174","line":"    const csr = Cursor.new(6, 7);","class":"lineCov","hits":"1","order":"6081","possible_hits":"1",},
{"lineNum":"  175","line":""},
{"lineNum":"  176","line":"    const string = makeNode(alloc, csr, .TypeName, \"string\");","class":"lineCov","hits":"1","order":"6082","possible_hits":"1",},
{"lineNum":"  177","line":"    defer alloc.destroy(string);","class":"linePartCov","hits":"1","order":"6096","possible_hits":"2",},
{"lineNum":"  178","line":""},
{"lineNum":"  179","line":"    try (FindTypeTestCase{","class":"linePartCov","hits":"1","order":"6095","possible_hits":"2",},
{"lineNum":"  180","line":"        .inputNode = makeNode(alloc, csr, .ArrayType, string),","class":"lineCov","hits":"1","order":"6083","possible_hits":"1",},
{"lineNum":"  181","line":"        .setup = null,","class":"lineCov","hits":"1","order":"6084","possible_hits":"1",},
{"lineNum":"  182","line":"        .check = (struct {","class":"lineCov","hits":"1","order":"6085","possible_hits":"1",},
{"lineNum":"  183","line":"            fn check(ty: ?Type.Ptr) anyerror!void {","class":"lineCov","hits":"2","order":"6092","possible_hits":"2",},
{"lineNum":"  184","line":"                try expectEqual(Type.Type.Array, ty.?.getType());","class":"linePartCov","hits":"1","order":"6093","possible_hits":"2",},
{"lineNum":"  185","line":"                try expectEqual(Type.Type.String, ty.?.Array.subtype.getType());","class":"linePartCov","hits":"1","order":"6094","possible_hits":"2",},
{"lineNum":"  186","line":"            }"},
{"lineNum":"  187","line":"        }).check,"},
{"lineNum":"  188","line":"        .cleanup = null,","class":"lineCov","hits":"1","order":"6086","possible_hits":"1",},
{"lineNum":"  189","line":"    }).run();","class":"lineCov","hits":"1","order":"6087","possible_hits":"1",},
{"lineNum":"  190","line":"}"},
{"lineNum":"  191","line":""},
{"lineNum":"  192","line":"test \"can lookup union types\" {","class":"lineCov","hits":"3","order":"6097","possible_hits":"3",},
{"lineNum":"  193","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"  194","line":"    const csr = Cursor.new(6, 7);","class":"lineCov","hits":"1","order":"6098","possible_hits":"1",},
{"lineNum":"  195","line":""},
{"lineNum":"  196","line":"    const string = makeNode(alloc, csr, .TypeName, \"string\");","class":"lineCov","hits":"1","order":"6099","possible_hits":"1",},
{"lineNum":"  197","line":"    const number = makeNode(alloc, csr, .TypeName, \"number\");","class":"lineCov","hits":"1","order":"6100","possible_hits":"1",},
{"lineNum":"  198","line":"    defer alloc.destroy(string);","class":"linePartCov","hits":"1","order":"6118","possible_hits":"4",},
{"lineNum":"  199","line":"    defer alloc.destroy(number);","class":"linePartCov","hits":"1","order":"6117","possible_hits":"4",},
{"lineNum":"  200","line":""},
{"lineNum":"  201","line":"    var list = node.NodeList{};","class":"lineCov","hits":"1","order":"6101","possible_hits":"1",},
{"lineNum":"  202","line":"    defer list.deinit(alloc);","class":"linePartCov","hits":"1","order":"6116","possible_hits":"4",},
{"lineNum":"  203","line":"    try list.append(alloc, string);","class":"linePartCov","hits":"1","order":"6102","possible_hits":"2",},
{"lineNum":"  204","line":"    try list.append(alloc, number);","class":"linePartCov","hits":"1","order":"6103","possible_hits":"2",},
{"lineNum":"  205","line":""},
{"lineNum":"  206","line":"    try (FindTypeTestCase{","class":"linePartCov","hits":"1","order":"6115","possible_hits":"2",},
{"lineNum":"  207","line":"        .inputNode = makeNode(alloc, csr, .UnionType, list),","class":"lineCov","hits":"1","order":"6104","possible_hits":"1",},
{"lineNum":"  208","line":"        .setup = null,","class":"lineCov","hits":"1","order":"6105","possible_hits":"1",},
{"lineNum":"  209","line":"        .check = (struct {","class":"lineCov","hits":"1","order":"6106","possible_hits":"1",},
{"lineNum":"  210","line":"            fn check(ty: ?Type.Ptr) anyerror!void {","class":"lineCov","hits":"2","order":"6109","possible_hits":"2",},
{"lineNum":"  211","line":"                try expectEqual(Type.Type.Union, ty.?.getType());","class":"linePartCov","hits":"1","order":"6110","possible_hits":"2",},
{"lineNum":"  212","line":""},
{"lineNum":"  213","line":"                const tys: []Type.Ptr = ty.?.Union.tys;","class":"linePartCov","hits":"1","order":"6111","possible_hits":"3",},
{"lineNum":"  214","line":"                try expectEqual(@intCast(usize, 2), tys.len);","class":"linePartCov","hits":"1","order":"6112","possible_hits":"2",},
{"lineNum":"  215","line":"                try expectEqual(Type.Type.Number, tys[0].getType());","class":"linePartCov","hits":"1","order":"6113","possible_hits":"2",},
{"lineNum":"  216","line":"                try expectEqual(Type.Type.String, tys[1].getType());","class":"linePartCov","hits":"1","order":"6114","possible_hits":"2",},
{"lineNum":"  217","line":"            }"},
{"lineNum":"  218","line":"        }).check,"},
{"lineNum":"  219","line":"        .cleanup = null,","class":"lineCov","hits":"1","order":"6107","possible_hits":"1",},
{"lineNum":"  220","line":"    }).run();","class":"lineCov","hits":"1","order":"6108","possible_hits":"1",},
{"lineNum":"  221","line":"}"},
{"lineNum":"  222","line":""},
{"lineNum":"  223","line":"test \"can lookup types using typeof\" {","class":"lineCov","hits":"2","order":"6119","possible_hits":"2",},
{"lineNum":"  224","line":"    try (FindTypeTestCase{","class":"lineCov","hits":"1","order":"6139","possible_hits":"1",},
{"lineNum":"  225","line":"        .inputNode = makeNode(","class":"lineCov","hits":"1","order":"6123","possible_hits":"1",},
{"lineNum":"  226","line":"            std.testing.allocator,"},
{"lineNum":"  227","line":"            Cursor.new(11, 4),","class":"lineCov","hits":"1","order":"6120","possible_hits":"1",},
{"lineNum":"  228","line":"            .TypeOf,"},
{"lineNum":"  229","line":"            makeNode(","class":"lineCov","hits":"1","order":"6122","possible_hits":"1",},
{"lineNum":"  230","line":"                std.testing.allocator,"},
{"lineNum":"  231","line":"                Cursor.new(11, 12),","class":"lineCov","hits":"1","order":"6121","possible_hits":"1",},
{"lineNum":"  232","line":"                .Ident,"},
{"lineNum":"  233","line":"                \"aVar\","},
{"lineNum":"  234","line":"            ),"},
{"lineNum":"  235","line":"        ),"},
{"lineNum":"  236","line":"        .setup = (struct {","class":"lineCov","hits":"1","order":"6124","possible_hits":"1",},
{"lineNum":"  237","line":"            pub fn setup(scope: *Scope, typebook: *TypeBook) anyerror!void {","class":"lineCov","hits":"2","order":"6128","possible_hits":"2",},
{"lineNum":"  238","line":"                scope.put(","class":"lineCov","hits":"2","order":"6129","possible_hits":"2",},
{"lineNum":"  239","line":"                    \"aVar\","},
{"lineNum":"  240","line":"                    typebook.getNumber(),","class":"lineCov","hits":"1","order":"6130","possible_hits":"1",},
{"lineNum":"  241","line":"                    false,"},
{"lineNum":"  242","line":"                    Cursor.new(1, 1),","class":"lineCov","hits":"1","order":"6131","possible_hits":"1",},
{"lineNum":"  243","line":"                );"},
{"lineNum":"  244","line":"            }"},
{"lineNum":"  245","line":"        }).setup,"},
{"lineNum":"  246","line":"        .check = (struct {","class":"lineCov","hits":"1","order":"6125","possible_hits":"1",},
{"lineNum":"  247","line":"            fn check(ty: ?Type.Ptr) anyerror!void {","class":"lineCov","hits":"2","order":"6133","possible_hits":"2",},
{"lineNum":"  248","line":"                try expect(ty != null);","class":"lineCov","hits":"1","order":"6134","possible_hits":"1",},
{"lineNum":"  249","line":"                try expectEqual(Type.Type.Number, ty.?.getType());","class":"linePartCov","hits":"1","order":"6135","possible_hits":"2",},
{"lineNum":"  250","line":"            }"},
{"lineNum":"  251","line":"        }).check,"},
{"lineNum":"  252","line":"        .cleanup = (struct {","class":"lineCov","hits":"1","order":"6126","possible_hits":"1",},
{"lineNum":"  253","line":"            fn cleanup(cmp: *Compiler, nd: Node) anyerror!void {","class":"lineCov","hits":"2","order":"6137","possible_hits":"2",},
{"lineNum":"  254","line":"                _ = cmp;"},
{"lineNum":"  255","line":"                std.testing.allocator.destroy(nd.data.TypeOf);","class":"linePartCov","hits":"1","order":"6138","possible_hits":"2",},
{"lineNum":"  256","line":"            }"},
{"lineNum":"  257","line":"        }).cleanup,"},
{"lineNum":"  258","line":"    }).run();","class":"lineCov","hits":"1","order":"6127","possible_hits":"1",},
{"lineNum":"  259","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-04 07:59:51", "instrumented" : 123, "covered" : 108,};
var merged_data = [];
