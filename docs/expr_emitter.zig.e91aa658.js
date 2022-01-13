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
{"lineNum":"   19","line":"const Allocator = std.mem.Allocator;"},
{"lineNum":"   20","line":"const node = @import(\"../../common/node.zig\");"},
{"lineNum":"   21","line":"const Node = node.Node;"},
{"lineNum":"   22","line":"const Cursor = @import(\"../../common/cursor.zig\").Cursor;"},
{"lineNum":"   23","line":"const Backend = @import(\"../../common/backend.zig\").Backend;"},
{"lineNum":"   24","line":"const JsBackend = @import(\"js_backend.zig\").JsBackend;"},
{"lineNum":"   25","line":"const EmitTestCase = @import(\"emit_test_case.zig\").EmitTestCase;"},
{"lineNum":"   26","line":"const opToString = @import(\"op_to_string.zig\").opToString;"},
{"lineNum":"   27","line":""},
{"lineNum":"   28","line":"pub fn emitExpr(self: JsBackend, value: Node) Backend.Error!void {","class":"lineCov","hits":"2","order":"5071","possible_hits":"2",},
{"lineNum":"   29","line":"    try switch (value.data) {","class":"lineCov","hits":"19","order":"5072","possible_hits":"19",},
{"lineNum":"   30","line":"        .Ident => |i| self.out.print(\"{s}\", .{i}),","class":"lineCov","hits":"1","order":"5222","possible_hits":"1",},
{"lineNum":"   31","line":"        .Int => |i| self.out.print(\"{s}\", .{i}),","class":"lineCov","hits":"1","order":"5188","possible_hits":"1",},
{"lineNum":"   32","line":"        .Float => |f| self.out.print(\"{s}\", .{f}),","class":"lineCov","hits":"1","order":"5699","possible_hits":"1",},
{"lineNum":"   33","line":"        .String => |s| self.out.print(\"{s}\", .{s}),","class":"lineCov","hits":"1","order":"5187","possible_hits":"1",},
{"lineNum":"   34","line":"        .Template => |t| self.out.print(\"{s}\", .{t}),","class":"lineCov","hits":"1","order":"5510","possible_hits":"1",},
{"lineNum":"   35","line":"        .True => self.out.print(\"true\", .{}),","class":"lineCov","hits":"1","order":"5125","possible_hits":"1",},
{"lineNum":"   36","line":"        .False => self.out.print(\"false\", .{}),","class":"lineCov","hits":"1","order":"5147","possible_hits":"1",},
{"lineNum":"   37","line":"        .Null => self.out.print(\"null\", .{}),","class":"lineCov","hits":"1","order":"5073","possible_hits":"1",},
{"lineNum":"   38","line":"        .Undefined => self.out.print(\"undefined\", .{}),","class":"lineCov","hits":"1","order":"5148","possible_hits":"1",},
{"lineNum":"   39","line":"        .PrefixOp => |op| {","class":"lineCov","hits":"2","order":"5538","possible_hits":"2",},
{"lineNum":"   40","line":"            try self.out.print(\"({s}\", .{try opToString(op.op)});","class":"lineCov","hits":"1","order":"5539","possible_hits":"1",},
{"lineNum":"   41","line":"            try self.emitExpr(op.expr);","class":"lineCov","hits":"1","order":"5543","possible_hits":"1",},
{"lineNum":"   42","line":"            try self.out.print(\")\", .{});","class":"lineCov","hits":"1","order":"5544","possible_hits":"1",},
{"lineNum":"   43","line":"        },"},
{"lineNum":"   44","line":"        .PostfixOp => |op| {","class":"lineCov","hits":"2","order":"5556","possible_hits":"2",},
{"lineNum":"   45","line":"            try self.out.print(\"(\", .{});","class":"lineCov","hits":"1","order":"5557","possible_hits":"1",},
{"lineNum":"   46","line":"            try self.emitExpr(op.expr);","class":"lineCov","hits":"1","order":"5558","possible_hits":"1",},
{"lineNum":"   47","line":"            try self.out.print(\"{s})\", .{try opToString(op.op)});","class":"lineCov","hits":"1","order":"5559","possible_hits":"1",},
{"lineNum":"   48","line":"        },"},
{"lineNum":"   49","line":"        .BinaryOp => |op| {","class":"lineCov","hits":"2","order":"5572","possible_hits":"2",},
{"lineNum":"   50","line":"            try self.out.print(\"(\", .{});","class":"lineCov","hits":"1","order":"5573","possible_hits":"1",},
{"lineNum":"   51","line":"            try self.emitExpr(op.left);","class":"lineCov","hits":"1","order":"5574","possible_hits":"1",},
{"lineNum":"   52","line":"            try self.out.print(\"{s}\", .{try opToString(op.op)});","class":"lineCov","hits":"1","order":"5575","possible_hits":"1",},
{"lineNum":"   53","line":"            try self.emitExpr(op.right);","class":"lineCov","hits":"1","order":"5577","possible_hits":"1",},
{"lineNum":"   54","line":"            try self.out.print(\")\", .{});","class":"lineCov","hits":"1","order":"5578","possible_hits":"1",},
{"lineNum":"   55","line":"        },"},
{"lineNum":"   56","line":"        .Ternary => |trn| {","class":"lineCov","hits":"2","order":"5591","possible_hits":"2",},
{"lineNum":"   57","line":"            try self.out.print(\"(\", .{});","class":"lineCov","hits":"1","order":"5592","possible_hits":"1",},
{"lineNum":"   58","line":"            try self.emitExpr(trn.cond);","class":"lineCov","hits":"1","order":"5593","possible_hits":"1",},
{"lineNum":"   59","line":"            try self.out.print(\"?\", .{});","class":"lineCov","hits":"1","order":"5594","possible_hits":"1",},
{"lineNum":"   60","line":"            try self.emitExpr(trn.ifTrue);","class":"lineCov","hits":"1","order":"5595","possible_hits":"1",},
{"lineNum":"   61","line":"            try self.out.print(\":\", .{});","class":"lineCov","hits":"1","order":"5596","possible_hits":"1",},
{"lineNum":"   62","line":"            try self.emitExpr(trn.ifFalse);","class":"lineCov","hits":"1","order":"5597","possible_hits":"1",},
{"lineNum":"   63","line":"            try self.out.print(\")\", .{});","class":"lineCov","hits":"1","order":"5598","possible_hits":"1",},
{"lineNum":"   64","line":"        },"},
{"lineNum":"   65","line":"        .Call => |call| {","class":"lineCov","hits":"2","order":"5614","possible_hits":"2",},
{"lineNum":"   66","line":"            try self.out.print(\"(\", .{});","class":"lineCov","hits":"1","order":"5615","possible_hits":"1",},
{"lineNum":"   67","line":"            try self.emitExpr(call.expr);","class":"lineCov","hits":"1","order":"5616","possible_hits":"1",},
{"lineNum":"   68","line":"            try self.out.print(\"(\", .{});","class":"lineCov","hits":"1","order":"5617","possible_hits":"1",},
{"lineNum":"   69","line":""},
{"lineNum":"   70","line":"            var prefix: []const u8 = \"\";","class":"lineCov","hits":"1","order":"5618","possible_hits":"1",},
{"lineNum":"   71","line":"            for (call.args.items) |arg| {","class":"lineCov","hits":"2","order":"5619","possible_hits":"2",},
{"lineNum":"   72","line":"                try self.out.print(\"{s}\", .{prefix});","class":"lineCov","hits":"1","order":"5620","possible_hits":"1",},
{"lineNum":"   73","line":"                try self.emitExpr(arg);","class":"lineCov","hits":"1","order":"5621","possible_hits":"1",},
{"lineNum":"   74","line":"                prefix = \", \";","class":"lineCov","hits":"1","order":"5622","possible_hits":"1",},
{"lineNum":"   75","line":"            }"},
{"lineNum":"   76","line":""},
{"lineNum":"   77","line":"            try self.out.print(\"))\", .{});","class":"lineCov","hits":"1","order":"5623","possible_hits":"1",},
{"lineNum":"   78","line":"        },"},
{"lineNum":"   79","line":"        .Array => |arr| {","class":"lineCov","hits":"2","order":"5639","possible_hits":"2",},
{"lineNum":"   80","line":"            try self.out.print(\"[ \", .{});","class":"lineCov","hits":"1","order":"5640","possible_hits":"1",},
{"lineNum":"   81","line":""},
{"lineNum":"   82","line":"            for (arr.items) |item| {","class":"lineCov","hits":"2","order":"5641","possible_hits":"2",},
{"lineNum":"   83","line":"                try self.emitExpr(item);","class":"lineCov","hits":"1","order":"5642","possible_hits":"1",},
{"lineNum":"   84","line":"                try self.out.print(\", \", .{});","class":"lineCov","hits":"1","order":"5643","possible_hits":"1",},
{"lineNum":"   85","line":"            }"},
{"lineNum":"   86","line":""},
{"lineNum":"   87","line":"            try self.out.print(\"]\", .{});","class":"lineCov","hits":"1","order":"5644","possible_hits":"1",},
{"lineNum":"   88","line":"        },"},
{"lineNum":"   89","line":"        .ArrayAccess => |access| {","class":"lineCov","hits":"2","order":"5657","possible_hits":"2",},
{"lineNum":"   90","line":"            try self.emitExpr(access.expr);","class":"lineCov","hits":"1","order":"5658","possible_hits":"1",},
{"lineNum":"   91","line":"            try self.out.print(\"[\", .{});","class":"lineCov","hits":"1","order":"5659","possible_hits":"1",},
{"lineNum":"   92","line":"            try self.emitExpr(access.index);","class":"lineCov","hits":"1","order":"5660","possible_hits":"1",},
{"lineNum":"   93","line":"            try self.out.print(\"]\", .{});","class":"lineCov","hits":"1","order":"5661","possible_hits":"1",},
{"lineNum":"   94","line":"        },"},
{"lineNum":"   95","line":"        .Dot => |dot| {","class":"lineCov","hits":"2","order":"5673","possible_hits":"2",},
{"lineNum":"   96","line":"            try self.emitExpr(dot.expr);","class":"lineCov","hits":"1","order":"5674","possible_hits":"1",},
{"lineNum":"   97","line":"            try self.out.print(\".{s}\", .{dot.ident});","class":"lineCov","hits":"1","order":"5675","possible_hits":"1",},
{"lineNum":"   98","line":"        },"},
{"lineNum":"   99","line":"        .Object => |obj| {","class":"lineCov","hits":"2","order":"5692","possible_hits":"2",},
{"lineNum":"  100","line":"            try self.out.print(\"{{ \", .{});","class":"lineCov","hits":"1","order":"5693","possible_hits":"1",},
{"lineNum":"  101","line":"            for (obj.items) |prop| {","class":"lineCov","hits":"2","order":"5694","possible_hits":"2",},
{"lineNum":"  102","line":"                try self.emitExpr(prop.key);","class":"lineCov","hits":"1","order":"5695","possible_hits":"1",},
{"lineNum":"  103","line":"                try self.out.print(\": \", .{});","class":"lineCov","hits":"1","order":"5696","possible_hits":"1",},
{"lineNum":"  104","line":"                try self.emitExpr(prop.value);","class":"lineCov","hits":"1","order":"5697","possible_hits":"1",},
{"lineNum":"  105","line":"                try self.out.print(\", \", .{});","class":"lineCov","hits":"1","order":"5698","possible_hits":"1",},
{"lineNum":"  106","line":"            }"},
{"lineNum":"  107","line":"            try self.out.print(\"}}\", .{});","class":"lineCov","hits":"1","order":"5700","possible_hits":"1",},
{"lineNum":"  108","line":"        },"},
{"lineNum":"  109","line":"        else => std.debug.panic(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  110","line":"            \"Invalid Node type in emitExpr: {?}\","},
{"lineNum":"  111","line":"            .{value},","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  112","line":"        ),"},
{"lineNum":"  113","line":"    };"},
{"lineNum":"  114","line":"}"},
{"lineNum":"  115","line":""},
{"lineNum":"  116","line":"test \"JsBackend can emit ident expression\" {","class":"lineCov","hits":"2","order":"5485","possible_hits":"2",},
{"lineNum":"  117","line":"    try (EmitTestCase{","class":"lineCov","hits":"2","order":"5488","possible_hits":"2",},
{"lineNum":"  118","line":"        .inputNode = EmitTestCase.makeNode(.Ident, \"anIdentifier\"),","class":"lineCov","hits":"1","order":"5486","possible_hits":"1",},
{"lineNum":"  119","line":"        .expectedOutput = \"anIdentifier;\\n\",","class":"lineCov","hits":"1","order":"5487","possible_hits":"1",},
{"lineNum":"  120","line":"    }).run();","class":"lineCov","hits":"1","order":"5489","possible_hits":"1",},
{"lineNum":"  121","line":"}"},
{"lineNum":"  122","line":""},
{"lineNum":"  123","line":"test \"JsBackend can emit int expression\" {","class":"lineCov","hits":"2","order":"5490","possible_hits":"2",},
{"lineNum":"  124","line":"    try (EmitTestCase{","class":"lineCov","hits":"2","order":"5493","possible_hits":"2",},
{"lineNum":"  125","line":"        .inputNode = EmitTestCase.makeNode(.Int, \"123\"),","class":"lineCov","hits":"1","order":"5491","possible_hits":"1",},
{"lineNum":"  126","line":"        .expectedOutput = \"123;\\n\",","class":"lineCov","hits":"1","order":"5492","possible_hits":"1",},
{"lineNum":"  127","line":"    }).run();","class":"lineCov","hits":"1","order":"5494","possible_hits":"1",},
{"lineNum":"  128","line":"}"},
{"lineNum":"  129","line":""},
{"lineNum":"  130","line":"test \"JsBackend can emit float expression\" {","class":"lineCov","hits":"2","order":"5495","possible_hits":"2",},
{"lineNum":"  131","line":"    try (EmitTestCase{","class":"lineCov","hits":"2","order":"5498","possible_hits":"2",},
{"lineNum":"  132","line":"        .inputNode = EmitTestCase.makeNode(.Int, \"123.456\"),","class":"lineCov","hits":"1","order":"5496","possible_hits":"1",},
{"lineNum":"  133","line":"        .expectedOutput = \"123.456;\\n\",","class":"lineCov","hits":"1","order":"5497","possible_hits":"1",},
{"lineNum":"  134","line":"    }).run();","class":"lineCov","hits":"1","order":"5499","possible_hits":"1",},
{"lineNum":"  135","line":"}"},
{"lineNum":"  136","line":""},
{"lineNum":"  137","line":"test \"JsBackend can emit string expression\" {","class":"lineCov","hits":"2","order":"5500","possible_hits":"2",},
{"lineNum":"  138","line":"    try (EmitTestCase{","class":"lineCov","hits":"2","order":"5503","possible_hits":"2",},
{"lineNum":"  139","line":"        .inputNode = EmitTestCase.makeNode(.String, \"\'a test string\'\"),","class":"lineCov","hits":"1","order":"5501","possible_hits":"1",},
{"lineNum":"  140","line":"        .expectedOutput = \"\'a test string\';\\n\",","class":"lineCov","hits":"1","order":"5502","possible_hits":"1",},
{"lineNum":"  141","line":"    }).run();","class":"lineCov","hits":"1","order":"5504","possible_hits":"1",},
{"lineNum":"  142","line":"}"},
{"lineNum":"  143","line":""},
{"lineNum":"  144","line":"test \"JsBackend can emit template expression\" {","class":"lineCov","hits":"2","order":"5505","possible_hits":"2",},
{"lineNum":"  145","line":"    try (EmitTestCase{","class":"lineCov","hits":"2","order":"5508","possible_hits":"2",},
{"lineNum":"  146","line":"        .inputNode = EmitTestCase.makeNode(.Template, \"`a test template`\"),","class":"lineCov","hits":"1","order":"5506","possible_hits":"1",},
{"lineNum":"  147","line":"        .expectedOutput = \"`a test template`;\\n\",","class":"lineCov","hits":"1","order":"5507","possible_hits":"1",},
{"lineNum":"  148","line":"    }).run();","class":"lineCov","hits":"1","order":"5509","possible_hits":"1",},
{"lineNum":"  149","line":"}"},
{"lineNum":"  150","line":""},
{"lineNum":"  151","line":"test \"JsBackend can emit \'true\' expression\" {","class":"lineCov","hits":"2","order":"5511","possible_hits":"2",},
{"lineNum":"  152","line":"    try (EmitTestCase{","class":"lineCov","hits":"2","order":"5514","possible_hits":"2",},
{"lineNum":"  153","line":"        .inputNode = EmitTestCase.makeNode(.True, {}),","class":"lineCov","hits":"1","order":"5512","possible_hits":"1",},
{"lineNum":"  154","line":"        .expectedOutput = \"true;\\n\",","class":"lineCov","hits":"1","order":"5513","possible_hits":"1",},
{"lineNum":"  155","line":"    }).run();","class":"lineCov","hits":"1","order":"5515","possible_hits":"1",},
{"lineNum":"  156","line":"}"},
{"lineNum":"  157","line":""},
{"lineNum":"  158","line":"test \"JsBackend can emit \'false\' expression\" {","class":"lineCov","hits":"2","order":"5516","possible_hits":"2",},
{"lineNum":"  159","line":"    try (EmitTestCase{","class":"lineCov","hits":"2","order":"5519","possible_hits":"2",},
{"lineNum":"  160","line":"        .inputNode = EmitTestCase.makeNode(.False, {}),","class":"lineCov","hits":"1","order":"5517","possible_hits":"1",},
{"lineNum":"  161","line":"        .expectedOutput = \"false;\\n\",","class":"lineCov","hits":"1","order":"5518","possible_hits":"1",},
{"lineNum":"  162","line":"    }).run();","class":"lineCov","hits":"1","order":"5520","possible_hits":"1",},
{"lineNum":"  163","line":"}"},
{"lineNum":"  164","line":""},
{"lineNum":"  165","line":"test \"JsBackend can emit \'null\' expression\" {","class":"lineCov","hits":"2","order":"5521","possible_hits":"2",},
{"lineNum":"  166","line":"    try (EmitTestCase{","class":"lineCov","hits":"2","order":"5524","possible_hits":"2",},
{"lineNum":"  167","line":"        .inputNode = EmitTestCase.makeNode(.Null, {}),","class":"lineCov","hits":"1","order":"5522","possible_hits":"1",},
{"lineNum":"  168","line":"        .expectedOutput = \"null;\\n\",","class":"lineCov","hits":"1","order":"5523","possible_hits":"1",},
{"lineNum":"  169","line":"    }).run();","class":"lineCov","hits":"1","order":"5525","possible_hits":"1",},
{"lineNum":"  170","line":"}"},
{"lineNum":"  171","line":""},
{"lineNum":"  172","line":"test \"JsBackend can emit \'undefined\' expression\" {","class":"lineCov","hits":"2","order":"5526","possible_hits":"2",},
{"lineNum":"  173","line":"    try (EmitTestCase{","class":"lineCov","hits":"2","order":"5529","possible_hits":"2",},
{"lineNum":"  174","line":"        .inputNode = EmitTestCase.makeNode(.Undefined, {}),","class":"lineCov","hits":"1","order":"5527","possible_hits":"1",},
{"lineNum":"  175","line":"        .expectedOutput = \"undefined;\\n\",","class":"lineCov","hits":"1","order":"5528","possible_hits":"1",},
{"lineNum":"  176","line":"    }).run();","class":"lineCov","hits":"1","order":"5530","possible_hits":"1",},
{"lineNum":"  177","line":"}"},
{"lineNum":"  178","line":""},
{"lineNum":"  179","line":"test \"JsBackend can emit prefix op expression\" {","class":"lineCov","hits":"2","order":"5531","possible_hits":"2",},
{"lineNum":"  180","line":"    try (EmitTestCase{","class":"lineCov","hits":"1","order":"5548","possible_hits":"1",},
{"lineNum":"  181","line":"        .inputNode = EmitTestCase.makeNode(","class":"lineCov","hits":"1","order":"5534","possible_hits":"1",},
{"lineNum":"  182","line":"            .PrefixOp,"},
{"lineNum":"  183","line":"            node.UnaryOp{"},
{"lineNum":"  184","line":"                .op = .Inc,","class":"lineCov","hits":"1","order":"5533","possible_hits":"1",},
{"lineNum":"  185","line":"                .expr = EmitTestCase.makeNode(.Ident, \"a\"),","class":"lineCov","hits":"1","order":"5532","possible_hits":"1",},
{"lineNum":"  186","line":"            },"},
{"lineNum":"  187","line":"        ),"},
{"lineNum":"  188","line":"        .expectedOutput = \"(++a);\\n\",","class":"lineCov","hits":"1","order":"5535","possible_hits":"1",},
{"lineNum":"  189","line":"        .cleanup = (struct {","class":"lineCov","hits":"1","order":"5536","possible_hits":"1",},
{"lineNum":"  190","line":"            fn cleanup(alloc: Allocator, nd: Node) void {","class":"lineCov","hits":"2","order":"5546","possible_hits":"2",},
{"lineNum":"  191","line":"                alloc.destroy(nd.data.PrefixOp.expr);","class":"linePartCov","hits":"1","order":"5547","possible_hits":"2",},
{"lineNum":"  192","line":"            }"},
{"lineNum":"  193","line":"        }).cleanup,"},
{"lineNum":"  194","line":"    }).run();","class":"lineCov","hits":"1","order":"5537","possible_hits":"1",},
{"lineNum":"  195","line":"}"},
{"lineNum":"  196","line":""},
{"lineNum":"  197","line":"test \"JsBackend can emit postfix op expression\" {","class":"lineCov","hits":"2","order":"5549","possible_hits":"2",},
{"lineNum":"  198","line":"    try (EmitTestCase{","class":"lineCov","hits":"1","order":"5563","possible_hits":"1",},
{"lineNum":"  199","line":"        .inputNode = EmitTestCase.makeNode(","class":"lineCov","hits":"1","order":"5552","possible_hits":"1",},
{"lineNum":"  200","line":"            .PostfixOp,"},
{"lineNum":"  201","line":"            node.UnaryOp{"},
{"lineNum":"  202","line":"                .op = .Dec,","class":"lineCov","hits":"1","order":"5551","possible_hits":"1",},
{"lineNum":"  203","line":"                .expr = EmitTestCase.makeNode(.Ident, \"a\"),","class":"lineCov","hits":"1","order":"5550","possible_hits":"1",},
{"lineNum":"  204","line":"            },"},
{"lineNum":"  205","line":"        ),"},
{"lineNum":"  206","line":"        .expectedOutput = \"(a--);\\n\",","class":"lineCov","hits":"1","order":"5553","possible_hits":"1",},
{"lineNum":"  207","line":"        .cleanup = (struct {","class":"lineCov","hits":"1","order":"5554","possible_hits":"1",},
{"lineNum":"  208","line":"            fn cleanup(alloc: Allocator, nd: Node) void {","class":"lineCov","hits":"2","order":"5561","possible_hits":"2",},
{"lineNum":"  209","line":"                alloc.destroy(nd.data.PostfixOp.expr);","class":"linePartCov","hits":"1","order":"5562","possible_hits":"2",},
{"lineNum":"  210","line":"            }"},
{"lineNum":"  211","line":"        }).cleanup,"},
{"lineNum":"  212","line":"    }).run();","class":"lineCov","hits":"1","order":"5555","possible_hits":"1",},
{"lineNum":"  213","line":"}"},
{"lineNum":"  214","line":""},
{"lineNum":"  215","line":"test \"JsBackend can emit binary op expression\" {","class":"lineCov","hits":"2","order":"5564","possible_hits":"2",},
{"lineNum":"  216","line":"    try (EmitTestCase{","class":"lineCov","hits":"1","order":"5582","possible_hits":"1",},
{"lineNum":"  217","line":"        .inputNode = EmitTestCase.makeNode(","class":"lineCov","hits":"1","order":"5568","possible_hits":"1",},
{"lineNum":"  218","line":"            .BinaryOp,"},
{"lineNum":"  219","line":"            node.BinaryOp{"},
{"lineNum":"  220","line":"                .op = .Add,","class":"lineCov","hits":"1","order":"5567","possible_hits":"1",},
{"lineNum":"  221","line":"                .left = EmitTestCase.makeNode(.Ident, \"a\"),","class":"lineCov","hits":"1","order":"5565","possible_hits":"1",},
{"lineNum":"  222","line":"                .right = EmitTestCase.makeNode(.Int, \"4\"),","class":"lineCov","hits":"1","order":"5566","possible_hits":"1",},
{"lineNum":"  223","line":"            },"},
{"lineNum":"  224","line":"        ),"},
{"lineNum":"  225","line":"        .expectedOutput = \"(a+4);\\n\",","class":"lineCov","hits":"1","order":"5569","possible_hits":"1",},
{"lineNum":"  226","line":"        .cleanup = (struct {","class":"lineCov","hits":"1","order":"5570","possible_hits":"1",},
{"lineNum":"  227","line":"            fn cleanup(alloc: Allocator, nd: Node) void {","class":"lineCov","hits":"2","order":"5579","possible_hits":"2",},
{"lineNum":"  228","line":"                alloc.destroy(nd.data.BinaryOp.left);","class":"linePartCov","hits":"1","order":"5580","possible_hits":"2",},
{"lineNum":"  229","line":"                alloc.destroy(nd.data.BinaryOp.right);","class":"linePartCov","hits":"2","order":"5581","possible_hits":"3",},
{"lineNum":"  230","line":"            }"},
{"lineNum":"  231","line":"        }).cleanup,"},
{"lineNum":"  232","line":"    }).run();","class":"lineCov","hits":"1","order":"5571","possible_hits":"1",},
{"lineNum":"  233","line":"}"},
{"lineNum":"  234","line":""},
{"lineNum":"  235","line":"test \"JsBackend can emit ternary expression\" {","class":"lineCov","hits":"2","order":"5583","possible_hits":"2",},
{"lineNum":"  236","line":"    try (EmitTestCase{","class":"lineCov","hits":"1","order":"5603","possible_hits":"1",},
{"lineNum":"  237","line":"        .inputNode = EmitTestCase.makeNode(","class":"lineCov","hits":"1","order":"5587","possible_hits":"1",},
{"lineNum":"  238","line":"            .Ternary,"},
{"lineNum":"  239","line":"            node.Ternary{"},
{"lineNum":"  240","line":"                .cond = EmitTestCase.makeNode(.Ident, \"a\"),","class":"lineCov","hits":"1","order":"5584","possible_hits":"1",},
{"lineNum":"  241","line":"                .ifTrue = EmitTestCase.makeNode(.Int, \"3\"),","class":"lineCov","hits":"1","order":"5585","possible_hits":"1",},
{"lineNum":"  242","line":"                .ifFalse = EmitTestCase.makeNode(.False, {}),","class":"lineCov","hits":"1","order":"5586","possible_hits":"1",},
{"lineNum":"  243","line":"            },"},
{"lineNum":"  244","line":"        ),"},
{"lineNum":"  245","line":"        .expectedOutput = \"(a?3:false);\\n\",","class":"lineCov","hits":"1","order":"5588","possible_hits":"1",},
{"lineNum":"  246","line":"        .cleanup = (struct {","class":"lineCov","hits":"1","order":"5589","possible_hits":"1",},
{"lineNum":"  247","line":"            fn cleanup(alloc: Allocator, nd: Node) void {","class":"lineCov","hits":"2","order":"5599","possible_hits":"2",},
{"lineNum":"  248","line":"                alloc.destroy(nd.data.Ternary.cond);","class":"linePartCov","hits":"1","order":"5600","possible_hits":"2",},
{"lineNum":"  249","line":"                alloc.destroy(nd.data.Ternary.ifTrue);","class":"linePartCov","hits":"2","order":"5601","possible_hits":"3",},
{"lineNum":"  250","line":"                alloc.destroy(nd.data.Ternary.ifFalse);","class":"linePartCov","hits":"2","order":"5602","possible_hits":"3",},
{"lineNum":"  251","line":"            }"},
{"lineNum":"  252","line":"        }).cleanup,"},
{"lineNum":"  253","line":"    }).run();","class":"lineCov","hits":"1","order":"5590","possible_hits":"1",},
{"lineNum":"  254","line":"}"},
{"lineNum":"  255","line":""},
{"lineNum":"  256","line":"test \"JsBackend can emit function call expression\" {","class":"lineCov","hits":"2","order":"5604","possible_hits":"2",},
{"lineNum":"  257","line":"    try (EmitTestCase{","class":"lineCov","hits":"1","order":"5628","possible_hits":"1",},
{"lineNum":"  258","line":"        .inputNode = EmitTestCase.makeNode(","class":"lineCov","hits":"1","order":"5610","possible_hits":"1",},
{"lineNum":"  259","line":"            .Call,"},
{"lineNum":"  260","line":"            node.Call{"},
{"lineNum":"  261","line":"                .expr = EmitTestCase.makeNode(.Ident, \"aFunction\"),","class":"lineCov","hits":"1","order":"5605","possible_hits":"1",},
{"lineNum":"  262","line":"                .args = node.NodeList{","class":"lineCov","hits":"1","order":"5609","possible_hits":"1",},
{"lineNum":"  263","line":"                    .items = &[_]Node{","class":"lineCov","hits":"1","order":"5608","possible_hits":"1",},
{"lineNum":"  264","line":"                        EmitTestCase.makeNode(.Int, \"4\"),","class":"lineCov","hits":"1","order":"5606","possible_hits":"1",},
{"lineNum":"  265","line":"                        EmitTestCase.makeNode(.String, \"\'a\'\"),","class":"lineCov","hits":"1","order":"5607","possible_hits":"1",},
{"lineNum":"  266","line":"                    },"},
{"lineNum":"  267","line":"                },"},
{"lineNum":"  268","line":"            },"},
{"lineNum":"  269","line":"        ),"},
{"lineNum":"  270","line":"        .expectedOutput = \"(aFunction(4, \'a\'));\\n\",","class":"lineCov","hits":"1","order":"5611","possible_hits":"1",},
{"lineNum":"  271","line":"        .cleanup = (struct {","class":"lineCov","hits":"1","order":"5612","possible_hits":"1",},
{"lineNum":"  272","line":"            fn cleanup(alloc: Allocator, nd: Node) void {","class":"lineCov","hits":"2","order":"5624","possible_hits":"2",},
{"lineNum":"  273","line":"                alloc.destroy(nd.data.Call.expr);","class":"linePartCov","hits":"1","order":"5625","possible_hits":"2",},
{"lineNum":"  274","line":"                alloc.destroy(nd.data.Call.args.items[0]);","class":"lineCov","hits":"2","order":"5626","possible_hits":"2",},
{"lineNum":"  275","line":"                alloc.destroy(nd.data.Call.args.items[1]);","class":"lineCov","hits":"1","order":"5627","possible_hits":"1",},
{"lineNum":"  276","line":"            }"},
{"lineNum":"  277","line":"        }).cleanup,"},
{"lineNum":"  278","line":"    }).run();","class":"lineCov","hits":"1","order":"5613","possible_hits":"1",},
{"lineNum":"  279","line":"}"},
{"lineNum":"  280","line":""},
{"lineNum":"  281","line":"test \"JsBackend can emit array literal expression\" {","class":"lineCov","hits":"2","order":"5629","possible_hits":"2",},
{"lineNum":"  282","line":"    try (EmitTestCase{","class":"lineCov","hits":"1","order":"5649","possible_hits":"1",},
{"lineNum":"  283","line":"        .inputNode = EmitTestCase.makeNode(","class":"lineCov","hits":"1","order":"5635","possible_hits":"1",},
{"lineNum":"  284","line":"            .Array,"},
{"lineNum":"  285","line":"            node.NodeList{","class":"lineCov","hits":"1","order":"5634","possible_hits":"1",},
{"lineNum":"  286","line":"                .items = &[_]Node{","class":"lineCov","hits":"1","order":"5633","possible_hits":"1",},
{"lineNum":"  287","line":"                    EmitTestCase.makeNode(.Int, \"1\"),","class":"lineCov","hits":"1","order":"5630","possible_hits":"1",},
{"lineNum":"  288","line":"                    EmitTestCase.makeNode(.String, \"\'a\'\"),","class":"lineCov","hits":"1","order":"5631","possible_hits":"1",},
{"lineNum":"  289","line":"                    EmitTestCase.makeNode(.Null, {}),","class":"lineCov","hits":"1","order":"5632","possible_hits":"1",},
{"lineNum":"  290","line":"                },"},
{"lineNum":"  291","line":"            },"},
{"lineNum":"  292","line":"        ),"},
{"lineNum":"  293","line":"        .expectedOutput = \"[ 1, \'a\', null, ];\\n\",","class":"lineCov","hits":"1","order":"5636","possible_hits":"1",},
{"lineNum":"  294","line":"        .cleanup = (struct {","class":"lineCov","hits":"1","order":"5637","possible_hits":"1",},
{"lineNum":"  295","line":"            fn cleanup(alloc: Allocator, nd: Node) void {","class":"lineCov","hits":"2","order":"5645","possible_hits":"2",},
{"lineNum":"  296","line":"                alloc.destroy(nd.data.Array.items[0]);","class":"lineCov","hits":"1","order":"5646","possible_hits":"1",},
{"lineNum":"  297","line":"                alloc.destroy(nd.data.Array.items[1]);","class":"lineCov","hits":"1","order":"5647","possible_hits":"1",},
{"lineNum":"  298","line":"                alloc.destroy(nd.data.Array.items[2]);","class":"lineCov","hits":"1","order":"5648","possible_hits":"1",},
{"lineNum":"  299","line":"            }"},
{"lineNum":"  300","line":"        }).cleanup,"},
{"lineNum":"  301","line":"    }).run();","class":"lineCov","hits":"1","order":"5638","possible_hits":"1",},
{"lineNum":"  302","line":"}"},
{"lineNum":"  303","line":""},
{"lineNum":"  304","line":"test \"JsBackend can emit array access expression\" {","class":"lineCov","hits":"2","order":"5650","possible_hits":"2",},
{"lineNum":"  305","line":"    try (EmitTestCase{","class":"lineCov","hits":"1","order":"5665","possible_hits":"1",},
{"lineNum":"  306","line":"        .inputNode = EmitTestCase.makeNode(","class":"lineCov","hits":"1","order":"5653","possible_hits":"1",},
{"lineNum":"  307","line":"            .ArrayAccess,"},
{"lineNum":"  308","line":"            node.ArrayAccess{"},
{"lineNum":"  309","line":"                .expr = EmitTestCase.makeNode(.Ident, \"anArray\"),","class":"lineCov","hits":"1","order":"5651","possible_hits":"1",},
{"lineNum":"  310","line":"                .index = EmitTestCase.makeNode(.Int, \"1\"),","class":"lineCov","hits":"1","order":"5652","possible_hits":"1",},
{"lineNum":"  311","line":"            },"},
{"lineNum":"  312","line":"        ),"},
{"lineNum":"  313","line":"        .expectedOutput = \"anArray[1];\\n\",","class":"lineCov","hits":"1","order":"5654","possible_hits":"1",},
{"lineNum":"  314","line":"        .cleanup = (struct {","class":"lineCov","hits":"1","order":"5655","possible_hits":"1",},
{"lineNum":"  315","line":"            fn cleanup(alloc: Allocator, nd: Node) void {","class":"lineCov","hits":"2","order":"5662","possible_hits":"2",},
{"lineNum":"  316","line":"                alloc.destroy(nd.data.ArrayAccess.expr);","class":"linePartCov","hits":"1","order":"5663","possible_hits":"2",},
{"lineNum":"  317","line":"                alloc.destroy(nd.data.ArrayAccess.index);","class":"linePartCov","hits":"2","order":"5664","possible_hits":"3",},
{"lineNum":"  318","line":"            }"},
{"lineNum":"  319","line":"        }).cleanup,"},
{"lineNum":"  320","line":"    }).run();","class":"lineCov","hits":"1","order":"5656","possible_hits":"1",},
{"lineNum":"  321","line":"}"},
{"lineNum":"  322","line":""},
{"lineNum":"  323","line":"test \"JsBackend can emit dot expression\" {","class":"lineCov","hits":"2","order":"5666","possible_hits":"2",},
{"lineNum":"  324","line":"    try (EmitTestCase{","class":"lineCov","hits":"1","order":"5678","possible_hits":"1",},
{"lineNum":"  325","line":"        .inputNode = EmitTestCase.makeNode(","class":"lineCov","hits":"1","order":"5669","possible_hits":"1",},
{"lineNum":"  326","line":"            .Dot,"},
{"lineNum":"  327","line":"            node.Dot{"},
{"lineNum":"  328","line":"                .expr = EmitTestCase.makeNode(.Ident, \"anObject\"),","class":"lineCov","hits":"1","order":"5667","possible_hits":"1",},
{"lineNum":"  329","line":"                .ident = \"aProperty\",","class":"lineCov","hits":"1","order":"5668","possible_hits":"1",},
{"lineNum":"  330","line":"            },"},
{"lineNum":"  331","line":"        ),"},
{"lineNum":"  332","line":"        .expectedOutput = \"anObject.aProperty;\\n\",","class":"lineCov","hits":"1","order":"5670","possible_hits":"1",},
{"lineNum":"  333","line":"        .cleanup = (struct {","class":"lineCov","hits":"1","order":"5671","possible_hits":"1",},
{"lineNum":"  334","line":"            fn cleanup(alloc: Allocator, nd: Node) void {","class":"lineCov","hits":"2","order":"5676","possible_hits":"2",},
{"lineNum":"  335","line":"                alloc.destroy(nd.data.Dot.expr);","class":"linePartCov","hits":"1","order":"5677","possible_hits":"2",},
{"lineNum":"  336","line":"            }"},
{"lineNum":"  337","line":"        }).cleanup,"},
{"lineNum":"  338","line":"    }).run();","class":"lineCov","hits":"1","order":"5672","possible_hits":"1",},
{"lineNum":"  339","line":"}"},
{"lineNum":"  340","line":""},
{"lineNum":"  341","line":"test \"JsBackend can emit object literal expression\" {","class":"lineCov","hits":"2","order":"5679","possible_hits":"2",},
{"lineNum":"  342","line":"    try (EmitTestCase{","class":"lineCov","hits":"1","order":"5706","possible_hits":"1",},
{"lineNum":"  343","line":"        .inputNode = EmitTestCase.makeNode(","class":"lineCov","hits":"1","order":"5688","possible_hits":"1",},
{"lineNum":"  344","line":"            .Object,"},
{"lineNum":"  345","line":"            node.Object{","class":"lineCov","hits":"1","order":"5687","possible_hits":"1",},
{"lineNum":"  346","line":"                .items = &[_]node.ObjectProperty{","class":"lineCov","hits":"1","order":"5686","possible_hits":"1",},
{"lineNum":"  347","line":"                    node.ObjectProperty.new(","class":"lineCov","hits":"2","order":"5680","possible_hits":"2",},
{"lineNum":"  348","line":"                        EmitTestCase.makeNode(.Ident, \"a\"),","class":"lineCov","hits":"1","order":"5681","possible_hits":"1",},
{"lineNum":"  349","line":"                        EmitTestCase.makeNode(.Int, \"0\"),","class":"lineCov","hits":"1","order":"5682","possible_hits":"1",},
{"lineNum":"  350","line":"                    ),"},
{"lineNum":"  351","line":"                    node.ObjectProperty.new(","class":"lineCov","hits":"2","order":"5683","possible_hits":"2",},
{"lineNum":"  352","line":"                        EmitTestCase.makeNode(.String, \"\'b\'\"),","class":"lineCov","hits":"1","order":"5684","possible_hits":"1",},
{"lineNum":"  353","line":"                        EmitTestCase.makeNode(.Float, \"0.0\"),","class":"lineCov","hits":"1","order":"5685","possible_hits":"1",},
{"lineNum":"  354","line":"                    ),"},
{"lineNum":"  355","line":"                },"},
{"lineNum":"  356","line":"            },"},
{"lineNum":"  357","line":"        ),"},
{"lineNum":"  358","line":"        .expectedOutput = \"{ a: 0, \'b\': 0.0, };\\n\",","class":"lineCov","hits":"1","order":"5689","possible_hits":"1",},
{"lineNum":"  359","line":"        .cleanup = (struct {","class":"lineCov","hits":"1","order":"5690","possible_hits":"1",},
{"lineNum":"  360","line":"            fn cleanup(alloc: Allocator, nd: Node) void {","class":"lineCov","hits":"2","order":"5701","possible_hits":"2",},
{"lineNum":"  361","line":"                alloc.destroy(nd.data.Object.items[0].key);","class":"lineCov","hits":"1","order":"5702","possible_hits":"1",},
{"lineNum":"  362","line":"                alloc.destroy(nd.data.Object.items[0].value);","class":"lineCov","hits":"1","order":"5703","possible_hits":"1",},
{"lineNum":"  363","line":"                alloc.destroy(nd.data.Object.items[1].key);","class":"lineCov","hits":"1","order":"5704","possible_hits":"1",},
{"lineNum":"  364","line":"                alloc.destroy(nd.data.Object.items[1].value);","class":"lineCov","hits":"1","order":"5705","possible_hits":"1",},
{"lineNum":"  365","line":"            }"},
{"lineNum":"  366","line":"        }).cleanup,"},
{"lineNum":"  367","line":"    }).run();","class":"lineCov","hits":"1","order":"5691","possible_hits":"1",},
{"lineNum":"  368","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-13 17:15:16", "instrumented" : 227, "covered" : 225,};
var merged_data = [];
