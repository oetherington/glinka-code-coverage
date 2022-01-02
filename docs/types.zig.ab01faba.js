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
{"lineNum":"   20","line":"const node = @import(\"../common/node.zig\");"},
{"lineNum":"   21","line":"const Node = node.Node;"},
{"lineNum":"   22","line":"const NodeType = node.NodeType;"},
{"lineNum":"   23","line":"const GenericError = @import(\"errors/generic_error.zig\").GenericError;"},
{"lineNum":"   24","line":"const CompileError = @import(\"errors/compile_error.zig\").CompileError;"},
{"lineNum":"   25","line":"const CompilerTestCase = @import(\"compiler_test_case.zig\").CompilerTestCase;"},
{"lineNum":"   26","line":"const allocate = @import(\"../common/allocate.zig\");"},
{"lineNum":"   27","line":""},
{"lineNum":"   28","line":"pub fn processAlias(cmp: *Compiler, nd: Node) void {","class":"lineCov","hits":"2","order":"4507","possible_hits":"2",},
{"lineNum":"   29","line":"    std.debug.assert(nd.getType() == NodeType.Alias);","class":"lineCov","hits":"1","order":"4508","possible_hits":"1",},
{"lineNum":"   30","line":""},
{"lineNum":"   31","line":"    const alias = nd.data.Alias;","class":"linePartCov","hits":"2","order":"4509","possible_hits":"3",},
{"lineNum":"   32","line":"    const name = alias.name;","class":"lineCov","hits":"1","order":"4510","possible_hits":"1",},
{"lineNum":"   33","line":"    const ty = cmp.findType(alias.value) orelse {","class":"lineCov","hits":"2","order":"4511","possible_hits":"2",},
{"lineNum":"   34","line":"        cmp.errors.append(CompileError.genericError(","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   35","line":"            GenericError.new(nd.csr, cmp.fmt(","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   36","line":"                \"Target type for alias \'{s}\' cannot be resolved\","},
{"lineNum":"   37","line":"                .{name},","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   38","line":"            )),"},
{"lineNum":"   39","line":"        )) catch allocate.reportAndExit();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   40","line":"        return;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   41","line":"    };"},
{"lineNum":"   42","line":""},
{"lineNum":"   43","line":"    cmp.scope.putType(name, ty);","class":"lineCov","hits":"1","order":"4520","possible_hits":"1",},
{"lineNum":"   44","line":"}"},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"test \"can compile a type alias declaration\" {","class":"lineCov","hits":"2","order":"4504","possible_hits":"2",},
{"lineNum":"   47","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4521","possible_hits":"1",},
{"lineNum":"   48","line":"        .code = \"type ATypeAlias = number | boolean;\","},
{"lineNum":"   49","line":"    }).run();","class":"lineCov","hits":"1","order":"4505","possible_hits":"1",},
{"lineNum":"   50","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-02 21:08:39", "instrumented" : 14, "covered" : 9,};
var merged_data = [];
