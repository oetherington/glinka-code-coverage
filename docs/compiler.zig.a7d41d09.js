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
{"lineNum":"   44","line":"const types = @import(\"types.zig\");"},
{"lineNum":"   45","line":"const allocate = @import(\"../common/allocate.zig\");"},
{"lineNum":"   46","line":"const NopBackend = @import(\"compiler_test_case.zig\").NopBackend;"},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"pub const Compiler = struct {"},
{"lineNum":"   49","line":"    const StringList = std.ArrayList([]u8);"},
{"lineNum":"   50","line":""},
{"lineNum":"   51","line":"    alloc: Allocator,"},
{"lineNum":"   52","line":"    config: *const Config,"},
{"lineNum":"   53","line":"    backend: *Backend,"},
{"lineNum":"   54","line":"    scope: *Scope,"},
{"lineNum":"   55","line":"    typebook: *TypeBook,"},
{"lineNum":"   56","line":"    errors: ErrorContext,"},
{"lineNum":"   57","line":"    strings: StringList,"},
{"lineNum":"   58","line":""},
{"lineNum":"   59","line":"    pub fn new(","class":"lineCov","hits":"1","order":"151","possible_hits":"1",},
{"lineNum":"   60","line":"        alloc: Allocator,"},
{"lineNum":"   61","line":"        config: *const Config,"},
{"lineNum":"   62","line":"        backend: *Backend,"},
{"lineNum":"   63","line":"    ) Compiler {"},
{"lineNum":"   64","line":"        return Compiler{","class":"lineCov","hits":"1","order":"270","possible_hits":"1",},
{"lineNum":"   65","line":"            .alloc = alloc,","class":"lineCov","hits":"1","order":"152","possible_hits":"1",},
{"lineNum":"   66","line":"            .config = config,","class":"lineCov","hits":"1","order":"153","possible_hits":"1",},
{"lineNum":"   67","line":"            .backend = backend,","class":"lineCov","hits":"1","order":"154","possible_hits":"1",},
{"lineNum":"   68","line":"            .scope = Scope.new(alloc, null),","class":"lineCov","hits":"1","order":"155","possible_hits":"1",},
{"lineNum":"   69","line":"            .typebook = TypeBook.new(alloc),","class":"lineCov","hits":"1","order":"162","possible_hits":"1",},
{"lineNum":"   70","line":"            .errors = ErrorContext.new(alloc),","class":"lineCov","hits":"1","order":"265","possible_hits":"1",},
{"lineNum":"   71","line":"            .strings = StringList.init(alloc),","class":"lineCov","hits":"1","order":"269","possible_hits":"1",},
{"lineNum":"   72","line":"        };"},
{"lineNum":"   73","line":"    }"},
{"lineNum":"   74","line":""},
{"lineNum":"   75","line":"    pub fn deinit(self: *Compiler) void {","class":"lineCov","hits":"2","order":"296","possible_hits":"2",},
{"lineNum":"   76","line":"        std.debug.assert(self.scope.parent == null);","class":"lineCov","hits":"1","order":"297","possible_hits":"1",},
{"lineNum":"   77","line":"        self.scope.deinit();","class":"lineCov","hits":"1","order":"298","possible_hits":"1",},
{"lineNum":"   78","line":""},
{"lineNum":"   79","line":"        self.typebook.deinit();","class":"lineCov","hits":"1","order":"299","possible_hits":"1",},
{"lineNum":"   80","line":""},
{"lineNum":"   81","line":"        self.errors.deinit();","class":"lineCov","hits":"1","order":"308","possible_hits":"1",},
{"lineNum":"   82","line":""},
{"lineNum":"   83","line":"        for (self.strings.items) |string|","class":"lineCov","hits":"2","order":"311","possible_hits":"2",},
{"lineNum":"   84","line":"            self.alloc.free(string);","class":"lineCov","hits":"1","order":"4543","possible_hits":"1",},
{"lineNum":"   85","line":""},
{"lineNum":"   86","line":"        self.strings.deinit();","class":"lineCov","hits":"1","order":"312","possible_hits":"1",},
{"lineNum":"   87","line":"    }"},
{"lineNum":"   88","line":""},
{"lineNum":"   89","line":"    pub fn pushScope(self: *Compiler) void {","class":"lineCov","hits":"2","order":"274","possible_hits":"2",},
{"lineNum":"   90","line":"        self.scope = Scope.new(self.alloc, self.scope);","class":"lineCov","hits":"1","order":"275","possible_hits":"1",},
{"lineNum":"   91","line":"    }"},
{"lineNum":"   92","line":""},
{"lineNum":"   93","line":"    pub fn popScope(self: *Compiler) void {","class":"lineCov","hits":"2","order":"280","possible_hits":"2",},
{"lineNum":"   94","line":"        std.debug.assert(self.scope.parent != null);","class":"lineCov","hits":"1","order":"281","possible_hits":"1",},
{"lineNum":"   95","line":"        var old = self.scope;","class":"lineCov","hits":"1","order":"282","possible_hits":"1",},
{"lineNum":"   96","line":"        self.scope = old.parent.?;","class":"lineCov","hits":"1","order":"283","possible_hits":"1",},
{"lineNum":"   97","line":"        old.deinit();","class":"lineCov","hits":"1","order":"284","possible_hits":"1",},
{"lineNum":"   98","line":"    }"},
{"lineNum":"   99","line":""},
{"lineNum":"  100","line":"    pub fn hasErrors(self: Compiler) bool {","class":"lineCov","hits":"1","order":"4074","possible_hits":"1",},
{"lineNum":"  101","line":"        return self.errors.count() > 0;","class":"lineCov","hits":"1","order":"4075","possible_hits":"1",},
{"lineNum":"  102","line":"    }"},
{"lineNum":"  103","line":""},
{"lineNum":"  104","line":"    pub fn reportErrors(self: Compiler) !void {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  105","line":"        try self.errors.reportToStdErr();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  106","line":"    }"},
{"lineNum":"  107","line":""},
{"lineNum":"  108","line":"    pub fn getError(self: Compiler, index: usize) CompileError {","class":"lineCov","hits":"1","order":"4117","possible_hits":"1",},
{"lineNum":"  109","line":"        return self.errors.list.items[index];","class":"lineCov","hits":"1","order":"4118","possible_hits":"1",},
{"lineNum":"  110","line":"    }"},
{"lineNum":"  111","line":""},
{"lineNum":"  112","line":"    pub fn fmt(","class":"linePartCov","hits":"5","order":"4524","possible_hits":"8",},
{"lineNum":"  113","line":"        self: *Compiler,"},
{"lineNum":"  114","line":"        comptime format: []const u8,"},
{"lineNum":"  115","line":"        args: anytype,"},
{"lineNum":"  116","line":"    ) []u8 {"},
{"lineNum":"  117","line":"        const string = std.fmt.allocPrint(","class":"linePartCov","hits":"5","order":"4527","possible_hits":"8",},
{"lineNum":"  118","line":"            self.alloc,","class":"linePartCov","hits":"5","order":"4525","possible_hits":"8",},
{"lineNum":"  119","line":"            format,"},
{"lineNum":"  120","line":"            args,","class":"linePartCov","hits":"5","order":"4526","possible_hits":"8",},
{"lineNum":"  121","line":"        ) catch allocate.reportAndExit();","class":"linePartCov","hits":"5","order":"4528","possible_hits":"8",},
{"lineNum":"  122","line":"        self.strings.append(string) catch allocate.reportAndExit();","class":"linePartCov","hits":"5","order":"4529","possible_hits":"8",},
{"lineNum":"  123","line":"        return string;","class":"linePartCov","hits":"5","order":"4530","possible_hits":"8",},
{"lineNum":"  124","line":"    }"},
{"lineNum":"  125","line":""},
{"lineNum":"  126","line":"    pub fn implicitAny(","class":"lineCov","hits":"1","order":"4252","possible_hits":"1",},
{"lineNum":"  127","line":"        self: *Compiler,"},
{"lineNum":"  128","line":"        csr: Cursor,"},
{"lineNum":"  129","line":"        symbol: []const u8,"},
{"lineNum":"  130","line":"    ) Type.Ptr {"},
{"lineNum":"  131","line":"        if (self.config.errorOnImplicitAny)","class":"lineCov","hits":"2","order":"4253","possible_hits":"2",},
{"lineNum":"  132","line":"            self.errors.append(CompileError.implicitAnyError(","class":"lineCov","hits":"2","order":"4254","possible_hits":"2",},
{"lineNum":"  133","line":"                ImplicitAnyError.new(csr, symbol),","class":"lineCov","hits":"1","order":"4255","possible_hits":"1",},
{"lineNum":"  134","line":"            )) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"4256","possible_hits":"1",},
{"lineNum":"  135","line":""},
{"lineNum":"  136","line":"        return self.typebook.getAny();","class":"lineCov","hits":"1","order":"4257","possible_hits":"1",},
{"lineNum":"  137","line":"    }"},
{"lineNum":"  138","line":""},
{"lineNum":"  139","line":"    pub fn inferExprType(self: *Compiler, nd: Node) ?Type.Ptr {","class":"lineCov","hits":"1","order":"4057","possible_hits":"1",},
{"lineNum":"  140","line":"        const valTy = inferrer.inferExprType(self, nd);","class":"lineCov","hits":"1","order":"4058","possible_hits":"1",},
{"lineNum":"  141","line":"        switch (valTy) {","class":"linePartCov","hits":"1","order":"4066","possible_hits":"2",},
{"lineNum":"  142","line":"            .Success => |ty| {","class":"lineCov","hits":"1","order":"4067","possible_hits":"1",},
{"lineNum":"  143","line":"                nd.ty = ty;","class":"lineCov","hits":"1","order":"4068","possible_hits":"1",},
{"lineNum":"  144","line":"                return ty;","class":"lineCov","hits":"1","order":"4069","possible_hits":"1",},
{"lineNum":"  145","line":"            },"},
{"lineNum":"  146","line":"            .Error => |err| {","class":"lineCov","hits":"1","order":"4111","possible_hits":"1",},
{"lineNum":"  147","line":"                self.errors.append(err) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"4112","possible_hits":"1",},
{"lineNum":"  148","line":"                return null;","class":"lineCov","hits":"1","order":"4113","possible_hits":"1",},
{"lineNum":"  149","line":"            },"},
{"lineNum":"  150","line":"        }"},
{"lineNum":"  151","line":"    }"},
{"lineNum":"  152","line":""},
{"lineNum":"  153","line":"    pub fn findType(self: *Compiler, nd: Node) ?Type.Ptr {","class":"lineCov","hits":"1","order":"4271","possible_hits":"1",},
{"lineNum":"  154","line":"        return typeFinder.findType(self.scope, self.typebook, nd);","class":"lineCov","hits":"1","order":"4272","possible_hits":"1",},
{"lineNum":"  155","line":"    }"},
{"lineNum":"  156","line":""},
{"lineNum":"  157","line":"    pub fn processNode(self: *Compiler, nd: Node) void {","class":"lineCov","hits":"2","order":"4045","possible_hits":"2",},
{"lineNum":"  158","line":"        switch (nd.data) {","class":"lineCov","hits":"15","order":"4046","possible_hits":"15",},
{"lineNum":"  159","line":"            .PrefixOp,"},
{"lineNum":"  160","line":"            .PostfixOp,"},
{"lineNum":"  161","line":"            .BinaryOp,"},
{"lineNum":"  162","line":"            .Ternary,"},
{"lineNum":"  163","line":"            .Ident,"},
{"lineNum":"  164","line":"            .True,"},
{"lineNum":"  165","line":"            .False,"},
{"lineNum":"  166","line":"            .Null,"},
{"lineNum":"  167","line":"            .Undefined,"},
{"lineNum":"  168","line":"            .Int,"},
{"lineNum":"  169","line":"            .String,"},
{"lineNum":"  170","line":"            .Call,"},
{"lineNum":"  171","line":"            => expression.processExpression(self, nd),","class":"lineCov","hits":"1","order":"4080","possible_hits":"1",},
{"lineNum":"  172","line":"            .Block => block.processBlock(self, nd),","class":"lineCov","hits":"1","order":"4217","possible_hits":"1",},
{"lineNum":"  173","line":"            .Decl => declaration.processDecl(self, nd),","class":"lineCov","hits":"1","order":"4047","possible_hits":"1",},
{"lineNum":"  174","line":"            .If => conditional.processConditional(self, nd),","class":"lineCov","hits":"1","order":"4305","possible_hits":"1",},
{"lineNum":"  175","line":"            .Switch => conditional.processSwitch(self, nd),","class":"lineCov","hits":"1","order":"4329","possible_hits":"1",},
{"lineNum":"  176","line":"            .For => loop.processFor(self, nd),","class":"lineCov","hits":"1","order":"4357","possible_hits":"1",},
{"lineNum":"  177","line":"            .While => loop.processWhile(self, nd),","class":"lineCov","hits":"1","order":"4209","possible_hits":"1",},
{"lineNum":"  178","line":"            .Do => loop.processDo(self, nd),","class":"lineCov","hits":"1","order":"4378","possible_hits":"1",},
{"lineNum":"  179","line":"            .Break => loop.processBreak(self, nd),","class":"lineCov","hits":"1","order":"4342","possible_hits":"1",},
{"lineNum":"  180","line":"            .Continue => loop.processContinue(self, nd),","class":"lineCov","hits":"1","order":"4407","possible_hits":"1",},
{"lineNum":"  181","line":"            .Throw => throw.processThrow(self, nd),","class":"lineCov","hits":"1","order":"4429","possible_hits":"1",},
{"lineNum":"  182","line":"            .Try => throw.processTry(self, nd),","class":"lineCov","hits":"1","order":"4436","possible_hits":"1",},
{"lineNum":"  183","line":"            .Function => function.processFunction(self, nd),","class":"lineCov","hits":"1","order":"4460","possible_hits":"1",},
{"lineNum":"  184","line":"            .Return => function.processReturn(self, nd),","class":"lineCov","hits":"1","order":"4349","possible_hits":"1",},
{"lineNum":"  185","line":"            .Alias => types.processAlias(self, nd),","class":"lineCov","hits":"1","order":"4621","possible_hits":"1",},
{"lineNum":"  186","line":"            else => std.debug.panic(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  187","line":"                \"Unhandled node type in Compiler.processNode: {?}\\n\","},
{"lineNum":"  188","line":"                .{nd.getType()},","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  189","line":"            ),"},
{"lineNum":"  190","line":"        }"},
{"lineNum":"  191","line":"    }"},
{"lineNum":"  192","line":""},
{"lineNum":"  193","line":"    pub fn compileProgramNode(self: *Compiler, nd: Node) !void {","class":"lineCov","hits":"2","order":"4039","possible_hits":"2",},
{"lineNum":"  194","line":"        std.debug.assert(nd.getType() == .Program);","class":"lineCov","hits":"1","order":"4040","possible_hits":"1",},
{"lineNum":"  195","line":""},
{"lineNum":"  196","line":"        try self.backend.prolog();","class":"lineCov","hits":"1","order":"4041","possible_hits":"1",},
{"lineNum":"  197","line":""},
{"lineNum":"  198","line":"        for (nd.data.Program.items) |child| {","class":"lineCov","hits":"3","order":"4043","possible_hits":"3",},
{"lineNum":"  199","line":"            self.processNode(child);","class":"lineCov","hits":"1","order":"4044","possible_hits":"1",},
{"lineNum":"  200","line":"            if (!self.hasErrors())","class":"lineCov","hits":"2","order":"4073","possible_hits":"2",},
{"lineNum":"  201","line":"                try self.backend.processNode(child);","class":"lineCov","hits":"1","order":"4076","possible_hits":"1",},
{"lineNum":"  202","line":"        }"},
{"lineNum":"  203","line":""},
{"lineNum":"  204","line":"        try self.backend.epilog();","class":"lineCov","hits":"1","order":"4094","possible_hits":"1",},
{"lineNum":"  205","line":"    }"},
{"lineNum":"  206","line":""},
{"lineNum":"  207","line":"    pub fn compile(self: *Compiler, driver: anytype, path: []const u8) !void {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  208","line":"        const file = try driver.parseFile(path);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  209","line":""},
{"lineNum":"  210","line":"        const nd = switch (file.res) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  211","line":"            .Success => |node| node,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  212","line":"            .Error => |err| {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  213","line":"                try self.errors.append(CompileError.parseError(err));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  214","line":"                return;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  215","line":"            },"},
{"lineNum":"  216","line":"            .NoMatch => std.debug.panic(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  217","line":"                \"parseFile should never return NoMatch\","},
{"lineNum":"  218","line":"                .{},"},
{"lineNum":"  219","line":"            ),"},
{"lineNum":"  220","line":"        };"},
{"lineNum":"  221","line":""},
{"lineNum":"  222","line":"        try self.compileProgramNode(nd);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  223","line":"    }"},
{"lineNum":"  224","line":"};"},
{"lineNum":"  225","line":""},
{"lineNum":"  226","line":"test \"can push and pop compiler scopes\" {","class":"lineCov","hits":"3","order":"142","possible_hits":"3",},
{"lineNum":"  227","line":"    const config = Config{};"},
{"lineNum":"  228","line":"    var backend = NopBackend.new();","class":"lineCov","hits":"1","order":"143","possible_hits":"1",},
{"lineNum":"  229","line":""},
{"lineNum":"  230","line":"    var compiler = Compiler.new(","class":"lineCov","hits":"1","order":"150","possible_hits":"1",},
{"lineNum":"  231","line":"        std.testing.allocator,"},
{"lineNum":"  232","line":"        &config,"},
{"lineNum":"  233","line":"        &backend.backend,"},
{"lineNum":"  234","line":"    );"},
{"lineNum":"  235","line":"    defer compiler.deinit();","class":"linePartCov","hits":"1","order":"295","possible_hits":"6",},
{"lineNum":"  236","line":""},
{"lineNum":"  237","line":"    const first = compiler.scope;","class":"lineCov","hits":"1","order":"271","possible_hits":"1",},
{"lineNum":"  238","line":"    try expect(first.parent == null);","class":"linePartCov","hits":"1","order":"272","possible_hits":"2",},
{"lineNum":"  239","line":""},
{"lineNum":"  240","line":"    compiler.pushScope();","class":"lineCov","hits":"1","order":"273","possible_hits":"1",},
{"lineNum":"  241","line":""},
{"lineNum":"  242","line":"    const second = compiler.scope;","class":"lineCov","hits":"1","order":"276","possible_hits":"1",},
{"lineNum":"  243","line":"    try expect(first != second);","class":"linePartCov","hits":"1","order":"277","possible_hits":"2",},
{"lineNum":"  244","line":"    try expectEqual(first, second.parent.?);","class":"linePartCov","hits":"1","order":"278","possible_hits":"3",},
{"lineNum":"  245","line":""},
{"lineNum":"  246","line":"    compiler.popScope();","class":"lineCov","hits":"1","order":"279","possible_hits":"1",},
{"lineNum":"  247","line":""},
{"lineNum":"  248","line":"    const third = compiler.scope;","class":"lineCov","hits":"1","order":"292","possible_hits":"1",},
{"lineNum":"  249","line":"    try expectEqual(first, third);","class":"linePartCov","hits":"1","order":"293","possible_hits":"2",},
{"lineNum":"  250","line":"    try expect(third.parent == null);","class":"linePartCov","hits":"1","order":"294","possible_hits":"2",},
{"lineNum":"  251","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-06 20:58:47", "instrumented" : 104, "covered" : 91,};
var merged_data = [];
