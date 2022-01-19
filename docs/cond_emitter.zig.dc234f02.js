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
{"lineNum":"   26","line":"pub fn emitCond(self: *JsBackend, cond: node.If) Backend.Error!void {","class":"lineCov","hits":"2","order":"5479","possible_hits":"2",},
{"lineNum":"   27","line":"    for (cond.branches.items) |branch, index| {","class":"lineCov","hits":"2","order":"5480","possible_hits":"2",},
{"lineNum":"   28","line":"        try if (index == 0)","class":"lineCov","hits":"3","order":"5481","possible_hits":"3",},
{"lineNum":"   29","line":"            self.out.print(\"if (\", .{})","class":"lineCov","hits":"1","order":"5482","possible_hits":"1",},
{"lineNum":"   30","line":"        else"},
{"lineNum":"   31","line":"            self.out.print(\"else if (\", .{});","class":"lineCov","hits":"1","order":"5505","possible_hits":"1",},
{"lineNum":"   32","line":"        try self.emitExpr(branch.cond);","class":"lineCov","hits":"1","order":"5483","possible_hits":"1",},
{"lineNum":"   33","line":"        try self.out.print(\") \", .{});","class":"lineCov","hits":"1","order":"5485","possible_hits":"1",},
{"lineNum":"   34","line":"        try self.emitNode(branch.ifTrue);","class":"lineCov","hits":"1","order":"5486","possible_hits":"1",},
{"lineNum":"   35","line":"    }"},
{"lineNum":"   36","line":""},
{"lineNum":"   37","line":"    if (cond.elseBranch) |branch| {","class":"lineCov","hits":"2","order":"5487","possible_hits":"2",},
{"lineNum":"   38","line":"        try self.out.print(\"else \", .{});","class":"lineCov","hits":"1","order":"5525","possible_hits":"1",},
{"lineNum":"   39","line":"        try self.emitNode(branch);","class":"lineCov","hits":"1","order":"5526","possible_hits":"1",},
{"lineNum":"   40","line":"    }"},
{"lineNum":"   41","line":"}"},
{"lineNum":"   42","line":""},
{"lineNum":"   43","line":"test \"JsBackend can emit \'if\' statement\" {","class":"lineCov","hits":"3","order":"5467","possible_hits":"3",},
{"lineNum":"   44","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"    var branches = node.If.BranchList{};","class":"lineCov","hits":"1","order":"5468","possible_hits":"1",},
{"lineNum":"   47","line":"    defer branches.deinit(alloc);","class":"linePartCov","hits":"1","order":"5490","possible_hits":"3",},
{"lineNum":"   48","line":""},
{"lineNum":"   49","line":"    try branches.append(alloc, node.If.Branch{","class":"linePartCov","hits":"1","order":"5471","possible_hits":"2",},
{"lineNum":"   50","line":"        .cond = EmitTestCase.makeNode(.True, {}),","class":"lineCov","hits":"1","order":"5469","possible_hits":"1",},
{"lineNum":"   51","line":"        .ifTrue = EmitTestCase.makeNode(.Null, {}),","class":"lineCov","hits":"1","order":"5470","possible_hits":"1",},
{"lineNum":"   52","line":"    });"},
{"lineNum":"   53","line":"    defer alloc.destroy(branches.items[0].cond);","class":"linePartCov","hits":"1","order":"5489","possible_hits":"2",},
{"lineNum":"   54","line":"    defer alloc.destroy(branches.items[0].ifTrue);","class":"linePartCov","hits":"1","order":"5488","possible_hits":"3",},
{"lineNum":"   55","line":""},
{"lineNum":"   56","line":"    try (EmitTestCase{","class":"linePartCov","hits":"2","order":"5476","possible_hits":"3",},
{"lineNum":"   57","line":"        .inputNode = EmitTestCase.makeNode(.If, node.If{","class":"lineCov","hits":"1","order":"5474","possible_hits":"1",},
{"lineNum":"   58","line":"            .branches = branches,","class":"lineCov","hits":"1","order":"5472","possible_hits":"1",},
{"lineNum":"   59","line":"            .elseBranch = null,","class":"lineCov","hits":"1","order":"5473","possible_hits":"1",},
{"lineNum":"   60","line":"        }),"},
{"lineNum":"   61","line":"        .expectedOutput = \"if (true) null;\\n\",","class":"lineCov","hits":"1","order":"5475","possible_hits":"1",},
{"lineNum":"   62","line":"    }).run();","class":"lineCov","hits":"1","order":"5477","possible_hits":"1",},
{"lineNum":"   63","line":"}"},
{"lineNum":"   64","line":""},
{"lineNum":"   65","line":"test \"JsBackend can emit \'if\' statement with \'else if\'\" {","class":"lineCov","hits":"3","order":"5491","possible_hits":"3",},
{"lineNum":"   66","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"   67","line":""},
{"lineNum":"   68","line":"    var branches = node.If.BranchList{};","class":"lineCov","hits":"1","order":"5492","possible_hits":"1",},
{"lineNum":"   69","line":"    defer branches.deinit(alloc);","class":"linePartCov","hits":"1","order":"5512","possible_hits":"4",},
{"lineNum":"   70","line":""},
{"lineNum":"   71","line":"    try branches.append(alloc, node.If.Branch{","class":"linePartCov","hits":"1","order":"5495","possible_hits":"2",},
{"lineNum":"   72","line":"        .cond = EmitTestCase.makeNode(.True, {}),","class":"lineCov","hits":"1","order":"5493","possible_hits":"1",},
{"lineNum":"   73","line":"        .ifTrue = EmitTestCase.makeNode(.Null, {}),","class":"lineCov","hits":"1","order":"5494","possible_hits":"1",},
{"lineNum":"   74","line":"    });"},
{"lineNum":"   75","line":"    defer alloc.destroy(branches.items[0].cond);","class":"linePartCov","hits":"1","order":"5511","possible_hits":"3",},
{"lineNum":"   76","line":"    defer alloc.destroy(branches.items[0].ifTrue);","class":"linePartCov","hits":"1","order":"5510","possible_hits":"4",},
{"lineNum":"   77","line":""},
{"lineNum":"   78","line":"    try branches.append(alloc, node.If.Branch{","class":"linePartCov","hits":"1","order":"5498","possible_hits":"2",},
{"lineNum":"   79","line":"        .cond = EmitTestCase.makeNode(.False, {}),","class":"lineCov","hits":"1","order":"5496","possible_hits":"1",},
{"lineNum":"   80","line":"        .ifTrue = EmitTestCase.makeNode(.Undefined, {}),","class":"lineCov","hits":"1","order":"5497","possible_hits":"1",},
{"lineNum":"   81","line":"    });"},
{"lineNum":"   82","line":"    defer alloc.destroy(branches.items[1].cond);","class":"linePartCov","hits":"1","order":"5509","possible_hits":"2",},
{"lineNum":"   83","line":"    defer alloc.destroy(branches.items[1].ifTrue);","class":"linePartCov","hits":"1","order":"5508","possible_hits":"4",},
{"lineNum":"   84","line":""},
{"lineNum":"   85","line":"    try (EmitTestCase{","class":"linePartCov","hits":"2","order":"5503","possible_hits":"3",},
{"lineNum":"   86","line":"        .inputNode = EmitTestCase.makeNode(.If, node.If{","class":"lineCov","hits":"1","order":"5501","possible_hits":"1",},
{"lineNum":"   87","line":"            .branches = branches,","class":"lineCov","hits":"1","order":"5499","possible_hits":"1",},
{"lineNum":"   88","line":"            .elseBranch = null,","class":"lineCov","hits":"1","order":"5500","possible_hits":"1",},
{"lineNum":"   89","line":"        }),"},
{"lineNum":"   90","line":"        .expectedOutput = \"if (true) null;\\nelse if (false) undefined;\\n\",","class":"lineCov","hits":"1","order":"5502","possible_hits":"1",},
{"lineNum":"   91","line":"    }).run();","class":"lineCov","hits":"1","order":"5504","possible_hits":"1",},
{"lineNum":"   92","line":"}"},
{"lineNum":"   93","line":""},
{"lineNum":"   94","line":"test \"JsBackend can emit \'if\' statement with \'else\'\" {","class":"lineCov","hits":"3","order":"5513","possible_hits":"3",},
{"lineNum":"   95","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"   96","line":""},
{"lineNum":"   97","line":"    var branches = node.If.BranchList{};","class":"lineCov","hits":"1","order":"5514","possible_hits":"1",},
{"lineNum":"   98","line":"    defer branches.deinit(alloc);","class":"linePartCov","hits":"1","order":"5530","possible_hits":"3",},
{"lineNum":"   99","line":""},
{"lineNum":"  100","line":"    try branches.append(alloc, node.If.Branch{","class":"linePartCov","hits":"1","order":"5517","possible_hits":"2",},
{"lineNum":"  101","line":"        .cond = EmitTestCase.makeNode(.True, {}),","class":"lineCov","hits":"1","order":"5515","possible_hits":"1",},
{"lineNum":"  102","line":"        .ifTrue = EmitTestCase.makeNode(.Null, {}),","class":"lineCov","hits":"1","order":"5516","possible_hits":"1",},
{"lineNum":"  103","line":"    });"},
{"lineNum":"  104","line":"    defer alloc.destroy(branches.items[0].cond);","class":"linePartCov","hits":"1","order":"5529","possible_hits":"2",},
{"lineNum":"  105","line":"    defer alloc.destroy(branches.items[0].ifTrue);","class":"linePartCov","hits":"1","order":"5528","possible_hits":"3",},
{"lineNum":"  106","line":""},
{"lineNum":"  107","line":"    const elseBranch = EmitTestCase.makeNode(.Undefined, {});","class":"lineCov","hits":"1","order":"5518","possible_hits":"1",},
{"lineNum":"  108","line":"    defer alloc.destroy(elseBranch);","class":"linePartCov","hits":"1","order":"5527","possible_hits":"2",},
{"lineNum":"  109","line":""},
{"lineNum":"  110","line":"    try (EmitTestCase{","class":"linePartCov","hits":"2","order":"5523","possible_hits":"3",},
{"lineNum":"  111","line":"        .inputNode = EmitTestCase.makeNode(.If, node.If{","class":"lineCov","hits":"1","order":"5521","possible_hits":"1",},
{"lineNum":"  112","line":"            .branches = branches,","class":"lineCov","hits":"1","order":"5519","possible_hits":"1",},
{"lineNum":"  113","line":"            .elseBranch = elseBranch,","class":"lineCov","hits":"1","order":"5520","possible_hits":"1",},
{"lineNum":"  114","line":"        }),"},
{"lineNum":"  115","line":"        .expectedOutput = \"if (true) null;\\nelse undefined;\\n\",","class":"lineCov","hits":"1","order":"5522","possible_hits":"1",},
{"lineNum":"  116","line":"    }).run();","class":"lineCov","hits":"1","order":"5524","possible_hits":"1",},
{"lineNum":"  117","line":"}"},
{"lineNum":"  118","line":""},
{"lineNum":"  119","line":"test \"JsBackend can emit \'if\' statement with \'else if\' and \'else\'\" {","class":"lineCov","hits":"3","order":"5531","possible_hits":"3",},
{"lineNum":"  120","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"  121","line":""},
{"lineNum":"  122","line":"    var branches = node.If.BranchList{};","class":"lineCov","hits":"1","order":"5532","possible_hits":"1",},
{"lineNum":"  123","line":"    defer branches.deinit(alloc);","class":"linePartCov","hits":"1","order":"5553","possible_hits":"4",},
{"lineNum":"  124","line":""},
{"lineNum":"  125","line":"    try branches.append(alloc, node.If.Branch{","class":"linePartCov","hits":"1","order":"5535","possible_hits":"2",},
{"lineNum":"  126","line":"        .cond = EmitTestCase.makeNode(.True, {}),","class":"lineCov","hits":"1","order":"5533","possible_hits":"1",},
{"lineNum":"  127","line":"        .ifTrue = EmitTestCase.makeNode(.Null, {}),","class":"lineCov","hits":"1","order":"5534","possible_hits":"1",},
{"lineNum":"  128","line":"    });"},
{"lineNum":"  129","line":"    defer alloc.destroy(branches.items[0].cond);","class":"linePartCov","hits":"1","order":"5552","possible_hits":"3",},
{"lineNum":"  130","line":"    defer alloc.destroy(branches.items[0].ifTrue);","class":"linePartCov","hits":"1","order":"5551","possible_hits":"4",},
{"lineNum":"  131","line":""},
{"lineNum":"  132","line":"    try branches.append(alloc, node.If.Branch{","class":"linePartCov","hits":"1","order":"5538","possible_hits":"2",},
{"lineNum":"  133","line":"        .cond = EmitTestCase.makeNode(.False, {}),","class":"lineCov","hits":"1","order":"5536","possible_hits":"1",},
{"lineNum":"  134","line":"        .ifTrue = EmitTestCase.makeNode(.String, \"\'a\'\"),","class":"lineCov","hits":"1","order":"5537","possible_hits":"1",},
{"lineNum":"  135","line":"    });"},
{"lineNum":"  136","line":"    defer alloc.destroy(branches.items[1].cond);","class":"linePartCov","hits":"1","order":"5550","possible_hits":"2",},
{"lineNum":"  137","line":"    defer alloc.destroy(branches.items[1].ifTrue);","class":"linePartCov","hits":"1","order":"5549","possible_hits":"4",},
{"lineNum":"  138","line":""},
{"lineNum":"  139","line":"    const elseBranch = EmitTestCase.makeNode(.Int, \"1\");","class":"lineCov","hits":"1","order":"5539","possible_hits":"1",},
{"lineNum":"  140","line":"    defer alloc.destroy(elseBranch);","class":"linePartCov","hits":"1","order":"5548","possible_hits":"2",},
{"lineNum":"  141","line":""},
{"lineNum":"  142","line":"    try (EmitTestCase{","class":"linePartCov","hits":"2","order":"5544","possible_hits":"3",},
{"lineNum":"  143","line":"        .inputNode = EmitTestCase.makeNode(.If, node.If{","class":"lineCov","hits":"1","order":"5542","possible_hits":"1",},
{"lineNum":"  144","line":"            .branches = branches,","class":"lineCov","hits":"1","order":"5540","possible_hits":"1",},
{"lineNum":"  145","line":"            .elseBranch = elseBranch,","class":"lineCov","hits":"1","order":"5541","possible_hits":"1",},
{"lineNum":"  146","line":"        }),"},
{"lineNum":"  147","line":"        .expectedOutput = \"if (true) null;\\nelse if (false) \'a\';\\nelse 1;\\n\",","class":"lineCov","hits":"1","order":"5543","possible_hits":"1",},
{"lineNum":"  148","line":"    }).run();","class":"lineCov","hits":"1","order":"5545","possible_hits":"1",},
{"lineNum":"  149","line":"}"},
{"lineNum":"  150","line":""},
{"lineNum":"  151","line":"pub fn emitSwitch(self: *JsBackend, sw: node.Switch) Backend.Error!void {","class":"lineCov","hits":"2","order":"5578","possible_hits":"2",},
{"lineNum":"  152","line":"    try self.out.print(\"switch (\", .{});","class":"lineCov","hits":"1","order":"5579","possible_hits":"1",},
{"lineNum":"  153","line":"    try self.emitExpr(sw.expr);","class":"lineCov","hits":"1","order":"5580","possible_hits":"1",},
{"lineNum":"  154","line":"    try self.out.print(\") {{\\n\", .{});","class":"lineCov","hits":"1","order":"5582","possible_hits":"1",},
{"lineNum":"  155","line":""},
{"lineNum":"  156","line":"    for (sw.cases.items) |case| {","class":"lineCov","hits":"2","order":"5583","possible_hits":"2",},
{"lineNum":"  157","line":"        try self.out.print(\"case \", .{});","class":"lineCov","hits":"1","order":"5584","possible_hits":"1",},
{"lineNum":"  158","line":"        try self.emitExpr(case.value);","class":"lineCov","hits":"1","order":"5585","possible_hits":"1",},
{"lineNum":"  159","line":"        try self.out.print(\":\\n\", .{});","class":"lineCov","hits":"1","order":"5586","possible_hits":"1",},
{"lineNum":"  160","line":""},
{"lineNum":"  161","line":"        for (case.stmts.items) |stmt|","class":"lineCov","hits":"2","order":"5587","possible_hits":"2",},
{"lineNum":"  162","line":"            try self.emitNode(stmt);","class":"lineCov","hits":"1","order":"5588","possible_hits":"1",},
{"lineNum":"  163","line":"    }"},
{"lineNum":"  164","line":""},
{"lineNum":"  165","line":"    if (sw.default) |default| {","class":"lineCov","hits":"2","order":"5597","possible_hits":"2",},
{"lineNum":"  166","line":"        try self.out.print(\"default:\\n\", .{});","class":"lineCov","hits":"1","order":"5598","possible_hits":"1",},
{"lineNum":"  167","line":"        for (default.items) |stmt|","class":"lineCov","hits":"2","order":"5599","possible_hits":"2",},
{"lineNum":"  168","line":"            try self.emitNode(stmt);","class":"lineCov","hits":"1","order":"5600","possible_hits":"1",},
{"lineNum":"  169","line":"    }"},
{"lineNum":"  170","line":""},
{"lineNum":"  171","line":"    try self.out.print(\"}}\\n\", .{});","class":"lineCov","hits":"1","order":"5601","possible_hits":"1",},
{"lineNum":"  172","line":"}"},
{"lineNum":"  173","line":""},
{"lineNum":"  174","line":"test \"JsBackend can emit \'switch\' statement\" {","class":"lineCov","hits":"3","order":"5554","possible_hits":"3",},
{"lineNum":"  175","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"  176","line":""},
{"lineNum":"  177","line":"    const expr = EmitTestCase.makeNode(.Ident, \"a\");","class":"lineCov","hits":"1","order":"5555","possible_hits":"1",},
{"lineNum":"  178","line":"    defer alloc.destroy(expr);","class":"linePartCov","hits":"1","order":"5608","possible_hits":"2",},
{"lineNum":"  179","line":""},
{"lineNum":"  180","line":"    const cases = node.Switch.CaseList{","class":"lineCov","hits":"1","order":"5566","possible_hits":"1",},
{"lineNum":"  181","line":"        .items = &[_]node.Switch.Case{","class":"lineCov","hits":"1","order":"5565","possible_hits":"1",},
{"lineNum":"  182","line":"            node.Switch.Case{"},
{"lineNum":"  183","line":"                .value = EmitTestCase.makeNode(.Int, \"1\"),","class":"lineCov","hits":"1","order":"5556","possible_hits":"1",},
{"lineNum":"  184","line":"                .stmts = node.NodeList{","class":"lineCov","hits":"1","order":"5559","possible_hits":"1",},
{"lineNum":"  185","line":"                    .items = &[_]Node{","class":"lineCov","hits":"1","order":"5558","possible_hits":"1",},
{"lineNum":"  186","line":"                        EmitTestCase.makeNode(.Return, null),","class":"lineCov","hits":"1","order":"5557","possible_hits":"1",},
{"lineNum":"  187","line":"                    },"},
{"lineNum":"  188","line":"                },"},
{"lineNum":"  189","line":"            },"},
{"lineNum":"  190","line":"            node.Switch.Case{"},
{"lineNum":"  191","line":"                .value = EmitTestCase.makeNode(.Int, \"2\"),","class":"lineCov","hits":"1","order":"5560","possible_hits":"1",},
{"lineNum":"  192","line":"                .stmts = node.NodeList{","class":"lineCov","hits":"1","order":"5564","possible_hits":"1",},
{"lineNum":"  193","line":"                    .items = &[_]Node{","class":"lineCov","hits":"1","order":"5563","possible_hits":"1",},
{"lineNum":"  194","line":"                        EmitTestCase.makeNode(.Null, {}),","class":"lineCov","hits":"1","order":"5561","possible_hits":"1",},
{"lineNum":"  195","line":"                        EmitTestCase.makeNode(.Break, null),","class":"lineCov","hits":"1","order":"5562","possible_hits":"1",},
{"lineNum":"  196","line":"                    },"},
{"lineNum":"  197","line":"                },"},
{"lineNum":"  198","line":"            },"},
{"lineNum":"  199","line":"        },"},
{"lineNum":"  200","line":"    };"},
{"lineNum":"  201","line":"    defer alloc.destroy(cases.items[0].value);","class":"linePartCov","hits":"1","order":"5607","possible_hits":"2",},
{"lineNum":"  202","line":"    defer alloc.destroy(cases.items[0].stmts.items[0]);","class":"linePartCov","hits":"1","order":"5606","possible_hits":"2",},
{"lineNum":"  203","line":"    defer alloc.destroy(cases.items[1].value);","class":"linePartCov","hits":"1","order":"5605","possible_hits":"2",},
{"lineNum":"  204","line":"    defer alloc.destroy(cases.items[1].stmts.items[0]);","class":"linePartCov","hits":"1","order":"5604","possible_hits":"2",},
{"lineNum":"  205","line":"    defer alloc.destroy(cases.items[1].stmts.items[1]);","class":"linePartCov","hits":"1","order":"5603","possible_hits":"2",},
{"lineNum":"  206","line":""},
{"lineNum":"  207","line":"    const default = node.NodeList{","class":"lineCov","hits":"1","order":"5569","possible_hits":"1",},
{"lineNum":"  208","line":"        .items = &[_]Node{","class":"lineCov","hits":"1","order":"5568","possible_hits":"1",},
{"lineNum":"  209","line":"            EmitTestCase.makeNode(.Break, null),","class":"lineCov","hits":"1","order":"5567","possible_hits":"1",},
{"lineNum":"  210","line":"        },"},
{"lineNum":"  211","line":"    };"},
{"lineNum":"  212","line":"    defer alloc.destroy(default.items[0]);","class":"linePartCov","hits":"1","order":"5602","possible_hits":"3",},
{"lineNum":"  213","line":""},
{"lineNum":"  214","line":"    try (EmitTestCase{","class":"linePartCov","hits":"2","order":"5575","possible_hits":"3",},
{"lineNum":"  215","line":"        .inputNode = EmitTestCase.makeNode(.Switch, node.Switch{","class":"lineCov","hits":"1","order":"5573","possible_hits":"1",},
{"lineNum":"  216","line":"            .expr = expr,","class":"lineCov","hits":"1","order":"5570","possible_hits":"1",},
{"lineNum":"  217","line":"            .cases = cases,","class":"lineCov","hits":"1","order":"5571","possible_hits":"1",},
{"lineNum":"  218","line":"            .default = default,","class":"lineCov","hits":"1","order":"5572","possible_hits":"1",},
{"lineNum":"  219","line":"        }),"},
{"lineNum":"  220","line":"        .expectedOutput =","class":"lineCov","hits":"1","order":"5574","possible_hits":"1",},
{"lineNum":"  221","line":"        \\\\switch (a) {"},
{"lineNum":"  222","line":"        \\\\case 1:"},
{"lineNum":"  223","line":"        \\\\return;"},
{"lineNum":"  224","line":"        \\\\case 2:"},
{"lineNum":"  225","line":"        \\\\null;"},
{"lineNum":"  226","line":"        \\\\break;"},
{"lineNum":"  227","line":"        \\\\default:"},
{"lineNum":"  228","line":"        \\\\break;"},
{"lineNum":"  229","line":"        \\\\}"},
{"lineNum":"  230","line":"        \\\\"},
{"lineNum":"  231","line":"        ,"},
{"lineNum":"  232","line":"    }).run();","class":"lineCov","hits":"1","order":"5576","possible_hits":"1",},
{"lineNum":"  233","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-19 21:33:16", "instrumented" : 126, "covered" : 126,};
var merged_data = [];
