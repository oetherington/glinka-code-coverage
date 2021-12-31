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
{"lineNum":"   19","line":"const Compiler = @import(\"compiler.zig\").Compiler;"},
{"lineNum":"   20","line":"const Cursor = @import(\"../common/cursor.zig\").Cursor;"},
{"lineNum":"   21","line":"const node = @import(\"../common/node.zig\");"},
{"lineNum":"   22","line":"const Node = node.Node;"},
{"lineNum":"   23","line":"const NodeType = node.NodeType;"},
{"lineNum":"   24","line":"const Type = @import(\"../common/types/type.zig\").Type;"},
{"lineNum":"   25","line":"const TypeError = @import(\"errors/type_error.zig\").TypeError;"},
{"lineNum":"   26","line":"const ReturnError = @import(\"errors/return_error.zig\").ReturnError;"},
{"lineNum":"   27","line":"const GenericError = @import(\"errors/generic_error.zig\").GenericError;"},
{"lineNum":"   28","line":"const CompileError = @import(\"errors/compile_error.zig\").CompileError;"},
{"lineNum":"   29","line":"const CompilerTestCase = @import(\"compiler_test_case.zig\").CompilerTestCase;"},
{"lineNum":"   30","line":"const WriteContext = @import(\"../common/writer.zig\").WriteContext;"},
{"lineNum":"   31","line":"const allocate = @import(\"../common/allocate.zig\");"},
{"lineNum":"   32","line":""},
{"lineNum":"   33","line":"fn checkName(cmp: *Compiler, csr: Cursor, func: node.Function) bool {","class":"lineCov","hits":"1","order":"4256","possible_hits":"1",},
{"lineNum":"   34","line":"    if (func.name) |name| {","class":"lineCov","hits":"2","order":"4257","possible_hits":"2",},
{"lineNum":"   35","line":"        if (cmp.scope.getLocal(name)) |_| {","class":"lineCov","hits":"2","order":"4258","possible_hits":"2",},
{"lineNum":"   36","line":"            cmp.errors.append(CompileError.genericError(","class":"lineCov","hits":"2","order":"4356","possible_hits":"2",},
{"lineNum":"   37","line":"                GenericError.new(csr, cmp.fmt(","class":"lineCov","hits":"2","order":"4357","possible_hits":"2",},
{"lineNum":"   38","line":"                    \"Symbol \'{s}\' is already defined\","},
{"lineNum":"   39","line":"                    .{name},","class":"lineCov","hits":"1","order":"4358","possible_hits":"1",},
{"lineNum":"   40","line":"                )),"},
{"lineNum":"   41","line":"            )) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"4359","possible_hits":"1",},
{"lineNum":"   42","line":"            return false;","class":"lineCov","hits":"1","order":"4360","possible_hits":"1",},
{"lineNum":"   43","line":"        }"},
{"lineNum":"   44","line":"    }"},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"    return true;","class":"lineCov","hits":"1","order":"4259","possible_hits":"1",},
{"lineNum":"   47","line":"}"},
{"lineNum":"   48","line":""},
{"lineNum":"   49","line":"fn addReturnTypeError(cmp: *Compiler, csr: Cursor, funcName: ?[]const u8) void {","class":"lineCov","hits":"2","order":"4343","possible_hits":"2",},
{"lineNum":"   50","line":"    const message = if (funcName) |fName|","class":"lineCov","hits":"2","order":"4344","possible_hits":"2",},
{"lineNum":"   51","line":"        cmp.fmt(\"Invalid return type for function \'{s}\'\", .{fName})","class":"lineCov","hits":"1","order":"4345","possible_hits":"1",},
{"lineNum":"   52","line":"    else"},
{"lineNum":"   53","line":"        \"Invalid return type for anonymous function\";","class":"lineCov","hits":"1","order":"4353","possible_hits":"1",},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"    cmp.errors.append(CompileError.genericError(","class":"lineCov","hits":"2","order":"4346","possible_hits":"2",},
{"lineNum":"   56","line":"        GenericError.new(csr, message),","class":"lineCov","hits":"1","order":"4347","possible_hits":"1",},
{"lineNum":"   57","line":"    )) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"4348","possible_hits":"1",},
{"lineNum":"   58","line":"}"},
{"lineNum":"   59","line":""},
{"lineNum":"   60","line":"fn getReturnType(cmp: *Compiler, csr: Cursor, func: node.Function) Type.Ptr {","class":"lineCov","hits":"1","order":"4261","possible_hits":"1",},
{"lineNum":"   61","line":"    if (func.retTy) |ty| {","class":"lineCov","hits":"1","order":"4262","possible_hits":"1",},
{"lineNum":"   62","line":"        if (cmp.findType(ty)) |retTy| {","class":"lineCov","hits":"1","order":"4263","possible_hits":"1",},
{"lineNum":"   63","line":"            return retTy;","class":"lineCov","hits":"1","order":"4264","possible_hits":"1",},
{"lineNum":"   64","line":"        } else {"},
{"lineNum":"   65","line":"            addReturnTypeError(cmp, csr, func.name);","class":"lineCov","hits":"1","order":"4342","possible_hits":"1",},
{"lineNum":"   66","line":"            return cmp.typebook.getAny();","class":"lineCov","hits":"1","order":"4349","possible_hits":"1",},
{"lineNum":"   67","line":"        }"},
{"lineNum":"   68","line":"    } else {"},
{"lineNum":"   69","line":"        return cmp.typebook.getVoid();","class":"lineCov","hits":"1","order":"4294","possible_hits":"1",},
{"lineNum":"   70","line":"    }"},
{"lineNum":"   71","line":"}"},
{"lineNum":"   72","line":""},
{"lineNum":"   73","line":"fn addArgTypeError(","class":"lineCov","hits":"1","order":"4309","possible_hits":"1",},
{"lineNum":"   74","line":"    cmp: *Compiler,"},
{"lineNum":"   75","line":"    csr: Cursor,"},
{"lineNum":"   76","line":"    argName: []const u8,"},
{"lineNum":"   77","line":"    funcName: ?[]const u8,"},
{"lineNum":"   78","line":") void {","class":"lineCov","hits":"1","order":"4323","possible_hits":"1",},
{"lineNum":"   79","line":"    const message = if (funcName) |fName|","class":"lineCov","hits":"2","order":"4310","possible_hits":"2",},
{"lineNum":"   80","line":"        cmp.fmt(","class":"lineCov","hits":"2","order":"4311","possible_hits":"2",},
{"lineNum":"   81","line":"            \"Invalid type for argument \'{s}\' in function \'{s}\'\","},
{"lineNum":"   82","line":"            .{ argName, fName },","class":"lineCov","hits":"1","order":"4312","possible_hits":"1",},
{"lineNum":"   83","line":"        )"},
{"lineNum":"   84","line":"    else"},
{"lineNum":"   85","line":"        cmp.fmt(","class":"lineCov","hits":"2","order":"4338","possible_hits":"2",},
{"lineNum":"   86","line":"            \"Invalid type for argument \'{s}\' in anonymous function\","},
{"lineNum":"   87","line":"            .{argName},","class":"lineCov","hits":"1","order":"4339","possible_hits":"1",},
{"lineNum":"   88","line":"        );"},
{"lineNum":"   89","line":""},
{"lineNum":"   90","line":"    cmp.errors.append(CompileError.genericError(","class":"lineCov","hits":"2","order":"4320","possible_hits":"2",},
{"lineNum":"   91","line":"        GenericError.new(csr, message),","class":"lineCov","hits":"1","order":"4321","possible_hits":"1",},
{"lineNum":"   92","line":"    )) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"4322","possible_hits":"1",},
{"lineNum":"   93","line":"}"},
{"lineNum":"   94","line":""},
{"lineNum":"   95","line":"fn getArgType(","class":"lineCov","hits":"1","order":"4270","possible_hits":"1",},
{"lineNum":"   96","line":"    cmp: *Compiler,"},
{"lineNum":"   97","line":"    csr: Cursor,"},
{"lineNum":"   98","line":"    funcName: ?[]const u8,"},
{"lineNum":"   99","line":"    arg: node.Function.Arg,"},
{"lineNum":"  100","line":") Type.Ptr {"},
{"lineNum":"  101","line":"    if (arg.ty) |declared| {","class":"lineCov","hits":"1","order":"4271","possible_hits":"1",},
{"lineNum":"  102","line":"        if (cmp.findType(declared)) |argTy| {","class":"lineCov","hits":"1","order":"4272","possible_hits":"1",},
{"lineNum":"  103","line":"            return argTy;","class":"lineCov","hits":"1","order":"4273","possible_hits":"1",},
{"lineNum":"  104","line":"        } else {"},
{"lineNum":"  105","line":"            addArgTypeError(cmp, csr, arg.name, funcName);","class":"lineCov","hits":"1","order":"4308","possible_hits":"1",},
{"lineNum":"  106","line":"            return cmp.typebook.getAny();","class":"lineCov","hits":"1","order":"4324","possible_hits":"1",},
{"lineNum":"  107","line":"        }"},
{"lineNum":"  108","line":"    } else {"},
{"lineNum":"  109","line":"        return cmp.implicitAny(csr, arg.name);","class":"lineCov","hits":"1","order":"4295","possible_hits":"1",},
{"lineNum":"  110","line":"    }"},
{"lineNum":"  111","line":"}"},
{"lineNum":"  112","line":""},
{"lineNum":"  113","line":"fn checkReturnExpr(","class":"lineCov","hits":"1","order":"4369","possible_hits":"1",},
{"lineNum":"  114","line":"    cmp: *Compiler,"},
{"lineNum":"  115","line":"    csr: Cursor,"},
{"lineNum":"  116","line":"    expectedTy: Type.Ptr,"},
{"lineNum":"  117","line":"    actualTy: ?Type.Ptr,"},
{"lineNum":"  118","line":") void {","class":"lineCov","hits":"1","order":"4372","possible_hits":"1",},
{"lineNum":"  119","line":"    if (actualTy) |ty| {","class":"lineCov","hits":"3","order":"4370","possible_hits":"3",},
{"lineNum":"  120","line":"        if (!ty.isAssignableTo(expectedTy)) {","class":"lineCov","hits":"2","order":"4371","possible_hits":"2",},
{"lineNum":"  121","line":"            cmp.errors.append(CompileError.returnError(","class":"lineCov","hits":"2","order":"4378","possible_hits":"2",},
{"lineNum":"  122","line":"                ReturnError.new(csr, expectedTy, ty),","class":"lineCov","hits":"1","order":"4379","possible_hits":"1",},
{"lineNum":"  123","line":"            )) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"4380","possible_hits":"1",},
{"lineNum":"  124","line":"        }"},
{"lineNum":"  125","line":"    } else if (expectedTy.getType() != .Void) {","class":"lineCov","hits":"2","order":"4401","possible_hits":"2",},
{"lineNum":"  126","line":"        cmp.errors.append(CompileError.returnError(","class":"lineCov","hits":"2","order":"4402","possible_hits":"2",},
{"lineNum":"  127","line":"            ReturnError.new(csr, expectedTy, null),","class":"lineCov","hits":"1","order":"4403","possible_hits":"1",},
{"lineNum":"  128","line":"        )) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"4404","possible_hits":"1",},
{"lineNum":"  129","line":"    }"},
{"lineNum":"  130","line":"}"},
{"lineNum":"  131","line":""},
{"lineNum":"  132","line":"fn traceReturns(cmp: *Compiler, nd: Node, retTy: Type.Ptr) void {","class":"lineCov","hits":"2","order":"4282","possible_hits":"2",},
{"lineNum":"  133","line":"    // TODO: Check all code paths return a suitable value"},
{"lineNum":"  134","line":""},
{"lineNum":"  135","line":"    std.debug.assert(nd.getType() == .Block);","class":"lineCov","hits":"1","order":"4283","possible_hits":"1",},
{"lineNum":"  136","line":""},
{"lineNum":"  137","line":"    if (retTy.getType() == .Any)","class":"lineCov","hits":"2","order":"4284","possible_hits":"2",},
{"lineNum":"  138","line":"        return;","class":"lineCov","hits":"1","order":"4350","possible_hits":"1",},
{"lineNum":"  139","line":""},
{"lineNum":"  140","line":"    for (nd.data.Block.items) |item| {","class":"lineCov","hits":"3","order":"4285","possible_hits":"3",},
{"lineNum":"  141","line":"        switch (item.data) {","class":"lineCov","hits":"1","order":"4286","possible_hits":"1",},
{"lineNum":"  142","line":"            .Return => |expr| checkReturnExpr(","class":"lineCov","hits":"2","order":"4364","possible_hits":"2",},
{"lineNum":"  143","line":"                cmp,","class":"lineCov","hits":"1","order":"4365","possible_hits":"1",},
{"lineNum":"  144","line":"                item.csr,","class":"lineCov","hits":"1","order":"4366","possible_hits":"1",},
{"lineNum":"  145","line":"                retTy,","class":"lineCov","hits":"1","order":"4367","possible_hits":"1",},
{"lineNum":"  146","line":"                if (expr) |exp| exp.ty else null,","class":"lineCov","hits":"1","order":"4368","possible_hits":"1",},
{"lineNum":"  147","line":"            ),"},
{"lineNum":"  148","line":"            else => continue,","class":"lineCov","hits":"1","order":"4287","possible_hits":"1",},
{"lineNum":"  149","line":"        }"},
{"lineNum":"  150","line":"    }"},
{"lineNum":"  151","line":"}"},
{"lineNum":"  152","line":""},
{"lineNum":"  153","line":"pub fn processFunction(cmp: *Compiler, nd: Node) void {","class":"lineCov","hits":"2","order":"4250","possible_hits":"2",},
{"lineNum":"  154","line":"    std.debug.assert(nd.getType() == NodeType.Function);","class":"lineCov","hits":"1","order":"4251","possible_hits":"1",},
{"lineNum":"  155","line":""},
{"lineNum":"  156","line":"    const func = nd.data.Function;","class":"linePartCov","hits":"2","order":"4252","possible_hits":"3",},
{"lineNum":"  157","line":""},
{"lineNum":"  158","line":"    std.debug.assert(!func.isArrow); // TODO: Implement arrow functions","class":"lineCov","hits":"1","order":"4253","possible_hits":"1",},
{"lineNum":"  159","line":"    std.debug.assert(func.body.getType() == .Block);","class":"lineCov","hits":"1","order":"4254","possible_hits":"1",},
{"lineNum":"  160","line":""},
{"lineNum":"  161","line":"    const nameIsValid = checkName(cmp, nd.csr, func);","class":"lineCov","hits":"1","order":"4255","possible_hits":"1",},
{"lineNum":"  162","line":""},
{"lineNum":"  163","line":"    const retTy = getReturnType(cmp, nd.csr, func);","class":"lineCov","hits":"1","order":"4260","possible_hits":"1",},
{"lineNum":"  164","line":""},
{"lineNum":"  165","line":"    cmp.pushScope();","class":"lineCov","hits":"1","order":"4265","possible_hits":"1",},
{"lineNum":"  166","line":"    defer cmp.popScope();","class":"lineCov","hits":"1","order":"4289","possible_hits":"1",},
{"lineNum":"  167","line":""},
{"lineNum":"  168","line":"    cmp.scope.ctx = .Function;","class":"lineCov","hits":"1","order":"4266","possible_hits":"1",},
{"lineNum":"  169","line":""},
{"lineNum":"  170","line":"    const argTys = allocate.alloc(cmp.alloc, Type.Ptr, func.args.items.len);","class":"lineCov","hits":"1","order":"4267","possible_hits":"1",},
{"lineNum":"  171","line":"    defer cmp.alloc.free(argTys);","class":"lineCov","hits":"1","order":"4288","possible_hits":"1",},
{"lineNum":"  172","line":""},
{"lineNum":"  173","line":"    for (func.args.items) |arg, index| {","class":"lineCov","hits":"3","order":"4268","possible_hits":"3",},
{"lineNum":"  174","line":"        argTys[index] = getArgType(cmp, nd.csr, func.name, arg);","class":"linePartCov","hits":"1","order":"4269","possible_hits":"2",},
{"lineNum":"  175","line":"        cmp.scope.put(arg.name, argTys[index], false, arg.csr);","class":"lineCov","hits":"1","order":"4274","possible_hits":"1",},
{"lineNum":"  176","line":"    }"},
{"lineNum":"  177","line":""},
{"lineNum":"  178","line":"    cmp.scope.put(\"this\", cmp.typebook.getObject(), true, nd.csr);","class":"lineCov","hits":"1","order":"4275","possible_hits":"1",},
{"lineNum":"  179","line":""},
{"lineNum":"  180","line":"    const funcTy = cmp.typebook.getFunction(retTy, argTys);","class":"lineCov","hits":"1","order":"4276","possible_hits":"1",},
{"lineNum":"  181","line":""},
{"lineNum":"  182","line":"    if (nameIsValid)","class":"lineCov","hits":"2","order":"4277","possible_hits":"2",},
{"lineNum":"  183","line":"        if (func.name) |name|","class":"lineCov","hits":"3","order":"4278","possible_hits":"3",},
{"lineNum":"  184","line":"            cmp.scope.parent.?.put(name, funcTy, true, nd.csr);","class":"linePartCov","hits":"1","order":"4279","possible_hits":"2",},
{"lineNum":"  185","line":""},
{"lineNum":"  186","line":"    cmp.processNode(func.body);","class":"lineCov","hits":"1","order":"4280","possible_hits":"1",},
{"lineNum":"  187","line":""},
{"lineNum":"  188","line":"    traceReturns(cmp, func.body, funcTy.Function.ret);","class":"linePartCov","hits":"2","order":"4281","possible_hits":"3",},
{"lineNum":"  189","line":"}"},
{"lineNum":"  190","line":""},
{"lineNum":"  191","line":"test \"can compile a function\" {","class":"lineCov","hits":"2","order":"4247","possible_hits":"2",},
{"lineNum":"  192","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4290","possible_hits":"1",},
{"lineNum":"  193","line":"        .code = \"function adder(a: number, b: number) : void { a + b; }\","},
{"lineNum":"  194","line":"    }).run();","class":"lineCov","hits":"1","order":"4248","possible_hits":"1",},
{"lineNum":"  195","line":"}"},
{"lineNum":"  196","line":""},
{"lineNum":"  197","line":"test \"untyped function arguments trigger implicit any\" {","class":"lineCov","hits":"2","order":"4291","possible_hits":"2",},
{"lineNum":"  198","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4302","possible_hits":"1",},
{"lineNum":"  199","line":"        .code = \"function aFunction(a) {}\","},
{"lineNum":"  200","line":"        .check = (struct {"},
{"lineNum":"  201","line":"            pub fn check(self: CompilerTestCase, cmp: Compiler) anyerror!void {","class":"lineCov","hits":"2","order":"4296","possible_hits":"2",},
{"lineNum":"  202","line":"                try self.expectEqual(@intCast(usize, 1), cmp.errors.count());","class":"lineCov","hits":"1","order":"4297","possible_hits":"1",},
{"lineNum":"  203","line":""},
{"lineNum":"  204","line":"                const err = cmp.getError(0);","class":"lineCov","hits":"1","order":"4298","possible_hits":"1",},
{"lineNum":"  205","line":"                try self.expectEqual(","class":"lineCov","hits":"1","order":"4300","possible_hits":"1",},
{"lineNum":"  206","line":"                    CompileError.Type.ImplicitAnyError,"},
{"lineNum":"  207","line":"                    err.getType(),","class":"lineCov","hits":"1","order":"4299","possible_hits":"1",},
{"lineNum":"  208","line":"                );"},
{"lineNum":"  209","line":"                try self.expectEqualStrings(\"a\", err.ImplicitAnyError.symbol);","class":"lineCov","hits":"2","order":"4301","possible_hits":"2",},
{"lineNum":"  210","line":"            }"},
{"lineNum":"  211","line":"        }).check,"},
{"lineNum":"  212","line":"    }).run();","class":"lineCov","hits":"1","order":"4292","possible_hits":"1",},
{"lineNum":"  213","line":"}"},
{"lineNum":"  214","line":""},
{"lineNum":"  215","line":"fn fnGenericErrorTestCase(","class":"lineCov","hits":"5","order":"4305","possible_hits":"5",},
{"lineNum":"  216","line":"    comptime code: []const u8,"},
{"lineNum":"  217","line":"    comptime expectedMessage: []const u8,"},
{"lineNum":"  218","line":") !void {","class":"lineCov","hits":"5","order":"4334","possible_hits":"5",},
{"lineNum":"  219","line":"    try (CompilerTestCase{","class":"lineCov","hits":"5","order":"4333","possible_hits":"5",},
{"lineNum":"  220","line":"        .code = code,"},
{"lineNum":"  221","line":"        .check = (struct {"},
{"lineNum":"  222","line":"            pub fn check(self: CompilerTestCase, cmp: Compiler) anyerror!void {","class":"lineCov","hits":"10","order":"4325","possible_hits":"10",},
{"lineNum":"  223","line":"                try self.expectEqual(@intCast(usize, 1), cmp.errors.count());","class":"lineCov","hits":"5","order":"4326","possible_hits":"5",},
{"lineNum":"  224","line":""},
{"lineNum":"  225","line":"                const err = cmp.getError(0);","class":"lineCov","hits":"5","order":"4327","possible_hits":"5",},
{"lineNum":"  226","line":"                try self.expectEqual(","class":"lineCov","hits":"5","order":"4329","possible_hits":"5",},
{"lineNum":"  227","line":"                    CompileError.Type.GenericError,"},
{"lineNum":"  228","line":"                    err.getType(),","class":"lineCov","hits":"5","order":"4328","possible_hits":"5",},
{"lineNum":"  229","line":"                );"},
{"lineNum":"  230","line":"                try self.expectEqualStrings(","class":"linePartCov","hits":"5","order":"4331","possible_hits":"10",},
{"lineNum":"  231","line":"                    expectedMessage,"},
{"lineNum":"  232","line":"                    err.GenericError.msg,","class":"linePartCov","hits":"10","order":"4330","possible_hits":"15",},
{"lineNum":"  233","line":"                );"},
{"lineNum":"  234","line":"            }"},
{"lineNum":"  235","line":"        }).check,"},
{"lineNum":"  236","line":"    }).run();","class":"lineCov","hits":"5","order":"4306","possible_hits":"5",},
{"lineNum":"  237","line":"}"},
{"lineNum":"  238","line":""},
{"lineNum":"  239","line":"test \"invalid function argument types throw an error in named functions\" {","class":"lineCov","hits":"2","order":"4303","possible_hits":"2",},
{"lineNum":"  240","line":"    try fnGenericErrorTestCase(","class":"lineCov","hits":"1","order":"4304","possible_hits":"1",},
{"lineNum":"  241","line":"        \"function aFunction(a: AnInvalidType) {}\","},
{"lineNum":"  242","line":"        \"Invalid type for argument \'a\' in function \'aFunction\'\","},
{"lineNum":"  243","line":"    );"},
{"lineNum":"  244","line":"}"},
{"lineNum":"  245","line":""},
{"lineNum":"  246","line":"test \"invalid function argument types throw an error in anonymous functions\" {","class":"lineCov","hits":"2","order":"4335","possible_hits":"2",},
{"lineNum":"  247","line":"    try fnGenericErrorTestCase(","class":"lineCov","hits":"1","order":"4336","possible_hits":"1",},
{"lineNum":"  248","line":"        \"function(a: AnInvalidType) {}\","},
{"lineNum":"  249","line":"        \"Invalid type for argument \'a\' in anonymous function\","},
{"lineNum":"  250","line":"    );"},
{"lineNum":"  251","line":"}"},
{"lineNum":"  252","line":""},
{"lineNum":"  253","line":"test \"invalid function return type throws an error in named functions\" {","class":"lineCov","hits":"2","order":"4340","possible_hits":"2",},
{"lineNum":"  254","line":"    try fnGenericErrorTestCase(","class":"lineCov","hits":"1","order":"4341","possible_hits":"1",},
{"lineNum":"  255","line":"        \"function aFunction() : AnInvalidType {}\","},
{"lineNum":"  256","line":"        \"Invalid return type for function \'aFunction\'\","},
{"lineNum":"  257","line":"    );"},
{"lineNum":"  258","line":"}"},
{"lineNum":"  259","line":""},
{"lineNum":"  260","line":"test \"invalid function return type throws an error in anonymous functions\" {","class":"lineCov","hits":"2","order":"4351","possible_hits":"2",},
{"lineNum":"  261","line":"    try fnGenericErrorTestCase(","class":"lineCov","hits":"1","order":"4352","possible_hits":"1",},
{"lineNum":"  262","line":"        \"function() : AnInvalidType {}\","},
{"lineNum":"  263","line":"        \"Invalid return type for anonymous function\","},
{"lineNum":"  264","line":"    );"},
{"lineNum":"  265","line":"}"},
{"lineNum":"  266","line":""},
{"lineNum":"  267","line":"test \"function throws error if symbol is already defined\" {","class":"lineCov","hits":"2","order":"4354","possible_hits":"2",},
{"lineNum":"  268","line":"    try fnGenericErrorTestCase(","class":"lineCov","hits":"1","order":"4355","possible_hits":"1",},
{"lineNum":"  269","line":"        \"function someFunction() {} function someFunction() {}\","},
{"lineNum":"  270","line":"        \"Symbol \'someFunction\' is already defined\","},
{"lineNum":"  271","line":"    );"},
{"lineNum":"  272","line":"}"},
{"lineNum":"  273","line":""},
{"lineNum":"  274","line":"pub fn processReturn(cmp: *Compiler, nd: Node) void {","class":"lineCov","hits":"2","order":"4139","possible_hits":"2",},
{"lineNum":"  275","line":"    std.debug.assert(nd.getType() == NodeType.Return);","class":"lineCov","hits":"1","order":"4140","possible_hits":"1",},
{"lineNum":"  276","line":""},
{"lineNum":"  277","line":"    if (nd.data.Return) |expr|","class":"lineCov","hits":"3","order":"4141","possible_hits":"3",},
{"lineNum":"  278","line":"        _ = cmp.inferExprType(expr);","class":"lineCov","hits":"1","order":"4363","possible_hits":"1",},
{"lineNum":"  279","line":"}"},
{"lineNum":"  280","line":""},
{"lineNum":"  281","line":"test \"can compile a return statement\" {","class":"lineCov","hits":"2","order":"4361","possible_hits":"2",},
{"lineNum":"  282","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4373","possible_hits":"1",},
{"lineNum":"  283","line":"        .code = \"function id(a: number) : number { return a; }\","},
{"lineNum":"  284","line":"    }).run();","class":"lineCov","hits":"1","order":"4362","possible_hits":"1",},
{"lineNum":"  285","line":"}"},
{"lineNum":"  286","line":""},
{"lineNum":"  287","line":"fn returnErrorTestCase(","class":"lineCov","hits":"3","order":"4376","possible_hits":"3",},
{"lineNum":"  288","line":"    comptime code: []const u8,"},
{"lineNum":"  289","line":"    comptime expectedErr: []const u8,"},
{"lineNum":"  290","line":") !void {","class":"lineCov","hits":"3","order":"4394","possible_hits":"3",},
{"lineNum":"  291","line":"    try (CompilerTestCase{","class":"lineCov","hits":"3","order":"4393","possible_hits":"3",},
{"lineNum":"  292","line":"        .code = code,"},
{"lineNum":"  293","line":"        .check = (struct {"},
{"lineNum":"  294","line":"            pub fn check(self: CompilerTestCase, cmp: Compiler) anyerror!void {","class":"lineCov","hits":"9","order":"4381","possible_hits":"9",},
{"lineNum":"  295","line":"                try self.expectEqual(@intCast(usize, 1), cmp.errors.count());","class":"lineCov","hits":"3","order":"4382","possible_hits":"3",},
{"lineNum":"  296","line":""},
{"lineNum":"  297","line":"                const err = cmp.getError(0);","class":"lineCov","hits":"3","order":"4383","possible_hits":"3",},
{"lineNum":"  298","line":"                try self.expectEqual(","class":"lineCov","hits":"3","order":"4385","possible_hits":"3",},
{"lineNum":"  299","line":"                    CompileError.Type.ReturnError,"},
{"lineNum":"  300","line":"                    err.getType(),","class":"lineCov","hits":"3","order":"4384","possible_hits":"3",},
{"lineNum":"  301","line":"                );"},
{"lineNum":"  302","line":""},
{"lineNum":"  303","line":"                var ctx = try WriteContext(.{}).new(std.testing.allocator);","class":"lineCov","hits":"3","order":"4386","possible_hits":"3",},
{"lineNum":"  304","line":"                defer ctx.deinit();","class":"linePartCov","hits":"3","order":"4392","possible_hits":"12",},
{"lineNum":"  305","line":"                var writer = ctx.writer();","class":"lineCov","hits":"3","order":"4387","possible_hits":"3",},
{"lineNum":"  306","line":""},
{"lineNum":"  307","line":"                try cmp.errors.report(writer);","class":"linePartCov","hits":"3","order":"4388","possible_hits":"6",},
{"lineNum":"  308","line":""},
{"lineNum":"  309","line":"                var str = try ctx.toString();","class":"linePartCov","hits":"3","order":"4389","possible_hits":"6",},
{"lineNum":"  310","line":"                defer ctx.freeString(str);","class":"linePartCov","hits":"3","order":"4391","possible_hits":"6",},
{"lineNum":"  311","line":""},
{"lineNum":"  312","line":"                try self.expectEqualStrings(expectedErr, str);","class":"linePartCov","hits":"3","order":"4390","possible_hits":"6",},
{"lineNum":"  313","line":"            }"},
{"lineNum":"  314","line":"        }).check,"},
{"lineNum":"  315","line":"    }).run();","class":"lineCov","hits":"3","order":"4377","possible_hits":"3",},
{"lineNum":"  316","line":"}"},
{"lineNum":"  317","line":""},
{"lineNum":"  318","line":"test \"return statement expressions must have the correct type\" {","class":"lineCov","hits":"2","order":"4374","possible_hits":"2",},
{"lineNum":"  319","line":"    try returnErrorTestCase(","class":"lineCov","hits":"1","order":"4375","possible_hits":"1",},
{"lineNum":"  320","line":"        \"function f() : number { return \'not a number\'; }\","},
{"lineNum":"  321","line":"        \"Error: 1:25: Cannot return a value of type string from a function returning number\\n\","},
{"lineNum":"  322","line":"    );"},
{"lineNum":"  323","line":"}"},
{"lineNum":"  324","line":""},
{"lineNum":"  325","line":"test \"void functions must not return a value\" {","class":"lineCov","hits":"2","order":"4395","possible_hits":"2",},
{"lineNum":"  326","line":"    try returnErrorTestCase(","class":"lineCov","hits":"1","order":"4396","possible_hits":"1",},
{"lineNum":"  327","line":"        \"function f() : void { return \'not a number\'; }\","},
{"lineNum":"  328","line":"        \"Error: 1:23: Cannot return a value from a void function\\n\","},
{"lineNum":"  329","line":"    );"},
{"lineNum":"  330","line":"}"},
{"lineNum":"  331","line":""},
{"lineNum":"  332","line":"test \"non-void functions cannot return without a value\" {","class":"lineCov","hits":"2","order":"4399","possible_hits":"2",},
{"lineNum":"  333","line":"    try returnErrorTestCase(","class":"lineCov","hits":"1","order":"4400","possible_hits":"1",},
{"lineNum":"  334","line":"        \"function f() : string { return; }\","},
{"lineNum":"  335","line":"        \"Error: 1:25: Non-void function must return value of type string\\n\","},
{"lineNum":"  336","line":"    );"},
{"lineNum":"  337","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2021-12-31 19:19:11", "instrumented" : 147, "covered" : 147,};
var merged_data = [];
