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
{"lineNum":"   26","line":"const RedefinitionError = @import(\"errors/redefinition_error.zig\").RedefinitionError;"},
{"lineNum":"   27","line":"const GenericError = @import(\"errors/generic_error.zig\").GenericError;"},
{"lineNum":"   28","line":"const CompileError = @import(\"errors/compile_error.zig\").CompileError;"},
{"lineNum":"   29","line":"const CompilerTestCase = @import(\"compiler_test_case.zig\").CompilerTestCase;"},
{"lineNum":"   30","line":"const allocate = @import(\"../common/allocate.zig\");"},
{"lineNum":"   31","line":""},
{"lineNum":"   32","line":"fn declWithAssign(cmp: *Compiler, csr: Cursor, decl: node.Decl) void {","class":"lineCov","hits":"2","order":"4295","possible_hits":"2",},
{"lineNum":"   33","line":"    std.debug.assert(decl.value != null);","class":"lineCov","hits":"1","order":"4296","possible_hits":"1",},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"    if (cmp.inferExprType(decl.value.?)) |valueTy| {","class":"linePartCov","hits":"2","order":"4297","possible_hits":"3",},
{"lineNum":"   36","line":"        const isConst = decl.scoping == .Const;","class":"lineCov","hits":"1","order":"4311","possible_hits":"1",},
{"lineNum":"   37","line":""},
{"lineNum":"   38","line":"        if (decl.ty) |annotationNode| {","class":"lineCov","hits":"2","order":"4312","possible_hits":"2",},
{"lineNum":"   39","line":"            if (cmp.findType(annotationNode)) |annotation| {","class":"lineCov","hits":"2","order":"4525","possible_hits":"2",},
{"lineNum":"   40","line":"                if (!valueTy.isAssignableTo(annotation)) {","class":"linePartCov","hits":"1","order":"4526","possible_hits":"2",},
{"lineNum":"   41","line":"                    cmp.errors.append(CompileError.typeError(","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   42","line":"                        TypeError.new(csr, valueTy, annotation),","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   43","line":"                    )) catch allocate.reportAndExit();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   44","line":"                }"},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"                cmp.scope.put(decl.name, annotation, isConst, csr);","class":"lineCov","hits":"1","order":"4527","possible_hits":"1",},
{"lineNum":"   47","line":"            } else {"},
{"lineNum":"   48","line":"                annotationNode.dump();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   49","line":"                cmp.errors.append(CompileError.genericError(","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   50","line":"                    GenericError.new(csr, \"Invalid type annotation\"),","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   51","line":"                )) catch allocate.reportAndExit();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   52","line":"                cmp.scope.put(decl.name, valueTy, isConst, csr);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   53","line":"            }"},
{"lineNum":"   54","line":"        } else {"},
{"lineNum":"   55","line":"            cmp.scope.put(decl.name, valueTy, isConst, csr);","class":"lineCov","hits":"1","order":"4313","possible_hits":"1",},
{"lineNum":"   56","line":"        }"},
{"lineNum":"   57","line":"    }"},
{"lineNum":"   58","line":"}"},
{"lineNum":"   59","line":""},
{"lineNum":"   60","line":"fn declWithoutAssign(cmp: *Compiler, csr: Cursor, decl: node.Decl) void {","class":"lineCov","hits":"2","order":"4471","possible_hits":"2",},
{"lineNum":"   61","line":"    std.debug.assert(decl.value == null);","class":"lineCov","hits":"1","order":"4472","possible_hits":"1",},
{"lineNum":"   62","line":""},
{"lineNum":"   63","line":"    if (decl.scoping == .Const) {","class":"lineCov","hits":"2","order":"4473","possible_hits":"2",},
{"lineNum":"   64","line":"        cmp.errors.append(CompileError.genericError(","class":"lineCov","hits":"2","order":"4474","possible_hits":"2",},
{"lineNum":"   65","line":"            GenericError.new(csr, \"Constant value must be initialized\"),","class":"lineCov","hits":"1","order":"4475","possible_hits":"1",},
{"lineNum":"   66","line":"        )) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"4476","possible_hits":"1",},
{"lineNum":"   67","line":"        return;","class":"lineCov","hits":"1","order":"4477","possible_hits":"1",},
{"lineNum":"   68","line":"    }"},
{"lineNum":"   69","line":""},
{"lineNum":"   70","line":"    const annotation = if (decl.ty) |ty|","class":"lineCov","hits":"2","order":"4491","possible_hits":"2",},
{"lineNum":"   71","line":"        cmp.findType(ty)","class":"lineCov","hits":"1","order":"4511","possible_hits":"1",},
{"lineNum":"   72","line":"    else"},
{"lineNum":"   73","line":"        cmp.implicitAny(csr, decl.name);","class":"lineCov","hits":"1","order":"4492","possible_hits":"1",},
{"lineNum":"   74","line":""},
{"lineNum":"   75","line":"    if (annotation) |ty| {","class":"lineCov","hits":"3","order":"4499","possible_hits":"3",},
{"lineNum":"   76","line":"        cmp.scope.put(decl.name, ty, false, csr);","class":"lineCov","hits":"1","order":"4500","possible_hits":"1",},
{"lineNum":"   77","line":"    } else {"},
{"lineNum":"   78","line":"        cmp.errors.append(CompileError.genericError(","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   79","line":"            GenericError.new(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   80","line":"                csr,"},
{"lineNum":"   81","line":"                cmp.fmt(\"Invalid type for variable \'{s}\'\", .{decl.name}),","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   82","line":"            ),"},
{"lineNum":"   83","line":"        )) catch allocate.reportAndExit();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   84","line":"    }"},
{"lineNum":"   85","line":"}"},
{"lineNum":"   86","line":""},
{"lineNum":"   87","line":"pub fn processDecl(cmp: *Compiler, nd: Node) void {","class":"lineCov","hits":"2","order":"4289","possible_hits":"2",},
{"lineNum":"   88","line":"    std.debug.assert(nd.getType() == NodeType.Decl);","class":"lineCov","hits":"1","order":"4290","possible_hits":"1",},
{"lineNum":"   89","line":""},
{"lineNum":"   90","line":"    const decl = nd.data.Decl;","class":"linePartCov","hits":"2","order":"4291","possible_hits":"3",},
{"lineNum":"   91","line":""},
{"lineNum":"   92","line":"    if (cmp.scope.getLocal(decl.name)) |previous| {","class":"lineCov","hits":"3","order":"4292","possible_hits":"3",},
{"lineNum":"   93","line":"        cmp.errors.append(CompileError.redefinitionError(","class":"lineCov","hits":"2","order":"4546","possible_hits":"2",},
{"lineNum":"   94","line":"            RedefinitionError.new(decl.name, previous.csr, nd.csr),","class":"lineCov","hits":"1","order":"4547","possible_hits":"1",},
{"lineNum":"   95","line":"        )) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"4548","possible_hits":"1",},
{"lineNum":"   96","line":"        return;","class":"lineCov","hits":"1","order":"4549","possible_hits":"1",},
{"lineNum":"   97","line":"    }"},
{"lineNum":"   98","line":""},
{"lineNum":"   99","line":"    if (decl.value) |_|","class":"lineCov","hits":"2","order":"4293","possible_hits":"2",},
{"lineNum":"  100","line":"        declWithAssign(cmp, nd.csr, decl)","class":"lineCov","hits":"1","order":"4294","possible_hits":"1",},
{"lineNum":"  101","line":"    else"},
{"lineNum":"  102","line":"        declWithoutAssign(cmp, nd.csr, decl);","class":"lineCov","hits":"1","order":"4470","possible_hits":"1",},
{"lineNum":"  103","line":"}"},
{"lineNum":"  104","line":""},
{"lineNum":"  105","line":"test \"constants must be initialized\" {","class":"lineCov","hits":"2","order":"4468","possible_hits":"2",},
{"lineNum":"  106","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4488","possible_hits":"1",},
{"lineNum":"  107","line":"        .code = \"const aVariable;\","},
{"lineNum":"  108","line":"        .check = (struct {"},
{"lineNum":"  109","line":"            fn check(case: CompilerTestCase, cmp: Compiler) anyerror!void {","class":"lineCov","hits":"2","order":"4478","possible_hits":"2",},
{"lineNum":"  110","line":"                try case.expectEqual(@intCast(usize, 1), cmp.errors.count());","class":"lineCov","hits":"1","order":"4479","possible_hits":"1",},
{"lineNum":"  111","line":""},
{"lineNum":"  112","line":"                const err = cmp.getError(0);","class":"lineCov","hits":"1","order":"4480","possible_hits":"1",},
{"lineNum":"  113","line":"                try case.expectEqual(","class":"lineCov","hits":"1","order":"4482","possible_hits":"1",},
{"lineNum":"  114","line":"                    CompileError.Type.GenericError,"},
{"lineNum":"  115","line":"                    err.getType(),","class":"lineCov","hits":"1","order":"4481","possible_hits":"1",},
{"lineNum":"  116","line":"                );"},
{"lineNum":"  117","line":"                try case.expectEqualStrings(","class":"linePartCov","hits":"1","order":"4484","possible_hits":"2",},
{"lineNum":"  118","line":"                    \"Constant value must be initialized\","},
{"lineNum":"  119","line":"                    err.GenericError.msg,","class":"linePartCov","hits":"2","order":"4483","possible_hits":"3",},
{"lineNum":"  120","line":"                );"},
{"lineNum":"  121","line":"            }"},
{"lineNum":"  122","line":"        }).check,"},
{"lineNum":"  123","line":"    }).run();","class":"lineCov","hits":"1","order":"4469","possible_hits":"1",},
{"lineNum":"  124","line":"}"},
{"lineNum":"  125","line":""},
{"lineNum":"  126","line":"test \"uninitialized and untyped variable has implicit any type\" {","class":"lineCov","hits":"2","order":"4489","possible_hits":"2",},
{"lineNum":"  127","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4508","possible_hits":"1",},
{"lineNum":"  128","line":"        .code = \"let aVariable;\","},
{"lineNum":"  129","line":"        .check = (struct {"},
{"lineNum":"  130","line":"            fn check(case: CompilerTestCase, cmp: Compiler) anyerror!void {","class":"lineCov","hits":"2","order":"4501","possible_hits":"2",},
{"lineNum":"  131","line":"                try case.expectEqual(@intCast(usize, 1), cmp.errors.count());","class":"lineCov","hits":"1","order":"4502","possible_hits":"1",},
{"lineNum":"  132","line":""},
{"lineNum":"  133","line":"                const err = cmp.getError(0);","class":"lineCov","hits":"1","order":"4503","possible_hits":"1",},
{"lineNum":"  134","line":"                try case.expectEqual(","class":"lineCov","hits":"1","order":"4505","possible_hits":"1",},
{"lineNum":"  135","line":"                    CompileError.Type.ImplicitAnyError,"},
{"lineNum":"  136","line":"                    err.getType(),","class":"lineCov","hits":"1","order":"4504","possible_hits":"1",},
{"lineNum":"  137","line":"                );"},
{"lineNum":"  138","line":"                try case.expectEqualStrings(","class":"linePartCov","hits":"1","order":"4507","possible_hits":"2",},
{"lineNum":"  139","line":"                    \"aVariable\","},
{"lineNum":"  140","line":"                    err.ImplicitAnyError.symbol,","class":"linePartCov","hits":"2","order":"4506","possible_hits":"3",},
{"lineNum":"  141","line":"                );"},
{"lineNum":"  142","line":"            }"},
{"lineNum":"  143","line":"        }).check,"},
{"lineNum":"  144","line":"    }).run();","class":"lineCov","hits":"1","order":"4490","possible_hits":"1",},
{"lineNum":"  145","line":"}"},
{"lineNum":"  146","line":""},
{"lineNum":"  147","line":"test \"can compile a \'let\' declaration without assigning a value\" {","class":"lineCov","hits":"2","order":"4509","possible_hits":"2",},
{"lineNum":"  148","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4519","possible_hits":"1",},
{"lineNum":"  149","line":"        .code = \"let aVariable: number;\","},
{"lineNum":"  150","line":"    }).run();","class":"lineCov","hits":"1","order":"4510","possible_hits":"1",},
{"lineNum":"  151","line":"}"},
{"lineNum":"  152","line":""},
{"lineNum":"  153","line":"test \"can compile a \'var\' declaration without assigning a value\" {","class":"lineCov","hits":"2","order":"4520","possible_hits":"2",},
{"lineNum":"  154","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4522","possible_hits":"1",},
{"lineNum":"  155","line":"        .code = \"var aVariable: string;\","},
{"lineNum":"  156","line":"    }).run();","class":"lineCov","hits":"1","order":"4521","possible_hits":"1",},
{"lineNum":"  157","line":"}"},
{"lineNum":"  158","line":""},
{"lineNum":"  159","line":"test \"can compile a \'const\' declaration with an assigned value\" {","class":"lineCov","hits":"2","order":"4523","possible_hits":"2",},
{"lineNum":"  160","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4528","possible_hits":"1",},
{"lineNum":"  161","line":"        .code = \"const aVariable: string = \'hello world\';\","},
{"lineNum":"  162","line":"    }).run();","class":"lineCov","hits":"1","order":"4524","possible_hits":"1",},
{"lineNum":"  163","line":"}"},
{"lineNum":"  164","line":""},
{"lineNum":"  165","line":"test \"can compile a \'let\' declaration with an assigned value\" {","class":"lineCov","hits":"2","order":"4529","possible_hits":"2",},
{"lineNum":"  166","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4531","possible_hits":"1",},
{"lineNum":"  167","line":"        .code = \"let aVariable: number = 3;\","},
{"lineNum":"  168","line":"    }).run();","class":"lineCov","hits":"1","order":"4530","possible_hits":"1",},
{"lineNum":"  169","line":"}"},
{"lineNum":"  170","line":""},
{"lineNum":"  171","line":"test \"can compile a \'var\' declaration with an assigned value\" {","class":"lineCov","hits":"2","order":"4532","possible_hits":"2",},
{"lineNum":"  172","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4534","possible_hits":"1",},
{"lineNum":"  173","line":"        .code = \"var aVariable: boolean = true;\","},
{"lineNum":"  174","line":"    }).run();","class":"lineCov","hits":"1","order":"4533","possible_hits":"1",},
{"lineNum":"  175","line":"}"},
{"lineNum":"  176","line":""},
{"lineNum":"  177","line":"test \"can compile a \'const\' declaration with an inferred type\" {","class":"lineCov","hits":"2","order":"4535","possible_hits":"2",},
{"lineNum":"  178","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4537","possible_hits":"1",},
{"lineNum":"  179","line":"        .code = \"const aVariable = \'hello world\';\","},
{"lineNum":"  180","line":"    }).run();","class":"lineCov","hits":"1","order":"4536","possible_hits":"1",},
{"lineNum":"  181","line":"}"},
{"lineNum":"  182","line":""},
{"lineNum":"  183","line":"test \"can compile a \'let\' declaration with an inferred type\" {","class":"lineCov","hits":"2","order":"4538","possible_hits":"2",},
{"lineNum":"  184","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4540","possible_hits":"1",},
{"lineNum":"  185","line":"        .code = \"let aVariable = 1234;\","},
{"lineNum":"  186","line":"    }).run();","class":"lineCov","hits":"1","order":"4539","possible_hits":"1",},
{"lineNum":"  187","line":"}"},
{"lineNum":"  188","line":""},
{"lineNum":"  189","line":"test \"can compile a \'var\' declaration with an inferred type\" {","class":"lineCov","hits":"2","order":"4541","possible_hits":"2",},
{"lineNum":"  190","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4543","possible_hits":"1",},
{"lineNum":"  191","line":"        .code = \"var aVariable = false;\","},
{"lineNum":"  192","line":"    }).run();","class":"lineCov","hits":"1","order":"4542","possible_hits":"1",},
{"lineNum":"  193","line":"}"},
{"lineNum":"  194","line":""},
{"lineNum":"  195","line":"test \"declarations cannot be redefined in the same scope\" {","class":"lineCov","hits":"2","order":"4544","possible_hits":"2",},
{"lineNum":"  196","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4564","possible_hits":"1",},
{"lineNum":"  197","line":"        .code = \"let a = 3; let a = 4;\","},
{"lineNum":"  198","line":"        .check = (struct {"},
{"lineNum":"  199","line":"            fn check(case: CompilerTestCase, cmp: Compiler) anyerror!void {","class":"lineCov","hits":"2","order":"4550","possible_hits":"2",},
{"lineNum":"  200","line":"                try case.expectEqual(@intCast(usize, 1), cmp.errors.count());","class":"lineCov","hits":"1","order":"4551","possible_hits":"1",},
{"lineNum":"  201","line":""},
{"lineNum":"  202","line":"                const err = cmp.getError(0);","class":"lineCov","hits":"1","order":"4552","possible_hits":"1",},
{"lineNum":"  203","line":"                try case.expectEqual(","class":"lineCov","hits":"1","order":"4554","possible_hits":"1",},
{"lineNum":"  204","line":"                    CompileError.Type.RedefinitionError,"},
{"lineNum":"  205","line":"                    err.getType(),","class":"lineCov","hits":"1","order":"4553","possible_hits":"1",},
{"lineNum":"  206","line":"                );"},
{"lineNum":"  207","line":"                try case.expectEqualStrings(\"a\", err.RedefinitionError.name);","class":"lineCov","hits":"2","order":"4555","possible_hits":"2",},
{"lineNum":"  208","line":"                try case.expectEqual(","class":"linePartCov","hits":"1","order":"4557","possible_hits":"2",},
{"lineNum":"  209","line":"                    @intCast(u32, 1),"},
{"lineNum":"  210","line":"                    err.RedefinitionError.firstDefined.ln,","class":"linePartCov","hits":"2","order":"4556","possible_hits":"3",},
{"lineNum":"  211","line":"                );"},
{"lineNum":"  212","line":"                try case.expectEqual(","class":"linePartCov","hits":"1","order":"4559","possible_hits":"2",},
{"lineNum":"  213","line":"                    @intCast(u32, 1),"},
{"lineNum":"  214","line":"                    err.RedefinitionError.firstDefined.ch,","class":"linePartCov","hits":"2","order":"4558","possible_hits":"3",},
{"lineNum":"  215","line":"                );"},
{"lineNum":"  216","line":"                try case.expectEqual(","class":"linePartCov","hits":"1","order":"4561","possible_hits":"2",},
{"lineNum":"  217","line":"                    @intCast(u32, 1),"},
{"lineNum":"  218","line":"                    err.RedefinitionError.secondDefined.ln,","class":"linePartCov","hits":"2","order":"4560","possible_hits":"3",},
{"lineNum":"  219","line":"                );"},
{"lineNum":"  220","line":"                try case.expectEqual(","class":"linePartCov","hits":"1","order":"4563","possible_hits":"2",},
{"lineNum":"  221","line":"                    @intCast(u32, 12),"},
{"lineNum":"  222","line":"                    err.RedefinitionError.secondDefined.ch,","class":"linePartCov","hits":"2","order":"4562","possible_hits":"3",},
{"lineNum":"  223","line":"                );"},
{"lineNum":"  224","line":"            }"},
{"lineNum":"  225","line":"        }).check,"},
{"lineNum":"  226","line":"    }).run();","class":"lineCov","hits":"1","order":"4545","possible_hits":"1",},
{"lineNum":"  227","line":"}"},
{"lineNum":"  228","line":""},
{"lineNum":"  229","line":"test \"declarations can be redefined in different scopes\" {","class":"lineCov","hits":"2","order":"4565","possible_hits":"2",},
{"lineNum":"  230","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4567","possible_hits":"1",},
{"lineNum":"  231","line":"        .code = \"let a = 3; { let a = 4; }\","},
{"lineNum":"  232","line":"    }).run();","class":"lineCov","hits":"1","order":"4566","possible_hits":"1",},
{"lineNum":"  233","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-14 18:41:56", "instrumented" : 108, "covered" : 96,};
var merged_data = [];
