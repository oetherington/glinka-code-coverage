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
{"lineNum":"   25","line":"const GenericError = @import(\"errors/generic_error.zig\").GenericError;"},
{"lineNum":"   26","line":"const CompileError = @import(\"errors/compile_error.zig\").CompileError;"},
{"lineNum":"   27","line":"const CompilerTestCase = @import(\"compiler_test_case.zig\").CompilerTestCase;"},
{"lineNum":"   28","line":"const allocate = @import(\"../common/allocate.zig\");"},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"pub fn processConditional(cmp: *Compiler, nd: Node) void {","class":"lineCov","hits":"2","order":"4898","possible_hits":"2",},
{"lineNum":"   31","line":"    std.debug.assert(nd.getType() == .If);","class":"lineCov","hits":"1","order":"4899","possible_hits":"1",},
{"lineNum":"   32","line":""},
{"lineNum":"   33","line":"    const cond = nd.data.If;","class":"linePartCov","hits":"2","order":"4900","possible_hits":"3",},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"    for (cond.branches.items) |branch| {","class":"lineCov","hits":"3","order":"4901","possible_hits":"3",},
{"lineNum":"   36","line":"        _ = cmp.inferExprType(branch.cond);","class":"lineCov","hits":"1","order":"4902","possible_hits":"1",},
{"lineNum":"   37","line":"        cmp.processNode(branch.ifTrue);","class":"lineCov","hits":"1","order":"4903","possible_hits":"1",},
{"lineNum":"   38","line":"    }"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"    if (cond.elseBranch) |branch| {","class":"lineCov","hits":"2","order":"4904","possible_hits":"2",},
{"lineNum":"   41","line":"        cmp.processNode(branch);","class":"lineCov","hits":"1","order":"4908","possible_hits":"1",},
{"lineNum":"   42","line":"    }"},
{"lineNum":"   43","line":"}"},
{"lineNum":"   44","line":""},
{"lineNum":"   45","line":"test \"can compile simple \'if\' statement\" {","class":"lineCov","hits":"2","order":"4895","possible_hits":"2",},
{"lineNum":"   46","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4905","possible_hits":"1",},
{"lineNum":"   47","line":"        .code = \"if (true) var a = 6;\","},
{"lineNum":"   48","line":"    }).run();","class":"lineCov","hits":"1","order":"4896","possible_hits":"1",},
{"lineNum":"   49","line":"}"},
{"lineNum":"   50","line":""},
{"lineNum":"   51","line":"test \"can compile \'if\' statement with \'else\'\" {","class":"lineCov","hits":"2","order":"4906","possible_hits":"2",},
{"lineNum":"   52","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4909","possible_hits":"1",},
{"lineNum":"   53","line":"        .code = \"if (true) var a = 6; else var b = 7;\","},
{"lineNum":"   54","line":"    }).run();","class":"lineCov","hits":"1","order":"4907","possible_hits":"1",},
{"lineNum":"   55","line":"}"},
{"lineNum":"   56","line":""},
{"lineNum":"   57","line":"test \"can compile \'if\' statement with \'else if\'\" {","class":"lineCov","hits":"2","order":"4910","possible_hits":"2",},
{"lineNum":"   58","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4912","possible_hits":"1",},
{"lineNum":"   59","line":"        .code = \"if (true) var a = 6; else if (false) var b = 7;\","},
{"lineNum":"   60","line":"    }).run();","class":"lineCov","hits":"1","order":"4911","possible_hits":"1",},
{"lineNum":"   61","line":"}"},
{"lineNum":"   62","line":""},
{"lineNum":"   63","line":"test \"can compile \'if\' statement with multiple \'else if\'\" {","class":"lineCov","hits":"2","order":"4913","possible_hits":"2",},
{"lineNum":"   64","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4915","possible_hits":"1",},
{"lineNum":"   65","line":"        .code ="},
{"lineNum":"   66","line":"        \\\\if (true) var a = 6;"},
{"lineNum":"   67","line":"        \\\\else if (false) var b = 7;"},
{"lineNum":"   68","line":"        \\\\else if (3) var c = 8;"},
{"lineNum":"   69","line":"        \\\\else if (4) var d = 9;"},
{"lineNum":"   70","line":"        ,"},
{"lineNum":"   71","line":"    }).run();","class":"lineCov","hits":"1","order":"4914","possible_hits":"1",},
{"lineNum":"   72","line":"}"},
{"lineNum":"   73","line":""},
{"lineNum":"   74","line":"test \"can compile \'if\' statement with multiple \'else if\' and \'else\'\" {","class":"lineCov","hits":"2","order":"4916","possible_hits":"2",},
{"lineNum":"   75","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4918","possible_hits":"1",},
{"lineNum":"   76","line":"        .code ="},
{"lineNum":"   77","line":"        \\\\if (true) var a = 6;"},
{"lineNum":"   78","line":"        \\\\else if (false) var b = 7;"},
{"lineNum":"   79","line":"        \\\\else if (3) var c = 8;"},
{"lineNum":"   80","line":"        \\\\else if (4) var d = 9;"},
{"lineNum":"   81","line":"        \\\\else var e = 10;"},
{"lineNum":"   82","line":"        ,"},
{"lineNum":"   83","line":"    }).run();","class":"lineCov","hits":"1","order":"4917","possible_hits":"1",},
{"lineNum":"   84","line":"}"},
{"lineNum":"   85","line":""},
{"lineNum":"   86","line":"pub fn processSwitch(cmp: *Compiler, nd: Node) void {","class":"lineCov","hits":"2","order":"4922","possible_hits":"2",},
{"lineNum":"   87","line":"    std.debug.assert(nd.getType() == .Switch);","class":"lineCov","hits":"1","order":"4923","possible_hits":"1",},
{"lineNum":"   88","line":""},
{"lineNum":"   89","line":"    const sw = nd.data.Switch;","class":"linePartCov","hits":"2","order":"4924","possible_hits":"3",},
{"lineNum":"   90","line":""},
{"lineNum":"   91","line":"    const exprTy = cmp.inferExprType(sw.expr) orelse return;","class":"linePartCov","hits":"1","order":"4925","possible_hits":"2",},
{"lineNum":"   92","line":""},
{"lineNum":"   93","line":"    cmp.scope.ctx = .Switch;","class":"lineCov","hits":"1","order":"4926","possible_hits":"1",},
{"lineNum":"   94","line":""},
{"lineNum":"   95","line":"    for (sw.cases.items) |case| {","class":"lineCov","hits":"2","order":"4927","possible_hits":"2",},
{"lineNum":"   96","line":"        if (cmp.inferExprType(case.value)) |valueTy| {","class":"lineCov","hits":"2","order":"4928","possible_hits":"2",},
{"lineNum":"   97","line":"            if (!valueTy.isAssignableTo(exprTy)) {","class":"linePartCov","hits":"1","order":"4929","possible_hits":"2",},
{"lineNum":"   98","line":"                cmp.errors.append(CompileError.genericError(","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   99","line":"                    GenericError.new(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  100","line":"                        case.value.csr,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  101","line":"                        \"Case type does not match switch type\","},
{"lineNum":"  102","line":"                    ),"},
{"lineNum":"  103","line":"                )) catch allocate.reportAndExit();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  104","line":"            }"},
{"lineNum":"  105","line":"        }"},
{"lineNum":"  106","line":""},
{"lineNum":"  107","line":"        for (case.stmts.items) |stmt|","class":"lineCov","hits":"2","order":"4930","possible_hits":"2",},
{"lineNum":"  108","line":"            cmp.processNode(stmt);","class":"lineCov","hits":"1","order":"4931","possible_hits":"1",},
{"lineNum":"  109","line":"    }"},
{"lineNum":"  110","line":""},
{"lineNum":"  111","line":"    if (sw.default) |default| {","class":"lineCov","hits":"2","order":"4938","possible_hits":"2",},
{"lineNum":"  112","line":"        for (default.items) |stmt|","class":"lineCov","hits":"2","order":"4939","possible_hits":"2",},
{"lineNum":"  113","line":"            cmp.processNode(stmt);","class":"lineCov","hits":"1","order":"4940","possible_hits":"1",},
{"lineNum":"  114","line":"    }"},
{"lineNum":"  115","line":""},
{"lineNum":"  116","line":"    cmp.scope.ctx = null;","class":"lineCov","hits":"1","order":"4945","possible_hits":"1",},
{"lineNum":"  117","line":"}"},
{"lineNum":"  118","line":""},
{"lineNum":"  119","line":"test \"can compile \'switch\' statement\" {","class":"lineCov","hits":"2","order":"4919","possible_hits":"2",},
{"lineNum":"  120","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4946","possible_hits":"1",},
{"lineNum":"  121","line":"        .code ="},
{"lineNum":"  122","line":"        \\\\switch (2) {"},
{"lineNum":"  123","line":"        \\\\  case 1: null;"},
{"lineNum":"  124","line":"        \\\\  case 2: undefined; break;"},
{"lineNum":"  125","line":"        \\\\  default: return;"},
{"lineNum":"  126","line":"        \\\\}"},
{"lineNum":"  127","line":"        ,"},
{"lineNum":"  128","line":"    }).run();","class":"lineCov","hits":"1","order":"4920","possible_hits":"1",},
{"lineNum":"  129","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-19 21:33:16", "instrumented" : 44, "covered" : 40,};
var merged_data = [];
