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
{"lineNum":"   22","line":"const Arena = std.heap.ArenaAllocator;"},
{"lineNum":"   23","line":"const Config = @import(\"../common/config.zig\").Config;"},
{"lineNum":"   24","line":"const Cursor = @import(\"../common/cursor.zig\").Cursor;"},
{"lineNum":"   25","line":"const Node = @import(\"../common/node.zig\").Node;"},
{"lineNum":"   26","line":"const Backend = @import(\"../common/backend.zig\").Backend;"},
{"lineNum":"   27","line":"const Scope = @import(\"scope.zig\").Scope;"},
{"lineNum":"   28","line":"const Type = @import(\"../common/types/type.zig\").Type;"},
{"lineNum":"   29","line":"const TypeBook = @import(\"typebook.zig\").TypeBook;"},
{"lineNum":"   30","line":"const TypeError = @import(\"errors/type_error.zig\").TypeError;"},
{"lineNum":"   31","line":"const implicitAnyError = @import(\"errors/implicit_any_error.zig\");"},
{"lineNum":"   32","line":"const ImplicitAnyError = implicitAnyError.ImplicitAnyError;"},
{"lineNum":"   33","line":"const CompileError = @import(\"errors/compile_error.zig\").CompileError;"},
{"lineNum":"   34","line":"const ErrorContext = @import(\"errors/error_context.zig\").ErrorContext;"},
{"lineNum":"   35","line":"const inferrer = @import(\"inferrer.zig\");"},
{"lineNum":"   36","line":"const typeFinder = @import(\"type_finder.zig\");"},
{"lineNum":"   37","line":"const expression = @import(\"expression.zig\");"},
{"lineNum":"   38","line":"const block = @import(\"block.zig\");"},
{"lineNum":"   39","line":"const declaration = @import(\"declaration.zig\");"},
{"lineNum":"   40","line":"const conditional = @import(\"conditional.zig\");"},
{"lineNum":"   41","line":"const loop = @import(\"loop.zig\");"},
{"lineNum":"   42","line":"const throw = @import(\"throw.zig\");"},
{"lineNum":"   43","line":"const function = @import(\"function.zig\");"},
{"lineNum":"   44","line":"const allocate = @import(\"../common/allocate.zig\");"},
{"lineNum":"   45","line":"const NopBackend = @import(\"compiler_test_case.zig\").NopBackend;"},
{"lineNum":"   46","line":""},
{"lineNum":"   47","line":"pub const Compiler = struct {"},
{"lineNum":"   48","line":"    const StringList = std.ArrayList([]u8);"},
{"lineNum":"   49","line":""},
{"lineNum":"   50","line":"    alloc: Allocator,"},
{"lineNum":"   51","line":"    config: *const Config,"},
{"lineNum":"   52","line":"    backend: *Backend,"},
{"lineNum":"   53","line":"    scope: *Scope,"},
{"lineNum":"   54","line":"    typebook: *TypeBook,"},
{"lineNum":"   55","line":"    errors: ErrorContext,"},
{"lineNum":"   56","line":"    strings: StringList,"},
{"lineNum":"   57","line":""},
{"lineNum":"   58","line":"    pub fn new(","class":"lineCov","hits":"1","order":"151","possible_hits":"1",},
{"lineNum":"   59","line":"        alloc: Allocator,"},
{"lineNum":"   60","line":"        config: *const Config,"},
{"lineNum":"   61","line":"        backend: *Backend,"},
{"lineNum":"   62","line":"    ) Compiler {"},
{"lineNum":"   63","line":"        return Compiler{","class":"lineCov","hits":"1","order":"273","possible_hits":"1",},
{"lineNum":"   64","line":"            .alloc = alloc,","class":"lineCov","hits":"1","order":"152","possible_hits":"1",},
{"lineNum":"   65","line":"            .config = config,","class":"lineCov","hits":"1","order":"153","possible_hits":"1",},
{"lineNum":"   66","line":"            .backend = backend,","class":"lineCov","hits":"1","order":"154","possible_hits":"1",},
{"lineNum":"   67","line":"            .scope = Scope.new(alloc, null),","class":"lineCov","hits":"1","order":"155","possible_hits":"1",},
{"lineNum":"   68","line":"            .typebook = TypeBook.new(alloc),","class":"lineCov","hits":"1","order":"161","possible_hits":"1",},
{"lineNum":"   69","line":"            .errors = ErrorContext.new(alloc),","class":"lineCov","hits":"1","order":"268","possible_hits":"1",},
{"lineNum":"   70","line":"            .strings = StringList.init(alloc),","class":"lineCov","hits":"1","order":"272","possible_hits":"1",},
{"lineNum":"   71","line":"        };"},
{"lineNum":"   72","line":"    }"},
{"lineNum":"   73","line":""},
{"lineNum":"   74","line":"    pub fn deinit(self: *Compiler) void {","class":"lineCov","hits":"2","order":"298","possible_hits":"2",},
{"lineNum":"   75","line":"        std.debug.assert(self.scope.parent == null);","class":"lineCov","hits":"1","order":"299","possible_hits":"1",},
{"lineNum":"   76","line":"        self.scope.deinit();","class":"lineCov","hits":"1","order":"300","possible_hits":"1",},
{"lineNum":"   77","line":""},
{"lineNum":"   78","line":"        self.typebook.deinit();","class":"lineCov","hits":"1","order":"301","possible_hits":"1",},
{"lineNum":"   79","line":""},
{"lineNum":"   80","line":"        self.errors.deinit();","class":"lineCov","hits":"1","order":"323","possible_hits":"1",},
{"lineNum":"   81","line":""},
{"lineNum":"   82","line":"        for (self.strings.items) |string|","class":"lineCov","hits":"2","order":"326","possible_hits":"2",},
{"lineNum":"   83","line":"            self.alloc.free(string);","class":"lineCov","hits":"1","order":"3604","possible_hits":"1",},
{"lineNum":"   84","line":""},
{"lineNum":"   85","line":"        self.strings.deinit();","class":"lineCov","hits":"1","order":"327","possible_hits":"1",},
{"lineNum":"   86","line":"    }"},
{"lineNum":"   87","line":""},
{"lineNum":"   88","line":"    pub fn pushScope(self: *Compiler) void {","class":"lineCov","hits":"2","order":"277","possible_hits":"2",},
{"lineNum":"   89","line":"        self.scope = Scope.new(self.alloc, self.scope);","class":"lineCov","hits":"1","order":"278","possible_hits":"1",},
{"lineNum":"   90","line":"    }"},
{"lineNum":"   91","line":""},
{"lineNum":"   92","line":"    pub fn popScope(self: *Compiler) void {","class":"lineCov","hits":"2","order":"283","possible_hits":"2",},
{"lineNum":"   93","line":"        std.debug.assert(self.scope.parent != null);","class":"lineCov","hits":"1","order":"284","possible_hits":"1",},
{"lineNum":"   94","line":"        var old = self.scope;","class":"lineCov","hits":"1","order":"285","possible_hits":"1",},
{"lineNum":"   95","line":"        self.scope = old.parent.?;","class":"lineCov","hits":"1","order":"286","possible_hits":"1",},
{"lineNum":"   96","line":"        old.deinit();","class":"lineCov","hits":"1","order":"287","possible_hits":"1",},
{"lineNum":"   97","line":"    }"},
{"lineNum":"   98","line":""},
{"lineNum":"   99","line":"    pub fn hasErrors(self: Compiler) bool {","class":"lineCov","hits":"1","order":"3135","possible_hits":"1",},
{"lineNum":"  100","line":"        return self.errors.count() > 0;","class":"lineCov","hits":"1","order":"3136","possible_hits":"1",},
{"lineNum":"  101","line":"    }"},
{"lineNum":"  102","line":""},
{"lineNum":"  103","line":"    pub fn reportErrors(self: Compiler) !void {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  104","line":"        try self.errors.reportToStdErr();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  105","line":"    }"},
{"lineNum":"  106","line":""},
{"lineNum":"  107","line":"    pub fn getError(self: Compiler, index: usize) CompileError {","class":"lineCov","hits":"1","order":"3178","possible_hits":"1",},
{"lineNum":"  108","line":"        return self.errors.list.items[index];","class":"lineCov","hits":"1","order":"3179","possible_hits":"1",},
{"lineNum":"  109","line":"    }"},
{"lineNum":"  110","line":""},
{"lineNum":"  111","line":"    pub fn fmt(","class":"linePartCov","hits":"5","order":"3585","possible_hits":"7",},
{"lineNum":"  112","line":"        self: *Compiler,"},
{"lineNum":"  113","line":"        comptime format: []const u8,"},
{"lineNum":"  114","line":"        args: anytype,"},
{"lineNum":"  115","line":"    ) []u8 {"},
{"lineNum":"  116","line":"        const string = std.fmt.allocPrint(","class":"linePartCov","hits":"5","order":"3588","possible_hits":"7",},
{"lineNum":"  117","line":"            self.alloc,","class":"linePartCov","hits":"5","order":"3586","possible_hits":"7",},
{"lineNum":"  118","line":"            format,"},
{"lineNum":"  119","line":"            args,","class":"linePartCov","hits":"5","order":"3587","possible_hits":"7",},
{"lineNum":"  120","line":"        ) catch allocate.reportAndExit();","class":"linePartCov","hits":"5","order":"3589","possible_hits":"7",},
{"lineNum":"  121","line":"        self.strings.append(string) catch allocate.reportAndExit();","class":"linePartCov","hits":"5","order":"3590","possible_hits":"7",},
{"lineNum":"  122","line":"        return string;","class":"linePartCov","hits":"5","order":"3591","possible_hits":"7",},
{"lineNum":"  123","line":"    }"},
{"lineNum":"  124","line":""},
{"lineNum":"  125","line":"    pub fn implicitAny(","class":"lineCov","hits":"1","order":"3313","possible_hits":"1",},
{"lineNum":"  126","line":"        self: *Compiler,"},
{"lineNum":"  127","line":"        csr: Cursor,"},
{"lineNum":"  128","line":"        symbol: []const u8,"},
{"lineNum":"  129","line":"    ) Type.Ptr {"},
{"lineNum":"  130","line":"        if (self.config.errorOnImplicitAny)","class":"lineCov","hits":"2","order":"3314","possible_hits":"2",},
{"lineNum":"  131","line":"            self.errors.append(CompileError.implicitAnyError(","class":"lineCov","hits":"2","order":"3315","possible_hits":"2",},
{"lineNum":"  132","line":"                ImplicitAnyError.new(csr, symbol),","class":"lineCov","hits":"1","order":"3316","possible_hits":"1",},
{"lineNum":"  133","line":"            )) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"3317","possible_hits":"1",},
{"lineNum":"  134","line":""},
{"lineNum":"  135","line":"        return self.typebook.getAny();","class":"lineCov","hits":"1","order":"3318","possible_hits":"1",},
{"lineNum":"  136","line":"    }"},
{"lineNum":"  137","line":""},
{"lineNum":"  138","line":"    pub fn inferExprType(self: *Compiler, nd: Node) ?Type.Ptr {","class":"lineCov","hits":"1","order":"3118","possible_hits":"1",},
{"lineNum":"  139","line":"        const valTy = inferrer.inferExprType(self, nd);","class":"lineCov","hits":"1","order":"3119","possible_hits":"1",},
{"lineNum":"  140","line":"        switch (valTy) {","class":"linePartCov","hits":"1","order":"3127","possible_hits":"2",},
{"lineNum":"  141","line":"            .Success => |ty| {","class":"lineCov","hits":"1","order":"3128","possible_hits":"1",},
{"lineNum":"  142","line":"                nd.ty = ty;","class":"lineCov","hits":"1","order":"3129","possible_hits":"1",},
{"lineNum":"  143","line":"                return ty;","class":"lineCov","hits":"1","order":"3130","possible_hits":"1",},
{"lineNum":"  144","line":"            },"},
{"lineNum":"  145","line":"            .Error => |err| {","class":"lineCov","hits":"1","order":"3172","possible_hits":"1",},
{"lineNum":"  146","line":"                self.errors.append(err) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"3173","possible_hits":"1",},
{"lineNum":"  147","line":"                return null;","class":"lineCov","hits":"1","order":"3174","possible_hits":"1",},
{"lineNum":"  148","line":"            },"},
{"lineNum":"  149","line":"        }"},
{"lineNum":"  150","line":"    }"},
{"lineNum":"  151","line":""},
{"lineNum":"  152","line":"    pub fn findType(self: *Compiler, nd: Node) ?Type.Ptr {","class":"lineCov","hits":"1","order":"3332","possible_hits":"1",},
{"lineNum":"  153","line":"        return typeFinder.findType(self.scope, self.typebook, nd);","class":"lineCov","hits":"1","order":"3333","possible_hits":"1",},
{"lineNum":"  154","line":"    }"},
{"lineNum":"  155","line":""},
{"lineNum":"  156","line":"    pub fn processNode(self: *Compiler, nd: Node) void {","class":"lineCov","hits":"2","order":"3106","possible_hits":"2",},
{"lineNum":"  157","line":"        switch (nd.data) {","class":"lineCov","hits":"14","order":"3107","possible_hits":"14",},
{"lineNum":"  158","line":"            .PrefixOp,"},
{"lineNum":"  159","line":"            .PostfixOp,"},
{"lineNum":"  160","line":"            .BinaryOp,"},
{"lineNum":"  161","line":"            .Ternary,"},
{"lineNum":"  162","line":"            .Ident,"},
{"lineNum":"  163","line":"            .True,"},
{"lineNum":"  164","line":"            .False,"},
{"lineNum":"  165","line":"            .Null,"},
{"lineNum":"  166","line":"            .Undefined,"},
{"lineNum":"  167","line":"            .Int,"},
{"lineNum":"  168","line":"            .String,"},
{"lineNum":"  169","line":"            .Call,"},
{"lineNum":"  170","line":"            => expression.processExpression(self, nd),","class":"lineCov","hits":"1","order":"3141","possible_hits":"1",},
{"lineNum":"  171","line":"            .Block => block.processBlock(self, nd),","class":"lineCov","hits":"1","order":"3278","possible_hits":"1",},
{"lineNum":"  172","line":"            .Decl => declaration.processDecl(self, nd),","class":"lineCov","hits":"1","order":"3108","possible_hits":"1",},
{"lineNum":"  173","line":"            .If => conditional.processConditional(self, nd),","class":"lineCov","hits":"1","order":"3366","possible_hits":"1",},
{"lineNum":"  174","line":"            .Switch => conditional.processSwitch(self, nd),","class":"lineCov","hits":"1","order":"3390","possible_hits":"1",},
{"lineNum":"  175","line":"            .For => loop.processFor(self, nd),","class":"lineCov","hits":"1","order":"3418","possible_hits":"1",},
{"lineNum":"  176","line":"            .While => loop.processWhile(self, nd),","class":"lineCov","hits":"1","order":"3270","possible_hits":"1",},
{"lineNum":"  177","line":"            .Do => loop.processDo(self, nd),","class":"lineCov","hits":"1","order":"3439","possible_hits":"1",},
{"lineNum":"  178","line":"            .Break => loop.processBreak(self, nd),","class":"lineCov","hits":"1","order":"3403","possible_hits":"1",},
{"lineNum":"  179","line":"            .Continue => loop.processContinue(self, nd),","class":"lineCov","hits":"1","order":"3468","possible_hits":"1",},
{"lineNum":"  180","line":"            .Throw => throw.processThrow(self, nd),","class":"lineCov","hits":"1","order":"3490","possible_hits":"1",},
{"lineNum":"  181","line":"            .Try => throw.processTry(self, nd),","class":"lineCov","hits":"1","order":"3497","possible_hits":"1",},
{"lineNum":"  182","line":"            .Function => function.processFunction(self, nd),","class":"lineCov","hits":"1","order":"3521","possible_hits":"1",},
{"lineNum":"  183","line":"            .Return => function.processReturn(self, nd),","class":"lineCov","hits":"1","order":"3410","possible_hits":"1",},
{"lineNum":"  184","line":"            else => std.debug.panic(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  185","line":"                \"Unhandled node type in Compiler.processNode: {?}\\n\","},
{"lineNum":"  186","line":"                .{nd.getType()},","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  187","line":"            ),"},
{"lineNum":"  188","line":"        }"},
{"lineNum":"  189","line":"    }"},
{"lineNum":"  190","line":""},
{"lineNum":"  191","line":"    pub fn compileProgramNode(self: *Compiler, nd: Node) !void {","class":"lineCov","hits":"2","order":"3100","possible_hits":"2",},
{"lineNum":"  192","line":"        std.debug.assert(nd.getType() == .Program);","class":"lineCov","hits":"1","order":"3101","possible_hits":"1",},
{"lineNum":"  193","line":""},
{"lineNum":"  194","line":"        try self.backend.prolog();","class":"lineCov","hits":"1","order":"3102","possible_hits":"1",},
{"lineNum":"  195","line":""},
{"lineNum":"  196","line":"        for (nd.data.Program.items) |child| {","class":"lineCov","hits":"3","order":"3104","possible_hits":"3",},
{"lineNum":"  197","line":"            self.processNode(child);","class":"lineCov","hits":"1","order":"3105","possible_hits":"1",},
{"lineNum":"  198","line":"            if (!self.hasErrors())","class":"lineCov","hits":"2","order":"3134","possible_hits":"2",},
{"lineNum":"  199","line":"                try self.backend.processNode(child);","class":"lineCov","hits":"1","order":"3137","possible_hits":"1",},
{"lineNum":"  200","line":"        }"},
{"lineNum":"  201","line":""},
{"lineNum":"  202","line":"        try self.backend.epilog();","class":"lineCov","hits":"1","order":"3155","possible_hits":"1",},
{"lineNum":"  203","line":"    }"},
{"lineNum":"  204","line":""},
{"lineNum":"  205","line":"    pub fn compile(self: *Compiler, driver: anytype, path: []const u8) !void {","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"  206","line":"        var arena = Arena.init(self.alloc);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  207","line":"        defer arena.deinit();","class":"lineNoCov","hits":"0","possible_hits":"5",},
{"lineNum":"  208","line":""},
{"lineNum":"  209","line":"        const file = try driver.parseFile(&arena, path);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  210","line":""},
{"lineNum":"  211","line":"        const nd = switch (file.res) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  212","line":"            .Success => |node| node,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  213","line":"            .Error => |err| {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  214","line":"                try self.errors.append(CompileError.parseError(err));","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  215","line":"                return;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  216","line":"            },"},
{"lineNum":"  217","line":"            .NoMatch => std.debug.panic(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  218","line":"                \"parseFile should never return NoMatch\","},
{"lineNum":"  219","line":"                .{},"},
{"lineNum":"  220","line":"            ),"},
{"lineNum":"  221","line":"        };"},
{"lineNum":"  222","line":""},
{"lineNum":"  223","line":"        try self.compileProgramNode(nd);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  224","line":"    }"},
{"lineNum":"  225","line":"};"},
{"lineNum":"  226","line":""},
{"lineNum":"  227","line":"test \"can push and pop compiler scopes\" {","class":"lineCov","hits":"3","order":"142","possible_hits":"3",},
{"lineNum":"  228","line":"    const config = Config{};"},
{"lineNum":"  229","line":"    var backend = NopBackend.new();","class":"lineCov","hits":"1","order":"143","possible_hits":"1",},
{"lineNum":"  230","line":""},
{"lineNum":"  231","line":"    var compiler = Compiler.new(","class":"lineCov","hits":"1","order":"150","possible_hits":"1",},
{"lineNum":"  232","line":"        std.testing.allocator,"},
{"lineNum":"  233","line":"        &config,"},
{"lineNum":"  234","line":"        &backend.backend,"},
{"lineNum":"  235","line":"    );"},
{"lineNum":"  236","line":"    defer compiler.deinit();","class":"linePartCov","hits":"1","order":"297","possible_hits":"6",},
{"lineNum":"  237","line":""},
{"lineNum":"  238","line":"    const first = compiler.scope;","class":"lineCov","hits":"1","order":"274","possible_hits":"1",},
{"lineNum":"  239","line":"    try expect(first.parent == null);","class":"linePartCov","hits":"1","order":"275","possible_hits":"2",},
{"lineNum":"  240","line":""},
{"lineNum":"  241","line":"    compiler.pushScope();","class":"lineCov","hits":"1","order":"276","possible_hits":"1",},
{"lineNum":"  242","line":""},
{"lineNum":"  243","line":"    const second = compiler.scope;","class":"lineCov","hits":"1","order":"279","possible_hits":"1",},
{"lineNum":"  244","line":"    try expect(first != second);","class":"linePartCov","hits":"1","order":"280","possible_hits":"2",},
{"lineNum":"  245","line":"    try expectEqual(first, second.parent.?);","class":"linePartCov","hits":"1","order":"281","possible_hits":"3",},
{"lineNum":"  246","line":""},
{"lineNum":"  247","line":"    compiler.popScope();","class":"lineCov","hits":"1","order":"282","possible_hits":"1",},
{"lineNum":"  248","line":""},
{"lineNum":"  249","line":"    const third = compiler.scope;","class":"lineCov","hits":"1","order":"294","possible_hits":"1",},
{"lineNum":"  250","line":"    try expectEqual(first, third);","class":"linePartCov","hits":"1","order":"295","possible_hits":"2",},
{"lineNum":"  251","line":"    try expect(third.parent == null);","class":"linePartCov","hits":"1","order":"296","possible_hits":"2",},
{"lineNum":"  252","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2021-12-30 12:25:10", "instrumented" : 105, "covered" : 90,};
var merged_data = [];
