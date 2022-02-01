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
{"lineNum":"   25","line":"const ContextError = @import(\"errors/context_error.zig\").ContextError;"},
{"lineNum":"   26","line":"const CompileError = @import(\"errors/compile_error.zig\").CompileError;"},
{"lineNum":"   27","line":"const CompilerTestCase = @import(\"compiler_test_case.zig\").CompilerTestCase;"},
{"lineNum":"   28","line":"const allocate = @import(\"../common/allocate.zig\");"},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"fn processCStyleClause(","class":"lineCov","hits":"1","order":"5207","possible_hits":"1",},
{"lineNum":"   31","line":"    cmp: *Compiler,"},
{"lineNum":"   32","line":"    clause: node.For.Clause.CStyleClause,"},
{"lineNum":"   33","line":") void {","class":"lineCov","hits":"1","order":"5211","possible_hits":"1",},
{"lineNum":"   34","line":"    cmp.processNode(clause.pre);","class":"lineCov","hits":"1","order":"5208","possible_hits":"1",},
{"lineNum":"   35","line":"    cmp.processNode(clause.cond);","class":"lineCov","hits":"1","order":"5209","possible_hits":"1",},
{"lineNum":"   36","line":"    cmp.processNode(clause.post);","class":"lineCov","hits":"1","order":"5210","possible_hits":"1",},
{"lineNum":"   37","line":"}"},
{"lineNum":"   38","line":""},
{"lineNum":"   39","line":"fn processEachClause(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   40","line":"    cmp: *Compiler,"},
{"lineNum":"   41","line":"    clause: node.For.Clause.EachClause,"},
{"lineNum":"   42","line":") void {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   43","line":"    _ = cmp;"},
{"lineNum":"   44","line":"    _ = clause;"},
{"lineNum":"   45","line":"    // TODO"},
{"lineNum":"   46","line":"    // For each loops should be implemented once objects are implemented as"},
{"lineNum":"   47","line":"    // they work on the \'iterable\' property."},
{"lineNum":"   48","line":"    // See typescriptlang.org/docs/handbook/iterators-and-generators.html"},
{"lineNum":"   49","line":"}"},
{"lineNum":"   50","line":""},
{"lineNum":"   51","line":"pub fn processFor(cmp: *Compiler, nd: Node) void {","class":"lineCov","hits":"2","order":"5201","possible_hits":"2",},
{"lineNum":"   52","line":"    std.debug.assert(nd.getType() == .For);","class":"lineCov","hits":"1","order":"5202","possible_hits":"1",},
{"lineNum":"   53","line":""},
{"lineNum":"   54","line":"    cmp.pushScope();","class":"lineCov","hits":"1","order":"5203","possible_hits":"1",},
{"lineNum":"   55","line":""},
{"lineNum":"   56","line":"    const loop = nd.data.For;","class":"linePartCov","hits":"2","order":"5204","possible_hits":"3",},
{"lineNum":"   57","line":""},
{"lineNum":"   58","line":"    switch (loop.clause) {","class":"linePartCov","hits":"2","order":"5205","possible_hits":"3",},
{"lineNum":"   59","line":"        .CStyle => |clause| processCStyleClause(cmp, clause),","class":"lineCov","hits":"1","order":"5206","possible_hits":"1",},
{"lineNum":"   60","line":"        .Each => |clause| processEachClause(cmp, clause),","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   61","line":"    }"},
{"lineNum":"   62","line":""},
{"lineNum":"   63","line":"    cmp.scope.ctx = .Loop;","class":"lineCov","hits":"1","order":"5212","possible_hits":"1",},
{"lineNum":"   64","line":"    cmp.processNode(loop.body);","class":"lineCov","hits":"1","order":"5213","possible_hits":"1",},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"    cmp.popScope();","class":"lineCov","hits":"1","order":"5214","possible_hits":"1",},
{"lineNum":"   67","line":"}"},
{"lineNum":"   68","line":""},
{"lineNum":"   69","line":"test \"can compile c-style \'for\' statements\" {","class":"lineCov","hits":"2","order":"5198","possible_hits":"2",},
{"lineNum":"   70","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"5215","possible_hits":"1",},
{"lineNum":"   71","line":"        .code = \"for (let i = 0; i < 10; i--) i += 2;\","},
{"lineNum":"   72","line":"    }).run();","class":"lineCov","hits":"1","order":"5199","possible_hits":"1",},
{"lineNum":"   73","line":"}"},
{"lineNum":"   74","line":""},
{"lineNum":"   75","line":"pub fn processWhile(cmp: *Compiler, nd: Node) void {","class":"lineCov","hits":"2","order":"5043","possible_hits":"2",},
{"lineNum":"   76","line":"    std.debug.assert(nd.getType() == .While);","class":"lineCov","hits":"1","order":"5044","possible_hits":"1",},
{"lineNum":"   77","line":""},
{"lineNum":"   78","line":"    const loop = nd.data.While;","class":"linePartCov","hits":"1","order":"5045","possible_hits":"2",},
{"lineNum":"   79","line":""},
{"lineNum":"   80","line":"    _ = cmp.inferExprType(loop.cond);","class":"lineCov","hits":"1","order":"5046","possible_hits":"1",},
{"lineNum":"   81","line":""},
{"lineNum":"   82","line":"    cmp.pushScope();","class":"lineCov","hits":"1","order":"5047","possible_hits":"1",},
{"lineNum":"   83","line":"    cmp.scope.ctx = .Loop;","class":"lineCov","hits":"1","order":"5048","possible_hits":"1",},
{"lineNum":"   84","line":"    cmp.processNode(loop.body);","class":"lineCov","hits":"1","order":"5049","possible_hits":"1",},
{"lineNum":"   85","line":"    cmp.popScope();","class":"lineCov","hits":"1","order":"5058","possible_hits":"1",},
{"lineNum":"   86","line":"}"},
{"lineNum":"   87","line":""},
{"lineNum":"   88","line":"test \"can compile \'while\' statements\" {","class":"lineCov","hits":"2","order":"5216","possible_hits":"2",},
{"lineNum":"   89","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"5218","possible_hits":"1",},
{"lineNum":"   90","line":"        .code = \"while (true) var a = 6;\","},
{"lineNum":"   91","line":"    }).run();","class":"lineCov","hits":"1","order":"5217","possible_hits":"1",},
{"lineNum":"   92","line":"}"},
{"lineNum":"   93","line":""},
{"lineNum":"   94","line":"pub fn processDo(cmp: *Compiler, nd: Node) void {","class":"lineCov","hits":"2","order":"5222","possible_hits":"2",},
{"lineNum":"   95","line":"    std.debug.assert(nd.getType() == .Do);","class":"lineCov","hits":"1","order":"5223","possible_hits":"1",},
{"lineNum":"   96","line":""},
{"lineNum":"   97","line":"    const loop = nd.data.Do;","class":"linePartCov","hits":"1","order":"5224","possible_hits":"2",},
{"lineNum":"   98","line":""},
{"lineNum":"   99","line":"    cmp.scope.ctx = .Loop;","class":"lineCov","hits":"1","order":"5225","possible_hits":"1",},
{"lineNum":"  100","line":"    cmp.processNode(loop.body);","class":"lineCov","hits":"1","order":"5226","possible_hits":"1",},
{"lineNum":"  101","line":"    cmp.scope.ctx = null;","class":"lineCov","hits":"1","order":"5227","possible_hits":"1",},
{"lineNum":"  102","line":""},
{"lineNum":"  103","line":"    _ = cmp.inferExprType(loop.cond);","class":"lineCov","hits":"1","order":"5228","possible_hits":"1",},
{"lineNum":"  104","line":"}"},
{"lineNum":"  105","line":""},
{"lineNum":"  106","line":"test \"can compile \'do\' statements\" {","class":"lineCov","hits":"2","order":"5219","possible_hits":"2",},
{"lineNum":"  107","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"5229","possible_hits":"1",},
{"lineNum":"  108","line":"        .code = \"do var x = 3; while (true);\","},
{"lineNum":"  109","line":"    }).run();","class":"lineCov","hits":"1","order":"5220","possible_hits":"1",},
{"lineNum":"  110","line":"}"},
{"lineNum":"  111","line":""},
{"lineNum":"  112","line":"pub fn processBreak(cmp: *Compiler, nd: Node) void {","class":"lineCov","hits":"2","order":"5186","possible_hits":"2",},
{"lineNum":"  113","line":"    std.debug.assert(nd.getType() == .Break);","class":"lineCov","hits":"1","order":"5187","possible_hits":"1",},
{"lineNum":"  114","line":""},
{"lineNum":"  115","line":"    if (!cmp.scope.isInContext(.Loop) and !cmp.scope.isInContext(.Switch))","class":"lineCov","hits":"2","order":"5188","possible_hits":"2",},
{"lineNum":"  116","line":"        cmp.errors.append(CompileError.contextError(ContextError.new(","class":"lineCov","hits":"2","order":"5235","possible_hits":"2",},
{"lineNum":"  117","line":"            nd.csr,","class":"lineCov","hits":"1","order":"5236","possible_hits":"1",},
{"lineNum":"  118","line":"            \"Break\","},
{"lineNum":"  119","line":"            \"a loop\","},
{"lineNum":"  120","line":"        ))) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"5237","possible_hits":"1",},
{"lineNum":"  121","line":"}"},
{"lineNum":"  122","line":""},
{"lineNum":"  123","line":"test \"can compile \'break\' statements in a loop\" {","class":"lineCov","hits":"2","order":"5230","possible_hits":"2",},
{"lineNum":"  124","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"5232","possible_hits":"1",},
{"lineNum":"  125","line":"        .code = \"while (true) break;\","},
{"lineNum":"  126","line":"    }).run();","class":"lineCov","hits":"1","order":"5231","possible_hits":"1",},
{"lineNum":"  127","line":"}"},
{"lineNum":"  128","line":""},
{"lineNum":"  129","line":"// TODO: Test case where break is inside a switch statement"},
{"lineNum":"  130","line":"test \"\'break\' must be inside a loop\" {","class":"lineCov","hits":"2","order":"5233","possible_hits":"2",},
{"lineNum":"  131","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"5247","possible_hits":"1",},
{"lineNum":"  132","line":"        .code = \"break;\","},
{"lineNum":"  133","line":"        .check = (struct {"},
{"lineNum":"  134","line":"            pub fn check(self: CompilerTestCase, cmp: Compiler) anyerror!void {","class":"lineCov","hits":"2","order":"5238","possible_hits":"2",},
{"lineNum":"  135","line":"                try self.expectEqual(@intCast(usize, 1), cmp.errors.count());","class":"lineCov","hits":"1","order":"5239","possible_hits":"1",},
{"lineNum":"  136","line":"                const err = cmp.getError(0);","class":"lineCov","hits":"1","order":"5240","possible_hits":"1",},
{"lineNum":"  137","line":"                try self.expectEqual(","class":"lineCov","hits":"1","order":"5242","possible_hits":"1",},
{"lineNum":"  138","line":"                    CompileError.Type.ContextError,"},
{"lineNum":"  139","line":"                    err.getType(),","class":"lineCov","hits":"1","order":"5241","possible_hits":"1",},
{"lineNum":"  140","line":"                );"},
{"lineNum":"  141","line":"                try self.expectEqualStrings(","class":"linePartCov","hits":"1","order":"5244","possible_hits":"2",},
{"lineNum":"  142","line":"                    \"Break\","},
{"lineNum":"  143","line":"                    err.ContextError.found,","class":"linePartCov","hits":"2","order":"5243","possible_hits":"3",},
{"lineNum":"  144","line":"                );"},
{"lineNum":"  145","line":"                try self.expectEqualStrings(","class":"linePartCov","hits":"1","order":"5246","possible_hits":"2",},
{"lineNum":"  146","line":"                    \"a loop\","},
{"lineNum":"  147","line":"                    err.ContextError.expectedContext,","class":"linePartCov","hits":"2","order":"5245","possible_hits":"3",},
{"lineNum":"  148","line":"                );"},
{"lineNum":"  149","line":"            }"},
{"lineNum":"  150","line":"        }).check,"},
{"lineNum":"  151","line":"    }).run();","class":"lineCov","hits":"1","order":"5234","possible_hits":"1",},
{"lineNum":"  152","line":"}"},
{"lineNum":"  153","line":""},
{"lineNum":"  154","line":"pub fn processContinue(cmp: *Compiler, nd: Node) void {","class":"lineCov","hits":"2","order":"5251","possible_hits":"2",},
{"lineNum":"  155","line":"    std.debug.assert(nd.getType() == .Continue);","class":"lineCov","hits":"1","order":"5252","possible_hits":"1",},
{"lineNum":"  156","line":""},
{"lineNum":"  157","line":"    if (!cmp.scope.isInContext(.Loop))","class":"lineCov","hits":"2","order":"5253","possible_hits":"2",},
{"lineNum":"  158","line":"        cmp.errors.append(CompileError.contextError(ContextError.new(","class":"lineCov","hits":"2","order":"5257","possible_hits":"2",},
{"lineNum":"  159","line":"            nd.csr,","class":"lineCov","hits":"1","order":"5258","possible_hits":"1",},
{"lineNum":"  160","line":"            \"Continue\","},
{"lineNum":"  161","line":"            \"a loop\","},
{"lineNum":"  162","line":"        ))) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"5259","possible_hits":"1",},
{"lineNum":"  163","line":"}"},
{"lineNum":"  164","line":""},
{"lineNum":"  165","line":"test \"can compile \'continue\' statements\" {","class":"lineCov","hits":"2","order":"5248","possible_hits":"2",},
{"lineNum":"  166","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"5254","possible_hits":"1",},
{"lineNum":"  167","line":"        .code = \"while (true) continue;\","},
{"lineNum":"  168","line":"    }).run();","class":"lineCov","hits":"1","order":"5249","possible_hits":"1",},
{"lineNum":"  169","line":"}"},
{"lineNum":"  170","line":""},
{"lineNum":"  171","line":"test \"\'continue\' must be inside a loop\" {","class":"lineCov","hits":"2","order":"5255","possible_hits":"2",},
{"lineNum":"  172","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"5269","possible_hits":"1",},
{"lineNum":"  173","line":"        .code = \"continue;\","},
{"lineNum":"  174","line":"        .check = (struct {"},
{"lineNum":"  175","line":"            pub fn check(self: CompilerTestCase, cmp: Compiler) anyerror!void {","class":"lineCov","hits":"2","order":"5260","possible_hits":"2",},
{"lineNum":"  176","line":"                try self.expectEqual(@intCast(usize, 1), cmp.errors.count());","class":"lineCov","hits":"1","order":"5261","possible_hits":"1",},
{"lineNum":"  177","line":"                const err = cmp.getError(0);","class":"lineCov","hits":"1","order":"5262","possible_hits":"1",},
{"lineNum":"  178","line":"                try self.expectEqual(","class":"lineCov","hits":"1","order":"5264","possible_hits":"1",},
{"lineNum":"  179","line":"                    CompileError.Type.ContextError,"},
{"lineNum":"  180","line":"                    err.getType(),","class":"lineCov","hits":"1","order":"5263","possible_hits":"1",},
{"lineNum":"  181","line":"                );"},
{"lineNum":"  182","line":"                try self.expectEqualStrings(","class":"linePartCov","hits":"1","order":"5266","possible_hits":"2",},
{"lineNum":"  183","line":"                    \"Continue\","},
{"lineNum":"  184","line":"                    err.ContextError.found,","class":"linePartCov","hits":"2","order":"5265","possible_hits":"3",},
{"lineNum":"  185","line":"                );"},
{"lineNum":"  186","line":"                try self.expectEqualStrings(","class":"linePartCov","hits":"1","order":"5268","possible_hits":"2",},
{"lineNum":"  187","line":"                    \"a loop\","},
{"lineNum":"  188","line":"                    err.ContextError.expectedContext,","class":"linePartCov","hits":"2","order":"5267","possible_hits":"3",},
{"lineNum":"  189","line":"                );"},
{"lineNum":"  190","line":"            }"},
{"lineNum":"  191","line":"        }).check,"},
{"lineNum":"  192","line":"    }).run();","class":"lineCov","hits":"1","order":"5256","possible_hits":"1",},
{"lineNum":"  193","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-01 21:28:32", "instrumented" : 83, "covered" : 80,};
var merged_data = [];
