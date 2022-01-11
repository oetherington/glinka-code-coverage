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
{"lineNum":"   43","line":"        pub fn new(ty: Type.Ptr, isConst: bool, csr: Cursor) Symbol {","class":"lineCov","hits":"1","order":"2174","possible_hits":"1",},
{"lineNum":"   44","line":"            return Symbol{","class":"lineCov","hits":"1","order":"2178","possible_hits":"1",},
{"lineNum":"   45","line":"                .ty = ty,","class":"lineCov","hits":"1","order":"2175","possible_hits":"1",},
{"lineNum":"   46","line":"                .isConst = isConst,","class":"lineCov","hits":"1","order":"2176","possible_hits":"1",},
{"lineNum":"   47","line":"                .csr = csr,","class":"lineCov","hits":"1","order":"2177","possible_hits":"1",},
{"lineNum":"   48","line":"            };"},
{"lineNum":"   49","line":"        }"},
{"lineNum":"   50","line":"    };"},
{"lineNum":"   51","line":""},
{"lineNum":"   52","line":"    const TypeMap = std.StringHashMap(Type.Ptr);"},
{"lineNum":"   53","line":"    const SymbolMap = std.StringHashMap(Symbol);"},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"    parent: ?*Scope,"},
{"lineNum":"   56","line":"    typeMap: TypeMap,"},
{"lineNum":"   57","line":"    symbolMap: SymbolMap,"},
{"lineNum":"   58","line":"    ctx: ?Context = null,"},
{"lineNum":"   59","line":""},
{"lineNum":"   60","line":"    pub fn new(alloc: Allocator, parent: ?*Scope) *Scope {","class":"lineCov","hits":"1","order":"156","possible_hits":"1",},
{"lineNum":"   61","line":"        var self = alloc.create(Scope) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"157","possible_hits":"1",},
{"lineNum":"   62","line":"        self.parent = parent;","class":"lineCov","hits":"1","order":"158","possible_hits":"1",},
{"lineNum":"   63","line":"        self.typeMap = TypeMap.init(alloc);","class":"lineCov","hits":"1","order":"159","possible_hits":"1",},
{"lineNum":"   64","line":"        self.symbolMap = SymbolMap.init(alloc);","class":"lineCov","hits":"1","order":"160","possible_hits":"1",},
{"lineNum":"   65","line":"        return self;","class":"lineCov","hits":"1","order":"161","possible_hits":"1",},
{"lineNum":"   66","line":"    }"},
{"lineNum":"   67","line":""},
{"lineNum":"   68","line":"    pub fn deinit(self: *Scope) void {","class":"lineCov","hits":"2","order":"285","possible_hits":"2",},
{"lineNum":"   69","line":"        const alloc = self.getAllocator();","class":"lineCov","hits":"1","order":"286","possible_hits":"1",},
{"lineNum":"   70","line":"        self.symbolMap.deinit();","class":"lineCov","hits":"1","order":"289","possible_hits":"1",},
{"lineNum":"   71","line":"        self.typeMap.deinit();","class":"lineCov","hits":"1","order":"290","possible_hits":"1",},
{"lineNum":"   72","line":"        alloc.destroy(self);","class":"lineCov","hits":"1","order":"291","possible_hits":"1",},
{"lineNum":"   73","line":"    }"},
{"lineNum":"   74","line":""},
{"lineNum":"   75","line":"    pub fn getAllocator(self: *Scope) Allocator {","class":"lineCov","hits":"1","order":"287","possible_hits":"1",},
{"lineNum":"   76","line":"        return self.symbolMap.allocator;","class":"lineCov","hits":"1","order":"288","possible_hits":"1",},
{"lineNum":"   77","line":"    }"},
{"lineNum":"   78","line":""},
{"lineNum":"   79","line":"    pub fn put(","class":"lineCov","hits":"1","order":"2168","possible_hits":"1",},
{"lineNum":"   80","line":"        self: *Scope,"},
{"lineNum":"   81","line":"        name: []const u8,"},
{"lineNum":"   82","line":"        ty: Type.Ptr,"},
{"lineNum":"   83","line":"        isConst: bool,"},
{"lineNum":"   84","line":"        csr: Cursor,"},
{"lineNum":"   85","line":"    ) void {","class":"lineCov","hits":"1","order":"2180","possible_hits":"1",},
{"lineNum":"   86","line":"        // It is the caller\'s responsibility to ensure the symbol doesn\'t exist"},
{"lineNum":"   87","line":"        std.debug.assert(self.getLocal(name) == null);","class":"lineCov","hits":"1","order":"2169","possible_hits":"1",},
{"lineNum":"   88","line":""},
{"lineNum":"   89","line":"        self.symbolMap.putNoClobber(","class":"lineCov","hits":"2","order":"2172","possible_hits":"2",},
{"lineNum":"   90","line":"            name,"},
{"lineNum":"   91","line":"            Symbol.new(ty, isConst, csr),","class":"lineCov","hits":"1","order":"2173","possible_hits":"1",},
{"lineNum":"   92","line":"        ) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"2179","possible_hits":"1",},
{"lineNum":"   93","line":"    }"},
{"lineNum":"   94","line":""},
{"lineNum":"   95","line":"    pub fn get(self: *Scope, name: []const u8) ?Symbol {","class":"lineCov","hits":"1","order":"2182","possible_hits":"1",},
{"lineNum":"   96","line":"        const res = self.symbolMap.get(name);","class":"lineCov","hits":"1","order":"2183","possible_hits":"1",},
{"lineNum":"   97","line":"        if (res) |ty|","class":"lineCov","hits":"2","order":"2184","possible_hits":"2",},
{"lineNum":"   98","line":"            return ty;","class":"lineCov","hits":"1","order":"2185","possible_hits":"1",},
{"lineNum":"   99","line":"        if (self.parent) |parent|","class":"lineCov","hits":"2","order":"2195","possible_hits":"2",},
{"lineNum":"  100","line":"            return parent.get(name);","class":"lineCov","hits":"1","order":"2207","possible_hits":"1",},
{"lineNum":"  101","line":"        return null;","class":"lineCov","hits":"1","order":"2196","possible_hits":"1",},
{"lineNum":"  102","line":"    }"},
{"lineNum":"  103","line":""},
{"lineNum":"  104","line":"    pub fn getLocal(self: *Scope, name: []const u8) ?Symbol {","class":"lineCov","hits":"1","order":"2170","possible_hits":"1",},
{"lineNum":"  105","line":"        return self.symbolMap.get(name);","class":"lineCov","hits":"1","order":"2171","possible_hits":"1",},
{"lineNum":"  106","line":"    }"},
{"lineNum":"  107","line":""},
{"lineNum":"  108","line":"    pub fn putType(self: *Scope, name: []const u8, ty: Type.Ptr) void {","class":"lineCov","hits":"2","order":"2220","possible_hits":"2",},
{"lineNum":"  109","line":"        // It is the caller\'s responsibility to ensure the type doesn\'t exist"},
{"lineNum":"  110","line":"        std.debug.assert(self.getTypeLocal(name) == null);","class":"lineCov","hits":"1","order":"2221","possible_hits":"1",},
{"lineNum":"  111","line":""},
{"lineNum":"  112","line":"        self.typeMap.putNoClobber(name, ty) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"2224","possible_hits":"1",},
{"lineNum":"  113","line":"    }"},
{"lineNum":"  114","line":""},
{"lineNum":"  115","line":"    pub fn getType(self: *Scope, name: []const u8) ?Type.Ptr {","class":"lineCov","hits":"1","order":"2226","possible_hits":"1",},
{"lineNum":"  116","line":"        const res = self.typeMap.get(name);","class":"lineCov","hits":"1","order":"2227","possible_hits":"1",},
{"lineNum":"  117","line":"        if (res) |ty|","class":"lineCov","hits":"2","order":"2228","possible_hits":"2",},
{"lineNum":"  118","line":"            return ty;","class":"lineCov","hits":"1","order":"2229","possible_hits":"1",},
{"lineNum":"  119","line":"        if (self.parent) |parent|","class":"lineCov","hits":"2","order":"2237","possible_hits":"2",},
{"lineNum":"  120","line":"            return parent.getType(name);","class":"lineCov","hits":"1","order":"2248","possible_hits":"1",},
{"lineNum":"  121","line":"        return null;","class":"lineCov","hits":"1","order":"2238","possible_hits":"1",},
{"lineNum":"  122","line":"    }"},
{"lineNum":"  123","line":""},
{"lineNum":"  124","line":"    pub fn getTypeLocal(self: *Scope, name: []const u8) ?Type.Ptr {","class":"lineCov","hits":"1","order":"2222","possible_hits":"1",},
{"lineNum":"  125","line":"        return self.typeMap.get(name);","class":"lineCov","hits":"1","order":"2223","possible_hits":"1",},
{"lineNum":"  126","line":"    }"},
{"lineNum":"  127","line":""},
{"lineNum":"  128","line":"    pub fn isInContext(self: *Scope, ctx: Context) bool {","class":"lineCov","hits":"1","order":"2258","possible_hits":"1",},
{"lineNum":"  129","line":"        // TODO: self.ctx == ctx seems to crash the zig compiler"},
{"lineNum":"  130","line":"        if (self.ctx != null and self.ctx.? == ctx)","class":"linePartCov","hits":"2","order":"2259","possible_hits":"3",},
{"lineNum":"  131","line":"            return true;","class":"lineCov","hits":"1","order":"2265","possible_hits":"1",},
{"lineNum":"  132","line":"        if (self.parent) |parent|","class":"lineCov","hits":"2","order":"2260","possible_hits":"2",},
{"lineNum":"  133","line":"            return parent.isInContext(ctx);","class":"lineCov","hits":"1","order":"2261","possible_hits":"1",},
{"lineNum":"  134","line":"        return false;","class":"lineCov","hits":"1","order":"2262","possible_hits":"1",},
{"lineNum":"  135","line":"    }"},
{"lineNum":"  136","line":"};"},
{"lineNum":"  137","line":""},
{"lineNum":"  138","line":"test \"can insert symbols into and retrieve symbols from scope\" {","class":"lineCov","hits":"3","order":"2160","possible_hits":"3",},
{"lineNum":"  139","line":"    var scope = Scope.new(std.testing.allocator, null);","class":"lineCov","hits":"1","order":"2161","possible_hits":"1",},
{"lineNum":"  140","line":"    defer scope.deinit();","class":"linePartCov","hits":"1","order":"2191","possible_hits":"5",},
{"lineNum":"  141","line":""},
{"lineNum":"  142","line":"    var typebook = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"2162","possible_hits":"1",},
{"lineNum":"  143","line":"    defer typebook.deinit();","class":"linePartCov","hits":"1","order":"2190","possible_hits":"5",},
{"lineNum":"  144","line":""},
{"lineNum":"  145","line":"    const name = \"aVariable\";"},
{"lineNum":"  146","line":"    const ty = typebook.getBoolean();","class":"lineCov","hits":"1","order":"2163","possible_hits":"1",},
{"lineNum":"  147","line":"    const isConst = true;"},
{"lineNum":"  148","line":"    const csr = Cursor.new(2, 9);","class":"lineCov","hits":"1","order":"2166","possible_hits":"1",},
{"lineNum":"  149","line":"    scope.put(name, ty, isConst, csr);","class":"lineCov","hits":"1","order":"2167","possible_hits":"1",},
{"lineNum":"  150","line":""},
{"lineNum":"  151","line":"    const res = scope.get(name);","class":"lineCov","hits":"1","order":"2181","possible_hits":"1",},
{"lineNum":"  152","line":"    try expect(res != null);","class":"linePartCov","hits":"1","order":"2186","possible_hits":"2",},
{"lineNum":"  153","line":"    try expectEqual(ty, res.?.ty);","class":"linePartCov","hits":"1","order":"2187","possible_hits":"3",},
{"lineNum":"  154","line":"    try expectEqual(isConst, res.?.isConst);","class":"linePartCov","hits":"1","order":"2188","possible_hits":"3",},
{"lineNum":"  155","line":"    try expectEqual(csr, res.?.csr);","class":"linePartCov","hits":"1","order":"2189","possible_hits":"3",},
{"lineNum":"  156","line":"}"},
{"lineNum":"  157","line":""},
{"lineNum":"  158","line":"test \"scope returns null for undefined symbols\" {","class":"lineCov","hits":"3","order":"2192","possible_hits":"3",},
{"lineNum":"  159","line":"    var scope = Scope.new(std.testing.allocator, null);","class":"lineCov","hits":"1","order":"2193","possible_hits":"1",},
{"lineNum":"  160","line":"    defer scope.deinit();","class":"linePartCov","hits":"1","order":"2198","possible_hits":"2",},
{"lineNum":"  161","line":"    const res = scope.get(\"anUndefinedSymbol\");","class":"lineCov","hits":"1","order":"2194","possible_hits":"1",},
{"lineNum":"  162","line":"    try expect(res == null);","class":"linePartCov","hits":"1","order":"2197","possible_hits":"2",},
{"lineNum":"  163","line":"}"},
{"lineNum":"  164","line":""},
{"lineNum":"  165","line":"test \"can retrieve symbols from scope recursively\" {","class":"lineCov","hits":"3","order":"2199","possible_hits":"3",},
{"lineNum":"  166","line":"    var scope = Scope.new(std.testing.allocator, null);","class":"lineCov","hits":"1","order":"2200","possible_hits":"1",},
{"lineNum":"  167","line":"    defer scope.deinit();","class":"linePartCov","hits":"1","order":"2214","possible_hits":"5",},
{"lineNum":"  168","line":""},
{"lineNum":"  169","line":"    var typebook = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"2201","possible_hits":"1",},
{"lineNum":"  170","line":"    defer typebook.deinit();","class":"linePartCov","hits":"1","order":"2213","possible_hits":"5",},
{"lineNum":"  171","line":""},
{"lineNum":"  172","line":"    const name = \"aVariable\";"},
{"lineNum":"  173","line":"    const ty = typebook.getBoolean();","class":"lineCov","hits":"1","order":"2202","possible_hits":"1",},
{"lineNum":"  174","line":"    const isConst = true;"},
{"lineNum":"  175","line":"    const csr = Cursor.new(2, 9);","class":"lineCov","hits":"1","order":"2203","possible_hits":"1",},
{"lineNum":"  176","line":"    scope.put(name, ty, isConst, csr);","class":"lineCov","hits":"1","order":"2204","possible_hits":"1",},
{"lineNum":"  177","line":""},
{"lineNum":"  178","line":"    var child = Scope.new(std.testing.allocator, scope);","class":"lineCov","hits":"1","order":"2205","possible_hits":"1",},
{"lineNum":"  179","line":"    defer child.deinit();","class":"linePartCov","hits":"1","order":"2212","possible_hits":"5",},
{"lineNum":"  180","line":""},
{"lineNum":"  181","line":"    const res = child.get(name);","class":"lineCov","hits":"1","order":"2206","possible_hits":"1",},
{"lineNum":"  182","line":"    try expect(res != null);","class":"linePartCov","hits":"1","order":"2208","possible_hits":"2",},
{"lineNum":"  183","line":"    try expectEqual(ty, res.?.ty);","class":"linePartCov","hits":"1","order":"2209","possible_hits":"3",},
{"lineNum":"  184","line":"    try expectEqual(isConst, res.?.isConst);","class":"linePartCov","hits":"1","order":"2210","possible_hits":"3",},
{"lineNum":"  185","line":"    try expectEqual(csr, res.?.csr);","class":"linePartCov","hits":"1","order":"2211","possible_hits":"3",},
{"lineNum":"  186","line":"}"},
{"lineNum":"  187","line":""},
{"lineNum":"  188","line":"test \"can insert types into and retrieve types from scope\" {","class":"lineCov","hits":"3","order":"2215","possible_hits":"3",},
{"lineNum":"  189","line":"    var scope = Scope.new(std.testing.allocator, null);","class":"lineCov","hits":"1","order":"2216","possible_hits":"1",},
{"lineNum":"  190","line":"    defer scope.deinit();","class":"linePartCov","hits":"1","order":"2233","possible_hits":"3",},
{"lineNum":"  191","line":""},
{"lineNum":"  192","line":"    var typebook = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"2217","possible_hits":"1",},
{"lineNum":"  193","line":"    defer typebook.deinit();","class":"linePartCov","hits":"1","order":"2232","possible_hits":"3",},
{"lineNum":"  194","line":""},
{"lineNum":"  195","line":"    const name = \"AnAlias\";"},
{"lineNum":"  196","line":"    const ty = typebook.getBoolean();","class":"lineCov","hits":"1","order":"2218","possible_hits":"1",},
{"lineNum":"  197","line":"    scope.putType(name, ty);","class":"lineCov","hits":"1","order":"2219","possible_hits":"1",},
{"lineNum":"  198","line":""},
{"lineNum":"  199","line":"    const res = scope.getType(name);","class":"lineCov","hits":"1","order":"2225","possible_hits":"1",},
{"lineNum":"  200","line":"    try expect(res != null);","class":"linePartCov","hits":"1","order":"2230","possible_hits":"2",},
{"lineNum":"  201","line":"    try expectEqual(ty, res.?);","class":"linePartCov","hits":"1","order":"2231","possible_hits":"3",},
{"lineNum":"  202","line":"}"},
{"lineNum":"  203","line":""},
{"lineNum":"  204","line":"test \"scope returns null for undefined types\" {","class":"lineCov","hits":"3","order":"2234","possible_hits":"3",},
{"lineNum":"  205","line":"    var scope = Scope.new(std.testing.allocator, null);","class":"lineCov","hits":"1","order":"2235","possible_hits":"1",},
{"lineNum":"  206","line":"    defer scope.deinit();","class":"linePartCov","hits":"1","order":"2240","possible_hits":"2",},
{"lineNum":"  207","line":"    const res = scope.getType(\"AnUndefinedType\");","class":"lineCov","hits":"1","order":"2236","possible_hits":"1",},
{"lineNum":"  208","line":"    try expect(res == null);","class":"linePartCov","hits":"1","order":"2239","possible_hits":"2",},
{"lineNum":"  209","line":"}"},
{"lineNum":"  210","line":""},
{"lineNum":"  211","line":"test \"can retrieve types from scope recursively\" {","class":"lineCov","hits":"3","order":"2241","possible_hits":"3",},
{"lineNum":"  212","line":"    var scope = Scope.new(std.testing.allocator, null);","class":"lineCov","hits":"1","order":"2242","possible_hits":"1",},
{"lineNum":"  213","line":"    defer scope.deinit();","class":"linePartCov","hits":"1","order":"2253","possible_hits":"3",},
{"lineNum":"  214","line":""},
{"lineNum":"  215","line":"    var typebook = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"2243","possible_hits":"1",},
{"lineNum":"  216","line":"    defer typebook.deinit();","class":"linePartCov","hits":"1","order":"2252","possible_hits":"3",},
{"lineNum":"  217","line":""},
{"lineNum":"  218","line":"    const name = \"AnAlias\";"},
{"lineNum":"  219","line":"    const ty = typebook.getBoolean();","class":"lineCov","hits":"1","order":"2244","possible_hits":"1",},
{"lineNum":"  220","line":"    scope.putType(name, ty);","class":"lineCov","hits":"1","order":"2245","possible_hits":"1",},
{"lineNum":"  221","line":""},
{"lineNum":"  222","line":"    var child = Scope.new(std.testing.allocator, scope);","class":"lineCov","hits":"1","order":"2246","possible_hits":"1",},
{"lineNum":"  223","line":"    defer child.deinit();","class":"linePartCov","hits":"1","order":"2251","possible_hits":"3",},
{"lineNum":"  224","line":""},
{"lineNum":"  225","line":"    const res = child.getType(name);","class":"lineCov","hits":"1","order":"2247","possible_hits":"1",},
{"lineNum":"  226","line":"    try expect(res != null);","class":"linePartCov","hits":"1","order":"2249","possible_hits":"2",},
{"lineNum":"  227","line":"    try expectEqual(ty, res.?);","class":"linePartCov","hits":"1","order":"2250","possible_hits":"3",},
{"lineNum":"  228","line":"}"},
{"lineNum":"  229","line":""},
{"lineNum":"  230","line":"test \"scope can retrieve context\" {","class":"lineCov","hits":"3","order":"2254","possible_hits":"3",},
{"lineNum":"  231","line":"    var first = Scope.new(std.testing.allocator, null);","class":"lineCov","hits":"1","order":"2255","possible_hits":"1",},
{"lineNum":"  232","line":"    defer first.deinit();","class":"linePartCov","hits":"1","order":"2271","possible_hits":"5",},
{"lineNum":"  233","line":""},
{"lineNum":"  234","line":"    var second = Scope.new(std.testing.allocator, first);","class":"lineCov","hits":"1","order":"2256","possible_hits":"1",},
{"lineNum":"  235","line":"    defer second.deinit();","class":"linePartCov","hits":"1","order":"2270","possible_hits":"5",},
{"lineNum":"  236","line":""},
{"lineNum":"  237","line":"    try expect(!second.isInContext(.Loop));","class":"linePartCov","hits":"1","order":"2257","possible_hits":"2",},
{"lineNum":"  238","line":""},
{"lineNum":"  239","line":"    first.ctx = .Loop;","class":"lineCov","hits":"1","order":"2263","possible_hits":"1",},
{"lineNum":"  240","line":""},
{"lineNum":"  241","line":"    try expect(second.isInContext(.Loop));","class":"linePartCov","hits":"1","order":"2264","possible_hits":"2",},
{"lineNum":"  242","line":""},
{"lineNum":"  243","line":"    first.ctx = null;","class":"lineCov","hits":"1","order":"2266","possible_hits":"1",},
{"lineNum":"  244","line":"    second.ctx = .Loop;","class":"lineCov","hits":"1","order":"2267","possible_hits":"1",},
{"lineNum":"  245","line":""},
{"lineNum":"  246","line":"    try expect(second.isInContext(.Loop));","class":"linePartCov","hits":"1","order":"2268","possible_hits":"2",},
{"lineNum":"  247","line":"    try expect(!first.isInContext(.Loop));","class":"linePartCov","hits":"1","order":"2269","possible_hits":"2",},
{"lineNum":"  248","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-11 07:31:37", "instrumented" : 123, "covered" : 123,};
var merged_data = [];
