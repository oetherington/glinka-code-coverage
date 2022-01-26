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
{"lineNum":"   28","line":"pub fn emitExpr(self: JsBackend, value: Node) Backend.Error!void {","class":"lineCov","hits":"2","order":"5563","possible_hits":"2",},
{"lineNum":"   29","line":"    try switch (value.data) {","class":"lineCov","hits":"19","order":"5564","possible_hits":"19",},
{"lineNum":"   30","line":"        .Ident => |i| self.out.print(\"{s}\", .{i}),","class":"lineCov","hits":"1","order":"5714","possible_hits":"1",},
{"lineNum":"   31","line":"        .Int => |i| self.out.print(\"{s}\", .{i}),","class":"lineCov","hits":"1","order":"5680","possible_hits":"1",},
{"lineNum":"   32","line":"        .Float => |f| self.out.print(\"{s}\", .{f}),","class":"lineCov","hits":"1","order":"6336","possible_hits":"1",},
{"lineNum":"   33","line":"        .String => |s| self.out.print(\"{s}\", .{s}),","class":"lineCov","hits":"1","order":"5679","possible_hits":"1",},
{"lineNum":"   34","line":"        .Template => |t| self.out.print(\"{s}\", .{t}),","class":"lineCov","hits":"1","order":"6148","possible_hits":"1",},
{"lineNum":"   35","line":"        .True => self.out.print(\"true\", .{}),","class":"lineCov","hits":"1","order":"5617","possible_hits":"1",},
{"lineNum":"   36","line":"        .False => self.out.print(\"false\", .{}),","class":"lineCov","hits":"1","order":"5639","possible_hits":"1",},
{"lineNum":"   37","line":"        .Null => self.out.print(\"null\", .{}),","class":"lineCov","hits":"1","order":"5565","possible_hits":"1",},
{"lineNum":"   38","line":"        .Undefined => self.out.print(\"undefined\", .{}),","class":"lineCov","hits":"1","order":"5640","possible_hits":"1",},
{"lineNum":"   39","line":"        .PrefixOp => |op| {","class":"lineCov","hits":"2","order":"6176","possible_hits":"2",},
{"lineNum":"   40","line":"            try self.out.print(\"({s}\", .{try opToString(op.op)});","class":"lineCov","hits":"1","order":"6177","possible_hits":"1",},
{"lineNum":"   41","line":"            try self.emitExpr(op.expr);","class":"lineCov","hits":"1","order":"6181","possible_hits":"1",},
{"lineNum":"   42","line":"            try self.out.print(\")\", .{});","class":"lineCov","hits":"1","order":"6182","possible_hits":"1",},
{"lineNum":"   43","line":"        },"},
{"lineNum":"   44","line":"        .PostfixOp => |op| {","class":"lineCov","hits":"2","order":"6193","possible_hits":"2",},
{"lineNum":"   45","line":"            try self.out.print(\"(\", .{});","class":"lineCov","hits":"1","order":"6194","possible_hits":"1",},
{"lineNum":"   46","line":"            try self.emitExpr(op.expr);","class":"lineCov","hits":"1","order":"6195","possible_hits":"1",},
{"lineNum":"   47","line":"            try self.out.print(\"{s})\", .{try opToString(op.op)});","class":"lineCov","hits":"1","order":"6196","possible_hits":"1",},
{"lineNum":"   48","line":"        },"},
{"lineNum":"   49","line":"        .BinaryOp => |op| {","class":"lineCov","hits":"2","order":"6209","possible_hits":"2",},
{"lineNum":"   50","line":"            try self.out.print(\"(\", .{});","class":"lineCov","hits":"1","order":"6210","possible_hits":"1",},
{"lineNum":"   51","line":"            try self.emitExpr(op.left);","class":"lineCov","hits":"1","order":"6211","possible_hits":"1",},
{"lineNum":"   52","line":"            try self.out.print(\"{s}\", .{try opToString(op.op)});","class":"lineCov","hits":"1","order":"6212","possible_hits":"1",},
{"lineNum":"   53","line":"            try self.emitExpr(op.right);","class":"lineCov","hits":"1","order":"6214","possible_hits":"1",},
{"lineNum":"   54","line":"            try self.out.print(\")\", .{});","class":"lineCov","hits":"1","order":"6215","possible_hits":"1",},
{"lineNum":"   55","line":"        },"},
{"lineNum":"   56","line":"        .Ternary => |trn| {","class":"lineCov","hits":"2","order":"6228","possible_hits":"2",},
{"lineNum":"   57","line":"            try self.out.print(\"(\", .{});","class":"lineCov","hits":"1","order":"6229","possible_hits":"1",},
{"lineNum":"   58","line":"            try self.emitExpr(trn.cond);","class":"lineCov","hits":"1","order":"6230","possible_hits":"1",},
{"lineNum":"   59","line":"            try self.out.print(\"?\", .{});","class":"lineCov","hits":"1","order":"6231","possible_hits":"1",},
{"lineNum":"   60","line":"            try self.emitExpr(trn.ifTrue);","class":"lineCov","hits":"1","order":"6232","possible_hits":"1",},
{"lineNum":"   61","line":"            try self.out.print(\":\", .{});","class":"lineCov","hits":"1","order":"6233","possible_hits":"1",},
{"lineNum":"   62","line":"            try self.emitExpr(trn.ifFalse);","class":"lineCov","hits":"1","order":"6234","possible_hits":"1",},
{"lineNum":"   63","line":"            try self.out.print(\")\", .{});","class":"lineCov","hits":"1","order":"6235","possible_hits":"1",},
{"lineNum":"   64","line":"        },"},
{"lineNum":"   65","line":"        .Call => |call| {","class":"lineCov","hits":"2","order":"6251","possible_hits":"2",},
{"lineNum":"   66","line":"            try self.out.print(\"(\", .{});","class":"lineCov","hits":"1","order":"6252","possible_hits":"1",},
{"lineNum":"   67","line":"            try self.emitExpr(call.expr);","class":"lineCov","hits":"1","order":"6253","possible_hits":"1",},
{"lineNum":"   68","line":"            try self.out.print(\"(\", .{});","class":"lineCov","hits":"1","order":"6254","possible_hits":"1",},
{"lineNum":"   69","line":""},
{"lineNum":"   70","line":"            var prefix: []const u8 = \"\";","class":"lineCov","hits":"1","order":"6255","possible_hits":"1",},
{"lineNum":"   71","line":"            for (call.args.items) |arg| {","class":"lineCov","hits":"2","order":"6256","possible_hits":"2",},
{"lineNum":"   72","line":"                try self.out.print(\"{s}\", .{prefix});","class":"lineCov","hits":"1","order":"6257","possible_hits":"1",},
{"lineNum":"   73","line":"                try self.emitExpr(arg);","class":"lineCov","hits":"1","order":"6258","possible_hits":"1",},
{"lineNum":"   74","line":"                prefix = \", \";","class":"lineCov","hits":"1","order":"6259","possible_hits":"1",},
{"lineNum":"   75","line":"            }"},
{"lineNum":"   76","line":""},
{"lineNum":"   77","line":"            try self.out.print(\"))\", .{});","class":"lineCov","hits":"1","order":"6260","possible_hits":"1",},
{"lineNum":"   78","line":"        },"},
{"lineNum":"   79","line":"        .Array => |arr| {","class":"lineCov","hits":"2","order":"6276","possible_hits":"2",},
{"lineNum":"   80","line":"            try self.out.print(\"[ \", .{});","class":"lineCov","hits":"1","order":"6277","possible_hits":"1",},
{"lineNum":"   81","line":""},
{"lineNum":"   82","line":"            for (arr.items) |item| {","class":"lineCov","hits":"2","order":"6278","possible_hits":"2",},
{"lineNum":"   83","line":"                try self.emitExpr(item);","class":"lineCov","hits":"1","order":"6279","possible_hits":"1",},
{"lineNum":"   84","line":"                try self.out.print(\", \", .{});","class":"lineCov","hits":"1","order":"6280","possible_hits":"1",},
{"lineNum":"   85","line":"            }"},
{"lineNum":"   86","line":""},
{"lineNum":"   87","line":"            try self.out.print(\"]\", .{});","class":"lineCov","hits":"1","order":"6281","possible_hits":"1",},
{"lineNum":"   88","line":"        },"},
{"lineNum":"   89","line":"        .ArrayAccess => |access| {","class":"lineCov","hits":"2","order":"6294","possible_hits":"2",},
{"lineNum":"   90","line":"            try self.emitExpr(access.expr);","class":"lineCov","hits":"1","order":"6295","possible_hits":"1",},
{"lineNum":"   91","line":"            try self.out.print(\"[\", .{});","class":"lineCov","hits":"1","order":"6296","possible_hits":"1",},
{"lineNum":"   92","line":"            try self.emitExpr(access.index);","class":"lineCov","hits":"1","order":"6297","possible_hits":"1",},
{"lineNum":"   93","line":"            try self.out.print(\"]\", .{});","class":"lineCov","hits":"1","order":"6298","possible_hits":"1",},
{"lineNum":"   94","line":"        },"},
{"lineNum":"   95","line":"        .Dot => |dot| {","class":"lineCov","hits":"2","order":"6310","possible_hits":"2",},
{"lineNum":"   96","line":"            try self.emitExpr(dot.expr);","class":"lineCov","hits":"1","order":"6311","possible_hits":"1",},
{"lineNum":"   97","line":"            try self.out.print(\".{s}\", .{dot.ident});","class":"lineCov","hits":"1","order":"6312","possible_hits":"1",},
{"lineNum":"   98","line":"        },"},
{"lineNum":"   99","line":"        .Object => |obj| {","class":"lineCov","hits":"2","order":"6329","possible_hits":"2",},
{"lineNum":"  100","line":"            try self.out.print(\"{{ \", .{});","class":"lineCov","hits":"1","order":"6330","possible_hits":"1",},
{"lineNum":"  101","line":"            for (obj.items) |prop| {","class":"lineCov","hits":"2","order":"6331","possible_hits":"2",},
{"lineNum":"  102","line":"                try self.emitExpr(prop.key);","class":"lineCov","hits":"1","order":"6332","possible_hits":"1",},
{"lineNum":"  103","line":"                try self.out.print(\": \", .{});","class":"lineCov","hits":"1","order":"6333","possible_hits":"1",},
{"lineNum":"  104","line":"                try self.emitExpr(prop.value);","class":"lineCov","hits":"1","order":"6334","possible_hits":"1",},
{"lineNum":"  105","line":"                try self.out.print(\", \", .{});","class":"lineCov","hits":"1","order":"6335","possible_hits":"1",},
{"lineNum":"  106","line":"            }"},
{"lineNum":"  107","line":"            try self.out.print(\"}}\", .{});","class":"lineCov","hits":"1","order":"6337","possible_hits":"1",},
{"lineNum":"  108","line":"        },"},
{"lineNum":"  109","line":"        else => std.debug.panic(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  110","line":"            \"Invalid Node type in emitExpr: {?}\","},
{"lineNum":"  111","line":"            .{value},","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  112","line":"        ),"},
{"lineNum":"  113","line":"    };"},
{"lineNum":"  114","line":"}"},
{"lineNum":"  115","line":""},
{"lineNum":"  116","line":"test \"JsBackend can emit ident expression\" {","class":"lineCov","hits":"2","order":"6123","possible_hits":"2",},
{"lineNum":"  117","line":"    try (EmitTestCase{","class":"lineCov","hits":"2","order":"6126","possible_hits":"2",},
{"lineNum":"  118","line":"        .inputNode = EmitTestCase.makeNode(.Ident, \"anIdentifier\"),","class":"lineCov","hits":"1","order":"6124","possible_hits":"1",},
{"lineNum":"  119","line":"        .expectedOutput = \"anIdentifier;\\n\",","class":"lineCov","hits":"1","order":"6125","possible_hits":"1",},
{"lineNum":"  120","line":"    }).run();","class":"lineCov","hits":"1","order":"6127","possible_hits":"1",},
{"lineNum":"  121","line":"}"},
{"lineNum":"  122","line":""},
{"lineNum":"  123","line":"test \"JsBackend can emit int expression\" {","class":"lineCov","hits":"2","order":"6128","possible_hits":"2",},
{"lineNum":"  124","line":"    try (EmitTestCase{","class":"lineCov","hits":"2","order":"6131","possible_hits":"2",},
{"lineNum":"  125","line":"        .inputNode = EmitTestCase.makeNode(.Int, \"123\"),","class":"lineCov","hits":"1","order":"6129","possible_hits":"1",},
{"lineNum":"  126","line":"        .expectedOutput = \"123;\\n\",","class":"lineCov","hits":"1","order":"6130","possible_hits":"1",},
{"lineNum":"  127","line":"    }).run();","class":"lineCov","hits":"1","order":"6132","possible_hits":"1",},
{"lineNum":"  128","line":"}"},
{"lineNum":"  129","line":""},
{"lineNum":"  130","line":"test \"JsBackend can emit float expression\" {","class":"lineCov","hits":"2","order":"6133","possible_hits":"2",},
{"lineNum":"  131","line":"    try (EmitTestCase{","class":"lineCov","hits":"2","order":"6136","possible_hits":"2",},
{"lineNum":"  132","line":"        .inputNode = EmitTestCase.makeNode(.Int, \"123.456\"),","class":"lineCov","hits":"1","order":"6134","possible_hits":"1",},
{"lineNum":"  133","line":"        .expectedOutput = \"123.456;\\n\",","class":"lineCov","hits":"1","order":"6135","possible_hits":"1",},
{"lineNum":"  134","line":"    }).run();","class":"lineCov","hits":"1","order":"6137","possible_hits":"1",},
{"lineNum":"  135","line":"}"},
{"lineNum":"  136","line":""},
{"lineNum":"  137","line":"test \"JsBackend can emit string expression\" {","class":"lineCov","hits":"2","order":"6138","possible_hits":"2",},
{"lineNum":"  138","line":"    try (EmitTestCase{","class":"lineCov","hits":"2","order":"6141","possible_hits":"2",},
{"lineNum":"  139","line":"        .inputNode = EmitTestCase.makeNode(.String, \"\'a test string\'\"),","class":"lineCov","hits":"1","order":"6139","possible_hits":"1",},
{"lineNum":"  140","line":"        .expectedOutput = \"\'a test string\';\\n\",","class":"lineCov","hits":"1","order":"6140","possible_hits":"1",},
{"lineNum":"  141","line":"    }).run();","class":"lineCov","hits":"1","order":"6142","possible_hits":"1",},
{"lineNum":"  142","line":"}"},
{"lineNum":"  143","line":""},
{"lineNum":"  144","line":"test \"JsBackend can emit template expression\" {","class":"lineCov","hits":"2","order":"6143","possible_hits":"2",},
{"lineNum":"  145","line":"    try (EmitTestCase{","class":"lineCov","hits":"2","order":"6146","possible_hits":"2",},
{"lineNum":"  146","line":"        .inputNode = EmitTestCase.makeNode(.Template, \"`a test template`\"),","class":"lineCov","hits":"1","order":"6144","possible_hits":"1",},
{"lineNum":"  147","line":"        .expectedOutput = \"`a test template`;\\n\",","class":"lineCov","hits":"1","order":"6145","possible_hits":"1",},
{"lineNum":"  148","line":"    }).run();","class":"lineCov","hits":"1","order":"6147","possible_hits":"1",},
{"lineNum":"  149","line":"}"},
{"lineNum":"  150","line":""},
{"lineNum":"  151","line":"test \"JsBackend can emit \'true\' expression\" {","class":"lineCov","hits":"2","order":"6149","possible_hits":"2",},
{"lineNum":"  152","line":"    try (EmitTestCase{","class":"lineCov","hits":"2","order":"6152","possible_hits":"2",},
{"lineNum":"  153","line":"        .inputNode = EmitTestCase.makeNode(.True, {}),","class":"lineCov","hits":"1","order":"6150","possible_hits":"1",},
{"lineNum":"  154","line":"        .expectedOutput = \"true;\\n\",","class":"lineCov","hits":"1","order":"6151","possible_hits":"1",},
{"lineNum":"  155","line":"    }).run();","class":"lineCov","hits":"1","order":"6153","possible_hits":"1",},
{"lineNum":"  156","line":"}"},
{"lineNum":"  157","line":""},
{"lineNum":"  158","line":"test \"JsBackend can emit \'false\' expression\" {","class":"lineCov","hits":"2","order":"6154","possible_hits":"2",},
{"lineNum":"  159","line":"    try (EmitTestCase{","class":"lineCov","hits":"2","order":"6157","possible_hits":"2",},
{"lineNum":"  160","line":"        .inputNode = EmitTestCase.makeNode(.False, {}),","class":"lineCov","hits":"1","order":"6155","possible_hits":"1",},
{"lineNum":"  161","line":"        .expectedOutput = \"false;\\n\",","class":"lineCov","hits":"1","order":"6156","possible_hits":"1",},
{"lineNum":"  162","line":"    }).run();","class":"lineCov","hits":"1","order":"6158","possible_hits":"1",},
{"lineNum":"  163","line":"}"},
{"lineNum":"  164","line":""},
{"lineNum":"  165","line":"test \"JsBackend can emit \'null\' expression\" {","class":"lineCov","hits":"2","order":"6159","possible_hits":"2",},
{"lineNum":"  166","line":"    try (EmitTestCase{","class":"lineCov","hits":"2","order":"6162","possible_hits":"2",},
{"lineNum":"  167","line":"        .inputNode = EmitTestCase.makeNode(.Null, {}),","class":"lineCov","hits":"1","order":"6160","possible_hits":"1",},
{"lineNum":"  168","line":"        .expectedOutput = \"null;\\n\",","class":"lineCov","hits":"1","order":"6161","possible_hits":"1",},
{"lineNum":"  169","line":"    }).run();","class":"lineCov","hits":"1","order":"6163","possible_hits":"1",},
{"lineNum":"  170","line":"}"},
{"lineNum":"  171","line":""},
{"lineNum":"  172","line":"test \"JsBackend can emit \'undefined\' expression\" {","class":"lineCov","hits":"2","order":"6164","possible_hits":"2",},
{"lineNum":"  173","line":"    try (EmitTestCase{","class":"lineCov","hits":"2","order":"6167","possible_hits":"2",},
{"lineNum":"  174","line":"        .inputNode = EmitTestCase.makeNode(.Undefined, {}),","class":"lineCov","hits":"1","order":"6165","possible_hits":"1",},
{"lineNum":"  175","line":"        .expectedOutput = \"undefined;\\n\",","class":"lineCov","hits":"1","order":"6166","possible_hits":"1",},
{"lineNum":"  176","line":"    }).run();","class":"lineCov","hits":"1","order":"6168","possible_hits":"1",},
{"lineNum":"  177","line":"}"},
{"lineNum":"  178","line":""},
{"lineNum":"  179","line":"test \"JsBackend can emit prefix op expression\" {","class":"lineCov","hits":"2","order":"6169","possible_hits":"2",},
{"lineNum":"  180","line":"    try (EmitTestCase{","class":"lineCov","hits":"1","order":"6185","possible_hits":"1",},
{"lineNum":"  181","line":"        .inputNode = EmitTestCase.makeNode(","class":"lineCov","hits":"1","order":"6172","possible_hits":"1",},
{"lineNum":"  182","line":"            .PrefixOp,"},
{"lineNum":"  183","line":"            node.UnaryOp{"},
{"lineNum":"  184","line":"                .op = .Inc,","class":"lineCov","hits":"1","order":"6171","possible_hits":"1",},
{"lineNum":"  185","line":"                .expr = EmitTestCase.makeNode(.Ident, \"a\"),","class":"lineCov","hits":"1","order":"6170","possible_hits":"1",},
{"lineNum":"  186","line":"            },"},
{"lineNum":"  187","line":"        ),"},
{"lineNum":"  188","line":"        .expectedOutput = \"(++a);\\n\",","class":"lineCov","hits":"1","order":"6173","possible_hits":"1",},
{"lineNum":"  189","line":"        .cleanup = (struct {","class":"lineCov","hits":"1","order":"6174","possible_hits":"1",},
{"lineNum":"  190","line":"            fn cleanup(alloc: Allocator, nd: Node) void {","class":"lineCov","hits":"2","order":"6183","possible_hits":"2",},
{"lineNum":"  191","line":"                alloc.destroy(nd.data.PrefixOp.expr);","class":"linePartCov","hits":"1","order":"6184","possible_hits":"2",},
{"lineNum":"  192","line":"            }"},
{"lineNum":"  193","line":"        }).cleanup,"},
{"lineNum":"  194","line":"    }).run();","class":"lineCov","hits":"1","order":"6175","possible_hits":"1",},
{"lineNum":"  195","line":"}"},
{"lineNum":"  196","line":""},
{"lineNum":"  197","line":"test \"JsBackend can emit postfix op expression\" {","class":"lineCov","hits":"2","order":"6186","possible_hits":"2",},
{"lineNum":"  198","line":"    try (EmitTestCase{","class":"lineCov","hits":"1","order":"6200","possible_hits":"1",},
{"lineNum":"  199","line":"        .inputNode = EmitTestCase.makeNode(","class":"lineCov","hits":"1","order":"6189","possible_hits":"1",},
{"lineNum":"  200","line":"            .PostfixOp,"},
{"lineNum":"  201","line":"            node.UnaryOp{"},
{"lineNum":"  202","line":"                .op = .Dec,","class":"lineCov","hits":"1","order":"6188","possible_hits":"1",},
{"lineNum":"  203","line":"                .expr = EmitTestCase.makeNode(.Ident, \"a\"),","class":"lineCov","hits":"1","order":"6187","possible_hits":"1",},
{"lineNum":"  204","line":"            },"},
{"lineNum":"  205","line":"        ),"},
{"lineNum":"  206","line":"        .expectedOutput = \"(a--);\\n\",","class":"lineCov","hits":"1","order":"6190","possible_hits":"1",},
{"lineNum":"  207","line":"        .cleanup = (struct {","class":"lineCov","hits":"1","order":"6191","possible_hits":"1",},
{"lineNum":"  208","line":"            fn cleanup(alloc: Allocator, nd: Node) void {","class":"lineCov","hits":"2","order":"6198","possible_hits":"2",},
{"lineNum":"  209","line":"                alloc.destroy(nd.data.PostfixOp.expr);","class":"linePartCov","hits":"1","order":"6199","possible_hits":"2",},
{"lineNum":"  210","line":"            }"},
{"lineNum":"  211","line":"        }).cleanup,"},
{"lineNum":"  212","line":"    }).run();","class":"lineCov","hits":"1","order":"6192","possible_hits":"1",},
{"lineNum":"  213","line":"}"},
{"lineNum":"  214","line":""},
{"lineNum":"  215","line":"test \"JsBackend can emit binary op expression\" {","class":"lineCov","hits":"2","order":"6201","possible_hits":"2",},
{"lineNum":"  216","line":"    try (EmitTestCase{","class":"lineCov","hits":"1","order":"6219","possible_hits":"1",},
{"lineNum":"  217","line":"        .inputNode = EmitTestCase.makeNode(","class":"lineCov","hits":"1","order":"6205","possible_hits":"1",},
{"lineNum":"  218","line":"            .BinaryOp,"},
{"lineNum":"  219","line":"            node.BinaryOp{"},
{"lineNum":"  220","line":"                .op = .Add,","class":"lineCov","hits":"1","order":"6204","possible_hits":"1",},
{"lineNum":"  221","line":"                .left = EmitTestCase.makeNode(.Ident, \"a\"),","class":"lineCov","hits":"1","order":"6202","possible_hits":"1",},
{"lineNum":"  222","line":"                .right = EmitTestCase.makeNode(.Int, \"4\"),","class":"lineCov","hits":"1","order":"6203","possible_hits":"1",},
{"lineNum":"  223","line":"            },"},
{"lineNum":"  224","line":"        ),"},
{"lineNum":"  225","line":"        .expectedOutput = \"(a+4);\\n\",","class":"lineCov","hits":"1","order":"6206","possible_hits":"1",},
{"lineNum":"  226","line":"        .cleanup = (struct {","class":"lineCov","hits":"1","order":"6207","possible_hits":"1",},
{"lineNum":"  227","line":"            fn cleanup(alloc: Allocator, nd: Node) void {","class":"lineCov","hits":"2","order":"6216","possible_hits":"2",},
{"lineNum":"  228","line":"                alloc.destroy(nd.data.BinaryOp.left);","class":"linePartCov","hits":"1","order":"6217","possible_hits":"2",},
{"lineNum":"  229","line":"                alloc.destroy(nd.data.BinaryOp.right);","class":"linePartCov","hits":"2","order":"6218","possible_hits":"3",},
{"lineNum":"  230","line":"            }"},
{"lineNum":"  231","line":"        }).cleanup,"},
{"lineNum":"  232","line":"    }).run();","class":"lineCov","hits":"1","order":"6208","possible_hits":"1",},
{"lineNum":"  233","line":"}"},
{"lineNum":"  234","line":""},
{"lineNum":"  235","line":"test \"JsBackend can emit ternary expression\" {","class":"lineCov","hits":"2","order":"6220","possible_hits":"2",},
{"lineNum":"  236","line":"    try (EmitTestCase{","class":"lineCov","hits":"1","order":"6240","possible_hits":"1",},
{"lineNum":"  237","line":"        .inputNode = EmitTestCase.makeNode(","class":"lineCov","hits":"1","order":"6224","possible_hits":"1",},
{"lineNum":"  238","line":"            .Ternary,"},
{"lineNum":"  239","line":"            node.Ternary{"},
{"lineNum":"  240","line":"                .cond = EmitTestCase.makeNode(.Ident, \"a\"),","class":"lineCov","hits":"1","order":"6221","possible_hits":"1",},
{"lineNum":"  241","line":"                .ifTrue = EmitTestCase.makeNode(.Int, \"3\"),","class":"lineCov","hits":"1","order":"6222","possible_hits":"1",},
{"lineNum":"  242","line":"                .ifFalse = EmitTestCase.makeNode(.False, {}),","class":"lineCov","hits":"1","order":"6223","possible_hits":"1",},
{"lineNum":"  243","line":"            },"},
{"lineNum":"  244","line":"        ),"},
{"lineNum":"  245","line":"        .expectedOutput = \"(a?3:false);\\n\",","class":"lineCov","hits":"1","order":"6225","possible_hits":"1",},
{"lineNum":"  246","line":"        .cleanup = (struct {","class":"lineCov","hits":"1","order":"6226","possible_hits":"1",},
{"lineNum":"  247","line":"            fn cleanup(alloc: Allocator, nd: Node) void {","class":"lineCov","hits":"2","order":"6236","possible_hits":"2",},
{"lineNum":"  248","line":"                alloc.destroy(nd.data.Ternary.cond);","class":"linePartCov","hits":"1","order":"6237","possible_hits":"2",},
{"lineNum":"  249","line":"                alloc.destroy(nd.data.Ternary.ifTrue);","class":"linePartCov","hits":"2","order":"6238","possible_hits":"3",},
{"lineNum":"  250","line":"                alloc.destroy(nd.data.Ternary.ifFalse);","class":"linePartCov","hits":"2","order":"6239","possible_hits":"3",},
{"lineNum":"  251","line":"            }"},
{"lineNum":"  252","line":"        }).cleanup,"},
{"lineNum":"  253","line":"    }).run();","class":"lineCov","hits":"1","order":"6227","possible_hits":"1",},
{"lineNum":"  254","line":"}"},
{"lineNum":"  255","line":""},
{"lineNum":"  256","line":"test \"JsBackend can emit function call expression\" {","class":"lineCov","hits":"2","order":"6241","possible_hits":"2",},
{"lineNum":"  257","line":"    try (EmitTestCase{","class":"lineCov","hits":"1","order":"6265","possible_hits":"1",},
{"lineNum":"  258","line":"        .inputNode = EmitTestCase.makeNode(","class":"lineCov","hits":"1","order":"6247","possible_hits":"1",},
{"lineNum":"  259","line":"            .Call,"},
{"lineNum":"  260","line":"            node.Call{"},
{"lineNum":"  261","line":"                .expr = EmitTestCase.makeNode(.Ident, \"aFunction\"),","class":"lineCov","hits":"1","order":"6242","possible_hits":"1",},
{"lineNum":"  262","line":"                .args = node.NodeList{","class":"lineCov","hits":"1","order":"6246","possible_hits":"1",},
{"lineNum":"  263","line":"                    .items = &[_]Node{","class":"lineCov","hits":"1","order":"6245","possible_hits":"1",},
{"lineNum":"  264","line":"                        EmitTestCase.makeNode(.Int, \"4\"),","class":"lineCov","hits":"1","order":"6243","possible_hits":"1",},
{"lineNum":"  265","line":"                        EmitTestCase.makeNode(.String, \"\'a\'\"),","class":"lineCov","hits":"1","order":"6244","possible_hits":"1",},
{"lineNum":"  266","line":"                    },"},
{"lineNum":"  267","line":"                },"},
{"lineNum":"  268","line":"            },"},
{"lineNum":"  269","line":"        ),"},
{"lineNum":"  270","line":"        .expectedOutput = \"(aFunction(4, \'a\'));\\n\",","class":"lineCov","hits":"1","order":"6248","possible_hits":"1",},
{"lineNum":"  271","line":"        .cleanup = (struct {","class":"lineCov","hits":"1","order":"6249","possible_hits":"1",},
{"lineNum":"  272","line":"            fn cleanup(alloc: Allocator, nd: Node) void {","class":"lineCov","hits":"2","order":"6261","possible_hits":"2",},
{"lineNum":"  273","line":"                alloc.destroy(nd.data.Call.expr);","class":"linePartCov","hits":"1","order":"6262","possible_hits":"2",},
{"lineNum":"  274","line":"                alloc.destroy(nd.data.Call.args.items[0]);","class":"lineCov","hits":"2","order":"6263","possible_hits":"2",},
{"lineNum":"  275","line":"                alloc.destroy(nd.data.Call.args.items[1]);","class":"lineCov","hits":"1","order":"6264","possible_hits":"1",},
{"lineNum":"  276","line":"            }"},
{"lineNum":"  277","line":"        }).cleanup,"},
{"lineNum":"  278","line":"    }).run();","class":"lineCov","hits":"1","order":"6250","possible_hits":"1",},
{"lineNum":"  279","line":"}"},
{"lineNum":"  280","line":""},
{"lineNum":"  281","line":"test \"JsBackend can emit array literal expression\" {","class":"lineCov","hits":"2","order":"6266","possible_hits":"2",},
{"lineNum":"  282","line":"    try (EmitTestCase{","class":"lineCov","hits":"1","order":"6286","possible_hits":"1",},
{"lineNum":"  283","line":"        .inputNode = EmitTestCase.makeNode(","class":"lineCov","hits":"1","order":"6272","possible_hits":"1",},
{"lineNum":"  284","line":"            .Array,"},
{"lineNum":"  285","line":"            node.NodeList{","class":"lineCov","hits":"1","order":"6271","possible_hits":"1",},
{"lineNum":"  286","line":"                .items = &[_]Node{","class":"lineCov","hits":"1","order":"6270","possible_hits":"1",},
{"lineNum":"  287","line":"                    EmitTestCase.makeNode(.Int, \"1\"),","class":"lineCov","hits":"1","order":"6267","possible_hits":"1",},
{"lineNum":"  288","line":"                    EmitTestCase.makeNode(.String, \"\'a\'\"),","class":"lineCov","hits":"1","order":"6268","possible_hits":"1",},
{"lineNum":"  289","line":"                    EmitTestCase.makeNode(.Null, {}),","class":"lineCov","hits":"1","order":"6269","possible_hits":"1",},
{"lineNum":"  290","line":"                },"},
{"lineNum":"  291","line":"            },"},
{"lineNum":"  292","line":"        ),"},
{"lineNum":"  293","line":"        .expectedOutput = \"[ 1, \'a\', null, ];\\n\",","class":"lineCov","hits":"1","order":"6273","possible_hits":"1",},
{"lineNum":"  294","line":"        .cleanup = (struct {","class":"lineCov","hits":"1","order":"6274","possible_hits":"1",},
{"lineNum":"  295","line":"            fn cleanup(alloc: Allocator, nd: Node) void {","class":"lineCov","hits":"2","order":"6282","possible_hits":"2",},
{"lineNum":"  296","line":"                alloc.destroy(nd.data.Array.items[0]);","class":"lineCov","hits":"1","order":"6283","possible_hits":"1",},
{"lineNum":"  297","line":"                alloc.destroy(nd.data.Array.items[1]);","class":"lineCov","hits":"1","order":"6284","possible_hits":"1",},
{"lineNum":"  298","line":"                alloc.destroy(nd.data.Array.items[2]);","class":"lineCov","hits":"1","order":"6285","possible_hits":"1",},
{"lineNum":"  299","line":"            }"},
{"lineNum":"  300","line":"        }).cleanup,"},
{"lineNum":"  301","line":"    }).run();","class":"lineCov","hits":"1","order":"6275","possible_hits":"1",},
{"lineNum":"  302","line":"}"},
{"lineNum":"  303","line":""},
{"lineNum":"  304","line":"test \"JsBackend can emit array access expression\" {","class":"lineCov","hits":"2","order":"6287","possible_hits":"2",},
{"lineNum":"  305","line":"    try (EmitTestCase{","class":"lineCov","hits":"1","order":"6302","possible_hits":"1",},
{"lineNum":"  306","line":"        .inputNode = EmitTestCase.makeNode(","class":"lineCov","hits":"1","order":"6290","possible_hits":"1",},
{"lineNum":"  307","line":"            .ArrayAccess,"},
{"lineNum":"  308","line":"            node.ArrayAccess{"},
{"lineNum":"  309","line":"                .expr = EmitTestCase.makeNode(.Ident, \"anArray\"),","class":"lineCov","hits":"1","order":"6288","possible_hits":"1",},
{"lineNum":"  310","line":"                .index = EmitTestCase.makeNode(.Int, \"1\"),","class":"lineCov","hits":"1","order":"6289","possible_hits":"1",},
{"lineNum":"  311","line":"            },"},
{"lineNum":"  312","line":"        ),"},
{"lineNum":"  313","line":"        .expectedOutput = \"anArray[1];\\n\",","class":"lineCov","hits":"1","order":"6291","possible_hits":"1",},
{"lineNum":"  314","line":"        .cleanup = (struct {","class":"lineCov","hits":"1","order":"6292","possible_hits":"1",},
{"lineNum":"  315","line":"            fn cleanup(alloc: Allocator, nd: Node) void {","class":"lineCov","hits":"2","order":"6299","possible_hits":"2",},
{"lineNum":"  316","line":"                alloc.destroy(nd.data.ArrayAccess.expr);","class":"linePartCov","hits":"1","order":"6300","possible_hits":"2",},
{"lineNum":"  317","line":"                alloc.destroy(nd.data.ArrayAccess.index);","class":"linePartCov","hits":"2","order":"6301","possible_hits":"3",},
{"lineNum":"  318","line":"            }"},
{"lineNum":"  319","line":"        }).cleanup,"},
{"lineNum":"  320","line":"    }).run();","class":"lineCov","hits":"1","order":"6293","possible_hits":"1",},
{"lineNum":"  321","line":"}"},
{"lineNum":"  322","line":""},
{"lineNum":"  323","line":"test \"JsBackend can emit dot expression\" {","class":"lineCov","hits":"2","order":"6303","possible_hits":"2",},
{"lineNum":"  324","line":"    try (EmitTestCase{","class":"lineCov","hits":"1","order":"6315","possible_hits":"1",},
{"lineNum":"  325","line":"        .inputNode = EmitTestCase.makeNode(","class":"lineCov","hits":"1","order":"6306","possible_hits":"1",},
{"lineNum":"  326","line":"            .Dot,"},
{"lineNum":"  327","line":"            node.Dot{"},
{"lineNum":"  328","line":"                .expr = EmitTestCase.makeNode(.Ident, \"anObject\"),","class":"lineCov","hits":"1","order":"6304","possible_hits":"1",},
{"lineNum":"  329","line":"                .ident = \"aProperty\",","class":"lineCov","hits":"1","order":"6305","possible_hits":"1",},
{"lineNum":"  330","line":"            },"},
{"lineNum":"  331","line":"        ),"},
{"lineNum":"  332","line":"        .expectedOutput = \"anObject.aProperty;\\n\",","class":"lineCov","hits":"1","order":"6307","possible_hits":"1",},
{"lineNum":"  333","line":"        .cleanup = (struct {","class":"lineCov","hits":"1","order":"6308","possible_hits":"1",},
{"lineNum":"  334","line":"            fn cleanup(alloc: Allocator, nd: Node) void {","class":"lineCov","hits":"2","order":"6313","possible_hits":"2",},
{"lineNum":"  335","line":"                alloc.destroy(nd.data.Dot.expr);","class":"linePartCov","hits":"1","order":"6314","possible_hits":"2",},
{"lineNum":"  336","line":"            }"},
{"lineNum":"  337","line":"        }).cleanup,"},
{"lineNum":"  338","line":"    }).run();","class":"lineCov","hits":"1","order":"6309","possible_hits":"1",},
{"lineNum":"  339","line":"}"},
{"lineNum":"  340","line":""},
{"lineNum":"  341","line":"test \"JsBackend can emit object literal expression\" {","class":"lineCov","hits":"2","order":"6316","possible_hits":"2",},
{"lineNum":"  342","line":"    try (EmitTestCase{","class":"lineCov","hits":"1","order":"6343","possible_hits":"1",},
{"lineNum":"  343","line":"        .inputNode = EmitTestCase.makeNode(","class":"lineCov","hits":"1","order":"6325","possible_hits":"1",},
{"lineNum":"  344","line":"            .Object,"},
{"lineNum":"  345","line":"            node.Object{","class":"lineCov","hits":"1","order":"6324","possible_hits":"1",},
{"lineNum":"  346","line":"                .items = &[_]node.ObjectProperty{","class":"lineCov","hits":"1","order":"6323","possible_hits":"1",},
{"lineNum":"  347","line":"                    node.ObjectProperty.new(","class":"lineCov","hits":"2","order":"6317","possible_hits":"2",},
{"lineNum":"  348","line":"                        EmitTestCase.makeNode(.Ident, \"a\"),","class":"lineCov","hits":"1","order":"6318","possible_hits":"1",},
{"lineNum":"  349","line":"                        EmitTestCase.makeNode(.Int, \"0\"),","class":"lineCov","hits":"1","order":"6319","possible_hits":"1",},
{"lineNum":"  350","line":"                    ),"},
{"lineNum":"  351","line":"                    node.ObjectProperty.new(","class":"lineCov","hits":"2","order":"6320","possible_hits":"2",},
{"lineNum":"  352","line":"                        EmitTestCase.makeNode(.String, \"\'b\'\"),","class":"lineCov","hits":"1","order":"6321","possible_hits":"1",},
{"lineNum":"  353","line":"                        EmitTestCase.makeNode(.Float, \"0.0\"),","class":"lineCov","hits":"1","order":"6322","possible_hits":"1",},
{"lineNum":"  354","line":"                    ),"},
{"lineNum":"  355","line":"                },"},
{"lineNum":"  356","line":"            },"},
{"lineNum":"  357","line":"        ),"},
{"lineNum":"  358","line":"        .expectedOutput = \"{ a: 0, \'b\': 0.0, };\\n\",","class":"lineCov","hits":"1","order":"6326","possible_hits":"1",},
{"lineNum":"  359","line":"        .cleanup = (struct {","class":"lineCov","hits":"1","order":"6327","possible_hits":"1",},
{"lineNum":"  360","line":"            fn cleanup(alloc: Allocator, nd: Node) void {","class":"lineCov","hits":"2","order":"6338","possible_hits":"2",},
{"lineNum":"  361","line":"                alloc.destroy(nd.data.Object.items[0].key);","class":"lineCov","hits":"1","order":"6339","possible_hits":"1",},
{"lineNum":"  362","line":"                alloc.destroy(nd.data.Object.items[0].value);","class":"lineCov","hits":"1","order":"6340","possible_hits":"1",},
{"lineNum":"  363","line":"                alloc.destroy(nd.data.Object.items[1].key);","class":"lineCov","hits":"1","order":"6341","possible_hits":"1",},
{"lineNum":"  364","line":"                alloc.destroy(nd.data.Object.items[1].value);","class":"lineCov","hits":"1","order":"6342","possible_hits":"1",},
{"lineNum":"  365","line":"            }"},
{"lineNum":"  366","line":"        }).cleanup,"},
{"lineNum":"  367","line":"    }).run();","class":"lineCov","hits":"1","order":"6328","possible_hits":"1",},
{"lineNum":"  368","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-26 08:59:51", "instrumented" : 227, "covered" : 225,};
var merged_data = [];
