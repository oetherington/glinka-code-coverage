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
{"lineNum":"   19","line":"const node = @import(\"../../common/node.zig\");"},
{"lineNum":"   20","line":"const Node = node.Node;"},
{"lineNum":"   21","line":"const Cursor = @import(\"../../common/cursor.zig\").Cursor;"},
{"lineNum":"   22","line":"const Backend = @import(\"../../common/backend.zig\").Backend;"},
{"lineNum":"   23","line":"const JsBackend = @import(\"js_backend.zig\").JsBackend;"},
{"lineNum":"   24","line":"const EmitTestCase = @import(\"emit_test_case.zig\").EmitTestCase;"},
{"lineNum":"   25","line":""},
{"lineNum":"   26","line":"pub fn emitClass(self: *JsBackend, class: node.ClassType) Backend.Error!void {","class":"lineCov","hits":"2","order":"5578","possible_hits":"2",},
{"lineNum":"   27","line":"    try self.out.print(\"class {s} \", .{class.name});","class":"lineCov","hits":"1","order":"5579","possible_hits":"1",},
{"lineNum":"   28","line":""},
{"lineNum":"   29","line":"    if (class.extends) |extends|","class":"lineCov","hits":"2","order":"5580","possible_hits":"2",},
{"lineNum":"   30","line":"        try self.out.print(\"extends {s} \", .{extends});","class":"lineCov","hits":"1","order":"5581","possible_hits":"1",},
{"lineNum":"   31","line":""},
{"lineNum":"   32","line":"    try self.out.print(\"{{\\n\", .{});","class":"lineCov","hits":"1","order":"5582","possible_hits":"1",},
{"lineNum":"   33","line":"    try self.out.print(\"}}\\n\", .{});","class":"lineCov","hits":"1","order":"5583","possible_hits":"1",},
{"lineNum":"   34","line":"}"},
{"lineNum":"   35","line":""},
{"lineNum":"   36","line":"test \"JsBackend can emit class\" {","class":"lineCov","hits":"2","order":"5571","possible_hits":"2",},
{"lineNum":"   37","line":"    var class = node.ClassType.new(\"MyClass\", \"SomeOtherClass\");","class":"lineCov","hits":"1","order":"5572","possible_hits":"1",},
{"lineNum":"   38","line":""},
{"lineNum":"   39","line":"    try (EmitTestCase{","class":"lineCov","hits":"2","order":"5575","possible_hits":"2",},
{"lineNum":"   40","line":"        .inputNode = EmitTestCase.makeNode(.ClassType, class),","class":"lineCov","hits":"1","order":"5573","possible_hits":"1",},
{"lineNum":"   41","line":"        .expectedOutput = \"class MyClass extends SomeOtherClass {\\n}\\n\",","class":"lineCov","hits":"1","order":"5574","possible_hits":"1",},
{"lineNum":"   42","line":"    }).run();","class":"lineCov","hits":"1","order":"5576","possible_hits":"1",},
{"lineNum":"   43","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-15 21:43:22", "instrumented" : 12, "covered" : 12,};
var merged_data = [];