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
{"lineNum":"   26","line":"pub fn emitCond(self: *JsBackend, cond: node.If) Backend.Error!void {","class":"lineCov","hits":"2","order":"5596","possible_hits":"2",},
{"lineNum":"   27","line":"    for (cond.branches.items) |branch, index| {","class":"lineCov","hits":"2","order":"5597","possible_hits":"2",},
{"lineNum":"   28","line":"        try if (index == 0)","class":"lineCov","hits":"3","order":"5598","possible_hits":"3",},
{"lineNum":"   29","line":"            self.out.print(\"if (\", .{})","class":"lineCov","hits":"1","order":"5599","possible_hits":"1",},
{"lineNum":"   30","line":"        else"},
{"lineNum":"   31","line":"            self.out.print(\"else if (\", .{});","class":"lineCov","hits":"1","order":"5622","possible_hits":"1",},
{"lineNum":"   32","line":"        try self.emitExpr(branch.cond);","class":"lineCov","hits":"1","order":"5600","possible_hits":"1",},
{"lineNum":"   33","line":"        try self.out.print(\") \", .{});","class":"lineCov","hits":"1","order":"5602","possible_hits":"1",},
{"lineNum":"   34","line":"        try self.emitNode(branch.ifTrue);","class":"lineCov","hits":"1","order":"5603","possible_hits":"1",},
{"lineNum":"   35","line":"    }"},
{"lineNum":"   36","line":""},
{"lineNum":"   37","line":"    if (cond.elseBranch) |branch| {","class":"lineCov","hits":"2","order":"5604","possible_hits":"2",},
{"lineNum":"   38","line":"        try self.out.print(\"else \", .{});","class":"lineCov","hits":"1","order":"5642","possible_hits":"1",},
{"lineNum":"   39","line":"        try self.emitNode(branch);","class":"lineCov","hits":"1","order":"5643","possible_hits":"1",},
{"lineNum":"   40","line":"    }"},
{"lineNum":"   41","line":"}"},
{"lineNum":"   42","line":""},
{"lineNum":"   43","line":"test \"JsBackend can emit \'if\' statement\" {","class":"lineCov","hits":"3","order":"5584","possible_hits":"3",},
{"lineNum":"   44","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"    var branches = node.If.BranchList{};","class":"lineCov","hits":"1","order":"5585","possible_hits":"1",},
{"lineNum":"   47","line":"    defer branches.deinit(alloc);","class":"linePartCov","hits":"1","order":"5607","possible_hits":"3",},
{"lineNum":"   48","line":""},
{"lineNum":"   49","line":"    try branches.append(alloc, node.If.Branch{","class":"linePartCov","hits":"1","order":"5588","possible_hits":"2",},
{"lineNum":"   50","line":"        .cond = EmitTestCase.makeNode(.True, {}),","class":"lineCov","hits":"1","order":"5586","possible_hits":"1",},
{"lineNum":"   51","line":"        .ifTrue = EmitTestCase.makeNode(.Null, {}),","class":"lineCov","hits":"1","order":"5587","possible_hits":"1",},
{"lineNum":"   52","line":"    });"},
{"lineNum":"   53","line":"    defer alloc.destroy(branches.items[0].cond);","class":"linePartCov","hits":"1","order":"5606","possible_hits":"2",},
{"lineNum":"   54","line":"    defer alloc.destroy(branches.items[0].ifTrue);","class":"linePartCov","hits":"1","order":"5605","possible_hits":"3",},
{"lineNum":"   55","line":""},
{"lineNum":"   56","line":"    try (EmitTestCase{","class":"linePartCov","hits":"2","order":"5593","possible_hits":"3",},
{"lineNum":"   57","line":"        .inputNode = EmitTestCase.makeNode(.If, node.If{","class":"lineCov","hits":"1","order":"5591","possible_hits":"1",},
{"lineNum":"   58","line":"            .branches = branches,","class":"lineCov","hits":"1","order":"5589","possible_hits":"1",},
{"lineNum":"   59","line":"            .elseBranch = null,","class":"lineCov","hits":"1","order":"5590","possible_hits":"1",},
{"lineNum":"   60","line":"        }),"},
{"lineNum":"   61","line":"        .expectedOutput = \"if (true) null;\\n\",","class":"lineCov","hits":"1","order":"5592","possible_hits":"1",},
{"lineNum":"   62","line":"    }).run();","class":"lineCov","hits":"1","order":"5594","possible_hits":"1",},
{"lineNum":"   63","line":"}"},
{"lineNum":"   64","line":""},
{"lineNum":"   65","line":"test \"JsBackend can emit \'if\' statement with \'else if\'\" {","class":"lineCov","hits":"3","order":"5608","possible_hits":"3",},
{"lineNum":"   66","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"   67","line":""},
{"lineNum":"   68","line":"    var branches = node.If.BranchList{};","class":"lineCov","hits":"1","order":"5609","possible_hits":"1",},
{"lineNum":"   69","line":"    defer branches.deinit(alloc);","class":"linePartCov","hits":"1","order":"5629","possible_hits":"4",},
{"lineNum":"   70","line":""},
{"lineNum":"   71","line":"    try branches.append(alloc, node.If.Branch{","class":"linePartCov","hits":"1","order":"5612","possible_hits":"2",},
{"lineNum":"   72","line":"        .cond = EmitTestCase.makeNode(.True, {}),","class":"lineCov","hits":"1","order":"5610","possible_hits":"1",},
{"lineNum":"   73","line":"        .ifTrue = EmitTestCase.makeNode(.Null, {}),","class":"lineCov","hits":"1","order":"5611","possible_hits":"1",},
{"lineNum":"   74","line":"    });"},
{"lineNum":"   75","line":"    defer alloc.destroy(branches.items[0].cond);","class":"linePartCov","hits":"1","order":"5628","possible_hits":"3",},
{"lineNum":"   76","line":"    defer alloc.destroy(branches.items[0].ifTrue);","class":"linePartCov","hits":"1","order":"5627","possible_hits":"4",},
{"lineNum":"   77","line":""},
{"lineNum":"   78","line":"    try branches.append(alloc, node.If.Branch{","class":"linePartCov","hits":"1","order":"5615","possible_hits":"2",},
{"lineNum":"   79","line":"        .cond = EmitTestCase.makeNode(.False, {}),","class":"lineCov","hits":"1","order":"5613","possible_hits":"1",},
{"lineNum":"   80","line":"        .ifTrue = EmitTestCase.makeNode(.Undefined, {}),","class":"lineCov","hits":"1","order":"5614","possible_hits":"1",},
{"lineNum":"   81","line":"    });"},
{"lineNum":"   82","line":"    defer alloc.destroy(branches.items[1].cond);","class":"linePartCov","hits":"1","order":"5626","possible_hits":"2",},
{"lineNum":"   83","line":"    defer alloc.destroy(branches.items[1].ifTrue);","class":"linePartCov","hits":"1","order":"5625","possible_hits":"4",},
{"lineNum":"   84","line":""},
{"lineNum":"   85","line":"    try (EmitTestCase{","class":"linePartCov","hits":"2","order":"5620","possible_hits":"3",},
{"lineNum":"   86","line":"        .inputNode = EmitTestCase.makeNode(.If, node.If{","class":"lineCov","hits":"1","order":"5618","possible_hits":"1",},
{"lineNum":"   87","line":"            .branches = branches,","class":"lineCov","hits":"1","order":"5616","possible_hits":"1",},
{"lineNum":"   88","line":"            .elseBranch = null,","class":"lineCov","hits":"1","order":"5617","possible_hits":"1",},
{"lineNum":"   89","line":"        }),"},
{"lineNum":"   90","line":"        .expectedOutput = \"if (true) null;\\nelse if (false) undefined;\\n\",","class":"lineCov","hits":"1","order":"5619","possible_hits":"1",},
{"lineNum":"   91","line":"    }).run();","class":"lineCov","hits":"1","order":"5621","possible_hits":"1",},
{"lineNum":"   92","line":"}"},
{"lineNum":"   93","line":""},
{"lineNum":"   94","line":"test \"JsBackend can emit \'if\' statement with \'else\'\" {","class":"lineCov","hits":"3","order":"5630","possible_hits":"3",},
{"lineNum":"   95","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"   96","line":""},
{"lineNum":"   97","line":"    var branches = node.If.BranchList{};","class":"lineCov","hits":"1","order":"5631","possible_hits":"1",},
{"lineNum":"   98","line":"    defer branches.deinit(alloc);","class":"linePartCov","hits":"1","order":"5647","possible_hits":"3",},
{"lineNum":"   99","line":""},
{"lineNum":"  100","line":"    try branches.append(alloc, node.If.Branch{","class":"linePartCov","hits":"1","order":"5634","possible_hits":"2",},
{"lineNum":"  101","line":"        .cond = EmitTestCase.makeNode(.True, {}),","class":"lineCov","hits":"1","order":"5632","possible_hits":"1",},
{"lineNum":"  102","line":"        .ifTrue = EmitTestCase.makeNode(.Null, {}),","class":"lineCov","hits":"1","order":"5633","possible_hits":"1",},
{"lineNum":"  103","line":"    });"},
{"lineNum":"  104","line":"    defer alloc.destroy(branches.items[0].cond);","class":"linePartCov","hits":"1","order":"5646","possible_hits":"2",},
{"lineNum":"  105","line":"    defer alloc.destroy(branches.items[0].ifTrue);","class":"linePartCov","hits":"1","order":"5645","possible_hits":"3",},
{"lineNum":"  106","line":""},
{"lineNum":"  107","line":"    const elseBranch = EmitTestCase.makeNode(.Undefined, {});","class":"lineCov","hits":"1","order":"5635","possible_hits":"1",},
{"lineNum":"  108","line":"    defer alloc.destroy(elseBranch);","class":"linePartCov","hits":"1","order":"5644","possible_hits":"2",},
{"lineNum":"  109","line":""},
{"lineNum":"  110","line":"    try (EmitTestCase{","class":"linePartCov","hits":"2","order":"5640","possible_hits":"3",},
{"lineNum":"  111","line":"        .inputNode = EmitTestCase.makeNode(.If, node.If{","class":"lineCov","hits":"1","order":"5638","possible_hits":"1",},
{"lineNum":"  112","line":"            .branches = branches,","class":"lineCov","hits":"1","order":"5636","possible_hits":"1",},
{"lineNum":"  113","line":"            .elseBranch = elseBranch,","class":"lineCov","hits":"1","order":"5637","possible_hits":"1",},
{"lineNum":"  114","line":"        }),"},
{"lineNum":"  115","line":"        .expectedOutput = \"if (true) null;\\nelse undefined;\\n\",","class":"lineCov","hits":"1","order":"5639","possible_hits":"1",},
{"lineNum":"  116","line":"    }).run();","class":"lineCov","hits":"1","order":"5641","possible_hits":"1",},
{"lineNum":"  117","line":"}"},
{"lineNum":"  118","line":""},
{"lineNum":"  119","line":"test \"JsBackend can emit \'if\' statement with \'else if\' and \'else\'\" {","class":"lineCov","hits":"3","order":"5648","possible_hits":"3",},
{"lineNum":"  120","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"  121","line":""},
{"lineNum":"  122","line":"    var branches = node.If.BranchList{};","class":"lineCov","hits":"1","order":"5649","possible_hits":"1",},
{"lineNum":"  123","line":"    defer branches.deinit(alloc);","class":"linePartCov","hits":"1","order":"5670","possible_hits":"4",},
{"lineNum":"  124","line":""},
{"lineNum":"  125","line":"    try branches.append(alloc, node.If.Branch{","class":"linePartCov","hits":"1","order":"5652","possible_hits":"2",},
{"lineNum":"  126","line":"        .cond = EmitTestCase.makeNode(.True, {}),","class":"lineCov","hits":"1","order":"5650","possible_hits":"1",},
{"lineNum":"  127","line":"        .ifTrue = EmitTestCase.makeNode(.Null, {}),","class":"lineCov","hits":"1","order":"5651","possible_hits":"1",},
{"lineNum":"  128","line":"    });"},
{"lineNum":"  129","line":"    defer alloc.destroy(branches.items[0].cond);","class":"linePartCov","hits":"1","order":"5669","possible_hits":"3",},
{"lineNum":"  130","line":"    defer alloc.destroy(branches.items[0].ifTrue);","class":"linePartCov","hits":"1","order":"5668","possible_hits":"4",},
{"lineNum":"  131","line":""},
{"lineNum":"  132","line":"    try branches.append(alloc, node.If.Branch{","class":"linePartCov","hits":"1","order":"5655","possible_hits":"2",},
{"lineNum":"  133","line":"        .cond = EmitTestCase.makeNode(.False, {}),","class":"lineCov","hits":"1","order":"5653","possible_hits":"1",},
{"lineNum":"  134","line":"        .ifTrue = EmitTestCase.makeNode(.String, \"\'a\'\"),","class":"lineCov","hits":"1","order":"5654","possible_hits":"1",},
{"lineNum":"  135","line":"    });"},
{"lineNum":"  136","line":"    defer alloc.destroy(branches.items[1].cond);","class":"linePartCov","hits":"1","order":"5667","possible_hits":"2",},
{"lineNum":"  137","line":"    defer alloc.destroy(branches.items[1].ifTrue);","class":"linePartCov","hits":"1","order":"5666","possible_hits":"4",},
{"lineNum":"  138","line":""},
{"lineNum":"  139","line":"    const elseBranch = EmitTestCase.makeNode(.Int, \"1\");","class":"lineCov","hits":"1","order":"5656","possible_hits":"1",},
{"lineNum":"  140","line":"    defer alloc.destroy(elseBranch);","class":"linePartCov","hits":"1","order":"5665","possible_hits":"2",},
{"lineNum":"  141","line":""},
{"lineNum":"  142","line":"    try (EmitTestCase{","class":"linePartCov","hits":"2","order":"5661","possible_hits":"3",},
{"lineNum":"  143","line":"        .inputNode = EmitTestCase.makeNode(.If, node.If{","class":"lineCov","hits":"1","order":"5659","possible_hits":"1",},
{"lineNum":"  144","line":"            .branches = branches,","class":"lineCov","hits":"1","order":"5657","possible_hits":"1",},
{"lineNum":"  145","line":"            .elseBranch = elseBranch,","class":"lineCov","hits":"1","order":"5658","possible_hits":"1",},
{"lineNum":"  146","line":"        }),"},
{"lineNum":"  147","line":"        .expectedOutput = \"if (true) null;\\nelse if (false) \'a\';\\nelse 1;\\n\",","class":"lineCov","hits":"1","order":"5660","possible_hits":"1",},
{"lineNum":"  148","line":"    }).run();","class":"lineCov","hits":"1","order":"5662","possible_hits":"1",},
{"lineNum":"  149","line":"}"},
{"lineNum":"  150","line":""},
{"lineNum":"  151","line":"pub fn emitSwitch(self: *JsBackend, sw: node.Switch) Backend.Error!void {","class":"lineCov","hits":"2","order":"5695","possible_hits":"2",},
{"lineNum":"  152","line":"    try self.out.print(\"switch (\", .{});","class":"lineCov","hits":"1","order":"5696","possible_hits":"1",},
{"lineNum":"  153","line":"    try self.emitExpr(sw.expr);","class":"lineCov","hits":"1","order":"5697","possible_hits":"1",},
{"lineNum":"  154","line":"    try self.out.print(\") {{\\n\", .{});","class":"lineCov","hits":"1","order":"5699","possible_hits":"1",},
{"lineNum":"  155","line":""},
{"lineNum":"  156","line":"    for (sw.cases.items) |case| {","class":"lineCov","hits":"2","order":"5700","possible_hits":"2",},
{"lineNum":"  157","line":"        try self.out.print(\"case \", .{});","class":"lineCov","hits":"1","order":"5701","possible_hits":"1",},
{"lineNum":"  158","line":"        try self.emitExpr(case.value);","class":"lineCov","hits":"1","order":"5702","possible_hits":"1",},
{"lineNum":"  159","line":"        try self.out.print(\":\\n\", .{});","class":"lineCov","hits":"1","order":"5703","possible_hits":"1",},
{"lineNum":"  160","line":""},
{"lineNum":"  161","line":"        for (case.stmts.items) |stmt|","class":"lineCov","hits":"2","order":"5704","possible_hits":"2",},
{"lineNum":"  162","line":"            try self.emitNode(stmt);","class":"lineCov","hits":"1","order":"5705","possible_hits":"1",},
{"lineNum":"  163","line":"    }"},
{"lineNum":"  164","line":""},
{"lineNum":"  165","line":"    if (sw.default) |default| {","class":"lineCov","hits":"2","order":"5714","possible_hits":"2",},
{"lineNum":"  166","line":"        try self.out.print(\"default:\\n\", .{});","class":"lineCov","hits":"1","order":"5715","possible_hits":"1",},
{"lineNum":"  167","line":"        for (default.items) |stmt|","class":"lineCov","hits":"2","order":"5716","possible_hits":"2",},
{"lineNum":"  168","line":"            try self.emitNode(stmt);","class":"lineCov","hits":"1","order":"5717","possible_hits":"1",},
{"lineNum":"  169","line":"    }"},
{"lineNum":"  170","line":""},
{"lineNum":"  171","line":"    try self.out.print(\"}}\\n\", .{});","class":"lineCov","hits":"1","order":"5718","possible_hits":"1",},
{"lineNum":"  172","line":"}"},
{"lineNum":"  173","line":""},
{"lineNum":"  174","line":"test \"JsBackend can emit \'switch\' statement\" {","class":"lineCov","hits":"3","order":"5671","possible_hits":"3",},
{"lineNum":"  175","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"  176","line":""},
{"lineNum":"  177","line":"    const expr = EmitTestCase.makeNode(.Ident, \"a\");","class":"lineCov","hits":"1","order":"5672","possible_hits":"1",},
{"lineNum":"  178","line":"    defer alloc.destroy(expr);","class":"linePartCov","hits":"1","order":"5725","possible_hits":"2",},
{"lineNum":"  179","line":""},
{"lineNum":"  180","line":"    const cases = node.Switch.CaseList{","class":"lineCov","hits":"1","order":"5683","possible_hits":"1",},
{"lineNum":"  181","line":"        .items = &[_]node.Switch.Case{","class":"lineCov","hits":"1","order":"5682","possible_hits":"1",},
{"lineNum":"  182","line":"            node.Switch.Case{"},
{"lineNum":"  183","line":"                .value = EmitTestCase.makeNode(.Int, \"1\"),","class":"lineCov","hits":"1","order":"5673","possible_hits":"1",},
{"lineNum":"  184","line":"                .stmts = node.NodeList{","class":"lineCov","hits":"1","order":"5676","possible_hits":"1",},
{"lineNum":"  185","line":"                    .items = &[_]Node{","class":"lineCov","hits":"1","order":"5675","possible_hits":"1",},
{"lineNum":"  186","line":"                        EmitTestCase.makeNode(.Return, null),","class":"lineCov","hits":"1","order":"5674","possible_hits":"1",},
{"lineNum":"  187","line":"                    },"},
{"lineNum":"  188","line":"                },"},
{"lineNum":"  189","line":"            },"},
{"lineNum":"  190","line":"            node.Switch.Case{"},
{"lineNum":"  191","line":"                .value = EmitTestCase.makeNode(.Int, \"2\"),","class":"lineCov","hits":"1","order":"5677","possible_hits":"1",},
{"lineNum":"  192","line":"                .stmts = node.NodeList{","class":"lineCov","hits":"1","order":"5681","possible_hits":"1",},
{"lineNum":"  193","line":"                    .items = &[_]Node{","class":"lineCov","hits":"1","order":"5680","possible_hits":"1",},
{"lineNum":"  194","line":"                        EmitTestCase.makeNode(.Null, {}),","class":"lineCov","hits":"1","order":"5678","possible_hits":"1",},
{"lineNum":"  195","line":"                        EmitTestCase.makeNode(.Break, null),","class":"lineCov","hits":"1","order":"5679","possible_hits":"1",},
{"lineNum":"  196","line":"                    },"},
{"lineNum":"  197","line":"                },"},
{"lineNum":"  198","line":"            },"},
{"lineNum":"  199","line":"        },"},
{"lineNum":"  200","line":"    };"},
{"lineNum":"  201","line":"    defer alloc.destroy(cases.items[0].value);","class":"linePartCov","hits":"1","order":"5724","possible_hits":"2",},
{"lineNum":"  202","line":"    defer alloc.destroy(cases.items[0].stmts.items[0]);","class":"linePartCov","hits":"1","order":"5723","possible_hits":"2",},
{"lineNum":"  203","line":"    defer alloc.destroy(cases.items[1].value);","class":"linePartCov","hits":"1","order":"5722","possible_hits":"2",},
{"lineNum":"  204","line":"    defer alloc.destroy(cases.items[1].stmts.items[0]);","class":"linePartCov","hits":"1","order":"5721","possible_hits":"2",},
{"lineNum":"  205","line":"    defer alloc.destroy(cases.items[1].stmts.items[1]);","class":"linePartCov","hits":"1","order":"5720","possible_hits":"2",},
{"lineNum":"  206","line":""},
{"lineNum":"  207","line":"    const default = node.NodeList{","class":"lineCov","hits":"1","order":"5686","possible_hits":"1",},
{"lineNum":"  208","line":"        .items = &[_]Node{","class":"lineCov","hits":"1","order":"5685","possible_hits":"1",},
{"lineNum":"  209","line":"            EmitTestCase.makeNode(.Break, null),","class":"lineCov","hits":"1","order":"5684","possible_hits":"1",},
{"lineNum":"  210","line":"        },"},
{"lineNum":"  211","line":"    };"},
{"lineNum":"  212","line":"    defer alloc.destroy(default.items[0]);","class":"linePartCov","hits":"1","order":"5719","possible_hits":"3",},
{"lineNum":"  213","line":""},
{"lineNum":"  214","line":"    try (EmitTestCase{","class":"linePartCov","hits":"2","order":"5692","possible_hits":"3",},
{"lineNum":"  215","line":"        .inputNode = EmitTestCase.makeNode(.Switch, node.Switch{","class":"lineCov","hits":"1","order":"5690","possible_hits":"1",},
{"lineNum":"  216","line":"            .expr = expr,","class":"lineCov","hits":"1","order":"5687","possible_hits":"1",},
{"lineNum":"  217","line":"            .cases = cases,","class":"lineCov","hits":"1","order":"5688","possible_hits":"1",},
{"lineNum":"  218","line":"            .default = default,","class":"lineCov","hits":"1","order":"5689","possible_hits":"1",},
{"lineNum":"  219","line":"        }),"},
{"lineNum":"  220","line":"        .expectedOutput =","class":"lineCov","hits":"1","order":"5691","possible_hits":"1",},
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
{"lineNum":"  232","line":"    }).run();","class":"lineCov","hits":"1","order":"5693","possible_hits":"1",},
{"lineNum":"  233","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-03 21:04:56", "instrumented" : 126, "covered" : 126,};
var merged_data = [];
