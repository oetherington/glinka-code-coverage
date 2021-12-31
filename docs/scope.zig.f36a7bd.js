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
{"lineNum":"   43","line":"        pub fn new(ty: Type.Ptr, isConst: bool, csr: Cursor) Symbol {","class":"lineCov","hits":"1","order":"1854","possible_hits":"1",},
{"lineNum":"   44","line":"            return Symbol{","class":"lineCov","hits":"1","order":"1858","possible_hits":"1",},
{"lineNum":"   45","line":"                .ty = ty,","class":"lineCov","hits":"1","order":"1855","possible_hits":"1",},
{"lineNum":"   46","line":"                .isConst = isConst,","class":"lineCov","hits":"1","order":"1856","possible_hits":"1",},
{"lineNum":"   47","line":"                .csr = csr,","class":"lineCov","hits":"1","order":"1857","possible_hits":"1",},
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
{"lineNum":"   68","line":"    pub fn deinit(self: *Scope) void {","class":"lineCov","hits":"2","order":"289","possible_hits":"2",},
{"lineNum":"   69","line":"        const alloc = self.getAllocator();","class":"lineCov","hits":"1","order":"290","possible_hits":"1",},
{"lineNum":"   70","line":"        self.symbolMap.deinit();","class":"lineCov","hits":"1","order":"293","possible_hits":"1",},
{"lineNum":"   71","line":"        self.typeMap.deinit();","class":"lineCov","hits":"1","order":"294","possible_hits":"1",},
{"lineNum":"   72","line":"        alloc.destroy(self);","class":"lineCov","hits":"1","order":"295","possible_hits":"1",},
{"lineNum":"   73","line":"    }"},
{"lineNum":"   74","line":""},
{"lineNum":"   75","line":"    pub fn getAllocator(self: *Scope) Allocator {","class":"lineCov","hits":"1","order":"291","possible_hits":"1",},
{"lineNum":"   76","line":"        return self.symbolMap.allocator;","class":"lineCov","hits":"1","order":"292","possible_hits":"1",},
{"lineNum":"   77","line":"    }"},
{"lineNum":"   78","line":""},
{"lineNum":"   79","line":"    pub fn put(","class":"lineCov","hits":"1","order":"1848","possible_hits":"1",},
{"lineNum":"   80","line":"        self: *Scope,"},
{"lineNum":"   81","line":"        name: []const u8,"},
{"lineNum":"   82","line":"        ty: Type.Ptr,"},
{"lineNum":"   83","line":"        isConst: bool,"},
{"lineNum":"   84","line":"        csr: Cursor,"},
{"lineNum":"   85","line":"    ) void {","class":"lineCov","hits":"1","order":"1860","possible_hits":"1",},
{"lineNum":"   86","line":"        // It is the caller\'s responsibility to ensure the symbol doesn\'t exist"},
{"lineNum":"   87","line":"        std.debug.assert(self.getLocal(name) == null);","class":"lineCov","hits":"1","order":"1849","possible_hits":"1",},
{"lineNum":"   88","line":""},
{"lineNum":"   89","line":"        self.symbolMap.putNoClobber(","class":"lineCov","hits":"2","order":"1852","possible_hits":"2",},
{"lineNum":"   90","line":"            name,"},
{"lineNum":"   91","line":"            Symbol.new(ty, isConst, csr),","class":"lineCov","hits":"1","order":"1853","possible_hits":"1",},
{"lineNum":"   92","line":"        ) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"1859","possible_hits":"1",},
{"lineNum":"   93","line":"    }"},
{"lineNum":"   94","line":""},
{"lineNum":"   95","line":"    pub fn get(self: *Scope, name: []const u8) ?Symbol {","class":"lineCov","hits":"1","order":"1862","possible_hits":"1",},
{"lineNum":"   96","line":"        const res = self.symbolMap.get(name);","class":"lineCov","hits":"1","order":"1863","possible_hits":"1",},
{"lineNum":"   97","line":"        if (res) |ty|","class":"lineCov","hits":"2","order":"1864","possible_hits":"2",},
{"lineNum":"   98","line":"            return ty;","class":"lineCov","hits":"1","order":"1865","possible_hits":"1",},
{"lineNum":"   99","line":"        if (self.parent) |parent|","class":"lineCov","hits":"2","order":"1875","possible_hits":"2",},
{"lineNum":"  100","line":"            return parent.get(name);","class":"lineCov","hits":"1","order":"1887","possible_hits":"1",},
{"lineNum":"  101","line":"        return null;","class":"lineCov","hits":"1","order":"1876","possible_hits":"1",},
{"lineNum":"  102","line":"    }"},
{"lineNum":"  103","line":""},
{"lineNum":"  104","line":"    pub fn getLocal(self: *Scope, name: []const u8) ?Symbol {","class":"lineCov","hits":"1","order":"1850","possible_hits":"1",},
{"lineNum":"  105","line":"        return self.symbolMap.get(name);","class":"lineCov","hits":"1","order":"1851","possible_hits":"1",},
{"lineNum":"  106","line":"    }"},
{"lineNum":"  107","line":""},
{"lineNum":"  108","line":"    pub fn putType(self: *Scope, name: []const u8, ty: Type.Ptr) void {","class":"lineCov","hits":"2","order":"1900","possible_hits":"2",},
{"lineNum":"  109","line":"        // It is the caller\'s responsibility to ensure the type doesn\'t exist"},
{"lineNum":"  110","line":"        std.debug.assert(self.getTypeLocal(name) == null);","class":"lineCov","hits":"1","order":"1901","possible_hits":"1",},
{"lineNum":"  111","line":""},
{"lineNum":"  112","line":"        self.typeMap.putNoClobber(name, ty) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"1904","possible_hits":"1",},
{"lineNum":"  113","line":"    }"},
{"lineNum":"  114","line":""},
{"lineNum":"  115","line":"    pub fn getType(self: *Scope, name: []const u8) ?Type.Ptr {","class":"lineCov","hits":"1","order":"1906","possible_hits":"1",},
{"lineNum":"  116","line":"        const res = self.typeMap.get(name);","class":"lineCov","hits":"1","order":"1907","possible_hits":"1",},
{"lineNum":"  117","line":"        if (res) |ty|","class":"lineCov","hits":"2","order":"1908","possible_hits":"2",},
{"lineNum":"  118","line":"            return ty;","class":"lineCov","hits":"1","order":"1909","possible_hits":"1",},
{"lineNum":"  119","line":"        if (self.parent) |parent|","class":"lineCov","hits":"2","order":"1917","possible_hits":"2",},
{"lineNum":"  120","line":"            return parent.getType(name);","class":"lineCov","hits":"1","order":"1928","possible_hits":"1",},
{"lineNum":"  121","line":"        return null;","class":"lineCov","hits":"1","order":"1918","possible_hits":"1",},
{"lineNum":"  122","line":"    }"},
{"lineNum":"  123","line":""},
{"lineNum":"  124","line":"    pub fn getTypeLocal(self: *Scope, name: []const u8) ?Type.Ptr {","class":"lineCov","hits":"1","order":"1902","possible_hits":"1",},
{"lineNum":"  125","line":"        return self.typeMap.get(name);","class":"lineCov","hits":"1","order":"1903","possible_hits":"1",},
{"lineNum":"  126","line":"    }"},
{"lineNum":"  127","line":""},
{"lineNum":"  128","line":"    pub fn isInContext(self: *Scope, ctx: Context) bool {","class":"lineCov","hits":"1","order":"1938","possible_hits":"1",},
{"lineNum":"  129","line":"        // TODO: self.ctx == ctx seems to crash the zig compiler"},
{"lineNum":"  130","line":"        if (self.ctx != null and self.ctx.? == ctx)","class":"linePartCov","hits":"2","order":"1939","possible_hits":"3",},
{"lineNum":"  131","line":"            return true;","class":"lineCov","hits":"1","order":"1945","possible_hits":"1",},
{"lineNum":"  132","line":"        if (self.parent) |parent|","class":"lineCov","hits":"2","order":"1940","possible_hits":"2",},
{"lineNum":"  133","line":"            return parent.isInContext(ctx);","class":"lineCov","hits":"1","order":"1941","possible_hits":"1",},
{"lineNum":"  134","line":"        return false;","class":"lineCov","hits":"1","order":"1942","possible_hits":"1",},
{"lineNum":"  135","line":"    }"},
{"lineNum":"  136","line":"};"},
{"lineNum":"  137","line":""},
{"lineNum":"  138","line":"test \"can insert symbols into and retrieve symbols from scope\" {","class":"lineCov","hits":"3","order":"1840","possible_hits":"3",},
{"lineNum":"  139","line":"    var scope = Scope.new(std.testing.allocator, null);","class":"lineCov","hits":"1","order":"1841","possible_hits":"1",},
{"lineNum":"  140","line":"    defer scope.deinit();","class":"linePartCov","hits":"1","order":"1871","possible_hits":"5",},
{"lineNum":"  141","line":""},
{"lineNum":"  142","line":"    var typebook = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"1842","possible_hits":"1",},
{"lineNum":"  143","line":"    defer typebook.deinit();","class":"linePartCov","hits":"1","order":"1870","possible_hits":"5",},
{"lineNum":"  144","line":""},
{"lineNum":"  145","line":"    const name = \"aVariable\";"},
{"lineNum":"  146","line":"    const ty = typebook.getBoolean();","class":"lineCov","hits":"1","order":"1843","possible_hits":"1",},
{"lineNum":"  147","line":"    const isConst = true;"},
{"lineNum":"  148","line":"    const csr = Cursor.new(2, 9);","class":"lineCov","hits":"1","order":"1846","possible_hits":"1",},
{"lineNum":"  149","line":"    scope.put(name, ty, isConst, csr);","class":"lineCov","hits":"1","order":"1847","possible_hits":"1",},
{"lineNum":"  150","line":""},
{"lineNum":"  151","line":"    const res = scope.get(name);","class":"lineCov","hits":"1","order":"1861","possible_hits":"1",},
{"lineNum":"  152","line":"    try expect(res != null);","class":"linePartCov","hits":"1","order":"1866","possible_hits":"2",},
{"lineNum":"  153","line":"    try expectEqual(ty, res.?.ty);","class":"linePartCov","hits":"1","order":"1867","possible_hits":"3",},
{"lineNum":"  154","line":"    try expectEqual(isConst, res.?.isConst);","class":"linePartCov","hits":"1","order":"1868","possible_hits":"3",},
{"lineNum":"  155","line":"    try expectEqual(csr, res.?.csr);","class":"linePartCov","hits":"1","order":"1869","possible_hits":"3",},
{"lineNum":"  156","line":"}"},
{"lineNum":"  157","line":""},
{"lineNum":"  158","line":"test \"scope returns null for undefined symbols\" {","class":"lineCov","hits":"3","order":"1872","possible_hits":"3",},
{"lineNum":"  159","line":"    var scope = Scope.new(std.testing.allocator, null);","class":"lineCov","hits":"1","order":"1873","possible_hits":"1",},
{"lineNum":"  160","line":"    defer scope.deinit();","class":"linePartCov","hits":"1","order":"1878","possible_hits":"2",},
{"lineNum":"  161","line":"    const res = scope.get(\"anUndefinedSymbol\");","class":"lineCov","hits":"1","order":"1874","possible_hits":"1",},
{"lineNum":"  162","line":"    try expect(res == null);","class":"linePartCov","hits":"1","order":"1877","possible_hits":"2",},
{"lineNum":"  163","line":"}"},
{"lineNum":"  164","line":""},
{"lineNum":"  165","line":"test \"can retrieve symbols from scope recursively\" {","class":"lineCov","hits":"3","order":"1879","possible_hits":"3",},
{"lineNum":"  166","line":"    var scope = Scope.new(std.testing.allocator, null);","class":"lineCov","hits":"1","order":"1880","possible_hits":"1",},
{"lineNum":"  167","line":"    defer scope.deinit();","class":"linePartCov","hits":"1","order":"1894","possible_hits":"5",},
{"lineNum":"  168","line":""},
{"lineNum":"  169","line":"    var typebook = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"1881","possible_hits":"1",},
{"lineNum":"  170","line":"    defer typebook.deinit();","class":"linePartCov","hits":"1","order":"1893","possible_hits":"5",},
{"lineNum":"  171","line":""},
{"lineNum":"  172","line":"    const name = \"aVariable\";"},
{"lineNum":"  173","line":"    const ty = typebook.getBoolean();","class":"lineCov","hits":"1","order":"1882","possible_hits":"1",},
{"lineNum":"  174","line":"    const isConst = true;"},
{"lineNum":"  175","line":"    const csr = Cursor.new(2, 9);","class":"lineCov","hits":"1","order":"1883","possible_hits":"1",},
{"lineNum":"  176","line":"    scope.put(name, ty, isConst, csr);","class":"lineCov","hits":"1","order":"1884","possible_hits":"1",},
{"lineNum":"  177","line":""},
{"lineNum":"  178","line":"    var child = Scope.new(std.testing.allocator, scope);","class":"lineCov","hits":"1","order":"1885","possible_hits":"1",},
{"lineNum":"  179","line":"    defer child.deinit();","class":"linePartCov","hits":"1","order":"1892","possible_hits":"5",},
{"lineNum":"  180","line":""},
{"lineNum":"  181","line":"    const res = child.get(name);","class":"lineCov","hits":"1","order":"1886","possible_hits":"1",},
{"lineNum":"  182","line":"    try expect(res != null);","class":"linePartCov","hits":"1","order":"1888","possible_hits":"2",},
{"lineNum":"  183","line":"    try expectEqual(ty, res.?.ty);","class":"linePartCov","hits":"1","order":"1889","possible_hits":"3",},
{"lineNum":"  184","line":"    try expectEqual(isConst, res.?.isConst);","class":"linePartCov","hits":"1","order":"1890","possible_hits":"3",},
{"lineNum":"  185","line":"    try expectEqual(csr, res.?.csr);","class":"linePartCov","hits":"1","order":"1891","possible_hits":"3",},
{"lineNum":"  186","line":"}"},
{"lineNum":"  187","line":""},
{"lineNum":"  188","line":"test \"can insert types into and retrieve types from scope\" {","class":"lineCov","hits":"3","order":"1895","possible_hits":"3",},
{"lineNum":"  189","line":"    var scope = Scope.new(std.testing.allocator, null);","class":"lineCov","hits":"1","order":"1896","possible_hits":"1",},
{"lineNum":"  190","line":"    defer scope.deinit();","class":"linePartCov","hits":"1","order":"1913","possible_hits":"3",},
{"lineNum":"  191","line":""},
{"lineNum":"  192","line":"    var typebook = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"1897","possible_hits":"1",},
{"lineNum":"  193","line":"    defer typebook.deinit();","class":"linePartCov","hits":"1","order":"1912","possible_hits":"3",},
{"lineNum":"  194","line":""},
{"lineNum":"  195","line":"    const name = \"AnAlias\";"},
{"lineNum":"  196","line":"    const ty = typebook.getBoolean();","class":"lineCov","hits":"1","order":"1898","possible_hits":"1",},
{"lineNum":"  197","line":"    scope.putType(name, ty);","class":"lineCov","hits":"1","order":"1899","possible_hits":"1",},
{"lineNum":"  198","line":""},
{"lineNum":"  199","line":"    const res = scope.getType(name);","class":"lineCov","hits":"1","order":"1905","possible_hits":"1",},
{"lineNum":"  200","line":"    try expect(res != null);","class":"linePartCov","hits":"1","order":"1910","possible_hits":"2",},
{"lineNum":"  201","line":"    try expectEqual(ty, res.?);","class":"linePartCov","hits":"1","order":"1911","possible_hits":"3",},
{"lineNum":"  202","line":"}"},
{"lineNum":"  203","line":""},
{"lineNum":"  204","line":"test \"scope returns null for undefined types\" {","class":"lineCov","hits":"3","order":"1914","possible_hits":"3",},
{"lineNum":"  205","line":"    var scope = Scope.new(std.testing.allocator, null);","class":"lineCov","hits":"1","order":"1915","possible_hits":"1",},
{"lineNum":"  206","line":"    defer scope.deinit();","class":"linePartCov","hits":"1","order":"1920","possible_hits":"2",},
{"lineNum":"  207","line":"    const res = scope.getType(\"AnUndefinedType\");","class":"lineCov","hits":"1","order":"1916","possible_hits":"1",},
{"lineNum":"  208","line":"    try expect(res == null);","class":"linePartCov","hits":"1","order":"1919","possible_hits":"2",},
{"lineNum":"  209","line":"}"},
{"lineNum":"  210","line":""},
{"lineNum":"  211","line":"test \"can retrieve types from scope recursively\" {","class":"lineCov","hits":"3","order":"1921","possible_hits":"3",},
{"lineNum":"  212","line":"    var scope = Scope.new(std.testing.allocator, null);","class":"lineCov","hits":"1","order":"1922","possible_hits":"1",},
{"lineNum":"  213","line":"    defer scope.deinit();","class":"linePartCov","hits":"1","order":"1933","possible_hits":"3",},
{"lineNum":"  214","line":""},
{"lineNum":"  215","line":"    var typebook = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"1923","possible_hits":"1",},
{"lineNum":"  216","line":"    defer typebook.deinit();","class":"linePartCov","hits":"1","order":"1932","possible_hits":"3",},
{"lineNum":"  217","line":""},
{"lineNum":"  218","line":"    const name = \"AnAlias\";"},
{"lineNum":"  219","line":"    const ty = typebook.getBoolean();","class":"lineCov","hits":"1","order":"1924","possible_hits":"1",},
{"lineNum":"  220","line":"    scope.putType(name, ty);","class":"lineCov","hits":"1","order":"1925","possible_hits":"1",},
{"lineNum":"  221","line":""},
{"lineNum":"  222","line":"    var child = Scope.new(std.testing.allocator, scope);","class":"lineCov","hits":"1","order":"1926","possible_hits":"1",},
{"lineNum":"  223","line":"    defer child.deinit();","class":"linePartCov","hits":"1","order":"1931","possible_hits":"3",},
{"lineNum":"  224","line":""},
{"lineNum":"  225","line":"    const res = child.getType(name);","class":"lineCov","hits":"1","order":"1927","possible_hits":"1",},
{"lineNum":"  226","line":"    try expect(res != null);","class":"linePartCov","hits":"1","order":"1929","possible_hits":"2",},
{"lineNum":"  227","line":"    try expectEqual(ty, res.?);","class":"linePartCov","hits":"1","order":"1930","possible_hits":"3",},
{"lineNum":"  228","line":"}"},
{"lineNum":"  229","line":""},
{"lineNum":"  230","line":"test \"scope can retrieve context\" {","class":"lineCov","hits":"3","order":"1934","possible_hits":"3",},
{"lineNum":"  231","line":"    var first = Scope.new(std.testing.allocator, null);","class":"lineCov","hits":"1","order":"1935","possible_hits":"1",},
{"lineNum":"  232","line":"    defer first.deinit();","class":"linePartCov","hits":"1","order":"1951","possible_hits":"5",},
{"lineNum":"  233","line":""},
{"lineNum":"  234","line":"    var second = Scope.new(std.testing.allocator, first);","class":"lineCov","hits":"1","order":"1936","possible_hits":"1",},
{"lineNum":"  235","line":"    defer second.deinit();","class":"linePartCov","hits":"1","order":"1950","possible_hits":"5",},
{"lineNum":"  236","line":""},
{"lineNum":"  237","line":"    try expect(!second.isInContext(.Loop));","class":"linePartCov","hits":"1","order":"1937","possible_hits":"2",},
{"lineNum":"  238","line":""},
{"lineNum":"  239","line":"    first.ctx = .Loop;","class":"lineCov","hits":"1","order":"1943","possible_hits":"1",},
{"lineNum":"  240","line":""},
{"lineNum":"  241","line":"    try expect(second.isInContext(.Loop));","class":"linePartCov","hits":"1","order":"1944","possible_hits":"2",},
{"lineNum":"  242","line":""},
{"lineNum":"  243","line":"    first.ctx = null;","class":"lineCov","hits":"1","order":"1946","possible_hits":"1",},
{"lineNum":"  244","line":"    second.ctx = .Loop;","class":"lineCov","hits":"1","order":"1947","possible_hits":"1",},
{"lineNum":"  245","line":""},
{"lineNum":"  246","line":"    try expect(second.isInContext(.Loop));","class":"linePartCov","hits":"1","order":"1948","possible_hits":"2",},
{"lineNum":"  247","line":"    try expect(!first.isInContext(.Loop));","class":"linePartCov","hits":"1","order":"1949","possible_hits":"2",},
{"lineNum":"  248","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2021-12-31 18:16:32", "instrumented" : 123, "covered" : 123,};
var merged_data = [];
