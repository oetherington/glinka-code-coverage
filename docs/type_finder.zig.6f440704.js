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
{"lineNum":"   26","line":"const Scope = @import(\"scope.zig\").Scope;"},
{"lineNum":"   27","line":"const TypeBook = @import(\"typebook.zig\").TypeBook;"},
{"lineNum":"   28","line":"const Type = @import(\"../common/types/type.zig\").Type;"},
{"lineNum":"   29","line":"const allocate = @import(\"../common/allocate.zig\");"},
{"lineNum":"   30","line":""},
{"lineNum":"   31","line":"const builtinMap = std.ComptimeStringMap("},
{"lineNum":"   32","line":"    fn (self: *TypeBook) Type.Ptr,"},
{"lineNum":"   33","line":"    .{"},
{"lineNum":"   34","line":"        .{ \"number\", TypeBook.getNumber },"},
{"lineNum":"   35","line":"        .{ \"string\", TypeBook.getString },"},
{"lineNum":"   36","line":"        .{ \"boolean\", TypeBook.getBoolean },"},
{"lineNum":"   37","line":"        .{ \"void\", TypeBook.getVoid },"},
{"lineNum":"   38","line":"        .{ \"null\", TypeBook.getNull },"},
{"lineNum":"   39","line":"        .{ \"undefined\", TypeBook.getUndefined },"},
{"lineNum":"   40","line":"        .{ \"any\", TypeBook.getAny },"},
{"lineNum":"   41","line":"    },"},
{"lineNum":"   42","line":");"},
{"lineNum":"   43","line":""},
{"lineNum":"   44","line":"pub fn findType(scope: *Scope, typebook: *TypeBook, nd: Node) ?Type.Ptr {","class":"lineCov","hits":"1","order":"4062","possible_hits":"1",},
{"lineNum":"   45","line":"    switch (nd.data) {","class":"lineCov","hits":"1","order":"4063","possible_hits":"1",},
{"lineNum":"   46","line":"        .TypeName => |name| {","class":"lineCov","hits":"1","order":"4064","possible_hits":"1",},
{"lineNum":"   47","line":"            return if (builtinMap.get(name)) |func|","class":"lineCov","hits":"3","order":"4065","possible_hits":"3",},
{"lineNum":"   48","line":"                func(typebook)","class":"lineCov","hits":"1","order":"4066","possible_hits":"1",},
{"lineNum":"   49","line":"            else"},
{"lineNum":"   50","line":"                scope.getType(name);","class":"lineCov","hits":"1","order":"4307","possible_hits":"1",},
{"lineNum":"   51","line":"        },"},
{"lineNum":"   52","line":"        .ArrayType => |arr| {","class":"lineCov","hits":"1","order":"5496","possible_hits":"1",},
{"lineNum":"   53","line":"            const subtype = findType(scope, typebook, arr);","class":"lineCov","hits":"1","order":"5497","possible_hits":"1",},
{"lineNum":"   54","line":"            return if (subtype) |st|","class":"lineCov","hits":"3","order":"5498","possible_hits":"3",},
{"lineNum":"   55","line":"                typebook.getArray(st)","class":"lineCov","hits":"1","order":"5499","possible_hits":"1",},
{"lineNum":"   56","line":"            else"},
{"lineNum":"   57","line":"                null;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   58","line":"        },"},
{"lineNum":"   59","line":"        .UnionType => |un| {","class":"lineCov","hits":"1","order":"4416","possible_hits":"1",},
{"lineNum":"   60","line":"            const alloc = scope.getAllocator();","class":"lineCov","hits":"1","order":"4417","possible_hits":"1",},
{"lineNum":"   61","line":"            const tys = allocate.alloc(alloc, Type.Ptr, un.items.len);","class":"lineCov","hits":"1","order":"4418","possible_hits":"1",},
{"lineNum":"   62","line":"            defer alloc.free(tys);","class":"linePartCov","hits":"1","order":"4423","possible_hits":"2",},
{"lineNum":"   63","line":""},
{"lineNum":"   64","line":"            for (un.items) |item, index| {","class":"lineCov","hits":"2","order":"4419","possible_hits":"2",},
{"lineNum":"   65","line":"                if (findType(scope, typebook, item)) |ty|","class":"lineCov","hits":"3","order":"4420","possible_hits":"3",},
{"lineNum":"   66","line":"                    tys[index] = ty","class":"linePartCov","hits":"1","order":"4421","possible_hits":"2",},
{"lineNum":"   67","line":"                else"},
{"lineNum":"   68","line":"                    return null;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   69","line":"            }"},
{"lineNum":"   70","line":""},
{"lineNum":"   71","line":"            return typebook.getUnion(tys);","class":"lineCov","hits":"2","order":"4422","possible_hits":"2",},
{"lineNum":"   72","line":"        },"},
{"lineNum":"   73","line":"        // TODO: Process function type literals"},
{"lineNum":"   74","line":"        else => return null,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   75","line":"    }"},
{"lineNum":"   76","line":"}"},
{"lineNum":"   77","line":""},
{"lineNum":"   78","line":"const FindTypeTestCase = struct {"},
{"lineNum":"   79","line":"    inputNode: Node,"},
{"lineNum":"   80","line":"    setup: ?fn (scope: *Scope, typebook: *TypeBook) anyerror!void,"},
{"lineNum":"   81","line":"    check: fn (ty: ?Type.Ptr) anyerror!void,"},
{"lineNum":"   82","line":""},
{"lineNum":"   83","line":"    pub fn run(self: FindTypeTestCase) !void {","class":"lineCov","hits":"3","order":"5463","possible_hits":"3",},
{"lineNum":"   84","line":"        const scope = Scope.new(std.testing.allocator, null);","class":"lineCov","hits":"1","order":"5464","possible_hits":"1",},
{"lineNum":"   85","line":"        defer scope.deinit();","class":"linePartCov","hits":"1","order":"5474","possible_hits":"3",},
{"lineNum":"   86","line":""},
{"lineNum":"   87","line":"        var typebook = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"5465","possible_hits":"1",},
{"lineNum":"   88","line":"        defer typebook.deinit();","class":"linePartCov","hits":"1","order":"5473","possible_hits":"3",},
{"lineNum":"   89","line":""},
{"lineNum":"   90","line":"        defer std.testing.allocator.destroy(self.inputNode);","class":"linePartCov","hits":"1","order":"5472","possible_hits":"3",},
{"lineNum":"   91","line":""},
{"lineNum":"   92","line":"        if (self.setup) |setup|","class":"lineCov","hits":"2","order":"5466","possible_hits":"2",},
{"lineNum":"   93","line":"            try setup(scope, typebook);","class":"linePartCov","hits":"1","order":"5482","possible_hits":"2",},
{"lineNum":"   94","line":""},
{"lineNum":"   95","line":"        const ty = findType(scope, typebook, self.inputNode);","class":"lineCov","hits":"1","order":"5467","possible_hits":"1",},
{"lineNum":"   96","line":"        try self.check(ty);","class":"linePartCov","hits":"1","order":"5468","possible_hits":"2",},
{"lineNum":"   97","line":"    }"},
{"lineNum":"   98","line":"};"},
{"lineNum":"   99","line":""},
{"lineNum":"  100","line":"test \"can lookup builtin types\" {","class":"lineCov","hits":"2","order":"5457","possible_hits":"2",},
{"lineNum":"  101","line":"    try (FindTypeTestCase{","class":"lineCov","hits":"1","order":"5475","possible_hits":"1",},
{"lineNum":"  102","line":"        .inputNode = makeNode(","class":"lineCov","hits":"1","order":"5459","possible_hits":"1",},
{"lineNum":"  103","line":"            std.testing.allocator,"},
{"lineNum":"  104","line":"            Cursor.new(11, 4),","class":"lineCov","hits":"1","order":"5458","possible_hits":"1",},
{"lineNum":"  105","line":"            .TypeName,"},
{"lineNum":"  106","line":"            \"number\","},
{"lineNum":"  107","line":"        ),"},
{"lineNum":"  108","line":"        .setup = null,","class":"lineCov","hits":"1","order":"5460","possible_hits":"1",},
{"lineNum":"  109","line":"        .check = (struct {","class":"lineCov","hits":"1","order":"5461","possible_hits":"1",},
{"lineNum":"  110","line":"            fn check(ty: ?Type.Ptr) anyerror!void {","class":"lineCov","hits":"2","order":"5469","possible_hits":"2",},
{"lineNum":"  111","line":"                try expect(ty != null);","class":"lineCov","hits":"1","order":"5470","possible_hits":"1",},
{"lineNum":"  112","line":"                try expectEqual(Type.Type.Number, ty.?.getType());","class":"linePartCov","hits":"1","order":"5471","possible_hits":"2",},
{"lineNum":"  113","line":"            }"},
{"lineNum":"  114","line":"        }).check,"},
{"lineNum":"  115","line":"    }).run();","class":"lineCov","hits":"1","order":"5462","possible_hits":"1",},
{"lineNum":"  116","line":"}"},
{"lineNum":"  117","line":""},
{"lineNum":"  118","line":"test \"can lookup custom named types\" {","class":"lineCov","hits":"2","order":"5476","possible_hits":"2",},
{"lineNum":"  119","line":"    try (FindTypeTestCase{","class":"lineCov","hits":"1","order":"5488","possible_hits":"1",},
{"lineNum":"  120","line":"        .inputNode = makeNode(","class":"lineCov","hits":"1","order":"5478","possible_hits":"1",},
{"lineNum":"  121","line":"            std.testing.allocator,"},
{"lineNum":"  122","line":"            Cursor.new(11, 4),","class":"lineCov","hits":"1","order":"5477","possible_hits":"1",},
{"lineNum":"  123","line":"            .TypeName,"},
{"lineNum":"  124","line":"            \"AnAlias\","},
{"lineNum":"  125","line":"        ),"},
{"lineNum":"  126","line":"        .setup = (struct {","class":"lineCov","hits":"1","order":"5479","possible_hits":"1",},
{"lineNum":"  127","line":"            pub fn setup(scope: *Scope, typebook: *TypeBook) anyerror!void {","class":"lineCov","hits":"2","order":"5483","possible_hits":"2",},
{"lineNum":"  128","line":"                scope.putType(\"AnAlias\", typebook.getBoolean());","class":"lineCov","hits":"1","order":"5484","possible_hits":"1",},
{"lineNum":"  129","line":"            }"},
{"lineNum":"  130","line":"        }).setup,"},
{"lineNum":"  131","line":"        .check = (struct {","class":"lineCov","hits":"1","order":"5480","possible_hits":"1",},
{"lineNum":"  132","line":"            fn check(ty: ?Type.Ptr) anyerror!void {","class":"lineCov","hits":"2","order":"5485","possible_hits":"2",},
{"lineNum":"  133","line":"                try expect(ty != null);","class":"lineCov","hits":"1","order":"5486","possible_hits":"1",},
{"lineNum":"  134","line":"                try expectEqual(Type.Type.Boolean, ty.?.getType());","class":"linePartCov","hits":"1","order":"5487","possible_hits":"2",},
{"lineNum":"  135","line":"            }"},
{"lineNum":"  136","line":"        }).check,"},
{"lineNum":"  137","line":"    }).run();","class":"lineCov","hits":"1","order":"5481","possible_hits":"1",},
{"lineNum":"  138","line":"}"},
{"lineNum":"  139","line":""},
{"lineNum":"  140","line":"test \"can lookup array types\" {","class":"lineCov","hits":"3","order":"5489","possible_hits":"3",},
{"lineNum":"  141","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"  142","line":"    const csr = Cursor.new(6, 7);","class":"lineCov","hits":"1","order":"5490","possible_hits":"1",},
{"lineNum":"  143","line":""},
{"lineNum":"  144","line":"    const string = makeNode(alloc, csr, .TypeName, \"string\");","class":"lineCov","hits":"1","order":"5491","possible_hits":"1",},
{"lineNum":"  145","line":"    defer alloc.destroy(string);","class":"linePartCov","hits":"1","order":"5504","possible_hits":"2",},
{"lineNum":"  146","line":""},
{"lineNum":"  147","line":"    try (FindTypeTestCase{","class":"linePartCov","hits":"1","order":"5503","possible_hits":"2",},
{"lineNum":"  148","line":"        .inputNode = makeNode(alloc, csr, .ArrayType, string),","class":"lineCov","hits":"1","order":"5492","possible_hits":"1",},
{"lineNum":"  149","line":"        .setup = null,","class":"lineCov","hits":"1","order":"5493","possible_hits":"1",},
{"lineNum":"  150","line":"        .check = (struct {","class":"lineCov","hits":"1","order":"5494","possible_hits":"1",},
{"lineNum":"  151","line":"            fn check(ty: ?Type.Ptr) anyerror!void {","class":"lineCov","hits":"2","order":"5500","possible_hits":"2",},
{"lineNum":"  152","line":"                try expectEqual(Type.Type.Array, ty.?.getType());","class":"linePartCov","hits":"1","order":"5501","possible_hits":"2",},
{"lineNum":"  153","line":"                try expectEqual(Type.Type.String, ty.?.Array.subtype.getType());","class":"linePartCov","hits":"1","order":"5502","possible_hits":"2",},
{"lineNum":"  154","line":"            }"},
{"lineNum":"  155","line":"        }).check,"},
{"lineNum":"  156","line":"    }).run();","class":"lineCov","hits":"1","order":"5495","possible_hits":"1",},
{"lineNum":"  157","line":"}"},
{"lineNum":"  158","line":""},
{"lineNum":"  159","line":"test \"can lookup union types\" {","class":"lineCov","hits":"3","order":"5505","possible_hits":"3",},
{"lineNum":"  160","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"  161","line":"    const csr = Cursor.new(6, 7);","class":"lineCov","hits":"1","order":"5506","possible_hits":"1",},
{"lineNum":"  162","line":""},
{"lineNum":"  163","line":"    const string = makeNode(alloc, csr, .TypeName, \"string\");","class":"lineCov","hits":"1","order":"5507","possible_hits":"1",},
{"lineNum":"  164","line":"    const number = makeNode(alloc, csr, .TypeName, \"number\");","class":"lineCov","hits":"1","order":"5508","possible_hits":"1",},
{"lineNum":"  165","line":"    defer alloc.destroy(string);","class":"linePartCov","hits":"1","order":"5525","possible_hits":"4",},
{"lineNum":"  166","line":"    defer alloc.destroy(number);","class":"linePartCov","hits":"1","order":"5524","possible_hits":"4",},
{"lineNum":"  167","line":""},
{"lineNum":"  168","line":"    var list = node.NodeList{};","class":"lineCov","hits":"1","order":"5509","possible_hits":"1",},
{"lineNum":"  169","line":"    defer list.deinit(alloc);","class":"linePartCov","hits":"1","order":"5523","possible_hits":"4",},
{"lineNum":"  170","line":"    try list.append(alloc, string);","class":"linePartCov","hits":"1","order":"5510","possible_hits":"2",},
{"lineNum":"  171","line":"    try list.append(alloc, number);","class":"linePartCov","hits":"1","order":"5511","possible_hits":"2",},
{"lineNum":"  172","line":""},
{"lineNum":"  173","line":"    try (FindTypeTestCase{","class":"linePartCov","hits":"1","order":"5522","possible_hits":"2",},
{"lineNum":"  174","line":"        .inputNode = makeNode(alloc, csr, .UnionType, list),","class":"lineCov","hits":"1","order":"5512","possible_hits":"1",},
{"lineNum":"  175","line":"        .setup = null,","class":"lineCov","hits":"1","order":"5513","possible_hits":"1",},
{"lineNum":"  176","line":"        .check = (struct {","class":"lineCov","hits":"1","order":"5514","possible_hits":"1",},
{"lineNum":"  177","line":"            fn check(ty: ?Type.Ptr) anyerror!void {","class":"lineCov","hits":"2","order":"5516","possible_hits":"2",},
{"lineNum":"  178","line":"                try expectEqual(Type.Type.Union, ty.?.getType());","class":"linePartCov","hits":"1","order":"5517","possible_hits":"2",},
{"lineNum":"  179","line":""},
{"lineNum":"  180","line":"                const tys: []Type.Ptr = ty.?.Union.tys;","class":"linePartCov","hits":"1","order":"5518","possible_hits":"3",},
{"lineNum":"  181","line":"                try expectEqual(@intCast(usize, 2), tys.len);","class":"linePartCov","hits":"1","order":"5519","possible_hits":"2",},
{"lineNum":"  182","line":"                try expectEqual(Type.Type.Number, tys[0].getType());","class":"linePartCov","hits":"1","order":"5520","possible_hits":"2",},
{"lineNum":"  183","line":"                try expectEqual(Type.Type.String, tys[1].getType());","class":"linePartCov","hits":"1","order":"5521","possible_hits":"2",},
{"lineNum":"  184","line":"            }"},
{"lineNum":"  185","line":"        }).check,"},
{"lineNum":"  186","line":"    }).run();","class":"lineCov","hits":"1","order":"5515","possible_hits":"1",},
{"lineNum":"  187","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2021-12-31 18:19:35", "instrumented" : 86, "covered" : 83,};
var merged_data = [];
