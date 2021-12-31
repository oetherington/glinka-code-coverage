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
{"lineNum":"   25","line":""},
{"lineNum":"   26","line":"const OpEntry = union(Variant) {"},
{"lineNum":"   27","line":"    const Variant = enum {"},
{"lineNum":"   28","line":"        Unary,"},
{"lineNum":"   29","line":"        Binary,"},
{"lineNum":"   30","line":"    };"},
{"lineNum":"   31","line":""},
{"lineNum":"   32","line":"    // When output is null, the output type is the same as the input type"},
{"lineNum":"   33","line":"    Unary: struct {"},
{"lineNum":"   34","line":"        input: Type.Ptr,"},
{"lineNum":"   35","line":"        output: ?Type.Ptr,"},
{"lineNum":"   36","line":"    },"},
{"lineNum":"   37","line":"    Binary: struct {"},
{"lineNum":"   38","line":"        input: Type.Ptr,"},
{"lineNum":"   39","line":"        output: ?Type.Ptr,"},
{"lineNum":"   40","line":"    },"},
{"lineNum":"   41","line":""},
{"lineNum":"   42","line":"    pub fn un(input: Type.Ptr, output: ?Type.Ptr) OpEntry {","class":"lineCov","hits":"1","order":"185","possible_hits":"1",},
{"lineNum":"   43","line":"        return OpEntry{","class":"lineCov","hits":"1","order":"189","possible_hits":"1",},
{"lineNum":"   44","line":"            .Unary = .{","class":"lineCov","hits":"1","order":"186","possible_hits":"1",},
{"lineNum":"   45","line":"                .input = input,","class":"lineCov","hits":"1","order":"187","possible_hits":"1",},
{"lineNum":"   46","line":"                .output = output,","class":"lineCov","hits":"1","order":"188","possible_hits":"1",},
{"lineNum":"   47","line":"            },"},
{"lineNum":"   48","line":"        };"},
{"lineNum":"   49","line":"    }"},
{"lineNum":"   50","line":""},
{"lineNum":"   51","line":"    pub fn bin(input: Type.Ptr, output: ?Type.Ptr) OpEntry {","class":"lineCov","hits":"1","order":"197","possible_hits":"1",},
{"lineNum":"   52","line":"        return OpEntry{","class":"lineCov","hits":"1","order":"201","possible_hits":"1",},
{"lineNum":"   53","line":"            .Binary = .{","class":"lineCov","hits":"1","order":"198","possible_hits":"1",},
{"lineNum":"   54","line":"                .input = input,","class":"lineCov","hits":"1","order":"199","possible_hits":"1",},
{"lineNum":"   55","line":"                .output = output,","class":"lineCov","hits":"1","order":"200","possible_hits":"1",},
{"lineNum":"   56","line":"            },"},
{"lineNum":"   57","line":"        };"},
{"lineNum":"   58","line":"    }"},
{"lineNum":"   59","line":"};"},
{"lineNum":"   60","line":""},
{"lineNum":"   61","line":"const OpMap = [std.meta.fields(TokenType).len]?OpEntry;"},
{"lineNum":"   62","line":""},
{"lineNum":"   63","line":"fn createOpMap(b: *TypeBook) void {","class":"lineCov","hits":"2","order":"181","possible_hits":"2",},
{"lineNum":"   64","line":"    std.mem.set(?OpEntry, b.opMap[0..], null);","class":"lineCov","hits":"1","order":"182","possible_hits":"1",},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"    const h = (struct {"},
{"lineNum":"   67","line":"        book: *TypeBook,"},
{"lineNum":"   68","line":""},
{"lineNum":"   69","line":"        fn put(self: @This(), op: TokenType, entry: OpEntry) void {","class":"lineCov","hits":"2","order":"190","possible_hits":"2",},
{"lineNum":"   70","line":"            self.book.opMap[@enumToInt(op)] = entry;","class":"lineCov","hits":"1","order":"191","possible_hits":"1",},
{"lineNum":"   71","line":"        }"},
{"lineNum":"   72","line":"    }){ .book = b };","class":"lineCov","hits":"1","order":"183","possible_hits":"1",},
{"lineNum":"   73","line":""},
{"lineNum":"   74","line":"    h.put(.Inc, OpEntry.un(&b.numberTy, null));","class":"lineCov","hits":"1","order":"184","possible_hits":"1",},
{"lineNum":"   75","line":"    h.put(.Dec, OpEntry.un(&b.numberTy, null));","class":"lineCov","hits":"1","order":"192","possible_hits":"1",},
{"lineNum":"   76","line":"    h.put(.BitNot, OpEntry.un(&b.numberTy, null));","class":"lineCov","hits":"1","order":"193","possible_hits":"1",},
{"lineNum":"   77","line":""},
{"lineNum":"   78","line":"    h.put(.LogicalNot, OpEntry.un(&b.anyTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"194","possible_hits":"1",},
{"lineNum":"   79","line":""},
{"lineNum":"   80","line":"    h.put(.Nullish, OpEntry.un(&b.anyTy, &b.anyTy)); // TODO: Fix output","class":"lineCov","hits":"1","order":"195","possible_hits":"1",},
{"lineNum":"   81","line":""},
{"lineNum":"   82","line":"    h.put(.Assign, OpEntry.bin(&b.anyTy, null));","class":"lineCov","hits":"1","order":"196","possible_hits":"1",},
{"lineNum":"   83","line":"    h.put(.NullishAssign, OpEntry.bin(&b.anyTy, &b.anyTy)); // TODO Fix output","class":"lineCov","hits":"1","order":"202","possible_hits":"1",},
{"lineNum":"   84","line":""},
{"lineNum":"   85","line":"    h.put(","class":"lineCov","hits":"1","order":"231","possible_hits":"1",},
{"lineNum":"   86","line":"        .Add,"},
{"lineNum":"   87","line":"        OpEntry.bin(b.getUnion(&.{ &b.numberTy, &b.stringTy }), null),","class":"lineCov","hits":"1","order":"203","possible_hits":"1",},
{"lineNum":"   88","line":"    );"},
{"lineNum":"   89","line":""},
{"lineNum":"   90","line":"    h.put(.Sub, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"232","possible_hits":"1",},
{"lineNum":"   91","line":"    h.put(.Mul, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"233","possible_hits":"1",},
{"lineNum":"   92","line":"    h.put(.Pow, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"234","possible_hits":"1",},
{"lineNum":"   93","line":"    h.put(.Div, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"235","possible_hits":"1",},
{"lineNum":"   94","line":"    h.put(.Mod, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"236","possible_hits":"1",},
{"lineNum":"   95","line":"    h.put(.AddAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"237","possible_hits":"1",},
{"lineNum":"   96","line":"    h.put(.SubAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"238","possible_hits":"1",},
{"lineNum":"   97","line":"    h.put(.MulAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"239","possible_hits":"1",},
{"lineNum":"   98","line":"    h.put(.DivAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"240","possible_hits":"1",},
{"lineNum":"   99","line":"    h.put(.ModAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"241","possible_hits":"1",},
{"lineNum":"  100","line":"    h.put(.PowAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"242","possible_hits":"1",},
{"lineNum":"  101","line":"    h.put(.BitAndAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"243","possible_hits":"1",},
{"lineNum":"  102","line":"    h.put(.BitOrAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"244","possible_hits":"1",},
{"lineNum":"  103","line":"    h.put(.BitNotAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"245","possible_hits":"1",},
{"lineNum":"  104","line":"    h.put(.BitXorAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"246","possible_hits":"1",},
{"lineNum":"  105","line":"    h.put(.ShiftRightAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"247","possible_hits":"1",},
{"lineNum":"  106","line":"    h.put(.ShiftRightUnsignedAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"248","possible_hits":"1",},
{"lineNum":"  107","line":"    h.put(.ShiftLeftAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"249","possible_hits":"1",},
{"lineNum":"  108","line":"    h.put(.BitAnd, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"250","possible_hits":"1",},
{"lineNum":"  109","line":"    h.put(.BitOr, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"251","possible_hits":"1",},
{"lineNum":"  110","line":"    h.put(.BitXor, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"252","possible_hits":"1",},
{"lineNum":"  111","line":"    h.put(.ShiftRight, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"253","possible_hits":"1",},
{"lineNum":"  112","line":"    h.put(.ShiftRightUnsigned, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"254","possible_hits":"1",},
{"lineNum":"  113","line":"    h.put(.ShiftLeft, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"255","possible_hits":"1",},
{"lineNum":"  114","line":""},
{"lineNum":"  115","line":"    h.put(.CmpGreater, OpEntry.bin(&b.numberTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"256","possible_hits":"1",},
{"lineNum":"  116","line":"    h.put(.CmpGreaterEq, OpEntry.bin(&b.numberTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"257","possible_hits":"1",},
{"lineNum":"  117","line":"    h.put(.CmpLess, OpEntry.bin(&b.numberTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"258","possible_hits":"1",},
{"lineNum":"  118","line":"    h.put(.CmpLessEq, OpEntry.bin(&b.numberTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"259","possible_hits":"1",},
{"lineNum":"  119","line":""},
{"lineNum":"  120","line":"    h.put(.CmpEq, OpEntry.bin(&b.anyTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"260","possible_hits":"1",},
{"lineNum":"  121","line":"    h.put(.CmpStrictEq, OpEntry.bin(&b.anyTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"261","possible_hits":"1",},
{"lineNum":"  122","line":"    h.put(.CmpNotEq, OpEntry.bin(&b.anyTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"262","possible_hits":"1",},
{"lineNum":"  123","line":"    h.put(.CmpStrictNotEq, OpEntry.bin(&b.anyTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"263","possible_hits":"1",},
{"lineNum":"  124","line":"    h.put(.LogicalAnd, OpEntry.bin(&b.anyTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"264","possible_hits":"1",},
{"lineNum":"  125","line":"    h.put(.LogicalOr, OpEntry.bin(&b.anyTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"265","possible_hits":"1",},
{"lineNum":"  126","line":"    h.put(.LogicalAndAssign, OpEntry.bin(&b.anyTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"266","possible_hits":"1",},
{"lineNum":"  127","line":"    h.put(.LogicalOrAssign, OpEntry.bin(&b.anyTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"267","possible_hits":"1",},
{"lineNum":"  128","line":"}"},
{"lineNum":"  129","line":""},
{"lineNum":"  130","line":"pub const TypeBook = struct {"},
{"lineNum":"  131","line":"    alloc: Allocator,"},
{"lineNum":"  132","line":"    opMap: OpMap,"},
{"lineNum":"  133","line":"    unknownTy: Type = Type.newUnknown(),"},
{"lineNum":"  134","line":"    anyTy: Type = Type.newAny(),"},
{"lineNum":"  135","line":"    voidTy: Type = Type.newVoid(),"},
{"lineNum":"  136","line":"    nullTy: Type = Type.newNull(),"},
{"lineNum":"  137","line":"    undefinedTy: Type = Type.newUndefined(),"},
{"lineNum":"  138","line":"    neverTy: Type = Type.newNever(),"},
{"lineNum":"  139","line":"    numberTy: Type = Type.newNumber(),"},
{"lineNum":"  140","line":"    stringTy: Type = Type.newString(),"},
{"lineNum":"  141","line":"    booleanTy: Type = Type.newBoolean(),"},
{"lineNum":"  142","line":"    objectTy: Type = Type.newObject(),"},
{"lineNum":"  143","line":"    arrayTys: Type.ArrayType.Map,"},
{"lineNum":"  144","line":"    functionTys: Type.FunctionType.Map,"},
{"lineNum":"  145","line":"    unionTys: Type.UnionType.Map,"},
{"lineNum":"  146","line":""},
{"lineNum":"  147","line":"    pub fn new(alloc: Allocator) *TypeBook {","class":"lineCov","hits":"1","order":"163","possible_hits":"1",},
{"lineNum":"  148","line":"        var self = alloc.create(TypeBook) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"164","possible_hits":"1",},
{"lineNum":"  149","line":"        self.* = TypeBook{","class":"lineCov","hits":"2","order":"165","possible_hits":"2",},
{"lineNum":"  150","line":"            .alloc = alloc,","class":"lineCov","hits":"1","order":"166","possible_hits":"1",},
{"lineNum":"  151","line":"            .opMap = undefined,","class":"lineCov","hits":"1","order":"167","possible_hits":"1",},
{"lineNum":"  152","line":"            .arrayTys = Type.ArrayType.Map.new(alloc),","class":"lineCov","hits":"1","order":"168","possible_hits":"1",},
{"lineNum":"  153","line":"            .functionTys = Type.FunctionType.Map.new(alloc),","class":"lineCov","hits":"1","order":"172","possible_hits":"1",},
{"lineNum":"  154","line":"            .unionTys = Type.UnionType.Map.new(alloc),","class":"lineCov","hits":"1","order":"176","possible_hits":"1",},
{"lineNum":"  155","line":"        };"},
{"lineNum":"  156","line":"        createOpMap(self);","class":"lineCov","hits":"1","order":"180","possible_hits":"1",},
{"lineNum":"  157","line":"        return self;","class":"lineCov","hits":"1","order":"268","possible_hits":"1",},
{"lineNum":"  158","line":"    }"},
{"lineNum":"  159","line":""},
{"lineNum":"  160","line":"    pub fn deinit(self: *TypeBook) void {","class":"lineCov","hits":"2","order":"304","possible_hits":"2",},
{"lineNum":"  161","line":"        self.unionTys.deinit();","class":"lineCov","hits":"1","order":"305","possible_hits":"1",},
{"lineNum":"  162","line":"        self.functionTys.deinit();","class":"lineCov","hits":"1","order":"314","possible_hits":"1",},
{"lineNum":"  163","line":"        self.arrayTys.deinit();","class":"lineCov","hits":"1","order":"319","possible_hits":"1",},
{"lineNum":"  164","line":"        self.alloc.destroy(self);","class":"lineCov","hits":"1","order":"324","possible_hits":"1",},
{"lineNum":"  165","line":"    }"},
{"lineNum":"  166","line":""},
{"lineNum":"  167","line":"    pub fn getOpEntry(self: *TypeBook, ty: TokenType) ?OpEntry {","class":"lineCov","hits":"1","order":"2077","possible_hits":"1",},
{"lineNum":"  168","line":"        return self.opMap[@enumToInt(ty)];","class":"lineCov","hits":"1","order":"2078","possible_hits":"1",},
{"lineNum":"  169","line":"    }"},
{"lineNum":"  170","line":""},
{"lineNum":"  171","line":"    pub fn getUnknown(self: *TypeBook) Type.Ptr {","class":"lineCov","hits":"1","order":"1955","possible_hits":"1",},
{"lineNum":"  172","line":"        return &self.unknownTy;","class":"lineCov","hits":"1","order":"1956","possible_hits":"1",},
{"lineNum":"  173","line":"    }"},
{"lineNum":"  174","line":""},
{"lineNum":"  175","line":"    pub fn getAny(self: *TypeBook) Type.Ptr {","class":"lineCov","hits":"1","order":"1958","possible_hits":"1",},
{"lineNum":"  176","line":"        return &self.anyTy;","class":"lineCov","hits":"1","order":"1959","possible_hits":"1",},
{"lineNum":"  177","line":"    }"},
{"lineNum":"  178","line":""},
{"lineNum":"  179","line":"    pub fn getVoid(self: *TypeBook) Type.Ptr {","class":"lineCov","hits":"1","order":"1961","possible_hits":"1",},
{"lineNum":"  180","line":"        return &self.voidTy;","class":"lineCov","hits":"1","order":"1962","possible_hits":"1",},
{"lineNum":"  181","line":"    }"},
{"lineNum":"  182","line":""},
{"lineNum":"  183","line":"    pub fn getNull(self: *TypeBook) Type.Ptr {","class":"lineCov","hits":"1","order":"1964","possible_hits":"1",},
{"lineNum":"  184","line":"        return &self.nullTy;","class":"lineCov","hits":"1","order":"1965","possible_hits":"1",},
{"lineNum":"  185","line":"    }"},
{"lineNum":"  186","line":""},
{"lineNum":"  187","line":"    pub fn getUndefined(self: *TypeBook) Type.Ptr {","class":"lineCov","hits":"1","order":"1967","possible_hits":"1",},
{"lineNum":"  188","line":"        return &self.undefinedTy;","class":"lineCov","hits":"1","order":"1968","possible_hits":"1",},
{"lineNum":"  189","line":"    }"},
{"lineNum":"  190","line":""},
{"lineNum":"  191","line":"    pub fn getNever(self: *TypeBook) Type.Ptr {","class":"lineCov","hits":"1","order":"1970","possible_hits":"1",},
{"lineNum":"  192","line":"        return &self.neverTy;","class":"lineCov","hits":"1","order":"1971","possible_hits":"1",},
{"lineNum":"  193","line":"    }"},
{"lineNum":"  194","line":""},
{"lineNum":"  195","line":"    pub fn getNumber(self: *TypeBook) Type.Ptr {","class":"lineCov","hits":"1","order":"1973","possible_hits":"1",},
{"lineNum":"  196","line":"        return &self.numberTy;","class":"lineCov","hits":"1","order":"1974","possible_hits":"1",},
{"lineNum":"  197","line":"    }"},
{"lineNum":"  198","line":""},
{"lineNum":"  199","line":"    pub fn getString(self: *TypeBook) Type.Ptr {","class":"lineCov","hits":"1","order":"1976","possible_hits":"1",},
{"lineNum":"  200","line":"        return &self.stringTy;","class":"lineCov","hits":"1","order":"1977","possible_hits":"1",},
{"lineNum":"  201","line":"    }"},
{"lineNum":"  202","line":""},
{"lineNum":"  203","line":"    pub fn getBoolean(self: *TypeBook) Type.Ptr {","class":"lineCov","hits":"1","order":"1844","possible_hits":"1",},
{"lineNum":"  204","line":"        return &self.booleanTy;","class":"lineCov","hits":"1","order":"1845","possible_hits":"1",},
{"lineNum":"  205","line":"    }"},
{"lineNum":"  206","line":""},
{"lineNum":"  207","line":"    pub fn getObject(self: *TypeBook) Type.Ptr {","class":"lineCov","hits":"1","order":"1980","possible_hits":"1",},
{"lineNum":"  208","line":"        return &self.objectTy;","class":"lineCov","hits":"1","order":"1981","possible_hits":"1",},
{"lineNum":"  209","line":"    }"},
{"lineNum":"  210","line":""},
{"lineNum":"  211","line":"    pub fn getArray(self: *TypeBook, subtype: Type.Ptr) Type.Ptr {","class":"lineCov","hits":"1","order":"1988","possible_hits":"1",},
{"lineNum":"  212","line":"        return self.arrayTys.get(subtype);","class":"lineCov","hits":"1","order":"1989","possible_hits":"1",},
{"lineNum":"  213","line":"    }"},
{"lineNum":"  214","line":""},
{"lineNum":"  215","line":"    pub fn getFunction(","class":"lineCov","hits":"1","order":"2040","possible_hits":"1",},
{"lineNum":"  216","line":"        self: *TypeBook,"},
{"lineNum":"  217","line":"        ret: Type.Ptr,"},
{"lineNum":"  218","line":"        args: []Type.Ptr,"},
{"lineNum":"  219","line":"    ) Type.Ptr {"},
{"lineNum":"  220","line":"        return self.functionTys.get(ret, args);","class":"lineCov","hits":"1","order":"2041","possible_hits":"1",},
{"lineNum":"  221","line":"    }"},
{"lineNum":"  222","line":""},
{"lineNum":"  223","line":"    pub fn getUnion(self: *TypeBook, tys: []Type.Ptr) Type.Ptr {","class":"lineCov","hits":"1","order":"204","possible_hits":"1",},
{"lineNum":"  224","line":"        return self.unionTys.get(tys);","class":"lineCov","hits":"1","order":"205","possible_hits":"1",},
{"lineNum":"  225","line":"    }"},
{"lineNum":"  226","line":""},
{"lineNum":"  227","line":"    pub fn combine(self: *TypeBook, a: Type.Ptr, b: Type.Ptr) Type.Ptr {","class":"lineCov","hits":"1","order":"2092","possible_hits":"1",},
{"lineNum":"  228","line":"        if (b.isAssignableTo(a))","class":"lineCov","hits":"2","order":"2093","possible_hits":"2",},
{"lineNum":"  229","line":"            return a;","class":"lineCov","hits":"1","order":"2094","possible_hits":"1",},
{"lineNum":"  230","line":"        return self.getUnion(&[_]Type.Ptr{ a, b });","class":"lineCov","hits":"1","order":"2097","possible_hits":"1",},
{"lineNum":"  231","line":"    }"},
{"lineNum":"  232","line":"};"},
{"lineNum":"  233","line":""},
{"lineNum":"  234","line":"test \"type book can return builtin types\" {","class":"lineCov","hits":"3","order":"1952","possible_hits":"3",},
{"lineNum":"  235","line":"    var book = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"1953","possible_hits":"1",},
{"lineNum":"  236","line":"    defer book.deinit();","class":"linePartCov","hits":"1","order":"1982","possible_hits":"11",},
{"lineNum":"  237","line":""},
{"lineNum":"  238","line":"    try expectEqual(Type.Type.Unknown, book.getUnknown().getType());","class":"linePartCov","hits":"1","order":"1954","possible_hits":"2",},
{"lineNum":"  239","line":"    try expectEqual(Type.Type.Any, book.getAny().getType());","class":"linePartCov","hits":"1","order":"1957","possible_hits":"2",},
{"lineNum":"  240","line":"    try expectEqual(Type.Type.Void, book.getVoid().getType());","class":"linePartCov","hits":"1","order":"1960","possible_hits":"2",},
{"lineNum":"  241","line":"    try expectEqual(Type.Type.Null, book.getNull().getType());","class":"linePartCov","hits":"1","order":"1963","possible_hits":"2",},
{"lineNum":"  242","line":"    try expectEqual(Type.Type.Undefined, book.getUndefined().getType());","class":"linePartCov","hits":"1","order":"1966","possible_hits":"2",},
{"lineNum":"  243","line":"    try expectEqual(Type.Type.Never, book.getNever().getType());","class":"linePartCov","hits":"1","order":"1969","possible_hits":"2",},
{"lineNum":"  244","line":"    try expectEqual(Type.Type.Number, book.getNumber().getType());","class":"linePartCov","hits":"1","order":"1972","possible_hits":"2",},
{"lineNum":"  245","line":"    try expectEqual(Type.Type.String, book.getString().getType());","class":"linePartCov","hits":"1","order":"1975","possible_hits":"2",},
{"lineNum":"  246","line":"    try expectEqual(Type.Type.Boolean, book.getBoolean().getType());","class":"linePartCov","hits":"1","order":"1978","possible_hits":"2",},
{"lineNum":"  247","line":"    try expectEqual(Type.Type.Object, book.getObject().getType());","class":"linePartCov","hits":"1","order":"1979","possible_hits":"2",},
{"lineNum":"  248","line":"}"},
{"lineNum":"  249","line":""},
{"lineNum":"  250","line":"test \"type book can create and retrieve array types\" {","class":"lineCov","hits":"3","order":"1983","possible_hits":"3",},
{"lineNum":"  251","line":"    var book = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"1984","possible_hits":"1",},
{"lineNum":"  252","line":"    defer book.deinit();","class":"linePartCov","hits":"1","order":"2011","possible_hits":"9",},
{"lineNum":"  253","line":""},
{"lineNum":"  254","line":"    const num: *const Type = &book.numberTy;","class":"lineCov","hits":"1","order":"1985","possible_hits":"1",},
{"lineNum":"  255","line":"    const str: *const Type = &book.stringTy;","class":"lineCov","hits":"1","order":"1986","possible_hits":"1",},
{"lineNum":"  256","line":""},
{"lineNum":"  257","line":"    const numArray = book.getArray(num);","class":"lineCov","hits":"1","order":"1987","possible_hits":"1",},
{"lineNum":"  258","line":"    try expectEqual(Type.Type.Array, numArray.getType());","class":"linePartCov","hits":"1","order":"1999","possible_hits":"2",},
{"lineNum":"  259","line":"    try expectEqual(num, numArray.Array.subtype);","class":"linePartCov","hits":"2","order":"2000","possible_hits":"3",},
{"lineNum":"  260","line":""},
{"lineNum":"  261","line":"    const strArray = book.getArray(str);","class":"lineCov","hits":"1","order":"2001","possible_hits":"1",},
{"lineNum":"  262","line":"    try expectEqual(Type.Type.Array, strArray.getType());","class":"linePartCov","hits":"1","order":"2004","possible_hits":"2",},
{"lineNum":"  263","line":"    try expectEqual(str, strArray.Array.subtype);","class":"linePartCov","hits":"2","order":"2005","possible_hits":"3",},
{"lineNum":"  264","line":"    try expect(numArray != strArray);","class":"linePartCov","hits":"1","order":"2006","possible_hits":"2",},
{"lineNum":"  265","line":""},
{"lineNum":"  266","line":"    const numArrayArray = book.getArray(numArray);","class":"lineCov","hits":"1","order":"2007","possible_hits":"1",},
{"lineNum":"  267","line":"    try expectEqual(Type.Type.Array, numArrayArray.getType());","class":"linePartCov","hits":"1","order":"2008","possible_hits":"2",},
{"lineNum":"  268","line":"    try expectEqual(numArray, numArrayArray.Array.subtype);","class":"linePartCov","hits":"2","order":"2009","possible_hits":"3",},
{"lineNum":"  269","line":"    try expect(numArray != numArrayArray);","class":"linePartCov","hits":"1","order":"2010","possible_hits":"2",},
{"lineNum":"  270","line":"}"},
{"lineNum":"  271","line":""},
{"lineNum":"  272","line":"test \"type book can create and retrieve union types\" {","class":"lineCov","hits":"3","order":"2013","possible_hits":"3",},
{"lineNum":"  273","line":"    var book = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"2014","possible_hits":"1",},
{"lineNum":"  274","line":"    defer book.deinit();","class":"linePartCov","hits":"1","order":"2033","possible_hits":"7",},
{"lineNum":"  275","line":""},
{"lineNum":"  276","line":"    const num = &book.numberTy;","class":"lineCov","hits":"1","order":"2015","possible_hits":"1",},
{"lineNum":"  277","line":"    const str = &book.stringTy;","class":"lineCov","hits":"1","order":"2016","possible_hits":"1",},
{"lineNum":"  278","line":"    const numStr = book.getUnion(&.{ num, str });","class":"lineCov","hits":"1","order":"2017","possible_hits":"1",},
{"lineNum":"  279","line":"    try expectEqual(Type.Type.Union, numStr.getType());","class":"linePartCov","hits":"1","order":"2022","possible_hits":"2",},
{"lineNum":"  280","line":""},
{"lineNum":"  281","line":"    const tys = numStr.Union.tys;","class":"linePartCov","hits":"2","order":"2023","possible_hits":"3",},
{"lineNum":"  282","line":"    try expectEqual(@intCast(usize, 2), tys.len);","class":"linePartCov","hits":"1","order":"2024","possible_hits":"3",},
{"lineNum":"  283","line":"    try expect(tys[0] == num and tys[1] == str);","class":"linePartCov","hits":"1","order":"2025","possible_hits":"3",},
{"lineNum":"  284","line":""},
{"lineNum":"  285","line":"    const numStr2 = book.getUnion(&.{ num, str });","class":"lineCov","hits":"1","order":"2026","possible_hits":"1",},
{"lineNum":"  286","line":"    try expectEqual(numStr, numStr2);","class":"linePartCov","hits":"1","order":"2027","possible_hits":"2",},
{"lineNum":"  287","line":""},
{"lineNum":"  288","line":"    const strNum = book.getUnion(&.{ str, num });","class":"lineCov","hits":"1","order":"2028","possible_hits":"1",},
{"lineNum":"  289","line":"    try expectEqual(numStr, strNum);","class":"linePartCov","hits":"1","order":"2029","possible_hits":"2",},
{"lineNum":"  290","line":""},
{"lineNum":"  291","line":"    const boolean = &book.booleanTy;","class":"lineCov","hits":"1","order":"2030","possible_hits":"1",},
{"lineNum":"  292","line":"    const boolNum = book.getUnion(&.{ boolean, num });","class":"lineCov","hits":"1","order":"2031","possible_hits":"1",},
{"lineNum":"  293","line":"    try expect(numStr != boolNum);","class":"linePartCov","hits":"1","order":"2032","possible_hits":"2",},
{"lineNum":"  294","line":"}"},
{"lineNum":"  295","line":""},
{"lineNum":"  296","line":"test \"type book can create and retrieve function types\" {","class":"lineCov","hits":"3","order":"2034","possible_hits":"3",},
{"lineNum":"  297","line":"    var book = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"2035","possible_hits":"1",},
{"lineNum":"  298","line":"    defer book.deinit();","class":"linePartCov","hits":"1","order":"2069","possible_hits":"7",},
{"lineNum":"  299","line":""},
{"lineNum":"  300","line":"    const n: *const Type = &book.numberTy;","class":"lineCov","hits":"1","order":"2036","possible_hits":"1",},
{"lineNum":"  301","line":"    const s: *const Type = &book.stringTy;","class":"lineCov","hits":"1","order":"2037","possible_hits":"1",},
{"lineNum":"  302","line":"    const b: *const Type = &book.booleanTy;","class":"lineCov","hits":"1","order":"2038","possible_hits":"1",},
{"lineNum":"  303","line":""},
{"lineNum":"  304","line":"    const func = book.getFunction(n, &[_]Type.Ptr{ s, b });","class":"lineCov","hits":"1","order":"2039","possible_hits":"1",},
{"lineNum":"  305","line":""},
{"lineNum":"  306","line":"    try expectEqual(Type.Type.Function, func.getType());","class":"linePartCov","hits":"1","order":"2059","possible_hits":"2",},
{"lineNum":"  307","line":"    try expectEqual(n, func.Function.ret);","class":"linePartCov","hits":"2","order":"2060","possible_hits":"3",},
{"lineNum":"  308","line":"    try expectEqual(@intCast(usize, 2), func.Function.args.len);","class":"linePartCov","hits":"2","order":"2061","possible_hits":"3",},
{"lineNum":"  309","line":"    try expectEqual(s, func.Function.args[0]);","class":"linePartCov","hits":"2","order":"2062","possible_hits":"3",},
{"lineNum":"  310","line":"    try expectEqual(b, func.Function.args[1]);","class":"linePartCov","hits":"2","order":"2063","possible_hits":"3",},
{"lineNum":"  311","line":""},
{"lineNum":"  312","line":"    const func2 = book.getFunction(n, &[_]Type.Ptr{ s, b });","class":"lineCov","hits":"1","order":"2064","possible_hits":"1",},
{"lineNum":"  313","line":""},
{"lineNum":"  314","line":"    try expectEqual(func, func2);","class":"linePartCov","hits":"1","order":"2068","possible_hits":"2",},
{"lineNum":"  315","line":"}"},
{"lineNum":"  316","line":""},
{"lineNum":"  317","line":"test \"type book can return an OpEntry\" {","class":"lineCov","hits":"3","order":"2074","possible_hits":"3",},
{"lineNum":"  318","line":"    var book = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"2075","possible_hits":"1",},
{"lineNum":"  319","line":"    defer book.deinit();","class":"linePartCov","hits":"1","order":"2081","possible_hits":"3",},
{"lineNum":"  320","line":""},
{"lineNum":"  321","line":"    const ty = TokenType.Sub;"},
{"lineNum":"  322","line":"    const entry = book.getOpEntry(ty).?;","class":"linePartCov","hits":"1","order":"2076","possible_hits":"2",},
{"lineNum":"  323","line":"    try expectEqual(Type.Type.Number, entry.Binary.input.getType());","class":"linePartCov","hits":"1","order":"2079","possible_hits":"3",},
{"lineNum":"  324","line":"    try expect(entry.Binary.output == null);","class":"linePartCov","hits":"2","order":"2080","possible_hits":"3",},
{"lineNum":"  325","line":"}"},
{"lineNum":"  326","line":""},
{"lineNum":"  327","line":"test \"invalid token types don\'t have an OpEntry\" {","class":"lineCov","hits":"3","order":"2082","possible_hits":"3",},
{"lineNum":"  328","line":"    var book = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"2083","possible_hits":"1",},
{"lineNum":"  329","line":"    defer book.deinit();","class":"linePartCov","hits":"1","order":"2086","possible_hits":"2",},
{"lineNum":"  330","line":""},
{"lineNum":"  331","line":"    const ty = TokenType.LParen;"},
{"lineNum":"  332","line":"    const entry = book.getOpEntry(ty);","class":"lineCov","hits":"1","order":"2084","possible_hits":"1",},
{"lineNum":"  333","line":"    try expect(entry == null);","class":"linePartCov","hits":"1","order":"2085","possible_hits":"2",},
{"lineNum":"  334","line":"}"},
{"lineNum":"  335","line":""},
{"lineNum":"  336","line":"test \"typebook can combine types\" {","class":"lineCov","hits":"3","order":"2087","possible_hits":"3",},
{"lineNum":"  337","line":"    var book = TypeBook.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"2088","possible_hits":"1",},
{"lineNum":"  338","line":"    defer book.deinit();","class":"linePartCov","hits":"1","order":"2101","possible_hits":"5",},
{"lineNum":"  339","line":""},
{"lineNum":"  340","line":"    const num = book.getNumber();","class":"lineCov","hits":"1","order":"2089","possible_hits":"1",},
{"lineNum":"  341","line":"    const str = book.getString();","class":"lineCov","hits":"1","order":"2090","possible_hits":"1",},
{"lineNum":"  342","line":""},
{"lineNum":"  343","line":"    const a = book.combine(num, num);","class":"lineCov","hits":"1","order":"2091","possible_hits":"1",},
{"lineNum":"  344","line":"    try expectEqual(num, a);","class":"linePartCov","hits":"1","order":"2095","possible_hits":"2",},
{"lineNum":"  345","line":""},
{"lineNum":"  346","line":"    const b = book.combine(num, str);","class":"lineCov","hits":"1","order":"2096","possible_hits":"1",},
{"lineNum":"  347","line":"    try expectEqual(Type.Type.Union, b.getType());","class":"linePartCov","hits":"1","order":"2098","possible_hits":"2",},
{"lineNum":"  348","line":"    try expectEqual(num, b.Union.tys[0]);","class":"linePartCov","hits":"2","order":"2099","possible_hits":"3",},
{"lineNum":"  349","line":"    try expectEqual(str, b.Union.tys[1]);","class":"linePartCov","hits":"2","order":"2100","possible_hits":"3",},
{"lineNum":"  350","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2021-12-31 19:19:11", "instrumented" : 189, "covered" : 189,};
var merged_data = [];
