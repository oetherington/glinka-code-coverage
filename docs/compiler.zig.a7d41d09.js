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
{"lineNum":"   36","line":"const inferrer = @import(\"inferrer/inferrer.zig\");"},
{"lineNum":"   37","line":"const InferContext = @import(\"inferrer/infer_context.zig\").InferContext;"},
{"lineNum":"   38","line":"const typeFinder = @import(\"type_finder.zig\");"},
{"lineNum":"   39","line":"const expression = @import(\"expression.zig\");"},
{"lineNum":"   40","line":"const block = @import(\"block.zig\");"},
{"lineNum":"   41","line":"const declaration = @import(\"declaration.zig\");"},
{"lineNum":"   42","line":"const conditional = @import(\"conditional.zig\");"},
{"lineNum":"   43","line":"const loop = @import(\"loop.zig\");"},
{"lineNum":"   44","line":"const throw = @import(\"throw.zig\");"},
{"lineNum":"   45","line":"const function = @import(\"function.zig\");"},
{"lineNum":"   46","line":"const types = @import(\"types.zig\");"},
{"lineNum":"   47","line":"const allocate = @import(\"../common/allocate.zig\");"},
{"lineNum":"   48","line":"const NopBackend = @import(\"compiler_test_case.zig\").NopBackend;"},
{"lineNum":"   49","line":""},
{"lineNum":"   50","line":"pub const Compiler = struct {"},
{"lineNum":"   51","line":"    const StringList = std.ArrayList([]u8);"},
{"lineNum":"   52","line":""},
{"lineNum":"   53","line":"    alloc: Allocator,"},
{"lineNum":"   54","line":"    config: *const Config,"},
{"lineNum":"   55","line":"    backend: *Backend,"},
{"lineNum":"   56","line":"    scope: *Scope,"},
{"lineNum":"   57","line":"    typebook: *TypeBook,"},
{"lineNum":"   58","line":"    errors: ErrorContext,"},
{"lineNum":"   59","line":"    strings: StringList,"},
{"lineNum":"   60","line":""},
{"lineNum":"   61","line":"    pub fn new(","class":"lineCov","hits":"1","order":"1828","possible_hits":"1",},
{"lineNum":"   62","line":"        alloc: Allocator,"},
{"lineNum":"   63","line":"        config: *const Config,"},
{"lineNum":"   64","line":"        backend: *Backend,"},
{"lineNum":"   65","line":"    ) Compiler {"},
{"lineNum":"   66","line":"        var cmp = Compiler{"},
{"lineNum":"   67","line":"            .alloc = alloc,","class":"lineCov","hits":"1","order":"1829","possible_hits":"1",},
{"lineNum":"   68","line":"            .config = config,","class":"lineCov","hits":"1","order":"1830","possible_hits":"1",},
{"lineNum":"   69","line":"            .backend = backend,","class":"lineCov","hits":"1","order":"1831","possible_hits":"1",},
{"lineNum":"   70","line":"            .scope = Scope.new(alloc, null),","class":"lineCov","hits":"1","order":"1832","possible_hits":"1",},
{"lineNum":"   71","line":"            .typebook = TypeBook.new(alloc),","class":"lineCov","hits":"1","order":"1840","possible_hits":"1",},
{"lineNum":"   72","line":"            .errors = ErrorContext.new(alloc),","class":"lineCov","hits":"1","order":"1946","possible_hits":"1",},
{"lineNum":"   73","line":"            .strings = StringList.init(alloc),","class":"lineCov","hits":"1","order":"1950","possible_hits":"1",},
{"lineNum":"   74","line":"        };"},
{"lineNum":"   75","line":""},
{"lineNum":"   76","line":"        cmp.loadGlobalDefinitions();","class":"lineCov","hits":"1","order":"1951","possible_hits":"1",},
{"lineNum":"   77","line":""},
{"lineNum":"   78","line":"        return cmp;","class":"lineCov","hits":"1","order":"2003","possible_hits":"1",},
{"lineNum":"   79","line":"    }"},
{"lineNum":"   80","line":""},
{"lineNum":"   81","line":"    pub fn deinit(self: *Compiler) void {","class":"lineCov","hits":"2","order":"2029","possible_hits":"2",},
{"lineNum":"   82","line":"        std.debug.assert(self.scope.parent == null);","class":"lineCov","hits":"1","order":"2030","possible_hits":"1",},
{"lineNum":"   83","line":"        self.scope.deinit();","class":"lineCov","hits":"1","order":"2031","possible_hits":"1",},
{"lineNum":"   84","line":""},
{"lineNum":"   85","line":"        self.typebook.deinit();","class":"lineCov","hits":"1","order":"2032","possible_hits":"1",},
{"lineNum":"   86","line":""},
{"lineNum":"   87","line":"        self.errors.deinit();","class":"lineCov","hits":"1","order":"2043","possible_hits":"1",},
{"lineNum":"   88","line":""},
{"lineNum":"   89","line":"        for (self.strings.items) |string|","class":"lineCov","hits":"2","order":"2046","possible_hits":"2",},
{"lineNum":"   90","line":"            self.alloc.free(string);","class":"lineCov","hits":"1","order":"3535","possible_hits":"1",},
{"lineNum":"   91","line":""},
{"lineNum":"   92","line":"        self.strings.deinit();","class":"lineCov","hits":"1","order":"2047","possible_hits":"1",},
{"lineNum":"   93","line":"    }"},
{"lineNum":"   94","line":""},
{"lineNum":"   95","line":"    // TODO: This should eventually be read from more formal definition files"},
{"lineNum":"   96","line":"    fn loadGlobalDefinitions(self: *Compiler) void {","class":"lineCov","hits":"2","order":"1952","possible_hits":"2",},
{"lineNum":"   97","line":"        // TODO: Update this when variadic functions are implemented"},
{"lineNum":"   98","line":"        const consoleLogTy = self.typebook.getFunction(","class":"lineCov","hits":"2","order":"1953","possible_hits":"2",},
{"lineNum":"   99","line":"            self.typebook.getVoid(),","class":"lineCov","hits":"1","order":"1954","possible_hits":"1",},
{"lineNum":"  100","line":"            &[_]Type.Ptr{self.typebook.getAny()},","class":"lineCov","hits":"1","order":"1957","possible_hits":"1",},
{"lineNum":"  101","line":"            false,"},
{"lineNum":"  102","line":"        );"},
{"lineNum":"  103","line":"        const consoleTy = self.typebook.getInterface(","class":"lineCov","hits":"2","order":"1971","possible_hits":"2",},
{"lineNum":"  104","line":"            &[_]Type.InterfaceType.Member{","class":"lineCov","hits":"1","order":"1974","possible_hits":"1",},
{"lineNum":"  105","line":"                Type.InterfaceType.Member{"},
{"lineNum":"  106","line":"                    .name = \"log\",","class":"lineCov","hits":"1","order":"1973","possible_hits":"1",},
{"lineNum":"  107","line":"                    .ty = consoleLogTy,","class":"lineCov","hits":"1","order":"1972","possible_hits":"1",},
{"lineNum":"  108","line":"                },"},
{"lineNum":"  109","line":"            },"},
{"lineNum":"  110","line":"        );"},
{"lineNum":"  111","line":"        self.scope.put(\"console\", consoleTy, true, Cursor.new(0, 0));","class":"lineCov","hits":"1","order":"1989","possible_hits":"1",},
{"lineNum":"  112","line":"    }"},
{"lineNum":"  113","line":""},
{"lineNum":"  114","line":"    pub fn pushScope(self: *Compiler) void {","class":"lineCov","hits":"2","order":"2007","possible_hits":"2",},
{"lineNum":"  115","line":"        self.scope = Scope.new(self.alloc, self.scope);","class":"lineCov","hits":"1","order":"2008","possible_hits":"1",},
{"lineNum":"  116","line":"    }"},
{"lineNum":"  117","line":""},
{"lineNum":"  118","line":"    pub fn popScope(self: *Compiler) void {","class":"lineCov","hits":"2","order":"2013","possible_hits":"2",},
{"lineNum":"  119","line":"        std.debug.assert(self.scope.parent != null);","class":"lineCov","hits":"1","order":"2014","possible_hits":"1",},
{"lineNum":"  120","line":"        var old = self.scope;","class":"lineCov","hits":"1","order":"2015","possible_hits":"1",},
{"lineNum":"  121","line":"        self.scope = old.parent.?;","class":"lineCov","hits":"1","order":"2016","possible_hits":"1",},
{"lineNum":"  122","line":"        old.deinit();","class":"lineCov","hits":"1","order":"2017","possible_hits":"1",},
{"lineNum":"  123","line":"    }"},
{"lineNum":"  124","line":""},
{"lineNum":"  125","line":"    pub fn hasErrors(self: Compiler) bool {","class":"lineCov","hits":"1","order":"3182","possible_hits":"1",},
{"lineNum":"  126","line":"        return self.errors.count() > 0;","class":"lineCov","hits":"1","order":"3183","possible_hits":"1",},
{"lineNum":"  127","line":"    }"},
{"lineNum":"  128","line":""},
{"lineNum":"  129","line":"    pub fn reportErrors(self: Compiler) !void {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  130","line":"        try self.errors.reportToStdErr();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  131","line":"    }"},
{"lineNum":"  132","line":""},
{"lineNum":"  133","line":"    pub fn getError(self: Compiler, index: usize) CompileError {","class":"lineCov","hits":"1","order":"3527","possible_hits":"1",},
{"lineNum":"  134","line":"        return self.errors.list.items[index];","class":"lineCov","hits":"1","order":"3528","possible_hits":"1",},
{"lineNum":"  135","line":"    }"},
{"lineNum":"  136","line":""},
{"lineNum":"  137","line":"    pub fn fmt(","class":"linePartCov","hits":"10","order":"3516","possible_hits":"21",},
{"lineNum":"  138","line":"        self: *Compiler,"},
{"lineNum":"  139","line":"        comptime format: []const u8,"},
{"lineNum":"  140","line":"        args: anytype,"},
{"lineNum":"  141","line":"    ) []u8 {"},
{"lineNum":"  142","line":"        const string = std.fmt.allocPrint(","class":"linePartCov","hits":"10","order":"3519","possible_hits":"21",},
{"lineNum":"  143","line":"            self.alloc,","class":"linePartCov","hits":"10","order":"3517","possible_hits":"21",},
{"lineNum":"  144","line":"            format,"},
{"lineNum":"  145","line":"            args,","class":"linePartCov","hits":"10","order":"3518","possible_hits":"20",},
{"lineNum":"  146","line":"        ) catch allocate.reportAndExit();","class":"linePartCov","hits":"10","order":"3520","possible_hits":"21",},
{"lineNum":"  147","line":"        self.strings.append(string) catch allocate.reportAndExit();","class":"linePartCov","hits":"10","order":"3521","possible_hits":"21",},
{"lineNum":"  148","line":"        return string;","class":"linePartCov","hits":"10","order":"3522","possible_hits":"21",},
{"lineNum":"  149","line":"    }"},
{"lineNum":"  150","line":""},
{"lineNum":"  151","line":"    pub fn implicitAny(","class":"lineCov","hits":"1","order":"5288","possible_hits":"1",},
{"lineNum":"  152","line":"        self: *Compiler,"},
{"lineNum":"  153","line":"        csr: Cursor,"},
{"lineNum":"  154","line":"        symbol: []const u8,"},
{"lineNum":"  155","line":"    ) Type.Ptr {"},
{"lineNum":"  156","line":"        if (self.config.errorOnImplicitAny)","class":"lineCov","hits":"2","order":"5289","possible_hits":"2",},
{"lineNum":"  157","line":"            self.errors.append(CompileError.implicitAnyError(","class":"lineCov","hits":"2","order":"5290","possible_hits":"2",},
{"lineNum":"  158","line":"                ImplicitAnyError.new(csr, symbol),","class":"lineCov","hits":"1","order":"5291","possible_hits":"1",},
{"lineNum":"  159","line":"            )) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"5292","possible_hits":"1",},
{"lineNum":"  160","line":""},
{"lineNum":"  161","line":"        return self.typebook.getAny();","class":"lineCov","hits":"1","order":"5293","possible_hits":"1",},
{"lineNum":"  162","line":"    }"},
{"lineNum":"  163","line":""},
{"lineNum":"  164","line":"    pub fn inferExprType(self: *Compiler, nd: Node) ?Type.Ptr {","class":"lineCov","hits":"1","order":"3287","possible_hits":"1",},
{"lineNum":"  165","line":"        const ctx = InferContext.none(null);","class":"lineCov","hits":"1","order":"3288","possible_hits":"1",},
{"lineNum":"  166","line":"        switch (inferrer.inferExprType(self, nd, &ctx)) {","class":"linePartCov","hits":"1","order":"3293","possible_hits":"2",},
{"lineNum":"  167","line":"            .Success => |ty| {","class":"lineCov","hits":"1","order":"3303","possible_hits":"1",},
{"lineNum":"  168","line":"                nd.ty = ty;","class":"lineCov","hits":"1","order":"3304","possible_hits":"1",},
{"lineNum":"  169","line":"                return ty;","class":"lineCov","hits":"1","order":"3305","possible_hits":"1",},
{"lineNum":"  170","line":"            },"},
{"lineNum":"  171","line":"            .Error => |err| {","class":"lineCov","hits":"1","order":"3699","possible_hits":"1",},
{"lineNum":"  172","line":"                self.errors.append(err) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"3700","possible_hits":"1",},
{"lineNum":"  173","line":"                return null;","class":"lineCov","hits":"1","order":"3701","possible_hits":"1",},
{"lineNum":"  174","line":"            },"},
{"lineNum":"  175","line":"        }"},
{"lineNum":"  176","line":"    }"},
{"lineNum":"  177","line":""},
{"lineNum":"  178","line":"    pub fn findType(self: *Compiler, nd: Node) ?Type.Ptr {","class":"lineCov","hits":"1","order":"3147","possible_hits":"1",},
{"lineNum":"  179","line":"        return typeFinder.findType(self, nd);","class":"lineCov","hits":"1","order":"3148","possible_hits":"1",},
{"lineNum":"  180","line":"    }"},
{"lineNum":"  181","line":""},
{"lineNum":"  182","line":"    pub fn processNode(self: *Compiler, nd: Node) void {","class":"lineCov","hits":"2","order":"3179","possible_hits":"2",},
{"lineNum":"  183","line":"        switch (nd.data) {","class":"lineCov","hits":"15","order":"3180","possible_hits":"15",},
{"lineNum":"  184","line":"            .PrefixOp,"},
{"lineNum":"  185","line":"            .PostfixOp,"},
{"lineNum":"  186","line":"            .BinaryOp,"},
{"lineNum":"  187","line":"            .Ternary,"},
{"lineNum":"  188","line":"            .Ident,"},
{"lineNum":"  189","line":"            .True,"},
{"lineNum":"  190","line":"            .False,"},
{"lineNum":"  191","line":"            .Null,"},
{"lineNum":"  192","line":"            .Undefined,"},
{"lineNum":"  193","line":"            .Int,"},
{"lineNum":"  194","line":"            .String,"},
{"lineNum":"  195","line":"            .Call,"},
{"lineNum":"  196","line":"            => expression.processExpression(self, nd),","class":"lineCov","hits":"1","order":"3643","possible_hits":"1",},
{"lineNum":"  197","line":"            .Block => block.processBlock(self, nd),","class":"lineCov","hits":"1","order":"5256","possible_hits":"1",},
{"lineNum":"  198","line":"            .Decl => declaration.processDecl(self, nd),","class":"lineCov","hits":"1","order":"3277","possible_hits":"1",},
{"lineNum":"  199","line":"            .If => conditional.processConditional(self, nd),","class":"lineCov","hits":"1","order":"5372","possible_hits":"1",},
{"lineNum":"  200","line":"            .Switch => conditional.processSwitch(self, nd),","class":"lineCov","hits":"1","order":"5396","possible_hits":"1",},
{"lineNum":"  201","line":"            .For => loop.processFor(self, nd),","class":"lineCov","hits":"1","order":"5424","possible_hits":"1",},
{"lineNum":"  202","line":"            .While => loop.processWhile(self, nd),","class":"lineCov","hits":"1","order":"5248","possible_hits":"1",},
{"lineNum":"  203","line":"            .Do => loop.processDo(self, nd),","class":"lineCov","hits":"1","order":"5445","possible_hits":"1",},
{"lineNum":"  204","line":"            .Break => loop.processBreak(self, nd),","class":"lineCov","hits":"1","order":"5409","possible_hits":"1",},
{"lineNum":"  205","line":"            .Continue => loop.processContinue(self, nd),","class":"lineCov","hits":"1","order":"5474","possible_hits":"1",},
{"lineNum":"  206","line":"            .Throw => throw.processThrow(self, nd),","class":"lineCov","hits":"1","order":"5496","possible_hits":"1",},
{"lineNum":"  207","line":"            .Try => throw.processTry(self, nd),","class":"lineCov","hits":"1","order":"5503","possible_hits":"1",},
{"lineNum":"  208","line":"            .Function => function.processFunction(self, nd),","class":"lineCov","hits":"1","order":"5527","possible_hits":"1",},
{"lineNum":"  209","line":"            .Return => function.processReturn(self, nd),","class":"lineCov","hits":"1","order":"5416","possible_hits":"1",},
{"lineNum":"  210","line":"            .Alias => {},"},
{"lineNum":"  211","line":"            .InterfaceType => {},"},
{"lineNum":"  212","line":"            .ClassType => {},"},
{"lineNum":"  213","line":"            else => std.debug.panic(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  214","line":"                \"Unhandled node type in Compiler.processNode: {?}\\n\","},
{"lineNum":"  215","line":"                .{nd.getType()},","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  216","line":"            ),"},
{"lineNum":"  217","line":"        }"},
{"lineNum":"  218","line":"    }"},
{"lineNum":"  219","line":""},
{"lineNum":"  220","line":"    fn runTypeHoistingPass(self: *Compiler, nd: Node) !void {","class":"lineCov","hits":"2","order":"3123","possible_hits":"2",},
{"lineNum":"  221","line":"        for (nd.data.Program.items) |child| {","class":"lineCov","hits":"3","order":"3124","possible_hits":"3",},
{"lineNum":"  222","line":"            switch (child.data) {","class":"lineCov","hits":"3","order":"3125","possible_hits":"3",},
{"lineNum":"  223","line":"                .Alias => types.hoistAlias(self, child),","class":"lineCov","hits":"1","order":"3126","possible_hits":"1",},
{"lineNum":"  224","line":"                .InterfaceType => types.hoistInterface(self, child),","class":"lineCov","hits":"1","order":"3355","possible_hits":"1",},
{"lineNum":"  225","line":"                .ClassType => types.hoistClass(self, child),","class":"lineCov","hits":"1","order":"3411","possible_hits":"1",},
{"lineNum":"  226","line":"                else => continue,","class":"lineCov","hits":"1","order":"3275","possible_hits":"1",},
{"lineNum":"  227","line":"            }"},
{"lineNum":"  228","line":"        }"},
{"lineNum":"  229","line":"    }"},
{"lineNum":"  230","line":""},
{"lineNum":"  231","line":"    fn runTypeProcessingPass(self: *Compiler, nd: Node) !void {","class":"lineCov","hits":"2","order":"3138","possible_hits":"2",},
{"lineNum":"  232","line":"        for (nd.data.Program.items) |child| {","class":"lineCov","hits":"3","order":"3139","possible_hits":"3",},
{"lineNum":"  233","line":"            switch (child.data) {","class":"lineCov","hits":"3","order":"3140","possible_hits":"3",},
{"lineNum":"  234","line":"                .Alias => types.processAlias(self, child),","class":"lineCov","hits":"1","order":"3141","possible_hits":"1",},
{"lineNum":"  235","line":"                .InterfaceType => types.processInterface(self, child),","class":"lineCov","hits":"1","order":"3366","possible_hits":"1",},
{"lineNum":"  236","line":"                .ClassType => types.processClass(self, child),","class":"lineCov","hits":"1","order":"3422","possible_hits":"1",},
{"lineNum":"  237","line":"                else => continue,","class":"lineCov","hits":"1","order":"3276","possible_hits":"1",},
{"lineNum":"  238","line":"            }"},
{"lineNum":"  239","line":"        }"},
{"lineNum":"  240","line":"    }"},
{"lineNum":"  241","line":""},
{"lineNum":"  242","line":"    fn runGlobalHoistingPass(self: *Compiler, nd: Node) !void {","class":"lineCov","hits":"2","order":"3136","possible_hits":"2",},
{"lineNum":"  243","line":"        // TODO"},
{"lineNum":"  244","line":"        _ = self;"},
{"lineNum":"  245","line":"        _ = nd;"},
{"lineNum":"  246","line":"    }"},
{"lineNum":"  247","line":""},
{"lineNum":"  248","line":"    fn runCompilePass(self: *Compiler, nd: Node) !void {","class":"lineCov","hits":"2","order":"3176","possible_hits":"2",},
{"lineNum":"  249","line":"        for (nd.data.Program.items) |child| {","class":"lineCov","hits":"3","order":"3177","possible_hits":"3",},
{"lineNum":"  250","line":"            self.processNode(child);","class":"lineCov","hits":"1","order":"3178","possible_hits":"1",},
{"lineNum":"  251","line":"            if (!self.hasErrors())","class":"lineCov","hits":"2","order":"3181","possible_hits":"2",},
{"lineNum":"  252","line":"                try self.backend.processNode(child);","class":"lineCov","hits":"1","order":"3184","possible_hits":"1",},
{"lineNum":"  253","line":"        }"},
{"lineNum":"  254","line":"    }"},
{"lineNum":"  255","line":""},
{"lineNum":"  256","line":"    pub fn compileProgramNode(self: *Compiler, nd: Node) !void {","class":"lineCov","hits":"2","order":"3118","possible_hits":"2",},
{"lineNum":"  257","line":"        std.debug.assert(nd.getType() == .Program);","class":"lineCov","hits":"1","order":"3119","possible_hits":"1",},
{"lineNum":"  258","line":"        try self.backend.prolog();","class":"lineCov","hits":"1","order":"3120","possible_hits":"1",},
{"lineNum":"  259","line":"        try self.runTypeHoistingPass(nd);","class":"lineCov","hits":"1","order":"3122","possible_hits":"1",},
{"lineNum":"  260","line":"        try self.runGlobalHoistingPass(nd);","class":"lineCov","hits":"1","order":"3135","possible_hits":"1",},
{"lineNum":"  261","line":"        try self.runTypeProcessingPass(nd);","class":"lineCov","hits":"1","order":"3137","possible_hits":"1",},
{"lineNum":"  262","line":"        try self.runCompilePass(nd);","class":"lineCov","hits":"1","order":"3175","possible_hits":"1",},
{"lineNum":"  263","line":"        try self.backend.epilog();","class":"lineCov","hits":"1","order":"3188","possible_hits":"1",},
{"lineNum":"  264","line":"    }"},
{"lineNum":"  265","line":""},
{"lineNum":"  266","line":"    pub fn compile(self: *Compiler, driver: anytype, path: []const u8) !void {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  267","line":"        const file = try driver.parseFile(path);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  268","line":""},
{"lineNum":"  269","line":"        const nd = switch (file.res) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  270","line":"            .Success => |node| node,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  271","line":"            .Error => |err| {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  272","line":"                try self.errors.append(CompileError.parseError(err));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  273","line":"                return;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  274","line":"            },"},
{"lineNum":"  275","line":"            .NoMatch => std.debug.panic(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  276","line":"                \"parseFile should never return NoMatch\","},
{"lineNum":"  277","line":"                .{},"},
{"lineNum":"  278","line":"            ),"},
{"lineNum":"  279","line":"        };"},
{"lineNum":"  280","line":""},
{"lineNum":"  281","line":"        try self.compileProgramNode(nd);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  282","line":"    }"},
{"lineNum":"  283","line":"};"},
{"lineNum":"  284","line":""},
{"lineNum":"  285","line":"test \"can push and pop compiler scopes\" {","class":"lineCov","hits":"3","order":"1819","possible_hits":"3",},
{"lineNum":"  286","line":"    const config = Config{};"},
{"lineNum":"  287","line":"    var backend = NopBackend.new();","class":"lineCov","hits":"1","order":"1820","possible_hits":"1",},
{"lineNum":"  288","line":""},
{"lineNum":"  289","line":"    var compiler = Compiler.new(","class":"lineCov","hits":"1","order":"1827","possible_hits":"1",},
{"lineNum":"  290","line":"        std.testing.allocator,"},
{"lineNum":"  291","line":"        &config,"},
{"lineNum":"  292","line":"        &backend.backend,"},
{"lineNum":"  293","line":"    );"},
{"lineNum":"  294","line":"    defer compiler.deinit();","class":"linePartCov","hits":"1","order":"2028","possible_hits":"6",},
{"lineNum":"  295","line":""},
{"lineNum":"  296","line":"    const first = compiler.scope;","class":"lineCov","hits":"1","order":"2004","possible_hits":"1",},
{"lineNum":"  297","line":"    try expect(first.parent == null);","class":"linePartCov","hits":"1","order":"2005","possible_hits":"2",},
{"lineNum":"  298","line":""},
{"lineNum":"  299","line":"    compiler.pushScope();","class":"lineCov","hits":"1","order":"2006","possible_hits":"1",},
{"lineNum":"  300","line":""},
{"lineNum":"  301","line":"    const second = compiler.scope;","class":"lineCov","hits":"1","order":"2009","possible_hits":"1",},
{"lineNum":"  302","line":"    try expect(first != second);","class":"linePartCov","hits":"1","order":"2010","possible_hits":"2",},
{"lineNum":"  303","line":"    try expectEqual(first, second.parent.?);","class":"linePartCov","hits":"1","order":"2011","possible_hits":"3",},
{"lineNum":"  304","line":""},
{"lineNum":"  305","line":"    compiler.popScope();","class":"lineCov","hits":"1","order":"2012","possible_hits":"1",},
{"lineNum":"  306","line":""},
{"lineNum":"  307","line":"    const third = compiler.scope;","class":"lineCov","hits":"1","order":"2025","possible_hits":"1",},
{"lineNum":"  308","line":"    try expectEqual(first, third);","class":"linePartCov","hits":"1","order":"2026","possible_hits":"2",},
{"lineNum":"  309","line":"    try expect(third.parent == null);","class":"linePartCov","hits":"1","order":"2027","possible_hits":"2",},
{"lineNum":"  310","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-13 15:59:30", "instrumented" : 133, "covered" : 120,};
var merged_data = [];
