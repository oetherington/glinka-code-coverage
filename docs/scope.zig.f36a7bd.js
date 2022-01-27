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
{"lineNum":"   43","line":"        pub fn new(ty: Type.Ptr, isConst: bool, csr: Cursor) Symbol {","class":"lineCov","hits":"1","order":"360","possible_hits":"1",},
{"lineNum":"   44","line":"            return Symbol{","class":"lineCov","hits":"1","order":"364","possible_hits":"1",},
{"lineNum":"   45","line":"                .ty = ty,","class":"lineCov","hits":"1","order":"361","possible_hits":"1",},
{"lineNum":"   46","line":"                .isConst = isConst,","class":"lineCov","hits":"1","order":"362","possible_hits":"1",},
{"lineNum":"   47","line":"                .csr = csr,","class":"lineCov","hits":"1","order":"363","possible_hits":"1",},
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
{"lineNum":"   58","line":"    ctx: ?Context,"},
{"lineNum":"   59","line":""},
{"lineNum":"   60","line":"    pub fn new(alloc: Allocator, parent: ?*Scope) *Scope {","class":"lineCov","hits":"1","order":"156","possible_hits":"1",},
{"lineNum":"   61","line":"        var self = alloc.create(Scope) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"157","possible_hits":"1",},
{"lineNum":"   62","line":"        self.parent = parent;","class":"lineCov","hits":"1","order":"158","possible_hits":"1",},
{"lineNum":"   63","line":"        self.typeMap = TypeMap.init(alloc);","class":"lineCov","hits":"1","order":"159","possible_hits":"1",},
{"lineNum":"   64","line":"        self.symbolMap = SymbolMap.init(alloc);","class":"lineCov","hits":"1","order":"160","possible_hits":"1",},
{"lineNum":"   65","line":"        self.ctx = null;","class":"lineCov","hits":"1","order":"161","possible_hits":"1",},
{"lineNum":"   66","line":"        return self;","class":"lineCov","hits":"1","order":"162","possible_hits":"1",},
{"lineNum":"   67","line":"    }"},
{"lineNum":"   68","line":""},
{"lineNum":"   69","line":"    pub fn deinit(self: *Scope) void {","class":"lineCov","hits":"2","order":"382","possible_hits":"2",},
{"lineNum":"   70","line":"        const alloc = self.getAllocator();","class":"lineCov","hits":"1","order":"383","possible_hits":"1",},
{"lineNum":"   71","line":"        self.symbolMap.deinit();","class":"lineCov","hits":"1","order":"386","possible_hits":"1",},
{"lineNum":"   72","line":"        self.typeMap.deinit();","class":"lineCov","hits":"1","order":"387","possible_hits":"1",},
{"lineNum":"   73","line":"        alloc.destroy(self);","class":"lineCov","hits":"1","order":"388","possible_hits":"1",},
{"lineNum":"   74","line":"    }"},
{"lineNum":"   75","line":""},
{"lineNum":"   76","line":"    pub fn getAllocator(self: *Scope) Allocator {","class":"lineCov","hits":"1","order":"384","possible_hits":"1",},
{"lineNum":"   77","line":"        return self.symbolMap.allocator;","class":"lineCov","hits":"1","order":"385","possible_hits":"1",},
{"lineNum":"   78","line":"    }"},
{"lineNum":"   79","line":""},
{"lineNum":"   80","line":"    pub fn put(","class":"lineCov","hits":"1","order":"354","possible_hits":"1",},
{"lineNum":"   81","line":"        self: *Scope,"},
{"lineNum":"   82","line":"        name: []const u8,"},
{"lineNum":"   83","line":"        ty: Type.Ptr,"},
{"lineNum":"   84","line":"        isConst: bool,"},
{"lineNum":"   85","line":"        csr: Cursor,"},
{"lineNum":"   86","line":"    ) void {","class":"lineCov","hits":"1","order":"366","possible_hits":"1",},
{"lineNum":"   87","line":"        // It is the caller\'s responsibility to ensure the symbol doesn\'t exist"},
{"lineNum":"   88","line":"        std.debug.assert(self.getLocal(name) == null);","class":"lineCov","hits":"1","order":"355","possible_hits":"1",},
{"lineNum":"   89","line":""},
{"lineNum":"   90","line":"        self.symbolMap.putNoClobber(","class":"lineCov","hits":"2","order":"358","possible_hits":"2",},
{"lineNum":"   91","line":"            name,"},
{"lineNum":"   92","line":"            Symbol.new(ty, isConst, csr),","class":"lineCov","hits":"1","order":"359","possible_hits":"1",},
{"lineNum":"   93","line":"        ) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"365","possible_hits":"1",},
{"lineNum":"   94","line":"    }"},
{"lineNum":"   95","line":""},
{"lineNum":"   96","line":"    pub fn get(self: *Scope, name: []const u8) ?Symbol {","class":"lineCov","hits":"1","order":"2383","possible_hits":"1",},
{"lineNum":"   97","line":"        const res = self.symbolMap.get(name);","class":"lineCov","hits":"1","order":"2384","possible_hits":"1",},
{"lineNum":"   98","line":"        if (res) |ty|","class":"lineCov","hits":"2","order":"2385","possible_hits":"2",},
{"lineNum":"   99","line":"            return ty;","class":"lineCov","hits":"1","order":"2386","possible_hits":"1",},
{"lineNum":"  100","line":"        if (self.parent) |parent|","class":"lineCov","hits":"2","order":"2396","possible_hits":"2",},
{"lineNum":"  101","line":"            return parent.get(name);","class":"lineCov","hits":"1","order":"2408","possible_hits":"1",},
{"lineNum":"  102","line":"        return null;","class":"lineCov","hits":"1","order":"2397","possible_hits":"1",},
{"lineNum":"  103","line":"    }"},
{"lineNum":"  104","line":""},
{"lineNum":"  105","line":"    pub fn getLocal(self: *Scope, name: []const u8) ?Symbol {","class":"lineCov","hits":"1","order":"356","possible_hits":"1",},
{"lineNum":"  106","line":"        return self.symbolMap.get(name);","class":"lineCov","hits":"1","order":"357","possible_hits":"1",},
{"lineNum":"  107","line":"    }"},
{"lineNum":"  108","line":""},
{"lineNum":"  109","line":"    pub fn putType(self: *Scope, name: []const u8, ty: Type.Ptr) void {","class":"lineCov","hits":"2","order":"2421","possible_hits":"2",},
{"lineNum":"  110","line":"        // It is the caller\'s responsibility to ensure the type doesn\'t exist"},
{"lineNum":"  111","line":"        std.debug.assert(self.getTypeLocal(name) == null);","class":"lineCov","hits":"1","order":"2422","possible_hits":"1",},
{"lineNum":"  112","line":""},
{"lineNum":"  113","line":"        self.typeMap.putNoClobber(name, ty) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"2425","possible_hits":"1",},
{"lineNum":"  114","line":"    }"},
{"lineNum":"  115","line":""},
{"lineNum":"  116","line":"    pub fn getType(self: *Scope, name: []const u8) ?Type.Ptr {","class":"lineCov","hits":"1","order":"2427","possible_hits":"1",},
{"lineNum":"  117","line":"        const res = self.typeMap.get(name);","class":"lineCov","hits":"1","order":"2428","possible_hits":"1",},
{"lineNum":"  118","line":"        if (res) |ty|","class":"lineCov","hits":"2","order":"2429","possible_hits":"2",},
{"lineNum":"  119","line":"            return ty;","class":"lineCov","hits":"1","order":"2430","possible_hits":"1",},
{"lineNum":"  120","line":"        if (self.parent) |parent|","class":"lineCov","hits":"2","order":"2438","possible_hits":"2",},
{"lineNum":"  121","line":"            return parent.getType(name);","class":"lineCov","hits":"1","order":"2449","possible_hits":"1",},
{"lineNum":"  122","line":"        return null;","class":"lineCov","hits":"1","order":"2439","possible_hits":"1",},
{"lineNum":"  123","line":"    }"},
{"lineNum":"  124","line":""},
{"lineNum":"  125","line":"    pub fn getTypeLocal(self: *Scope, name: []const u8) ?Type.Ptr {","class":"lineCov","hits":"1","order":"2423","possible_hits":"1",},
{"lineNum":"  126","line":"        return self.typeMap.get(name);","class":"lineCov","hits":"1","order":"2424","possible_hits":"1",},
{"lineNum":"  127","line":"    }"},
{"lineNum":"  128","line":""},
{"lineNum":"  129","line":"    pub fn getTypeMut(self: *Scope, name: []const u8) ?Type.MutPtr {","class":"lineCov","hits":"1","order":"3060","possible_hits":"1",},
{"lineNum":"  130","line":"        // Осторожно! This is only used to enable type hoisting"},
{"lineNum":"  131","line":"        const res = @intToPtr(?Type.MutPtr, @ptrToInt(self.typeMap.get(name)));","class":"linePartCov","hits":"1","order":"3061","possible_hits":"2",},
{"lineNum":"  132","line":"        if (res) |ty|","class":"linePartCov","hits":"2","order":"3062","possible_hits":"3",},
{"lineNum":"  133","line":"            return ty;","class":"lineCov","hits":"1","order":"3063","possible_hits":"1",},
{"lineNum":"  134","line":"        if (self.parent) |parent|","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  135","line":"            return parent.getTypeMut(name);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  136","line":"        return null;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  137","line":"    }"},
{"lineNum":"  138","line":""},
{"lineNum":"  139","line":"    pub fn isInContext(self: *Scope, ctx: Context) bool {","class":"lineCov","hits":"1","order":"2459","possible_hits":"1",},
{"lineNum":"  140","line":"        // TODO: self.ctx == ctx seems to crash the zig compiler"},
{"lineNum":"  141","line":"        if (self.ctx != null and self.ctx.? == ctx)","class":"linePartCov","hits":"2","order":"2460","possible_hits":"3",},
{"lineNum":"  142","line":"            return true;","class":"lineCov","hits":"1","order":"2466","possible_hits":"1",},
{"lineNum":"  143","line":"        if (self.parent) |parent|","class":"lineCov","hits":"2","order":"2461","possible_hits":"2",},
{"lineNum":"  144","line":"            return parent.isInContext(ctx);","class":"lineCov","hits":"1","order":"2462","possible_hits":"1",},
{"lineNum":"  145","line":"        return false;","class":"lineCov","hits":"1","order":"2463","possible_hits":"1",},
{"lineNum":"  146","line":"    }"},
{"lineNum":"  147","line":""},
{"lineNum":"  148","line":"    fn dumpInternal(self: *Scope, indent: usize) void {"},
{"lineNum":"  149","line":"        var iter = self.symbolMap.iterator();"},
{"lineNum":"  150","line":"        while (iter.next()) |sym| {"},
{"lineNum":"  151","line":"            var i: usize = 0;"},
{"lineNum":"  152","line":"            while (i < indent) : (i += 1) {"},
{"lineNum":"  153","line":"                std.debug.print(\" \", .{});"},
{"lineNum":"  154","line":"            }"},
{"lineNum":"  155","line":""},
{"lineNum":"  156","line":"            std.debug.print(\"{s}: \", .{sym.key_ptr.*});"},
{"lineNum":"  157","line":"            sym.value_ptr.ty.dump();"},
{"lineNum":"  158","line":"        }"},
{"lineNum":"  159","line":""},
{"lineNum":"  160","line":"        if (self.parent) |parent|"},
{"lineNum":"  161","line":"            parent.dumpInternal(indent + 2);"},
{"lineNum":"  162","line":"    }"},
{"lineNum":"  163","line":""},
{"lineNum":"  164","line":"    pub fn dump(self: *Scope) void {"},
{"lineNum":"  165","line":"        self.dumpInternal(0);"},
{"lineNum":"  166","line":"    }"},
{"lineNum":"  167","line":"};"},
{"lineNum":"  168","line":""},
{"lineNum":"  169","line":"test \"can insert symbols into and retrieve symbols from scope\" {","class":"lineCov","hits":"3","order":"2374","possible_hits":"3",},
{"lineNum":"  170","line":"    var scope = Scope.new(std.testing.allocator, null);","class":"lineCov","hits":"1","order":"2375","possible_hits":"1",},
{"lineNum":"  171","line":"    defer scope.deinit();","class":"linePartCov","hits":"1","order":"2392","possible_hits":"5",},
{"lineNum":"  172","line":""},
{"lineNum":"  173","line":"    var typebook = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"2376","possible_hits":"1",},
{"lineNum":"  174","line":"    defer typebook.deinit();","class":"linePartCov","hits":"1","order":"2391","possible_hits":"5",},
{"lineNum":"  175","line":""},
{"lineNum":"  176","line":"    const name = \"aVariable\";"},
{"lineNum":"  177","line":"    const ty = typebook.getBoolean();","class":"lineCov","hits":"1","order":"2377","possible_hits":"1",},
{"lineNum":"  178","line":"    const isConst = true;"},
{"lineNum":"  179","line":"    const csr = Cursor.new(2, 9);","class":"lineCov","hits":"1","order":"2380","possible_hits":"1",},
{"lineNum":"  180","line":"    scope.put(name, ty, isConst, csr);","class":"lineCov","hits":"1","order":"2381","possible_hits":"1",},
{"lineNum":"  181","line":""},
{"lineNum":"  182","line":"    const res = scope.get(name);","class":"lineCov","hits":"1","order":"2382","possible_hits":"1",},
{"lineNum":"  183","line":"    try expect(res != null);","class":"linePartCov","hits":"1","order":"2387","possible_hits":"2",},
{"lineNum":"  184","line":"    try expectEqual(ty, res.?.ty);","class":"linePartCov","hits":"1","order":"2388","possible_hits":"3",},
{"lineNum":"  185","line":"    try expectEqual(isConst, res.?.isConst);","class":"linePartCov","hits":"1","order":"2389","possible_hits":"3",},
{"lineNum":"  186","line":"    try expectEqual(csr, res.?.csr);","class":"linePartCov","hits":"1","order":"2390","possible_hits":"3",},
{"lineNum":"  187","line":"}"},
{"lineNum":"  188","line":""},
{"lineNum":"  189","line":"test \"scope returns null for undefined symbols\" {","class":"lineCov","hits":"3","order":"2393","possible_hits":"3",},
{"lineNum":"  190","line":"    var scope = Scope.new(std.testing.allocator, null);","class":"lineCov","hits":"1","order":"2394","possible_hits":"1",},
{"lineNum":"  191","line":"    defer scope.deinit();","class":"linePartCov","hits":"1","order":"2399","possible_hits":"2",},
{"lineNum":"  192","line":"    const res = scope.get(\"anUndefinedSymbol\");","class":"lineCov","hits":"1","order":"2395","possible_hits":"1",},
{"lineNum":"  193","line":"    try expect(res == null);","class":"linePartCov","hits":"1","order":"2398","possible_hits":"2",},
{"lineNum":"  194","line":"}"},
{"lineNum":"  195","line":""},
{"lineNum":"  196","line":"test \"can retrieve symbols from scope recursively\" {","class":"lineCov","hits":"3","order":"2400","possible_hits":"3",},
{"lineNum":"  197","line":"    var scope = Scope.new(std.testing.allocator, null);","class":"lineCov","hits":"1","order":"2401","possible_hits":"1",},
{"lineNum":"  198","line":"    defer scope.deinit();","class":"linePartCov","hits":"1","order":"2415","possible_hits":"5",},
{"lineNum":"  199","line":""},
{"lineNum":"  200","line":"    var typebook = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"2402","possible_hits":"1",},
{"lineNum":"  201","line":"    defer typebook.deinit();","class":"linePartCov","hits":"1","order":"2414","possible_hits":"5",},
{"lineNum":"  202","line":""},
{"lineNum":"  203","line":"    const name = \"aVariable\";"},
{"lineNum":"  204","line":"    const ty = typebook.getBoolean();","class":"lineCov","hits":"1","order":"2403","possible_hits":"1",},
{"lineNum":"  205","line":"    const isConst = true;"},
{"lineNum":"  206","line":"    const csr = Cursor.new(2, 9);","class":"lineCov","hits":"1","order":"2404","possible_hits":"1",},
{"lineNum":"  207","line":"    scope.put(name, ty, isConst, csr);","class":"lineCov","hits":"1","order":"2405","possible_hits":"1",},
{"lineNum":"  208","line":""},
{"lineNum":"  209","line":"    var child = Scope.new(std.testing.allocator, scope);","class":"lineCov","hits":"1","order":"2406","possible_hits":"1",},
{"lineNum":"  210","line":"    defer child.deinit();","class":"linePartCov","hits":"1","order":"2413","possible_hits":"5",},
{"lineNum":"  211","line":""},
{"lineNum":"  212","line":"    const res = child.get(name);","class":"lineCov","hits":"1","order":"2407","possible_hits":"1",},
{"lineNum":"  213","line":"    try expect(res != null);","class":"linePartCov","hits":"1","order":"2409","possible_hits":"2",},
{"lineNum":"  214","line":"    try expectEqual(ty, res.?.ty);","class":"linePartCov","hits":"1","order":"2410","possible_hits":"3",},
{"lineNum":"  215","line":"    try expectEqual(isConst, res.?.isConst);","class":"linePartCov","hits":"1","order":"2411","possible_hits":"3",},
{"lineNum":"  216","line":"    try expectEqual(csr, res.?.csr);","class":"linePartCov","hits":"1","order":"2412","possible_hits":"3",},
{"lineNum":"  217","line":"}"},
{"lineNum":"  218","line":""},
{"lineNum":"  219","line":"test \"can insert types into and retrieve types from scope\" {","class":"lineCov","hits":"3","order":"2416","possible_hits":"3",},
{"lineNum":"  220","line":"    var scope = Scope.new(std.testing.allocator, null);","class":"lineCov","hits":"1","order":"2417","possible_hits":"1",},
{"lineNum":"  221","line":"    defer scope.deinit();","class":"linePartCov","hits":"1","order":"2434","possible_hits":"3",},
{"lineNum":"  222","line":""},
{"lineNum":"  223","line":"    var typebook = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"2418","possible_hits":"1",},
{"lineNum":"  224","line":"    defer typebook.deinit();","class":"linePartCov","hits":"1","order":"2433","possible_hits":"3",},
{"lineNum":"  225","line":""},
{"lineNum":"  226","line":"    const name = \"AnAlias\";"},
{"lineNum":"  227","line":"    const ty = typebook.getBoolean();","class":"lineCov","hits":"1","order":"2419","possible_hits":"1",},
{"lineNum":"  228","line":"    scope.putType(name, ty);","class":"lineCov","hits":"1","order":"2420","possible_hits":"1",},
{"lineNum":"  229","line":""},
{"lineNum":"  230","line":"    const res = scope.getType(name);","class":"lineCov","hits":"1","order":"2426","possible_hits":"1",},
{"lineNum":"  231","line":"    try expect(res != null);","class":"linePartCov","hits":"1","order":"2431","possible_hits":"2",},
{"lineNum":"  232","line":"    try expectEqual(ty, res.?);","class":"linePartCov","hits":"1","order":"2432","possible_hits":"3",},
{"lineNum":"  233","line":"}"},
{"lineNum":"  234","line":""},
{"lineNum":"  235","line":"test \"scope returns null for undefined types\" {","class":"lineCov","hits":"3","order":"2435","possible_hits":"3",},
{"lineNum":"  236","line":"    var scope = Scope.new(std.testing.allocator, null);","class":"lineCov","hits":"1","order":"2436","possible_hits":"1",},
{"lineNum":"  237","line":"    defer scope.deinit();","class":"linePartCov","hits":"1","order":"2441","possible_hits":"2",},
{"lineNum":"  238","line":"    const res = scope.getType(\"AnUndefinedType\");","class":"lineCov","hits":"1","order":"2437","possible_hits":"1",},
{"lineNum":"  239","line":"    try expect(res == null);","class":"linePartCov","hits":"1","order":"2440","possible_hits":"2",},
{"lineNum":"  240","line":"}"},
{"lineNum":"  241","line":""},
{"lineNum":"  242","line":"test \"can retrieve types from scope recursively\" {","class":"lineCov","hits":"3","order":"2442","possible_hits":"3",},
{"lineNum":"  243","line":"    var scope = Scope.new(std.testing.allocator, null);","class":"lineCov","hits":"1","order":"2443","possible_hits":"1",},
{"lineNum":"  244","line":"    defer scope.deinit();","class":"linePartCov","hits":"1","order":"2454","possible_hits":"3",},
{"lineNum":"  245","line":""},
{"lineNum":"  246","line":"    var typebook = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"2444","possible_hits":"1",},
{"lineNum":"  247","line":"    defer typebook.deinit();","class":"linePartCov","hits":"1","order":"2453","possible_hits":"3",},
{"lineNum":"  248","line":""},
{"lineNum":"  249","line":"    const name = \"AnAlias\";"},
{"lineNum":"  250","line":"    const ty = typebook.getBoolean();","class":"lineCov","hits":"1","order":"2445","possible_hits":"1",},
{"lineNum":"  251","line":"    scope.putType(name, ty);","class":"lineCov","hits":"1","order":"2446","possible_hits":"1",},
{"lineNum":"  252","line":""},
{"lineNum":"  253","line":"    var child = Scope.new(std.testing.allocator, scope);","class":"lineCov","hits":"1","order":"2447","possible_hits":"1",},
{"lineNum":"  254","line":"    defer child.deinit();","class":"linePartCov","hits":"1","order":"2452","possible_hits":"3",},
{"lineNum":"  255","line":""},
{"lineNum":"  256","line":"    const res = child.getType(name);","class":"lineCov","hits":"1","order":"2448","possible_hits":"1",},
{"lineNum":"  257","line":"    try expect(res != null);","class":"linePartCov","hits":"1","order":"2450","possible_hits":"2",},
{"lineNum":"  258","line":"    try expectEqual(ty, res.?);","class":"linePartCov","hits":"1","order":"2451","possible_hits":"3",},
{"lineNum":"  259","line":"}"},
{"lineNum":"  260","line":""},
{"lineNum":"  261","line":"test \"scope can retrieve context\" {","class":"lineCov","hits":"3","order":"2455","possible_hits":"3",},
{"lineNum":"  262","line":"    var first = Scope.new(std.testing.allocator, null);","class":"lineCov","hits":"1","order":"2456","possible_hits":"1",},
{"lineNum":"  263","line":"    defer first.deinit();","class":"linePartCov","hits":"1","order":"2472","possible_hits":"5",},
{"lineNum":"  264","line":""},
{"lineNum":"  265","line":"    var second = Scope.new(std.testing.allocator, first);","class":"lineCov","hits":"1","order":"2457","possible_hits":"1",},
{"lineNum":"  266","line":"    defer second.deinit();","class":"linePartCov","hits":"1","order":"2471","possible_hits":"5",},
{"lineNum":"  267","line":""},
{"lineNum":"  268","line":"    try expect(!second.isInContext(.Loop));","class":"linePartCov","hits":"1","order":"2458","possible_hits":"2",},
{"lineNum":"  269","line":""},
{"lineNum":"  270","line":"    first.ctx = .Loop;","class":"lineCov","hits":"1","order":"2464","possible_hits":"1",},
{"lineNum":"  271","line":""},
{"lineNum":"  272","line":"    try expect(second.isInContext(.Loop));","class":"linePartCov","hits":"1","order":"2465","possible_hits":"2",},
{"lineNum":"  273","line":""},
{"lineNum":"  274","line":"    first.ctx = null;","class":"lineCov","hits":"1","order":"2467","possible_hits":"1",},
{"lineNum":"  275","line":"    second.ctx = .Loop;","class":"lineCov","hits":"1","order":"2468","possible_hits":"1",},
{"lineNum":"  276","line":""},
{"lineNum":"  277","line":"    try expect(second.isInContext(.Loop));","class":"linePartCov","hits":"1","order":"2469","possible_hits":"2",},
{"lineNum":"  278","line":"    try expect(!first.isInContext(.Loop));","class":"linePartCov","hits":"1","order":"2470","possible_hits":"2",},
{"lineNum":"  279","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-27 20:25:15", "instrumented" : 131, "covered" : 128,};
var merged_data = [];
