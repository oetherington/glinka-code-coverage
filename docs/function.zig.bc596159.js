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
{"lineNum":"   33","line":"fn checkName(cmp: *Compiler, csr: Cursor, func: node.Function) bool {","class":"lineCov","hits":"1","order":"4902","possible_hits":"1",},
{"lineNum":"   34","line":"    if (func.name) |name| {","class":"lineCov","hits":"2","order":"4903","possible_hits":"2",},
{"lineNum":"   35","line":"        if (cmp.scope.getLocal(name)) |_| {","class":"lineCov","hits":"2","order":"4904","possible_hits":"2",},
{"lineNum":"   36","line":"            cmp.errors.append(CompileError.genericError(","class":"lineCov","hits":"2","order":"5023","possible_hits":"2",},
{"lineNum":"   37","line":"                GenericError.new(csr, cmp.fmt(","class":"lineCov","hits":"2","order":"5024","possible_hits":"2",},
{"lineNum":"   38","line":"                    \"Symbol \'{s}\' is already defined\","},
{"lineNum":"   39","line":"                    .{name},","class":"lineCov","hits":"1","order":"5025","possible_hits":"1",},
{"lineNum":"   40","line":"                )),"},
{"lineNum":"   41","line":"            )) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"5026","possible_hits":"1",},
{"lineNum":"   42","line":"            return false;","class":"lineCov","hits":"1","order":"5027","possible_hits":"1",},
{"lineNum":"   43","line":"        }"},
{"lineNum":"   44","line":"    }"},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"    return true;","class":"lineCov","hits":"1","order":"4905","possible_hits":"1",},
{"lineNum":"   47","line":"}"},
{"lineNum":"   48","line":""},
{"lineNum":"   49","line":"fn addReturnTypeError(cmp: *Compiler, csr: Cursor, funcName: ?[]const u8) void {","class":"lineCov","hits":"2","order":"5010","possible_hits":"2",},
{"lineNum":"   50","line":"    const message = if (funcName) |fName|","class":"lineCov","hits":"2","order":"5011","possible_hits":"2",},
{"lineNum":"   51","line":"        cmp.fmt(\"Invalid return type for function \'{s}\'\", .{fName})","class":"lineCov","hits":"1","order":"5012","possible_hits":"1",},
{"lineNum":"   52","line":"    else"},
{"lineNum":"   53","line":"        \"Invalid return type for anonymous function\";","class":"lineCov","hits":"1","order":"5020","possible_hits":"1",},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"    cmp.errors.append(CompileError.genericError(","class":"lineCov","hits":"2","order":"5013","possible_hits":"2",},
{"lineNum":"   56","line":"        GenericError.new(csr, message),","class":"lineCov","hits":"1","order":"5014","possible_hits":"1",},
{"lineNum":"   57","line":"    )) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"5015","possible_hits":"1",},
{"lineNum":"   58","line":"}"},
{"lineNum":"   59","line":""},
{"lineNum":"   60","line":"fn getReturnType(cmp: *Compiler, csr: Cursor, func: node.Function) Type.Ptr {","class":"lineCov","hits":"1","order":"4907","possible_hits":"1",},
{"lineNum":"   61","line":"    if (func.retTy) |ty| {","class":"lineCov","hits":"1","order":"4908","possible_hits":"1",},
{"lineNum":"   62","line":"        if (cmp.findType(ty)) |retTy| {","class":"lineCov","hits":"1","order":"4909","possible_hits":"1",},
{"lineNum":"   63","line":"            return retTy;","class":"lineCov","hits":"1","order":"4910","possible_hits":"1",},
{"lineNum":"   64","line":"        } else {"},
{"lineNum":"   65","line":"            addReturnTypeError(cmp, csr, func.name);","class":"lineCov","hits":"1","order":"5009","possible_hits":"1",},
{"lineNum":"   66","line":"            return cmp.typebook.getAny();","class":"lineCov","hits":"1","order":"5016","possible_hits":"1",},
{"lineNum":"   67","line":"        }"},
{"lineNum":"   68","line":"    } else {"},
{"lineNum":"   69","line":"        return cmp.typebook.getVoid();","class":"lineCov","hits":"1","order":"4947","possible_hits":"1",},
{"lineNum":"   70","line":"    }"},
{"lineNum":"   71","line":"}"},
{"lineNum":"   72","line":""},
{"lineNum":"   73","line":"fn addArgTypeError(","class":"lineCov","hits":"1","order":"4976","possible_hits":"1",},
{"lineNum":"   74","line":"    cmp: *Compiler,"},
{"lineNum":"   75","line":"    csr: Cursor,"},
{"lineNum":"   76","line":"    argName: []const u8,"},
{"lineNum":"   77","line":"    funcName: ?[]const u8,"},
{"lineNum":"   78","line":") void {","class":"lineCov","hits":"1","order":"4990","possible_hits":"1",},
{"lineNum":"   79","line":"    const message = if (funcName) |fName|","class":"lineCov","hits":"2","order":"4977","possible_hits":"2",},
{"lineNum":"   80","line":"        cmp.fmt(","class":"lineCov","hits":"2","order":"4978","possible_hits":"2",},
{"lineNum":"   81","line":"            \"Invalid type for argument \'{s}\' in function \'{s}\'\","},
{"lineNum":"   82","line":"            .{ argName, fName },","class":"lineCov","hits":"1","order":"4979","possible_hits":"1",},
{"lineNum":"   83","line":"        )"},
{"lineNum":"   84","line":"    else"},
{"lineNum":"   85","line":"        cmp.fmt(","class":"lineCov","hits":"2","order":"5005","possible_hits":"2",},
{"lineNum":"   86","line":"            \"Invalid type for argument \'{s}\' in anonymous function\","},
{"lineNum":"   87","line":"            .{argName},","class":"lineCov","hits":"1","order":"5006","possible_hits":"1",},
{"lineNum":"   88","line":"        );"},
{"lineNum":"   89","line":""},
{"lineNum":"   90","line":"    cmp.errors.append(CompileError.genericError(","class":"lineCov","hits":"2","order":"4987","possible_hits":"2",},
{"lineNum":"   91","line":"        GenericError.new(csr, message),","class":"lineCov","hits":"1","order":"4988","possible_hits":"1",},
{"lineNum":"   92","line":"    )) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"4989","possible_hits":"1",},
{"lineNum":"   93","line":"}"},
{"lineNum":"   94","line":""},
{"lineNum":"   95","line":"fn getArgType(","class":"lineCov","hits":"1","order":"4924","possible_hits":"1",},
{"lineNum":"   96","line":"    cmp: *Compiler,"},
{"lineNum":"   97","line":"    csr: Cursor,"},
{"lineNum":"   98","line":"    funcName: ?[]const u8,"},
{"lineNum":"   99","line":"    arg: node.Function.Arg,"},
{"lineNum":"  100","line":") Type.Ptr {"},
{"lineNum":"  101","line":"    if (arg.ty) |declared| {","class":"lineCov","hits":"1","order":"4925","possible_hits":"1",},
{"lineNum":"  102","line":"        if (cmp.findType(declared)) |argTy| {","class":"lineCov","hits":"1","order":"4926","possible_hits":"1",},
{"lineNum":"  103","line":"            return argTy;","class":"lineCov","hits":"1","order":"4927","possible_hits":"1",},
{"lineNum":"  104","line":"        } else {"},
{"lineNum":"  105","line":"            addArgTypeError(cmp, csr, arg.name, funcName);","class":"lineCov","hits":"1","order":"4975","possible_hits":"1",},
{"lineNum":"  106","line":"            return cmp.typebook.getAny();","class":"lineCov","hits":"1","order":"4991","possible_hits":"1",},
{"lineNum":"  107","line":"        }"},
{"lineNum":"  108","line":"    } else {"},
{"lineNum":"  109","line":"        return cmp.implicitAny(csr, arg.name);","class":"lineCov","hits":"1","order":"4948","possible_hits":"1",},
{"lineNum":"  110","line":"    }"},
{"lineNum":"  111","line":"}"},
{"lineNum":"  112","line":""},
{"lineNum":"  113","line":"fn checkReturnExpr(","class":"lineCov","hits":"1","order":"5036","possible_hits":"1",},
{"lineNum":"  114","line":"    cmp: *Compiler,"},
{"lineNum":"  115","line":"    csr: Cursor,"},
{"lineNum":"  116","line":"    expectedTy: Type.Ptr,"},
{"lineNum":"  117","line":"    actualTy: ?Type.Ptr,"},
{"lineNum":"  118","line":") void {","class":"lineCov","hits":"1","order":"5039","possible_hits":"1",},
{"lineNum":"  119","line":"    if (actualTy) |ty| {","class":"lineCov","hits":"3","order":"5037","possible_hits":"3",},
{"lineNum":"  120","line":"        if (!ty.isAssignableTo(expectedTy)) {","class":"lineCov","hits":"2","order":"5038","possible_hits":"2",},
{"lineNum":"  121","line":"            cmp.errors.append(CompileError.returnError(","class":"lineCov","hits":"2","order":"5045","possible_hits":"2",},
{"lineNum":"  122","line":"                ReturnError.new(csr, expectedTy, ty),","class":"lineCov","hits":"1","order":"5046","possible_hits":"1",},
{"lineNum":"  123","line":"            )) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"5047","possible_hits":"1",},
{"lineNum":"  124","line":"        }"},
{"lineNum":"  125","line":"    } else if (expectedTy.getType() != .Void) {","class":"lineCov","hits":"2","order":"5068","possible_hits":"2",},
{"lineNum":"  126","line":"        cmp.errors.append(CompileError.returnError(","class":"lineCov","hits":"2","order":"5069","possible_hits":"2",},
{"lineNum":"  127","line":"            ReturnError.new(csr, expectedTy, null),","class":"lineCov","hits":"1","order":"5070","possible_hits":"1",},
{"lineNum":"  128","line":"        )) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"5071","possible_hits":"1",},
{"lineNum":"  129","line":"    }"},
{"lineNum":"  130","line":"}"},
{"lineNum":"  131","line":""},
{"lineNum":"  132","line":"fn traceReturns(cmp: *Compiler, nd: Node, retTy: Type.Ptr) void {","class":"lineCov","hits":"2","order":"4935","possible_hits":"2",},
{"lineNum":"  133","line":"    // TODO: Check all code paths return a suitable value"},
{"lineNum":"  134","line":""},
{"lineNum":"  135","line":"    std.debug.assert(nd.getType() == .Block);","class":"lineCov","hits":"1","order":"4936","possible_hits":"1",},
{"lineNum":"  136","line":""},
{"lineNum":"  137","line":"    if (retTy.getType() == .Any)","class":"lineCov","hits":"2","order":"4937","possible_hits":"2",},
{"lineNum":"  138","line":"        return;","class":"lineCov","hits":"1","order":"5017","possible_hits":"1",},
{"lineNum":"  139","line":""},
{"lineNum":"  140","line":"    for (nd.data.Block.items) |item| {","class":"lineCov","hits":"3","order":"4938","possible_hits":"3",},
{"lineNum":"  141","line":"        switch (item.data) {","class":"lineCov","hits":"1","order":"4939","possible_hits":"1",},
{"lineNum":"  142","line":"            .Return => |expr| checkReturnExpr(","class":"lineCov","hits":"2","order":"5031","possible_hits":"2",},
{"lineNum":"  143","line":"                cmp,","class":"lineCov","hits":"1","order":"5032","possible_hits":"1",},
{"lineNum":"  144","line":"                item.csr,","class":"lineCov","hits":"1","order":"5033","possible_hits":"1",},
{"lineNum":"  145","line":"                retTy,","class":"lineCov","hits":"1","order":"5034","possible_hits":"1",},
{"lineNum":"  146","line":"                if (expr) |exp| exp.ty else null,","class":"lineCov","hits":"1","order":"5035","possible_hits":"1",},
{"lineNum":"  147","line":"            ),"},
{"lineNum":"  148","line":"            else => continue,","class":"lineCov","hits":"1","order":"4940","possible_hits":"1",},
{"lineNum":"  149","line":"        }"},
{"lineNum":"  150","line":"    }"},
{"lineNum":"  151","line":"}"},
{"lineNum":"  152","line":""},
{"lineNum":"  153","line":"pub fn processFunction(cmp: *Compiler, nd: Node) void {","class":"lineCov","hits":"2","order":"4896","possible_hits":"2",},
{"lineNum":"  154","line":"    std.debug.assert(nd.getType() == NodeType.Function);","class":"lineCov","hits":"1","order":"4897","possible_hits":"1",},
{"lineNum":"  155","line":""},
{"lineNum":"  156","line":"    const func = nd.data.Function;","class":"linePartCov","hits":"2","order":"4898","possible_hits":"3",},
{"lineNum":"  157","line":""},
{"lineNum":"  158","line":"    std.debug.assert(!func.isArrow); // TODO: Implement arrow functions","class":"lineCov","hits":"1","order":"4899","possible_hits":"1",},
{"lineNum":"  159","line":"    std.debug.assert(func.body.getType() == .Block);","class":"lineCov","hits":"1","order":"4900","possible_hits":"1",},
{"lineNum":"  160","line":""},
{"lineNum":"  161","line":"    const nameIsValid = checkName(cmp, nd.csr, func);","class":"lineCov","hits":"1","order":"4901","possible_hits":"1",},
{"lineNum":"  162","line":""},
{"lineNum":"  163","line":"    const retTy = getReturnType(cmp, nd.csr, func);","class":"lineCov","hits":"1","order":"4906","possible_hits":"1",},
{"lineNum":"  164","line":""},
{"lineNum":"  165","line":"    cmp.pushScope();","class":"lineCov","hits":"1","order":"4911","possible_hits":"1",},
{"lineNum":"  166","line":"    defer cmp.popScope();","class":"lineCov","hits":"1","order":"4942","possible_hits":"1",},
{"lineNum":"  167","line":""},
{"lineNum":"  168","line":"    cmp.scope.ctx = .Function;","class":"lineCov","hits":"1","order":"4912","possible_hits":"1",},
{"lineNum":"  169","line":""},
{"lineNum":"  170","line":"    const hasFakeThis = func.args.items.len > 0 and std.mem.eql(","class":"lineCov","hits":"3","order":"4913","possible_hits":"3",},
{"lineNum":"  171","line":"        u8,"},
{"lineNum":"  172","line":"        func.args.items[0].name,","class":"linePartCov","hits":"1","order":"4914","possible_hits":"2",},
{"lineNum":"  173","line":"        \"this\","},
{"lineNum":"  174","line":"    );"},
{"lineNum":"  175","line":""},
{"lineNum":"  176","line":"    cmp.scope.put(","class":"lineCov","hits":"2","order":"4915","possible_hits":"2",},
{"lineNum":"  177","line":"        \"this\","},
{"lineNum":"  178","line":"        if (hasFakeThis)","class":"lineCov","hits":"2","order":"4916","possible_hits":"2",},
{"lineNum":"  179","line":"            getArgType(cmp, nd.csr, func.name, func.args.items[0])","class":"linePartCov","hits":"1","order":"4958","possible_hits":"2",},
{"lineNum":"  180","line":"        else"},
{"lineNum":"  181","line":"            cmp.typebook.getAny(),","class":"lineCov","hits":"1","order":"4917","possible_hits":"1",},
{"lineNum":"  182","line":"        true,"},
{"lineNum":"  183","line":"        nd.csr,","class":"lineCov","hits":"1","order":"4918","possible_hits":"1",},
{"lineNum":"  184","line":"    );"},
{"lineNum":"  185","line":""},
{"lineNum":"  186","line":"    const argOffset: usize = if (hasFakeThis) 1 else 0;","class":"lineCov","hits":"1","order":"4919","possible_hits":"1",},
{"lineNum":"  187","line":"    const argCount = func.args.items.len - argOffset;","class":"linePartCov","hits":"1","order":"4920","possible_hits":"2",},
{"lineNum":"  188","line":""},
{"lineNum":"  189","line":"    const argTys = allocate.alloc(cmp.alloc, Type.Ptr, argCount);","class":"lineCov","hits":"1","order":"4921","possible_hits":"1",},
{"lineNum":"  190","line":"    defer cmp.alloc.free(argTys);","class":"lineCov","hits":"1","order":"4941","possible_hits":"1",},
{"lineNum":"  191","line":""},
{"lineNum":"  192","line":"    for (func.args.items[argOffset..]) |arg, index| {","class":"lineCov","hits":"3","order":"4922","possible_hits":"3",},
{"lineNum":"  193","line":"        argTys[index] = getArgType(cmp, nd.csr, func.name, arg);","class":"linePartCov","hits":"1","order":"4923","possible_hits":"2",},
{"lineNum":"  194","line":"        cmp.scope.put(arg.name, argTys[index], false, arg.csr);","class":"lineCov","hits":"1","order":"4928","possible_hits":"1",},
{"lineNum":"  195","line":"    }"},
{"lineNum":"  196","line":""},
{"lineNum":"  197","line":"    const funcTy = cmp.typebook.getFunction(retTy, argTys);","class":"lineCov","hits":"1","order":"4929","possible_hits":"1",},
{"lineNum":"  198","line":""},
{"lineNum":"  199","line":"    if (nameIsValid)","class":"lineCov","hits":"2","order":"4930","possible_hits":"2",},
{"lineNum":"  200","line":"        if (func.name) |name|","class":"lineCov","hits":"3","order":"4931","possible_hits":"3",},
{"lineNum":"  201","line":"            cmp.scope.parent.?.put(name, funcTy, true, nd.csr);","class":"linePartCov","hits":"1","order":"4932","possible_hits":"2",},
{"lineNum":"  202","line":""},
{"lineNum":"  203","line":"    cmp.processNode(func.body);","class":"lineCov","hits":"1","order":"4933","possible_hits":"1",},
{"lineNum":"  204","line":""},
{"lineNum":"  205","line":"    traceReturns(cmp, func.body, funcTy.Function.ret);","class":"linePartCov","hits":"2","order":"4934","possible_hits":"3",},
{"lineNum":"  206","line":"}"},
{"lineNum":"  207","line":""},
{"lineNum":"  208","line":"test \"can compile a function\" {","class":"lineCov","hits":"2","order":"4893","possible_hits":"2",},
{"lineNum":"  209","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4943","possible_hits":"1",},
{"lineNum":"  210","line":"        .code = \"function adder(a: number, b: number) : void { a + b; }\","},
{"lineNum":"  211","line":"    }).run();","class":"lineCov","hits":"1","order":"4894","possible_hits":"1",},
{"lineNum":"  212","line":"}"},
{"lineNum":"  213","line":""},
{"lineNum":"  214","line":"test \"untyped function arguments trigger implicit any\" {","class":"lineCov","hits":"2","order":"4944","possible_hits":"2",},
{"lineNum":"  215","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4955","possible_hits":"1",},
{"lineNum":"  216","line":"        .code = \"function aFunction(a) {}\","},
{"lineNum":"  217","line":"        .check = (struct {"},
{"lineNum":"  218","line":"            pub fn check(self: CompilerTestCase, cmp: Compiler) anyerror!void {","class":"lineCov","hits":"2","order":"4949","possible_hits":"2",},
{"lineNum":"  219","line":"                try self.expectEqual(@intCast(usize, 1), cmp.errors.count());","class":"lineCov","hits":"1","order":"4950","possible_hits":"1",},
{"lineNum":"  220","line":""},
{"lineNum":"  221","line":"                const err = cmp.getError(0);","class":"lineCov","hits":"1","order":"4951","possible_hits":"1",},
{"lineNum":"  222","line":"                try self.expectEqual(","class":"lineCov","hits":"1","order":"4953","possible_hits":"1",},
{"lineNum":"  223","line":"                    CompileError.Type.ImplicitAnyError,"},
{"lineNum":"  224","line":"                    err.getType(),","class":"lineCov","hits":"1","order":"4952","possible_hits":"1",},
{"lineNum":"  225","line":"                );"},
{"lineNum":"  226","line":"                try self.expectEqualStrings(\"a\", err.ImplicitAnyError.symbol);","class":"lineCov","hits":"2","order":"4954","possible_hits":"2",},
{"lineNum":"  227","line":"            }"},
{"lineNum":"  228","line":"        }).check,"},
{"lineNum":"  229","line":"    }).run();","class":"lineCov","hits":"1","order":"4945","possible_hits":"1",},
{"lineNum":"  230","line":"}"},
{"lineNum":"  231","line":""},
{"lineNum":"  232","line":"test \"functions can have a fake \'this\' parameter\" {","class":"lineCov","hits":"2","order":"4956","possible_hits":"2",},
{"lineNum":"  233","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4969","possible_hits":"1",},
{"lineNum":"  234","line":"        .code = \"function aFunction(this: number, param: string) {}\","},
{"lineNum":"  235","line":"        .check = (struct {"},
{"lineNum":"  236","line":"            pub fn check(self: CompilerTestCase, cmp: Compiler) anyerror!void {","class":"lineCov","hits":"2","order":"4959","possible_hits":"2",},
{"lineNum":"  237","line":"                try self.checkNoErrors(cmp);","class":"lineCov","hits":"1","order":"4960","possible_hits":"1",},
{"lineNum":"  238","line":""},
{"lineNum":"  239","line":"                const f = cmp.scope.get(\"aFunction\");","class":"lineCov","hits":"1","order":"4961","possible_hits":"1",},
{"lineNum":"  240","line":"                try self.expect(f != null);","class":"lineCov","hits":"1","order":"4962","possible_hits":"1",},
{"lineNum":"  241","line":""},
{"lineNum":"  242","line":"                const ty = f.?.ty;","class":"linePartCov","hits":"1","order":"4963","possible_hits":"2",},
{"lineNum":"  243","line":"                try self.expectEqual(Type.Type.Function, ty.getType());","class":"linePartCov","hits":"1","order":"4964","possible_hits":"2",},
{"lineNum":"  244","line":"                try self.expectEqual(Type.Type.Void, ty.Function.ret.getType());","class":"lineCov","hits":"2","order":"4965","possible_hits":"2",},
{"lineNum":"  245","line":""},
{"lineNum":"  246","line":"                const args = ty.Function.args;","class":"linePartCov","hits":"2","order":"4966","possible_hits":"3",},
{"lineNum":"  247","line":"                try self.expectEqual(@intCast(usize, 1), args.len);","class":"linePartCov","hits":"1","order":"4967","possible_hits":"2",},
{"lineNum":"  248","line":"                try self.expectEqual(Type.Type.String, args[0].getType());","class":"linePartCov","hits":"1","order":"4968","possible_hits":"2",},
{"lineNum":"  249","line":"            }"},
{"lineNum":"  250","line":"        }).check,"},
{"lineNum":"  251","line":"    }).run();","class":"lineCov","hits":"1","order":"4957","possible_hits":"1",},
{"lineNum":"  252","line":"}"},
{"lineNum":"  253","line":""},
{"lineNum":"  254","line":"fn fnGenericErrorTestCase(","class":"lineCov","hits":"5","order":"4972","possible_hits":"5",},
{"lineNum":"  255","line":"    comptime code: []const u8,"},
{"lineNum":"  256","line":"    comptime expectedMessage: []const u8,"},
{"lineNum":"  257","line":") !void {","class":"lineCov","hits":"5","order":"5001","possible_hits":"5",},
{"lineNum":"  258","line":"    try (CompilerTestCase{","class":"lineCov","hits":"5","order":"5000","possible_hits":"5",},
{"lineNum":"  259","line":"        .code = code,"},
{"lineNum":"  260","line":"        .check = (struct {"},
{"lineNum":"  261","line":"            pub fn check(self: CompilerTestCase, cmp: Compiler) anyerror!void {","class":"lineCov","hits":"10","order":"4992","possible_hits":"10",},
{"lineNum":"  262","line":"                try self.expectEqual(@intCast(usize, 1), cmp.errors.count());","class":"lineCov","hits":"5","order":"4993","possible_hits":"5",},
{"lineNum":"  263","line":""},
{"lineNum":"  264","line":"                const err = cmp.getError(0);","class":"lineCov","hits":"5","order":"4994","possible_hits":"5",},
{"lineNum":"  265","line":"                try self.expectEqual(","class":"lineCov","hits":"5","order":"4996","possible_hits":"5",},
{"lineNum":"  266","line":"                    CompileError.Type.GenericError,"},
{"lineNum":"  267","line":"                    err.getType(),","class":"lineCov","hits":"5","order":"4995","possible_hits":"5",},
{"lineNum":"  268","line":"                );"},
{"lineNum":"  269","line":"                try self.expectEqualStrings(","class":"linePartCov","hits":"5","order":"4998","possible_hits":"10",},
{"lineNum":"  270","line":"                    expectedMessage,"},
{"lineNum":"  271","line":"                    err.GenericError.msg,","class":"linePartCov","hits":"10","order":"4997","possible_hits":"15",},
{"lineNum":"  272","line":"                );"},
{"lineNum":"  273","line":"            }"},
{"lineNum":"  274","line":"        }).check,"},
{"lineNum":"  275","line":"    }).run();","class":"lineCov","hits":"5","order":"4973","possible_hits":"5",},
{"lineNum":"  276","line":"}"},
{"lineNum":"  277","line":""},
{"lineNum":"  278","line":"test \"invalid function argument types throw an error in named functions\" {","class":"lineCov","hits":"2","order":"4970","possible_hits":"2",},
{"lineNum":"  279","line":"    try fnGenericErrorTestCase(","class":"lineCov","hits":"1","order":"4971","possible_hits":"1",},
{"lineNum":"  280","line":"        \"function aFunction(a: AnInvalidType) {}\","},
{"lineNum":"  281","line":"        \"Invalid type for argument \'a\' in function \'aFunction\'\","},
{"lineNum":"  282","line":"    );"},
{"lineNum":"  283","line":"}"},
{"lineNum":"  284","line":""},
{"lineNum":"  285","line":"test \"invalid function argument types throw an error in anonymous functions\" {","class":"lineCov","hits":"2","order":"5002","possible_hits":"2",},
{"lineNum":"  286","line":"    try fnGenericErrorTestCase(","class":"lineCov","hits":"1","order":"5003","possible_hits":"1",},
{"lineNum":"  287","line":"        \"function(a: AnInvalidType) {}\","},
{"lineNum":"  288","line":"        \"Invalid type for argument \'a\' in anonymous function\","},
{"lineNum":"  289","line":"    );"},
{"lineNum":"  290","line":"}"},
{"lineNum":"  291","line":""},
{"lineNum":"  292","line":"test \"invalid function return type throws an error in named functions\" {","class":"lineCov","hits":"2","order":"5007","possible_hits":"2",},
{"lineNum":"  293","line":"    try fnGenericErrorTestCase(","class":"lineCov","hits":"1","order":"5008","possible_hits":"1",},
{"lineNum":"  294","line":"        \"function aFunction() : AnInvalidType {}\","},
{"lineNum":"  295","line":"        \"Invalid return type for function \'aFunction\'\","},
{"lineNum":"  296","line":"    );"},
{"lineNum":"  297","line":"}"},
{"lineNum":"  298","line":""},
{"lineNum":"  299","line":"test \"invalid function return type throws an error in anonymous functions\" {","class":"lineCov","hits":"2","order":"5018","possible_hits":"2",},
{"lineNum":"  300","line":"    try fnGenericErrorTestCase(","class":"lineCov","hits":"1","order":"5019","possible_hits":"1",},
{"lineNum":"  301","line":"        \"function() : AnInvalidType {}\","},
{"lineNum":"  302","line":"        \"Invalid return type for anonymous function\","},
{"lineNum":"  303","line":"    );"},
{"lineNum":"  304","line":"}"},
{"lineNum":"  305","line":""},
{"lineNum":"  306","line":"test \"function throws error if symbol is already defined\" {","class":"lineCov","hits":"2","order":"5021","possible_hits":"2",},
{"lineNum":"  307","line":"    try fnGenericErrorTestCase(","class":"lineCov","hits":"1","order":"5022","possible_hits":"1",},
{"lineNum":"  308","line":"        \"function someFunction() {} function someFunction() {}\","},
{"lineNum":"  309","line":"        \"Symbol \'someFunction\' is already defined\","},
{"lineNum":"  310","line":"    );"},
{"lineNum":"  311","line":"}"},
{"lineNum":"  312","line":""},
{"lineNum":"  313","line":"pub fn processReturn(cmp: *Compiler, nd: Node) void {","class":"lineCov","hits":"2","order":"4785","possible_hits":"2",},
{"lineNum":"  314","line":"    std.debug.assert(nd.getType() == NodeType.Return);","class":"lineCov","hits":"1","order":"4786","possible_hits":"1",},
{"lineNum":"  315","line":""},
{"lineNum":"  316","line":"    if (nd.data.Return) |expr|","class":"lineCov","hits":"3","order":"4787","possible_hits":"3",},
{"lineNum":"  317","line":"        _ = cmp.inferExprType(expr);","class":"lineCov","hits":"1","order":"5030","possible_hits":"1",},
{"lineNum":"  318","line":"}"},
{"lineNum":"  319","line":""},
{"lineNum":"  320","line":"test \"can compile a return statement\" {","class":"lineCov","hits":"2","order":"5028","possible_hits":"2",},
{"lineNum":"  321","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"5040","possible_hits":"1",},
{"lineNum":"  322","line":"        .code = \"function id(a: number) : number { return a; }\","},
{"lineNum":"  323","line":"    }).run();","class":"lineCov","hits":"1","order":"5029","possible_hits":"1",},
{"lineNum":"  324","line":"}"},
{"lineNum":"  325","line":""},
{"lineNum":"  326","line":"fn returnErrorTestCase(","class":"lineCov","hits":"3","order":"5043","possible_hits":"3",},
{"lineNum":"  327","line":"    comptime code: []const u8,"},
{"lineNum":"  328","line":"    comptime expectedErr: []const u8,"},
{"lineNum":"  329","line":") !void {","class":"lineCov","hits":"3","order":"5061","possible_hits":"3",},
{"lineNum":"  330","line":"    try (CompilerTestCase{","class":"lineCov","hits":"3","order":"5060","possible_hits":"3",},
{"lineNum":"  331","line":"        .code = code,"},
{"lineNum":"  332","line":"        .check = (struct {"},
{"lineNum":"  333","line":"            pub fn check(self: CompilerTestCase, cmp: Compiler) anyerror!void {","class":"lineCov","hits":"9","order":"5048","possible_hits":"9",},
{"lineNum":"  334","line":"                try self.expectEqual(@intCast(usize, 1), cmp.errors.count());","class":"lineCov","hits":"3","order":"5049","possible_hits":"3",},
{"lineNum":"  335","line":""},
{"lineNum":"  336","line":"                const err = cmp.getError(0);","class":"lineCov","hits":"3","order":"5050","possible_hits":"3",},
{"lineNum":"  337","line":"                try self.expectEqual(","class":"lineCov","hits":"3","order":"5052","possible_hits":"3",},
{"lineNum":"  338","line":"                    CompileError.Type.ReturnError,"},
{"lineNum":"  339","line":"                    err.getType(),","class":"lineCov","hits":"3","order":"5051","possible_hits":"3",},
{"lineNum":"  340","line":"                );"},
{"lineNum":"  341","line":""},
{"lineNum":"  342","line":"                var ctx = try WriteContext(.{}).new(std.testing.allocator);","class":"lineCov","hits":"3","order":"5053","possible_hits":"3",},
{"lineNum":"  343","line":"                defer ctx.deinit();","class":"linePartCov","hits":"3","order":"5059","possible_hits":"12",},
{"lineNum":"  344","line":"                var writer = ctx.writer();","class":"lineCov","hits":"3","order":"5054","possible_hits":"3",},
{"lineNum":"  345","line":""},
{"lineNum":"  346","line":"                try cmp.errors.report(writer);","class":"linePartCov","hits":"3","order":"5055","possible_hits":"6",},
{"lineNum":"  347","line":""},
{"lineNum":"  348","line":"                var str = try ctx.toString();","class":"linePartCov","hits":"3","order":"5056","possible_hits":"6",},
{"lineNum":"  349","line":"                defer ctx.freeString(str);","class":"linePartCov","hits":"3","order":"5058","possible_hits":"6",},
{"lineNum":"  350","line":""},
{"lineNum":"  351","line":"                try self.expectEqualStrings(expectedErr, str);","class":"linePartCov","hits":"3","order":"5057","possible_hits":"6",},
{"lineNum":"  352","line":"            }"},
{"lineNum":"  353","line":"        }).check,"},
{"lineNum":"  354","line":"    }).run();","class":"lineCov","hits":"3","order":"5044","possible_hits":"3",},
{"lineNum":"  355","line":"}"},
{"lineNum":"  356","line":""},
{"lineNum":"  357","line":"test \"return statement expressions must have the correct type\" {","class":"lineCov","hits":"2","order":"5041","possible_hits":"2",},
{"lineNum":"  358","line":"    try returnErrorTestCase(","class":"lineCov","hits":"1","order":"5042","possible_hits":"1",},
{"lineNum":"  359","line":"        \"function f() : number { return \'not a number\'; }\","},
{"lineNum":"  360","line":"        \"Error: 1:25: Cannot return a value of type string from a function returning number\\n\","},
{"lineNum":"  361","line":"    );"},
{"lineNum":"  362","line":"}"},
{"lineNum":"  363","line":""},
{"lineNum":"  364","line":"test \"void functions must not return a value\" {","class":"lineCov","hits":"2","order":"5062","possible_hits":"2",},
{"lineNum":"  365","line":"    try returnErrorTestCase(","class":"lineCov","hits":"1","order":"5063","possible_hits":"1",},
{"lineNum":"  366","line":"        \"function f() : void { return \'not a number\'; }\","},
{"lineNum":"  367","line":"        \"Error: 1:23: Cannot return a value from a void function\\n\","},
{"lineNum":"  368","line":"    );"},
{"lineNum":"  369","line":"}"},
{"lineNum":"  370","line":""},
{"lineNum":"  371","line":"test \"non-void functions cannot return without a value\" {","class":"lineCov","hits":"2","order":"5066","possible_hits":"2",},
{"lineNum":"  372","line":"    try returnErrorTestCase(","class":"lineCov","hits":"1","order":"5067","possible_hits":"1",},
{"lineNum":"  373","line":"        \"function f() : string { return; }\","},
{"lineNum":"  374","line":"        \"Error: 1:25: Non-void function must return value of type string\\n\","},
{"lineNum":"  375","line":"    );"},
{"lineNum":"  376","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-19 08:42:21", "instrumented" : 168, "covered" : 168,};
var merged_data = [];
