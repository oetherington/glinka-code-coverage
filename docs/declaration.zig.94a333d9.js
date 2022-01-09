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
{"lineNum":"   32","line":"fn declWithAssign(cmp: *Compiler, csr: Cursor, decl: node.Decl) void {","class":"lineCov","hits":"2","order":"4118","possible_hits":"2",},
{"lineNum":"   33","line":"    std.debug.assert(decl.value != null);","class":"lineCov","hits":"1","order":"4119","possible_hits":"1",},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"    if (cmp.inferExprType(decl.value.?)) |valueTy| {","class":"linePartCov","hits":"2","order":"4120","possible_hits":"3",},
{"lineNum":"   36","line":"        const isConst = decl.scoping == .Const;","class":"lineCov","hits":"1","order":"4134","possible_hits":"1",},
{"lineNum":"   37","line":""},
{"lineNum":"   38","line":"        if (decl.ty) |annotationNode| {","class":"lineCov","hits":"2","order":"4135","possible_hits":"2",},
{"lineNum":"   39","line":"            if (cmp.findType(annotationNode)) |annotation| {","class":"lineCov","hits":"2","order":"4348","possible_hits":"2",},
{"lineNum":"   40","line":"                if (!valueTy.isAssignableTo(annotation)) {","class":"linePartCov","hits":"1","order":"4349","possible_hits":"2",},
{"lineNum":"   41","line":"                    cmp.errors.append(CompileError.typeError(","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   42","line":"                        TypeError.new(csr, valueTy, annotation),","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   43","line":"                    )) catch allocate.reportAndExit();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   44","line":"                }"},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"                cmp.scope.put(decl.name, annotation, isConst, csr);","class":"lineCov","hits":"1","order":"4350","possible_hits":"1",},
{"lineNum":"   47","line":"            } else {"},
{"lineNum":"   48","line":"                annotationNode.dump();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   49","line":"                cmp.errors.append(CompileError.genericError(","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   50","line":"                    GenericError.new(csr, \"Invalid type annotation\"),","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   51","line":"                )) catch allocate.reportAndExit();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   52","line":"                cmp.scope.put(decl.name, valueTy, isConst, csr);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   53","line":"            }"},
{"lineNum":"   54","line":"        } else {"},
{"lineNum":"   55","line":"            cmp.scope.put(decl.name, valueTy, isConst, csr);","class":"lineCov","hits":"1","order":"4136","possible_hits":"1",},
{"lineNum":"   56","line":"        }"},
{"lineNum":"   57","line":"    }"},
{"lineNum":"   58","line":"}"},
{"lineNum":"   59","line":""},
{"lineNum":"   60","line":"fn declWithoutAssign(cmp: *Compiler, csr: Cursor, decl: node.Decl) void {","class":"lineCov","hits":"2","order":"4294","possible_hits":"2",},
{"lineNum":"   61","line":"    std.debug.assert(decl.value == null);","class":"lineCov","hits":"1","order":"4295","possible_hits":"1",},
{"lineNum":"   62","line":""},
{"lineNum":"   63","line":"    if (decl.scoping == .Const) {","class":"lineCov","hits":"2","order":"4296","possible_hits":"2",},
{"lineNum":"   64","line":"        cmp.errors.append(CompileError.genericError(","class":"lineCov","hits":"2","order":"4297","possible_hits":"2",},
{"lineNum":"   65","line":"            GenericError.new(csr, \"Constant value must be initialized\"),","class":"lineCov","hits":"1","order":"4298","possible_hits":"1",},
{"lineNum":"   66","line":"        )) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"4299","possible_hits":"1",},
{"lineNum":"   67","line":"        return;","class":"lineCov","hits":"1","order":"4300","possible_hits":"1",},
{"lineNum":"   68","line":"    }"},
{"lineNum":"   69","line":""},
{"lineNum":"   70","line":"    const annotation = if (decl.ty) |ty|","class":"lineCov","hits":"2","order":"4314","possible_hits":"2",},
{"lineNum":"   71","line":"        cmp.findType(ty)","class":"lineCov","hits":"1","order":"4334","possible_hits":"1",},
{"lineNum":"   72","line":"    else"},
{"lineNum":"   73","line":"        cmp.implicitAny(csr, decl.name);","class":"lineCov","hits":"1","order":"4315","possible_hits":"1",},
{"lineNum":"   74","line":""},
{"lineNum":"   75","line":"    if (annotation) |ty| {","class":"lineCov","hits":"3","order":"4322","possible_hits":"3",},
{"lineNum":"   76","line":"        cmp.scope.put(decl.name, ty, false, csr);","class":"lineCov","hits":"1","order":"4323","possible_hits":"1",},
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
{"lineNum":"   87","line":"pub fn processDecl(cmp: *Compiler, nd: Node) void {","class":"lineCov","hits":"2","order":"4112","possible_hits":"2",},
{"lineNum":"   88","line":"    std.debug.assert(nd.getType() == NodeType.Decl);","class":"lineCov","hits":"1","order":"4113","possible_hits":"1",},
{"lineNum":"   89","line":""},
{"lineNum":"   90","line":"    const decl = nd.data.Decl;","class":"linePartCov","hits":"2","order":"4114","possible_hits":"3",},
{"lineNum":"   91","line":""},
{"lineNum":"   92","line":"    if (cmp.scope.getLocal(decl.name)) |previous| {","class":"linePartCov","hits":"1","order":"4115","possible_hits":"3",},
{"lineNum":"   93","line":"        cmp.errors.append(CompileError.redefinitionError(","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   94","line":"            RedefinitionError.new(decl.name, previous.csr, nd.csr),","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   95","line":"        )) catch allocate.reportAndExit();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   96","line":"    }"},
{"lineNum":"   97","line":""},
{"lineNum":"   98","line":"    if (decl.value) |_|","class":"lineCov","hits":"2","order":"4116","possible_hits":"2",},
{"lineNum":"   99","line":"        declWithAssign(cmp, nd.csr, decl)","class":"lineCov","hits":"1","order":"4117","possible_hits":"1",},
{"lineNum":"  100","line":"    else"},
{"lineNum":"  101","line":"        declWithoutAssign(cmp, nd.csr, decl);","class":"lineCov","hits":"1","order":"4293","possible_hits":"1",},
{"lineNum":"  102","line":"}"},
{"lineNum":"  103","line":""},
{"lineNum":"  104","line":"test \"constants must be initialized\" {","class":"lineCov","hits":"2","order":"4291","possible_hits":"2",},
{"lineNum":"  105","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4311","possible_hits":"1",},
{"lineNum":"  106","line":"        .code = \"const aVariable;\","},
{"lineNum":"  107","line":"        .check = (struct {"},
{"lineNum":"  108","line":"            fn check(case: CompilerTestCase, cmp: Compiler) anyerror!void {","class":"lineCov","hits":"2","order":"4301","possible_hits":"2",},
{"lineNum":"  109","line":"                try case.expectEqual(@intCast(usize, 1), cmp.errors.count());","class":"lineCov","hits":"1","order":"4302","possible_hits":"1",},
{"lineNum":"  110","line":""},
{"lineNum":"  111","line":"                const err = cmp.getError(0);","class":"lineCov","hits":"1","order":"4303","possible_hits":"1",},
{"lineNum":"  112","line":"                try case.expectEqual(","class":"lineCov","hits":"1","order":"4305","possible_hits":"1",},
{"lineNum":"  113","line":"                    CompileError.Type.GenericError,"},
{"lineNum":"  114","line":"                    err.getType(),","class":"lineCov","hits":"1","order":"4304","possible_hits":"1",},
{"lineNum":"  115","line":"                );"},
{"lineNum":"  116","line":"                try case.expectEqualStrings(","class":"linePartCov","hits":"1","order":"4307","possible_hits":"2",},
{"lineNum":"  117","line":"                    \"Constant value must be initialized\","},
{"lineNum":"  118","line":"                    err.GenericError.msg,","class":"linePartCov","hits":"2","order":"4306","possible_hits":"3",},
{"lineNum":"  119","line":"                );"},
{"lineNum":"  120","line":"            }"},
{"lineNum":"  121","line":"        }).check,"},
{"lineNum":"  122","line":"    }).run();","class":"lineCov","hits":"1","order":"4292","possible_hits":"1",},
{"lineNum":"  123","line":"}"},
{"lineNum":"  124","line":""},
{"lineNum":"  125","line":"test \"uninitialized and untyped variable has implicit any type\" {","class":"lineCov","hits":"2","order":"4312","possible_hits":"2",},
{"lineNum":"  126","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4331","possible_hits":"1",},
{"lineNum":"  127","line":"        .code = \"let aVariable;\","},
{"lineNum":"  128","line":"        .check = (struct {"},
{"lineNum":"  129","line":"            fn check(case: CompilerTestCase, cmp: Compiler) anyerror!void {","class":"lineCov","hits":"2","order":"4324","possible_hits":"2",},
{"lineNum":"  130","line":"                try case.expectEqual(@intCast(usize, 1), cmp.errors.count());","class":"lineCov","hits":"1","order":"4325","possible_hits":"1",},
{"lineNum":"  131","line":""},
{"lineNum":"  132","line":"                const err = cmp.getError(0);","class":"lineCov","hits":"1","order":"4326","possible_hits":"1",},
{"lineNum":"  133","line":"                try case.expectEqual(","class":"lineCov","hits":"1","order":"4328","possible_hits":"1",},
{"lineNum":"  134","line":"                    CompileError.Type.ImplicitAnyError,"},
{"lineNum":"  135","line":"                    err.getType(),","class":"lineCov","hits":"1","order":"4327","possible_hits":"1",},
{"lineNum":"  136","line":"                );"},
{"lineNum":"  137","line":"                try case.expectEqualStrings(","class":"linePartCov","hits":"1","order":"4330","possible_hits":"2",},
{"lineNum":"  138","line":"                    \"aVariable\","},
{"lineNum":"  139","line":"                    err.ImplicitAnyError.symbol,","class":"linePartCov","hits":"2","order":"4329","possible_hits":"3",},
{"lineNum":"  140","line":"                );"},
{"lineNum":"  141","line":"            }"},
{"lineNum":"  142","line":"        }).check,"},
{"lineNum":"  143","line":"    }).run();","class":"lineCov","hits":"1","order":"4313","possible_hits":"1",},
{"lineNum":"  144","line":"}"},
{"lineNum":"  145","line":""},
{"lineNum":"  146","line":"test \"can compile a \'let\' declaration without assigning a value\" {","class":"lineCov","hits":"2","order":"4332","possible_hits":"2",},
{"lineNum":"  147","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4342","possible_hits":"1",},
{"lineNum":"  148","line":"        .code = \"let aVariable: number;\","},
{"lineNum":"  149","line":"    }).run();","class":"lineCov","hits":"1","order":"4333","possible_hits":"1",},
{"lineNum":"  150","line":"}"},
{"lineNum":"  151","line":""},
{"lineNum":"  152","line":"test \"can compile a \'var\' declaration without assigning a value\" {","class":"lineCov","hits":"2","order":"4343","possible_hits":"2",},
{"lineNum":"  153","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4345","possible_hits":"1",},
{"lineNum":"  154","line":"        .code = \"var aVariable: string;\","},
{"lineNum":"  155","line":"    }).run();","class":"lineCov","hits":"1","order":"4344","possible_hits":"1",},
{"lineNum":"  156","line":"}"},
{"lineNum":"  157","line":""},
{"lineNum":"  158","line":"test \"can compile a \'const\' declaration with an assigned value\" {","class":"lineCov","hits":"2","order":"4346","possible_hits":"2",},
{"lineNum":"  159","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4351","possible_hits":"1",},
{"lineNum":"  160","line":"        .code = \"const aVariable: string = \'hello world\';\","},
{"lineNum":"  161","line":"    }).run();","class":"lineCov","hits":"1","order":"4347","possible_hits":"1",},
{"lineNum":"  162","line":"}"},
{"lineNum":"  163","line":""},
{"lineNum":"  164","line":"test \"can compile a \'let\' declaration with an assigned value\" {","class":"lineCov","hits":"2","order":"4352","possible_hits":"2",},
{"lineNum":"  165","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4354","possible_hits":"1",},
{"lineNum":"  166","line":"        .code = \"let aVariable: number = 3;\","},
{"lineNum":"  167","line":"    }).run();","class":"lineCov","hits":"1","order":"4353","possible_hits":"1",},
{"lineNum":"  168","line":"}"},
{"lineNum":"  169","line":""},
{"lineNum":"  170","line":"test \"can compile a \'var\' declaration with an assigned value\" {","class":"lineCov","hits":"2","order":"4355","possible_hits":"2",},
{"lineNum":"  171","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4357","possible_hits":"1",},
{"lineNum":"  172","line":"        .code = \"var aVariable: boolean = true;\","},
{"lineNum":"  173","line":"    }).run();","class":"lineCov","hits":"1","order":"4356","possible_hits":"1",},
{"lineNum":"  174","line":"}"},
{"lineNum":"  175","line":""},
{"lineNum":"  176","line":"test \"can compile a \'const\' declaration with an inferred type\" {","class":"lineCov","hits":"2","order":"4358","possible_hits":"2",},
{"lineNum":"  177","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4360","possible_hits":"1",},
{"lineNum":"  178","line":"        .code = \"const aVariable = \'hello world\';\","},
{"lineNum":"  179","line":"    }).run();","class":"lineCov","hits":"1","order":"4359","possible_hits":"1",},
{"lineNum":"  180","line":"}"},
{"lineNum":"  181","line":""},
{"lineNum":"  182","line":"test \"can compile a \'let\' declaration with an inferred type\" {","class":"lineCov","hits":"2","order":"4361","possible_hits":"2",},
{"lineNum":"  183","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4363","possible_hits":"1",},
{"lineNum":"  184","line":"        .code = \"let aVariable = 1234;\","},
{"lineNum":"  185","line":"    }).run();","class":"lineCov","hits":"1","order":"4362","possible_hits":"1",},
{"lineNum":"  186","line":"}"},
{"lineNum":"  187","line":""},
{"lineNum":"  188","line":"test \"can compile a \'var\' declaration with an inferred type\" {","class":"lineCov","hits":"2","order":"4364","possible_hits":"2",},
{"lineNum":"  189","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4366","possible_hits":"1",},
{"lineNum":"  190","line":"        .code = \"var aVariable = false;\","},
{"lineNum":"  191","line":"    }).run();","class":"lineCov","hits":"1","order":"4365","possible_hits":"1",},
{"lineNum":"  192","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-09 12:42:29", "instrumented" : 87, "covered" : 72,};
var merged_data = [];
