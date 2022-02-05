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
{"lineNum":"   33","line":"fn checkName(cmp: *Compiler, csr: Cursor, func: node.Function) bool {","class":"lineCov","hits":"1","order":"5350","possible_hits":"1",},
{"lineNum":"   34","line":"    if (func.name) |name| {","class":"lineCov","hits":"2","order":"5351","possible_hits":"2",},
{"lineNum":"   35","line":"        if (cmp.scope.getLocal(name)) |_| {","class":"lineCov","hits":"2","order":"5352","possible_hits":"2",},
{"lineNum":"   36","line":"            cmp.errors.append(CompileError.genericError(","class":"lineCov","hits":"2","order":"5462","possible_hits":"2",},
{"lineNum":"   37","line":"                GenericError.new(csr, cmp.fmt(","class":"lineCov","hits":"2","order":"5463","possible_hits":"2",},
{"lineNum":"   38","line":"                    \"Symbol \'{s}\' is already defined\","},
{"lineNum":"   39","line":"                    .{name},","class":"lineCov","hits":"1","order":"5464","possible_hits":"1",},
{"lineNum":"   40","line":"                )),"},
{"lineNum":"   41","line":"            )) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"5465","possible_hits":"1",},
{"lineNum":"   42","line":"            return false;","class":"lineCov","hits":"1","order":"5466","possible_hits":"1",},
{"lineNum":"   43","line":"        }"},
{"lineNum":"   44","line":"    }"},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"    return true;","class":"lineCov","hits":"1","order":"5353","possible_hits":"1",},
{"lineNum":"   47","line":"}"},
{"lineNum":"   48","line":""},
{"lineNum":"   49","line":"fn addReturnTypeError(cmp: *Compiler, csr: Cursor, funcName: ?[]const u8) void {","class":"lineCov","hits":"2","order":"5449","possible_hits":"2",},
{"lineNum":"   50","line":"    const message = if (funcName) |fName|","class":"lineCov","hits":"2","order":"5450","possible_hits":"2",},
{"lineNum":"   51","line":"        cmp.fmt(\"Invalid return type for function \'{s}\'\", .{fName})","class":"lineCov","hits":"1","order":"5451","possible_hits":"1",},
{"lineNum":"   52","line":"    else"},
{"lineNum":"   53","line":"        \"Invalid return type for anonymous function\";","class":"lineCov","hits":"1","order":"5459","possible_hits":"1",},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"    cmp.errors.append(CompileError.genericError(","class":"lineCov","hits":"2","order":"5452","possible_hits":"2",},
{"lineNum":"   56","line":"        GenericError.new(csr, message),","class":"lineCov","hits":"1","order":"5453","possible_hits":"1",},
{"lineNum":"   57","line":"    )) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"5454","possible_hits":"1",},
{"lineNum":"   58","line":"}"},
{"lineNum":"   59","line":""},
{"lineNum":"   60","line":"fn getReturnType(cmp: *Compiler, csr: Cursor, func: node.Function) Type.Ptr {","class":"lineCov","hits":"1","order":"5355","possible_hits":"1",},
{"lineNum":"   61","line":"    if (func.retTy) |ty| {","class":"lineCov","hits":"1","order":"5356","possible_hits":"1",},
{"lineNum":"   62","line":"        if (cmp.findType(ty)) |retTy| {","class":"lineCov","hits":"1","order":"5357","possible_hits":"1",},
{"lineNum":"   63","line":"            return retTy;","class":"lineCov","hits":"1","order":"5358","possible_hits":"1",},
{"lineNum":"   64","line":"        } else {"},
{"lineNum":"   65","line":"            addReturnTypeError(cmp, csr, func.name);","class":"lineCov","hits":"1","order":"5448","possible_hits":"1",},
{"lineNum":"   66","line":"            return cmp.typebook.getAny();","class":"lineCov","hits":"1","order":"5455","possible_hits":"1",},
{"lineNum":"   67","line":"        }"},
{"lineNum":"   68","line":"    } else {"},
{"lineNum":"   69","line":"        return cmp.typebook.getVoid();","class":"lineCov","hits":"1","order":"5395","possible_hits":"1",},
{"lineNum":"   70","line":"    }"},
{"lineNum":"   71","line":"}"},
{"lineNum":"   72","line":""},
{"lineNum":"   73","line":"fn addArgTypeError(","class":"lineCov","hits":"1","order":"5423","possible_hits":"1",},
{"lineNum":"   74","line":"    cmp: *Compiler,"},
{"lineNum":"   75","line":"    csr: Cursor,"},
{"lineNum":"   76","line":"    argName: []const u8,"},
{"lineNum":"   77","line":"    funcName: ?[]const u8,"},
{"lineNum":"   78","line":") void {","class":"lineCov","hits":"1","order":"5430","possible_hits":"1",},
{"lineNum":"   79","line":"    const message = if (funcName) |fName|","class":"lineCov","hits":"2","order":"5424","possible_hits":"2",},
{"lineNum":"   80","line":"        cmp.fmt(","class":"lineCov","hits":"2","order":"5425","possible_hits":"2",},
{"lineNum":"   81","line":"            \"Invalid type for argument \'{s}\' in function \'{s}\'\","},
{"lineNum":"   82","line":"            .{ argName, fName },","class":"lineCov","hits":"1","order":"5426","possible_hits":"1",},
{"lineNum":"   83","line":"        )"},
{"lineNum":"   84","line":"    else"},
{"lineNum":"   85","line":"        cmp.fmt(","class":"lineCov","hits":"2","order":"5444","possible_hits":"2",},
{"lineNum":"   86","line":"            \"Invalid type for argument \'{s}\' in anonymous function\","},
{"lineNum":"   87","line":"            .{argName},","class":"lineCov","hits":"1","order":"5445","possible_hits":"1",},
{"lineNum":"   88","line":"        );"},
{"lineNum":"   89","line":""},
{"lineNum":"   90","line":"    cmp.errors.append(CompileError.genericError(","class":"lineCov","hits":"2","order":"5427","possible_hits":"2",},
{"lineNum":"   91","line":"        GenericError.new(csr, message),","class":"lineCov","hits":"1","order":"5428","possible_hits":"1",},
{"lineNum":"   92","line":"    )) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"5429","possible_hits":"1",},
{"lineNum":"   93","line":"}"},
{"lineNum":"   94","line":""},
{"lineNum":"   95","line":"fn getArgType(","class":"lineCov","hits":"1","order":"5372","possible_hits":"1",},
{"lineNum":"   96","line":"    cmp: *Compiler,"},
{"lineNum":"   97","line":"    csr: Cursor,"},
{"lineNum":"   98","line":"    funcName: ?[]const u8,"},
{"lineNum":"   99","line":"    arg: node.Function.Arg,"},
{"lineNum":"  100","line":") Type.Ptr {"},
{"lineNum":"  101","line":"    if (arg.ty) |declared| {","class":"lineCov","hits":"1","order":"5373","possible_hits":"1",},
{"lineNum":"  102","line":"        if (cmp.findType(declared)) |argTy| {","class":"lineCov","hits":"1","order":"5374","possible_hits":"1",},
{"lineNum":"  103","line":"            return argTy;","class":"lineCov","hits":"1","order":"5375","possible_hits":"1",},
{"lineNum":"  104","line":"        } else {"},
{"lineNum":"  105","line":"            addArgTypeError(cmp, csr, arg.name, funcName);","class":"lineCov","hits":"1","order":"5422","possible_hits":"1",},
{"lineNum":"  106","line":"            return cmp.typebook.getAny();","class":"lineCov","hits":"1","order":"5431","possible_hits":"1",},
{"lineNum":"  107","line":"        }"},
{"lineNum":"  108","line":"    } else {"},
{"lineNum":"  109","line":"        return cmp.implicitAny(csr, arg.name);","class":"lineCov","hits":"1","order":"5396","possible_hits":"1",},
{"lineNum":"  110","line":"    }"},
{"lineNum":"  111","line":"}"},
{"lineNum":"  112","line":""},
{"lineNum":"  113","line":"fn checkReturnExpr(","class":"lineCov","hits":"1","order":"5475","possible_hits":"1",},
{"lineNum":"  114","line":"    cmp: *Compiler,"},
{"lineNum":"  115","line":"    csr: Cursor,"},
{"lineNum":"  116","line":"    expectedTy: Type.Ptr,"},
{"lineNum":"  117","line":"    actualTy: ?Type.Ptr,"},
{"lineNum":"  118","line":") void {","class":"lineCov","hits":"1","order":"5478","possible_hits":"1",},
{"lineNum":"  119","line":"    if (actualTy) |ty| {","class":"lineCov","hits":"3","order":"5476","possible_hits":"3",},
{"lineNum":"  120","line":"        if (!ty.isAssignableTo(expectedTy)) {","class":"lineCov","hits":"2","order":"5477","possible_hits":"2",},
{"lineNum":"  121","line":"            cmp.errors.append(CompileError.returnError(","class":"lineCov","hits":"2","order":"5484","possible_hits":"2",},
{"lineNum":"  122","line":"                ReturnError.new(csr, expectedTy, ty),","class":"lineCov","hits":"1","order":"5485","possible_hits":"1",},
{"lineNum":"  123","line":"            )) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"5486","possible_hits":"1",},
{"lineNum":"  124","line":"        }"},
{"lineNum":"  125","line":"    } else if (expectedTy.getType() != .Void) {","class":"lineCov","hits":"2","order":"5507","possible_hits":"2",},
{"lineNum":"  126","line":"        cmp.errors.append(CompileError.returnError(","class":"lineCov","hits":"2","order":"5508","possible_hits":"2",},
{"lineNum":"  127","line":"            ReturnError.new(csr, expectedTy, null),","class":"lineCov","hits":"1","order":"5509","possible_hits":"1",},
{"lineNum":"  128","line":"        )) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"5510","possible_hits":"1",},
{"lineNum":"  129","line":"    }"},
{"lineNum":"  130","line":"}"},
{"lineNum":"  131","line":""},
{"lineNum":"  132","line":"fn traceReturns(cmp: *Compiler, nd: Node, retTy: Type.Ptr) void {","class":"lineCov","hits":"2","order":"5383","possible_hits":"2",},
{"lineNum":"  133","line":"    // TODO: Check all code paths return a suitable value"},
{"lineNum":"  134","line":""},
{"lineNum":"  135","line":"    std.debug.assert(nd.getType() == .Block);","class":"lineCov","hits":"1","order":"5384","possible_hits":"1",},
{"lineNum":"  136","line":""},
{"lineNum":"  137","line":"    if (retTy.getType() == .Any)","class":"lineCov","hits":"2","order":"5385","possible_hits":"2",},
{"lineNum":"  138","line":"        return;","class":"lineCov","hits":"1","order":"5456","possible_hits":"1",},
{"lineNum":"  139","line":""},
{"lineNum":"  140","line":"    for (nd.data.Block.items) |item| {","class":"lineCov","hits":"3","order":"5386","possible_hits":"3",},
{"lineNum":"  141","line":"        switch (item.data) {","class":"lineCov","hits":"1","order":"5387","possible_hits":"1",},
{"lineNum":"  142","line":"            .Return => |expr| checkReturnExpr(","class":"lineCov","hits":"2","order":"5470","possible_hits":"2",},
{"lineNum":"  143","line":"                cmp,","class":"lineCov","hits":"1","order":"5471","possible_hits":"1",},
{"lineNum":"  144","line":"                item.csr,","class":"lineCov","hits":"1","order":"5472","possible_hits":"1",},
{"lineNum":"  145","line":"                retTy,","class":"lineCov","hits":"1","order":"5473","possible_hits":"1",},
{"lineNum":"  146","line":"                if (expr) |exp| exp.ty else null,","class":"lineCov","hits":"1","order":"5474","possible_hits":"1",},
{"lineNum":"  147","line":"            ),"},
{"lineNum":"  148","line":"            else => continue,","class":"lineCov","hits":"1","order":"5388","possible_hits":"1",},
{"lineNum":"  149","line":"        }"},
{"lineNum":"  150","line":"    }"},
{"lineNum":"  151","line":"}"},
{"lineNum":"  152","line":""},
{"lineNum":"  153","line":"pub fn processFunction(cmp: *Compiler, nd: Node) void {","class":"lineCov","hits":"2","order":"5344","possible_hits":"2",},
{"lineNum":"  154","line":"    std.debug.assert(nd.getType() == NodeType.Function);","class":"lineCov","hits":"1","order":"5345","possible_hits":"1",},
{"lineNum":"  155","line":""},
{"lineNum":"  156","line":"    const func = nd.data.Function;","class":"linePartCov","hits":"2","order":"5346","possible_hits":"3",},
{"lineNum":"  157","line":""},
{"lineNum":"  158","line":"    std.debug.assert(!func.isArrow); // TODO: Implement arrow functions","class":"lineCov","hits":"1","order":"5347","possible_hits":"1",},
{"lineNum":"  159","line":"    std.debug.assert(func.body.getType() == .Block);","class":"lineCov","hits":"1","order":"5348","possible_hits":"1",},
{"lineNum":"  160","line":""},
{"lineNum":"  161","line":"    const nameIsValid = checkName(cmp, nd.csr, func);","class":"lineCov","hits":"1","order":"5349","possible_hits":"1",},
{"lineNum":"  162","line":""},
{"lineNum":"  163","line":"    const retTy = getReturnType(cmp, nd.csr, func);","class":"lineCov","hits":"1","order":"5354","possible_hits":"1",},
{"lineNum":"  164","line":""},
{"lineNum":"  165","line":"    cmp.pushScope();","class":"lineCov","hits":"1","order":"5359","possible_hits":"1",},
{"lineNum":"  166","line":"    defer cmp.popScope();","class":"lineCov","hits":"1","order":"5390","possible_hits":"1",},
{"lineNum":"  167","line":""},
{"lineNum":"  168","line":"    cmp.scope.ctx = .Function;","class":"lineCov","hits":"1","order":"5360","possible_hits":"1",},
{"lineNum":"  169","line":""},
{"lineNum":"  170","line":"    const hasFakeThis = func.args.items.len > 0 and std.mem.eql(","class":"lineCov","hits":"3","order":"5361","possible_hits":"3",},
{"lineNum":"  171","line":"        u8,"},
{"lineNum":"  172","line":"        func.args.items[0].name,","class":"linePartCov","hits":"1","order":"5362","possible_hits":"2",},
{"lineNum":"  173","line":"        \"this\","},
{"lineNum":"  174","line":"    );"},
{"lineNum":"  175","line":""},
{"lineNum":"  176","line":"    cmp.scope.put(","class":"lineCov","hits":"2","order":"5363","possible_hits":"2",},
{"lineNum":"  177","line":"        \"this\","},
{"lineNum":"  178","line":"        if (hasFakeThis)","class":"lineCov","hits":"2","order":"5364","possible_hits":"2",},
{"lineNum":"  179","line":"            getArgType(cmp, nd.csr, func.name, func.args.items[0])","class":"linePartCov","hits":"1","order":"5406","possible_hits":"2",},
{"lineNum":"  180","line":"        else"},
{"lineNum":"  181","line":"            cmp.typebook.getAny(),","class":"lineCov","hits":"1","order":"5365","possible_hits":"1",},
{"lineNum":"  182","line":"        true,"},
{"lineNum":"  183","line":"        nd.csr,","class":"lineCov","hits":"1","order":"5366","possible_hits":"1",},
{"lineNum":"  184","line":"    );"},
{"lineNum":"  185","line":""},
{"lineNum":"  186","line":"    const argOffset: usize = if (hasFakeThis) 1 else 0;","class":"lineCov","hits":"1","order":"5367","possible_hits":"1",},
{"lineNum":"  187","line":"    const argCount = func.args.items.len - argOffset;","class":"linePartCov","hits":"1","order":"5368","possible_hits":"2",},
{"lineNum":"  188","line":""},
{"lineNum":"  189","line":"    const argTys = allocate.alloc(cmp.alloc, Type.Ptr, argCount);","class":"lineCov","hits":"1","order":"5369","possible_hits":"1",},
{"lineNum":"  190","line":"    defer cmp.alloc.free(argTys);","class":"lineCov","hits":"1","order":"5389","possible_hits":"1",},
{"lineNum":"  191","line":""},
{"lineNum":"  192","line":"    for (func.args.items[argOffset..]) |arg, index| {","class":"lineCov","hits":"3","order":"5370","possible_hits":"3",},
{"lineNum":"  193","line":"        argTys[index] = getArgType(cmp, nd.csr, func.name, arg);","class":"linePartCov","hits":"1","order":"5371","possible_hits":"2",},
{"lineNum":"  194","line":"        cmp.scope.put(arg.name, argTys[index], false, arg.csr);","class":"lineCov","hits":"1","order":"5376","possible_hits":"1",},
{"lineNum":"  195","line":"    }"},
{"lineNum":"  196","line":""},
{"lineNum":"  197","line":"    // TODO: Check for construct signature?"},
{"lineNum":"  198","line":"    const funcTy = cmp.typebook.getFunction(retTy, argTys, false);","class":"lineCov","hits":"1","order":"5377","possible_hits":"1",},
{"lineNum":"  199","line":""},
{"lineNum":"  200","line":"    if (nameIsValid)","class":"lineCov","hits":"2","order":"5378","possible_hits":"2",},
{"lineNum":"  201","line":"        if (func.name) |name|","class":"lineCov","hits":"3","order":"5379","possible_hits":"3",},
{"lineNum":"  202","line":"            cmp.scope.parent.?.put(name, funcTy, true, nd.csr);","class":"linePartCov","hits":"1","order":"5380","possible_hits":"2",},
{"lineNum":"  203","line":""},
{"lineNum":"  204","line":"    cmp.processNode(func.body);","class":"lineCov","hits":"1","order":"5381","possible_hits":"1",},
{"lineNum":"  205","line":""},
{"lineNum":"  206","line":"    traceReturns(cmp, func.body, funcTy.Function.ret);","class":"linePartCov","hits":"2","order":"5382","possible_hits":"3",},
{"lineNum":"  207","line":"}"},
{"lineNum":"  208","line":""},
{"lineNum":"  209","line":"test \"can compile a function\" {","class":"lineCov","hits":"2","order":"5341","possible_hits":"2",},
{"lineNum":"  210","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"5391","possible_hits":"1",},
{"lineNum":"  211","line":"        .code = \"function adder(a: number, b: number) : void { a + b; }\","},
{"lineNum":"  212","line":"    }).run();","class":"lineCov","hits":"1","order":"5342","possible_hits":"1",},
{"lineNum":"  213","line":"}"},
{"lineNum":"  214","line":""},
{"lineNum":"  215","line":"test \"untyped function arguments trigger implicit any\" {","class":"lineCov","hits":"2","order":"5392","possible_hits":"2",},
{"lineNum":"  216","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"5403","possible_hits":"1",},
{"lineNum":"  217","line":"        .code = \"function aFunction(a) {}\","},
{"lineNum":"  218","line":"        .check = (struct {"},
{"lineNum":"  219","line":"            pub fn check(self: CompilerTestCase, cmp: Compiler) anyerror!void {","class":"lineCov","hits":"2","order":"5397","possible_hits":"2",},
{"lineNum":"  220","line":"                try self.expectEqual(@intCast(usize, 1), cmp.errors.count());","class":"lineCov","hits":"1","order":"5398","possible_hits":"1",},
{"lineNum":"  221","line":""},
{"lineNum":"  222","line":"                const err = cmp.getError(0);","class":"lineCov","hits":"1","order":"5399","possible_hits":"1",},
{"lineNum":"  223","line":"                try self.expectEqual(","class":"lineCov","hits":"1","order":"5401","possible_hits":"1",},
{"lineNum":"  224","line":"                    CompileError.Type.ImplicitAnyError,"},
{"lineNum":"  225","line":"                    err.getType(),","class":"lineCov","hits":"1","order":"5400","possible_hits":"1",},
{"lineNum":"  226","line":"                );"},
{"lineNum":"  227","line":"                try self.expectEqualStrings(\"a\", err.ImplicitAnyError.symbol);","class":"lineCov","hits":"2","order":"5402","possible_hits":"2",},
{"lineNum":"  228","line":"            }"},
{"lineNum":"  229","line":"        }).check,"},
{"lineNum":"  230","line":"    }).run();","class":"lineCov","hits":"1","order":"5393","possible_hits":"1",},
{"lineNum":"  231","line":"}"},
{"lineNum":"  232","line":""},
{"lineNum":"  233","line":"test \"functions can have a fake \'this\' parameter\" {","class":"lineCov","hits":"2","order":"5404","possible_hits":"2",},
{"lineNum":"  234","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"5417","possible_hits":"1",},
{"lineNum":"  235","line":"        .code = \"function aFunction(this: number, param: string) {}\","},
{"lineNum":"  236","line":"        .check = (struct {"},
{"lineNum":"  237","line":"            pub fn check(self: CompilerTestCase, cmp: Compiler) anyerror!void {","class":"lineCov","hits":"2","order":"5407","possible_hits":"2",},
{"lineNum":"  238","line":"                try self.checkNoErrors(cmp);","class":"lineCov","hits":"1","order":"5408","possible_hits":"1",},
{"lineNum":"  239","line":""},
{"lineNum":"  240","line":"                const f = cmp.scope.get(\"aFunction\");","class":"lineCov","hits":"1","order":"5409","possible_hits":"1",},
{"lineNum":"  241","line":"                try self.expect(f != null);","class":"lineCov","hits":"1","order":"5410","possible_hits":"1",},
{"lineNum":"  242","line":""},
{"lineNum":"  243","line":"                const ty = f.?.ty;","class":"linePartCov","hits":"1","order":"5411","possible_hits":"2",},
{"lineNum":"  244","line":"                try self.expectEqual(Type.Type.Function, ty.getType());","class":"linePartCov","hits":"1","order":"5412","possible_hits":"2",},
{"lineNum":"  245","line":"                try self.expectEqual(Type.Type.Void, ty.Function.ret.getType());","class":"lineCov","hits":"2","order":"5413","possible_hits":"2",},
{"lineNum":"  246","line":""},
{"lineNum":"  247","line":"                const args = ty.Function.args;","class":"linePartCov","hits":"2","order":"5414","possible_hits":"3",},
{"lineNum":"  248","line":"                try self.expectEqual(@intCast(usize, 1), args.len);","class":"linePartCov","hits":"1","order":"5415","possible_hits":"2",},
{"lineNum":"  249","line":"                try self.expectEqual(Type.Type.String, args[0].getType());","class":"linePartCov","hits":"1","order":"5416","possible_hits":"2",},
{"lineNum":"  250","line":"            }"},
{"lineNum":"  251","line":"        }).check,"},
{"lineNum":"  252","line":"    }).run();","class":"lineCov","hits":"1","order":"5405","possible_hits":"1",},
{"lineNum":"  253","line":"}"},
{"lineNum":"  254","line":""},
{"lineNum":"  255","line":"fn fnGenericErrorTestCase(","class":"lineCov","hits":"5","order":"5420","possible_hits":"5",},
{"lineNum":"  256","line":"    comptime code: []const u8,"},
{"lineNum":"  257","line":"    comptime expectedMessage: []const u8,"},
{"lineNum":"  258","line":") !void {","class":"lineCov","hits":"5","order":"5440","possible_hits":"5",},
{"lineNum":"  259","line":"    try (CompilerTestCase{","class":"lineCov","hits":"5","order":"5439","possible_hits":"5",},
{"lineNum":"  260","line":"        .code = code,"},
{"lineNum":"  261","line":"        .check = (struct {"},
{"lineNum":"  262","line":"            pub fn check(self: CompilerTestCase, cmp: Compiler) anyerror!void {","class":"lineCov","hits":"10","order":"5432","possible_hits":"10",},
{"lineNum":"  263","line":"                try self.expectEqual(@intCast(usize, 1), cmp.errors.count());","class":"lineCov","hits":"5","order":"5433","possible_hits":"5",},
{"lineNum":"  264","line":""},
{"lineNum":"  265","line":"                const err = cmp.getError(0);","class":"lineCov","hits":"5","order":"5434","possible_hits":"5",},
{"lineNum":"  266","line":"                try self.expectEqual(","class":"lineCov","hits":"5","order":"5436","possible_hits":"5",},
{"lineNum":"  267","line":"                    CompileError.Type.GenericError,"},
{"lineNum":"  268","line":"                    err.getType(),","class":"lineCov","hits":"5","order":"5435","possible_hits":"5",},
{"lineNum":"  269","line":"                );"},
{"lineNum":"  270","line":"                try self.expectEqualStrings(","class":"linePartCov","hits":"5","order":"5438","possible_hits":"10",},
{"lineNum":"  271","line":"                    expectedMessage,"},
{"lineNum":"  272","line":"                    err.GenericError.msg,","class":"linePartCov","hits":"10","order":"5437","possible_hits":"15",},
{"lineNum":"  273","line":"                );"},
{"lineNum":"  274","line":"            }"},
{"lineNum":"  275","line":"        }).check,"},
{"lineNum":"  276","line":"    }).run();","class":"lineCov","hits":"5","order":"5421","possible_hits":"5",},
{"lineNum":"  277","line":"}"},
{"lineNum":"  278","line":""},
{"lineNum":"  279","line":"test \"invalid function argument types throw an error in named functions\" {","class":"lineCov","hits":"2","order":"5418","possible_hits":"2",},
{"lineNum":"  280","line":"    try fnGenericErrorTestCase(","class":"lineCov","hits":"1","order":"5419","possible_hits":"1",},
{"lineNum":"  281","line":"        \"function aFunction(a: AnInvalidType) {}\","},
{"lineNum":"  282","line":"        \"Invalid type for argument \'a\' in function \'aFunction\'\","},
{"lineNum":"  283","line":"    );"},
{"lineNum":"  284","line":"}"},
{"lineNum":"  285","line":""},
{"lineNum":"  286","line":"test \"invalid function argument types throw an error in anonymous functions\" {","class":"lineCov","hits":"2","order":"5441","possible_hits":"2",},
{"lineNum":"  287","line":"    try fnGenericErrorTestCase(","class":"lineCov","hits":"1","order":"5442","possible_hits":"1",},
{"lineNum":"  288","line":"        \"function(a: AnInvalidType) {}\","},
{"lineNum":"  289","line":"        \"Invalid type for argument \'a\' in anonymous function\","},
{"lineNum":"  290","line":"    );"},
{"lineNum":"  291","line":"}"},
{"lineNum":"  292","line":""},
{"lineNum":"  293","line":"test \"invalid function return type throws an error in named functions\" {","class":"lineCov","hits":"2","order":"5446","possible_hits":"2",},
{"lineNum":"  294","line":"    try fnGenericErrorTestCase(","class":"lineCov","hits":"1","order":"5447","possible_hits":"1",},
{"lineNum":"  295","line":"        \"function aFunction() : AnInvalidType {}\","},
{"lineNum":"  296","line":"        \"Invalid return type for function \'aFunction\'\","},
{"lineNum":"  297","line":"    );"},
{"lineNum":"  298","line":"}"},
{"lineNum":"  299","line":""},
{"lineNum":"  300","line":"test \"invalid function return type throws an error in anonymous functions\" {","class":"lineCov","hits":"2","order":"5457","possible_hits":"2",},
{"lineNum":"  301","line":"    try fnGenericErrorTestCase(","class":"lineCov","hits":"1","order":"5458","possible_hits":"1",},
{"lineNum":"  302","line":"        \"function() : AnInvalidType {}\","},
{"lineNum":"  303","line":"        \"Invalid return type for anonymous function\","},
{"lineNum":"  304","line":"    );"},
{"lineNum":"  305","line":"}"},
{"lineNum":"  306","line":""},
{"lineNum":"  307","line":"test \"function throws error if symbol is already defined\" {","class":"lineCov","hits":"2","order":"5460","possible_hits":"2",},
{"lineNum":"  308","line":"    try fnGenericErrorTestCase(","class":"lineCov","hits":"1","order":"5461","possible_hits":"1",},
{"lineNum":"  309","line":"        \"function someFunction() {} function someFunction() {}\","},
{"lineNum":"  310","line":"        \"Symbol \'someFunction\' is already defined\","},
{"lineNum":"  311","line":"    );"},
{"lineNum":"  312","line":"}"},
{"lineNum":"  313","line":""},
{"lineNum":"  314","line":"pub fn processReturn(cmp: *Compiler, nd: Node) void {","class":"lineCov","hits":"2","order":"5233","possible_hits":"2",},
{"lineNum":"  315","line":"    std.debug.assert(nd.getType() == NodeType.Return);","class":"lineCov","hits":"1","order":"5234","possible_hits":"1",},
{"lineNum":"  316","line":""},
{"lineNum":"  317","line":"    if (nd.data.Return) |expr|","class":"lineCov","hits":"3","order":"5235","possible_hits":"3",},
{"lineNum":"  318","line":"        _ = cmp.inferExprType(expr);","class":"lineCov","hits":"1","order":"5469","possible_hits":"1",},
{"lineNum":"  319","line":"}"},
{"lineNum":"  320","line":""},
{"lineNum":"  321","line":"test \"can compile a return statement\" {","class":"lineCov","hits":"2","order":"5467","possible_hits":"2",},
{"lineNum":"  322","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"5479","possible_hits":"1",},
{"lineNum":"  323","line":"        .code = \"function id(a: number) : number { return a; }\","},
{"lineNum":"  324","line":"    }).run();","class":"lineCov","hits":"1","order":"5468","possible_hits":"1",},
{"lineNum":"  325","line":"}"},
{"lineNum":"  326","line":""},
{"lineNum":"  327","line":"fn returnErrorTestCase(","class":"lineCov","hits":"3","order":"5482","possible_hits":"3",},
{"lineNum":"  328","line":"    comptime code: []const u8,"},
{"lineNum":"  329","line":"    comptime expectedErr: []const u8,"},
{"lineNum":"  330","line":") !void {","class":"lineCov","hits":"3","order":"5500","possible_hits":"3",},
{"lineNum":"  331","line":"    try (CompilerTestCase{","class":"lineCov","hits":"3","order":"5499","possible_hits":"3",},
{"lineNum":"  332","line":"        .code = code,"},
{"lineNum":"  333","line":"        .check = (struct {"},
{"lineNum":"  334","line":"            pub fn check(self: CompilerTestCase, cmp: Compiler) anyerror!void {","class":"lineCov","hits":"9","order":"5487","possible_hits":"9",},
{"lineNum":"  335","line":"                try self.expectEqual(@intCast(usize, 1), cmp.errors.count());","class":"lineCov","hits":"3","order":"5488","possible_hits":"3",},
{"lineNum":"  336","line":""},
{"lineNum":"  337","line":"                const err = cmp.getError(0);","class":"lineCov","hits":"3","order":"5489","possible_hits":"3",},
{"lineNum":"  338","line":"                try self.expectEqual(","class":"lineCov","hits":"3","order":"5491","possible_hits":"3",},
{"lineNum":"  339","line":"                    CompileError.Type.ReturnError,"},
{"lineNum":"  340","line":"                    err.getType(),","class":"lineCov","hits":"3","order":"5490","possible_hits":"3",},
{"lineNum":"  341","line":"                );"},
{"lineNum":"  342","line":""},
{"lineNum":"  343","line":"                var ctx = try WriteContext(.{}).new(std.testing.allocator);","class":"lineCov","hits":"3","order":"5492","possible_hits":"3",},
{"lineNum":"  344","line":"                defer ctx.deinit();","class":"linePartCov","hits":"3","order":"5498","possible_hits":"12",},
{"lineNum":"  345","line":"                var writer = ctx.writer();","class":"lineCov","hits":"3","order":"5493","possible_hits":"3",},
{"lineNum":"  346","line":""},
{"lineNum":"  347","line":"                try cmp.errors.report(writer);","class":"linePartCov","hits":"3","order":"5494","possible_hits":"6",},
{"lineNum":"  348","line":""},
{"lineNum":"  349","line":"                var str = try ctx.toString();","class":"linePartCov","hits":"3","order":"5495","possible_hits":"6",},
{"lineNum":"  350","line":"                defer ctx.freeString(str);","class":"linePartCov","hits":"3","order":"5497","possible_hits":"6",},
{"lineNum":"  351","line":""},
{"lineNum":"  352","line":"                try self.expectEqualStrings(expectedErr, str);","class":"linePartCov","hits":"3","order":"5496","possible_hits":"6",},
{"lineNum":"  353","line":"            }"},
{"lineNum":"  354","line":"        }).check,"},
{"lineNum":"  355","line":"    }).run();","class":"lineCov","hits":"3","order":"5483","possible_hits":"3",},
{"lineNum":"  356","line":"}"},
{"lineNum":"  357","line":""},
{"lineNum":"  358","line":"test \"return statement expressions must have the correct type\" {","class":"lineCov","hits":"2","order":"5480","possible_hits":"2",},
{"lineNum":"  359","line":"    try returnErrorTestCase(","class":"lineCov","hits":"1","order":"5481","possible_hits":"1",},
{"lineNum":"  360","line":"        \"function f() : number { return \'not a number\'; }\","},
{"lineNum":"  361","line":"        \"Error: 1:25: Cannot return a value of type string from a function returning number\\n\","},
{"lineNum":"  362","line":"    );"},
{"lineNum":"  363","line":"}"},
{"lineNum":"  364","line":""},
{"lineNum":"  365","line":"test \"void functions must not return a value\" {","class":"lineCov","hits":"2","order":"5501","possible_hits":"2",},
{"lineNum":"  366","line":"    try returnErrorTestCase(","class":"lineCov","hits":"1","order":"5502","possible_hits":"1",},
{"lineNum":"  367","line":"        \"function f() : void { return \'not a number\'; }\","},
{"lineNum":"  368","line":"        \"Error: 1:23: Cannot return a value from a void function\\n\","},
{"lineNum":"  369","line":"    );"},
{"lineNum":"  370","line":"}"},
{"lineNum":"  371","line":""},
{"lineNum":"  372","line":"test \"non-void functions cannot return without a value\" {","class":"lineCov","hits":"2","order":"5505","possible_hits":"2",},
{"lineNum":"  373","line":"    try returnErrorTestCase(","class":"lineCov","hits":"1","order":"5506","possible_hits":"1",},
{"lineNum":"  374","line":"        \"function f() : string { return; }\","},
{"lineNum":"  375","line":"        \"Error: 1:25: Non-void function must return value of type string\\n\","},
{"lineNum":"  376","line":"    );"},
{"lineNum":"  377","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-05 11:24:09", "instrumented" : 168, "covered" : 168,};
var merged_data = [];
