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
{"lineNum":"   26","line":"pub fn emitFor(self: *JsBackend, loop: node.For) Backend.Error!void {","class":"lineCov","hits":"2","order":"5741","possible_hits":"2",},
{"lineNum":"   27","line":"    try self.out.print(\"for (\", .{});","class":"lineCov","hits":"1","order":"5742","possible_hits":"1",},
{"lineNum":"   28","line":""},
{"lineNum":"   29","line":"    switch (loop.clause) {","class":"linePartCov","hits":"1","order":"5743","possible_hits":"2",},
{"lineNum":"   30","line":"        .CStyle => |c| {","class":"lineCov","hits":"1","order":"5744","possible_hits":"1",},
{"lineNum":"   31","line":"            try self.emitNode(c.pre);","class":"lineCov","hits":"1","order":"5745","possible_hits":"1",},
{"lineNum":"   32","line":"            try self.emitExpr(c.cond);","class":"lineCov","hits":"1","order":"5746","possible_hits":"1",},
{"lineNum":"   33","line":"            try self.out.print(\";\\n\", .{});","class":"lineCov","hits":"1","order":"5747","possible_hits":"1",},
{"lineNum":"   34","line":"            try self.emitExpr(c.post);","class":"lineCov","hits":"1","order":"5748","possible_hits":"1",},
{"lineNum":"   35","line":"        },"},
{"lineNum":"   36","line":"        .Each => |each| {","class":"lineCov","hits":"1","order":"5768","possible_hits":"1",},
{"lineNum":"   37","line":"            try self.out.print(\"{s} {s} {s} \", .{","class":"lineCov","hits":"2","order":"5769","possible_hits":"2",},
{"lineNum":"   38","line":"                each.scoping.toString(),","class":"lineCov","hits":"1","order":"5770","possible_hits":"1",},
{"lineNum":"   39","line":"                each.name,","class":"lineCov","hits":"1","order":"5771","possible_hits":"1",},
{"lineNum":"   40","line":"                each.variant.toString(),","class":"lineCov","hits":"1","order":"5772","possible_hits":"1",},
{"lineNum":"   41","line":"            });"},
{"lineNum":"   42","line":"            try self.emitExpr(each.expr);","class":"lineCov","hits":"1","order":"5773","possible_hits":"1",},
{"lineNum":"   43","line":"        },"},
{"lineNum":"   44","line":"    }"},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"    try self.out.print(\") \", .{});","class":"lineCov","hits":"1","order":"5749","possible_hits":"1",},
{"lineNum":"   47","line":"    try self.emitNode(loop.body);","class":"lineCov","hits":"1","order":"5750","possible_hits":"1",},
{"lineNum":"   48","line":"}"},
{"lineNum":"   49","line":""},
{"lineNum":"   50","line":"test \"JsBackend can emit c-style for loop\" {","class":"lineCov","hits":"3","order":"5726","possible_hits":"3",},
{"lineNum":"   51","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"   52","line":""},
{"lineNum":"   53","line":"    const pre = EmitTestCase.makeNode(.True, {});","class":"lineCov","hits":"1","order":"5727","possible_hits":"1",},
{"lineNum":"   54","line":"    const cond = EmitTestCase.makeNode(.False, {});","class":"lineCov","hits":"1","order":"5728","possible_hits":"1",},
{"lineNum":"   55","line":"    const post = EmitTestCase.makeNode(.Undefined, {});","class":"lineCov","hits":"1","order":"5729","possible_hits":"1",},
{"lineNum":"   56","line":"    const body = EmitTestCase.makeNode(.Null, {});","class":"lineCov","hits":"1","order":"5730","possible_hits":"1",},
{"lineNum":"   57","line":"    defer alloc.destroy(pre);","class":"linePartCov","hits":"1","order":"5754","possible_hits":"2",},
{"lineNum":"   58","line":"    defer alloc.destroy(cond);","class":"linePartCov","hits":"1","order":"5753","possible_hits":"2",},
{"lineNum":"   59","line":"    defer alloc.destroy(post);","class":"linePartCov","hits":"1","order":"5752","possible_hits":"2",},
{"lineNum":"   60","line":"    defer alloc.destroy(body);","class":"linePartCov","hits":"1","order":"5751","possible_hits":"2",},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"    try (EmitTestCase{","class":"linePartCov","hits":"2","order":"5738","possible_hits":"3",},
{"lineNum":"   63","line":"        .inputNode = EmitTestCase.makeNode(.For, node.For{","class":"lineCov","hits":"1","order":"5736","possible_hits":"1",},
{"lineNum":"   64","line":"            .clause = .{"},
{"lineNum":"   65","line":"                .CStyle = .{","class":"lineCov","hits":"1","order":"5731","possible_hits":"1",},
{"lineNum":"   66","line":"                    .pre = pre,","class":"lineCov","hits":"1","order":"5732","possible_hits":"1",},
{"lineNum":"   67","line":"                    .cond = cond,","class":"lineCov","hits":"1","order":"5733","possible_hits":"1",},
{"lineNum":"   68","line":"                    .post = post,","class":"lineCov","hits":"1","order":"5734","possible_hits":"1",},
{"lineNum":"   69","line":"                },"},
{"lineNum":"   70","line":"            },"},
{"lineNum":"   71","line":"            .body = body,","class":"lineCov","hits":"1","order":"5735","possible_hits":"1",},
{"lineNum":"   72","line":"        }),"},
{"lineNum":"   73","line":"        .expectedOutput = \"for (true;\\nfalse;\\nundefined) null;\\n\",","class":"lineCov","hits":"1","order":"5737","possible_hits":"1",},
{"lineNum":"   74","line":"    }).run();","class":"lineCov","hits":"1","order":"5739","possible_hits":"1",},
{"lineNum":"   75","line":"}"},
{"lineNum":"   76","line":""},
{"lineNum":"   77","line":"test \"JsBackend can emit for each loop\" {","class":"lineCov","hits":"3","order":"5755","possible_hits":"3",},
{"lineNum":"   78","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"   79","line":""},
{"lineNum":"   80","line":"    const expr = EmitTestCase.makeNode(.True, {});","class":"lineCov","hits":"1","order":"5756","possible_hits":"1",},
{"lineNum":"   81","line":"    const body = EmitTestCase.makeNode(.Null, {});","class":"lineCov","hits":"1","order":"5757","possible_hits":"1",},
{"lineNum":"   82","line":"    defer alloc.destroy(expr);","class":"linePartCov","hits":"1","order":"5775","possible_hits":"2",},
{"lineNum":"   83","line":"    defer alloc.destroy(body);","class":"linePartCov","hits":"1","order":"5774","possible_hits":"2",},
{"lineNum":"   84","line":""},
{"lineNum":"   85","line":"    try (EmitTestCase{","class":"linePartCov","hits":"2","order":"5766","possible_hits":"3",},
{"lineNum":"   86","line":"        .inputNode = EmitTestCase.makeNode(.For, node.For{","class":"lineCov","hits":"1","order":"5764","possible_hits":"1",},
{"lineNum":"   87","line":"            .clause = .{"},
{"lineNum":"   88","line":"                .Each = .{","class":"lineCov","hits":"1","order":"5758","possible_hits":"1",},
{"lineNum":"   89","line":"                    .scoping = .Let,","class":"lineCov","hits":"1","order":"5760","possible_hits":"1",},
{"lineNum":"   90","line":"                    .variant = .Of,","class":"lineCov","hits":"1","order":"5761","possible_hits":"1",},
{"lineNum":"   91","line":"                    .name = \"a\",","class":"lineCov","hits":"1","order":"5762","possible_hits":"1",},
{"lineNum":"   92","line":"                    .expr = expr,","class":"lineCov","hits":"1","order":"5759","possible_hits":"1",},
{"lineNum":"   93","line":"                },"},
{"lineNum":"   94","line":"            },"},
{"lineNum":"   95","line":"            .body = body,","class":"lineCov","hits":"1","order":"5763","possible_hits":"1",},
{"lineNum":"   96","line":"        }),"},
{"lineNum":"   97","line":"        .expectedOutput = \"for (let a of true) null;\\n\",","class":"lineCov","hits":"1","order":"5765","possible_hits":"1",},
{"lineNum":"   98","line":"    }).run();","class":"lineCov","hits":"1","order":"5767","possible_hits":"1",},
{"lineNum":"   99","line":"}"},
{"lineNum":"  100","line":""},
{"lineNum":"  101","line":"pub fn emitWhile(self: *JsBackend, loop: node.While) Backend.Error!void {","class":"lineCov","hits":"2","order":"5786","possible_hits":"2",},
{"lineNum":"  102","line":"    try self.out.print(\"while (\", .{});","class":"lineCov","hits":"1","order":"5787","possible_hits":"1",},
{"lineNum":"  103","line":"    try self.emitExpr(loop.cond);","class":"lineCov","hits":"1","order":"5788","possible_hits":"1",},
{"lineNum":"  104","line":"    try self.out.print(\") \", .{});","class":"lineCov","hits":"1","order":"5789","possible_hits":"1",},
{"lineNum":"  105","line":"    try self.emitNode(loop.body);","class":"lineCov","hits":"1","order":"5790","possible_hits":"1",},
{"lineNum":"  106","line":"}"},
{"lineNum":"  107","line":""},
{"lineNum":"  108","line":"test \"JsBackend can emit \'while\' statement\" {","class":"lineCov","hits":"3","order":"5776","possible_hits":"3",},
{"lineNum":"  109","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"  110","line":""},
{"lineNum":"  111","line":"    const cond = EmitTestCase.makeNode(.True, {});","class":"lineCov","hits":"1","order":"5777","possible_hits":"1",},
{"lineNum":"  112","line":"    const body = EmitTestCase.makeNode(.Null, {});","class":"lineCov","hits":"1","order":"5778","possible_hits":"1",},
{"lineNum":"  113","line":"    defer alloc.destroy(cond);","class":"linePartCov","hits":"1","order":"5792","possible_hits":"2",},
{"lineNum":"  114","line":"    defer alloc.destroy(body);","class":"linePartCov","hits":"1","order":"5791","possible_hits":"2",},
{"lineNum":"  115","line":""},
{"lineNum":"  116","line":"    try (EmitTestCase{","class":"linePartCov","hits":"2","order":"5783","possible_hits":"3",},
{"lineNum":"  117","line":"        .inputNode = EmitTestCase.makeNode(.While, node.While{","class":"lineCov","hits":"1","order":"5781","possible_hits":"1",},
{"lineNum":"  118","line":"            .cond = cond,","class":"lineCov","hits":"1","order":"5779","possible_hits":"1",},
{"lineNum":"  119","line":"            .body = body,","class":"lineCov","hits":"1","order":"5780","possible_hits":"1",},
{"lineNum":"  120","line":"        }),"},
{"lineNum":"  121","line":"        .expectedOutput = \"while (true) null;\\n\",","class":"lineCov","hits":"1","order":"5782","possible_hits":"1",},
{"lineNum":"  122","line":"    }).run();","class":"lineCov","hits":"1","order":"5784","possible_hits":"1",},
{"lineNum":"  123","line":"}"},
{"lineNum":"  124","line":""},
{"lineNum":"  125","line":"pub fn emitDo(self: *JsBackend, loop: node.Do) Backend.Error!void {","class":"lineCov","hits":"2","order":"5803","possible_hits":"2",},
{"lineNum":"  126","line":"    try self.out.print(\"do \", .{});","class":"lineCov","hits":"1","order":"5804","possible_hits":"1",},
{"lineNum":"  127","line":"    try self.emitNode(loop.body);","class":"lineCov","hits":"1","order":"5805","possible_hits":"1",},
{"lineNum":"  128","line":"    try self.out.print(\"while (\", .{});","class":"lineCov","hits":"1","order":"5806","possible_hits":"1",},
{"lineNum":"  129","line":"    try self.emitExpr(loop.cond);","class":"lineCov","hits":"1","order":"5807","possible_hits":"1",},
{"lineNum":"  130","line":"    try self.out.print(\");\\n\", .{});","class":"lineCov","hits":"1","order":"5808","possible_hits":"1",},
{"lineNum":"  131","line":"}"},
{"lineNum":"  132","line":""},
{"lineNum":"  133","line":"test \"JsBackend can emit \'do\' statement\" {","class":"lineCov","hits":"3","order":"5793","possible_hits":"3",},
{"lineNum":"  134","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"  135","line":""},
{"lineNum":"  136","line":"    const body = EmitTestCase.makeNode(.Null, {});","class":"lineCov","hits":"1","order":"5794","possible_hits":"1",},
{"lineNum":"  137","line":"    const cond = EmitTestCase.makeNode(.True, {});","class":"lineCov","hits":"1","order":"5795","possible_hits":"1",},
{"lineNum":"  138","line":"    defer alloc.destroy(body);","class":"linePartCov","hits":"1","order":"5810","possible_hits":"2",},
{"lineNum":"  139","line":"    defer alloc.destroy(cond);","class":"linePartCov","hits":"1","order":"5809","possible_hits":"2",},
{"lineNum":"  140","line":""},
{"lineNum":"  141","line":"    try (EmitTestCase{","class":"linePartCov","hits":"2","order":"5800","possible_hits":"3",},
{"lineNum":"  142","line":"        .inputNode = EmitTestCase.makeNode(.Do, node.Do{","class":"lineCov","hits":"1","order":"5798","possible_hits":"1",},
{"lineNum":"  143","line":"            .body = body,","class":"lineCov","hits":"1","order":"5796","possible_hits":"1",},
{"lineNum":"  144","line":"            .cond = cond,","class":"lineCov","hits":"1","order":"5797","possible_hits":"1",},
{"lineNum":"  145","line":"        }),"},
{"lineNum":"  146","line":"        .expectedOutput = \"do null;\\nwhile (true);\\n\",","class":"lineCov","hits":"1","order":"5799","possible_hits":"1",},
{"lineNum":"  147","line":"    }).run();","class":"lineCov","hits":"1","order":"5801","possible_hits":"1",},
{"lineNum":"  148","line":"}"},
{"lineNum":"  149","line":""},
{"lineNum":"  150","line":"pub fn emitBreak(self: *JsBackend, label: ?[]const u8) Backend.Error!void {","class":"lineCov","hits":"2","order":"5711","possible_hits":"2",},
{"lineNum":"  151","line":"    try if (label) |l|","class":"lineCov","hits":"3","order":"5712","possible_hits":"3",},
{"lineNum":"  152","line":"        self.out.print(\"break {s};\\n\", .{l})","class":"lineCov","hits":"1","order":"5821","possible_hits":"1",},
{"lineNum":"  153","line":"    else"},
{"lineNum":"  154","line":"        self.out.print(\"break;\\n\", .{});","class":"lineCov","hits":"1","order":"5713","possible_hits":"1",},
{"lineNum":"  155","line":"}"},
{"lineNum":"  156","line":""},
{"lineNum":"  157","line":"test \"JsBackend can emit \'break\' statement\" {","class":"lineCov","hits":"2","order":"5811","possible_hits":"2",},
{"lineNum":"  158","line":"    try (EmitTestCase{","class":"lineCov","hits":"2","order":"5814","possible_hits":"2",},
{"lineNum":"  159","line":"        .inputNode = EmitTestCase.makeNode(.Break, null),","class":"lineCov","hits":"1","order":"5812","possible_hits":"1",},
{"lineNum":"  160","line":"        .expectedOutput = \"break;\\n\",","class":"lineCov","hits":"1","order":"5813","possible_hits":"1",},
{"lineNum":"  161","line":"    }).run();","class":"lineCov","hits":"1","order":"5815","possible_hits":"1",},
{"lineNum":"  162","line":"}"},
{"lineNum":"  163","line":""},
{"lineNum":"  164","line":"test \"JsBackend can emit \'break\' statement with a label\" {","class":"lineCov","hits":"2","order":"5816","possible_hits":"2",},
{"lineNum":"  165","line":"    try (EmitTestCase{","class":"lineCov","hits":"2","order":"5819","possible_hits":"2",},
{"lineNum":"  166","line":"        .inputNode = EmitTestCase.makeNode(.Break, \"aLabel\"),","class":"lineCov","hits":"1","order":"5817","possible_hits":"1",},
{"lineNum":"  167","line":"        .expectedOutput = \"break aLabel;\\n\",","class":"lineCov","hits":"1","order":"5818","possible_hits":"1",},
{"lineNum":"  168","line":"    }).run();","class":"lineCov","hits":"1","order":"5820","possible_hits":"1",},
{"lineNum":"  169","line":"}"},
{"lineNum":"  170","line":""},
{"lineNum":"  171","line":"pub fn emitContinue(self: *JsBackend, label: ?[]const u8) Backend.Error!void {","class":"lineCov","hits":"2","order":"5828","possible_hits":"2",},
{"lineNum":"  172","line":"    try if (label) |l|","class":"lineCov","hits":"3","order":"5829","possible_hits":"3",},
{"lineNum":"  173","line":"        self.out.print(\"continue {s};\\n\", .{l})","class":"lineCov","hits":"1","order":"5836","possible_hits":"1",},
{"lineNum":"  174","line":"    else"},
{"lineNum":"  175","line":"        self.out.print(\"continue;\\n\", .{});","class":"lineCov","hits":"1","order":"5830","possible_hits":"1",},
{"lineNum":"  176","line":"}"},
{"lineNum":"  177","line":""},
{"lineNum":"  178","line":"test \"JsBackend can emit \'continue\' statement\" {","class":"lineCov","hits":"2","order":"5822","possible_hits":"2",},
{"lineNum":"  179","line":"    try (EmitTestCase{","class":"lineCov","hits":"2","order":"5825","possible_hits":"2",},
{"lineNum":"  180","line":"        .inputNode = EmitTestCase.makeNode(.Continue, null),","class":"lineCov","hits":"1","order":"5823","possible_hits":"1",},
{"lineNum":"  181","line":"        .expectedOutput = \"continue;\\n\",","class":"lineCov","hits":"1","order":"5824","possible_hits":"1",},
{"lineNum":"  182","line":"    }).run();","class":"lineCov","hits":"1","order":"5826","possible_hits":"1",},
{"lineNum":"  183","line":"}"},
{"lineNum":"  184","line":""},
{"lineNum":"  185","line":"test \"JsBackend can emit \'continue\' statement with a label\" {","class":"lineCov","hits":"2","order":"5831","possible_hits":"2",},
{"lineNum":"  186","line":"    try (EmitTestCase{","class":"lineCov","hits":"2","order":"5834","possible_hits":"2",},
{"lineNum":"  187","line":"        .inputNode = EmitTestCase.makeNode(.Continue, \"aLabel\"),","class":"lineCov","hits":"1","order":"5832","possible_hits":"1",},
{"lineNum":"  188","line":"        .expectedOutput = \"continue aLabel;\\n\",","class":"lineCov","hits":"1","order":"5833","possible_hits":"1",},
{"lineNum":"  189","line":"    }).run();","class":"lineCov","hits":"1","order":"5835","possible_hits":"1",},
{"lineNum":"  190","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-03 20:31:51", "instrumented" : 110, "covered" : 110,};
var merged_data = [];
