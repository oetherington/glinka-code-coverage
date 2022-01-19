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
{"lineNum":"   19","line":"const expectEqualStrings = std.testing.expectEqualStrings;"},
{"lineNum":"   20","line":"const node = @import(\"../../common/node.zig\");"},
{"lineNum":"   21","line":"const Node = node.Node;"},
{"lineNum":"   22","line":"const Cursor = @import(\"../../common/cursor.zig\").Cursor;"},
{"lineNum":"   23","line":"const Backend = @import(\"../../common/backend.zig\").Backend;"},
{"lineNum":"   24","line":"const JsBackend = @import(\"js_backend.zig\").JsBackend;"},
{"lineNum":"   25","line":""},
{"lineNum":"   26","line":"pub fn emitDecl(self: *JsBackend, decl: node.Decl) Backend.Error!void {","class":"lineCov","hits":"2","order":"5418","possible_hits":"2",},
{"lineNum":"   27","line":"    try self.out.print(\"{s} {s}\", .{ decl.scoping.toString(), decl.name });","class":"lineCov","hits":"1","order":"5419","possible_hits":"1",},
{"lineNum":"   28","line":""},
{"lineNum":"   29","line":"    if (decl.value) |value| {","class":"lineCov","hits":"2","order":"5420","possible_hits":"2",},
{"lineNum":"   30","line":"        try self.out.print(\" = \", .{});","class":"lineCov","hits":"1","order":"5421","possible_hits":"1",},
{"lineNum":"   31","line":"        try self.emitExpr(value);","class":"lineCov","hits":"1","order":"5422","possible_hits":"1",},
{"lineNum":"   32","line":"    }"},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"    try self.out.print(\";\\n\", .{});","class":"lineCov","hits":"1","order":"5423","possible_hits":"1",},
{"lineNum":"   35","line":"}"},
{"lineNum":"   36","line":""},
{"lineNum":"   37","line":"const DeclTestCase = struct {"},
{"lineNum":"   38","line":"    inputTy: []const u8,"},
{"lineNum":"   39","line":"    scoping: node.Decl.Scoping,"},
{"lineNum":"   40","line":"    expectedOutput: []const u8,"},
{"lineNum":"   41","line":""},
{"lineNum":"   42","line":"    pub fn run(self: DeclTestCase) !void {","class":"lineCov","hits":"3","order":"5408","possible_hits":"3",},
{"lineNum":"   43","line":"        var value = try DeclTestCase.makeNode(.Null, {});","class":"lineCov","hits":"1","order":"5409","possible_hits":"1",},
{"lineNum":"   44","line":"        defer std.testing.allocator.destroy(value);","class":"linePartCov","hits":"1","order":"5429","possible_hits":"5",},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"        var decl = try DeclTestCase.makeNode(","class":"lineCov","hits":"1","order":"5414","possible_hits":"1",},
{"lineNum":"   47","line":"            .Decl,"},
{"lineNum":"   48","line":"            node.Decl.new(self.scoping, \"test\", null, value),","class":"lineCov","hits":"1","order":"5413","possible_hits":"1",},
{"lineNum":"   49","line":"        );"},
{"lineNum":"   50","line":"        defer std.testing.allocator.destroy(decl);","class":"linePartCov","hits":"1","order":"5428","possible_hits":"5",},
{"lineNum":"   51","line":""},
{"lineNum":"   52","line":"        var backend = try JsBackend.new(std.testing.allocator);","class":"linePartCov","hits":"1","order":"5416","possible_hits":"2",},
{"lineNum":"   53","line":"        defer backend.deinit();","class":"linePartCov","hits":"1","order":"5427","possible_hits":"4",},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"        try emitDecl(&backend, decl.data.Decl);","class":"linePartCov","hits":"2","order":"5417","possible_hits":"3",},
{"lineNum":"   56","line":""},
{"lineNum":"   57","line":"        const str = try backend.toString();","class":"linePartCov","hits":"1","order":"5424","possible_hits":"2",},
{"lineNum":"   58","line":"        defer backend.freeString(str);","class":"linePartCov","hits":"1","order":"5426","possible_hits":"2",},
{"lineNum":"   59","line":"        try expectEqualStrings(self.expectedOutput, str);","class":"linePartCov","hits":"1","order":"5425","possible_hits":"2",},
{"lineNum":"   60","line":"    }"},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"    pub fn makeNode(comptime ty: node.NodeType, data: anytype) !Node {","class":"lineCov","hits":"2","order":"5410","possible_hits":"2",},
{"lineNum":"   63","line":"        return node.makeNode(","class":"lineCov","hits":"2","order":"5412","possible_hits":"2",},
{"lineNum":"   64","line":"            std.testing.allocator,"},
{"lineNum":"   65","line":"            Cursor.new(0, 0),","class":"lineCov","hits":"2","order":"5411","possible_hits":"2",},
{"lineNum":"   66","line":"            ty,"},
{"lineNum":"   67","line":"            data,","class":"lineCov","hits":"1","order":"5415","possible_hits":"1",},
{"lineNum":"   68","line":"        );"},
{"lineNum":"   69","line":"    }"},
{"lineNum":"   70","line":"};"},
{"lineNum":"   71","line":""},
{"lineNum":"   72","line":"test \"JsBackend can emit var declaration\" {","class":"lineCov","hits":"2","order":"5406","possible_hits":"2",},
{"lineNum":"   73","line":"    try (DeclTestCase{","class":"lineCov","hits":"1","order":"5430","possible_hits":"1",},
{"lineNum":"   74","line":"        .inputTy = \"var\","},
{"lineNum":"   75","line":"        .scoping = .Var,"},
{"lineNum":"   76","line":"        .expectedOutput = \"var test = null;\\n\","},
{"lineNum":"   77","line":"    }).run();","class":"lineCov","hits":"1","order":"5407","possible_hits":"1",},
{"lineNum":"   78","line":"}"},
{"lineNum":"   79","line":""},
{"lineNum":"   80","line":"test \"JsBackend can emit let declaration\" {","class":"lineCov","hits":"2","order":"5431","possible_hits":"2",},
{"lineNum":"   81","line":"    try (DeclTestCase{","class":"lineCov","hits":"1","order":"5433","possible_hits":"1",},
{"lineNum":"   82","line":"        .inputTy = \"let\","},
{"lineNum":"   83","line":"        .scoping = .Let,"},
{"lineNum":"   84","line":"        .expectedOutput = \"let test = null;\\n\","},
{"lineNum":"   85","line":"    }).run();","class":"lineCov","hits":"1","order":"5432","possible_hits":"1",},
{"lineNum":"   86","line":"}"},
{"lineNum":"   87","line":""},
{"lineNum":"   88","line":"test \"JsBackend can emit const declaration\" {","class":"lineCov","hits":"2","order":"5434","possible_hits":"2",},
{"lineNum":"   89","line":"    try (DeclTestCase{","class":"lineCov","hits":"1","order":"5436","possible_hits":"1",},
{"lineNum":"   90","line":"        .inputTy = \"const\","},
{"lineNum":"   91","line":"        .scoping = .Const,"},
{"lineNum":"   92","line":"        .expectedOutput = \"const test = null;\\n\","},
{"lineNum":"   93","line":"    }).run();","class":"lineCov","hits":"1","order":"5435","possible_hits":"1",},
{"lineNum":"   94","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-19 21:06:17", "instrumented" : 31, "covered" : 31,};
var merged_data = [];
