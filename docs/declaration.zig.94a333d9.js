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
{"lineNum":"   32","line":"fn declWithAssign(cmp: *Compiler, csr: Cursor, decl: node.Decl) void {","class":"lineCov","hits":"2","order":"3115","possible_hits":"2",},
{"lineNum":"   33","line":"    std.debug.assert(decl.value != null);","class":"lineCov","hits":"1","order":"3116","possible_hits":"1",},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"    if (cmp.inferExprType(decl.value.?)) |valueTy| {","class":"linePartCov","hits":"2","order":"3117","possible_hits":"3",},
{"lineNum":"   36","line":"        const isConst = decl.scoping == .Const;","class":"lineCov","hits":"1","order":"3131","possible_hits":"1",},
{"lineNum":"   37","line":""},
{"lineNum":"   38","line":"        if (decl.ty) |annotationNode| {","class":"lineCov","hits":"2","order":"3132","possible_hits":"2",},
{"lineNum":"   39","line":"            if (cmp.findType(annotationNode)) |annotation| {","class":"lineCov","hits":"2","order":"3345","possible_hits":"2",},
{"lineNum":"   40","line":"                if (!valueTy.isAssignableTo(annotation)) {","class":"linePartCov","hits":"1","order":"3346","possible_hits":"2",},
{"lineNum":"   41","line":"                    cmp.errors.append(CompileError.typeError(","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   42","line":"                        TypeError.new(csr, valueTy, annotation),","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   43","line":"                    )) catch allocate.reportAndExit();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   44","line":"                }"},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"                cmp.scope.put(decl.name, annotation, isConst, csr);","class":"lineCov","hits":"1","order":"3347","possible_hits":"1",},
{"lineNum":"   47","line":"            } else {"},
{"lineNum":"   48","line":"                cmp.errors.append(CompileError.genericError(","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   49","line":"                    GenericError.new(csr, \"Invalid type annotation\"),","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   50","line":"                )) catch allocate.reportAndExit();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   51","line":"                cmp.scope.put(decl.name, valueTy, isConst, csr);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   52","line":"            }"},
{"lineNum":"   53","line":"        } else {"},
{"lineNum":"   54","line":"            cmp.scope.put(decl.name, valueTy, isConst, csr);","class":"lineCov","hits":"1","order":"3133","possible_hits":"1",},
{"lineNum":"   55","line":"        }"},
{"lineNum":"   56","line":"    }"},
{"lineNum":"   57","line":"}"},
{"lineNum":"   58","line":""},
{"lineNum":"   59","line":"fn declWithoutAssign(cmp: *Compiler, csr: Cursor, decl: node.Decl) void {","class":"lineCov","hits":"2","order":"3291","possible_hits":"2",},
{"lineNum":"   60","line":"    std.debug.assert(decl.value == null);","class":"lineCov","hits":"1","order":"3292","possible_hits":"1",},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"    if (decl.scoping == .Const) {","class":"lineCov","hits":"2","order":"3293","possible_hits":"2",},
{"lineNum":"   63","line":"        cmp.errors.append(CompileError.genericError(","class":"lineCov","hits":"2","order":"3294","possible_hits":"2",},
{"lineNum":"   64","line":"            GenericError.new(csr, \"Constant value must be initialized\"),","class":"lineCov","hits":"1","order":"3295","possible_hits":"1",},
{"lineNum":"   65","line":"        )) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"3296","possible_hits":"1",},
{"lineNum":"   66","line":"        return;","class":"lineCov","hits":"1","order":"3297","possible_hits":"1",},
{"lineNum":"   67","line":"    }"},
{"lineNum":"   68","line":""},
{"lineNum":"   69","line":"    const annotation = if (decl.ty) |ty|","class":"lineCov","hits":"2","order":"3311","possible_hits":"2",},
{"lineNum":"   70","line":"        cmp.findType(ty)","class":"lineCov","hits":"1","order":"3331","possible_hits":"1",},
{"lineNum":"   71","line":"    else"},
{"lineNum":"   72","line":"        cmp.implicitAny(csr, decl.name);","class":"lineCov","hits":"1","order":"3312","possible_hits":"1",},
{"lineNum":"   73","line":""},
{"lineNum":"   74","line":"    if (annotation) |ty| {","class":"lineCov","hits":"3","order":"3319","possible_hits":"3",},
{"lineNum":"   75","line":"        cmp.scope.put(decl.name, ty, false, csr);","class":"lineCov","hits":"1","order":"3320","possible_hits":"1",},
{"lineNum":"   76","line":"    } else {"},
{"lineNum":"   77","line":"        cmp.errors.append(CompileError.genericError(","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   78","line":"            GenericError.new(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   79","line":"                csr,"},
{"lineNum":"   80","line":"                cmp.fmt(\"Invalid type for variable \'{s}\'\", .{decl.name}),","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   81","line":"            ),"},
{"lineNum":"   82","line":"        )) catch allocate.reportAndExit();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   83","line":"    }"},
{"lineNum":"   84","line":"}"},
{"lineNum":"   85","line":""},
{"lineNum":"   86","line":"pub fn processDecl(cmp: *Compiler, nd: Node) void {","class":"lineCov","hits":"2","order":"3109","possible_hits":"2",},
{"lineNum":"   87","line":"    std.debug.assert(nd.getType() == NodeType.Decl);","class":"lineCov","hits":"1","order":"3110","possible_hits":"1",},
{"lineNum":"   88","line":""},
{"lineNum":"   89","line":"    const decl = nd.data.Decl;","class":"linePartCov","hits":"2","order":"3111","possible_hits":"3",},
{"lineNum":"   90","line":""},
{"lineNum":"   91","line":"    if (cmp.scope.getLocal(decl.name)) |previous| {","class":"linePartCov","hits":"1","order":"3112","possible_hits":"3",},
{"lineNum":"   92","line":"        cmp.errors.append(CompileError.redefinitionError(","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   93","line":"            RedefinitionError.new(decl.name, previous.csr, nd.csr),","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   94","line":"        )) catch allocate.reportAndExit();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   95","line":"    }"},
{"lineNum":"   96","line":""},
{"lineNum":"   97","line":"    if (decl.value) |_|","class":"lineCov","hits":"2","order":"3113","possible_hits":"2",},
{"lineNum":"   98","line":"        declWithAssign(cmp, nd.csr, decl)","class":"lineCov","hits":"1","order":"3114","possible_hits":"1",},
{"lineNum":"   99","line":"    else"},
{"lineNum":"  100","line":"        declWithoutAssign(cmp, nd.csr, decl);","class":"lineCov","hits":"1","order":"3290","possible_hits":"1",},
{"lineNum":"  101","line":"}"},
{"lineNum":"  102","line":""},
{"lineNum":"  103","line":"test \"constants must be initialized\" {","class":"lineCov","hits":"2","order":"3288","possible_hits":"2",},
{"lineNum":"  104","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"3308","possible_hits":"1",},
{"lineNum":"  105","line":"        .code = \"const aVariable;\","},
{"lineNum":"  106","line":"        .check = (struct {"},
{"lineNum":"  107","line":"            fn check(case: CompilerTestCase, cmp: Compiler) anyerror!void {","class":"lineCov","hits":"2","order":"3298","possible_hits":"2",},
{"lineNum":"  108","line":"                try case.expectEqual(@intCast(usize, 1), cmp.errors.count());","class":"lineCov","hits":"1","order":"3299","possible_hits":"1",},
{"lineNum":"  109","line":""},
{"lineNum":"  110","line":"                const err = cmp.getError(0);","class":"lineCov","hits":"1","order":"3300","possible_hits":"1",},
{"lineNum":"  111","line":"                try case.expectEqual(","class":"lineCov","hits":"1","order":"3302","possible_hits":"1",},
{"lineNum":"  112","line":"                    CompileError.Type.GenericError,"},
{"lineNum":"  113","line":"                    err.getType(),","class":"lineCov","hits":"1","order":"3301","possible_hits":"1",},
{"lineNum":"  114","line":"                );"},
{"lineNum":"  115","line":"                try case.expectEqualStrings(","class":"linePartCov","hits":"1","order":"3304","possible_hits":"2",},
{"lineNum":"  116","line":"                    \"Constant value must be initialized\","},
{"lineNum":"  117","line":"                    err.GenericError.msg,","class":"linePartCov","hits":"2","order":"3303","possible_hits":"3",},
{"lineNum":"  118","line":"                );"},
{"lineNum":"  119","line":"            }"},
{"lineNum":"  120","line":"        }).check,"},
{"lineNum":"  121","line":"    }).run();","class":"lineCov","hits":"1","order":"3289","possible_hits":"1",},
{"lineNum":"  122","line":"}"},
{"lineNum":"  123","line":""},
{"lineNum":"  124","line":"test \"uninitialized and untyped variable has implicit any type\" {","class":"lineCov","hits":"2","order":"3309","possible_hits":"2",},
{"lineNum":"  125","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"3328","possible_hits":"1",},
{"lineNum":"  126","line":"        .code = \"let aVariable;\","},
{"lineNum":"  127","line":"        .check = (struct {"},
{"lineNum":"  128","line":"            fn check(case: CompilerTestCase, cmp: Compiler) anyerror!void {","class":"lineCov","hits":"2","order":"3321","possible_hits":"2",},
{"lineNum":"  129","line":"                try case.expectEqual(@intCast(usize, 1), cmp.errors.count());","class":"lineCov","hits":"1","order":"3322","possible_hits":"1",},
{"lineNum":"  130","line":""},
{"lineNum":"  131","line":"                const err = cmp.getError(0);","class":"lineCov","hits":"1","order":"3323","possible_hits":"1",},
{"lineNum":"  132","line":"                try case.expectEqual(","class":"lineCov","hits":"1","order":"3325","possible_hits":"1",},
{"lineNum":"  133","line":"                    CompileError.Type.ImplicitAnyError,"},
{"lineNum":"  134","line":"                    err.getType(),","class":"lineCov","hits":"1","order":"3324","possible_hits":"1",},
{"lineNum":"  135","line":"                );"},
{"lineNum":"  136","line":"                try case.expectEqualStrings(","class":"linePartCov","hits":"1","order":"3327","possible_hits":"2",},
{"lineNum":"  137","line":"                    \"aVariable\","},
{"lineNum":"  138","line":"                    err.ImplicitAnyError.symbol,","class":"linePartCov","hits":"2","order":"3326","possible_hits":"3",},
{"lineNum":"  139","line":"                );"},
{"lineNum":"  140","line":"            }"},
{"lineNum":"  141","line":"        }).check,"},
{"lineNum":"  142","line":"    }).run();","class":"lineCov","hits":"1","order":"3310","possible_hits":"1",},
{"lineNum":"  143","line":"}"},
{"lineNum":"  144","line":""},
{"lineNum":"  145","line":"test \"can compile a \'let\' declaration without assigning a value\" {","class":"lineCov","hits":"2","order":"3329","possible_hits":"2",},
{"lineNum":"  146","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"3339","possible_hits":"1",},
{"lineNum":"  147","line":"        .code = \"let aVariable: number;\","},
{"lineNum":"  148","line":"    }).run();","class":"lineCov","hits":"1","order":"3330","possible_hits":"1",},
{"lineNum":"  149","line":"}"},
{"lineNum":"  150","line":""},
{"lineNum":"  151","line":"test \"can compile a \'var\' declaration without assigning a value\" {","class":"lineCov","hits":"2","order":"3340","possible_hits":"2",},
{"lineNum":"  152","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"3342","possible_hits":"1",},
{"lineNum":"  153","line":"        .code = \"var aVariable: string;\","},
{"lineNum":"  154","line":"    }).run();","class":"lineCov","hits":"1","order":"3341","possible_hits":"1",},
{"lineNum":"  155","line":"}"},
{"lineNum":"  156","line":""},
{"lineNum":"  157","line":"test \"can compile a \'const\' declaration with an assigned value\" {","class":"lineCov","hits":"2","order":"3343","possible_hits":"2",},
{"lineNum":"  158","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"3348","possible_hits":"1",},
{"lineNum":"  159","line":"        .code = \"const aVariable: string = \'hello world\';\","},
{"lineNum":"  160","line":"    }).run();","class":"lineCov","hits":"1","order":"3344","possible_hits":"1",},
{"lineNum":"  161","line":"}"},
{"lineNum":"  162","line":""},
{"lineNum":"  163","line":"test \"can compile a \'let\' declaration with an assigned value\" {","class":"lineCov","hits":"2","order":"3349","possible_hits":"2",},
{"lineNum":"  164","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"3351","possible_hits":"1",},
{"lineNum":"  165","line":"        .code = \"let aVariable: number = 3;\","},
{"lineNum":"  166","line":"    }).run();","class":"lineCov","hits":"1","order":"3350","possible_hits":"1",},
{"lineNum":"  167","line":"}"},
{"lineNum":"  168","line":""},
{"lineNum":"  169","line":"test \"can compile a \'var\' declaration with an assigned value\" {","class":"lineCov","hits":"2","order":"3352","possible_hits":"2",},
{"lineNum":"  170","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"3354","possible_hits":"1",},
{"lineNum":"  171","line":"        .code = \"var aVariable: boolean = true;\","},
{"lineNum":"  172","line":"    }).run();","class":"lineCov","hits":"1","order":"3353","possible_hits":"1",},
{"lineNum":"  173","line":"}"},
{"lineNum":"  174","line":""},
{"lineNum":"  175","line":"test \"can compile a \'const\' declaration with an inferred type\" {","class":"lineCov","hits":"2","order":"3355","possible_hits":"2",},
{"lineNum":"  176","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"3357","possible_hits":"1",},
{"lineNum":"  177","line":"        .code = \"const aVariable = \'hello world\';\","},
{"lineNum":"  178","line":"    }).run();","class":"lineCov","hits":"1","order":"3356","possible_hits":"1",},
{"lineNum":"  179","line":"}"},
{"lineNum":"  180","line":""},
{"lineNum":"  181","line":"test \"can compile a \'let\' declaration with an inferred type\" {","class":"lineCov","hits":"2","order":"3358","possible_hits":"2",},
{"lineNum":"  182","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"3360","possible_hits":"1",},
{"lineNum":"  183","line":"        .code = \"let aVariable = 1234;\","},
{"lineNum":"  184","line":"    }).run();","class":"lineCov","hits":"1","order":"3359","possible_hits":"1",},
{"lineNum":"  185","line":"}"},
{"lineNum":"  186","line":""},
{"lineNum":"  187","line":"test \"can compile a \'var\' declaration with an inferred type\" {","class":"lineCov","hits":"2","order":"3361","possible_hits":"2",},
{"lineNum":"  188","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"3363","possible_hits":"1",},
{"lineNum":"  189","line":"        .code = \"var aVariable = false;\","},
{"lineNum":"  190","line":"    }).run();","class":"lineCov","hits":"1","order":"3362","possible_hits":"1",},
{"lineNum":"  191","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2021-12-30 12:25:10", "instrumented" : 86, "covered" : 72,};
var merged_data = [];
