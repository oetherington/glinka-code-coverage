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
{"lineNum":"   38","line":"        .{ \"any\", TypeBook.getAny },"},
{"lineNum":"   39","line":"    },"},
{"lineNum":"   40","line":");"},
{"lineNum":"   41","line":""},
{"lineNum":"   42","line":"pub fn findType(scope: *Scope, typebook: *TypeBook, nd: Node) ?Type.Ptr {","class":"lineCov","hits":"1","order":"3334","possible_hits":"1",},
{"lineNum":"   43","line":"    _ = scope;"},
{"lineNum":"   44","line":""},
{"lineNum":"   45","line":"    switch (nd.data) {","class":"lineCov","hits":"1","order":"3335","possible_hits":"1",},
{"lineNum":"   46","line":"        .TypeName => |name| {","class":"lineCov","hits":"1","order":"3336","possible_hits":"1",},
{"lineNum":"   47","line":"            if (builtinMap.get(name)) |func| {","class":"lineCov","hits":"1","order":"3337","possible_hits":"1",},
{"lineNum":"   48","line":"                return func(typebook);","class":"lineCov","hits":"1","order":"3338","possible_hits":"1",},
{"lineNum":"   49","line":"            } else {"},
{"lineNum":"   50","line":"                // TODO: Lookup in scope if not builtin"},
{"lineNum":"   51","line":"                return null;","class":"lineCov","hits":"1","order":"3579","possible_hits":"1",},
{"lineNum":"   52","line":"            }"},
{"lineNum":"   53","line":"        },"},
{"lineNum":"   54","line":"        .ArrayType => |arr| {","class":"lineCov","hits":"1","order":"4734","possible_hits":"1",},
{"lineNum":"   55","line":"            const subtype = findType(scope, typebook, arr);","class":"lineCov","hits":"1","order":"4735","possible_hits":"1",},
{"lineNum":"   56","line":"            return if (subtype) |st|","class":"lineCov","hits":"3","order":"4736","possible_hits":"3",},
{"lineNum":"   57","line":"                typebook.getArray(st)","class":"lineCov","hits":"1","order":"4737","possible_hits":"1",},
{"lineNum":"   58","line":"            else"},
{"lineNum":"   59","line":"                null;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   60","line":"        },"},
{"lineNum":"   61","line":"        .UnionType => |un| {","class":"lineCov","hits":"1","order":"4753","possible_hits":"1",},
{"lineNum":"   62","line":"            const alloc = scope.getAllocator();","class":"lineCov","hits":"1","order":"4754","possible_hits":"1",},
{"lineNum":"   63","line":"            const tys = allocate.alloc(alloc, Type.Ptr, un.items.len);","class":"lineCov","hits":"1","order":"4755","possible_hits":"1",},
{"lineNum":"   64","line":"            defer alloc.free(tys);","class":"linePartCov","hits":"1","order":"4760","possible_hits":"2",},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"            for (un.items) |item, index| {","class":"lineCov","hits":"2","order":"4756","possible_hits":"2",},
{"lineNum":"   67","line":"                if (findType(scope, typebook, item)) |ty|","class":"lineCov","hits":"3","order":"4757","possible_hits":"3",},
{"lineNum":"   68","line":"                    tys[index] = ty","class":"linePartCov","hits":"1","order":"4758","possible_hits":"2",},
{"lineNum":"   69","line":"                else"},
{"lineNum":"   70","line":"                    return null;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   71","line":"            }"},
{"lineNum":"   72","line":""},
{"lineNum":"   73","line":"            return typebook.getUnion(tys);","class":"lineCov","hits":"2","order":"4759","possible_hits":"2",},
{"lineNum":"   74","line":"        },"},
{"lineNum":"   75","line":"        // TODO: Process function type literals"},
{"lineNum":"   76","line":"        else => return null,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   77","line":"    }"},
{"lineNum":"   78","line":"}"},
{"lineNum":"   79","line":""},
{"lineNum":"   80","line":"const FindTypeTestCase = struct {"},
{"lineNum":"   81","line":"    inputNode: Node,"},
{"lineNum":"   82","line":"    check: fn (ty: ?Type.Ptr) anyerror!void,"},
{"lineNum":"   83","line":""},
{"lineNum":"   84","line":"    pub fn run(self: FindTypeTestCase) !void {","class":"lineCov","hits":"3","order":"4716","possible_hits":"3",},
{"lineNum":"   85","line":"        const scope = Scope.new(std.testing.allocator, null);","class":"lineCov","hits":"1","order":"4717","possible_hits":"1",},
{"lineNum":"   86","line":"        defer scope.deinit();","class":"linePartCov","hits":"1","order":"4726","possible_hits":"2",},
{"lineNum":"   87","line":""},
{"lineNum":"   88","line":"        var typebook = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"4718","possible_hits":"1",},
{"lineNum":"   89","line":"        defer typebook.deinit();","class":"linePartCov","hits":"1","order":"4725","possible_hits":"2",},
{"lineNum":"   90","line":""},
{"lineNum":"   91","line":"        defer std.testing.allocator.destroy(self.inputNode);","class":"linePartCov","hits":"1","order":"4724","possible_hits":"2",},
{"lineNum":"   92","line":""},
{"lineNum":"   93","line":"        const ty = findType(scope, typebook, self.inputNode);","class":"lineCov","hits":"1","order":"4719","possible_hits":"1",},
{"lineNum":"   94","line":"        try self.check(ty);","class":"linePartCov","hits":"1","order":"4720","possible_hits":"2",},
{"lineNum":"   95","line":"    }"},
{"lineNum":"   96","line":"};"},
{"lineNum":"   97","line":""},
{"lineNum":"   98","line":"test \"can lookup builtin types\" {","class":"lineCov","hits":"2","order":"4711","possible_hits":"2",},
{"lineNum":"   99","line":"    try (FindTypeTestCase{","class":"lineCov","hits":"1","order":"4727","possible_hits":"1",},
{"lineNum":"  100","line":"        .inputNode = makeNode(","class":"lineCov","hits":"1","order":"4713","possible_hits":"1",},
{"lineNum":"  101","line":"            std.testing.allocator,"},
{"lineNum":"  102","line":"            Cursor.new(11, 4),","class":"lineCov","hits":"1","order":"4712","possible_hits":"1",},
{"lineNum":"  103","line":"            .TypeName,"},
{"lineNum":"  104","line":"            \"number\","},
{"lineNum":"  105","line":"        ),"},
{"lineNum":"  106","line":"        .check = (struct {","class":"lineCov","hits":"1","order":"4714","possible_hits":"1",},
{"lineNum":"  107","line":"            fn check(ty: ?Type.Ptr) anyerror!void {","class":"lineCov","hits":"2","order":"4721","possible_hits":"2",},
{"lineNum":"  108","line":"                try expect(ty != null);","class":"lineCov","hits":"1","order":"4722","possible_hits":"1",},
{"lineNum":"  109","line":"                try expectEqual(Type.Type.Number, ty.?.getType());","class":"linePartCov","hits":"1","order":"4723","possible_hits":"2",},
{"lineNum":"  110","line":"            }"},
{"lineNum":"  111","line":"        }).check,"},
{"lineNum":"  112","line":"    }).run();","class":"lineCov","hits":"1","order":"4715","possible_hits":"1",},
{"lineNum":"  113","line":"}"},
{"lineNum":"  114","line":""},
{"lineNum":"  115","line":"test \"can lookup array types\" {","class":"lineCov","hits":"3","order":"4728","possible_hits":"3",},
{"lineNum":"  116","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"  117","line":"    const csr = Cursor.new(6, 7);","class":"lineCov","hits":"1","order":"4729","possible_hits":"1",},
{"lineNum":"  118","line":""},
{"lineNum":"  119","line":"    const string = makeNode(alloc, csr, .TypeName, \"string\");","class":"lineCov","hits":"1","order":"4730","possible_hits":"1",},
{"lineNum":"  120","line":"    defer alloc.destroy(string);","class":"linePartCov","hits":"1","order":"4742","possible_hits":"2",},
{"lineNum":"  121","line":""},
{"lineNum":"  122","line":"    try (FindTypeTestCase{","class":"linePartCov","hits":"1","order":"4741","possible_hits":"2",},
{"lineNum":"  123","line":"        .inputNode = makeNode(alloc, csr, .ArrayType, string),","class":"lineCov","hits":"1","order":"4731","possible_hits":"1",},
{"lineNum":"  124","line":"        .check = (struct {","class":"lineCov","hits":"1","order":"4732","possible_hits":"1",},
{"lineNum":"  125","line":"            fn check(ty: ?Type.Ptr) anyerror!void {","class":"lineCov","hits":"2","order":"4738","possible_hits":"2",},
{"lineNum":"  126","line":"                try expectEqual(Type.Type.Array, ty.?.getType());","class":"linePartCov","hits":"1","order":"4739","possible_hits":"2",},
{"lineNum":"  127","line":"                try expectEqual(Type.Type.String, ty.?.Array.subtype.getType());","class":"linePartCov","hits":"1","order":"4740","possible_hits":"2",},
{"lineNum":"  128","line":"            }"},
{"lineNum":"  129","line":"        }).check,"},
{"lineNum":"  130","line":"    }).run();","class":"lineCov","hits":"1","order":"4733","possible_hits":"1",},
{"lineNum":"  131","line":"}"},
{"lineNum":"  132","line":""},
{"lineNum":"  133","line":"test \"can lookup union types\" {","class":"lineCov","hits":"3","order":"4743","possible_hits":"3",},
{"lineNum":"  134","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"  135","line":"    const csr = Cursor.new(6, 7);","class":"lineCov","hits":"1","order":"4744","possible_hits":"1",},
{"lineNum":"  136","line":""},
{"lineNum":"  137","line":"    const string = makeNode(alloc, csr, .TypeName, \"string\");","class":"lineCov","hits":"1","order":"4745","possible_hits":"1",},
{"lineNum":"  138","line":"    const number = makeNode(alloc, csr, .TypeName, \"number\");","class":"lineCov","hits":"1","order":"4746","possible_hits":"1",},
{"lineNum":"  139","line":"    defer alloc.destroy(string);","class":"linePartCov","hits":"1","order":"4770","possible_hits":"4",},
{"lineNum":"  140","line":"    defer alloc.destroy(number);","class":"linePartCov","hits":"1","order":"4769","possible_hits":"4",},
{"lineNum":"  141","line":""},
{"lineNum":"  142","line":"    var list = node.NodeList{};","class":"lineCov","hits":"1","order":"4747","possible_hits":"1",},
{"lineNum":"  143","line":"    defer list.deinit(alloc);","class":"linePartCov","hits":"1","order":"4768","possible_hits":"4",},
{"lineNum":"  144","line":"    try list.append(alloc, string);","class":"linePartCov","hits":"1","order":"4748","possible_hits":"2",},
{"lineNum":"  145","line":"    try list.append(alloc, number);","class":"linePartCov","hits":"1","order":"4749","possible_hits":"2",},
{"lineNum":"  146","line":""},
{"lineNum":"  147","line":"    try (FindTypeTestCase{","class":"linePartCov","hits":"1","order":"4767","possible_hits":"2",},
{"lineNum":"  148","line":"        .inputNode = makeNode(alloc, csr, .UnionType, list),","class":"lineCov","hits":"1","order":"4750","possible_hits":"1",},
{"lineNum":"  149","line":"        .check = (struct {","class":"lineCov","hits":"1","order":"4751","possible_hits":"1",},
{"lineNum":"  150","line":"            fn check(ty: ?Type.Ptr) anyerror!void {","class":"lineCov","hits":"2","order":"4761","possible_hits":"2",},
{"lineNum":"  151","line":"                try expectEqual(Type.Type.Union, ty.?.getType());","class":"linePartCov","hits":"1","order":"4762","possible_hits":"2",},
{"lineNum":"  152","line":""},
{"lineNum":"  153","line":"                const tys: []Type.Ptr = ty.?.Union.tys;","class":"linePartCov","hits":"1","order":"4763","possible_hits":"3",},
{"lineNum":"  154","line":"                try expectEqual(@intCast(usize, 2), tys.len);","class":"linePartCov","hits":"1","order":"4764","possible_hits":"2",},
{"lineNum":"  155","line":"                try expectEqual(Type.Type.Number, tys[0].getType());","class":"linePartCov","hits":"1","order":"4765","possible_hits":"2",},
{"lineNum":"  156","line":"                try expectEqual(Type.Type.String, tys[1].getType());","class":"linePartCov","hits":"1","order":"4766","possible_hits":"2",},
{"lineNum":"  157","line":"            }"},
{"lineNum":"  158","line":"        }).check,"},
{"lineNum":"  159","line":"    }).run();","class":"lineCov","hits":"1","order":"4752","possible_hits":"1",},
{"lineNum":"  160","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2021-12-30 12:35:19", "instrumented" : 69, "covered" : 66,};
var merged_data = [];
