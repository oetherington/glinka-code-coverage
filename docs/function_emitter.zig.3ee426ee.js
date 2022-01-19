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
{"lineNum":"   26","line":"fn argsHaveFakeThis(args: []const node.Function.Arg) bool {","class":"lineCov","hits":"1","order":"5622","possible_hits":"1",},
{"lineNum":"   27","line":"    return args.len > 0 and std.mem.eql(u8, \"this\", args[0].name);","class":"lineCov","hits":"1","order":"5623","possible_hits":"1",},
{"lineNum":"   28","line":"}"},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"pub fn emitFunc(self: *JsBackend, func: node.Function) Backend.Error!void {","class":"lineCov","hits":"2","order":"5616","possible_hits":"2",},
{"lineNum":"   31","line":"    std.debug.assert(!func.isArrow); // TODO: Implement arrow functions","class":"lineCov","hits":"1","order":"5617","possible_hits":"1",},
{"lineNum":"   32","line":"    std.debug.assert(func.body.getType() == .Block);","class":"lineCov","hits":"1","order":"5618","possible_hits":"1",},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"    try self.out.print(\"function {s}(\", .{if (func.name) |name| name else \"\"});","class":"lineCov","hits":"1","order":"5619","possible_hits":"1",},
{"lineNum":"   35","line":""},
{"lineNum":"   36","line":"    const args = func.args.items;","class":"lineCov","hits":"1","order":"5620","possible_hits":"1",},
{"lineNum":"   37","line":"    const argOffset: usize = if (argsHaveFakeThis(args)) 1 else 0;","class":"lineCov","hits":"1","order":"5621","possible_hits":"1",},
{"lineNum":"   38","line":""},
{"lineNum":"   39","line":"    var prefix: []const u8 = \"\";","class":"lineCov","hits":"1","order":"5624","possible_hits":"1",},
{"lineNum":"   40","line":"    for (func.args.items[argOffset..]) |arg| {","class":"linePartCov","hits":"2","order":"5625","possible_hits":"3",},
{"lineNum":"   41","line":"        try self.out.print(\"{s}{s}\", .{ prefix, arg.name });","class":"lineCov","hits":"1","order":"5647","possible_hits":"1",},
{"lineNum":"   42","line":"        prefix = \", \";","class":"lineCov","hits":"1","order":"5648","possible_hits":"1",},
{"lineNum":"   43","line":"    }"},
{"lineNum":"   44","line":""},
{"lineNum":"   45","line":"    try self.out.print(\") \", .{});","class":"lineCov","hits":"1","order":"5626","possible_hits":"1",},
{"lineNum":"   46","line":""},
{"lineNum":"   47","line":"    try self.emitNode(func.body);","class":"lineCov","hits":"1","order":"5627","possible_hits":"1",},
{"lineNum":"   48","line":"}"},
{"lineNum":"   49","line":""},
{"lineNum":"   50","line":"test \"JsBackend can emit function without args\" {","class":"lineCov","hits":"3","order":"5605","possible_hits":"3",},
{"lineNum":"   51","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"   52","line":""},
{"lineNum":"   53","line":"    var func = node.Function{"},
{"lineNum":"   54","line":"        .isArrow = false,","class":"lineCov","hits":"1","order":"5607","possible_hits":"1",},
{"lineNum":"   55","line":"        .name = \"aFunction\",","class":"lineCov","hits":"1","order":"5608","possible_hits":"1",},
{"lineNum":"   56","line":"        .retTy = null,","class":"lineCov","hits":"1","order":"5609","possible_hits":"1",},
{"lineNum":"   57","line":"        .args = .{ .items = &[_]node.Function.Arg{} },","class":"lineCov","hits":"1","order":"5610","possible_hits":"1",},
{"lineNum":"   58","line":"        .body = EmitTestCase.makeNode(.Block, node.NodeList{}),","class":"lineCov","hits":"1","order":"5606","possible_hits":"1",},
{"lineNum":"   59","line":"    };"},
{"lineNum":"   60","line":""},
{"lineNum":"   61","line":"    defer alloc.destroy(func.body);","class":"linePartCov","hits":"1","order":"5628","possible_hits":"2",},
{"lineNum":"   62","line":""},
{"lineNum":"   63","line":"    try (EmitTestCase{","class":"linePartCov","hits":"2","order":"5613","possible_hits":"3",},
{"lineNum":"   64","line":"        .inputNode = EmitTestCase.makeNode(.Function, func),","class":"lineCov","hits":"1","order":"5611","possible_hits":"1",},
{"lineNum":"   65","line":"        .expectedOutput = \"function aFunction() {\\n}\\n\",","class":"lineCov","hits":"1","order":"5612","possible_hits":"1",},
{"lineNum":"   66","line":"    }).run();","class":"lineCov","hits":"1","order":"5614","possible_hits":"1",},
{"lineNum":"   67","line":"}"},
{"lineNum":"   68","line":""},
{"lineNum":"   69","line":"test \"JsBackend can emit function with args\" {","class":"lineCov","hits":"3","order":"5629","possible_hits":"3",},
{"lineNum":"   70","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"   71","line":""},
{"lineNum":"   72","line":"    var func = node.Function{"},
{"lineNum":"   73","line":"        .isArrow = false,","class":"lineCov","hits":"1","order":"5631","possible_hits":"1",},
{"lineNum":"   74","line":"        .name = \"aFunction\",","class":"lineCov","hits":"1","order":"5632","possible_hits":"1",},
{"lineNum":"   75","line":"        .retTy = null,","class":"lineCov","hits":"1","order":"5633","possible_hits":"1",},
{"lineNum":"   76","line":"        .args = .{},","class":"lineCov","hits":"1","order":"5634","possible_hits":"1",},
{"lineNum":"   77","line":"        .body = EmitTestCase.makeNode(.Block, node.NodeList{}),","class":"lineCov","hits":"1","order":"5630","possible_hits":"1",},
{"lineNum":"   78","line":"    };"},
{"lineNum":"   79","line":""},
{"lineNum":"   80","line":"    defer alloc.destroy(func.body);","class":"linePartCov","hits":"1","order":"5650","possible_hits":"4",},
{"lineNum":"   81","line":"    defer func.args.deinit(alloc);","class":"linePartCov","hits":"1","order":"5649","possible_hits":"4",},
{"lineNum":"   82","line":""},
{"lineNum":"   83","line":"    try func.args.append(alloc, .{","class":"linePartCov","hits":"2","order":"5635","possible_hits":"3",},
{"lineNum":"   84","line":"        .csr = Cursor.new(0, 0),","class":"lineCov","hits":"1","order":"5636","possible_hits":"1",},
{"lineNum":"   85","line":"        .name = \"a\",","class":"lineCov","hits":"1","order":"5637","possible_hits":"1",},
{"lineNum":"   86","line":"        .ty = null,","class":"lineCov","hits":"1","order":"5638","possible_hits":"1",},
{"lineNum":"   87","line":"    });"},
{"lineNum":"   88","line":""},
{"lineNum":"   89","line":"    try func.args.append(alloc, .{","class":"linePartCov","hits":"2","order":"5639","possible_hits":"3",},
{"lineNum":"   90","line":"        .csr = Cursor.new(0, 0),","class":"lineCov","hits":"1","order":"5640","possible_hits":"1",},
{"lineNum":"   91","line":"        .name = \"b\",","class":"lineCov","hits":"1","order":"5641","possible_hits":"1",},
{"lineNum":"   92","line":"        .ty = null,","class":"lineCov","hits":"1","order":"5642","possible_hits":"1",},
{"lineNum":"   93","line":"    });"},
{"lineNum":"   94","line":""},
{"lineNum":"   95","line":"    try (EmitTestCase{","class":"linePartCov","hits":"2","order":"5645","possible_hits":"3",},
{"lineNum":"   96","line":"        .inputNode = EmitTestCase.makeNode(.Function, func),","class":"lineCov","hits":"1","order":"5643","possible_hits":"1",},
{"lineNum":"   97","line":"        .expectedOutput = \"function aFunction(a, b) {\\n}\\n\",","class":"lineCov","hits":"1","order":"5644","possible_hits":"1",},
{"lineNum":"   98","line":"    }).run();","class":"lineCov","hits":"1","order":"5646","possible_hits":"1",},
{"lineNum":"   99","line":"}"},
{"lineNum":"  100","line":""},
{"lineNum":"  101","line":"test \"JsBackend can emit function with fake \'this\' parameter\" {","class":"lineCov","hits":"3","order":"5651","possible_hits":"3",},
{"lineNum":"  102","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"  103","line":""},
{"lineNum":"  104","line":"    var func = node.Function{"},
{"lineNum":"  105","line":"        .isArrow = false,","class":"lineCov","hits":"1","order":"5653","possible_hits":"1",},
{"lineNum":"  106","line":"        .name = \"aFunction\",","class":"lineCov","hits":"1","order":"5654","possible_hits":"1",},
{"lineNum":"  107","line":"        .retTy = null,","class":"lineCov","hits":"1","order":"5655","possible_hits":"1",},
{"lineNum":"  108","line":"        .args = .{},","class":"lineCov","hits":"1","order":"5656","possible_hits":"1",},
{"lineNum":"  109","line":"        .body = EmitTestCase.makeNode(.Block, node.NodeList{}),","class":"lineCov","hits":"1","order":"5652","possible_hits":"1",},
{"lineNum":"  110","line":"    };"},
{"lineNum":"  111","line":""},
{"lineNum":"  112","line":"    defer alloc.destroy(func.body);","class":"linePartCov","hits":"1","order":"5670","possible_hits":"4",},
{"lineNum":"  113","line":"    defer func.args.deinit(alloc);","class":"linePartCov","hits":"1","order":"5669","possible_hits":"4",},
{"lineNum":"  114","line":""},
{"lineNum":"  115","line":"    try func.args.append(alloc, .{","class":"linePartCov","hits":"2","order":"5657","possible_hits":"3",},
{"lineNum":"  116","line":"        .csr = Cursor.new(0, 0),","class":"lineCov","hits":"1","order":"5658","possible_hits":"1",},
{"lineNum":"  117","line":"        .name = \"this\",","class":"lineCov","hits":"1","order":"5659","possible_hits":"1",},
{"lineNum":"  118","line":"        .ty = null,","class":"lineCov","hits":"1","order":"5660","possible_hits":"1",},
{"lineNum":"  119","line":"    });"},
{"lineNum":"  120","line":""},
{"lineNum":"  121","line":"    try func.args.append(alloc, .{","class":"linePartCov","hits":"2","order":"5661","possible_hits":"3",},
{"lineNum":"  122","line":"        .csr = Cursor.new(0, 0),","class":"lineCov","hits":"1","order":"5662","possible_hits":"1",},
{"lineNum":"  123","line":"        .name = \"a\",","class":"lineCov","hits":"1","order":"5663","possible_hits":"1",},
{"lineNum":"  124","line":"        .ty = null,","class":"lineCov","hits":"1","order":"5664","possible_hits":"1",},
{"lineNum":"  125","line":"    });"},
{"lineNum":"  126","line":""},
{"lineNum":"  127","line":"    try (EmitTestCase{","class":"linePartCov","hits":"2","order":"5667","possible_hits":"3",},
{"lineNum":"  128","line":"        .inputNode = EmitTestCase.makeNode(.Function, func),","class":"lineCov","hits":"1","order":"5665","possible_hits":"1",},
{"lineNum":"  129","line":"        .expectedOutput = \"function aFunction(a) {\\n}\\n\",","class":"lineCov","hits":"1","order":"5666","possible_hits":"1",},
{"lineNum":"  130","line":"    }).run();","class":"lineCov","hits":"1","order":"5668","possible_hits":"1",},
{"lineNum":"  131","line":"}"},
{"lineNum":"  132","line":""},
{"lineNum":"  133","line":"pub fn emitReturn(self: *JsBackend, expr: ?Node) Backend.Error!void {","class":"lineCov","hits":"2","order":"5432","possible_hits":"2",},
{"lineNum":"  134","line":"    if (expr) |val| {","class":"lineCov","hits":"2","order":"5433","possible_hits":"2",},
{"lineNum":"  135","line":"        try self.out.print(\"return \", .{});","class":"lineCov","hits":"1","order":"5682","possible_hits":"1",},
{"lineNum":"  136","line":"        try self.emitExpr(val);","class":"lineCov","hits":"1","order":"5683","possible_hits":"1",},
{"lineNum":"  137","line":"        try self.out.print(\";\\n\", .{});","class":"lineCov","hits":"1","order":"5684","possible_hits":"1",},
{"lineNum":"  138","line":"    } else {"},
{"lineNum":"  139","line":"        try self.out.print(\"return;\\n\", .{});","class":"lineCov","hits":"1","order":"5434","possible_hits":"1",},
{"lineNum":"  140","line":"    }"},
{"lineNum":"  141","line":"}"},
{"lineNum":"  142","line":""},
{"lineNum":"  143","line":"test \"JsBackend can emit return without a value\" {","class":"lineCov","hits":"2","order":"5671","possible_hits":"2",},
{"lineNum":"  144","line":"    try (EmitTestCase{","class":"lineCov","hits":"2","order":"5674","possible_hits":"2",},
{"lineNum":"  145","line":"        .inputNode = EmitTestCase.makeNode(.Return, null),","class":"lineCov","hits":"1","order":"5672","possible_hits":"1",},
{"lineNum":"  146","line":"        .expectedOutput = \"return;\\n\",","class":"lineCov","hits":"1","order":"5673","possible_hits":"1",},
{"lineNum":"  147","line":"    }).run();","class":"lineCov","hits":"1","order":"5675","possible_hits":"1",},
{"lineNum":"  148","line":"}"},
{"lineNum":"  149","line":""},
{"lineNum":"  150","line":"test \"JsBackend can emit return with a value\" {","class":"lineCov","hits":"3","order":"5676","possible_hits":"3",},
{"lineNum":"  151","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"  152","line":"    const value = EmitTestCase.makeNode(.Null, {});","class":"lineCov","hits":"1","order":"5677","possible_hits":"1",},
{"lineNum":"  153","line":"    defer alloc.destroy(value);","class":"linePartCov","hits":"1","order":"5685","possible_hits":"2",},
{"lineNum":"  154","line":""},
{"lineNum":"  155","line":"    try (EmitTestCase{","class":"linePartCov","hits":"2","order":"5680","possible_hits":"3",},
{"lineNum":"  156","line":"        .inputNode = EmitTestCase.makeNode(.Return, value),","class":"lineCov","hits":"1","order":"5678","possible_hits":"1",},
{"lineNum":"  157","line":"        .expectedOutput = \"return null;\\n\",","class":"lineCov","hits":"1","order":"5679","possible_hits":"1",},
{"lineNum":"  158","line":"    }).run();","class":"lineCov","hits":"1","order":"5681","possible_hits":"1",},
{"lineNum":"  159","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-19 08:42:21", "instrumented" : 83, "covered" : 83,};
var merged_data = [];
