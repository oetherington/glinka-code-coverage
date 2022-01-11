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
{"lineNum":"   25","line":"const node = @import(\"../common/node.zig\");"},
{"lineNum":"   26","line":"const Node = node.Node;"},
{"lineNum":"   27","line":"const Backend = @import(\"../common/backend.zig\").Backend;"},
{"lineNum":"   28","line":"const Scope = @import(\"scope.zig\").Scope;"},
{"lineNum":"   29","line":"const Type = @import(\"../common/types/type.zig\").Type;"},
{"lineNum":"   30","line":"const TypeBook = @import(\"typebook.zig\").TypeBook;"},
{"lineNum":"   31","line":"const TypeError = @import(\"errors/type_error.zig\").TypeError;"},
{"lineNum":"   32","line":"const implicitAnyError = @import(\"errors/implicit_any_error.zig\");"},
{"lineNum":"   33","line":"const ImplicitAnyError = implicitAnyError.ImplicitAnyError;"},
{"lineNum":"   34","line":"const CompileError = @import(\"errors/compile_error.zig\").CompileError;"},
{"lineNum":"   35","line":"const ErrorContext = @import(\"errors/error_context.zig\").ErrorContext;"},
{"lineNum":"   36","line":"const inferrer = @import(\"inferrer.zig\");"},
{"lineNum":"   37","line":"const typeFinder = @import(\"type_finder.zig\");"},
{"lineNum":"   38","line":"const expression = @import(\"expression.zig\");"},
{"lineNum":"   39","line":"const block = @import(\"block.zig\");"},
{"lineNum":"   40","line":"const declaration = @import(\"declaration.zig\");"},
{"lineNum":"   41","line":"const conditional = @import(\"conditional.zig\");"},
{"lineNum":"   42","line":"const loop = @import(\"loop.zig\");"},
{"lineNum":"   43","line":"const throw = @import(\"throw.zig\");"},
{"lineNum":"   44","line":"const function = @import(\"function.zig\");"},
{"lineNum":"   45","line":"const types = @import(\"types.zig\");"},
{"lineNum":"   46","line":"const allocate = @import(\"../common/allocate.zig\");"},
{"lineNum":"   47","line":"const NopBackend = @import(\"compiler_test_case.zig\").NopBackend;"},
{"lineNum":"   48","line":""},
{"lineNum":"   49","line":"pub const Compiler = struct {"},
{"lineNum":"   50","line":"    const StringList = std.ArrayList([]u8);"},
{"lineNum":"   51","line":""},
{"lineNum":"   52","line":"    alloc: Allocator,"},
{"lineNum":"   53","line":"    config: *const Config,"},
{"lineNum":"   54","line":"    backend: *Backend,"},
{"lineNum":"   55","line":"    scope: *Scope,"},
{"lineNum":"   56","line":"    typebook: *TypeBook,"},
{"lineNum":"   57","line":"    errors: ErrorContext,"},
{"lineNum":"   58","line":"    strings: StringList,"},
{"lineNum":"   59","line":""},
{"lineNum":"   60","line":"    pub fn new(","class":"lineCov","hits":"1","order":"151","possible_hits":"1",},
{"lineNum":"   61","line":"        alloc: Allocator,"},
{"lineNum":"   62","line":"        config: *const Config,"},
{"lineNum":"   63","line":"        backend: *Backend,"},
{"lineNum":"   64","line":"    ) Compiler {"},
{"lineNum":"   65","line":"        return Compiler{","class":"lineCov","hits":"1","order":"270","possible_hits":"1",},
{"lineNum":"   66","line":"            .alloc = alloc,","class":"lineCov","hits":"1","order":"152","possible_hits":"1",},
{"lineNum":"   67","line":"            .config = config,","class":"lineCov","hits":"1","order":"153","possible_hits":"1",},
{"lineNum":"   68","line":"            .backend = backend,","class":"lineCov","hits":"1","order":"154","possible_hits":"1",},
{"lineNum":"   69","line":"            .scope = Scope.new(alloc, null),","class":"lineCov","hits":"1","order":"155","possible_hits":"1",},
{"lineNum":"   70","line":"            .typebook = TypeBook.new(alloc),","class":"lineCov","hits":"1","order":"162","possible_hits":"1",},
{"lineNum":"   71","line":"            .errors = ErrorContext.new(alloc),","class":"lineCov","hits":"1","order":"265","possible_hits":"1",},
{"lineNum":"   72","line":"            .strings = StringList.init(alloc),","class":"lineCov","hits":"1","order":"269","possible_hits":"1",},
{"lineNum":"   73","line":"        };"},
{"lineNum":"   74","line":"    }"},
{"lineNum":"   75","line":""},
{"lineNum":"   76","line":"    pub fn deinit(self: *Compiler) void {","class":"lineCov","hits":"2","order":"296","possible_hits":"2",},
{"lineNum":"   77","line":"        std.debug.assert(self.scope.parent == null);","class":"lineCov","hits":"1","order":"297","possible_hits":"1",},
{"lineNum":"   78","line":"        self.scope.deinit();","class":"lineCov","hits":"1","order":"298","possible_hits":"1",},
{"lineNum":"   79","line":""},
{"lineNum":"   80","line":"        self.typebook.deinit();","class":"lineCov","hits":"1","order":"299","possible_hits":"1",},
{"lineNum":"   81","line":""},
{"lineNum":"   82","line":"        self.errors.deinit();","class":"lineCov","hits":"1","order":"308","possible_hits":"1",},
{"lineNum":"   83","line":""},
{"lineNum":"   84","line":"        for (self.strings.items) |string|","class":"lineCov","hits":"2","order":"311","possible_hits":"2",},
{"lineNum":"   85","line":"            self.alloc.free(string);","class":"lineCov","hits":"1","order":"4775","possible_hits":"1",},
{"lineNum":"   86","line":""},
{"lineNum":"   87","line":"        self.strings.deinit();","class":"lineCov","hits":"1","order":"312","possible_hits":"1",},
{"lineNum":"   88","line":"    }"},
{"lineNum":"   89","line":""},
{"lineNum":"   90","line":"    pub fn pushScope(self: *Compiler) void {","class":"lineCov","hits":"2","order":"274","possible_hits":"2",},
{"lineNum":"   91","line":"        self.scope = Scope.new(self.alloc, self.scope);","class":"lineCov","hits":"1","order":"275","possible_hits":"1",},
{"lineNum":"   92","line":"    }"},
{"lineNum":"   93","line":""},
{"lineNum":"   94","line":"    pub fn popScope(self: *Compiler) void {","class":"lineCov","hits":"2","order":"280","possible_hits":"2",},
{"lineNum":"   95","line":"        std.debug.assert(self.scope.parent != null);","class":"lineCov","hits":"1","order":"281","possible_hits":"1",},
{"lineNum":"   96","line":"        var old = self.scope;","class":"lineCov","hits":"1","order":"282","possible_hits":"1",},
{"lineNum":"   97","line":"        self.scope = old.parent.?;","class":"lineCov","hits":"1","order":"283","possible_hits":"1",},
{"lineNum":"   98","line":"        old.deinit();","class":"lineCov","hits":"1","order":"284","possible_hits":"1",},
{"lineNum":"   99","line":"    }"},
{"lineNum":"  100","line":""},
{"lineNum":"  101","line":"    pub fn hasErrors(self: Compiler) bool {","class":"lineCov","hits":"1","order":"4285","possible_hits":"1",},
{"lineNum":"  102","line":"        return self.errors.count() > 0;","class":"lineCov","hits":"1","order":"4286","possible_hits":"1",},
{"lineNum":"  103","line":"    }"},
{"lineNum":"  104","line":""},
{"lineNum":"  105","line":"    pub fn reportErrors(self: Compiler) !void {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  106","line":"        try self.errors.reportToStdErr();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  107","line":"    }"},
{"lineNum":"  108","line":""},
{"lineNum":"  109","line":"    pub fn getError(self: Compiler, index: usize) CompileError {","class":"lineCov","hits":"1","order":"4328","possible_hits":"1",},
{"lineNum":"  110","line":"        return self.errors.list.items[index];","class":"lineCov","hits":"1","order":"4329","possible_hits":"1",},
{"lineNum":"  111","line":"    }"},
{"lineNum":"  112","line":""},
{"lineNum":"  113","line":"    pub fn fmt(","class":"linePartCov","hits":"5","order":"4756","possible_hits":"10",},
{"lineNum":"  114","line":"        self: *Compiler,"},
{"lineNum":"  115","line":"        comptime format: []const u8,"},
{"lineNum":"  116","line":"        args: anytype,"},
{"lineNum":"  117","line":"    ) []u8 {"},
{"lineNum":"  118","line":"        const string = std.fmt.allocPrint(","class":"linePartCov","hits":"5","order":"4759","possible_hits":"10",},
{"lineNum":"  119","line":"            self.alloc,","class":"linePartCov","hits":"5","order":"4757","possible_hits":"10",},
{"lineNum":"  120","line":"            format,"},
{"lineNum":"  121","line":"            args,","class":"linePartCov","hits":"5","order":"4758","possible_hits":"10",},
{"lineNum":"  122","line":"        ) catch allocate.reportAndExit();","class":"linePartCov","hits":"5","order":"4760","possible_hits":"10",},
{"lineNum":"  123","line":"        self.strings.append(string) catch allocate.reportAndExit();","class":"linePartCov","hits":"5","order":"4761","possible_hits":"10",},
{"lineNum":"  124","line":"        return string;","class":"linePartCov","hits":"5","order":"4762","possible_hits":"10",},
{"lineNum":"  125","line":"    }"},
{"lineNum":"  126","line":""},
{"lineNum":"  127","line":"    pub fn implicitAny(","class":"lineCov","hits":"1","order":"4463","possible_hits":"1",},
{"lineNum":"  128","line":"        self: *Compiler,"},
{"lineNum":"  129","line":"        csr: Cursor,"},
{"lineNum":"  130","line":"        symbol: []const u8,"},
{"lineNum":"  131","line":"    ) Type.Ptr {"},
{"lineNum":"  132","line":"        if (self.config.errorOnImplicitAny)","class":"lineCov","hits":"2","order":"4464","possible_hits":"2",},
{"lineNum":"  133","line":"            self.errors.append(CompileError.implicitAnyError(","class":"lineCov","hits":"2","order":"4465","possible_hits":"2",},
{"lineNum":"  134","line":"                ImplicitAnyError.new(csr, symbol),","class":"lineCov","hits":"1","order":"4466","possible_hits":"1",},
{"lineNum":"  135","line":"            )) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"4467","possible_hits":"1",},
{"lineNum":"  136","line":""},
{"lineNum":"  137","line":"        return self.typebook.getAny();","class":"lineCov","hits":"1","order":"4468","possible_hits":"1",},
{"lineNum":"  138","line":"    }"},
{"lineNum":"  139","line":""},
{"lineNum":"  140","line":"    pub fn inferExprType(self: *Compiler, nd: Node) ?Type.Ptr {","class":"lineCov","hits":"1","order":"4268","possible_hits":"1",},
{"lineNum":"  141","line":"        const valTy = inferrer.inferExprType(self, nd);","class":"lineCov","hits":"1","order":"4269","possible_hits":"1",},
{"lineNum":"  142","line":"        switch (valTy) {","class":"linePartCov","hits":"1","order":"4277","possible_hits":"2",},
{"lineNum":"  143","line":"            .Success => |ty| {","class":"lineCov","hits":"1","order":"4278","possible_hits":"1",},
{"lineNum":"  144","line":"                nd.ty = ty;","class":"lineCov","hits":"1","order":"4279","possible_hits":"1",},
{"lineNum":"  145","line":"                return ty;","class":"lineCov","hits":"1","order":"4280","possible_hits":"1",},
{"lineNum":"  146","line":"            },"},
{"lineNum":"  147","line":"            .Error => |err| {","class":"lineCov","hits":"1","order":"4322","possible_hits":"1",},
{"lineNum":"  148","line":"                self.errors.append(err) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"4323","possible_hits":"1",},
{"lineNum":"  149","line":"                return null;","class":"lineCov","hits":"1","order":"4324","possible_hits":"1",},
{"lineNum":"  150","line":"            },"},
{"lineNum":"  151","line":"        }"},
{"lineNum":"  152","line":"    }"},
{"lineNum":"  153","line":""},
{"lineNum":"  154","line":"    pub fn findType(self: *Compiler, nd: Node) ?Type.Ptr {","class":"lineCov","hits":"1","order":"4482","possible_hits":"1",},
{"lineNum":"  155","line":"        return typeFinder.findType(self.scope, self.typebook, nd);","class":"lineCov","hits":"1","order":"4483","possible_hits":"1",},
{"lineNum":"  156","line":"    }"},
{"lineNum":"  157","line":""},
{"lineNum":"  158","line":"    pub fn processNode(self: *Compiler, nd: Node) void {","class":"lineCov","hits":"2","order":"4256","possible_hits":"2",},
{"lineNum":"  159","line":"        switch (nd.data) {","class":"lineCov","hits":"16","order":"4257","possible_hits":"16",},
{"lineNum":"  160","line":"            .PrefixOp,"},
{"lineNum":"  161","line":"            .PostfixOp,"},
{"lineNum":"  162","line":"            .BinaryOp,"},
{"lineNum":"  163","line":"            .Ternary,"},
{"lineNum":"  164","line":"            .Ident,"},
{"lineNum":"  165","line":"            .True,"},
{"lineNum":"  166","line":"            .False,"},
{"lineNum":"  167","line":"            .Null,"},
{"lineNum":"  168","line":"            .Undefined,"},
{"lineNum":"  169","line":"            .Int,"},
{"lineNum":"  170","line":"            .String,"},
{"lineNum":"  171","line":"            .Call,"},
{"lineNum":"  172","line":"            => expression.processExpression(self, nd),","class":"lineCov","hits":"1","order":"4291","possible_hits":"1",},
{"lineNum":"  173","line":"            .Block => block.processBlock(self, nd),","class":"lineCov","hits":"1","order":"4428","possible_hits":"1",},
{"lineNum":"  174","line":"            .Decl => declaration.processDecl(self, nd),","class":"lineCov","hits":"1","order":"4258","possible_hits":"1",},
{"lineNum":"  175","line":"            .If => conditional.processConditional(self, nd),","class":"lineCov","hits":"1","order":"4516","possible_hits":"1",},
{"lineNum":"  176","line":"            .Switch => conditional.processSwitch(self, nd),","class":"lineCov","hits":"1","order":"4540","possible_hits":"1",},
{"lineNum":"  177","line":"            .For => loop.processFor(self, nd),","class":"lineCov","hits":"1","order":"4568","possible_hits":"1",},
{"lineNum":"  178","line":"            .While => loop.processWhile(self, nd),","class":"lineCov","hits":"1","order":"4420","possible_hits":"1",},
{"lineNum":"  179","line":"            .Do => loop.processDo(self, nd),","class":"lineCov","hits":"1","order":"4589","possible_hits":"1",},
{"lineNum":"  180","line":"            .Break => loop.processBreak(self, nd),","class":"lineCov","hits":"1","order":"4553","possible_hits":"1",},
{"lineNum":"  181","line":"            .Continue => loop.processContinue(self, nd),","class":"lineCov","hits":"1","order":"4618","possible_hits":"1",},
{"lineNum":"  182","line":"            .Throw => throw.processThrow(self, nd),","class":"lineCov","hits":"1","order":"4640","possible_hits":"1",},
{"lineNum":"  183","line":"            .Try => throw.processTry(self, nd),","class":"lineCov","hits":"1","order":"4647","possible_hits":"1",},
{"lineNum":"  184","line":"            .Function => function.processFunction(self, nd),","class":"lineCov","hits":"1","order":"4671","possible_hits":"1",},
{"lineNum":"  185","line":"            .Return => function.processReturn(self, nd),","class":"lineCov","hits":"1","order":"4560","possible_hits":"1",},
{"lineNum":"  186","line":"            .Alias => types.processAlias(self, nd),","class":"lineCov","hits":"1","order":"4853","possible_hits":"1",},
{"lineNum":"  187","line":"            .InterfaceType => types.processInterface(self, nd),","class":"lineCov","hits":"1","order":"4879","possible_hits":"1",},
{"lineNum":"  188","line":"            else => std.debug.panic(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  189","line":"                \"Unhandled node type in Compiler.processNode: {?}\\n\","},
{"lineNum":"  190","line":"                .{nd.getType()},","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  191","line":"            ),"},
{"lineNum":"  192","line":"        }"},
{"lineNum":"  193","line":"    }"},
{"lineNum":"  194","line":""},
{"lineNum":"  195","line":"    pub fn compileProgramNode(self: *Compiler, nd: Node) !void {","class":"lineCov","hits":"2","order":"4250","possible_hits":"2",},
{"lineNum":"  196","line":"        std.debug.assert(nd.getType() == .Program);","class":"lineCov","hits":"1","order":"4251","possible_hits":"1",},
{"lineNum":"  197","line":""},
{"lineNum":"  198","line":"        try self.backend.prolog();","class":"lineCov","hits":"1","order":"4252","possible_hits":"1",},
{"lineNum":"  199","line":""},
{"lineNum":"  200","line":"        for (nd.data.Program.items) |child| {","class":"lineCov","hits":"3","order":"4254","possible_hits":"3",},
{"lineNum":"  201","line":"            self.processNode(child);","class":"lineCov","hits":"1","order":"4255","possible_hits":"1",},
{"lineNum":"  202","line":"            if (!self.hasErrors())","class":"lineCov","hits":"2","order":"4284","possible_hits":"2",},
{"lineNum":"  203","line":"                try self.backend.processNode(child);","class":"lineCov","hits":"1","order":"4287","possible_hits":"1",},
{"lineNum":"  204","line":"        }"},
{"lineNum":"  205","line":""},
{"lineNum":"  206","line":"        try self.backend.epilog();","class":"lineCov","hits":"1","order":"4305","possible_hits":"1",},
{"lineNum":"  207","line":"    }"},
{"lineNum":"  208","line":""},
{"lineNum":"  209","line":"    pub fn compile(self: *Compiler, driver: anytype, path: []const u8) !void {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  210","line":"        const file = try driver.parseFile(path);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  211","line":""},
{"lineNum":"  212","line":"        const nd = switch (file.res) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  213","line":"            .Success => |node| node,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  214","line":"            .Error => |err| {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  215","line":"                try self.errors.append(CompileError.parseError(err));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  216","line":"                return;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  217","line":"            },"},
{"lineNum":"  218","line":"            .NoMatch => std.debug.panic(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  219","line":"                \"parseFile should never return NoMatch\","},
{"lineNum":"  220","line":"                .{},"},
{"lineNum":"  221","line":"            ),"},
{"lineNum":"  222","line":"        };"},
{"lineNum":"  223","line":""},
{"lineNum":"  224","line":"        try self.compileProgramNode(nd);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  225","line":"    }"},
{"lineNum":"  226","line":"};"},
{"lineNum":"  227","line":""},
{"lineNum":"  228","line":"test \"can push and pop compiler scopes\" {","class":"lineCov","hits":"3","order":"142","possible_hits":"3",},
{"lineNum":"  229","line":"    const config = Config{};"},
{"lineNum":"  230","line":"    var backend = NopBackend.new();","class":"lineCov","hits":"1","order":"143","possible_hits":"1",},
{"lineNum":"  231","line":""},
{"lineNum":"  232","line":"    var compiler = Compiler.new(","class":"lineCov","hits":"1","order":"150","possible_hits":"1",},
{"lineNum":"  233","line":"        std.testing.allocator,"},
{"lineNum":"  234","line":"        &config,"},
{"lineNum":"  235","line":"        &backend.backend,"},
{"lineNum":"  236","line":"    );"},
{"lineNum":"  237","line":"    defer compiler.deinit();","class":"linePartCov","hits":"1","order":"295","possible_hits":"6",},
{"lineNum":"  238","line":""},
{"lineNum":"  239","line":"    const first = compiler.scope;","class":"lineCov","hits":"1","order":"271","possible_hits":"1",},
{"lineNum":"  240","line":"    try expect(first.parent == null);","class":"linePartCov","hits":"1","order":"272","possible_hits":"2",},
{"lineNum":"  241","line":""},
{"lineNum":"  242","line":"    compiler.pushScope();","class":"lineCov","hits":"1","order":"273","possible_hits":"1",},
{"lineNum":"  243","line":""},
{"lineNum":"  244","line":"    const second = compiler.scope;","class":"lineCov","hits":"1","order":"276","possible_hits":"1",},
{"lineNum":"  245","line":"    try expect(first != second);","class":"linePartCov","hits":"1","order":"277","possible_hits":"2",},
{"lineNum":"  246","line":"    try expectEqual(first, second.parent.?);","class":"linePartCov","hits":"1","order":"278","possible_hits":"3",},
{"lineNum":"  247","line":""},
{"lineNum":"  248","line":"    compiler.popScope();","class":"lineCov","hits":"1","order":"279","possible_hits":"1",},
{"lineNum":"  249","line":""},
{"lineNum":"  250","line":"    const third = compiler.scope;","class":"lineCov","hits":"1","order":"292","possible_hits":"1",},
{"lineNum":"  251","line":"    try expectEqual(first, third);","class":"linePartCov","hits":"1","order":"293","possible_hits":"2",},
{"lineNum":"  252","line":"    try expect(third.parent == null);","class":"linePartCov","hits":"1","order":"294","possible_hits":"2",},
{"lineNum":"  253","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-11 20:42:28", "instrumented" : 105, "covered" : 92,};
var merged_data = [];
