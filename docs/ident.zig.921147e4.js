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
{"lineNum":"   18","line":"const Cursor = @import(\"../../common/cursor.zig\").Cursor;"},
{"lineNum":"   19","line":"const Compiler = @import(\"../compiler.zig\").Compiler;"},
{"lineNum":"   20","line":"const Scope = @import(\"../scope.zig\").Scope;"},
{"lineNum":"   21","line":"const TypeBook = @import(\"../typebook.zig\").TypeBook;"},
{"lineNum":"   22","line":"const node = @import(\"../../common/node.zig\");"},
{"lineNum":"   23","line":"const InferResult = @import(\"infer_result.zig\").InferResult;"},
{"lineNum":"   24","line":"const InferTestCase = @import(\"infer_test_case.zig\").InferTestCase;"},
{"lineNum":"   25","line":""},
{"lineNum":"   26","line":"pub fn inferIdentType(","class":"lineCov","hits":"1","order":"4939","possible_hits":"1",},
{"lineNum":"   27","line":"    cmp: *Compiler,"},
{"lineNum":"   28","line":"    nd: node.Node,"},
{"lineNum":"   29","line":"    ident: []const u8,"},
{"lineNum":"   30","line":") InferResult {"},
{"lineNum":"   31","line":"    nd.ty = if (cmp.scope.get(ident)) |sym|","class":"lineCov","hits":"2","order":"4940","possible_hits":"2",},
{"lineNum":"   32","line":"        sym.ty","class":"lineCov","hits":"1","order":"4941","possible_hits":"1",},
{"lineNum":"   33","line":"    else"},
{"lineNum":"   34","line":"        cmp.typebook.getUndefined();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   35","line":""},
{"lineNum":"   36","line":"    return InferResult.success(nd.ty.?);","class":"lineCov","hits":"1","order":"4942","possible_hits":"1",},
{"lineNum":"   37","line":"}"},
{"lineNum":"   38","line":""},
{"lineNum":"   39","line":"test \"can infer type of an identifier\" {","class":"lineCov","hits":"2","order":"6675","possible_hits":"2",},
{"lineNum":"   40","line":"    try (InferTestCase{","class":"lineCov","hits":"1","order":"6683","possible_hits":"1",},
{"lineNum":"   41","line":"        .expectedTy = .String,"},
{"lineNum":"   42","line":"        .setup = (struct {"},
{"lineNum":"   43","line":"            fn setup(","class":"lineCov","hits":"1","order":"6678","possible_hits":"1",},
{"lineNum":"   44","line":"                scope: *Scope,"},
{"lineNum":"   45","line":"                typebook: *TypeBook,"},
{"lineNum":"   46","line":"            ) anyerror!void {","class":"lineCov","hits":"1","order":"6682","possible_hits":"1",},
{"lineNum":"   47","line":"                scope.put(","class":"lineCov","hits":"2","order":"6679","possible_hits":"2",},
{"lineNum":"   48","line":"                    \"aVariable\","},
{"lineNum":"   49","line":"                    typebook.getString(),","class":"lineCov","hits":"1","order":"6680","possible_hits":"1",},
{"lineNum":"   50","line":"                    false,"},
{"lineNum":"   51","line":"                    Cursor.new(0, 0),","class":"lineCov","hits":"1","order":"6681","possible_hits":"1",},
{"lineNum":"   52","line":"                );"},
{"lineNum":"   53","line":"            }"},
{"lineNum":"   54","line":"        }).setup,"},
{"lineNum":"   55","line":"    }).run(.Ident, \"aVariable\");","class":"lineCov","hits":"1","order":"6676","possible_hits":"1",},
{"lineNum":"   56","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-04 07:59:51", "instrumented" : 13, "covered" : 12,};
var merged_data = [];
