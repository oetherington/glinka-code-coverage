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
{"lineNum":"   28","line":""},
{"lineNum":"   29","line":"pub fn processBlock(cmp: *Compiler, nd: Node) void {","class":"lineCov","hits":"2","order":"4458","possible_hits":"2",},
{"lineNum":"   30","line":"    std.debug.assert(nd.getType() == .Block);","class":"lineCov","hits":"1","order":"4459","possible_hits":"1",},
{"lineNum":"   31","line":""},
{"lineNum":"   32","line":"    cmp.pushScope();","class":"lineCov","hits":"1","order":"4460","possible_hits":"1",},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"    const children = nd.data.Block.items;","class":"linePartCov","hits":"2","order":"4461","possible_hits":"3",},
{"lineNum":"   35","line":""},
{"lineNum":"   36","line":"    for (children) |child|","class":"lineCov","hits":"3","order":"4462","possible_hits":"3",},
{"lineNum":"   37","line":"        cmp.processNode(child);","class":"lineCov","hits":"1","order":"4463","possible_hits":"1",},
{"lineNum":"   38","line":""},
{"lineNum":"   39","line":"    cmp.popScope();","class":"lineCov","hits":"1","order":"4464","possible_hits":"1",},
{"lineNum":"   40","line":"}"},
{"lineNum":"   41","line":""},
{"lineNum":"   42","line":"test \"can compile blocks\" {","class":"lineCov","hits":"2","order":"4447","possible_hits":"2",},
{"lineNum":"   43","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4466","possible_hits":"1",},
{"lineNum":"   44","line":"        .code = \"while (true) { var a = 6; let b = \'foobar\'; }\","},
{"lineNum":"   45","line":"    }).run();","class":"lineCov","hits":"1","order":"4448","possible_hits":"1",},
{"lineNum":"   46","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-13 17:49:52", "instrumented" : 10, "covered" : 10,};
var merged_data = [];
