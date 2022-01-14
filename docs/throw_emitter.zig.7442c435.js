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
{"lineNum":"   26","line":"pub fn emitThrow(self: *JsBackend, expr: Node) Backend.Error!void {","class":"lineCov","hits":"2","order":"5393","possible_hits":"2",},
{"lineNum":"   27","line":"    try self.out.print(\"throw \", .{});","class":"lineCov","hits":"1","order":"5394","possible_hits":"1",},
{"lineNum":"   28","line":"    try self.emitExpr(expr);","class":"lineCov","hits":"1","order":"5395","possible_hits":"1",},
{"lineNum":"   29","line":"    try self.out.print(\";\\n\", .{});","class":"lineCov","hits":"1","order":"5396","possible_hits":"1",},
{"lineNum":"   30","line":"}"},
{"lineNum":"   31","line":""},
{"lineNum":"   32","line":"test \"JsBackend can emit throw statements\" {","class":"lineCov","hits":"3","order":"5386","possible_hits":"3",},
{"lineNum":"   33","line":"    const expr = EmitTestCase.makeNode(.True, {});","class":"lineCov","hits":"1","order":"5387","possible_hits":"1",},
{"lineNum":"   34","line":"    defer std.testing.allocator.destroy(expr);","class":"linePartCov","hits":"1","order":"5397","possible_hits":"2",},
{"lineNum":"   35","line":""},
{"lineNum":"   36","line":"    try (EmitTestCase{","class":"linePartCov","hits":"2","order":"5390","possible_hits":"3",},
{"lineNum":"   37","line":"        .inputNode = EmitTestCase.makeNode(.Throw, expr),","class":"lineCov","hits":"1","order":"5388","possible_hits":"1",},
{"lineNum":"   38","line":"        .expectedOutput = \"throw true;\\n\",","class":"lineCov","hits":"1","order":"5389","possible_hits":"1",},
{"lineNum":"   39","line":"    }).run();","class":"lineCov","hits":"1","order":"5391","possible_hits":"1",},
{"lineNum":"   40","line":"}"},
{"lineNum":"   41","line":""},
{"lineNum":"   42","line":"pub fn emitTry(self: *JsBackend, data: node.Try) Backend.Error!void {","class":"lineCov","hits":"2","order":"5416","possible_hits":"2",},
{"lineNum":"   43","line":"    try self.out.print(\"try \", .{});","class":"lineCov","hits":"1","order":"5417","possible_hits":"1",},
{"lineNum":"   44","line":"    try self.emitNode(data.tryBlock);","class":"lineCov","hits":"1","order":"5418","possible_hits":"1",},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"    for (data.catchBlocks.items) |catchBlock| {","class":"lineCov","hits":"2","order":"5419","possible_hits":"2",},
{"lineNum":"   47","line":"        try self.out.print(\"catch ({s}) \", .{catchBlock.name});","class":"lineCov","hits":"1","order":"5420","possible_hits":"1",},
{"lineNum":"   48","line":"        try self.emitNode(catchBlock.block);","class":"lineCov","hits":"1","order":"5421","possible_hits":"1",},
{"lineNum":"   49","line":"    }"},
{"lineNum":"   50","line":""},
{"lineNum":"   51","line":"    if (data.finallyBlock) |finallyBlock| {","class":"lineCov","hits":"2","order":"5422","possible_hits":"2",},
{"lineNum":"   52","line":"        try self.out.print(\"finally \", .{});","class":"lineCov","hits":"1","order":"5423","possible_hits":"1",},
{"lineNum":"   53","line":"        try self.emitNode(finallyBlock);","class":"lineCov","hits":"1","order":"5424","possible_hits":"1",},
{"lineNum":"   54","line":"    }"},
{"lineNum":"   55","line":"}"},
{"lineNum":"   56","line":""},
{"lineNum":"   57","line":"test \"JsBackend can emit try statements\" {","class":"lineCov","hits":"3","order":"5398","possible_hits":"3",},
{"lineNum":"   58","line":"    const expr1 = EmitTestCase.makeNode(.True, {});","class":"lineCov","hits":"1","order":"5399","possible_hits":"1",},
{"lineNum":"   59","line":"    const expr2 = EmitTestCase.makeNode(.False, {});","class":"lineCov","hits":"1","order":"5400","possible_hits":"1",},
{"lineNum":"   60","line":"    const expr3 = EmitTestCase.makeNode(.Null, {});","class":"lineCov","hits":"1","order":"5401","possible_hits":"1",},
{"lineNum":"   61","line":"    const expr4 = EmitTestCase.makeNode(.Undefined, {});","class":"lineCov","hits":"1","order":"5402","possible_hits":"1",},
{"lineNum":"   62","line":"    defer std.testing.allocator.destroy(expr1);","class":"linePartCov","hits":"1","order":"5428","possible_hits":"2",},
{"lineNum":"   63","line":"    defer std.testing.allocator.destroy(expr2);","class":"linePartCov","hits":"1","order":"5427","possible_hits":"2",},
{"lineNum":"   64","line":"    defer std.testing.allocator.destroy(expr3);","class":"linePartCov","hits":"1","order":"5426","possible_hits":"2",},
{"lineNum":"   65","line":"    defer std.testing.allocator.destroy(expr4);","class":"linePartCov","hits":"1","order":"5425","possible_hits":"2",},
{"lineNum":"   66","line":""},
{"lineNum":"   67","line":"    var data = node.Try{"},
{"lineNum":"   68","line":"        .tryBlock = expr1,","class":"lineCov","hits":"1","order":"5403","possible_hits":"1",},
{"lineNum":"   69","line":"        .catchBlocks = .{","class":"lineCov","hits":"1","order":"5409","possible_hits":"1",},
{"lineNum":"   70","line":"            .items = &[_]node.Try.Catch{","class":"lineCov","hits":"1","order":"5408","possible_hits":"1",},
{"lineNum":"   71","line":"                .{"},
{"lineNum":"   72","line":"                    .name = \"e\",","class":"lineCov","hits":"1","order":"5405","possible_hits":"1",},
{"lineNum":"   73","line":"                    .block = expr2,","class":"lineCov","hits":"1","order":"5404","possible_hits":"1",},
{"lineNum":"   74","line":"                },"},
{"lineNum":"   75","line":"                .{"},
{"lineNum":"   76","line":"                    .name = \"f\",","class":"lineCov","hits":"1","order":"5407","possible_hits":"1",},
{"lineNum":"   77","line":"                    .block = expr3,","class":"lineCov","hits":"1","order":"5406","possible_hits":"1",},
{"lineNum":"   78","line":"                },"},
{"lineNum":"   79","line":"            },"},
{"lineNum":"   80","line":"        },"},
{"lineNum":"   81","line":"        .finallyBlock = expr4,","class":"lineCov","hits":"1","order":"5410","possible_hits":"1",},
{"lineNum":"   82","line":"    };"},
{"lineNum":"   83","line":""},
{"lineNum":"   84","line":"    try (EmitTestCase{","class":"linePartCov","hits":"2","order":"5413","possible_hits":"3",},
{"lineNum":"   85","line":"        .inputNode = EmitTestCase.makeNode(.Try, data),","class":"lineCov","hits":"1","order":"5411","possible_hits":"1",},
{"lineNum":"   86","line":"        .expectedOutput =","class":"lineCov","hits":"1","order":"5412","possible_hits":"1",},
{"lineNum":"   87","line":"        \\\\try true;"},
{"lineNum":"   88","line":"        \\\\catch (e) false;"},
{"lineNum":"   89","line":"        \\\\catch (f) null;"},
{"lineNum":"   90","line":"        \\\\finally undefined;"},
{"lineNum":"   91","line":"        \\\\"},
{"lineNum":"   92","line":"        ,"},
{"lineNum":"   93","line":"    }).run();","class":"lineCov","hits":"1","order":"5414","possible_hits":"1",},
{"lineNum":"   94","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-14 09:28:45", "instrumented" : 41, "covered" : 41,};
var merged_data = [];
