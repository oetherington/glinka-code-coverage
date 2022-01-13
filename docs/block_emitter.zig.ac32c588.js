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
{"lineNum":"   26","line":"pub fn emitBlock(self: *JsBackend, children: []const Node) Backend.Error!void {","class":"lineCov","hits":"2","order":"5049","possible_hits":"2",},
{"lineNum":"   27","line":"    try self.out.print(\"{{\\n\", .{});","class":"lineCov","hits":"1","order":"5050","possible_hits":"1",},
{"lineNum":"   28","line":""},
{"lineNum":"   29","line":"    for (children) |child|","class":"lineCov","hits":"2","order":"5051","possible_hits":"2",},
{"lineNum":"   30","line":"        try self.emitNode(child);","class":"lineCov","hits":"1","order":"5066","possible_hits":"1",},
{"lineNum":"   31","line":""},
{"lineNum":"   32","line":"    try self.out.print(\"}}\\n\", .{});","class":"lineCov","hits":"1","order":"5052","possible_hits":"1",},
{"lineNum":"   33","line":"}"},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"test \"JsBackend can emit empty blocks\" {","class":"lineCov","hits":"2","order":"5031","possible_hits":"2",},
{"lineNum":"   36","line":"    try (EmitTestCase{","class":"lineCov","hits":"2","order":"5038","possible_hits":"2",},
{"lineNum":"   37","line":"        .inputNode = EmitTestCase.makeNode(.Block, node.NodeList{}),","class":"lineCov","hits":"1","order":"5032","possible_hits":"1",},
{"lineNum":"   38","line":"        .expectedOutput = \"{\\n}\\n\",","class":"lineCov","hits":"1","order":"5037","possible_hits":"1",},
{"lineNum":"   39","line":"    }).run();","class":"lineCov","hits":"1","order":"5039","possible_hits":"1",},
{"lineNum":"   40","line":"}"},
{"lineNum":"   41","line":""},
{"lineNum":"   42","line":"test \"JsBackend can emit populated blocks\" {","class":"lineCov","hits":"3","order":"5059","possible_hits":"3",},
{"lineNum":"   43","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"   44","line":""},
{"lineNum":"   45","line":"    var children = node.NodeList{};","class":"lineCov","hits":"1","order":"5060","possible_hits":"1",},
{"lineNum":"   46","line":"    defer children.deinit(alloc);","class":"linePartCov","hits":"1","order":"5075","possible_hits":"3",},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"    try children.append(alloc, EmitTestCase.makeNode(.Null, {}));","class":"linePartCov","hits":"1","order":"5061","possible_hits":"2",},
{"lineNum":"   49","line":"    defer alloc.destroy(children.items[0]);","class":"linePartCov","hits":"1","order":"5074","possible_hits":"3",},
{"lineNum":"   50","line":""},
{"lineNum":"   51","line":"    try (EmitTestCase{","class":"linePartCov","hits":"2","order":"5064","possible_hits":"3",},
{"lineNum":"   52","line":"        .inputNode = EmitTestCase.makeNode(.Block, children),","class":"lineCov","hits":"1","order":"5062","possible_hits":"1",},
{"lineNum":"   53","line":"        .expectedOutput = \"{\\nnull;\\n}\\n\",","class":"lineCov","hits":"1","order":"5063","possible_hits":"1",},
{"lineNum":"   54","line":"    }).run();","class":"lineCov","hits":"1","order":"5065","possible_hits":"1",},
{"lineNum":"   55","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-13 08:50:59", "instrumented" : 19, "covered" : 19,};
var merged_data = [];
