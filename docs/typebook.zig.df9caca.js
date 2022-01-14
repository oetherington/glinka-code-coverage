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
{"lineNum":"   32","line":"            pub fn hash(self: @This(), value: Type) u64 {","class":"lineCov","hits":"1","order":"214","possible_hits":"1",},
{"lineNum":"   33","line":"                _ = self;"},
{"lineNum":"   34","line":"                return value.hash();","class":"lineCov","hits":"1","order":"215","possible_hits":"1",},
{"lineNum":"   35","line":"            }"},
{"lineNum":"   36","line":""},
{"lineNum":"   37","line":"            pub fn eql(self: @This(), a: Type, b: Type) bool {","class":"lineCov","hits":"1","order":"230","possible_hits":"1",},
{"lineNum":"   38","line":"                _ = self;"},
{"lineNum":"   39","line":"                return a.eql(&b);","class":"lineCov","hits":"1","order":"231","possible_hits":"1",},
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
{"lineNum":"   61","line":"    pub fn new(alloc: Allocator) *TypeBook {","class":"lineCov","hits":"1","order":"163","possible_hits":"1",},
{"lineNum":"   62","line":"        var self = alloc.create(TypeBook) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"164","possible_hits":"1",},
{"lineNum":"   63","line":"        self.* = TypeBook{","class":"lineCov","hits":"2","order":"165","possible_hits":"2",},
{"lineNum":"   64","line":"            .alloc = alloc,","class":"lineCov","hits":"1","order":"166","possible_hits":"1",},
{"lineNum":"   65","line":"            .opMap = undefined,","class":"lineCov","hits":"1","order":"167","possible_hits":"1",},
{"lineNum":"   66","line":"            .tyMap = TypeMap.init(alloc),","class":"lineCov","hits":"1","order":"168","possible_hits":"1",},
{"lineNum":"   67","line":"        };"},
{"lineNum":"   68","line":"        opMap.populateOpMap(self);","class":"lineCov","hits":"1","order":"169","possible_hits":"1",},
{"lineNum":"   69","line":"        return self;","class":"lineCov","hits":"1","order":"288","possible_hits":"1",},
{"lineNum":"   70","line":"    }"},
{"lineNum":"   71","line":""},
{"lineNum":"   72","line":"    pub fn deinit(self: *TypeBook) void {","class":"lineCov","hits":"2","order":"392","possible_hits":"2",},
{"lineNum":"   73","line":"        var it = self.tyMap.valueIterator();","class":"lineCov","hits":"1","order":"393","possible_hits":"1",},
{"lineNum":"   74","line":""},
{"lineNum":"   75","line":"        while (it.next()) |val| {","class":"lineCov","hits":"2","order":"394","possible_hits":"2",},
{"lineNum":"   76","line":"            switch (val.*.*) {","class":"lineCov","hits":"3","order":"395","possible_hits":"3",},
{"lineNum":"   77","line":"                .Function => |f| self.alloc.free(f.args),","class":"lineCov","hits":"1","order":"398","possible_hits":"1",},
{"lineNum":"   78","line":"                .Union => |un| self.alloc.free(un.tys),","class":"lineCov","hits":"1","order":"396","possible_hits":"1",},
{"lineNum":"   79","line":"                .Interface => |in| self.alloc.free(in.members),","class":"lineCov","hits":"1","order":"399","possible_hits":"1",},
{"lineNum":"   80","line":"                else => {},"},
{"lineNum":"   81","line":"            }"},
{"lineNum":"   82","line":""},
{"lineNum":"   83","line":"            self.alloc.destroy(val.*);","class":"lineCov","hits":"1","order":"397","possible_hits":"1",},
{"lineNum":"   84","line":"        }"},
{"lineNum":"   85","line":""},
{"lineNum":"   86","line":"        self.tyMap.deinit();","class":"lineCov","hits":"1","order":"400","possible_hits":"1",},
{"lineNum":"   87","line":""},
{"lineNum":"   88","line":"        self.alloc.destroy(self);","class":"lineCov","hits":"1","order":"401","possible_hits":"1",},
{"lineNum":"   89","line":"    }"},
{"lineNum":"   90","line":""},
{"lineNum":"   91","line":"    pub fn combine(self: *TypeBook, a: Type.Ptr, b: Type.Ptr) Type.Ptr {","class":"lineCov","hits":"1","order":"2426","possible_hits":"1",},
{"lineNum":"   92","line":"        if (b.isAssignableTo(a))","class":"lineCov","hits":"2","order":"2427","possible_hits":"2",},
{"lineNum":"   93","line":"            return a;","class":"lineCov","hits":"1","order":"2428","possible_hits":"1",},
{"lineNum":"   94","line":"        return self.getUnion(&[_]Type.Ptr{ a, b });","class":"lineCov","hits":"1","order":"2431","possible_hits":"1",},
{"lineNum":"   95","line":"    }"},
{"lineNum":"   96","line":""},
{"lineNum":"   97","line":"    pub fn getOpEntry(self: *TypeBook, ty: TokenType) ?opMap.OpEntry {","class":"lineCov","hits":"1","order":"2411","possible_hits":"1",},
{"lineNum":"   98","line":"        return self.opMap[@enumToInt(ty)];","class":"lineCov","hits":"1","order":"2412","possible_hits":"1",},
{"lineNum":"   99","line":"    }"},
{"lineNum":"  100","line":""},
{"lineNum":"  101","line":"    pub fn getUnknown(self: *TypeBook) Type.Ptr {","class":"lineCov","hits":"1","order":"2324","possible_hits":"1",},
{"lineNum":"  102","line":"        return &self.unknownTy;","class":"lineCov","hits":"1","order":"2325","possible_hits":"1",},
{"lineNum":"  103","line":"    }"},
{"lineNum":"  104","line":""},
{"lineNum":"  105","line":"    pub fn getAny(self: *TypeBook) Type.Ptr {","class":"lineCov","hits":"1","order":"301","possible_hits":"1",},
{"lineNum":"  106","line":"        return &self.anyTy;","class":"lineCov","hits":"1","order":"302","possible_hits":"1",},
{"lineNum":"  107","line":"    }"},
{"lineNum":"  108","line":""},
{"lineNum":"  109","line":"    pub fn getVoid(self: *TypeBook) Type.Ptr {","class":"lineCov","hits":"1","order":"298","possible_hits":"1",},
{"lineNum":"  110","line":"        return &self.voidTy;","class":"lineCov","hits":"1","order":"299","possible_hits":"1",},
{"lineNum":"  111","line":"    }"},
{"lineNum":"  112","line":""},
{"lineNum":"  113","line":"    pub fn getNull(self: *TypeBook) Type.Ptr {","class":"lineCov","hits":"1","order":"2329","possible_hits":"1",},
{"lineNum":"  114","line":"        return &self.nullTy;","class":"lineCov","hits":"1","order":"2330","possible_hits":"1",},
{"lineNum":"  115","line":"    }"},
{"lineNum":"  116","line":""},
{"lineNum":"  117","line":"    pub fn getUndefined(self: *TypeBook) Type.Ptr {","class":"lineCov","hits":"1","order":"2332","possible_hits":"1",},
{"lineNum":"  118","line":"        return &self.undefinedTy;","class":"lineCov","hits":"1","order":"2333","possible_hits":"1",},
{"lineNum":"  119","line":"    }"},
{"lineNum":"  120","line":""},
{"lineNum":"  121","line":"    pub fn getNever(self: *TypeBook) Type.Ptr {","class":"lineCov","hits":"1","order":"2335","possible_hits":"1",},
{"lineNum":"  122","line":"        return &self.neverTy;","class":"lineCov","hits":"1","order":"2336","possible_hits":"1",},
{"lineNum":"  123","line":"    }"},
{"lineNum":"  124","line":""},
{"lineNum":"  125","line":"    pub fn getNumber(self: *TypeBook) Type.Ptr {","class":"lineCov","hits":"1","order":"2338","possible_hits":"1",},
{"lineNum":"  126","line":"        return &self.numberTy;","class":"lineCov","hits":"1","order":"2339","possible_hits":"1",},
{"lineNum":"  127","line":"    }"},
{"lineNum":"  128","line":""},
{"lineNum":"  129","line":"    pub fn getString(self: *TypeBook) Type.Ptr {","class":"lineCov","hits":"1","order":"2341","possible_hits":"1",},
{"lineNum":"  130","line":"        return &self.stringTy;","class":"lineCov","hits":"1","order":"2342","possible_hits":"1",},
{"lineNum":"  131","line":"    }"},
{"lineNum":"  132","line":""},
{"lineNum":"  133","line":"    pub fn getBoolean(self: *TypeBook) Type.Ptr {","class":"lineCov","hits":"1","order":"2226","possible_hits":"1",},
{"lineNum":"  134","line":"        return &self.booleanTy;","class":"lineCov","hits":"1","order":"2227","possible_hits":"1",},
{"lineNum":"  135","line":"    }"},
{"lineNum":"  136","line":""},
{"lineNum":"  137","line":"    pub fn getObject(self: *TypeBook) Type.Ptr {","class":"lineCov","hits":"1","order":"2345","possible_hits":"1",},
{"lineNum":"  138","line":"        return &self.objectTy;","class":"lineCov","hits":"1","order":"2346","possible_hits":"1",},
{"lineNum":"  139","line":"    }"},
{"lineNum":"  140","line":""},
{"lineNum":"  141","line":"    pub fn getArray(self: *TypeBook, subtype: Type.Ptr) Type.Ptr {","class":"lineCov","hits":"1","order":"2353","possible_hits":"1",},
{"lineNum":"  142","line":"        const arr = Type{ .Array = Type.ArrayType{ .subtype = subtype } };","class":"lineCov","hits":"1","order":"2354","possible_hits":"1",},
{"lineNum":"  143","line":""},
{"lineNum":"  144","line":"        if (self.tyMap.get(arr)) |ty|","class":"lineCov","hits":"2","order":"2355","possible_hits":"2",},
{"lineNum":"  145","line":"            return ty;","class":"lineCov","hits":"1","order":"2363","possible_hits":"1",},
{"lineNum":"  146","line":""},
{"lineNum":"  147","line":"        var ty = allocate.create(self.alloc, Type);","class":"lineCov","hits":"1","order":"2356","possible_hits":"1",},
{"lineNum":"  148","line":"        ty.* = arr;","class":"lineCov","hits":"1","order":"2357","possible_hits":"1",},
{"lineNum":"  149","line":"        self.tyMap.put(arr, ty) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"2358","possible_hits":"1",},
{"lineNum":"  150","line":"        return ty;","class":"lineCov","hits":"1","order":"2359","possible_hits":"1",},
{"lineNum":"  151","line":"    }"},
{"lineNum":"  152","line":""},
{"lineNum":"  153","line":"    pub fn getFunction(","class":"lineCov","hits":"1","order":"303","possible_hits":"1",},
{"lineNum":"  154","line":"        self: *TypeBook,"},
{"lineNum":"  155","line":"        ret: Type.Ptr,"},
{"lineNum":"  156","line":"        args: []Type.Ptr,"},
{"lineNum":"  157","line":"    ) Type.Ptr {"},
{"lineNum":"  158","line":"        var funcTy = Type{"},
{"lineNum":"  159","line":"            .Function = Type.FunctionType{","class":"lineCov","hits":"1","order":"304","possible_hits":"1",},
{"lineNum":"  160","line":"                .ret = ret,","class":"lineCov","hits":"1","order":"305","possible_hits":"1",},
{"lineNum":"  161","line":"                .args = args,","class":"lineCov","hits":"1","order":"306","possible_hits":"1",},
{"lineNum":"  162","line":"            },"},
{"lineNum":"  163","line":"        };"},
{"lineNum":"  164","line":""},
{"lineNum":"  165","line":"        if (self.tyMap.get(funcTy)) |ty|","class":"lineCov","hits":"2","order":"307","possible_hits":"2",},
{"lineNum":"  166","line":"            return ty;","class":"lineCov","hits":"1","order":"2405","possible_hits":"1",},
{"lineNum":"  167","line":""},
{"lineNum":"  168","line":"        funcTy.Function.args = allocate.alloc(self.alloc, Type.Ptr, args.len);","class":"linePartCov","hits":"2","order":"314","possible_hits":"3",},
{"lineNum":"  169","line":"        std.mem.copy(Type.Ptr, funcTy.Function.args, args);","class":"linePartCov","hits":"2","order":"317","possible_hits":"3",},
{"lineNum":"  170","line":""},
{"lineNum":"  171","line":"        var ty = allocate.create(self.alloc, Type);","class":"lineCov","hits":"1","order":"318","possible_hits":"1",},
{"lineNum":"  172","line":"        ty.* = funcTy;","class":"lineCov","hits":"1","order":"319","possible_hits":"1",},
{"lineNum":"  173","line":"        self.tyMap.put(funcTy, ty) catch allocate.reportAndExit();","class":"linePartCov","hits":"1","order":"320","possible_hits":"2",},
{"lineNum":"  174","line":"        return ty;","class":"lineCov","hits":"1","order":"321","possible_hits":"1",},
{"lineNum":"  175","line":"    }"},
{"lineNum":"  176","line":""},
{"lineNum":"  177","line":"    fn flattenUnionTypes(out: *TypeList, in: []Type.Ptr) void {","class":"lineCov","hits":"2","order":"198","possible_hits":"2",},
{"lineNum":"  178","line":"        for (in) |ty| {","class":"lineCov","hits":"2","order":"199","possible_hits":"2",},
{"lineNum":"  179","line":"            switch (ty.*) {","class":"lineCov","hits":"2","order":"200","possible_hits":"2",},
{"lineNum":"  180","line":"                .Union => |un| TypeBook.flattenUnionTypes(out, un.tys),","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  181","line":"                else => out.append(ty) catch allocate.reportAndExit(),","class":"lineCov","hits":"1","order":"201","possible_hits":"1",},
{"lineNum":"  182","line":"            }"},
{"lineNum":"  183","line":"        }"},
{"lineNum":"  184","line":"    }"},
{"lineNum":"  185","line":""},
{"lineNum":"  186","line":"    pub fn getUnion(self: *TypeBook, tys_: []Type.Ptr) Type.Ptr {","class":"lineCov","hits":"1","order":"194","possible_hits":"1",},
{"lineNum":"  187","line":"        const Context = struct {"},
{"lineNum":"  188","line":"            pub fn lessThan(_: @This(), lhs: Type.Ptr, rhs: Type.Ptr) bool {","class":"lineCov","hits":"1","order":"204","possible_hits":"1",},
{"lineNum":"  189","line":"                return @ptrToInt(lhs) < @ptrToInt(rhs);","class":"lineCov","hits":"1","order":"205","possible_hits":"1",},
{"lineNum":"  190","line":"            }"},
{"lineNum":"  191","line":"        };"},
{"lineNum":"  192","line":""},
{"lineNum":"  193","line":"        // TODO: Refactor this to avoid allocating"},
{"lineNum":"  194","line":"        var flattened = TypeList.init(self.alloc);","class":"lineCov","hits":"1","order":"195","possible_hits":"1",},
{"lineNum":"  195","line":"        flattened.ensureTotalCapacity(tys_.len) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"196","possible_hits":"1",},
{"lineNum":"  196","line":"        TypeBook.flattenUnionTypes(&flattened, tys_);","class":"lineCov","hits":"1","order":"197","possible_hits":"1",},
{"lineNum":"  197","line":""},
{"lineNum":"  198","line":"        const tys = flattened.items;","class":"lineCov","hits":"1","order":"202","possible_hits":"1",},
{"lineNum":"  199","line":"        std.sort.insertionSort(Type.Ptr, tys, Context{}, Context.lessThan);","class":"lineCov","hits":"1","order":"203","possible_hits":"1",},
{"lineNum":"  200","line":""},
{"lineNum":"  201","line":"        const un = Type{ .Union = Type.UnionType{ .tys = tys } };","class":"lineCov","hits":"1","order":"206","possible_hits":"1",},
{"lineNum":"  202","line":""},
{"lineNum":"  203","line":"        const existing = self.tyMap.get(un);","class":"lineCov","hits":"1","order":"207","possible_hits":"1",},
{"lineNum":"  204","line":"        if (existing) |ty| {","class":"lineCov","hits":"2","order":"208","possible_hits":"2",},
{"lineNum":"  205","line":"            flattened.deinit();","class":"lineCov","hits":"1","order":"250","possible_hits":"1",},
{"lineNum":"  206","line":"            return ty;","class":"lineCov","hits":"1","order":"251","possible_hits":"1",},
{"lineNum":"  207","line":"        }"},
{"lineNum":"  208","line":""},
{"lineNum":"  209","line":"        var ty = allocate.create(self.alloc, Type);","class":"lineCov","hits":"1","order":"209","possible_hits":"1",},
{"lineNum":"  210","line":"        ty.* = un;","class":"lineCov","hits":"1","order":"212","possible_hits":"1",},
{"lineNum":"  211","line":"        self.tyMap.put(un, ty) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"213","possible_hits":"1",},
{"lineNum":"  212","line":"        return ty;","class":"lineCov","hits":"1","order":"227","possible_hits":"1",},
{"lineNum":"  213","line":"    }"},
{"lineNum":"  214","line":""},
{"lineNum":"  215","line":"    pub fn getAlias(self: *TypeBook, name: []const u8, ty: Type.Ptr) Type.Ptr {","class":"lineCov","hits":"1","order":"4922","possible_hits":"1",},
{"lineNum":"  216","line":"        const alias = Type{ .Alias = Type.AliasType.new(name, ty) };","class":"lineCov","hits":"1","order":"4923","possible_hits":"1",},
{"lineNum":"  217","line":""},
{"lineNum":"  218","line":"        if (self.tyMap.get(alias)) |t|","class":"lineCov","hits":"2","order":"4924","possible_hits":"2",},
{"lineNum":"  219","line":"            return t;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  220","line":""},
{"lineNum":"  221","line":"        var t = allocate.create(self.alloc, Type);","class":"lineCov","hits":"1","order":"4926","possible_hits":"1",},
{"lineNum":"  222","line":"        t.* = alias;","class":"lineCov","hits":"1","order":"4927","possible_hits":"1",},
{"lineNum":"  223","line":"        self.tyMap.put(alias, t) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"4928","possible_hits":"1",},
{"lineNum":"  224","line":"        return t;","class":"lineCov","hits":"1","order":"4929","possible_hits":"1",},
{"lineNum":"  225","line":"    }"},
{"lineNum":"  226","line":""},
{"lineNum":"  227","line":"    pub fn getInterface(","class":"lineCov","hits":"1","order":"326","possible_hits":"1",},
{"lineNum":"  228","line":"        self: *TypeBook,"},
{"lineNum":"  229","line":"        members: []Type.InterfaceType.Member,"},
{"lineNum":"  230","line":"    ) Type.Ptr {"},
{"lineNum":"  231","line":"        var inTy = Type{ .Interface = Type.InterfaceType.new(members) };","class":"lineCov","hits":"1","order":"327","possible_hits":"1",},
{"lineNum":"  232","line":""},
{"lineNum":"  233","line":"        if (self.tyMap.get(inTy)) |ty|","class":"lineCov","hits":"2","order":"331","possible_hits":"2",},
{"lineNum":"  234","line":"            return ty;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  235","line":""},
{"lineNum":"  236","line":"        inTy.Interface.members = allocate.alloc(","class":"linePartCov","hits":"2","order":"338","possible_hits":"3",},
{"lineNum":"  237","line":"            self.alloc,","class":"lineCov","hits":"1","order":"339","possible_hits":"1",},
{"lineNum":"  238","line":"            Type.InterfaceType.Member,"},
{"lineNum":"  239","line":"            members.len,","class":"lineCov","hits":"1","order":"340","possible_hits":"1",},
{"lineNum":"  240","line":"        );"},
{"lineNum":"  241","line":"        std.mem.copy(","class":"lineCov","hits":"1","order":"343","possible_hits":"1",},
{"lineNum":"  242","line":"            Type.InterfaceType.Member,"},
{"lineNum":"  243","line":"            inTy.Interface.members,","class":"linePartCov","hits":"2","order":"341","possible_hits":"3",},
{"lineNum":"  244","line":"            members,","class":"lineCov","hits":"1","order":"342","possible_hits":"1",},
{"lineNum":"  245","line":"        );"},
{"lineNum":"  246","line":""},
{"lineNum":"  247","line":"        var ty = allocate.create(self.alloc, Type);","class":"lineCov","hits":"1","order":"344","possible_hits":"1",},
{"lineNum":"  248","line":"        ty.* = inTy;","class":"lineCov","hits":"1","order":"345","possible_hits":"1",},
{"lineNum":"  249","line":"        self.tyMap.put(inTy, ty) catch allocate.reportAndExit();","class":"linePartCov","hits":"1","order":"346","possible_hits":"2",},
{"lineNum":"  250","line":"        return ty;","class":"lineCov","hits":"1","order":"347","possible_hits":"1",},
{"lineNum":"  251","line":"    }"},
{"lineNum":"  252","line":"};"},
{"lineNum":"  253","line":""},
{"lineNum":"  254","line":"test \"type book can return builtin types\" {","class":"lineCov","hits":"3","order":"2321","possible_hits":"3",},
{"lineNum":"  255","line":"    var book = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"2322","possible_hits":"1",},
{"lineNum":"  256","line":"    defer book.deinit();","class":"linePartCov","hits":"1","order":"2347","possible_hits":"11",},
{"lineNum":"  257","line":""},
{"lineNum":"  258","line":"    try expectEqual(Type.Type.Unknown, book.getUnknown().getType());","class":"linePartCov","hits":"1","order":"2323","possible_hits":"2",},
{"lineNum":"  259","line":"    try expectEqual(Type.Type.Any, book.getAny().getType());","class":"linePartCov","hits":"1","order":"2326","possible_hits":"2",},
{"lineNum":"  260","line":"    try expectEqual(Type.Type.Void, book.getVoid().getType());","class":"linePartCov","hits":"1","order":"2327","possible_hits":"2",},
{"lineNum":"  261","line":"    try expectEqual(Type.Type.Null, book.getNull().getType());","class":"linePartCov","hits":"1","order":"2328","possible_hits":"2",},
{"lineNum":"  262","line":"    try expectEqual(Type.Type.Undefined, book.getUndefined().getType());","class":"linePartCov","hits":"1","order":"2331","possible_hits":"2",},
{"lineNum":"  263","line":"    try expectEqual(Type.Type.Never, book.getNever().getType());","class":"linePartCov","hits":"1","order":"2334","possible_hits":"2",},
{"lineNum":"  264","line":"    try expectEqual(Type.Type.Number, book.getNumber().getType());","class":"linePartCov","hits":"1","order":"2337","possible_hits":"2",},
{"lineNum":"  265","line":"    try expectEqual(Type.Type.String, book.getString().getType());","class":"linePartCov","hits":"1","order":"2340","possible_hits":"2",},
{"lineNum":"  266","line":"    try expectEqual(Type.Type.Boolean, book.getBoolean().getType());","class":"linePartCov","hits":"1","order":"2343","possible_hits":"2",},
{"lineNum":"  267","line":"    try expectEqual(Type.Type.Object, book.getObject().getType());","class":"linePartCov","hits":"1","order":"2344","possible_hits":"2",},
{"lineNum":"  268","line":"}"},
{"lineNum":"  269","line":""},
{"lineNum":"  270","line":"test \"type book can create and retrieve array types\" {","class":"lineCov","hits":"3","order":"2348","possible_hits":"3",},
{"lineNum":"  271","line":"    var book = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"2349","possible_hits":"1",},
{"lineNum":"  272","line":"    defer book.deinit();","class":"linePartCov","hits":"1","order":"2375","possible_hits":"12",},
{"lineNum":"  273","line":""},
{"lineNum":"  274","line":"    const num: *const Type = &book.numberTy;","class":"lineCov","hits":"1","order":"2350","possible_hits":"1",},
{"lineNum":"  275","line":"    const str: *const Type = &book.stringTy;","class":"lineCov","hits":"1","order":"2351","possible_hits":"1",},
{"lineNum":"  276","line":""},
{"lineNum":"  277","line":"    const numArray = book.getArray(num);","class":"lineCov","hits":"1","order":"2352","possible_hits":"1",},
{"lineNum":"  278","line":"    try expectEqual(Type.Type.Array, numArray.getType());","class":"linePartCov","hits":"1","order":"2360","possible_hits":"2",},
{"lineNum":"  279","line":"    try expectEqual(num, numArray.Array.subtype);","class":"linePartCov","hits":"2","order":"2361","possible_hits":"3",},
{"lineNum":"  280","line":""},
{"lineNum":"  281","line":"    const numArray2 = book.getArray(num);","class":"lineCov","hits":"1","order":"2362","possible_hits":"1",},
{"lineNum":"  282","line":"    try expectEqual(Type.Type.Array, numArray2.getType());","class":"linePartCov","hits":"1","order":"2364","possible_hits":"2",},
{"lineNum":"  283","line":"    try expectEqual(num, numArray2.Array.subtype);","class":"linePartCov","hits":"2","order":"2365","possible_hits":"3",},
{"lineNum":"  284","line":"    try expectEqual(numArray, numArray2);","class":"linePartCov","hits":"1","order":"2366","possible_hits":"2",},
{"lineNum":"  285","line":""},
{"lineNum":"  286","line":"    const strArray = book.getArray(str);","class":"lineCov","hits":"1","order":"2367","possible_hits":"1",},
{"lineNum":"  287","line":"    try expectEqual(Type.Type.Array, strArray.getType());","class":"linePartCov","hits":"1","order":"2368","possible_hits":"2",},
{"lineNum":"  288","line":"    try expectEqual(str, strArray.Array.subtype);","class":"linePartCov","hits":"2","order":"2369","possible_hits":"3",},
{"lineNum":"  289","line":"    try expect(numArray != strArray);","class":"linePartCov","hits":"1","order":"2370","possible_hits":"2",},
{"lineNum":"  290","line":""},
{"lineNum":"  291","line":"    const numArrayArray = book.getArray(numArray);","class":"lineCov","hits":"1","order":"2371","possible_hits":"1",},
{"lineNum":"  292","line":"    try expectEqual(Type.Type.Array, numArrayArray.getType());","class":"linePartCov","hits":"1","order":"2372","possible_hits":"2",},
{"lineNum":"  293","line":"    try expectEqual(numArray, numArrayArray.Array.subtype);","class":"linePartCov","hits":"2","order":"2373","possible_hits":"3",},
{"lineNum":"  294","line":"    try expect(numArray != numArrayArray);","class":"linePartCov","hits":"1","order":"2374","possible_hits":"2",},
{"lineNum":"  295","line":"}"},
{"lineNum":"  296","line":""},
{"lineNum":"  297","line":"test \"type book can create and retrieve union types\" {","class":"lineCov","hits":"3","order":"2376","possible_hits":"3",},
{"lineNum":"  298","line":"    var book = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"2377","possible_hits":"1",},
{"lineNum":"  299","line":"    defer book.deinit();","class":"linePartCov","hits":"1","order":"2392","possible_hits":"7",},
{"lineNum":"  300","line":""},
{"lineNum":"  301","line":"    const num = &book.numberTy;","class":"lineCov","hits":"1","order":"2378","possible_hits":"1",},
{"lineNum":"  302","line":"    const str = &book.stringTy;","class":"lineCov","hits":"1","order":"2379","possible_hits":"1",},
{"lineNum":"  303","line":"    const numStr = book.getUnion(&.{ num, str });","class":"lineCov","hits":"1","order":"2380","possible_hits":"1",},
{"lineNum":"  304","line":"    try expectEqual(Type.Type.Union, numStr.getType());","class":"linePartCov","hits":"1","order":"2381","possible_hits":"2",},
{"lineNum":"  305","line":""},
{"lineNum":"  306","line":"    const tys = numStr.Union.tys;","class":"linePartCov","hits":"2","order":"2382","possible_hits":"3",},
{"lineNum":"  307","line":"    try expectEqual(@intCast(usize, 2), tys.len);","class":"linePartCov","hits":"1","order":"2383","possible_hits":"3",},
{"lineNum":"  308","line":"    try expect(tys[0] == num and tys[1] == str);","class":"linePartCov","hits":"1","order":"2384","possible_hits":"3",},
{"lineNum":"  309","line":""},
{"lineNum":"  310","line":"    const numStr2 = book.getUnion(&.{ num, str });","class":"lineCov","hits":"1","order":"2385","possible_hits":"1",},
{"lineNum":"  311","line":"    try expectEqual(numStr, numStr2);","class":"linePartCov","hits":"1","order":"2386","possible_hits":"2",},
{"lineNum":"  312","line":""},
{"lineNum":"  313","line":"    const strNum = book.getUnion(&.{ str, num });","class":"lineCov","hits":"1","order":"2387","possible_hits":"1",},
{"lineNum":"  314","line":"    try expectEqual(numStr, strNum);","class":"linePartCov","hits":"1","order":"2388","possible_hits":"2",},
{"lineNum":"  315","line":""},
{"lineNum":"  316","line":"    const boolean = &book.booleanTy;","class":"lineCov","hits":"1","order":"2389","possible_hits":"1",},
{"lineNum":"  317","line":"    const boolNum = book.getUnion(&.{ boolean, num });","class":"lineCov","hits":"1","order":"2390","possible_hits":"1",},
{"lineNum":"  318","line":"    try expect(numStr != boolNum);","class":"linePartCov","hits":"1","order":"2391","possible_hits":"2",},
{"lineNum":"  319","line":"}"},
{"lineNum":"  320","line":""},
{"lineNum":"  321","line":"test \"type book can create and retrieve function types\" {","class":"lineCov","hits":"3","order":"2393","possible_hits":"3",},
{"lineNum":"  322","line":"    var book = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"2394","possible_hits":"1",},
{"lineNum":"  323","line":"    defer book.deinit();","class":"linePartCov","hits":"1","order":"2407","possible_hits":"7",},
{"lineNum":"  324","line":""},
{"lineNum":"  325","line":"    const n: *const Type = &book.numberTy;","class":"lineCov","hits":"1","order":"2395","possible_hits":"1",},
{"lineNum":"  326","line":"    const s: *const Type = &book.stringTy;","class":"lineCov","hits":"1","order":"2396","possible_hits":"1",},
{"lineNum":"  327","line":"    const b: *const Type = &book.booleanTy;","class":"lineCov","hits":"1","order":"2397","possible_hits":"1",},
{"lineNum":"  328","line":""},
{"lineNum":"  329","line":"    const func = book.getFunction(n, &[_]Type.Ptr{ s, b });","class":"lineCov","hits":"1","order":"2398","possible_hits":"1",},
{"lineNum":"  330","line":""},
{"lineNum":"  331","line":"    try expectEqual(Type.Type.Function, func.getType());","class":"linePartCov","hits":"1","order":"2399","possible_hits":"2",},
{"lineNum":"  332","line":"    try expectEqual(n, func.Function.ret);","class":"linePartCov","hits":"2","order":"2400","possible_hits":"3",},
{"lineNum":"  333","line":"    try expectEqual(@intCast(usize, 2), func.Function.args.len);","class":"linePartCov","hits":"2","order":"2401","possible_hits":"3",},
{"lineNum":"  334","line":"    try expectEqual(s, func.Function.args[0]);","class":"linePartCov","hits":"2","order":"2402","possible_hits":"3",},
{"lineNum":"  335","line":"    try expectEqual(b, func.Function.args[1]);","class":"linePartCov","hits":"2","order":"2403","possible_hits":"3",},
{"lineNum":"  336","line":""},
{"lineNum":"  337","line":"    const func2 = book.getFunction(n, &[_]Type.Ptr{ s, b });","class":"lineCov","hits":"1","order":"2404","possible_hits":"1",},
{"lineNum":"  338","line":""},
{"lineNum":"  339","line":"    try expectEqual(func, func2);","class":"linePartCov","hits":"1","order":"2406","possible_hits":"2",},
{"lineNum":"  340","line":"}"},
{"lineNum":"  341","line":""},
{"lineNum":"  342","line":"test \"type book can return an OpEntry\" {","class":"lineCov","hits":"3","order":"2408","possible_hits":"3",},
{"lineNum":"  343","line":"    var book = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"2409","possible_hits":"1",},
{"lineNum":"  344","line":"    defer book.deinit();","class":"linePartCov","hits":"1","order":"2415","possible_hits":"3",},
{"lineNum":"  345","line":""},
{"lineNum":"  346","line":"    const ty = TokenType.Sub;"},
{"lineNum":"  347","line":"    const entry = book.getOpEntry(ty).?;","class":"linePartCov","hits":"1","order":"2410","possible_hits":"2",},
{"lineNum":"  348","line":"    try expectEqual(Type.Type.Number, entry.Binary.input.getType());","class":"linePartCov","hits":"1","order":"2413","possible_hits":"3",},
{"lineNum":"  349","line":"    try expect(entry.Binary.output == null);","class":"linePartCov","hits":"2","order":"2414","possible_hits":"3",},
{"lineNum":"  350","line":"}"},
{"lineNum":"  351","line":""},
{"lineNum":"  352","line":"test \"invalid token types don\'t have an OpEntry\" {","class":"lineCov","hits":"3","order":"2416","possible_hits":"3",},
{"lineNum":"  353","line":"    var book = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"2417","possible_hits":"1",},
{"lineNum":"  354","line":"    defer book.deinit();","class":"linePartCov","hits":"1","order":"2420","possible_hits":"2",},
{"lineNum":"  355","line":""},
{"lineNum":"  356","line":"    const ty = TokenType.LParen;"},
{"lineNum":"  357","line":"    const entry = book.getOpEntry(ty);","class":"lineCov","hits":"1","order":"2418","possible_hits":"1",},
{"lineNum":"  358","line":"    try expect(entry == null);","class":"linePartCov","hits":"1","order":"2419","possible_hits":"2",},
{"lineNum":"  359","line":"}"},
{"lineNum":"  360","line":""},
{"lineNum":"  361","line":"test \"typebook can combine types\" {","class":"lineCov","hits":"3","order":"2421","possible_hits":"3",},
{"lineNum":"  362","line":"    var book = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"2422","possible_hits":"1",},
{"lineNum":"  363","line":"    defer book.deinit();","class":"linePartCov","hits":"1","order":"2435","possible_hits":"5",},
{"lineNum":"  364","line":""},
{"lineNum":"  365","line":"    const num = book.getNumber();","class":"lineCov","hits":"1","order":"2423","possible_hits":"1",},
{"lineNum":"  366","line":"    const str = book.getString();","class":"lineCov","hits":"1","order":"2424","possible_hits":"1",},
{"lineNum":"  367","line":""},
{"lineNum":"  368","line":"    const a = book.combine(num, num);","class":"lineCov","hits":"1","order":"2425","possible_hits":"1",},
{"lineNum":"  369","line":"    try expectEqual(num, a);","class":"linePartCov","hits":"1","order":"2429","possible_hits":"2",},
{"lineNum":"  370","line":""},
{"lineNum":"  371","line":"    const b = book.combine(num, str);","class":"lineCov","hits":"1","order":"2430","possible_hits":"1",},
{"lineNum":"  372","line":"    try expectEqual(Type.Type.Union, b.getType());","class":"linePartCov","hits":"1","order":"2432","possible_hits":"2",},
{"lineNum":"  373","line":"    try expectEqual(num, b.Union.tys[0]);","class":"linePartCov","hits":"2","order":"2433","possible_hits":"3",},
{"lineNum":"  374","line":"    try expectEqual(str, b.Union.tys[1]);","class":"linePartCov","hits":"2","order":"2434","possible_hits":"3",},
{"lineNum":"  375","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-14 19:42:50", "instrumented" : 198, "covered" : 195,};
var merged_data = [];
