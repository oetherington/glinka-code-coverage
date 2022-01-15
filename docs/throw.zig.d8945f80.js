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
{"lineNum":"   32","line":"pub fn processThrow(cmp: *Compiler, nd: Node) void {","class":"lineCov","hits":"2","order":"4750","possible_hits":"2",},
{"lineNum":"   33","line":"    std.debug.assert(nd.getType() == NodeType.Throw);","class":"lineCov","hits":"1","order":"4751","possible_hits":"1",},
{"lineNum":"   34","line":"    _ = cmp.inferExprType(nd.data.Throw);","class":"linePartCov","hits":"1","order":"4752","possible_hits":"2",},
{"lineNum":"   35","line":"}"},
{"lineNum":"   36","line":""},
{"lineNum":"   37","line":"test \"can compile a \'throw\' statement\" {","class":"lineCov","hits":"2","order":"4747","possible_hits":"2",},
{"lineNum":"   38","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4753","possible_hits":"1",},
{"lineNum":"   39","line":"        .code = \"throw false;\","},
{"lineNum":"   40","line":"    }).run();","class":"lineCov","hits":"1","order":"4748","possible_hits":"1",},
{"lineNum":"   41","line":"}"},
{"lineNum":"   42","line":""},
{"lineNum":"   43","line":"pub fn processTry(cmp: *Compiler, nd: Node) void {","class":"lineCov","hits":"2","order":"4757","possible_hits":"2",},
{"lineNum":"   44","line":"    std.debug.assert(nd.getType() == NodeType.Try);","class":"lineCov","hits":"1","order":"4758","possible_hits":"1",},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"    const data = nd.data.Try;","class":"linePartCov","hits":"2","order":"4759","possible_hits":"3",},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"    cmp.scope.ctx = .Try;","class":"lineCov","hits":"1","order":"4760","possible_hits":"1",},
{"lineNum":"   49","line":"    cmp.processNode(data.tryBlock);","class":"lineCov","hits":"1","order":"4761","possible_hits":"1",},
{"lineNum":"   50","line":"    cmp.scope.ctx = null;","class":"lineCov","hits":"1","order":"4762","possible_hits":"1",},
{"lineNum":"   51","line":""},
{"lineNum":"   52","line":"    cmp.scope.ctx = .Catch;","class":"lineCov","hits":"1","order":"4763","possible_hits":"1",},
{"lineNum":"   53","line":"    for (data.catchBlocks.items) |catchBlock| {","class":"lineCov","hits":"3","order":"4764","possible_hits":"3",},
{"lineNum":"   54","line":"        cmp.pushScope();","class":"lineCov","hits":"1","order":"4765","possible_hits":"1",},
{"lineNum":"   55","line":"        cmp.scope.ctx = .Catch;","class":"lineCov","hits":"1","order":"4766","possible_hits":"1",},
{"lineNum":"   56","line":""},
{"lineNum":"   57","line":"        cmp.scope.put(","class":"lineCov","hits":"2","order":"4767","possible_hits":"2",},
{"lineNum":"   58","line":"            catchBlock.name,","class":"lineCov","hits":"1","order":"4768","possible_hits":"1",},
{"lineNum":"   59","line":"            cmp.typebook.getAny(),","class":"lineCov","hits":"1","order":"4769","possible_hits":"1",},
{"lineNum":"   60","line":"            false,"},
{"lineNum":"   61","line":"            nd.csr,","class":"lineCov","hits":"1","order":"4770","possible_hits":"1",},
{"lineNum":"   62","line":"        );"},
{"lineNum":"   63","line":""},
{"lineNum":"   64","line":"        cmp.processNode(catchBlock.block);","class":"lineCov","hits":"1","order":"4771","possible_hits":"1",},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"        cmp.popScope();","class":"lineCov","hits":"1","order":"4772","possible_hits":"1",},
{"lineNum":"   67","line":"    }"},
{"lineNum":"   68","line":""},
{"lineNum":"   69","line":"    if (data.finallyBlock) |finallyBlock| {","class":"lineCov","hits":"2","order":"4773","possible_hits":"2",},
{"lineNum":"   70","line":"        cmp.scope.ctx = .Finally;","class":"lineCov","hits":"1","order":"4774","possible_hits":"1",},
{"lineNum":"   71","line":"        cmp.processNode(finallyBlock);","class":"lineCov","hits":"1","order":"4775","possible_hits":"1",},
{"lineNum":"   72","line":"        cmp.scope.ctx = null;","class":"lineCov","hits":"1","order":"4776","possible_hits":"1",},
{"lineNum":"   73","line":"    }"},
{"lineNum":"   74","line":"}"},
{"lineNum":"   75","line":""},
{"lineNum":"   76","line":"test \"can compile a \'try/catch/finally\' statement\" {","class":"lineCov","hits":"2","order":"4754","possible_hits":"2",},
{"lineNum":"   77","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4777","possible_hits":"1",},
{"lineNum":"   78","line":"        .code = \"try { var a = 6; } catch (e) { true; } finally { null; }\","},
{"lineNum":"   79","line":"    }).run();","class":"lineCov","hits":"1","order":"4755","possible_hits":"1",},
{"lineNum":"   80","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-15 21:43:22", "instrumented" : 29, "covered" : 29,};
var merged_data = [];
