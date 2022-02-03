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
{"lineNum":"   26","line":""},
{"lineNum":"   27","line":"pub fn emitClass(self: *JsBackend, class: node.ClassType) Backend.Error!void {","class":"lineCov","hits":"2","order":"5968","possible_hits":"2",},
{"lineNum":"   28","line":"    try self.out.print(","class":"lineCov","hits":"2","order":"5969","possible_hits":"2",},
{"lineNum":"   29","line":"        \"var {s} = /** @class */ (function (_super) {{\\n\","},
{"lineNum":"   30","line":"        .{class.name},","class":"lineCov","hits":"1","order":"5970","possible_hits":"1",},
{"lineNum":"   31","line":"    );"},
{"lineNum":"   32","line":""},
{"lineNum":"   33","line":"    if (class.extends != null)","class":"lineCov","hits":"2","order":"5971","possible_hits":"2",},
{"lineNum":"   34","line":"        try self.out.print(\" __extends({s}, _super);\\n\", .{class.name});","class":"lineCov","hits":"1","order":"5985","possible_hits":"1",},
{"lineNum":"   35","line":""},
{"lineNum":"   36","line":"    try self.out.print(\" function {s}() {{\\n\", .{class.name});","class":"lineCov","hits":"1","order":"5972","possible_hits":"1",},
{"lineNum":"   37","line":"    if (class.extends != null)","class":"lineCov","hits":"2","order":"5973","possible_hits":"2",},
{"lineNum":"   38","line":"        try self.out.print(","class":"lineCov","hits":"1","order":"5986","possible_hits":"1",},
{"lineNum":"   39","line":"            \"  return _super !== null && _super.apply(this, arguments) || this;\\n\","},
{"lineNum":"   40","line":"            .{},"},
{"lineNum":"   41","line":"        );"},
{"lineNum":"   42","line":"    try self.out.print(\" }}\\n\", .{});","class":"lineCov","hits":"1","order":"5974","possible_hits":"1",},
{"lineNum":"   43","line":""},
{"lineNum":"   44","line":"    for (class.members.items) |member| {","class":"lineCov","hits":"2","order":"5975","possible_hits":"2",},
{"lineNum":"   45","line":"        const mem = member.data.ClassTypeMember;","class":"linePartCov","hits":"2","order":"6002","possible_hits":"3",},
{"lineNum":"   46","line":"        if (mem.value) |value| {","class":"lineCov","hits":"3","order":"6003","possible_hits":"3",},
{"lineNum":"   47","line":"            try self.out.print(\" {s}.{s} = \", .{ class.name, mem.name });","class":"lineCov","hits":"1","order":"6004","possible_hits":"1",},
{"lineNum":"   48","line":"            try self.emitExpr(value);","class":"lineCov","hits":"1","order":"6005","possible_hits":"1",},
{"lineNum":"   49","line":"            try self.out.print(\";\\n\", .{});","class":"lineCov","hits":"1","order":"6006","possible_hits":"1",},
{"lineNum":"   50","line":"        }"},
{"lineNum":"   51","line":"    }"},
{"lineNum":"   52","line":""},
{"lineNum":"   53","line":"    try self.out.print(\" return {s};\\n\", .{class.name});","class":"lineCov","hits":"1","order":"5976","possible_hits":"1",},
{"lineNum":"   54","line":"    try self.out.print(","class":"lineCov","hits":"2","order":"5977","possible_hits":"2",},
{"lineNum":"   55","line":"        \"}}({s}));\\n\","},
{"lineNum":"   56","line":"        .{if (class.extends) |extends| extends else \"\"},","class":"lineCov","hits":"1","order":"5978","possible_hits":"1",},
{"lineNum":"   57","line":"    );"},
{"lineNum":"   58","line":"}"},
{"lineNum":"   59","line":""},
{"lineNum":"   60","line":"test \"JsBackend can emit empty class\" {","class":"lineCov","hits":"2","order":"5961","possible_hits":"2",},
{"lineNum":"   61","line":"    var class = node.ClassType.new(\"MyClass\", null);","class":"lineCov","hits":"1","order":"5962","possible_hits":"1",},
{"lineNum":"   62","line":""},
{"lineNum":"   63","line":"    try (EmitTestCase{","class":"lineCov","hits":"2","order":"5965","possible_hits":"2",},
{"lineNum":"   64","line":"        .inputNode = EmitTestCase.makeNode(.ClassType, class),","class":"lineCov","hits":"1","order":"5963","possible_hits":"1",},
{"lineNum":"   65","line":"        .expectedOutput =","class":"lineCov","hits":"1","order":"5964","possible_hits":"1",},
{"lineNum":"   66","line":"        \\\\var MyClass = /** @class */ (function (_super) {"},
{"lineNum":"   67","line":"        \\\\ function MyClass() {"},
{"lineNum":"   68","line":"        \\\\ }"},
{"lineNum":"   69","line":"        \\\\ return MyClass;"},
{"lineNum":"   70","line":"        \\\\}());"},
{"lineNum":"   71","line":"        \\\\"},
{"lineNum":"   72","line":"        ,"},
{"lineNum":"   73","line":"    }).run();","class":"lineCov","hits":"1","order":"5966","possible_hits":"1",},
{"lineNum":"   74","line":"}"},
{"lineNum":"   75","line":""},
{"lineNum":"   76","line":"test \"JsBackend can emit class with superclass\" {","class":"lineCov","hits":"2","order":"5979","possible_hits":"2",},
{"lineNum":"   77","line":"    var class = node.ClassType.new(\"MyClass\", \"SomeOtherClass\");","class":"lineCov","hits":"1","order":"5980","possible_hits":"1",},
{"lineNum":"   78","line":""},
{"lineNum":"   79","line":"    try (EmitTestCase{","class":"lineCov","hits":"2","order":"5983","possible_hits":"2",},
{"lineNum":"   80","line":"        .inputNode = EmitTestCase.makeNode(.ClassType, class),","class":"lineCov","hits":"1","order":"5981","possible_hits":"1",},
{"lineNum":"   81","line":"        .expectedOutput =","class":"lineCov","hits":"1","order":"5982","possible_hits":"1",},
{"lineNum":"   82","line":"        \\\\var MyClass = /** @class */ (function (_super) {"},
{"lineNum":"   83","line":"        \\\\ __extends(MyClass, _super);"},
{"lineNum":"   84","line":"        \\\\ function MyClass() {"},
{"lineNum":"   85","line":"        \\\\  return _super !== null && _super.apply(this, arguments) || this;"},
{"lineNum":"   86","line":"        \\\\ }"},
{"lineNum":"   87","line":"        \\\\ return MyClass;"},
{"lineNum":"   88","line":"        \\\\}(SomeOtherClass));"},
{"lineNum":"   89","line":"        \\\\"},
{"lineNum":"   90","line":"        ,"},
{"lineNum":"   91","line":"    }).run();","class":"lineCov","hits":"1","order":"5984","possible_hits":"1",},
{"lineNum":"   92","line":"}"},
{"lineNum":"   93","line":""},
{"lineNum":"   94","line":"test \"JsBackend can emit class with initialized members\" {","class":"lineCov","hits":"2","order":"5987","possible_hits":"2",},
{"lineNum":"   95","line":"    var class = node.ClassType.new(\"MyClass\", null);","class":"lineCov","hits":"1","order":"5988","possible_hits":"1",},
{"lineNum":"   96","line":""},
{"lineNum":"   97","line":"    class.members = node.NodeList{","class":"lineCov","hits":"1","order":"5997","possible_hits":"1",},
{"lineNum":"   98","line":"        .items = &[_]node.Node{","class":"lineCov","hits":"1","order":"5996","possible_hits":"1",},
{"lineNum":"   99","line":"            EmitTestCase.makeNode(.ClassTypeMember, node.ClassTypeMember{","class":"lineCov","hits":"1","order":"5995","possible_hits":"1",},
{"lineNum":"  100","line":"                .isStatic = false,","class":"lineCov","hits":"1","order":"5990","possible_hits":"1",},
{"lineNum":"  101","line":"                .isReadOnly = false,","class":"lineCov","hits":"1","order":"5991","possible_hits":"1",},
{"lineNum":"  102","line":"                .visibility = .Public,","class":"lineCov","hits":"1","order":"5992","possible_hits":"1",},
{"lineNum":"  103","line":"                .name = \"aClassMember\",","class":"lineCov","hits":"1","order":"5993","possible_hits":"1",},
{"lineNum":"  104","line":"                .ty = null,","class":"lineCov","hits":"1","order":"5994","possible_hits":"1",},
{"lineNum":"  105","line":"                .value = EmitTestCase.makeNode(.Int, \"3\"),","class":"lineCov","hits":"1","order":"5989","possible_hits":"1",},
{"lineNum":"  106","line":"            }),"},
{"lineNum":"  107","line":"        },"},
{"lineNum":"  108","line":"    };"},
{"lineNum":"  109","line":""},
{"lineNum":"  110","line":"    try (EmitTestCase{","class":"lineCov","hits":"1","order":"6012","possible_hits":"1",},
{"lineNum":"  111","line":"        .inputNode = EmitTestCase.makeNode(.ClassType, class),","class":"lineCov","hits":"1","order":"5998","possible_hits":"1",},
{"lineNum":"  112","line":"        .expectedOutput =","class":"lineCov","hits":"1","order":"5999","possible_hits":"1",},
{"lineNum":"  113","line":"        \\\\var MyClass = /** @class */ (function (_super) {"},
{"lineNum":"  114","line":"        \\\\ function MyClass() {"},
{"lineNum":"  115","line":"        \\\\ }"},
{"lineNum":"  116","line":"        \\\\ MyClass.aClassMember = 3;"},
{"lineNum":"  117","line":"        \\\\ return MyClass;"},
{"lineNum":"  118","line":"        \\\\}());"},
{"lineNum":"  119","line":"        \\\\"},
{"lineNum":"  120","line":"        ,"},
{"lineNum":"  121","line":"        .cleanup = (struct {","class":"lineCov","hits":"1","order":"6000","possible_hits":"1",},
{"lineNum":"  122","line":"            pub fn cleanup(alloc: Allocator, nd: Node) void {","class":"lineCov","hits":"2","order":"6008","possible_hits":"2",},
{"lineNum":"  123","line":"                const members = nd.data.ClassType.members.items;","class":"linePartCov","hits":"1","order":"6009","possible_hits":"2",},
{"lineNum":"  124","line":"                alloc.destroy(members[0].data.ClassTypeMember.value.?);","class":"linePartCov","hits":"1","order":"6010","possible_hits":"2",},
{"lineNum":"  125","line":"                alloc.destroy(members[0]);","class":"lineCov","hits":"1","order":"6011","possible_hits":"1",},
{"lineNum":"  126","line":"            }"},
{"lineNum":"  127","line":"        }).cleanup,"},
{"lineNum":"  128","line":"    }).run();","class":"lineCov","hits":"1","order":"6001","possible_hits":"1",},
{"lineNum":"  129","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-03 20:45:33", "instrumented" : 50, "covered" : 50,};
var merged_data = [];
