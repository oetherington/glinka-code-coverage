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
{"lineNum":"   22","line":"const Type = @import(\"../common/types/type.zig\").Type;"},
{"lineNum":"   23","line":"const TokenType = @import(\"../common/token.zig\").Token.Type;"},
{"lineNum":"   24","line":"const allocate = @import(\"../common/allocate.zig\");"},
{"lineNum":"   25","line":"const opMap = @import(\"./op_map.zig\");"},
{"lineNum":"   26","line":""},
{"lineNum":"   27","line":"pub const TypeBook = struct {"},
{"lineNum":"   28","line":"    const TypeMap = std.HashMap("},
{"lineNum":"   29","line":"        Type,"},
{"lineNum":"   30","line":"        Type.Ptr,"},
{"lineNum":"   31","line":"        struct {"},
{"lineNum":"   32","line":"            pub fn hash(self: @This(), value: Type) u64 {","class":"lineCov","hits":"1","order":"1837","possible_hits":"1",},
{"lineNum":"   33","line":"                _ = self;"},
{"lineNum":"   34","line":"                return value.hash();","class":"lineCov","hits":"1","order":"1838","possible_hits":"1",},
{"lineNum":"   35","line":"            }"},
{"lineNum":"   36","line":""},
{"lineNum":"   37","line":"            pub fn eql(self: @This(), a: Type, b: Type) bool {","class":"lineCov","hits":"1","order":"1843","possible_hits":"1",},
{"lineNum":"   38","line":"                _ = self;"},
{"lineNum":"   39","line":"                return a.eql(&b);","class":"lineCov","hits":"1","order":"1844","possible_hits":"1",},
{"lineNum":"   40","line":"            }"},
{"lineNum":"   41","line":"        },"},
{"lineNum":"   42","line":"        std.hash_map.default_max_load_percentage,"},
{"lineNum":"   43","line":"    );"},
{"lineNum":"   44","line":""},
{"lineNum":"   45","line":"    const TypeList = std.ArrayList(Type.Ptr);"},
{"lineNum":"   46","line":""},
{"lineNum":"   47","line":"    alloc: Allocator,"},
{"lineNum":"   48","line":"    opMap: opMap.OpMap,"},
{"lineNum":"   49","line":"    unknownTy: Type = Type.newUnknown(),"},
{"lineNum":"   50","line":"    anyTy: Type = Type.newAny(),"},
{"lineNum":"   51","line":"    voidTy: Type = Type.newVoid(),"},
{"lineNum":"   52","line":"    nullTy: Type = Type.newNull(),"},
{"lineNum":"   53","line":"    undefinedTy: Type = Type.newUndefined(),"},
{"lineNum":"   54","line":"    neverTy: Type = Type.newNever(),"},
{"lineNum":"   55","line":"    numberTy: Type = Type.newNumber(),"},
{"lineNum":"   56","line":"    stringTy: Type = Type.newString(),"},
{"lineNum":"   57","line":"    booleanTy: Type = Type.newBoolean(),"},
{"lineNum":"   58","line":"    objectTy: Type = Type.newObject(),"},
{"lineNum":"   59","line":"    tyMap: TypeMap,"},
{"lineNum":"   60","line":""},
{"lineNum":"   61","line":"    pub fn new(alloc: Allocator) *TypeBook {","class":"lineCov","hits":"1","order":"1787","possible_hits":"1",},
{"lineNum":"   62","line":"        var self = alloc.create(TypeBook) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"1788","possible_hits":"1",},
{"lineNum":"   63","line":"        self.* = TypeBook{","class":"lineCov","hits":"2","order":"1789","possible_hits":"2",},
{"lineNum":"   64","line":"            .alloc = alloc,","class":"lineCov","hits":"1","order":"1790","possible_hits":"1",},
{"lineNum":"   65","line":"            .opMap = undefined,","class":"lineCov","hits":"1","order":"1791","possible_hits":"1",},
{"lineNum":"   66","line":"            .tyMap = TypeMap.init(alloc),","class":"lineCov","hits":"1","order":"1792","possible_hits":"1",},
{"lineNum":"   67","line":"        };"},
{"lineNum":"   68","line":"        opMap.populateOpMap(self);","class":"lineCov","hits":"1","order":"1793","possible_hits":"1",},
{"lineNum":"   69","line":"        return self;","class":"lineCov","hits":"1","order":"1884","possible_hits":"1",},
{"lineNum":"   70","line":"    }"},
{"lineNum":"   71","line":""},
{"lineNum":"   72","line":"    pub fn deinit(self: *TypeBook) void {","class":"lineCov","hits":"2","order":"1972","possible_hits":"2",},
{"lineNum":"   73","line":"        var it = self.tyMap.valueIterator();","class":"lineCov","hits":"1","order":"1973","possible_hits":"1",},
{"lineNum":"   74","line":""},
{"lineNum":"   75","line":"        while (it.next()) |val| {","class":"lineCov","hits":"2","order":"1974","possible_hits":"2",},
{"lineNum":"   76","line":"            switch (val.*.*) {","class":"lineCov","hits":"4","order":"1975","possible_hits":"4",},
{"lineNum":"   77","line":"                .Function => |f| self.alloc.free(f.args),","class":"lineCov","hits":"1","order":"1978","possible_hits":"1",},
{"lineNum":"   78","line":"                .Union => |un| self.alloc.free(un.tys),","class":"lineCov","hits":"1","order":"1976","possible_hits":"1",},
{"lineNum":"   79","line":"                .Interface => |in| self.alloc.free(in.members),","class":"lineCov","hits":"1","order":"1979","possible_hits":"1",},
{"lineNum":"   80","line":"                .Class => |cls| self.alloc.free(cls.members),","class":"lineCov","hits":"1","order":"3384","possible_hits":"1",},
{"lineNum":"   81","line":"                else => {},"},
{"lineNum":"   82","line":"            }"},
{"lineNum":"   83","line":""},
{"lineNum":"   84","line":"            self.alloc.destroy(val.*);","class":"lineCov","hits":"1","order":"1977","possible_hits":"1",},
{"lineNum":"   85","line":"        }"},
{"lineNum":"   86","line":""},
{"lineNum":"   87","line":"        self.tyMap.deinit();","class":"lineCov","hits":"1","order":"1980","possible_hits":"1",},
{"lineNum":"   88","line":""},
{"lineNum":"   89","line":"        self.alloc.destroy(self);","class":"lineCov","hits":"1","order":"1981","possible_hits":"1",},
{"lineNum":"   90","line":"    }"},
{"lineNum":"   91","line":""},
{"lineNum":"   92","line":"    pub fn combine(self: *TypeBook, a: Type.Ptr, b: Type.Ptr) Type.Ptr {","class":"lineCov","hits":"1","order":"2191","possible_hits":"1",},
{"lineNum":"   93","line":"        if (b.isAssignableTo(a))","class":"lineCov","hits":"2","order":"2192","possible_hits":"2",},
{"lineNum":"   94","line":"            return a;","class":"lineCov","hits":"1","order":"2193","possible_hits":"1",},
{"lineNum":"   95","line":"        return self.getUnion(&[_]Type.Ptr{ a, b });","class":"lineCov","hits":"1","order":"2196","possible_hits":"1",},
{"lineNum":"   96","line":"    }"},
{"lineNum":"   97","line":""},
{"lineNum":"   98","line":"    pub fn getOpEntry(self: *TypeBook, ty: TokenType) ?opMap.OpEntry {","class":"lineCov","hits":"1","order":"2176","possible_hits":"1",},
{"lineNum":"   99","line":"        return self.opMap[@enumToInt(ty)];","class":"lineCov","hits":"1","order":"2177","possible_hits":"1",},
{"lineNum":"  100","line":"    }"},
{"lineNum":"  101","line":""},
{"lineNum":"  102","line":"    pub fn getUnknown(self: *TypeBook) Type.Ptr {","class":"lineCov","hits":"1","order":"2089","possible_hits":"1",},
{"lineNum":"  103","line":"        return &self.unknownTy;","class":"lineCov","hits":"1","order":"2090","possible_hits":"1",},
{"lineNum":"  104","line":"    }"},
{"lineNum":"  105","line":""},
{"lineNum":"  106","line":"    pub fn getAny(self: *TypeBook) Type.Ptr {","class":"lineCov","hits":"1","order":"1897","possible_hits":"1",},
{"lineNum":"  107","line":"        return &self.anyTy;","class":"lineCov","hits":"1","order":"1898","possible_hits":"1",},
{"lineNum":"  108","line":"    }"},
{"lineNum":"  109","line":""},
{"lineNum":"  110","line":"    pub fn getVoid(self: *TypeBook) Type.Ptr {","class":"lineCov","hits":"1","order":"1894","possible_hits":"1",},
{"lineNum":"  111","line":"        return &self.voidTy;","class":"lineCov","hits":"1","order":"1895","possible_hits":"1",},
{"lineNum":"  112","line":"    }"},
{"lineNum":"  113","line":""},
{"lineNum":"  114","line":"    pub fn getNull(self: *TypeBook) Type.Ptr {","class":"lineCov","hits":"1","order":"2094","possible_hits":"1",},
{"lineNum":"  115","line":"        return &self.nullTy;","class":"lineCov","hits":"1","order":"2095","possible_hits":"1",},
{"lineNum":"  116","line":"    }"},
{"lineNum":"  117","line":""},
{"lineNum":"  118","line":"    pub fn getUndefined(self: *TypeBook) Type.Ptr {","class":"lineCov","hits":"1","order":"2097","possible_hits":"1",},
{"lineNum":"  119","line":"        return &self.undefinedTy;","class":"lineCov","hits":"1","order":"2098","possible_hits":"1",},
{"lineNum":"  120","line":"    }"},
{"lineNum":"  121","line":""},
{"lineNum":"  122","line":"    pub fn getNever(self: *TypeBook) Type.Ptr {","class":"lineCov","hits":"1","order":"2100","possible_hits":"1",},
{"lineNum":"  123","line":"        return &self.neverTy;","class":"lineCov","hits":"1","order":"2101","possible_hits":"1",},
{"lineNum":"  124","line":"    }"},
{"lineNum":"  125","line":""},
{"lineNum":"  126","line":"    pub fn getNumber(self: *TypeBook) Type.Ptr {","class":"lineCov","hits":"1","order":"2103","possible_hits":"1",},
{"lineNum":"  127","line":"        return &self.numberTy;","class":"lineCov","hits":"1","order":"2104","possible_hits":"1",},
{"lineNum":"  128","line":"    }"},
{"lineNum":"  129","line":""},
{"lineNum":"  130","line":"    pub fn getString(self: *TypeBook) Type.Ptr {","class":"lineCov","hits":"1","order":"2106","possible_hits":"1",},
{"lineNum":"  131","line":"        return &self.stringTy;","class":"lineCov","hits":"1","order":"2107","possible_hits":"1",},
{"lineNum":"  132","line":"    }"},
{"lineNum":"  133","line":""},
{"lineNum":"  134","line":"    pub fn getBoolean(self: *TypeBook) Type.Ptr {","class":"lineCov","hits":"1","order":"1991","possible_hits":"1",},
{"lineNum":"  135","line":"        return &self.booleanTy;","class":"lineCov","hits":"1","order":"1992","possible_hits":"1",},
{"lineNum":"  136","line":"    }"},
{"lineNum":"  137","line":""},
{"lineNum":"  138","line":"    pub fn getObject(self: *TypeBook) Type.Ptr {","class":"lineCov","hits":"1","order":"2110","possible_hits":"1",},
{"lineNum":"  139","line":"        return &self.objectTy;","class":"lineCov","hits":"1","order":"2111","possible_hits":"1",},
{"lineNum":"  140","line":"    }"},
{"lineNum":"  141","line":""},
{"lineNum":"  142","line":"    pub fn getArray(self: *TypeBook, subtype: Type.Ptr) Type.Ptr {","class":"lineCov","hits":"1","order":"2118","possible_hits":"1",},
{"lineNum":"  143","line":"        const arr = Type{ .Array = Type.ArrayType{ .subtype = subtype } };","class":"lineCov","hits":"1","order":"2119","possible_hits":"1",},
{"lineNum":"  144","line":""},
{"lineNum":"  145","line":"        if (self.tyMap.get(arr)) |ty|","class":"lineCov","hits":"2","order":"2120","possible_hits":"2",},
{"lineNum":"  146","line":"            return ty;","class":"lineCov","hits":"1","order":"2128","possible_hits":"1",},
{"lineNum":"  147","line":""},
{"lineNum":"  148","line":"        var ty = allocate.create(self.alloc, Type);","class":"lineCov","hits":"1","order":"2121","possible_hits":"1",},
{"lineNum":"  149","line":"        ty.* = arr;","class":"lineCov","hits":"1","order":"2122","possible_hits":"1",},
{"lineNum":"  150","line":"        self.tyMap.put(arr, ty) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"2123","possible_hits":"1",},
{"lineNum":"  151","line":"        return ty;","class":"lineCov","hits":"1","order":"2124","possible_hits":"1",},
{"lineNum":"  152","line":"    }"},
{"lineNum":"  153","line":""},
{"lineNum":"  154","line":"    pub fn getFunction(","class":"lineCov","hits":"1","order":"1899","possible_hits":"1",},
{"lineNum":"  155","line":"        self: *TypeBook,"},
{"lineNum":"  156","line":"        ret: Type.Ptr,"},
{"lineNum":"  157","line":"        args: []Type.Ptr,"},
{"lineNum":"  158","line":"        isConstructable: bool,"},
{"lineNum":"  159","line":"    ) Type.Ptr {"},
{"lineNum":"  160","line":"        var funcTy = Type{"},
{"lineNum":"  161","line":"            .Function = Type.FunctionType.new(ret, args, isConstructable),","class":"lineCov","hits":"1","order":"1900","possible_hits":"1",},
{"lineNum":"  162","line":"        };"},
{"lineNum":"  163","line":""},
{"lineNum":"  164","line":"        if (self.tyMap.get(funcTy)) |ty|","class":"lineCov","hits":"2","order":"1901","possible_hits":"2",},
{"lineNum":"  165","line":"            return ty;","class":"lineCov","hits":"1","order":"2170","possible_hits":"1",},
{"lineNum":"  166","line":""},
{"lineNum":"  167","line":"        funcTy.Function.args = allocate.alloc(self.alloc, Type.Ptr, args.len);","class":"linePartCov","hits":"2","order":"1902","possible_hits":"3",},
{"lineNum":"  168","line":"        std.mem.copy(Type.Ptr, funcTy.Function.args, args);","class":"linePartCov","hits":"2","order":"1905","possible_hits":"3",},
{"lineNum":"  169","line":""},
{"lineNum":"  170","line":"        var ty = allocate.create(self.alloc, Type);","class":"lineCov","hits":"1","order":"1906","possible_hits":"1",},
{"lineNum":"  171","line":"        ty.* = funcTy;","class":"lineCov","hits":"1","order":"1907","possible_hits":"1",},
{"lineNum":"  172","line":"        self.tyMap.put(funcTy, ty) catch allocate.reportAndExit();","class":"linePartCov","hits":"1","order":"1908","possible_hits":"2",},
{"lineNum":"  173","line":"        return ty;","class":"lineCov","hits":"1","order":"1909","possible_hits":"1",},
{"lineNum":"  174","line":"    }"},
{"lineNum":"  175","line":""},
{"lineNum":"  176","line":"    fn flattenUnionTypes(out: *TypeList, in: []Type.Ptr) void {","class":"lineCov","hits":"2","order":"1823","possible_hits":"2",},
{"lineNum":"  177","line":"        for (in) |ty| {","class":"lineCov","hits":"2","order":"1824","possible_hits":"2",},
{"lineNum":"  178","line":"            switch (ty.*) {","class":"lineCov","hits":"2","order":"1825","possible_hits":"2",},
{"lineNum":"  179","line":"                .Union => |un| TypeBook.flattenUnionTypes(out, un.tys),","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  180","line":"                else => out.append(ty) catch allocate.reportAndExit(),","class":"lineCov","hits":"1","order":"1826","possible_hits":"1",},
{"lineNum":"  181","line":"            }"},
{"lineNum":"  182","line":"        }"},
{"lineNum":"  183","line":"    }"},
{"lineNum":"  184","line":""},
{"lineNum":"  185","line":"    pub fn getUnion(self: *TypeBook, tys_: []Type.Ptr) Type.Ptr {","class":"lineCov","hits":"1","order":"1819","possible_hits":"1",},
{"lineNum":"  186","line":"        const Context = struct {"},
{"lineNum":"  187","line":"            pub fn lessThan(_: @This(), lhs: Type.Ptr, rhs: Type.Ptr) bool {","class":"lineCov","hits":"1","order":"1829","possible_hits":"1",},
{"lineNum":"  188","line":"                return @ptrToInt(lhs) < @ptrToInt(rhs);","class":"lineCov","hits":"1","order":"1830","possible_hits":"1",},
{"lineNum":"  189","line":"            }"},
{"lineNum":"  190","line":"        };"},
{"lineNum":"  191","line":""},
{"lineNum":"  192","line":"        // TODO: Refactor this to avoid allocating"},
{"lineNum":"  193","line":"        var flattened = TypeList.init(self.alloc);","class":"lineCov","hits":"1","order":"1820","possible_hits":"1",},
{"lineNum":"  194","line":"        flattened.ensureTotalCapacity(tys_.len) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"1821","possible_hits":"1",},
{"lineNum":"  195","line":"        TypeBook.flattenUnionTypes(&flattened, tys_);","class":"lineCov","hits":"1","order":"1822","possible_hits":"1",},
{"lineNum":"  196","line":""},
{"lineNum":"  197","line":"        const tys = flattened.items;","class":"lineCov","hits":"1","order":"1827","possible_hits":"1",},
{"lineNum":"  198","line":"        std.sort.insertionSort(Type.Ptr, tys, Context{}, Context.lessThan);","class":"lineCov","hits":"1","order":"1828","possible_hits":"1",},
{"lineNum":"  199","line":""},
{"lineNum":"  200","line":"        const un = Type.newUnion(Type.UnionType.new(tys));","class":"lineCov","hits":"1","order":"1831","possible_hits":"1",},
{"lineNum":"  201","line":""},
{"lineNum":"  202","line":"        const existing = self.tyMap.get(un);","class":"lineCov","hits":"1","order":"1832","possible_hits":"1",},
{"lineNum":"  203","line":"        if (existing) |ty| {","class":"lineCov","hits":"2","order":"1833","possible_hits":"2",},
{"lineNum":"  204","line":"            flattened.deinit();","class":"lineCov","hits":"1","order":"1846","possible_hits":"1",},
{"lineNum":"  205","line":"            return ty;","class":"lineCov","hits":"1","order":"1847","possible_hits":"1",},
{"lineNum":"  206","line":"        }"},
{"lineNum":"  207","line":""},
{"lineNum":"  208","line":"        var ty = allocate.create(self.alloc, Type);","class":"lineCov","hits":"1","order":"1834","possible_hits":"1",},
{"lineNum":"  209","line":"        ty.* = un;","class":"lineCov","hits":"1","order":"1835","possible_hits":"1",},
{"lineNum":"  210","line":"        self.tyMap.put(un, ty) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"1836","possible_hits":"1",},
{"lineNum":"  211","line":"        return ty;","class":"lineCov","hits":"1","order":"1840","possible_hits":"1",},
{"lineNum":"  212","line":"    }"},
{"lineNum":"  213","line":""},
{"lineNum":"  214","line":"    pub fn putAlias(self: *TypeBook, aliasTy: Type.Ptr) void {","class":"lineCov","hits":"2","order":"3110","possible_hits":"2",},
{"lineNum":"  215","line":"        std.debug.assert(aliasTy.getType() == .Alias);","class":"lineCov","hits":"1","order":"3111","possible_hits":"1",},
{"lineNum":"  216","line":"        self.tyMap.put(aliasTy.*, aliasTy) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"3112","possible_hits":"1",},
{"lineNum":"  217","line":"    }"},
{"lineNum":"  218","line":""},
{"lineNum":"  219","line":"    pub fn getAlias(self: *TypeBook, name: []const u8, ty: Type.Ptr) Type.Ptr {"},
{"lineNum":"  220","line":"        const alias = Type{ .Alias = Type.AliasType.new(name, ty) };"},
{"lineNum":"  221","line":"        if (self.tyMap.get(alias)) |t|"},
{"lineNum":"  222","line":"            return t;"},
{"lineNum":"  223","line":"        std.debug.panic(\"Alias \'{s}\' has not been prepared\", .{name});"},
{"lineNum":"  224","line":"    }"},
{"lineNum":"  225","line":""},
{"lineNum":"  226","line":"    pub fn putInterface(self: *TypeBook, inTy: Type.Ptr) void {","class":"lineCov","hits":"2","order":"3324","possible_hits":"2",},
{"lineNum":"  227","line":"        std.debug.assert(inTy.getType() == .Interface);","class":"lineCov","hits":"1","order":"3325","possible_hits":"1",},
{"lineNum":"  228","line":"        self.tyMap.put(inTy.*, inTy) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"3326","possible_hits":"1",},
{"lineNum":"  229","line":"    }"},
{"lineNum":"  230","line":""},
{"lineNum":"  231","line":"    pub fn getInterface(","class":"lineCov","hits":"1","order":"1914","possible_hits":"1",},
{"lineNum":"  232","line":"        self: *TypeBook,"},
{"lineNum":"  233","line":"        members: []Type.InterfaceType.Member,"},
{"lineNum":"  234","line":"    ) Type.Ptr {"},
{"lineNum":"  235","line":"        var inTy = Type{ .Interface = Type.InterfaceType.new(members) };","class":"lineCov","hits":"1","order":"1915","possible_hits":"1",},
{"lineNum":"  236","line":""},
{"lineNum":"  237","line":"        if (self.tyMap.get(inTy)) |ty|","class":"lineCov","hits":"2","order":"1916","possible_hits":"2",},
{"lineNum":"  238","line":"            return ty;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  239","line":""},
{"lineNum":"  240","line":"        inTy.Interface.members = allocate.alloc(","class":"linePartCov","hits":"2","order":"1918","possible_hits":"3",},
{"lineNum":"  241","line":"            self.alloc,","class":"lineCov","hits":"1","order":"1919","possible_hits":"1",},
{"lineNum":"  242","line":"            Type.InterfaceType.Member,"},
{"lineNum":"  243","line":"            members.len,","class":"lineCov","hits":"1","order":"1920","possible_hits":"1",},
{"lineNum":"  244","line":"        );"},
{"lineNum":"  245","line":"        std.mem.copy(","class":"lineCov","hits":"1","order":"1923","possible_hits":"1",},
{"lineNum":"  246","line":"            Type.InterfaceType.Member,"},
{"lineNum":"  247","line":"            inTy.Interface.members,","class":"linePartCov","hits":"2","order":"1921","possible_hits":"3",},
{"lineNum":"  248","line":"            members,","class":"lineCov","hits":"1","order":"1922","possible_hits":"1",},
{"lineNum":"  249","line":"        );"},
{"lineNum":"  250","line":""},
{"lineNum":"  251","line":"        var ty = allocate.create(self.alloc, Type);","class":"lineCov","hits":"1","order":"1924","possible_hits":"1",},
{"lineNum":"  252","line":"        ty.* = inTy;","class":"lineCov","hits":"1","order":"1925","possible_hits":"1",},
{"lineNum":"  253","line":"        self.tyMap.put(inTy, ty) catch allocate.reportAndExit();","class":"linePartCov","hits":"1","order":"1926","possible_hits":"2",},
{"lineNum":"  254","line":"        return ty;","class":"lineCov","hits":"1","order":"1927","possible_hits":"1",},
{"lineNum":"  255","line":"    }"},
{"lineNum":"  256","line":""},
{"lineNum":"  257","line":"    pub fn putClass(self: *TypeBook, clsTy: Type.Ptr) void {","class":"lineCov","hits":"2","order":"3378","possible_hits":"2",},
{"lineNum":"  258","line":"        std.debug.assert(clsTy.getType() == .Class);","class":"lineCov","hits":"1","order":"3379","possible_hits":"1",},
{"lineNum":"  259","line":"        self.tyMap.put(clsTy.*, clsTy) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"3380","possible_hits":"1",},
{"lineNum":"  260","line":"    }"},
{"lineNum":"  261","line":"};"},
{"lineNum":"  262","line":""},
{"lineNum":"  263","line":"test \"type book can return builtin types\" {","class":"lineCov","hits":"3","order":"2086","possible_hits":"3",},
{"lineNum":"  264","line":"    var book = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"2087","possible_hits":"1",},
{"lineNum":"  265","line":"    defer book.deinit();","class":"linePartCov","hits":"1","order":"2112","possible_hits":"11",},
{"lineNum":"  266","line":""},
{"lineNum":"  267","line":"    try expectEqual(Type.Type.Unknown, book.getUnknown().getType());","class":"linePartCov","hits":"1","order":"2088","possible_hits":"2",},
{"lineNum":"  268","line":"    try expectEqual(Type.Type.Any, book.getAny().getType());","class":"linePartCov","hits":"1","order":"2091","possible_hits":"2",},
{"lineNum":"  269","line":"    try expectEqual(Type.Type.Void, book.getVoid().getType());","class":"linePartCov","hits":"1","order":"2092","possible_hits":"2",},
{"lineNum":"  270","line":"    try expectEqual(Type.Type.Null, book.getNull().getType());","class":"linePartCov","hits":"1","order":"2093","possible_hits":"2",},
{"lineNum":"  271","line":"    try expectEqual(Type.Type.Undefined, book.getUndefined().getType());","class":"linePartCov","hits":"1","order":"2096","possible_hits":"2",},
{"lineNum":"  272","line":"    try expectEqual(Type.Type.Never, book.getNever().getType());","class":"linePartCov","hits":"1","order":"2099","possible_hits":"2",},
{"lineNum":"  273","line":"    try expectEqual(Type.Type.Number, book.getNumber().getType());","class":"linePartCov","hits":"1","order":"2102","possible_hits":"2",},
{"lineNum":"  274","line":"    try expectEqual(Type.Type.String, book.getString().getType());","class":"linePartCov","hits":"1","order":"2105","possible_hits":"2",},
{"lineNum":"  275","line":"    try expectEqual(Type.Type.Boolean, book.getBoolean().getType());","class":"linePartCov","hits":"1","order":"2108","possible_hits":"2",},
{"lineNum":"  276","line":"    try expectEqual(Type.Type.Object, book.getObject().getType());","class":"linePartCov","hits":"1","order":"2109","possible_hits":"2",},
{"lineNum":"  277","line":"}"},
{"lineNum":"  278","line":""},
{"lineNum":"  279","line":"test \"type book can create and retrieve array types\" {","class":"lineCov","hits":"3","order":"2113","possible_hits":"3",},
{"lineNum":"  280","line":"    var book = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"2114","possible_hits":"1",},
{"lineNum":"  281","line":"    defer book.deinit();","class":"linePartCov","hits":"1","order":"2140","possible_hits":"12",},
{"lineNum":"  282","line":""},
{"lineNum":"  283","line":"    const num: *const Type = &book.numberTy;","class":"lineCov","hits":"1","order":"2115","possible_hits":"1",},
{"lineNum":"  284","line":"    const str: *const Type = &book.stringTy;","class":"lineCov","hits":"1","order":"2116","possible_hits":"1",},
{"lineNum":"  285","line":""},
{"lineNum":"  286","line":"    const numArray = book.getArray(num);","class":"lineCov","hits":"1","order":"2117","possible_hits":"1",},
{"lineNum":"  287","line":"    try expectEqual(Type.Type.Array, numArray.getType());","class":"linePartCov","hits":"1","order":"2125","possible_hits":"2",},
{"lineNum":"  288","line":"    try expectEqual(num, numArray.Array.subtype);","class":"linePartCov","hits":"2","order":"2126","possible_hits":"3",},
{"lineNum":"  289","line":""},
{"lineNum":"  290","line":"    const numArray2 = book.getArray(num);","class":"lineCov","hits":"1","order":"2127","possible_hits":"1",},
{"lineNum":"  291","line":"    try expectEqual(Type.Type.Array, numArray2.getType());","class":"linePartCov","hits":"1","order":"2129","possible_hits":"2",},
{"lineNum":"  292","line":"    try expectEqual(num, numArray2.Array.subtype);","class":"linePartCov","hits":"2","order":"2130","possible_hits":"3",},
{"lineNum":"  293","line":"    try expectEqual(numArray, numArray2);","class":"linePartCov","hits":"1","order":"2131","possible_hits":"2",},
{"lineNum":"  294","line":""},
{"lineNum":"  295","line":"    const strArray = book.getArray(str);","class":"lineCov","hits":"1","order":"2132","possible_hits":"1",},
{"lineNum":"  296","line":"    try expectEqual(Type.Type.Array, strArray.getType());","class":"linePartCov","hits":"1","order":"2133","possible_hits":"2",},
{"lineNum":"  297","line":"    try expectEqual(str, strArray.Array.subtype);","class":"linePartCov","hits":"2","order":"2134","possible_hits":"3",},
{"lineNum":"  298","line":"    try expect(numArray != strArray);","class":"linePartCov","hits":"1","order":"2135","possible_hits":"2",},
{"lineNum":"  299","line":""},
{"lineNum":"  300","line":"    const numArrayArray = book.getArray(numArray);","class":"lineCov","hits":"1","order":"2136","possible_hits":"1",},
{"lineNum":"  301","line":"    try expectEqual(Type.Type.Array, numArrayArray.getType());","class":"linePartCov","hits":"1","order":"2137","possible_hits":"2",},
{"lineNum":"  302","line":"    try expectEqual(numArray, numArrayArray.Array.subtype);","class":"linePartCov","hits":"2","order":"2138","possible_hits":"3",},
{"lineNum":"  303","line":"    try expect(numArray != numArrayArray);","class":"linePartCov","hits":"1","order":"2139","possible_hits":"2",},
{"lineNum":"  304","line":"}"},
{"lineNum":"  305","line":""},
{"lineNum":"  306","line":"test \"type book can create and retrieve union types\" {","class":"lineCov","hits":"3","order":"2141","possible_hits":"3",},
{"lineNum":"  307","line":"    var book = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"2142","possible_hits":"1",},
{"lineNum":"  308","line":"    defer book.deinit();","class":"linePartCov","hits":"1","order":"2157","possible_hits":"7",},
{"lineNum":"  309","line":""},
{"lineNum":"  310","line":"    const num = &book.numberTy;","class":"lineCov","hits":"1","order":"2143","possible_hits":"1",},
{"lineNum":"  311","line":"    const str = &book.stringTy;","class":"lineCov","hits":"1","order":"2144","possible_hits":"1",},
{"lineNum":"  312","line":"    const numStr = book.getUnion(&.{ num, str });","class":"lineCov","hits":"1","order":"2145","possible_hits":"1",},
{"lineNum":"  313","line":"    try expectEqual(Type.Type.Union, numStr.getType());","class":"linePartCov","hits":"1","order":"2146","possible_hits":"2",},
{"lineNum":"  314","line":""},
{"lineNum":"  315","line":"    const tys = numStr.Union.tys;","class":"linePartCov","hits":"2","order":"2147","possible_hits":"3",},
{"lineNum":"  316","line":"    try expectEqual(@intCast(usize, 2), tys.len);","class":"linePartCov","hits":"1","order":"2148","possible_hits":"3",},
{"lineNum":"  317","line":"    try expect(tys[0] == num and tys[1] == str);","class":"linePartCov","hits":"1","order":"2149","possible_hits":"3",},
{"lineNum":"  318","line":""},
{"lineNum":"  319","line":"    const numStr2 = book.getUnion(&.{ num, str });","class":"lineCov","hits":"1","order":"2150","possible_hits":"1",},
{"lineNum":"  320","line":"    try expectEqual(numStr, numStr2);","class":"linePartCov","hits":"1","order":"2151","possible_hits":"2",},
{"lineNum":"  321","line":""},
{"lineNum":"  322","line":"    const strNum = book.getUnion(&.{ str, num });","class":"lineCov","hits":"1","order":"2152","possible_hits":"1",},
{"lineNum":"  323","line":"    try expectEqual(numStr, strNum);","class":"linePartCov","hits":"1","order":"2153","possible_hits":"2",},
{"lineNum":"  324","line":""},
{"lineNum":"  325","line":"    const boolean = &book.booleanTy;","class":"lineCov","hits":"1","order":"2154","possible_hits":"1",},
{"lineNum":"  326","line":"    const boolNum = book.getUnion(&.{ boolean, num });","class":"lineCov","hits":"1","order":"2155","possible_hits":"1",},
{"lineNum":"  327","line":"    try expect(numStr != boolNum);","class":"linePartCov","hits":"1","order":"2156","possible_hits":"2",},
{"lineNum":"  328","line":"}"},
{"lineNum":"  329","line":""},
{"lineNum":"  330","line":"test \"type book can create and retrieve function types\" {","class":"lineCov","hits":"3","order":"2158","possible_hits":"3",},
{"lineNum":"  331","line":"    var book = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"2159","possible_hits":"1",},
{"lineNum":"  332","line":"    defer book.deinit();","class":"linePartCov","hits":"1","order":"2172","possible_hits":"7",},
{"lineNum":"  333","line":""},
{"lineNum":"  334","line":"    const n: *const Type = &book.numberTy;","class":"lineCov","hits":"1","order":"2160","possible_hits":"1",},
{"lineNum":"  335","line":"    const s: *const Type = &book.stringTy;","class":"lineCov","hits":"1","order":"2161","possible_hits":"1",},
{"lineNum":"  336","line":"    const b: *const Type = &book.booleanTy;","class":"lineCov","hits":"1","order":"2162","possible_hits":"1",},
{"lineNum":"  337","line":""},
{"lineNum":"  338","line":"    const func = book.getFunction(n, &[_]Type.Ptr{ s, b }, false);","class":"lineCov","hits":"1","order":"2163","possible_hits":"1",},
{"lineNum":"  339","line":""},
{"lineNum":"  340","line":"    try expectEqual(Type.Type.Function, func.getType());","class":"linePartCov","hits":"1","order":"2164","possible_hits":"2",},
{"lineNum":"  341","line":"    try expectEqual(n, func.Function.ret);","class":"linePartCov","hits":"2","order":"2165","possible_hits":"3",},
{"lineNum":"  342","line":"    try expectEqual(@intCast(usize, 2), func.Function.args.len);","class":"linePartCov","hits":"2","order":"2166","possible_hits":"3",},
{"lineNum":"  343","line":"    try expectEqual(s, func.Function.args[0]);","class":"linePartCov","hits":"2","order":"2167","possible_hits":"3",},
{"lineNum":"  344","line":"    try expectEqual(b, func.Function.args[1]);","class":"linePartCov","hits":"2","order":"2168","possible_hits":"3",},
{"lineNum":"  345","line":""},
{"lineNum":"  346","line":"    const func2 = book.getFunction(n, &[_]Type.Ptr{ s, b }, false);","class":"lineCov","hits":"1","order":"2169","possible_hits":"1",},
{"lineNum":"  347","line":""},
{"lineNum":"  348","line":"    try expectEqual(func, func2);","class":"linePartCov","hits":"1","order":"2171","possible_hits":"2",},
{"lineNum":"  349","line":"}"},
{"lineNum":"  350","line":""},
{"lineNum":"  351","line":"test \"type book can return an OpEntry\" {","class":"lineCov","hits":"3","order":"2173","possible_hits":"3",},
{"lineNum":"  352","line":"    var book = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"2174","possible_hits":"1",},
{"lineNum":"  353","line":"    defer book.deinit();","class":"linePartCov","hits":"1","order":"2180","possible_hits":"3",},
{"lineNum":"  354","line":""},
{"lineNum":"  355","line":"    const ty = TokenType.Sub;"},
{"lineNum":"  356","line":"    const entry = book.getOpEntry(ty).?;","class":"linePartCov","hits":"1","order":"2175","possible_hits":"2",},
{"lineNum":"  357","line":"    try expectEqual(Type.Type.Number, entry.Binary.input.getType());","class":"linePartCov","hits":"1","order":"2178","possible_hits":"3",},
{"lineNum":"  358","line":"    try expect(entry.Binary.output == null);","class":"linePartCov","hits":"2","order":"2179","possible_hits":"3",},
{"lineNum":"  359","line":"}"},
{"lineNum":"  360","line":""},
{"lineNum":"  361","line":"test \"invalid token types don\'t have an OpEntry\" {","class":"lineCov","hits":"3","order":"2181","possible_hits":"3",},
{"lineNum":"  362","line":"    var book = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"2182","possible_hits":"1",},
{"lineNum":"  363","line":"    defer book.deinit();","class":"linePartCov","hits":"1","order":"2185","possible_hits":"2",},
{"lineNum":"  364","line":""},
{"lineNum":"  365","line":"    const ty = TokenType.LParen;"},
{"lineNum":"  366","line":"    const entry = book.getOpEntry(ty);","class":"lineCov","hits":"1","order":"2183","possible_hits":"1",},
{"lineNum":"  367","line":"    try expect(entry == null);","class":"linePartCov","hits":"1","order":"2184","possible_hits":"2",},
{"lineNum":"  368","line":"}"},
{"lineNum":"  369","line":""},
{"lineNum":"  370","line":"test \"typebook can combine types\" {","class":"lineCov","hits":"3","order":"2186","possible_hits":"3",},
{"lineNum":"  371","line":"    var book = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"2187","possible_hits":"1",},
{"lineNum":"  372","line":"    defer book.deinit();","class":"linePartCov","hits":"1","order":"2200","possible_hits":"5",},
{"lineNum":"  373","line":""},
{"lineNum":"  374","line":"    const num = book.getNumber();","class":"lineCov","hits":"1","order":"2188","possible_hits":"1",},
{"lineNum":"  375","line":"    const str = book.getString();","class":"lineCov","hits":"1","order":"2189","possible_hits":"1",},
{"lineNum":"  376","line":""},
{"lineNum":"  377","line":"    const a = book.combine(num, num);","class":"lineCov","hits":"1","order":"2190","possible_hits":"1",},
{"lineNum":"  378","line":"    try expectEqual(num, a);","class":"linePartCov","hits":"1","order":"2194","possible_hits":"2",},
{"lineNum":"  379","line":""},
{"lineNum":"  380","line":"    const b = book.combine(num, str);","class":"lineCov","hits":"1","order":"2195","possible_hits":"1",},
{"lineNum":"  381","line":"    try expectEqual(Type.Type.Union, b.getType());","class":"linePartCov","hits":"1","order":"2197","possible_hits":"2",},
{"lineNum":"  382","line":"    try expectEqual(num, b.Union.tys[0]);","class":"linePartCov","hits":"2","order":"2198","possible_hits":"3",},
{"lineNum":"  383","line":"    try expectEqual(str, b.Union.tys[1]);","class":"linePartCov","hits":"2","order":"2199","possible_hits":"3",},
{"lineNum":"  384","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-05 11:24:09", "instrumented" : 198, "covered" : 196,};
var merged_data = [];
