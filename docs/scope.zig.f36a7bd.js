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
{"lineNum":"   21","line":"const Allocator = std.mem.Allocator;"},
{"lineNum":"   22","line":"const TypeBook = @import(\"typebook.zig\").TypeBook;"},
{"lineNum":"   23","line":"const Type = @import(\"../common/types/type.zig\").Type;"},
{"lineNum":"   24","line":"const Cursor = @import(\"../common/cursor.zig\").Cursor;"},
{"lineNum":"   25","line":"const allocate = @import(\"../common/allocate.zig\");"},
{"lineNum":"   26","line":""},
{"lineNum":"   27","line":"pub const Scope = struct {"},
{"lineNum":"   28","line":"    pub const Context = enum {"},
{"lineNum":"   29","line":"        Loop,"},
{"lineNum":"   30","line":"        Try,"},
{"lineNum":"   31","line":"        Catch,"},
{"lineNum":"   32","line":"        Finally,"},
{"lineNum":"   33","line":"        Switch,"},
{"lineNum":"   34","line":"        Function,"},
{"lineNum":"   35","line":"        ArrowFunction,"},
{"lineNum":"   36","line":"    };"},
{"lineNum":"   37","line":""},
{"lineNum":"   38","line":"    pub const Symbol = struct {"},
{"lineNum":"   39","line":"        ty: Type.Ptr,"},
{"lineNum":"   40","line":"        isConst: bool,"},
{"lineNum":"   41","line":"        csr: Cursor,"},
{"lineNum":"   42","line":""},
{"lineNum":"   43","line":"        pub fn new(ty: Type.Ptr, isConst: bool, csr: Cursor) Symbol {","class":"lineCov","hits":"1","order":"1200","possible_hits":"1",},
{"lineNum":"   44","line":"            return Symbol{","class":"lineCov","hits":"1","order":"1204","possible_hits":"1",},
{"lineNum":"   45","line":"                .ty = ty,","class":"lineCov","hits":"1","order":"1201","possible_hits":"1",},
{"lineNum":"   46","line":"                .isConst = isConst,","class":"lineCov","hits":"1","order":"1202","possible_hits":"1",},
{"lineNum":"   47","line":"                .csr = csr,","class":"lineCov","hits":"1","order":"1203","possible_hits":"1",},
{"lineNum":"   48","line":"            };"},
{"lineNum":"   49","line":"        }"},
{"lineNum":"   50","line":"    };"},
{"lineNum":"   51","line":""},
{"lineNum":"   52","line":"    const Map = std.StringHashMap(Symbol);"},
{"lineNum":"   53","line":""},
{"lineNum":"   54","line":"    parent: ?*Scope,"},
{"lineNum":"   55","line":"    map: Map,"},
{"lineNum":"   56","line":"    ctx: ?Context = null,"},
{"lineNum":"   57","line":""},
{"lineNum":"   58","line":"    pub fn new(alloc: Allocator, parent: ?*Scope) *Scope {","class":"lineCov","hits":"1","order":"156","possible_hits":"1",},
{"lineNum":"   59","line":"        var self = alloc.create(Scope) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"157","possible_hits":"1",},
{"lineNum":"   60","line":"        self.parent = parent;","class":"lineCov","hits":"1","order":"158","possible_hits":"1",},
{"lineNum":"   61","line":"        self.map = Map.init(alloc);","class":"lineCov","hits":"1","order":"159","possible_hits":"1",},
{"lineNum":"   62","line":"        return self;","class":"lineCov","hits":"1","order":"160","possible_hits":"1",},
{"lineNum":"   63","line":"    }"},
{"lineNum":"   64","line":""},
{"lineNum":"   65","line":"    pub fn deinit(self: *Scope) void {","class":"lineCov","hits":"2","order":"288","possible_hits":"2",},
{"lineNum":"   66","line":"        const alloc = self.getAllocator();","class":"lineCov","hits":"1","order":"289","possible_hits":"1",},
{"lineNum":"   67","line":"        self.map.deinit();","class":"lineCov","hits":"1","order":"292","possible_hits":"1",},
{"lineNum":"   68","line":"        alloc.destroy(self);","class":"lineCov","hits":"1","order":"293","possible_hits":"1",},
{"lineNum":"   69","line":"    }"},
{"lineNum":"   70","line":""},
{"lineNum":"   71","line":"    pub fn getAllocator(self: *Scope) Allocator {","class":"lineCov","hits":"1","order":"290","possible_hits":"1",},
{"lineNum":"   72","line":"        return self.map.allocator;","class":"lineCov","hits":"1","order":"291","possible_hits":"1",},
{"lineNum":"   73","line":"    }"},
{"lineNum":"   74","line":""},
{"lineNum":"   75","line":"    pub fn put(","class":"lineCov","hits":"1","order":"1194","possible_hits":"1",},
{"lineNum":"   76","line":"        self: *Scope,"},
{"lineNum":"   77","line":"        name: []const u8,"},
{"lineNum":"   78","line":"        ty: Type.Ptr,"},
{"lineNum":"   79","line":"        isConst: bool,"},
{"lineNum":"   80","line":"        csr: Cursor,"},
{"lineNum":"   81","line":"    ) void {","class":"lineCov","hits":"1","order":"1206","possible_hits":"1",},
{"lineNum":"   82","line":"        std.debug.assert(self.getLocal(name) == null);","class":"lineCov","hits":"1","order":"1195","possible_hits":"1",},
{"lineNum":"   83","line":""},
{"lineNum":"   84","line":"        self.map.putNoClobber(","class":"lineCov","hits":"2","order":"1198","possible_hits":"2",},
{"lineNum":"   85","line":"            name,"},
{"lineNum":"   86","line":"            Symbol.new(ty, isConst, csr),","class":"lineCov","hits":"1","order":"1199","possible_hits":"1",},
{"lineNum":"   87","line":"        ) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"1205","possible_hits":"1",},
{"lineNum":"   88","line":"    }"},
{"lineNum":"   89","line":""},
{"lineNum":"   90","line":"    pub fn get(self: *Scope, name: []const u8) ?Symbol {","class":"lineCov","hits":"1","order":"1208","possible_hits":"1",},
{"lineNum":"   91","line":"        const res = self.map.get(name);","class":"lineCov","hits":"1","order":"1209","possible_hits":"1",},
{"lineNum":"   92","line":"        if (res) |ty|","class":"lineCov","hits":"2","order":"1210","possible_hits":"2",},
{"lineNum":"   93","line":"            return ty;","class":"lineCov","hits":"1","order":"1211","possible_hits":"1",},
{"lineNum":"   94","line":"        if (self.parent) |parent|","class":"lineCov","hits":"2","order":"1240","possible_hits":"2",},
{"lineNum":"   95","line":"            return parent.get(name);","class":"lineCov","hits":"1","order":"1252","possible_hits":"1",},
{"lineNum":"   96","line":"        return null;","class":"lineCov","hits":"1","order":"1241","possible_hits":"1",},
{"lineNum":"   97","line":"    }"},
{"lineNum":"   98","line":""},
{"lineNum":"   99","line":"    pub fn getLocal(self: *Scope, name: []const u8) ?Symbol {","class":"lineCov","hits":"1","order":"1196","possible_hits":"1",},
{"lineNum":"  100","line":"        return self.map.get(name);","class":"lineCov","hits":"1","order":"1197","possible_hits":"1",},
{"lineNum":"  101","line":"    }"},
{"lineNum":"  102","line":""},
{"lineNum":"  103","line":"    pub fn isInContext(self: *Scope, ctx: Context) bool {","class":"lineCov","hits":"1","order":"1223","possible_hits":"1",},
{"lineNum":"  104","line":"        // TODO: self.ctx == ctx seems to crash the zig compiler"},
{"lineNum":"  105","line":"        if (self.ctx != null and self.ctx.? == ctx)","class":"linePartCov","hits":"2","order":"1224","possible_hits":"3",},
{"lineNum":"  106","line":"            return true;","class":"lineCov","hits":"1","order":"1230","possible_hits":"1",},
{"lineNum":"  107","line":"        if (self.parent) |parent|","class":"lineCov","hits":"2","order":"1225","possible_hits":"2",},
{"lineNum":"  108","line":"            return parent.isInContext(ctx);","class":"lineCov","hits":"1","order":"1226","possible_hits":"1",},
{"lineNum":"  109","line":"        return false;","class":"lineCov","hits":"1","order":"1227","possible_hits":"1",},
{"lineNum":"  110","line":"    }"},
{"lineNum":"  111","line":"};"},
{"lineNum":"  112","line":""},
{"lineNum":"  113","line":"test \"can insert into and retrieve from scope\" {","class":"lineCov","hits":"3","order":"1186","possible_hits":"3",},
{"lineNum":"  114","line":"    var scope = Scope.new(std.testing.allocator, null);","class":"lineCov","hits":"1","order":"1187","possible_hits":"1",},
{"lineNum":"  115","line":"    defer scope.deinit();","class":"linePartCov","hits":"1","order":"1218","possible_hits":"5",},
{"lineNum":"  116","line":""},
{"lineNum":"  117","line":"    var typebook = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"1188","possible_hits":"1",},
{"lineNum":"  118","line":"    defer typebook.deinit();","class":"linePartCov","hits":"1","order":"1217","possible_hits":"5",},
{"lineNum":"  119","line":""},
{"lineNum":"  120","line":"    const name = \"aVariable\";"},
{"lineNum":"  121","line":"    const ty = typebook.getBoolean();","class":"lineCov","hits":"1","order":"1189","possible_hits":"1",},
{"lineNum":"  122","line":"    const isConst = true;"},
{"lineNum":"  123","line":"    const csr = Cursor.new(2, 9);","class":"lineCov","hits":"1","order":"1192","possible_hits":"1",},
{"lineNum":"  124","line":"    scope.put(name, ty, isConst, csr);","class":"lineCov","hits":"1","order":"1193","possible_hits":"1",},
{"lineNum":"  125","line":""},
{"lineNum":"  126","line":"    const res = scope.get(name);","class":"lineCov","hits":"1","order":"1207","possible_hits":"1",},
{"lineNum":"  127","line":"    try expect(res != null);","class":"linePartCov","hits":"1","order":"1212","possible_hits":"2",},
{"lineNum":"  128","line":"    if (res) |symbol| {","class":"lineCov","hits":"2","order":"1213","possible_hits":"2",},
{"lineNum":"  129","line":"        try expectEqual(ty, symbol.ty);","class":"linePartCov","hits":"1","order":"1214","possible_hits":"2",},
{"lineNum":"  130","line":"        try expectEqual(isConst, symbol.isConst);","class":"linePartCov","hits":"1","order":"1215","possible_hits":"2",},
{"lineNum":"  131","line":"        try expectEqual(csr, symbol.csr);","class":"linePartCov","hits":"1","order":"1216","possible_hits":"2",},
{"lineNum":"  132","line":"    }"},
{"lineNum":"  133","line":"}"},
{"lineNum":"  134","line":""},
{"lineNum":"  135","line":"test \"scope can retrieve context\" {","class":"lineCov","hits":"3","order":"1219","possible_hits":"3",},
{"lineNum":"  136","line":"    var first = Scope.new(std.testing.allocator, null);","class":"lineCov","hits":"1","order":"1220","possible_hits":"1",},
{"lineNum":"  137","line":"    defer first.deinit();","class":"linePartCov","hits":"1","order":"1236","possible_hits":"5",},
{"lineNum":"  138","line":""},
{"lineNum":"  139","line":"    var second = Scope.new(std.testing.allocator, first);","class":"lineCov","hits":"1","order":"1221","possible_hits":"1",},
{"lineNum":"  140","line":"    defer second.deinit();","class":"linePartCov","hits":"1","order":"1235","possible_hits":"5",},
{"lineNum":"  141","line":""},
{"lineNum":"  142","line":"    try expect(!second.isInContext(.Loop));","class":"linePartCov","hits":"1","order":"1222","possible_hits":"2",},
{"lineNum":"  143","line":""},
{"lineNum":"  144","line":"    first.ctx = .Loop;","class":"lineCov","hits":"1","order":"1228","possible_hits":"1",},
{"lineNum":"  145","line":""},
{"lineNum":"  146","line":"    try expect(second.isInContext(.Loop));","class":"linePartCov","hits":"1","order":"1229","possible_hits":"2",},
{"lineNum":"  147","line":""},
{"lineNum":"  148","line":"    first.ctx = null;","class":"lineCov","hits":"1","order":"1231","possible_hits":"1",},
{"lineNum":"  149","line":"    second.ctx = .Loop;","class":"lineCov","hits":"1","order":"1232","possible_hits":"1",},
{"lineNum":"  150","line":""},
{"lineNum":"  151","line":"    try expect(second.isInContext(.Loop));","class":"linePartCov","hits":"1","order":"1233","possible_hits":"2",},
{"lineNum":"  152","line":"    try expect(!first.isInContext(.Loop));","class":"linePartCov","hits":"1","order":"1234","possible_hits":"2",},
{"lineNum":"  153","line":"}"},
{"lineNum":"  154","line":""},
{"lineNum":"  155","line":"test \"scope returns null for undefined symbols\" {","class":"lineCov","hits":"3","order":"1237","possible_hits":"3",},
{"lineNum":"  156","line":"    var scope = Scope.new(std.testing.allocator, null);","class":"lineCov","hits":"1","order":"1238","possible_hits":"1",},
{"lineNum":"  157","line":"    defer scope.deinit();","class":"linePartCov","hits":"1","order":"1243","possible_hits":"2",},
{"lineNum":"  158","line":"    const res = scope.get(\"anUndefinedSymbol\");","class":"lineCov","hits":"1","order":"1239","possible_hits":"1",},
{"lineNum":"  159","line":"    try expect(res == null);","class":"linePartCov","hits":"1","order":"1242","possible_hits":"2",},
{"lineNum":"  160","line":"}"},
{"lineNum":"  161","line":""},
{"lineNum":"  162","line":"test \"can retrieve from scope recursively\" {","class":"lineCov","hits":"3","order":"1244","possible_hits":"3",},
{"lineNum":"  163","line":"    var scope = Scope.new(std.testing.allocator, null);","class":"lineCov","hits":"1","order":"1245","possible_hits":"1",},
{"lineNum":"  164","line":"    defer scope.deinit();","class":"linePartCov","hits":"1","order":"1260","possible_hits":"5",},
{"lineNum":"  165","line":""},
{"lineNum":"  166","line":"    var typebook = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"1246","possible_hits":"1",},
{"lineNum":"  167","line":"    defer typebook.deinit();","class":"linePartCov","hits":"1","order":"1259","possible_hits":"5",},
{"lineNum":"  168","line":""},
{"lineNum":"  169","line":"    const name = \"aVariable\";"},
{"lineNum":"  170","line":"    const ty = typebook.getBoolean();","class":"lineCov","hits":"1","order":"1247","possible_hits":"1",},
{"lineNum":"  171","line":"    const isConst = true;"},
{"lineNum":"  172","line":"    const csr = Cursor.new(2, 9);","class":"lineCov","hits":"1","order":"1248","possible_hits":"1",},
{"lineNum":"  173","line":"    scope.put(name, ty, isConst, csr);","class":"lineCov","hits":"1","order":"1249","possible_hits":"1",},
{"lineNum":"  174","line":""},
{"lineNum":"  175","line":"    var child = Scope.new(std.testing.allocator, scope);","class":"lineCov","hits":"1","order":"1250","possible_hits":"1",},
{"lineNum":"  176","line":"    defer child.deinit();","class":"linePartCov","hits":"1","order":"1258","possible_hits":"5",},
{"lineNum":"  177","line":""},
{"lineNum":"  178","line":"    const res = child.get(name);","class":"lineCov","hits":"1","order":"1251","possible_hits":"1",},
{"lineNum":"  179","line":"    try expect(res != null);","class":"linePartCov","hits":"1","order":"1253","possible_hits":"2",},
{"lineNum":"  180","line":"    if (res) |symbol| {","class":"lineCov","hits":"2","order":"1254","possible_hits":"2",},
{"lineNum":"  181","line":"        try expectEqual(ty, symbol.ty);","class":"linePartCov","hits":"1","order":"1255","possible_hits":"2",},
{"lineNum":"  182","line":"        try expectEqual(isConst, symbol.isConst);","class":"linePartCov","hits":"1","order":"1256","possible_hits":"2",},
{"lineNum":"  183","line":"        try expectEqual(csr, symbol.csr);","class":"linePartCov","hits":"1","order":"1257","possible_hits":"2",},
{"lineNum":"  184","line":"    }"},
{"lineNum":"  185","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2021-12-30 12:25:10", "instrumented" : 84, "covered" : 84,};
var merged_data = [];
