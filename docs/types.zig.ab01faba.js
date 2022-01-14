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
{"lineNum":"   19","line":"const expectEqual = std.testing.expectEqual;"},
{"lineNum":"   20","line":"const Compiler = @import(\"compiler.zig\").Compiler;"},
{"lineNum":"   21","line":"const node = @import(\"../common/node.zig\");"},
{"lineNum":"   22","line":"const Node = node.Node;"},
{"lineNum":"   23","line":"const NodeType = node.NodeType;"},
{"lineNum":"   24","line":"const Type = @import(\"../common/types/type.zig\").Type;"},
{"lineNum":"   25","line":"const GenericError = @import(\"errors/generic_error.zig\").GenericError;"},
{"lineNum":"   26","line":"const CompileError = @import(\"errors/compile_error.zig\").CompileError;"},
{"lineNum":"   27","line":"const CompilerTestCase = @import(\"compiler_test_case.zig\").CompilerTestCase;"},
{"lineNum":"   28","line":"const allocate = @import(\"../common/allocate.zig\");"},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"pub fn processAlias(cmp: *Compiler, nd: Node) void {","class":"lineCov","hits":"2","order":"4908","possible_hits":"2",},
{"lineNum":"   31","line":"    std.debug.assert(nd.getType() == NodeType.Alias);","class":"lineCov","hits":"1","order":"4909","possible_hits":"1",},
{"lineNum":"   32","line":""},
{"lineNum":"   33","line":"    const alias = nd.data.Alias;","class":"linePartCov","hits":"2","order":"4910","possible_hits":"3",},
{"lineNum":"   34","line":"    const name = alias.name;","class":"lineCov","hits":"1","order":"4911","possible_hits":"1",},
{"lineNum":"   35","line":"    const ty = cmp.findType(alias.value) orelse {","class":"lineCov","hits":"2","order":"4912","possible_hits":"2",},
{"lineNum":"   36","line":"        cmp.errors.append(CompileError.genericError(","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   37","line":"            GenericError.new(nd.csr, cmp.fmt(","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   38","line":"                \"Target type for alias \'{s}\' cannot be resolved\","},
{"lineNum":"   39","line":"                .{name},","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   40","line":"            )),"},
{"lineNum":"   41","line":"        )) catch allocate.reportAndExit();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   42","line":"        return;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   43","line":"    };"},
{"lineNum":"   44","line":""},
{"lineNum":"   45","line":"    cmp.scope.putType(name, cmp.typebook.getAlias(name, ty));","class":"lineCov","hits":"1","order":"4921","possible_hits":"1",},
{"lineNum":"   46","line":"}"},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"test \"can compile a type alias declaration\" {","class":"lineCov","hits":"2","order":"4905","possible_hits":"2",},
{"lineNum":"   49","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4930","possible_hits":"1",},
{"lineNum":"   50","line":"        .code = \"type ATypeAlias = number | boolean;\","},
{"lineNum":"   51","line":"    }).run();","class":"lineCov","hits":"1","order":"4906","possible_hits":"1",},
{"lineNum":"   52","line":"}"},
{"lineNum":"   53","line":""},
{"lineNum":"   54","line":"pub fn processInterface(cmp: *Compiler, nd: Node) void {","class":"lineCov","hits":"2","order":"4934","possible_hits":"2",},
{"lineNum":"   55","line":"    std.debug.assert(nd.getType() == NodeType.InterfaceType);","class":"lineCov","hits":"1","order":"4935","possible_hits":"1",},
{"lineNum":"   56","line":""},
{"lineNum":"   57","line":"    const in = nd.data.InterfaceType;","class":"linePartCov","hits":"2","order":"4936","possible_hits":"3",},
{"lineNum":"   58","line":""},
{"lineNum":"   59","line":"    const name = if (in.name) |nm|","class":"lineCov","hits":"2","order":"4937","possible_hits":"2",},
{"lineNum":"   60","line":"        nm","class":"lineCov","hits":"1","order":"4938","possible_hits":"1",},
{"lineNum":"   61","line":"    else"},
{"lineNum":"   62","line":"        std.debug.panic(\"Invalid InterfaceType node (has no name)\", .{});","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   63","line":""},
{"lineNum":"   64","line":"    const ty = cmp.findType(nd) orelse {","class":"lineCov","hits":"2","order":"4939","possible_hits":"2",},
{"lineNum":"   65","line":"        cmp.errors.append(CompileError.genericError(","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   66","line":"            GenericError.new(nd.csr, cmp.fmt(","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   67","line":"                \"Interface type {s} is invalid\","},
{"lineNum":"   68","line":"                .{name},","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   69","line":"            )),"},
{"lineNum":"   70","line":"        )) catch allocate.reportAndExit();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   71","line":"        return;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   72","line":"    };"},
{"lineNum":"   73","line":""},
{"lineNum":"   74","line":"    std.debug.assert(ty.getType() == .Interface);","class":"lineCov","hits":"1","order":"4951","possible_hits":"1",},
{"lineNum":"   75","line":""},
{"lineNum":"   76","line":"    cmp.scope.putType(name, ty);","class":"lineCov","hits":"1","order":"4952","possible_hits":"1",},
{"lineNum":"   77","line":"}"},
{"lineNum":"   78","line":""},
{"lineNum":"   79","line":"test \"can compile a type alias declaration\" {","class":"lineCov","hits":"2","order":"4931","possible_hits":"2",},
{"lineNum":"   80","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"4953","possible_hits":"1",},
{"lineNum":"   81","line":"        .code = \"interface Inter { aString: string; aUnion: number | null; }\","},
{"lineNum":"   82","line":"    }).run();","class":"lineCov","hits":"1","order":"4932","possible_hits":"1",},
{"lineNum":"   83","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-14 18:58:45", "instrumented" : 31, "covered" : 20,};
var merged_data = [];
