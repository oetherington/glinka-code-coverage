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
{"lineNum":"   44","line":"pub fn findType(scope: *Scope, typebook: *TypeBook, nd: Node) ?Type.Ptr {","class":"lineCov","hits":"1","order":"4513","possible_hits":"1",},
{"lineNum":"   45","line":"    switch (nd.data) {","class":"lineCov","hits":"1","order":"4514","possible_hits":"1",},
{"lineNum":"   46","line":"        .TypeName => |name| {","class":"lineCov","hits":"1","order":"4515","possible_hits":"1",},
{"lineNum":"   47","line":"            return if (builtinMap.get(name)) |func|","class":"lineCov","hits":"3","order":"4516","possible_hits":"3",},
{"lineNum":"   48","line":"                func(typebook)","class":"lineCov","hits":"1","order":"4517","possible_hits":"1",},
{"lineNum":"   49","line":"            else"},
{"lineNum":"   50","line":"                scope.getType(name);","class":"lineCov","hits":"1","order":"4779","possible_hits":"1",},
{"lineNum":"   51","line":"        },"},
{"lineNum":"   52","line":"        .ArrayType => |arr| {","class":"lineCov","hits":"1","order":"6077","possible_hits":"1",},
{"lineNum":"   53","line":"            const subtype = findType(scope, typebook, arr);","class":"lineCov","hits":"1","order":"6078","possible_hits":"1",},
{"lineNum":"   54","line":"            return if (subtype) |st|","class":"lineCov","hits":"3","order":"6079","possible_hits":"3",},
{"lineNum":"   55","line":"                typebook.getArray(st)","class":"lineCov","hits":"1","order":"6080","possible_hits":"1",},
{"lineNum":"   56","line":"            else"},
{"lineNum":"   57","line":"                null;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   58","line":"        },"},
{"lineNum":"   59","line":"        // TODO: Process function type literals"},
{"lineNum":"   60","line":"        .UnionType => |un| {","class":"lineCov","hits":"1","order":"4888","possible_hits":"1",},
{"lineNum":"   61","line":"            // TODO: Refactor this to avoid allocation"},
{"lineNum":"   62","line":"            const alloc = scope.getAllocator();","class":"lineCov","hits":"1","order":"4889","possible_hits":"1",},
{"lineNum":"   63","line":"            const tys = allocate.alloc(alloc, Type.Ptr, un.items.len);","class":"lineCov","hits":"1","order":"4890","possible_hits":"1",},
{"lineNum":"   64","line":"            defer alloc.free(tys);","class":"linePartCov","hits":"1","order":"4895","possible_hits":"2",},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"            for (un.items) |item, index| {","class":"lineCov","hits":"2","order":"4891","possible_hits":"2",},
{"lineNum":"   67","line":"                if (findType(scope, typebook, item)) |ty|","class":"lineCov","hits":"3","order":"4892","possible_hits":"3",},
{"lineNum":"   68","line":"                    tys[index] = ty","class":"linePartCov","hits":"1","order":"4893","possible_hits":"2",},
{"lineNum":"   69","line":"                else"},
{"lineNum":"   70","line":"                    return null;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   71","line":"            }"},
{"lineNum":"   72","line":""},
{"lineNum":"   73","line":"            return typebook.getUnion(tys);","class":"lineCov","hits":"2","order":"4894","possible_hits":"2",},
{"lineNum":"   74","line":"        },"},
{"lineNum":"   75","line":"        .InterfaceType => |obj| {","class":"lineCov","hits":"1","order":"4915","possible_hits":"1",},
{"lineNum":"   76","line":"            // TODO: Refactor this to avoid allocation"},
{"lineNum":"   77","line":"            const alloc = scope.getAllocator();","class":"lineCov","hits":"1","order":"4916","possible_hits":"1",},
{"lineNum":"   78","line":"            const members = allocate.alloc(","class":"lineCov","hits":"1","order":"4918","possible_hits":"1",},
{"lineNum":"   79","line":"                alloc,"},
{"lineNum":"   80","line":"                Type.InterfaceType.Member,"},
{"lineNum":"   81","line":"                obj.members.items.len,","class":"lineCov","hits":"1","order":"4917","possible_hits":"1",},
{"lineNum":"   82","line":"            );"},
{"lineNum":"   83","line":"            defer alloc.free(members);","class":"linePartCov","hits":"1","order":"4925","possible_hits":"2",},
{"lineNum":"   84","line":""},
{"lineNum":"   85","line":"            for (obj.members.items) |member, index| {","class":"lineCov","hits":"2","order":"4919","possible_hits":"2",},
{"lineNum":"   86","line":"                if (findType(scope, typebook, member.ty)) |ty|","class":"lineCov","hits":"3","order":"4920","possible_hits":"3",},
{"lineNum":"   87","line":"                    members[index] = Type.InterfaceType.Member{","class":"linePartCov","hits":"1","order":"4921","possible_hits":"2",},
{"lineNum":"   88","line":"                        .name = member.name,","class":"lineCov","hits":"1","order":"4922","possible_hits":"1",},
{"lineNum":"   89","line":"                        .ty = ty,","class":"lineCov","hits":"1","order":"4923","possible_hits":"1",},
{"lineNum":"   90","line":"                    }"},
{"lineNum":"   91","line":"                else"},
{"lineNum":"   92","line":"                    return null;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   93","line":"            }"},
{"lineNum":"   94","line":""},
{"lineNum":"   95","line":"            return typebook.getInterface(members);","class":"lineCov","hits":"2","order":"4924","possible_hits":"2",},
{"lineNum":"   96","line":"        },"},
{"lineNum":"   97","line":"        else => return null,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   98","line":"    }"},
{"lineNum":"   99","line":"}"},
{"lineNum":"  100","line":""},
{"lineNum":"  101","line":"const FindTypeTestCase = struct {"},
{"lineNum":"  102","line":"    inputNode: Node,"},
{"lineNum":"  103","line":"    setup: ?fn (scope: *Scope, typebook: *TypeBook) anyerror!void,"},
{"lineNum":"  104","line":"    check: fn (ty: ?Type.Ptr) anyerror!void,"},
{"lineNum":"  105","line":""},
{"lineNum":"  106","line":"    pub fn run(self: FindTypeTestCase) !void {","class":"lineCov","hits":"3","order":"6044","possible_hits":"3",},
{"lineNum":"  107","line":"        const scope = Scope.new(std.testing.allocator, null);","class":"lineCov","hits":"1","order":"6045","possible_hits":"1",},
{"lineNum":"  108","line":"        defer scope.deinit();","class":"linePartCov","hits":"1","order":"6055","possible_hits":"3",},
{"lineNum":"  109","line":""},
{"lineNum":"  110","line":"        var typebook = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"6046","possible_hits":"1",},
{"lineNum":"  111","line":"        defer typebook.deinit();","class":"linePartCov","hits":"1","order":"6054","possible_hits":"3",},
{"lineNum":"  112","line":""},
{"lineNum":"  113","line":"        defer std.testing.allocator.destroy(self.inputNode);","class":"linePartCov","hits":"1","order":"6053","possible_hits":"3",},
{"lineNum":"  114","line":""},
{"lineNum":"  115","line":"        if (self.setup) |setup|","class":"lineCov","hits":"2","order":"6047","possible_hits":"2",},
{"lineNum":"  116","line":"            try setup(scope, typebook);","class":"linePartCov","hits":"1","order":"6063","possible_hits":"2",},
{"lineNum":"  117","line":""},
{"lineNum":"  118","line":"        const ty = findType(scope, typebook, self.inputNode);","class":"lineCov","hits":"1","order":"6048","possible_hits":"1",},
{"lineNum":"  119","line":"        try self.check(ty);","class":"linePartCov","hits":"1","order":"6049","possible_hits":"2",},
{"lineNum":"  120","line":"    }"},
{"lineNum":"  121","line":"};"},
{"lineNum":"  122","line":""},
{"lineNum":"  123","line":"test \"can lookup builtin types\" {","class":"lineCov","hits":"2","order":"6038","possible_hits":"2",},
{"lineNum":"  124","line":"    try (FindTypeTestCase{","class":"lineCov","hits":"1","order":"6056","possible_hits":"1",},
{"lineNum":"  125","line":"        .inputNode = makeNode(","class":"lineCov","hits":"1","order":"6040","possible_hits":"1",},
{"lineNum":"  126","line":"            std.testing.allocator,"},
{"lineNum":"  127","line":"            Cursor.new(11, 4),","class":"lineCov","hits":"1","order":"6039","possible_hits":"1",},
{"lineNum":"  128","line":"            .TypeName,"},
{"lineNum":"  129","line":"            \"number\","},
{"lineNum":"  130","line":"        ),"},
{"lineNum":"  131","line":"        .setup = null,","class":"lineCov","hits":"1","order":"6041","possible_hits":"1",},
{"lineNum":"  132","line":"        .check = (struct {","class":"lineCov","hits":"1","order":"6042","possible_hits":"1",},
{"lineNum":"  133","line":"            fn check(ty: ?Type.Ptr) anyerror!void {","class":"lineCov","hits":"2","order":"6050","possible_hits":"2",},
{"lineNum":"  134","line":"                try expect(ty != null);","class":"lineCov","hits":"1","order":"6051","possible_hits":"1",},
{"lineNum":"  135","line":"                try expectEqual(Type.Type.Number, ty.?.getType());","class":"linePartCov","hits":"1","order":"6052","possible_hits":"2",},
{"lineNum":"  136","line":"            }"},
{"lineNum":"  137","line":"        }).check,"},
{"lineNum":"  138","line":"    }).run();","class":"lineCov","hits":"1","order":"6043","possible_hits":"1",},
{"lineNum":"  139","line":"}"},
{"lineNum":"  140","line":""},
{"lineNum":"  141","line":"test \"can lookup custom named types\" {","class":"lineCov","hits":"2","order":"6057","possible_hits":"2",},
{"lineNum":"  142","line":"    try (FindTypeTestCase{","class":"lineCov","hits":"1","order":"6069","possible_hits":"1",},
{"lineNum":"  143","line":"        .inputNode = makeNode(","class":"lineCov","hits":"1","order":"6059","possible_hits":"1",},
{"lineNum":"  144","line":"            std.testing.allocator,"},
{"lineNum":"  145","line":"            Cursor.new(11, 4),","class":"lineCov","hits":"1","order":"6058","possible_hits":"1",},
{"lineNum":"  146","line":"            .TypeName,"},
{"lineNum":"  147","line":"            \"AnAlias\","},
{"lineNum":"  148","line":"        ),"},
{"lineNum":"  149","line":"        .setup = (struct {","class":"lineCov","hits":"1","order":"6060","possible_hits":"1",},
{"lineNum":"  150","line":"            pub fn setup(scope: *Scope, typebook: *TypeBook) anyerror!void {","class":"lineCov","hits":"2","order":"6064","possible_hits":"2",},
{"lineNum":"  151","line":"                scope.putType(\"AnAlias\", typebook.getBoolean());","class":"lineCov","hits":"1","order":"6065","possible_hits":"1",},
{"lineNum":"  152","line":"            }"},
{"lineNum":"  153","line":"        }).setup,"},
{"lineNum":"  154","line":"        .check = (struct {","class":"lineCov","hits":"1","order":"6061","possible_hits":"1",},
{"lineNum":"  155","line":"            fn check(ty: ?Type.Ptr) anyerror!void {","class":"lineCov","hits":"2","order":"6066","possible_hits":"2",},
{"lineNum":"  156","line":"                try expect(ty != null);","class":"lineCov","hits":"1","order":"6067","possible_hits":"1",},
{"lineNum":"  157","line":"                try expectEqual(Type.Type.Boolean, ty.?.getType());","class":"linePartCov","hits":"1","order":"6068","possible_hits":"2",},
{"lineNum":"  158","line":"            }"},
{"lineNum":"  159","line":"        }).check,"},
{"lineNum":"  160","line":"    }).run();","class":"lineCov","hits":"1","order":"6062","possible_hits":"1",},
{"lineNum":"  161","line":"}"},
{"lineNum":"  162","line":""},
{"lineNum":"  163","line":"test \"can lookup array types\" {","class":"lineCov","hits":"3","order":"6070","possible_hits":"3",},
{"lineNum":"  164","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"  165","line":"    const csr = Cursor.new(6, 7);","class":"lineCov","hits":"1","order":"6071","possible_hits":"1",},
{"lineNum":"  166","line":""},
{"lineNum":"  167","line":"    const string = makeNode(alloc, csr, .TypeName, \"string\");","class":"lineCov","hits":"1","order":"6072","possible_hits":"1",},
{"lineNum":"  168","line":"    defer alloc.destroy(string);","class":"linePartCov","hits":"1","order":"6085","possible_hits":"2",},
{"lineNum":"  169","line":""},
{"lineNum":"  170","line":"    try (FindTypeTestCase{","class":"linePartCov","hits":"1","order":"6084","possible_hits":"2",},
{"lineNum":"  171","line":"        .inputNode = makeNode(alloc, csr, .ArrayType, string),","class":"lineCov","hits":"1","order":"6073","possible_hits":"1",},
{"lineNum":"  172","line":"        .setup = null,","class":"lineCov","hits":"1","order":"6074","possible_hits":"1",},
{"lineNum":"  173","line":"        .check = (struct {","class":"lineCov","hits":"1","order":"6075","possible_hits":"1",},
{"lineNum":"  174","line":"            fn check(ty: ?Type.Ptr) anyerror!void {","class":"lineCov","hits":"2","order":"6081","possible_hits":"2",},
{"lineNum":"  175","line":"                try expectEqual(Type.Type.Array, ty.?.getType());","class":"linePartCov","hits":"1","order":"6082","possible_hits":"2",},
{"lineNum":"  176","line":"                try expectEqual(Type.Type.String, ty.?.Array.subtype.getType());","class":"linePartCov","hits":"1","order":"6083","possible_hits":"2",},
{"lineNum":"  177","line":"            }"},
{"lineNum":"  178","line":"        }).check,"},
{"lineNum":"  179","line":"    }).run();","class":"lineCov","hits":"1","order":"6076","possible_hits":"1",},
{"lineNum":"  180","line":"}"},
{"lineNum":"  181","line":""},
{"lineNum":"  182","line":"test \"can lookup union types\" {","class":"lineCov","hits":"3","order":"6086","possible_hits":"3",},
{"lineNum":"  183","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"  184","line":"    const csr = Cursor.new(6, 7);","class":"lineCov","hits":"1","order":"6087","possible_hits":"1",},
{"lineNum":"  185","line":""},
{"lineNum":"  186","line":"    const string = makeNode(alloc, csr, .TypeName, \"string\");","class":"lineCov","hits":"1","order":"6088","possible_hits":"1",},
{"lineNum":"  187","line":"    const number = makeNode(alloc, csr, .TypeName, \"number\");","class":"lineCov","hits":"1","order":"6089","possible_hits":"1",},
{"lineNum":"  188","line":"    defer alloc.destroy(string);","class":"linePartCov","hits":"1","order":"6106","possible_hits":"4",},
{"lineNum":"  189","line":"    defer alloc.destroy(number);","class":"linePartCov","hits":"1","order":"6105","possible_hits":"4",},
{"lineNum":"  190","line":""},
{"lineNum":"  191","line":"    var list = node.NodeList{};","class":"lineCov","hits":"1","order":"6090","possible_hits":"1",},
{"lineNum":"  192","line":"    defer list.deinit(alloc);","class":"linePartCov","hits":"1","order":"6104","possible_hits":"4",},
{"lineNum":"  193","line":"    try list.append(alloc, string);","class":"linePartCov","hits":"1","order":"6091","possible_hits":"2",},
{"lineNum":"  194","line":"    try list.append(alloc, number);","class":"linePartCov","hits":"1","order":"6092","possible_hits":"2",},
{"lineNum":"  195","line":""},
{"lineNum":"  196","line":"    try (FindTypeTestCase{","class":"linePartCov","hits":"1","order":"6103","possible_hits":"2",},
{"lineNum":"  197","line":"        .inputNode = makeNode(alloc, csr, .UnionType, list),","class":"lineCov","hits":"1","order":"6093","possible_hits":"1",},
{"lineNum":"  198","line":"        .setup = null,","class":"lineCov","hits":"1","order":"6094","possible_hits":"1",},
{"lineNum":"  199","line":"        .check = (struct {","class":"lineCov","hits":"1","order":"6095","possible_hits":"1",},
{"lineNum":"  200","line":"            fn check(ty: ?Type.Ptr) anyerror!void {","class":"lineCov","hits":"2","order":"6097","possible_hits":"2",},
{"lineNum":"  201","line":"                try expectEqual(Type.Type.Union, ty.?.getType());","class":"linePartCov","hits":"1","order":"6098","possible_hits":"2",},
{"lineNum":"  202","line":""},
{"lineNum":"  203","line":"                const tys: []Type.Ptr = ty.?.Union.tys;","class":"linePartCov","hits":"1","order":"6099","possible_hits":"3",},
{"lineNum":"  204","line":"                try expectEqual(@intCast(usize, 2), tys.len);","class":"linePartCov","hits":"1","order":"6100","possible_hits":"2",},
{"lineNum":"  205","line":"                try expectEqual(Type.Type.Number, tys[0].getType());","class":"linePartCov","hits":"1","order":"6101","possible_hits":"2",},
{"lineNum":"  206","line":"                try expectEqual(Type.Type.String, tys[1].getType());","class":"linePartCov","hits":"1","order":"6102","possible_hits":"2",},
{"lineNum":"  207","line":"            }"},
{"lineNum":"  208","line":"        }).check,"},
{"lineNum":"  209","line":"    }).run();","class":"lineCov","hits":"1","order":"6096","possible_hits":"1",},
{"lineNum":"  210","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-13 18:02:08", "instrumented" : 98, "covered" : 94,};
var merged_data = [];
