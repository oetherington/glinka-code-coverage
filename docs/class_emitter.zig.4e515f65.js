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
{"lineNum":"   27","line":"fn emitMember(","class":"lineCov","hits":"1","order":"6193","possible_hits":"1",},
{"lineNum":"   28","line":"    self: *JsBackend,"},
{"lineNum":"   29","line":"    className: []const u8,"},
{"lineNum":"   30","line":"    mem: node.ClassTypeMember,"},
{"lineNum":"   31","line":") Backend.Error!void {","class":"lineCov","hits":"1","order":"6200","possible_hits":"1",},
{"lineNum":"   32","line":"    switch (mem.data) {","class":"linePartCov","hits":"1","order":"6194","possible_hits":"2",},
{"lineNum":"   33","line":"        .Var => |v| {","class":"lineCov","hits":"1","order":"6195","possible_hits":"1",},
{"lineNum":"   34","line":"            if (v.value) |value| {","class":"lineCov","hits":"2","order":"6196","possible_hits":"2",},
{"lineNum":"   35","line":"                try self.out.print(\" {s}.{s} = \", .{ className, v.name });","class":"lineCov","hits":"1","order":"6197","possible_hits":"1",},
{"lineNum":"   36","line":"                try self.emitExpr(value);","class":"lineCov","hits":"1","order":"6198","possible_hits":"1",},
{"lineNum":"   37","line":"                try self.out.print(\";\\n\", .{});","class":"lineCov","hits":"1","order":"6199","possible_hits":"1",},
{"lineNum":"   38","line":"            }"},
{"lineNum":"   39","line":"        },"},
{"lineNum":"   40","line":"        .Func => |f| {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   41","line":"            // TODO"},
{"lineNum":"   42","line":"            _ = f;"},
{"lineNum":"   43","line":"            unreachable;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   44","line":"        },"},
{"lineNum":"   45","line":"    }"},
{"lineNum":"   46","line":"}"},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"pub fn emitClass(self: *JsBackend, class: node.ClassType) Backend.Error!void {","class":"lineCov","hits":"2","order":"6156","possible_hits":"2",},
{"lineNum":"   49","line":"    try self.out.print(","class":"lineCov","hits":"2","order":"6157","possible_hits":"2",},
{"lineNum":"   50","line":"        \"var {s} = /** @class */ (function (_super) {{\\n\","},
{"lineNum":"   51","line":"        .{class.name},","class":"lineCov","hits":"1","order":"6158","possible_hits":"1",},
{"lineNum":"   52","line":"    );"},
{"lineNum":"   53","line":""},
{"lineNum":"   54","line":"    if (class.extends != null)","class":"lineCov","hits":"2","order":"6159","possible_hits":"2",},
{"lineNum":"   55","line":"        try self.out.print(\" __extends({s}, _super);\\n\", .{class.name});","class":"lineCov","hits":"1","order":"6173","possible_hits":"1",},
{"lineNum":"   56","line":""},
{"lineNum":"   57","line":"    try self.out.print(\" function {s}() {{\\n\", .{class.name});","class":"lineCov","hits":"1","order":"6160","possible_hits":"1",},
{"lineNum":"   58","line":"    if (class.extends != null)","class":"lineCov","hits":"2","order":"6161","possible_hits":"2",},
{"lineNum":"   59","line":"        try self.out.print(","class":"lineCov","hits":"1","order":"6174","possible_hits":"1",},
{"lineNum":"   60","line":"            \"  return _super!==null&&_super.apply(this,arguments)||this;\\n\","},
{"lineNum":"   61","line":"            .{},"},
{"lineNum":"   62","line":"        );"},
{"lineNum":"   63","line":"    try self.out.print(\" }}\\n\", .{});","class":"lineCov","hits":"1","order":"6162","possible_hits":"1",},
{"lineNum":"   64","line":""},
{"lineNum":"   65","line":"    for (class.members.items) |member| {","class":"lineCov","hits":"2","order":"6163","possible_hits":"2",},
{"lineNum":"   66","line":"        std.debug.assert(member.data.getType() == .ClassTypeMember);","class":"lineCov","hits":"1","order":"6191","possible_hits":"1",},
{"lineNum":"   67","line":"        try emitMember(self, class.name, member.data.ClassTypeMember);","class":"lineCov","hits":"2","order":"6192","possible_hits":"2",},
{"lineNum":"   68","line":"    }"},
{"lineNum":"   69","line":""},
{"lineNum":"   70","line":"    try self.out.print(\" return {s};\\n\", .{class.name});","class":"lineCov","hits":"1","order":"6164","possible_hits":"1",},
{"lineNum":"   71","line":"    try self.out.print(","class":"lineCov","hits":"2","order":"6165","possible_hits":"2",},
{"lineNum":"   72","line":"        \"}}({s}));\\n\","},
{"lineNum":"   73","line":"        .{if (class.extends) |extends| extends else \"\"},","class":"lineCov","hits":"1","order":"6166","possible_hits":"1",},
{"lineNum":"   74","line":"    );"},
{"lineNum":"   75","line":"}"},
{"lineNum":"   76","line":""},
{"lineNum":"   77","line":"test \"JsBackend can emit empty class\" {","class":"lineCov","hits":"2","order":"6149","possible_hits":"2",},
{"lineNum":"   78","line":"    var class = node.ClassType.new(\"MyClass\", null);","class":"lineCov","hits":"1","order":"6150","possible_hits":"1",},
{"lineNum":"   79","line":""},
{"lineNum":"   80","line":"    try (EmitTestCase{","class":"lineCov","hits":"2","order":"6153","possible_hits":"2",},
{"lineNum":"   81","line":"        .inputNode = EmitTestCase.makeNode(.ClassType, class),","class":"lineCov","hits":"1","order":"6151","possible_hits":"1",},
{"lineNum":"   82","line":"        .expectedOutput =","class":"lineCov","hits":"1","order":"6152","possible_hits":"1",},
{"lineNum":"   83","line":"        \\\\var MyClass = /** @class */ (function (_super) {"},
{"lineNum":"   84","line":"        \\\\ function MyClass() {"},
{"lineNum":"   85","line":"        \\\\ }"},
{"lineNum":"   86","line":"        \\\\ return MyClass;"},
{"lineNum":"   87","line":"        \\\\}());"},
{"lineNum":"   88","line":"        \\\\"},
{"lineNum":"   89","line":"        ,"},
{"lineNum":"   90","line":"    }).run();","class":"lineCov","hits":"1","order":"6154","possible_hits":"1",},
{"lineNum":"   91","line":"}"},
{"lineNum":"   92","line":""},
{"lineNum":"   93","line":"test \"JsBackend can emit class with superclass\" {","class":"lineCov","hits":"2","order":"6167","possible_hits":"2",},
{"lineNum":"   94","line":"    var class = node.ClassType.new(\"MyClass\", \"SomeOtherClass\");","class":"lineCov","hits":"1","order":"6168","possible_hits":"1",},
{"lineNum":"   95","line":""},
{"lineNum":"   96","line":"    try (EmitTestCase{","class":"lineCov","hits":"2","order":"6171","possible_hits":"2",},
{"lineNum":"   97","line":"        .inputNode = EmitTestCase.makeNode(.ClassType, class),","class":"lineCov","hits":"1","order":"6169","possible_hits":"1",},
{"lineNum":"   98","line":"        .expectedOutput =","class":"lineCov","hits":"1","order":"6170","possible_hits":"1",},
{"lineNum":"   99","line":"        \\\\var MyClass = /** @class */ (function (_super) {"},
{"lineNum":"  100","line":"        \\\\ __extends(MyClass, _super);"},
{"lineNum":"  101","line":"        \\\\ function MyClass() {"},
{"lineNum":"  102","line":"        \\\\  return _super!==null&&_super.apply(this,arguments)||this;"},
{"lineNum":"  103","line":"        \\\\ }"},
{"lineNum":"  104","line":"        \\\\ return MyClass;"},
{"lineNum":"  105","line":"        \\\\}(SomeOtherClass));"},
{"lineNum":"  106","line":"        \\\\"},
{"lineNum":"  107","line":"        ,"},
{"lineNum":"  108","line":"    }).run();","class":"lineCov","hits":"1","order":"6172","possible_hits":"1",},
{"lineNum":"  109","line":"}"},
{"lineNum":"  110","line":""},
{"lineNum":"  111","line":"test \"JsBackend can emit class with initialized members\" {","class":"lineCov","hits":"2","order":"6175","possible_hits":"2",},
{"lineNum":"  112","line":"    var class = node.ClassType.new(\"MyClass\", null);","class":"lineCov","hits":"1","order":"6176","possible_hits":"1",},
{"lineNum":"  113","line":""},
{"lineNum":"  114","line":"    class.members = node.NodeList{","class":"lineCov","hits":"1","order":"6186","possible_hits":"1",},
{"lineNum":"  115","line":"        .items = &[_]node.Node{","class":"lineCov","hits":"1","order":"6185","possible_hits":"1",},
{"lineNum":"  116","line":"            EmitTestCase.makeNode(.ClassTypeMember, node.ClassTypeMember{","class":"lineCov","hits":"1","order":"6184","possible_hits":"1",},
{"lineNum":"  117","line":"                .isStatic = false,","class":"lineCov","hits":"1","order":"6182","possible_hits":"1",},
{"lineNum":"  118","line":"                .visibility = .Public,","class":"lineCov","hits":"1","order":"6183","possible_hits":"1",},
{"lineNum":"  119","line":"                .data = .{"},
{"lineNum":"  120","line":"                    .Var = .{","class":"lineCov","hits":"1","order":"6177","possible_hits":"1",},
{"lineNum":"  121","line":"                        .isReadOnly = false,","class":"lineCov","hits":"1","order":"6179","possible_hits":"1",},
{"lineNum":"  122","line":"                        .name = \"aClassMember\",","class":"lineCov","hits":"1","order":"6180","possible_hits":"1",},
{"lineNum":"  123","line":"                        .ty = null,","class":"lineCov","hits":"1","order":"6181","possible_hits":"1",},
{"lineNum":"  124","line":"                        .value = EmitTestCase.makeNode(.Int, \"3\"),","class":"lineCov","hits":"1","order":"6178","possible_hits":"1",},
{"lineNum":"  125","line":"                    },"},
{"lineNum":"  126","line":"                },"},
{"lineNum":"  127","line":"            }),"},
{"lineNum":"  128","line":"        },"},
{"lineNum":"  129","line":"    };"},
{"lineNum":"  130","line":""},
{"lineNum":"  131","line":"    try (EmitTestCase{","class":"lineCov","hits":"1","order":"6206","possible_hits":"1",},
{"lineNum":"  132","line":"        .inputNode = EmitTestCase.makeNode(.ClassType, class),","class":"lineCov","hits":"1","order":"6187","possible_hits":"1",},
{"lineNum":"  133","line":"        .expectedOutput =","class":"lineCov","hits":"1","order":"6188","possible_hits":"1",},
{"lineNum":"  134","line":"        \\\\var MyClass = /** @class */ (function (_super) {"},
{"lineNum":"  135","line":"        \\\\ function MyClass() {"},
{"lineNum":"  136","line":"        \\\\ }"},
{"lineNum":"  137","line":"        \\\\ MyClass.aClassMember = 3;"},
{"lineNum":"  138","line":"        \\\\ return MyClass;"},
{"lineNum":"  139","line":"        \\\\}());"},
{"lineNum":"  140","line":"        \\\\"},
{"lineNum":"  141","line":"        ,"},
{"lineNum":"  142","line":"        .cleanup = (struct {","class":"lineCov","hits":"1","order":"6189","possible_hits":"1",},
{"lineNum":"  143","line":"            pub fn cleanup(alloc: Allocator, nd: Node) void {","class":"lineCov","hits":"2","order":"6202","possible_hits":"2",},
{"lineNum":"  144","line":"                const members = nd.data.ClassType.members.items;","class":"linePartCov","hits":"1","order":"6203","possible_hits":"2",},
{"lineNum":"  145","line":"                alloc.destroy(members[0].data.ClassTypeMember.data.Var.value.?);","class":"linePartCov","hits":"1","order":"6204","possible_hits":"2",},
{"lineNum":"  146","line":"                alloc.destroy(members[0]);","class":"lineCov","hits":"1","order":"6205","possible_hits":"1",},
{"lineNum":"  147","line":"            }"},
{"lineNum":"  148","line":"        }).cleanup,"},
{"lineNum":"  149","line":"    }).run();","class":"lineCov","hits":"1","order":"6190","possible_hits":"1",},
{"lineNum":"  150","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-13 15:59:30", "instrumented" : 58, "covered" : 56,};
var merged_data = [];
