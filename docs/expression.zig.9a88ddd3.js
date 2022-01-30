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
{"lineNum":"   26","line":"const GenericError = @import(\"errors/generic_error.zig\").GenericError;"},
{"lineNum":"   27","line":"const CompileError = @import(\"errors/compile_error.zig\").CompileError;"},
{"lineNum":"   28","line":"const CompilerTestCase = @import(\"compiler_test_case.zig\").CompilerTestCase;"},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"pub fn processExpression(cmp: *Compiler, nd: Node) void {","class":"lineCov","hits":"2","order":"4895","possible_hits":"2",},
{"lineNum":"   31","line":"    _ = cmp.inferExprType(nd);","class":"lineCov","hits":"1","order":"4896","possible_hits":"1",},
{"lineNum":"   32","line":"}"},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"test \"can compile assign expressions\" {","class":"lineCov","hits":"2","order":"4892","possible_hits":"2",},
{"lineNum":"   35","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4908","possible_hits":"1",},
{"lineNum":"   36","line":"        .code = \"var aVariable = 3; aVariable = 4; aVariable += 3;\","},
{"lineNum":"   37","line":"    }).run();","class":"lineCov","hits":"1","order":"4893","possible_hits":"1",},
{"lineNum":"   38","line":"}"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"test \"assign expressions are type checked\" {","class":"lineCov","hits":"2","order":"4909","possible_hits":"2",},
{"lineNum":"   41","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4931","possible_hits":"1",},
{"lineNum":"   42","line":"        .code = \"var aVariable = false; aVariable = 3;\","},
{"lineNum":"   43","line":"        .check = (struct {"},
{"lineNum":"   44","line":"            fn check(case: CompilerTestCase, cmp: Compiler) anyerror!void {","class":"lineCov","hits":"2","order":"4920","possible_hits":"2",},
{"lineNum":"   45","line":"                try case.expectEqual(@intCast(usize, 1), cmp.errors.count());","class":"lineCov","hits":"1","order":"4921","possible_hits":"1",},
{"lineNum":"   46","line":""},
{"lineNum":"   47","line":"                const err = cmp.getError(0);","class":"lineCov","hits":"1","order":"4922","possible_hits":"1",},
{"lineNum":"   48","line":"                try case.expectEqual(","class":"lineCov","hits":"1","order":"4924","possible_hits":"1",},
{"lineNum":"   49","line":"                    CompileError.Type.AssignError,"},
{"lineNum":"   50","line":"                    err.getType(),","class":"lineCov","hits":"1","order":"4923","possible_hits":"1",},
{"lineNum":"   51","line":"                );"},
{"lineNum":"   52","line":"                try case.expectEqual(","class":"linePartCov","hits":"1","order":"4927","possible_hits":"2",},
{"lineNum":"   53","line":"                    cmp.typebook.getBoolean(),","class":"lineCov","hits":"1","order":"4925","possible_hits":"1",},
{"lineNum":"   54","line":"                    err.AssignError.left,","class":"linePartCov","hits":"2","order":"4926","possible_hits":"3",},
{"lineNum":"   55","line":"                );"},
{"lineNum":"   56","line":"                try case.expectEqual(","class":"linePartCov","hits":"1","order":"4930","possible_hits":"2",},
{"lineNum":"   57","line":"                    cmp.typebook.getNumber(),","class":"lineCov","hits":"1","order":"4928","possible_hits":"1",},
{"lineNum":"   58","line":"                    err.AssignError.right,","class":"linePartCov","hits":"2","order":"4929","possible_hits":"3",},
{"lineNum":"   59","line":"                );"},
{"lineNum":"   60","line":"            }"},
{"lineNum":"   61","line":"        }).check,"},
{"lineNum":"   62","line":"    }).run();","class":"lineCov","hits":"1","order":"4910","possible_hits":"1",},
{"lineNum":"   63","line":"}"},
{"lineNum":"   64","line":""},
{"lineNum":"   65","line":"test \"can compile prefix expressions\" {","class":"lineCov","hits":"2","order":"4932","possible_hits":"2",},
{"lineNum":"   66","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4940","possible_hits":"1",},
{"lineNum":"   67","line":"        .code = \"let aVariable = 4; ++aVariable; --aVariable;\","},
{"lineNum":"   68","line":"    }).run();","class":"lineCov","hits":"1","order":"4933","possible_hits":"1",},
{"lineNum":"   69","line":"}"},
{"lineNum":"   70","line":""},
{"lineNum":"   71","line":"test \"prefix expressions are type checked\" {","class":"lineCov","hits":"2","order":"4941","possible_hits":"2",},
{"lineNum":"   72","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4954","possible_hits":"1",},
{"lineNum":"   73","line":"        .code = \"let aVariable = \'a string\'; ++aVariable; --aVariable;\","},
{"lineNum":"   74","line":"        .check = (struct {"},
{"lineNum":"   75","line":"            fn check(case: CompilerTestCase, cmp: Compiler) anyerror!void {","class":"lineCov","hits":"2","order":"4948","possible_hits":"2",},
{"lineNum":"   76","line":"                try case.expectEqual(@intCast(usize, 2), cmp.errors.count());","class":"lineCov","hits":"1","order":"4949","possible_hits":"1",},
{"lineNum":"   77","line":""},
{"lineNum":"   78","line":"                try case.expectEqual(","class":"lineCov","hits":"1","order":"4951","possible_hits":"1",},
{"lineNum":"   79","line":"                    CompileError.Type.OpError,"},
{"lineNum":"   80","line":"                    cmp.getError(0).getType(),","class":"lineCov","hits":"1","order":"4950","possible_hits":"1",},
{"lineNum":"   81","line":"                );"},
{"lineNum":"   82","line":"                try case.expectEqual(","class":"lineCov","hits":"1","order":"4953","possible_hits":"1",},
{"lineNum":"   83","line":"                    CompileError.Type.OpError,"},
{"lineNum":"   84","line":"                    cmp.getError(1).getType(),","class":"lineCov","hits":"1","order":"4952","possible_hits":"1",},
{"lineNum":"   85","line":"                );"},
{"lineNum":"   86","line":"            }"},
{"lineNum":"   87","line":"        }).check,"},
{"lineNum":"   88","line":"    }).run();","class":"lineCov","hits":"1","order":"4942","possible_hits":"1",},
{"lineNum":"   89","line":"}"},
{"lineNum":"   90","line":""},
{"lineNum":"   91","line":"test \"can compile postfix expressions\" {","class":"lineCov","hits":"2","order":"4955","possible_hits":"2",},
{"lineNum":"   92","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4962","possible_hits":"1",},
{"lineNum":"   93","line":"        .code = \"let aVariable = 4; aVariable++; aVariable--;\","},
{"lineNum":"   94","line":"    }).run();","class":"lineCov","hits":"1","order":"4956","possible_hits":"1",},
{"lineNum":"   95","line":"}"},
{"lineNum":"   96","line":""},
{"lineNum":"   97","line":"test \"postfix expressions are type checked\" {","class":"lineCov","hits":"2","order":"4963","possible_hits":"2",},
{"lineNum":"   98","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4971","possible_hits":"1",},
{"lineNum":"   99","line":"        .code = \"let aVariable = \'a string\'; aVariable++; aVariable--;\","},
{"lineNum":"  100","line":"        .check = (struct {"},
{"lineNum":"  101","line":"            fn check(case: CompilerTestCase, cmp: Compiler) anyerror!void {","class":"lineCov","hits":"2","order":"4965","possible_hits":"2",},
{"lineNum":"  102","line":"                try case.expectEqual(@intCast(usize, 2), cmp.errors.count());","class":"lineCov","hits":"1","order":"4966","possible_hits":"1",},
{"lineNum":"  103","line":""},
{"lineNum":"  104","line":"                try case.expectEqual(","class":"lineCov","hits":"1","order":"4968","possible_hits":"1",},
{"lineNum":"  105","line":"                    CompileError.Type.OpError,"},
{"lineNum":"  106","line":"                    cmp.getError(0).getType(),","class":"lineCov","hits":"1","order":"4967","possible_hits":"1",},
{"lineNum":"  107","line":"                );"},
{"lineNum":"  108","line":"                try case.expectEqual(","class":"lineCov","hits":"1","order":"4970","possible_hits":"1",},
{"lineNum":"  109","line":"                    CompileError.Type.OpError,"},
{"lineNum":"  110","line":"                    cmp.getError(1).getType(),","class":"lineCov","hits":"1","order":"4969","possible_hits":"1",},
{"lineNum":"  111","line":"                );"},
{"lineNum":"  112","line":"            }"},
{"lineNum":"  113","line":"        }).check,"},
{"lineNum":"  114","line":"    }).run();","class":"lineCov","hits":"1","order":"4964","possible_hits":"1",},
{"lineNum":"  115","line":"}"},
{"lineNum":"  116","line":""},
{"lineNum":"  117","line":"test \"can compile ternary expressions\" {","class":"lineCov","hits":"2","order":"4972","possible_hits":"2",},
{"lineNum":"  118","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4983","possible_hits":"1",},
{"lineNum":"  119","line":"        .code = \"true ? 1 : 0;\","},
{"lineNum":"  120","line":"    }).run();","class":"lineCov","hits":"1","order":"4973","possible_hits":"1",},
{"lineNum":"  121","line":"}"},
{"lineNum":"  122","line":""},
{"lineNum":"  123","line":"test \"can compile function call expressions\" {","class":"lineCov","hits":"2","order":"4984","possible_hits":"2",},
{"lineNum":"  124","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"5012","possible_hits":"1",},
{"lineNum":"  125","line":"        .code = \"aFunction(\'a\', 1);\","},
{"lineNum":"  126","line":"        .setup = (struct {"},
{"lineNum":"  127","line":"            pub fn setup(cmp: Compiler) anyerror!void {","class":"lineCov","hits":"2","order":"4988","possible_hits":"2",},
{"lineNum":"  128","line":"                const ty = cmp.typebook.getFunction(","class":"lineCov","hits":"2","order":"4989","possible_hits":"2",},
{"lineNum":"  129","line":"                    cmp.typebook.getVoid(),","class":"lineCov","hits":"1","order":"4990","possible_hits":"1",},
{"lineNum":"  130","line":"                    &[_]Type.Ptr{","class":"lineCov","hits":"1","order":"4993","possible_hits":"1",},
{"lineNum":"  131","line":"                        cmp.typebook.getString(),","class":"lineCov","hits":"1","order":"4991","possible_hits":"1",},
{"lineNum":"  132","line":"                        cmp.typebook.getNumber(),","class":"lineCov","hits":"1","order":"4992","possible_hits":"1",},
{"lineNum":"  133","line":"                    },"},
{"lineNum":"  134","line":"                    false,"},
{"lineNum":"  135","line":"                );"},
{"lineNum":"  136","line":""},
{"lineNum":"  137","line":"                cmp.scope.put(\"aFunction\", ty, true, Cursor.new(0, 0));","class":"lineCov","hits":"1","order":"4994","possible_hits":"1",},
{"lineNum":"  138","line":"            }"},
{"lineNum":"  139","line":"        }).setup,"},
{"lineNum":"  140","line":"    }).run();","class":"lineCov","hits":"1","order":"4985","possible_hits":"1",},
{"lineNum":"  141","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-30 17:27:46", "instrumented" : 56, "covered" : 56,};
var merged_data = [];
